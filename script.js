let gameBoard = (function(){
    let gbArray = ["", "", "", "","", "", "", "", ""]; 
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

    function print(){
        console.log(gbArray);
    }

    function resetArray(){
        for(let i = 0; i < gbArray.length; i++){
            gbArray[i] = "";
            cells[i].innerHTML = gbArray[i];
        }
    }
    
    function clickEnabled(){
        for(let i = 0; i < cells.length; i++){
            cells[i].classList.remove("stopClicks");
        }
    }

    function stopClicking(){
        for(let i = 0; i < cells.length; i++){
            cells[i].classList.add("stopClicks");
        }
    }

    function modifyArrayValue(cellIndex, playerIndex){
        if(playerIndex == 0 && gbArray[cellIndex] == "")
            gbArray[cellIndex] = "O";
        else if(playerIndex == 1 && gbArray[cellIndex] == ""){
            gbArray[cellIndex] = "X";
        }
        cells[cellIndex].innerHTML = gbArray[cellIndex];
    }

     function check(){
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
            count++;
        }
        return false;
    }

    return{
        modifyArrayValue,
        check,
        stopClicking,
        resetArray,
        clickEnabled,
        print,
    }  
})();

const playerCreator = (name, index) => {
    const getName = () => name;
    return {name, index}
};

const playGame = (function(){
    const playButton = document.getElementById("start");
    const player = playerCreator("Player", 1);
    const comp = playerCreator("Computer", 2)
    let count = 0;

    function turnGenerator(){
        count = 1- count;
        return count;
    }

    function displayWinner(turn){
        const div = document.getElementById("resultsSection")
        const element = document.createElement("div") 
        element.classList.add("resultClass")
        element.setAttribute("id",  "result")
        div.appendChild(element)

        if(turn == 0){
            element.innerHTML = "Player One Wins"
        }else if(turn == 1){
            element.innerHTML = "Player Two Wins"

        }
    }

    function displayTie(){
        const div = document.getElementById("resultsSection")
        const element = document.createElement("div") 
        element.classList.add("resultClass")
        element.setAttribute("id",  "result")
        div.appendChild(element)
        element.innerHTML = "TIE!"


    }

    function restart(){
        const result = document.getElementById("result")
        const playAgnBtn = document.getElementById("playAgain")
        result.remove();
        playAgnBtn.remove();
        gameBoard.resetArray();
        gameBoard.clickEnabled();

    }

    function playAgain(){
        const element = document.createElement("button")
        const resultSection = document.getElementById("resultsSection")
        element.innerHTML = "PLAY AGAIN"
        element.classList.add("playAgain")
        element.setAttribute("id", "playAgain")
        resultSection.appendChild(element)

    }
    
    document.addEventListener("click", function(e){
        if(e.target && e.target.className == "gridCell"){
            let cell = e.target
            let cellIndex = cell.getAttribute('data-index')
            let turn = turnGenerator();
            gameBoard.modifyArrayValue(cellIndex, turn);
            let check = gameBoard.check()
            console.log(check)
            if(check){
                displayWinner(turn)
                gameBoard.stopClicking(); 
                playAgain();
            }
            gameBoard.print();

        }
    })

    document.addEventListener("click", function(e){
        if(e.target && e.target.className == "playAgain"){
            restart();
        }
    })

    return{
       displayTie,
    }
})();