import json
from suds.client import Client

USER = 'ESvpb+e9Lsg='
PASS = 'AmWFg9vXrw4='

client = Client('http://www.lienhoanhoa.net/ws/wsStory_Search.asmx?wsdl').service

response = client.Get_All(USER, PASS, 0, 100)
all_truyen = json.loads(response)
result = []
for truyen in all_truyen:
    #print(truyen)
    print(truyen["TEN_TRUYEN"])
    response = client.Get_Truyen(USER, PASS, truyen["ID_TRUYEN"], 0, 20)
    #print(response)
    all_bo_truyen = json.loads(response)
    versions = []
    for bo_truyen in all_bo_truyen:
        #print(bo_truyen)
        #print(bo_truyen['ID_BO_TRUYEN'], bo_truyen['TEN_BO_TRUYEN'], bo_truyen['FOLDER'], bo_truyen['DESCRIPTION'])
        response = client.Get_BoTruyen(USER, PASS, bo_truyen['ID_BO_TRUYEN'], 0, 200)
        #print(response)
        all_tap_truyen = json.loads(response)
        chapters = []
        for tap_truyen in all_tap_truyen:
            #print(tap_truyen['ID_TAP_TRUYEN'], tap_truyen['TEN_TAP_TRUYEN'], tap_truyen['FOLDER'], tap_truyen['SO_TRANH'])
            #response = client.Get_TapTruyen(USER, PASS, tap_truyen['ID_TAP_TRUYEN'])
            #print(response)
            # TEN_TAP_TRUYEN, SO_TRANH, FOLDER 
            chapters.append({
                "id": tap_truyen['ID_TAP_TRUYEN'],
                "name": tap_truyen['TEN_TAP_TRUYEN'],
                "folder": tap_truyen['FOLDER'],
                "pages": tap_truyen['SO_TRANH']
            })
        versions.append({
            "id": bo_truyen['ID_BO_TRUYEN'],
            "name": bo_truyen['TEN_BO_TRUYEN'],
            "folder": bo_truyen['FOLDER'],
            "chapters": chapters
        })
    result.append({
        "id": truyen["ID_TRUYEN"],
        "name": truyen["TEN_TRUYEN"],
        "folder": truyen["FOLDER"],
        "versions": versions
    })

# Convert \u to Unicode
#pretty_json = json.dumps(all_truyen, indent=2).encode('utf-8')
pretty_json = json.dumps(result, indent=2, ensure_ascii=False).encode('utf-8')
print(pretty_json)
with open('all_truyen.json', 'w') as file:
    file.write(pretty_json)

