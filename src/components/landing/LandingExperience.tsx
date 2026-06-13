"use client";

import { useCallback, useState } from "react";
import { IntroGateway } from "@/components/intro/IntroGateway";
import { HomePage } from "@/components/home/HomePage";

export function LandingExperience() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      <HomePage />

      {!introComplete && <IntroGateway onComplete={handleIntroComplete} />}
    </>
  );
}
