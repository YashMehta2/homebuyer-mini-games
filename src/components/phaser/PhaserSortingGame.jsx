import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import SortingScene from './scenes/SortingScene';
import './PhaserSortingGame.css';

export default function PhaserSortingGame({ items, onItemSorted, onGameComplete, onError }) {
  const containerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      const config = {
        type: Phaser.AUTO,
        parent: containerRef.current,
        width: containerRef.current.offsetWidth,
        height: 500,
        transparent: true,
        physics: { default: 'arcade' },
        scene: [SortingScene],
        callbacks: {
          postBoot: (game) => {
            game.scene.start('SortingScene', { items });
          }
        }
      };
      
      const game = new Phaser.Game(config);
      gameRef.current = game;

      game.events.on('itemSorted', (data) => {
        onItemSorted(data);
      });

      game.events.on('gameComplete', (correctCount) => {
        onGameComplete(correctCount);
      });

    } catch (err) {
      if (onError) onError(err);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [items, onItemSorted, onGameComplete, onError]);

  useEffect(() => {
    const handleResize = () => {
      if (gameRef.current && containerRef.current) {
        gameRef.current.scale.resize(containerRef.current.offsetWidth, 500);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div ref={containerRef} className="phaser-sorting-container" />;
}
