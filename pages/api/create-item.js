import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://SoftwareEngineers:Password123@cluster0.qvxrk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);
const db = client.db('groceryStore');
const collection = db.collection('items');


export default async function handler(req,res) {
    console.log("WHOOP");
    if(req.method === 'POST') {
        const data = req.body;
        await client.connect();
        await collection.insertOne(data);

        res.status(200).send(data);
        client.close();
    }
}