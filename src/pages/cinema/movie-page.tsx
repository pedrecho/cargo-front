import * as React from 'react'
import {redirect, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Movie} from "./cinema";


export function MoviePage(){

    const { id } = useParams()

    const [movies, setMovies] = React.useState<Movie>({id: 0,name:'', studio:'', date: '', time: '', count:0})

    const redirect = useNavigate()

    React.useEffect(() => {
        const res = axios({
            method: 'get',
            url: `http://localhost:8080/movie/${id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            setMovies({...res.data, registered: time(res.data.registered)})
        }).catch((e) => redirect('/auth'))
    }, [id])

    const time = (value: string) => {
        return value?.slice(0, 10)
    }

    const deleteBook = () => {
        axios({
            method: 'post',
            url: `http://localhost:8080/movie/${movies.id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then(() =>
            redirect('/cinema')
        ).catch((e) => redirect('/auth'))
    }

    const saveBook = () => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/movie`,
            data: movies,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/cinema')
        }).catch((e) => redirect('/auth'))
    }

    return(
        <div>
            {movies && (
                <div className={'w-[300px] border-2 mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
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
                    <button onClick={saveBook}>Сохранить</button>
                    <button onClick={deleteBook}>Удалить</button>
                </div>
            )}
        </div>
    )
}