import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js";

export interface Movie{
    id: number;
    name: string;
    studio: string;
    date: string;
    time: string;
    count: number;
}

const DAYS = 7;

export function Cinema(){

    const redirect = useNavigate()
    const [movies, setMovies] = React.useState<Array<Movie>>([])
    const [initialMovies, setInitialMovies] = React.useState<Array<Movie>>([])

    const [search, setSearch] = React.useState('')
    const [gist, setGist] = React.useState<any>([])

    React.useEffect(() => {
        const promise = axios({
            method: 'get',
            url: 'http://localhost:8082/movie',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        promise.then((res) => {
            setMovies(res.data)
            setInitialMovies(res.data)
        }).catch((e) => redirect('/auth'))
    }, [])

    const sort = (value: string) => {
        setMovies((state) => [...state.sort((a: any, b: any) => {
            if(a[value] > b[value]) return 1
            if(a[value] < b[value]) return -1
            return 0
        })])
    }

    const searchMovie= () => {
        setMovies([...initialMovies.filter((a: Movie) => {
            return a.name?.includes(search) || a.studio?.includes(search) || a.date?.includes(search) || a.time?.includes(search) || a.count?.toString().includes(search)
        })])
    }

    React.useEffect(() => {
        let arr: any[] = [];
        for(let i = DAYS - 1; i >= 0; i--){
            let count = 0;
            const day = new Date(Date.now()-86400000 * i);
            const formattedToday = day.toISOString().slice(0, 10);
            for(let j = 0; j < initialMovies.length; j++){
                // @ts-ignore
                if(initialMovies[j].date == formattedToday){
                    count++;
                }
            }
            arr.push({date: formattedToday, count})
        }
        setGist(arr)
    }, [initialMovies])

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
                <button className={'border-2 box-border p-[10px] w-[150px]'} onClick={() => redirect('/create-movie')}>Создать сеанс</button>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className={'border-2 w-[150px] h-[30px] ml-4 rounded-md'}/>
                <button className={'ml-2 border-2 w-[100px] h-[30px]'} onClick={searchMovie}>Поиск</button>
                <button className={'ml-2 border-2 w-[30px] h-[30px]'} onClick={() => setMovies(initialMovies)}>X</button>
            </div>
            <p>Количество фильмов: {movies.length}</p>
            <table className={'border-2 mt-4'}>
                <thead>
                <th className={'border-2'} onClick={() => sort('name')}>Название</th>
                <th className={'border-2'} onClick={() => sort('studio')}>Студия</th>
                <th className={'border-2'} onClick={() => sort('date')}>Дата показа</th>
                <th className={'border-2'} onClick={() => sort('time')}>Время показа</th>
                <th className={'border-2'} onClick={() => sort('count')}>Кол-во билетов</th>
                </thead>
                <tbody>
                {movies.map((movie: Movie) => (
                    <tr className={'border-2'} key={movie.id} onClick={() => redirect(`/movie-page/${movie.id}`)}>
                        <td className={'border-2 text-center'}>{movie.name} </td>
                        <td className={'border-2 text-center'}>{movie.studio} </td>
                        <td className={'border-2 text-center'}>{movie.date} </td>
                        <td className={'border-2 text-center'}>{movie.time} </td>
                        <td className={'border-2 text-center'}>{movie.count} </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Bar data={data}/>
        </div>
    )
}