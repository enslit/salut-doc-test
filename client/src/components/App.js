import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import MakeAppointmentForm from './MakeAppointmentForm';
import Schedule from './Schedule';
import { api } from '../utils/api';

function App() {
  const [appReady, setAppReady] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const handleSubmit = (
    { patient, dateTime, doctorId, complaints },
    setSubmitting,
    resetForm,
    setMessage
  ) => {
    api
      .createAppointment({ patient, dateTime, doctorId, complaints })
      .then((appointment) => {
        setAppointments((prevState) => [...prevState, appointment]);
        setMessage('Вы успешно записались на прием');
        resetForm();
      })
      .catch((error) => {
        console.error(error.message);
        setMessage(`Ошибка отправки формы. ${error.message}`);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    Promise.all([api.getAppointments(), api.getDoctors()])
      .then(([appointments, doctors]) => {
        setAppointments(appointments);
        setDoctors(doctors);
      })
      .catch((error) => console.error(error))
      .finally(() => setAppReady(true));
  }, []);

  if (!appReady) {
    return (
      <div className="App">
        <h1>Загрузка...</h1>
      </div>
    );
  }

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
          <MakeAppointmentForm
            onMakeAppointment={handleSubmit}
            doctors={doctors}
            appointments={appointments}
          />
        </Route>
        <Route path="/schedule">
          <Schedule
            appointments={appointments}
            onDeleteAppointments={setAppointments}
          />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
