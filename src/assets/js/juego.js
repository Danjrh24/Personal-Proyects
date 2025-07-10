
const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C','D','H','S'],
        especiales = ['A','J','K','Q'];
        
    let puntosJugadores = [];

    // Referencias del HTML
    const btnPedirCarta = document.querySelector('#btnPedirCarta'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo'),
        jugadorCartasContainer = document.querySelectorAll('.divCartas'),
        showPuntos = document.querySelectorAll('small');
        
    //Esta función inicializa el juego 
    const inicializarJuego = ( numJugadores = 1) => {
        crearDeck();
        puntosJugadores = [];
        jugadorCartasContainer.forEach( (div) => div.innerHTML = '' );
        for (let i = 0 ; i < numJugadores ; i++){
            puntosJugadores.push(0);
        }
    }
    //Esta funcion desabilita los botones de pedir carta y detener
    const disabledButtons = (boolean) =>{
        btnPedirCarta.disabled = boolean,
        btnDetener.disabled = boolean;
    }
    //Esta funcion ejecuta la funcion de pedirCartas y agrega una imagen al contenenedor del jugador o la 
    //computadora con la carta obtenida 
    const addImage = ( turno) => {
        const carta = pedirCartas();
        const cartaImg = document.createElement('img');
        jugadorCartasContainer[turno].append(cartaImg);
        cartaImg.className = 'carta';
        cartaImg.src = `public/cartas/${carta}.png`
        return carta;
    }
    //Esta funcion acumula los puntos de los jugadores y lo muestra
    const acumularPuntos = (turno,carta) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        showPuntos[turno].innerHTML = puntosJugadores[turno];
        return puntosJugadores[turno];
    }
    // Esta funcion crea un nuevo deck o baraja
    const crearDeck = () => {

        deck = [];
        for ( let i = 2; i <= 10; i++) {
            for( let tipo of tipos){
                deck.push(i + tipo);
            }
        }
        for(let especial of especiales){
            for( let tipo of tipos){
                deck.push(especial + tipo);
            }
        }
        return deck = _.shuffle(deck)

    }
    //Esta funcion sirve para pedir una carta
    const pedirCartas = () => {
        if (deck.length === 0 ){
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }
    //Esta funcion sirve para obtener el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length-1);
        return ( valor === 'A') ? 11 :( isNaN(valor) ) ? 10 : valor * 1;
    }

    //TURNO DE LA COMPUTADORA
    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputadora;
        do{
            const carta = addImage(jugadorCartasContainer.length-1);
            puntosComputadora = acumularPuntos(puntosJugadores.length-1,carta)
        }while( (puntosComputadora < puntosMinimos) && puntosMinimos <= 21 );

        setTimeout(() => {
            ( puntosComputadora === puntosMinimos ) 
            ? (alert('Nadie gana :(') ,disabledButtons(true))
            :( puntosComputadora > 21 ) ? (alert('Felicidades, ganaste!!') , disabledButtons(true)) 
            :(alert('Computadora gana') , disabledButtons (true));
        }, 200);
    }

    //EVENTOS
    btnPedirCarta.addEventListener( 'click', () => {

        const carta = addImage(0);
        const puntosJugador = acumularPuntos(0, carta);
        setTimeout(() => {
            ( puntosJugador === 21 ) 
            ? (console.warn('21, genial!'), turnoComputadora(puntosJugador), disabledButtons(true)) 
            :( puntosJugador > 21 ) ? (alert('Computadora gana'), disabledButtons(true)) 
            : ''
        }, 200);
        return puntosJugador;
    }) ;

    btnDetener.addEventListener('click', () => {
        btnPedirCarta.disable = true;
        turnoComputadora(puntosJugadores[0]);
    })

    btnNuevo.addEventListener('click', () => {

        console.clear();

        inicializarJuego(2);

        showPuntos.forEach( (elem) => elem.innerHTML = 0 );

        disabledButtons(false);

    })

    return {
        nuevoJuego: inicializarJuego
    };

})();






