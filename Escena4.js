class Escena4 extends Phaser.Scene {
    constructor() {
        super('creditos');
    }

    create() {
        this.add.image(512,384, 'credits');

        var gobackButton = this.add.image(680,550, 'Volver64').setScale(1.50)
        gobackButton.setInteractive()
        gobackButton.on('pointerdown', () => this.scene.start('inicio') && this.sound.play('volver'))
    }

}