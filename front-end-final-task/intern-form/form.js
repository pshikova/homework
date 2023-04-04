var body = document.getElementsByTagName('body')[0];
var internForm = document.getElementById('intern-form');
var internName = document.getElementById('name');
var phone = document.getElementById('phone');
var email = document.getElementById('email');
var startDate = document.getElementById('start-date');
var endDate = document.getElementById('end-date');
var dLeft = document.getElementById('left-days');
var firstTask = document.getElementById('first-task');
var secondTask = document.getElementById('second-task');
var department = document.getElementById('dept');
var mentor = document.getElementById('mentor');
var firstTaskResult = document.getElementById('first-result');
var secondTaskResult = document.getElementById('second-result');
var pic = document.getElementById('person-image');
var taskImages = document.getElementById('task-image');
var btnCancel = document.getElementById('btn-cancel');
var btnAdd = document.getElementById('btn-add');
var btnUpdate = document.getElementById('btn-update');
var btnDelete = document.getElementById('delete-btn');
var indexAddBtn = document.getElementById('btn-add');
var table =  document.getElementById('intern-list');
var errorName = document.getElementById('error-name');
var errorMail = document.getElementById('error-email');
var newInternArr = new Array();
var currentInternList = new Array();
var internAvatarPicture;
var internMultipleImage;
var hasIntern = false;
const queryString = window.location.search;
var params = new URLSearchParams(queryString);
var avatar = document.getElementById('avatar');

function daysLeft() {
    var thisFirstDate = new Date(startDate.value);
    var thisEndDate = new Date(endDate.value);
    var difference = thisEndDate.getTime() - thisFirstDate.getTime();
    var cDaysLeft = Math.ceil(difference / (1000 * 3600 * 24));
    return cDaysLeft;
}

function Intern( name, image, phone, email, startDate, endDate, daysLeft , task1, task2, dept, mentor, task1Res, task2Res, attachedFiles ) {
    this.name = name;
    this.image = image;
    this.phone = phone;
    this.email = email;
    this.startDate = startDate;
    this.endDate = endDate;
    this.daysLeft = daysLeft;
    this.task1 = task1;
    this.task2 = task2;
    this.dept = dept;
    this.mentor = mentor;
    this.task1Res = task1Res;
    this.task2Res = task2Res;
    this.attachedFiles = attachedFiles;
}

if(btnAdd) {
    btnAdd.addEventListener('click', addNewIntern);
}
if (btnUpdate) {
    window.addEventListener('load', currentIntern);
    btnUpdate.addEventListener('click', editIntern);
}
if(btnDelete) {
    btnDelete.addEventListener('click', deleteIntern);
}

pic.addEventListener('change', () => {
    imageUpload(pic.files[0], (result) => internAvatarPicture = result);
});
taskImages.addEventListener('change', multipleImageUpload);

function validate() {
    var isValid = true;
    for (const el of internForm.querySelectorAll("[required]")) {
        if (!el.reportValidity()) {
            el.classList.add('error');
            isValid = false;
        } 
        else {
            el.classList.remove('error');
        }
    }
    return isValid;
}

function dateValidate() {
    if( startDate.value > endDate.value ) {
        startDate.classList.add('error');
        endDate.classList.add('error');
        document.getElementById('date-error').innerHTML = "The start date cannot be greater than the end date!";  
        return false;
    }
    return true;
}

function imageUpload(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        callback(reader.result);
    };
}

function multipleImageUpload() {
    internMultipleImage = [];

    for( var i = 0; i < taskImages.files.length; i++ ) {
        var file = taskImages.files[i];
        imageUpload(file, (result) => {
            internMultipleImage.push(result);
        });
    }
}

function createNewIntern(e) {
    e.preventDefault();
    validate();
    var myInternName = internName.value;
    var myPic = internAvatarPicture;
    var myPhone = phone.value;
    var myEmail = email.value;
    var myStartDate = startDate.value;
    var myEndDate = endDate.value;
    var myDaysLeft = daysLeft();
    var myfirstTask = firstTask.value;
    var mysecondTask = secondTask.value;
    var myDepartment = dept.value;
    var myMentor = mentor.value;
    var myTaskRes1 = firstTaskResult.value !== "" ? firstTaskResult.value : null;
    var myTaskRes2 = secondTaskResult.value !== "" ? secondTaskResult.value : null;
    var myAttachedFiles = internMultipleImage;

    var newIntern = new Intern(myInternName, myPic, myPhone, myEmail, myStartDate, 
        myEndDate, myDaysLeft, myfirstTask, mysecondTask, myDepartment, myMentor, myTaskRes1,
        myTaskRes2, myAttachedFiles);

    return newIntern;
}

