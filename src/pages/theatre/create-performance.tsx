import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Performance} from "./theatre";

export function CreatePerformance(){

    const [performances, setPerformances] = React.useState<Performance>({id: 0, name:'', producer: '', date: '', time: '', count: 0})

    const redirect = useNavigate()

    const addBook = () => {
        const res = axios({
            method: 'post',
            url: 'http://localhost:8080/performances',
            data: performances,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/theatre')
        }).catch((e) => redirect('/auth'))
    }

    return(
        <div className={'ml-4 mt-4 flex flex-col w-[200px] h-[300px]'}>
            <label>Название:</label>
            <input className={'border-2 rounded-md'} value={performances.name} onChange={(e) => setPerformances({...performances, name: e.target.value})}/><br/>
            <label>Режиссер-постановщик:</label>
            <input className={'border-2 rounded-md'} value={performances.producer} onChange={(e) => setPerformances({...performances, producer: e.target.value})}/><br/>
            <label>Дата показа:</label>
            <input className={'border-2 rounded-md'} value={performances.date} onChange={(e) => setPerformances({...performances, date: e.target.value})}/><br/>
            <label>Время показа:</label>
            <input className={'border-2 rounded-md'} value={performances.time} onChange={(e) => setPerformances({...performances, time: e.target.value})}/><br/>
            <label>Кол-во билетов:</label>
            <input className={'border-2 rounded-md'} value={performances.count} onChange={(e) => setPerformances({...performances, count: Number(e.target.value)})}/><br/>
            <button onClick={addBook}>Добавить спектакль</button><br/>
        </div>
    )
}