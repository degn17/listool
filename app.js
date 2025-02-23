// 获取DOM元素引用
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

// 从localStorage加载数据或初始化空数组
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 初始化渲染
renderTodos();

// 添加任务事件监听
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

// 核心功能函数
function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const newTodo = {
    id: Date.now(), // 使用时间戳作为唯一ID
    text: text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  saveAndRender();
  todoInput.value = "";
}

function toggleComplete(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveAndRender();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveAndRender();
}

// 渲染函数
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.innerHTML = `
            <input 
                type="checkbox" 
                ${todo.completed ? "checked" : ""}
                onchange="toggleComplete(${todo.id})"
            >
            <label>${todo.text}</label>
            <button 
                class="delete-btn"
                onclick="deleteTodo(${todo.id})"
            >删除</button>
        `;
    todoList.appendChild(li);
  });
}

// 数据持久化
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function saveAndRender() {
  saveToLocalStorage();
  renderTodos();
}
