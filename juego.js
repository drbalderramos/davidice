class Juego{
    constructor(){
        this.inicializar = this.inicializar.bind(this);
        this.inicializar()
        this.generarSecuencia();
        setTimeout(this.siguienteNivel, 500);
    }

    inicializar(){
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this);
        this.toggleBtnEmpezar();
        this.nivel = 1;
        this.colores = {
            amarillo,
            azul,
            rojo,
            verde
        }
    }
    toggleBtnEmpezar(){
        if(BTN_EMPEZAR.classList.contains('hide')){
            BTN_EMPEZAR.classList.remove('hide');
        }else{
            BTN_EMPEZAR.classList.add('hide')
        }
    }
    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 11))
    }
    siguienteNivel(){
        this.subNivel = 0;
        this.iluminarSecuencia();
        this.agregarEventoClick();
    }
    transformarNumeroColor(num){
        switch (num) {
            case 0:
                return 'amarillo'
                break;
            case 1:
                return 'azul'
                break;
            case 2:
                return 'rojo'
                break;   
            case 3:
                return 'verde'
                break;
        }
    }
    transformarColorNumero(color){
        switch (color) {
            case 'amarillo':
                return 0;
                break;
            case 'azul':
                return 1;
                break;
            case 'rojo':
                return 2;
                break;   
            case 'verde':
                return 3;
                break;
        }
    }
    iluminarSecuencia(){
        for(let i = 0; i < this.nivel; i++){
            const color = this.transformarNumeroColor(this.secuencia[i]);
            console.log(color)
            setTimeout(() =>  this.iluminarColor(color), 1000 * i);
        }    
    }
    iluminarColor(color){
        this.colores[color].classList.add('light');
        setTimeout(() => this.apagarColor(color), 500);
    }
    apagarColor(color){
        this.colores[color].classList.remove('light');
    }
    agregarEventoClick(){
        this.colores.amarillo.addEventListener('click', this.elegirColor);
        this.colores.azul.addEventListener('click', this.elegirColor);
        this.colores.rojo.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
    }
    eliminarEventosClick(){
        this.colores.amarillo.removeEventListener('click', this.elegirColor);
        this.colores.azul.removeEventListener('click', this.elegirColor);
        this.colores.rojo.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
    }
    elegirColor(ev){
        const NOMBRE_COLOR = ev.target.dataset.color;
        const NUMERO_COLOR = this.transformarColorNumero(NOMBRE_COLOR);
        this.iluminarColor(NOMBRE_COLOR);

        if(NUMERO_COLOR === this.secuencia[this.subNivel]){
            this.subNivel++;
            if(this.subNivel === this.nivel){
                this.nivel++;
                this.eliminarEventosClick();
                if(this.nivel === ULTIMO_NIVEL + 1){
                    this.ganoJuego();
                }else{
                    setTimeout(this.siguienteNivel, 2000); 
                }
            }
        }else{
            this.perdioJuego();
        }
    }
    ganoJuego(){
        swal("¡Buen trabajo!", "Completaste todos los niveles", "success")
        .then(this.inicializar)
    }
    perdioJuego(){
        swal("Ohh :( Perdiste", "Vuelva a comenzar el juego", "error")
        .then(() =>{
            this.eliminarEventosClick();
            this.inicializar();
        })
    }
}
