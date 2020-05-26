// Require
const express = require('express');
const superAgent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');
require('dotenv').config();

// Middleware

const app = express();
const PORT = process.env.PORT;

app.use(express.static('./Public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_overrideMethod'));

// Config

app.set('view engine', 'ejs');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error);
client.connect();

// Routes

app.get('/', renderPokemon);
app.post('/add', addToDatabase)
app.get('/favorites', displayFavorites)

// Callback Functions

function renderPokemon(request, response) {
  const url = 'https://pokeapi.co/api/v2/pokemon';
  superAgent.get(url)
    .then(value => {
      const results = value.body.results;
      results.sort((left, right) => {
        if (left.name > right.name) {
          return 1;
        } else if (left.name < right.name) {
          return -1;
        } else {
          return 0;
        }
      });
      response.render('show', { 'pokemon': results })
    }).catch(error => errors(error, response))
  }



function addToDatabase(request, response) {
  const sql = 'INSERT INTO pokedex (pokemon) VALUES($1)';
  const values = [request.body.poke];
  client.query(sql, values)
    .then(() => {
      response.redirect('/');

    }).catch(error => errors(error, response))
  }


function displayFavorites(request, response) {
  const sql = 'SELECT * FROM pokedex';
  client.query(sql)
    .then(results => {
      response.render('favorites', { 'favorites': results.rows })
    }).catch(error => errors(error, response))
  }


app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
});
