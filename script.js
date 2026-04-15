// INTRO
const intro = document.getElementById("intro");
const site = document.getElementById("site");

setTimeout(() => {
    intro.style.opacity = 0;

    setTimeout(() => {
        intro.style.display = "none";
        site.style.opacity = 1;
    }, 800);

}, 2000);

// SCROLL SUAVE PROFISSIONAL
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        smoothScrollTo(offsetPosition, 900);
    });
});

function smoothScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        const progress = Math.min(timeElapsed / duration, 1);

        const ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startY + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// RESET FLEX (evita bug raro)
const lineup = document.querySelector(".team-lineup");

if (lineup) {
    lineup.addEventListener("mouseleave", () => {
        document.querySelectorAll(".player").forEach(p => {
            p.style.flex = "1";
        });
    });
}

// GITHUB API
async function carregarRepos() {
    const response = await fetch("https://api.github.com/orgs/SUA-ORG/repos");
    const repos = await response.json();

    const container = document.getElementById("repos");

    repos.forEach(repo => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "Sem descrição"}</p>
            <a href="${repo.html_url}" target="_blank">Ver projeto</a>
        `;

        container.appendChild(card);
    });
}

carregarRepos();