class Escena2 extends Phaser.Scene {
constructor() {
    super('juego');
}

create() {

 const map = this.make.tilemap({ key: 'tilemap'})

 const tileset1 = map.addTilesetImage('fondo grande', 'tilesfondo')

 const tileset2 = map.addTilesetImage('Nivel1','tilesplat')

 const tileset3 = map.addTilesetImage('HONGO','HONGO')

 map.createLayer('Fondo', tileset1)
 map.createLayer('Suelo', tileset2)
 map.createLayer('Plataformas', tileset2)
 map.createLayer('honguito', tileset3)

  // The player and its settings
  player = this.physics.add.sprite(100, 450, 'Froggy');

  //  Player physics properties. Give the little guy a slight bounce.
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.setScale(1);

  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.cameras.main.startFollow(player);
  //  Input Events
  if (cursors =! undefined){
      cursors = this.input.keyboard.createCursorKeys();
  }

  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  score = 0;
  gameOver = false;

  initialTime = 60

  timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
  timeText = this.add.text(500, 16, '00', { fontSize: '32px', fill: '#000' });

  this.jumps = 0;

}


update()
{

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

        player.setTint(0xff0000);

        player.anims.play('turn');        

        var gameOverButton = this.add.text(700, 500, 'Game Over', { fontFamily: 'Arial', fontSize: 70, color: '#ff0000' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('gameover'));
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600));
    }

   onSecond() {
        if (! gameOver)
        {       
            initialTime = initialTime - 1; // One second
            timeText.setText('Countdown: ' + initialTime);
            if (initialTime == 0) {
                timedEvent.paused = true;
                this.gameOver()
            }            
        }
    }
}