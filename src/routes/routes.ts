import { Router } from 'express';
import { v4 as uuid} from 'uuid';
import { ensuredAuthenticaded } from  '../middlewares/index';

const router = Router();

interface ProductsT{
  name: string;
  description: string;
  price: number;
  id: string;
}

const products: ProductsT[] = [];



router.get('/products/findByName', (request, response) => {
  const {name} = request.query;
  const product = products.filter((p) => p.name.includes(String(name)));
  return response.json(product);
});

router.get('/products/:id', (request, response) => {
  const {id} = request.params;
  const product = products.find((product) => product.id === id);
  return response.json(product);
});

router.post('/products', ensuredAuthenticaded, (request, response) => {
  const {name, description, price} = request.body;

  const productAlreadyExits = products.find((product) => product.name === name);

  if (productAlreadyExits) {
    return response.status(400).json({message: 'O item já existe!'}); 
  }

  const product: ProductsT ={
    description,
    name,
    price,
    id: uuid(),
  };

  products.push(product);

  return response.json(product);
});

router.put('/products/:id', ensuredAuthenticaded, (request, response)=>{
  const { id } = request.params;
  const { name, description, price } = request.body;

  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return response.status(400).json({message : 'Item não existe!'});
  }

  const product: ProductsT = Object.assign({
    name,
    description,
    price,
  });

  products[productIndex] = product;

  return response.json (product);
});

export { router };


