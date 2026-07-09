import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowDown } from "react-icons/fa";

// Import components from your Design System
import Container from "../common/Container";
import Button from "../common/Button";
import GlassCard from "../common/GlassCard";

// Import your JSON data
import homeData from "../../data/homepage.json";
import socialsData from "../../data/socials.json";

function Hero() {
  // Logic for the rotating roles text
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % homeData.roles.length);
    }, 3000); // Changes text every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Helper function to render the correct React Icon based on JSON string
  const getIcon = (iconName) => {
    switch (iconName) {
      case "github": return <FaGithub size={24} />;
      case "linkedin": return <FaLinkedin size={24} />;
      case "mail": return <FaEnvelope size={24} />;
      default: return <FaGithub size={24} />;
    }
  };

  // Animation variants (Fallback in case your fade.js doesn't have stagger)
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="hero" className="section" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "80px" }}>
      
      {/* Decorative Background Blurs */}
      <div style={{ position: "absolute", top: "20%", left: "10%", width: "300px", height: "300px", background: "var(--primary)", filter: "blur(150px)", opacity: 0.3, zIndex: -1, borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "10%", width: "300px", height: "300px", background: "var(--secondary)", filter: "blur(150px)", opacity: 0.3, zIndex: -1, borderRadius: "50%" }} />

      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
          
          {/* LEFT SIDE: Text Content */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            
            <motion.p variants={fadeUp} style={{ color: "var(--primary)", fontSize: "1.2rem", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase" }}>
              {homeData.greeting}
            </motion.p>
            
            <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: "800", lineHeight: "1.1", color: "var(--text)" }}>
              {homeData.name}
            </motion.h1>

            {/* Rotating Text Wrapper */}
            <motion.div variants={fadeUp} style={{ height: "40px", overflow: "hidden" }}>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentRoleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: "var(--text-light)", fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: "600" }}
                >
                  {homeData.roles[currentRoleIndex]}
                </motion.h2>
              </AnimatePresence>
            </motion.div>

            <motion.p variants={fadeUp} style={{ fontSize: "1.1rem", color: "var(--text-light)", maxWidth: "500px", lineHeight: "1.8", marginTop: "10px" }}>
              {homeData.description}
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              <a href={homeData.resume} target="_blank" rel="noreferrer">
                <Button>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <FaDownload /> Download Resume
                  </span>
                </Button>
              </a>
              <a href="#contact">
                <button style={{ padding: "14px 28px", borderRadius: "10px", background: "transparent", border: "1px solid var(--primary)", color: "var(--text)", cursor: "pointer", transition: "var(--transition)" }} onMouseOver={(e) => e.currentTarget.style.background = "rgba(124, 58, 237, 0.1)"} onMouseOut={(e) => e.currentTarget.style.background = "transparent"}>
                  Contact Me
                </button>
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "1.5rem", marginTop: "2rem" }}>
              {socialsData.map((social, index) => (
                <a key={index} href={social.url} target="_blank" rel="noreferrer" style={{ color: "var(--text-light)", transition: "var(--transition)" }} onMouseOver={(e) => { e.currentTarget.style.color = "var(--primary)"; e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseOut={(e) => { e.currentTarget.style.color = "var(--text-light)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  {getIcon(social.icon)}
                </a>
              ))}
            </motion.div>

          </motion.div>

          {/* RIGHT SIDE: Floating Profile Image inside GlassCard */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ display: "flex", justifyContent: "center" }}>
            <GlassCard>
              <motion.img
                src={homeData.profileImage}
                alt={homeData.name}
                animate={{ y: [0, -15, 0] }} // Floating animation
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ width: "100%", maxWidth: "350px", borderRadius: "50%", border: "4px solid rgba(255, 255, 255, 0.1)", objectFit: "cover", aspectRatio: "1/1", background: "var(--surface-2)" }}
              />
            </GlassCard>
          </motion.div>

        </div>

        {/* Scroll Indicator at the bottom */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: "var(--text-light)" }}>
          <span style={{ fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase" }}>Scroll</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
            <FaArrowDown />
          </motion.div>
        </motion.div>

      </Container>
    </section>
  );
}

export default Hero;