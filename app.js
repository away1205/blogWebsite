const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

const postJournal = [
  {
    title: 'Super nova',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ad accusantium aliquid debitis officia, enim eius consequuntur nobis delectus, adipisci molestias fugit architecto illum maxime reiciendis iure consectetur, explicabo repellendus.'
  },
  {
    title: "Day 2",
    text: 'What is the "E" for? "Embedded?" Could be. How about "Effective," "Elegant," or just "Easy"? EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow.'
  }
];

const truncateText = function (text){
  if(text.length > 30){
    return text.substring(0, 120) + '....';
  }
  return text
};

app.get('/', (req, res) => {
  res.render('home', {journal: postJournal, truncate: truncateText})
  console.log()
});

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact') 
})

for(let i = 0; i<postJournal.length; i++){
  app.get(`/${encodeURIComponent(postJournal[i].title)}`, (req, res) => {
    res.render('post', {journal: postJournal, index: i})
  });
}

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.post('/compose', (req, res) => {
  console.log(req.body.post)
  res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Running in 3000')
});