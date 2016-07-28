def d(k,n)
    a=[0]*k*n
    sequence = []
    def db(t, p):
        if t > n:
            if n % p == 0:
                for j in range(1, p + 1):
                    sequence.append(a[j])
        else:
            a[t] = a[t - p]
            db(t + 1, p)
            for j in range(a[t - p] + 1, k):
                a[t] = j
                db(t + 1, t)
    db(1, 1)
    return sequence

seq = d(9, 9) # cyclic
seq = seq + seq[:8]   # extended to max
print(''.join(map(lambda n: chr(49+n), seq)))