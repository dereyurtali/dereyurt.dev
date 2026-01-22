'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CansatStabilization() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg sm:text-xl font-semibold hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
              ← Back to Portfolio
            </Link>
            <a
              href="/Spin-Stabilize-Methods-for-Cansat.pdf"
              download
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                NASA CanSat Competition
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                Technical Document
              </span>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium">
                2020
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Spin Stabilized Camera
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8">
              A technical guide on camera stabilization methods for CanSat satellites, exploring both software and hardware approaches to counteract spinning during descent.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Problem</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              If you want to use a camera in your CanSat, you better be prepared for spinning video. Your CanSat will be spinning due to parachute and wind. There is nothing to stop it from spinning.
            </p>

            {/* Spinning Image Illustration */}
            <div className="relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-green-400 via-blue-500 to-green-600 aspect-video flex items-center justify-center">
              <div className="absolute inset-0 animate-spin-slow opacity-50">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
              <div className="text-center z-10 p-4">
                <div className="text-4xl sm:text-6xl mb-2">🌀</div>
                <p className="text-white font-medium text-sm sm:text-base">Spinning video without stabilization</p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              So, what if you want to make it stabilized? There are two main approaches: <strong>Software Stabilization</strong> and <strong>Hardware Stabilization</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Method 1: Software Stabilization */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
              1
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Software Stabilization</h2>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Understanding Video</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Videos are fast-played images. You basically show 30 photos in 1 second. In every frame you change the image little bit. It's super fast so a human eye can't see the interrupts. It looks like moving.
              </p>

              {/* Pixel Grid Illustration */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 sm:p-6">
                <div className="grid grid-cols-16 gap-px max-w-md mx-auto" style={{ gridTemplateColumns: 'repeat(16, 1fr)' }}>
                  {/* Mario pixel art representation */}
                  {[
                    '................',
                    '....RRRRR.......',
                    '...RRRRRRRRR....',
                    '...BBBYYBY......',
                    '..BYBYYYBYYYY...',
                    '..BYBBYYYBYYYY..',
                    '..BBBYYYYYBBB...',
                    '....YYYYYYYY....',
                    '..BBBRBBBR......',
                    '.BBBBRBRBBBB....',
                    'YYYYBRRRRBYYYY..',
                    'YYYRRRRRRRRYYY..',
                    'YYRRRRRRRRRRYY..',
                    '..RRR....RRR....',
                    '.BBB......BBB...',
                    'BBBB......BBBB..',
                  ].map((row, i) =>
                    row.split('').map((pixel, j) => {
                      const colors: Record<string, string> = {
                        'R': 'bg-red-500',
                        'B': 'bg-amber-800',
                        'Y': 'bg-yellow-400',
                        '.': 'bg-gray-200 dark:bg-gray-700'
                      };
                      return (
                        <div
                          key={`${i}-${j}`}
                          className={`aspect-square ${colors[pixel] || 'bg-gray-200 dark:bg-gray-700'}`}
                        />
                      );
                    })
                  )}
                </div>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">16 x 16 pixels illustration</p>
              </div>
            </div>

            {/* Method 1.1 */}
            <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-start gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">1.1</span>
                <h3 className="text-xl sm:text-2xl font-semibold">By Selecting a Point from Image</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                You can select something from the image. For example, you choose eye of the Mario and then you track its position. Then you can position the other pixels.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Drawback:</strong> This method means lots of effort for small processor, you need some serious memory and processor.
                </p>
              </div>
            </div>

            {/* Method 1.2 */}
            <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-start gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">1.2</span>
                <h3 className="text-xl sm:text-2xl font-semibold">By Getting Yaw Value from Sensors</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                If you put gyro sensor to your spinning system then get the yaw value, you can know how much you need to tilt your image (or 2D array). But you still have a lot of work.
              </p>

              {/* Calculation Box */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 sm:p-6">
                <h4 className="font-semibold mb-4">Let's calculate the effort needed:</h4>
                <ul className="space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span>Resolution: <strong>640 x 480</strong> = 307,200 pixels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span>Per frame: 307,200 × 24 bits ÷ 8 = <strong>921,600 bytes</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span>At 24 FPS: 921,600 × 24 = <strong>22,118,400 bytes/second</strong></span>
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    This is for uncompressed video. Even with compression, it's too much data for small processors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Method 2: Hardware Stabilization */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
              2
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Hardware Stabilization</h2>
          </div>

          <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              You can turn the camera physically. If your CanSat spins in Clockwise direction, you can turn the camera to Counterclockwise direction so image doesn't move.
            </p>

            {/* Yaw/Pitch/Roll Diagram */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                <div className="text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-8 sm:w-20 sm:h-10 bg-gray-400 dark:bg-gray-600 rounded-sm transform -rotate-12"></div>
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-green-500 font-bold text-xs sm:text-sm">Yaw ↻</div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-blue-500 font-bold text-xs sm:text-sm">Pitch ↕</div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 text-red-500 font-bold text-xs sm:text-sm">Roll ↔</div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Aircraft axes</p>
                </div>

                <div className="text-4xl sm:text-6xl">→</div>

                <div className="text-center">
                  <div className="w-24 h-32 sm:w-28 sm:h-40 border-2 border-gray-400 dark:border-gray-600 rounded-lg relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-xs">📷</span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400">
                      CanSat
                    </div>
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-green-500 text-lg sm:text-xl">↻</div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Counter-rotation</p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold mb-4">Requirements:</h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span><strong>Gyro sensor</strong> - to read yaw values</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span><strong>Electric motor</strong> - to spin camera in opposite direction</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span><strong>Separate battery</strong> - camera must be unattached with wires (they would tangle or break)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span><strong>Motor encoder/decoder</strong> - to turn motor exactly the same degree that CanSat has spun</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Method Comparison</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-6 sm:p-8 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Software</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>✓ No additional hardware</li>
                <li>✓ Can be done post-processing</li>
                <li>✗ High computational load</li>
                <li>✗ Requires powerful processor</li>
                <li>✗ Large memory requirement</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-6 sm:p-8 border border-purple-200 dark:border-purple-800">
              <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">Hardware</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>✓ Real-time stabilization</li>
                <li>✓ No processing overhead</li>
                <li>✗ Additional weight</li>
                <li>✗ More complex design</li>
                <li>✗ Separate power needed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Want the Full Document?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Download the original PDF with detailed diagrams and calculations.
          </p>
          <a
            href="/Spin-Stabilize-Methods-for-Cansat.pdf"
            download
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
          <p>&copy; 2020 Ali Dereyurt. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
