var inputBox = document.getElementById('text');
var btn = document.getElementById('split-text');
var sorted = document.getElementById('sorted');
var countWBox = document.getElementById('count-words');
var textBox = new Array();

btn.addEventListener('click', changeText);

function changeText() {
    var splitText;
    var count = 0;
    if(!inputBox.value) {
        alert("Please enter a sentence:");
    } 
    else {
        textBox = inputBox.value;
        splitText = textBox.split(" ");
        for ( var i = 0; i < splitText.length; i++) {
           
            if ( splitText[i] !== "") {
                count++;
            }
        }
        countWBox.innerHTML = 'There are' + ' ' + count + ' ' + 'words.';
        var words = splitText.join('</br>');
        sorted.innerHTML = 'Sorted words:'+ '<br/>' + words;
    }
}



