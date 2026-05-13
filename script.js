const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
        const response = await fetch('https://formspree.io/f/mqenjneo', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form),
        });

        if (response.ok) {
            success.style.display = 'block';
            form.reset();
            setTimeout(() => success.style.display = 'none', 5000);
        } else {
            alert('Erro ao enviar. Tente novamente.');
        }
    } catch {
        alert('Sem conexão. Tente novamente.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
    }
});
