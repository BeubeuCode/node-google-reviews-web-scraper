const puppeteer  = require('puppeteer');
const express = require('express');
const app = express();

const connect = async (url) => {
    console.log('Launching headless chrome...');
    url = url.toString();
    const browser = await puppeteer.launch({args: ['--disabled-setuid-sandbox', '--no-sandbox']});
    const page = await browser.newPage();
    console.log('going to url');
    await page.goto(url);
    console.log(page.url);
    console.log('waiting for selector');
    await page.waitForSelector('.section-review-text');
    console.log('it\'s here ! now loop through data...')
    const data = await page.evaluate(() => {
        let reviewAuthorNamesClasses = document.getElementsByClassName('section-review-title');
        let reviewAuthorNames = [];
        for (let elements of reviewAuthorNamesClasses) {
            reviewAuthorNames.push(elements.innerText);
        }
        let datesClasses = document.getElementsByClassName('section-review-publish-date');
        let dates = [];
        for(let elements of datesClasses) {
            dates.push(elements.innerText);
        }

        let ratingsClasses = document.getElementsByClassName('section-review-stars');
        let ratings = [];
        for (let elements of ratingsClasses) {
            ratings.push(elements.innerText);
        }

        let reviewsContentClasses = document.getElementsByClassName('section-review-text');
        let reviewsContent = []
        for(let elements of reviewsContentClasses) {
            reviewsContent.push(elements.innerText);
        }
        console.log('looping done, reeturning data...');
        return {
            reviewAuthorNames,
            dates,
            ratings,
            reviewsContent
        }
    })
    browser.close();
    return data;
    
};

const getReviews = async (url) => {
    let rev;
    connect(url).then((data) => {
       rev = data;
    });
    return new Promise( resolve => {
            JSON.stringify(rev)
        }
    );
};


app.get('/', (req, res) => {
    getReviews("https://www.google.fr/maps/place/Joaillerie+Fr%C3%A9d%C3%A9ric+Parisse/@48.9597679,2.8768007,17z/data=!3m1!4b1!4m5!3m4!1s0x47e8a103de996a61:0xae40c24c34d9e2ea!8m2!3d48.9597644!4d2.8789894").then((data) => {
        res.status(200).json(data);
    })
})

app.listen(3000, () => {
    console.log("server on");
})