def fibo(n):
    if n <= 2:
        return 1
    #print(n)
    return fibo(n - 1) + fibo(n - 2)

memo = {
    1: 1,
    2: 1
}

def fibo_m(n):
    if n not in memo:
        print(str(n) + ": " + str(memo))
        memo[n-2] = fibo_m(n - 2)
        memo[n-1] = fibo_m(n - 1)
        memo[n] = memo[n-1] + memo[n-2]
    return memo[n]

def memoize(fn, n):
    __memo = {}
    if n not in __memo:
        __memo[n] = fn(n)
    return __memo[n]

def fibo_m_f(n):
    return memoize(fibo, n)

class Memoize:
    def __init__(self, f):
        self.f = f
        self.memo = {}

    def __call__(self, *args):
        if not args in self.memo:
            self.memo[args] = self.f(*args)
        return self.memo[args]

fibo_1 = Memoize(fibo)

@Memoize
def fibo_2(n):
    if n <= 2:
        return 1
    return fibo_2(n - 2) + fibo_2(n - 1)

for i in range(1, 10):
    #print(fibo(i))
    #print(fibo_m(i))
    pass

#fibo(10)
#fibo_m(10)
#fibo_m_f(10)
fibo_1(10)
fibo_2(10)

