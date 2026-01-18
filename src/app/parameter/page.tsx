'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ParameterProject() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-block mb-6 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
              Graduating Project
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              ML Surface Roughness Predictor
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8">
              Physics-informed machine learning system for predicting surface quality and optimizing 3D printing parameters in additive manufacturing.
            </p>

            {/* Launch Application Button */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="https://parameterapp.dereyurt.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                Launch Application
              </a>
              <a
                href="/"
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-full hover:border-gray-400 dark:hover:border-gray-600 transition-colors text-lg font-medium"
              >
                Back to Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Overview</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Parameter is my graduating project that demonstrates comprehensive technical expertise
              and innovative problem-solving. This project was developed to address real-world challenges
              and showcases end-to-end development capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-2">Role</h3>
              <p className="text-gray-600 dark:text-gray-400">Lead Developer</p>
            </div>
            <div className="bg-white dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-2">Platform</h3>
              <p className="text-gray-600 dark:text-gray-400">Web Application</p>
            </div>
            <div className="bg-white dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-2">Status</h3>
              <p className="text-gray-600 dark:text-gray-400">Currently on AWS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Technologies Used</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { category: "Frontend", tech: ["React", "TypeScript", "Modern UI/UX"] },
              { category: "Backend", tech: ["Node.js", "RESTful APIs", "Authentication"] },
              { category: "Cloud", tech: ["AWS", "Cloud Infrastructure", "Scalable Architecture"] },
              { category: "Development", tech: ["Git", "CI/CD", "Testing"] },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
              >
                <h3 className="text-xl font-semibold mb-4">{item.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-white dark:bg-black rounded-full border border-gray-200 dark:border-gray-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Key Features</h2>
          <div className="space-y-6">
            {[
              {
                title: "Scalable Architecture",
                description: "Built with scalability in mind, leveraging cloud infrastructure for optimal performance.",
              },
              {
                title: "Modern Tech Stack",
                description: "Utilizing cutting-edge technologies and best practices in web development.",
              },
              {
                title: "User-Centric Design",
                description: "Focused on providing an intuitive and seamless user experience.",
              },
              {
                title: "Cloud-Native",
                description: "Deployed on AWS with robust infrastructure and security measures.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Interested in Learning More?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            I'd be happy to discuss the technical details and challenges solved in this project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:ali@dereyurt.dev"
              className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              Get in Touch
            </a>
            <Link
              href="/"
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-full hover:border-gray-400 dark:hover:border-gray-600 transition-colors text-lg font-medium"
            >
              View Other Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ali Dereyurt. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
