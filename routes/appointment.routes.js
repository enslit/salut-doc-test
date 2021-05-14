const { Router } = require('express');
const router = Router();
const Appointment = require('../models/Appointment');

router.get('/', async (req, res) => {
  try {
    const { timestamp, doctorId } = req.query;

    if (!timestamp) {
      return res.status(400).json({ error: 'Не передана метка времени' });
    }

    const date = new Date(+timestamp);
    const dateEnd = new Date(date);

    dateEnd.setHours(23);
    dateEnd.setMinutes(59);
    dateEnd.setSeconds(59);

    const appointments = await Appointment.find({
      date: { $gte: date, $lt: dateEnd },
      doctor: doctorId,
    })
      .populate('doctor')
      .sort({ date: 1 });
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
