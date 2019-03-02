const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/usersAPI');
const userRouter = express.Router();
const port = process.env.PORT || 3000;
const User = require('./models/userModel');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

userRouter.route('/users')
  .post((req, res) => {
    req.body.forEach(user => {
      User.findByIdAndUpdate(user._id, {
        "sliderValue" : user.sliderValue
      }, (err) => {
        if (err) throw err;
      })
    })
    res.status(200).send();
  })
.get((req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.send(err);
    }
    return res.json(users);
  });
})

app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
