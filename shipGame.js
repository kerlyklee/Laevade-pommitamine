var yourBoard;
var compBoard;
var size;
var ships;
var boardActive = new Boolean(false);
var humanBoatsLeft;
var computerBoatsLeft;
var myShots = 0;
var compShots = 0;
var startTime;
var endTime;
var timeSpent;
var isMyWin = new Boolean(false);
var name;
var compShipsDestroyed;
var myShipsDestroyed;
var kuuPaev;
function gid(x) {
        return document.getElementById(x);
    }


function makeBoard(size) {
  var yourBoard=[]; 
  for (var x=0; x<size; x++) {
    yourBoard[x]=[]; 
    for (var y=0; y<size; y++) yourBoard[x][y]=0;
	
  }
  
   
   return yourBoard;
}
     

function makeCompBoard(size) {
  var compBoard=[]; 
  for (var cx=0; cx<size; cx++) {
    compBoard[cx]=[]; // insert empty subarray
    for (var cy=0; cy<size; cy++) compBoard[cx][cy]=0;
  }
  
  return compBoard;
}

function drawBoard(yourBoard) {
    var c = "";
    c = "<table>";
    for (var x=0; x<yourBoard.length; x++) {
        c += "<tr>";
        for (var y=0; y<yourBoard.length; y++) {
            c += "<td id='x" + x + "y" + y + "' class='bcell' onclick='move("+x+", "+y+")'></td>";
        }
        c += "</tr>";
    }
    c += "</table>";
    gid("gameBoard").innerHTML = c;
	fillBoard(size,ships, yourBoard);
}
function drawSecondBoard(compBoard) {
    var c = "";
    c = "<table>";
    for (var cx=0; cx<compBoard.length; cx++) {
        c += "<tr>";
        for (var cy=0; cy<compBoard.length; cy++) {
            c += "<td id='cx" + cx + "cy" + cy + "' class='bcell' ></td>";
        }
        c += "</tr>";
    }
    c += "</table>";
    gid("gameCompBoard").innerHTML = c;
	fillCompBoard(size,ships, compBoard);
}
function fillBoard(size, ships, yourBoard) {
  var col,row,isOk,triesForRow;
  var shipsPlaced = 0;
  size=parseInt(size); 
  for(row=0;row<size;row++) { 
    isOk=false;
    triesForRow=0;
   
    while(!isOk && triesForRow<20 && shipsPlaced<ships) {
      col=Math.floor(Math.random()*(size-1));
      if (row>0) {
        if (yourBoard[row-1][col]==1) { isOk=false; }
        else if (col>0 && yourBoard[row-1][col-1]==1) { isOk=false; }
        else if (col<size-1 && yourBoard[row-1][col+1]==1) { isOk=false; } 
        else isOk=true && shipsPlaced++;
      } else {
        isOk=true; shipsPlaced++;
      }
      triesForRow++;
    }  
	
     if(isOk){
		
		yourBoard[row][col]=1 
		yourBoard[row][col+1]=1;
		
		
	 }
	 
    }  
		
      
}
function fillCompBoard(size, ships, compBoard) {
  var cy,cx,isOk, triesForRow, shipsPlaced;
  var shipsPlaced = 0;
  size=parseInt(size); 
  // loop over all the rows, to place one ship to each (most) rows    
  for(cx=0;cx<size;cx++) { 
    isOk=false;
    triesForRow=0;
    // try different random column positions until OK pos found: 
    // if no position OK during 20 tries, give up and 
    // do not put a ship on this line at all
    while(!isOk && triesForRow<20 && shipsPlaced<ships) {
      cy=Math.floor(Math.random()*(size-1));
      if (cx>0) {
        if (compBoard[cx-1][cy]==1) { foundok=false; }
        else if (cy>0 && compBoard[cx-1][cx-1]==1) { isOk=false; }
        else if (cy<size-1 && compBoard[cx-1][cx+1]==1) { isOk=false; } 
        else isOk=true && shipsPlaced++;
      } else {
        isOk=true;
		shipsPlaced++;
      }  
      triesForRow++;
    }  
    if (isOk) {
			compBoard[cx][cy]=1;
			compBoard[cx][cy+1]=1;
			
			if (compBoard[cx][cy]==1){
				 gid("cx" + cx + "cy" + cy ).style.backgroundImage = "url(png/first.jpg)";
				 gid("cx" + cx + "cy" + cy ).setAttribute("essa", true);
				 secondHalf(compBoard);
				 
			}
			
			 
									
			
		}
   
      
  }     
}

