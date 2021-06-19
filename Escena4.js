class Escena3 extends Phaser.Scene {
    constructor() {
        super('creditos');
    }

    create() {
        this.add.image(512,384, 'credits');

        var gobackButton = this.add.image(680,550, 'Volver64').setScale(1.50) //text(680, 550, 'Atras', {fontFamily: 'Arial', fontSize: 20, color: '#000000'})
        gobackButton.setInteractive()
        gobackButton.on('pointerdown', () => this.scene.start('inicio'))
    }

}