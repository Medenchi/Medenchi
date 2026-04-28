// Проверка авторизации
if (!localStorage.getItem('isAuthenticated')) {
  window.location.href = '../auth/login.html';
}

// Элементы
const userEmailEl = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');
const createBtn = document.getElementById('createBtn');
const createModal = document.getElementById('createModal');
const closeModal = document.getElementById('closeModal');
const createForm = document.getElementById('createPresentationForm');
const presentationsGrid = document.getElementById('presentationsGrid');
const emptyState = document.getElementById('emptyState');

const userEmail = localStorage.getItem('userEmail');
userEmailEl.textContent = userEmail;

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userEmail');
  window.location.href = '../index.html';
});

// Открыть/закрыть модал
createBtn.addEventListener('click', () => {
  createModal.classList.add('show');
});

closeModal.addEventListener('click', () => {
  createModal.classList.remove('show');
});

createModal.addEventListener('click', (e) => {
  if (e.target === createModal) {
    createModal.classList.remove('show');
  }
});

// Создание презентации
createForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('presentationName').value;
  const topic = document.getElementById('presentationTopic').value;
  const slideCount = document.getElementById('slideCount').value;

  console.log('Create presentation:', { name, topic, slideCount });

  // TODO: отправить на бэкенд

  // Для демо — добавляем презентацию в список
  addPresentationCard({
    id: Date.now().toString(),
    name,
    topic,
    slideCount,
    createdAt: new Date().toLocaleDateString('ru-RU'),
  });

  createForm.reset();
  createModal.classList.remove('show');
});

function addPresentationCard(data) {
  emptyState.style.display = 'none';

  const card = document.createElement('div');
  card.className = 'presentation-card';
  card.innerHTML = `
    <div class="presentation-card-thumbnail">📊</div>
    <div class="presentation-card-content">
      <div class="presentation-card-title">${data.name}</div>
      <div class="presentation-card-meta">
        <span>${data.slideCount} слайдов</span>
        <span>${data.createdAt}</span>
      </div>
      <div class="presentation-card-actions">
        <button class="card-action-btn" onclick="editPresentation('${data.id}')">
          Редактировать
        </button>
        <button class="card-action-btn" onclick="deletePresentation('${data.id}')">
          Удалить
        </button>
      </div>
    </div>
  `;

  presentationsGrid.insertBefore(card, presentationsGrid.firstChild);
}

function editPresentation(id) {
  console.log('Edit presentation:', id);
  // TODO: переход в редактор
}

function deletePresentation(id) {
  console.log('Delete presentation:', id);
  // TODO: удаление с бэкенда
}

// Загрузка презентаций (для демо)
function loadPresentations() {
  const presentations = JSON.parse(
    localStorage.getItem('presentations') || '[]'
  );

  if (presentations.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  presentations.forEach((pres) => {
    addPresentationCard(pres);
  });
}

loadPresentations();
