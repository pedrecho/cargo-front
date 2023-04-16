import * as React from 'react'
import {redirect, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Cargo} from "./cargo-traffic";

export function CargoPage(){
    const {id} = useParams()
    const [cargos, setCargos] = React.useState<Cargo>({
        id: 0,
        name: '',
        content: '',
        cityFrom: '',
        cityTo: '',
        dateFrom: '',
        dateTo: ''
    })

    const redirect = useNavigate()

    React.useEffect(() =>{
        const res = axios({
                method: 'get',
                url: `http://localhost:8080/cargo/${id}`,
                headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}`},
            })
        res.then((res) =>{
            setCargos({...res.data, registered: time(res.data.registered)})
        }).catch((e) => redirect('/cargo-page'))
    }, [id])

    const time = (value: string) => {
        return value?.slice(0, 10)
    }

    const deleteCargo = () => {
        axios({
            method: 'post',
            url: `http://localhost:8080/cargo/${cargos.id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then(() =>
            redirect('/cargo-traffic')
        ).catch((e) =>{
            alert("Неправильное заполнение");
        })
    }

    const saveCargo = () => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/cargo`,
            data: cargos,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/cargo-traffic')
        }).catch((e) => alert("Неправильное заполнение"))
    }

    return(
        <div>
            {cargos && (
                <div className={'w-[300px] border-2 mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
                    <label>Название:</label>
                    <input  className={'border-2 rounded-md'} value={cargos.name} onChange={(e) => setCargos({...cargos, name: e.target.value})}/><br/>
                    <label>Содержимое:</label>
                    <input  className={'border-2 rounded-md'} value={cargos.content} onChange={(e) => setCargos({...cargos, content: e.target.value})}/><br/>
                    <label>Город отправки:</label>
                    <input  className={'border-2 rounded-md'} value={cargos.cityFrom} onChange={(e) => setCargos({...cargos, cityFrom: e.target.value})}/><br/>
                    <label>Город прибытия:</label>
                    <input  className={'border-2 rounded-md'} value={cargos.cityTo} onChange={(e) => setCargos({...cargos, cityTo: e.target.value})}/><br/>
                    <label>Дата отправки:</label>
                    <input  className={'border-2 rounded-md'} value={cargos.dateFrom} onChange={(e) => setCargos({...cargos, dateFrom: e.target.value})}/><br/>
                    <label>Дата прибытия:</label>
                    <input  className={'border-2 rounded-md'} value={cargos.dateTo} onChange={(e) => setCargos({...cargos, dateTo: e.target.value})}/><br/>
                    <button onClick={saveCargo}>Сохранить</button>
                    <button onClick={deleteCargo}>Удалить</button>
                </div>
            )}
        </div>
    )

}