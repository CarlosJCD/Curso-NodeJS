import { envs } from '../../config';

import { seedData } from './data';
import {MongoDatabase } from '../mongo';
import { CategoryModel, ProductModel, UserModel } from '../mongo/models';


(async()=> {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })

    await main();

})();


const randomBetween0And = ( x: number ) => {
    return Math.floor( Math.random() * x );
}



async function main() {

    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany(),
    ])


    const users = await UserModel.insertMany( seedData.users );

    const categories = await CategoryModel.insertMany(
        seedData.categories.map( category => {

        return {
            ...category,
            user: users[0]._id
        }

        })
    );

    const products = await ProductModel.insertMany(
        seedData.products.map( product => {

        return {
            ...product,
            user: users[ randomBetween0And( seedData.users.length - 1 ) ]._id,
            category: categories[ randomBetween0And( seedData.categories.length - 1 )  ]._id
        }


        })
    );



    console.log('SEEDED');


}