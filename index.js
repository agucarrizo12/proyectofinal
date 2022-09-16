
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT 
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const { rootCertificates } = require('tls');

//conexion base de datos
//const conexion = mysql.createConnection({
//    host: process.env.HOST,
//    user: process.env.USER,
//    password: process.env.PASSWORD,
//    database: process.env.DATABASE
//});

//conexion.connect((err) => {
//    if (err) {
//        console.error(`Error en la conexion: ${err.stack}`)
//        return;
//    }
//    console.log((`conectado a la base de datos ${process.env.DATABASE}`));
//}) 

//configuracion middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//configuración del motor de plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', (req, res, next) => {
    res.render('index', {
        titulo: 'Cocina Express!'
    })
});

app.get('/programas', (req, res, next) => {
    res.render('programas', {
        titulo: 'Nuestros Programas'
    })
}); 

app.get('/contacto', (req, res, next) => {
    res.render('contacto', {
        titulo: 'Contacto'
    })
});

app.post('/contacto', (req, res) => {


const { nombre, email, mensaje } = req.body;

console.log(nombre, email, mensaje);

if (nombre == '' || email == '' || mensaje == '') {
    let validacion = 'Campo obligatorio'

    res.render('contacto', {
        validacion
    })
} else{

        let datos = {
            nombre: nombre,
            email: email,
            mensaje: mensaje
        };

        let sql = 'INSERT INTO mensajes SET ?';

        conexion.query(sql, datos, (err, result) => {
            if (err) throw err;
            res.render('contacto', {
                titulo: 'Contacto'
            });
        });

    }


});






app.listen(PORT, () => {
    console.log(`El servidor esta trabajando en el Puerto ${PORT}
    `);  
}) 
