class Escena1 extends Phaser.Scene {
constructor () {
    super('inicio');
}

preload ()
{
    this.load.image ('boceto fondoprueba2', 'assets/Images/boceto fondoprueba2.png');
    this.load.image('bordes', 'assets/Images/bordes.png');
    this.load.image ('interConfig', 'assets/Images/interconfig.png');
    this.load.image ('intercreditos', 'assets/Images/intercredi.png');
    this.load.image ('credits', 'assets/Images/credits.png');
    this.load.image ('interjugar', 'assets/Images/interjugar.png');
    this.load.image ('Volver64', 'assets/Images/VOLVER64.png');
    this.load.image ('Reintentar64', 'assets/Images/REINTENTAR64.png');
    this.load.image ('ground', 'assets/Images/plataformanivel1.png')
    this.load.image ('groundmain', 'assets/Images/plataformaextra.png')
    this.load.image ('arañaenemy', 'assets/Images/arañaenemy.png');
    this.load.image ('pumosca', 'assets/Images/PUMOSCA.png')
    this.load.image ('pulife', 'assets/Images/PULIFE.png')
    this.load.image ('putiempo', 'assets/Images/PUTiempo.png')
    this.load.audio ('Jump', 'assets/Sounds/Jump.wav'); 
    this.load.audio ('nivel1', 'assets/Sounds/nivel1.wav');
    this.load.audio ('gameover', 'assets/Sounds/gameover.wav');
    this.load.audio ('introbutton', 'assets/Sounds/introbutton.wav'); 
    this.load.audio ('volver', 'assets/Sounds/Volver.wav');
    this.load.audio ('Reintentar', 'assets/Sounds/Reintentar.wav'); 
    this.load.audio ('creditsbutton', 'assets/Sounds/creditsbutton.wav'); 
    this.load.spritesheet('Froggy', 'assets/Images/Froggy.png', { frameWidth: 256, frameHeight: 256});
    //this.load.image('tilesplat', 'assets/Nivel1.png');
    //this.load.image('HONGO', 'assets/HONGO.png')
    this.load.image('tilesfondo', 'assets/fondo grande.png')
    this.load.tilemapTiledJSON('tilemap', 'assets/MapaNuevo.json')
}

create() {
    //  Our player animations, turning, walking left and walking right.
 this.anims.create({
  key: 'left',
  frames: this.anims.generateFrameNumbers('Froggy', { start: 0, end: 2 }),
  frameRate: 10,
  repeat: -1
 });

this.anims.create({
  key: 'turn',
  frames: [ { key: 'Froggy', frame: 3 } ],
  frameRate: 20
 });

this.anims.create({
  key: 'right',
  frames: this.anims.generateFrameNumbers('Froggy', { start: 4, end: 6 }),
  frameRate: 10,
  repeat: -1
 });

 

 /*this.anims.create({
  key: 'interjugar',
  frames: this.anims.generateFrameNumbers('interjugar', { start: 0, end: 1 }),
  frameRate: 20,
 })*/

 this.add.image(512,384, 'boceto fondoprueba2').setScale(1)

 var introjugbutton = this.add.image(512,300, 'interjugar').setScale(2.50)
 introjugbutton.setInteractive()
 introjugbutton.on('pointerdown',()=> this.scene.start('juego') && this.sound.play('introbutton'))

 var introjugbutton = this.add.image(690,200, 'intercreditos').setScale(3)
 introjugbutton.setInteractive()
 introjugbutton.on('pointerdown',()=> this.scene.start('creditos') && this.sound.play('creditsbutton'))

}


}