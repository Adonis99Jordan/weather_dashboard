import dotenv from 'dotenv';
import express from 'express';
// Allow us to pull variables from .env file with process.env
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder - ie. We use app.use with express.static
app.use(express.static('path/to/client/dist'));

// Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());

// TODO: Implement middleware to connect the routes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

app.use(routes);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('')
// })

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
