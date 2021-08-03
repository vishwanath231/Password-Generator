
// DOM Elements

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');



const randomFun = {
    lower : getRandomLowerCase,
    upper : getRandomUpperCase,
    number : getRandomNumber,
    symbol : getRandomSymbols
};

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerHTML = generatePassword(
        hasUpper, 
        hasLower, 
        hasNumber, 
        hasSymbol , 
        length
    );
})

clipboardEl.addEventListener('click' , () => {
    const textArea = document.createElement('textarea');
    const password = resultEl.innerHTML;
    
    if (!password) {
        return;
    }
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('password copied to clipboard');
})

// generate password

function generatePassword(upper, lower, number, symbol, length){

    // 1. Init pw var
    // 2. Filter out unchecked type
    // 3. Loop over lenth call generator function for each type
    // 4. add final pw to the pw var and return

    let generatedPassword = '';

    const typeCount = upper + lower + number + symbol;

    const TypesArr = [{upper},{lower},{number},{symbol}].filter
    (item => 
        Object.values(item)[0]
    )

    if (typeCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i+=typeCount) {
        TypesArr.forEach(type => {
            const funName = Object.keys(type)[0];

            generatedPassword += randomFun[funName]();
        })
        
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;

}




// 26 means => english letters
// 65 means => browser set lower case character code and also starting code number
function getRandomLowerCase(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}


// 26 means => english letters
// 65 means => browser set Upper case character code and also starting code number
function getRandomUpperCase(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}


// 10 means => number of numbers
// 48 means => browser set number character code and also starting code number
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}


// Random Symbols
function getRandomSymbols(){
    const symbols = '!@#$%^&*{}()=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
