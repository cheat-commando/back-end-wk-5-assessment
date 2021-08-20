const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

memories = [];
goals = [];

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortune", (req, res) => {
  const fortunes = [
    "By the pricking of my thumbs, something wicked this way comes.",
    "Don't be surprised if the end comes later than you expect.",
    "The one with the power to vanquish the Dark Lord will be born as the seventh month dies...",
    "When the time comes and you need a weapon, look under the roots of the Menoa Tree. Then, when all seems lost and your power is insufficient, go to the rock of Kuthian and speak your name to open the Vault of Souls.",
    "Beware the Ides of March!"
  ];

  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);
});

let nextGoalId = 1;
let nextMemId = 1;

app.post("/api/goals/", (req, res) => {
  console.log(req.body)
  const newGoalText = req.body.goal;
  const newGoal = {
    id: nextGoalId,
    goal: newGoalText
  }
  nextGoalId++;
  goals.push(newGoal);
  console.log(goals);
  res.status(200).send(goals);
})

app.delete("/api/goals/:id", (req, res) => {
  console.log('delete request')
  console.log(req.params.id)
  const index = goals.findIndex(elem => elem.id === +req.params.id);
  console.log(index)
  const removed = goals.splice(index,1);
  res.status(200).send(removed)
  console.log(goals)
});

app.post('/api/memories', (req, res) => {
  let newMem = {
    id: nextMemId,
    date : req.body.date,
    memory: req.body.memory
  };
  memories.push(newMem)
  nextMemId++
  res.status(200).send(newMem)
});

app.get('/api/memories/:date', (req, res) => {
  const filteredMems = memories.filter(elem => elem.date === req.params.date);
  res.status(200).send(filteredMems);
})

app.listen(4000, () => console.log("Server running on 4000"));
