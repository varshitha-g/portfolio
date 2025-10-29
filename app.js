// Set your real links here:
const LINKS = {
  github:   "https://github.com/varshitha-g",
  linkedin: "https://www.linkedin.com/in/varshitha-gudimalla-data-engineer/",
  resume:   "https://your-domain.com/Varshitha_Gudimalla_Resume.pdf",
  portfolio:"https://varshitha-g.github.io/portfolio/"
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
const resume = document.getElementById("resumeLink");
if (resume) resume.href = LINKS.resume;

// Smooth scroll for in-page tabs
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click", e=>{
    const id = a.getAttribute("href");
    if (id && id.length>1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:"smooth", block:"start"});
    }
  });
});

// Footer year
document.getElementById("yr").textContent = new Date().getFullYear();
