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

function toogleMultiLines(){
    if(screenExp.innerHTML.length > 9){        
        screenExp.style.fontSize = "2.7rem"
        screenExp.style.marginBlockStart = "15px"
    } else {
        screenExp.style.fontSize = "3.5rem"
        screenExp.style.marginBlockStart = "20px"
    }
}

function updateExp(n) {
    screenExp.innerHTML = n
    toogleMultiLines()
}

function clearAll(){
    updateExp('0')
    screenExpPast.innerHTML = '0'
}

function clear() {
    updateExp('0')
}

btnAC.addEventListener('click', clearAll)
btnC.addEventListener('click', clear)

var isEqualPressed = false

function calculate(){
    screenExpPast.innerHTML = screenExp.innerHTML
    updateExp(screenExp.innerHTML.replace(/÷/g, "/"))
    updateExp(screenExp.innerHTML.replace(/×/g, "*"))
    
    updateExp(eval(screenExp.innerHTML))
    isEqualPressed = true
    console.log("isEqualPressed", isEqualPressed)
}

function calculatePercent(){
    screenExpPast.innerHTML = screenExp.innerHTML + "%"
    updateExp(eval(screenExp.innerHTML + "/100"))
}

function inputNum(n){
    if(isEqualPressed){
        updateExp(n)
        isEqualPressed = false
        return
    }
    if(screenExp.innerHTML.search(/0$/) !== -1 && n === '0')
        return
    else if(screenExp.innerHTML === '0')
        updateExp('')
    else if(screenExp.innerHTML.search(/\)$/) > -1) {
        updateExp(screenExp.innerHTML.substring(0, screenExp.innerHTML.length-1) + n + ")")
        return
    }    
    updateExp(screenExp.innerHTML + n)
}

function inputOp(op){
    if(isEqualPressed)
        isEqualPressed = false
    updateExp(screenExp.innerHTML + op)
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
    updateExp(screenExp.innerHTML.replace(/-{0}\d*\.*\d+\.*$/, seq => {
        isPositive = true
        console.log("positive to negative")
        return seq === '0' ? seq : `(-${seq})`
    }))
    if(!isPositive)
        updateExp(screenExp.innerHTML.replace(/\(-\d*\.*\d+\.*\)$|^-\d*\.*\d+\.*$/, seq => {
            seq = seq.replace(/-/g, '')
            seq = seq.replace(/-/g, '')

            seq = seq.replace('(', '')
            seq = seq.replace(')', '')
            console.log("negative to positive")
            return seq
        }))
}

btnSign.addEventListener('click', toggleSign)

function addDelim() {
    if(isEqualPressed){
        updateExp("0.")
        isEqualPressed = false
        return
    }

    if(screenExp.innerHTML.search(/\.\d*$/) > -1) return
    else if(screenExp.innerHTML.search(/\)$/) > -1 ) {
        updateExp(screenExp.innerHTML.substring(0, screenExp.innerHTML.length-1) + "." + ")" )
    } 
    else if(screenExp.innerHTML.search(/\D$/) > -1)
        updateExp(screenExp.innerHTML + "0.")
    else
        updateExp(screenExp.innerHTML + ".")
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