const { Builder } = require('selenium-webdriver');

async function getStarted() {
    const driver = await new Builder().forBrowser('chrome').build();
    const url = 'https://google.com';
    await driver.get(url);
}

getStarted();
