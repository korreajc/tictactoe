let gameBoard = (function(){
    let gbArray = ["", "", "", "", "", "", "", "", ""]; 
    let cells = document.getElementsByClassName("gridCell");
 
    let winCombinations = [{
            first: 0, 
            second: 1, 
            third: 2
        },
        {
            first: 0, 
            second: 3, 
            third: 6
        },
        {
            first: 0, 
            second: 4, 
            third: 8
        },
        {
            first: 6, 
            second: 7, 
            third: 8
        },
        {
            first: 2, 
            second: 5, 
            third: 8
        },
        {
            first: 1, 
            second: 4, 
            third: 7
        },
        {
            first: 3, 
            second: 4, 
            third: 5
        },
        {
            first: 6, 
            second: 4, 
            third: 2
        }
    ]
    

    function setCellIndex(){
        for(let i = 0; i < cells.length; i++){
            cells[i].setAttribute("data-index", i)
        }
    }

    
    return{
        populateIndex: function(){
            for(let i = 0; i < cells.length; i++){
            cells[i].innerHTML = gbArray[i];
            }  
            setCellIndex();
        }, 

        resetBoard: function(){
            for(let i = 0; i < cells.length; i++){
                gbArray[i] = "";
            }
            this.populateIndex();
            
        },

        changeCell: function(cellNumber, playerName){
            let startingLetter = "X"
            let changed = false;
            if(playerName == "Player" && gbArray[cellNumber] == ""){
                gbArray[cellNumber] = startingLetter
                cells[cellNumber].innerHTML = gbArray[cellNumber]
                startingLetter = "O"
                changed = true;
            }else if(playerName == "Computer" && gbArray[cellNumber] == ""){
                startingLetter = "O"
                gbArray[cellNumber] = startingLetter
                cells[cellNumber].innerHTML = gbArray[cellNumber]
                changed = true;
            }
            return changed;
        },

        check: function(){
                let count = 0;
                for(let i = 0; i < winCombinations.length; i++){
                    let firstIndex = gbArray[winCombinations[i].first]
                    let secondIndex = gbArray[winCombinations[i].second]
                    let thirdIndex = gbArray[winCombinations[i].third]
                    if(firstIndex == "X" && secondIndex == "X" && thirdIndex == "X"){
                        i == winCombinations.length
                        return true;
                    }else if(firstIndex == "O" && secondIndex == "O" && thirdIndex == "O"){
                        i == winCombinations.length
                        return true;
                    }
                }
        }, 

        again: function(){
            const newDiv = document.getElementById("buttonsDiv")
            const resetButton = document.createElement("button")
            resetButton.innerHTML = "PLAY AGAIN"
            resetButton.setAttribute("id", "resetButton")
            newDiv.appendChild(resetButton)
        },

        tieCheck: function(){
            let filledCount = 0;
            let checkTie = false;
            for(let i = 0; i < gbArray.length; i++){
                if(gbArray[i] == "X" || gbArray[i] == "Y"){
                    filledCount++;
                }
            }
            let checkWin = gameBoard.check();
            if(filledCount == 9 && checkWin == false){
                checkTie = true;
            }
            console.log(checkTie);
            return checkTie;
        }
    }  
})();

const playerCreator = name => {
    const getName = () => name;
    return {name}
};

const playGame = (() => {
    const playButton = document.getElementById("start");
    const player = playerCreator("Player");
    const comp = playerCreator("Computer")
    
    let turnCount = 0;    
    playButton.addEventListener("click", function(){
        gameBoard.populateIndex();
        playButton.remove();
        document.addEventListener("click", function(e){
            if(e.target && e.target.className == "gridCell"){
                let changed = false;
                let element = e.target;
                let index = element.getAttribute('data-index')
                console.log(index)
                if(turnCount%2 == 0){
                   changed = gameBoard.changeCell(index, player.name);
                }else {
                    changed = gameBoard.changeCell(index, comp.name);
                }
                if(changed){
                    turnCount++;
                }
            }
            let checkWin = gameBoard.check();
            let tieCheck = gameBoard.tieCheck();
            if(checkWin){
                gameBoard.again();
            }

            if(tieCheck){
                gameBoard.again();
                const changeResult = document.getElementById("result")
                changeResult.innerHTML = "TIE"
            }
        })
    });

    document.addEventListener("click", function(e){
        if(e.target && e.target.id == "resetButton"){
            gameBoard.resetBoard();
            let resetButton = document.getElementById("resetButton")
            resetButton.remove();
            turnCount = 0;
        }
    })
})();