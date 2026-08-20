import React from 'react';

const STEPS_DATA = [
  {
    step: "01",
    title: "Create & Train Agent",
    desc: "Set up your AI agent in seconds, configure custom system prompts, and train it instantly using your site's documentation or FAQs."
  },
  {
    step: "02",
    title: "Copy Embed Script",
    desc: "Generate a lightweight, secure 1-line HTML snippet directly from your admin dashboard with customized widget themes."
  },
  {
    step: "03",
    title: "Paste & Go Live",
    desc: "Paste the snippet into your website header to start handling real-time visitor queries and resolving support tickets 24/7."
  }
];

export default function Working() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-zinc-900">How It Works</h2>
        <p className="text-sm text-zinc-500 mt-2">
          Get your AI support agent live in 3 simple steps
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {STEPS_DATA.map((item) => (
          <div 
            key={item.step} 
            className="flex flex-col items-start p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300 w-full"
          >
            <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm mb-5 border border-blue-100">
              {item.step}
            </span>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}