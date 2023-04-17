import React from 'react';
import {Route, Routes} from "react-router-dom";
import {AuthPage} from "./pages/auth/auth-page";

import {Main} from "./pages/main/main";

import './App.css';


import {CargoTraffic} from "./pages/cargo-traffic/cargo-traffic";
import {CreateCargo} from "./pages/cargo-traffic/create-cargo";
import {CargoPage} from "./pages/cargo-traffic/cargo-page";
import {Autoblog} from "./pages/autoblog/autoblog-main";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path={'/'} element={<Main />}/>
          <Route path={'/auth'} element={<AuthPage />}/>
          <Route path={'/cargo-traffic'} element={<CargoTraffic />}/>
          <Route path={'/create-cargo'} element={<CreateCargo />}/>
          <Route path={'/cargo-page/:id'} element={<CargoPage />} />
          <Route path={'/autoblog'} element={<Autoblog />} />
      </Routes>
    </div>
  );
}

export default App;
