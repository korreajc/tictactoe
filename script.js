let gameBoard = (function(){
    let gbArray = ["", "", "", "", "", "", "", "", ""]; 
    let cells = document.getElementsByClassName("gridCell");
 

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
        }
    }  
})();

const playerCreator = name => {
    const getName = () => name;
    return {name}
};

const playGame = (() => {
    const playButton = document.getElementById("start");
    const resetButton = document.getElementById("reset");
    const player = playerCreator("Player");
    const comp = playerCreator("Computer")

    let turnCount = 0;    
    playButton.addEventListener("click", function(){
        gameBoard.populateIndex();
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
        })
    });

    resetButton.addEventListener("click", function(){
        gameBoard.resetBoard();
    });



})();