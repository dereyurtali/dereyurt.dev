'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TurksatCDR2021() {
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
              href="/2021-muy-cdr/T-MUY2021_37032_CDR_v1.0.pdf"
              download
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF (199 pages)
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
                TÜRKSAT Model Satellite Competition
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                Critical Design Review
              </span>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium">
                2021
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Model Satellite CDR Report
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-4">
              Team TALIA AEROSPACE • Team #37032 • Fatih Sultan Mehmet Foundation University
            </p>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-500">
              A comprehensive 199-page Critical Design Review documenting the complete satellite system design, from mechanical structure to flight software.
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
              <svg viewBox="0 0 800 400" className="w-full h-auto">
                {/* Background gradient for sky */}
                <defs>
                  <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a5f" />
                    <stop offset="100%" stopColor="#87CEEB" />
                  </linearGradient>
                  <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B4513" />
                    <stop offset="100%" stopColor="#654321" />
                  </linearGradient>
                </defs>

                {/* Sky background */}
                <rect x="0" y="0" width="800" height="350" fill="url(#skyGradient)" opacity="0.3" />

                {/* Ground */}
                <rect x="0" y="350" width="800" height="50" fill="url(#groundGradient)" opacity="0.5" />

                {/* Altitude markers */}
                <line x1="50" y1="50" x2="50" y2="350" stroke="#6B7280" strokeWidth="1" strokeDasharray="4,4" />
                <text x="20" y="55" fill="#6B7280" fontSize="12" fontWeight="bold">700m</text>
                <text x="20" y="130" fill="#6B7280" fontSize="12" fontWeight="bold">400m</text>
                <text x="20" y="220" fill="#6B7280" fontSize="12" fontWeight="bold">200m</text>
                <text x="20" y="345" fill="#6B7280" fontSize="12" fontWeight="bold">0m</text>

                {/* Phase 1: Deployment */}
                <g>
                  <circle cx="150" cy="60" r="20" fill="#3B82F6" opacity="0.8" />
                  <text x="150" y="65" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1</text>
                  <text x="150" y="95" textAnchor="middle" fill="#3B82F6" fontSize="11" fontWeight="bold">Deployment</text>
                  <text x="150" y="108" textAnchor="middle" fill="#6B7280" fontSize="9">700m</text>
                </g>

                {/* Descent path 1 - Passive */}
                <path d="M 170 70 Q 230 100 280 130" fill="none" stroke="#22C55E" strokeWidth="2" strokeDasharray="8,4" />
                <text x="225" y="85" fill="#22C55E" fontSize="10">Parachute</text>
                <text x="225" y="97" fill="#22C55E" fontSize="9">10-14 m/s</text>

                {/* Phase 2: Separation */}
                <g>
                  <circle cx="300" cy="130" r="20" fill="#8B5CF6" opacity="0.8" />
                  <text x="300" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2</text>
                  <text x="300" y="165" textAnchor="middle" fill="#8B5CF6" fontSize="11" fontWeight="bold">Separation</text>
                  <text x="300" y="178" textAnchor="middle" fill="#6B7280" fontSize="9">400m</text>
                </g>

                {/* Smoke trail */}
                <ellipse cx="340" cy="140" rx="15" ry="8" fill="#F97316" opacity="0.6" />
                <ellipse cx="360" cy="145" rx="12" ry="6" fill="#F97316" opacity="0.4" />
                <text x="380" y="140" fill="#F97316" fontSize="9">Smoke Capsule</text>

                {/* Descent path 2 - Active */}
                <path d="M 320 140 Q 380 180 430 220" fill="none" stroke="#EF4444" strokeWidth="2" />
                <text x="370" y="175" fill="#EF4444" fontSize="10">Autogyro</text>
                <text x="370" y="187" fill="#EF4444" fontSize="9">8-10 m/s</text>

                {/* Phase 3: Bonus Mission */}
                <g>
                  <circle cx="450" cy="220" r="20" fill="#F59E0B" opacity="0.8" />
                  <text x="450" y="225" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3</text>
                  <text x="450" y="255" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="bold">Hover</text>
                  <text x="450" y="268" textAnchor="middle" fill="#6B7280" fontSize="9">200m, 10 sec</text>
                </g>

                {/* Hover indicator */}
                <path d="M 470 215 L 485 220 L 470 225" fill="none" stroke="#F59E0B" strokeWidth="2" />
                <path d="M 485 215 L 500 220 L 485 225" fill="none" stroke="#F59E0B" strokeWidth="2" />

                {/* Descent path 3 - Final */}
                <path d="M 470 230 Q 530 280 580 340" fill="none" stroke="#EF4444" strokeWidth="2" />

                {/* Phase 4: Landing */}
                <g>
                  <circle cx="600" cy="340" r="20" fill="#22C55E" opacity="0.8" />
                  <text x="600" y="345" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">4</text>
                  <text x="600" y="375" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">Landing</text>
                  <text x="600" y="388" textAnchor="middle" fill="#6B7280" fontSize="9">Buzzer + GPS</text>
                </g>

                {/* Carrier separate path */}
                <path d="M 320 130 Q 400 200 500 350" fill="none" stroke="#6B7280" strokeWidth="1" strokeDasharray="4,4" />
                <text x="420" y="280" fill="#6B7280" fontSize="9">Carrier</text>

                {/* Telemetry waves */}
                <g opacity="0.5">
                  <path d="M 650 200 Q 680 180 720 200 Q 680 220 650 200" fill="none" stroke="#3B82F6" strokeWidth="1" />
                  <path d="M 660 190 Q 690 170 730 190" fill="none" stroke="#3B82F6" strokeWidth="1" />
                  <text x="700" y="220" fill="#3B82F6" fontSize="9">Telemetry</text>
                  <text x="700" y="232" fill="#3B82F6" fontSize="9">1 Hz</text>
                </g>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">Mission profile: Deployment → Separation → Bonus Hover → Landing</p>
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
                  Autonomous separation at 400m
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5"></span>
                  Active descent with autogyro system
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5"></span>
                  Real-time telemetry at 1 Hz
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-black rounded-3xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                Bonus Mission
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></span>
                  Hover at ~200m for 10 seconds
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></span>
                  Maintain altitude via PID control
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></span>
                  Resume descent after timeout
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></span>
                  Visual tracking via smoke capsule
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
                Team Lead & Operations Control Officer
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* System Design */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-4 flex items-center text-blue-600 dark:text-blue-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  System Design
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Model Satellite Design</li>
                  <li>• Physical Design</li>
                  <li>• Mission-Ready Compliance</li>
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
                  <li>• Payload Components & Layout</li>
                  <li>• Material Selection</li>
                  <li>• Separation Mechanism</li>
                </ul>
              </div>

              {/* Landing Control */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-4 flex items-center text-green-600 dark:text-green-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  Landing Control
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Carrier & Payload Strategy</li>
                  <li>• Landing Speed Calculations</li>
                  <li>• Bonus Mission Implementation</li>
                </ul>
              </div>

              {/* Electrical */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-4 flex items-center text-yellow-600 dark:text-yellow-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Electrical Subsystem
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Electrical Block Diagram</li>
                  <li>• Battery Specifications</li>
                  <li>• Power Budget Analysis</li>
                </ul>
              </div>

              {/* Flight Software */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-4 flex items-center text-red-600 dark:text-red-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Flight Software
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Software Architecture Design</li>
                  <li>• Development Plan</li>
                  <li>• Embedded C/C++ Implementation</li>
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
                  <li>• Budget Planning (~3500 TL)</li>
                  <li>• Project Timeline</li>
                  <li>• Integration & Testing</li>
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
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">280mm</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Height</div>
            </div>
            <div className="bg-white dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">113mm</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Outer Diameter</div>
            </div>
            <div className="bg-white dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">700g</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Target Mass</div>
            </div>
            <div className="bg-white dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">199</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Report Pages</div>
            </div>
          </div>

          {/* Payload Structure Diagram */}
          <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-semibold mb-6 text-center">Payload Layer Architecture</h3>
            <div className="flex justify-center">
              <svg viewBox="0 0 400 500" className="w-full max-w-sm h-auto">
                {/* Payload cylinder outline */}
                <defs>
                  <linearGradient id="cylinderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E5E7EB" />
                    <stop offset="50%" stopColor="#F9FAFB" />
                    <stop offset="100%" stopColor="#E5E7EB" />
                  </linearGradient>
                </defs>

                {/* Layer 1: Propulsion */}
                <rect x="100" y="30" width="200" height="60" rx="8" fill="#3B82F6" opacity="0.2" stroke="#3B82F6" strokeWidth="2" />
                <text x="200" y="55" textAnchor="middle" fill="#3B82F6" fontSize="12" fontWeight="bold">Propulsion Layer</text>
                <text x="200" y="75" textAnchor="middle" fill="#6B7280" fontSize="10">Motor, Gearbox, Propellers</text>

                {/* Layer 2: Separation */}
                <rect x="100" y="100" width="200" height="60" rx="8" fill="#8B5CF6" opacity="0.2" stroke="#8B5CF6" strokeWidth="2" />
                <text x="200" y="125" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="bold">Separation Layer</text>
                <text x="200" y="145" textAnchor="middle" fill="#6B7280" fontSize="10">Servo, Mechanism</text>

                {/* Layer 3: Visual Tracking */}
                <rect x="100" y="170" width="200" height="60" rx="8" fill="#F59E0B" opacity="0.2" stroke="#F59E0B" strokeWidth="2" />
                <text x="200" y="195" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="bold">Visual Tracking</text>
                <text x="200" y="215" textAnchor="middle" fill="#6B7280" fontSize="10">Smoke Capsule</text>

                {/* Layer 4: Power */}
                <rect x="100" y="240" width="200" height="60" rx="8" fill="#EF4444" opacity="0.2" stroke="#EF4444" strokeWidth="2" />
                <text x="200" y="265" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">Power Layer</text>
                <text x="200" y="285" textAnchor="middle" fill="#6B7280" fontSize="10">4S LiPo, ESC 30A</text>

                {/* Layer 5: Electronics */}
                <rect x="100" y="310" width="200" height="80" rx="8" fill="#22C55E" opacity="0.2" stroke="#22C55E" strokeWidth="2" />
                <text x="200" y="340" textAnchor="middle" fill="#22C55E" fontSize="12" fontWeight="bold">Electronics Layer</text>
                <text x="200" y="358" textAnchor="middle" fill="#6B7280" fontSize="10">PCB, Arduino Nano</text>
                <text x="200" y="375" textAnchor="middle" fill="#6B7280" fontSize="10">ESP32-CAM, Sensors</text>

                {/* Layer 6: Protection */}
                <rect x="100" y="400" width="200" height="50" rx="8" fill="#6B7280" opacity="0.2" stroke="#6B7280" strokeWidth="2" />
                <text x="200" y="425" textAnchor="middle" fill="#6B7280" fontSize="12" fontWeight="bold">Protection Layer</text>
                <text x="200" y="442" textAnchor="middle" fill="#9CA3AF" fontSize="10">Plexi Shield</text>

                {/* Dimension line */}
                <line x1="320" y1="30" x2="320" y2="450" stroke="#9CA3AF" strokeWidth="1" />
                <line x1="315" y1="30" x2="325" y2="30" stroke="#9CA3AF" strokeWidth="1" />
                <line x1="315" y1="450" x2="325" y2="450" stroke="#9CA3AF" strokeWidth="1" />
                <text x="340" y="245" fill="#9CA3AF" fontSize="11" transform="rotate(90, 340, 245)">261mm max</text>

                {/* Diameter indicator */}
                <line x1="100" y1="470" x2="300" y2="470" stroke="#9CA3AF" strokeWidth="1" />
                <line x1="100" y1="465" x2="100" y2="475" stroke="#9CA3AF" strokeWidth="1" />
                <line x1="300" y1="465" x2="300" y2="475" stroke="#9CA3AF" strokeWidth="1" />
                <text x="200" y="488" textAnchor="middle" fill="#9CA3AF" fontSize="11">107mm max diameter</text>
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
            {/* Sensor Subsystem */}
            <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Sensor Subsystem</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                  <div className="font-semibold text-blue-600 dark:text-blue-400 mb-2">BNO055 IMU</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">9-axis MEMS sensor for pitch, roll, yaw</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                  <div className="font-semibold text-green-600 dark:text-green-400 mb-2">NEO M8N GPS</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">High-accuracy positioning with compass</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                  <div className="font-semibold text-purple-600 dark:text-purple-400 mb-2">BMP280</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pressure & temperature, &lt;0.1m resolution</p>
                </div>
              </div>
            </div>

            {/* Active Landing System */}
            <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Active Landing System</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Innovative autogyro design with counter-rotating propellers driven by a single brushless DC motor through a custom gearbox.
                PID-controlled descent maintains 8-10 m/s velocity.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">Single BLDC Motor</span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">Counter-Rotating Props</span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">PID Controller</span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">ESC 30A</span>
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
                <h3 className="text-xl sm:text-2xl font-bold">Communication (HAVI)</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Processors</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Arduino Nano - Flight controller</li>
                    <li>• ESP32-CAM - WiFi & video</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Capabilities</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 1 Hz telemetry transmission</li>
                    <li>• Live video streaming</li>
                    <li>• 1500m WiFi range</li>
                    <li>• SD card logging</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Flight Software */}
            <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Flight Software</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                State machine architecture with EEPROM persistence for restart recovery. Handles all mission phases from deployment to landing.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <h4 className="font-semibold mb-3 text-sm">State Machine</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded">SABIT</span>
                  <span className="text-gray-400">→</span>
                  <span className="px-2 py-1 bg-blue-200 dark:bg-blue-800/50 rounded">YUKSELIS</span>
                  <span className="text-gray-400">→</span>
                  <span className="px-2 py-1 bg-green-200 dark:bg-green-800/50 rounded">DUSUS</span>
                  <span className="text-gray-400">→</span>
                  <span className="px-2 py-1 bg-purple-200 dark:bg-purple-800/50 rounded">AYRILMA</span>
                  <span className="text-gray-400">→</span>
                  <span className="px-2 py-1 bg-yellow-200 dark:bg-yellow-800/50 rounded">BONUS</span>
                  <span className="text-gray-400">→</span>
                  <span className="px-2 py-1 bg-orange-200 dark:bg-orange-800/50 rounded">AKTIF INIS</span>
                  <span className="text-gray-400">→</span>
                  <span className="px-2 py-1 bg-green-300 dark:bg-green-700/50 rounded">YERDE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Team TALIA AEROSPACE</h2>
          <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="font-semibold text-blue-600 dark:text-blue-400">Ali DEREYURT</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Team Lead, Operations Control</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <div className="font-semibold">Nagkichan MOUSTAFA IMPRAM</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Software Lead</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <div className="font-semibold">Fatma Semiha UNAL</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Electronics & Communications</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <div className="font-semibold">Team Member</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Mechanical & Analysis</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <div className="font-semibold">Ervanur MIDILLI</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Integration & Ground Station</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <div className="font-semibold">Abdullah Selim KUKSAL</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Support Engineer</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Sponsor:</strong> Bilim BEYOGLU (Beyoglu Municipality Science Center)<br />
                <strong>University:</strong> Fatih Sultan Mehmet Foundation University
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
              <div className="text-5xl font-bold text-green-600 dark:text-green-400">36/37</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Requirements Met</div>
            </div>
            <div className="w-px h-16 bg-gray-200 dark:bg-gray-800 hidden sm:block"></div>
            <div>
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">97%</div>
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
            Download the complete 199-page Critical Design Review document with detailed technical specifications,
            CAD drawings, circuit diagrams, software architecture, and testing plans.
          </p>
          <a
            href="/2021-muy-cdr/T-MUY2021_37032_CDR_v1.0.pdf"
            download
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CDR Report (PDF)
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">199 pages • 7.7 MB • Version 1.0</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
          <p>&copy; 2021 Ali Dereyurt & Team TALIA AEROSPACE. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
