import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js";


export interface BarberClient {
    id: number;
    name: string;
    appointment: string;
    service: string;
    master: string;
}

const DAYS = 7;

export function BarberShop() {

    const redirect = useNavigate()
    const [barberClients, setBarberClients] = React.useState<Array<BarberClient>>([])
    const [initialBarberClients, setInitialBarberClients] = React.useState<Array<BarberClient>>([])

    const [search, setSearch] = React.useState('')
    const [gist, setGist] = React.useState<any>([])

    React.useEffect(() => {
        const promise = axios({
            method: 'get',
            url: 'http://localhost:8080/barbershop',
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        promise.then((res) => {
            setBarberClients(res.data)
            setInitialBarberClients(res.data)
        }).catch((e) => redirect('/auth'))
    }, [])

    const sort = (value: string) => {
        setBarberClients((state) => [...state.sort((a: any, b: any) => {
            if (a[value] > b[value]) return 1
            if (a[value] < b[value]) return -1
            return 0
        })])
    }

    const searchBarberClients = () => {
        setBarberClients([...initialBarberClients.filter((a: BarberClient) => {
            return a.name?.includes(search) || a.appointment?.includes(search) || a.service?.includes(search) || a.master?.includes(search)
        })])
    }

    const searchBarberClientsByDateTo = () => {
        setBarberClients([...initialBarberClients.filter((a: BarberClient) => {
            return a.appointment?.includes(search)
        })])
    }

    React.useEffect(() => {
        let arr: any[] = [];
        for(let i = DAYS - 1; i >= 0; i--){
            let count = 0;
            const day = new Date(Date.now()-86400000 * i);
            const formattedToday = day.toISOString().slice(0, 10);
            for(let j = 0; j < initialBarberClients.length; j++){
                if(initialBarberClients[j].appointment === formattedToday){
                    count++;
                }
            }
            arr.push({date: formattedToday, count})
        }
        setGist(arr)
    }, [initialBarberClients])

    const labels = [...gist.map((el) => el.date)];
    const data = {
        labels: labels,
        datasets: [
            {
                label: `Записи за последние ${DAYS} дней`,
                backgroundColor: "#005555",
                borderColor: "#005555",
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

    return (
        <div className={'mt-4 ml-4 flex flex-col'}>
            <div className={'flex flex-row items-center'}>
                <button className={'border-2 box-border p-[10px] w-[150px]'}
                        onClick={() => redirect('/create-barberclient')}>Добавить запись
                </button>
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                       className={'border-2 w-[150px] h-[30px] ml-4 rounded-md'}/>
                <button className={'ml-2 border-2 w-[100px] h-[30px]'} onClick={searchBarberClients}>Поиск</button>
                <button className={'ml-2 border-2 w-[30px] h-[30px]'} onClick={() => setBarberClients(initialBarberClients)}>X
                </button>

                <button className={'ml-2 border-2 w-[200px] h-[30px]'} onClick={searchBarberClientsByDateTo}>Поиск по дате записи</button>
                <button className={'ml-2 border-2 w-[30px] h-[30px]'} onClick={() => setBarberClients(initialBarberClients)}>X
                </button>
            </div>
            <p>Количество записей: {barberClients.length}</p>
            <table className={'border-2 mt-4'}>
                <thead>
                <th className={'border-2'} onClick={() => sort('name')}>Имя клиента</th>
                <th className={'border-2'} onClick={() => sort('appointment')}>Дата записи</th>
                <th className={'border-2'} onClick={() => sort('service')}>Услуга</th>
                <th className={'border-2'} onClick={() => sort('master')}>Мастер</th>
                </thead>
                <tbody>
                {barberClients.map((barberClient: BarberClient) => (
                    <tr className={'border-2'} key={barberClient.id} onClick={() => redirect(`/barberclient-page/${barberClient.id}`)}>
                        <td className={'border-2 text-center'}>{barberClient.name} </td>
                        <td className={'border-2 text-center'}>{barberClient.appointment} </td>
                        <td className={'border-2 text-center'}>{barberClient.service} </td>
                        <td className={'border-2 text-center'}>{barberClient.master} </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Bar data={data}/>
        </div>
    )

}