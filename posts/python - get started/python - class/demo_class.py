class Animal():
    name = ''
    def __init__(self, name = ''):
        self.name = name
    def show(self):
        print('My name is', self.name)
    def talk(self):
        print('Will be override')

class Dog(Animal):
    def talk(self):
        print("Gau gau")

class Cat(Animal):
    def talk(self):
        print("Meo meo")
    def catch_mouse(self):
        print(self.name, "catch mouse")

def main():
    dog = Dog('Bob')
    dog.show()
    dog.talk()
    cat = Cat("Lucy")
    cat.show()
    cat.talk()
    cat.catch_mouse()

main()
