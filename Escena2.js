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
 

 bordes = this.physics.add.staticGroup();
 
 bordes.create(3, 640, 'bordes' );
 bordes.create(1021, 640, 'bordes');
 bordes.create(3, 1280, 'bordes' );
 bordes.create(1021, 1280, 'bordes');
 
 //tilemaps

 var map = this.make.tilemap({ key: 'tilemap' });
 
 var tileset1 = map.addTilesetImage('fondo grande', 'tilesfondo');
 var tileset2 = map.addTilesetImage('plataformaextra','groundmain');
 var tileset3 = map.addTilesetImage( 'plataformanivel1', 'ground' );
 var tileset4 = map.addTilesetImage( 'plataforma1ver2', 'ground2');
 
 layerfondo = map.createLayer('Fondo', tileset1);
 layersuelo = map.createLayer('Suelo', tileset2, 0, 0);
 layerplataforma1 = map.createLayer('Plataformas', tileset3, 0, 0);
 layerplataforma1_2= map.createLayer('Plataformasverdes', tileset4, 0, 0);
 
 /*map.setCollisionBetween(0, 2000, true, layerplataforma1);
 map.setCollisionBetween(0, 2000, true, layersuelo);
 map.setCollisionBetween(0, 2000, true, layerplataforma1);*/

//layersuelo.setCollisionByProperty({layersuelo: true })

 /*layerplataforma1.setCollisionByExclusion([ -1 ])
 layersuelo.setCollisionByExclusion([ -1 ])
 layerplataforma1_2.setCollisionByExclusion([ -1 ])*/



  // The player and its settings
  player = this.physics.add.sprite(512, 1850, 'Froggy');

  //  Player physics properties. Give the little guy a slight bounce.
  player.setBounce(0.2);
  player.setCollideWorldBounds(false);
  player.setScale(0.25);

  camarita= this.cameras.main;
  this.cameras.main.setBounds(0, 0, 1024, 1920);
  this.cameras.main.startFollow(player);
  
  this.physics.add.collider(player, bordes);

// COLLIDERS
this.physics.add.collider(player, layersuelo);
this.physics.add.collider(player, layerplataforma1);
this.physics.add.collider(player, layerplataforma1_2);

//COLISIONES
layersuelo.setCollisionByProperty({ collides: true})
layerplataforma1.setCollisionByProperty({ collides: true})
layerplataforma1_2.setCollisionByProperty({ collides: true})

  //time
  time = this.physics.add.group({
    key: 'putiempo',
    repeat: Phaser.Math.FloatBetween(1,3),
    setXY: { x: 513, y: 1600, stepX: 150, stepY: 50 },
    setScale: { x: 0.2, y: 0.2},
})
  //timed
  time.children.iterate(function (child){
    child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.6));
    child.x += Phaser.Math.FloatBetween(-7, 7) 
    child.initialTime= 10;
 })

 //life
 life = this.physics.add.group({
    key: 'pulife',
    repeat: Phaser.Math.FloatBetween(1, 2),
    setXY: { x: 20, y: 1550, stepX: 400, stepY: 50 },
    setScale: { x: 0.3, y: 0.3},
})

 //scorelife
 life.children.iterate(function (child){
    child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
    child.x += Phaser.Math.FloatBetween(-7, 7) 
    child.score = 25;
 })

 //enemigo
 araña = this.physics.add.group({
    key: 'arañaenemy',
    repeat: 1,
    setXY: { x: 400, y: 200, stepX: 200, stepY: 200 },
    setScale: { x: 0.50, y: 0.50},
});

 //cambio de escena
 froggycambio = this.physics.add.group({
    key: 'froggylevel',
    repeat: 0,
    setXY: { x: 512, y: 0 },
    setScale: { x: 2, y: 2},
    
 });
  //prueba de error froggylevel
  froggycambio.children.iterate(function (child) {
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
  gameOver = false;

  lives = 3;
  initialTime = 45

  timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
  timeText = this.add.text(660, 16, '00', { fontSize: '32px', fill: '#56d467' });
  timeText.scrollFactorX = 0;
  timeText.scrollFactorY = 0; 

  this.jumps = 0;

  //Esto añade los colliders
  
  this.physics.add.collider(recomosca, layerplataforma1);
  this.physics.add.collider(recomosca, layerplataforma1_2);
  this.physics.add.collider(araña, layerplataforma1);
  this.physics.add.collider(araña, layerplataforma1_2);
  this.physics.add.collider(araña, platforms, this.patrolPlatform, null, this);
  this.physics.add.collider(araña, bordes); //esta funcion tiene agregado la patrol
  this.physics.add.overlap(player, recomosca, this.Recolectarmosca, null, this);
  this.physics.add.collider(life, layerplataforma1);
  this.physics.add.collider(life, layerplataforma1_2);
  this.physics.add.overlap(player, life, this.collectLife, null, this);
  this.physics.add.collider(player, araña, this.hitAraña, null, this);
  this.physics.add.collider(time, layerplataforma1);
  this.physics.add.collider(time, layerplataforma1_2);
  this.physics.add.collider(time, layersuelo);
  this.physics.add.overlap(player, time, this.collectTime, null, this);
  this.physics.add.collider(froggycambio, layerplataforma1 );
  this.physics.add.overlap(player, froggycambio, this.cambiofroggy, null, this);


  
  
  
  //vidas
 
 livesText = this.add.text(80, 16,  'Vidas: ' +lives, { font: '32px', fill: '#56d467' });
 livesImage = this.add.image (45, 30, 'pulife').setScale(0.5);
 //lifeLostText = this.add.text(20, 20, 'Life lost', { font: '32px', fill: '#56d467' });
 //lifeLostText.visible = false;
 livesText.scrollFactorX = 0;
 livesText.scrollFactorY = 0;
 livesImage.scrollFactorX = 0;
 livesImage.scrollFactorY = 0;

}

collectTime (player, time)
{
    time.disableBody(true, true);
    initialTime +=time.initialTime
    timeText.setText('Tiempo Restante: ' + initialTime);
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

    if (cursors.up.isDown && player.body.onFloor()){

        this.sound.play('Jump')
        player.setVelocityY(-330);
    }
 }
 //esto llevaría a la escena 3 = Nivel 2, pero anula la pantalla de gameover ERROR
 
 cambiofroggy (player, froggycambio)
    {
        this.sound.play('transicionlevel')
     this.add.image(512,384, 'transicion').setScale(1);
     if (froggycambio.disableBody(true, true)){
        var introjugbutton = this.add.image(500, 320, 'interjugar').setScale(2.50);
        introjugbutton.setInteractive();
        introjugbutton.on('pointerdown',()=> this.scene.start('nivel2') && this.sound.play('introbutton'));
        //this.scene.pause('juego').delay(0.3);
        this.music.stop(musicConfig);
        timedEvent.paused = true;
        this.physics.pause();
     }
    }
    
    
 //arañitas violentas
 hitAraña(player, araña) {
     lives -= 1;
         araña.disableBody(true, true);
         livesText.setText('Vidas: ' +lives);
         this.sound.play('arañadeath')
     if(lives == 0) {
          this.gameOver()
     }
}

 gameOver() {  
        gameOver = true;

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

