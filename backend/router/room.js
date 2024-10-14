import express from 'express';
import Room from '../models/room.js'; // Модель комнаты

const router = express.Router();

// Эндпоинт для поиска комнаты по названию
router.get('/', async (req, res) => {
  const { roomName } = req.query;

    try {
        let room = await Room.findOne({ name: roomName });
        if (room) {
            res.json({ roomId: room._id });
        } else {
            room = await new Room({
                name: roomName
            }).save()

            res.json({ roomId: room._id });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/name/:id', async (req, res) => {
  const { id } = req.params;

    try {
        let room = await Room.findById(id).select('name');
        if (room) {
            res.json({ roomName: room.name });
        } else {
            room = await new Room({
                name: roomName
            }).save()

            res.status(200).json({ roomId: room._id });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
