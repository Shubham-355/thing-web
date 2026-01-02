
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
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
        </div>
        Webpage under development.
      </main>
    </div>
  );
}
