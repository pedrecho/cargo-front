import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Device} from "./storage";

export function CreateDevice(){

    const [devices, setDevices] = React.useState<Device>({id: 0, type:'', party: '', importation: '', exportation: '', driver: ''})

    const redirect = useNavigate()

    const addDevice= () => {
        const res = axios({
            method: 'post',
            url: 'http://localhost:8080/device',
            data: devices,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/storage')
        }).catch((e) => redirect('/auth'))
    }

    return(
        <div className={'ml-4 mt-4 flex flex-col w-[200px] h-[300px]'}>
            <label>Тип:</label>
            <input className={'border-2 rounded-md'} value={devices.type} onChange={(e) => setDevices({...devices, type: e.target.value})}/><br/>
            <label>Группа:</label>
            <input className={'border-2 rounded-md'} value={devices.party} onChange={(e) => setDevices({...devices, party: e.target.value})}/><br/>
            <label>Ввоз:</label>
            <input className={'border-2 rounded-md'} value={devices.importation} onChange={(e) => setDevices({...devices, importation: e.target.value})}/><br/>
            <label>Вывоз:</label>
            <input className={'border-2 rounded-md'} value={devices.exportation} onChange={(e) => setDevices({...devices, exportation: e.target.value})}/><br/>
            <label>Водитель:</label>
            <input className={'border-2 rounded-md'} value={devices.driver} onChange={(e) => setDevices({...devices, driver: e.target.value})}/><br/>
            <button onClick={addDevice}>Добавить фильм</button><br/>
        </div>
    )
}