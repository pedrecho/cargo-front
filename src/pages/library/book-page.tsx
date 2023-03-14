import * as React from 'react'
import {redirect, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Book} from "./library";


export function BookPage(){

    const { id } = useParams()

    const [book, setBook] = React.useState<Book>({id: 0,name:'', gave: '', publishing: '', returned: '', student: ''})

    const redirect = useNavigate()

    React.useEffect(() => {
        const res = axios({
            method: 'get',
            url: `http://localhost:8082/book/${id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            setBook(res.data)
        }).catch((e) => redirect('/auth'))
    }, [id])

    const deleteBook = () => {
        axios({
            method: 'post',
            url: `http://localhost:8082/book/${book.id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then(() =>
            redirect('/library')
        ).catch((e) => redirect('/auth'))
    }

    const saveBook = () => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8082/book`,
            data: book,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/library')
        }).catch((e) => redirect('/auth'))
    }

    return(
        <div>
            {book && (
                <div className={'w-[300px] border-2 mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
                    <label>Название:</label>
                    <input className={'border-2 rounded-md mt-1'} value={book.name} onChange={(e) => setBook({...book, name: e.target.value})}/>
                    <label>Издатель:</label>
                    <input className={'border-2 rounded-md mt-1'} value={book.publishing} onChange={(e) => setBook({...book, publishing: e.target.value})}/>
                    <label>Выдано:</label>
                    <input className={'border-2 rounded-md mt-1'} value={book.gave} onChange={(e) => setBook({...book, gave: e.target.value})}/>
                    <label>Вернули:</label>
                    <input className={'border-2 rounded-md mt-1'} value={book.returned} onChange={(e) => setBook({...book, returned: e.target.value})}/>
                    <label>Студент:</label>
                    <input className={'border-2 rounded-md mt-1'} value={book.student} onChange={(e) => setBook({...book, student: e.target.value})}/>
                    <button onClick={saveBook}>Сохранить</button>
                    <button onClick={deleteBook}>Удалить</button>
                </div>
            )}
        </div>
    )
}