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
    });
}

// functions

function WhoIsCurrentPlayer(player1, player2)
{

    if(player1 == player2)
    {
        // x
        currentPlayer = x;
    }
    else
    {
        // o
        currentPlayer = o;
    }

    return currentPlayer;
}
