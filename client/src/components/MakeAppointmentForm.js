import React, { useState } from 'react';
import moment from 'moment';
import Form from './Form/Form';
import InputField from './Form/InputField';
import TimeSlot from './Form/TimeSlot';
import { getEndDayTime, normalizeTime } from '../utils/utils';

function MakeAppointmentForm({ appointments, doctors, onMakeAppointment }) {
  const tomorrowDate = moment(new Date()).add(1, 'day').format('YYYY-MM-DD');
  const [date, setDate] = useState(tomorrowDate);

  const handleChangeDate = (value) => {
    setDate(value);
  };

  const timeSlots = (pickedDate) => {
    const timeNow = Date.now();
    const startTime = new Date(normalizeTime(pickedDate)).getTime();
    const endTime = getEndDayTime(pickedDate);

    const slots = [];

    // На каждой итерации добавляем 30 минут
    for (let i = startTime; i < endTime; i += 1000 * 60 * 30) {
      if (timeNow > i) {
        continue;
      }

      const isOccupied = appointments.some((appointment) => {
        const appointmentTime = new Date(appointment.date).getTime();
        return appointmentTime === i;
      });

      if (isOccupied) {
        continue;
      }

      slots.push(i);
    }

    return slots;
  };

  return (
    <Form
      noValidate
      className="form"
      name="make-appointment"
      initFormValues={{
        patient: '',
        dateTime: '',
        doctorId: 0,
        complaints: {
          value: '',
          valid: true,
        },
      }}
      onSubmit={onMakeAppointment}
    >
      {(fields, { submitting, valid, handlers }) => (
        <div className="form__container">
          <h1 className="form__title">Запись на прием</h1>
          <small className="form__rule-message">
            Поля отмеченные * являются обязательными для заполнения
          </small>
          <InputField
            label="ФИО"
            type="text"
            id="patient"
            name="patient"
            value={fields.patient.value}
            touched={fields.patient.touched}
            onChange={handlers.handleInput}
            onBlur={handlers.handleBlur}
            className="form__input"
            required
            minLength={3}
            maxLength={50}
          />
          <InputField
            label="Врач"
            type="select"
            id="doctorId"
            name="doctorId"
            className="form__input"
            value={fields.doctorId.value}
            onChange={handlers.handleInput}
            onBlur={handlers.handleBlur}
            required
          >
            <option value={0} disabled>
              Выберите специалиста
            </option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.lastName} {doctor.firstName} {doctor.secondName}
              </option>
            ))}
          </InputField>
          <InputField
            type="date"
            label="Дата"
            id="date"
            name="date"
            className="form__input"
            value={date}
            onChange={handleChangeDate}
            onBlur={handlers.handleBlur}
            required
            min={tomorrowDate}
          />
          <InputField
            type="radio"
            label="Время"
            id="dateTime"
            name="dateTime"
            className="form__input form__input_type_radio"
            value={fields.dateTime.value}
            onChange={handlers.handleInput}
            onBlur={handlers.handleBlur}
            required
          >
            {(value, handleChange) => (
              <div className="form__time-slots">
                {timeSlots(date).map((slot) => (
                  <TimeSlot
                    key={slot}
                    value={slot}
                    checked={Number(value) === Number(slot)}
                    onClick={handleChange}
                  />
                ))}
              </div>
            )}
          </InputField>
          <InputField
            label="Жалобы"
            type="textarea"
            id="complaints"
            name="complaints"
            className="form__textarea"
            value={fields.complaints.value}
            onChange={handlers.handleInput}
            onBlur={handlers.handleBlur}
          />
          <div className="form__element">
            <button
              type="submit"
              className={`form__submit ${
                !valid ? 'form__submit_disabled' : ''
              }`}
              disabled={submitting || !valid}
            >
              {submitting ? 'Отправка' : 'Отправить'}
            </button>
          </div>
        </div>
      )}
    </Form>
  );
}

export default MakeAppointmentForm;
