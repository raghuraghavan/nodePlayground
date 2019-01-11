const express = require('express');
const handlebars = require('hbs')
const app = express();

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
})

app.listen(3000, () => {
    console.log('server listening @port 3000')
});