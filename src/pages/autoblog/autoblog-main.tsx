import * as React from 'react'
import axios from "axios";
import {redirect} from "react-router-dom";
import {AutoblogNote} from "./autoblog-note";

export interface AutoblogType {
    id: number;
    name: string;
    content: string;
    publishedAt: string;
    author: string;
}

export function Autoblog(){

    const [autoblog, setAutoblog] = React.useState<Array<AutoblogType>>([])
    const [initialAutoblog, setInitialAutoblog] = React.useState<Array<AutoblogType>>([])
    const [adminMode, setAdminMode] = React.useState<Boolean>()

    React.useEffect(() => {
        const promise = axios({
            method: 'get',
            url: 'http://localhost:8080/autoblog',
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        promise.then((res) => {
            setAutoblog(res.data)
            setInitialAutoblog(res.data)
        }).catch((e) => redirect('/auth'))
    }, [])

    return (
        <div>
            <div className={'p-[10px] border-2 bg-gray-200'}>
                <button className={'bg-white border-2 box-border p-[10px]'}
                        onClick={() => setAdminMode(!adminMode)}>Перейти в режим администратора
                </button>
            </div>
            {adminMode &&
                autoblog.map((note) => (
                    <AutoblogNote {...note}/>
                ))
            }
        </div>
    )
}