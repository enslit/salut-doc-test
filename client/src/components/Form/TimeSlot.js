import React from 'react';

function TimeSlot({ value, onClick, checked }) {
  const date = new Date(value);
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return (
    <>
      <label
        htmlFor={`time-${value}`}
        className={`button-time ${checked ? 'button-time_active' : ''}`}
      >
        {hours}:{minutes}
      </label>
      <input
        type="radio"
        name="dateTime"
        value={value}
        checked={checked}
        id={`time-${value}`}
        onChange={onClick}
        className="input_type_radio"
      />
    </>
  );
}

export default TimeSlot;
