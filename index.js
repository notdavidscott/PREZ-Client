const express = require('express'); 
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const Sequelize = require('Sequelize');
const app = express();


const handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

const sequelize = new Sequelize('Clients', 'David', null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: '/Users/DavidScottPerez/Desktop/CODING!/PREZ-Client/PREZ-ClientDB.sqlite'
}); //end

//start models

const Clients = sequelize.define(
    'Clients',
    {
        ClientId: {
            type: Sequelize.INTEGER,
            autoIncrement: true, 
            primaryKey: true
        },
        LastName: Sequelize.STRING,
        FirstName: Sequelize.STRING,
        PhoneNumber: Sequelize.STRING, 
        Email: Sequelize.STRING,
        Address: Sequelize.STRING, 
        ZipCode: Sequelize.INTEGER, 
        State: Sequelize.STRING
    },
    {
        freezeTableName: true, 
        timestamps: false
    }
);

//end models

//display page
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (request, response) => {
    response.render('login');
});

app.get('/allClients', (req, res) => {

    Clients.findAll({
    }).then(Clients => {
        res.render('allClients', {Clients});
    });
});

app.get('/newClient', (request, response) => {
    response.render('newClient');
});

app.get('/success', (request, response) => {
    response.render('success');
});

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

//begin listener
app.listen(app.get('port'), () => {
    console.log(
        '>>>> Server Start. . . . . . Successful >>>> begin now >>>>'
    );
});
