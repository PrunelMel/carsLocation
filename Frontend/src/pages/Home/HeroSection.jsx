import { motion } from "framer-motion"

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-white flex items-center px-8 md:px-20 lg:px-32">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .img-shadow { box-shadow: 0 32px 80px -12px rgba(0,0,0,0.18); }
      `}</style>
 
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
 
        {/* ── Left: Text ── */}
        <div className="flex flex-col gap-6">
          <motion.h1
            className="text-slate-900 font-bold leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)", letterSpacing: "-1px" }}
          >
            Nos véhicules<br />disponibles
          </motion.h1>
 
          <motion.p
            className="text-gray-400 text-[15px] leading-relaxed max-w-[300px]"
          >
            Trouvez le véhicule idéal pour vos déplacements personnels ou professionnels parmi notre sélection premium.
          </motion.p>
        </div>
        <motion.div
          className="relative w-full"
        >
          <div className="absolute inset-0 rounded-2xl bg-gray-100" />
 
          <div className="relative rounded-2xl overflow-hidden img-shadow aspect-[4/3]">
            <img
              src="/homeImg.png"
              alt="Véhicule premium disponible"
              className="w-full h-full object-cover"
              
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/20 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>


  )
}

export default HeroSection