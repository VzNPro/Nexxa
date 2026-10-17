const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

test("arquivos essenciais e três canais presentes", () => {
  for (const filename of ["styles.css", "links.js", "script.js", "assets/nexxa-logo.png"]) {
    assert.ok(fs.statSync(path.join(root, filename)).size > 0, filename);
  }
  for (const channel of ["whatsapp", "instagram", "telegram"]) {
    assert.match(html, new RegExp(`data-channel="${channel}"`));
  }
  assert.equal((html.match(/data-channel=/g) || []).length, 3);
});

function evaluateLinks(config) {
  const elements = ["whatsapp", "instagram", "telegram"].map((channel) => ({
    dataset: { channel },
    href: "#",
    listeners: {},
    addEventListener(type, callback) { this.listeners[type] = callback; }
  }));
  const year = { textContent: "" };
  const document = {
    querySelectorAll() { return elements; },
    querySelector() { return null; },
    getElementById(id) { return id === "year" ? year : null; }
  };
  const context = { document, URL, window: { NEXXA_LINKS: config } };
  vm.runInNewContext(script, context);
  return { elements, year };
}

test("URLs oficiais configuradas abrem de forma segura", () => {
  const { elements, year } = evaluateLinks({
    whatsapp: "https://wa.me/5521999999999",
    instagram: "https://www.instagram.com/nexxamedia/",
    telegram: "https://t.me/referencias"
  });
  assert.deepEqual(elements.map((element) => element.href), [
    "https://wa.me/5521999999999",
    "https://www.instagram.com/nexxamedia/",
    "https://t.me/referencias"
  ]);
  elements.forEach((element) => {
    assert.equal(element.target, "_blank");
    assert.equal(element.rel, "noopener noreferrer");
  });
  assert.equal(year.textContent, String(new Date().getFullYear()));
});

test("URLs vazias ou inesperadas não redirecionam", () => {
  const { elements } = evaluateLinks({
    whatsapp: "https://wa.me/55DDDNUMERO",
    instagram: "https://exemplo.com/perfil",
    telegram: ""
  });
  elements.forEach((element) => {
    assert.equal(element.href, "#");
    assert.equal(typeof element.listeners.click, "function");
  });
});
