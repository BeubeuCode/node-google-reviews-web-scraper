const puppeteer  = require('puppeteer');
const http = require('http');

const connect = async (url) => {
    const browser = await puppeteer.launch({args: ['--disabled-setuid-sandbox', '--no-sandbox']});
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(1000);
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

const getReviews = (url) => {
    connect(url).then((data) => {
        console.log(JSON.stringify(data));
    });
};

getReviews("https://www.google.fr/maps/place/A+tout+gamer+2.0/@48.9543665,2.8773257,17z/data=!3m1!4b1!4m5!3m4!1s0x47e8a17426f68255:0x6e147b67bf598b81!8m2!3d48.954363!4d2.8795144");