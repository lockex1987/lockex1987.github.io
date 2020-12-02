def demo_1():
    for i in range(10):
        print(i)
        x = 10 / 0

def demo_2():
    for i in range(10):
        print(i)
        try:
            x = 10 / 0
        except Exception as ex:
            pass

#demo_1()
demo_2()
