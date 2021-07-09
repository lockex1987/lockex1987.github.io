*** Variables ***
${c}    ${10}


*** Test Cases ***
DemoGlobalVariable1
    ${a}    Set Variable    ${5}
    ${b}    Set Variable    ${4}
    ${c}    Evaluate    ${a} + ${b}
    # Set Global Variable    ${c}
    Log To Console    Tổng hai số ${a} + ${b} là ${c}


DemoGlobalVariable2
    ${a}    Set Variable    ${5}
    ${b}    Set Variable    ${4}
    ${sum}    Evaluate    ${a} + ${b} + ${c}
    Log To Console    Tổng ba số ${a} + ${b} + ${c} bằng ${sum}
