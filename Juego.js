var config = {
    
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 240 },
            debug: true
        }
    },
    scene: [Escena1, Escena2, Escena3, Escena4, Escena5]
};

var game = new Phaser.Game(config);

var score;
var scoreText;
var gameOver;

var player;
var platform;
var araña;


var cursors;
var pulife;
var pumosca;
var putime;
var nenufar;
var platformsjump;

var level = 0

var timedEvent;
var initialTime;
var timeText;