"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, X } from "lucide-react";

interface TimelineAudioPlayerProps {
  audioSrc: string;
  title?: string;
  compact?: boolean;
}

const TimelineAudioPlayer: React.FC<TimelineAudioPlayerProps> = ({
  audioSrc,
  title = "Nghe nội dung",
  compact = false,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Format time to mm:ss
  const formatTime = (time: number): string => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle audio metadata loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    // Set initial volume
    audio.volume = volume;

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [volume]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
      if (compact) setShowControls(true);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, compact]);

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.7;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Compact mode: inline button with expandable controls
  if (compact) {
    return (
      <div className="relative flex items-center gap-2">
        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={audioSrc} preload="metadata" />

        {/* Compact Play Button */}
        <button
          onClick={togglePlay}
          disabled={!isLoaded}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
            isPlaying
              ? "bg-amber-500 text-white shadow-lg shadow-amber-500/40"
              : "bg-amber-600/20 text-amber-300 hover:bg-amber-600/40 border border-amber-500/30"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isPlaying ? "Tạm dừng" : "Phát audio"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">
            {isPlaying ? formatTime(currentTime) : "Nghe"}
          </span>
        </button>

        {/* Expanded Controls (show when playing) */}
        {showControls && (
          <div className="flex items-center gap-3 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
            {/* Progress Bar */}
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="relative w-24 h-1.5 bg-white/20 rounded-full cursor-pointer group"
            >
              <div
                className="absolute top-0 left-0 h-full bg-amber-400 rounded-full transition-all duration-100"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Time */}
            <span className="text-xs text-white/60 min-w-[32px]">
              {formatTime(duration)}
            </span>

            {/* Volume */}
            <button
              onClick={toggleMute}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white/60" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Close */}
            <button
              onClick={() => {
                setShowControls(false);
                if (isPlaying) {
                  audioRef.current?.pause();
                  setIsPlaying(false);
                }
              }}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Full mode (original)
  return (
    <div className="w-full bg-gradient-to-r from-amber-900/30 to-amber-800/20 backdrop-blur-md rounded-xl border border-amber-500/30 p-4">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40">
          <Volume2 className="w-5 h-5 text-amber-400" />
        </div>
        <span className="text-amber-200 font-medium">{title}</span>
      </div>

      {/* Controls Row */}
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          disabled={!isLoaded}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
            isPlaying
              ? "bg-amber-500 text-white shadow-lg shadow-amber-500/40"
              : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/40"
          } border border-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isPlaying ? "Tạm dừng" : "Phát"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </button>

        {/* Progress Section */}
        <div className="flex-1 flex flex-col gap-1">
          {/* Progress Bar */}
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="relative h-2 bg-white/10 rounded-full cursor-pointer group"
          >
            {/* Progress Fill */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
            {/* Progress Knob */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progressPercentage}% - 6px)` }}
            />
          </div>

          {/* Time Display */}
          <div className="flex justify-between text-xs text-white/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white/60" />
            ) : (
              <Volume2 className="w-5 h-5 text-amber-400" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:bg-amber-400
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-3
              [&::-moz-range-thumb]:h-3
              [&::-moz-range-thumb]:bg-amber-400
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineAudioPlayer;
