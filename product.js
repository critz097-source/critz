import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    let products = await kv.get('critzProducts');
    if (!products) {
      products = [
        {id:'longsleeve',title:'LONG SLEEVE TEE',price:35000,images:['longsleeve.png','longsleeve-back.png'],sizes:['S','M','L','XL','XXL']},
        {id:'hoodie',title:'CRITZ HOODIE',price:40000,images:['hoodie.png','hoodie-back.png'],sizes:['M','L','XL','XXL']},
        {id:'sleeveless',title:'GRAPHIC SLEEVELESS TEE',price:25000,images:['harmlesstee.png','harmlesstee-back.png'],sizes:['S','M','L','XL']}
      ];
      await kv.set('critzProducts', products);
    }
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    const products = req.body;
    await kv.set('critzProducts', products);
    return res.status(200).json({ok:true});
  }
}