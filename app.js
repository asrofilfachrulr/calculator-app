const screenExp = document.getElementById("screen-exp")
const screenExpPast = document.getElementById("screen-exp-past")
const btnNum = document.getElementsByClassName("btn-num")
const btnOp = document.getElementsByClassName("btn-op")
const btnAC = document.getElementById("btn-AC")
const btnC = document.getElementById("btn-C")
const btnSign = document.getElementById("btn-sign")
const btnPercent = document.getElementById("btn-percent")
const btnEqual = document.getElementById("btn-equal")
const togBtn = document.getElementById("togBtn")
const lightIcon = document.getElementById("light-icon")
const darkIcon = document.getElementById("dark-icon")
const sliderBefore = document.querySelector(".slider:before")

const calculatorApp = document.getElementById("app")
const buttons = document.getElementsByClassName("btn")
const pad = document.getElementById("pad")


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
    const convertMap = {
        "÷": "/",
        "×": "*",
        "+": "+",
        "-": "-",
    }
    screenExp.innerHTML += convertMap[op]
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

keyMap['.'] = 'num' // same behaviour

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

function changeTheme(mode){
    // light is true
    if(mode) {
        darkIcon.style.visibility = "hidden"
        lightIcon.style.visibility = "unset"
        
        calculatorApp.style.color = "black"
        calculatorApp.style.backgroundColor = "#fefefe"
        screenExpPast.style.color = "rgb(168, 168, 168)"
        pad.style.backgroundColor = "#f9f9f9"

        for(let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = "#f8f6fb"
            buttons[i].style.color = "black"
        }
    } else {
        lightIcon.style.visibility = "hidden"
        darkIcon.style.visibility = "unset"

        calculatorApp.style.color = "white"
        calculatorApp.style.backgroundColor = "#22252c"
        screenExpPast.style.color = "rgb(168, 168, 168)"
        pad.style.backgroundColor = "#2a2d36"

        for(let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = "#282b32"
            buttons[i].style.color = "white"
        }
    }
}

togBtn.addEventListener('click', () => {
    console.log(togBtn.checked)
    changeTheme(togBtn.checked)
})