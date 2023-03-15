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


import {Cargo, CargoTraffic} from "./pages/cargo-traffic/cargo-traffic";
import {CreateCargo} from "./pages/cargo-traffic/create-cargo";
import {CargoPage} from "./pages/cargo-traffic/cargo-page";
import {BarberShop} from "./pages/barbershop/barbershop";
import {BarberClientPage} from "./pages/barbershop/barberclient-page";
import {CreateBarberClient} from "./pages/barbershop/create-barberclient";
import {Conferences} from "./pages/conference/conferences";
import {CreateConference} from "./pages/conference/create-conference";
import {ConferencePage} from "./pages/conference/conference-page";
import {Theatre} from "./pages/theatre/theatre";
import {CreatePerformance} from "./pages/theatre/create-performance";
import {PerformancePage} from "./pages/theatre/performance-page";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path={'/'} element={<Main />}/>
          <Route path={'/auth'} element={<AuthPage />}/>
        <Route path={'/library'} element={<Library />}/>
        <Route path={'/carpark'} element={<Carpark />}/>
        <Route path={'/cinema'} element={<Cinema />}/>
        <Route path={'/theatre'} element={<Theatre />}/>
        <Route path={'/storage'} element={<Storage />}/>
          <Route path={'/cargo-traffic'} element={<CargoTraffic />}/>
          <Route path={'/barbershop'} element={<BarberShop />}/>
          <Route path={'/conferences'} element={<Conferences />}/>
        <Route path={'/create-book'} element={<CreateBook />}/>
        <Route path={'/create-car'} element={<CreateCar />}/>
        <Route path={'/create-movie'} element={<CreateMovie />}/>
        <Route path={'/create-performance'} element={<CreatePerformance />}/>
        <Route path={'/create-device'} element={<CreateDevice />}/>
          <Route path={'/create-cargo'} element={<CreateCargo />}/>
          <Route path={'/create-barberclient'} element={<CreateBarberClient />}/>
          <Route path={'/create-conference'} element={<CreateConference />}/>
          <Route path={'/book-page/:id'} element={<BookPage />} />
          <Route path={'/car-page/:id'} element={<CarPage />} />
          <Route path={'/movie-page/:id'} element={<MoviePage />} />
          <Route path={'/performance-page/:id'} element={<PerformancePage />} />
          <Route path={'/device-page/:id'} element={<DevicePage />} />
          <Route path={'/cargo-page/:id'} element={<CargoPage />} />
          <Route path={'/barberclient-page/:id'} element={<BarberClientPage />} />
          <Route path={'/conference-page/:id'} element={<ConferencePage />} />
      </Routes>
    </div>
  );
}

export default App;
