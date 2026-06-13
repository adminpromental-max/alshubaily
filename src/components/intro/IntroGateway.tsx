"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const INTRO_BG = "#0A0E17";
const VIDEO_SRC = "/assets/intro/intro.mp4";
const AUDIO_SRC = "/assets/intro/intro.mp3";

type IntroGatewayProps = {
  onComplete: () => void;
};

export function IntroGateway({ onComplete }: IntroGatewayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [needsTap, setNeedsTap] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const hasFinished = useRef(false);

  const finishIntro = useCallback(() => {
    if (hasFinished.current) return;
    hasFinished.current = true;

    const overlay = overlayRef.current;
    const video = videoRef.current;
    const audio = audioRef.current;

    video?.pause();
    audio?.pause();

    setIsExiting(true);

    if (!overlay) {
      document.body.style.overflow = "";
      onComplete();
      return;
    }

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.55,
      ease: "power2.out",
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      },
    });
  }, [onComplete]);

  const startPlayback = useCallback(async () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    setNeedsTap(false);

    try {
      video.currentTime = 0;
      audio.currentTime = 0;
      await audio.play();
      await video.play();
    } catch {
      setNeedsTap(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => finishIntro();

    video.addEventListener("ended", handleEnded);

    if (video.readyState >= 2) {
      void startPlayback();
    } else {
      video.addEventListener("loadeddata", () => void startPlayback(), { once: true });
    }

    return () => {
      video.removeEventListener("ended", handleEnded);
      document.body.style.overflow = "";
    };
  }, [finishIntro, startPlayback]);

  useEffect(() => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio || !video) return;

    const syncAudio = () => {
      if (Math.abs(audio.currentTime - video.currentTime) > 0.25) {
        audio.currentTime = video.currentTime;
      }
    };

    video.addEventListener("timeupdate", syncAudio);
    return () => video.removeEventListener("timeupdate", syncAudio);
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: INTRO_BG }}
      aria-label="Intro video"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-contain md:max-h-[92vh] md:max-w-[min(92vw,720px)]"
        style={{ backgroundColor: INTRO_BG }}
        src={VIDEO_SRC}
        playsInline
        preload="auto"
        muted
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
      />

      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" />

      {needsTap && !isExiting && (
        <button
          type="button"
          onClick={() => void startPlayback()}
          className="absolute inset-0 z-10 flex items-center justify-center bg-[#0A0E17]/75 backdrop-blur-sm"
        >
          <span className="rounded-full border border-[#c9a962]/40 bg-[#0A0E17]/90 px-8 py-3 text-sm tracking-wide text-[#e8d5a8]">
            اضغط لبدء العرض
          </span>
        </button>
      )}
    </div>
  );
}
