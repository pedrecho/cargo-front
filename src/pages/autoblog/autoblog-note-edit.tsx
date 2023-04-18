import * as React from 'react'
import {AutoblogType} from "./autoblog-main";
import axios from "axios";
import {AxiosError} from "axios";
import {redirect} from "react-router-dom";


export interface AutoblogEditType {
    autoblog: AutoblogType;
    onChange: () => void;
}

export function AutoblogNoteEdit(props: AutoblogEditType) {

    const [note, setNote] = React.useState<AutoblogType>(props.autoblog)

    const createNote = () => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/autoblog/create`,
            data: note,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            props.onChange()
            note.name = ""
            note.content = ""
        }).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/autoblog')
            }})
    }

    const updateNote = () => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/autoblog/update`,
            data: note,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            props.onChange()
        }).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/autoblog')
            }})
    }

    const deleteNote = () => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/autoblog/delete/${note.id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            props.onChange()
        }).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/autoblog')
            }})
    }

    return (
        <div className={'w-[300px] border-2 mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
            <input value={note.name} onChange={(e) => setNote({...note, name: e.target.value})}
                   className={'text-center font-bold border-2 rounded-md'}/>
            <input value={note.content} onChange={(e) => setNote({...note, content: e.target.value})}
                   className={'border-2 rounded-md'}/>
            {note.publishedAt != null &&
                <p className={'text-right'}>Published at {note.publishedAt}</p>
            }
            {note.id == null ?
                <div className={'mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
                    <button className={'border-2 rounded-md'} onClick={createNote}>Создать</button>
                </div>
                :<div className={'mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
                    <button className={'border-2 rounded-md'} onClick={updateNote}>Сохранить</button>
                    <button className={'border-2 rounded-md'} onClick={deleteNote}>Удалить</button>
                </div>
            }
        </div>

    )
}

