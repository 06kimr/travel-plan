import express from "express";
import apiRouter from "./api";

const server = await (async () => {
  const app = express();
  const port = 3000;

  app.use(express.json())
  app.use('/api', apiRouter);
  app.get('/', (req, res) => {
    res.send("Hello World!")
  })

  return app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })
})();

(() => {
  if(import.meta.hot){
    import.meta.hot.accept(async() => {
      await server.close();
    })
  }
})();