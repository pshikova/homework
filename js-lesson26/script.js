const barChart = document.getElementById('myChart');
const pieChart = document.getElementById('newChart');

function randomOneToTen() {
    return Math.ceil(Math.random() * 10);
}

function generate() {
    var arrData = [];
    let loops = randomOneToTen();
    for (var i = 0; i < loops; i++) {
        arrData[i] = randomOneToTen();
    }

    var barNames = [];
    for (var i = 0; i < loops; i++) {
        barNames[i] = "bar" + (i + 1);
    }

    var ranColors = [];
    for (var i = 0; i < loops; i++) {
        ranColors[i] = getRandomColor();
    }

    new Chart(barChart, {
        type: 'bar',
        data: {
            labels: barNames,
            datasets: [{
                label: '# of Votes',
                data: arrData,
                borderWidth: 1,
                backgroundColor: ranColors
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
generate()

function generate2() {
    var arrData = [];
    let loops = randomOneToTen();
    for (var i = 0; i < loops; i++) {
        arrData[i] = randomOneToTen();
    }

    var barNames = [];
    for (var i = 0; i < loops; i++) {
        barNames[i] = "bar" + (i + 1);
    }

    var ranColors = [];
    for (var i = 0; i < loops; i++) {
        ranColors[i] = getRandomColor();
    }

    new Chart(pieChart, {
        type: 'doughnut',
        data: {
            labels: barNames,
            datasets: [{
                label: '# of Votes',
                data: arrData,
                borderWidth: 1,
                backgroundColor: ranColors
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
generate2()

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}