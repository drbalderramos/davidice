const BTN_EMPEZAR = document.getElementById('btnEmpezar');
const BTN_AMARRILLO = document.getElementById('amarillo');
const BTN_AZUL = document.getElementById('azul');
const BTN_ROJO = document.getElementById('rojo');
const BTN_VERDE = document.getElementById('verde');
const ULTIMO_NIVEL = 3;

function empezarJuego(){
    window.juego = new Juego();
}