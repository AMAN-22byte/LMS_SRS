const express = require('express');
const path = require('path');
const app = express();

const DASH_DIR = path.join(__dirname, 'dash'); // Adjust this path to your DASH files directory

app.use('/dash', express.static(DASH_DIR));

app.get('/', (req, res) => {
    res.send('DASH Server is running');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
