import express from 'express';
import images from './routes/api/index';

const app = express();
const port = 3000;

/**
 * Get routes from the images routes and
 * use them in our main application
 **/
app.use('/api', images);

/**
 * The following callback is executed for requests to ./ whether
 * using GET, POST, PUT, DELETE, or any other HTTP request method
 **/
app.all('/', (req: express.Request, res: express.Response): void => {
  res
    .status(200)
    .send(
      'Welcome to the image processing api. See example api call http://localhost:3000/api/images?filename=palmtunnel&width=500&height=500'
    );
});

app.listen(port, (): void => {
  console.log(`server started at https://localhost:${port}`);
});

export default app;
