const screenExp = document.getElementById("screen-exp")
const screenExpPast = document.getElementById("screen-exp-past")
const btnNum = document.getElementsByClassName("btn-num")
const btnOp = document.getElementsByClassName("btn-op")
const btnAC = document.getElementById("btn-AC")
const btnC = document.getElementById("btn-C")
const btnSign = document.getElementById("btn-sign")
const btnPercent = document.getElementById("btn-percent")
const btnEqual = document.getElementById("btn-equal")


function clearAll(){
    screenExp.innerHTML = '0'
    screenExpPast.innerHTML = '0'
}

function clear() {
    screenExp.innerHTML = '0'
}

btnAC.addEventListener('click', clearAll)
btnC.addEventListener('click', clear)

function calculate(){
    screenExpPast.innerHTML = screenExp.innerHTML
    screenExp.innerHTML = eval(screenExp.innerHTML)
}

function calculatePercent(){
    screenExpPast.innerHTML = screenExp.innerHTML + "%"
    screenExp.innerHTML = eval(screenExp.innerHTML + "/100")
}

function inputNum(n){
    if(screenExp.innerHTML === '0' && n === '0')
        return
    else if(screenExp.innerHTML === '0')
        screenExp.innerHTML = ''
    screenExp.innerHTML += n
}

function inputOp(op){
    screenExp.innerHTML += op
}

for(let i = 0; i < btnNum.length; i++)
    btnNum[i].addEventListener("click", () => inputNum(btnNum[i].innerHTML))

for(let i = 0; i < btnOp.length; i++)
    btnOp[i].addEventListener("click", () => inputOp(btnOp[i].innerHTML))

btnEqual.addEventListener('click', calculate)

btnPercent.addEventListener('click', calculatePercent)

const keyMap = {
    '*': 'op', '/': 'op',
    '+': 'op', '-': 'op'
}

for(let i = 0; i <= 9; i++)
    keyMap[i.toString()] = 'num'

document.onkeydown = function(b) {
    console.log(b.key, typeof b.key)
    
    const key = b.key
    if(key === 'Backspace')
        clear()
    else if (key === 'Enter') 
        calculate()
    else if(keyMap[key] === 'num')
        inputNum(key)
    else if(keyMap[key] === 'op')
        inputOp(key)
    else if(key === '%')
        calculatePercent()
}