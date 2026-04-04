import { useState, useEffect, useRef } from 'react';
import ChatWidget from './components/ChatWidget';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { 
      image: '/images/trophy-fishing.png',
      title: 'Seven Trophy Lakes', 
      desc: '15-acre lakes stocked with managed bass populations, perfect for world-class fishing.'
    },
    { 
      image: '/images/tree-farm.png',
      title: '800-Acre Tree Farm', 
      desc: 'Working timber operation preserving natural woodland for generations to come.'
    },
    { 
      image: '/images/deer-wildlife.png',
      title: 'Wildlife Sanctuary', 
      desc: 'High-fence deer program with native Texas whitetail roaming cathedral-like forests.'
    },
    {
      image: '/images/cattle-ranch.png',
      title: 'Working Ranch',
      desc: '200 head Black Angus cow-calf operation with 3,000+ hay bales annually.',
      objectPosition: 'right bottom'
    },
    { 
      image: '/images/creek-waterfall.png',
      title: 'Creeks & Streams', 
      desc: 'Flowing waterways carving through lush woodlands and rocky outcrops.'
    },
    { 
      image: '/images/trails-lifestyle.png',
      title: 'Miles of Trails', 
      desc: 'Walking paths winding through meadows, forests, and along pristine waterways.'
    },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 overflow-x-hidden" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      
      {/* Fonts & Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Libre+Franklin:wght@200;300;400;500&display=swap');
        
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body { font-family: 'Libre Franklin', sans-serif; }
        
        .text-gold { color: #c9a962; }
        .bg-gold { background-color: #c9a962; }
        .border-gold { border-color: #c9a962; }
        
        .animate-fade-up {
          animation: fadeUp 1s ease-out forwards;
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .stagger-1 { animation-delay: 0.1s; opacity: 0; }
        .stagger-2 { animation-delay: 0.3s; opacity: 0; }
        .stagger-3 { animation-delay: 0.5s; opacity: 0; }
        .stagger-4 { animation-delay: 0.7s; opacity: 0; }
        
        .creek-line {
          background: linear-gradient(90deg, transparent 0%, #c9a962 20%, #c9a962 80%, transparent 100%);
          height: 1px;
        }
        
        .feature-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-card:hover {
          transform: translateY(-8px);
        }

        .hero-overlay {
          background: linear-gradient(
            to bottom,
            rgba(28, 25, 23, 0.4) 0%,
            rgba(28, 25, 23, 0.6) 50%,
            rgba(28, 25, 23, 0.9) 100%
          );
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 100 ? 'bg-stone-950/95 backdrop-blur-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-display text-2xl tracking-wider">
            <span className="text-gold">W</span>OODY <span className="text-gold">C</span>REEK
          </div>
          <div className="font-body text-xs tracking-widest uppercase flex gap-8 text-stone-400 hidden md:flex">
            <a href="#story" className="hover:text-gold transition-colors">The Story</a>
            <a href="#land" className="hover:text-gold transition-colors">The Land</a>
            <a href="#experience" className="hover:text-gold transition-colors">Experience</a>
            <a href="#inquire" className="hover:text-gold transition-colors">Inquire</a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/videos/hero-flyover.mp4" type="video/mp4" />
          </video>
          {/* Fallback Image */}
          <img 
            src="/images/hero-aerial.png" 
            alt="Woody Creek Ranch aerial view"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
          />
          <div className="hero-overlay absolute inset-0"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 border border-stone-700/30 rounded-full z-10"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 border border-stone-700/20 rounded-full z-10"></div>
        
        <div className="relative z-20 text-center px-6 max-w-5xl">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-8 animate-fade-up stagger-1">
            Est. 1982 · Collin County, TX
          </p>
          
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light tracking-wide mb-6 animate-fade-up stagger-2">
            Woody Creek
            <span className="block text-4xl md:text-5xl lg:text-6xl italic text-stone-400 mt-2">Ranch</span>
          </h1>
          
          <div className="creek-line w-32 mx-auto my-10 animate-fade-up stagger-3"></div>
          
          <p className="font-body text-lg md:text-xl text-stone-300 font-light leading-relaxed max-w-2xl mx-auto animate-fade-up stagger-4">
            1,500+ acres of pristine North Texas landscape, thoughtfully preserved <br className="hidden md:block" />
            for those who understand the value of legacy.
          </p>
          
          <div className="mt-12 animate-fade-up stagger-4">
            <a href="#story" className="font-body text-xs tracking-widest uppercase border border-gold text-gold px-10 py-4 hover:bg-gold hover:text-stone-950 transition-all duration-300 inline-block">
              Discover the Land
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-500 z-20">
          <span className="font-body text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-stone-500 to-transparent"></div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="relative py-24 md:py-32 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">The Vision</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
                Where Legacy<br />
                <span className="italic text-stone-400">Meets Land</span>
              </h2>
              <div className="creek-line w-24 mb-8"></div>
              <p className="font-body text-stone-400 leading-relaxed mb-6 font-light">
                For over four decades, this remarkable property has been carefully assembled and stewarded—
                a testament to patient vision and deep respect for the land. What began in 1982 has grown
                into one of the most diverse and pristine properties in all of North Texas.
              </p>
              <p className="font-body text-stone-400 leading-relaxed font-light">
                Now, we invite a select few families to become part of this legacy. Not through subdivision,
                but through thoughtful preservation—placing homesites where they belong, while protecting
                the wild character that makes this land extraordinary.
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden rounded-sm">
                <img
                  src="/images/trails-lifestyle.png"
                  alt="Couple walking trails at Woody Creek Ranch"
                  className="absolute inset-0 w-full h-full object-cover object-left"
                />
                <div className="absolute inset-0 border border-gold/20"></div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold/10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* The Land Section - Feature Grid */}
      <section id="land" className="relative py-24 md:py-32 bg-stone-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">The Property</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              A Living <span className="italic text-stone-400">Landscape</span>
            </h2>
            <p className="font-body text-stone-500 max-w-2xl mx-auto font-light">
              Perhaps the most diverse piece of property in North Texas—lakes, creeks, woodlands,
              meadows, and working agricultural operations in perfect harmony.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card group relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={feature.objectPosition ? { objectPosition: feature.objectPosition } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl mb-2 text-white">{feature.title}</h3>
                  <p className="font-body text-sm text-stone-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div className="mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-stone-800 py-12">
            {[
              { number: '1,500+', label: 'Acres' },
              { number: '7', label: 'Private Lakes' },
              { number: '43', label: 'Years Assembled' },
              { number: '20', label: 'Minutes to Plano' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-4xl md:text-5xl text-gold mb-2">{stat.number}</div>
                <div className="font-body text-xs tracking-widest uppercase text-stone-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Image Divider */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: 'url(/images/heron-lake.png)' }}
        ></div>
        <div className="absolute inset-0 bg-stone-950/60"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <blockquote className="max-w-3xl">
            <p className="font-display text-3xl md:text-4xl lg:text-5xl font-light italic text-white leading-relaxed">
              "My desire is to preserve the land and selectively place homesites, allowing everyone to enjoy the ranch."
            </p>
            <footer className="mt-8 font-body text-sm tracking-widest uppercase text-gold">
              — Michael Fannin, Owner
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-24 md:py-32 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">The Experience</p>
              <h2 className="font-display text-4xl md:text-5xl font-light leading-tight">
                Live Within<br />
                <span className="italic text-stone-400">Nature's Embrace</span>
              </h2>
            </div>
            
            <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
              {[
                { title: 'Lakefront Estates', desc: 'Private shoreline on trophy fishing lakes, designed for those who seek waterfront serenity and world-class angling.' },
                { title: 'Creek-Side Homesites', desc: 'Nestled along flowing creeks and streams, where the sound of water becomes your daily companion.' },
                { title: 'Woodland Retreats', desc: 'Surrounded by the 800-acre tree farm, offering privacy and connection to cathedral-like forests.' },
                { title: 'Meadow Views', desc: 'Open vistas across rolling grasslands, with the full expanse of Texas sky above.' },
              ].map((item, index) => (
                <div key={index} className="border-l border-gold/30 pl-6">
                  <h3 className="font-display text-xl mb-3 text-white">{item.title}</h3>
                  <p className="font-body text-sm text-stone-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Preview */}
      <section className="py-24 md:py-32 bg-stone-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">Community</p>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Shared <span className="italic text-stone-400">Experiences</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-center">
            {[
              'Miles of Walking Trails',
              'Private Fishing Access',
              'Wildlife Viewing',
              'Equestrian Opportunities',
              'Community Events',
              'Agricultural Connection',
            ].map((amenity, index) => (
              <div key={index} className="font-body text-sm tracking-wide text-stone-400 border border-stone-800 px-6 py-3 hover:border-gold/50 hover:text-gold transition-all duration-300">
                {amenity}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="inquire" className="relative py-24 md:py-32 bg-stone-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">Begin the Conversation</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-8">
            Your Legacy <span className="italic text-stone-400">Awaits</span>
          </h2>
          <p className="font-body text-stone-400 mb-12 font-light leading-relaxed">
            Woody Creek Ranch represents a rare opportunity to become part of something
            extraordinary. For those who understand that land is not merely purchased
            but inherited by future generations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:michael@claris-ai.com?subject=Woody Creek Ranch - Schedule a Visit"
              className="font-body text-xs tracking-widest uppercase bg-gold text-stone-950 px-10 py-4 hover:bg-stone-100 transition-colors"
            >
              Schedule a Visit
            </a>
            <a
              href="mailto:michael@claris-ai.com?subject=Woody Creek Ranch - Information Request"
              className="font-body text-xs tracking-widest uppercase border border-stone-600 text-stone-300 px-10 py-4 hover:border-gold hover:text-gold transition-colors"
            >
              Request Information
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-stone-950 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="font-display text-3xl tracking-wider text-center md:text-left">
              <span className="text-gold">W</span>OODY <span className="text-gold">C</span>REEK
              <span className="block text-base italic text-stone-500 mt-1">Ranch · Collin County, TX</span>
            </div>
            
            <div className="font-body text-xs text-stone-600 text-center md:text-right">
              <p>20 Minutes North of Plano, Texas</p>
              <p className="mt-2">A Legacy Property Since 1982</p>
            </div>
          </div>
          
          <div className="creek-line w-full mt-12 mb-8 opacity-30"></div>
          
          <p className="font-body text-xs text-stone-700 text-center tracking-wide">
            © 2024 Woody Creek Ranch. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}