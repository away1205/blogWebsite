const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

const postJournal = [
  {
    title: 'Supernova',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ad accusantium aliquid debitis officia, enim eius consequuntur nobis delectus, adipisci molestias fugit architecto illum maxime reiciendis iure consectetur, explicabo repellendus.'
  },
  {
    title: "Day 2",
    text: 'What is the "E" for? "Embedded?" Could be. How about "Effective," "Elegant," or just "Easy"? EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow.'
  }
];

const truncateText = function (text){
  if(text.length > 30){
    return text.substring(0, 180) + '....';
  }
  return text
};

app.get('/', (req, res) => {
  res.render('home', {journal: postJournal, truncate: truncateText})
});

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact') 
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.post('/compose', (req, res) => {
  let titleCo = req.body.title;
  let textCo = req.body.text;
  postJournal.push({
    title: `${titleCo}`,
    text: `${textCo}`
  })
  res.redirect(`/`)
})

app.get(`/:title`, (req, res) => {
  const reqTitle = req.params.title;
  postJournal.forEach((el, i) => {
    if(el.title === reqTitle)
    res.render('post', {journal: postJournal, index: i})
  })
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Running in 3000')
});