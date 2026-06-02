import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import ConfettiScene from './scenes/ConfettiScene';
import './PhaserConfetti.css';

export default function PhaserConfetti({ trigger }) {
  const containerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (trigger) {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }

      const config = {
        type: Phaser.AUTO,
        parent: containerRef.current,
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true,
        scene: [ConfettiScene]
      };
      
      gameRef.current = new Phaser.Game(config);

      gameRef.current.events.on('confettiComplete', () => {
        if (gameRef.current) {
          gameRef.current.destroy(true);
          gameRef.current = null;
        }
      });
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [trigger]);

  useEffect(() => {
    const handleResize = () => {
      if (gameRef.current && gameRef.current.isBooted) {
        gameRef.current.scale.resize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div ref={containerRef} className="phaser-confetti-container" />;
}
