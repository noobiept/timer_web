/*
    Ideias:

        - do a stopwatch (count up and count down)
        - timer countdown
        - alarm clock

        - world clocks (around the world... be able to set -- see the current time there, with the summer/winter time too, maybe check an external website, or calculate it)

( new Date().toUTCString() )

        - count down tem uma entry para por o numero inicial, e dps quando acabar tem uma mensagem, e conta o tempo desde k ja acabou 

    to doo:

        - poder remover os relogios

        - gravar na localStorage os titulos/timers adicionados etc

 */

/// <reference path="stopwatch.ts" />
/// <reference path="count_down.ts" />


window.onload = function 
{
StopWatch.init();
CountDown.init();

new StopWatch();
new CountDown();
};