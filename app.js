const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection details
const mongoURI = 'mongodb+srv://sakshipopli1308:sakshiankita@cluster0.o7jyatz.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'your-database-name';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/logindiaster.html');
});

app.post('/submit', async (req, res) => {
    try {
        const client = new MongoClient(mongoURI, { useNewUrlParser: true });
        await client.connect();
        const db = client.db(dbName);
        
        const formData = req.body;
        const collection = db.collection('your-collection-name');
        await collection.insertOne(formData);

        client.close();
        
        res.send('Data submitted to MongoDB.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error submitting data.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});