'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  image?: string;
  skills: {
    category: string;
    items: string[];
  }[];
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      // Smooth scroll to skills section when project is selected
      setTimeout(() => {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
          skillsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [selectedProject]);

  const projects: Project[] = [
    {
      title: "ML Surface Roughness Predictor",
      description: "An intelligent additive manufacturing solution that predicts surface quality and optimizes 3D printing parameters using physics-informed machine learning.",
      tech: ["Machine Learning", "React", "FastAPI", "AWS"],
      link: "/parameter",
      skills: [
        {
          category: "AI & Machine Learning",
          items: [
            "Gradient Boosting Regressor (R² = 0.9917)",
            "Physics-Informed ML with Monotonic Constraints",
            "Computer Vision with Claude 4.5 Sonnet API",
            "5-Fold Cross-Validation & LOOCV",
            "Predictive Modeling (GBR, Random Forest, SVR)"
          ]
        },
        {
          category: "Full-Stack Development",
          items: [
            "React 18 & TypeScript SPA",
            "FastAPI (Python 3.11) Asynchronous API",
            "Three.js & React Three Fiber (3D Visualization)",
            "Zustand State Management",
            "TailwindCSS Responsive Design"
          ]
        },
        {
          category: "Manufacturing & Engineering",
          items: [
            "PrusaSlicer CLI Integration",
            "Double-Lock Adaptive Cusp Filtering (DL-ACF)",
            "Mitutoyo Surftest SJ-500 Metrology",
            "Trimesh Geometric Validation",
            "FDM 3D Printing Process Optimization"
          ]
        },
        {
          category: "Cloud & DevOps",
          items: [
            "AWS EC2 (t3.flex.large) Deployment",
            "Docker Containerization",
            "Ubuntu 22.04 LTS Server",
            "Production-Ready Infrastructure",
            "CI/CD Pipeline"
          ]
        },
      ],
    },
    // Add more projects here
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex gap-4 sm:gap-8 text-sm sm:text-base">
              <a href="#main" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                Main
              </a>
              <a href="#projects" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                Projects
              </a>
              <a href="#contact" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="main" className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1
              className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Ali Dereyurt
            </h1>
            <p
              className={`text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-4 transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Computer Engineering Student
            </p>
            <p
              className={`text-base sm:text-lg text-gray-500 dark:text-gray-500 transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              4th Year at Fatih Sultan Mehmet Vakıf University • Istanbul, Turkey
            </p>
          </div>

          {/* Profile Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Education & Profile */}
            <div className="bg-white dark:bg-gray-900/50 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Education & Profile</h3>
              <ul className="space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span><strong>Degree:</strong> Computer Engineering, FSMVU</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span><strong>Languages:</strong> English (C1), Turkish (Native)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span><strong>Location:</strong> Ümraniye, Istanbul</span>
                </li>
              </ul>
            </div>

            {/* Experience */}
            <div className="bg-white dark:bg-gray-900/50 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Experience</h3>
              <ul className="space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span><strong>Manufacturing Engineer</strong> @ 3DOIT (2024-2025)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span><strong>Intern</strong> @ TÜRKSAT Satellite R&D</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span><strong>Instructor</strong> @ T3 Foundation</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span><strong>Part-time Student</strong> @ ALUTEAM</span>
                </li>
              </ul>
            </div>

            {/* Technical Skills */}
            <div className="bg-white dark:bg-gray-900/50 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 sm:col-span-2 lg:col-span-1">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Technical Skills</h3>
              <ul className="space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span><strong>Programming:</strong> Java, C++, JavaScript, Python</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span><strong>Design:</strong> Autodesk Fusion 360</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span><strong>Management:</strong> Trello, Asana, Slack, Notion</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Leadership & Competitions - Highlighted Section */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 sm:p-10 border-2 border-blue-200 dark:border-blue-800 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Leadership & Competitions
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Proven track record in competitive environments and team leadership
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🏆</span>
                  Competitions
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-0.5">4×</span>
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">TÜRKSAT Model Satellite Competition</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Team Leader & Mechanical Design (2019-2021)</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">ROKETSAN/TÜBİTAK Rocket Competition</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Payload Design Engineer</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">NASA CanSat Competition</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Team Member</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <span className="text-2xl mr-2">👥</span>
                  Leadership
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-0.5">4×</span>
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">Club President</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Next Generation R&D Student Club</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Served 4 consecutive terms</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 sm:mb-16 text-center">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className={`group bg-white dark:bg-black rounded-3xl p-6 sm:p-8 hover:scale-105 active:scale-95 transition-all duration-500 border-2 cursor-pointer ${
                  selectedProject?.title === project.title
                    ? 'border-blue-500 dark:border-blue-400'
                    : 'border-gray-200 dark:border-gray-800'
                } ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300"></div>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3">{project.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  {project.link && (
                    <Link
                      href={project.link}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Learn more
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  )}
                  {project.title === "ML Surface Roughness Predictor" && (
                    <a
                      href="http://16.171.144.150"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      Go to Application
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Only shown when project is selected */}
      {selectedProject && (
        <section id="skills" className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center">
              {selectedProject.title} - Skills & Technologies
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 sm:mb-16 text-base sm:text-lg px-4">
              Technologies and skills used in this project
            </p>
            <div className={`grid gap-6 sm:gap-8 ${selectedProject.skills.length > 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
              {selectedProject.skills.map((category, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-black rounded-3xl p-6 border border-gray-200 dark:border-gray-800 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-4">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.items.map((skill, i) => (
                      <li
                        key={i}
                        className="flex items-start text-gray-600 dark:text-gray-400 text-sm"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
            Let's Connect
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 px-4">
            Interested in working together or have a question? Feel free to reach out.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-4">
            <a
              href="mailto:ali@dereyurt.dev"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 active:bg-blue-800 transition-colors text-base sm:text-lg font-medium"
            >
              Get in Touch
            </a>
            <a
              href="https://github.com/dereyurtali"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 dark:border-gray-700 rounded-full hover:border-gray-400 dark:hover:border-gray-600 transition-colors text-base sm:text-lg font-medium"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/alidereyurt/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 dark:border-gray-700 rounded-full hover:border-gray-400 dark:hover:border-gray-600 transition-colors text-base sm:text-lg font-medium"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ali Dereyurt. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
