// src/App.js 

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Flame, Radar, Zap, ShieldCheck, ArrowRight,
  Clock, Target, Wind, Trees, Signal,
  Users, Mail, Globe
} from 'lucide-react';
import { Routes, Route, Link } from 'react-router-dom';
import Imprint from './Imprint';
import Privacy from './Privacy';

/** -----------------------------
 *  Animation presets (Framer)
 *  ----------------------------- */
const easeOut = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const floatInLeft = {
  hidden: { opacity: 0, x: -26 },
  visible: { opacity: 1, x: 0 },
};

const floatInRight = {
  hidden: { opacity: 0, x: 26 },
  visible: { opacity: 1, x: 0 },
};

function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('organization', formData.organization);
      fd.append('message', formData.message);

      const res = await fetch('https://formspree.io/f/xnjbpreq', {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', organization: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch (err) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-white font-body">
      {/* HEADER */}
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6, ease: easeOut }}
            className="flex items-center gap-2"
          >
            <motion.img
  src="/logo.png"
  alt="Averium Dynamics"
  className="w-9 h-9 object-contain translate-y-[1px]"
  style={{ display: 'block' }}
  whileHover={{ scale: 1.06 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
/>
            <span className="text-xl font-heading font-bold text-foreground">Averium Dynamics</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: 'mission', label: 'Mission' },
              { id: 'solution', label: 'Solution' },
              { id: 'team', label: 'Team' },
              { id: 'contact', label: 'Contact' },
            ].map((item, idx) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground-muted hover:text-primary transition-colors text-sm font-medium"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + idx * 0.05, duration: 0.5, ease: easeOut }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.button>
            ))}

            <motion.button
              onClick={() => scrollToSection('contact')}
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-all duration-300 text-sm font-medium"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55, ease: easeOut }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.button>
          </nav>
        </div>
      </motion.header>
{/* HERO */}
<section className="relative min-h-screen flex items-center overflow-hidden pt-20">

  {/* Background Image */}
  <motion.div
    aria-hidden
    className="absolute inset-0"
    initial={{ scale: 1.08, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: easeOut }}
  >
    <img
      src="/hero.jpg"
      alt=""
      className="w-full h-full object-cover"
    />
  </motion.div>

  {/* Smart Reading Overlay (LEFT SIDE ONLY) */}
  <div className="absolute inset-0 bg-gradient-to-r 
  from-white/75 
  via-white/45 
  to-white/10 
  md:from-white/85 
  md:via-white/50 
  md:to-transparent" />
  <div className="container mx-auto px-6 relative z-10">
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="max-w-4xl"
    >
      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.7, ease: easeOut }}
        className="text-sm font-mono uppercase tracking-widest text-black/70 mb-6"
      >

        CLIMATE INFRASTRUCTURE
      </motion.p>

      <motion.h1
        variants={fadeUp}
        transition={{ duration: 0.7, ease: easeOut }}
        className="text-5xl md:text-7xl font-bold tracking-tighter leading-none text-foreground mb-8 font-heading"
      >
        Eliminating Wildfires<br />Through Autonomous<br />Infrastructure
      </motion.h1>

      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.7, ease: easeOut }}
        className="text-lg md:text-xl leading-relaxed text-black/95 mb-10 max-w-2xl"
      >
        Averium Dynamics develops the Green Dome, an AI-driven drone system that detects wildfires in their earliest seconds and supports rapid response.
      </motion.p>

      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.7, ease: easeOut }}
        className="flex gap-4 flex-wrap"
      >
        <motion.button
          onClick={() => scrollToSection('solution')}
          className="bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 group font-medium"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Explore Our Mission
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.button
          onClick={() => scrollToSection('solution')}
          className="border-2 border-border text-foreground px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-all duration-300 font-medium"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          View Technology
        </motion.button>
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* MISSION */}
      <motion.section
        id="mission"
        className="py-20 md:py-32 bg-white"
        variants={fade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted mb-4">OUR MISSION</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6 font-heading">
              Building Scalable Autonomous Systems to Prevent Wildfires
            </h2>
            <p className="text-lg leading-relaxed text-foreground-muted">
              Our mission is to build scalable autonomous systems that prevent wildfires before they become disasters. We combine robotics, AI, and environmental engineering to protect forests, communities, and ecosystems.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {[
              { icon: Globe, text: 'Planetary Impact' },
              { icon: Wind, text: 'Climate Resilience' },
              { icon: Trees, text: 'Ecosystem Protection' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: easeOut }}
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 bg-secondary px-6 py-3 rounded-full border border-border/50"
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CHALLENGE */}
      <section className="py-20 md:py-32 bg-slate-950 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1744907529553-dc603ead4d4e?crop=entropy&cs=srgb&fm=jpg&q=85')` }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="mb-12"
          >
            <p className="text-sm font-mono uppercase tracking-widest text-gray-400 mb-4">THE CHALLENGE</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 font-heading max-w-3xl">
              The Global Wildfire Crisis
            </h2>
            <p className="text-lg leading-relaxed text-gray-300 max-w-3xl">
              Rising temperatures are creating longer fire seasons. Traditional detection methods are too slow. By the time fires are spotted, they've often grown beyond control.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { value: '70K+', label: 'Wildfires per year in the US alone' },
              { value: '10M', label: 'Acres burned annually' },
              { value: '$50B+', label: 'Economic damage per year' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                transition={{ duration: 0.55, ease: easeOut }}
                whileHover={{ y: -6 }}
                className="border border-primary/30 bg-slate-900/50 p-8 rounded-sm backdrop-blur-sm"
              >
                <div className="text-5xl font-bold mb-2 font-heading">{stat.value}</div>
                <div className="text-accent mb-2 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="text-center mb-16"
          >
            <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted mb-4">OUR SOLUTION</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6 font-heading">The Green Dome System</h2>
            <p className="text-lg leading-relaxed text-foreground-muted max-w-3xl mx-auto">
              Modular, scalable infrastructure designed for integration with fire agencies and environmental authorities.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            {[
              { icon: Radar, title: 'Autonomous Drone Stations', desc: 'Modular, self-contained drone stations deployed across high-risk zones. Always ready, always watching.', image: 'https://images.unsplash.com/photo-1488149048941-581936ced6d6?crop=entropy&cs=srgb&fm=jpg&q=85' },
              { icon: Signal, title: 'Multi-Sensor AI Detection', desc: 'Advanced AI processes thermal, optical, and environmental data to detect fires within seconds of ignition.', image: 'https://images.unsplash.com/photo-1770699197239-81b5da579f2b?crop=entropy&cs=srgb&fm=jpg&q=85' },
              { icon: Zap, title: 'Rapid Response Support', desc: 'Instant alerts to fire agencies with precise coordinates, enabling faster deployment and targeted suppression.', image: 'https://images.unsplash.com/photo-1768280511074-3b3effe7a139?crop=entropy&cs=srgb&fm=jpg&q=85' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                transition={{ duration: 0.55, ease: easeOut }}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-sm border border-border/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-48 mb-6 rounded-sm overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5, ease: easeOut }}
                  />
                </div>
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground font-heading">{item.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="text-center mb-16"
          >
            <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted mb-4">WHY IT MATTERS</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Early Detection Changes Everything
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { icon: Clock, title: 'Early Detection Saves Everything', desc: 'Fires detected in the first 30 seconds can be contained before they spread.' },
              { icon: Trees, title: 'Environmental Protection', desc: 'Protecting forests means protecting biodiversity and carbon sinks.' },
              { icon: Users, title: 'Community Safety', desc: 'Faster response means fewer evacuations and saved lives.' },
              { icon: ShieldCheck, title: 'Economic Impact', desc: 'Prevention costs a fraction of suppression.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: easeOut }}
                whileHover={{ y: -5 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-foreground-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CURRENT STAGE */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="text-center mb-16"
          >
            <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted mb-4">CURRENT STAGE</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Building the Future of Fire Prevention
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { title: 'Active R&D', desc: 'Early-stage research and development with active prototyping.' },
              { title: 'Patent Filing', desc: 'Core technology patent filing in progress.' },
              { title: 'Pilot Preparation', desc: 'Preparing for pilot deployments with fire agencies.' },
              { title: 'Engineering Foundation', desc: 'Built on deep engineering research and operational field insights.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: easeOut }}
                whileHover={{ y: -6 }}
                className="border border-border p-8 bg-white rounded-sm"
              >
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-foreground-muted">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="text-center mb-16"
          >
            <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted mb-4">LEADERSHIP</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col md:flex-row items-start gap-8 bg-slate-50 p-8 rounded-sm border border-border/50"
            >
              <div className="relative w-40 h-40 md:w-56 md:h-56 flex-shrink-0">
                <motion.img
                  src="/leo_image.jpg"
                  alt="Leo Safia"
                  className="w-full h-full rounded-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-foreground font-heading">Leo Safia</h3>
                <p className="text-primary font-medium mb-4">Founder & Systems Architect</p>
                <p className="text-foreground-muted leading-relaxed mb-4">
                  With a background in mechatronics engineering and autonomous systems, Leo leads Averium&apos;s technical vision. His expertise spans system architecture, robotics, and climate-infrastructure innovation.
                </p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                >
                  {['MECHATRONICS', 'AUTONOMOUS SYSTEMS', 'CLIMATE TECH'].map((tag, index) => (
                    <motion.span
                      key={index}
                      variants={fadeUp}
                      transition={{ duration: 0.4, ease: easeOut }}
                      whileHover={{ y: -2 }}
                      className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-medium font-mono"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 md:py-32 bg-primary text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={floatInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              <p className="text-sm font-mono uppercase tracking-widest text-emerald-200 mb-4">GET IN TOUCH</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Let&apos;s Build the Future Together</h2>
              <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                For partnerships, pilots, or collaboration opportunities, we&apos;d love to hear from you.
              </p>
              <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }} className="flex items-center gap-3 text-emerald-100">
                <Mail className="w-5 h-5" />
                <a href="mailto:info@averiumdynamics.com" className="hover:text-white transition-colors">
                  info@averiumdynamics.com
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              variants={floatInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="bg-emerald-900 p-8 rounded-sm border border-emerald-800"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-sm bg-emerald-800 border border-emerald-700 text-white placeholder-emerald-300 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-sm bg-emerald-800 border border-emerald-700 text-white placeholder-emerald-300 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Company or agency name"
                    className="w-full px-4 py-3 rounded-sm bg-emerald-800 border border-emerald-700 text-white placeholder-emerald-300 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    rows="4"
                    name="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your interest..."
                    className="w-full px-4 py-3 rounded-sm bg-emerald-800 border border-emerald-700 text-white placeholder-emerald-300 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {formStatus === 'loading' ? 'Sending...' : formStatus === 'success' ? '✓ Message Sent!' : formStatus === 'error' ? '✕ Error — Try Again' : 'Send Message'}
                  {formStatus === 'idle' && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-8">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <motion.img
  src="/logo.png"
  alt="Averium Dynamics"
  className="w-9 h-9 object-contain translate-y-[1px]"
  style={{ display: 'block' }}
  whileHover={{ scale: 1.06 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
/>
              <span className="font-heading font-semibold text-white">Averium Dynamics</span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                <Link to="/imprint" className="hover:text-white transition-colors">
                  Imprint
                </Link>
              </motion.div>

              <span className="text-gray-600">•</span>

              <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </motion.div>
            </div>

            <div className="text-sm">© {new Date().getFullYear()} Averium Dynamics</div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/imprint" element={<Imprint />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
}
