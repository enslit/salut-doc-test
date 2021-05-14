import React from 'react';
import moment from 'moment';

function AppointmentCard({ appointment, onDelete }) {
  return (
    <li className="schedule__card">
      <div className="schedule__time">
        {moment(appointment.date).format('HH:mm')}
      </div>
      <div className="schedule__details">
        <h2 className="schedule__patient">{appointment.patient}</h2>
        {appointment.complaints && <div>{appointment.complaints}</div>}
      </div>
      <button
        className="schedule__delete"
        onClick={() => {
          onDelete(appointment._id);
        }}
      >
        <span className="material-icons">delete</span>
      </button>
    </li>
  );
}

export default AppointmentCard;
