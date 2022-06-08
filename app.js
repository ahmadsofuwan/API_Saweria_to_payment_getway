const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const serverPort = 3000;
fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const headlessStatus = false; //true no Ui

var btnGues = '#chakra-modal--body-1 > div > div > button.css-14g2g9s';
var nominal = '#amount';
var from = '#from';
var email = '#email';
var message = '#message';
var agree = '#__next > div > div > div.css-7haoy3 > form > div:nth-child(5) > label > span.chakra-checkbox__control.css-1oi6yiz';
var qris = '#__next > div > div > div.css-7haoy3 > form > div.chakra-stack.css-xiepgc > div.css-gt1vrs > div > button';
var qr = '#__next > div > div > div.css-dvxtzn > div > div > img';
function go(data, callback) {
  (async () => {
    const browser = await puppeteer.launch({
      headless: headlessStatus,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      handleSIGINT: false,
      handleSIGTERM: false,
      handleSIGHUP: false,
    });
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();
    await page.goto(data.donatelink);
    await navigationPromise;
    await page.click(btnGues);
    await navigationPromise;
    await page.type(nominal, data.amount);
    await page.type(from, 'Api Saweria');
    await page.type(email, 'ApiSaweria@mail.com');
    await page.type(message, data.message);
    await page.click(agree);
    await page.click(qris);
    await page.waitForSelector(qr).then(() => '');
    await navigationPromise;
    await page.waitForTimeout(100);
    var qrCode = await page.evaluate(() => {
      return document.querySelector('#__next > div > div > div.css-dvxtzn > div > div > img').src;
    });
    browser.close();
    return callback(qrCode);
  })();
}
app.post('/', (req, res) => {
  go(req.body, function (data) {
    res.send(data);
  });
});

var doc = '\nsend post : amount,donatelink and message';
app.listen(serverPort, () => console.log('Server Berjalan di port ' + serverPort, doc));
