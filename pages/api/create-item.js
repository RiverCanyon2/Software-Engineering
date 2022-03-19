const stripe = require('stripe')("sk_test_51KUacTD22xwXIH9AEsOzPfEz1ubkV8dk9Ap2geattU62d0lcInXaUdM92qNIlsw9JTOx6MSp3tzHVwZikj0jKUP900gga9ydHI");
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
        
        
        const skuProd = await stripe.products.create({name: data.itemName, type: 'good'});
        
                
        const stripeData = {
            image: data.imageUrl,
            price: data.costToMarket * 100,
            currency: 'usd',
            inventory: {type: 'finite', quantity: 1},
            product: skuProd.id,
        }
        const sku = await stripe.skus.create(stripeData);

        const sendData = {data,sku};

        data.id=sku.id
        console.log(data.id);
        await collection.insertOne(data);

        console.log(skuProd);
        console.log(sku);
        res.status(200).send(sendData);
        client.close();
    }
}