import axios from "axios";

export const httpClientPlugin = {
    get: async(url: string) => {
        return await axios.get(url).then( response => response.data);
    }

};
