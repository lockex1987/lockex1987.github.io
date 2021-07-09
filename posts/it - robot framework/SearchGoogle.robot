*** Settings ***
Library    SeleniumLibrary


*** Test Cases ***
SearchGoogle
    Open Browser    https://google.com    chrome
    Set Browser Implicit Wait    5
    Input Text    name=q    Robot framework
    Click Button    name=btnK
    Sleep    2
    Close Browser
