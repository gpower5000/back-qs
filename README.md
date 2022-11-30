
# TEMPLATE NODE REST

Para trabajar con este template se usó:
[NODE.JS](https://nodejs.org/) v16.18.0+(LTS version)

# FRAMEWROK BASE
- Para realizar el proyecto usamos [EXPRESS.JS](https://expressjs.com/)

# CONEXIONES A BDs
- ####	Conexión a [MYSQL DB]
    - Para conectarnos con estas bases de datos se usa ********

# PRUEBAS UNITARIAS
- Para realizar las pruebas proyecto usamos [JEST.JS](https://jestjs.io/)

# DOCUMENTACIÓN
- Para realizar la documentación proyecto usamos [SWAGGER-UI-EXPRESS](https://github.com/scottie1984/swagger-ui-express)

# LOGGING
- Para los logs se tiene la siguiente estructura:
        <url> :: <metodo> ::  <input> :: <status-code> ::  <response>

# COMEZAR
Una vez creado el repositorio mediante "Integralito", debemos seguir los siguientes pasos para poder ejecutar el proyecto:

- Cambiar las llaves de configuracion de la BD en config.yml
- Cambiar los datos de la entidad datacenter y/o remplazar la entidad por la entidad que vas a usar, la encontraras en la ruta:
    - app/api/datacenter/*.js
    - app/storage/orm/datacenter_orm.js
- Un paso extra es configurar los endpoints es ir a la ruta app/api/controller.js donde podras agregar y editar los endpoints.
- Una vez realizada esta configuración debemos ejecutar lo siguiente:
    ```
        npm install
        node index.js
    ```