function addNewIntern(e) {
    var newIntern =  createNewIntern(e);

    errorName.innerText = '';
    errorMail.innerText = '';

    for (const key in newIntern) {
        if (newIntern[key] == "") {
            return;
        }
    }

    newInternArr.push(newIntern);
    currentInternList = sessionStorage.getItem('intern') ? JSON.parse(sessionStorage.getItem('intern')) : [];

    hasIntern = false;
    currentInternList.forEach(function(item, index, array) {   
        var currentEmail = newInternArr.find(arr => arr.email === item.email);
        var currentName = newInternArr.find(arr => arr.name === item.name);
        
        if(currentName) {
            internName.value = "";
            errorName.innerText = "There is already an intern with this name";
            hasIntern = true;
        }
        else if(currentEmail) {
            email.value = "";
            errorMail.innerText = "There is already an intern with this email";
            hasIntern = true;
        }

    });

    newInternArr = [];

    if(!hasIntern) {
        
        if(!validate() || !dateValidate()) return;
        
        currentInternList.push(newIntern);
        sessionStorage.setItem("intern", JSON.stringify(currentInternList));
        window.location.assign('../index.html');
    }
}

function currentIntern() {
    currentInternList = JSON.parse(sessionStorage.getItem('intern'));

    var imageSrc = null;
  
    imageSrc = currentInternList.find(currentItem => currentItem.name == params.get('name')); 
   
    internName.value = params.get('name');
    avatar.src = imageSrc.image;
    phone.value = params.get('phone');
    email.value = params.get('email');
    startDate.value = params.get('startDate');
    endDate.value = params.get('endDate');
    dLeft.value = params.get('daysLeft');
    firstTask.value = params.get('task1');
    secondTask.value = params.get('task2');
    department.value = params.get('dept');
    mentor.value = params.get('mentor');
    firstTaskResult.value = params.get('task1Res');
    secondTaskResult.value = params.get('task2Res');
    dept.disabled = false;
    firstTaskResult.disabled = false;
    secondTaskResult.disabled = false;
}

function editIntern(e) {
    var editedIntern = createNewIntern(e);
    
    var editedInternList = [];
    
    errorName.innerText = '';
    errorMail.innerText = '';
    
    currentInternList = JSON.parse(sessionStorage.getItem('intern'));

    var intern = null;
    hasIntern = false;

    intern = currentInternList.find(currentItem => currentItem.name == params.get('name'));

    if(editedIntern.name !== params.get('name') || editedIntern.email !== params.get('email')) {

        if(!intern.name || !intern.email) {
            var newName = currentInternList.find(currentItem => currentItem.name == editedIntern.name);
            var newEmail = currentInternList.find(currentItem => currentItem.email == editedIntern.email);
            
            if (newName) {
                internName.value = "";
                errorName.innerText = "There is already an intern with this name";
                hasIntern = true;
            }
            else if(newEmail) {
                email.value = "";
                errorMail.innerText = "There is already an intern with this email";
                hasIntern = true;
            }
        } 
    }

    if(!editedIntern.image || !editedIntern.attachedFiles) {
        editedIntern.image = intern.image;
        editedIntern.attachedFiles = intern.attachedFiles;
    }
    
    if(!hasIntern) {
        for (var i = 0; i < currentInternList.length; i++) {
            if(currentInternList[i].name !== intern.name) {
                editedInternList.push(currentInternList[i]);
            }
        }

        if(!validate() || !dateValidate()) return;
        
        editedInternList.push(editedIntern);
        sessionStorage.setItem("intern", JSON.stringify(editedInternList));
        window.location.assign('../index.html');
    }
}

function deleteIntern(e) {
    var myIntern = createNewIntern(e);
    var newInternList = [];
   
    currentInternList = JSON.parse(sessionStorage.getItem('intern'));

    for (var i = 0; i < currentInternList.length; i++) {
        if(currentInternList[i].name !== myIntern.name) {
            newInternList.push(currentInternList[i]);
        }
    }

    sessionStorage.setItem("intern", JSON.stringify(newInternList));
    window.location.assign('../index.html');
}

   
 
   