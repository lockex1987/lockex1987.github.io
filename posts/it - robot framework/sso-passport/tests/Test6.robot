*** Settings ***
Library    Selenium2Library 
Library    DateTime

Resource    ${OUTPUT_DIR}/BDS.Config.resource

*** Variables ***
${downloadDir}    ${OUTPUT_DIR}\\Files\\Downloads

*** Keywords ***
Customize Open Browser    [Arguments]    ${URL}    ${BROWSER}=Chrome
    Run Keyword If    '${BROWSER}'=='HeadlessChrome'    Open Headless Chrome Browser To Page    ${URL}
    ...    ELSE    Open Browser Many Time    ${URL}    ${BROWSER}
    Run Keyword If    '${env}'=='StagingCM'    Set Server Cookie CM
    Maximize Browser Window
    #Set Window Size    1920    1080
    #Go To    ${URL}
    
Open Browser Many Time    [Arguments]    ${URL}    ${BROWSER}=Chrome
    FOR    ${i}    IN RANGE    10
    ${pass}    Run Keyword And Return Status
    ...    Run Keyword If    '${BROWSER}' == 'Chrome'    Open Chrome Browser    ${URL}
    ...    ELSE    Open Browser    ${URL}    ${BROWSER}
    Exit For Loop If    ${pass}
    Sleep    5
    END

Open Chrome Browser    [Arguments]    ${URL}
    ${chromeOptions} =    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    ${prefs}    Create Dictionary    download.default_directory=${downloadDir}
    Call Method    ${chromeOptions}    add_experimental_option    prefs    ${prefs}
    ${prefs}    Create Dictionary    geolocation=True
    Call Method    ${chromeOptions}    add_experimental_option    prefs    ${prefs}
    Create Webdriver    Chrome    chrome_options=${chrome_options}
    Go To    ${URL}

Open Headless Chrome Browser To Page    [Arguments]    ${URL}
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
    Set Window Size    1920    1080
    Go To    ${URL}
    
Set Server Cookie CM
    Delete Cookie    SERVERID
    Add Cookie    SERVERID    CM    domain=beta.bds.lc
    

 