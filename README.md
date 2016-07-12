This is a sample blackjack application.

Packages Included

Build: Webpack, Babel (es2015 and React), Sass loaders, webpack-dev-server, react-hot-loader

Test: Mocha, Chai, Enzyme

Front-end: React, React-Dom, React-Redux, React-Router, Redux-form, Redux-Saga, Isomorphic-Fetch, Immutable

How to Run Things

Install all dependencies:

npm install
Run webpack:

npm run webpack
Automatically run webpack when files change:

npm run webpack:watch
Run tests:

npm run test
Run tests automatically when files change:

npm run test:watch
Run webpack-dev-server (master branch is configuration for Cloud9. local branch has configuration for running on localhost).

You don't need to run webpack:watch if you are running the dev server.

npm run webpack-dev-server


****We needs to conect to an ruby on rails API to see the aplication working*******

This API allows to save/load wins and losses record

cd to react-blackjack-api directory 
install the bundle
bundle install

create/migrate the database
rake db:create/rake db:migrate

start the server with:
rails s -b $IP -p 8081

Rails application will be running on port 8081.
We can reference it from the React application at the URL: localhost:8081.

Instructions to see wins/losses records saved:

Try loading the page with an easy to remember token (add ?token=1 to the end of the URL you visit to see your application).

https://react-blackjack-yamidgc9.c9users.io/?token=1

Play a few games. Then close the page, and open it again with the same token. You should see that your record is the same as when you left!
(to save the last play you should )