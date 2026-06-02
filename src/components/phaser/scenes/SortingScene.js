import Phaser from 'phaser';

export default class SortingScene extends Phaser.Scene {
  constructor() {
    super('SortingScene');
  }

  create(data) {
    this.items = data.items || [];
    this.currentIndex = 0;
    this.correctCount = 0;
    
    this.bins = [
      { key: 'Standard', title: '✅ Standard', color: 0x3b82f6 },
      { key: 'Negotiable', title: '🤝 Negotiable', color: 0xf59e0b },
      { key: 'Red Flag', title: '🚩 Red Flag', color: 0xf43f5e }
    ];

    this.binObjects = {};
    const binWidth = Math.min(220, this.scale.width / 3.2);
    const binHeight = 100;
    const spacing = (this.scale.width - (binWidth * 3)) / 4;

    this.bins.forEach((b, i) => {
      const bx = spacing + (binWidth / 2) + i * (binWidth + spacing);
      const by = this.scale.height - binHeight / 2 - 20;

      const bg = this.add.graphics();
      bg.fillStyle(b.color, 0.8);
      bg.fillRoundedRect(-binWidth/2, -binHeight/2, binWidth, binHeight, 16);
      
      const txt = this.add.text(0, 0, b.title, {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'sans-serif'
      }).setOrigin(0.5);

      const container = this.add.container(bx, by, [bg, txt]);
      container.setSize(binWidth, binHeight);
      this.physics.add.existing(container, true);
      
      this.binObjects[b.key] = { container, bg, width: binWidth, height: binHeight, color: b.color };
    });

    this.spawnNextItem();

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', (pointer, gameObject) => {
      let droppedInBin = null;

      for (const key in this.binObjects) {
        const bin = this.binObjects[key];
        if (Phaser.Geom.Rectangle.Contains(bin.container.getBounds(), pointer.x, pointer.y)) {
          droppedInBin = key;
          break;
        }
      }

      if (droppedInBin) {
        this.handleDrop(gameObject, droppedInBin);
      } else {
        this.tweens.add({
          targets: gameObject,
          x: this.scale.width / 2,
          y: 120,
          duration: 300,
          ease: 'Back.easeOut'
        });
      }
    });
  }

  spawnNextItem() {
    if (this.currentIndex >= this.items.length) {
      this.game.events.emit('gameComplete', this.correctCount);
      return;
    }

    const item = this.items[this.currentIndex];
    
    const cardW = 320;
    const cardH = 140;
    
    const bg = this.add.graphics();
    bg.fillStyle(0x1e293b, 1);
    bg.lineStyle(2, 0x334155, 1);
    bg.fillRoundedRect(-cardW/2, -cardH/2, cardW, cardH, 12);
    bg.strokeRoundedRect(-cardW/2, -cardH/2, cardW, cardH, 12);

    const nameTxt = this.add.text(0, -35, item.name, {
      fontSize: '22px', fontWeight: 'bold', color: '#ffffff', fontFamily: 'sans-serif'
    }).setOrigin(0.5);
    
    const costTxt = this.add.text(0, -5, `$${item.amount}`, {
      fontSize: '18px', color: '#94a3b8', fontFamily: 'sans-serif'
    }).setOrigin(0.5);
    
    const descTxt = this.add.text(0, 30, item.description, {
      fontSize: '14px', color: '#cbd5e1', fontFamily: 'sans-serif', align: 'center',
      wordWrap: { width: cardW - 20 }
    }).setOrigin(0.5);

    this.activeCard = this.add.container(this.scale.width / 2, 120, [bg, nameTxt, costTxt, descTxt]);
    this.activeCard.setSize(cardW, cardH);
    this.activeCard.setInteractive({ draggable: true });
    this.physics.add.existing(this.activeCard);
    
    this.activeCard.scale = 0;
    this.tweens.add({
      targets: this.activeCard,
      scale: 1,
      duration: 300,
      ease: 'Back.easeOut'
    });
  }

  handleDrop(card, droppedCategory) {
    card.disableInteractive();
    const item = this.items[this.currentIndex];
    const isCorrect = item.category === droppedCategory;
    
    if (isCorrect) this.correctCount++;

    const bin = this.binObjects[droppedCategory];
    
    this.tweens.add({
      targets: card,
      x: bin.container.x,
      y: bin.container.y,
      scale: 0.2,
      alpha: 0,
      duration: 300,
      onComplete: () => {
        card.destroy();
      }
    });

    if (!isCorrect) {
      this.tweens.add({
        targets: card,
        x: '+=10',
        yoyo: true,
        repeat: 3,
        duration: 50
      });
    }

    const flashColor = isCorrect ? 0x22c55e : 0xef4444;
    bin.bg.clear();
    bin.bg.fillStyle(flashColor, 1);
    bin.bg.fillRoundedRect(-bin.width/2, -bin.height/2, bin.width, bin.height, 16);
    
    this.time.delayedCall(300, () => {
      bin.bg.clear();
      bin.bg.fillStyle(bin.color, 0.8);
      bin.bg.fillRoundedRect(-bin.width/2, -bin.height/2, bin.width, bin.height, 16);
    });

    const fbText = this.add.text(bin.container.x, bin.container.y - 60, isCorrect ? '+1' : '✗', {
      fontSize: '32px', fontWeight: 'bold', color: isCorrect ? '#22c55e' : '#ef4444', fontFamily: 'sans-serif'
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: fbText,
      y: fbText.y - 50,
      alpha: 0,
      duration: 1000,
      onComplete: () => fbText.destroy()
    });

    this.game.events.emit('itemSorted', { item, isCorrect, playerChoice: droppedCategory });
    
    this.currentIndex++;
    this.time.delayedCall(2000, () => {
      this.spawnNextItem();
    });
  }
}
