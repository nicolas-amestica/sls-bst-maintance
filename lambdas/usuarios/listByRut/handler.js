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

// LISTAR USUARIO POR RUT
app.get('/api/usuarios/listByRut', verificaToken, (req, res) => {

    if (!req.query.rut) {
        return res.status(404).json({
            success: false,
            message: "Se espera un parámetro"
        });
    }

    var params = {
        TableName: process.env.TABLE_USUARIOS,
        Key: {
            "rut": req.query.rut
        }
    }

    dynamoDB.get(params, (error, result) => {

        if (error) {
            console.log(error);
            return res.status(400).json({
                success: false,
                message: "No se ha podido acceder a los usuarios",
                error
            });
        }


        if (!result.Item) {
            return res.status(200).json({
                success: false,
                message: "No se encontró al usuario"
            });
        }

        const { Item } = result;

        res.status(200).json({
            success: true,
            Item
        });

    });

});

module.exports.generico = serverless(app);