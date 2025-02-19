
const tick = new Audio('./assets/tick-standard.wav');
const tock = new Audio('./assets/tick-octdown.wav');

let slider = document.querySelector("input[type='range']");
let bttn = document.getElementById('stop-button');
let bttn2 = document.getElementById('start-stop-button');
let state = false;
let bpm = 130;

function delayCalc (bpm) {
    let delay = 60/bpm * 1000;
    return parseInt(delay);
}

async function playaudio(){
    if(state == false) {
        state = true;
        console.log('state is true');
        while (state == true) {
            tick.play()
            for (let i = 0; i < 3; i++){
                await new Promise(resolve => setTimeout(resolve, delayCalc(slider.value)));
                tock.play()   
                if(state == false){break;}
            }  
            await new Promise(resolve => setTimeout(resolve, delayCalc(slider.value)));  
        }
    }
    else {
        state = false;
        console.log('state is false');
    
    }
}

bttn2.addEventListener('click', playaudio);

function incrementValue() {
    var value = parseInt(document.getElementById('rangeValue').innerText, 10);
    if (value >= 200) { value = 200;}
    else {
        value++;
    }
    document.getElementById('rangeValue').innerText = value;
    slider.value = value;
}

function decrementValue() {
    var value = parseInt(document.getElementById('rangeValue').innerText, 10);
    if (value <= 60) {value = 60;}
    else {value--;}
    document.getElementById('rangeValue').innerText = value;
    slider.value = value;
}