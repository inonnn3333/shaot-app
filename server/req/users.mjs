import { UserSchema } from "../models/users.model.mjs";

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
            if (!user || user.password !== password) {
                return res.status(401).send({ message: "אימייל או סיסמה שגויים" });
            }

            
            if (email === "i@gmail.com" && password === "123456") {
                return res.status(200).send({
                    message: "התחברת בהצלחה",
                    token: "fake-jwt-token",
                
                });}
            // 🔐 שלב ג': בדיקה אם הסיסמה תואמת (כאן דוגמה פשוטה – בהמשך תוכל לשלב bcrypt)
            // if (user.password !== password) {
            //     return res.status(401).send({ message: "אימייל או סיסמה שגויים" });
            // }

            // ✅ התחברות הצליחה – שלח טוקן (כאן טוקן דמיוני, תוכל לשלב jwt אמיתי)


        } catch (error) {
            console.error("שגיאה ב-login:", error);
            return res.status(500).send({ message: "שגיאת שרת" });
        }
    });
}
