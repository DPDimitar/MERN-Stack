# MERN - tech testing

## Short summary

An online application that will allow users to register and log in. After successful registration, they will be able to send a message to the page, which should contain an address and a file with an image.

The public part of the application, accessible without login, should list all submitted images with titles and the number of votes the image received. It should also include the name of the user who uploaded the image, as well as the date and time the image was uploaded, and the images should be sorted by the time they were uploaded (fresh images are at the top). If the user selects an image from the list, it is shown in detailed mode, with user comments written below it. If the user is logged in, he can also vote for the picture (if he doesn't already have one), and he can also add a comment under the picture.
The entire application is written in the React framework and is using services to communicate with the server.

## To run this example:

1. Make sure you have navigated to 'server' directory.
2. Run `npm install`
3. Set the credentials in ./app.js
4. Then run `npm run dev`
5. In new terminal navigate to 'client' directory. 
6. Run `npm install`
7. Run `npm start`

After this process is finished, navigate to your http://localhost:3000 to see the results