import { UserSchema } from "../models/users.model.mjs";
import bcrypt from "bcrypt";

export default function registerUsersRoutes(app) {

    app.post('/users/login', async (req, res) => {
        const { email, password } = req.body;

        // בדיקה אם שדות חובה קיימים
        if (!email || !password) {
            return res.status(400).send({ message: "חובה להזין אימייל וסיסמה" });
        }

        try {
            // 🔍 שלב א': חיפוש משתמש במסד הנתונים לפי אימייל
            const user = await UserSchema.findOne({ email });

            // 🧱 שלב ב': בדיקה אם המשתמש קיים
            if (!user) {
                return res.status(401).send({ message: "אימייל או סיסמה שגויים" });
            }

            // 🔐 שלב ג': השוואת סיסמה עם bcrypt
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).send({ message: "אימייל או סיסמה שגויים" });
            }

            // ✅ התחברות הצליחה
            return res.status(200).send({
                message: "התחברת בהצלחה",
                token: "fake-jwt-token",
            });

        } catch (error) {
            console.error("שגיאה ב-login:", error);
            return res.status(500).send({ message: "שגיאת שרת" });
        }
    });




    app.post('/users/register', async (req, res) => {
        const { firstName, lastName, phone, email, password } = req.body;

        // בדיקה אם שדות חובה קיימים
        if (!firstName || !lastName || !phone || !email || !password) {
            return res.status(400).send({ message: "חובה להזין שם פרטי, שם משפחה, טלפון, אימייל וסיסמה" });
        }

        try {
            // 🔍 שלב א': בדיקה אם המשתמש כבר קיים
            const existingUser = await UserSchema.findOne({ email });
            if (existingUser) {
                return res.status(409).send({ message: "משתמש עם אימייל זה כבר קיים" });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // 🧱 שלב ב': יצירת משתמש חדש
            const newUser = new UserSchema({
                name: { firstName, lastName },
                phone,
                email,
                password: hashedPassword
            });

            await newUser.save();
            return res.status(201).send({ message: "משתמש נרשם בהצלחה" });

        } catch (error) {
            console.error("שגיאה ב-register:", error);
            return res.status(500).send({ message: "שגיאת שרת" });
        }
    });
}

