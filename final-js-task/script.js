var body = document.getElementsByTagName('body')[0];
var square = document.getElementById('square');
var number = document.getElementById('number-id');
var btnReset = document.getElementById('reset-btn');
var time;
var h1 = document.createElement('h1');

square.addEventListener('click', changeSquare);
btnReset.addEventListener('click', () => {
    window.location.reload();
})

function changeSquare(){
    var currentNumber = number.value;

    if(currentNumber > 20 || currentNumber < 0) {
        alert("Error");
    } 
    else {
        number.disabled = true;
        currentNumber--;
        number.value = currentNumber;
        time = new Date();
        var date = time.getDate() + '/' + time.getMonth() + '/' +  time.getFullYear();
        var currentTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        
        if( currentNumber == 0) {
            h1.innerText = "Clicks Ended";
            square.appendChild(h1);
            square.classList.add('bg-red');
        }

        setTimeout(function () {
            h1.innerText = "";
            var div = document.createElement('div');
            div.innerText = 'Current date:' + " " + date + " " + 'current time:'+ " " + currentTime;
            square.appendChild(div);
            btnReset.style.visibility = "visible";
        }, 5000);
    }
}