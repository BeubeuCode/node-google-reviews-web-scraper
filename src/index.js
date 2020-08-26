const cheerio = require('cheerio');
const fetch = require('node-fetch');

const request = async (url) => {
    const res = await fetch(url);
    return res.text();
}
const getReviews = (url) => {

    request(url).then((result) => {
        console.log(result);
    });
}

getReviews("https://www.google.com/search?sxsrf=ALeKk00EiSrLos7NiyV30nvQPSxTQRBufw%3A1598455328698&ei=IH5GX4yVKsnwaKPBrpgB&q=atoutgamer&oq=atoutgamer&gs_lcp=CgZwc3ktYWIQAzIECCMQJzIECAAQDTIECAAQDTIGCAAQDRAeMgYIABANEB4yAggmOgQIABAKOgUIABCxAzoCCAA6CAgAELEDEIMBOggILhCxAxCDAToCCC46BwgjELECECc6BwgjELACECc6BggAEA0QCjoGCAAQChAeOgoIABAIEA0QChAeUMmWqAFYr6moAWCiqqgBaAdwAHgAgAFhiAG4B5IBAjE2mAEAoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwiMpbmQlrnrAhVJOBoKHaOgCxMQ4dUDCA0&uact=5#lrd=0x47e8a17426f68255:0x6e147b67bf598b81,1,,,");