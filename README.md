This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### express-graphql:

This is a graphQL package that can be used as an express middleware
and it allows us to point at a schema, resolvers and automatically connect it all for us and rout requests to a parser and then handle them according to our schema and forward them to the right resolvers

### graphql:

It will allow us to defy and setup a GraphQL schema. It will parse and convert (to JS you could say) the schema, The parsed and converted schema latter can be used together with express-graphql

### hosting options:
first, make a repo in github. second https://codeanywhere.com/ you can create a free account, is a vps, you can installe mern stack with one click in ubuntu. and last run git clone (your repo) and then run npm install for your node packages. codeanywhere is a great free option, but if you cn pay 5 dollars go for a digital ocean vps, (codeanywhere have some bugs in my opinion), and in a digital ocean vps you can host many pages as you want, and with subdomains, you can use nginx as a reverse proxy etc. you have more options in digital ocean and is well documentated﻿