function secondHalf(compBoard) {
	cx=Math.floor(Math.random() * size);
	cy=Math.floor(Math.random() * size);
	if (compBoard[cx][cy]==1){
		if(gid("cx" + cx + "cy" + cy ).hasAttribute("essa", true)){
		secondHalf(compBoard);     
		}
		else if (gid("cx" + cx + "cy" + cy ).hasAttribute("tessa", true)){
			secondHalf(compBoard);
		}
		else {
			gid("cx" + cx + "cy" + cy ).style.backgroundImage = "url(png/first2.jpg)"
			gid("cx" + cx + "cy" + cy ).setAttribute("tessa", true);
		}
		
	}
	else if (compBoard[cx][cy]==0){
		secondHalf(compBoard);
	}
}
function startGame() {
    if (gid("3x3").checked) {
        size = 3;
    } else if (gid("4x4").checked) {
        size = 4;
	} else if (gid("5x5").checked) {
        size = 5;
    } else if (gid("6x6").checked) {
        size = 6;
    } else if (gid("7x7").checked) {
        size = 7;
    } else if (gid("8x8").checked) {
        size = 8;
    } else if (gid("9x9").checked) {
        size = 9;
    } else if (gid("10x10").checked) {
        size = 10;
    }
	 name = gid("name").value;
    ships = gid("ships").value;
	
	  if(name == 0 || name==""){
      alert("Palun sisesta nimi ka :)")
    }
    if(ships == 0 || ships=="") {
        alert("Palun sisestada laevade arv ka ;)")
    }
    else if(ships >= size) {
        alert("Laevade arv liiga suur :o")
    }
    else {
        yourBoard = makeBoard(size);
		compBoard = makeBoard(size);
        drawBoard(yourBoard);
		drawSecondBoard(compBoard);
		humanBoatsLeft = ships * 2;
		computerBoatsLeft = ships * 2;
        boardActive = true;
        startTime = Date.now();
		isMyWin = false;
		name = name.replace(/\s+/g, '');
    name = name.toUpperCase();
		kuuPaev = new Date().toLocaleString();
    kuuPaev = kuuPaev.replace(/\s+/g, '');
    
    
		
		
    }

}


function move(x, y) {
    if(boardActive == true)		{
		if (gid("x" + x + "y" + y).hasAttribute("occupied", true)) {
			alert ("Juba vajuta siia, ära raiska pomme!");
		}
        else if(yourBoard[x][y] == 1) {
			myShots++;
            gid("x" + x + "y" + y).style.backgroundImage = "url(png/hit.jpg)";
		
			
			gid("x" + x + "y" + y).setAttribute("occupied", true);
			computerBoatsLeft--;
			
			if (computerBoatsLeft == 0) myWin();
			
		
			
			
		
        } 
		
        else if(yourBoard[x][y] == 0) {
			myShots++;
            gid("x" + x + "y" + y).style.backgroundColor = "grey";
			gid("x" + x + "y" + y).setAttribute("occupied", true);
			compMove(cx, cy);
			
        }   
    } 
}
function compMove( cx, cy) {

	 cx=Math.floor(Math.random() * size);
	 cy=Math.floor(Math.random() * size);
	 if (gid('cx' + cx + 'cy' + cy).hasAttribute("occupied", true)){
			compMove( cx, cy);
	 }
	 
	 else if(compBoard[cx][cy] ==1) {
			compShots++;
				gid("cx" + cx + "cy" + cy).setAttribute("occupied", true);
				 gid("cx" + cx + "cy" + cy).style.backgroundImage = "url(png/hit.jpg)";
				
               humanBoatsLeft--;
			   if (humanBoatsLeft == 0) compWin();
			   
			   compMove( cx, cy);
				
		
				 
			 }
			 else if(compBoard[cx][cy] == 0) {
				 compShots++;
				 gid("cx" + cx + "cy" + cy).setAttribute("occupied", true);
				  gid("cx" + cx + "cy" + cy).style.backgroundColor = "grey";
                 
			 }
			
} 

