import * as React from 'react'

import { useInput } from "./useInput";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export function SignIn({changeStage}: {changeStage: React.Dispatch<React.SetStateAction<boolean>>}){

    const username = useInput()
    const password = useInput()

    const redirect = useNavigate()

    const signIn = () => {
        const promise = axios({
            method: 'post',
            url: 'http://localhost:8080/login',
            data: {username: username.value, password: password.value},
            headers: { "Content-Type": "multipart/form-data" },
        })
        promise.then((res) => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('decoded', window.atob(res.data.token.split(".")[1]))
            redirect('/')
        })
    }


    return(
        <div className={'w-[300px] h-[400px] border-2 flex flex-col rounded-md box-border p-[10px] m-auto mt-4'}>
            <p className={'text-[24px] text-center'}>Авторизация</p>
            <label>Логин</label>
            <input className={'w-full h-[40px] mt-2 rounded-md border-2'} {...username} />
            <label>Пароль</label>
            <input className={'w-full h-[40px] mt-2 rounded-md border-2'} {...password} />
            <button className={'mt-4'} onClick={signIn}>Войти</button>
            <button className={'mt-2'} onClick={() => changeStage(false)}>Зарегистрироваться</button>
        </div>
    )
}