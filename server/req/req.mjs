import getTodayIsraelHour from "../functions/getTodayIsraelHour.js";
import { WorkDaySchema } from "../models/work-day.model.mjs";
import moment from 'moment-timezone';
import { authMiddleware } from "../middlewares/auth.mjs";


export default function registerRoutes(app) {

    app.get('/all-data', async (req, res) => {
        res.send(await WorkDaySchema.find());
    });

app.get('/all-data/:date', authMiddleware, async (req, res) => {
    try {
    const queryDate = new Date(req.params.date);

    const startOfDay = new Date(queryDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(queryDate);
    endOfDay.setHours(23, 59, 59, 999);

    const data = await WorkDaySchema.findOne({
        userId: req.userId, // 🛡️ שליפה רק של הנתונים של המשתמש
        date: { $gte: startOfDay, $lte: endOfDay }
    });

        if (data) {
        return res.status(200).send(data);
        } else {
        return res.status(404).send(null);
        }

    } catch (err) {
        console.error("Error fetching data for date:", err.message);
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
            userId: req.userId, // ✨ הסינון לפי המשתמש המחובר
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



    
    // app.post('/add-new-data', async (req, res) => {
    //     try {
    //         // אני רוצה שInfo יכיל את כל הנתונים uןמכןId יכיל את הנתונים של הId

    //     const info = {startWork: req.startWork, endWork: req.endWork, date: req.date, comment: req.comment};
    //     const userId = req.userId; 
    //     const inputDate = new Date(info.date);
    //     const now = new Date();

    //     if (inputDate > now) {
    //         return res.status(403).send("תאריך עתידי אינו מותר");
    //     }

    //     const workDay = new WorkDaySchema({
    //         userId,
    //         date: inputDate,
    //         startWork: new Date(info.startWork),
    //         endWork: new Date(info.endWork),
    //         comment: info.comment,
    //     });

    //     await workDay.save();
    //     res.send(workDay);
    //     } catch (err) {
    //     res.status(500).send(err);
    //     }
    // });


    // הוספת authMiddleware לכאן -- 🛡️
    // app.post('/add-new-data', authMiddleware, async (req, res) => {
    //     try {
    //         // שליפת הנתונים מתוך req.body ולא מ-req ישירות
    //         const { startWork, endWork, date, comment } = req.body; 
    //         const userId = req.userId; // עכשיו זה יעבוד כי יש Middleware

    //         const inputDate = new Date(date);
    //         const now = new Date();

    //         if (inputDate > now) {
    //             return res.status(403).send("תאריך עתידי אינו מותר");
    //         }

    //         const workDay = new WorkDaySchema({
    //             userId, // משויך למשתמש המחובר
    //             date: inputDate,
    //             startWork: new Date(startWork),
    //             endWork: new Date(endWork),
    //             comment: comment,
    //         });

    //         await workDay.save();
    //         res.send(workDay);
    //     } catch (err) {
    //         console.error(err); // כדאי להדפיס כדי לראות לוגים בשרת
    //         res.status(500).send("שגיאה בשמירת הנתונים");
    //     }
    // });

    app.post('/add-new-data', authMiddleware, async (req, res) => {
        try {
            console.log("--- תחילת שמירת יום עבודה חדש ---");
            
            // 1. שליפה נכונה מה-body
            const { startWork, endWork, date, comment } = req.body;
            const userId = req.userId; // מגיע מה-Middleware

            console.log("נתונים שהתקבלו:", { userId, date, startWork });

            // 2. בדיקה אם הנתונים הגיעו
            if (!date || !startWork || !endWork) {
                return res.status(400).send("חובה להזין תאריך ושעות");
            }

            const inputDate = new Date(date);
            const now = new Date();

            if (inputDate > now) {
                return res.status(403).send("תאריך עתידי אינו מותר");
            }

            const workDay = new WorkDaySchema({
                userId,
                date: inputDate,
                startWork: new Date(startWork),
                endWork: new Date(endWork),
                comment: comment,
            });

            // 3. הניסיון לשמור
            await workDay.save();
            console.log("✅ היום נשמר בהצלחה!");
            res.send(workDay);

            } catch (err) {
                // המפתח לפתרון נמצא כאן! זה ידפיס לטרמינל את השגיאה האמיתית
                console.error("❌ שגיאה בשמירה ל-DB:", err.message);
                
                if (err.code === 11000) {
                    return res.status(500).send("שגיאה: יום זה כבר קיים במערכת (Duplicate Key)");
                }
                
                res.status(500).send("שגיאה פנימית בשרת: " + err.message);
            }
        });
}
