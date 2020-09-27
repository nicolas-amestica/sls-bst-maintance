'use-strinct'
const { Dynamo } = require('../../../comun/Dynamo');
const { Responses } = require('../../../comun/API_Responses');

// LISTAR USUARIO POR ID
module.exports.generico = async (event) => {

    const { ID } = event.queryStringParameters;

    // VERIFICA QUE SE HAYA RECIBIDO EL PARAMETRO NECESARIO PARA EL PROCESO
    if (!ID.toUpperCase().trim()) {
        console.log(event.queryStringParameters);
        return Responses._400({ error: 'Falta parámetro de entrada.' });
    }

    try {
        const data = await Dynamo.get(ID.toUpperCase().trim(), process.env.TABLE_USUARIOS);

        // VERIFICA QUE HAYA RESULTADO
        if (!data.Item) {
            return Responses._404({ error: `No existen registros para el id ${ID}.` });
        }

        // QUITAR PROPIEDADES DE LA RESPUESTA
        delete data.Item.CLAVE;
        delete data.Item.CLAVE_2;

        // RETORNA RESPUESTA
        return Responses._200({ message: 'Usuario encontrado.', Item: data.Item });
        
    } catch (err) {
        console.log(err);
        return Responses._500({ error: 'No se ha podido acceder al servicio.', err });
    }

};