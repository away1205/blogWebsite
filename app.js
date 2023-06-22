const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

const postJournal = ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ad accusantium aliquid debitis officia, enim eius consequuntur nobis delectus, adipisci molestias fugit architecto illum maxime reiciendis iure consectetur, explicabo repellendus.', 'What is the "E" for? "Embedded?" Could be. How about "Effective," "Elegant," or just "Easy"? EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow.'];

const day = [];

const truncateText = function (text){
  if(text.length > 30){
    return text.substring(0, 120) + '....';
  }
  return text
};

app.get('/', (req, res) => {
  res.render('home', {journal: postJournal, truncate: truncateText})
});

for(let i = 0; i<postJournal.length; i++){
  app.get(`/post${i}`, (req, res) => {
    res.render('post', {journal: postJournal, post: i})
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log('Running in 3000')
});