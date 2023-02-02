var body = document.getElementsByTagName('body')[0];
var saveBtn = document.getElementById('btn-confirm');
var removeBtn = document.getElementById('btn-remove');
var tableTitle = ['First name', 'Last Name', 'Address'];
var personData = new Array();
var count = 0;

var table = document.createElement('table');
body.appendChild(table);

saveBtn.addEventListener('click', () => {
    count++;
    if (count == 1 ) {
        setTitle();
    }
        setData();
});

removeBtn.addEventListener('click', removeData);

function setTitle() {
    var thead = document.createElement('thead');
    table.appendChild(thead);
    for(var i = 0; i < 1; i++) {
        var row = document.createElement('tr');
        thead.appendChild(row);
        for(var j = 0; j < 3; j++) {
            var th = document.createElement('th');
            row.appendChild(th);   
            th.appendChild(document.createTextNode(tableTitle[j]));
        }
    }
}

function setData() {
    personData.length = 0;
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    for(var i = 0; i < 1; i++) {
        var row = document.createElement('tr');
        tbody.appendChild(row);
        var fname = document.myForm.fname.value;
        var lname = document.myForm.lname.value;
        var address = document.myForm.address.value;
        if(!fname && !lname && !address) {
            return;
        }
        personData.push(fname);
        personData.push(lname);
        personData.push(address);
        for(var j = 0; j < 3; j++) {
            var td = document.createElement('td');
            row.appendChild(td);   
            td.appendChild(document.createTextNode(personData[j])); 
        }
        document.myForm.reset();
    }   
}

function removeData() {
    var tableRow = document.getElementsByTagName('tr');
    var last = tableRow.length-1;
    if(last > 0) {
        table.deleteRow(last);
    }
}

