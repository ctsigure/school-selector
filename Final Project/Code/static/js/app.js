var $tbody = document.querySelector("#myBody");


var $zipInput = document.querySelector("#zipcode");
var $searchBtn = document.querySelector("#search");
var $nameInput = document.querySelector("#schoolname");
var $rankingInput = document.querySelector("#testscore");
var $faithbasedInput = document.querySelector("#faithbased");
var $tsratioInput = document.querySelector("#tsratio");
var $fmratioInput = document.querySelector("#fmratio");
var $lotteryInput = document.querySelector("#lottery");
var $typeInput = document.querySelector("#type");



var $loadMoreBtn = document.querySelector("#loadBtn");
$searchBtn.addEventListener("click", handleSearchButtonClick);

var filteredAddresses = dataSet;
var r1Val = document.querySelector("#r1");
var r2Val = document.querySelector("#r2");
var r3Val = document.querySelector("#r3");

var startingIndex = 0;
var resultsPerPage = 10;


resetPagination()


function renderTable() {
  $tbody.innerHTML = "";
  var endingIndex = startingIndex + resultsPerPage;
  var addressSubset = filteredAddresses.slice(startingIndex, endingIndex);

  for (var i = 0; i < addressSubset.length; i++) {
    var address = addressSubset[i];
    var fields = Object.keys(address);
    var $row = $tbody.insertRow(i);

    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
};

function handleSearchButtonClick() {
  startingIndex = 0;
  resetPagination()
 
  var filterZip = $zipInput.value.trim().toLowerCase();
  var filterName  = $nameInput.value.trim().toLowerCase();  
  var filterRanking = $rankingInput.value.trim().toLowerCase();
  var filterFaith  = $faithbasedInput.value.trim().toLowerCase();
  var filterTsratio = $tsratioInput.value.trim().toLowerCase();
  var filterFmratio  = $fmratioInput.value.trim().toLowerCase();  
  var filterLottery = $lotteryInput.value.trim().toLowerCase();
  var filterType  = $typeInput.value.trim().toLowerCase();

  filteredAddresses = dataSet
  if (filterZip != '') {
    filteredAddresses = filteredAddresses.filter(function(data) {
      return data.zipcode == filterZip
    })
  }

  if (filterName != '') {
    filteredAddresses = filteredAddresses.filter(function(data) {
      return data.name.toLowerCase().includes(filterName)
    })
  }

  if (filterRanking != '') {
    filterRanking = parseInt(filterRanking)
    filteredAddresses = filteredAddresses.filter(function(data) {
      return parseInt(data.testScore) == filterRanking
    })
  }

  if (filterFaith != '') {
    filterFaith = filterFaith.charAt(0).toUpperCase() + filterFaith.substring(1)
    filteredAddresses = filteredAddresses.filter(function(data) {
      return data.faithbase == filterFaith
    })
  }

  if (filterTsratio != '') {
    filteredAddresses = filteredAddresses.filter(function(data) {
      return data.stratio == filterTsratio
    })
  }

  if (filterFmratio != '') {
    filteredAddresses = filteredAddresses.filter(function(data) {
      return data.fmratio == filterFmratio
    })
  }

  if (filterLottery != '') {
    filterLottery = filterLottery.charAt(0).toUpperCase() + filterLottery.substring(1)
    filteredAddresses = filteredAddresses.filter(function(data) {
      return data.lottery == filterLottery
    })
  }

  if (filterType != '') {
    filterType = filterType.charAt(0).toUpperCase() + filterType.substring(1)
    filteredAddresses = filteredAddresses.filter(function(data) {
      return data.type == filterType
    })
  }
  renderTable();
  sortTable(2);
  if (isListEnd()) {
    setNoMorePages()
  }
}



$loadMoreBtn.addEventListener("click", handleButtonClick);

function handleButtonClick() {
  startingIndex += resultsPerPage;
  if (startingIndex >= filteredAddresses.length) {
    startingIndex -= resultsPerPage;
    return
  }
  if (isListEnd()) {
    setNoMorePages()
  }
  renderTable();
  sortTable(2);
}

function setNoMorePages() {
  $loadMoreBtn.classList.add("disabled");
  $loadMoreBtn.innerText = "All Addresses Loaded";
}

function resetPagination() {
  $loadMoreBtn.classList.remove("disabled");
  $loadMoreBtn.innerText = "Load Next " + resultsPerPage + " addresses"
}

function isListEnd() {
  return startingIndex + resultsPerPage >= filteredAddresses.length
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  dir = "asc"; 
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;      
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

renderTable();
sortTable(2);