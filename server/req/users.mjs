export default function registerUsersRoutes(app) {
    
    app.post('/users/login', async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required" });
        }

        try {
            // Here you would typically check the credentials against a database
            // For demonstration, we assume a successful login
            if (email === "i@gmail.com" && password === "123456") {
                // sussessful login     
                res.status(200).send({ message: "Login successful", token: "fake-jwt-token" });
            }else {
                // Invalid credentials
                return res.status(401).send({ message: "Invalid email or password" });
            }}
        catch (error) {
            console.error("Login error:", error);
            return res.status(500).send({ message: "Internal server error" });
        }
});
}