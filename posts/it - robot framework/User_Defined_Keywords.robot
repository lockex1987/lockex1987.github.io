*** Settings ***
Library    SeleniumLibrary
Suite Setup       Log    I am inside Test Suite Setup
Suite Teardown    Log    I am inside Test Suite Teardown
Test Setup        Log    I am inside Test Test Setup
Test Teardown     Log    I am inside Test Test Teardown


*** Variables ***
# Scalar
${url}    https://opensource-demo.orangehrmlive.com/
# List
@{credentials}    Admin    admin123
# Dictionary
&{elements}    btnLogin=btnLogin   btnHeader=welcome    btnLogout=Logout


*** Keywords ***
# Tương tự hàm trong ngôn ngữ lập trình
LoginKW
    Input Text        id=txtUsername    ${credentials}[0]
    Input Password    id=txtPassword    ${credentials}[1]
    Click Button    id=${elements}[btnLogin]

*** Test Cases ***
Test Login
    Open Browser    ${url}    chrome
    LoginKW
    Click Element    id=${elements}[btnHeader]
    Set Browser Implicit Wait    5s
    Click Element    link=${elements}[btnLogout]
    # Environment
    Log    This test was executed by %{username} on %{os}
