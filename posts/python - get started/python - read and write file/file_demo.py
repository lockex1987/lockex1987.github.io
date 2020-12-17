f = open('file_demo_sample.txt', 'r')
print(f)
f.close()
print("Finish")

with open('data.json', 'w') as file:
    file.write(json.dumps(data, indent=2, ensure_ascii=False).encode('utf-8'))

with open('file_demo_sample.txt', 'r') as f:
    data = f.read()
    print(data)

print("OK")
