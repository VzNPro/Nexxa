(function () {
  "use strict";

  const links = window.NEXXA_LINKS || {};
  const allowedHosts = {
    whatsapp: new Set(["wa.me", "api.whatsapp.com", "whatsapp.com", "www.whatsapp.com"]),
    instagram: new Set(["instagram.com", "www.instagram.com", "m.instagram.com"]),
    telegram: new Set(["t.me", "www.t.me", "telegram.me", "www.telegram.me"])
  };
  const toast = document.getElementById("link-toast");
  let toastTimer;

  function validLink(value, channel) {
    if (typeof value !== "string" || !value.trim()) return null;

    try {
      const url = new URL(value.trim());
      if (url.protocol !== "https:" || !allowedHosts[channel].has(url.hostname.toLowerCase())) return null;
      if (url.pathname === "/" || /seu[_-]?(numero|usuario|canal)/i.test(url.pathname)) return null;
      if (channel === "whatsapp" && url.hostname.toLowerCase() === "wa.me" && !/^\/\d{10,15}\/?$/.test(url.pathname)) return null;
      if (channel === "whatsapp" && url.hostname.toLowerCase() !== "wa.me" && !/^\d{10,15}$/.test(url.searchParams.get("phone") || "")) return null;
      return url.href;
    } catch (_) {
      return null;
    }
  }

  function showToast() {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("link-toast--visible"));
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("link-toast--visible");
      window.setTimeout(() => { toast.hidden = true; }, 220);
    }, 3000);
  }

  document.querySelectorAll("[data-channel]").forEach((element) => {
    const channel = element.dataset.channel;
    const destination = validLink(links[channel], channel);
    if (destination) {
      element.href = destination;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    } else {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        showToast();
      });
    }
  });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const panel = document.querySelector(".links-panel");
  if (panel && window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
    panel.addEventListener("pointermove", (event) => {
      const rect = panel.getBoundingClientRect();
      panel.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
      panel.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
    });
  }
})();
