var table =  document.getElementById('intern-list');
var tbody = document.createElement('tbody');
table.appendChild(tbody);
var goToAddBtn = document.getElementById('new-intern');
var  currentInternList = JSON.parse(sessionStorage.getItem('intern')); 
window.addEventListener('load', showInternList);
window.addEventListener('load', getCurrentIntern);

function showInternList() {

  for( var i = 0; i < currentInternList.length; i++) {
      var arr = currentInternList[i];
      var row = document.createElement('tr');
      tbody.appendChild(row);
      
      for (const key in arr) {
          var td = document.createElement('td');
          var div = document.createElement('div');
          div.className = 'imageBox';

          var img = document.createElement('img');
          row.appendChild(td);

          if( key == "image") {
              td.appendChild(div);
              div.appendChild(img);
              img.src = arr[key];
          }

          if ( key == "daysLeft" && arr.daysLeft < 10) {
            td.classList.toggle('error-day');
          }

          if( key !== 'image' && arr[key] != "null" && key !== 'attachedFiles') {
            td.appendChild(document.createTextNode(arr[key])); 
          }

          if( key == 'mentor') {
            var firstLetter = arr[key].charAt(0);
            var span = document.createElement('span');
            span.className = 'mentor-logo'
            td.prepend(span);
            span.innerText = firstLetter;
          }
          
          if(key == "name") {
          
          if(arr.task1Res && arr.task2Res) {
            var internRating = document.createElement('span');
            internRating.className = 'success-error';
            td.appendChild(internRating);
            
            if(arr.task1Res >= 50 && arr.task2Res >= 50) {
              internRating.innerText = 'passed successfully' + " " + arr.dept;
            } else {
              internRating.innerText = "Failed";
            }
          }

          }

          if( key == "attachedFiles") {
            var iconSpan = document.createElement('span');
            td.appendChild(iconSpan);
            iconSpan.className = 'tasks-img';
            iconSpan.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
            <!-- Generator: Adobe Illustrator 24.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <style type="text/css">
              .st0{fill:#231F20;}
            </style>
            <g>
              <path class="st0" d="M426.7,0H85.3C38.2,0,0,38.2,0,85.3v341.3C0,473.8,38.2,512,85.3,512h341.3c47.1,0,85.3-38.2,85.3-85.3V85.3
                C512,38.2,473.8,0,426.7,0z M85.3,56.9h341.3c15.7,0,28.4,12.7,28.4,28.4v237.8l-91-77.7c-29.1-23.9-71-23.9-100.1,0L56.9,418.1
                V85.3C56.9,69.6,69.6,56.9,85.3,56.9z"/>
              <circle class="st0" cx="142.2" cy="156.4" r="42.7"/>
            </g>
            </svg>
            <?xml version="1.0" encoding="utf-8"?>
            <!-- Generator: Adobe Illustrator 24.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <style type="text/css">
              .st0{fill:#231F20;}
            </style>
            <g>
              <path class="st0" d="M426.7,0H85.3C38.2,0,0,38.2,0,85.3v341.3C0,473.8,38.2,512,85.3,512h341.3c47.1,0,85.3-38.2,85.3-85.3V85.3
                C512,38.2,473.8,0,426.7,0z M85.3,56.9h341.3c15.7,0,28.4,12.7,28.4,28.4v237.8l-91-77.7c-29.1-23.9-71-23.9-100.1,0L56.9,418.1
                V85.3C56.9,69.6,69.6,56.9,85.3,56.9z"/>
              <circle class="st0" cx="142.2" cy="156.4" r="42.7"/>
            </g>
            </svg>
            `;

          }
      }
  }
}

function getCurrentIntern() {
    if (table) {
      for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
          findIntern(this);
        };
      }
    }
}

function findIntern(tableRow) {
 
    var name = tableRow.childNodes[0].innerHTML.replace(/<span class="success-error">(.*?)<\/span>/,"");
    var intern = null;
   
    intern = currentInternList.find(currentItem => currentItem.name == name);
    
    var urlParams = '';

    for ( var key in intern) {
      urlParams+= key + "=" + intern[key] + "&";
    }

    window.location.href = "intern-form/edit-record.html?"+ urlParams;
    
  }





