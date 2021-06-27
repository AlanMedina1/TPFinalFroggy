class Escena1 extends Phaser.Scene {
constructor () {
    super('inicio');
}

preload ()
{
    this.load.image('ayudatabsito', 'assets/Images/ayudatabsito.png')
    this.load.image('transicion', 'assets/Images/transiciónlevel.png') 
    this.load.image('win', 'assets/Images/winreco.png') 
    this.load.image('froggylevel', 'assets/Images/froggylevel.png')  
    this.load.image ('boceto fondoprueba2', 'assets/Images/boceto fondoprueba2.png');
    this.load.image('bordes', 'assets/Images/bordes.png');
    this.load.image ('ayuda', 'assets/Images/AYUDATAB.png');
    this.load.image ('interConfig', 'assets/Images/interconfig.png');
    this.load.image ('intercreditos', 'assets/Images/intercredi.png');
    this.load.image ('credits', 'assets/Images/credits.png');
    this.load.image ('interjugar', 'assets/Images/interjugar.png');
    this.load.image ('Volver64', 'assets/Images/VOLVER64.png');
    this.load.image ('Reintentar64', 'assets/Images/REINTENTAR64.png');
    this.load.image ('ground', 'assets/Images/plataformanivel1.png')
    this.load.image ('ground2', 'assets/Images/plataforma1ver2.png')
    this.load.image ('groundmain', 'assets/Images/plataformaextra.png')
    this.load.image ('groundniv2', 'assets/Images/plataformanivel2.png')
    this.load.image ('groundniv2.1', 'assets/Images/plataforma2ver2.png')
    this.load.image ('arañaenemy', 'assets/Images/arañaenemy.png');
    this.load.image ('mosca', 'assets/Images/PUMOSCA.png'), { frameWidth: 256, frameHeight: 256}
    this.load.image ('pulife', 'assets/Images/PULIFE.png')
    this.load.image ('putiempo', 'assets/Images/PUTiempo.png')
    this.load.image('PantallaWin', 'assets/Images/WinScreen.png')
    this.load.audio ('final', 'assets/Sounds/final.wav');
    this.load.audio ('transicionlevel', 'assets/Sounds/transicion.wav'); 
    this.load.audio ('Jump', 'assets/Sounds/Jump.wav'); 
    this.load.audio ('ayudabutton', 'assets/Sounds/ayuda.wav');
    this.load.audio ('nivel1', 'assets/Sounds/nivel1.wav');
    this.load.audio ('nivel2', 'assets/Sounds/nivel2.wav');
    this.load.audio ('gameover', 'assets/Sounds/gameover.wav');
    this.load.audio ('introbutton', 'assets/Sounds/introbutton.wav'); 
    this.load.audio ('arañadeath', 'assets/Sounds/arañadeath.wav'); 
    this.load.audio ('moscatin', 'assets/Sounds/moscatin.wav'); 
    this.load.audio ('vidaextra', 'assets/Sounds/vidaextra.wav');
    this.load.audio ('volver', 'assets/Sounds/Volver.wav');
    this.load.audio ('Reintentar', 'assets/Sounds/Reintentar.wav'); 
    this.load.audio ('creditsbutton', 'assets/Sounds/creditsbutton.wav'); 
    this.load.audio ('tiempoextra', 'assets/Sounds/tiempoextra.wav'); 
    this.load.spritesheet('Froggy', 'assets/Images/Froggy.png', { frameWidth: 256, frameHeight: 256});
    //this.load.image('tilesplat', 'assets/Nivel1.png');
    //this.load.image('HONGO', 'assets/HONGO.png')
    this.load.image('tilesfondo', 'assets/fondo grande.png')
    this.load.tilemapTiledJSON('tilemap', 'assets/MapaActualizado.json')
    this.load.image('tilesfondo2', 'assets/nivel 2/MapaNivel2.png')
    this.load.tilemapTiledJSON('tilemap2', 'assets/nivel 2/Tilemap2.json')
}

create() {
    //  Our player animations, turning, walking left and walking right.
 this.anims.create({
  key: 'left',
  frames: this.anims.generateFrameNumbers('Froggy', { start: 1, end: 3 }),
  frameRate: 10,
  repeat: -1
 });

 this.anims.create({
  key: 'turn',
  frames: [ { key: 'Froggy', frame: 4 } ],
  frameRate: 20
 });

 this.anims.create({
  key: 'right',
  frames: this.anims.generateFrameNumbers('Froggy', { start: 5, end: 7 }),
  frameRate: 10,
  repeat: -1
 });

 this.anims.create({
    key: 'death',
    frames: [ { key: 'Froggy', frame: 0 } ],
    frameRate: 20
   })


 

 /*this.anims.create({
  key: 'interjugar',
  frames: this.anims.generateFrameNumbers('interjugar', { start: 0, end: 1 }),
  frameRate: 20,
 })*/

 this.add.image(512,384, 'boceto fondoprueba2').setScale(1)

 var introjugbutton = this.add.image(512,300, 'interjugar').setScale(2.50)
 introjugbutton.setInteractive()
 introjugbutton.on('pointerdown',()=> this.scene.start('juego') && this.sound.play('introbutton')) /// CAMBIAR A NIVEL JUEGO DESPUÉS

 var introjugbutton = this.add.image(690,200, 'intercreditos').setScale(3)
 introjugbutton.setInteractive()
 introjugbutton.on('pointerdown',()=> this.scene.start('creditos') && this.sound.play('creditsbutton'))

 var introjugbutton = this.add.image(330,200, 'ayuda').setScale(2.90)
 introjugbutton.setInteractive()
 introjugbutton.on('pointerdown',()=> this.scene.start('ayudatab') && this.sound.play('ayudabutton'))
}


}