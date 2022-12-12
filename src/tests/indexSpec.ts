import app from '../index';
import path from 'path';
import request from 'supertest';
import resizeImage from '../utilities';

/**
 * Test endpoint response
 **/
describe('1. Test endpoint response', function (): void {
  it('1.1 Gets the /api/images endpoint', async function (): Promise<void> {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app).get('/api/images').query({
      filename: 'palmtunnel',
      width: '700',
      height: '600',
      test: 'yes'
    });

    expect(response.status).toEqual(200);
  });
});

/**
 * Test image processing functionality
 **/
describe('2. Test image processing', (): void => {
  it('2.1 Expect resizeImage to not throw an error', async (): Promise<void> => {
    //Define the path for the file to be resized
    const imgPath = `${path.join(
      __dirname,
      '../../src/assets/full/'
    )}palmtunnel.jpg`;

    //Define the path to store the resized file for caching
    const filePath = `${path.join(
      __dirname,
      '../../src/assets/thumb/'
    )}test_thumb_100_100.jpg`;

    //Attempt to resize the image based on the user sizes
    await resizeImage(imgPath, 100, 100, filePath);
  });

  it('2.2 Expect resizeImage to throw an error', async (): Promise<void> => {
    //Define the path for the file to be resized
    const imgPath = `${path.join(
      __dirname,
      '../../assets/full/'
    )}palmtunnel.jpg`;

    //Define the path to store the resized file for caching
    const filePath = `${path.join(
      __dirname,
      '../../src/assets/thumb/'
    )}test_thumb_100_100.jpg`;

    let error;

    try {
      //Attempt to resize the image based on the user sizes
      await resizeImage(imgPath, 100, 100, filePath);
    } catch (e) {
      error = e;
    }

    //Define the expected error
    const expectedError = new Error('failed to resize image');
    expect(error).toEqual(expectedError);
  });
});
