import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import HouseScene from './scenes/HouseScene';
import './PhaserHouseScene.css';

export default function PhaserHouseScene({ completedGames }) {
  const containerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const config = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: containerRef.current.offsetWidth,
      height: 200,
      transparent: false,
      scene: [HouseScene],
      callbacks: {
        postBoot: (game) => {
          game.scene.start('HouseScene', { completedGames });
        }
      }
    };
    
    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [completedGames]);

  useEffect(() => {
    const handleResize = () => {
      if (gameRef.current && containerRef.current) {
        gameRef.current.scale.resize(containerRef.current.offsetWidth, 200);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div ref={containerRef} className="phaser-house-container" />;
}
