// middlewares/auth.js
import jwt from 'jsonwebtoken';

// export function authMiddleware(req, res, next) {
//     const authHeader = req.headers.authorization;

//         if (!authHeader?.startsWith('Bearer ')) {
//             return res.status(401).json({ message: 'אין הרשאה' });
//         }

//         const token = authHeader.split(' ')[1];

//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.userId = decoded.id;
//             next();
//         } catch (err) {
//             return res.status(403).json({ message: 'טוקן לא תקין' });
//         }
//     }

export function authMiddleware(req, res, next) {
    console.log(`[AUTH] מבקש גישה ל: ${req.url}`); // לוג ראשון
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        console.log('[AUTH] שגיאה: חסר Header או Bearer');
        return res.status(401).json({ message: 'אין הרשאה' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('[AUTH] טוקן אומת בהצלחה עבור משתמש:', decoded.id);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.log('[AUTH] שגיאה באימות הטוקן:', err.message);
        return res.status(403).json({ message: 'טוקן לא תקין' });
    }
}