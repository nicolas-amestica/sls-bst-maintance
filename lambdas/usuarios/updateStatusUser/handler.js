'use-strinct'
const { Dynamo } = require('../../../comun/Dynamo');
const { Responses } = require('../../../comun/API_Responses');

// LISTAR USUARIO POR ID
module.exports.generico = async (event) => {

    try {

        // CAPTURA PARÁMETROS DE ENTRADA
        const { ID, ESTADO } = JSON.parse(event.body);

        // VERIFICA QUE SE HAYA RECIBIDO EL PARAMETRO NECESARIO PARA EL PROCESO
        if (!ID.toUpperCase().trim()) {
            console.log(event.body);
            return Responses._400({ message: 'Falta parámetro de entrada.' });
        }

        // VALIDAR QUE LA VARIABLE ESTADO SEA NUMÉRICO Y QUE SEA 0 Ó 1
        if (typeof ESTADO != 'number' || (ESTADO != 0 && ESTADO != 1)) {
            console.log(ESTADO);
            return Responses._400({ message: 'Estado debe ser numérico y con valores 0 ó 1, correspondiente a deshabilitado y habilitado respectivamente.' });
        }

        // ACTUALIZAR ESTADO DE USUARIO
        const data = await Dynamo.update({
            tableName: process.env.TABLE_USUARIOS,
            primaryKey: 'ID',
            primaryKeyValue: ID.toUpperCase().trim(),
            updateKey: 'ESTADO',
            updateValue: ESTADO,
        });

        // VERIFICA QUE HAYA RESULTADO
        if (data.error) {
            console.log(data.error);
            return Responses._404({ message: `No existen registros para actualizar el ID ${ID}.` });
        }

        // QUITAR PROPIEDADES DE LA RESPUESTA
        delete data.Attributes.CLAVE;
        delete data.Attributes.CLAVE_2;

        // RETORNA RESPUESTA
        return Responses._200({ message: `Estado del usuario ${data.Attributes.ID} actualizado.`, Item: data.Attributes });

    } catch (error) {
        console.log(error);
        return Responses._500({ message: 'No se ha podido acceder al servicio.', error });        
    }

};