    'use strict'

    let x = document.querySelector(".x");
    let o = document.querySelector(".o");
    let boxes = document.querySelectorAll(".box");
    let buttons = document.querySelectorAll("#btn-container button");
    let messageContainer = document.querySelector("#message");
    let messageText = document.querySelector("#message p");
    let secondPlayer;

    // move counter

    let player1 = 0;
    let player2 = 0;

    // click box event

    for (let i = 0; i < boxes.length; i++) 
    {
        // event: user clicks on box
        boxes[i].addEventListener("click", function()
        {

            let currentPlayer = WhoIsCurrentPlayer(player1, player2);

            // checking if there have already been moves

            if(this.childNodes.length == 0)
            {
                let cloneCurrentPlayer = currentPlayer.cloneNode(true);

                this.appendChild(cloneCurrentPlayer);

                // compute play

                if(player1 == player2)
                {
                    player1++;

                    if(secondPlayer === "ai-player")
                    {
                        // function that runs the ai ​​game
                        ComputerPlay();

                        player2++;
                    }

                }
                else
                {
                    player2++;
                }
            }

            // check who won

            CheckWinCondition();
        });
    }

    // event: two players or ia

    for(let button of buttons)
    {
        button.addEventListener("click", function()
        {
            // identify "id" if there are two players or ia

            secondPlayer = this.getAttribute("id");

            // clear buttons

            for(let button of buttons)
            {
                button.style.display = "none";
            }

            // enable board visibility

            setTimeout(function()
            {
                let container = document.querySelector("#container");

                container.classList.remove("hide");
            }, 200);
            
        });
    }


    // functions

    function WhoIsCurrentPlayer(player1, player2)
    {
        let currentPlayerIs;

        if(player1 == player2)
        {
            // x
            currentPlayerIs = x;
        }
        else
        {
            // o
            currentPlayerIs = o;
        }

        return currentPlayerIs;
    }

    // did anyone win?

    function CheckWinCondition()
    {

        // all blocks

        const blocks = Array.from
        (
            { 
                length: 9 
            }, 
            (_, i) => document.getElementById(`block-${i + 1}`)
        );

        // define winning combinations

        const winConditions = 
        [
            [0, 1, 2], // row 1
            [3, 4, 5], // row 2
            [6, 7, 8], // row 3
            [0, 3, 6], // column 1
            [1, 4, 7], // column 2
            [2, 5, 8], // column 3
            [0, 4, 8], // main diagonal
            [2, 4, 6], // secondary diagonal
        ];

        // iterate through each winning condition

        for (let condition of winConditions) 
        {
            
            const [a, b, c] = condition;

            // check if all three blocks are filled

            if 
            (
                blocks[a].childNodes.length > 0 &&
                blocks[b].childNodes.length > 0 &&
                blocks[c].childNodes.length > 0
            ) 
            {
                const aChild = blocks[a].childNodes[0].className;
                const bChild = blocks[b].childNodes[0].className;
                const cChild = blocks[c].childNodes[0].className;

                // check if all have the same class ('x' or 'o')

                if (aChild === bChild && bChild === cChild) 
                {
                    DeclareWinner(aChild);

                    return; // exit function as we have a winner
                }
            }
        }

        // check for a tie (velha)

        let isTie = true; // assume it's a tie unless proven otherwise

        for (let block of blocks) 
        {
            if (block.childNodes.length === 0) 
            {
                isTie = false; // found an empty block, not a tie

                break;
            }
        }
    
        if (isTie) 
        {
            DeclareWinner(); // no winner, game ends in a tie
        }
    }

    // clears the game, declares the winner and clears the scoreboard

    function DeclareWinner(winningPlayer)
    {
        let xScoreboard = document.querySelector("#scoreboard1");
        let oScoreboard = document.querySelector("#scoreboard2");
        let message = "";

        if(winningPlayer == 'x')
        {
            xScoreboard.textContent = parseInt(xScoreboard.textContent) + 1;
            message = "O jogador X Venceu!";
        }
        else if(winningPlayer == 'o')
        {
            oScoreboard.textContent = parseInt(oScoreboard.textContent) + 1;
            message = "O jogador O Venceu!";
        }
        else
        {
            message = "Deu Velha!";
        }

        // show message

        messageText.innerHTML = message;
        messageContainer.classList.remove("hide");

        // hide message

        setTimeout(function() 
        {
            messageContainer.classList.add("hide");
        }, 3000);

        // reset moves

        player1 = 0;
        player2 = 0;

        // clears the game

        let boxesToRemove = document.querySelectorAll(".box div");

        for(let box of boxesToRemove)
        {
            box.parentNode.removeChild(box);
        }
    }

    // ai play

    function ComputerPlay() 
    {
        // clone the "o" element to represent the computer's move

        let oClone = o.cloneNode(true);

        // counter tracks if the computer successfully made a move

        let counter = 0;

        // filled tracks how many boxes are already occupied

        let filled = 0;

        // iterate through each box

        for (let box of boxes) 
        {
            // generate a random number between 0 and 4

            let randomNumber = Math.floor(Math.random() * 5);

            // check if the box is empty

            if (box.childNodes[0] == undefined) 
            {
                // decide randomly if the computer will place "o" in this box
                if (randomNumber <= 1) // 40% chance
                { 
                    box.appendChild(oClone); // place "o" in the box
                    counter++; // mark that a move was made

                    break; // exit the loop after making a move
                } 
                else 
                {
                    // count this box as skipped
                    
                    filled++;
                }
            }
        }

        // check if no move was made, and there are still empty boxes

        if (counter == 0 && filled < 9) 
        {
            ComputerPlay(); // recursively call the function to try again
        }
    }

        

