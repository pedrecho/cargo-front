import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Book} from "./library";

export function CreateBook(){

    const [book, setBook] = React.useState<Book>({id: 0,name:'', gave: '', publishing: '', returned: '', student: ''})

    const redirect = useNavigate()

    const addBook = () => {
        const res = axios({
            method: 'post',
            url: 'http://localhost:8080/book',
            data: book,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/library')
        }).catch((e) => redirect('/auth'))
    }

    return(
        <div className={'ml-4 mt-4 flex flex-col w-[200px] h-[300px]'}>
            <label>Название:</label>
            <input className={'border-2 rounded-md'} value={book.name} onChange={(e) => setBook({...book, name: e.target.value})}/><br/>
            <label>Издатель:</label>
            <input className={'border-2 rounded-md'} value={book.publishing} onChange={(e) => setBook({...book, publishing: e.target.value})}/><br/>
            <label>Выдано:</label>
            <input className={'border-2 rounded-md'} value={book.gave} onChange={(e) => setBook({...book, gave: e.target.value})}/><br/>
            <label>Вернули:</label>
            <input className={'border-2 rounded-md'} value={book.returned} onChange={(e) => setBook({...book, returned: e.target.value})}/><br/>
            <label>Студент:</label>
            <input className={'border-2 rounded-md'} value={book.student} onChange={(e) => setBook({...book, student: e.target.value})}/><br/>
            <button onClick={addBook}>Добавить книгу</button><br/>
        </div>
    )
}