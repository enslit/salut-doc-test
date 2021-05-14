import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import MakeAppointmentForm from './MakeAppointmentForm';
import Schedule from './Schedule';

function App() {
  return (
    <div className="App">
      <ul className="nav">
        <li className="nav__item">
          <NavLink
            to="/"
            exact
            className="nav__link"
            activeClassName="nav__link_active"
          >
            Запись
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/schedule"
            className="nav__link"
            activeClassName="nav__link_active"
          >
            Расписание
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route path="/" exact>
          <MakeAppointmentForm />
        </Route>
        <Route path="/schedule">
          <Schedule />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
