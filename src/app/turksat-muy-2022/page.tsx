'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TurksatCDR2022() {
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
              href="/2022-muy-cdr/T-MUY2022_405365_CDR_v1.0.pdf"
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
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                TURKSAT Model Satellite Competition
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                Critical Design Review
              </span>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium">
                2022
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Model Satellite CDR Report
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-4">
              Team TALIA 4A • Team #405365 • Fatih Sultan Mehmet University
            </p>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-500">
              A comprehensive Critical Design Review documenting the complete satellite system including 5-layer modular payload, active landing system with PID control, and custom smoke visibility mission.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Overview */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Mission Overview</h2>

          {/* Mission Phases Diagram */}
          <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 mb-8">
            <div className="relative">
              <svg viewBox="0 0 800 420" className="w-full h-auto">
                {/* Background gradient for sky */}
                <defs>
                  <linearGradient id="skyGradient2022" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a5f" />
                    <stop offset="100%" stopColor="#87CEEB" />
                  </linearGradient>
                  <linearGradient id="groundGradient2022" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B4513" />
                    <stop offset="100%" stopColor="#654321" />
                  </linearGradient>
                </defs>

                {/* Sky background */}
                <rect x="0" y="0" width="800" height="370" fill="url(#skyGradient2022)" opacity="0.3" />

                {/* Ground */}
                <rect x="0" y="370" width="800" height="50" fill="url(#groundGradient2022)" opacity="0.5" />

                {/* Altitude markers */}
                <line x1="50" y1="50" x2="50" y2="370" stroke="#6B7280" strokeWidth="1" strokeDasharray="4,4" />
                <text x="20" y="55" fill="#6B7280" fontSize="11" fontWeight="bold">700m</text>
                <text x="20" y="130" fill="#6B7280" fontSize="11" fontWeight="bold">400m</text>
                <text x="20" y="180" fill="#6B7280" fontSize="11" fontWeight="bold">200m</text>
                <text x="20" y="230" fill="#6B7280" fontSize="11" fontWeight="bold">150m</text>
                <text x="20" y="365" fill="#6B7280" fontSize="11" fontWeight="bold">0m</text>

                {/* Phase 1: Ascent */}
                <g>
                  <circle cx="130" cy="60" r="18" fill="#3B82F6" opacity="0.8" />
                  <text x="130" y="65" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1</text>
                  <text x="130" y="90" textAnchor="middle" fill="#3B82F6" fontSize="10" fontWeight="bold">YUKSELIS</text>
                  <text x="130" y="102" textAnchor="middle" fill="#6B7280" fontSize="9">Ascent</text>
                </g>

                {/* Descent path 1 */}
                <path d="M 148 65 Q 200 100 250 130" fill="none" stroke="#22C55E" strokeWidth="2" strokeDasharray="8,4" />
                <text x="200" y="85" fill="#22C55E" fontSize="9">Parachute</text>

                {/* Phase 2: Descent */}
                <g>
                  <circle cx="270" cy="130" r="18" fill="#22C55E" opacity="0.8" />
                  <text x="270" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2</text>
                  <text x="270" y="160" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">DUSUS</text>
                  <text x="270" y="172" textAnchor="middle" fill="#6B7280" fontSize="9">Descent</text>
                </g>

                {/* Path to separation */}
                <path d="M 288 135 Q 330 155 370 180" fill="none" stroke="#8B5CF6" strokeWidth="2" />

                {/* Phase 3: Separation @ 200m */}
                <g>
                  <circle cx="390" cy="180" r="18" fill="#8B5CF6" opacity="0.8" />
                  <text x="390" y="185" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3</text>
                  <text x="390" y="210" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontWeight="bold">AYRILMA</text>
                  <text x="390" y="222" textAnchor="middle" fill="#6B7280" fontSize="9">Separation @200m</text>
                </g>

                {/* Smoke trail effect */}
                <ellipse cx="430" cy="185" rx="12" ry="6" fill="#F97316" opacity="0.7" />
                <ellipse cx="448" cy="188" rx="10" ry="5" fill="#F97316" opacity="0.5" />
                <ellipse cx="462" cy="192" rx="8" ry="4" fill="#F97316" opacity="0.3" />
                <text x="480" y="185" fill="#F97316" fontSize="9">Smoke Deploy</text>

                {/* Path to hover */}
                <path d="M 408 185 Q 450 210 490 230" fill="none" stroke="#F59E0B" strokeWidth="2" />

                {/* Phase 4: Stable Hover @ 150m */}
                <g>
                  <circle cx="510" cy="230" r="18" fill="#F59E0B" opacity="0.8" />
                  <text x="510" y="235" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">4</text>
                  <text x="510" y="260" textAnchor="middle" fill="#F59E0B" fontSize="10" fontWeight="bold">SABIT</text>
                  <text x="510" y="272" textAnchor="middle" fill="#6B7280" fontSize="9">10s Hover @150m</text>
                </g>

                {/* Hover arrows */}
                <path d="M 535 225 L 548 230 L 535 235" fill="none" stroke="#F59E0B" strokeWidth="2" />
                <path d="M 548 225 L 561 230 L 548 235" fill="none" stroke="#F59E0B" strokeWidth="2" />

                {/* Path to recovery */}
                <path d="M 528 235 Q 570 280 610 320" fill="none" stroke="#EF4444" strokeWidth="2" />

                {/* Phase 5: Recovery */}
                <g>
                  <circle cx="630" cy="320" r="18" fill="#EF4444" opacity="0.8" />
                  <text x="630" y="325" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">5</text>
                  <text x="630" y="350" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold">KURTARMA</text>
                  <text x="630" y="362" textAnchor="middle" fill="#6B7280" fontSize="9">Motors cut @5m</text>
                </g>

                {/* Final landing */}
                <path d="M 648 325 Q 680 350 710 365" fill="none" stroke="#22C55E" strokeWidth="2" />
                <circle cx="730" cy="365" r="14" fill="#22C55E" opacity="0.8" />
                <text x="730" y="370" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">6</text>
                <text x="730" y="395" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="bold">Landing</text>

                {/* Carrier separate path */}
                <path d="M 408 180 Q 480 280 560 365" fill="none" stroke="#6B7280" strokeWidth="1" strokeDasharray="4,4" />
                <text x="500" y="310" fill="#6B7280" fontSize="9">Carrier</text>

                {/* Telemetry waves */}
                <g opacity="0.5">
                  <path d="M 680 150 Q 710 130 750 150 Q 710 170 680 150" fill="none" stroke="#3B82F6" strokeWidth="1" />
                  <path d="M 690 140 Q 720 120 760 140" fill="none" stroke="#3B82F6" strokeWidth="1" />
                  <text x="720" y="175" fill="#3B82F6" fontSize="9">Telemetry</text>
                  <text x="720" y="187" fill="#3B82F6" fontSize="9">1-5 Hz</text>
                </g>

                {/* Video feed */}
                <g opacity="0.5">
                  <rect x="680" y="200" width="25" height="18" fill="none" stroke="#EC4899" strokeWidth="1" />
                  <circle cx="692" cy="209" r="4" fill="none" stroke="#EC4899" strokeWidth="1" />
                  <text x="720" y="212" fill="#EC4899" fontSize="9">Live Video</text>
                </g>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Mission profile: Ascent → Descent → Separation @200m → 10s Hover @150m → Recovery → Landing
            </p>
          </div>

          {/* Mission Objectives */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-black rounded-3xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Primary Mission
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5"></span>
                  Deploy from rocket at 700m altitude
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5"></span>
                  Autonomous separation at 200m
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5"></span>
                  Active landing with PID-controlled motors
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5"></span>
                  Real-time telemetry at 1-5 Hz + live video
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-black rounded-3xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                Custom Missions
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></span>
                  <strong>Smoke Capsules:</strong> Colored smoke for visibility
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></span>
                  <strong>Object Detection:</strong> YOLOv4-tiny real-time AI
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></span>
                  Hover at 150m for 10 seconds
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></span>
                  Dual-channel communication (WiFi + NRF24)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* My Contributions - Highlighted */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 sm:p-10 border-2 border-blue-200 dark:border-blue-800">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Contributions
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                System Lead & Operation Control Officer
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* System Overview */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-4 flex items-center text-blue-600 dark:text-blue-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  System Overview
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 5-layer modular payload architecture</li>
                  <li>• Weight distribution & thermal management</li>
                  <li>• Post-PDR major design changes</li>
                  <li>• Camera & antenna system upgrades</li>
                </ul>
              </div>

              {/* Mechanical */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-4 flex items-center text-purple-600 dark:text-purple-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Mechanical Subsystem
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 6 post-PDR design improvements</li>
                  <li>• FDM 3D printing (PETG/ABS)</li>
                  <li>• Separation mechanism gears</li>
                  <li>• Motor mount optimization</li>
                </ul>
              </div>

              {/* Custom Mission: Smoke */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-4 flex items-center text-orange-600 dark:text-orange-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                  Smoke Capsules (Custom Mission 1)
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Custom 3D-printed thermal-isolated design</li>
                  <li>• KNO3 + Sugar pyrotechnic mixture</li>
                  <li>• Electronic fuse activation circuit</li>
                  <li>• 100% ignition reliability (10/10 tests)</li>
                </ul>
              </div>

              {/* Integration & Testing */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-4 flex items-center text-green-600 dark:text-green-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Integration & Testing
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 3-phase integration methodology</li>
                  <li>• Environmental tests (drop, thermal, vibration)</li>
                  <li>• Communication range validation</li>
                  <li>• Mission operations planning</li>
                </ul>
              </div>

              {/* Project Management */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-4 flex items-center text-cyan-600 dark:text-cyan-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Project Management
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 39/39 requirements compliance</li>
                  <li>• Risk identification & mitigation</li>
                  <li>• Team coordination (6 members)</li>
                  <li>• Schedule & milestone tracking</li>
                </ul>
              </div>

              {/* Operations */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-4 flex items-center text-red-600 dark:text-red-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Operation Control Officer
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Pre-flight checklists & procedures</li>
                  <li>• Real-time mission monitoring</li>
                  <li>• GPS-guided recovery coordination</li>
                  <li>• Post-flight data analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Technical Specifications</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">&lt;1500g</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Weight</div>
            </div>
            <div className="bg-white dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Payload Layers</div>
            </div>
            <div className="bg-white dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">20.2 Wh</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Power</div>
            </div>
            <div className="bg-white dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">39/39</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Requirements Met</div>
            </div>
          </div>

          {/* Payload Structure Diagram */}
          <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-semibold mb-6 text-center">5-Layer Payload Architecture</h3>
            <div className="flex justify-center">
              <svg viewBox="0 0 420 480" className="w-full max-w-md h-auto">
                {/* Layer 1: Active Landing */}
                <rect x="110" y="30" width="200" height="65" rx="8" fill="#3B82F6" opacity="0.2" stroke="#3B82F6" strokeWidth="2" />
                <text x="210" y="55" textAnchor="middle" fill="#3B82F6" fontSize="12" fontWeight="bold">Layer 1: Active Landing</text>
                <text x="210" y="72" textAnchor="middle" fill="#6B7280" fontSize="10">2x 2205 BLDC Motors</text>
                <text x="210" y="86" textAnchor="middle" fill="#6B7280" fontSize="10">Counter-rotating 4" props</text>

                {/* Layer 2: Separation & Smoke */}
                <rect x="110" y="105" width="200" height="65" rx="8" fill="#8B5CF6" opacity="0.2" stroke="#8B5CF6" strokeWidth="2" />
                <text x="210" y="130" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="bold">Layer 2: Separation</text>
                <text x="210" y="147" textAnchor="middle" fill="#6B7280" fontSize="10">3-gear servo mechanism</text>
                <text x="210" y="161" textAnchor="middle" fill="#6B7280" fontSize="10">2x smoke capsules</text>

                {/* Layer 3: Battery */}
                <rect x="110" y="180" width="200" height="55" rx="8" fill="#EF4444" opacity="0.2" stroke="#EF4444" strokeWidth="2" />
                <text x="210" y="205" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">Layer 3: Power</text>
                <text x="210" y="222" textAnchor="middle" fill="#6B7280" fontSize="10">4S 850mAh LiPo (14.28 Wh)</text>

                {/* Layer 4: Electronics */}
                <rect x="110" y="245" width="200" height="75" rx="8" fill="#22C55E" opacity="0.2" stroke="#22C55E" strokeWidth="2" />
                <text x="210" y="270" textAnchor="middle" fill="#22C55E" fontSize="12" fontWeight="bold">Layer 4: Electronics (PCB)</text>
                <text x="210" y="287" textAnchor="middle" fill="#6B7280" fontSize="10">ESP32 + NRF24L01</text>
                <text x="210" y="301" textAnchor="middle" fill="#6B7280" fontSize="10">MS5611, MPU9250, GPS M8N</text>

                {/* Layer 5: Camera */}
                <rect x="110" y="330" width="200" height="65" rx="8" fill="#F59E0B" opacity="0.2" stroke="#F59E0B" strokeWidth="2" />
                <text x="210" y="355" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="bold">Layer 5: Camera</text>
                <text x="210" y="372" textAnchor="middle" fill="#6B7280" fontSize="10">Foxeer Razer Mini 1200TVL</text>
                <text x="210" y="386" textAnchor="middle" fill="#6B7280" fontSize="10">DTX03 Video TX + SD</text>

                {/* Carrier Section (separate) */}
                <rect x="110" y="420" width="200" height="45" rx="8" fill="#6B7280" opacity="0.2" stroke="#6B7280" strokeWidth="2" strokeDasharray="4,4" />
                <text x="210" y="445" textAnchor="middle" fill="#6B7280" fontSize="12" fontWeight="bold">Carrier (Separates)</text>
                <text x="210" y="458" textAnchor="middle" fill="#9CA3AF" fontSize="10">2S 800mAh + ESP32 + Parachute</text>

                {/* Dimension lines */}
                <line x1="330" y1="30" x2="330" y2="395" stroke="#9CA3AF" strokeWidth="1" />
                <line x1="325" y1="30" x2="335" y2="30" stroke="#9CA3AF" strokeWidth="1" />
                <line x1="325" y1="395" x2="335" y2="395" stroke="#9CA3AF" strokeWidth="1" />
                <text x="355" y="215" fill="#9CA3AF" fontSize="11" transform="rotate(90, 355, 215)">Payload</text>

                {/* Connection indicator */}
                <line x1="210" y1="395" x2="210" y2="420" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,4" />
                <text x="240" y="410" fill="#9CA3AF" fontSize="9">Separation @200m</text>

                {/* Design philosophy callout */}
                <rect x="10" y="150" width="85" height="120" rx="6" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
                <text x="52" y="170" textAnchor="middle" fill="#374151" fontSize="9" fontWeight="bold">Design Goals</text>
                <text x="52" y="188" textAnchor="middle" fill="#6B7280" fontSize="8">Easy access</text>
                <text x="52" y="202" textAnchor="middle" fill="#6B7280" fontSize="8">Modular layers</text>
                <text x="52" y="216" textAnchor="middle" fill="#6B7280" fontSize="8">Low CoG</text>
                <text x="52" y="230" textAnchor="middle" fill="#6B7280" fontSize="8">Thermal mgmt</text>
                <text x="52" y="244" textAnchor="middle" fill="#6B7280" fontSize="8">Crash protect</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Subsystems Overview */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Subsystem Highlights</h2>

          <div className="space-y-6">
            {/* Active Landing System */}
            <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Active Landing System</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                PID-controlled counter-rotating BLDC motors reduce descent velocity and provide 10-second altitude hold capability at 150m.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                  <div className="font-semibold text-blue-600 dark:text-blue-400 mb-2">PID Controller</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Kp=15.0, Ki=0.5, Kd=8.0</p>
                  <p className="text-xs text-gray-500 mt-1">Target: 8-10 m/s descent</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                  <div className="font-semibold text-green-600 dark:text-green-400 mb-2">Safety Features</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Motors cut @5m, 150s timeout, battery monitor</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">2x 2205 BLDC</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">Counter-Rotating</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">4" Props</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">Gyro Correction</span>
              </div>
            </div>

            {/* Smoke Capsule System */}
            <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Custom Mission: Smoke Capsules</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Custom-designed 3D-printed capsules with thermos-style double-wall thermal insulation, producing colored smoke visible from &gt;500m.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                  <div className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Composition</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">60% KNO3 + 40% Sugar</p>
                  <p className="text-xs text-gray-500 mt-1">+ dye + baking soda</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                  <div className="font-semibold text-red-600 dark:text-red-400 mb-2">Performance</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">~20s burn, &gt;500m visibility</p>
                  <p className="text-xs text-gray-500 mt-1">Exterior &lt;40C</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                  <div className="font-semibold text-green-600 dark:text-green-400 mb-2">Reliability</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">100% (10/10 tests)</p>
                  <p className="text-xs text-gray-500 mt-1">Electric fuse, 100mA</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm">ABS Body</span>
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm">PETG Cap</span>
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm">3g Powder</span>
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm">BDX53C Driver</span>
              </div>
            </div>

            {/* Communication System */}
            <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Dual-Channel Communication</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Primary (WiFi - Ch.1)</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 2.412 GHz bidirectional</li>
                    <li>• Telemetry + commands</li>
                    <li>• TL-ANT2424B dish antenna</li>
                    <li>• ~1 km range</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Secondary (NRF24 - Ch.6)</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 2.437 GHz (25 MHz separation)</li>
                    <li>• Async 300KB video download</li>
                    <li>• Telemetry relay</li>
                    <li>• Bonus mission channel</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
                <h4 className="font-semibold text-pink-600 dark:text-pink-400 mb-2">Live Video</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Foxeer Razer Mini (1200TVL) + Eachine DTX03 transmitter with automatic SD card recording.
                  Received via Eachine ROTG01 FPV receiver.
                </p>
              </div>
            </div>

            {/* Flight Software */}
            <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Flight Software State Machine</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                State machine architecture with EEPROM persistence for power-loss recovery. Handles all mission phases autonomously.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-wrap gap-2 text-xs min-w-max">
                  <span className="px-3 py-1.5 bg-gray-200 dark:bg-gray-800 rounded font-medium">YERDE</span>
                  <span className="text-gray-400 self-center">→</span>
                  <span className="px-3 py-1.5 bg-blue-200 dark:bg-blue-800/50 rounded font-medium">YUKSELIS</span>
                  <span className="text-gray-400 self-center">→</span>
                  <span className="px-3 py-1.5 bg-green-200 dark:bg-green-800/50 rounded font-medium">DUSUS</span>
                  <span className="text-gray-400 self-center">→</span>
                  <span className="px-3 py-1.5 bg-purple-200 dark:bg-purple-800/50 rounded font-medium">AYRILMA</span>
                  <span className="text-gray-400 self-center">→</span>
                  <span className="px-3 py-1.5 bg-yellow-200 dark:bg-yellow-800/50 rounded font-medium">SABIT</span>
                  <span className="text-gray-400 self-center">→</span>
                  <span className="px-3 py-1.5 bg-red-200 dark:bg-red-800/50 rounded font-medium">KURTARMA</span>
                  <span className="text-gray-400 self-center">→</span>
                  <span className="px-3 py-1.5 bg-green-300 dark:bg-green-700/50 rounded font-medium">BITIS</span>
                </div>
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <strong>Critical Transitions:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• YUKSELIS → DUSUS: Altitude decreasing</li>
                    <li>• DUSUS → AYRILMA: Alt &lt; 200m</li>
                  </ul>
                </div>
                <div>
                  <strong>Safety:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• EEPROM state persistence</li>
                    <li>• KOMUT manual override mode</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Ground Station & Object Detection */}
            <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Ground Station & AI Object Detection</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Ground Station (C# WPF)</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Telemetry panel + graphs</li>
                    <li>• GPS map (GMap.NET)</li>
                    <li>• Live video feed</li>
                    <li>• 3D model visualization (HelixToolkit)</li>
                    <li>• Command buttons & manual control</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Custom Mission 2: YOLOv4-tiny</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Real-time object detection</li>
                    <li>• RarePlanes dataset (630K images)</li>
                    <li>• Aircraft detection class</li>
                    <li>• ~10 FPS processing</li>
                    <li>• Bounding box overlay</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Team TALIA 4A</h2>
          <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="font-semibold text-blue-600 dark:text-blue-400">Ali DEREYURT</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">System Lead, Mechanical, Integration</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <div className="font-semibold">Team Member</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Sensors, Altitude Stabilization</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <div className="font-semibold">Abdullah Selim KÖKSAL</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Landing Control, Electrical</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <div className="font-semibold">Abdussamet KACI</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Communication, Data Processing</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <div className="font-semibold">Nagkichan MOUSTAFA IMPRAM</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Flight Software, Testing</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <div className="font-semibold">Faruk Bera ZULALOĞLU</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Ground Station, Image Processing</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>University:</strong> Fatih Sultan Mehmet University<br />
                <strong>Team ID:</strong> 405365 • <strong>Date:</strong> March 28, 2022
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Compliance */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-8 flex-wrap">
            <div>
              <div className="text-5xl font-bold text-green-600 dark:text-green-400">39/39</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Requirements Met</div>
            </div>
            <div className="w-px h-16 bg-gray-200 dark:bg-gray-800 hidden sm:block"></div>
            <div>
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Compliance Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Access the Full Report</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Download the complete Critical Design Review document with detailed technical specifications,
            CAD drawings, circuit diagrams, software architecture, and testing plans.
          </p>
          <a
            href="/2022-muy-cdr/T-MUY2022_405365_CDR_v1.0.pdf"
            download
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CDR Report (PDF)
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">Team TALIA 4A • March 2022</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
          <p>&copy; 2022 Ali Dereyurt & Team TALIA 4A. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
