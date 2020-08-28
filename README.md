# node-google-reviews-web-scraper
## Get the reviews from any google maps business 🗺
### Contributions are highly appreciated !
---
`npm install google-reviews-web-scraper`

setup :

`npm install`

`npm run start (launches program with nodemon)`

## Description
This project aims to scrape data from the google maps business page in order to get the reviews
(it's not in the api, why google ?)
### Technologies used
* Puppeteer
* Express
* NodeJS (duh)
## Usage
There is a webserver in there, you can run it with `npm run serve`, and connect to `localhost:3000` to get a json response with the url in the script. However, it is WIP so the point is just to return the data.

You can also run `npm run start`, which will show you the eiffel tower reviews (in french, cocorico !).
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
where `url` is a string.
A google maps business url looks like this :
```
https://www.google.com/maps/place/Tour+Eiffel/@48.8583736,2.292298,17z/data=!4m5!3m4!1s0x47e66e2964e34e2d:0x8ddca9ee380ef7e0!8m2!3d48.8583701!4d2.2944813
```
The json object returned by the api looks like this :
```json
{
  "reviewAuthorNames": [
    "Alexandre MASSON",
    "Caroline Nédélec",
    "Romain VILCOQ"
  ],
  "dates": ["il y a 5 jours", "il y a 2 semaines", "il y a 2 semaines"],
  "ratings":[5, 5, 5],
  "reviewsContent": [
    "Magnifique et incontournable monument de la capitale française. A absolument faire lors de votre visite parisienne ! Haute de 321 mètres, cette tour de fer surplombe la région parisienne. Véritable prouesse architecturale et scientifique, …",
    "Un lieu toujours magnifique. Attention ne vous faites pas photographier de force par tous ces photographes qui traînent dans la tour et qui veulent vous vendre des photos à prix d'or. Évidemment les prix ne sont pas affichés et le tarif est …",
    "La dame de fer est l'emblème de notre capitale, le monument à visiter en priorité. \nLa vue depuis le sommet est incontournable !\nL'ascension par les escaliers est une belle expérience et permet de profiter au mieux de la structure, cependant elle est réservée aux plus sportifs. La descente est possible également 😉"
  ]
}

```