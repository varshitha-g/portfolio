// --- Real Links for Varshitha Gudimalla ---
const LINKS = {
  github:   "https://github.com/varshitha-g",
  linkedin: "https://www.linkedin.com/in/varshitha-gudimalla-data-engineer/",
  portfolio:"https://varshitha-g.github.io/portfolio/",
  resume:   "#" // update this when resume link is ready
};

// Top Icons
document.getElementById("ghLink").href = LINKS.github;
document.getElementById("liLink").href = LINKS.linkedin;

// Connect Section Links
document.getElementById("ghLink2").href = LINKS.github;
document.getElementById("liLink2").href = LINKS.linkedin;
document.getElementById("pfLink2").href = LINKS.portfolio;

// Resume Button
const resumeBtn = document.getElementById("resumeLink");
if (resumeBtn) resumeBtn.href = LINKS.resume;

// Smooth Scroll for Tabs
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const id = link.getAttribute("href");
    if (id && id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Footer Year
document.getElementById("yr").textContent = new Date().getFullYear();
