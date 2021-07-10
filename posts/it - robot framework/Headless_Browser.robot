*** Settings ***
Library      SeleniumLibrary

*** Test Cases ***
Create Headless Browser
    ${url} =    Set Variable    http://google.com

    # Open Browser   ${url}    chrome

    ${chrome_options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys
    Call Method    ${chrome_options}    add_argument    test-type
    Call Method    ${chrome_options}    add_argument    --disable-extensions
    Call Method    ${chrome_options}    add_argument    --headless
    Call Method    ${chrome_options}    add_argument    --disable-gpu
    Call Method    ${chrome_options}    add_argument    --no-sandbox
    Call Method    ${chrome_options}    add_argument    --disable-dev-shm-usage
    ${EXCLUDES}    Create list     enable-logging
    # this removes the option "enable-logging" which chromedriver automatically starts Chrome with
    Call Method    ${chrome_options}    add_experimental_option    excludeSwitches  ${EXCLUDES}
    Create Webdriver    Chrome    chrome_options=${chrome_options}
    Go To    ${url}

    Set Window Size    1920    1080
    # Maximize Browser Window

    ${title}=    Get Title
    Should Be Equal    Google    ${title}
    [Teardown]    Close Browser
