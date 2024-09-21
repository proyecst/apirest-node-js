// index.js

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON requests
app.use(express.json());

// Route to get the first 100 Pokémon
app.get('/api/pokemon', async (req, res) => {
    try {
        // Fetch data from PokeAPI
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        const pokemons = response.data.results;

        // Map the results to a simpler format
        const formattedPokemons = pokemons.map(pokemon => ({
            name: pokemon.name,
            url: pokemon.url
        }));

        // Send the formatted response
        res.json(formattedPokemons);
    } catch (error) {
        console.error('Error fetching data from PokeAPI:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});