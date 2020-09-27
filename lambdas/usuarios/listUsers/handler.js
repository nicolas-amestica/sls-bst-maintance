'use-strinct'
const { Dynamo } = require('../../../comun/Dynamo');
const { Responses } = require('../../../comun/API_Responses');

module.exports.generico = async (event) => {

    try {

        const data = await Dynamo.scan({
            tableName: process.env.TABLE_USUARIOS,
            projectionExpression: "AMATERNO, NOMBRE, TELEFONO, ESTADO, GENERO, ID, EMAIL, APATERNO, FOTO",
            filterExpression: null,
            expressionAttributes: null,
        });

        if (data.length == 0) {
            return Responses._404({ error: "No existen usuarios a listar." });
        }

        // RETORNA RESPUESTA
        return Responses._200({ message: `Instancias listadas correctamente.`, "data" : data.Items });
    } catch (err) {
        console.log(err);
        return Responses._500({ error: 'No se ha podido acceder al servicio', err });
    }

};