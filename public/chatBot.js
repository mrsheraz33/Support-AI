(function () {

  const scriptTag = document.currentScript
  const ownerId = scriptTag ? scriptTag.getAttribute("data-owner-id") : null

  if (!ownerId) {
    console.error("Support AI Widget: 'data-owner-id' attribute is missing!")
    return
  }

  const baseUrl = scriptTag.src ? new URL(scriptTag.src).origin : "http://localhost:3000"
  const API_URL = `${baseUrl}/api/chat`

  let messages = [
    { sender: "bot", text: "Hello! How can I help you today?" }
  ]
  let isLoading = false
  let isOpen = false

  const button = document.createElement("div")
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  `
  Object.assign(button.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    backgroundColor: "#09090b",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
    zIndex: "999999",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    userSelect: "none"
  })

  const box = document.createElement("div")
  Object.assign(box.style, {
    position: "fixed",
    bottom: "90px",
    right: "24px",
    width: "360px",
    height: "520px",
    maxHeight: "calc(100vh - 120px)",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)",
    zIndex: "999998",
    overflow: "hidden",
    display: "none",
    flexDirection: "column",
    opacity: "0",
    transform: "translateY(15px) scale(0.95)",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  })

  box.innerHTML = `
  <!-- Header -->
<div style="padding: 16px; background: #09090b; color: white; display: flex; align-items: center; justify-content: space-between;">
  <div style="display: flex; align-items: center; gap: 10px;">
    <div style="width: 10px; height: 10px; background: #10b981; border-radius: 50%;"></div>
    <span style="font-weight: 600; font-size: 14px;">Support AI Assistant</span>
  </div>
  
  <!-- Close Button -->
  <button 
    id="ai-chat-close-btn" 
    style="background: transparent; border: none; color: #a1a1aa; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 4px; border-radius: 6px; transition: color 0.2s;"
    onmouseenter="this.style.color='#ffffff'"
    onmouseleave="this.style.color='#a1a1aa'"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>
</div>

    <!-- Messages Container -->
    <div id="ai-chat-messages" style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; background: #fafafa;">
    </div>

    <!-- Input Area -->
    <form id="ai-chat-form" style="padding: 12px; border-top: 1px solid #e4e4e7; background: #ffffff; display: flex; gap: 8px; align-items: center;">
      <input 
        type="text" 
        id="ai-chat-input" 
        placeholder="Type a message..." 
        style="flex: 1; border: 1px solid #e4e4e7; border-radius: 12px; padding: 10px 14px; font-size: 14px; outline: none; background: #f4f4f5; transition: border 0.2s;"
      />
      <button 
        type="submit" 
        id="ai-chat-send"
        style="background: #09090b; color: white; border: none; border-radius: 12px; padding: 10px 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: opacity 0.2s;"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  `

  document.body.appendChild(button)
  document.body.appendChild(box)

  const messagesDiv = box.querySelector("#ai-chat-messages")
  const form = box.querySelector("#ai-chat-form")
  const input = box.querySelector("#ai-chat-input")
  const sendBtn = box.querySelector("#ai-chat-send")

  function renderMessages() {
    messagesDiv.innerHTML = messages.map(msg => `
      <div style="display: flex; justify-content: ${msg.sender === "user" ? "flex-end" : "flex-start"};">
        <div style="
          max-width: 80%; 
          padding: 10px 14px; 
          border-radius: 14px; 
          font-size: 13px; 
          line-height: 1.4;
          ${msg.sender === "user" 
            ? "background: #09090b; color: white; border-bottom-right-radius: 2px;" 
            : "background: #ffffff; color: #09090b; border: 1px solid #e4e4e7; border-bottom-left-radius: 2px;"}
        ">
          ${msg.text}
        </div>
      </div>
    `).join("")

    if (isLoading) {
      messagesDiv.innerHTML += `
        <div style="display: flex; justify-content: flex-start;">
          <div style="background: #ffffff; color: #71717a; border: 1px solid #e4e4e7; padding: 8px 12px; border-radius: 12px; font-size: 12px;">
            Typing...
          </div>
        </div>
      `
    }

    messagesDiv.scrollTop = messagesDiv.scrollHeight
  }


  renderMessages()

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const text = input.value.trim()
    if (!text || isLoading) return

    messages.push({ sender: "user", text })
    input.value = ""
    isLoading = true
    renderMessages()

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerId, message: text })
      })

      const data = await response.json()

      messages.push({ 
        sender: "bot", 
        text: data.response || "Sorry, I couldn't process your request." 
      })
    } catch (error) {
      console.error(error)
      messages.push({ 
        sender: "bot", 
        text: "Something went wrong. Please try again later." 
      })
    } finally {
      isLoading = false
      renderMessages()
    }
  })

  const closeBtn = box.querySelector("#ai-chat-close-btn")

closeBtn.addEventListener("click", () => {
  isOpen = false
  box.style.opacity = "0"
  box.style.transform = "translateY(15px) scale(0.95)"
  
  setTimeout(() => {
    box.style.display = "none"
  }, 250)

  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  `
})

  button.addEventListener("click", () => {
    isOpen = !isOpen
    if (isOpen) {
      box.style.display = "flex"
      setTimeout(() => {
        box.style.opacity = "1"
        box.style.transform = "translateY(0) scale(1)"
      }, 10)
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `
    } else {
      box.style.opacity = "0"
      box.style.transform = "translateY(15px) scale(0.95)"
      setTimeout(() => { box.style.display = "none" }, 250)
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
        </svg>
      `
    }
  })
})()