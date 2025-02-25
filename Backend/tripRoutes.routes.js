import express from 'express';
import User from "./User.model.js"
import Trip from "./Trip.model.js"

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, text } = req.body;

        const newTrip = new Trip({ userId, text });
        await newTrip.save();

        const user = await User.findById(userId);
        if (user) {
            user.trips.push(newTrip._id);
            await user.save();
        }

        res.status(201).json(newTrip);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating trip' });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('trips');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.trips);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting user trips' });
    }
});

router.get('/:tripId', async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting trip' });
    }
});

router.delete('/:tripId', async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.tripId);

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        await User.updateOne(
            { trips: req.params.tripId },
            { $pull: { trips: req.params.tripId } }
        );

        res.status(200).json({ message: 'Trip deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting trip' });
    }
});

router.put('/:tripId', async (req, res) => {
    try {
        const { text, userId } = req.body;

        const updatedTrip = await Trip.findByIdAndUpdate(
            req.params.tripId,
            { text, userId },
            { new: true }
        );

        if (!updatedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(200).json(updatedTrip);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating trip' });
    }
});

export default router;