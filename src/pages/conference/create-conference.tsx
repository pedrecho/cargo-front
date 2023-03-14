import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Conference} from "./conferences";

export function CreateConference(){
    const [conferences, setConferences] = React.useState<Conference>({
        id: 0,
        name: '',
        date: '',
        moderator: '',
        speaker: '',
    })

    const redirect = useNavigate()

    const addBarberClient= ()=>{
        const res = axios({
            method: 'post',
            url: 'http://localhost:8080/conference',
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
                    <button onClick={addBarberClient}>Создать</button>
                </div>
            )}
        </div>
    )
}