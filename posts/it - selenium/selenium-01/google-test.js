const { Builder, By, Key } = require('selenium-webdriver');

async function testGoogle() {
    const driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://google.com');
    const keyword = 'webdriver';

    driver.findElement(By.name('q')).sendKeys(keyword);

    await driver.sleep(1000);

    // Nhấn Key.ENTER để search luôn
    driver.findElement(By.name('q')).sendKeys(Key.ESCAPE);

    await driver.sleep(1000);

    const buttons = await driver.findElements(By.name('btnK'));
    const button = buttons[1];
    // const buttonText = await button.getText();
    const buttonText = await button.getAttribute('value'); // nó là thẻ input với type bằng submit
    console.log(buttonText);
    await button.click();

    await driver.sleep(2000);

    const title = await driver.getTitle();
    console.log(title);
    if (title.includes(keyword)) {
        console.log('Test passed');
    } else {
        console.log('Test failed');
    }

    await driver.quit();
}

testGoogle();
