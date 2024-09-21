const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

// 1. GET /api/pokemon - List all first 100 Pokemons
app.get('/api/pokemon', async (req, res) => {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon?limit=100`);
        const pokemonList = response.data.results.map((pokemon) => ({
            name: pokemon.name,
            url: pokemon.url
        }));
        res.json(pokemonList);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from PokeAPI' });
    }
});

// 2. GET /api/pokemon/:id - Get a specific Pokemon
app.get('/api/pokemon/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${id}`);
        const pokemon = {
            name: response.data.name,
            types: response.data.types.map(type => type.type.name)
        };
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from PokeAPI' });
    }
});

// 3. GET /api/pokemonAndTypes/:id - Get a specific Pokemon with types translated to Spanish and Japanese
app.get('/api/pokemonAndTypes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${id}`);
        const pokemon = {
            name: response.data.name,
            types: response.data.types.map(type => type.type.name)
        };

        const typeTranslationsPromises = pokemon.types.map(async (type) => {
            const typeResponse = await axios.get(`${POKEAPI_BASE_URL}/type/${type}`);
            const translations = typeResponse.data.names.reduce((acc, name) => {
                if (name.language.name === 'es') {
                    acc.spanish = name.name;
                }
                if (name.language.name === 'ja') {
                    acc.japanese = name.name;
                }
                return acc;
            }, {});
            return { type: type, translations: translations };
        });

        const typesWithTranslations = await Promise.all(typeTranslationsPromises);
        res.json({ name: pokemon.name, types: typesWithTranslations });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from PokeAPI' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
