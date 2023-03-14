import * as React from 'react'
import {redirect, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {BarberClient} from "./barbershop";

export function BarberClientPage(){
    const {id} = useParams()
    const [barberClients, setBarberClients] = React.useState<BarberClient>({
        id: 0,
        name: '',
        appointment: '',
        service: '',
        master: '',
    })

    const redirect = useNavigate()

    React.useEffect(() =>{
        const res = axios({
            method: 'get',
            url: `http://localhost:8080/barbershop/${id}`,
            headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        res.then((res) =>{
            setBarberClients(res.data)
        }).catch((e) => redirect('/auth'))
    }, [id])

    const deleteCargo = () => {
        axios({
            method: 'post',
            url: `http://localhost:8080/barbershop/${barberClients.id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then(() =>
            redirect('/barbershop')
        ).catch((e) => redirect('/auth'))
    }

    const saveCargo = () => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/barbershop`,
            data: barberClients,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/barbershop')
        }).catch((e) => redirect('/auth'))
    }

    return(
        <div>
            {barberClients && (
                <div className={'w-[300px] border-2 mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
                    <label>Имя клиента:</label>
                    <input className={'border-2 rounded-md'} value={barberClients.name} onChange={(e) => setBarberClients({...barberClients, name: e.target.value})}/><br/>
                    <label>Дата записи:</label>
                    <input className={'border-2 rounded-md'} value={barberClients.appointment} onChange={(e) => setBarberClients({...barberClients, appointment: e.target.value})}/><br/>
                    <label>Услуга:</label>
                    <input className={'border-2 rounded-md'} value={barberClients.service} onChange={(e) => setBarberClients({...barberClients, service: e.target.value})}/><br/>
                    <label>Мастер:</label>
                    <input className={'border-2 rounded-md'} value={barberClients.master} onChange={(e) => setBarberClients({...barberClients, master: e.target.value})}/><br/>
                    <button onClick={saveCargo}>Сохранить</button>
                    <button onClick={deleteCargo}>Удалить</button>
                </div>
            )}
        </div>
    )

}