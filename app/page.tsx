'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('curl');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStarAnimation, setShowStarAnimation] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(0);

  // Fetch GitHub star count
  useEffect(() => {
    fetch('https://api.github.com/repos/Shubham-355/thing')
      .then(res => res.json())
      .then(data => setStarCount(data.stargazers_count || 0))
      .catch(() => setStarCount(0));
  }, []);

  // Animate counter with smooth increment
  useEffect(() => {
    if (showStarAnimation && starCount > 0) {
      let current = 0;
      const duration = 1000;
      const steps = 60;
      const increment = starCount / steps;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= starCount) {
          setDisplayedCount(starCount);
          clearInterval(interval);
        } else {
          setDisplayedCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    } else {
      setDisplayedCount(0);
    }
  }, [showStarAnimation, starCount]);

  const commands = {
    curl: 'curl -O https://raw.githubusercontent.com/Shubham-355/Thing/main/Thing.js',
    wget: 'wget https://raw.githubusercontent.com/Shubham-355/Thing/main/Thing.js',
    powershell: 'Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Shubham-355/Thing/main/Thing.js" -OutFile "Thing.js"'
  };

  const tabs = [
    { id: 'curl', label: 'curl' },
    { id: 'wget', label: 'wget' },
    { id: 'powershell', label: 'powershell' }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commands[selectedTab as keyof typeof commands]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-12 text-center sm:items-start sm:text-left w-full">
          <div className="flex items-center justify-between w-full gap-8">
            <h1 className="text-6xl font-bold tracking-tight text-black dark:text-zinc-50">
              THING
            </h1>
            <a 
              href="https://github.com/Shubham-355/thing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your code's new collaborator, but it's Open Source.
          </p>

          {/* New section */}
          <div className="w-full">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Connect any model from any provider, including Claude, GPT, Gemini and more.
            </p>

            {/* Command tabs */}
            <div className="w-full">
              <div className="relative flex gap-0 mb-0 border-b border-gray-200 dark:border-gray-800">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedTab(tab.id);
                      setCopied(false);
                    }}
                    className={`relative px-6 py-3 text-sm font-medium transition-all ${
                      selectedTab === tab.id
                        ? 'text-black dark:text-white'
                        : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                    {selectedTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white" />
                    )}
                  </button>
                ))}
              </div>

              {/* Command box */}
              <button
                onClick={copyToClipboard}
                className="relative w-full bg-[#0A0A0A] dark:bg-[#0A0A0A] rounded-b-lg p-6 text-left hover:bg-[#111] transition-colors group border border-gray-800"
              >
                <code className="text-gray-300 text-base font-mono block pr-16">
                  {commands[selectedTab as keyof typeof commands]}
                </code>
                <div className="absolute top-4 right-4 transition-opacity">
                  {!copied ? (
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400 group-hover:text-gray-200"
                    >
                      <path 
                        d="M8.75 8.75V2.75H21.25V15.25H15.25M15.25 8.75H2.75V21.25H15.25V8.75Z" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="square"
                      />
                    </svg>
                  ) : (
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M2.75 15.0938L9 20.25L21.25 3.75" 
                        stroke="#03B000" 
                        strokeWidth="2" 
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </div>
              </button>
            </div>

            {/* Thing.png image with inset shadow */}
            <div className="relative w-full aspect-video mt-12 overflow-hidden rounded-lg">
              {/* Inset border wrapper */}
              <div className="absolute inset-0 pointer-events-none z-10" style={{
                boxShadow: 'inset 0 0 10px 8px rgba(0, 0, 0, 1)',
                borderRadius: 'inherit'
              }} />
              
              <Image 
                src="/Thing.png" 
                alt="Thing Project"
                fill
                className="object-cover"
              />
            </div>

            {/* Built for customization section */}
            <div className="w-full mt-20">
              <h2 className="text-4xl font-bold text-black dark:text-white mb-8">
                Built for customization
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="text-green-600 dark:text-green-400 text-xl mt-1">✓</span>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    You can introduce thing to any project customize instructions according to specific project
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-green-600 dark:text-green-400 text-xl mt-1">✓</span>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    You can customize anything, literally anything!
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full mt-20">
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
                  What is Thing?
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Thing is an open source agent that helps you vibe code
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-3 items-start">
                  <span className="text-green-600 dark:text-green-400 text-xl mt-1">✓</span>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      Multi-session
                    </p>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      Start multiple agents in parallel on the same project
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="text-green-600 dark:text-green-400 text-xl mt-1">✓</span>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      Claude
                    </p>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      Use Anthropic API key to use your Claude
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="text-green-600 dark:text-green-400 text-xl mt-1">✓</span>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      Any model
                    </p>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      Multiple LLM providers through, including local models
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="text-green-600 dark:text-green-400 text-xl mt-1">✓</span>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      Any editor
                    </p>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      Available as a terminal interface
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Dropdown section */}
            <div className="w-full mt-20">
              <h2 className="text-4xl font-bold text-black dark:text-white mb-8">
                FAQ
              </h2>

              <div className="space-y-4">
                {/* FAQ 1 */}
                <div className="border-b border-gray-300 dark:border-gray-700 pb-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-xl font-semibold text-black dark:text-white pr-4">
                      How do I use Thing?
                    </h3>
                    <span className="text-2xl text-gray-600 dark:text-gray-400 flex-shrink-0">
                      {openFaq === 1 ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === 1 && (
                    <p className="mt-4 text-base text-gray-700 dark:text-gray-300">
                      The easiest way to get started is to read the{' '}
                      <a
                        href="https://github.com/Shubham-355/thing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        docs
                      </a>
                    </p>
                  )}
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-300 dark:border-gray-700 pb-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-xl font-semibold text-black dark:text-white pr-4">
                      Do I need extra AI subscriptions to use Thing? or Can I use my existing AI subscriptions with Thing?
                    </h3>
                    <span className="text-2xl text-gray-600 dark:text-gray-400 flex-shrink-0">
                      {openFaq === 2 ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === 2 && (
                    <p className="mt-4 text-base text-gray-700 dark:text-gray-300">
                      All you need to do is paste api key!
                    </p>
                  )}
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-300 dark:border-gray-700 pb-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-xl font-semibold text-black dark:text-white pr-4">
                      How much does Thing cost?
                    </h3>
                    <span className="text-2xl text-gray-600 dark:text-gray-400 flex-shrink-0">
                      {openFaq === 3 ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === 3 && (
                    <p className="mt-4 text-base text-gray-700 dark:text-gray-300">
                      Absolutely free!
                    </p>
                  )}
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-300 dark:border-gray-700 pb-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-xl font-semibold text-black dark:text-white pr-4">
                      What about data and privacy?
                    </h3>
                    <span className="text-2xl text-gray-600 dark:text-gray-400 flex-shrink-0">
                      {openFaq === 4 ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === 4 && (
                    <p className="mt-4 text-base text-gray-700 dark:text-gray-300">
                      Its all local, you dont need to be worried!
                    </p>
                  )}
                </div>

                {/* FAQ 5 */}
                <div className="border-b border-gray-300 dark:border-gray-700 pb-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-xl font-semibold text-black dark:text-white pr-4">
                      Is Thing open source?
                    </h3>
                    <span className="text-2xl text-gray-600 dark:text-gray-400 flex-shrink-0">
                      {openFaq === 5 ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === 5 && (
                    <p className="mt-4 text-base text-gray-700 dark:text-gray-300">
                      Ofc it is open source! You can star! You can contribute! You can help fund!
                    </p>
                  )}
                </div>
              </div>

              {/* Final message with star animation */}
              <div 
                className="mt-12 flex flex-col items-center gap-6 cursor-pointer"
                onMouseEnter={() => setShowStarAnimation(true)}
                onMouseLeave={() => setShowStarAnimation(false)}
                onClick={() => window.open('https://github.com/Shubham-355/thing', '_blank')}
              >
                <div className="relative h-[100px] w-full flex items-center justify-center">
                  {/* Star that moves and scales */}
                  <motion.div 
                    className="absolute flex items-center gap-4"
                    animate={{ 
                      x: showStarAnimation ? -50 : 0,
                      scale: showStarAnimation ? 1.2 : 1,
                      rotate: showStarAnimation ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ 
                      duration: 0.6, 
                      ease: "easeOut",
                      rotate: { duration: 0.4, ease: "easeInOut" }
                    }}
                  >
                    <span className="text-4xl">⭐</span>
                  </motion.div>
                  
                  {/* Animated counter with particles */}
                  <AnimatePresence>
                    {showStarAnimation && (
                      <motion.div 
                        className="absolute flex items-center gap-2"
                        initial={{ opacity: 0, x: -20, scale: 0.5 }}
                        animate={{ opacity: 1, x: 50, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5, ease: "backOut" }}
                      >
                        {/* Glowing background */}
                        <motion.div
                          className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Counter digits with flip animation */}
                        <div className="relative flex items-center gap-1">
                          {displayedCount.toLocaleString().split('').map((digit, index) => (
                            <motion.span
                              key={`${digit}-${index}`}
                              className="text-5xl font-bold text-yellow-500 dark:text-yellow-400 inline-block"
                              initial={{ rotateX: -90, opacity: 0 }}
                              animate={{ rotateX: 0, opacity: 1 }}
                              transition={{ 
                                delay: index * 0.05,
                                duration: 0.3,
                                ease: "easeOut"
                              }}
                              style={{ 
                                textShadow: '0 0 20px rgba(250, 204, 21, 0.5)',
                                transformStyle: 'preserve-3d'
                              }}
                            >
                              {digit}
                            </motion.span>
                          ))}
                        </div>

                        {/* Sparkle particles */}
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                            style={{
                              left: '50%',
                              top: '50%',
                            }}
                            animate={{
                              x: [0, Math.cos(i * Math.PI / 3) * 40],
                              y: [0, Math.sin(i * Math.PI / 3) * 40],
                              opacity: [1, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{
                              duration: 1,
                              delay: 0.5 + i * 0.1,
                              repeat: Infinity,
                              repeatDelay: 2
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Ohh you came this far! Give it a star!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
