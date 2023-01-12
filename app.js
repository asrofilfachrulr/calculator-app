const screenExp = document.getElementById("screen-exp")
const screenExpPast = document.getElementById("screen-exp-past")
const btnNum = document.getElementsByClassName("btn-num")
const btnOp = document.getElementsByClassName("btn-op")
const btnAC = document.getElementById("btn-AC")
const btnC = document.getElementById("btn-C")
const btnSign = document.getElementById("btn-sign")
const btnPercent = document.getElementById("btn-percent")
const btnEqual = document.getElementById("btn-equal")
const btnDelim = document.getElementById("btn-delim")
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

var isEqualPressed = false

function calculate(){
    screenExpPast.innerHTML = screenExp.innerHTML
    screenExp.innerHTML = screenExp.innerHTML.replace(/÷/g, "/")
    screenExp.innerHTML = screenExp.innerHTML.replace(/×/g, "*")
    
    screenExp.innerHTML = eval(screenExp.innerHTML)
    isEqualPressed = true
    console.log("isEqualPressed", isEqualPressed)
}

function calculatePercent(){
    screenExpPast.innerHTML = screenExp.innerHTML + "%"
    screenExp.innerHTML = eval(screenExp.innerHTML + "/100")
}

function inputNum(n){
    if(isEqualPressed){
        screenExp.innerHTML = n
        isEqualPressed = false
        return
    }
    if(screenExp.innerHTML.search(/0$/) !== -1 && n === '0')
        return
    else if(screenExp.innerHTML === '0')
        screenExp.innerHTML = ''
    screenExp.innerHTML += n
}

function inputOp(op){
    if(isEqualPressed)
        isEqualPressed = false
    screenExp.innerHTML += op
}

for(let i = 0; i < btnNum.length; i++)
    btnNum[i].addEventListener("click", () => inputNum(btnNum[i].innerHTML))

for(let i = 0; i < btnOp.length; i++)
    btnOp[i].addEventListener("click", () => inputOp(btnOp[i].innerHTML))

btnEqual.addEventListener('click', calculate)

btnPercent.addEventListener('click', calculatePercent)

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

function toggleSign(){
    let isPositive = false
    screenExp.innerHTML = screenExp.innerHTML.replace(/-{0}\d+$/, seq => {
        isPositive = true
        console.log("positive to negative")
        return seq === '0' ? seq : `(-${seq})`
    })
    if(!isPositive)
        screenExp.innerHTML = screenExp.innerHTML.replace(/\(-\d+\)|^-\d+$/, seq => {
            seq = seq.replace('-', '')
            seq = seq.replace('(', '')
            seq = seq.replace(')', '')
            console.log("negative to positive")
            return seq
        })
}

btnSign.addEventListener('click', toggleSign)

function addDelim() {
    if(isEqualPressed){
        screenExp.innerHTML = "0."
        isEqualPressed = false
        return
    }

    if(screenExp.innerHTML.search(/\.\d*$/) > - 1) return
    else if(screenExp.innerHTML.search(/\D$/) > -1)
        screenExp.innerHTML += "0."
    else
        screenExp.innerHTML += "."
}

btnDelim.addEventListener('click', addDelim)

const keyMap = {
    '*': 'op', '/': 'op',
    '+': 'op', '-': 'op'
}

const opConvert = {
    '*': '×', '/': '÷',
    '+': '+', '-': '-'
}

for(let i = 0; i <= 9; i++)
    keyMap[i.toString()] = 'num'

document.onkeydown = function(b) {
    console.log(b.key, typeof b.key)
    
    const key = b.key
    if(key === 'Backspace')
        clear()
    else if (key === '=') 
        calculate()
    else if(keyMap[key] === 'num')
        inputNum(key)
    else if(keyMap[key] === 'op')
        inputOp(opConvert[key])
    else if(key === '%')
        calculatePercent()
    else if(key ==='.'){
        addDelim()
    }
}