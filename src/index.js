const puppeteer = require('puppeteer');

const connect = async (url) => {
    const browser = await puppeteer.launch({args: ['--disabled-setuid-sandbox', '--no-sandbox']});
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(5000);
    const data = await page.evaluate(() => {
        document.getElementsByClassName('.section-review.content');
    })
    return data;
};

const getReviews = (url) => {
    connect(url).then((data) => {
        console.log(data);
    });
};

getReviews("https://www.google.fr/maps/place/A+tout+gamer+2.0/@48.9543665,2.8773257,17z/data=!3m1!4b1!4m5!3m4!1s0x47e8a17426f68255:0x6e147b67bf598b81!8m2!3d48.954363!4d2.8795144");