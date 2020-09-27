'use-strinct'
const { Dynamo } = require('../../../comun/Dynamo');
const { Responses } = require('../../../comun/API_Responses');
const bcrypt = require('bcryptjs');

// CREAR USUARIO
module.exports.generico = async (event) => {

    try {

        const { ID, CLAVE, NOMBRE, APATERNO, AMATERNO, GENERO, FOTO, EMAIL, TELEFONO } = JSON.parse(event.body);

        // VERIFICA QUE SE HAYAN RECIBIDO LOS PARAMETROS NECESARIOS PARA EL PROCESO
        if (!ID.toUpperCase().trim() || !CLAVE || !NOMBRE || !APATERNO || !AMATERNO || !GENERO) {
            console.log(event.body);
            return Responses._404({ error: 'Faltan parámetros de entrada.' });
        }

        // VALIDAR QUE LA VARIABLE GÉNERO SEA NUMÉRICO Y QUE SEA 1 O 2
        if (typeof GENERO != 'number' || (GENERO != 1 && GENERO != 2)) {
            console.log({ error: GENERO });
            return Responses._400({ error: 'Género debe ser numérico y con valores 1 ó 2, correspondiente a masculino y femenino respectivamente.' });
        }

        // CREAR JSON PARA SER ENVIADO A LA FUNCION DYNAMO WRITE
        const usuario = {
            "ID": ID.toUpperCase().trim(),
            "CLAVE": bcrypt.hashSync(CLAVE, 10),
            "CLAVE_2": CLAVE,
            "NOMBRE": NOMBRE.toUpperCase().trim(),
            "APATERNO": APATERNO.toUpperCase().trim(),
            "AMATERNO": AMATERNO.toUpperCase().trim(),
            ESTADO: 1,
            FOTO,
            "EMAIL": EMAIL.toUpperCase().trim(),
            TELEFONO,
            GENERO,
        }

        const data = await Dynamo.write(usuario, process.env.TABLE_USUARIOS);

        // VERIFICA QUE HAYAN RESULTADOS
        if (!data) {
            return Responses._400({ error: `No se pudo escribir el usuario con ID ${ID}.` });
        }

        // QUITAR CLAVES PARA EL ENVÍO DE LA RESPUESTA
        delete data.CLAVE;
        delete data.CLAVE_2;

        // RETORNA RESPUESTA
        return Responses._200({ message: `Usuario con ID ${ID} ingresado correctamente.`, data });

    } catch (err) {
        console.log(err);
        return Responses._500({ error: 'No se ha podido acceder al servicio.', err });
    }

};