# -*- coding: utf-8 -*-
import time


def function_decorator(func):
    def wrapper(name):
        print("Something is happening before some_function() is called.")
        new_name = "Hello " + name
        func(new_name)
        #return function()
        print("Something is happening after some_function() is called.")

    return wrapper

#@function_decorator
def just_some_function(name):
    print(name)

my_name = 'Nguyen Van Huyen'
just_some_function(my_name)

wrapper_function = function_decorator(just_some_function)
wrapper_function(my_name)

def timing_function(some_function):
    """
    Outputs the time a function takes to execute.
    """
    def wrapper(*args, **kwargs):
        wrapper.count = wrapper.count + 1
        t1 = time.time()
        retval = some_function(*args, **kwargs)
        t2 = time.time()
        print("Time it took to run the function: " + some_function.__name__ + ": " + str((t2 - t1)))
        print("{0} has been used: {1}x".format(func.__name__, wrapper.count))
        return retval
    wrapper.count = 0
    return wrapper

def method_friendly_decorator(method_to_decorate):
    def wrapper(self, lie):
        lie = lie - 3 # very friendly, decrease age even more :-)
        self.todo = "TODO"
        return method_to_decorate(self, lie)
    return wrapper


class Wife(object):

    def __init__(self):
        self.age = 24

    @method_friendly_decorator
    def say_your_age(self, lie):
        print("I am %s, what did you think? %s" % (self.age + lie, self.todo))

vp = Wife()
vp.say_your_age(-3)
# outputs: I am 18, what did you think?


def decorator_maker_with_arguments(decorator_arg1, decorator_arg2):

    print("I make decorators! And I accept arguments:",
          decorator_arg1, decorator_arg2)

    def my_decorator(func):
        print("I am the decorator.  You passed me arguments:",
              decorator_arg1, decorator_arg2)

        # Don't confuse decorator arguments and function arguments!
        def wrapped(function_arg1, function_arg2):
            print("I am the wrapper around the decorated function.\n"
                  "I can access all the variables\n"
                  "\t- from the decorator: {0} {1}\n"
                  "\t- from the function call: {2} {3}\n"
                  "Then I can pass them to the decorated function"
                  .format(decorator_arg1, decorator_arg2,
                          function_arg1, function_arg2))
            return func(function_arg1, function_arg2)

        return wrapped

    return my_decorator


@decorator_maker_with_arguments("Ngoc Anh", "Viet Phuong")
def decorated_function_with_arguments(function_arg1, function_arg2):
    print("I am the decorated function with arguments",
          function_arg1, function_arg2)

decorated_function_with_arguments("wife", "husband")
# output:
# I make decorators! And I accept arguments: Ngoc Anh Viet Phuong
# I am the decorator.  You passed me arguments: Ngoc Anh Viet Phuong
# I am the wrapper around the decorated function.
# I can access all the variables
#   - from the decorator: Ngoc Anh Viet Phuong
#   - from the function call: wife husband
# Then I can pass them to the decorated function
# I am the decorated function with arguments wife husband



# Để debug, chúng a in ra tên của hàm
def foo():
    print("foo")

print(foo.__name__) # output: foo

# Nếu dùng decorator, mọi thứ khác đi nhiều.
def bar(func):
    def wrapper():
        print("bar")
        return func()
    return wrapper

@bar
def foo():
    print("foo")

print(foo.__name__) # output: wrapper

# "functools" có thể giúp chúng ta

import functools

def bar(func):
    # Đây là wrapper bao bọc hàm được decorator.  Tuy nhiên, sự kỳ
    # diệu ở đây là nhờ functools.
    @functools.wraps(func)
    def wrapper():
        print("bar")
        return func()
    return wrapper

@bar
def foo():
    print("foo")

print(foo.__name__) # output: foo
