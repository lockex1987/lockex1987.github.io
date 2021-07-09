*** Test Cases ***
DemoLocalVariable
    ${a}    Set Variable    ${5}
    ${b}    Set Variable    ${4}
    ${sum}    Evaluate    ${a} + ${b}
    # Log To Console    Tổng hai số nguyên ${a} + ${b} là ${sum}
    # Log    Tổng hai số nguyên ${a} + ${b} là ${sum}
    Log    Tổng hai số nguyên
