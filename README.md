# Udacity Image Processing API

I have an API that can be used in two different ways. As a simple placeholder API, the first allows me to place images into my frontend with the size set via URL parameters for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout my site, the API you create will handle resizing and serving stored images for me.


## Project setup

First, clone this repo and switch into the repo folder:

```bash
git clone https://github.com/wmuza/image-processing-api.git
cd image-processing-api
```

Now you need to install the dependencies for the server code.

### Set up the Express server

```bash
npm install
```

### Lint the code using Eslint

```bash
npm run lint
```

### Format the code using Prettier

```bash
npm run format
```

### Build and Test the app using Jasmine

```bash
npm run test
```

### Now that everything is set up, you can test the app by starting the server using nodemon

```bash
npm run start
```

Server is running at [http://localhost:3000](http://localhost:3000).

You can access the api endpoint in the browser at [Click Here](http://localhost:3000/api/images?filename=palmtunnel&width=500&height=500).
 
