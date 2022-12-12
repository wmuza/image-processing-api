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
    // Check if all the required parameters are supplied and in correct format
    if (!req.query.filename)
      return res.end('filename is required');
    if (!req.query.width || isNaN(Number(req.query.width as string)))
      return res.end('width is required and should be a number');
    if (!req.query.height || isNaN(Number(req.query.height as string)))
      return res.end('height is required and should be a number');

    //Define the path to check if the image has been cached before
    const filePath = `${
      path.join(__dirname, '../../../src/assets/thumb/') + req.query.filename
    }_thumb_${req.query.width}_${req.query.height}.jpg`;

    //Check if the image exist in the thumb folder or not
    if (fs.existsSync(filePath)) {
      res.status(200).sendFile(filePath);
    } else if (req.query?.test) {
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
images.get(
  '/images',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const filename = req.query.filename;
    const imgWidth: number = parseInt(req.query.width as string);
    const imgHeight: number = parseInt(req.query.height as string);

    //Define the path for the file to be resized
    const imgPath = `${
      path.join(__dirname, '../../../src/assets/full/') + filename
    }.jpg`;

    //Define the path to store the resized file for caching
    const filePath = `${
      path.join(__dirname, '../../../src/assets/thumb/') + filename
    }_thumb_${imgWidth}_${imgHeight}.jpg`;

    //Check if the image requested for resize exists and throw error if not
    if (!fs.existsSync(imgPath))
      res
        .status(401)
        .send('Sorry the filename provided does not exist in our server');

    try {
      //Attempt to resize the image based on the user sizes
      await resizeImage(imgPath, imgWidth, imgHeight, filePath);
      res.status(200).sendFile(filePath);
    } catch (error) {
			if(!res.headersSent) {
				//Tell user that we had an error in processing the image
				res
					.status(401)
					.send('Unfortunately we have failed to process your image');
			}
    }
  }
);

export default images;
