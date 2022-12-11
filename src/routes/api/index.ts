import express from 'express';
import path from 'path';
import fs from 'fs';
import resizeImage from '../../utilities';

const images = express.Router();
const morgan = require('morgan');

/**
* Use morgan to log all the incoming requests to console 
**/
images.use(morgan('tiny'));

/**
* Use an application-level middleware to check if the requested 
* file have been pre-stored before regenerating a new image each time
**/
images.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const filePath = `${
      path.join(__dirname, '../../assets/thumb/') + req.query.filename
    }_thumb_${req.query.width}_${req.query.height}.jpg`;

    if (fs.existsSync(filePath)) {
      res.status(200).sendFile(filePath);
    } else if(req.query?.test){
			res.status(200).send('test success');
		} else {
      next();
    }
  }
);

/**
* if the requested file is not pre-stored before regenerate 
* a new image and store it for future requests and return this new generated image
**/
images.get('/images', async (req, res) => {	
  const filename = req.query.filename;
  const imgWidth: number = parseInt(req.query.width as string);
  const imgHeight: number = parseInt(req.query.height as string);
  const imgPath = `${
    path.join(__dirname, '../../assets/full/') + filename
  }.jpg`;
  const filePath = `${
    path.join(__dirname, '../../assets/thumb/') + filename
  }_thumb_${imgWidth}_${imgHeight}.jpg`;

  await resizeImage(imgPath, imgWidth, imgHeight, filePath);
  res.status(200).sendFile(filePath);
});

export default images;
