var time = new Date();
var btn = document.getElementById('time-btn');
var hours = time.getHours();
var minutes = time.getMinutes();
var currentTime = hours + ":" + minutes;

btn.addEventListener('click', getCurrentTime);

function getCurrentTime() {
    window.location.reload(); 
    if(currentTime) {
        if(currentTime == "00:00") {
            alert("My favourite part of the day is a midnight" + " " + currentTime);
        } 
        else if(currentTime >= "00:01" && currentTime <= "11:59") {
            alert("My favourite part of the day is a morning" + " " + currentTime);
        } 
        else if (currentTime == "00:00") {
            alert("My favourite part of the day is a noon" + " " + currentTime);
        }
        else if (currentTime >= "12:00" && currentTime <= "18:00") {
            alert("My favourite part of the day is an afternoon" + " " + currentTime);
        }
        else if(currentTime >= "18:00" && currentTime >= "23:59") {
            alert("My favourite part of the day is an evening" + " " + currentTime);
        }
    } 
}




