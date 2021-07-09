*** Settings ***
Library    SeleniumLibrary


*** Test Cases ***
Test Login
    Open Browser    https://opensource-demo.orangehrmlive.com/    chrome
    Input Text        id=txtUsername    Admin
    Input Password    id=txtPassword    admin123
    Click Button    id=btnLogin
    Click Element    id=welcome
    Set Browser Implicit Wait    5s
    Click Element    link=Logout
    Log    Test completed
