import * as React from 'react'
import {redirect, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Conference} from "./conferences";

export function ConferencePage(){
    const {id} = useParams()
    const [conferences, setConferences] = React.useState<Conference>({
        id: 0,
        name: '',
        date: '',
        moderator: '',
        speaker: '',
    })

    const redirect = useNavigate()

    React.useEffect(() =>{
        const res = axios({
            method: 'get',
            url: `http://localhost:8080/conference/${id}`,
            headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        res.then((res) =>{
            setConferences(res.data)
        }).catch((e) => redirect('/auth'))
    }, [id])

    const deleteCargo = () => {
        axios({
            method: 'post',
            url: `http://localhost:8080/conference/${conferences.id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then(() =>
            redirect('/conferences')
        ).catch((e) => redirect('/auth'))
    }

    const saveCargo = () => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/conference`,
            data: conferences,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/conferences')
        }).catch((e) => redirect('/auth'))
    }

    return(
        <div>
            {conferences && (
                <div className={'w-[300px] border-2 mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
                    <label>Название конференции:</label>
                    <input className={'border-2 rounded-md'} value={conferences.name} onChange={(e) => setConferences({...conferences, name: e.target.value})}/><br/>
                    <label>Дата проведения:</label>
                    <input className={'border-2 rounded-md'} value={conferences.date} onChange={(e) => setConferences({...conferences, date: e.target.value})}/><br/>
                    <label>Модератор:</label>
                    <input className={'border-2 rounded-md'} value={conferences.moderator} onChange={(e) => setConferences({...conferences, moderator: e.target.value})}/><br/>
                    <label>Спикер:</label>
                    <input className={'border-2 rounded-md'} value={conferences.speaker} onChange={(e) => setConferences({...conferences, speaker: e.target.value})}/><br/>
                    <button onClick={saveCargo}>Сохранить</button>
                    <button onClick={deleteCargo}>Удалить</button>
                </div>
            )}
        </div>
    )

}