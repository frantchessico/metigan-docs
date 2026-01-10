"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedEnvelope() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Iniciar fechado, depois alternar
    const timeout = setTimeout(() => {
      setIsOpen(true)
    }, 1500)

    const interval = setInterval(() => {
      setIsOpen((prev) => !prev)
    }, 4000) // Alterna a cada 4 segundos

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="relative w-40 h-40 mx-auto">
      {/* Glow Effect - mais vibrante e animado */}
      <motion.div
        className="absolute inset-0 blur-3xl rounded-full"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="bg-primary/20"
      />
      
      {/* Envelope Container com perspectiva 3D */}
      <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
        {/* Envelope Base */}
        <motion.div
          className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden"
          animate={{
            scale: isOpen ? [1, 0.98, 1] : 1,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="bg-primary"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Envelope Flap (Top) - animação de abertura/fechamento realista */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 rounded-t-3xl origin-top"
            animate={{
              rotateX: isOpen ? -170 : 0,
              y: isOpen ? -3 : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.34, 1.56, 0.64, 1], // Bounce effect
            }}
            className="bg-primary/90"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "top center",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Inner flap highlight */}
            <div className="absolute inset-0 bg-white/20 rounded-t-3xl"></div>
            {/* Inner side of flap (when open) */}
            <motion.div
              className="absolute inset-0 rounded-t-3xl bg-primary/30"
              animate={{
                opacity: isOpen ? 1 : 0,
              }}
            />
          </motion.div>

          {/* Letter Inside (shows when open with bounce e rotação) */}
          {isOpen && (
            <motion.div
              className="absolute top-1/2 left-1/2 w-24 h-28 bg-white rounded-xl shadow-2xl z-10"
              initial={{
                x: "-50%",
                y: "-50%",
                opacity: 0,
                scale: 0.6,
                rotateZ: -8,
              }}
              animate={{
                y: "-80%",
                opacity: [0, 0.8, 1],
                scale: [0.6, 1.15, 1],
                rotateZ: [-8, 3, 0],
              }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1], // Bounce
                delay: 0.35,
              }}
            >
              {/* Letter content */}
              <div className="p-4 space-y-2 h-full flex flex-col justify-center">
                <motion.div 
                  className="h-2 rounded w-3/4 bg-primary/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
                <motion.div 
                  className="h-2 rounded w-full bg-primary/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                />
                <motion.div 
                  className="h-2 rounded w-5/6 bg-primary/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                />
                {/* Decorative dots */}
                <div className="flex space-x-1 mt-2 justify-center">
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  />
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-primary/80"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.85 }}
                  />
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-primary/60"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Envelope Front with Mail Icon */}
          <div className="absolute inset-0 rounded-3xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-primary">
              <div className="absolute inset-0 bg-white/20 rounded-3xl"></div>
            </div>
            
            {/* Mail Icon (desaparece quando abre) */}
            <motion.div
              className="relative z-10"
              animate={{
                opacity: isOpen ? [1, 0.3, 0] : [0, 0.5, 1],
                scale: isOpen ? [1, 0.7, 0.5] : [0.5, 0.9, 1],
                rotateZ: isOpen ? [0, -15, -25] : [-25, -5, 0],
                y: isOpen ? [0, 5, 10] : [10, 0, 0],
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              <svg
                className="w-20 h-20 text-white drop-shadow-2xl"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>

            {/* Sparkle/Shimmer effects when closed */}
            {!isOpen && (
              <>
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="absolute top-1/4 left-1/4 w-2.5 h-2.5 bg-white rounded-full blur-md"></div>
                  <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full blur-md"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-white rounded-full blur-md"></div>
                  <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-white rounded-full blur-md"></div>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
