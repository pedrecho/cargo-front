import * as React from 'react'
import axios from "axios";
import {redirect} from "react-router-dom";
import {AutoblogNote} from "./autoblog-note";
import {AutoblogNoteEdit} from "./autoblog-note-edit";
import {Cargo} from "../cargo-traffic/cargo-traffic";

export interface AutoblogType {
    id?: number;
    name: string;
    content: string;
    publishedAt?: string;
}

export function Autoblog(){

    const [autoblog, setAutoblog] = React.useState<Array<AutoblogType>>([])
    const [initialAutoblog, setInitialAutoblog] = React.useState<Array<AutoblogType>>([])
    const [adminMode, setAdminMode] = React.useState<Boolean>(false)

    const [search, setSearch] = React.useState('')

    const [checkedName, setCheckedName] = React.useState(true);
    const [checkedContent, setCheckedContent] = React.useState(true);
    const [checkedPublishedAt, setCheckedPublishedAt] = React.useState(true);

    const searchAutoblog = () => {
        setAutoblog([...initialAutoblog.filter((a: AutoblogType) => {
            return (a.name?.includes(search) && checkedName) || (a.content?.includes(search) && checkedContent) || (a.publishedAt?.includes(search) && checkedPublishedAt)
        })])
    }

    const loadAutoblog = () => {
        const promise = axios({
            method: 'get',
            url: 'http://localhost:8080/autoblog',
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        promise.then((res) => {
            const data: Array<AutoblogType> = res.data
            data.forEach((e) => {
                e.publishedAt = e.publishedAt?.split('T').join(' ').split('.')[0]
            })
            data.sort(function compare( a, b ) {
                if (a.publishedAt == null) {
                    return 1
                }
                if (b.publishedAt == null) {
                    return -1
                }
                if ( a.publishedAt < b.publishedAt ){
                    return 1;
                }
                if ( a.publishedAt > b.publishedAt ){
                    return -1;
                }
                return 0;
            })
            setInitialAutoblog(data)
            setAutoblog(data)
        }).catch((e) => redirect('/auth'))
    }

    React.useEffect(() => {
        loadAutoblog()
    }, [])

    return (
        <div>
            {localStorage.getItem('decoded')?.includes('MANAGER') &&
                <div className={'p-[10px] border-2 bg-gray-200'}>
                    <button className={'bg-white border-2 box-border p-[10px]'}
                            onClick={() => setAdminMode(!adminMode)}>Перейти в режим администратора
                    </button>
                </div>
            }
            <div className={'flex flex-row items-center'}>
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                       className={'border-2 w-[150px] h-[30px] ml-4 rounded-md'}/>
                <button className={'ml-2 border-2 w-[100px] h-[30px]'}
                        onClick={searchAutoblog}>Поиск
                </button>
                <button className={'ml-2 border-2 w-[30px] h-[30px]'}
                        onClick={() => setAutoblog(initialAutoblog)}>X
                </button>
                <br/>
            </div>
            <div className={'border-2'}>
                <label>Поиск по: </label>
                <label> | Названию </label>
                <input type="checkbox"  checked={checkedName}
                       onChange={e => setCheckedName(e.target.checked)}/>
                <label> | Содержимому </label>
                <input type="checkbox" checked={checkedContent}
                       onChange={e => setCheckedContent(e.target.checked)}/>
                <label> | Дате и времени публикации </label>
                <input type="checkbox" checked={checkedPublishedAt}
                       onChange={e => setCheckedPublishedAt(e.target.checked)}/>
            </div>
            {adminMode &&
                <AutoblogNoteEdit autoblog={{
                    id: undefined,
                    name: "",
                    content: "",
                    publishedAt: undefined,
                }} onChange={loadAutoblog}/>
            }
            {!adminMode ?
                autoblog.map((note) => (
                    <AutoblogNote key={note.id} {...note}/>
                ))
                : autoblog.map((note) => (
                    <AutoblogNoteEdit key={note.id} {...{autoblog: note, onChange: loadAutoblog}}/>
                ))
            }
        </div>
    )
}