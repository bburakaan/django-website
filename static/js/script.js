function textFrom(selector, fallback) {
  const node = document.querySelector(selector);
  return node ? node.textContent.trim() : fallback;
}

function attrFrom(selector, attribute, fallback) {
  const node = document.querySelector(selector);
  return node ? node.getAttribute(attribute) || fallback : fallback;
}

function appendLinkedText(container, text) {
  const linkPattern = /(https?:\/\/[^\s]+|\/media\/[^\s]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;
  let cursor = 0;
  let match = linkPattern.exec(text);

  while (match) {
    if (match.index > cursor) {
      container.append(document.createTextNode(text.slice(cursor, match.index)));
    }

    const value = match[0];
    const link = document.createElement('a');
    link.className = 'console-link';
    link.textContent = value;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.href = value.includes('@') && !value.startsWith('http') ? `mailto:${value}` : value;
    container.append(link);

    cursor = match.index + value.length;
    match = linkPattern.exec(text);
  }

  if (cursor < text.length) {
    container.append(document.createTextNode(text.slice(cursor)));
  }
}

const consoleProfile = {
  name: textFrom('[data-console-name]', 'Burak Kaan Ocak'),
  role: textFrom('[data-console-role]', 'Information Systems Engineering Student'),
  lead: textFrom('[data-console-lead]', 'Kisisel portfolyo sistemi.'),
  about: textFrom('[data-console-about]', 'Hakkimda alani henuz doldurulmadi.'),
  email: attrFrom('.console-shell', 'data-console-email', 'bburakaan@icloud.com'),
  phone: attrFrom('.console-shell', 'data-console-phone', '+90 505 326 9261'),
  location: attrFrom('.console-shell', 'data-console-location', 'Istanbul, Turkey'),
  github: attrFrom('.console-shell', 'data-console-github', 'https://github.com/bburakaan'),
  linkedin: attrFrom('.console-shell', 'data-console-linkedin', 'https://www.linkedin.com/in/burak-kaan-ocak-34a4212b6'),
  pdf: attrFrom('.console-shell', 'data-console-pdf', '/media/BURAK_KAAN_OCAK_CV.pdf'),
};

function addMessage(text, type) {
  const chatLog = document.querySelector('#chatLog');
  if (!chatLog) return;

  const message = document.createElement('div');
  message.className = `message ${type || 'bot'}`;

  const label = document.createElement('span');
  label.className = 'message-label';
  label.textContent = type === 'user' ? 'guest' : 'system';
  message.append(label);

  text.split('\n').forEach((line, index) => {
    if (index > 0) message.append(document.createElement('br'));
    if (index === 0) message.append(document.createElement('br'));
    appendLinkedText(message, line);
  });

  chatLog.append(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function normalizeCommand(input) {
  return input.toLocaleLowerCase('tr-TR').trim();
}

function replyFor(input) {
  const text = normalizeCommand(input);

  if (!text) return 'Komut bekleniyor.';

  if (['temizle', 'clear', 'cls'].includes(text)) {
    const chatLog = document.querySelector('#chatLog');
    if (chatLog) chatLog.replaceChildren();
    return null;
  }

  if (text.includes('yard') || text.includes('help') || text.includes('komut')) {
    return 'Komutlar\nhakkimda: kisa profil ozeti\ncv: egitim ve durum ozeti\nyetenekler: teknik yetenekler\nprojeler: proje listesi\niletisim: tum baglanti kanallari\npdf: CV dosya yolu\ntemizle: konsolu sifirla\nIpucu: klavyede yukari/asagi ile komut gecmisini gezebilirsin.';
  }

  if (text.includes('hakk') || text.includes('kim') || text.includes('bio')) {
    return `${consoleProfile.name}\n${consoleProfile.role}\n${consoleProfile.about}`;
  }

  if (text.includes('cv') || text.includes('deneyim') || text.includes('egitim')) {
    return 'CV Ozeti\nEgitim: Piri Reis University - B.Sc. Information Systems Engineering (Oct 2022 - Present)\nOdak: Data engineering, real-time analytics, e-commerce clickstream/event data\nDersler: OOP, Web Development, DBMS, Algorithms & Data Structures, Machine Learning\nDurum: Internship firsatlari araniyor.';
  }

  if (text.includes('skill') || text.includes('stack') || text.includes('yetenek')) {
    return 'Yetenekler\nProgramming: Python, Java, JavaScript, C\nDatabases: SQL, NoSQL, PostgreSQL\nData & Streaming: Apache Kafka, Spark Streaming\nTools: Git, Linux\nLanguages: Turkish Native, English B2-C1';
  }

  if (text.includes('proje') || text.includes('project')) {
    return 'Projeler\n1. Real-Time Data Processing Pipeline: click/pageview/add-to-cart eventleri icin streaming veri hatti\n2. Customer Purchase Behavior Analysis: funnel ve cohort metrikleri\n3. Django Personal CV App: PyCharm + Django + template/static/media/admin yapisi';
  }

  if (text.includes('pdf') || text.includes('resume')) {
    return `CV PDF: ${consoleProfile.pdf}`;
  }

  if (text.includes('mail') || text.includes('eposta') || text.includes('e-posta')) {
    return `E-posta: ${consoleProfile.email}`;
  }

  if (text.includes('telefon') || text.includes('phone')) {
    return `Telefon: ${consoleProfile.phone}`;
  }

  if (text.includes('github')) {
    return `GitHub: ${consoleProfile.github}`;
  }

  if (text.includes('linkedin')) {
    return `LinkedIn: ${consoleProfile.linkedin}`;
  }

  if (text.includes('iletisim') || text.includes('contact') || text.includes('ulas')) {
    return `Iletisim\nE-posta: ${consoleProfile.email}\nTelefon: ${consoleProfile.phone}\nKonum: ${consoleProfile.location}\nLinkedIn: ${consoleProfile.linkedin}\nGitHub: ${consoleProfile.github}`;
  }

  return "Bunu henuz bilmiyorum. 'yardim' yazarak komutlari gorebilirsin.";
}

function setupChat() {
  const form = document.querySelector('#chatForm');
  const input = document.querySelector('#chatInput');
  const clear = document.querySelector('#clearChat');
  const shell = document.querySelector('.console-shell');
  const history = [];
  let historyIndex = 0;

  if (!form || !input) return;

  function runCommand(value) {
    const command = value.trim();
    if (!command) return;
    history.push(command);
    historyIndex = history.length;
    addMessage(command, 'user');
    input.value = '';
    const reply = replyFor(command);
    if (reply) addMessage(reply, 'bot');
  }

  function submitCurrentInput(event) {
    event.preventDefault();
    runCommand(input.value);
  }

  form.addEventListener('submit', submitCurrentInput);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      submitCurrentInput(event);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex] || '';
      input.setSelectionRange(input.value.length, input.value.length);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] || '';
      input.setSelectionRange(input.value.length, input.value.length);
    }
  });

  input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && input.value.trim()) {
      submitCurrentInput(event);
    }
  });

  document.querySelectorAll('[data-command]').forEach((button) => {
    button.addEventListener('click', () => {
      const command = button.dataset.command || '';
      runCommand(command);
    });
  });

  if (clear) {
    clear.addEventListener('click', () => {
      const chatLog = document.querySelector('#chatLog');
      if (chatLog) chatLog.replaceChildren();
      addMessage('Baglanti yenilendi.', 'bot');
    });
  }

  if (shell) {
    shell.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement) return;
      input.focus();
    });
  }

  addMessage('Merhaba. BURAK.SYS aktif. Cevaplar sadece konsola yazilir.', 'bot');
}

