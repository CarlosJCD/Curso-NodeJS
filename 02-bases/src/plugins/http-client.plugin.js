const axios = require("axios")

const httpClientPlugin = {
    get: async(url) => {
        return await axios.get(url).then( response => response.data);
    }

};

 

module.exports = {
    httpClientPlugin,
};

