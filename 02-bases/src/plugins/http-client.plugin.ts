import axios from "axios";

export const httpClientPlugin = {
    get: async(url: string) => {
        return await axios.get(url).then( response => response.data);
    },
    post: async(url: string, body: any ) => {
        throw new Error('Not implemented');
    },
    put: async(url: string, body: any) => {
        throw new Error('Not implemented');
    },
    delete: async(url: string ) => {
        throw new Error('Not implemented');
    },
};
