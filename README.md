# node-google-reviews-web-scraper
## Get the reviews from any google maps business
---
setup :

`npm install`

`npm run start (launches program with nodemon)`

## Description
This project aims to scrape data from the google maps business page in order to get the reviews
(it's not in the api, why google ?)
### Technologies used
* Puppeteer
* Express

## Usage
There is a webserver in there, you can run it with `npm run start`, and connect to `localhost:3000` to get a json response with the url in the script. However, it is WIP so the point is just to return the data.

### Re-use the code
There is only one interesting function inside the `getReviws.js` file, and it's the `getReviews(url)` method.
```js
const getReviews = async (url) => {
    /**
     * Steps :
     * Open headless chrome with puppeteer
     * load the link
     * evaluate js expressions in the headless chrome instance 
     * return a slue of the interesting data.
     */
};
```
as it is exported, you can take this file and import the method by doing something like this :
```js
const getReviews = require('./getReviews');
```
## Import it with NPM
If you installed it with npm, you can do the following
```js
const getReviews = require('google-reviews-web-scraper');
```
and then, calling the mod with the following args :
```js
getReviews(url);
```
where `url` is a string, 