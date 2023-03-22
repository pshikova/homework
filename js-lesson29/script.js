var body = document.getElementsByTagName('body')[0];
var saveBtn = document.getElementById('btn-confirm');
var removeBtn = document.getElementById('btn-remove');
var tableTitle = ['First name', 'Last Name', 'Address', 'Email', 'Phone number'];
var personData = new Array();
var count = 0;

function Person (firstName, lastName, address, email, phone) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.phone = phone;
}

var table = document.createElement('table');
body.appendChild(table);

if (personData.length !=0) {
    window.addEventListener('load', setTitle);
}

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
    var row = document.createElement('tr');
    thead.appendChild(row);
    for(var i = 0; i < 5; i++) {
        var th = document.createElement('th');
        row.appendChild(th);   
        th.appendChild(document.createTextNode(tableTitle[i]));
    }
}

function setData() {
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    var row = document.createElement('tr');
    tbody.appendChild(row);
    var fname = document.myForm.fname.value;
    var lname = document.myForm.lname.value;
    var address = document.myForm.address.value;
    var email = document.myForm.email.value;
    var phone = document.myForm.phone.value;
    if (fname == '' || lname == '' || address ==''|| email ==''|| phone =='') {
        alert('Error! Please fill all fields' );
        return;
    }

    if(!fname && !lname && !address && !email && !phone) {
        return;
    }
    
    var person = new Person(fname, lname, address, email, phone);
    personData.push(person);
    var keys = Object.keys(personData[0]);
    var lastIndex = personData.length - 1;
    for(var i = 0; i < keys.length; i++) {
        var td = document.createElement('td');
        row.appendChild(td);  
        td.appendChild(document.createTextNode(personData[lastIndex][keys[i]])); 
    }
    
    document.myForm.reset();  
}

function removeData() {
    var tableRow = document.getElementsByTagName('tr');
    var last = tableRow.length-1;
    if(last > 0) {
        table.deleteRow(last);
        personData.pop();
    }
}

