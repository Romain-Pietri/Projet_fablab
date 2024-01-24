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
const collectionName = "Reservation";

async function getAllReservation_() {
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

function getAllReservation(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getAllReservation_());
        }, 1000);
    });
}

async function getOneReservation_(id) {
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

function getOneReservation(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getOneReservation_(id));
        }, 1000);
    });
}

async function createReservation_(data) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.insertOne(data);
        console.log(`Un document a été inséré avec l'id ${result.insertedId}`);
        return result;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function createReservation(data){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(createReservation_(data));
        }, 1000);
    });
}

async function deleteReservation_(id) {
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

function deleteReservation(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(deleteReservation_(id));
        }, 1000);
    });
}

async function modifReservation_(id, data) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.updateOne({ id: id }, { $set: data });
        console.log(`${result.matchedCount} document(s) a/ont été modifié(s)`);
        return result;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function modifReservation(id, data){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(modifReservation_(id, data));
        }, 1000);
    });
}




module.exports = {
    getAllReservation,
    getOneReservation,
    createReservation,
    deleteReservation,
    modifReservation
}