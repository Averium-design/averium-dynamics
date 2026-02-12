import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, Radar, Zap, ShieldCheck, ArrowRight, 
  Clock, Target, Wind, Trees, Signal,
  Users, Mail, Globe
} from 'lucide-react';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', organization: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-body">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">Averium</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('mission')} className="text-foreground-muted hover:text-primary transition-colors text-sm font-medium">Mission</button>
            <button onClick={() => scrollToSection('solution')} className="text-foreground-muted hover:text-primary transition-colors text-sm font-medium">Solution</button>
            <button onClick={() => scrollToSection('team')} className="text-foreground-muted hover:text-primary transition-colors text-sm font-medium">Team</button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground-muted hover:text-primary transition-colors text-sm font-medium">Contact</button>
            <button onClick={() => scrollToSection('contact')} className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-all duration-300 text-sm font-medium">Get in Touch</button>
          </nav>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center bg-gradient-to-b from-white to-slate-50 overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-5 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1768280511074-3b3effe7a139?crop=entropy&cs=srgb&fm=jpg&q=85')` }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted mb-6">CLIMATE INFRASTRUCTURE</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none text-foreground mb-8 font-heading">
              Eliminating Wildfires<br />Through Autonomous<br />Infrastructure
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-foreground-muted mb-10 max-w-2xl">
              Averium Dynamics develops the Green Dome, an AI-driven drone system that detects wildfires in their earliest seconds and supports rapid response.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button onClick={() => scrollToSection('solution')} className="bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 group font-medium">
                Explore Our Mission
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollToSection('solution')} className="border-2 border-border text-foreground px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-all duration-300 font-medium">View Technology</button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="mission" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted mb-4">OUR MISSION</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6 font-heading">Building Scalable Autonomous Systems to Prevent Wildfires</h2>
            <p className="text-lg leading-relaxed text-foreground-muted">Our mission is to build scalable autonomous systems that prevent wildfires before they become disasters. We combine robotics, AI, and environmental engineering to protect forests, communities, and ecosystems.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: Globe, text: 'Planetary Impact' },
              { icon: Wind, text: 'Climate Resilience' },
              { icon: Trees, text: 'Ecosystem Protection' },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="flex items-center gap-3 bg-secondary px-6 py-3 rounded-full border border-border/50">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1744907529553-dc603ead4d4e?crop=entropy&cs=srgb&fm=jpg&q=85')` }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-gray-400 mb-4">THE CHALLENGE</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 font-heading max-w-3xl">The Global Wildfire Crisis</h2>
            <p className="text-lg leading-relaxed text-gray-300 max-w-3xl">Rising temperatures are creating longer fire seasons. Traditional detection methods are too slow. By the time fires are spotted, they've often grown beyond control.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: '70K+', label: 'Wildfires per year in the US alone' },
              { value: '10M', label: 'Acres burned annually' },
              { value: '$50B+', label: 'Economic damage per year' },
            ].map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="border border-primary/30 bg-slate-900/50 p-8 rounded-sm backdrop-blur-sm">
                <div className="text-5xl font-bold mb-2 font-heading">{stat.value}</div>
                <div className="text-accent mb-2 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted mb-4">OUR SOLUTION</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6 font-heading">The Green Dome System</h2>
            <p className="text-lg leading-relaxed text-foreground-muted max-w-3xl mx-auto">Modular, scalable infrastructure designed for integration with fire agencies and environmental authorities.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Radar, title: 'Autonomous Drone Stations', desc: 'Modular, self-contained drone stations deployed across high-risk zones. Always ready, always watching.', image: 'https://images.unsplash.com/photo-1488149048941-581936ced6d6?crop=entropy&cs=srgb&fm=jpg&q=85' },
              { icon: Signal, title: 'Multi-Sensor AI Detection', desc: 'Advanced AI processes thermal, optical, and environmental data to detect fires within seconds of ignition.', image: 'https://images.unsplash.com/photo-1770699197239-81b5da579f2b?crop=entropy&cs=srgb&fm=jpg&q=85' },
              { icon: Zap, title: 'Rapid Response Support', desc: 'Instant alerts to fire agencies with precise coordinates, enabling faster deployment and targeted suppression.', image: 'https://images.unsplash.com/photo-1768280511074-3b3effe7a139?crop=entropy&cs=srgb&fm=jpg&q=85' },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white p-8 rounded-sm border border-border/50 hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-48 mb-6 rounded-sm overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground font-heading">{item.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted mb-4">LEADERSHIP</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-8 bg-slate-50 p-8 rounded-sm border border-border/50">
              <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1758535768411-13b8802d6731?crop=entropy&cs=srgb&fm=jpg&q=85" alt="Leo Safia" className="w-full h-full rounded-full object-cover grayscale" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-foreground font-heading">Leo Safia</h3>
                <p className="text-primary font-medium mb-4">Founder & Systems Architect</p>
                <p className="text-foreground-muted leading-relaxed mb-4">With a background in mechatronics engineering and autonomous systems, Leo leads Averium's technical vision. His expertise spans system architecture, robotics, and climate-infrastructure innovation.</p>
                <div className="flex flex-wrap gap-2">
                  {['MECHATRONICS', 'AUTONOMOUS SYSTEMS', 'CLIMATE TECH'].map((tag, index) => (
                    <span key={index} className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-medium font-mono">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 md:py-32 bg-primary text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
              <p className="text-sm font-mono uppercase tracking-widest text-emerald-200 mb-4">GET IN TOUCH</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Let's Build the Future Together</h2>
              <p className="text-emerald-100 text-lg mb-8 leading-relaxed">For partnerships, pilots, or collaboration opportunities, we'd love to hear from you.</p>
              <div className="flex items-center gap-3 text-emerald-100">
                <Mail className="w-5 h-5" />
                <a href="mailto:info@averiumdynamics.com" className="hover:text-white transition-colors">info@averiumdynamics.com</a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="bg-emerald-900 p-8 rounded-sm border border-emerald-800">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className="w-full px-4 py-3 rounded-sm bg-emerald-800 border border-emerald-700 text-white placeholder-emerald-300 focus:outline-none focus:border-white transition-colors" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className="w-full px-4 py-3 rounded-sm bg-emerald-800 border border-emerald-700 text-white placeholder-emerald-300 focus:outline-none focus:border-white transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Organization</label>
                  <input type="text" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} placeholder="Company or agency name" className="w-full px-4 py-3 rounded-sm bg-emerald-800 border border-emerald-700 text-white placeholder-emerald-300 focus:outline-none focus:border-white transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea rows="4" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your interest..." className="w-full px-4 py-3 rounded-sm bg-emerald-800 border border-emerald-700 text-white placeholder-emerald-300 focus:outline-none focus:border-white transition-colors resize-none"></textarea>
                </div>

                <button type="submit" disabled={formStatus === 'loading'} className="w-full bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center gap-2 group">
                  {formStatus === 'loading' ? 'Sending...' : formStatus === 'success' ? '✓ Message Sent!' : 'Send Message'}
                  {formStatus === 'idle' && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-gray-400 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-semibold text-white">Averium Dynamics</span>
            </div>
            <div className="text-sm">© 2025 Averium Dynamics</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
