const screenExp = document.getElementById("screen-exp")
const btnElement = document.getElementsByClassName("btn")

for(let i = 0; i < btnElement.length; i++)
    btnElement[i].addEventListener("click", () => screenExp.innerHTML = btnElement[i].innerHTML)