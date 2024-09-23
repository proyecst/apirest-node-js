# apirest-node-js
dependencias:

express: este es un marco de trabajo popular de Node.js para crear aplicaciones web y API. Proporciona una forma estructurada de manejar solicitudes y respuestas HTTP.
axios: este es un cliente HTTP basado en promesas que simplifica la realización de solicitudes a API externas. Ofrece una forma clara y legible de interactuar con PokeAPI.
cors (opcional): este middleware se utiliza para habilitar el uso compartido de recursos de origen cruzado (CORS). Permite que las solicitudes de diferentes orígenes (dominios, puertos, protocolos) accedan a la API. Aquí, está comentado, pero es posible que lo necesite según la configuración de su interfaz.
2. Configuración del servidor:

const express = require('express');: esta línea importa el módulo Express y lo asigna a la constante express.
const app = express();: esta línea crea una instancia de aplicación Express, que es la base para crear los puntos finales de su API.
const PORT = process.env.PORT || 5000;: Esta línea define el puerto en el que el servidor escuchará las solicitudes entrantes. Busca una variable de entorno denominada PORT y la utiliza si se proporciona. De lo contrario, el puerto predeterminado es 5000.
3. Middleware:

app.use(cors()); (comentado): Esta línea habilita CORS si la descomentas. CORS permite que las solicitudes de diferentes orígenes accedan a la API. Es posible que necesites esto según cómo planees usar esta API en tu front-end.
app.use(express.json());: Esta línea le indica a Express que analice los datos JSON entrantes en el cuerpo de la solicitud. Esto es útil si planeas aceptar datos JSON de los clientes en el futuro.
4. URL base:

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';: Esta línea define la URL base de PokeAPI. Se utiliza para construir las URL para obtener datos de Pokémon.
5. Puntos finales de la API:

- GET /api/pokemon (Listar los primeros 100 Pokémon):

Este punto final recupera una lista de los primeros 100 Pokémon de PokeAPI.
La palabra clave async nos permite usar await para operaciones asincrónicas.
Dentro del controlador de ruta, hay un bloque try...catch para manejar posibles errores.
const response = await axios.get(...) realiza una solicitud GET al punto final de PokeAPI y almacena la respuesta en una constante.
response.data.results es una matriz de objetos, cada uno de los cuales representa un Pokémon.
La función map itera sobre la matriz de resultados y crea una nueva matriz con objetos que contienen solo el nombre y la URL de cada Pokémon.
res.json(pokemonList) envía la lista de objetos Pokémon (nombre y URL) como una respuesta JSON al cliente.
- GET /api/pokemon/:id (Obtener un Pokémon específico):

Este punto final recupera un Pokémon específico por su ID de PokeAPI.
const { id } = req.params; extrae el ID del parámetro de ruta URL.
Estructura similar al controlador de ruta anterior, obtiene un solo Pokémon por ID, extrae su nombre y tipos, y lo envía de vuelta como una respuesta JSON.
- GET /api/pokemonAndTypes/:id (Obtener Pokémon con tipos traducidos):

Este punto final recupera un Pokémon específico por ID y traduce sus tipos al español y japonés (si está disponible).
Sigue los mismos pasos iniciales que el punto final anterior para obtener los datos de Pokémon.
pokemon.types.map(...) itera sobre los tipos de Pokémon y crea una matriz de Promesas. Cada Promesa obtiene las traducciones para un tipo específico.
axios.get(...) dentro del mapa llama a PokeAPI para obtener detalles de cada tipo (incluidos los nombres en diferentes idiomas).
typeResponse.data.names.reduce(...) filtra las traducciones relevantes ("es" para español, "ja" para japonés) y crea un objeto que contiene el tipo y sus traducciones.
Promise.all(typeTranslationsPromises) espera a que se resuelvan todas las promesas de traducción de tipo.
Finalmente, res.json(...) envía el objeto Pokemon con sus tipos traducidos como una respuesta JSON.
6. Inicio del servidor:

app.listen(PORT, ...): esta línea inicia el servidor Express y escucha las solicitudes entrantes en el puerto especificado.
console.log(...): esta línea

