const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb+srv://littleflockprayerfellowshipweb:flock123@littleflockweb.7aaya.mongodb.net/?retryWrites=true&w=majority&appName=littleflockweb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Schema and Model
const ScoreSchema = new mongoose.Schema({
    username: String,
    score: Number,
    game: String, // To distinguish between different games, e.g., 'game1'
});

const Score = mongoose.model('Score', ScoreSchema);

// Save score
app.post('/save-score', (req, res) => {
    const { username, score, game } = req.body;
    const newScore = new Score({ username, score, game });
    newScore.save()
        .then(() => res.status(200).json({ message: "Score saved successfully!" });

        .catch(err => res.status(500).send('Error saving score: ' + err));
});

// Get leaderboard
app.get('/leaderboard', (req, res) => {
    const { game } = req.query;
    Score.find({ game }).sort({ score: -1 }).limit(10)
        .then(scores => res.json(scores))
        .catch(err => res.status(500).send('Error fetching leaderboard: ' + err));
});

// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
