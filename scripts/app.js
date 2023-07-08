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
 * @params {Boolean} valueDisabled 
 */
const handlerButtonDisabled = valueDisabled => {
    buttonStart.disabled = valueDisabled;
}

/**
 * @desc Tiempo para el reseteo de las variables
 * @method timeFill
 * @params {Number} time 
 */
const timeFill = time => {
    const timeReset = time * 1000;
    handlerButtonDisabled(true);
    setTimeout(() => {
      reset();
    }, timeReset);
}

/**
 * @desc Habilita el botón y limpia el contenedor
 * @method reset
 */
const reset = () => {
    handlerButtonDisabled(false);
    containerCardsNumbers.innerHTML = '';
}

/**
 * @desc Devuelve la clase dependiendo la cantidad de cards
 *       que le pasemos como parametro
 * @method typeCardClass
 * @params {Number} countCards 
 * @returns String
 */
const typeCardClass = countCards => {
    return countCards < 8 ? 'card-red' : 'card-blue';
}

/**
 * @desc Llena el contendor con el numero de cards
 * @method fillContainer
 * @params {Number} countCards 
 */
const fillContainer = countCards => {
    typeCard = typeCardClass(countCards);
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
    const timeValue = Number(inputSeconds.value);
    const randomNumber = parseInt(Math.random() * 15) + 1;
    reset();
    fillContainer(randomNumber);
    if (controlReset) timeFill(timeValue);
});

/**
 * @desc Valida y pinta el fondo del input
 * @method handlerInputlistener
 * @params {Number} seconds 
 */
const handlerInputlistener = seconds => {
    if (seconds > 10 || seconds < 2 || seconds === ''){
        disabledButton = true;
        inputSeconds.setAttribute('invalid', true);
    }
    else {
        disabledButton = false;
       inputSeconds.removeAttribute('invalid');
    }
}


/*
Listener que escucha al input, llama a las funciones de
handlerInputlistener --> Pinta el fondo del input
habilita o deshabilita el botón
*/
/**
 * @desc Escucha el input y realiza las validaciones 
 * @method addEventListener Escucha las entradas del input
 */
inputSeconds.addEventListener('input', ({ target }) => {
    const seconds = target.value;
    handlerInputlistener(seconds);
    handlerButtonDisabled(disabledButton);
});

/**
 * @desc Listener que escucha el selector
 * @method 
 */
selectorOption.addEventListener('change', ({ target }) => {
    const option = target.value;
    if (option === 'no'){
        inputSeconds.disabled = true;
        controlReset = false;
        handlerButtonDisabled(false);
    }
    else {
        handlerInputlistener(inputSeconds.value);
        handlerButtonDisabled(disabledButton);
        inputSeconds.disabled = false;
        controlReset = true;    
    }
});