function setupReveal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll(
    '.hero, .section, .identity-panel, .timeline-item, .skill-card, .project-card, .fact-grid div, .contact-links a, .contact-form'
  );

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  items.forEach((item) => item.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupCanvas() {
  const canvas = document.querySelector('#signalCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const points = [];
  const codeDrops = [];
  const codeSnippets = [
    'async def stream():',
    'SELECT * FROM events;',
    'kafka.consume()',
    'POST /api/cv 200',
    'git push origin main',
    'dashboard.render()',
    'user.event.click',
    'spark.window(5m)',
    'const profile = BK;',
    'status: online',
  ];
  let width = 0;
  let height = 0;
  let frame = 0;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    points.length = 0;
    codeDrops.length = 0;

    const count = Math.max(38, Math.floor((width * height) / 22000));
    for (let i = 0; i < count; i += 1) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
      });
    }

    const spacing = width < 720 ? 138 : 104;
    const dropCount = Math.max(12, Math.floor(width / spacing) + 4);
    for (let i = 0; i < dropCount; i += 1) {
      codeDrops.push({
        x: Math.min(width - 130, i * spacing + Math.random() * 52),
        y: Math.random() * height,
        speed: 0.22 + Math.random() * 0.34,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        phase: Math.random() * 80,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    points.forEach((point, index) => {
      if (!reduceMotion) {
        point.x += point.vx;
        point.y += point.vy;
      }

      if (point.x < 0 || point.x > width) point.vx *= -1;
      if (point.y < 0 || point.y > height) point.vy *= -1;

      ctx.fillStyle = index % 3 === 0 ? 'rgba(240, 181, 71, 0.54)' : 'rgba(55, 224, 137, 0.45)';
      ctx.fillRect(point.x, point.y, 2, 2);

      for (let j = index + 1; j < points.length; j += 1) {
        const other = points[j];
        const dx = point.x - other.x;
        const dy = point.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 128) {
          ctx.strokeStyle = `rgba(104, 199, 216, ${0.16 - distance / 900})`;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    });

    ctx.save();
    ctx.font = '12px "SFMono-Regular", Consolas, "Liberation Mono", monospace';
    ctx.textBaseline = 'top';
    codeDrops.forEach((drop, index) => {
      if (!reduceMotion) {
        drop.y += drop.speed;
        if (drop.y > height + 36) {
          drop.y = -42 - Math.random() * 80;
          drop.x = Math.random() * Math.max(1, width - 170);
          drop.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }
      }

      const pulse = 0.62 + Math.sin((frame + drop.phase) / 34) * 0.22;
      ctx.shadowBlur = 8;
      ctx.shadowColor = index % 2 === 0 ? 'rgba(104, 199, 216, 0.24)' : 'rgba(55, 224, 137, 0.2)';
      ctx.fillStyle =
        index % 2 === 0
          ? `rgba(104, 199, 216, ${0.28 * pulse})`
          : `rgba(55, 224, 137, ${0.24 * pulse})`;
      ctx.fillText(drop.text, drop.x, drop.y);
    });
    ctx.restore();

    frame += 1;
    if (frame % 80 < 45) {
      ctx.strokeStyle = 'rgba(55, 224, 137, 0.16)';
      ctx.beginPath();
      ctx.moveTo(0, (frame * 3) % height);
      ctx.lineTo(width, (frame * 3) % height);
      ctx.stroke();
    }

    if (!reduceMotion) requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
}

setupChat();
setupReveal();
setupCanvas();
