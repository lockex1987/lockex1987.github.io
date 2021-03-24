import json
import os
import threading
try:
    from urllib.request import urlretrieve
    from queue import Queue
except ImportError:
    from urllib import urlretrieve
    from Queue import Queue


ROOT = "data"
queue = Queue()


def make_dir(mypath):
    if not os.path.exists(mypath):
        os.makedirs(mypath)


def get_images():
    # 0 - 20
    issue = 1
    idx = 0
    with open('data.json', 'r') as file:
        data = json.loads(file.read())
        for story in data:
            for version in story['versions']:
                if idx > 10:
                    make_dir(os.path.join(ROOT, story['folder'], version['folder']))
                    for chapter in version['chapters']:
                        make_dir(os.path.join(ROOT, story['folder'], version['folder'], chapter['folder']))
                        prefix = '%s/%s/%s/' % (story['folder'], version['folder'], chapter['folder'])
                        queue.put(prefix + "000.jpg")
                        queue.put(prefix + "000a.jpg")
                        queue.put(prefix + "000b.jpg")
                        for i in range(1, chapter['pages'] + 1):
                            queue.put(prefix + ("%03d" % i) + ".jpg")
                        queue.put(prefix + "End.jpg")
                idx += 1


def downloader():
    while True:
        file = queue.get()
        try:
            print(file)
            urlretrieve('http://lienhoanhoa.net/online/' + file, ROOT + '/' + file)
        except Exception as ex:
            print("Error when downloading %s: %s" % (file, ex))
        queue.task_done()


def main():
    get_images()
    num_worker_threads = 5
    for i in range(num_worker_threads):
        t = threading.Thread(target=downloader)
        t.daemon = True
        t.start()
    queue.join()


main()
