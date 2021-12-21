import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { router } from './routes/routes';

import swaggerDocs from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/terms', (request, response) => {
  return response.json({
    message: 'teste - termos de serviço',
  });
});

app.use('/v1', router);
app.listen(3000, ()=> {console.log('Server funcionando corretamente... na pratica');});

