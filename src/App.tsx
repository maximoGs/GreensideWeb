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
  ChevronDown,
  BatteryCharging,
  Leaf,
  BarChart3,
  Building2,
  Home,
  Tractor,
  Compass,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Menu,
  X,
  Cpu,
  Gauge,
  BadgePercent,
  Layers,
  CloudSun,
  Wrench,
  FileCheck2
} from 'lucide-react';

const LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`;
const AGUSTIN_SRC = `${import.meta.env.BASE_URL}agustin.jpg`;

type PropertyType = 'hogar' | 'comercio' | 'agro';
type SystemMode = 'ongrid' | 'hibrido' | 'aislado';
type RegionKey = 'gran_mendoza' | 'valle_uco' | 'zona_este' | 'sur';

const MENDOZA_REGIONS: Record<
  RegionKey,
  {
    name: string;
    zones: string;
    hsp: string;
    yieldPerKwp: string;
    highlight: string;
    idealFor: string[];
    comparison: string;
  }
> = {
  gran_mendoza: {
    name: 'Gran Mendoza, Luján & Maipú',
    zones: 'Capital, Godoy Cruz, Guaymallén, Las Heras, Luján de Cuyo, Maipú',
    hsp: '5.5 HSP (Horas Sol Pico)',
    yieldPerKwp: '1.780 kWh / kWp al año',
    highlight:
      'Zona óptima para sistemas residenciales en barrios privados, comercios, clínicas, colegios y parques industriales con inyección directa a la red de EDEMSA o Cooperativa Eléctrica.',
    idealFor: [
      'Hogares y Barrios Privados (Ahorro + Back-up ante cortes)',
      'Comercios, Oficinas, Supermercados y Gastronomía',
      'Bodegas turísticas y Naves Industriales en Carril Rodríguez Peña / Parque Industrial'
    ],
    comparison: '+62% más rendimiento anual por panel que el promedio de Europa Central'
  },
  valle_uco: {
    name: 'Valle de Uco',
    zones: 'Tunuyán, Tupungato, San Carlos',
    hsp: '5.8 HSP (Horas Sol Pico)',
    yieldPerKwp: '1.890 kWh / kWp al año',
    highlight:
      'La altitud y pureza atmosférica del piedemonte andino generan una radiación solar directa excepcional. Los paneles trabajan a menor temperatura ambiente, aumentando su eficiencia eléctrica.',
    idealFor: [
      'Bodegas de exportación con certificación de huella de carbono',
      'Sistemas de bombeo solar para riego por goteo en viñedos y frutales',
      'Emprendimientos hoteleros, lodges y estancias fuera de red (Off-Grid)'
    ],
    comparison: '+70% más captación fotovoltaica gracias a la altitud y baja nubosidad'
  },
  zona_este: {
    name: 'Zona Este & Lavalle',
    zones: 'San Martín, Junín, Rivadavia, Santa Rosa, La Paz, Lavalle',
    hsp: '5.7 HSP (Horas Sol Pico)',
    yieldPerKwp: '1.850 kWh / kWp al año',
    highlight:
      'El corazón productivo y agroindustrial cuenta con llanuras de altísima heliofanía (horas de sol efectivo), ideal para reemplazar motores diésel y abatir costos de bombeo de pozo.',
    idealFor: [
      'Bombeo solar sumergible y de superficie para riego agrícola continuo',
      'Secaderos, galpones de empaque, frigoríficos y agroindustrias',
      'Viviendas rurales y puestos con autonomía total las 24 hs'
    ],
    comparison: 'Amortización acelerada en menos de 3 años frente al uso de generadores a gasoil'
  },
  sur: {
    name: 'Sur Mendocino',
    zones: 'San Rafael, General Alvear, Malargüe',
    hsp: '5.4 a 5.6 HSP (Horas Sol Pico)',
    yieldPerKwp: '1.760 kWh / kWp al año',
    highlight:
      'Excelente recurso solar durante las 4 estaciones para industrias, cabañas turísticas, establecimientos ganaderos y hogares que buscan estabilidad energética.',
    idealFor: [
      'Complejos turísticos, cabañas y comercios en San Rafael y Alvear',
      'Sistemas autónomos para campos ganaderos y bombeo de agua para hacienda',
      'Viviendas familiares con reducción de hasta el 90% en consumo eléctrico'
    ],
    comparison: 'Más de 300 días de cielo despejado con generación constante todo el año'
  }
};

export default function App() {
  // Menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estado de la calculadora interactiva
  const [monthlyBill, setMonthlyBill] = useState<number>(150000);
  const [propertyType, setPropertyType] = useState<PropertyType>('hogar');
  const [systemMode, setSystemMode] = useState<SystemMode>('ongrid');

  // Estado de región de Mendoza
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>('gran_mendoza');

  // Estado de FAQ acordeón
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Cálculos dinámicos de ingeniería orientativa
  const baseSavingsFactor =
    propertyType === 'hogar' ? 0.80 : propertyType === 'comercio' ? 0.85 : 0.88;
  const modeBonus = systemMode === 'ongrid' ? 0 : systemMode === 'hibrido' ? 0.04 : 0.07;
  const factor = Math.min(0.92, baseSavingsFactor + modeBonus);

  const estimatedSavingsMonthly = Math.round(monthlyBill * factor);
  const remainingBillMonthly = Math.max(0, monthlyBill - estimatedSavingsMonthly);
  const estimatedSavingsAnnual = estimatedSavingsMonthly * 12;
  const estimatedSavings5Years = estimatedSavingsAnnual * 5;

  // Estimación técnica: ~1 kWp por cada $32.000 ARS de factura mensual aprox
  const rawKwp = Math.max(1.8, monthlyBill / 32000);
  const recommendedKwp = Number(rawKwp.toFixed(1));
  const panelCount = Math.max(4, Math.ceil((recommendedKwp * 1000) / 580)); // Paneles de 580W N-Type
  const roofAreaM2 = Math.round(panelCount * 2.6);
  const annualGenerationKwh = Math.round(recommendedKwp * 1780);

  const co2AvoidedTons = ((annualGenerationKwh * 0.42) / 1000).toFixed(1);
  const treesEquivalent = Math.round((annualGenerationKwh * 0.42) / 22);

  // Formulario de contacto
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLoc, setFormLoc] = useState('');
  const [formMsg, setFormMsg] = useState('');

  const sendWhatsApp = (e?: React.FormEvent, customMessage?: string) => {
    if (e) e.preventDefault();
    const modeLabel =
      systemMode === 'ongrid'
        ? 'On-Grid (Inyección a red)'
        : systemMode === 'hibrido'
        ? 'Híbrido con Baterías'
        : 'Aislado / Bombeo Solar';

    const text =
      customMessage ||
      `Hola Greenside! Mi nombre es ${formName || 'un interesado'}. Me contacto desde ${
        formLoc || 'Mendoza'
      } por un sistema solar ${modeLabel} para ${propertyType} (~${recommendedKwp} kWp / ${panelCount} paneles). Mi factura mensual aproximada es de $${monthlyBill.toLocaleString(
        'es-AR'
      )}. ${
        formMsg
          ? `Consulta: ${formMsg}`
          : 'Me interesa coordinar un relevamiento técnico (con el 100% de descuento al adquirir el equipo).'
      }`;
    const url = `https://wa.me/5492610000000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const selectKitAndScroll = (
    type: PropertyType,
    mode: SystemMode,
    billPreset: number,
    kitTitle: string
  ) => {
    setPropertyType(type);
    setSystemMode(mode);
    setMonthlyBill(billPreset);
    setFormMsg(
      `Hola! Me interesa recibir cotización por el ${kitTitle} y coordinar el relevamiento técnico (100% bonificado al adquirir el equipo).`
    );
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentRegion = MENDOZA_REGIONS[selectedRegion];

  return (
    <div className="min-h-screen bg-[#070b09] text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Top Banner con Beneficio de Relevamiento Técnico */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-amber-950/90 border-b border-emerald-500/25 py-2.5 px-4 text-center text-xs sm:text-sm font-medium text-emerald-100 flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          Beneficio Greenside
        </span>
        <span>
          <strong>El costo del relevamiento técnico se descuenta al 100% del valor total al adquirir tu equipo.</strong>
        </span>
        <a
          href="#contacto"
          className="underline decoration-emerald-400/70 hover:text-emerald-300 font-semibold ml-1 inline-flex items-center gap-0.5"
        >
          Solicitar relevamiento <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Navbar Flotante */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090e0b]/85 border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative bg-white rounded-xl p-1.5 shadow-[0_0_20px_rgba(16,185,129,0.25)] group-hover:shadow-[0_0_28px_rgba(16,185,129,0.45)] transition-all duration-300">
              <img
                src={LOGO_SRC}
                alt="Greenside Energía Solar Logo"
                className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Greenside
                <span className="text-emerald-400 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  Energía Solar
                </span>
              </span>
              <span className="text-[10px] text-emerald-400/80 tracking-widest font-semibold uppercase">
                Mendoza • Argentina
              </span>
            </div>
          </a>

          {/* Menú Desktop */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#calculadora" className="hover:text-emerald-400 transition-colors">
              Simulador Solar
            </a>
            <a href="#potencial" className="hover:text-emerald-400 transition-colors">
              Potencial en Mendoza
            </a>
            <a href="#soluciones" className="hover:text-emerald-400 transition-colors">
              Soluciones & Kits
            </a>
            <a href="#historia" className="hover:text-emerald-400 transition-colors">
              Quiénes Somos
            </a>
            <a href="#tecnologia" className="hover:text-emerald-400 transition-colors">
              Proceso
            </a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">
              Preguntas
            </a>
          </nav>

          {/* CTA Header */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#calculadora"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/10 transition-all"
            >
              Calcular Ahorro
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-0.5"
            >
              <span>Pedir Relevamiento</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Botón Menú Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-emerald-400 transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Drawer Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0b120e] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
            <div className="grid gap-2 text-sm font-medium text-slate-200">
              {[
                { href: '#calculadora', label: 'Simulador Solar & ROI' },
                { href: '#potencial', label: 'Potencial Solar en Mendoza' },
                { href: '#soluciones', label: 'Soluciones y Kits Solares' },
                { href: '#historia', label: 'Nuestra Visión (Agustín Vaca Cornejo)' },
                { href: '#tecnologia', label: 'Proceso de Instalación' },
                { href: '#faq', label: 'Preguntas Frecuentes' }
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-emerald-400 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-center text-sm shadow-lg"
              >
                Coordinar Relevamiento Técnico
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Glow ambient effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-emerald-500/12 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute top-16 right-10 w-[420px] h-[420px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Texto Hero */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/30 text-emerald-300 text-xs font-medium backdrop-blur-md shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ingeniería Fotovoltaica en Mendoza</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-amber-300 font-semibold">+300 Días de Sol al Año</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
                Transformá el sol de Mendoza en{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                  rentabilidad y libertad energética
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                En <strong className="text-emerald-400">Greenside</strong> diseñamos, certificamos e instalamos sistemas solares fotovoltaicos de tecnología <strong>Tier-1</strong> para hogares, empresas, bodegas y fincas. Reducí hasta un <strong>90% tu factura eléctrica</strong> e inyectá tus excedentes a la red bajo la Ley 27.424.
              </p>

              {/* Callout destacado del Relevamiento Técnico 100% descontable */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-amber-500/10 border border-emerald-400/35 max-w-2xl mx-auto lg:mx-0 flex items-center gap-3.5 text-left shadow-[0_0_30px_rgba(16,185,129,0.12)]">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 flex-shrink-0">
                  <BadgePercent className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Garantía de Inversión Greenside
                  </div>
                  <p className="text-xs sm:text-sm text-white font-semibold mt-0.5">
                    El costo del relevamiento técnico se descuenta al 100% del valor total al adquirir tu equipo.
                  </p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#calculadora"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-[0_10px_30px_rgba(16,185,129,0.35)] flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 text-base"
                >
                  <Sun className="w-5 h-5 text-slate-950 fill-slate-950" />
                  <span>Simular mi Ahorro y Potencia</span>
                </a>
                <a
                  href="#contacto"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center justify-center gap-2 transition-all hover:border-emerald-500/40 text-base"
                >
                  <span>Agendar Relevamiento Técnico</span>
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                </a>
              </div>

              {/* Badges de Confianza */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0">
                <div className="text-left">
                  <div className="text-2xl font-bold text-white font-display">Hasta 90%</div>
                  <div className="text-xs text-slate-400">Ahorro en factura</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-emerald-400 font-display">100% Bonif.</div>
                  <div className="text-xs text-slate-400">Relevamiento al comprar</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-amber-400 font-display">25+ Años</div>
                  <div className="text-xs text-slate-400">Vida útil certificada</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-teal-300 font-display">3 a 4 Años</div>
                  <div className="text-xs text-slate-400">Retorno de inversión</div>
                </div>
              </div>
            </div>

            {/* Visual Hero Card / Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 rounded-3xl blur-xl opacity-30 transition duration-1000"></div>

                <div className="relative rounded-3xl bg-gradient-to-b from-[#121c17] to-[#0a100d] border border-white/15 p-6 sm:p-7 shadow-2xl space-y-5">
                  {/* Header de la tarjeta con logo */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="bg-white rounded-lg p-1 shadow-md">
                        <img src={LOGO_SRC} alt="Greenside" className="h-8 w-auto object-contain" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Telemetría Greenside Smart</h4>
                        <p className="text-xs text-slate-400">Planta Fotovoltaica • Luján de Cuyo</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      Generando
                    </span>
                  </div>

                  {/* Panel Gráfico de Flujo Energético */}
                  <div className="space-y-4">
                    <div className="bg-[#070b09] p-4 rounded-2xl border border-white/5 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <Sun className="w-4 h-4 text-amber-400" /> Producción Solar Actual
                        </span>
                        <span className="text-emerald-400 font-bold font-mono text-sm">6.45 kW</span>
                      </div>
                      <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full w-[88%]"></div>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                        <span>Consumo Propiedad: 2.10 kW</span>
                        <span className="text-amber-300 font-medium">Inyectando a Red: +4.35 kW</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#070b09] p-4 rounded-2xl border border-white/5">
                        <div className="text-[11px] text-slate-400">Ahorro Mensual Real</div>
                        <div className="text-xl font-bold text-emerald-400 font-mono mt-1">$184.500</div>
                        <div className="text-[10px] text-emerald-300/80 flex items-center gap-1 mt-1">
                          <TrendingDown className="w-3 h-3" /> Factura reducida 86%
                        </div>
                      </div>
                      <div className="bg-[#070b09] p-4 rounded-2xl border border-white/5">
                        <div className="text-[11px] text-slate-400">Autonomía & Batería</div>
                        <div className="text-xl font-bold text-amber-300 font-mono mt-1">100% LiFePO4</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                          <BatteryCharging className="w-3 h-3 text-emerald-400" /> Back-up anti-cortes
                        </div>
                      </div>
                    </div>

                    {/* Certificación / Garantía highlight */}
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3">
                      <ShieldCheck className="w-9 h-9 text-emerald-400 flex-shrink-0" />
                      <div className="text-xs space-y-0.5">
                        <span className="font-bold text-white block">
                          Habilitación Usuario-Generador (Ley 27.424)
                        </span>
                        <p className="text-slate-300 text-[11px]">
                          Gestionamos el medidor bidireccional ante tu distribuidora eléctrica en Mendoza.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer de tarjeta */}
                  <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Paneles N-Type TOPCon Tier-1</span>
                    <a href="#calculadora" className="text-emerald-400 font-semibold hover:underline">
                      Probar simulador →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULADORA DE AHORRO Y DIMENSIONAMIENTO 2.0 */}
      <section id="calculadora" className="py-20 md:py-28 relative bg-[#090f0c] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" /> Simulador Solar & Dimensionamiento
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Calculá tu <span className="bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">potencial de ahorro y equipo ideal</span>
            </h2>
            <p className="text-slate-400 text-base">
              Deslizá tu gasto eléctrico mensual para conocer la potencia solar recomendada, cantidad de paneles y el retorno económico en Mendoza.
            </p>
          </div>

          <div className="max-w-6xl mx-auto bg-gradient-to-b from-[#111a14] to-[#0a100d] border border-emerald-500/25 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Controles del Simulador */}
              <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Paso 1: Tipo de propiedad */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
                      1. Tipo de propiedad o proyecto:
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'hogar', label: 'Residencial', sub: 'Casas / Barrios', icon: Home },
                        { id: 'comercio', label: 'Comercial / PyME', sub: 'Bodegas / Locales', icon: Building2 },
                        { id: 'agro', label: 'Agro / Riego', sub: 'Fincas / Pozos', icon: Tractor }
                      ].map((type) => {
                        const Icon = type.icon;
                        const isSelected = propertyType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setPropertyType(type.id as PropertyType)}
                            className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-xs font-semibold transition-all ${
                              isSelected
                                ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/10'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                            }`}
                          >
                            <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                            <span>{type.label}</span>
                            <span className="text-[10px] text-slate-400 font-normal mt-0.5">{type.sub}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Paso 2: Tecnología del sistema */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
                      2. Modalidad del sistema solar:
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        {
                          id: 'ongrid',
                          title: 'On-Grid',
                          desc: 'Ahorro + Inyección a Red'
                        },
                        {
                          id: 'hibrido',
                          title: 'Híbrido + Batería',
                          desc: 'Ahorro + Anti-Cortes'
                        },
                        {
                          id: 'aislado',
                          title: 'Off-Grid / Bombeo',
                          desc: '100% Autónomo sin red'
                        }
                      ].map((mode) => {
                        const isSelected = systemMode === mode.id;
                        return (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => setSystemMode(mode.id as SystemMode)}
                            className={`p-3 rounded-2xl border text-left transition-all ${
                              isSelected
                                ? 'bg-amber-500/15 border-amber-400 text-white'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                            }`}
                          >
                            <div className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                              {mode.title}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{mode.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Paso 3: Gasto mensual */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        3. Factura eléctrica mensual aprox:
                      </label>
                      <span className="text-xl font-extrabold font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-xl border border-emerald-500/30">
                        ${monthlyBill.toLocaleString('es-AR')} ARS
                      </span>
                    </div>
                    <input
                      type="range"
                      min="40000"
                      max="2500000"
                      step="10000"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(Number(e.target.value))}
                      className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 hover:accent-emerald-300 transition-all"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                      <span>$40.000 (Hogar)</span>
                      <span>$500.000 (Comercio)</span>
                      <span>$2.500.000+ (Agro/Ind.)</span>
                    </div>
                  </div>
                </div>

                {/* Comparativa visual de factura */}
                <div className="p-4 rounded-2xl bg-[#070b09] border border-white/10 space-y-3">
                  <div className="text-xs font-semibold text-slate-300 flex justify-between">
                    <span>Comparativa de Gasto Mensual</span>
                    <span className="text-emerald-400">Reducción estimada del {Math.round(factor * 100)}%</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Sin energía solar</span>
                        <span className="font-mono text-rose-400 font-semibold">
                          ${monthlyBill.toLocaleString('es-AR')} / mes
                        </span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-rose-500/80 h-full w-full rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Con Greenside Energía Solar</span>
                        <span className="font-mono text-emerald-400 font-bold">
                          ${remainingBillMonthly.toLocaleString('es-AR')} / mes
                        </span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(8, Math.round((1 - factor) * 100))}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resultados de Ingeniería y Ahorro */}
              <div className="lg:col-span-6 bg-[#070b09] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                        Ahorro Estimado Proyectado
                      </div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono flex items-baseline gap-2 mt-1">
                        <span className="text-emerald-400">
                          ${estimatedSavingsMonthly.toLocaleString('es-AR')}
                        </span>
                        <span className="text-xs font-normal text-slate-400">/ mes</span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl">
                      <div className="text-[10px] text-emerald-300 uppercase font-semibold">Ahorro Anual</div>
                      <div className="text-lg font-extrabold text-white font-mono">
                        ${estimatedSavingsAnnual.toLocaleString('es-AR')}
                      </div>
                    </div>
                  </div>

                  {/* Especificaciones del Sistema Recomendado */}
                  <div>
                    <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4" /> Dimensionamiento Técnico Sugerido
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-slate-400">Potencia Solar</div>
                        <div className="text-base font-bold text-white font-mono mt-0.5">
                          {recommendedKwp} kWp
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-slate-400">Paneles 580W</div>
                        <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                          {panelCount} unid.
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-slate-400">Superficie</div>
                        <div className="text-base font-bold text-white font-mono mt-0.5">
                          ~{roofAreaM2} m²
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-slate-400">Generación/Año</div>
                        <div className="text-base font-bold text-amber-300 font-mono mt-0.5">
                          {annualGenerationKwh.toLocaleString('es-AR')} kWh
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Proyección a 5 años + Impacto Ambiental */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                      <div className="text-[10px] text-slate-400">Acumulado 5 años</div>
                      <div className="text-sm sm:text-base font-bold text-emerald-300 font-mono mt-0.5">
                        ${(estimatedSavings5Years / 1000000).toFixed(1)}M ARS
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-slate-400">CO₂ evitado / año</div>
                      <div className="text-sm sm:text-base font-bold text-teal-300 font-mono mt-0.5">
                        {co2AvoidedTons} Ton
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-slate-400">Árboles equiv.</div>
                      <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono mt-0.5">
                        +{treesEquivalent} / año
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Recordá:</strong> El costo del relevamiento técnico se descuenta al 100% del valor total al adquirir tu equipo.
                    </span>
                  </div>

                  <a
                    href="#contacto"
                    onClick={() => {
                      setFormMsg(
                        `Hola! Simulé un sistema ${systemMode.toUpperCase()} para ${propertyType} con gasto mensual de $${monthlyBill.toLocaleString(
                          'es-AR'
                        )} (~${recommendedKwp} kWp / ${panelCount} paneles). Quisiera coordinar el relevamiento técnico.`
                      );
                    }}
                    className="w-full py-4 px-4 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <span>Recibir Presupuesto Exacto para este Sistema</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN: POTENCIAL SOLAR DE MENDOZA POR REGIÓN */}
      <section id="potencial" className="py-20 md:py-28 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <CloudSun className="w-3.5 h-3.5" /> Atlas de Radiación Cuyo
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              ¿Por qué Mendoza tiene uno de los <span className="text-amber-400">mayores potenciales solares</span> del mundo?
            </h2>
            <p className="text-slate-400 text-base">
              Con niveles de irradiación de <strong>5.4 a 6.0 kWh/m²/día</strong> y baja humedad relativa, el mismo panel solar instalado en Mendoza produce hasta un <strong>65% más de energía</strong> que en países líderes de Europa.
            </p>
          </div>

          {/* Selector de Oasis Productivos de Mendoza */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {(
              [
                { id: 'gran_mendoza', label: 'Gran Mendoza & Luján / Maipú' },
                { id: 'valle_uco', label: 'Valle de Uco' },
                { id: 'zona_este', label: 'Zona Este & Lavalle' },
                { id: 'sur', label: 'Sur Mendocino' }
              ] as { id: RegionKey; label: string }[]
            ).map((reg) => {
              const active = selectedRegion === reg.id;
              return (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    active
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border-emerald-400 text-white shadow-lg shadow-emerald-500/10'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
                      Región Solar
                    </div>
                    <div className="text-xs sm:text-sm font-bold mt-0.5">{reg.label}</div>
                  </div>
                  <MapPin className={`w-4 h-4 flex-shrink-0 ${active ? 'text-emerald-400' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          {/* Panel de Región Seleccionada */}
          <div className="rounded-3xl bg-gradient-to-br from-[#121c17] via-[#0d1511] to-[#090f0c] border border-white/10 p-6 sm:p-10 shadow-2xl">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                  <Sun className="w-3.5 h-3.5" /> {currentRegion.zones}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentRegion.name}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {currentRegion.highlight}
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Aplicaciones de mayor rentabilidad en la zona:
                  </div>
                  {currentRegion.idealFor.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#070b09] border border-white/10">
                    <div className="text-xs text-slate-400">Irradiación Media</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono mt-1">
                      {currentRegion.hsp}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Promedio anual diario</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#070b09] border border-white/10">
                    <div className="text-xs text-slate-400">Rendimiento Específico</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono mt-1">
                      {currentRegion.yieldPerKwp}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Energía limpia generada</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                    <Gauge className="w-4 h-4" /> Ventaja Competitiva Cuyo
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentRegion.comparison}. Además, nuestras estructuras anodizadas y paneles con vidrio templado de <strong>3.2 mm</strong> están certificados para soportar <strong>viento Zonda y granizo</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUCIONES INTEGRALES & KITS DE REFERENCIA */}
      <section id="soluciones" className="py-20 md:py-28 bg-[#090f0c] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" /> Soluciones y Configuraciones Llave en Mano
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Ingeniería solar a la medida de cada escala
            </h2>
            <p className="text-slate-400 text-base">
              Elegí el perfil de tu proyecto. Todos nuestros sistemas incluyen ingeniería de detalle, estructura certificada, montaje y puesta en marcha.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tarjeta 1: Residencial */}
            <div className="rounded-3xl bg-gradient-to-b from-[#121c17] to-[#0c130f] border border-white/10 hover:border-emerald-500/40 p-8 transition-all group hover:-translate-y-1 duration-300 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Home className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    3.5 kWp a 10 kWp
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Hogares & Barrios Privados</h3>
                  <p className="text-xs text-emerald-400 font-medium mt-0.5">
                    Sistemas On-Grid e Híbridos con Baterías de Litio
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Blindá la economía familiar frente a los aumentos tarifarios y asegurá energía continua ante cortes de suministro por tormentas o viento Zonda.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> 6 a 16 paneles solares 580W N-Type monocristalinos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Inyección de excedentes (Crédito en factura EDEMSA)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Monitoreo Wi-Fi desde app móvil en tiempo real
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Relevamiento 100% descontable al adquirir el equipo
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    selectKitAndScroll('hogar', 'hibrido', 150000, 'Pack Residencial Smart (3.5 a 10 kWp)')
                  }
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-500/30 transition-all"
                >
                  <span>Cotizar Sistema Residencial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tarjeta 2: Comercial, Bodegas e Industrial */}
            <div className="rounded-3xl bg-gradient-to-b from-[#142019] to-[#0d1410] border border-emerald-500/40 p-8 relative shadow-[0_10px_40px_rgba(16,185,129,0.12)] transition-all group hover:-translate-y-1 duration-300 flex flex-col justify-between">
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[10px] font-extrabold uppercase px-3.5 py-1 rounded-full shadow-md">
                Máximo ROI Corporativo
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    15 kWp a 250+ kWp
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Comercios, Bodegas & PyMEs</h3>
                  <p className="text-xs text-emerald-400 font-medium mt-0.5">
                    Plantas Trifásicas de Autoconsumo e Inyección
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Tu mayor consumo eléctrico ocurre de día, exactamente cuando el sol brilla en su punto máximo. Transformá un gasto fijo mensual en un activo de capital para tu empresa.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Reducción drástica de costos operativos y potencia contratada
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Certificación de Sustentabilidad y Huella de Carbono
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Ingeniería y trámites EPRE / Distribuidora llave en mano
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Relevamiento técnico 100% bonificado con la compra
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    selectKitAndScroll(
                      'comercio',
                      'ongrid',
                      650000,
                      'Proyecto Comercial / Bodega / Industrial (15 a 250+ kWp)'
                    )
                  }
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Solicitar Estudio Corporativo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tarjeta 3: Agro y Bombeo Solar */}
            <div className="rounded-3xl bg-gradient-to-b from-[#121c17] to-[#0c130f] border border-white/10 hover:border-emerald-500/40 p-8 transition-all group hover:-translate-y-1 duration-300 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Tractor className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    3 HP a 60+ HP
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Agro, Fincas & Bombeo Solar</h3>
                  <p className="text-xs text-amber-400 font-medium mt-0.5">
                    Variadores Solares MPPT & Sistemas Off-Grid
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Riego agrícola, llenado de represas y extracción de pozo profundo sin costo de gasoil ni problemas de suministro en zonas rurales de toda la provincia.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Compatible con bombas sumergibles o de superficie existentes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Cero gasto en combustible diésel y mínimo mantenimiento
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Estructuras reforzadas para suelo o techo de galpón
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Relevamiento en finca 100% descontable al adquirir el equipo
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    selectKitAndScroll('agro', 'aislado', 900000, 'Sistema Agro / Bombeo Solar para Finca')
                  }
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-amber-500/30 transition-all"
                >
                  <span>Cotizar Bombeo / Agro</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HISTORIA DE AGUSTÍN VACA CORNEJO & GREENSIDE */}
      <section id="historia" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Foto Retrato de Agustín Vaca Cornejo */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative group max-w-md mx-auto">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500/30 via-emerald-500/30 to-teal-500/30 rounded-3xl blur-xl opacity-70"></div>
                <div className="relative rounded-3xl bg-[#111915] border border-white/15 p-5 sm:p-6 overflow-hidden shadow-2xl">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden relative border border-white/10 group-hover:border-emerald-500/40 transition-all bg-[#0b110e]">
                    <img
                      src={AGUSTIN_SRC}
                      alt="Agustín Vaca Cornejo - Fundador de Greenside Energía Solar"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"></div>

                    {/* Badge superior */}
                    <div className="absolute top-4 right-4 bg-black/65 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] text-amber-300 font-medium flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5" /> Liderazgo Joven en Cuyo
                    </div>

                    {/* Info inferior sobre la imagen */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 z-10">
                      <div>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/90 border border-emerald-500/30 px-2.5 py-0.5 rounded-full mb-1.5">
                          Fundador & Director
                        </span>
                        <h4 className="text-xl font-extrabold text-white">Agustín Vaca Cornejo</h4>
                        <p className="text-xs text-slate-300">
                          Impulsor Tecnológico • Greenside Energía Solar
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-1.5 shadow-lg flex-shrink-0">
                        <img src={LOGO_SRC} alt="Greenside Logo" className="h-9 w-auto object-contain" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 text-xs text-slate-300">
                      <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Atención personalizada de principio a fin</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 text-xs text-slate-300">
                      <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Ingeniería exacta y equipos Tier-1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Texto de la Historia y Propósito */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
                <Compass className="w-3.5 h-3.5" /> Nuestra Historia & Propósito
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Visión mendocina con vocación de <span className="text-emerald-400">transformar la matriz energética</span>.
              </h2>

              <p className="text-base text-slate-300 leading-relaxed">
                Mendoza cuenta con uno de los recursos solares más privilegiados del planeta, pero durante años las familias, comercios y productores agrícolas vieron cómo sus facturas eléctricas aumentaban sin una alternativa clara y accesible.
              </p>

              <p className="text-base text-slate-300 leading-relaxed">
                Así nació <strong>Greenside</strong>, fundada por <strong>Agustín Vaca Cornejo</strong> con una premisa clara: acercar ingeniería solar de estándar internacional con trato directo, transparencia técnica y números reales de retorno de inversión.
              </p>

              <blockquote className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/70 to-transparent border-l-4 border-emerald-400 text-slate-200 text-sm sm:text-base italic shadow-lg">
                “Nuestro compromiso no es solo instalar paneles solares; es diseñar un sistema que se pague solo con el ahorro que genera, brindando previsibilidad económica por más de 25 años y potenciando el crecimiento sustentable de Mendoza.”
                <span className="block not-italic text-xs text-emerald-400 font-bold mt-2">
                  — Agustín Vaca Cornejo, Fundador de Greenside
                </span>
              </blockquote>

              <div className="pt-2 grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <FileCheck2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-white">Relevamiento 100% Descontable</h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      El costo del relevamiento técnico se descuenta al 100% del valor total al adquirir tu equipo.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-white">Soporte y Garantía Local</h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Acompañamiento postventa en toda la provincia de Mendoza y monitoreo activo del rendimiento.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECNOLOGÍA & PROCESO DE TRABAJO */}
      <section id="tecnologia" className="py-20 md:py-28 bg-[#090f0c] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Método Greenside
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Tu proyecto solar en 4 etapas claras
            </h2>
            <p className="text-slate-400 text-base">
              Nos ocupamos del 100% de la ingeniería, el montaje y la habilitación para que empieces a ahorrar desde el primer día.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                badge: '100% Descontable',
                title: 'Relevamiento Técnico',
                desc: 'Evaluamos tu curva de consumo, orientación, sombras y estructura del techo en sitio. El costo del relevamiento técnico se descuenta al 100% del valor total al adquirir tu equipo.'
              },
              {
                step: '02',
                badge: 'Simulación Exacta',
                title: 'Ingeniería a Medida',
                desc: 'Diseñamos la planta fotovoltaica con software específico para la radiación de tu localidad en Mendoza, maximizando el retorno de inversión.'
              },
              {
                step: '03',
                badge: 'Rápido y Limpio',
                title: 'Instalación Certificada',
                desc: 'Montaje profesional con estructuras de aluminio anodizado resistentes a viento Zonda, protecciones eléctricas DC/AC e inversores de alta eficiencia.'
              },
              {
                step: '04',
                badge: 'Ley 27.424',
                title: 'Puesta en Marcha y App',
                desc: 'Activamos el sistema, configuramos el monitoreo en tu celular y gestionamos el medidor bidireccional para inyectar tus excedentes a la red.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#111915] border border-white/10 relative group hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-extrabold text-emerald-400/30 font-display group-hover:text-emerald-400/60 transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Destaque de Calidad y Relevamiento */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-[#0e1713] to-amber-950/30 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex-shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h5 className="text-base font-bold text-white">
                  Compromiso de Transparencia: Relevamiento 100% Bonificado en tu Compra
                </h5>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  El costo del relevamiento técnico se descuenta al 100% del valor total al adquirir tu equipo, garantizando un presupuesto cerrado sin sorpresas.
                </p>
              </div>
            </div>
            <a
              href="#contacto"
              className="w-full md:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg"
            >
              <span>Agendar Relevamiento Ahora</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQ ACORDEÓN) */}
      <section id="faq" className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Resolvemos las consultas clave sobre energía solar, costos y funcionamiento en Mendoza.
            </p>
          </div>

          <div className="space-y-3.5">
            {[
              {
                q: '¿Cómo funciona el costo del relevamiento técnico?',
                a: 'El costo del relevamiento técnico se descuenta al 100% del valor total al adquirir tu equipo. De esta manera obtenés una evaluación de ingeniería profesional en tu propiedad (análisis eléctrico, estructural y de sombras) que queda totalmente bonificada al confirmar la instalación.'
              },
              {
                q: '¿Los paneles solares resisten el granizo y el viento Zonda de Mendoza?',
                a: 'Sí. Instalamos paneles solares Tier-1 con vidrio templado solar de 3.2 mm de alta resistencia al impacto de granizo (certificados bajo normas internacionales IEC 61215) y estructuras de aluminio anodizado calculadas para soportar ráfagas severas de viento Zonda.'
              },
              {
                q: '¿Qué pasa de noche o cuando se corta la luz?',
                a: 'En sistemas On-Grid, durante la noche tomás energía de la red compensando con el crédito que inyectaste de día. Si elegís un sistema Híbrido con baterías de Litio (LiFePO4), tu casa o empresa sigue funcionando de forma automática e ininterrumpida ante cualquier corte de luz.'
              },
              {
                q: '¿Cómo funciona la Ley de Generación Distribuida en Mendoza?',
                a: 'Mendoza está adherida a la Ley Nacional 27.424. En Greenside gestionamos el trámite ante la distribuidora (EDEMSA o cooperativas) para instalar el medidor bidireccional. Toda la energía extra que tus paneles producen y no usás en el momento se inyecta a la red y se descuenta de tu factura.'
              },
              {
                q: '¿En cuánto tiempo se recupera la inversión?',
                a: 'Con las tarifas eléctricas actuales y la alta radiación solar de Mendoza (+300 días de sol al año), el retorno de inversión promedio se ubica entre 3 y 4.5 años, mientras que los paneles cuentan con una vida útil superior a 25-30 años.'
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'bg-[#111a15] border-emerald-500/40 shadow-lg'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                  >
                    <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{faq.q}</span>
                    </h4>
                    <ChevronDown
                      className={`w-5 h-5 text-emerald-400 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                      <div className="pt-4">{faq.a}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORMULARIO DE CONTACTO Y COTIZACIÓN */}
      <section id="contacto" className="py-20 md:py-28 bg-[#090f0c] border-t border-white/5 relative">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Info y Propuesta */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <PhoneCall className="w-3.5 h-3.5" /> Contacto Directo
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Demos el primer paso hacia tu propia energía solar.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Comunicate directamente con <strong>Agustín Vaca Cornejo</strong> y el equipo técnico de <strong>Greenside</strong> para dimensionar tu proyecto residencial, comercial o agroindustrial.
              </p>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-emerald-900/20 border border-emerald-500/35 space-y-1.5 shadow-lg">
                <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <BadgePercent className="w-4 h-4" /> Beneficio Confirmado
                </div>
                <p className="text-xs sm:text-sm text-white font-semibold leading-relaxed">
                  El costo del relevamiento técnico se descuenta al 100% del valor total al adquirir tu equipo.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10 text-sm text-slate-300">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-white font-semibold">Cobertura Regional</span>
                    <span className="text-xs text-slate-400">
                      Gran Mendoza, Valle de Uco, Zona Este, Sur Mendocino y Cuyo
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-white font-semibold">Atención Corporativa</span>
                    <span className="text-xs text-slate-400">Proyectos llave en mano • Residencial, PyMEs y Agro</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-white font-semibold">WhatsApp Ingeniería Directa</span>
                    <span className="text-xs text-slate-400">
                      Respuesta ágil para cotizaciones y coordinación de visitas técnicas
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario Interactivo */}
            <div className="lg:col-span-7">
              <div className="bg-[#111915] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-xl font-bold text-white">Solicitar Propuesta & Relevamiento</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Completá tus datos para recibir el dimensionamiento y coordinar la visita técnica.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-1.5 shadow-md hidden sm:block">
                    <img src={LOGO_SRC} alt="Greenside" className="h-9 w-auto object-contain" />
                  </div>
                </div>

                <form onSubmit={sendWhatsApp} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Nombre y Apellido / Empresa
                      </label>
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
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Teléfono / WhatsApp
                      </label>
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
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Localidad en Mendoza
                      </label>
                      <input
                        type="text"
                        value={formLoc}
                        onChange={(e) => setFormLoc(e.target.value)}
                        placeholder="Ej: Luján, Maipú, Valle de Uco, San Rafael..."
                        className="w-full bg-[#090f0c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Tipo de Proyecto
                      </label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                        className="w-full bg-[#090f0c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      >
                        <option value="hogar">Residencial / Casa particular</option>
                        <option value="comercio">Comercio / Bodega / Industria</option>
                        <option value="agro">Finca / Bombeo y Riego Agrícola</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Comentarios o consulta específica
                    </label>
                    <textarea
                      rows={3}
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder="Contanos tu gasto aproximado de luz, tipo de techo o si buscás back-up con baterías..."
                      className="w-full bg-[#090f0c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-base shadow-[0_10px_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Solicitar Presupuesto y Relevamiento por WhatsApp</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    ✓ El costo del relevamiento técnico se descuenta al 100% del valor total al adquirir tu equipo.
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
            <div className="flex items-center gap-3.5">
              <div className="bg-white rounded-xl p-1.5 shadow-md">
                <img src={LOGO_SRC} alt="Greenside Logo" className="h-9 w-auto object-contain" />
              </div>
              <div>
                <span className="font-bold text-white text-sm">Greenside Energía Solar</span>
                <p className="text-[11px] text-slate-400">
                  Fundado por Agustín Vaca Cornejo • Mendoza, Argentina
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
              <a href="#calculadora" className="hover:text-emerald-400 transition-colors">
                Simulador
              </a>
              <a href="#potencial" className="hover:text-emerald-400 transition-colors">
                Potencial Mendoza
              </a>
              <a href="#soluciones" className="hover:text-emerald-400 transition-colors">
                Soluciones
              </a>
              <a href="#historia" className="hover:text-emerald-400 transition-colors">
                Quiénes Somos
              </a>
              <a href="#tecnologia" className="hover:text-emerald-400 transition-colors">
                Proceso
              </a>
              <a href="#contacto" className="hover:text-emerald-400 transition-colors">
                Contacto
              </a>
            </div>

            <div className="text-center md:text-right text-slate-500 text-[11px]">
              © {new Date().getFullYear()} Greenside Energía Solar. Todos los derechos reservados.
              <br />
              Ingeniería fotovoltaica sustentable desde Cuyo.
            </div>
          </div>
        </div>
      </footer>

      {/* Botón Flotante de WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => sendWhatsApp()}
          className="flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-[0_5px_25px_rgba(16,185,129,0.45)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.65)] transition-all transform hover:scale-105 cursor-pointer"
          title="Hablar con Greenside por WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-slate-950" />
          <span className="text-xs hidden sm:inline-block">Asesoramiento Solar WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
