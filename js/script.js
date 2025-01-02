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
                console.log(`${aChild} won`);

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
        console.log("deu velha"); // no winner, game ends in a tie
    }
}
    

