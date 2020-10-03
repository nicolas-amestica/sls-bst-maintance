## PROYECTO BST-MAINTANCES

Este proyecto está generado con Serverless Framework y programado con Nodejs para Amazon Web Service.

Contiene:

- Plantilla YML.
- API Gateway.
- Lambdas.
- Custom authorization.


## SERVICIO PARA AUTENTICACIÓN

Este es un servicio para autenticación de usuario.

Objetivos:

- Se conecta a DynamoDB
- Genera token.
- Verifica resultado.
- Verifica Token.
- Retornar respuesta.

Parámetros de entrada:

- ID (Es el rut)
- CLAVE

Parámetros de salida

- status
- message
- data
- token

Para probar este servicio, se debe ingresar manualmente un usuario de prueba en DynamoDB, el json es el siguiente:

```
{
  "AMATERNO": "",
  "APATERNO": "",
  "CLAVE": "$2a$10$LIackwFY0/6HPVJrjsj84OQa6x0Bl5CrXpPhwwSJWKOZMtvxtF1tu",
  "CLAVE_2": "Blutengel1",
  "EMAIL": "ejemplo@dominio.com",
  "ESTADO": 1,
  "FOTO": "",
  "GENERO": 1 o 2 (masculino o femenino),
  "ID": "",
  "NOMBRE": "",
  "PERFIL": [1, 2, 3],
  "TELEFONO": "",
  "ALTAS": [{
      "ID_EMPRESA": 2,
      "ID_SOCIEDAD": 70,
      "EMPRESA_RUT": "76958425-9",
      "EMPRESA_NOMBRE": "BST SERVICIOS OPERACIONALES",
      "FECHA_ALTA": "02-02-2020",
      "FECHA_ANTIGUEDAD": "02-02-2020",
      "ID_CARGO": "D100",
      "NOMBRE_CARGO": "PROGRAMADOR SENIOR"
    }, {
      "ID_EMPRESA": 1,
      "ID_SOCIEDAD": 1,
      "EMPRESA_RUT": "71543200-5",
      "EMPRESA_NOMBRE": "UNIVERSIDAD ADOLFO IBÁÑEZ",
      "FECHA_ALTA": "02-02-2020",
      "FECHA_ANTIGUEDAD": "02-02-2020",
      "ID_CARGO": "K123",
      "NOMBRE_CARGO": "GESTOR(A) DE CONTENIDOS"
    }]
}

```

Para iniciar este servicio debe tener instalado lo siguiente:

- Serverless framework : Para realizar el despliegue en Amazon Web Service.
- AWS CLI: Para conectar a los servicios de Amazon Web Service.
- Configuración : Archivo de configuración que indicará los parámetros de configuración en Amazon Web Service.

No olvidar instalar los módulos

```
npm install

```

Nicolás Améstica Vidal