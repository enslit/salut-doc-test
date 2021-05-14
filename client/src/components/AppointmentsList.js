import React from 'react';
import AppointmentCard from './AppointmentCard';

function AppointmentsList({ appointments, handleClickDelete }) {
  if (appointments.length === 0) {
    return <h2>Записей нет</h2>;
  }

  return (
    <ul className="schedule">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment._id}
          appointment={appointment}
          onDelete={handleClickDelete}
        />
      ))}
    </ul>
  );
}

export default AppointmentsList;
