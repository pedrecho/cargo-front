import React from 'react';
import { Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/auth/auth-page";

import {Main} from "./pages/main/main";

import './App.css';
import {Library} from "./pages/library/library";
import {CreateBook} from "./pages/library/create-book";
import {BookPage} from "./pages/library/book-page";
import {Carpark} from "./pages/carpark/carpark";
import {CreateCar} from "./pages/carpark/create-car";
import {CarPage} from "./pages/carpark/car-page";
import {Cinema} from "./pages/cinema/cinema";
import {CreateMovie} from "./pages/cinema/create-movie";
import {MoviePage} from "./pages/cinema/movie-page";
import {Storage} from "./pages/storage/storage";
import {CreateDevice} from "./pages/storage/create-device";
import {DevicePage} from "./pages/storage/device-page";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path={'/'} element={<Main />}/>
          <Route path={'/auth'} element={<AuthPage />}/>
        <Route path={'/library'} element={<Library />}/>
        <Route path={'/carpark'} element={<Carpark />}/>
        <Route path={'/cinema'} element={<Cinema />}/>
        <Route path={'/storage'} element={<Storage />}/>
        <Route path={'/create-book'} element={<CreateBook />}/>
        <Route path={'/create-car'} element={<CreateCar />}/>
        <Route path={'/create-movie'} element={<CreateMovie />}/>
        <Route path={'/create-device'} element={<CreateDevice />}/>
          <Route path={'/book-page/:id'} element={<BookPage />} />
          <Route path={'/car-page/:id'} element={<CarPage />} />
          <Route path={'/movie-page/:id'} element={<MoviePage />} />
          <Route path={'/device-page/:id'} element={<DevicePage />} />
      </Routes>
    </div>
  );
}

export default App;
