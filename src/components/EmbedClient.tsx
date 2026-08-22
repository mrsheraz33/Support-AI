"use client"
import {motion} from "motion/react"
import { useRouter } from "next/navigation";
import { useState } from "react";

function EmbedClient({ ownerId }: { ownerId: string }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false)

  const embedCode = `<script 
  src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js" 
  data-owner-id="${ownerId}">
</script>`
   
  const copyCode =()=>{
  navigator.clipboard.writeText(embedCode)
  setCopied(true)

  setTimeout(() => {
      setCopied(false)
  }, 2000);
  }
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="sticky top-0 z-40 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-lg font-semibold tracking-tight cursor-pointer"
            onClick={() => router.push("/")}
          >
            Support <span className="text-zinc-400">AI</span>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 rounded-lg border border-zinc-300
            text-sm hover:bg-zinc-100 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>


<div className="flex justify-center px-4 py-14">
<motion.div
initial={{opacity:0, y:20}}
animate={{opacity:1, y:0}}
transition={{duration:0.5}}
className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10">

<h1 className="text-xl font-semibold mb-2 text-zinc-900">Embed Chat Agent</h1>
<p className="text-sm text-zinc-600 mb-4">
  Copy and paste this code before <code>&lt;/body&gt;</code>
</p>

<div className="relative bg-zinc-900 text-zinc-100 rounded-xl 
p-5 text-sm font-mono mb-10 mt-1.5">
<pre className="overflow-x-auto mt-3 mb-3">{embedCode}</pre>

<button className="absolute top-3 right-3  bg-white text-zinc-900 text-xs 
font-medium px-3 py-1 rounded-lg hover:bg-zinc-200 transition"
onClick={copyCode}>
    {copied ? "copied ✔" : "copy"}
</button>
</div>

<ol className="space-y-3 text-sm text-zinc-600 list-decimal list-inside">
  <li>Copy the embed script.</li>
  <li>Paste it before the closing &lt;/body&gt; tag.</li>
  <li>Reload your website to view the chatbot.</li>
</ol>


<div className="mt-14">
<h1 className="text-lg font-medium mb-2">Live Preview</h1>
<p className="text-sm text-zinc-500 mb-6">This is how the chatbot will appear or your website</p>

<div className="rounded-xl border border-zinc-300 bg-white shadow-md overflow-hidden">
<div className="flex items-center gap-2 px-4 h-9 bg-zinc-100 border-b border-zinc-200">
    <span className="w-2.5 h-2.5 rounded-full bg-red-400"/>
    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"/>
    <span className="w-2.5 h-2.5 rounded-full bg-green-400"/>

    <span className="ml-4 text-xs text-zinc-500">Your-website.com</span>
</div>

<div className="relative h-64 sm:h-72 p-6 text-zinc-600 text-sm">
  Your website goes here

  <div className="absolute bottom-16 right-6 w-48 md:w-60 bg-white rounded-xl 
  shadow-xl border border-zinc-200 overflow-hidden text-xs mt-2">
    <div className="bg-zinc-950 text-white p-2.5 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-green-400"></span>
        <span className="font-medium">AI Assistant</span>
      </div>
      <span className="cursor-pointer text-zinc-400 hover:text-white">✕</span>
    </div>

    <div className="p-3 bg-zinc-50 space-y-2">
      <div className="bg-white p-2 rounded-lg border border-zinc-200 text-zinc-800 w-fit">
        Hello! How can I help?
      </div>
    </div>

    <div className="p-2 border-t border-zinc-100 bg-white flex gap-1">
      <input type="text" placeholder="Type..." className="w-full bg-zinc-100 p-1.5
       rounded text-[11px] outline-none" readOnly />
      <button className="bg-zinc-950 text-white px-2 py-1 rounded text-[10px]">Send</button>
    </div>
  </div>

 <div className="absolute bottom-4 right-6 w-10 h-10 rounded-full bg-zinc-950
  text-white flex items-center justify-center shadow-lg cursor-pointer">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
   strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
  </svg>
</div>
</div>


</div>
</div>
</motion.div>
</div>

    </div>
  );
}

export default EmbedClient;
