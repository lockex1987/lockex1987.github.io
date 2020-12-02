import json

raw_json = '''
{
    "field_str": "Hello Python",
    "field_int": 123,
    "field_float": 45.6,
    "field_array": [1, 2, 3, 4, 5]
}
'''
data = json.loads(raw_json)
string_json = json.dumps(data)
pretty_json = json.dumps(data, indent = 2)

print(data)
print(data["field_str"])
print(string_json)
print(pretty_json)
