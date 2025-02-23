
const tick = new Audio('./assets/tick-standard.wav');
const tock = new Audio('./assets/tick-octdown.wav');

let slider = document.querySelector("input[type='range']");
let bttn = document.getElementById('stop-button');
let bttn2 = document.getElementById('start-stop-button');
let state = false;
let bpm = 130;

let state1 = false;
let state2 = false;
let state3 = false;
let state4 = false;

function delayCalc (bpm) {
    let delay = 60/bpm * 1000;
    return parseInt(delay);
}

function resetDots() {
    document.getElementById('dot1-inner').style.backgroundColor = 'rgb(238, 238, 238)';
    document.getElementById('dot2-inner').style.backgroundColor = 'rgb(238, 238, 238)';
    document.getElementById('dot3-inner').style.backgroundColor = 'rgb(238, 238, 238)';
    document.getElementById('dot4-inner').style.backgroundColor = 'rgb(238, 238, 238)';
    state1 = false;
    state2 = false;
    state3 = false;
    state4 = false;

}
//Switches innder dot from black to white depending on the state of the dot. Does this for all 4 dots.
function changeDot1() {
    if (state1 == false) {
        document.getElementById('dot1-inner').style.backgroundColor = 'black';
    }
    if (state1 == true) {
        document.getElementById('dot1-inner').style.backgroundColor = 'rgb(238, 238, 238)';
    }
    state1 = !state1;  
}
function changeDot2() {
    if (state2 == false) {
        document.getElementById('dot2-inner').style.backgroundColor = 'black';
    }
    else {
        document.getElementById('dot2-inner').style.backgroundColor = 'rgb(238, 238, 238)';
    }
    state2 = !state2;  
}
function changeDot3() {
    if (state3 == false) {
        document.getElementById('dot3-inner').style.backgroundColor = 'black';
    }
    else {
        document.getElementById('dot3-inner').style.backgroundColor = 'rgb(238, 238, 238)';
    }
    state3 = !state3;  
}
function changeDot4() {
    if (state4 == false) {
        document.getElementById('dot4-inner').style.backgroundColor = 'black';
    }
    else {
        document.getElementById('dot4-inner').style.backgroundColor = 'rgb(238, 238, 238)';
    }
    state4 = !state4;  
}
//The main metronome function
async function playaudio(){
    let counter = 0;
    //If the button is off then turn it on so the metronome can start.
    if(state == false) {
        state = true;
        console.log('state is true');
        
        while (state == true) {
            counter++;
            if (counter == 1){
                changeDot1();
                tick.play();
            }
            for (let i = 0; i < 3; i++){
                //Breaks out if the button has been pressed to stop
                if(state == false){break;}
                //Display count and then delay
                console.log(counter);
                await new Promise(resolve => setTimeout(resolve, delayCalc(slider.value)));
                counter++; 
                //Checking to see if the state is still true and if so do the metronome functions.
                if(state == true) {
                    tock.play()
                    switch(counter) {
                        case 2:
                            changeDot2();
                            break;
                        case 3:
                            changeDot3();
                            break;
                        case 4:
                            changeDot4();
                            console.log(counter);
                            counter = 0;
                            break;
                    }
                }
                
            } 
            await new Promise(resolve => setTimeout(resolve, delayCalc(slider.value)));  
        }
    }
    //The button is on and we want the metronome app to stop ticking.
    else {
        state = false;
        console.log('state is false');
    }
    resetDots();
}
//Event listener to start/stop the metronome
bttn2.addEventListener('click', playaudio);
//Increment bpm value
function incrementValue() {
    var value = parseInt(document.getElementById('rangeValue').innerText, 10);
    if (value >= 200) { value = 200;}
    else {
        value++;
    }
    document.getElementById('rangeValue').innerText = value;
    slider.value = value;
}
//Decrement bpm value
function decrementValue() {
    var value = parseInt(document.getElementById('rangeValue').innerText, 10);
    if (value <= 60) {value = 60;}
    else {value--;}
    document.getElementById('rangeValue').innerText = value;
    slider.value = value;
}