const isPalindrome = (string) => {

    let re = /[\W_]/g;
    let lowerString = string.toLowerCase().replace(re, '')

    const reverseString = lowerString.split('').reverse().join('')
    return reverseString === lowerString;


}

console.log(isPalindrome('A man, a plan, a canal. Panama')); //true
console.log(isPalindrome('hello')); //false
console.log(isPalindrome('level')); //true