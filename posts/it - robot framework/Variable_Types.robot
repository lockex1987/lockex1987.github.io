*** Settings ***
Library    SeleniumLibrary


*** Variables ***
# Scalar
${url}    https://opensource-demo.orangehrmlive.com/
# List
@{credentials}    Admin    admin123
# Dictionary
&{elements}    btnLogin=btnLogin   btnHeader=welcome    btnLogout=Logout


*** Test Cases ***
Test Login
    Open Browser    ${url}    chrome
    Input Text        id=txtUsername    ${credentials}[0]
    Input Password    id=txtPassword    ${credentials}[1]
    Click Button    id=${elements}[btnLogin]
    Click Element    id=${elements}[btnHeader]
    Set Browser Implicit Wait    5s
    Click Element    link=${elements}[btnLogout]
    # Environment
    Log    This test was executed by %{username} on %{os}
