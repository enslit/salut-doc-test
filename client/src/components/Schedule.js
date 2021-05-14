import React from 'react';
import moment from 'moment';
import { api } from '../utils/api';

function Schedule({ appointments, onDeleteAppointments }) {
  const handleClickDelete = (id) => {
    api.deleteAppointment(id).then(({ appointment }) => {
      onDeleteAppointments((prev) => {
        return prev.filter((a) => a._id !== appointment._id);
      });
    });
  };

  return (
    <div>
      <ul>
        {appointments.map((app) => (
          <li key={app._id}>
            <div>Пациент: {app.patient}</div>
            <div>Дата и время: {moment(app.date).format('DD MMMM HH:MM')}</div>
            <div>Врач: {app.doctor.lastName}</div>
            <div>Жалобы: {app.complaints}</div>
            <button
              onClick={() => {
                handleClickDelete(app._id);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Schedule;
