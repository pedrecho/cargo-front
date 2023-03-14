import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js";

export interface Book{
    id: number;
    name: string;
    publishing: string;
    gave: string;
    returned: string;
    student: string;
}

const DAYS = 7;

export function Library(){

    const redirect = useNavigate()
    const [books, setBooks] = React.useState<Array<Book>>([])
    const [initialBooks, setInitialBooks] = React.useState<Array<Book>>([])

    const [search, setSearch] = React.useState('')
    const [gist, setGist] = React.useState<any>([])

    React.useEffect(() => {
        const promise = axios({
            method: 'get',
            url: 'http://localhost:8082/book',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        promise.then((res) => {
            const newBooks: Array<Book> = [...res.data];
            setBooks(newBooks)
            setInitialBooks(newBooks)
        }).catch((e) => redirect('/auth'))
    }, [])

    const sort = (value: string) => {
        setBooks((state) => [...state.sort((a: any, b: any) => {
            if(a[value] > b[value]) return 1
            if(a[value] < b[value]) return -1
            return 0
        })])
    }


    const searchBook = () => {
        setBooks([...initialBooks.filter((a: Book) => {
            return a.name?.includes(search) || a.publishing?.includes(search) || a.gave?.includes(search) || a.returned?.includes(search) || a.student?.includes(search)
        })])
    }

    React.useEffect(() => {
        let arr: any[] = [];
        for(let i = 0; i < DAYS; i++){
            const day = new Date(Date.now()-86400000 * i);
            const yyyy = day.getFullYear();
            let mm = day.getMonth() + 1; // Months start at 0!
            let dd = day.getDate();
            let formattedToday = yyyy + '-';
            if (mm < 10){
                formattedToday += '0' + mm;
            }else{
                formattedToday += mm
            }
            formattedToday += '-'
            if (dd < 10){
                formattedToday += '0' + dd;
            }else{
                formattedToday += dd;
            }
            let count = 0;
            for(let j = 0; j < initialBooks.length; j++){
                // @ts-ignore
                if(initialBooks[j].gave == formattedToday){
                    count++;
                }
            }
            arr.push({date: formattedToday, count})
        }
        setGist(arr)
    }, [initialBooks])

    const labels = [...gist.map((el) => el.date)].reverse();
    const data = {
        labels: labels,
        datasets: [
            {
                label: `Книги за последние ${DAYS} дней`,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [...gist.map((el) => el.count)].reverse(),
            },
        ],
    };

    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    return(
        <div className={'mt-4 ml-4 flex flex-col'}>
            <div className={'flex flex-row items-center'}>
                <button className={'border-2 box-border p-[10px] w-[150px]'} onClick={() => redirect('/create-book')}>Создать книгу</button>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className={'border-2 w-[150px] h-[30px] ml-4 rounded-md'}/>
                <button className={'ml-2 border-2 w-[100px] h-[30px]'} onClick={searchBook}>Поиск</button>
                <button className={'ml-2 border-2 w-[30px] h-[30px]'} onClick={() => setBooks(initialBooks)}>X</button>
            </div>
            <p>Количество книг: {books.length}</p>
            <table className={'border-2 mt-4'}>
                <thead>
                    <th className={'border-2'} onClick={() => sort('name')}>Имя</th>
                    <th className={'border-2'} onClick={() => sort('publishing')}>Издательство</th>
                    <th className={'border-2'} onClick={() => sort('gave')}>Выдано</th>
                    <th className={'border-2'} onClick={() => sort('returned')}>Вернули</th>
                    <th className={'border-2'} onClick={() => sort('student')}>Студент</th>
                </thead>
                <tbody>
                    {books.map((book: Book) => (
                        <tr className={'border-2'} key={book.id} onClick={() => redirect(`/book-page/${book.id}`)}>
                            <td className={'border-2 text-center'}>{book.name} </td>
                            <td className={'border-2 text-center'}>{book.publishing} </td>
                            <td className={'border-2 text-center'}>{book.gave} </td>
                            <td className={'border-2 text-center'}>{book.returned} </td>
                            <td className={'border-2 text-center'}>{book.student}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Bar data={data}/>
        </div>
    )
}