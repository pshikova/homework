var duration = document.getElementById('time');
var showBox = document.getElementById('click-number');
var startBtn = document.getElementById('btn');
var count = 0;

startBtn.addEventListener('click', setTime);
document.addEventListener('mousedown', clickCount);

function setTime() {
    var timer = duration.value;
    return timer;
}

function clickCount() {
    var timer = setTime();
    if (timer > 0) {
        var time = (timer * 60) * 1000;
        showBox.innerText = ++count;
        setTimeout(() => {
        showBox.innerText ='The number of clicks are:' + count;
        }, time);
    }
}