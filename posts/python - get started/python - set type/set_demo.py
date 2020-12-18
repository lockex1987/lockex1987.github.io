'''
Kiểu dữ liệu set trong Python
'''

my_set = { 1, 2, 3 }
print(my_set)
print(type(my_set))
print(1 in my_set)
print(-1 in my_set)

# Khởi tạo set từ String
set_1 = set("aaaaaa");
print(set_1)

# Trừ giữa 2 tập hợp
# Chỉ tồn tại trong tập thứ nhất mà không tồn tại trong tập thứ hai
print({ 1, 2, 3 } - { 1, 4 })

# Giao giữa 2 tập hợp
# Vừa tồn tại ở tập thứ nhất và tập thứ hai (cả 2 đều có)
print({ 1, 2, 3 } & { 1, 4 })

print({ 1, 2, 3 } | { 1, 4 })

# Chỉ tồn tại ở một tập
print({ 1, 2, 3 } ^ { 1, 4 })
