'use strict'
const buttonStart = document.querySelector('#start');
const inputSeconds = document.querySelector('#seconds');
const selectorOption = document.querySelector('#selectorOption');
const containerCardsNumbers = document.querySelector('#containerCard');
let disabledButton = false;
let controlReset = true;
let typeCard = '';

/**
 * @desc Deshabilita el botón
 * @param {Boolean} valueDisabled 
 */
const __handlerButtonDisabled = valueDisabled => {
    buttonStart.disabled = valueDisabled;
}

/**
 * @desc Tiempo para el reseteo de las variables
 * @method __timeFill
 * @param {Number} time 
 */
const __timeFill = time => {
    let timeExpired = time * 1000;
    __handlerButtonDisabled(true);
    setTimeout(()=> {
        reset();
    }, timeExpired);
}

/**
 * @desc Habilita el botón y limpia el contenedor
 * @method reset
 */
const reset = ()=> {
    __handlerButtonDisabled(false);
    containerCardsNumbers.innerHTML = '';
}

/**
 * @desc Devuelve la clase dependiendo la cantidad de cards
 *       que le pasemos como parametro
 * @method __typeCard
 * @param {Number} countCards 
 * @returns String
 */
const __typeCard = countCards => {
    return countCards<6 ? 'cardRed' : 'cardBlue';
}

/**
 * @desc Llena el contendor con el numero de cards
 * @method __fillContainer
 * @param {Number} countCards 
 */
const __fillContainer = countCards => {
    typeCard = __typeCard(countCards);
    for (let i = 0; i < countCards; i++) {
        containerCardsNumbers.innerHTML += `
        <div class=${typeCard}>
            <span>${i}</span>
        </div>
        `;
    }
}

/**
 * @desc Listener que escucha el evento click (INICIO DE TODO)
 * @method addEventListener escucha el botón al hacer click
 */
buttonStart.addEventListener('click', ()=> {
    let timeValue = Number(inputSeconds.value);
    let randomNumber = parseInt(Math.random() * 15) + 1;
    reset();
    __fillContainer(randomNumber);
    if(controlReset)
    __timeFill(timeValue);
});

/**
 * @desc Valida y pinta el fondo del input
 * @method __handlerInputlistener
 * @param {Number} seconds 
 */
const __handlerInputlistener = seconds => {
    if(seconds>10 || seconds<2 || seconds === ''){
        disabledButton = true;
        inputSeconds.style.background = 'rgba(255,0,0,0.5)';
    }
    else{
        disabledButton = false;
       inputSeconds.style.background = 'none';  
    }
}


/*
Listener que escucha al input, llama a las funciones de
__handlerInputlistener --> Pinta el fondo del input
habilita o deshabilita el botón
*/
/**
 * @desc Escucha el input y realiza las validaciones 
 * @method addEventListener Escucha las entradas del input
 */
inputSeconds.addEventListener('input', event => {
    let seconds = event.target.value;
    __handlerInputlistener(seconds);
    __handlerButtonDisabled(disabledButton);
});

/**
 * @desc Listener que escucha el selector
 * @method 
 */
selectorOption.addEventListener('change', event => {
    let option = event.target.value;
    if(option === 'no'){
        inputSeconds.disabled = true;
        controlReset = false;
        __handlerButtonDisabled(false);
    }
    else{
        __handlerInputlistener(inputSeconds.value);
        __handlerButtonDisabled(disabledButton);
        inputSeconds.disabled = false;
        controlReset = true;    
    }
});

