// Tanggal hari ini
const date = new Date();
document.getElementById("date").innerText =
  date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

// ===== JADWAL SEKOLAH =====
let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

function addSchedule() {
  const day = document.getElementById("day").value;
  const subject = document.getElementById("subject").value;
  const time = document.getElementById("time").value;

  if (!day || !subject || !time) {
    alert("Lengkapi semua data jadwal!");
    return;
  }

  schedules.push({ day, subject, time });
  localStorage.setItem("schedules", JSON.stringify(schedules));

  document.getElementById("day").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("time").value = "";

  renderSchedules();
}

function renderSchedules() {
  const list = document.getElementById("scheduleList");
  list.innerHTML = "";

  schedules.forEach((item, index) => {
    list.innerHTML += `
      <li>
        ${item.day} - ${item.subject} (${item.time})
        <span onclick="deleteSchedule(${index})">❌</span>
      </li>
    `;
  });
}

function deleteSchedule(index) {
  schedules.splice(index, 1);
  localStorage.setItem("schedules", JSON.stringify(schedules));
  renderSchedules();
}

// ===== TASK HARIAN =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  if (!taskInput.value) return;

  tasks.push({ text: taskInput.value, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    list.innerHTML += `
      <li class="${task.completed ? "completed" : ""}">
        <span onclick="toggleTask(${index})">${task.text}</span>
        <span onclick="deleteTask(${index})">❌</span>
      </li>
    `;
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Render saat load
renderSchedules();
renderTasks();
