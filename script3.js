const board = document.getElementById("board");
const statusText = document.getElementById("status");

let gameMode ="pvp";
let currentPlayer="X";
let gameActive=true;
let cells=["","","","","","","","",""];

const WinPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];
function setMode(mode){
    gameMode = mode;
    resetGame();
}
function createBoard(){
    board.innerHTML = "";
    for(let i=0;i<9;i++){
        const cell =
        document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click",()=>handleClick(i));
        board.appendChild(cell);
    }
}
        function handleClick(index){
            if(!gameActive || cells[index] !== "") 
                return;
                makeMove(index,currentPlayer);
                if(checkWin(currentPlayer)){
                    statusText.innerText= currentPlayer + "Wins 🎉";
                    gameActive = false;
                    return;
                }
                if(!cells.includes("")){
                    statusText.innerText = "Draw🤝";
                    gameActive = false;
                    return;
                }
                currentPlayer = currentPlayer === "X"?"0":"X";
                statusText.innerText =  currentPlayer+"'s Turn";
                
                if(gameMode ==="cpu" && currentPlayer==="0") {
                    setTimeout(computerMove,400);
                }
                }
                function makeMove(index,player){
                    cells[index] =player;
                    board.children[index].innerText = player;
                }
                function computerMove(){
                    if(!gameActive) return;
                    
                    let emptyCells =cells
                    .map((v,i)=>v===""?i:null)
                    .filter(v=>v !== null);
                    
                let move=emptyCells[Math.floor(Math.random()*emptyCells.length)];
                makeMove(move, "0");
                if(checkWin("0")){
                    statusText.innerText="Draw🤝";
                    gameActive = false;
                    return;
                }
                currentPlayer ="X";
                statusText.innerText="X;s Turn";
            }
            function checkWin(player){
                return WinPatterns.some(pattern => pattern.every(i => cells[i]===player));
                
            }
                function resetGame(){
                    cells = ["","","","","","","","",""];
                    currentPlayer="X";
                    gameActive = true;
                    statusText.innerText="X's Turn";
                    createBoard();
                }
                createBoard();
                
    
