const express = require('express');
const app = express();
const mysql = require('mysql');
const myconn = require('express-myconnection');
const cors = require('cors');
const rutas = require('./rutas'); // Asegúrate de que rutas.js esté correctamente configurado

// Configuración del puerto
app.set('port', process.env.PORT || 3000);

// Configuración de la base de datos
const DBOp = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Umg$2023',
    database: 'alumno',
};

// Middleware
app.use(myconn(mysql, DBOp, 'single'));
app.use(express.json());
app.use(cors());

// Probamos el funcionamiento del servidor y definimos rutas
app.get('/inicio', (req, res) => {
    res.send('Hola mundo');
});

app.post('/', (req, res) => {
    res.send('niño agregado');
});

// Asegúrate de que tus rutas sean middleware válido
app.use('/', rutas); // Cambié a '/api' para evitar conflictos con la raíz

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
});
