export default function routes(app) {
  app.get('/', (req, res) => {
      res.send({ welcome_to: 'my-api' });
    });
}

