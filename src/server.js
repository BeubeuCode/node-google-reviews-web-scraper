const express = require('express');
const { getReviews } = require('./getReviews')
app = express();

app.get('/', async (req, res) => {
    try {
        const data = await getReviews("https://www.google.fr/maps/place/Joaillerie+Fr%C3%A9d%C3%A9ric+Parisse/@48.9597679,2.8768007,17z/data=!3m1!4b1!4m5!3m4!1s0x47e8a103de996a61:0xae40c24c34d9e2ea!8m2!3d48.9597644!4d2.8789894")
        res.json(data);
    }catch(e) {
        res.send(e);
    }
})

app.listen(3000, () => {
    console.log("server on");
})