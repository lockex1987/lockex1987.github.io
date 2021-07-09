*** Settings ***
Documentation    A sample test
Library          SeleniumLibrary

*** Test Cases ***
Demo Selenium
    Open Browser    https://google.com    chrome
    Input Text    name=q    Robot framework
    Press Keys    name=q    ENTER
    # Click Button    name=btnK    
    Sleep    2s
    Close Browser
