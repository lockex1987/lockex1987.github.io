import threading
import time

class MyThread(threading.Thread):
    def __init__(self, name, counter, delay):
        super(MyThread, self).__init__()
        self.name = name
        self.counter = counter
        self.delay = delay

    def run(self):
        print("San sang chay %s" % self.name)
        while self.counter:
            time.sleep(self.delay)
            print("%s: %s" %(self.name, time.ctime(time.time())))
            self.counter -= 1
        print("Ket thuc %s" % self.name)

def demo():
    t1 = MyThread("T1", 10, 3)
    t2 = MyThread("T2", 12, 2)
    t1.start()
    t2.start()

demo()
