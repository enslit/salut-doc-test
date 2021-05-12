const { Router } = require('express');
const router = Router();
const Appointment = require('../models/Appointment');

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    return res.json({ data: appointments });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { firstName, secondName, lastName, date, doctor, complaints } =
      req.body;

    const appointment = new Appointment({
      firstName,
      secondName,
      lastName,
      date,
      doctor,
      complaints,
    });
    await appointment.save();

    return res.status(201).json({ data: appointment });
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

module.exports = router;
