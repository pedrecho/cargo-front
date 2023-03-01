import * as React from 'react'
import {redirect, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Device} from "./storage";


export function DevicePage(){

    const { id } = useParams()

    const [devices, setDevices] = React.useState<Device>({id: 0,type:'', party:'', importation: '', exportation: '', driver:''})

    const redirect = useNavigate()

    React.useEffect(() => {
        const res = axios({
            method: 'get',
            url: `http://localhost:8080/device/${id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            setDevices({...res.data, registered: time(res.data.registered)})
        }).catch((e) => redirect('/auth'))
    }, [id])

    const time = (value: string) => {
        return value?.slice(0, 10)
    }

    const deleteDevice = () => {
        axios({
            method: 'post',
            url: `http://localhost:8080/device/${devices.id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then(() =>
            redirect('/storage')
        ).catch((e) => redirect('/auth'))
    }

    const saveDevice = () => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/device`,
            data: devices,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/storage')
        }).catch((e) => redirect('/auth'))
    }

    return(
        <div>
            {devices && (
                <div className={'w-[300px] border-2 mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
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
                    <button onClick={saveDevice}>Сохранить</button>
                    <button onClick={deleteDevice}>Удалить</button>
                </div>
            )}
        </div>
    )
}