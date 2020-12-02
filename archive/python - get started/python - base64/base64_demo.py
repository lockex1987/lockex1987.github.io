import base64

def demo_python_2():
    original_str = 'huyenduong'
    encoded_str = base64.b64encode(original_str)
    decoded_str = base64.b64decode(encoded_str)

    print(original_str)
    print(encoded_str)
    print(decoded_str)

def demo_python_3():
    original_str = 'huyenduong'
    original_bytes = original_str.encode()

    encoded_bytes = base64.b64encode(original_str)
    encoded_bytes = base64.b64encode(original_bytes)

    decoded_bytes = base64.b64decode(encoded_bytes)
    decoded_str = base64.b64decode(encoded_bytes)
    decoded_str = decoded_bytes.decode()

    print(original_str)
    print(encoded_bytes)
    print(decoded_str)

demo_python_2()
