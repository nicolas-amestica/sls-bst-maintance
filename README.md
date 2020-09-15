## SERVICIO PARA AUTENTICACIÓN

Este es un servicio para autenticación de usuario.

Objetivos:

- Se conecta a DynamoDB
- Genera token.
- Verifica Token.

Parámetros de entrada:

- email
- clave

Parámetros de salida

- status
- message
- token

Para probar este servicio, se debe ingresar manualmente un usuario de prueba en DynamoDB, el json es el siguiente:

{
    "rut": "",
    "amaterno": "",
    "nombre": "",
    "apaterno": "",
    "clave_2": "Blutengel1",
    "clave": "$2a$10$LIackwFY0/6HPVJrjsj84OQa6x0Bl5CrXpPhwwSJWKOZMtvxtF1tu",
    "email": "niamesvi3@gmail.com",
    "estado": 1,
    "foto": "",
    "telefono": ""
}

Para iniciar este servicio debe tener instalado lo siguiente:

- serverless framework : Para realizar el despliegue en Amazon Web Service.
- aws cli: Para conectar a los servicios de Amazon Web Service.
- confgiruracion : Archivo de configuración que indicará los parámetros de configuración en Amazon Web Service.

No olvidar instalar los módulos

```
npm install

```

Nicolás Améstica Vidal