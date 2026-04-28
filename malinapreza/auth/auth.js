// ============ REGISTER PAGE ============
if (document.getElementById('registerForm')) {
  const form = document.getElementById('registerForm');
  const errorMsg = document.getElementById('errorMessage');
  const successMsg = document.getElementById('successMessage');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Очистка сообщений
    errorMsg.classList.remove('show');
    successMsg.classList.remove('show');

    // Валидация
    if (password !== confirmPassword) {
      showError('Пароли не совпадают');
      return;
    }

    if (password.length < 8) {
      showError('Пароль должен быть минимум 8 символов');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Регистрация...';

    try {
      // Сохраняем email в localStorage для следующего шага
      localStorage.setItem('pendingEmail', email);
      
      // TODO: отправить на бэкенд
      console.log('Register:', { email, password });

      showSuccess('Отправляем код на твой email...');
      
      setTimeout(() => {
        // Переходим на страницу верификации
        window.location.href = './verify.html';
      }, 2000);
    } catch (error) {
      showError('Ошибка регистрации. Попробуй ещё раз.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Зарегистрироваться';
    }
  });

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.add('show');
  }

  function showSuccess(message) {
    successMsg.textContent = message;
    successMsg.classList.add('show');
  }
}

// ============ LOGIN PAGE ============
if (document.getElementById('loginForm')) {
  const form = document.getElementById('loginForm');
  const errorMsg = document.getElementById('errorMessage');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    errorMsg.classList.remove('show');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Вход...';

    try {
      // TODO: отправить на бэкенд для логина
      console.log('Login:', { email, password });

      // Если логин успешен, сохраняем данные и идём на дашборд
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isAuthenticated', 'true');

      setTimeout(() => {
        window.location.href = '../dashboard/index.html';
      }, 1000);
    } catch (error) {
      showError('Неверный email или пароль');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Войти';
    }
  });

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.add('show');
  }
}

// ============ VERIFY PAGE ============
if (document.getElementById('verifyForm')) {
  const form = document.getElementById('verifyForm');
  const codeInputs = document.querySelectorAll('.code-input');
  const errorMsg = document.getElementById('errorMessage');
  const submitBtn = document.getElementById('submitBtn');
  const resendBtn = document.getElementById('resendBtn');
  const emailDisplay = document.getElementById('emailDisplay');
  const timerDisplay = document.getElementById('timer');

  const pendingEmail = localStorage.getItem('pendingEmail');
  emailDisplay.textContent = pendingEmail || 'твой email';

  // Auto-move между инпутами
  codeInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (e.target.value && index < codeInputs.length - 1) {
        codeInputs[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        codeInputs[index - 1].focus();
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const code = Array.from(codeInputs)
      .map((input) => input.value)
      .join('');

    if (code.length !== 6) {
      showError('Введи все 6 цифр');
      return;
    }

    errorMsg.classList.remove('show');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Проверка...';

    try {
      // TODO: отправить код на бэкенд
      console.log('Verify code:', code);

      localStorage.setItem('userEmail', pendingEmail);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.removeItem('pendingEmail');

      setTimeout(() => {
        window.location.href = '../dashboard/index.html';
      }, 1000);
    } catch (error) {
      showError('Неверный код. Попробуй ещё раз.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Подтвердить';
      codeInputs.forEach((input) => (input.value = ''));
      codeInputs[0].focus();
    }
  });

  // Resend логика
  let resendTimer = 60;

  resendBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (resendTimer > 0) return;

    resendBtn.disabled = true;
    resendTimer = 60;

    try {
      // TODO: отправить код ещё раз на бэкенд
      console.log('Resend code to:', pendingEmail);

      startResendTimer();
    } catch (error) {
      showError('Ошибка при отправке кода');
      resendBtn.disabled = false;
    }
  });

  function startResendTimer() {
    const interval = setInterval(() => {
      resendTimer--;
      if (resendTimer > 0) {
        timerDisplay.textContent = `Отправить заново через ${resendTimer}с`;
      } else {
        clearInterval(interval);
        resendBtn.disabled = false;
        timerDisplay.textContent = '';
      }
    }, 1000);
  }

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.add('show');
  }
}
