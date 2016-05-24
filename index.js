function generateBoard() {
	
    var tBody = document.getElementById("tBody");
    var next = document.querySelector('#next');
    var backButton = document.querySelector('#back')
    var pageNumber = 1;

    function getData() {
        var output = $.ajax({
            url: "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/topscorers",
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(data) {
                writeData(data, pageNumber);
            },
            error: function(err) {
                alert(err);
                console.log(err);
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Mashape-Authorization", "kxSXmUymofmshFHhhKxWOSJpqJsJp1I3zNnjsnqKwhITAiC1zw");
            }
        });
    };

    function writeData(data, pageNumber) {
        var fullname = [];
        var goals = [];

        for (i = pageNumber * 10 - 10; i < data.data.topscorers.length && i < pageNumber * 10; i++) {

            var rowNum = document.createElement("tr");
            tBody.appendChild(rowNum);

            var playerNum = document.createElement("td");
            rowNum.appendChild(playerNum);
            var numText = document.createTextNode(i + 1);
            playerNum.appendChild(numText);

            var playerName = document.createElement("td");
            rowNum.appendChild(playerName);
            var nameText = document.createTextNode(data.data.topscorers[i].fullname);
            playerName.appendChild(nameText);

            var playerGoals = document.createElement("td");
            rowNum.appendChild(playerGoals);
            var goalsText = document.createTextNode(data.data.topscorers[i].goals);
            playerGoals.appendChild(goalsText);

            if (i % 2 == 1) {
                rowNum.setAttribute("class", "odd");
            } else {
                rowNum.setAttribute("class", "even");
            }
        };
    };
  function buttonHider() 
  //set up button or clean up unnecessary button
  {
  		if (pageNumber==16) {
    		var hidden = document.getElementById("next");
    		hidden.setAttribute("class","hidden");
    		var unHidden = document.getElementById("back");
    		unHidden.setAttribute("class","button");
    	  } else if(pageNumber==1){
    		var hidden = document.getElementById("back");
    		hidden.setAttribute("class","hidden");
    		var unHidden = document.getElementById("next");
    		unHidden.setAttribute("class","button");
   	 } else {
   	 	var unHidden = document.getElementById("next");
    		unHidden.setAttribute("class","button");
    		var unHidden = document.getElementById("back");
    		unHidden.setAttribute("class","button");
    		}
   }
    function getNextPage() {
        pageNumber++
        while (tBody.firstChild) tBody.removeChild(tBody.firstChild);
        buttonHider()
        getData();
        
    }
    
    function getPreviousPage() {
        pageNumber--
        while (tBody.firstChild) tBody.removeChild(tBody.firstChild);
        getData();
        buttonHider();
    }
    
    getData();
   
    next.addEventListener("click", getNextPage);
    backButton.addEventListener("click", getPreviousPage);
};
generateBoard();