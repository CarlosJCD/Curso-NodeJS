const { getAge } = require("./get-age.plugin");
const { getUUID } = require("./uuid.plugin");
const { httpClientPlugin } = require("./http-client.plugin");

module.exports = {
    getAge,
    getUUID,
    httpClientPlugin 
}