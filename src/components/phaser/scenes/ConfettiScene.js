import Phaser from 'phaser';

export default class ConfettiScene extends Phaser.Scene {
  constructor() {
    super('ConfettiScene');
  }

  create() {
    const colors = [0xff6b6b, 0x1a73e8, 0x34c759, 0xffd700, 0xff9500, 0xa855f7];
    
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(0, 0, 10, 10);
    graphics.generateTexture('confetti-square', 10, 10);
    graphics.clear();
    
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(5, 5, 5);
    graphics.generateTexture('confetti-circle', 10, 10);
    graphics.destroy();

    const emitter = this.add.particles(this.cameras.main.centerX, 50, ['confetti-square', 'confetti-circle'], {
      lifespan: { min: 2000, max: 3000 },
      speed: { min: 200, max: 600 },
      angle: { min: 0, max: 360 },
      gravityY: 800,
      scale: { start: 1, end: 0.5 },
      alpha: { start: 1, end: 0 },
      rotate: { start: 0, end: 720 },
      tint: colors,
      emitting: false
    });

    emitter.explode(150);

    this.time.delayedCall(3500, () => {
      this.game.events.emit('confettiComplete');
    });
  }
}
