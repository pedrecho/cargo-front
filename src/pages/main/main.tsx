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
        localStorage.clear();
        redirect('/auth');
    }

    return(
        <>
            <div className={'flex flex-row w-full gap-[10px] mt-4 ml-4'}>
                <button className={'border-2 box-border p-[10px]'} onClick={() => redirect('/library')}>Библиотека</button>
                <button className={'border-2 box-border p-[10px]'} onClick={() => redirect('/carpark')}>Автопарк</button>
                <button className={'border-2 box-border p-[10px]'} onClick={() => redirect('/cinema')}>Кинотеатр</button>
                <button className={'border-2 box-border p-[10px]'} onClick={() => redirect('/storage')}>Склад магазина техники</button>
                <button className={'border-2 box-border p-[10px]'} onClick={exit}>Выйти</button>
            </div>
        </>
    )
}