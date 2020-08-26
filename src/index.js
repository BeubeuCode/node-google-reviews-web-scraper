const puppeteer  = require('puppeteer');

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
    let rev;
    connect(url).then((data) => {
       rev = data;
    });
    return JSON.stringify(rev);
};

const server = http.createServer( async (req, res) => {
    data = await getReviews('https://www.google.com/maps/place/PACA+PROPERTY/@43.3044293,5.3650846,845m/data=!3m2!1e3!4b1!4m5!3m4!1s0x12c9c1e868092f43:0x2ad1fc8819550843!8m2!3d43.3044254!4d5.3672733')
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(data);
});
