import express from 'express';
import images from './routes/api/index';

const app = express();
const port = 3000;

/**
* Get routes from the images routes and 
* use them in our main application
**/
app.use('/api', images);

app.listen(port, () => {
  console.log(`server started at https://localhost:${port}`);
});

export default app;
