import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Users, 
  Home, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  Globe, 
  ArrowRight,
  Target,
  Zap,
  Award,
  BarChart3,
  Layout
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LOGO_URL = "https://www.hello-easyroom.it/wp-content/uploads/2025/04/cropped-easyroom-logo-verticale-senza-sfondo-300x266.png";

const SLIDES = [
  // SLIDE 1: TITLE
  {
    id: 1,
    type: 'hero',
    title: 'Easy Room',
    subtitle: 'Partnership B2B per Agenzie Immobiliari',
    description: 'Domanda + Offerta + Operatività Immediata',
    author: 'Filippo Del Vecchio',
    role: 'Founder & CEO',
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920',
  },
  // SLIDE 2: IL PROBLEMA
  {
    id: 2,
    type: 'split',
    title: 'Il Problema del Settore',
    points: [
      { label: 'Acquisizione cliente', desc: 'costosa e dispersiva', icon: Target },
      { label: 'Tempo eccessivo', desc: 'per ricerca immobili', icon: Zap },
      { label: 'Disallineamento', desc: 'domanda-offerta', icon: Award },
      { label: 'Costi commerciali', desc: 'elevati per transazione', icon: BarChart3 },
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
  },
  // SLIDE 3: LA SOLUZIONE
  {
    id: 3,
    type: 'solution',
    title: 'La Soluzione Easy Room',
    highlight: 'Portiamo al partner trattative già impostate con domanda e offerta già allineate',
    cards: [
      { title: 'Studenti Profilati', desc: 'In ricerca attiva e qualificata', icon: Users },
      { title: 'Immobili Validati', desc: 'Controllati e pronti all\'uso', icon: Home },
      { title: 'Match Effettuato', desc: 'Domanda-offerta già allineata', icon: CheckCircle2 },
    ]
  },
  // SLIDE 4: COSA GENERA EASY ROOM
  {
    id: 4,
    type: 'dual-gradient',
    title: 'Cosa Generiamo per Voi',
    blocks: [
      { 
        title: 'Domanda Qualificata', 
        desc: 'Studenti italiani e internazionali verificati e pronti alla locazione immediata',
        icon: Users,
        gradient: 'from-blue-600 to-blue-800'
      },
      { 
        title: 'Offerta Validata', 
        desc: 'Immobili controllati, arredati e perfettamente idonei per student housing',
        icon: Home,
        gradient: 'from-slate-800 to-slate-950'
      }
    ]
  },
  // SLIDE 5: COSA CHIEDIAMO AL PARTNER
  {
    id: 5,
    type: 'split-reverse',
    title: 'Cosa Chiediamo al Partner',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000',
    list: [
      'Gestione visite immobiliari',
      'Supporto burocratico e contrattuale',
      'Formalizzazione operativa intermediazioni'
    ]
  },
  // SLIDE 6: I VANTAGGI PER IL PARTNER
  {
    id: 6,
    type: 'grid',
    title: 'Vantaggi Concreti per il Partner',
    items: [
      { title: 'Zero Costi Acquisizione', desc: 'Nessun investimento in marketing o lead generation', icon: TrendingUp },
      { title: 'Tempi Ridotti', desc: 'Riduzione drastica tempi di intermediazione', icon: Zap },
      { title: 'Trattative Qualificate', desc: 'Operazioni già pronte e validate', icon: CheckCircle2 },
      { title: 'Marginalità Elevata', desc: 'Alto profitto su operazioni rapide', icon: Award },
    ]
  },
  // SLIDE 7: IL MODELLO OPERATIVO
  {
    id: 7,
    type: 'process',
    title: 'Come Funziona il Processo',
    steps: [
      'Easy Room identifica studente + immobile',
      'Match preliminare domanda-offerta',
      'Trasferimento operazione al partner',
      'Partner chiude la trattativa'
    ]
  },
  // SLIDE 8: PARTNERSHIP STRATEGICHE
  {
    id: 8,
    type: 'partners',
    title: 'Partnership Consolidate',
    partners: [
      { name: 'LUISS', desc: 'Accesso diretto alla community studentesca', icon: '🎓' },
      { name: 'Coldwell Banker', desc: 'Gruppo Bodini - Network immobiliare', icon: '🏢' },
      { name: 'Network Legale', desc: 'Commercialisti e legali specializzati', icon: '⚖️' },
      { name: 'Moodie Agency', desc: 'Agenzia comunicazione e marketing', icon: '📱' },
    ]
  },
  // SLIDE 9: MERCATO E COVERAGE
  {
    id: 9,
    type: 'coverage',
    title: 'Presenza Territoriale e Espansione',
    locations: [
      { city: 'Roma', status: 'Operativi', address: 'Via Guido D\'Arezzo 47', color: '#10b981' },
      { city: 'Milano', status: 'Apertura 2026', address: 'Expansion Phase', color: '#f59e0b' },
      { city: 'Firenze', status: 'Prossima espansione', address: 'Strategic Target', color: '#8b5cf6' },
    ],
    footer: 'Modello scalabile e replicabile in tutte le città universitarie italiane'
  },
  // SLIDE 10: IL MERCATO STUDENT HOUSING
  {
    id: 10,
    type: 'market',
    title: 'Opportunità di Mercato',
    stats: [
      { value: '5%', desc: 'Student housing copre solo il 5% della domanda italiana', color: 'from-blue-600 to-blue-700' },
      { value: '60K', desc: 'Nuovi posti letto PNRR entro 2026', color: 'from-emerald-500 to-emerald-600' },
    ],
    notes: [
      '📈 Investimenti privati in forte crescita',
      '🎯 Domanda stabile e in aumento'
    ]
  },
  // SLIDE 11: TIPO DI COLLABORAZIONE
  {
    id: 11,
    type: 'split',
    title: 'Modello di Collaborazione',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000',
    list: [
      { icon: '🤝', text: 'Partnership operativa strutturata' },
      { icon: '🔄', text: 'Flusso continuo di operazioni qualificate' },
      { icon: '📊', text: 'Accordi scalabili e replicabili' },
      { icon: '💎', text: 'Revenue sharing trasparente' },
    ]
  },
  // SLIDE 12: NEXT STEPS
  {
    id: 12,
    type: 'steps',
    title: 'Prossimi Passi',
    steps: [
      { num: '1', title: 'Incontro Conoscitivo', desc: 'Presentazione operativa dettagliata' },
      { num: '2', title: 'Casi Studio', desc: 'Presentazione pipeline operazioni' },
      { num: '3', title: 'Accordo', desc: 'Definizione collaborazione' },
      { num: '🚀', title: 'Avvio Immediato', desc: 'Start operazioni qualificate', highlight: true },
    ]
  },
  // SLIDE 13: CONTATTI
  {
    id: 13,
    type: 'contact',
    title: 'Iniziamo a Collaborare',
    name: 'Filippo Del Vecchio',
    role: 'Founder & CEO',
    address: 'Via Guido D\'Arezzo 47, Roma',
    web: 'www.hello-easyroom.it'
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const downloadPDF = async () => {
    if (!slideRef.current || isDownloading) return;
    setIsDownloading(true);
    
    try {
      const pdf = new jsPDF('l', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      const canvas = await html2canvas(slideRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('EasyRoom-Partnership-B2B.pdf');
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col items-center justify-center p-4 md:p-12">
      {/* Header / Controls */}
      <div className="w-full max-w-7xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img src={LOGO_URL} alt="Easy Room Logo" className="h-16 w-auto object-contain" referrerPolicy="no-referrer" />
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div className="text-slate-400 font-semibold tracking-wider text-sm hidden sm:block">
            PARTNERSHIP B2B {currentSlide + 1} / {SLIDES.length}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={downloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-full border border-slate-200 transition-all shadow-sm font-bold text-sm disabled:opacity-50"
          >
            <Download size={18} className={isDownloading ? "animate-bounce" : ""} />
            <span>{isDownloading ? "Generando..." : "Download PDF"}</span>
          </button>
          <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-slate-200 shadow-sm">
            <button 
              onClick={prevSlide}
              className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Presentation Container */}
      <div className="w-full max-w-7xl relative">
        <div 
          ref={slideRef}
          className="bg-white slide-shadow rounded-[2.5rem] overflow-hidden aspect-presentation relative flex"
        >
          {/* Sidebar Accent */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-blue-600 z-20" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex"
            >
              {/* SLIDE CONTENT RENDERING */}
              {slide.type === 'hero' && (
                <div className="flex-1 relative flex flex-col items-center justify-center text-center p-[5cqw] overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={slide.bgImage} 
                      className="w-full h-full object-cover opacity-30" 
                      alt="background"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 premium-gradient opacity-90" />
                  </div>
                  <div className="relative z-10 max-w-[80cqw]">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/10 backdrop-blur-xl border border-white/20 px-[3cqw] py-[1.5cqw] rounded-[2cqw] mb-[3cqw] inline-block shadow-2xl"
                    >
                      <img src={LOGO_URL} alt="Logo" className="h-[8cqw] w-auto brightness-0 invert mx-auto" referrerPolicy="no-referrer" />
                    </motion.div>
                    <h1 className="slide-h1 font-black text-white mb-[1.5cqw] tracking-tight leading-none">
                      {slide.title}
                    </h1>
                    <h2 className="slide-h3 font-light text-blue-200 mb-[2cqw] tracking-wide">
                      {slide.subtitle}
                    </h2>
                    <div className="h-[0.3cqw] w-[6cqw] bg-blue-500 mx-auto mb-[2cqw] rounded-full" />
                    <p className="slide-p text-white/80 font-medium">
                      {slide.description}
                    </p>
                  </div>
                  <div className="absolute bottom-[4cqw] right-[4cqw] text-right text-white">
                    <p className="slide-h3 font-black tracking-tight">{slide.author}</p>
                    <p className="text-blue-400 font-semibold uppercase tracking-widest slide-meta">{slide.role}</p>
                  </div>
                </div>
              )}

              {slide.type === 'split' && (
                <div className="flex-1 flex flex-col md:flex-row h-full">
                  <div className="flex-1 p-[5cqw] flex flex-col justify-center">
                    <div className="flex items-center gap-[1cqw] mb-[3cqw]">
                      <div className="w-[3cqw] h-[0.3cqw] bg-blue-600 rounded-full" />
                      <h2 className="slide-h2 font-black text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-[2cqw]">
                      {slide.points?.map((p, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-[1.5cqw] group"
                        >
                          <div className="w-[4cqw] h-[4cqw] rounded-[1cqw] bg-slate-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm border border-slate-100">
                            <p.icon size="2cqw" />
                          </div>
                          <div>
                            <p className="slide-h3 font-black text-slate-900 leading-none mb-[0.5cqw]">{p.label}</p>
                            <p className="slide-p text-slate-500 font-medium">{p.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                      {slide.list?.map((item: any, i: number) => (
                        <div key={i} className="flex items-center gap-[1.5cqw] p-[1.5cqw] bg-slate-50 rounded-[1.5cqw] border border-slate-100">
                          <span className="text-[3cqw]">{item.icon}</span>
                          <span className="slide-p font-bold text-slate-800">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 relative h-full">
                    <img 
                      src={slide.image} 
                      className="w-full h-full object-cover" 
                      alt="visual"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-blue-900/10" />
                  </div>
                </div>
              )}

              {slide.type === 'solution' && (
                <div className="flex-1 p-[5cqw] flex flex-col bg-[#fcfcfc] h-full">
                  <div className="flex items-center gap-[1cqw] mb-[3cqw]">
                    <div className="w-[3cqw] h-[0.3cqw] bg-blue-600 rounded-full" />
                    <h2 className="slide-h2 font-black text-slate-900 tracking-tight">{slide.title}</h2>
                  </div>
                  <p className="slide-h3 font-medium text-slate-600 mb-[4cqw] max-w-[80cqw] leading-relaxed">
                    {slide.highlight?.split('trattative già impostate').map((part, i) => (
                      <span key={i}>
                        {part}
                        {i === 0 && <span className="text-blue-600 font-black border-b-[0.3cqw] border-blue-600/20 pb-[0.2cqw]">trattative già impostate</span>}
                      </span>
                    ))}
                  </p>
                  <div className="grid grid-cols-3 gap-[2.5cqw]">
                    {slide.cards?.map((card, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -10 }}
                        className="bg-white p-[3cqw] rounded-[2cqw] border border-slate-100 shadow-xl relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 w-[8cqw] h-[8cqw] bg-blue-50 rounded-bl-[4cqw] -mr-[2cqw] -mt-[2cqw] group-hover:bg-blue-600 transition-colors duration-500" />
                        <card.icon className="text-blue-600 mb-[2cqw] relative z-10 group-hover:text-white transition-colors duration-500" size="3.5cqw" />
                        <h3 className="slide-h3 font-black mb-[1cqw] relative z-10">{card.title}</h3>
                        <p className="slide-p text-slate-500 font-medium relative z-10 leading-relaxed">{card.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === 'dual-gradient' && (
                <div className="flex-1 flex flex-col p-[5cqw] h-full">
                  <h2 className="slide-h2 font-black text-slate-900 mb-[4cqw] text-center tracking-tight">{slide.title}</h2>
                  <div className="flex-1 flex gap-[2.5cqw]">
                    {slide.blocks?.map((block, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex-1 rounded-[3cqw] p-[4cqw] text-white shadow-2xl flex flex-col justify-center bg-gradient-to-br relative overflow-hidden",
                          block.gradient
                        )}
                      >
                        <div className="absolute -right-[5cqw] -bottom-[5cqw] opacity-10">
                          <block.icon size="20cqw" />
                        </div>
                        <block.icon size="4cqw" className="mb-[2.5cqw] opacity-80" />
                        <h3 className="slide-h3 font-black mb-[1.5cqw] tracking-tight">{block.title}</h3>
                        <p className="slide-p opacity-90 leading-relaxed font-medium">{block.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === 'split-reverse' && (
                <div className="flex-1 flex flex-col md:flex-row-reverse h-full">
                  <div className="flex-1 p-[5cqw] flex flex-col justify-center">
                    <div className="flex items-center gap-[1cqw] mb-[3cqw]">
                      <div className="w-[3cqw] h-[0.3cqw] bg-blue-600 rounded-full" />
                      <h2 className="slide-h2 font-black text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>
                    <div className="space-y-[1.5cqw]">
                      {slide.list?.map((item, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-[1.5cqw] p-[2cqw] bg-slate-50 rounded-[2cqw] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-300"
                        >
                          <div className="w-[3cqw] h-[3cqw] rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                            <ArrowRight size="1.5cqw" />
                          </div>
                          <span className="slide-p font-bold text-slate-800">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 relative h-full">
                    <img 
                      src={slide.image} 
                      className="w-full h-full object-cover" 
                      alt="visual"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}

              {slide.type === 'grid' && (
                <div className="flex-1 p-[5cqw] flex flex-col h-full">
                  <h2 className="slide-h2 font-black text-slate-900 mb-[4cqw] text-center tracking-tight">{slide.title}</h2>
                  <div className="grid grid-cols-2 gap-[2.5cqw] flex-1">
                    {slide.items?.map((item, i) => (
                      <div key={i} className="bg-slate-50 p-[3cqw] rounded-[2.5cqw] border-t-[0.5cqw] border-blue-600 flex items-start gap-[2cqw] shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                        <div className="bg-blue-50 p-[1.5cqw] rounded-[1.5cqw]">
                          <item.icon className="text-blue-600" size="2.5cqw" />
                        </div>
                        <div>
                          <h3 className="slide-h3 font-black mb-[1cqw] text-slate-900">{item.title}</h3>
                          <p className="slide-p text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === 'process' && (
                <div className="flex-1 p-[5cqw] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 h-full">
                  <h2 className="slide-h2 font-black text-slate-900 mb-[5cqw] tracking-tight">{slide.title}</h2>
                  <div className="flex items-center justify-center gap-[1.5cqw] w-full max-w-[90cqw]">
                    {slide.steps?.map((step, i) => (
                      <div key={i} className="flex items-center gap-[1.5cqw] flex-1">
                        <div className="flex flex-col items-center text-center">
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className={cn(
                              "w-[6cqw] h-[6cqw] rounded-full flex items-center justify-center slide-h3 font-black mb-[1.5cqw] shadow-2xl border-[0.3cqw] border-white",
                              i === 3 ? "bg-emerald-500 text-white" : "bg-blue-600 text-white"
                            )}
                          >
                            {i === 3 ? "✓" : i + 1}
                          </motion.div>
                          <p className="slide-p font-black text-slate-800 leading-tight">{step}</p>
                        </div>
                        {i < 3 && <div className="text-blue-200 slide-h3 font-black mb-[3cqw]">→</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === 'partners' && (
                <div className="flex-1 p-[5cqw] flex flex-col h-full">
                  <h2 className="slide-h2 font-black text-slate-900 mb-[4cqw] tracking-tight">{slide.title}</h2>
                  <div className="grid grid-cols-2 gap-[2cqw]">
                    {slide.partners?.map((p, i) => (
                      <div key={i} className="bg-white p-[3cqw] rounded-[2.5cqw] shadow-xl border border-slate-100 flex items-center gap-[2cqw] group hover:bg-blue-600 transition-all duration-500">
                        <div className="text-[4cqw] group-hover:scale-110 transition-transform duration-500">{p.icon}</div>
                        <div>
                          <h3 className="slide-h3 font-black text-blue-600 mb-[0.5cqw] group-hover:text-white transition-colors duration-500">{p.name}</h3>
                          <p className="slide-p text-slate-500 font-medium group-hover:text-blue-100 transition-colors duration-500">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === 'coverage' && (
                <div className="flex-1 p-[5cqw] flex flex-col bg-slate-50 h-full">
                  <h2 className="slide-h2 font-black text-slate-900 mb-[4cqw] tracking-tight">{slide.title}</h2>
                  <div className="flex gap-[2cqw] mb-[4cqw]">
                    {slide.locations?.map((loc, i) => (
                      <div key={i} className="flex-1 bg-white p-[3cqw] rounded-[2.5cqw] shadow-2xl border-b-[0.5cqw] border-transparent transition-all duration-300 hover:-translate-y-2" style={{ borderBottomColor: loc.color }}>
                        <h3 className="slide-h3 font-black mb-[1cqw]" style={{ color: loc.color }}>{loc.city}</h3>
                        <div className="flex items-center gap-[0.5cqw] mb-[1cqw]">
                          <div className="w-[0.8cqw] h-[0.8cqw] rounded-full animate-pulse" style={{ backgroundColor: loc.color }} />
                          <p className="font-black text-slate-900 uppercase tracking-widest slide-meta">{loc.status}</p>
                        </div>
                        <p className="text-slate-400 font-medium slide-small">{loc.address}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto premium-gradient text-white p-[2.5cqw] rounded-[2cqw] text-center font-black slide-h3 shadow-2xl tracking-tight">
                    {slide.footer}
                  </div>
                </div>
              )}

              {slide.type === 'market' && (
                <div className="flex-1 p-[5cqw] flex flex-col h-full">
                  <h2 className="slide-h2 font-black text-slate-900 mb-[4cqw] text-center tracking-tight">{slide.title}</h2>
                  <div className="grid grid-cols-2 gap-[2.5cqw] mb-[3cqw]">
                    {slide.stats?.map((stat, i) => (
                      <div key={i} className={cn("rounded-[3cqw] p-[4cqw] text-white text-center shadow-2xl bg-gradient-to-br", stat.color)}>
                        <div className="text-[6cqw] font-black mb-[1.5cqw] tracking-tighter">{stat.value}</div>
                        <p className="slide-p font-medium opacity-90">{stat.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-[1.5cqw]">
                    {slide.notes?.map((note, i) => (
                      <div key={i} className="flex-1 bg-slate-50 p-[2cqw] rounded-[2cqw] text-center font-black text-slate-800 slide-p border border-slate-100">
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === 'steps' && (
                <div className="flex-1 p-[5cqw] flex flex-col items-center justify-center bg-blue-50/50 h-full">
                  <h2 className="slide-h2 font-black text-slate-900 mb-[4cqw] tracking-tight">{slide.title}</h2>
                  <div className="grid grid-cols-2 gap-[2cqw] max-w-[90cqw] w-full">
                    {slide.steps?.map((step, i) => (
                      <div key={i} className={cn(
                        "bg-white p-[3cqw] rounded-[2.5cqw] shadow-xl text-center flex flex-col items-center transition-all duration-300 hover:shadow-2xl",
                        step.highlight && "ring-[0.5cqw] ring-emerald-500/20 border-[0.2cqw] border-emerald-500"
                      )}>
                        <div className={cn(
                          "w-[5cqw] h-[5cqw] rounded-[1.5cqw] flex items-center justify-center slide-h3 mb-[2cqw] shadow-lg",
                          step.highlight ? "bg-emerald-500 text-white" : "bg-blue-600 text-white"
                        )}>
                          {step.num}
                        </div>
                        <h3 className={cn("slide-h3 font-black mb-[1cqw]", step.highlight ? "text-emerald-600" : "text-blue-600")}>
                          {step.title}
                        </h3>
                        <p className="slide-p text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === 'contact' && (
                <div className="flex-1 relative flex flex-col items-center justify-center text-center p-[5cqw] overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 premium-gradient" />
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  </div>
                  <div className="relative z-10 w-full max-w-[70cqw]">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white p-[2.5cqw] rounded-[2.5cqw] mb-[4cqw] inline-block shadow-2xl"
                    >
                      <img src={LOGO_URL} alt="Logo" className="h-[8cqw] w-auto" referrerPolicy="no-referrer" />
                    </motion.div>
                    <h2 className="slide-h1 font-black text-white mb-[4cqw] tracking-tighter leading-none">
                      {slide.title}
                    </h2>
                    <div className="bg-white/10 backdrop-blur-2xl p-[4cqw] rounded-[3cqw] border border-white/20 text-white shadow-2xl">
                      <p className="slide-h2 font-black mb-[0.8cqw] tracking-tight">{slide.name}</p>
                      <p className="slide-h3 text-blue-300 font-bold mb-[3cqw] uppercase tracking-widest">{slide.role}</p>
                      <div className="h-[0.1cqw] bg-white/20 mb-[3cqw]" />
                      <div className="space-y-[1.5cqw] slide-p font-medium">
                        <p className="flex items-center justify-center gap-[1cqw]">
                          <MapPin size="2cqw" className="text-blue-400" />
                          {slide.address}
                        </p>
                        <p className="flex items-center justify-center gap-[1cqw]">
                          <Globe size="2cqw" className="text-blue-400" />
                          {slide.web}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-7xl mt-12 flex gap-2">
        {SLIDES.map((_, i) => (
          <div 
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-500",
              i <= currentSlide ? "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]" : "bg-slate-200"
            )}
            onClick={() => setCurrentSlide(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Footer Instructions */}
      <div className="mt-12 text-slate-400 text-xs font-bold tracking-[0.2em] uppercase flex gap-8 items-center">
        <span className="flex items-center gap-2"><ChevronLeft size={14} /> <ChevronRight size={14} /> NAVIGAZIONE TASTIERA</span>
        <div className="w-1 h-1 bg-slate-300 rounded-full" />
        <span>EASY ROOM © 2026</span>
        <div className="w-1 h-1 bg-slate-300 rounded-full" />
        <span className="text-blue-600">PREMIUM B2B EXPERIENCE</span>
      </div>
    </div>
  );
}
