/**
 * Воспроизведение премиального фонового трека: Музарт — «Күзгі бақ»
 */

let audio: HTMLAudioElement | null = null;
let isAudioPlaying = false;

// Путь к файлу в папке public (без начального слэша для стабильности на GitHub Pages)
const AUDIO_SRC = "/birthday-invitation/muzart.mp3"; 

export function playAmbientMusic() {
  try {
    // Если аудио уже создано и играет, ничего не делаем
    if (audio) {
      if (audio.paused && isAudioPlaying) {
        audio.play().catch(() => console.log("Ожидание клика для старта трека..."));
      }
      return;
    }

    // Инициализируем аудио элемент
    audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 1.0;
    
    // СТРАТЕГИЯ: Стартуем в режиме muted (тишина), чтобы браузеры на проде не заблокировали поток
    audio.muted = true;
    isAudioPlaying = true;

    // Пытаемся запустить фоновое воспроизведение
    audio.play()
      .then(() => {
        console.log("Трек 'Күзгі бақ' успешно запущен в фоновом режиме.");
      })
      .catch((err) => {
        console.log("Автоплей ожидает первого действия пользователя на странице...", err);
      });

    // Функция-Активатор: при первом же скролле, тапе или клике включаем звук на полную
    const unmuteAndPlayReal = () => {
      if (audio) {
        audio.muted = false;
        audio.volume = 1.0;
        
        // На случай, если трек стоял на паузе — пинаем его
        audio.play().then(() => {
          isAudioPlaying = true;
        });
      }
      // Звук пошел — полностью удаляем временные перехватчики
      removeAllInteractionListeners();
    };

    const removeAllInteractionListeners = () => {
      window.removeEventListener('click', unmuteAndPlayReal);
      window.removeEventListener('touchstart', unmuteAndPlayReal);
      window.removeEventListener('scroll', unmuteAndPlayReal);
      window.removeEventListener('mousemove', unmuteAndPlayReal);
    };

    // Слушаем абсолютно любые триггеры активности гостя на сайте
    window.addEventListener('click', unmuteAndPlayReal, { passive: true });
    window.addEventListener('touchstart', unmuteAndPlayReal, { passive: true });
    window.addEventListener('scroll', unmuteAndPlayReal, { passive: true });
    window.addEventListener('mousemove', unmuteAndPlayReal, { passive: true });

  } catch (err) {
    console.warn("Не удалось инициализировать аудиофайл Музарт:", err);
  }
}

export function stopAmbientMusic() {
  isAudioPlaying = false;
  if (audio) {
    try {
      audio.pause();
    } catch (_) {}
    audio = null;
  }
}