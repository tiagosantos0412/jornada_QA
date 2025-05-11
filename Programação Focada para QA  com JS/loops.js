let array = [10,11,12,13,14,15]
let acumulado = 0

console.log (`Passo 0: ${acumulado}`)

for(i = 0; i < array.length; i++){
    acumulado += array[i]
    console.log (`Passo ${i + 1}: ${acumulado}`)
}

//Versão com reduce() (mais elegante):

// const array2 = [10, 11, 12, 13, 14, 15];
// let acumulado2 = 0;

// array.forEach((num, index) => {
//   acumulado2 += num;
//   console.log(`Passo ${index}: ${acumulado2}`);
// });
let numero = 8
let res
let cont = 0

console.log(`Tabuada do ${numero}:`)

while(cont <= 10){
    res = numero * cont
    console.log(`${numero} X ${cont} = ${res}`)
    cont++
}
