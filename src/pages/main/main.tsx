import * as React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Main(){

    const redirect = useNavigate()

    React.useEffect(() => {
        if (localStorage.getItem('token') === null) {
            redirect('/auth');
        }
    }, [])

    const exit = () => {
        redirect('/auth');
    }

    return(
        <>
            <div className={'flex flex-row w-full gap-[10px] mt-4 ml-4'}>
                <button className={'border-2 box-border p-[10px]'} onClick={() => redirect('/cargo-traffic')}>Перевозка грузов</button>
                <button className={'border-2 box-border p-[10px]'} onClick={exit}>Выйти</button>
            </div>
        </>
    )
}