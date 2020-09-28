'use-strinct'
const { Instancia } = require('../../../comun/Instancia');
const { Responses } = require('../../../comun/API_Responses');

module.exports.generico = async (event) => {

    try {

        const { ID } = event.queryStringParameters;

        // VERIFICA QUE SE HAYA RECIBIDO EL PARAMETRO NECESARIO PARA EL PROCESO
        if (!ID) {
            console.log(event.queryStringParameters);
            return Responses._400({ error: 'Falta parámetro de entrada.' });
        }

        const aID = [ID];

        const data = await Instancia.describeInstancesById(aID);

        let instancia = {
            InstanceId: data.Reservations[0].Instances[0].InstanceId,
            InstanceType: data.Reservations[0].Instances[0].InstanceType,
            Monitoring: data.Reservations[0].Instances[0].Monitoring.State,
            PrivateDnsName: data.Reservations[0].Instances[0].PrivateDnsName,
            PrivateIpAddress: data.Reservations[0].Instances[0].PrivateIpAddress,
            PublicDnsName: data.Reservations[0].Instances[0].PublicDnsName,
            State: data.Reservations[0].Instances[0].State,
            SubnetId: data.Reservations[0].Instances[0].SubnetId,
            VpcId: data.Reservations[0].Instances[0].VpcId,
            SecurityGroups: data.Reservations[0].Instances[0].SecurityGroups,
            Tags: data.Reservations[0].Instances[0].Tags,
        }

        // RETORNA RESPUESTA
        return Responses._200({ message: `Estado de la instancia.`, "data" : instancia });
    } catch (err) {
        console.log(err);
        return Responses._500({ error: 'No se ha podido acceder al servicio.', err });
    }

};