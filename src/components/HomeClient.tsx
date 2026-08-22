"use client"
import {AnimatePresence, motion} from "motion/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { MessageSquare, MessageCircle, Bot } from 'lucide-react';
import Footer from "./Footer"
import Working from "./Working"
import SocialProof from "./SocialProof"
import axios from "axios"
import FAQSection from "./FAQSection"

function HomeClient({email,picture}:{email:string,picture:string}) {

 const [open, setOpen]= useState(false)
 const popupRef = useRef<HTMLDivElement>(null)
 const [loading, setLoading] = useState(false)

 useEffect(()=>{
  const handler =(e:MouseEvent)=>{
    if(popupRef.current && !popupRef.current.contains(e.target as Node)){
    setOpen(false)
    }

  }
document.addEventListener("mousedown", handler)

return ()=> document.removeEventListener("mousedown", handler)
 },[])

  const router = useRouter()
  const handelLogin =()=>{
    setLoading(true)
    window.location.href = "/api/auth/login"
  }
   const firstLetter = email?.charAt(0)?.toUpperCase() || ""

const features = [
  {
    title: "1-Minute Integration",
    desc: "Embed your custom AI agent seamlessly into any website using a simple, single-line script tag."
  },
  {
    title: "24/7 Automated Resolution",
    desc: "Instantly resolve up to 80% of routine customer inquiries without human intervention."
  },
  {
    title: "Multi-Tenant Architecture",
    desc: "Manage multiple websites, custom knowledge bases, and team permissions from a unified dashboard."
  }
];

const handelLogOut = async ()=>{
  try {
    const result = await axios.get("/api/auth/logout")
    window.location.href = "/"
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className='min-h-screen bg-linear-to-br from-white to-zinc-50
    text-zinc-900 overflow-x-hidden'>

<motion.div
initial={{y:-50}}
animate={{y:0}}
transition={{duration:0.6}}
className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="text-lg font-semibold tracking-tight cursor-pointer"
      onClick={()=> router.push("/")}>
        Support <span className="text-zinc-400">AI</span></div>

        {
        email ? 
        <div className="relative" ref={popupRef}>
 
<div className="relative"
onClick={()=> setOpen(prev => !prev)}>
{
picture ?
<div className="relative w-10 h-10 overflow-hidden rounded-full 
border-2 border-gray-500 shadow-sm transition-all duration-300 
hover:scale-105 hover:border-black/40 hover:shadow-md cursor-pointer">
  <Image 
    src={picture} 
    alt="userImage" 
    fill 
    sizes="40px"
    className="object-cover" 
  />
</div>:
<button className="w-10 h-10 rounded-full bg-black text-white flex items-center
    justify-center font-semibold hover:scale-105 transition"
   >{firstLetter}</button>
}
</div>

<AnimatePresence> 
{open && 
<motion.div
initial={{opacity:0, y:-6}}
animate={{opacity:1, y:0}}
exit={{opacity:0, y:-6}}

className="absolute right-0 mt-3 w-44 shadow-xl border border-zinc-200 overflow-hidden rounded-xl">
<button className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-100"
onClick={()=> router.push("/dashboard")}>Dashboard</button>
<button className=" w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-zinc-100"
onClick={handelLogOut}>Logout</button>
</motion.div>
}
</AnimatePresence>
        </div> : 
        <button
        disabled={loading}
      onClick={handelLogin}
      className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition
      disabled:opacity-60 flex items-center gap-2">
      {loading ? "loading..." : "  Login"}
      </button>
        }

    </div>
</motion.div>

<section className="pt-36 pb-28 px-6" id="home">
<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
<motion.div
initial={{opacity:0, y:40}}
animate={{opacity:1, y:0}}
transition={{duration:0.7}}
>
<h1 className="text-4xl md:text-6xl font-normal tracking-tight text-gray-900 leading-tight">
  Next-Gen AI Support <br />
  Built for Modern Websites
</h1>
  <p className="text-lg md:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto mt-3">
    Deliver instant 24/7 resolution to your users with an intelligent embeddable chat agent.
  </p>
<div className="mt-10 flex gap-4">
  {
  email ? 
  <button className="px-7 py-3 rounded-xl bg-black text-white font-medium
    hover:bg-zinc-800 transition disabled:opacity-60"
    onClick={()=> router.push("/dashboard")}>Go to Dashboard</button>
    :
     <button className="px-7 py-3 rounded-xl bg-black text-white font-medium
    hover:bg-zinc-800 transition disabled:opacity-60"
     onClick={handelLogin}>Get Started</button> 
}
   

  <a href="#feature" className="px-7 py-3 rounded-xl border border-zinc-300 
    hover:bg-zinc-100 transition text-zinc-700">Learn More</a>
</div>
</motion.div>

<motion.div
initial={{opacity:0, scale:0.95}}
animate={{opacity:1, scale:1}}
transition={{duration:0.7, delay:0.2}}
 className="relative">
<div className="rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6">
<div className="text-sm text-zinc-500 mb-3" >Live Chat Preview</div>

<div className="space-y-3">
  <div className="bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto
  w-fit">Do you offer cash on delivery?</div>
   <div className="bg-zinc-100 rounded-lg px-4 py-2 text-sm w-fit">Yes, cash on delivery is available.</div>
</div>
<motion.div
animate={{y:[0,-12 , 0]}}
transition={{repeat: Infinity, duration:3}}
className="absolute -bottom-6 -right-4 w-14 h-14 rounded-full bg-black
text-white flex items-center justify-center shadow-xl">
<MessageCircle className="w-5 h-5" />
</motion.div>

</div>
</motion.div>

</div>
</section>

<SocialProof/>

<section
id="features"
 className="bg-zinc-50 py-15 px-6 border-t border-zinc-200">
<div className="max-w-6xl mx-auto">
<motion.h2
initial={{opacity:0, y:20}}
whileInView={{opacity:1, y:0}}
viewport={{once:false}}
transition={{duration:0.5}}
className="text-3xl text-center font-bold">
Why Businesses Choose Support <span className="text-zinc-400">AI</span>
</motion.h2>

<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
{features.map((f,i)=>(
  <motion.div
  key={i}
  initial={{opacity:0,y:30}}
  whileInView={{opacity:1, y:0}}
  transition={{delay: i * 0.1}}
  viewport={{once:false}}
  className="bg-white rounded-2xl p-8 shadow-lg border border-zinc-200">
<h1 className="text-lg font-medium">{f.title}</h1>
<p className="mt-3 text-zinc-600 text-sm">{f.desc}</p>
  </motion.div>
))}
</div>
</div>
</section>

<section id="how-it-works"> 
  <Working/>
</section>

<section id="faq">
  <FAQSection/>
</section>

<Footer/>
    </div>
  )
}

export default HomeClient