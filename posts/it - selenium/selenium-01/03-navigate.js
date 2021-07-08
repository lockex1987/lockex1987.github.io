const { Builder } = require('selenium-webdriver');

async function navigate() {
    const driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://google.com');
    await driver.sleep(1000);
    await driver.get('https://selenium.dev');
    await driver.sleep(1000);
    await driver.navigate().back();
    await driver.sleep(1000);
    await driver.navigate().forward();
    await driver.sleep(1000);
    await driver.navigate().refresh();
}

navigate();
