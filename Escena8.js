class Escena8 extends Phaser.Scene {
    constructor () {
        super('intro');
    }
    create() {
        this.add.image(512,384, 'intro');

        var gobackButton = this.add.image(770,550, 'interjugar').setScale(1.50)
        gobackButton.setInteractive()
        gobackButton.on('pointerdown', () => this.scene.start('juego') && this.sound.play('introbutton'))
    }
}