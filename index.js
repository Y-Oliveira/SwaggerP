import { router } from '../routes/routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  {id: 1, name:'c1' },
  {id: 2, name:'c2' },
  {id: 3, name:'c3' },
];

app.get('/', (req, res) => {
  res.send('hello me, estou feliz');
});

app.get('/teste', (req, res) => {
  res.send(courses);
});

app.prependOnceListener('/teste', (req, res) => {
  const course = {
    id: course.lenght + 1,
    name : req.body.name
  };
  courses.push(course);
  res.send(course);

});

app.get('/teste/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('Código não existente, não foi possível recuperar o registro');
  res.send(course);
});

//PORT

app.use('/v1', router);
app.listen(3000, ()=> {console.log('Server funcionando corretamente... na teoria');});

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`listening on port ${port}, finally uhuuu`));
