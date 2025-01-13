// Fizzbuzz game: Two players count from 1 to 100
// If the number is multiples of 3 => 1 player say "Fizz"
// If the number is multiples of 5 => 1 player say "Buzz"
// If both cases above are true (eg. 15) => both player say "FizzBuzz"

// Follow up question: 
// 1. Write a function for any number
// 2. What if we want the program to work on 7s, not 5s?

function fizzbuzz(number) {
    for (let i = 1; i <= number; i++) {
        let string = ""
        if (i % 3 == 0) { string += "Fizz" }
        if (i % 5 == 0) { string += "Buzz" }
        if (string == "") {
            string += i
        }
        document.write(string + "<br/>")
    }
}

fizzbuzz(100)