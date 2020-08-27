const getReviews = require('./getReviews');

async function main() {
    try {
        const data = await getReviews("https://www.google.com/maps/place/Tour+Eiffel/@48.8583736,2.292298,17z/data=!4m5!3m4!1s0x47e66e2964e34e2d:0x8ddca9ee380ef7e0!8m2!3d48.8583701!4d2.2944813");
        console.log(JSON.stringify(data));
    } catch(e) {
        console.log(e);
    }

}

main();