// made by Abdullah395
var data;
var page = 1;
var enteries = 500;

function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item.license] !== 1) {
               seen[item.license] = 1;
               out[j++] = item;
         }
    }
    return out;
}

window.onload = function() {
  const licenses = document.getElementById("licenses");

  // Request data from server
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	   data = JSON.parse(http.responseText);
	   data["licenses"].sort(function(a, b){
		 return parseInt(a.license) > parseInt(b.license) ? -1 : 1;
	   });
		
		data["licenses"] = uniq_fast(data["licenses"]);
		
       const lastupdated = document.getElementById("lastupdated");
       lastupdated.innerHTML = "اخر تحديث للبيانات: &nbsp&nbsp" + data["lastupdate"];

       renderData(page, enteries);
    }
  };
  http.open("GET", "https://licenses-scrape.herokuapp.com/show", true);
  http.send();

  /*const pager = document.getElementById("pager");
  pager.onclick = function(e) {

    clickedPage = e.target;

    if(clickedPage.innerHTML == "<<") {
      page = 1;
    } else if(clickedPage.innerHTML == ">>") {
      page = Math.ceil(data["licenses"].length / enteries);
    } else {
      page = clickedPage.innerHTML;
    }

    Array.from(pager.children).forEach(function(child) {
        child.className = "page";
    });
    clickedPage.className = clickedPage.className + " pageSelected";

    while(licenses.lastChild) {
      licenses.removeChild(licenses.lastChild);
    }

    renderData(page, enteries);
  }*/

  function renderData(page, enteries) {


    //for(var entry = 0; entry <= enteries-1; entry++){
    data["licenses"].forEach(function(license) {

      //var index = (enteries * (page - 1)) + entry;
      //if(index+1 > data["licenses"].length) break;

      //var license = data["licenses"][index];

      var table = document.createElement("table");

      var headerRow = document.createElement("tr");
      // headers
      var header1 = document.createElement("th");
      header1.innerHTML = "رخصة رقم:&nbsp&nbsp&nbsp&nbsp&nbsp" + license["license"];
      headerRow.appendChild(header1);

      var header2 = document.createElement("th");
      header2.innerHTML = "الرابط:&nbsp&nbsp&nbsp&nbsp&nbsp<a href='" + license["link"] + "' target='_blank'>اضغط هنا</a>";
      headerRow.appendChild(header2);

      table.appendChild(headerRow);

      var firstRow = document.createElement("tr");

      var firstRowData1 = document.createElement("td");
      firstRowData1.innerHTML = "الجهة المشرفة: " + license["supervisor"];
      firstRow.appendChild(firstRowData1);

      var firstRowData2 = document.createElement("td");
      firstRowData2.innerHTML = "الخدمة: " + license["service"];
      firstRow.appendChild(firstRowData2);

      table.appendChild(firstRow);

      var secondRow = document.createElement("tr");

      var secondRowData1 = document.createElement("td");
      secondRowData1.innerHTML = "تاريخ البداية: " + license["startDate"];
      secondRow.appendChild(secondRowData1);

      var secondRowData2 = document.createElement("td");
      secondRowData2.innerHTML = "تاريخ النهاية: " + license["endDate"];
      secondRow.appendChild(secondRowData2);

      table.appendChild(secondRow);

      var thirdRow = document.createElement("tr");

      var thirdRowData1 = document.createElement("td");
      thirdRowData1.setAttribute("colspan", "2");

      thirdRowData1.innerHTML = "الحي: " + license["qoura"];
      thirdRow.appendChild(thirdRowData1);

      table.appendChild(thirdRow);

      var fourthRow = document.createElement("tr");

      var fourthRowData1 = document.createElement("td");
      fourthRowData1.setAttribute("colspan", "2");

      fourthRowData1.innerHTML = "الشارع: " + license["streets"];
      fourthRow.appendChild(fourthRowData1);

      table.appendChild(fourthRow);

      licenses.appendChild(table);
    });
  }
}
