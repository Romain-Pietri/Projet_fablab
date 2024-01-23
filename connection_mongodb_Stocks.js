const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://romainpietri:4vZ82ApZxpsG4mwz@projectfablab.n96bi5x.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
const dbName = "Fablab";
const collectionName = "Stocks";

async function getAllStocks_() {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const query = {};
        const options = {};
        const documents = await collection.find(query, options).toArray();
        if (documents.length === 0) {
            console.log("Aucun document trouvé!");
            return false;
        }
        return documents;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function getAllStocks(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getAllStocks_());
        }, 1000);
    });
}

async function getOneStock_(id) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const query = { id: id };
        const options = {};
        const documents = await collection.find(query, options).toArray();
        if (documents.length === 0) {
            console.log("Aucun document trouvé!");
            return false;
        }
        return documents;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function getOneStock(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getOneStock_(id));
        }, 1000);
    });
}

async function createStock_(stock) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.insertOne(stock);
        console.log(`Un nouveau stock a été inséré avec l'ID ${result.insertedId}`);
        return result;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function createStock(stock){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(createStock_(stock));
        }, 1000);
    });
}

async function deleteStock_(id) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.deleteOne({ id: id });
        console.log(`${result.deletedCount} document(s) a/ont été supprimé(s)`);
        return result;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function deleteStock(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(deleteStock_(id));
        }, 1000);
    });
}

async function modifStock_(id, stock) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.replaceOne({ id: id }, stock);
        console.log(`${result.modifiedCount} document(s) a/ont été modifié(s)`);
        return result;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function modifStock(id, stock){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(modifStock_(id, stock));
        }, 1000);
    });
}

async function getAllFromStock_(id) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const query = { id: id };
        const options = {};
        const documents = await collection.find(query, options).toArray();
        if (documents.length === 0) {
            console.log("Aucun document trouvé!");
            return false;
        }
        return documents;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function getAllFromStock(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getAllFromStock_(id));
        }, 1000);
    });
}

async function modifyNumberStock_(id, number) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.updateOne({ id: id }, { $inc: { "nb": number } });
        console.log(`${result.modifiedCount} document(s) a/ont été modifié(s)`);
        return result;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}
function modifyNumberStock(id, number){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(modifyNumberStock_(id, number));
        }, 1000);
    });
}

module.exports = {getAllStocks, getOneStock, createStock, deleteStock, modifStock, getAllFromStock, modifyNumberStock};