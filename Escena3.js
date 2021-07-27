class Escena3 extends Phaser.Scene {
    constructor() {
        super('nivel2');
    }

 create () {
    this.music = this.sound.add('nivel2')

    musicConfig ={
       mute: false,
       volume:0.5,
       rate: 1,
       detune: 0,
       seek: 0,
       loop: true,
       delay: 4.44
   }
   
   this.music.play(musicConfig);
  
 

//bordes del mundo
 bordes = this.physics.add.staticGroup();
 
 bordes.create(3, 640, 'bordes' );
 bordes.create(1021, 640, 'bordes');
 bordes.create(3, 1280, 'bordes' );
 bordes.create(1021, 1280, 'bordes');
 bordes.create(3, 1370, 'bordes' );
 bordes.create(1021, 1370, 'bordes');
 platforms = this.physics.add.staticGroup();
 
 
    //plataforma de los tiles
    //tilemaps

 var map = this.make.tilemap({ key: 'tilemap2' });
 
 var tileset1 = map.addTilesetImage('MapaNivel2', 'tilesfondo2');
 var tileset2 = map.addTilesetImage('plataformaextra','groundmain');
 var tileset3 = map.addTilesetImage('plataformanivel2juntas', 'groundniv2');
 
 layerfondo = map.createLayer('fondo', tileset1);
 layersuelo = map.createLayer('suelo', tileset2, 0, 0);
 layerplataforma2 = map.createLayer('platform1', tileset3, 0, 0);
// The player and its settings
player = this.physics.add.sprite(512, 1850, 'Froggy');

//  Player physics properties. Give the little guy a slight bounce.
player.setBounce(0.2);
player.setCollideWorldBounds(false);
player.setScale(0.25);

camarita= this.cameras.main;
this.cameras.main.setBounds(0, 0, 1024, 2080);
this.cameras.main.startFollow(player);

this.physics.add.collider(player, bordes);

// COLLIDERS
this.physics.add.collider(player, layersuelo);
this.physics.add.collider(player, layerplataforma2);
//this.physics.add.collider(player, layerplataforma2_1);

//COLISIONES
layersuelo.setCollisionByProperty({ collides: true})
layerplataforma2.setCollisionByProperty({ collides: true})
//layerplataforma2_1.setCollisionByProperty({ collides: true})

//time
time = this.physics.add.group({
    key: 'putiempo',
    repeat: Phaser.Math.FloatBetween(0,2),
    setXY: { x: 513, y: 1600, stepX: 150, stepY: 50 },
    setScale: { x: 0.2, y: 0.2},
})
//timed
time.children.iterate(function (child){
  child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.6));
  child.x += Phaser.Math.FloatBetween(-7, 7) 
  child.initialTime2= 10;
})

//life
life = this.physics.add.group({
    key: 'pulife',
    repeat: Phaser.Math.FloatBetween(0, 1),
    setXY: { x: 100, y: 1300, stepX: 400, stepY: 50 },
    setScale: { x: 0.3, y: 0.3},
})

//scorelife
life.children.iterate(function (child){
  child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
  child.x += Phaser.Math.FloatBetween(-7, 7) 
  child.score = 25;
})

//enemigo
/*araña = this.physics.add.group();
araña.create(100, 300, 'arañaenemy').setScale(0.4)
araña.create(200, 1030, 'arañaenemy'). setScale(0.4)
araña.create(350, 1000, 'arañaenemy'). setScale(0.4)
araña.create(350, 1000, 'arañaenemy'). setScale(0.4)
araña.create(900, 1000, 'arañaenemy'). setScale(0.4)
araña.create(800, 1000, 'arañaenemy'). setScale(0.4)*/

araña = this.physics.add.group({
    key: 'arañaenemy',
    repeat: Phaser.Math.FloatBetween(5,7),
    setXY:{ x: 200, y: 350,  stepX: 100, stepY: 200 },
    setScale: { x: 0.4, y: 0.4 },
});
araña.children.iterate(function (child){
    child.setBounce(Phaser.Math.FloatBetween(0.9, 1));
    child.x += Phaser.Math.FloatBetween(-7, 7) 
    araña.setVelocity(Phaser.Math.Between(5, 200),20)
   araña.allowGravity = true;
  })
 
//cambio de escena
froggycambioWin = this.physics.add.group({
  key: 'win',
  repeat: 0,
  setXY: { x: 512, y: 0 },
  setScale: { x: 2, y: 2},
  
});
//prueba de error froggylevel
froggycambioWin.children.iterate(function (child) {
  child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
  
});
// mosca recolectables!
recomosca = this.physics.add.group({
  key: 'mosca',
  repeat: Phaser.Math.FloatBetween(2,10),
  setXY: { x: 250, y: 350, stepX: 80, stepY: 50 },
  setScale: { x: 0.1, y: 0.1},
  
});

recomosca.children.iterate(function (child) {
  // moscas saltonas
  child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
  child.x += Phaser.Math.FloatBetween(-15, 15) 
  child.score = 10;

});






//  Input Events
if (cursors =! undefined){
    cursors = this.input.keyboard.createCursorKeys();
}



scoreText = this.add.text(16, 45, 'Puntaje: ', { fontSize: '32px', fill: '#56d467' });
scoreText.scrollFactorX = 0;
scoreText.scrollFactorY = 0;

