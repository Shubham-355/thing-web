'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('curl');
  const [copied, setCopied] = useState(false);

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
          </div>
        </div>
      </main>
    </div>
  );
}
