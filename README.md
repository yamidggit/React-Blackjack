*This is a sample blackjack application.

Surge: react-blackjack.surge.sh

*We needs to conect to an ruby on rails API to see the aplication working
 the api is on heroku: https://api-to-save-wins-losses.herokuapp.com

*Instructions to see wins/losses records saved:

Try loading the page with an easy to remember token (add ?token=2 to the end of the URL you visit to see your application).

  react-blackjack.surge.sh/?token=2

Play a few games. Then close the page, and open it again with the same token. You should see that your record is the same as when you left!
(to save the last play you should push the next game button before closing the page)

*Packages Included

Build: Webpack, Babel (es2015 and React), Sass loaders, webpack-dev-server, react-hot-loader

Test: Mocha, Chai, Enzyme

Front-end: React, React-Dom, React-Redux, React-Router, Redux-form, Redux-Saga, Isomorphic-Fetch, Immutable

How to Run Things

*Install all dependencies:

npm install
Run webpack:


Automatically run webpack when files change:

npm run webpack:watch
Run tests:

npm run test
Run tests automatically when files change:

npm run test:watch
Run webpack-dev-server (master branch is configuration for Cloud9. local branch has configuration for running on localhost).

You don't need to run webpack:watch if you are running the dev server.

npm run webpack-dev-server

*production 
npm run webpack:prod


