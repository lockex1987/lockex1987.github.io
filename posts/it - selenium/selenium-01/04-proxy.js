const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/proxy');
const { Builder, Capabilities } = require('selenium-webdriver');

async function setProxy() {
    const opts = new chrome.Options();
    const proxyAddress = '192.168.103.26:80';

    // Sử dụng thế này không được
    const proxyConfig = proxy.manual({
        http: `http://${proxyAddress}`,
        sslProxy: `http://${proxyAddress}`
    });
    // opts.setProxy(proxyConfig);

    // Sử dụng thế này được
    opts.addArguments(`--proxy-server=http://${proxyAddress}`);

    const driver = await new Builder()
        .forBrowser('chrome')

        // .setChromeOptions(opts)

        // Không được
        // .withCapabilities(Capabilities.chrome()).setProxy(proxyConfig)

        .build();

    await driver.get('https://selenium.dev');
}

setProxy();
