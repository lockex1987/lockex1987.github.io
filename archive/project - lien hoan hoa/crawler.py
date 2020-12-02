import json
from suds.client import Client

USER = 'ESvpb+e9Lsg='
PASS = 'AmWFg9vXrw4='

client = Client('http://www.lienhoanhoa.net/ws/wsStory_Search.asmx?wsdl').service

all_truyen = json.loads(client.Get_All(USER, PASS, 0, 100))
data = []
for truyen in all_truyen:
    all_bo_truyen = json.loads(client.Get_Truyen(USER, PASS, truyen["ID_TRUYEN"], 0, 20))
    versions = []
    for bo_truyen in all_bo_truyen:
        all_tap_truyen = json.loads(client.Get_BoTruyen(USER, PASS, bo_truyen['ID_BO_TRUYEN'], 0, 200))
        chapters = []
        for tap_truyen in all_tap_truyen:
            chapters.append({ "id": tap_truyen['ID_TAP_TRUYEN'], "name": tap_truyen['TEN_TAP_TRUYEN'], "folder": tap_truyen['FOLDER'], "pages": tap_truyen['SO_TRANH'] })
        versions.append({ "id": bo_truyen['ID_BO_TRUYEN'], "name": bo_truyen['TEN_BO_TRUYEN'], "folder": bo_truyen['FOLDER'], "chapters": chapters })
    data.append({ "id": truyen["ID_TRUYEN"], "name": truyen["TEN_TRUYEN"], "folder": truyen["FOLDER"], "versions": versions })

with open('data.json', 'w') as file:
    file.write(json.dumps(data, indent=2, ensure_ascii=False).encode('utf-8'))
