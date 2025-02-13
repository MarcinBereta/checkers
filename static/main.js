var net;
var ui;
var game;
var player;
console.log("wczytano maina")
$(document).ready(function () {
    $("#wait").css("display", "none")
    console.log($("#wait").css("display"))
    net = new Net() // utworzenie obiektu klasy Net
    ui = new Ui() // utworzenie obiektu klasy Ui
    game = new Game();
    
    game.robkostki();

})