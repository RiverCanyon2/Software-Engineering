import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://SoftwareEngineers:Password123@cluster0.qvxrk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);
const db = client.db('groceryStore');
const collection = db.collection('items');


export default async function handler(req,res) {
    if(req.method === 'GET') {
        await client.connect();
        const response = await collection.find({category: 'vegetarian'}).toArray();
    
        res.status(200).send(response);
        client.close();
    }
}