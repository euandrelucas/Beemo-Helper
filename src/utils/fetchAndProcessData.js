const axios = require('axios');

/**
 * Função para buscar e processar dados de um URL.
 * @param {string} url - O URL de onde os dados serão buscados.
 */
function fetchAndProcessData(url) {
    return axios.get(url).then(function(response) {
        const data = response.data;
        const rawIdsSection = data.split('Raw IDs:')[1];
        const rawIds = rawIdsSection.trim().split('\n').map(function(id) {
            return id.trim();
        }).filter(function(id) {
            return id;
        });
        const sortedIds = rawIds.reverse();
        return sortedIds; // Retorna os IDs ordenados
    }).catch(function(error) {
        console.error('Erro ao fazer a requisição:', error);
        throw error; // Propaga o erro
    });
}

module.exports = fetchAndProcessData;
