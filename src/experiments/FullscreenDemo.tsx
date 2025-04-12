import { useEffect, useRef, useState } from 'react';

const FullscreenDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      try {
        await containerRef.current?.requestFullscreen();
      } catch (error) {
        console.error('Error attempting to enable fullscreen:', error);
      }
    } else {
      await document.exitFullscreen();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Fullscreen API Demo</h1>
      <div
        ref={containerRef}
        className={`p-6 rounded-lg transition-all duration-300 ${isFullscreen ? 'bg-purple-900 text-white' : 'bg-purple-100'}`}
      >
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <p className="mb-4 text-center">
            {isFullscreen
              ? 'You are now in fullscreen mode! Press ESC to exit.'
              : 'Click the button below to enter fullscreen mode.'}
          </p>
          <button
            onClick={toggleFullscreen}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">About this demo</h2>
        <p>
          This demo showcases the Fullscreen API, which allows web content to take up the entire screen,
          removing all browser UI and other applications from the screen until fullscreen is exited.
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Browser Support</h3>
        <p>
          The Fullscreen API is supported in all modern browsers, though some may require vendor prefixes
          for older versions.
        </p>
      </div>
    </div>
  );
};

export default FullscreenDemo;
