
const chrome = require('selenium-webdriver/chrome');
const { Builder } = require('selenium-webdriver');

async function setDriverPath() {
    // chrome.setDefaultService(new chrome.ServiceBuilder('D:/program/selenium-web-drivers/chromedriver x.exe').build());
    const driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://google.com');
}

setDriverPath();
