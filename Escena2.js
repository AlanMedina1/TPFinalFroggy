class Escena2 extends Phaser.Scene {
constructor() {
    super('juego');
}

create() {
   
    this.music = this.sound.add('nivel1')

     musicConfig ={
        mute: false,
        volume:0.5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 4.40
    }
    
    this.music.play(musicConfig);
    
    
    
 /*const map = this.make.tilemap({ key: 'tilemap'})

 const tileset1 = map.addTilesetImage('fondo grande', 'tilesfondo')

 const tileset2 = map.addTilesetImage('Nivel1','tilesplat')

 const tileset3 = map.addTilesetImage('HONGO','HONGO')

 /*const ground = map.createLayer('Plataformas', tileset2)
 ground.setCollisionByProperty({ collides: true})
 this.matter.World.converTilemapLayer(ground)


 map.createLayer('Fondo', tileset1)
 map.createLayer('Suelo', tileset2)
 map.createLayer('Plataformas', tileset2)
 map.createLayer('honguito', tileset3)*/

 //this.physics.add.collider(this.player, tileset2)
 //tileset2.setCollisionBetween(2,3);
 var map = this.make.tilemap({ key: 'tilemap' });
 
 var tileset1 = map.addTilesetImage('fondo grande', 'tilesfondo');

 layerfondo = map.createLayer('Fondo', tileset1)
 
 /*const map = this.make.tilemap ({ key: 'tilemap'});
 const tileset = map.addTilesetImage('mapa1', 'tilesfondo');
 const fondolayer = map.createLayer('fondo', tileset, 0, 0);
 const platformlayer = map.createLayer('ground', tileset, 0, 0);
 const hongolayer = map.createLayer('hongo', tileset, 0, 0);

 platformlayer.setCollisionBetween(989,1055);
 this.physics.add.collider(this.player,platformlayer)*/
 bordes = this.physics.add.staticGroup();
 
 bordes.create(3, 640, 'bordes' );
 bordes.create(1021, 640, 'bordes');

 platforms = this.physics.add.staticGroup();
 
 
    platforms.create(513, 1320, 'groundmain').setScale(4.60).refreshBody();

    platforms.create(513, 100, 'ground'); // plat alta medio pu
    platforms.create(50, 250, 'ground'); // plat izq alta anteulti
    platforms.create(920, 220, 'ground'); //plataforma a la derecha medioalta más alta
    platforms.create(110, 450, 'ground'); //plataforma izquierda alta tercera
    platforms.create(450, 500, 'ground'); //plataforma en el medio sexta
    platforms.create(50, 1020, 'ground'); // segunda plataforma izquierda baja
    platforms.create(800, 650, 'ground'); // quinta plataforma hacia la derecha
    platforms.create(550, 1100, 'ground'); // plat derecha anteulti 
    platforms.create(50, 810, 'ground'); //plat izquierda segunda
    platforms.create(400, 740, 'ground'); //plataforma en medio bajo
    platforms.create(800, 1000, 'ground'); //bajo derecha
    platforms.create(450, 950, 'ground'); // plat derecha anteulti 
    platforms.create(150, 610, 'ground'); //plat izquierda segunda
    platforms.create(600, 300, 'ground'); //arriba medio sexto

  // The player and its settings
  player = this.physics.add.sprite(512, 1200, 'Froggy');

  //  Player physics properties. Give the little guy a slight bounce.
  player.setBounce(0.2);
  player.setCollideWorldBounds(false);
  player.setScale(0.3);

  camarita= this.cameras.main;
  this.cameras.main.setBounds(0, 0, 1024, 1280);
  this.cameras.main.startFollow(player);
  
  this.physics.add.collider(player, bordes);
  
  //  Input Events
  if (cursors =! undefined){
      cursors = this.input.keyboard.createCursorKeys();
  }

  

  scoreText = this.add.text(16, 45, 'Puntaje: 0', { fontSize: '32px', fill: '#56d467' });
  scoreText.scrollFactorX = 0;
  scoreText.scrollFactorY = 0;

  score = 0;
  gameOver = false;

  initialTime = 60

  timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
  timeText = this.add.text(660, 16, '00', { fontSize: '32px', fill: '#56d467' });
  timeText.scrollFactorX = 0;
  timeText.scrollFactorY = 0; 

  this.jumps = 0;

  //Esto añade los colliders
  this.physics.add.collider(player, platforms);

  //vidas
 
 livesText = this.add.text(80, 16,  'Vidas: ' +lives, { font: '32px', fill: '#56d467' });
 livesImage = this.add.image (45, 30, 'pulife').setScale(0.5);
 lifeLostText = this.add.text(20, 20, 'Life lost', { font: '32px', fill: '#56d467' });
 lifeLostText.visible = false;
 livesText.scrollFactorX = 0;
 livesText.scrollFactorY = 0;
 livesImage.scrollFactorX = 0;
 livesImage.scrollFactorY = 0;
 

}


update()
{
    camarita.centerOn(player.x,player.y);
    

    if (gameOver)
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

    if (cursors.up.isDown && player.body.touching.down){
        this.sound.play('Jump')
        player.setVelocityY(-330);
    }

   
        
    
}

 gameOver() {  
        gameOver = true;
        this.physics.pause();

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

        player.anims.play('turn');        

        var gameOverButton = this.add.text(700, 500, 'Game Over', { fontFamily: 'Arial', fontSize: 70, color: '#ff0000' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('gameover'));
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(512, 384, 1024, 768));
        gameOverButton.scrollFactorX = 0;
        gameOverButton.scrollFactorY = 0;
    }

   onSecond() {
        if (! gameOver)
        {   
             
            initialTime = initialTime - 1; // One second
            timeText.setText('Tiempo Restante: ' + initialTime);
            if (initialTime == 0) {
                timedEvent.paused = true;
                this.gameOver()
            }            
        }
    }
}