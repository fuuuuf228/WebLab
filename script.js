// 1. Зберігаємо інформацію у localStorage
const systemInfo = {
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    platform: navigator.platform,
    userAgent: navigator.userAgent,
};
localStorage.setItem("systemInfo", JSON.stringify(systemInfo));

// 1б. Відображаємо в футері
window.addEventListener("load", () => {
    const footer = document.querySelector("footer");
    const data = JSON.parse(localStorage.getItem("systemInfo"));
    const info = document.createElement("p");
    info.textContent = `Інфо про браузер: ${data.platform}, ${data.userAgent}`;
    footer.appendChild(info);
});

// Функція для закриття модального вікна
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Показ модального вікна через 60 секунд
setTimeout(() => {
    document.getElementById("modal").style.display = "block";
}, 60000);

// Тема
function setTheme(mode) {
    document.body.className = mode;
    localStorage.setItem("theme", mode);
}

function toggleTheme() {
    const current = localStorage.getItem("theme") || "day";
    const newTheme = current === "day" ? "night" : "day";
    setTheme(newTheme);
}

function autoTheme() {
    const hour = new Date().getHours();
    const theme = (hour >= 7 && hour <= 21) ? "day" : "night";
    setTheme(theme);
}
autoTheme();

// Отримання коментарів через API
fetch('https://jsonplaceholder.typicode.com/posts/17/comments')
  .then(response => response.json())
  .then(data => {
    // Виводимо коментарі на сторінку
    const commentsContainer = document.getElementById('comments');
    data.forEach(comment => {
      const commentElement = document.createElement('div');
      commentElement.classList.add('comment');
      commentElement.innerHTML = `
        <h3>${comment.name}</h3>
        <p><strong>Email:</strong> ${comment.email}</p>
        <p>${comment.body}</p>
        <hr>
      `;
      commentsContainer.appendChild(commentElement);
    });
  })
  .catch(error => console.log(error));
