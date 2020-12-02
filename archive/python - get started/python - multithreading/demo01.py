import time
import threading

def cal_square(numbers):
    print("Calculate square number")
    for n in numbers:
        time.sleep(0.2)
        print('square:', n * n)

def cal_cube(numbers):
    print("Calculate cube number")
    for n in numbers:
        time.sleep(0.2)
        print('cube:', n * n * n)

arr = [2, 3, 7, 9]

def demo_without_thread():
    cal_square(arr)
    cal_cube(arr)

def demo_with_multithread():
    t1 = threading.Thread(target=cal_square, args=(arr,))
    t2 = threading.Thread(target=cal_cube, args=(arr,))
    t1.start()
    t2.start()
    t1.join()
    t2.join()

starttime = time.time()
#demo_without_thread()
demo_with_multithread()
print("Done in", time.time() - starttime)
