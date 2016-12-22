var board;
var counter = 0;
var boardArray = [
[0, 0, 0, ],
[0, 0, 0, ],
[0, 0, 0, ]
];
var gameOver = false;
var scoreKeeper;

function setup() {
    createCanvas(500, 300);
    background(0);
    board = new Board();
    scoreKeeper = new ScoreKeeper();

}

function draw() {

    board.show();
    scoreKeeper.show();

    var currentTurn = (counter % 2) + 1;
    fill(0);
    noStroke();
    rect(350, 165, 120, 40);

    fill(255);
    if(currentTurn == 1)
        text("X\'s turn", 354, 200);
    else if (currentTurn == 2) 
    {
        text("O\'s turn", 354, 200);
    }

    

    //restart game logic
    if (board.checkWinner(1) == true || board.checkWinner(2) == true || board.checkFull() == true) {
        gameOver = true;
        scoreKeeper.showWinner(); 

        scoreKeeper.update();
        board.emptyBoard();

        textSize(10);
        text("Press any key to play again", 350, height - 20);
    }

    //reset game on any key press
    if (keyIsPressed === true && gameOver) {
        gameOver = false;
        background(0);
    }
}

function mouseReleased() {
    if (!gameOver) {
        if (mouseX < 300 && mouseX > 0 && mouseY < 300 && mouseY > 0) {
            if (mouseX < 100 && mouseY < 100) {
                if (boardArray[0][0] == 0)
                    boardArray[0][0] = board.dropPiece(50, 50);
            } else if (mouseX < 200 && mouseX > 100 && mouseY < 100) {
                if (boardArray[0][1] == 0)
                    boardArray[0][1] = board.dropPiece(150, 50);
            } else if (mouseX > 200 && mouseY < 100) {
                if (boardArray[0][2] == 0)
                    boardArray[0][2] = board.dropPiece(250, 50);
            } else if (mouseX > 200 && mouseY < 200 && mouseY > 100) {
                if (boardArray[1][2] == 0)
                    boardArray[1][2] = board.dropPiece(250, 150);
            } else if (mouseX > 200 && mouseY > 200) {
                if (boardArray[2][2] == 0)
                    boardArray[2][2] = board.dropPiece(250, 250);
            } else if (mouseX < 200 && mouseX > 100 && mouseY > 200) {
                if (boardArray[2][1] == 0)
                    boardArray[2][1] = board.dropPiece(150, 250);
            } else if (mouseX < 100 && mouseY > 200) {
                if (boardArray[2][0] == 0)
                    boardArray[2][0] = board.dropPiece(50, 250);
            } else if (mouseX < 100 && mouseY > 100 && mouseY < 200) {
                if (boardArray[1][0] == 0)
                    boardArray[1][0] = board.dropPiece(50, 150);
            } else if (mouseX > 100 && mouseX < 200 && mouseY > 100 && mouseY < 200) {
                if (boardArray[1][1] == 0)
                    boardArray[1][1] = board.dropPiece(150, 150);
            }
        }

    }
}

this.Board = function() {

    this.dropPiece = function(x, y) {
        if (counter % 2 == 0) {
            counter++;
            strokeWeight(3);
            stroke(0, 0, 255);
            line(x + 15, y + 15, x - 15, y - 15);
            line(x - 15, y + 15, x + 15, y - 15);
            return 1;
        } else {
            counter++;
            strokeWeight(3);
            noFill();
            stroke(255, 0, 0);
            ellipse(x, y, 40);
            return 2;
        }
    }

    this.checkWinner = function(piece) {
        //check for winner in all 8 possible combinations
        var i = 0;
        var j = 0;
        var returnValue = false;

        //horizontal win check
        if ((boardArray[i][j] == piece && boardArray[i][j + 1] == piece && boardArray[i][j + 2] == piece) ||
            (boardArray[i + 1][j] == piece && boardArray[i + 1][j + 1] == piece && boardArray[i + 1][j + 2] == piece) ||
            (boardArray[i + 2][j] == piece && boardArray[i + 2][j + 1] == piece && boardArray[i + 2][j + 2] == piece))
            returnValue = true;

        //vertical win check
        else if ((boardArray[i][j] == piece && boardArray[i + 1][j] == piece && boardArray[i + 2][j] == piece) ||
            (boardArray[i][j + 1] == piece && boardArray[i + 1][j + 1] == piece && boardArray[i + 2][j + 1] == piece) ||
            (boardArray[i][j + 2] == piece && boardArray[i + 1][j + 2] == piece && boardArray[i + 2][j + 2] == piece))
            returnValue = true;

        //diagonal "\" win check
        else if (boardArray[i][j] == piece && boardArray[i + 1][j + 1] == piece && boardArray[i + 2][j + 2] == piece)
            returnValue = true;

        //diagonal "/" win check
        else if (boardArray[i + 2][j] == piece && boardArray[i + 1][j + 1] == piece && boardArray[i][j + 2] == piece)
            returnValue = true;

        return returnValue;
    }

    this.whoWon = function() {
        if (this.checkWinner(1) == true) {
            return 1;
            //x is 1
        }
        else if (this.checkWinner(2) == true) {
            return 2;
            //o is 2
        }
    }


    this.checkFull = function() {
        for (var i = 0; i < boardArray.length; i++) {
            for (var j = 0; j < boardArray[i].length; j++) {
                if (boardArray[i][j] == 0) {
                    return false;
                }
            }
        }
        return true;
    }

    this.show = function() {
        strokeWeight(4);
        stroke(255);
        line(300, 100, 0, 100);
        line(300, 200, 0, 200);
        line(100, 300, 100, 0);
        line(200, 300, 200, 0);
    }

    this.emptyBoard = function() {
        for (var i = 0; i < boardArray.length; i++) {
            for (var j = 0; j < boardArray[i].length; j++) {
                boardArray[i][j] = 0;
            }
        }
    }
}

this.ScoreKeeper = function() {
    this.xWins = 0;
    this.oWins = 0;

    this.show = function() {
        textSize(32);
        stroke(1);
        fill(255);
        text("X Wins: " + this.xWins, 350, 45);
        text("O Wins: " + this.oWins, 348, 80);
    }

    //call update before resetting board
    this.update = function() {
        fill(0);
        stroke(0);
        rect(345, 18, 150, 90);

        if (board.checkWinner(1) == true) 
        {
            scoreKeeper.xWins += 1;
        }
        else if (board.checkWinner(2) == true) 
        {
            scoreKeeper.oWins += 1;
        }



        


        fill(255);
        text("X Wins: " + this.xWins, 350, 45);
        text("O Wins: " + this.oWins, 348, 80);
    }

    this.showWinner = function() {
       textSize(32);
       if (board.checkWinner(1) == true)
        text("X wins!", 354, 150);
    else if (board.checkWinner(2) == true) 
        text("O wins!", 354, 150);
    else
        text("Tie!", 354, 150);
}
}
