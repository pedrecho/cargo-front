import * as React from 'react'
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {Cargo} from "./cargo-traffic";
import {Footer} from "../components/footer";

export function CreateCargo(){
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

    const addCargo= ()=>{
        const res = axios({
            method: 'post',
                url: 'http://localhost:8080/cargo',
                data: cargos,
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },

        })
        res.then((res) => {
            redirect('/cargo-traffic')
        }).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/cargo-traffic')
            }})
    }

    return(
        <div className={'ml-4 mt-4 flex flex-col w-[200px] h-[300px]'}>
            <label>Название:</label>
            <input  placeholder={"Тумбочка"} className={'border-2 rounded-md'} value={cargos.name} onChange={(e) => setCargos({...cargos, name: e.target.value})}/><br/>
            <label>Содержимое:</label>
            <input  placeholder={"Четыре угла"} className={'border-2 rounded-md'} value={cargos.content} onChange={(e) => setCargos({...cargos, content: e.target.value})}/><br/>
            <label>Город отправки:</label>
            <input placeholder={"Пенза"} className={'border-2 rounded-md'} value={cargos.cityFrom} onChange={(e) => setCargos({...cargos, cityFrom: e.target.value})}/><br/>
            <label>Город прибытия:</label>
            <input placeholder={"Москва"} className={'border-2 rounded-md'} value={cargos.cityTo} onChange={(e) => setCargos({...cargos, cityTo: e.target.value})}/><br/>
            <label>Дата отправки:</label>
            <input placeholder={"2022-04-15"} className={'border-2 rounded-md'} value={cargos.dateFrom} onChange={(e) => setCargos({...cargos, dateFrom: e.target.value})}/><br/>
            <label>Дата прибытия:</label>
            <input  placeholder={"2023-04-15"} className={'border-2 rounded-md'} value={cargos.dateTo} onChange={(e) => setCargos({...cargos, dateTo: e.target.value})}/><br/>
            <button onClick={addCargo}>Добавить груз</button><br/>
        <Footer/>
        </div>
    )
}