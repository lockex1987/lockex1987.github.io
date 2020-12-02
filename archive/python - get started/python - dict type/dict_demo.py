dic = dict(k = 69, hkt = 'HowKteam')
print(dic)

dic['k'] += 1
print(dic)

print(dic.get('hkt'))
print(dic.get('khong co'))
print(dic.get('khong co', 'Gia tri mac dinh'))
#try:
print(dic['khong co'])