"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  // Left Column (3 Questions)
  [
    {
      id: "q1",
      q: "How long does it take to integrate?",
      a: "Less than 2 minutes. Simply copy the generated script tag and paste it before the closing </body> tag of your website."
    },
    {
      id: "q2",
      q: "Will it slow down my website performance?",
      a: "Not at all. The script loads asynchronously without blocking your page rendering or affecting PageSpeed scores."
    },
    {
      id: "q3",
      q: "Can I customize the chatbot's knowledge?",
      a: "Yes, you can train it specifically using your website content, documents, or custom FAQ documentation."
    }
  ],
  // Right Column (3 Questions)
  [
    {
      id: "q4",
      q: "Does it work on mobile browsers?",
      a: "Yes, the chat widget is 100% responsive and adapts seamlessly to mobile screens, tablets, and desktops."
    },
    {
      id: "q5",
      q: "Do I need coding skills to use this?",
      a: "Zero coding required. If you know how to copy and paste text, you can set up this chatbot easily."
    },
    {
      id: "q6",
      q: "Can I customize the look and feel?",
      a: "Yes, you can easily adjust colors, assistant name, greetings, and toggle icons to match your brand style."
    }
  ]
]

export default function FAQSection() {
  // Keeps track of currently open FAQ item ID
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="py-20 bg-white border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            Click on any question to view the answer.
          </p>
        </motion.div>

        {/* 2-Column Grid with Y-Axis Center Divider */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Vertical Center Border Line (Desktop Only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-200 -translate-x-1/2" />

          {/* Left Column */}
          <div className="space-y-4">
            {faqs[0].map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50/50 hover:border-zinc-300 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full p-4 text-left font-medium text-zinc-900 text-sm flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-zinc-400 shrink-0"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-4 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3 bg-white">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {faqs[1].map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (idx + 3) * 0.08 }}
                className="border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50/50 hover:border-zinc-300 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full p-4 text-left font-medium text-zinc-900 text-sm flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-zinc-400 shrink-0"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-4 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3 bg-white">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}