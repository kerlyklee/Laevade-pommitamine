/*var resultsForSorting = [];
var results;
var tableSpace;
function gid(x) {
        return document.getElementById(x);
}

function loadScore(){
  fetch('../cgi-bin/prax3/test.py?get=1').then(function(r) {
    return r.text();
  }).then(function(t) {
      var table = t.split(" ");
      var itemNum = table.length;
      var rowNum = itemNum/5;
      var tries = Math.round(rowNum);
      var cntLeft = 10;
        for (var i = tries, j=0; i > 0; i--) {
                    
                     var person = {}; 
                    person['firstName'] = table[j];
                    j++;
                     person['myPoints'] = table[j];
                    j++;
                     person['compPoints'] = table[j];
                    j++;
                      person['gameTime'] = table[j];
                    j++;
                      person['gameDate'] = table[j];
                     j++;
                  cntLeft--;

                  resultsForSorting.push(person); 


                   
         }  
         fillTable();
    
  });
}

 function search(){
  cleanSearch();
  results=0;
  var search = gid("searchPlayer").value;
  var search = search.toUpperCase();
  console.log(search);
  fetch('../cgi-bin/prax3/test.py?get=kuva').then(function(r) {
    return r.text();
  }).then(function(t) {
      var tabel = t.split(" ");
      var itemNum = tabel.length;
          
      for (var i = 0; i < itemNum; i++) {
        console.log(tabel[i]);

        if (tabel[i].includes(search)) {
          var j=i;
          gid("sNimi").innerHTML += "<p id=1>" + tabel[j] + "</p>";
          j++;
          gid("sMinupunktid").innerHTML += "<p id=2>" + tabel[j] + "</p>";
          j++;
          gid("sVastasepunktid").innerHTML += "<p id=3>" + tabel[j] + "</p>";
          j++;
          gid("sManguaeg").innerHTML += "<p id=4>" + tabel[j] + "</p>";
          j++;
          gid("sKuupaev").innerHTML += "<p id=5>" + tabel[j] + "</p>";
          j++;
          results++;
        } 
      }
  });
}

  

function sortNamesAZ(){
resultsForSorting.sort(function(a, b){
    var nameA=a.firstName.toLowerCase(), nameB=b.firstName.toLowerCase()
    if (nameA < nameB) //sort string ascending
        return -1 
    if (nameA > nameB)
        return 1
    return 0 //default return value (no sorting)
})
cleanTable();
fillTable();

}

function sortMyPointsAZ(){
resultsForSorting.sort(function(a, b){
    return a.myPoints-b.myPoints;
})
cleanTable();
fillTable();
}
function sortCompPointsAZ(){
  resultsForSorting.sort(function(a, b){
    return a.compPoints-b.compPoints;
})
cleanTable();
fillTable();
}
function sortGameTimeAZ(){
  resultsForSorting.sort(function(a, b){
    return a.gameTime-b.gameTime;
})
cleanTable();
fillTable();
}
function sortDatesAZ(){
 resultsForSorting.sort(function(a, b){
    var nameA=a.gameDate.toLowerCase(), nameB=b.gameDate.toLowerCase()
    if (nameA < nameB)
        return -1 
    if (nameA > nameB)
        return 1
    return 0 //default return value (no sorting)
})
cleanTable();
fillTable(); 

}
function sortNamesZA(){
  resultsForSorting.sort(function(a, b){
    var nameA=a.firstName.toLowerCase() 

    var nameB=b.firstName.toLowerCase()
    if (nameA > nameB) 
        return -1 
    if (nameA < nameB)
        return 1
    return 0 //default return value (no sorting)
    console.log(resultsForSorting);
})
cleanTable();
fillTable();


}
function sortMyPointsZA(){
  resultsForSorting.sort(function(a, b){
    return b.myPoints-a.myPoints;
})
cleanTable();
fillTable();

}
function sortCompPointsZA(){
  resultsForSorting.sort(function(a, b){
    return b.compPoints-a.compPoints;
})
cleanTable();
fillTable();
}
function sortGameTimeZA(){
  resultsForSorting.sort(function(a, b){
    return b.gameTime-a.gameTime;
})
cleanTable();
fillTable();
}
function sortDatesZA(){
 resultsForSorting.sort(function(a, b){
    var nameA=a.gameDate.toLowerCase(), nameB=b.gameDate.toLowerCase()
    if (nameA > nameB) //sort string ascending
        return -1 
    if (nameA < nameB)
        return 1
    return 0 //default return value (no sorting)
})
cleanTable();
fillTable(); 
}/**
 * Function to sort alphabetically an array of objects by some specific key.
 * 
 * @param {String} property Key of the object to sort.
 */




/*function fillTable(table){
 let names = resultsForSorting.map(a => a.firstName);
  let humanPoints = resultsForSorting.map(a => a.myPoints);
  let computerPoints = resultsForSorting.map(a => a.compPoints);
  let gameLasted = resultsForSorting.map(a => a.gameTime);
  let gameHappened = resultsForSorting.map(a => a.gameDate);
  //let  humanPoint = resultsForSorting.map(a => a.myPoints);
  //console.log(myPoints);

  

for (var i = 0; i < resultsForSorting.length; i++) {
    gid("nimi").innerHTML += "<p id=cleanName>" + names[i] + "</p>";
    gid("minupunktid").innerHTML += "<p id=cleanMyPoints>" + humanPoints[i] + "</p>";
    gid("vastasepunktid").innerHTML += "<p id=cleanCompPoints>" + computerPoints[i] + "</p>";
    gid("manguaeg").innerHTML += "<p id=cleanTime>" + gameLasted[i] + "</p>";
    gid("kuupaev").innerHTML += "<p id=CleanDate>" + gameHappened[i] + "</p>";
    tableSpace++;
    if (tableSpace == 10)
    { 
      var j=0
      removeByAttr(resultsForSorting, 'nimi', names[j]);

      j++;   

    }
  
}


  
}
   

function cleanTable(){

 

 for (var i = 0; i < resultsForSorting.length; i++){ 
  gid("cleanName").outerHTML = "";
  gid("cleanMyPoints").outerHTML = "";
  gid("cleanCompPoints").outerHTML = "";
  gid("cleanTime").outerHTML = "";
  gid("CleanDate").outerHTML = "";
}

}
function cleanSearch() {
  for (var i = 0; i<results; i++){
  gid("1").outerHTML = "";
  gid("2").outerHTML = "";
  gid("3").outerHTML = "";
  gid("4").outerHTML = "";
  gid("5").outerHTML = "";
  }

}
*/