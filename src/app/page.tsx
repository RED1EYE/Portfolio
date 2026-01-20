'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, type Variants, AnimatePresence } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, Code, Server, Palette, ExternalLink, Menu, X } from 'lucide-react'

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Parallax effect for hero section (disabled on mobile for performance)
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Check if hovering over interactive element
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"]')
      setIsHovering(!!isInteractive)
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const scaleIn: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const slideInLeft: Variants = {
    hidden: { x: -60, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const slideInRight: Variants = {
    hidden: { x: 60, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  // Mobile menu variants
  const mobileMenuVariants: Variants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  }

  const menuItemVariants: Variants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1
      }
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Custom cursor follower - hidden on mobile */}
      <motion.div
        className="cursor-follower hidden lg:block"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 10),
          y: mousePosition.y - (isHovering ? 20 : 10),
          scale: isHovering ? 2 : 1,
        }}
        transition={{ 
          type: "spring", 
          damping: 30, 
          stiffness: 200,
          scale: { duration: 0.2 }
        }}
      />

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div 
          className="absolute top-10 right-10 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-5 sm:left-10 w-56 h-56 sm:w-80 sm:h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-accent/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div 
            className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Portfolio
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 lg:gap-8 text-sm">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item, idx) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-accent transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-64 bg-card border-l border-border md:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col p-6 pt-20 gap-6">
                {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item, idx) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-lg hover:text-accent transition-colors"
                    variants={menuItemVariants}
                    custom={idx}
                    onClick={handleNavClick}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-56 h-56 sm:w-80 sm:h-80 bg-accent/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 -left-20 sm:-left-40 w-56 h-56 sm:w-80 sm:h-80 bg-accent/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <motion.div 
          className="relative z-10 max-w-4xl text-center w-full"
          style={{ 
            y: typeof window !== 'undefined' && window.innerWidth > 768 ? heroY : 0,
            opacity: typeof window !== 'undefined' && window.innerWidth > 768 ? heroOpacity : 1
          }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Faizan Ali Sayed
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Turning ideas into reality through my code
          </motion.p>
          
          <motion.div 
            className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.a
              href="#experience"
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-accent text-accent-foreground rounded-lg flex items-center gap-2 group overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View My Experience</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-accent-foreground/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base border border-accent text-accent rounded-lg flex items-center gap-2 group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get In Touch</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-accent/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          About Me
        </motion.h2>
        
        <motion.div 
          className="p-6 sm:p-8 bg-card border border-border rounded-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleIn}
        >
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div 
              className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground order-2 md:order-1"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p variants={fadeInUp}>
                I'm a Computer Science undergraduate with a strong foundation in software engineering and system design, focused on building intelligent systems driven by artificial intelligence
              </motion.p>
              <motion.p variants={fadeInUp}>
                My work centers on developing AI-powered solutions, designing scalable systems that support intelligent decision-making, intuitive, and user-focused digital experiences. I enjoy transforming complex ideas into efficient, impactful software that balances intelligence
              </motion.p>
              <motion.p variants={fadeInUp}>
                Currently, I'm focused on continuous learning and exploring new technologies to build more capable and impactful solutions
              </motion.p>
            </motion.div>

            <motion.div 
              className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden border border-border/30 group order-1 md:order-2"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://i.ibb.co/wNBBVDdV/Photo.jpg" 
                alt="Profile description" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          Skills & Technologies
        </motion.h2>
        
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              title: 'Languages',
              skills: ['C', 'C++', 'Java', 'Javascript', 'Python'],
              icon: Code,
            },
            {
              title: 'Web Development',
              skills: ['HTML', 'Tailwind CSS', 'React', 'Canvas API', 'MYSQL'],
              icon: Server,
            },
            {
              title: 'Technical Foundation',
              skills: ['Data Structures', 'Object Oriented Programming', 'Database Management System', 'Version Control'],
              icon: Palette,
            },
          ].map((category, idx) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={idx}
                className="p-4 sm:p-6 bg-card border border-border rounded-lg group relative overflow-hidden"
                variants={fadeInUp}
                whileHover={{ y: -5, borderColor: "oklch(0.5 0.2 263 / 0.5)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-accent/5 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent size={24} className="sm:w-7 sm:h-7 text-accent" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-semibold text-accent">{category.title}</h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {category.skills.map((skill, i) => (
                      <motion.li 
                        key={i} 
                        className="text-sm sm:text-base text-muted-foreground flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.span 
                          className="w-1.5 h-1.5 bg-accent/50 rounded-full flex-shrink-0"
                          whileHover={{ scale: 2 }}
                        />
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          Experience
        </motion.h2>
        
        <motion.div 
          className="space-y-4 sm:space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              company: 'Institute of Judicial Administration Lushoto',
              role: 'Project Intern',
              period: 'Jul 2025 - Aug 2025',
              description: ' Developed a Hostel Room Allotment System that automated room allocation for over 1000+ students while integrating real-time tracking and admin dashboard, improving hostel occupancy visibility and decision-making.',
              logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQH8fxapTcXNdg/company-logo_200_200/company-logo_200_200/0/1722665741506?e=1770249600&v=beta&t=8k1knks-kCVMO3JocKVQ8jemcIv62iIY2a_XpzkcLgY',
            },
            {
              company: 'IAESTE INDIA',
              role: 'Head of Administration',
              period: 'Jun 2024 - Jun 2025',
              description: 'Managed the global internship cycle for 500+ applicants, releasing 800+ offers and placing 110 interns worldwide achieving a 22% conversion rate while overseeing 7 local committees.',
              logo: 'https://media.licdn.com/dms/image/v2/C510BAQGlzNKvG4F4qg/company-logo_200_200/company-logo_200_200/0/1630630748730/iaeste_india_logo?e=1770249600&v=beta&t=bP-XBUdCtOHWqD1G2ZCI_540ixTfEI5T_QiC4SKkcNo',
            },
          ].map((exp, idx) => (
            <motion.div
              key={idx}
              className="group p-4 sm:p-6 bg-card border border-border rounded-lg relative overflow-hidden"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, borderColor: "oklch(0.5 0.2 263 / 0.5)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-accent/5"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 relative z-10">
                <motion.div 
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={exp.logo || "/placeholder.svg"}
                    alt={exp.company}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-border/50"
                  />
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold group-hover:text-accent transition-colors break-words"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {exp.company}
                  </motion.h3>
                  <p className="text-accent text-base sm:text-lg font-semibold mb-1">{exp.role}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3">{exp.period}</p>
                  <motion.p 
                    className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {exp.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          Projects
        </motion.h2>
        
        <motion.div 
          className="grid sm:grid-cols-2 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {[
            {
              title: 'JARVIS Voice Activated AI Assistant',
              description:
                'Developed a voice-activated AI assistant processing commands with real-time speech recognition and JSON-based action parsing.',
              tags: ['Langchain', 'Qwen3:4B', 'SpeechRecognition', 'Pytorch','Porcupine','TTS','Ollama'],
              link: 'https://github.com/RED1EYE/JARVIS-Voice-Activated-AI-Assistant',
            },
            {
              title: 'Collaborative Canvas',
              description:
                'A multi-user collaborative drawing application built with vanilla JavaScript, HTML5 Canvas API, and WebSocket for real-time synchronization.',
              tags: ['Canvas API', 'Vanilla JavaScript', 'WebSocket', 'Node.js','Express.js'],
              link: 'https://redeye-fribble.onrender.com/',
            },
            {
              title: 'Text Summarizer & FAQ Generator',
              description:
                'An intelligent, privacy-focused text processing engine that leverages transformer-based models to deliver rapid, local summarization and automated FAQ generation for large-scale documents.',
              tags: ['Streamlit', 'Python', 'Rest API', 'Ollama','Langchain'],
              link: 'https://github.com/RED1EYE/Text-Summarizer-and-FAQ-generator',
            },
            {
              title: 'SAHAS - AI Emergency Chatbot for Flood Safety',
              description:
                'Developed "Sahas," an AI-powered emergency chatbot featuring automatic location detection and real-time navigation routing to provide critical safety guidance and hospital access during flood disasters.',
              tags: ['Streamlit', 'Python', 'Langchain', 'Google Maps API','Groq API'],
              link: 'https://red1eye-flood-detection-and-safety-route-test2-aamznq.streamlit.app/',
            },
          ].map((project, idx) => (
            <motion.div
              key={idx}
              className="group relative bg-card border border-border rounded-lg overflow-hidden"
              variants={fadeInUp}
              whileHover={{ y: -10, borderColor: "oklch(0.5 0.2 263 / 0.5)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-accent/5"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              <div className="relative p-4 sm:p-6 z-10">
                <motion.h3 
                  className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-accent transition-colors"
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  className="text-sm sm:text-base text-muted-foreground mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {project.description}
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  initial="hidden"
                  whileInView="visible"
                  variants={staggerContainer}
                  viewport={{ once: true }}
                >
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full text-xs sm:text-sm"
                      variants={{
                        hidden: { scale: 0, opacity: 0 },
                        visible: { scale: 1, opacity: 1 }
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
                
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm sm:text-base text-accent group/link"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  View Project 
                  <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div 
          className="p-6 sm:p-8 bg-card border border-border rounded-lg mb-8 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleIn}
        >
          <div className="text-center mb-6 sm:mb-8">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              Get In Touch
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-base sm:text-lg"
              variants={fadeInUp}
            >
              I'd love to hear from you. Let's create something amazing together.
            </motion.p>
          </div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
            variants={staggerContainer}
          >
            {[
              {
                icon: Mail,
                title: 'Email',
                value: 'faizanalifas@gmail.com',
                href: 'mailto:faizanalifas@gmail.com'
              },
              {
                icon: Linkedin,
                title: 'LinkedIn',
                value: 'Faizan Ali Sayed',
                href: 'https://www.linkedin.com/in/faizan-ali-sayed/'
              },
              {
                icon: Github,
                title: 'GitHub',
                value: 'RED1EYE',
                href: 'https://github.com/RED1EYE'
              }
            ].map((contact, idx) => {
              const IconComponent = contact.icon
              return (
                <motion.a
                  key={idx}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-4 sm:p-6 bg-card border border-border rounded-lg text-center group relative overflow-hidden"
                  variants={fadeInUp}
                  whileHover={{ y: -5, borderColor: "oklch(0.5 0.2 263 / 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-accent/5"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div
                    className="relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent size={28} className="sm:w-8 sm:h-8 mx-auto mb-4 text-accent" />
                  </motion.div>
                  
                  <h3 className="font-semibold mb-2 relative z-10 text-sm sm:text-base">{contact.title}</h3>
                  <p className="text-muted-foreground relative z-10 text-xs sm:text-sm break-all">{contact.value}</p>
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>

        <motion.div 
          className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="mailto:faizanalifas@gmail.com"
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-accent text-accent-foreground rounded-lg font-semibold relative overflow-hidden group text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Get in Touch</span>
            <motion.div
              className="absolute inset-0 bg-accent-foreground/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          
          <motion.a
            href="https://drive.google.com/file/d/18MVCE8evy-FVyMmiwkYADKrfkbNFDW_Y/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-secondary text-secondary-foreground rounded-lg font-semibold border border-border relative overflow-hidden group text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Resume</span>
            <motion.div
              className="absolute inset-0 bg-accent/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="border-t border-border py-6 sm:py-8 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm sm:text-base">
          <p>© 2024 Faizan. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  )
}
