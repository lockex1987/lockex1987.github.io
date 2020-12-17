a = [i for i in range(30)]
print(a)

b = [[n, n * 2, n * 3] for n in range(3)]
print(b)

c = list("Nguyen Van Huyen")
print(c)

d1 = [1, 2, 3]
d2 = d1.copy();
d1[0] = "XXX"
print(d1)
print(d2)

e1 = [1, 2, 3]
e2 = e1.clear()
print(e1)
print(e2)
# e1 trả về [] vì không có phần tử nào
# e2 trả về None vì nó không dính dáng đến e1, là kết quả trả về của hàm clear