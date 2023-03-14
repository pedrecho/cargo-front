import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js";

export interface Car{
    id: number;
    brand: string;
    made: number;
    registered: string;
    owner: string;
}

const DAYS = 7;

export function Carpark(){

    const redirect = useNavigate()
    const [cars, setCars] = React.useState<Array<Car>>([])
    const [initialCars, setInitialCars] = React.useState<Array<Car>>([])

    const [search, setSearch] = React.useState('')
    const [gist, setGist] = React.useState<any>([])

    React.useEffect(() => {
        const promise = axios({
            method: 'get',
            url: 'http://localhost:8082/car',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        promise.then((res) => {
            const newCars: Array<Car> = [...res.data];
            setCars(newCars)
            setInitialCars(newCars)
        }).catch((e) => redirect('/auth'))
    }, [])

    const sort = (value: string) => {
        setCars((state) => [...state.sort((a: any, b: any) => {
            if(a[value] > b[value]) return 1
            if(a[value] < b[value]) return -1
            return 0
        })])
    }

    const searchCar= () => {
        setCars([...initialCars.filter((a: Car) => {
            return a.brand?.includes(search) || a.made?.toString().includes(search) || a.registered?.includes(search) || a.owner?.includes(search)
        })])
    }

    React.useEffect(() => {
        let arr: any[] = [];
        let count = 0;
        for(let i = DAYS - 1; i >= 0; i--){
            const day = new Date(Date.now()-86400000 * i);
            const yyyy = day.getFullYear();
            let mm = day.getMonth() + 1; // Months start at 0!
            let dd = day.getDate();
            let formattedToday = yyyy + '-';
            if (mm < 10){
                formattedToday += '0' + mm;
            }else{
                formattedToday += mm;
            }
            formattedToday+='-'
            if (dd < 10){
                formattedToday += '0' + dd;
            }else{
                formattedToday += dd;
            }
            for(let j = 0; j < initialCars.length; j++){
                // @ts-ignore
                if(initialCars[j].registered == formattedToday){
                    count++;
                }
            }
            arr.push({date: formattedToday, count})
        }
        setGist(arr)
    }, [initialCars])

    const labels = [...gist.map((el) => el.date)];
    const data = {
        labels: labels,
        datasets: [
            {
                label: `Машины за последние ${DAYS} дней`,
                backgroundColor: "rgb(0, 0, 150)",
                borderColor: "rgb(0, 0, 150)",
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
                <button className={'border-2 box-border p-[10px] w-[150px]'} onClick={() => redirect('/create-car')}>Создать машину</button>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className={'border-2 w-[150px] h-[30px] ml-4 rounded-md'}/>
                <button className={'ml-2 border-2 w-[100px] h-[30px]'} onClick={searchCar}>Поиск</button>
                <button className={'ml-2 border-2 w-[30px] h-[30px]'} onClick={() => setCars(initialCars)}>X</button>
            </div>
            <p>Количество машин: {cars.length}</p>
            <table className={'border-2 mt-4'}>
                <thead>
                <th className={'border-2'} onClick={() => sort('brand')}>Марка</th>
                <th className={'border-2'} onClick={() => sort('made')}>Год выпуска</th>
                <th className={'border-2'} onClick={() => sort('registered')}>Зарегестрирована</th>
                <th className={'border-2'} onClick={() => sort('owner')}>Владелец</th>
                </thead>
                <tbody>
                {cars.map((car: Car) => (
                    <tr className={'border-2'} key={car.id} onClick={() => redirect(`/car-page/${car.id}`)}>
                        <td className={'border-2 text-center'}>{car.brand} </td>
                        <td className={'border-2 text-center'}>{car.made} </td>
                        <td className={'border-2 text-center'}>{car.registered} </td>
                        <td className={'border-2 text-center'}>{car.owner} </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Bar data={data}/>
        </div>
    )
}