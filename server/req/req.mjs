import getTodayIsraelHour from "../functions/getTodayIsraelHour.js";
import { WorkDaySchema } from "../models/work-day.model.mjs";
import moment from 'moment-timezone';
import { authMiddleware } from "../middlewares/auth.mjs";


export default function registerRoutes(app) {

    app.get('/all-data', async (req, res) => {
        res.send(await WorkDaySchema.find());
    });

    app.get('/all-data/:date', async (req, res) => {
        try {
        const queryDate = new Date(req.params.date);

        const startOfDay = new Date(queryDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(queryDate);
        endOfDay.setHours(23, 59, 59, 999);

        const data = await WorkDaySchema.findOne({
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (data) {
            return res.status(200).send(data);
        } else {
            return res.status(404).send(null);
        }
        } catch (err) {
        res.status(500).send("Oops. An error occurred.");
        }
    });

    app.post('/add-data', authMiddleware, async (req, res) => {
        try {
        const info = req.body;
        const workDay = new WorkDaySchema({
            date: getTodayIsraelHour(),
            startWork: new Date(info.startWork),
            endWork: new Date(info.endWork),
            comment: info.comment,
            userId: req.userId
        });

        if (await WorkDaySchema.findOne({ date: workDay.date })) {
            return res.status(403).send("Work day already exists");
        };

        await workDay.save();
        res.send(workDay);
        } catch (err) {
        res.status(500).send(err);
        }
    });

    app.put('/edit-data/:date', async (req, res) => {
        try {
        const item = req.body;
        const workDay = {
            date: item.date,
            startWork: item.startWork,
            endWork: item.endWork,
            comment: item.comment,
        }

        const queryDate = new Date(req.params.date);
        const startOfDay = new Date(queryDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(queryDate);
        endOfDay.setHours(23, 59, 59, 999);

        const updatedWorkDay = await WorkDaySchema.findOneAndUpdate(
            { date: { $gte: startOfDay, $lte: endOfDay } },
            workDay,
            { new: true }
        );

        if (!updatedWorkDay) {
            return res.status(404).send("Work day not found");
        }

        res.send(updatedWorkDay);
        } catch (err) {
        res.status(500).send("Oops. An error occurred.");
        }
    });

    app.get('/data-this-month', authMiddleware, async (req, res) => {
        try {
        const startOfMonth = moment().tz('Asia/Jerusalem').startOf('month').toDate();
        const endOfMonth = moment().tz('Asia/Jerusalem').endOf('month').toDate();

        const workDays = await WorkDaySchema.find({
            date: {
            $gte: startOfMonth,
            $lte: endOfMonth,
            },
        });

        res.send(workDays);
        } catch (err) {
        console.error("Error getting current month data:", err.message);
        res.status(500).send("Server error while retrieving current month data");
        }
    });

    app.get('/data-range', async (req, res) => {
        try {
        const { start, end } = req.query;

        if (!start || !end) {
            return res.status(400).send('Missing start or end date');
        }

        const startDate = new Date(start);
        const endDate = new Date(end);

        const workDays = await WorkDaySchema.find({
            date: { $gte: startDate, $lte: endDate },
        });

        res.send(workDays);
        } catch (err) {
        console.error('Error getting range data:', err.message);
        res.status(500).send('Server error while retrieving data');
        }
    });

    app.post('/add-new-data', async (req, res) => {
        try {
        const info = req.body;
        const inputDate = new Date(info.date);
        const now = new Date();

        if (inputDate > now) {
            return res.status(403).send("תאריך עתידי אינו מותר");
        }

        const workDay = new WorkDaySchema({
            date: inputDate,
            startWork: new Date(info.startWork),
            endWork: new Date(info.endWork),
            comment: info.comment,
        });

        await workDay.save();
        res.send(workDay);
        } catch (err) {
        res.status(500).send(err);
        }
    });
}
