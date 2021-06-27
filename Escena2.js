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
    


 var map = this.make.tilemap({ key: 'tilemap' });
 
 var tileset1 = map.addTilesetImage('fondo grande', 'tilesfondo');

 layerfondo = map.createLayer('Fondo', tileset1)
 

 bordes = this.physics.add.staticGroup();
 
 bordes.create(3, 640, 'bordes' );
 bordes.create(1021, 640, 'bordes');
 bordes.create(3, 1280, 'bordes' );
 bordes.create(1021, 1280, 'bordes');
 platforms = this.physics.add.staticGroup();
 
 
    platforms.create(513, 1980, 'groundmain').setScale(4.60).refreshBody();

    platforms.create(513, 100, 'ground'); // plat alta medio pu
    platforms.create(50, 250, 'ground2'); // plat izq alta anteulti
    platforms.create(920, 220, 'ground'); //plataforma a la derecha medioalta más alta
    platforms.create(110, 450, 'ground2'); //plataforma izquierda alta tercera
    platforms.create(450, 500, 'ground'); //plataforma en el medio sexta
    platforms.create(50, 1020, 'ground2'); // segunda plataforma izquierda baja
    platforms.create(800, 650, 'ground'); // quinta plataforma hacia la derecha
    platforms.create(550, 1100, 'ground2'); // plat derecha anteulti 
    platforms.create(50, 810, 'ground'); //plat izquierda segunda
    platforms.create(400, 740, 'ground2'); //plataforma en medio bajo
    platforms.create(800, 1000, 'ground'); //bajo derecha
    platforms.create(450, 950, 'ground2'); // plat derecha anteulti 
    platforms.create(150, 610, 'ground'); //plat izquierda segunda
    platforms.create(600, 300, 'ground2'); //arriba medio sexto
    platforms.create(80, 1720, 'ground'); // plat izq baja
    platforms.create(1020, 1720, 'ground2'); //plat derecha baja
    platforms.create(15, 1500, 'ground'); //izq baja 2
    platforms.create(350, 1400, 'ground2'); // medio izq
    platforms.create(700, 1400, 'ground'); // medio der
    platforms.create(550, 1670, 'ground2'); // plat baja medio
    platforms.create(1030, 1500, 'ground'); // plat derecha 2
    platforms.create(210, 1200, 'ground2'); // plat medio izquierda medioalt
    platforms.create(830, 480, 'ground'); //plat derecha 


  // The player and its settings
  player = this.physics.add.sprite(512, 1850, 'Froggy');

  //  Player physics properties. Give the little guy a slight bounce.
  player.setBounce(0.2);
  player.setCollideWorldBounds(false);
  player.setScale(0.3);

  camarita= this.cameras.main;
  this.cameras.main.setBounds(0, 0, 1024, 1920);
  this.cameras.main.startFollow(player);
  
  this.physics.add.collider(player, bordes);


  //time
  time = this.physics.add.group();
  time.create(513, 1580, 'putiempo').setScale(0.2)

  //timed
  time.children.iterate(function (child){
    child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.6));
    child.x += Phaser.Math.FloatBetween(-7, 7) 
    child.initialTime= 10;
 })

 //life
 life = this.physics.add.group();
 life.create(15,1550, 'pulife').setScale(0.3)

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
 araña.create(350, 1000, 'arañaenemy'). setScale(0.4)*/
 

 //otro codigo enemigo
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
    repeat: 10,
    setXY: { x: 250, y: 100, stepX: 120, stepY: 50 },
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
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(recomosca, platforms);
  this.physics.add.collider(araña, platforms);
  this.physics.add.collider(araña, platforms, this.patrolPlatform, null, this);
  this.physics.add.collider(araña, bordes); //esta funcion tiene agregado la patrol
  this.physics.add.overlap(player, recomosca, this.Recolectarmosca, null, this);
  this.physics.add.collider(life, platforms);
  this.physics.add.overlap(player, life, this.collectLife, null, this);
  this.physics.add.collider(player, araña, this.hitAraña, null, this);
  this.physics.add.collider(time, platforms);
  this.physics.add.overlap(player, time, this.collectTime, null, this);
  this.physics.add.collider(froggycambio, platforms);
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

    if (cursors.up.isDown && player.body.touching.down){
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

//patrullaje de arañas
patrolPlatform(araña, platforms){
    araña.setCollideWorldBounds(false);
    araña.setBounce(0.7);
    araña.setVelocity(Phaser.Math.Between(-200, 200),20)
    araña.allowGravity = true;
    if (araña.body.velocity.x > 0 && araña.right > platforms.right) {
        araña.body.velocity,x *= -1; //direccion reversa
    }
    else if (araña.body.velocity.x < 0 && araña.left< platforms.left) {
        araña.body.velocity.x *= -1;
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

