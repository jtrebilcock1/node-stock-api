const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
//consider using got or something else instead of request
const request = require('request');
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 5000;


//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));






//api
//pk_66121777c4424040ac51467797e6e9ce
function api_call(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker +'/quote?token=pk_66121777c4424040ac51467797e6e9ce', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        //console.log(body);
        if (res.statusCode === 200) {
            //api_call will wait for finishedAPI callback which will return the body 
            finishedAPI(body);
        };
    });
};


//Set handlebars. app methods come from http module
app.engine('handlebars', exphbs.engine()); 
app.set("views", "./views");
app.set('view engine', 'handlebars');

//ROUTING
// Set handlenbars index GET route
app.get('/', function (req, res) {
    //api_call has a callback function
    api_call(function (doneAPI) {
        //body  of doneAPI. api_call will wait for this callback function to finish so the api doesnt return undefined
        res.render('home', {
            stock: doneAPI
        });
    }, 'fb');

});

// Set handlenbars index POST route
app.post('/', function (req, res) {
    //api_call has a callback function
    api_call(function (doneAPI) {
        //body  of doneAPI. api_call will wait for this callback function to finish so the api doesnt return undefined
        //posted_stuff = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI,
            //posted_stuff: posted_stuff
        });
    },req.body.stock_ticker);

});

// Set handlenbars About routes
app.get('/about.html', function (req, res) {
    res.render('about', {layout: 'main.handlebars'}); //if multiple layouts you could specify which one like this
});
//END ROUTING

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on port ' + PORT));