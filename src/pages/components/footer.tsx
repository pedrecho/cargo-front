import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import "./footer.css";

export function Footer() {
    const redirect = useNavigate();

    return (

        <footer className="footer py-3 bg-light">
            <div className="container links">
                <hr/>
                <span>
            <ul >
                <li><a onClick={() => redirect('/')}>Главная страница</a></li>
                <li><a onClick={() => redirect('/cargo-traffic')}>Страница грузов</a></li>
                <li><a onClick={() => redirect('/auth')}>Выйти</a></li>
                {
                    ((localStorage.getItem('decoded')?.includes('MANAGER'))) &&
                    <ul>
                        <li><a onClick={() => redirect('/create-cargo')}>Создать груз</a></li>
                    </ul>
                }
            </ul>
                    <ul className="social-icons">
  <li><a className="social-icon-dzen" href="https://dzen.ru/id/623c70ac866e9a29f1b5eb1a" title="..." target="_blank" rel="noopener"></a></li>
  <li><a className="social-icon-telegram" href="https://web.telegram.org/k/" title="..." target="_blank" rel="noopener"></a></li>
  <li><a className="social-icon-youtube" href="https://www.youtube.com/@teelxp" title="..." target="_blank" rel="noopener"></a></li>
</ul>


          <p><a href="http://www.fa.ru/en/Pages/Home.aspx">© FINANCIAL UNIVERSITY</a></p>


        </span>
            </div>
        </footer>
    );

}