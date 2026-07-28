import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, X, Play, RotateCcw, Trophy, Sparkles } from 'lucide-react';

export const DinoMiniGame: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Game physics state
  const [dinoY, setDinoY] = useState<number>(0); // 0 = ground
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [obstacleX, setObstacleX] = useState<number>(380);

  const requestRef = useRef<number | null>(null);
  const dinoYRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const obstacleXRef = useRef<number>(380);
  const scoreRef = useRef<number>(0);

  const handleJump = () => {
    if (!isPlaying) {
      startGame();
      return;
    }
    if (dinoYRef.current === 0) {
      velocityRef.current = 12; // Jump impulse
      setIsJumping(true);
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    scoreRef.current = 0;
    dinoYRef.current = 0;
    velocityRef.current = 0;
    obstacleXRef.current = 380;
    setDinoY(0);
    setObstacleX(380);
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const loop = () => {
      // 1. Apply gravity to Dino
      velocityRef.current -= 0.65; // gravity
      dinoYRef.current += velocityRef.current;

      if (dinoYRef.current <= 0) {
        dinoYRef.current = 0;
        velocityRef.current = 0;
        setIsJumping(false);
      }
      setDinoY(dinoYRef.current);

      // 2. Move Obstacle leftward
      obstacleXRef.current -= 5.5; // speed
      if (obstacleXRef.current < -30) {
        obstacleXRef.current = 380; // Loop obstacle back
        scoreRef.current += 10;
        setScore(scoreRef.current);
        if (scoreRef.current > highScore) setHighScore(scoreRef.current);
      }
      setObstacleX(obstacleXRef.current);

      // 3. Collision Detection (Dino width ~40px, obstacle width ~24px)
      if (
        obstacleXRef.current > 30 &&
        obstacleXRef.current < 70 &&
        dinoYRef.current < 35
      ) {
        setGameOver(true);
        setIsPlaying(false);
        return;
      }

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, gameOver, highScore]);

  // Keyboard Spacebar Jump
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isOpen) {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying]);

  return (
    <>
      {/* Floating Parachute Dino Trigger Widget (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-1">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#111111] border-2 border-[#C4F62E] hover:border-[#E8B923] text-white p-2.5 rounded-2xl shadow-[0_0_20px_rgba(196,246,46,0.5)] flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          title="Play EYFI Dino Sprint Mini-Game"
        >
          {/* Animated Umbrella Dino Icon */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-8 h-8 animate-bounce">
              {/* Umbrella Parachute Canopy */}
              <path d="M 10 35 C 10 10, 90 10, 90 35 Z" fill="#C4F62E" stroke="#000" strokeWidth="3" />
              <line x1="25" y1="35" x2="50" y2="60" stroke="#FFF" strokeWidth="2" />
              <line x1="75" y1="35" x2="50" y2="60" stroke="#FFF" strokeWidth="2" />

              {/* T-Rex Dino Body */}
              <rect x="42" y="58" width="18" height="22" rx="4" fill="#E8B923" stroke="#000" strokeWidth="2" />
              <rect x="52" y="52" width="16" height="12" rx="3" fill="#E8B923" stroke="#000" strokeWidth="2" />
              <circle cx="62" cy="56" r="2" fill="#000" />
            </svg>
          </div>

          <div className="text-left font-mono-stats">
            <span className="text-[10px] text-[#C4F62E] font-bold block uppercase leading-none">
              Play Dino Sprint 🎮
            </span>
            <span className="text-[9px] text-[#8A8A85] block mt-0.5">
              Umbrella Jump Game
            </span>
          </div>
        </button>
      </div>

      {/* Mini Game Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F0F0F] border-2 border-[#C4F62E] rounded-3xl p-6 shadow-[0_20px_60px_rgba(196,246,46,0.3)] space-y-5 relative animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#222] pb-3">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-[#C4F62E]" />
                <h3 className="font-display font-black text-white text-base">
                  EYFI DINO SPRINT
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-mono-stats text-[#E8B923] flex items-center gap-1 font-bold">
                  <Trophy className="w-3.5 h-3.5" /> {highScore}
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#8A8A85] hover:text-white p-1 rounded-lg hover:bg-[#222] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Game Canvas Box */}
            <div
              onClick={handleJump}
              className="w-full h-48 bg-[#050505] border border-[#242424] rounded-2xl relative overflow-hidden cursor-pointer select-none flex flex-col justify-end"
            >
              {/* Score Display */}
              <div className="absolute top-3 right-4 text-xs font-mono-stats text-[#C4F62E] font-extrabold tracking-wider bg-[#C4F62E]/10 border border-[#C4F62E]/30 px-3 py-1 rounded-full">
                SCORE: {score}
              </div>

              {/* Start Overlay */}
              {!isPlaying && !gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-[#000]/60 z-30">
                  <button
                    onClick={startGame}
                    className="bg-[#C4F62E] text-[#0A0A0A] font-display font-black text-xs px-6 py-2.5 rounded-full shadow-[0_0_16px_rgba(196,246,46,0.5)] flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    TAP / SPACEBAR TO JUMP
                  </button>
                  <span className="text-[10px] font-mono-stats text-[#8A8A85]">
                    Jump over obstacles with Dino's Umbrella!
                  </span>
                </div>
              )}

              {/* Game Over Overlay */}
              {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-[#000]/80 z-30">
                  <span className="font-display font-black text-red-500 text-lg">GAME OVER!</span>
                  <span className="text-xs font-mono-stats text-white">Final Score: {score}</span>
                  <button
                    onClick={startGame}
                    className="bg-[#C4F62E] text-[#0A0A0A] font-display font-black text-xs px-6 py-2.5 rounded-full shadow-[0_0_16px_rgba(196,246,46,0.5)] flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform mt-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    PLAY AGAIN
                  </button>
                </div>
              )}

              {/* Dino Player Character with Lime Umbrella */}
              <div
                className="absolute left-8 bottom-3 transition-transform duration-75"
                style={{ transform: `translateY(${-dinoY}px)` }}
              >
                {/* Dino SVG Artwork */}
                <div className="relative w-12 h-14">
                  {/* Umbrella Canopy */}
                  <div className={`absolute -top-6 -left-3 transition-transform ${isJumping ? 'scale-110' : ''}`}>
                    <svg width="48" height="24" viewBox="0 0 100 50">
                      <path d="M 5 45 C 5 10, 95 10, 95 45 Z" fill="#C4F62E" stroke="#000" strokeWidth="4" />
                    </svg>
                  </div>

                  {/* Dino Pixel Body */}
                  <svg width="44" height="44" viewBox="0 0 100 100">
                    <rect x="25" y="30" width="45" height="40" rx="8" fill="#E8B923" stroke="#000" strokeWidth="4" />
                    <rect x="50" y="20" width="35" height="25" rx="6" fill="#E8B923" stroke="#000" strokeWidth="4" />
                    <circle cx="72" cy="30" r="4" fill="#000" />
                    {/* Teeth */}
                    <rect x="75" y="38" width="8" height="4" fill="#FFF" />
                    {/* Legs */}
                    <rect x="35" y="70" width="10" height="18" fill="#D4A017" stroke="#000" strokeWidth="3" />
                    <rect x="55" y="70" width="10" height="18" fill="#D4A017" stroke="#000" strokeWidth="3" />
                  </svg>
                </div>
              </div>

              {/* Cactus / Level Flag Obstacle */}
              <div
                className="absolute bottom-3"
                style={{ left: `${obstacleX}px` }}
              >
                <div className="w-6 h-10 bg-[#C4F62E] border-2 border-black rounded-t-lg flex items-center justify-center font-mono-stats text-[9px] font-black text-black shadow-md">
                  L{Math.floor((score / 20) % 6) + 1}
                </div>
              </div>

              {/* Ground Line */}
              <div className="w-full h-3 bg-[#1C1C1C] border-t border-[#333]" />
            </div>

            <div className="text-center text-xs font-mono-stats text-[#8A8A85]">
              💡 Tap Screen or Press <kbd className="bg-[#222] text-[#C4F62E] px-2 py-0.5 rounded border border-[#333]">SPACEBAR</kbd> to Jump!
            </div>
          </div>
        </div>
      )}
    </>
  );
};
