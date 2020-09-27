'use-strinct'
const { Instancia } = require('../../../comun/Instancia');
const { Responses } = require('../../../comun/API_Responses');

module.exports.generico = async (event) => {

    try {

        const EC2 = JSON.parse(event.body);

        if (EC2.length == 0) {
            return Responses._400({ error: 'Falta parámetro de entrada.' });
        }

        // APAGAR INSTANCIAS
        const data = await Instancia.apagar(EC2);

        // RETORNA RESPUESTA
        return Responses._200({ message: `Apagando instancias.`, "data" : data });
    } catch (err) {
        console.log(err);
        return Responses._500({ error: 'No se ha podido acceder al servicio.', err });
    }

};