// --- Real Links for Varshitha Gudimalla ---
const LINKS = {
  github:   "https://github.com/varshitha-g",
  linkedin: "https://www.linkedin.com/in/varshitha-gudimalla-data-engineer/",
  portfolio:"https://varshitha-g.github.io/portfolio/",
  resume:   "#" // add your resume PDF link later
};

// Header icons
const gh = document.getElementById("ghLink");
const li = document.getElementById("liLink");
if (gh) gh.href = LINKS.github;
if (li) li.href = LINKS.linkedin;

// Connect links
const gh2 = document.getElementById("ghLink2");
const li2 = document.getElementById("liLink2");
const pf2 = document.getElementById("pfLink2");
if (gh2) gh2.href = LINKS.github;
if (li2) li2.href = LINKS.linkedin;
if (pf2) pf2.href = LINKS.portfolio;

// Resume button
const resumeBtn = document.getElementById("resumeLink");
if (resumeBtn) resumeBtn.href = LINKS.resume;

// Smooth in-page scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const id = link.getAttribute("href");
    if (id && id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Footer year
const yr = document.getElementById("yr");
if (yr) yr.textContent = new Date().getFullYear();

/* ===================== Chatbot ===================== */
const chatToggle = document.getElementById("chat-toggle");
const chatPanel  = document.getElementById("chat-panel");
const chatWin    = document.getElementById("chat-window");
const userInput  = document.getElementById("userInput");
const sendBtn    = document.getElementById("sendBtn");

if (chatToggle && chatPanel && chatWin && userInput && sendBtn) {
  const storageKey = "vg_chat_msgs";

  function renderMessages(msgs){
    chatWin.innerHTML = "";
    msgs.forEach(m=>{
      const div = document.createElement("div");
      div.className = `msg ${m.role}`;
      div.textContent = m.text;
      chatWin.appendChild(div);
    });
    chatWin.scrollTop = chatWin.scrollHeight;
  }

  function loadMessages(){
    try { return JSON.parse(localStorage.getItem(storageKey)) || []; }
    catch { return []; }
  }

  function saveMessages(msgs){
    localStorage.setItem(storageKey, JSON.stringify(msgs));
  }

  function botReply(q){
    const s = q.toLowerCase();

    if (/(resume|cv)/.test(s)) return "Share your email in Contact, and I’ll send the latest resume (or check the Resume button when available).";
    if (/(contact|email|reach|phone)/.test(s)) return "Reach Varshitha at varshithag1908@gmail.com or use the form in the Contact section.";
    if (/(skill|stack|tech|tools?)/.test(s)) return "Core: Python, SQL, PySpark, Databricks, Airflow, Delta, dbt, Terraform. Cloud: AWS & Azure. BI: Power BI, Tableau.";
    if (/(experience|work|fedex|knowledge|cloudend)/.test(s)) return "3+ yrs across FedEx (1B+ records/day), Knowledge Solutions (Azure 500GB/day), CloudEnd (HIPAA ETL).";
    if (/(project|portfolio|github)/.test(s)) return "Real-time logistics (<30s), retention analytics (+5–7%), healthcare forecasting (85% accuracy).";
    if (/(hire|availability|location|onsite|remote)/.test(s)) return "Based in USA. Open to remote/hybrid/onsite.";
    return "I can answer about skills, experience, projects, or contact. Try: “What are your AWS skills?”";
  }

  let messages = loadMessages();
  if (messages.length === 0) {
    messages = [{role:"bot", text:"Hi! I’m Varshitha’s assistant. Ask me about skills, experience, projects, or contact."}];
    saveMessages(messages);
  }
  renderMessages(messages);

  chatToggle.addEventListener("click", ()=>{
    const hidden = chatPanel.hasAttribute("hidden");
    if (hidden) chatPanel.removeAttribute("hidden");
    else chatPanel.setAttribute("hidden","");
    chatToggle.setAttribute("aria-expanded", String(hidden));
  });

  function sendMessage(){
    const text = userInput.value.trim();
    if (!text) return;
    messages.push({role:"user", text});
    renderMessages(messages);
    saveMessages(messages);
    userInput.value = "";
    setTimeout(()=>{
      const reply = botReply(text);
      messages.push({role:"bot", text: reply});
      renderMessages(messages);
      saveMessages(messages);
    }, 350);
  }

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keydown", e => { if (e.key === "Enter") sendMessage(); });
}
