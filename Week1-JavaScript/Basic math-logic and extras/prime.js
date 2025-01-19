function sieve(num) {
    let primes = new Array(num + 1).fill(true)
    primes[0] = false
    primes[1] = false
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (primes[i] == true) {
            for (let j = i * i; j <= num; j += i) {
                primes[j] = false;
            }
        }
    }

    return primes
}

x = 49
let primeNumCheck = sieve(x)
let ans = `Primes up to ${x}:`
for (let i = 2; i <= x; i++) {
    if (primeNumCheck[i] == true)
        ans += ` ${i}`
}
console.log(ans);
