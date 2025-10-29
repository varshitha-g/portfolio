// Basic Chatbot
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("userInput");

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.textContent = `${sender}: ${text}`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage("You", text);
  userInput.value = "";

  setTimeout(() => {
    addMessage("Bot", getBotReply(text));
  }, 500);
}

function getBotReply(msg) {
  const q = msg.toLowerCase();

  if (q.includes("skill")) return "AWS, Azure, Databricks, PySpark, Airflow, Delta Lake, dbt, Terraform.";
  if (q.includes("experience")) return "3+ years: FedEx, Knowledge Solutions, CloudEnd Platform.";
  if (q.includes("project")) return "Real-time logistics, churn prediction, healthcare ETL forecasting.";
  if (q.includes("contact")) return "You can reach me at varshithag1908@gmail.com.";
  return "I can tell you about skills, experience, projects, or contact details.";
}
