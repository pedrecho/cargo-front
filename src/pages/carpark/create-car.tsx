import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Car} from "./carpark";

export function CreateCar(){

    const [car, setCar] = React.useState<Car>({id: 0,brand:'', made: 0, registered: '', owner: ''})

    const redirect = useNavigate()

    const addBook = () => {
        const res = axios({
            method: 'post',
            url: 'http://localhost:8080/car',
            data: car,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/carpark')
        }).catch((e) => redirect('/auth'))
    }

    return(
        <div className={'ml-4 mt-4 flex flex-col w-[200px] h-[300px]'}>
            <label>Марка:</label>
            <input className={'border-2 rounded-md'} value={car.brand} onChange={(e) => setCar({...car, brand: e.target.value})}/><br/>
            <label>Год выпуска:</label>
            <input className={'border-2 rounded-md'} value={car.made} onChange={(e) => setCar({...car, made: Number(e.target.value)})}/><br/>
            <label>Зарегестрирована:</label>
            <input className={'border-2 rounded-md'} value={car.registered} onChange={(e) => setCar({...car, registered: e.target.value})}/><br/>
            <label>Владелец:</label>
            <input className={'border-2 rounded-md'} value={car.owner} onChange={(e) => setCar({...car, owner: e.target.value})}/><br/>
            <button onClick={addBook}>Добавить машину</button><br/>
        </div>
    )
}