'use-strinct'
const { Instancia } = require('../../../comun/Instancia');
const { Responses } = require('../../../comun/API_Responses');

module.exports.generico = async (event) => {

    try {

        // LISTAR INSTANCIAS
        const data = await Instancia.describeInstances();

        // VALIDAR QUE EXISTAN INSTANCIAS
        if (data.Reservations.length < 1) {
            return Responses._404({ message: 'No existen instancias.', error: "No existen instancias." });
        }

        let instancias = [];

        data.Reservations.forEach(inst => {
            let instancia = {
                InstanceId: inst.Instances[0].InstanceId,
                InstanceType: inst.Instances[0].InstanceType,
                Monitoring: inst.Instances[0].Monitoring.State,
                PrivateDnsName: inst.Instances[0].PrivateDnsName,
                PrivateIpAddress: inst.Instances[0].PrivateIpAddress,
                PublicDnsName: inst.Instances[0].PublicDnsName,
                State: inst.Instances[0].State,
                SubnetId: inst.Instances[0].SubnetId,
                VpcId: inst.Instances[0].VpcId,
                SecurityGroups: inst.Instances[0].SecurityGroups,
                Tags: inst.Instances[0].Tags,
            }
            instancias.push(instancia);
        });

        // RETORNA RESPUESTA
        return Responses._200({ message: `Instancias listadas correctamente.`, "data" : instancias });
    } catch (err) {
        console.log(err);
        return Responses._500({ message: 'No se ha podido acceder al servicio.', error: 'No se ha podido acceder al servicio.', err });
    }

};