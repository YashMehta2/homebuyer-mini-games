import Phaser from 'phaser';

export default class HouseScene extends Phaser.Scene {
  constructor() {
    super('HouseScene');
  }

  create(data) {
    this.completedGames = data.completedGames || { bidBattle: false, rateRoulette: false, stackTheClose: false };
    
    this.sky = this.add.graphics();
    this.drawSky();

    this.clouds = [];
    for (let i = 0; i < 3; i++) {
      const cloud = this.add.graphics();
      cloud.fillStyle(0xffffff, 0.8);
      cloud.fillEllipse(0, 0, 60, 20);
      cloud.fillEllipse(15, -10, 40, 25);
      cloud.fillEllipse(-15, -5, 30, 20);
      cloud.x = Phaser.Math.Between(0, this.scale.width);
      cloud.y = Phaser.Math.Between(20, 80);
      this.clouds.push({ g: cloud, speed: Phaser.Math.FloatBetween(0.2, 0.5) });
    }

    this.road = this.add.graphics();
    
    const houseData = [
      { color: 0x4f46e5, roof: 0x312e81, key: 'bidBattle' },
      { color: 0x10b981, roof: 0x065f46, key: 'rateRoulette' },
      { color: 0xf59e0b, roof: 0x92400e, key: 'stackTheClose' }
    ];

    const spacing = Math.min(200, this.scale.width / 4);
    const startX = (this.scale.width - (spacing * 2)) / 2;

    houseData.forEach((hd, i) => {
      const hx = startX + i * spacing;
      const hy = 150;
      
      const hGraphics = this.add.graphics();
      
      hGraphics.fillStyle(hd.color, 1);
      hGraphics.fillRect(hx - 30, hy - 40, 60, 40);
      
      hGraphics.fillStyle(hd.roof, 1);
      hGraphics.fillTriangle(hx - 40, hy - 40, hx + 40, hy - 40, hx, hy - 70);
      
      hGraphics.fillStyle(0xffffff, 0.8);
      hGraphics.fillRect(hx - 10, hy - 20, 20, 20);

      // Trees
      hGraphics.fillStyle(0x8b4513, 1);
      hGraphics.fillRect(hx + 35, hy - 15, 6, 15);
      hGraphics.fillStyle(0x22c55e, 1);
      hGraphics.fillCircle(hx + 38, hy - 25, 12);

      if (this.completedGames[hd.key]) {
        const soldBg = this.add.graphics();
        soldBg.fillStyle(0xef4444, 1);
        soldBg.fillRoundedRect(hx - 25, hy - 90, 50, 20, 4);
        
        this.add.text(hx, hy - 80, 'SOLD', {
          fontSize: '12px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          fontWeight: 'bold'
        }).setOrigin(0.5);
      }
    });

    this.character = this.add.graphics();
    this.character.fillStyle(0x1e293b, 1);
    this.character.fillRect(-5, -15, 10, 15);
    this.character.fillCircle(0, -20, 6);
    this.character.y = 160;
    this.character.x = startX - 80;

    this.tweens.add({
      targets: this.character,
      x: startX + 2 * spacing + 80,
      duration: 12000,
      yoyo: true,
      repeat: -1,
      hold: 2000,
      repeatDelay: 2000
    });

    this.drawRoad();
    this.scale.on('resize', this.handleResize, this);
  }

  drawSky() {
    this.sky.clear();
    this.sky.fillGradientStyle(0x7dd3fc, 0x7dd3fc, 0xfb923c, 0xfb923c, 1, 1, 1, 1);
    this.sky.fillRect(0, 0, this.scale.width, this.scale.height);
  }

  drawRoad() {
    this.road.clear();
    this.road.fillStyle(0x475569, 1);
    this.road.fillRect(0, 150, this.scale.width, 50);
    
    this.road.lineStyle(2, 0xffffff, 0.5);
    for(let i = 0; i < this.scale.width; i+=40) {
      this.road.moveTo(i, 175);
      this.road.lineTo(i + 20, 175);
    }
    this.road.strokePath();
  }

  handleResize(gameSize) {
    if (this.sky && this.road) {
      this.drawSky();
      this.drawRoad();
    }
  }

  update() {
    this.clouds.forEach(c => {
      c.g.x += c.speed;
      if (c.g.x > this.scale.width + 100) {
        c.g.x = -100;
        c.g.y = Phaser.Math.Between(20, 80);
      }
    });
  }
}
