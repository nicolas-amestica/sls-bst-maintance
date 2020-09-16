'use strict';
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const cors = require('cors');

const corsOptions = {
    origin: '*',
    methods: 'POST,OPTIONS',
    credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors());

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json(true));

// LOGIN DE USUARIO
app.post('/api/auth', (req, res) => {

    const { rut, clave } = req.body;

    const params = {
        TableName: process.env.TABLE_USUARIOS,
        Key: {
            rut: rut
        }
    };

    dynamoDB.get(params, (error, result) => {

        // VERIFICA QUE LA PETICION GET CONTIENE ERRORES
        if (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'No se ha podido acceder al servicio',
                error
            });
        }

        // VERIFICA QUE HAYAN RESULTADOS
        if (!result.Item) {
            return res.status(404).json({
                success: false,
                message: 'Usuario o contraseña incorrectos'
            });
        }

        // VERIFICA QUE EL USUARIO ESTÉ EN ESTADO 1
        if (result.Item.estado != 1) {
            return res.status(404).json({
                success: false,
                message: 'Usuario bloqueado'
            });
        }

        // VEIRIFCA CLAVE
        if (!bcrypt.compareSync(clave, result.Item.clave)) {
            return res.status(404).json({
                success: false,
                message: 'Usuario o contraseña incorrectos'
            });
        }

        // ELIMINAR CLAVE DE LA RESPUESTA
        delete result.Item.clave;
        delete result.Item.clave_2;

        // GENERA TOKEN
        let token = JWT.sign({
            usuario: result.Item
        }, process.env.SEED_TOKEN, { expiresIn: parseInt(process.env.EXPIRE_TOKEN) });

        // RETORNA RESPUESTA
        return res.json({
            success: true,
            message: "Usuario encontrado",
            data: result.Item,
            token
        });

    });

});

// EXPORTAR MÓDULO
module.exports.generico = serverless(app);