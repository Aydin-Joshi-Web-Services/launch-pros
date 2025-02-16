'use client'

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';


export default function Page() {
  const words = ["Automated", "Intelligent", "Low-Risk"];

  const Blob = () => {
    return (
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-[500px] h-[300px]"
        style={{
          transform: "perspective(1000px) rotateX(30deg)",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 blur-2xl opacity-50 mix-blend-screen" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 blur-xl opacity-50 mix-blend-screen transform scale-95" />
      </motion.div>
    );
  };


  const SquareBackground = () => {
    const squares = Array.from({ length: 20 });
    return (
      <div className="absolute inset-0 overflow-hidden">
        {squares.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-blue-500/10 rounded-sm"
            initial={{
              opacity: 0.1,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0
            }}
            animate={{
              opacity: [0.1, 0.15, 0.1],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
  };

// Add this state and effect inside your component, before the return statement
const [wordIndex, setWordIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setWordIndex((prev) => (prev + 1) % words.length);
  }, 4000);
  return () => clearInterval(interval);
}, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start relative overflow-hidden pt-5 pb-12">
      <div>
        <div className="absolute top-20 -left-40">
    <Blob />
  </div>
  <div className="absolute bottom-20 -right-40">
    <Blob />
  </div>
  <div 
    className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,rgba(59,130,246,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]"
    style={{ maskImage: 'radial-gradient(at center, white, transparent)', WebkitMaskImage: 'radial-gradient(at center, white, transparent)' }}
  />
  <SquareBackground />
      {/* Enhanced Background gradients */}
      <div className="absolute inset-0">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Blue accent gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        
        {/* Diagonal gradient sweep */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-slate-950/50" />
        
        {/* Edge vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/50 to-slate-950" />
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
{/* Badge */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="inline-block relative"
>
  {/* Static glow effect */}
  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-blue-600/50 rounded-full blur-md opacity-75" />
  
  <span className="relative px-4 py-1.5 rounded-full text-sm font-medium bg-slate-800/60 text-white backdrop-blur-sm border border-slate-700/50 flex items-center gap-2">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
    </span>
    🚀 March 1, 2025
  </span>
</motion.div>

          {/* Heading */}
          <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="text-7xl md:text-7xl font-extralight tracking-tight font-dmsans"
>
  <span className="text-white">
    <AnimatePresence mode="wait">
      <motion.span
        key={words[wordIndex]}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
        className="inline-block"
      >
        {words[wordIndex]}
      </motion.span>
    </AnimatePresence>
    {" Investing"}
  </span>
  <br />
  <span className="bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#93C5FD] text-transparent bg-clip-text">
    Powered by AI
  </span>
</motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white text-md md:text-lg max-w-4xl mx-auto font-inter mt-6"
          >
            HedgeAI is an emerging fintech startup that allows individuals to intelligently invest in a matter of seconds - all leveraging OpenAI's o1 model. Sign up for free access on launch day.
          </motion.p>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Email address..."
              className="w-full sm:w-72 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 backdrop-blur-sm"
            />
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium transition-all duration-200"
            >
              Join waitlist
            </Button>
          </motion.div>
        </motion.div>
      </div>


      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 mt-16"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-video rounded-xl overflow-hidden"
        >
          <Image
            src="/hero-image.png"
            alt="Application screenshot"
            width={1920}
            height={1080}
            className="rounded-xl shadow-2xl ring-1 ring-white/10 object-cover"
          />
          {/* Modified gradient overlay for better blend with background */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
    </div>
  );
}