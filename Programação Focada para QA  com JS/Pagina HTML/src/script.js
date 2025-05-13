let button = document.getElementById('button')
let textMod = document.getElementById('paragrafo-2')

let textMod2 = document.querySelectorAll('.paragrafo-1')

button.addEventListener('click', ()=>{
    for(let i = 0; i<= textMod2.length; i++){
        textMod2[1].textContent = "Texto alterado pelo com JavaScript"
    }
    
})

console.log(textMod2)