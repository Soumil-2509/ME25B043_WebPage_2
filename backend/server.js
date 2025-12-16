const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const profile = {
  name: "Soumil Goyal",
  roll: "ME25B403",
  bio: "Mechanical Engineering student at IIT Madras, originally from Mumbai."
};

const hobbies = [
  "Watching cricket",
  "Eating food",
  "Sleeping",
  "Playing badminton",
  "Talking to people",
  "Making new friends"
];

const contact = {
  phone: "9321639524",
  email: "me25b043@smail.iitm.ac.in",
  linkedin: "www.linkedin.com/in/soumil-goyal-a9201a308"
};
app.get('/api/profile', (req, res) => {
  res.status(200).json({
    success: true,
    data: profile
  });
});

app.get('/api/hobbies', (req, res) => {
  res.status(200).json({
    success: true,
    data: hobbies
  });
});

app.get('/api/contact', (req, res) => {
  res.status(200).json({
    success: true,
    data: contact
  });
});
