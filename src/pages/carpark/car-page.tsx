import * as React from 'react'
import {redirect, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Car} from "./carpark";


export function CarPage(){

    const { id } = useParams()

    const [car, setCar] = React.useState<Car>({id: 0,brand:'', made: 0, registered: '', owner: ''})

    const redirect = useNavigate()

    React.useEffect(() => {
        const res = axios({
            method: 'get',
            url: `http://localhost:8080/car/${id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            setCar(res.data)
        }).catch((e) => redirect('/auth'))
    }, [id])

    const deleteCar = () => {
        axios({
            method: 'post',
            url: `http://localhost:8080/car/${car.id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then(() =>
            redirect('/carpark')
        ).catch((e) => redirect('/auth'))
    }

    const saveCar = () => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/car`,
            data: car,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/carpark')
        }).catch((e) => redirect('/auth'))
    }

    return(
        <div>
            {car && (
                <div className={'w-[300px] border-2 mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
                    <label>Марка:</label>
                    <input className={'border-2 rounded-md'} value={car.brand} onChange={(e) => setCar({...car, brand: e.target.value})}/><br/>
                    <label>Год выпуска:</label>
                    <input className={'border-2 rounded-md'} value={car.made} onChange={(e) => setCar({...car, made: Number(e.target.value)})}/><br/>
                    <label>Зарегестрирована:</label>
                    <input className={'border-2 rounded-md'} value={car.registered} onChange={(e) => setCar({...car, registered: e.target.value})}/><br/>
                    <label>Владелец:</label>
                    <input className={'border-2 rounded-md'} value={car.owner} onChange={(e) => setCar({...car, owner: e.target.value})}/><br/>
                    <button onClick={saveCar}>Сохранить</button>
                    <button onClick={deleteCar}>Удалить</button>
                </div>
            )}
        </div>
    )
}