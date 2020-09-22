'use-strinct'
const { Instancia } = require('../../../comun/Instancia');
const { Responses } = require('../../../comun/API_Responses');

module.exports.generico = async (event) => {

    try {

        const EC2 = JSON.parse(event.body);

        if (EC2.length == 0) {
            return Responses._400({ message: 'Falta parámetro de entrada.' });
        }

        // LISTAR INSTANCIAS
        const data = await Instancia.describeInstancesById(EC2);

        // VALIDAR QUE EXISTAN INSTANCIAS
        if (data.Reservations.length < 1) {
            return Responses._404({ message: 'No existen instancias.' });
        }

        // RETORNA RESPUESTA
        return Responses._200({ message: `Instancias listadas correctamente.`, "data" : data });
    } catch (error) {
        return Responses._500({ message: 'No se ha podido acceder al servicio.', error });
    }

};