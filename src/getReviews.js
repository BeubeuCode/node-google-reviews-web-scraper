const puppeteer  = require('puppeteer');

const getReviews = async (url, output = "json") => {
    output = output.toLowerCase();
    if (output != "json" && output != "object") {
        console.error('INVALID OUTPUT OPTION');
        return;
    }
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
            ratings.push(elements.children.length);
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
    console.log('done ! closing browser...')
    browser.close();
    console.log(data);
    return new Promise((resolve, reject) => {
        if(output === "json") {
            resolve(JSON.stringify(data));
        } else if(output === "object") {
            resolve(data);
        }
        if(reject) {
            reject({error: "error while scraping data."})
        }
    })
    
};

module.exports = getReviews;