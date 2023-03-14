import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Movie} from "./cinema";

export function CreateMovie(){

    const [movies, setMovies] = React.useState<Movie>({id: 0, name:'', studio: '', date: '', time: '', count: 0})

    const redirect = useNavigate()

    const addBook = () => {
        const res = axios({
            method: 'post',
            url: 'http://localhost:8082/movie',
            data: movies,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/cinema')
        }).catch((e) => redirect('/auth'))
    }

    return(
        <div className={'ml-4 mt-4 flex flex-col w-[200px] h-[300px]'}>
            <label>Название:</label>
            <input className={'border-2 rounded-md'} value={movies.name} onChange={(e) => setMovies({...movies, name: e.target.value})}/><br/>
            <label>Студия:</label>
            <input className={'border-2 rounded-md'} value={movies.studio} onChange={(e) => setMovies({...movies, studio: e.target.value})}/><br/>
            <label>Дата показа:</label>
            <input className={'border-2 rounded-md'} value={movies.date} onChange={(e) => setMovies({...movies, date: e.target.value})}/><br/>
            <label>Время показа:</label>
            <input className={'border-2 rounded-md'} value={movies.time} onChange={(e) => setMovies({...movies, time: e.target.value})}/><br/>
            <label>Кол-во билетов:</label>
            <input className={'border-2 rounded-md'} value={movies.count} onChange={(e) => setMovies({...movies, count: Number(e.target.value)})}/><br/>
            <button onClick={addBook}>Добавить фильм</button><br/>
        </div>
    )
}