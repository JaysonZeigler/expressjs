const express = require('express');
const port = process.env.PORT || 9876;
const app = express();
const path = require('path');
const ejs = require('ejs')
const fs = require('fs');
app.use(express.urlencoded());

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

var rawdata = fs.readFileSync('profiles.json');
var profileData = JSON.parse(rawdata);
/*console.log(rawdata);
console.log(profileData);*/


// sendFile will go here
app.get('/hi', function(req, res) {
  res.sendFile(path.join(__dirname, '/main.html'));
});
app.get("/", (req, res) => {
  res.render('main', {
    title: 'hello',
    mainbody: 'no'
  });
});
app.get("/chris", (req, res) => {
  res.render('profile', profileData.chris);
});
app.get("/2048", (req, res) => {
  res.render('2048');
});
app.get("/jayson", (req, res) => {
  res.render('profile', profileData.jayson);
});
app.get("/tyler", (req, res) => {
  res.render('profile', profileData.tyler);
});
app.get("/will", (req, res) => {
  res.render('profile', profileData.will);
});

app.post('/comments', (req, res) => {
  let feedback = {
    name: req.body.name,
    adjective: req.body.comments
  };
  rawdata = fs.readFileSync('comments.json');
  commentData = JSON.parse(rawdata);
  commentData.comments.push(feedback)
  if (feedback.name && feedback.adjective) {
    fs.writeFile("comments.json", JSON.stringify(commentData), "utf8", (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`Added Comment`)
        res.render('comments', commentData)
      }
    })
  }
})
app.post('/clearcomments', (req, res) => {
  let clearedObj = JSON.stringify({
    comments: []
  });
  fs.writeFile('comments.json', clearedObj, 'utf8', () => console.log("Cleared comments"));
  res.redirect('/comments');
});

app.get("/comments", (req, res) => {
  data = fs.readFileSync('comments.json')
  commentData = JSON.parse(data)
  res.render('comments', commentData);
})
app.listen(port);
console.log('Server started at http://localhost:' + port);
