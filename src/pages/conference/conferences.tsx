import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js";


export interface Conference {
    id: number;
    name: string;
    date: string;
    moderator: string;
    speaker: string;
}

const DAYS = 7;

export function Conferences() {

    const redirect = useNavigate()
    const [conferences, setConferences] = React.useState<Array<Conference>>([])
    const [initialConferences, setInitialConferences] = React.useState<Array<Conference>>([])

    const [search, setSearch] = React.useState('')
    const [gist, setGist] = React.useState<any>([])
    const [average, setAverage] = React.useState<number>(0)

    React.useEffect(() => {
        const promise = axios({
            method: 'get',
            url: 'http://localhost:8080/conference',
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        promise.then((res) => {
            setConferences(res.data)
            setInitialConferences(res.data)
        }).catch((e) => redirect('/auth'))
    }, [])

    const sort = (value: string) => {
        setConferences((state) => [...state.sort((a: any, b: any) => {
            if (a[value] > b[value]) return 1
            if (a[value] < b[value]) return -1
            return 0
        })])
    }

    const searchBarberClients = () => {
        setConferences([...initialConferences.filter((a: Conference) => {
            return a.name?.includes(search) || a.date?.includes(search) || a.moderator?.includes(search) || a.speaker?.includes(search)
        })])
    }

    const searchBarberClientsByDateTo = () => {
        setConferences([...initialConferences.filter((a: Conference) => {
            return a.date?.includes(search)
        })])
    }

    React.useEffect(() => {
        let arr: any[] = [];
        let total: number = 0;
        for(let i = DAYS - 1; i >= 0; i--){
            let count = 0;
            const day = new Date(Date.now()-86400000 * i);
            const formattedToday = day.toISOString().slice(0, 10);
            for(let j = 0; j < initialConferences.length; j++){
                if(initialConferences[j].date === formattedToday){
                    count++;

                }
            }
            arr.push({date: formattedToday, count})
            total += count;
        }
        setGist(arr)
        setAverage(Math.ceil(total / DAYS))
    }, [initialConferences])

    const labels = [...gist.map((el) => el.date)];
    const data = {
        labels: labels,
        datasets: [
            {
                label: `Конференции за последние ${DAYS} дней`,
                backgroundColor: "#bb77ff",
                borderColor: "#bb77ff",
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
                        onClick={() => redirect('/create-conference')}>Добавить конференцию
                </button>
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                       className={'border-2 w-[150px] h-[30px] ml-4 rounded-md'}/>
                <button className={'ml-2 border-2 w-[100px] h-[30px]'} onClick={searchBarberClients}>Поиск</button>
                <button className={'ml-2 border-2 w-[30px] h-[30px]'} onClick={() => setConferences(initialConferences)}>X
                </button>

                <button className={'ml-2 border-2 w-[200px] h-[30px]'} onClick={searchBarberClientsByDateTo}>Поиск по дате конференции</button>
                <button className={'ml-2 border-2 w-[30px] h-[30px]'} onClick={() => setConferences(initialConferences)}>X
                </button>
            </div>
            <p>Количество конференций: {conferences.length}</p>
            <table className={'border-2 mt-4'}>
                <thead>
                <th className={'border-2'} onClick={() => sort('name')}>Название конференции</th>
                <th className={'border-2'} onClick={() => sort('appointment')}>Дата конференции</th>
                <th className={'border-2'} onClick={() => sort('service')}>Модератор</th>
                <th className={'border-2'} onClick={() => sort('master')}>Спикер</th>
                </thead>
                <tbody>
                {conferences.map((conference: Conference) => (
                    <tr className={'border-2'} key={conference.id} onClick={() => redirect(`/conference-page/${conference.id}`)}>
                        <td className={'border-2 text-center'}>{conference.name} </td>
                        <td className={'border-2 text-center'}>{conference.date} </td>
                        <td className={'border-2 text-center'}>{conference.moderator} </td>
                        <td className={'border-2 text-center'}>{conference.speaker} </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p>Среднее кол-во конференций за последние {DAYS} дней: {average}</p>
            <Bar data={data}/>
        </div>
    )

}