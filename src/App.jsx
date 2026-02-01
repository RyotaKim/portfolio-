import { useEffect, useRef, useState } from 'react'
import './App.css'
import profileImage from './assets/images/profile.jpg'

// Custom hook for scroll animations using Intersection Observer
function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px'
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, isVisible]
}

// Custom hook for staggered children animations
function useStaggerReveal(itemCount, delay = 150) {
  const ref = useRef(null)
  const [visibleItems, setVisibleItems] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Stagger the reveal of each item
        for (let i = 0; i < itemCount; i++) {
          setTimeout(() => {
            setVisibleItems(prev => [...prev, i])
          }, i * delay)
        }
        observer.unobserve(entry.target)
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [itemCount, delay])

  return [ref, visibleItems]
}

// Icon components (inline SVG for simplicity)
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
)

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
  </svg>
)

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
  </svg>
)

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '14px', height: '14px'}}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15,3 21,3 21,9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '16px', height: '16px'}}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

// Smooth scroll handler
const scrollToSection = (e, sectionId) => {
  e.preventDefault()
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Navigation Component
function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-links">
          <a href="#home" className="nav-link" onClick={(e) => scrollToSection(e, 'home')} aria-label="Home">
            <HomeIcon />
          </a>
          <a href="#about" className="nav-link" onClick={(e) => scrollToSection(e, 'about')} aria-label="About">
            <UserIcon />
          </a>
          <a href="#projects" className="nav-link" onClick={(e) => scrollToSection(e, 'projects')} aria-label="Projects">
            <FolderIcon />
          </a>
          <a href="#contact" className="nav-link" onClick={(e) => scrollToSection(e, 'contact')} aria-label="Contact">
            <MailIcon />
          </a>
          <a href="https://linkedin.com" className="nav-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="https://github.com" className="nav-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
        </div>
      </div>
    </nav>
  )
}

// Hero Section Component
function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className="hero section">
      <span className={`hero-badge fade-in-up ${loaded ? 'visible' : ''}`} style={{animationDelay: '0.2s'}}>
        Learning. Building. Improving.
      </span>
      <h1 className={`hero-title fade-in-up ${loaded ? 'visible' : ''}`} style={{animationDelay: '0.4s'}}>
        Designing the Modern Web.
      </h1>
      <p className={`hero-subtitle fade-in-up ${loaded ? 'visible' : ''}`} style={{animationDelay: '0.6s'}}>
        Hey, I'm Kim Sumilang, a Full Stack Developer passionate about building 
        performant, user-friendly, and scalable applications.
      </p>
      <div className={`hero-buttons fade-in-up ${loaded ? 'visible' : ''}`} style={{animationDelay: '0.8s'}}>
        <a href="#contact" className="btn btn-primary" onClick={(e) => scrollToSection(e, 'contact')}>
          👋 Let's Connect
        </a>
        <a href="#" className="btn">
          My Resume ↓
        </a>
      </div>
    </section>
  )
}

