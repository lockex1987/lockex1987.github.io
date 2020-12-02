# Xâu chứa cả nháy đơn và nháy kép
str_contains_both_quotes = "I'm \"Nguyen Van Huyen\""
print(str_contains_both_quotes)

# Lặp chuỗi
str_repeat = "0" * 10
print(str_repeat)

# Kiểm tra xem một chuỗi có trong chuỗi khác không
print("Huyen" in "Nguyen Van Huyen")
print("Duong" in "Nguyen Van Huyen")

# Chuỗi con
# Đừng đặt tên biến là str
# Vì có hàm str chuyển kiểu dữ liệu về xâu
s = "0123456789"
print(len(s))
print(s[3])
print(s[-2])
print(s[3:5])
print(s[:5:1])
print(s[:5:-1])

# Ép kiểu
print(int("69") + 5)
print(int(6.9))
x = str(69) + "5"
print("69" + str(5))

# Format
print('My team is %s' % 'Kteam')
print('{ returnCode: %d, message: "%s" }' % (0, 'Success'))
my_name = "Nguyen Van Huyen"
print(f'My name is {my_name}')
print('My name is {}'.format(my_name))