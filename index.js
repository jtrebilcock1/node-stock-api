const express = require ('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 5000;

//Set handlebars

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Set handlenbars routes
app.get('/', function (req, res) {
res.render('home');
});

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log ('Server Listening on port ' + PORT));