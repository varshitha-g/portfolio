/* ===================== Links & basic UI ===================== */
const LINKS = {
  github:   "https://github.com/varshitha-g",
  linkedin: "https://www.linkedin.com/in/varshitha-gudimalla-data-engineer/",
  portfolio:"https://varshitha-g.github.io/portfolio/",
  resume:   "#" // replace with your PDF later
};

// map IDs to link keys (works for icons, inline, and footer links)
[
  ["ghLink","github"],["ghLink2","github"],["ghLinkInline","github"],
  ["liLink","linkedin"],["liLink2","linkedin"],["liLinkInline","linkedin"],
  ["pfLink","portfolio"],["pfLink2","portfolio"],["pfLinkInline","portfolio"],
].forEach(([id,key])=>{
  const el = document.getElementById(id);
  if (el) el.href = LINKS[key];
});

// resume button
const resumeBtn = document.getElementById("resumeLink");
if (resumeBtn) resumeBtn.href = LINKS.resume;

// smooth scroll for in-page tabs
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click", e=>{
    const id = link.getAttribute("href");
    if (id && id.length>1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:"smooth", block:"start"});
    }
  });
});

// footer year
const yr = document.getElementById("yr");
if (yr) yr.textContent = new Date().getFullYear();

/* ===================== Chatbot (VG logo + greeting) ===================== */
const chatToggle = document.getElementById("chat-toggle");
const chatPanel  = document.getElementById("chat-panel");
const chatWin    = document.getElementById("chat-window");
const userInput  = document.getElementById("userInput");
const sendBtn    = document.getElementById("sendBtn");
const chatGreet  = document.getElementById("chat-greet");
const greetClose = document.querySelector(".chat-greet-close");

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

  // very lightweight rule-based responses aligned to your resume
  function botReply(q){
    const s = q.toLowerCase();

    if (/(contact|email|reach|phone)/.test(s))
      return "Reach Varshitha at varshithag1908@gmail.com or use the Connect section.";
    if (/(resume|cv)/.test(s))
      return "Use the View Resume button once the link is added, or email me via Connect.";
    if (/(skill|skills|stack|tech|tools?)/.test(s))
      return "Languages: Python, SQL, PySpark · Big Data: Spark, Delta, Hive, SparkSQL · Cloud: AWS (S3, Glue, Redshift, Lambda, Step Functions), Snowflake · Orchestration: Airflow, Databricks Workflows, Jenkins · Quality: Great Expectations, Glue Catalog, Hive Metastore · DevOps: Git, Terraform, CI/CD · BI: Power BI, Tableau · Security: IAM, PII handling.";
    if (/(experience|work|fedex|knowledge|cloudend)/.test(s))
      return "FedEx: high-complexity secure ETL + monitoring; Knowledge Solutions: Databricks ETL + CI/CD; CloudEnd: HIPAA ETL + forecasting.";
    if (/(project|projects)/.test(s))
      return "Real-Time Shipment Tracker (<30s), Retention Analytics (churn/NPS), Healthcare Forecasting (Prophet 85% accuracy).";
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

  // toggle chat panel; hide greeting if opening
  chatToggle.addEventListener("click", ()=>{
    const isHidden = chatPanel.hasAttribute("hidden");
    if (isHidden) chatPanel.removeAttribute("hidden");
    else chatPanel.setAttribute("hidden","");
    chatToggle.setAttribute("aria-expanded", String(isHidden));
    if (!isHidden && chatGreet && !chatGreet.hasAttribute("hidden")) chatGreet.setAttribute("hidden","");
  });

  // send message helpers
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

  // one-time greeting per session
  try {
    const shown = sessionStorage.getItem("vg_greet_shown");
    if (!shown && chatGreet) {
      setTimeout(()=>{
        chatGreet.removeAttribute("hidden");
        sessionStorage.setItem("vg_greet_shown","1");
        setTimeout(()=>{ if (!chatPanel || chatPanel.hasAttribute("hidden")) chatGreet.setAttribute("hidden",""); }, 7000);
      }, 900);
    }
  } catch { /* ignore sessionStorage issues */ }

  // close greeting manually
  if (greetClose && chatGreet) {
    greetClose.addEventListener("click", ()=> chatGreet.setAttribute("hidden",""));
  }
}
