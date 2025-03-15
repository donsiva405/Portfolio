document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Intersection Observer for fade-in sections (for About, Services, Software, Contact)
  const fadeSections = document.querySelectorAll(".fade-section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
        // Stagger contact links if present
        const contactLinks = entry.target.querySelectorAll(".contact-link");
        contactLinks.forEach((link, index) => {
          setTimeout(() => {
            link.style.opacity = 1;
            link.style.transform = "translateY(0)";
          }, index * 200);
        });
      }
    });
  }, { threshold: 0.2 });
  fadeSections.forEach(section => observer.observe(section));

  // Companies Section - Continuous Conveyor Belt (No Fade)
  const logoTrack = document.getElementById("logoTrack");
  if (logoTrack) {
    let offset = 0;
    const speed = 1;       // 1px per frame
    const interval = 16;   // ~60fps

    setInterval(() => {
      offset -= speed;
      logoTrack.style.transform = `translateX(${offset}px)`;

      // If the first logo is completely off-screen, re-append it
      const firstLogo = logoTrack.querySelector("img");
      if (firstLogo) {
        const firstRect = firstLogo.getBoundingClientRect();
        const containerRect = logoTrack.parentElement.getBoundingClientRect();
        if (firstRect.right < containerRect.left) {
          logoTrack.removeChild(firstLogo);
          logoTrack.appendChild(firstLogo);
          offset += firstLogo.width;
        }
      }
    }, interval);
  }
});
