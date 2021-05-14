import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { api } from '../utils/api';
import AppointmentsList from './AppointmentsList';

function Schedule() {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState(Date.now());
  const [doctorId, setDoctorId] = useState(0);

  const handleClickDelete = (id) => {
    api.deleteAppointment(id).then(({ appointment }) => {
      setAppointments((prev) => {
        return prev.filter((a) => a._id !== appointment._id);
      });
    });
  };

  const handleChangeDate = (evt) => {
    const { value } = evt.target;
    setDate(new Date(value).getTime());
  };

  const handleChangeDoctor = (evt) => {
    setDoctorId(evt.target.value);
  };

  useEffect(() => {
    if (date && doctorId) {
      setLoading(true);
      api
        .getAppointments(date, doctorId)
        .then((appointments) => {
          if (appointments.error) {
            const err = new Error(appointments.error);
            return Promise.reject(err);
          }
          setAppointments(appointments);
        })
        .catch((error) => console.error(error.message))
        .finally(() => setLoading(false));
    }
  }, [date, doctorId]);

  useEffect(() => {
    setLoading(true);
    api
      .getDoctors()
      .then((doctors) => {
        setDoctors(doctors);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="appointments">
      <div className="filters">
        <select
          name="doctorId"
          id="doctorId"
          className="input"
          value={doctorId}
          onChange={handleChangeDoctor}
        >
          <option value="0" disabled>
            Выберите врача
          </option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.lastName} {doctor.firstName} {doctor.secondName}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="input"
          value={moment(date).format('YYYY-MM-DD')}
          onChange={handleChangeDate}
        />
      </div>
      {!doctorId ? (
        <h2>Выберите специалиста</h2>
      ) : loading ? (
        <h2>Записи загружаются</h2>
      ) : (
        <AppointmentsList
          appointments={appointments}
          handleClickDelete={handleClickDelete}
        />
      )}
    </div>
  );
}

export default Schedule;