// About Section Component
function About() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.2 })
  const techStack = {
    'Web Development': ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    'Mobile Development': ['Android Studio', 'Kotlin', 'Flutter'],
    'BaaS & Cloud': ['Supabase', 'Firebase'],
    'Tools & Version Control': ['VS Code', 'Git', 'GitHub']
  }

  return (
    <section id="about" className="about section" ref={sectionRef}>
      <div className="container">
        <p className={`section-label fade-in-up ${isVisible ? 'visible' : ''}`}>GET TO KNOW ME</p>
        <h2 className={`section-title fade-in-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.1s'}}>About Me</h2>
        
        <div className={`about-content fade-in-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.2s'}}>
          <div className="about-left">
            <div className="about-image">
              <img src={profileImage} alt="Kim Sumilang" />
            </div>
            <p className="about-bio">
              Full-Stack Developer focused on creating seamless, functional digital experiences. 
              I am highly adaptable across diverse programming languages and frameworks, prioritizing 
              the right tool for the job over a fixed stack. Driven by curiosity and a commitment to 
              growth, I build scalable applications that bridge the gap between complex problems and 
              elegant solutions.
            </p>
            <div className="about-location">
              <LocationIcon />
              <span>Philippines</span>
            </div>
          </div>
          
          <div className="about-divider"></div>
          
          <div className="about-right">
            <div className="about-section-block">
              <h3>Education</h3>
              <div className="experience-item">
                <div>
                  <strong>St. Dominic College of Asia</strong>
                  <p>Currently Studying Information Technology</p>
                </div>
                <div style={{textAlign: 'right'}}>
                  <span>2023 - Present</span>
                  <p>College</p>
                </div>
              </div>
              <div className="experience-item" style={{marginTop: '1rem'}}>
                <div>
                  <strong>Holy Cross Catholic School</strong>
                  <p>STEM Strand</p>
                </div>
                <div style={{textAlign: 'right'}}>
                  <span>2021 - 2022</span>
                  <p>Senior High School</p>
                </div>
              </div>
            </div>
            
            <div className="about-section-block">
              <h3>Experience</h3>
              <div className="experience-item">
                <strong>Full-Stack & Mobile Developer</strong>
                <span>2023 — Present</span>
              </div>
              <ul className="experience-list">
                <li>End-to-End Development: Engineering seamless digital experiences across web and mobile platforms from conception to deployment.</li>
                <li>User-Centric Interfaces: Crafting performant, responsive, and reusable components designed for optimal user engagement.</li>
                <li>System Architecture: Building secure and scalable server-side logic and integrated database solutions.</li>
                <li>Technical Excellence: Ensuring high-quality code through collaborative reviews, rigorous debugging, and efficient deployment workflows.</li>
              </ul>
            </div>
            
            <div className="about-section-block">
              <h3>Tech Stack</h3>
              <div className="tech-stack-categories">
                {Object.entries(techStack).map(([category, techs]) => (
                  <div key={category} className="tech-category">
                    <span className="tech-category-label">{category}</span>
                    <div className="tech-stack">
                      {techs.map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Certificates Section Component
function Certificates() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.2 })
  const certificates = [
    {
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2024',
      icon: '☁️'
    },
    {
      title: 'Meta Front-End Developer',
      issuer: 'Meta (Coursera)',
      date: '2023',
      icon: '⚛️'
    },
    {
      title: 'Google UX Design Certificate',
      issuer: 'Google (Coursera)',
      date: '2023',
      icon: '🎨'
    },
    {
      title: 'MongoDB Developer Certification',
      issuer: 'MongoDB University',
      date: '2023',
      icon: '🍃'
    }
  ]
  const [gridRef, visibleItems] = useStaggerReveal(certificates.length, 150)

  return (
    <section id="certificates" className="certificates section" ref={sectionRef}>
      <div className="container">
        <p className={`section-label fade-in-up ${isVisible ? 'visible' : ''}`}>MY ACHIEVEMENTS</p>
        <h2 className={`section-title fade-in-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.1s'}}>Certificates & Achievements</h2>
        
        <div className="certificates-grid" ref={gridRef}>
          {certificates.map((cert, index) => (
            <div 
              key={index} 
              className={`certificate-card fade-in-up ${visibleItems.includes(index) ? 'visible' : ''}`}
            >
              <div className="certificate-icon">{cert.icon}</div>
              <h3>{cert.title}</h3>
              <p>{cert.issuer}</p>
              <span className="certificate-date">{cert.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Projects Section Component
function Projects() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 })
  const projects = [
    {
      title: 'OneLine Micro Journaling Website',
      description: 'A minimalist micro-journaling platform that helps users capture daily thoughts in one line, promoting consistent reflection and mental clarity.',
      features: [
        'Simple one-line daily journal entries',
        'Clean and intuitive user interface',
        'Personal thought tracking and history'
      ],
      tags: ['React', 'Next.js'],
      link: 'https://oneline-five.vercel.app',
      image: '/personal-project1.PNG'
    },
    {
      title: 'Barangay Information and Services System',
      description: 'A comprehensive barangay management system with integrated complaint and request analytics for efficient community service delivery.',
      features: [
        'Citizen information management',
        'Complaint and request tracking with analytics',
        'Service request processing and monitoring'
      ],
      tags: ['Flutter', 'Node.js', 'MongoDB'],
      link: 'https://brgysanjose1.vercel.app',
      image: '/baranggay project.PNG'
    },
    {
      title: 'Student Daily Task Manager',
      description: 'An Android mobile application designed to help students organize and manage their daily academic tasks and assignments efficiently.',
      features: [
        'Task creation and scheduling',
        'Daily task reminders and notifications',
        'Progress tracking and completion status'
      ],
      tags: ['Android Studio', 'Kotlin', 'Java', 'MySQL'],
      image: '/STM project.png'
    }
  ]

  // Individual refs for each project card
  const cardRefs = useRef([])
  const [visibleCards, setVisibleCards] = useState([])

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => [...new Set([...prev, index])])
            observer.unobserve(entry.target)
          }
        },
        { threshold: 0.3, rootMargin: '-50px' }
      )
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer, index) => {
        if (observer && cardRefs.current[index]) {
          observer.unobserve(cardRefs.current[index])
        }
      })
    }
  }, [])

  return (
    <section id="projects" className="projects section" ref={sectionRef}>
      <div className="container">
        <p className={`section-label fade-in-up ${isVisible ? 'visible' : ''}`}>EXPLORE MY CREATIONS</p>
        <h2 className={`section-title fade-in-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.1s'}}>Projects</h2>
        
        <div className="projects-grid projects-stacked">
          {projects.map((project, index) => (
            <div 
              key={index} 
              ref={el => cardRefs.current[index] = el}
              className={`project-card project-card-stacked ${visibleCards.includes(index) ? 'revealed' : ''}`}
              style={{
                '--stack-index': index,
                '--total-cards': projects.length
              }}
            >
              <div className="project-info">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul className="project-features">
                  {project.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.link && (
                    <a href={project.link} className="btn" target="_blank" rel="noopener noreferrer">
                      Live Site <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>
              <div className="project-preview">
                {project.image ? (
                  <img src={project.image} alt={project.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                ) : (
                  <span className="project-preview-placeholder">Project Preview</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section Component
function Contact() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.2 })
  
  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      <div className="container">
        <p className={`section-label fade-in-up ${isVisible ? 'visible' : ''}`}>GET IN TOUCH</p>
        <h2 className={`section-title fade-in-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.1s'}}>Contact Me</h2>
        
        <div className={`contact-content fade-in-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.2s'}}>
          <div className="contact-buttons">
            <a href="mailto:kim.sumilang@email.com" className="contact-btn">
              <MailIcon /> kim.sumilang@email.com
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-btn">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
          
          <p className="contact-divider">Or send a message</p>
          
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
          
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear()
  const [footerRef, isVisible] = useScrollReveal({ threshold: 0.5 })
  
  return (
    <footer className="footer" ref={footerRef}>
      <div className={`container footer-content fade-in-up ${isVisible ? 'visible' : ''}`}>
        <p>© {currentYear} Kim Sumilang. All rights reserved.</p>
        <a href="#" className="footer-link">
          Let's Connect 👋
        </a>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Certificates />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
