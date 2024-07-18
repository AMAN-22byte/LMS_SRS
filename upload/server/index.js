const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/client', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'], credentials: true }));
app.use(express.json());

const uploadDir = path.join(__dirname, 'files');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const uploadSchema = new mongoose.Schema({
    title: String,
    instructor: String,
    courseName: String,
    subject: String,
    file: {
        fieldname: String,
        filename: String,
        path: String,
        size: Number
    }
});

const Upload = mongoose.model('Upload', uploadSchema, 'upload'); // Explicitly setting the collection name to 'upload'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

// Create upload API
app.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    if (req.file) {
        const newUpload = new Upload({
            title: req.body.title,
            instructor: req.body.instructor,
            courseName: req.body.courseName,
            subject: req.body.subject,
            file: {
                fieldname: req.file.fieldname,
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size
            }
        });

        try {
            await newUpload.save();
            res.status(200).send({ message: 'File uploaded and data saved successfully', file: req.file });
        } catch (error) {
            console.error('Error saving data to the database:', error);
            res.status(500).send({ message: 'Error saving data to the database', error });
        }
    } else {
        res.status(400).send({ message: 'File upload failed' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
