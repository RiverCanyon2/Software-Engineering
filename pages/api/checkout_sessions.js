const stripe = require('stripe')("sk_test_51KUacTD22xwXIH9AEsOzPfEz1ubkV8dk9Ap2geattU62d0lcInXaUdM92qNIlsw9JTOx6MSp3tzHVwZikj0jKUP900gga9ydHI");
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
   });
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        line_items: req.body.line_items,
        mode: 'payment',
        payment_method_types: ["card"]
      });
      res.json({url: session.url})
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}