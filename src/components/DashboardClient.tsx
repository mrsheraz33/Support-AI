"use client"
import axios from "axios"
import { Check } from "lucide-react"
import {AnimatePresence, motion} from "motion/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function DashboardClient({ownerId}:{ownerId:string}) {
    const router = useRouter()
    const [businessName, setBusinessName]= useState("")
    const [supportEmail, setSupportEmail]= useState("")
    const [knowledge, setKnowledge]= useState("")
    const [loading, setLoading] = useState(false)
    const [saved, setSaved]= useState(false)
    
const handelSetting = async ()=>{
    setLoading(true)
    try {
        const result = await axios.post("/api/setting",
            {ownerId, businessName, supportEmail, knowledge}
        )

        console.log(result.data)
        setLoading(false)
        setSaved(true)
        setTimeout(() => {
        setSaved(false)
        }, 3000);
    } catch (error) {
        console.log(error)
          setLoading(false)
    }
}

useEffect(()=>{
if(ownerId){
    const handelGetDetails= async ()=>{
    try {
        const {data} = await axios.post("/api/setting/get",{ownerId})
        setBusinessName(data.businessName)
        setSupportEmail(data.supportEmail)
        setKnowledge(data.knowledge)

    } catch (error) {
        console.log(error)
    }
    }
     handelGetDetails()
}
},[])

  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900'>
<motion.div
initial={{y:-50}}
animate={{y:0}}
transition={{duration:0.6}}
className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="text-lg font-semibold tracking-tight cursor-pointer"
      onClick={()=> router.push("/")}>
        Support <span className="text-zinc-400">AI</span></div>
<button className="px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100
transition" onClick={()=> router.push("/embed")}>Embed ChatBot</button>
    </div>
</motion.div>


<div className="flex justify-center px-4 py-14 mt-20">
<motion.div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10">
<div className="mb-10">
  <h1 className="text-2xl font-bold text-zinc-900 whitespace-nowrap">Agent Settings</h1>
<p className="text-sm text-zinc-500 mt-1.5">Configure your AI assistant’s knowledge base and business context.</p>
</div>


<div className="mb-10">
<h1 className="text-lg font-medium mb-10">Business Details</h1>
<div className="space-y-4">
    <input type="text" className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm
    focus:outline-none focus:ring-2 focus:ring-black/80" placeholder="Business Name"
    onChange={(e)=> setBusinessName(e.target.value)} value={businessName}/>
    <input type="email" className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm
    focus:outline-none focus:ring-2 focus:ring-black/80" placeholder="Support Email"
     onChange={(e)=> setSupportEmail(e.target.value)} value={supportEmail}/>
</div>
</div>

<div className="mb-10 max-w-2xl">
  <div className="mb-6">
    <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
      Knowledge Base
    </h1>
    <p className="text-sm text-zinc-500 mt-1">
      Add FAQs, delivery info, return policies, and business rules to train your AI agent.
    </p>
  </div>

  <div className="space-y-2">
    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-600">
      Business Rules & FAQs
    </label>
    
    <textarea
     onChange={(e)=> setKnowledge(e.target.value)} value={knowledge}
      className="w-full rounded-xl h-54 md:h-40 border border-zinc-200 bg-zinc-50/50 px-4 py-3 
      text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white
      focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 
      transition-all duration-200 resize-y"
      placeholder=
      {`Example:\n• Refund Policy: 7-day return policy for unused items.\n• Delivery Info: Free shipping on orders over $50.\n• Support Hours: Mon-Fri, 9 AM - 6 PM.`}
    />
  </div>
</div>

<div className="flex items-center gap-5">
<motion.button 
disabled={loading}
whileHover={{scale:1.03}}
whileTap={{scale:0.97}}
className="px-7 py-3 rounded-xl bg-black text-white text-sm font-medium
hover:bg-zinc-800 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
onClick={handelSetting}>
  {loading ? "Saving...": "Save"}
</motion.button>

<AnimatePresence>
              {saved && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 mt-3"
                >
                  <Check className="h-4 w-4 stroke-[2.5]" />
                  <span>Settings Saved</span>
                </motion.div>
              )}
</AnimatePresence>

</div>
</motion.div>
</div>
    </div>
  )
}

export default DashboardClient