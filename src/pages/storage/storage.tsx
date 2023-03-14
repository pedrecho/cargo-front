import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js";

export interface Device{
    id: number;
    type: string;
    party: string;
    importation: string;
    exportation: string;
    driver: string;
}

const DAYS = 7;

export function Storage(){

    const redirect = useNavigate()
    const [devices, setDevices] = React.useState<Array<Device>>([])
    const [initialDevices, setInitialDevices] = React.useState<Array<Device>>([])

    const [search, setSearch] = React.useState('')
    const [gist, setGist] = React.useState<any>([])

    React.useEffect(() => {
        const promise = axios({
            method: 'get',
            url: 'http://localhost:8082/device',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        promise.then((res) => {
            setDevices(res.data)
            setInitialDevices(res.data)
        }).catch((e) => redirect('/auth'))
    }, [])

    const sort = (value: string) => {
        setDevices((state) => [...state.sort((a: any, b: any) => {
            if(a[value] > b[value]) return 1
            if(a[value] < b[value]) return -1
            return 0
        })])
    }

    const searchDevice= () => {
        setDevices([...initialDevices.filter((a: Device) => {
            return a.type?.includes(search) || a.party?.includes(search) || a.importation?.includes(search) || a.exportation?.includes(search) || a.driver?.includes(search)
        })])
    }

    React.useEffect(() => {
        let arr: any[] = [];
        for(let i = DAYS - 1; i >= 0; i--){
            let count = 0;
            const day = new Date(Date.now()-86400000 * i);
            const formattedToday = day.toISOString().slice(0, 10);
            for(let j = 0; j < initialDevices.length; j++){
                // @ts-ignore
                if(initialDevices[j].exportation == formattedToday){
                    count++;
                }
            }
            arr.push({date: formattedToday, count})
        }
        setGist(arr)
    }, [initialDevices])

    const labels = [...gist.map((el) => el.date)];
    const data = {
        labels: labels,
        datasets: [
            {
                label: `Техника за последние ${DAYS} дней`,
                backgroundColor: "rgb(150, 255, 100)",
                borderColor: "rgb(150, 255, 100)",
                data: [...gist.map((el) => el.count)],
            },
        ],
    };

    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    return(
        <div className={'mt-4 ml-4 flex flex-col'}>
            <div className={'flex flex-row items-center'}>
                <button className={'border-2 box-border p-[10px] w-[150px]'} onClick={() => redirect('/create-device')}>Создать технику</button>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className={'border-2 w-[150px] h-[30px] ml-4 rounded-md'}/>
                <button className={'ml-2 border-2 w-[100px] h-[30px]'} onClick={searchDevice}>Поиск</button>
                <button className={'ml-2 border-2 w-[30px] h-[30px]'} onClick={() => setDevices(initialDevices)}>X</button>
            </div>
            <p>Количество техники: {devices.length}</p>
            <table className={'border-2 mt-4'}>
                <thead>
                <th className={'border-2'} onClick={() => sort('type')}>Тип</th>
                <th className={'border-2'} onClick={() => sort('party')}>Группа</th>
                <th className={'border-2'} onClick={() => sort('importation')}>Ввоз</th>
                <th className={'border-2'} onClick={() => sort('exportation')}>Вывоз</th>
                <th className={'border-2'} onClick={() => sort('driver')}>Водитель</th>
                </thead>
                <tbody>
                {devices.map((device: Device) => (
                    <tr className={'border-2'} key={device.id} onClick={() => redirect(`/device-page/${device.id}`)}>
                        <td className={'border-2 text-center'}>{device.type} </td>
                        <td className={'border-2 text-center'}>{device.party} </td>
                        <td className={'border-2 text-center'}>{device.importation} </td>
                        <td className={'border-2 text-center'}>{device.exportation} </td>
                        <td className={'border-2 text-center'}>{device.driver} </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Bar data={data}/>
        </div>
    )
}