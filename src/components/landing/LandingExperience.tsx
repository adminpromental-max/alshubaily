"use client";

import { useState } from "react";
import { IntroGateway } from "@/components/intro/IntroGateway";
import { HomePage } from "@/components/home/HomePage";
import { LangProvider } from "@/contexts/lang-context";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";

const ENABLE_INTRO = process.env.NEXT_PUBLIC_ENABLE_INTRO === "true";

export function LandingExperience() {
  const [introComplete, setIntroComplete] = useState(!ENABLE_INTRO);

  return (
    <LangProvider>
      <SmoothScrollProvider>
        <HomePage />
        {ENABLE_INTRO && !introComplete && (
          <IntroGateway onComplete={() => setIntroComplete(true)} />
        )}
      </SmoothScrollProvider>
    </LangProvider>
  );
}
