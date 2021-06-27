class Escena6 extends Phaser.Scene {
    constructor() {
        super('gameoverver2');
    }


    preload ()
    {
      this.load.image('deathfroggy', 'assets/Images/Death FroggyGO2.png');  
      this.load.image('fondodeath', 'assets/Images/fondodeath.png'); 
    }
    
    create() {

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

      this.add.image(512, 384, 'fondodeath').setScale(2)
      this.add.image(512, 384, 'deathfroggy').setScale(1)
      

      var puntajefinal = this.add.text(0, 0, 'Score: ' + score,  { fontFamily: 'GameBoy', fontSize: 80, color: '#F59249' });
      //scene.add.zone(x, y, width, height)
        // X Y del centro del rectangulo invisible
        // width, height del rectangulo invisible
      Phaser.Display.Align.In.Center(puntajefinal, this.add.zone(500, 100, 1024, 768));


      //CODIGO QUE FUNCIONA
      var restartButton = this.add.image(250, 200, 'Reintentar64').setScale(1.50)
      restartButton.setInteractive()
      restartButton.on('pointerdown', () => this.scene.start('nivel2') && this.sound.play('Reintentar'))

      var gobackButton = this.add.image(750, 200, 'Volver64').setScale(1.50)
      gobackButton.setInteractive()
      gobackButton.on('pointerdown', () => this.scene.start('inicio') && this.sound.play('volver'))
    }
}