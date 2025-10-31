// --- Real links for Varshitha ---
const LINKS = {
  github:   "https://github.com/varshitha-g",
  linkedin: "https://www.linkedin.com/in/varshitha-gudimalla-data-engineer/",
  portfolio:"https://varshitha-g.github.io/portfolio/",
  resume:   "#" // add your resume PDF later (e.g., /Varshitha_Gudimalla_Resume.pdf)
};

// Hook icons + inline links + footer year
[
  ["ghLink","github"],["ghLink2","github"],["ghLinkInline","github"],
  ["liLink","linkedin"],["liLink2","linkedin"],["liLinkInline","linkedin"],
  ["pfLink","portfolio"],["pfLink2","portfolio"],["pfLinkInline","portfolio"],
].forEach(([id,key]) => { const el = document.getElementById(id); if (el) el.href = LINKS[key]; });

const resumeBtn = document.getElementById("resumeLink");
if (resumeBtn) resumeBtn.href = LINKS.resume;

const yr = document.getElementById("yr");
if (yr) yr.textContent = new Date().getFullYear();

// Smooth in-page scroll for nav tabs
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const id = link.getAttribute("href");
    if (id && id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

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

    // Simple intents aligned to your resume/portfolio
    if (/(contact|email|reach|phone)/.test(s))
      return "Reach Varshitha at varshithag1908@gmail.com or use the Connect section.";
    if (/(resume|cv)/.test(s))
      return "Use the View Resume button (top of page) once the link is added, or email me via Connect.";
    if (/(skill|skills|stack|tech|tools?)/.test(s))
      return "Languages: Python, SQL, PySpark · Big Data: Spark, Delta, Hive · Cloud: AWS, Snowflake · Orchestration: Airflow, DBX Workflows, Jenkins · Quality: Great Expectations · DevOps: Git, Terraform, CI/CD · BI: Power BI, Tableau · Security: IAM, PII.";
    if (/(experience|work|fedex|knowledge|cloudend)/.test(s))
      return "FedEx: secure, SLA-driven ETL/monitoring; Knowledge Solutions: Databricks ETL + CI/CD; CloudEnd: HIPAA ETL + forecasting.";
    if (/(project|projects)/.test(s))
      return "Examples: Real-time Shipment Tracker (<30s visibility), Retention Analytics (churn/NPS), Healthcare Forecasting (Prophet 85% accuracy).";
    if (/(education|school|degree)/.test(s))
      return "MS Data Science (UAlbany, 2025) and B.Tech CSE (CMR, 2022).";
    if (/(hire|availability|location|onsite|remote)/.test(s))
      return "Based in USA; open to remote/hybrid/onsite roles.";

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
    }, 300);
  }

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keydown", e => { if (e.key === "Enter") sendMessage(); });
}
