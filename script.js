// ano no footer
document.getElementById("year").textContent = new Date().getFullYear();

// menu mobile
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

// contador animado
const counters = document.querySelectorAll("[data-count]");

function animateCounters() {
  counters.forEach((el) => {
    const target = Number(el.dataset.count);
    let current = 0;

    const step = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, 18);
  });
}

const hero = document.querySelector(".hero");
const io = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      io.disconnect();
    }
  },
  { threshold: 0.4 }
);
io.observe(hero);

// form fake
const form = document.getElementById("contactForm");
const hint = document.getElementById("formHint");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  hint.textContent = "Mensagem pronta. Depois conectamos com envio de verdade ✨";
  form.reset();
});

// =========================
// PROJETOS (dados + render)
// =========================
const projects = [
  {
    title: "Blog do meu jogo",
    desc: "Blog com devlogs, páginas de personagens e atualizações do projeto. Foco em layout, leitura e identidade visual.",
    tags: ["frontend", "design"],
    demo: "#",
    code: "#",
  },
  {
    title: "Meu jogo (Ren’Py)",
    desc: "Visual novel em Ren’Py: narrativa, escolhas e apresentação de UI. Trabalho com roteiro, estética e organização de cenas.",
    tags: ["renpy", "design"],
    demo: "#",
    code: "#",
  },
  {
    title: "Joguinho de adivinhação (Python)",
    desc: "Mini game de lógica: entrada do usuário, validação e feedback. Base ótima pra mostrar fundamentos.",
    tags: ["python"],
    demo: "#",
    code: "#",
  },
  {
    title: "Coleção de projetos básicos",
    desc: "Agendamento SUS, cronômetro de estágio, layout kawaii/animes, site de cosméticos estilo anime e RadioKawaii (em progresso).",
    tags: ["frontend", "design"],
    demo: "#",
    code: "#",
  },
  {
    title: "Gerador de senhas (Python)",
    desc: "Gera senhas fortes com opções de tamanho e tipos de caracteres. Foco em clareza e boas práticas.",
    tags: ["python"],
    demo: "#",
    code: "#",
  },
  {
    title: "Pega doces (Python)",
    desc: "Jogo simples com movimentação e pontuação. Mostra lógica de game loop e interações.",
    tags: ["python", "games"],
    demo: "#",
    code: "#",
  },
];

const grid = document.getElementById("projectsGrid");

function chipLabel(tag) {
  const map = {
    frontend: "Front-end",
    design: "Design",
    renpy: "Ren’Py",
    python: "Python",
    games: "Games",
  };
  return map[tag] || tag;
}

function renderProjects(filter = "all") {
  grid.innerHTML = "";

  const filtered = projects.filter((p) =>
    filter === "all" ? true : p.tags.includes(filter)
  );

  filtered.forEach((p, index) => {
    const card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0;

    const chips = p.tags
      .map((t) => `<span>${chipLabel(t)}</span>`)
      .join("");

    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="chips">${chips}</div>
      <div class="links">
        <a href="#" data-open="${index}">Detalhes</a>
        <a href="${p.demo}" target="_blank" rel="noreferrer">Demo</a>
        <a href="${p.code}" target="_blank" rel="noreferrer">Código</a>
      </div>
    `;

    grid.appendChild(card);
  });
}

renderProjects();

// filtros
const filterButtons = document.querySelectorAll(".chip[data-filter]");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

// modal
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTags = document.getElementById("modalTags");
const modalLinks = document.getElementById("modalLinks");
const modalClose = document.getElementById("modalClose");

function openModal(project) {
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;

  modalTags.innerHTML = project.tags
    .map((t) => `<span>${chipLabel(t)}</span>`)
    .join("");

  modalLinks.innerHTML = `
    <a href="${project.demo}" target="_blank" rel="noreferrer">Abrir demo</a>
    <a href="${project.code}" target="_blank" rel="noreferrer">Ver código</a>
  `;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (e) => {
  const openBtn = e.target.closest("[data-open]");
  if (openBtn) {
    e.preventDefault();
    const idx = Number(openBtn.dataset.open);
    openModal(projects[idx]);
  }

  if (e.target === modal) closeModal();
});

modalClose.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});