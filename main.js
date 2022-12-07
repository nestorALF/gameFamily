// inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer=50;
let timerInicial = 50;
let tiempoRegresivoid=null;


// apuntado a documento html

let  mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

let winaudio = new Audio ('./sounds/win.wav');
let loseAudio = new Audio ('./sounds/lose.wav');
let clikcAudio = new Audio ('./sounds/click.wav');
let rightAudio = new Audio ('./sounds/right.wav');
let wrongAudio = new Audio ('./sounds/wrong.wav');
// generacion de numeros aleatorios
let numeros =[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//funciones
function contartiempo(){
     tiempoRegresivoid = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML =  `Tiempo: ${timer} segundos `;
        if(timer==0){
        clearInterval(tiempoRegresivoid);
        bloquearTarjetas();
        loseAudio.play();
        }
    },1000)
}
function bloquearTarjetas(){
    for(let i=0; i<=15;i++){
      let tarjetaBloqueada = document.getElementById(i);  
      tarjetaBloqueada.innerHTML =  `<img src="./images/${numeros[i]}.png" alt="">` ;
      tarjetaBloqueada.disabled = true;
    }

}

// funcion principal
function destapar(id){

    if(temporizador == false){
        contartiempo();
        temporizador=true;
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        // mostrar el primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">` ;
        clikcAudio.play();
        //deshabilitar primer botton
        tarjeta1.ariaDisabled = true;
    }else if (tarjetasDestapadas==2){
      tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML=  `<img src="./images/${segundoResultado}.png" alt="">` ;
        //deshabinilar segundo boton
        tarjeta2.ariaDisabled = true;
        // incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} `;

        if(primerResultado == segundoResultado){
            tarjetasDestapadas=0;

            // Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML =  `Aciertos: ${aciertos} `;
            rightAudio.play();

            if(aciertos == 8){ 
                winaudio.play();
               clearInterval(tiempoRegresivoid);
                mostrarAciertos.innerHTML =  `Aciertos 🎉: ${aciertos} `;
                mostrarTiempo.innerHTML =  `Lo lograste en tan solo 😏: ${timerInicial} `;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} `;
            }

           
    }else{
        wrongAudio.play();
        // mostrar momentaneamente los valores y volver a tapar
        setTimeout(()=>{
            tarjeta1.innerHTML = '';
            tarjeta2.innerHTML = '';
            tarjeta1.disabled = false;
            tarjeta2.disabled = false;
            tarjetasDestapadas = 0;
        },500);

    }

}
}