var express = require('express');
var cors = require('cors');
const path = require('path');
require('dotenv').config()

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

const initializeServer = async () => {

    app.use(cors({ credentials: true, origin: true }));
    app.set('trust proxy', 1);

    app.use(express.static(path.join(__dirname, 'public')));

    // Serve the main HTML file on the root route
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });

}

initializeServer();
