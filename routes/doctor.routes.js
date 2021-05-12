const { Router } = require('express');
const router = Router();
const Doctor = require('../models/Doctor');

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.json({ data: doctors });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { firstName, secondName, lastName } = req.body;

    const doctor = new Doctor({ firstName, secondName, lastName });
    await doctor.save();

    return res.status(201).json({ data: doctor });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    return doctor
      ? res.json({ data: doctor })
      : res.status(404).json({ error: 'Врач с указанным ID не найден' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
