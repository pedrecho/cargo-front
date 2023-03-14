import * as React from 'react'

import { useInput } from "./useInput";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function SignUp({changeStage}: {changeStage: React.Dispatch<React.SetStateAction<boolean>>}){

    const username = useInput()
    const password = useInput()
    const passwordConfirm = useInput()

    const redirect = useNavigate()

    const signUp = () => {
        const promise = axios({
            method: 'post',
            url: 'http://localhost:8080/signup',
            data: {username: username.value, password: password.value, passwordConfirm: passwordConfirm.value},
            headers: { "Content-Type": "multipart/form-data" },
        })
        promise.then((res) => {
            changeStage(true)
            // localStorage.setItem('token', res.data.token)
            // redirect('/')
        })
    }

    return(
        <div className={'w-[300px] h-[400px] border-2 flex flex-col rounded-md box-border p-[10px] m-auto mt-4'}>
            <p className={'text-[24px] text-center'}>Регистрация</p>
            <label>Логин</label>
            <input className={'w-full h-[40px] mt-2 rounded-md border-2'} {...username} />
            <label>Пароль</label>
            <input className={'w-full h-[40px] mt-2 rounded-md border-2'} {...password} />
            <label>Повторите пароль</label>
            <input className={'w-full h-[40px] mt-2 rounded-md border-2'} {...passwordConfirm} />
            <button className={'mt-4'} onClick={signUp}>Зарегистрироваться</button>
            <button className={'mt-2'} onClick={() => changeStage(true)}>Авторизация</button>
        </div>
    )
}