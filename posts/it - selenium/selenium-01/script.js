// "type": "module",
// import { Builder } from 'selenium-webdriver';
// import fs from 'fs';

const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/proxy');
const { Builder, Capabilities } = require('selenium-webdriver');
const fs = require('fs');



async function myFunction() {
    const driver = await new Builder().forBrowser('chrome').build();

    // chrome.setDefaultService(new chrome.ServiceBuilder('path/to/chromedriver').build());

    await driver.get('https://cttd.tk');

    // await driver.getCurrentUrl();
    // await driver.navigate().back();
    // await driver.navigate().forward();
    // await driver.navigate().refresh();
    // await driver.getTitle();


    // Access each dimension individually
    const { width, height } = await driver.manage().window().getRect();

    // Or store the dimensions and query them later
    const rect = await driver.manage().window().getRect();
    const width1 = rect.width;
    const height1 = rect.height;

    console.log(width);
    console.log(height);
    console.log(width1);
    console.log(height1);

    // await driver.manage().window().setRect({ width: 1024, height: 768 });

    await driver.quit();
}

// myFunction();


async function takeScreenshot() {
    const opts = new chrome.Options();
    const proxyConfig = proxy.manual({
        http: '192.168.103.26:80',
        sslProxy: '192.168.103.26:80'
    });
    opts.setProxy(proxyConfig);

    const driver = await new Builder()
        .forBrowser('chrome')

        // Sử dụng proxy của hệ thống
        // Thiết lập proxy của hệ thống là 192.168.103.26:80
        // .setChromeOptions(opts)
        // .withCapabilities(Capabilities.chrome())
        // .setProxy(proxyConfig)

        .build();

    await driver.get('https://selenium.dev'); // https://cttd.tk, https://selenium.dev

    // Returns base64 encoded string
    const encodedString = await driver.takeScreenshot();

    fs.writeFileSync('./dist/image.png', encodedString, 'base64');
    await driver.quit();
}

takeScreenshot();
