import threading
import time

def daemon():
    print (threading.currentThread().getName(), 'Starting')
    time.sleep(2)
    print (threading.currentThread().getName(), 'Exiting')

def non_daemon():
    print (threading.currentThread().getName(), 'Starting')
    print (threading.currentThread().getName(), 'Exiting')

t1 = threading.Thread(name='daemon', target=daemon)
t1.setDaemon(True)
t2 = threading.Thread(name='non_daemon', target=non_daemon)
t1.start()
t2.start()