score = 0;
gameOver2 = false;

lives = 3;
initialTime2 = 45

timedEvent2 = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
timeText2 = this.add.text(660, 16, '00', { fontSize: '32px', fill: '#56d467' });
timeText2.scrollFactorX = 0;
timeText2.scrollFactorY = 0; 

this.jumps = 0;

//Esto añade los colliders
this.physics.add.collider(recomosca, layerplataforma2);
this.physics.add.collider(araña, layerplataforma2);
this.physics.add.collider(araña, layerplataforma2, this.patrolPlatform, null, this);
this.physics.add.collider(araña, bordes); //esta funcion tiene agregado la patrol
this.physics.add.overlap(player, recomosca, this.Recolectarmosca, null, this);
this.physics.add.collider(life, layerplataforma2);
this.physics.add.overlap(player, life, this.collectLife, null, this);
this.physics.add.collider(player, araña, this.hitAraña, null, this);
this.physics.add.collider(time, layerplataforma2);
this.physics.add.overlap(player, time, this.collectTime, null, this);
this.physics.add.collider(froggycambioWin, layerplataforma2);
this.physics.add.overlap(player, froggycambioWin, this.cambiofroggywin, null, this);


//vidas

livesText = this.add.text(80, 16,  'Vidas: ' +lives, { font: '32px', fill: '#56d467' });
livesImage = this.add.image (45, 30, 'pulife').setScale(0.5);
livesText.scrollFactorX = 0;
livesText.scrollFactorY = 0;
livesImage.scrollFactorX = 0;
livesImage.scrollFactorY = 0;

}

collectTime (player, time)
{
  time.disableBody(true, true);
  initialTime2 +=time.initialTime2
  timeText2.setText('Tiempo Restante: ' + initialTime2);
  this.sound.play('tiempoextra')
}

collectLife (player, life)
{
  life.disableBody(true, true);
  lives += 1;
  livesText.setText('Vidas: ' +lives);
  score += life.score
 scoreText.setText('Puntaje: ' + score);
 this.sound.play('vidaextra')
}

Recolectarmosca (player, recomosca)
{
 recomosca.disableBody(true, true);
 score += recomosca.score
 scoreText.setText('Puntaje: ' + score);
 this.sound.play('moscatin')
}

update()
{
    camarita.centerOn(player.x,player.y);
    

    if (gameOver2)
    {       
        return
        
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.onFloor()){
        this.sound.play('Jump')
        player.setVelocityY(-330);
    }

}

cambiofroggywin (player, froggycambioWin)
    {
     this.music.stop(musicConfig); 
     this.sound.play('final')
     this.add.image(512,384, 'PantallaWin').setScale(1.10);
     if (froggycambioWin.disableBody(true, true)){
        var introjugbutton = this.add.image(650, 550, 'intercreditos').setScale(2.50);
        introjugbutton.setInteractive();
        introjugbutton.on('pointerdown',()=> this.scene.start('creditos') && this.sound.play('creditsbutton'));
        //this.scene.pause('juego').delay(0.3);
        //this.music.stop(musicConfig);
        timedEvent2.paused = true;
        this.physics.pause();
        var puntajefinal = this.add.text(0, 0, 'Score: ' + score,  { fontFamily: 'Trajan Pro', fontSize: 80, color: '#F59249' });
      Phaser.Display.Align.In.Center(puntajefinal, this.add.zone(500, 180, 1024, 768));
     }
    }

 //arañitas violentas
 hitAraña(player, araña) {
    lives -= 1;
        araña.disableBody(true, true);
        livesText.setText('Vidas: ' +lives);
        this.sound.play('arañadeath')
    if(lives == 0) {
         this.gameOver2()
    }
}

//patrullaje de arañas
/*patrolPlatform(araña, layerplataforma2){
   araña.setCollideWorldBounds(true);
   araña.setBounce(2);
   araña.setVelocity(Phaser.Math.Between(1, 200),20)
   araña.allowGravity = true;
   araña.children.iterate(function (child){
    child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
   
}
)}*/


gameOver2() {  
    gameOver2 = true;
    this.physics.pause();
    player.anims.play('death');
    this.music.stop(musicConfig); 

    this.music = this.sound.add('gameover')

    musicConfig ={
       mute: false,
       volume:0.5,
       rate: 1,
       detune: 0,
       seek: 0,
       loop: false,
       delay: 0
   }
   
   this.music.play(musicConfig);
   
    player.setTint(0xff0000);
    var gameOver2Button = this.add.text(700, 500, 'Game Over', { fontFamily: 'Arial', fontSize: 70, color: '#ff0000' })
    .setInteractive()
    .on('pointerdown', () => this.scene.start('gameoverver2'));
    Phaser.Display.Align.In.Center(gameOver2Button, this.add.zone(512, 384, 1024, 768));
    gameOver2Button.scrollFactorX = 0;
    gameOver2Button.scrollFactorY = 0;
}

onSecond() {
    if (! gameOver2)
    {   
        
        initialTime2 = initialTime2 - 1; // One second
        timeText2.setText('Tiempo Restante: ' + initialTime2);
        if (initialTime2 == 0) {
            timedEvent2.paused = true;
            this.gameOver2()
        }            
    }
}
}

