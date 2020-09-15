'use strict';
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { verificaToken } = require('../../../middlewares/autenticacion');
const cors = require('cors');

const corsOptions = {
    origin: '*',
    methods: 'PUT,OPTIONS',
    credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors());

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json(true));

// CREAR USUARIO
app.post('/api/usuarios/createUser', verificaToken, (req, res) => {

    const { rut, clave, nombre, apaterno, amaterno } = req.body;

    const params = {
        TableName: process.env.TABLE_USUARIOS,
        Item: {
            rut: rut,
            clave: bcrypt.hashSync(clave, 10),
            nombre: nombre,
            apaterno: apaterno,
            amaterno: amaterno,
            estado: 1
        }
        // ConditionExpression: 'attribute_not_exists(email)' // NO FUNCIONA
    };

    dynamoDB.put(params, (error) => {

        if (error) {
            console.log(error, error.stack);
            return res.status(400).json({
                success: false,
                message: "No se ha podido crear el usuario",
                error
            });
        }

        res.json({
            success: true,
            message: 'Usuario creado correctamente',
            Item: {
                rut,
                clave
            }
        });
    });

});

module.exports.generico = serverless(app);