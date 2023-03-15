import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js";

export interface Performance{
    id: number;
    name: string;
    producer: string;
    date: string;
    time: string;
    count: number;
}

const DAYS = 7;

export function Theatre(){

    const redirect = useNavigate()
    const [performances, setPerformances] = React.useState<Array<Performance>>([])
    const [initialPerformances, setInitialPerformances] = React.useState<Array<Performance>>([])

    const [search, setSearch] = React.useState('')
    const [gist, setGist] = React.useState<any>([])

    React.useEffect(() => {
        const promise = axios({
            method: 'get',
            url: 'http://localhost:8080/performances',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        promise.then((res) => {
            setPerformances(res.data)
            setInitialPerformances(res.data)
        }).catch((e) => redirect('/auth'))
    }, [])

    const sort = (value: string) => {
        setPerformances((state) => [...state.sort((a: any, b: any) => {
            if(a[value] > b[value]) return 1
            if(a[value] < b[value]) return -1
            return 0
        })])
    }

    const searchPerformance= () => {
        setPerformances([...initialPerformances.filter((a: Performance) => {
            return a.name?.includes(search) || a.producer?.includes(search) || a.date?.includes(search) || a.time?.includes(search) || a.count?.toString().includes(search)
        })])
    }

    React.useEffect(() => {
        let arr: any[] = [];
        for(let i = DAYS - 1; i >= 0; i--){
            let count = 0;
            const day = new Date(Date.now()-86400000 * i);
            const formattedToday = day.toISOString().slice(0, 10);
            for(let j = 0; j < initialPerformances.length; j++){
                // @ts-ignore
                if(initialPerformances[j].date == formattedToday){
                    count++;
                }
            }
            arr.push({date: formattedToday, count})
        }
        setGist(arr)
    }, [initialPerformances])

    const labels = [...gist.map((el) => el.date)];
    const data = {
        labels: labels,
        datasets: [
            {
                label: `Сеансы за последние ${DAYS} дней`,
                backgroundColor: "rgb(255, 255, 0)",
                borderColor: "rgb(255, 255, 0)",
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
                <button className={'border-2 box-border p-[10px] w-[150px]'} onClick={() => redirect('/create-performance')}>Создать сеанс</button>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className={'border-2 w-[150px] h-[30px] ml-4 rounded-md'}/>
                <button className={'ml-2 border-2 w-[100px] h-[30px]'} onClick={searchPerformance}>Поиск</button>
                <button className={'ml-2 border-2 w-[30px] h-[30px]'} onClick={() => setPerformances(initialPerformances)}>X</button>
            </div>
            <p>Количество фильмов: {performances.length}</p>
            <table className={'border-2 mt-4'}>
                <thead>
                <th className={'border-2'} onClick={() => sort('name')}>Название</th>
                <th className={'border-2'} onClick={() => sort('producer')}>Режиссер-постановщик</th>
                <th className={'border-2'} onClick={() => sort('date')}>Дата показа</th>
                <th className={'border-2'} onClick={() => sort('time')}>Время показа</th>
                <th className={'border-2'} onClick={() => sort('count')}>Кол-во билетов</th>
                </thead>
                <tbody>
                {performances.map((performance: Performance) => (
                    <tr className={'border-2'} key={performance.id} onClick={() => redirect(`/performance-page/${performance.id}`)}>
                        <td className={'border-2 text-center'}>{performance.name} </td>
                        <td className={'border-2 text-center'}>{performance.producer} </td>
                        <td className={'border-2 text-center'}>{performance.date} </td>
                        <td className={'border-2 text-center'}>{performance.time} </td>
                        <td className={'border-2 text-center'}>{performance.count} </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Bar data={data}/>
        </div>
    )
}