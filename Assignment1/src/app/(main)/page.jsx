"use client"
import dynamic from 'next/dynamic';
import landingHero from "@/public/mainAnimation.json";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

// Dynamically import the Lottie component with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });


export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true);

  const onAnimationComplete = () => {
    setIsPlaying(false); 
  };
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2 mt-16">
      <div className="relative w-[290px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Lottie
          autoPlay={isPlaying}
          loop={false}
          animationData={landingHero}
          onComplete={onAnimationComplete} 
        />
      </div>

      <div className="flex flex-col items-center gap-y-8">
        <h1 className='text-xl lg:text-3xl font-extrabold text-neutral-600 max-w-[480px] text-center lg:pt-0 pt-4'>
        Empowering Tomorrow, Innovating Today.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <Button variant="super" size="lg">Join Us</Button>
        </div>
      </div>
    </div>
  );
}
