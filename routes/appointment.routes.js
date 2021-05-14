const { Router } = require('express');
const router = Router();
const Appointment = require('../models/Appointment');

router.get('/', async (req, res) => {
  try {
    const currentDate = new Date();
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(1);
    nextMonth.setHours(0);
    nextMonth.setMinutes(0);
    nextMonth.setMinutes(0);

    const appointments = await Appointment.find({
      date: { $gte: currentDate, $lt: nextMonth },
    }).populate('doctor');
    return res.json(appointments);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { patient, dateTime, doctorId, complaints } = req.body;

    const appointment = new Appointment({
      patient,
      date: dateTime,
      doctor: doctorId,
      complaints,
    });
    await appointment.save();

    return res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    return appointment
      ? res.json({ data: appointment })
      : res.status(404).json({ error: 'Запись с указанным ID не найдена' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndRemove(req.params.id);
    return res.json({ appointment });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
