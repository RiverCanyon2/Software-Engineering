const stripe = require('stripe')("sk_test_51KUacTD22xwXIH9AEsOzPfEz1ubkV8dk9Ap2geattU62d0lcInXaUdM92qNIlsw9JTOx6MSp3tzHVwZikj0jKUP900gga9ydHI");


export default async function handler(req,res) {
    if(req.method === 'GET') {
        
        const response = await stripe.customers.list({
            limit: 3,
          });
        res.status(200).send(response);
     
    }
}