const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

let driver;


async function initDriver() {
    driver = await new Builder().forBrowser('chrome').build();
}

async function demoBasicFunctions() {
    const url = 'https://google.com';
    await driver.get(url);

    const pageSource = await driver.getPageSource();
    const currentUrl = await driver.getCurrentUrl();
    const title = await driver.getTitle();
    // console.log(pageSource);
    console.log(currentUrl);
    console.log(title);

    await driver.quit();
}

async function takeScreenshot() {
    // Returns base64 encoded string
    const encodedString = await driver.takeScreenshot();
    fs.writeFileSync('./dist/screenshot.png', encodedString, 'base64');
}

async function windowSize() {
    const { width, height } = await driver.manage().window().getRect();
    console.log(width);
    console.log(height);
    await driver.manage().window().setRect({ width: 1024, height: 768 });
    // await driver.manage().window().maximize();
    const rect = await driver.manage().window().getRect();
    console.log(rect);
    console.log(rect.width);
    console.log(rect.height);
}

async function exportPdf() {
    const opts = new chrome.Options();
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(opts.headless())
        .build();
    await driver.get('https://www.selenium.dev');
    const base64 = await driver.printPage({ pageRanges: ['1-2'] });
    fs.writeFileSync('./dist/test.pdf', base64, 'base64');

    await driver.quit();
}

async function main() {
    await initDriver();
    demoBasicFunctions();
    takeScreenshot();
    windowSize();
}

// main();
exportPdf();
