const express = require('express');
const app = express();
const dotenv = require('dotenv');
const listingRouter = require('./routes/listing_routes.js');
const userRouter = require('./routes/user_routes.js');
const authRouter = require('./routes/user_auth_routes.js');
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');
const cors = require('cors');

dotenv.config();

app.use(cors({
    origin: 'http://localhost:3001', // Allow this origin
    credentials: true, // Allow cookies
}));
app.use(bodyParser.json());
app.use(cookies());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {

    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).send(
        {
            succeess: false,
            statusCode,
            message
        }
    );

});

app.listen(process.env.PORT, () => {
    console.log('server started');
});

