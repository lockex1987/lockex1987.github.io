*** Settings ***
Documentation    A sample test
Library          SeleniumLibrary


*** Test Cases ***
Search Google
    [Documentation]    Google test
    [Tags]    regression
    Open Browser    https://google.com    chrome
    Set Browser Implicit Wait    5
    Input Text    name=q    Robot framework
    # Press Keys    name=q    ENTER
    Click Button    name=btnK
    Sleep    2s
    Close Browser
