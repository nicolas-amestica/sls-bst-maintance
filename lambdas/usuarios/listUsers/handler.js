'use-strinct'
const { Instancia } = require('../../../comun/Instancia');
const { Responses } = require('../../../comun/API_Responses');

module.exports.generico = async (event) => {

    try {

        const data = await Instancia.describeInstances();

        if (data.Reservations.length < 1) {
            return Responses._404({ message: 'No existen instancias.' });
        }

        // RETORNA RESPUESTA
        return Responses._200({ message: `Instancias listadas correctamente.`, "data" : data.Reservations });
    } catch (error) {
        return Responses._500({ message: 'No se ha podido acceder al servicio.', error });      
    }

};