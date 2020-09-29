'use-strinct'
const { Instancia } = require('../../../comun/Instancia');
const { Responses } = require('../../../comun/API_Responses');

module.exports.generico = async (event) => {

    try {

        const { instanciaId } = JSON.parse(event.body);

        if (!instanciaId) {
            return Responses._400({ error: 'Falta parámetro de entrada.' });
        }

        const data = await Instancia.rebootInstance(instanciaId);

        // RETORNA RESPUESTA
        return Responses._200({ message: `Instancia reiniciada.`, "data" : data });
    } catch (err) {
        console.log(err);
        return Responses._500({ error: 'No se ha podido acceder al servicio.', err });
    }

};