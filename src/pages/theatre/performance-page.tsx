import * as React from 'react'
import {redirect, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Performance} from "./theatre";


export function PerformancePage(){

    const { id } = useParams()

    const [performances, setPerformances] = React.useState<Performance>({id: 0,name:'', producer:'', date: '', time: '', count:0})

    const redirect = useNavigate()

    React.useEffect(() => {
        const res = axios({
            method: 'get',
            url: `http://localhost:8080/performances/${id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            setPerformances({...res.data, registered: time(res.data.registered)})
        }).catch((e) => redirect('/auth'))
    }, [id])

    const time = (value: string) => {
        return value?.slice(0, 10)
    }

    const deleteBook = () => {
        axios({
            method: 'post',
            url: `http://localhost:8080/performances/${performances.id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then(() =>
            redirect('/cinema')
        ).catch((e) => redirect('/auth'))
    }

    const saveBook = () => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/performances`,
            data: performances,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/thetre')
        }).catch((e) => redirect('/auth'))
    }

    return(
        <div>
            {performances && (
                <div className={'w-[300px] border-2 mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
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
                    <button onClick={saveBook}>Сохранить</button>
                    <button onClick={deleteBook}>Удалить</button>
                </div>
            )}
        </div>
    )
}