const getAgePlugin = require("get-age");

/**
 * 
 * @param {string} birthdate 
 * @returns {number | Error}
 */
const getAge = (birthdate) => birthdate ? getAgePlugin(birthdate) : new Error("Birthdate is required");

module.exports = {
    getAge
}