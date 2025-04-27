import { app } from "../app.mjs";
import getTodayIsraelHour from "../functions/getTodayIsraelHour.js";
import { WorkDaySchema } from "../models/work-day.model.mjs";
// import moment from 'moment';

app.get('/all-data', async(req, res) => {
    res.send(await WorkDaySchema.find())
});


app.get('/all-data/:date', async (req, res) => {
        const queryDate = new Date(req.params.date);

    try {
        const data = await WorkDaySchema.findOne({ date: queryDate });

        if (!data) {
            return res.status(404).send("Date not found");
        }

        res.send(data);
    } catch (err) {
        res.status(500).send("Oops. An error occurred.");
    }
});


app.post('/add-data', async(req, res) => {
    try {
        const info = req.body;
        const workDay = new WorkDaySchema({
            date: getTodayIsraelHour(),
            startWork: new Date(info.startWork),
            endWork: new Date(info.endWork),
            comment: info.comment,
        });
        console.log(workDay);
        
    
        if (await WorkDaySchema.findOne({ date: workDay.date })) {
            return res.status(403).send("Work day already exists");
        };
        await workDay.save();
        res.send(workDay);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/edit-data/:date', async(req, res) => {
    try {
        const item = req.body;
        const workDay = {
            date: item.date,
            startWork: item.startWork,
            endWork: item.endWork,
            comment: item.comment,
        }

        const queryDate = new Date(req.params.date);

        // const updatedWorkDay = await WorkDaySchema.findOneAndUpdate({ date: queryDate }, workDay, { new: true });


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