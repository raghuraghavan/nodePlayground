const express = require('express');
// templating engine..
const handlebars = require('hbs');
// file systems
const fs = require('fs');
// added to get generate the response time.
const responseTime = require('response-time');
// added to enable CORS
const cors = require('cors');
// added favicon 
const favicon = require('serve-favicon');
const path = require('path');

//error handler
const errorHandler = require('errorhandler');
// compression
const compression = require('compression');

const app = express();
// configuring port for dynamic input
const port = process.env.PORT || 3000;
// to enable all cors requests
app.use(cors());
// compress all responses
app.use(compression())
//setting favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// error handler
if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler({ log: errorNotification }));
}
function errorNotification(err, str, req) {
    var title = 'Error in ' + req.method + ' ' + req.url
    console.log(`title : ${title}, \n Error : ${str}`);
}

/*  custom compression technique
// The default filter function.This is used to construct a custom filter function that is an extension of the default function.
// var compression = require('compression')
// app.use(compression({ filter: shouldCompress }))

// function shouldCompress(req, res) {
//     if (req.headers['x-no-compression']) {
//         // don't compress responses with this request header
//         return false
//     }

//     // fallback to standard filter function
//     return compression.filter(req, res)
// }
*/

/*  --> CORS related 
//Enable CORS for a Single Route
// app.get('/products/:id', cors(), function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for a Single Route' })
// })

//Configuring CORS w/ Dynamic Origin
// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

//If you do not want to block REST tools or server-to-server requests, add a !origin check in the origin function like so:
// var corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

// app.get('/products/:id', cors(corsOptions), function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for a whitelisted domain.' })
// })

//Enabling CORS Pre-Flight
//Certain CORS requests are considered ‘complex’ and require an initial OPTIONS request(called the “pre - flight request”).An example of a ‘complex’ CORS request is one that uses an HTTP verb other than GET / HEAD / POST(such as DELETE) or that uses custom headers.To enable pre - flighting, you must add a new OPTIONS handler for the route you want to support:
// 

// You can also enable pre - flight across - the - board like so:
// app.options('*', cors()) // include before other routes

*/


// setting up the responsetime.. 
app.use(responseTime((req, res, time) => {
    var now = new Date().toString();
    var log = `${now}, ${req.method}, ${req.url}, ${time.toFixed(3)} ms`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
}));

app.use((req, res, time, next) => {
    // var now = new Date().toString();
    // var log = `Requested at ${now}, Method-Type ${req.method}, url ${req.url} `;
    // console.log(log);
    next();
})

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
handlebars.registerPartials(__dirname + '/views/partials')
handlebars.registerHelper('getCurrentyear', () => {
    return new Date().getFullYear()
})
handlebars.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home  Title',
        name: 'Raghu Raghavan',
        address: {
            street: '464 Liz Terreace',
            city: 'Mountain House',
            county: 'CA',
            country: 'US',
            pincode: 95391
        },
    })
});

// text response
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Page Title'
    });
});

//json response
app.get('/bad', (req, res) => {
    res.send({ 'message': 'Wrong page requested' })
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        welcomeMessage: 'Portfolio',
        pageTitle: 'Projects'
    });
});

app.listen(port, () => {
    console.log(`server listening @port ${port}`);
});