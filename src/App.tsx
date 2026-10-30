import React, { useState } from 'react';
import {
  Sun,
  Zap,
  TrendingDown,
  ShieldCheck,
  Award,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Mail,
  MapPin,
  ChevronRight,
  BatteryCharging,
  Leaf,
  BarChart3,
  Building2,
  Home,
  Tractor,
  Compass,
  Sparkles,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

export default function App() {
  // Estado de la calculadora interactiva
  const [monthlyBill, setMonthlyBill] = useState<number>(120000);
  const [propertyType, setPropertyType] = useState<'hogar' | 'comercio' | 'agro'>('hogar');

  // Cálculos dinámicos
  const factor = propertyType === 'hogar' ? 0.78 : propertyType === 'comercio' ? 0.82 : 0.85;
  const estimatedSavingsMonthly = Math.round(monthlyBill * factor);
  const estimatedSavingsAnnual = estimatedSavingsMonthly * 12;
  const co2AvoidedTons = ((monthlyBill / 1000) * 0.18).toFixed(1);
  const treesEquivalent = Math.round((monthlyBill / 1000) * 8.5);

  // Formulario de contacto
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLoc, setFormLoc] = useState('');
  const [formMsg, setFormMsg] = useState('');

  const sendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = `Hola Greenside! Mi nombre es ${formName || 'un interesado'}. Me contacto desde ${formLoc || 'Mendoza'} para consultar sobre un sistema solar para ${propertyType}. Mi factura aprox mensual es de $${monthlyBill.toLocaleString('es-AR')}. Mensaje: ${formMsg || 'Quisiera recibir una cotización personalizada.'}`;
    const url = `https://wa.me/5492610000000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#070b09] text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Top Banner de Mendoza */}
      <div className="bg-gradient-to-r from-emerald-950 via-green-900 to-amber-950/80 border-b border-emerald-500/20 py-2 px-4 text-center text-xs sm:text-sm font-medium text-emerald-200/90 flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Mendoza Solar 2026: Más de 300 días de sol al año para independizarte del aumento de tarifas.</span>
      </div>

      {/* Navbar Flotante */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090e0b]/80 border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Greenside Logo"
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Greenside <span className="text-emerald-400 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">Energía</span>
              </span>
              <span className="text-[10px] text-emerald-400/80 tracking-wider font-semibold uppercase">Mendoza • Argentina</span>
            </div>
          </a>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#soluciones" className="hover:text-emerald-400 transition-colors">Soluciones</a>
            <a href="#calculadora" className="hover:text-emerald-400 transition-colors">Calculá tu Ahorro</a>
            <a href="#historia" className="hover:text-emerald-400 transition-colors">Nuestra Visión</a>
            <a href="#tecnologia" className="hover:text-emerald-400 transition-colors">Tecnología</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">Preguntas</a>
          </nav>

          {/* CTA Header */}
          <div className="flex items-center gap-3">
            <a
              href="#calculadora"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10 transition-all"
            >
              Simulador
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-0.5"
            >
              <span>Pedir Presupuesto</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Glow ambient effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Texto Hero */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-medium backdrop-blur-md shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Revolución Renovable nacida en Cuyo</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-slate-400">Desde Mendoza para el País</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Transformá el poder del sol en <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">libertad energética</span>.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                En <strong className="text-emerald-400">Greenside</strong> diseñamos e instalamos sistemas solares fotovoltaicos inteligentes de máxima eficiencia. Reducí hasta un <strong>90% tu factura eléctrica</strong>, asegurá energía ininterrumpida y formá parte del cambio hacia un futuro autosustentable.
              </p>

              {/* Botones de acción */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#contacto"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-[0_10px_30px_rgba(16,185,129,0.35)] flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 text-base"
                >
                  <Sun className="w-5 h-5 text-slate-950 fill-slate-950" />
                  <span>Quiero mi Estudio Solar Gratis</span>
                </a>
                <a
                  href="#historia"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center justify-center gap-2 transition-all hover:border-emerald-500/40 text-base"
                >
                  <span>Conocer la historia</span>
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                </a>
              </div>

              {/* Badges de Confianza */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="text-left">
                  <div className="text-2xl font-bold text-white font-display">Hasta 90%</div>
                  <div className="text-xs text-slate-400">Ahorro en electricidad</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-emerald-400 font-display">25 Años</div>
                  <div className="text-xs text-slate-400">Garantía de rendimiento</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-amber-400 font-display">+300 Días</div>
                  <div className="text-xs text-slate-400">De sol en Mendoza</div>
                </div>
              </div>
            </div>

            {/* Visual Hero Card / Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow decorativo de tarjeta */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative rounded-2xl bg-gradient-to-b from-[#121c17] to-[#0c130f] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
                  {/* Header de la tarjeta */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <BatteryCharging className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Monitoreo Inteligente 24/7</h4>
                        <p className="text-xs text-slate-400">Telemetría en tiempo real</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      En vivo
                    </span>
                  </div>

                  {/* Panel Gráfico simulado */}
                  <div className="space-y-4">
                    <div className="bg-[#080d0a] p-4 rounded-xl border border-white/5 space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Generación Solar Instantánea</span>
                        <span className="text-emerald-400 font-semibold font-mono">5.8 kW</span>
                      </div>
                      <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full rounded-full w-[84%] transition-all duration-1000"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#080d0a] p-3.5 rounded-xl border border-white/5">
                        <div className="text-[11px] text-slate-400">Ahorro Estimado Mes</div>
                        <div className="text-lg font-bold text-emerald-300 font-mono mt-0.5">$96.400</div>
                        <div className="text-[10px] text-emerald-400/80 flex items-center gap-1 mt-1">
                          <TrendingDown className="w-3 h-3" /> Reducción del 82%
                        </div>
                      </div>
                      <div className="bg-[#080d0a] p-3.5 rounded-xl border border-white/5">
                        <div className="text-[11px] text-slate-400">Independencia Red</div>
                        <div className="text-lg font-bold text-amber-300 font-mono mt-0.5">91.4%</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                          <Leaf className="w-3 h-3 text-emerald-400" /> Huella cero
                        </div>
                      </div>
                    </div>

                    {/* Certificación / Garantía highlight */}
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                      <ShieldCheck className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                      <div className="text-xs">
                        <span className="font-semibold text-white">Instalación certificada y llave en mano</span>
                        <p className="text-slate-300 text-[11px]">Trámite con distribuidora eléctrica (Inyección a red - Ley 27.424)</p>
                      </div>
                    </div>
                  </div>

                  {/* Quote de Marca */}
                  <div className="pt-2 text-center text-xs text-slate-400 italic">
                    "La energía limpia no es el futuro, es el estándar del presente."
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HISTORIA DE AGUSTÍN VACA CORNEJO & GREENSIDE */}
      <section id="historia" className="py-20 md:py-28 relative bg-[#090f0c] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Foto e Ilustración de Historia */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/30 to-emerald-500/30 rounded-3xl blur-xl opacity-60"></div>
                <div className="relative rounded-2xl bg-[#111915] border border-white/10 p-6 overflow-hidden">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden relative border border-white/10 group-hover:border-emerald-500/30 transition-all">
                    <img
                      src="/agustin.jpg"
                      alt="Agustín Vaca Cornejo - Greenside"
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"></div>

                    {/* Elementos decorativos de Mendoza */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-amber-300 font-medium flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5" /> Sol Cuyano
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 space-y-1 z-10">
                      <div className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-md border border-white/20 p-1.5 flex items-center justify-center mb-1">
                        <img src="/logo.png" alt="Greenside" className="w-full h-full object-contain" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Agustín Vaca Cornejo</h4>
                      <p className="text-xs text-emerald-400 font-medium">Fundador & Impulsor Tecnológico • Greenside</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Compromiso con el desarrollo productivo y sustentable de Mendoza</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Ingeniería solar de alta fidelidad, cálculo exacto y componentes de nivel Tier-1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Texto de la Historia */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
                <Compass className="w-3.5 h-3.5" /> Nuestra Historia & Propósito
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Emprendimiento con raíz mendocina y vocación de <span className="text-emerald-400">cambiar el mundo</span>.
              </h2>

              <p className="text-base text-slate-300 leading-relaxed">
                Mendoza es una tierra bendecida por el sol: con más de 300 días despejados al año, tenemos uno de los mayores potenciales solares de América Latina. Sin embargo, hogares y empresas siguen sufriendo por costos energéticos crecientes e incertidumbre tarifaria.
              </p>

              <p className="text-base text-slate-300 leading-relaxed">
                Frente a este desafío nació <strong>Greenside</strong>, liderada por <strong>Agustín Vaca Cornejo</strong>, un joven emprendedor convencido de que la tecnología aplicada a las energías renovables es la llave para potenciar la industria local, los hogares y el agro cuyano.
              </p>

              <blockquote className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-transparent border-l-4 border-emerald-400 text-slate-200 text-sm sm:text-base italic">
                “No se trata únicamente de instalar paneles solares; se trata de democratizar la energía, dar previsibilidad económica a las familias y empresas, y edificar un modelo productivo que respete y aproveche responsablemente los recursos de nuestra provincia.”
                <span className="block not-italic text-xs text-emerald-400 font-bold mt-2">— Agustín Vaca Cornejo</span>
              </blockquote>

              <div className="pt-2 grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">Cercanía y Confianza Real</h5>
                    <p className="text-xs text-slate-400">Acompañamiento directo desde el primer plano hasta la puesta en marcha.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">Impacto Económico Inmediato</h5>
                    <p className="text-xs text-slate-400">Reducción tangible de gastos fijos para blindarte ante futuros aumentos.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CALCULADORA DE AHORRO INTERACTIVA */}
      <section id="calculadora" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" /> Simulador de Rendimiento
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Calculá cuánto podés <span className="bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">ahorrar con Greenside</span>
            </h2>
            <p className="text-slate-400 text-base">
              Ajustá tu factura promedio mensual de luz y descubrí la potencia de tu inversión solar en Mendoza.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#111a14] to-[#0a100d] border border-emerald-500/20 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              
              {/* Controles del Simulador */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                    1. Seleccioná el tipo de instalación:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'hogar', label: 'Residencial', icon: Home },
                      { id: 'comercio', label: 'Comercial', icon: Building2 },
                      { id: 'agro', label: 'Agro / Fincas', icon: Tractor },
                    ].map((type) => {
                      const Icon = type.icon;
                      const isSelected = propertyType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setPropertyType(type.id as any)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/10'
                              : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                          }`}
                        >
                          <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                          <span>{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      2. Tu gasto mensual en luz:
                    </label>
                    <span className="text-xl font-bold font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                      ${monthlyBill.toLocaleString('es-AR')} ARS
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30000"
                    max="1500000"
                    step="10000"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 hover:accent-emerald-300 transition-all"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                    <span>$30.000</span>
                    <span>$750.000</span>
                    <span>$1.500.000+</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    <strong>Ley de Generación Distribuida (Mendoza):</strong> La energía sobrante que tus paneles producen durante el día se inyecta a la red eléctrica, generando crédito a tu favor en tu factura bimestral.
                  </p>
                </div>
              </div>

              {/* Resultados del cálculo */}
              <div className="bg-[#080d0a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Ahorro estimado proyectado:</div>
                  
                  <div className="mt-3">
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono flex items-baseline gap-2">
                      <span className="text-emerald-400">${estimatedSavingsMonthly.toLocaleString('es-AR')}</span>
                      <span className="text-xs font-normal text-slate-400">/ mes</span>
                    </div>
                    <div className="text-sm text-slate-400 mt-1 font-mono">
                      Aprox. <strong className="text-white">${estimatedSavingsAnnual.toLocaleString('es-AR')} ARS</strong> al año que quedan en tu bolsillo.
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[11px] text-slate-400">CO₂ evitado al año</div>
                      <div className="text-lg font-bold text-teal-300 font-mono mt-0.5">{co2AvoidedTons} Ton</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">Equivalente en árboles</div>
                      <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{treesEquivalent} plantados</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#contacto"
                    onClick={() => {
                      setFormMsg(`Hola! Hice la simulación con una factura de $${monthlyBill.toLocaleString('es-AR')} para ${propertyType}. Me gustaría validar este ahorro.`);
                    }}
                    className="w-full py-3.5 px-4 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <span>Quiero este ahorro para mi propiedad</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="text-[10px] text-center text-slate-500 mt-2">
                    Valores orientativos sujetos a orientación, irradiación y consumo específico.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SOLUCIONES INTEGRALES */}
      <section id="soluciones" className="py-20 md:py-28 bg-[#090f0c] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5" /> Nuestros Servicios
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Ingeniería solar a la medida de tu necesidad
            </h2>
            <p className="text-slate-400 text-base">
              Desde sistemas on-grid conectados a red hasta soluciones aisladas y bombeo solar de alto rendimiento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Tarjeta 1: Residencial */}
            <div className="rounded-2xl bg-gradient-to-b from-[#121c17] to-[#0c130f] border border-white/5 hover:border-emerald-500/40 p-8 transition-all group hover:-translate-y-1 duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Sistemas Residenciales</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Protegé la economía familiar de las subas de tarifas. Paneles solares estéticos de alto rendimiento integrados al techo de tu casa con microinversores de máxima seguridad.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ahorro inmediato en factura mensual
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Revalorización inmobiliaria de tu hogar
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Monitoreo desde tu celular en tiempo real
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/5">
                <a href="#contacto" className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Consultar plan residencial <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Tarjeta 2: Comercial e Industrial */}
            <div className="rounded-2xl bg-gradient-to-b from-[#141d18] to-[#0d1410] border border-emerald-500/30 p-8 relative shadow-[0_10px_40px_rgba(16,185,129,0.1)] transition-all group hover:-translate-y-1 duration-300 flex flex-col justify-between">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                Mayor Retorno
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Comercios e Industrias</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Reducí drásticamente tus costos operativos de energía en bodegas, hoteles, naves industriales y locales comerciales para mejorar tus márgenes de rentabilidad.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Amortización rápida de la inversión (ROI acelerado)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Huella de carbono corporativa certificable
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ingeniería y trámites de inyección llave en mano
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/5">
                <a href="#contacto" className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Consultar plan corporativo <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Tarjeta 3: Agro y Bombeo Solar */}
            <div className="rounded-2xl bg-gradient-to-b from-[#121c17] to-[#0c130f] border border-white/5 hover:border-emerald-500/40 p-8 transition-all group hover:-translate-y-1 duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Tractor className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Agro & Bombeo Solar</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Sistemas solares para fincas, viñedos y campos cuyanos. Riego por goteo y bombeo continuo sin depender de generadores diésel ruidosos y costosos.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cero costo de combustible para bombeo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Operación autónoma en zonas sin red eléctrica
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Resistencia extrema a condiciones climáticas de montaña
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/5">
                <a href="#contacto" className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Consultar plan agropecuario <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TECNOLOGÍA & PROCESO DE TRABAJO */}
      <section id="tecnologia" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Estándar Greenside
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              De tu idea a la generación en 4 pasos simples
            </h2>
            <p className="text-slate-400 text-base">
              Nos encargamos del 100% del proceso para que disfrutes de tu energía sin preocupaciones técnicas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Estudio de Viabilidad',
                desc: 'Analizamos tus facturas pasadas, la orientación y realizamos el relevamiento técnico de tu propiedad. El costo del relevamiento se descuenta al 100% al adquirir tu equipo.',
              },
              {
                step: '02',
                title: 'Ingeniería a Medida',
                desc: 'Dimensionamos el sistema exacto con software de simulación energética para garantizar el máximo ahorro sin sobredimensionar.',
              },
              {
                step: '03',
                title: 'Instalación y Certificación',
                desc: 'Montaje profesional en menos de 48-72 hs con componentes de primera línea internacional e ignífugos.',
              },
              {
                step: '04',
                title: 'Encendido y App Móvil',
                desc: 'Activamos el sistema, gestionamos la inyección a la red y configuramos la telemetría en tu smartphone.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 relative group hover:border-emerald-500/30 transition-all">
                <div className="text-4xl font-extrabold text-white/20 font-display mb-4 group-hover:text-emerald-400/40 transition-colors">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Destaque de Calidad y Marcas */}
          <div className="mt-16 p-8 rounded-2xl bg-[#0e1612] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Garantía de Potencia de 25 Años</h5>
                <p className="text-xs text-slate-400">Trabajamos exclusivamente con paneles solares monocristalinos PERC / TopCon Tier-1 y los mejores inversores globales.</p>
              </div>
            </div>
            <a
              href="#contacto"
              className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span>Consultar Ficha Técnica</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQ) */}
      <section id="faq" className="py-20 md:py-28 bg-[#090f0c] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-slate-400 text-sm">
              Todo lo que necesitás saber antes de dar el salto a la energía solar.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "¿Qué sucede durante los días nublados o por la noche?",
                a: "Los paneles solares generan electricidad incluso con nubes (aprovechando la luz difusa). Por la noche o en momentos de alta demanda adicional, tu propiedad toma automáticamente energía de la red convencional o de baterías acumuladoras (si tu sistema es híbrido). El cambio es 100% transparente y automático.",
              },
              {
                q: "¿Cómo funciona la Ley de Generación Distribuida en Mendoza?",
                a: "Mendoza está adherida a la Ley Nacional 27.424. Esto te permite ser un 'usuario-generador'. Cuando tus paneles generan más electricidad de la que consumís, el excedente se inyecta a la red eléctrica y la distribuidora (EDEMSA u otras) te lo reconoce como crédito en tu factura.",
              },
              {
                q: "¿Cuánto tiempo toma recuperar la inversión?",
                a: "En promedio, el retorno de inversión oscila entre 3 a 5 años, dependiendo del nivel de consumo y las tarifas vigentes. Considerando que los paneles solares tienen una vida útil superior a 25 años, obtenés más de 20 años de electricidad prácticamente gratuita.",
              },
              {
                q: "¿El relevamiento técnico tiene costo?",
                a: "El costo del relevamiento técnico se descuenta al 100% del valor total al adquirir tu equipo. Esto te permite evaluar con absoluta precisión la ingeniería de tu techo y el dimensionamiento antes de dar el paso final sin costo extra en tu inversión.",
              },
              {
                q: "¿Qué mantenimiento requieren los paneles solares?",
                a: "El mantenimiento es mínimo debido a que no cuentan con piezas móviles. Solo se recomienda una limpieza periódica con agua para remover polvo de zonda o sedimentos y garantizar la máxima captación solar.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/20 transition-all">
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-emerald-400">Q:</span> {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FORMULARIO DE CONTACTO Y COTIZACIÓN */}
      <section id="contacto" className="py-20 md:py-28 relative">
        {/* Glow de fondo */}
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Info y Propuesta */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <PhoneCall className="w-3.5 h-3.5" /> Contacto Directo
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Empezá a generar tu propia energía hoy.
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Contactate con <strong>Agustín Vaca Cornejo</strong> y el equipo de <strong>Greenside</strong>. Te entregamos un informe técnico y financiero detallado sin ningún costo ni compromiso.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-white font-medium">Ubicación Central</span>
                    <span className="text-xs text-slate-400">Mendoza, Argentina (Cobertura en todo Cuyo)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-white font-medium">Email Corporativo</span>
                    <span className="text-xs text-slate-400">contacto@greenside.com.ar</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-white font-medium">Atención WhatsApp</span>
                    <span className="text-xs text-slate-400">Respuesta rápida y asesoramiento técnico directo</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-emerald-900/20 border border-emerald-500/20">
                <p className="text-xs text-emerald-200">
                  ⚡ <strong>Promoción & Garantía:</strong> El costo del relevamiento técnico se descuenta al 100% del valor total al adquirir tu equipo.
                </p>
              </div>
            </div>

            {/* Formulario Interactivo */}
            <div className="lg:col-span-7">
              <div className="bg-[#111915] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <h3 className="text-xl font-bold text-white mb-2">Solicitar Propuesta Energética</h3>
                <p className="text-xs text-slate-400 mb-6">Completá el formulario para recibir un dimensionamiento personalizado.</p>

                <form onSubmit={sendWhatsApp} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nombre completo</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Ej: Marcos Suárez"
                        className="w-full bg-[#090f0c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Teléfono / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="Ej: +54 9 261 123-4567"
                        className="w-full bg-[#090f0c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Localidad / Zona en Mendoza</label>
                      <input
                        type="text"
                        value={formLoc}
                        onChange={(e) => setFormLoc(e.target.value)}
                        placeholder="Ej: Maipú, Luján, Godoy Cruz..."
                        className="w-full bg-[#090f0c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Destino de la instalación</label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value as any)}
                        className="w-full bg-[#090f0c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      >
                        <option value="hogar">Residencial / Casa particular</option>
                        <option value="comercio">Comercio / Bodega / Industria</option>
                        <option value="agro">Finca / Riego agrícola</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Comentarios adicionales o consumo actual</label>
                    <textarea
                      rows={3}
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder="Contanos sobre tu techo, si tenés cortes de luz o qué objetivo tenés..."
                      className="w-full bg-[#090f0c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-base shadow-[0_10px_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Enviar consulta directa por WhatsApp</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    Tus datos son privados y tratados con estricta confidencialidad.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050806] border-t border-white/10 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Greenside Logo" className="h-9 w-auto object-contain" />
              <div>
                <span className="font-bold text-white text-sm">Greenside</span>
                <p className="text-[11px] text-slate-500">Innovación solar por Agustín Vaca Cornejo • Mendoza, Argentina</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
              <a href="#soluciones" className="hover:text-emerald-400 transition-colors">Soluciones</a>
              <a href="#calculadora" className="hover:text-emerald-400 transition-colors">Calculadora</a>
              <a href="#historia" className="hover:text-emerald-400 transition-colors">Historia</a>
              <a href="#tecnologia" className="hover:text-emerald-400 transition-colors">Tecnología</a>
              <a href="#contacto" className="hover:text-emerald-400 transition-colors">Contacto</a>
            </div>

            <div className="text-center md:text-right text-slate-500 text-[11px]">
              © {new Date().getFullYear()} Greenside. Todos los derechos reservados.<br />
              Impulsando la nueva matriz energética sustentable.
            </div>

          </div>
        </div>
      </footer>

      {/* Botón Flotante de WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => sendWhatsApp()}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-[0_5px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.6)] transition-all transform hover:scale-105 group"
          title="Hablar con un asesor"
        >
          <MessageCircle className="w-5 h-5 fill-slate-950" />
          <span className="text-xs hidden sm:inline-block">¿Hablamos por WhatsApp?</span>
        </button>
      </div>
    </div>
  );
}