function myWin() {
	var endTime = Date.now();
    timeSpent = (endTime - startTime)/1000;
	    isMyWin = true;
		alert ("Palju õnne vaenlase laevad  hävitatud!");
		newResults();
        boardActive = false;
		myShots = 0;
		compShots = 0;
	   var destroyed = ships - humanBoatsLeft/2;
      myShipsDestroyed = Math.round(destroyed);
        compShipsDestroyed = ships;
	    saveScore(kuuPaev, name,  compShipsDestroyed, myShipsDestroyed, timeSpent);
	}
function compWin(){ 
	alert ("Palju õnne, arvuti on targem kui sina!");
	var endTime = Date.now();
        timeSpent = (endTime - startTime)/1000;
		newResults();
		boardActive = false;
		myShots = 0;
		compShots = 0;
	   var destroyed = ships - computerBoatsLeft/2;
     compShipsDestroyed = Math.round(destroyed);

	    myShipsDestroyed = ships;
      
		saveScore(kuuPaev, name, compShipsDestroyed, myShipsDestroyed, timeSpent);
		
	
}
function newResults() { 
 
	var laevad = ships;
    var sizes = size;
    var laud = sizes+"x"+sizes;
   
	var winner;
    if (isMyWin == true){
		winner="Võit";
	}
	else if (isMyWin == false){
		winner="Kaotus";
	}
    var table = gid("score");
	
    var rida = ""
    rida += "<td>"+laud+"</td>";
    rida += "<td>"+laevad+"</td>";
    rida += "<td>"+myShots+"</td>";
    rida += "<td>"+compShots+"</td>";
    rida += "<td>"+timeSpent+"</td>";
    rida += "<td>"+winner+"</td>";
	table.style.display = 'table';
    for (var i = 9; i >=1; i= i-1) { 
        gid(i).innerHTML = gid(i-1).innerHTML;
        localStorage.setItem("rida"+i, gid(i).innerHTML);
    }
    
    gid(0).innerHTML = rida;
    localStorage.setItem("rida", rida);
	
} 

function loadResult(loadParameter){
      fetch('../cgi-bin/prax3/test.py?load=' + loadParameter).then(function(r) {
        return r.text();
        }).then(function(t) {
          formatScoreBoard(t);  
  });
}

    function saveScore(dateAndTime, playerName, myShipsDestroyed, compShipsDestroyed, timeSpent) {
      var save = dateAndTime + " " + playerName + " " + myShipsDestroyed + " " + compShipsDestroyed + " " + timeSpent;
      fetch('../cgi-bin/prax3/test.py?save=' + save);
    }

    function searchScores(){
      playerToSearch = gid("playerNameSearch").value
      fetch('../cgi-bin/prax3/test.py?search=' + playerToSearch).then(function(r) {
        return r.text();
        }).then(function(t) {
          formatScoreBoard(t);
    });
  }


function formatScoreBoard(t){
  gid("gameDate").innerHTML = ""
  gid("playerName").innerHTML = ""
  gid("myShipsDestroyed").innerHTML = ""
  gid("compShipsDestroyed").innerHTML = ""
  gid("gameTime").innerHTML = ""
          var results = t.split("\n");
          if(results.length > 10) {
            lastIndex = 10;
          }
          else {
            lastIndex = results.length
          }
          for (index = 0; index < lastIndex; ++index){
            var detailsOfResult = results[index].split(" ")
            if(detailsOfResult[0] != ""){
              textBefore = gid("gameDate").innerHTML;
              gid("gameDate").innerHTML = textBefore + detailsOfResult[0] + "</br>"
              textBefore = gid("playerName").innerHTML;
              gid("playerName").innerHTML = textBefore + detailsOfResult[1] + "</br>"
              textBefore = gid("myShipsDestroyed").innerHTML;
              gid("myShipsDestroyed").innerHTML = textBefore + detailsOfResult[2] + "</br>"
              textBefore = gid("compShipsDestroyed").innerHTML;
              gid("compShipsDestroyed").innerHTML = textBefore + detailsOfResult[3] + "</br>"
              textBefore = gid("gameTime").innerHTML;
              gid("gameTime").innerHTML = textBefore + detailsOfResult[4] + "</br>"     
        }
          }
  }
