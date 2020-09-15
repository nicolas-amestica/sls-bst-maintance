'use strict';
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const { verificaToken } = require('../../../middlewares/autenticacion');
const cors = require('cors');

const corsOptions = {
    origin: '*',
    methods: 'GET,POST,OPTIONS',
    credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors());

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json(true));

// LISTAR USUARIOS
app.get('/api/usuarios/listUsers', verificaToken, (req, res) => {

    const params = {
        TableName: process.env.TABLE_USUARIOS
    };

    dynamoDB.scan(params, (error, result) => {

        if (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                message: "No se ha podido acceder a los usuarios",
                error
            });
        }

        const { Items } = result;

        res.json({
            success: true,
            message: 'Usuarios listados correctamente',
            Items
        });

    });

});

module.exports.generico = serverless(app);