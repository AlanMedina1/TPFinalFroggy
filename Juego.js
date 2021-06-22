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

var camarita;
var bordes;

var lives = 3;
var livesText;
var lifeLostText;
var livesImage;

var score;
var scoreText;
var gameOver;


var player;
var platforms;
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

var layerfondo;
var layersuelo;
var layerplataforma;
var layerhongo;
var map;

var musicConfig;


