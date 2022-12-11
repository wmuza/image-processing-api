import app from '../index';
import path from 'path';
import request from 'supertest';
import resizeImage from '../utilities';

/**
* Test endpoint response
**/
describe('1. Test endpoint response', function () {
  it('1.1 Gets the /api/images endpoint', async function () {
    const response = await request(app)
      .get('/api/images')
      .query({ filename: 'palmtunnel', width: "700", height: "600", test: "yes" });

    expect(response.status).toEqual(200);
  });
});

/**
* Test image processing functionality
**/
describe('2. Test image processing', () => {
  it('2.1 Expect resizeImage to not throw an error', async () => {
    const imgPath = `${path.join(__dirname, '../../src/assets/full/')}palmtunnel.jpg`;
    const filePath = `${path.join(__dirname, '../../src/assets/thumb/')}test_thumb_100_100.jpg`;

    await resizeImage(imgPath, 100, 100, filePath);
  });

  it('2.2 Expect resizeImage to throw an error', async () => {
    const imgPath = `${path.join(__dirname, '../../assets/full/')}palmtunnel.jpg`;
    const filePath = `${path.join(__dirname, '../../src/assets/thumb/')}test_thumb_100_100.jpg`;

    let error;
    try {
      await resizeImage(imgPath, 100, 100, filePath);
    } catch (e) {
        error = e;
    }
    const expectedError = new Error("failed to resize image");
    expect(error).toEqual(expectedError)
  });
});
