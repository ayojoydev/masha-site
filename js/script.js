document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Управление аудио
    const audioToggleBtn = document.getElementById('audio-toggle');
    const bgAudio = document.getElementById('bg-audio');
    let isPlaying = false;

    audioToggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgAudio.pause();
            audioToggleBtn.innerHTML = '<span class="icon">🔇</span> Звук выкл';
        } else {
            // Пытаемся запустить аудио (браузеры могут блокировать автоплей)
            bgAudio.play().then(() => {
                audioToggleBtn.innerHTML = '<span class="icon">🔊</span> Звук вкл';
            }).catch(error => {
                console.log('Автовоспроизведение заблокировано браузером', error);
            });
        }
        isPlaying = !isPlaying;
    });

    // 2. Интерактивный слайдер "Было/Стало"
    const slider = document.getElementById('ba-slider');
    const sliderContainer = document.querySelector('.before-after-slider');
    const sliderLine = document.querySelector('.ba-line');
    const sliderHandle = document.querySelector('.ba-handle');

    if (slider) {
        slider.addEventListener('input', (e) => {
            const sliderValue = e.target.value;
            // Используем CSS-переменную для управления clip-path
            sliderContainer.style.setProperty('--clip-position', `${sliderValue}%`);
            // Передвигаем линию и ползунок
            sliderLine.style.left = `${sliderValue}%`;
            sliderHandle.style.left = `${sliderValue}%`;
        });
    }

    // 3. Плавная прокрутка для якорных ссылок
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Учитываем высоту фиксированного меню
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Эффект параллакса или появления меню при скролле
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
});
