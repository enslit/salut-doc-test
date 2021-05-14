import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Form from './Form/Form';
import InputField from './Form/InputField';
import TimeSlot from './Form/TimeSlot';
import {
  getEndDayTime,
  getTomorrowTimestamp,
  normalizeTime,
} from '../utils/utils';
import { api } from '../utils/api';

function MakeAppointmentForm() {
  const [date, setDate] = useState(getTomorrowTimestamp());
  const [doctorId, setDoctorId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isFormReady, setIsFormReady] = useState(false);
  const [loadingAppointments, setLoadingAppointments] = useState(false);

  const handleChangeDate = (value) => {
    setDate(+moment(value).valueOf());
  };

  const timeSlots = (pickedDate) => {
    const startTime = normalizeTime(pickedDate);
    const endTime = getEndDayTime(pickedDate);

    const slots = [];

    // На каждой итерации добавляем 30 минут
    for (let i = startTime; i < endTime; i += 1000 * 60 * 30) {
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
        setDoctorId(null);
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
    if (doctorId && date) {
      setLoadingAppointments(true);
      api
        .getAppointments(date, doctorId)
        .then((appointments) => {
          setAppointments(appointments);
        })
        .catch((error) => console.error(error.message))
        .finally(() => setLoadingAppointments(false));
    }
  }, [date, doctorId]);

  useEffect(() => {
    api
      .getDoctors()
      .then((doctors) => {
        setDoctors(doctors);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsFormReady(true));
  }, []);

  return (
    <Form
      noValidate
      className="form"
      name="make-appointment"
      isFormReady={isFormReady}
      initFormValues={{
        patient: '',
        dateTime: '',
        doctorId: 0,
        complaints: {
          value: '',
          valid: true,
        },
      }}
      onSubmit={handleSubmit}
    >
      {(fields, { submitting, valid, handlers }) => {
        const handleChangeDoctor = (value, name, valid) => {
          setDoctorId(value);
          handlers.handleInput(value, name, valid);
        };

        return (
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
              className="input"
              required
              minLength={3}
              maxLength={50}
            />
            <InputField
              label="Врач"
              type="select"
              id="doctorId"
              name="doctorId"
              className="input"
              value={fields.doctorId.value}
              onChange={handleChangeDoctor}
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
            {doctorId && (
              <InputField
                type="date"
                label="Дата"
                id="date"
                name="date"
                className="input"
                value={moment(date).format('YYYY-MM-DD')}
                onChange={handleChangeDate}
                onBlur={handlers.handleBlur}
                required
                min={moment(getTomorrowTimestamp()).format('YYYY-MM-DD')}
              />
            )}
            {doctorId && date && (
              <InputField
                type="radio"
                label="Время"
                id="dateTime"
                name="dateTime"
                isLoading={loadingAppointments}
                loadingMessage="Загружается информация о наличии свободных интервалов"
                className={`input input_type_radio ${
                  loadingAppointments ? 'hidden' : ''
                }`}
                value={fields.dateTime.value}
                onChange={handlers.handleInput}
                onBlur={handlers.handleBlur}
                required
              >
                {(value, handleChange) => (
                  <div
                    className={`form__time-slots ${
                      loadingAppointments ? 'hidden' : ''
                    }`}
                  >
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
            )}
            {fields.dateTime.value && (
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
            )}
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
        );
      }}
    </Form>
  );
}

export default MakeAppointmentForm;
