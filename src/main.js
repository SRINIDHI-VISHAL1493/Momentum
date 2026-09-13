import './style.css';

const today = new Date();
const isoToday = today.toISOString().slice(0, 10);
const defaultTasks = [
  { id: 1, title: 'Finish UI design case study', course: 'Design portfolio', date: isoToday, priority: 'high', duration: '1h 30m', done: false, tag: 'DESIGN' },
  { id: 2, title: 'Review calculus lecture notes', course: 'MATH 201', date: isoToday, priority: 'medium', duration: '50 min', done: false, tag: 'STUDY' },
  { id: 3, title: 'Send project update to team', course: 'WebFascinators', date: isoToday, priority: 'high', duration: '25 min', done: false, tag: 'TEAM' },
  { id: 4, title: 'Read chapter 4: Research methods', course: 'PSY 110', date: isoToday, priority: 'low', duration: '50 min', done: true, tag: 'READING' },
  { id: 5, title: 'Organize project references', course: 'Design portfolio', date: isoToday, priority: 'low', duration: '25 min', done: true, tag: 'ADMIN' },
  { id: 6, title: 'Practice presentation opening', course: 'Communication', date: '', priority: 'medium', duration: '25 min', done: false, tag: 'PRACTICE' }
];
let tasks = JSON.parse(localStorage.getItem('momentum-tasks') || 'null') || defaultTasks;
let filter = 'all';
const list = document.querySelector('#taskList');
const persist = () => localStorage.setItem('momentum-tasks', JSON.stringify(tasks));

function render() {
  const visible = tasks.filter(t => filter === 'all' || (filter === 'today' && t.date === isoToday) || (filter === 'high' && t.priority === 'high'));
  list.innerHTML = visible.map(t => `<article class="task ${t.done ? 'done' : ''}" data-id="${t.id}"><button class="check" aria-label="Mark ${t.title} ${t.done ? 'incomplete' : 'complete'}">${t.done ? '✓' : ''}</button><div class="task-body"><div class="task-title"><h3>${escape(t.title)}</h3>${t.priority === 'high' ? '<span class="priority">HIGH</span>' : ''}</div><p>${escape(t.course || 'Personal')} · ${t.duration}</p></div><span class="task-tag">${escape(t.tag || 'TASK')}</span><button class="delete" aria-label="Delete ${t.title}">×</button></article>`).join('') || '<p class="empty">Nothing here yet. Add a task and create some momentum.</p>';
  const done = tasks.filter(t => t.done).length, total = tasks.length;
  document.querySelector('#taskCount').textContent = tasks.filter(t => !t.done).length;
  document.querySelector('#progressNum').textContent = done;
  document.querySelector('#progressBar').style.width = `${Math.round(done / total * 100)}%`;
  document.querySelector('#progressText').textContent = done === total ? 'Your whole list is complete. Beautiful.' : `${total - done} task${total - done === 1 ? '' : 's'} left — you’ve got this.`;
}
function escape(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
list.addEventListener('click', e => {
  const card = e.target.closest('.task'); if (!card) return; const id = Number(card.dataset.id);
  if (e.target.closest('.check')) { tasks = tasks.map(t => t.id === id ? {...t, done: !t.done} : t); persist(); render(); }
  if (e.target.closest('.delete')) { tasks = tasks.filter(t => t.id !== id); persist(); render(); }
});
document.querySelectorAll('.filter').forEach(b => b.addEventListener('click', () => { filter = b.dataset.filter; document.querySelectorAll('.filter').forEach(x => x.classList.toggle('active', x === b)); render(); }));
const dialog = document.querySelector('#taskDialog');
document.querySelectorAll('#openTask, #openTask2').forEach(b => b.addEventListener('click', () => dialog.showModal()));
document.querySelector('#taskForm').addEventListener('submit', e => { e.preventDefault(); const f = new FormData(e.currentTarget); const title = f.get('title').trim(); if (!title) return; tasks.unshift({id: Date.now(), title, course: 'Personal project', date: f.get('date'), priority: f.get('priority'), duration: f.get('duration'), done: false, tag: 'NEW'}); persist(); render(); e.currentTarget.reset(); dialog.close(); });
let seconds = 25 * 60, ticking;
const button = document.querySelector('#timerButton'), display = document.querySelector('#timerDisplay');
button.addEventListener('click', () => { if (ticking) { clearInterval(ticking); ticking = null; button.innerHTML = 'Resume focus <span>→</span>'; return; } button.innerHTML = 'Pause session <span>Ⅱ</span>'; ticking = setInterval(() => { seconds--; display.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; if (!seconds) { clearInterval(ticking); ticking = null; button.textContent = 'Session complete ✓'; } }, 1000); });
document.querySelector('.menu-button').addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('show'));
document.querySelector('#dateLabel').textContent = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase();
render();
