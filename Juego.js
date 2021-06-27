
var config = {
    
    type: Phaser.AUTO,
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.NO_CENTER,
        width: 1024,
        height: 768,
    },
    
    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 220 },
            debug: true
        }
    },
    scene: [Escena1, Escena2, Escena3, Escena4, Escena5, Escena6, Escena7, Escena8]
};

var game = new Phaser.Game(config);

var camarita;
var bordes;

var froggycambio;

var froggycambioWin;

var lives;
var livesText;
var lifeLostText;
var livesImage;

var score;
var scoreText;
var gameOver;

var gameOver2;

var player;
var platforms;
var araña;
var xCoordinate;

var cursors;
var life;
var recomosca;
var time;
var nenufar;
var platformsjump;

var level = 0

var timedEvent;
var initialTime;
var timeText;

var timedEvent2;
var initialTime2;
var timeText2;

var layerfondo;
var layersuelo;
var layerplataforma;
var map;

var musicConfig;


