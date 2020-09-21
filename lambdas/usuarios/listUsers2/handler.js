'use strict';
const { Dynamo } = require('../../../comun/Dynamo');
const { Responses } = require('../../../comun/API_Responses');

// LISTAR USUARIOS
module.exports.generico = async (event) => {

    try {
        const data = await Dynamo.scan({ tableName: process.env.TABLE_USUARIOS, projectionExpression: 'ID, NOMBRE, APATERNO, AMATERNO, EMAIL, ESTADO, FOTO, GENERO', filterExpression: null, expressionAttributes: null, });

        console.log(data);

        // VERIFICAR QUE EXISTAN DATOS
        if (!data.Items) {
            return Responses._404({ message: 'No se han encontrado usuarios' });
        }

        return Responses._200({ message: "Usuarios listados correctamente", Items: data.Items, Count: data.Count, ScannedCount: data.ScannedCount });
    } catch (error) {
        return Responses._500({ message: 'No se ha podido acceder al servicio', error });
    }

};