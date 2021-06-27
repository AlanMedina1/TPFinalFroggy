class Escena7 extends Phaser.Scene {
    constructor () {
        super('ayudatab');
    }
    create() {
        this.add.image(512,384, 'ayudatabsito');

        var gobackButton = this.add.image(770,550, 'Volver64').setScale(1.50)
        gobackButton.setInteractive()
        gobackButton.on('pointerdown', () => this.scene.start('inicio') && this.sound.play('volver'))
    }
}