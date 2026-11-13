/* ==========================================================================
   Інтерактивна логіка та візуалізація даних (HTML5 Canvas + DOM)
   Автор: Шумал Анна Володимирівна | 2026
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Мобільне меню навігації
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // 2. Копіювання електронної пошти на сторінці автора
  const copyBtn = document.getElementById("copyEmailBtn");
  const authorEmail = document.getElementById("authorEmail");
  if (copyBtn && authorEmail) {
    copyBtn.addEventListener("click", () => {
      const emailText = authorEmail.textContent.trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(emailText).then(() => {
          copyBtn.textContent = "Скопійовано!";
          setTimeout(() => {
            copyBtn.textContent = "Скопіювати пошту";
          }, 2000);
        });
      }
    });
  }

  // 3. База даних усіх 28 індикаторів Бразилії (за 9 складовими)
  const indicatorsData = [
    // Виробнича
    { comp: "Виробнича", name: "Урожайність зернових культур, ц/га", first: "50,01 (2015)", last: "50,03 (2024)", avg: "49,50", threshold: "[45; 55] ц/га", trend: "Зростання (+)", level: "Оптимальний", cls: "badge-optimal" },

    // Демографічна
    { comp: "Демографічна", name: "Очікувана тривалість життя жінок, років", first: "78,47 (2015)", last: "79,15 (2024)", avg: "78,40", threshold: "≥ 78 років", trend: "Відновлення після 2021 р.", level: "Оптимальний", cls: "badge-optimal" },
    { comp: "Демографічна", name: "Очікувана тривалість життя чоловіків, років", first: "71,82 (2015)", last: "72,95 (2024)", avg: "71,94", threshold: "≥ 75 (інт. [70; 75])", trend: "Відновлення після 2021 р.", level: "Незадовільний", cls: "badge-unsatisfactory" },
    { comp: "Демографічна", name: "Коефіцієнт дитячої смертності (дівчатка), ‰", first: "12,10 (2015)", last: "10,80 (2024)", avg: "11,52", threshold: "< 11‰ (крит. ≥ 11)", trend: "Спадання (-)", level: "Абсолютно небезпечний", cls: "badge-critical" },
    { comp: "Демографічна", name: "Коефіцієнт дитячої смертності (хлопчики), ‰", first: "15,30 (2015)", last: "13,60 (2024)", avg: "14,47", threshold: "< 11‰ (крит. ≥ 11)", trend: "Спадання (-)", level: "Абсолютно небезпечний", cls: "badge-critical" },
    { comp: "Демографічна", name: "Частка населення віком 65 років і старше, %", first: "7,96 (2015)", last: "11,05 (2024)", avg: "9,45", threshold: "≥ 11% (інт. [0; 11))", trend: "Зростання (старіння)", level: "Абсолютно небезпечний", cls: "badge-critical" },
    { comp: "Демографічна", name: "Демографічне навантаження непрацездатного нас., %", first: "43,59 (2015)", last: "44,33 (2024)", avg: "43,68", threshold: "[40; 45)%", trend: "Підвищення (+)", level: "Задовільний", cls: "badge-satisfactory" },

    // Енергетична
    { comp: "Енергетична", name: "Власне забезпечення енергоносіями, %", first: "91,39 (2015)", last: "110,84 (2024)", avg: "103,76", threshold: "≥ 100%", trend: "Зростання (+)", level: "Оптимальний", cls: "badge-optimal" },
    { comp: "Енергетична", name: "Частка відновлюваної енергії у споживанні, %", first: "43,50 (2012)", last: "46,50 (2021)", avg: "45,28", threshold: "≥ 40%", trend: "Зростання (+)", level: "Оптимальний", cls: "badge-optimal" },
    { comp: "Енергетична", name: "Енергоємність ВВП, МДж/дол. США", first: "3,88 (2013)", last: "3,87 (2022)", avg: "3,97", threshold: "≤ 4,0 МДж/дол.", trend: "Спадання (-)", level: "Задовільний", cls: "badge-satisfactory" },
    { comp: "Енергетична", name: "Втрати електроенергії в мережах, %", first: "17,08 (2012)", last: "16,52 (2021)", avg: "16,40", threshold: "≤ 10% (крит. > 15%)", trend: "Стагнація / коливання", level: "Критичний", cls: "badge-critical" },

    // Зовнішньоекономічна
    { comp: "Зовнішньоекономічна", name: "Відкритість економіки, % ВВП", first: "26,95 (2015)", last: "35,58 (2024)", avg: "31,16", threshold: "Оптим. коридор 25–45%", trend: "Зростання (+)", level: "Оптимальний", cls: "badge-optimal" },
    { comp: "Зовнішньоекономічна", name: "Коефіцієнт покриття імпорту експортом", first: "0,918 (2015)", last: "1,017 (2024)", avg: "1,025", threshold: "≥ 1,00", trend: "Зростання (+)", level: "Оптимальний", cls: "badge-optimal" },

    // Інвестиційно-інноваційна
    { comp: "Інвестиційно-інноваційна", name: "Валове нагромадження основного капіталу, % ВВП", first: "15,52 (2016)", last: "16,84 (2025)", avg: "16,31", threshold: "≥ 25% ВВП", trend: "Повільне зростання (+)", level: "Абсолютно небезпечний", cls: "badge-critical" },
    { comp: "Інвестиційно-інноваційна", name: "Відношення чистого приросту ПІІ до ВВП, %", first: "4,14 (2016)", last: "3,41 (2025)", avg: "3,41", threshold: "≥ 5% ВВП", trend: "Спадання (-)", level: "Абсолютно небезпечний", cls: "badge-critical" },
    { comp: "Інвестиційно-інноваційна", name: "Витрати на наукові дослідження (НДДКР), % ВВП", first: "1,27 (2014)", last: "1,19 (2023)", avg: "1,19", threshold: "≥ 2,0% ВВП", trend: "Спадання (-)", level: "Незадовільний", cls: "badge-unsatisfactory" },
    { comp: "Інвестиційно-інноваційна", name: "Кількість дослідників (у повній зайнятості)", first: "2,79 (2005)", last: "4,51 (2014)", avg: "3,55", threshold: "≥ 3,5 особи", trend: "Зростання (+)", level: "Задовільний", cls: "badge-satisfactory" },
    { comp: "Інвестиційно-інноваційна", name: "Частка користувачів Інтернету, % населення", first: "58,33 (2015)", last: "84,46 (2024)", avg: "74,22", threshold: "≥ 70%", trend: "Зростання (+)", level: "Оптимальний", cls: "badge-optimal" },

    // Макроекономічна
    { comp: "Макроекономічна", name: "Розмір тіньової економіки, % ВВП", first: "38,20 (2013)", last: "37,50 (2023)", avg: "38,56", threshold: "≤ 15% ВВП", trend: "Повільне спадання (-)", level: "Абсолютно небезпечний", cls: "badge-critical" },
    { comp: "Макроекономічна", name: "Сальдо поточного рахунку ПБ, % ВВП", first: "-3,57 (2013)", last: "-1,23 (2023)", avg: "-2,56", threshold: "[-3; +3]% ВВП", trend: "Покращення (+)", level: "Задовільний", cls: "badge-satisfactory" },
    { comp: "Макроекономічна", name: "Рівень безробіття, % робочої сили", first: "7,07 (2013)", last: "7,95 (2023)", avg: "10,46", threshold: "≤ 6% робочої сили", trend: "Спад після піку 2020 р.", level: "Абсолютно небезпечний", cls: "badge-critical" },
    { comp: "Макроекономічна", name: "Рівень інфляції (зміна ІСЦ), %", first: "6,20 (2013)", last: "4,59 (2023)", avg: "6,05", threshold: "≤ 4%", trend: "Волатильне зниження", level: "Небезпечний", cls: "badge-dangerous" },
    { comp: "Макроекономічна", name: "Валові заощадження, % ВНД", first: "15,60 (2013)", last: "16,50 (2023)", avg: "15,41", threshold: "≥ 22% ВНД", trend: "Зростання (+)", level: "Небезпечний", cls: "badge-dangerous" },

    // Продовольча
    { comp: "Продовольча", name: "Середня добова забезпеченість, ккал", first: "3250 (2013)", last: "3450 (2023)", avg: "3354,5", threshold: "3000–3500 ккал", trend: "Зростання (+)", level: "Задовільний", cls: "badge-satisfactory" },
    { comp: "Продовольча", name: "Самозабезпеченість основними продуктами (цукор / олія / м'ясо / молоко / яйця / картопля), %", first: "98,5–160%", last: "100,8–195%", avg: "> 100%", threshold: "≥ 100% (яйця ≥ 105%)", trend: "Зростання (+)", level: "Оптимальний", cls: "badge-optimal" },
    { comp: "Продовольча", name: "Виробництво зерна на особу, тонн", first: "0,500 (2013)", last: "0,738 (2023)", avg: "0,550", threshold: "≥ 0,50 т/особу", trend: "Зростання (+)", level: "Оптимальний", cls: "badge-optimal" },

    // Соціальна
    { comp: "Соціальна", name: "Крайня бідність ($3/день), % населення", first: "5,20 (2013)", last: "4,40 (2023)", avg: "5,56", threshold: "≤ 3%", trend: "Спадання (-)", level: "Незадовільний", cls: "badge-unsatisfactory" },
    { comp: "Соціальна", name: "Децильний коефіцієнт фондів, разів", first: "15,18 (2013)", last: "13,67 (2023)", avg: "15,19", threshold: "≤ 8 разів", trend: "Повільне спадання (-)", level: "Абсолютно небезпечний", cls: "badge-critical" },
    { comp: "Соціальна", name: "Частка витрат на харчування, %", first: "16,20 (2013)", last: "17,60 (2023)", avg: "17,39", threshold: "≤ 20%", trend: "Помірне зростання", level: "Оптимальний", cls: "badge-optimal" },
    { comp: "Соціальна", name: "Державні видатки на охорону здоров'я, % ВВП", first: "3,82 (2013)", last: "3,98 (2023)", avg: "4,03", threshold: "≥ 6% ВВП", trend: "Стагнація", level: "Критичний", cls: "badge-critical" },
    { comp: "Соціальна", name: "Державні видатки на освіту, % ВВП", first: "5,82 (2013)", last: "5,50 (2023)", avg: "5,82", threshold: "≥ 6,5% ВВП", trend: "Спадання (-)", level: "Незадовільний", cls: "badge-unsatisfactory" },
    { comp: "Соціальна", name: "Захворюваність на ВІЛ (на 1000 осіб) / Туберкульоз (на 100 тис.)", first: "0,25 / 46", last: "0,21 / 52", avg: "0,24 / 46,7", threshold: "ВІЛ ≤ 0,15 / ТБ ≤ 30", trend: "ВІЛ (-), ТБ (+)", level: "Небезпечний", cls: "badge-dangerous" },
    { comp: "Соціальна", name: "Рівень зайнятості населення 15+, %", first: "57,20 (2013)", last: "57,50 (2023)", avg: "54,92", threshold: "≥ 60%", trend: "Відновлення після 2020 р.", level: "Небезпечний", cls: "badge-dangerous" },

    // Фінансова
    { comp: "Фінансова", name: "Загальний обсяг державного боргу, %", first: "67,54 (2015)", last: "81,86 (2024)", avg: "83,15", threshold: "≤ 60% ВВП", trend: "Зростання (+)", level: "Абсолютно критичний", cls: "badge-critical" },
    { comp: "Фінансова", name: "Валові міжнародні резерви, міс. імпорту", first: "14,65 (2015)", last: "7,95 (2024)", avg: "12,34", threshold: "≥ 6 міс. імпорту", trend: "Спадання (-)", level: "Оптимальний", cls: "badge-optimal" }
  ];

  const tbody = document.getElementById("indicatorsBody");
  const compFilter = document.getElementById("componentFilter");
  const searchInput = document.getElementById("indicatorSearch");

  function renderTable() {
    if (!tbody) return;
    const selectedComp = compFilter ? compFilter.value : "all";
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

    const filtered = indicatorsData.filter(item => {
      const matchComp = (selectedComp === "all") || (item.comp === selectedComp);
      const matchText = !query ||
        item.name.toLowerCase().includes(query) ||
        item.comp.toLowerCase().includes(query) ||
        item.level.toLowerCase().includes(query);
      return matchComp && matchText;
    });

    tbody.innerHTML = filtered.map(row => `
      <tr>
        <td><strong>${row.comp}</strong></td>
        <td>${row.name}</td>
        <td class="num-col">${row.first}</td>
        <td class="num-col">${row.last}</td>
        <td class="num-col"><strong>${row.avg}</strong></td>
        <td>${row.threshold}</td>
        <td>${row.trend}</td>
        <td><span class="badge ${row.cls}">${row.level}</span></td>
      </tr>
    `).join("");
  }

  if (tbody) {
    renderTable();
    compFilter.addEventListener("change", renderTable);
    searchInput.addEventListener("input", renderTable);
  }

  // 4. Вбудований рушій побудови адаптивних графіків на HTML5 Canvas (працює офлайн без зовнішніх бібліотек)
  const canvas = document.getElementById("mainChart");
  const chartTabs = document.getElementById("chartTabs");
  const chartCaption = document.getElementById("chartCaption");

  const chartsConfig = {
    components: {
      type: "bar",
      caption: "Рис. 1. Інтегральна бальна оцінка 9 складових економічної безпеки Бразилії (за 5-бальною шкалою: 1 — критичний, 5 — оптимальний рівень).",
      labels: [
        "Зовнішньоекон.",
        "Виробнича",
        "Продовольча",
        "Енергетична",
        "Фінансова",
        "Інвест.-інновац.",
        "Демографічна",
        "Соціальна",
        "Макроекономічна"
      ],
      values: [5.00, 5.00, 4.88, 3.75, 3.00, 2.80, 2.50, 2.50, 2.00],
      colors: ["#146c43", "#146c43", "#198754", "#0284c7", "#d97706", "#d97706", "#dc2626", "#dc2626", "#991b1b"],
      yMax: 5.5,
      unit: " бал."
    },
    macro: {
      type: "line",
      caption: "Рис. 2. Динаміка макроекономічних індикаторів Бразилії у 2013–2023 рр. (%).",
      labels: ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
      datasets: [
        { label: "Тіньова економіка, % ВВП", data: [38.2, 38.5, 39.1, 39.4, 39.0, 38.6, 38.2, 39.5, 38.4, 37.8, 37.5], color: "#b45309" },
        { label: "Валові заощадження, % ВНД", data: [15.6, 15.1, 14.3, 14.1, 14.6, 15.2, 15.3, 14.9, 16.7, 17.2, 16.5], color: "#0f766e" },
        { label: "Рівень безробіття, %", data: [7.07, 6.76, 8.54, 11.58, 12.79, 12.33, 11.94, 13.70, 13.16, 9.23, 7.95], color: "#1d4ed8" },
        { label: "Рівень інфляції (ІСЦ), %", data: [6.20, 6.33, 9.03, 8.74, 3.45, 3.66, 3.73, 3.21, 8.30, 9.28, 4.59], color: "#dc2626" }
      ],
      yMax: 45,
      unit: "%"
    },
    finance: {
      type: "line",
      caption: "Рис. 3. Динаміка державного боргу, відкритості економіки та міжнародних резервів у 2015–2024 рр.",
      labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
      datasets: [
        { label: "Загальний держборг, %", data: [67.54, 73.42, 83.67, 86.61, 92.57, 98.71, 85.01, 79.10, 83.03, 81.86], color: "#991b1b" },
        { label: "Відкритість економіки, % ВВП", data: [26.95, 24.53, 24.32, 28.88, 28.89, 32.30, 37.66, 38.82, 33.67, 35.58], color: "#146c43" },
        { label: "Міжнародні резерви, міс. імпорту", data: [14.65, 16.60, 14.86, 13.20, 12.23, 14.94, 11.14, 8.34, 9.43, 7.95], color: "#0284c7" }
      ],
      yMax: 110,
      unit: ""
    },
    energy_inv: {
      type: "line",
      caption: "Рис. 4. Динаміка власного енергозабезпечення, користувачів Інтернету та валового нагромадження у 2015–2024 рр. (%).",
      labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
      datasets: [
        { label: "Власне енергозабезпечення, %", data: [91.39, 97.33, 98.86, 100.82, 104.06, 111.17, 103.85, 106.71, 112.60, 110.84], color: "#146c43" },
        { label: "Користувачі Інтернету, % нас.", data: [58.33, 60.87, 67.47, 70.43, 73.91, 81.34, 80.69, 80.53, 84.15, 84.46], color: "#2563eb" },
        { label: "Валове нагромадження, % ВВП", data: [17.80, 15.52, 14.56, 15.10, 15.47, 16.56, 17.92, 17.80, 16.41, 16.91], color: "#d97706" }
      ],
      yMax: 125,
      unit: "%"
    },
    food_prod: {
      type: "line",
      caption: "Рис. 5. Динаміка врожайності зернових (ц/га) та самозабезпеченості свининою й олією (%) у 2015–2023 рр.",
      labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
      datasets: [
        { label: "Самозабезпеченість олією, %", data: [130.0, 132.0, 135.0, 138.0, 140.0, 142.0, 145.0, 148.0, 150.0], color: "#ca8a04" },
        { label: "Самозабезпеченість свининою, %", data: [103.1, 104.2, 103.8, 104.5, 105.1, 106.2, 105.8, 106.5, 107.0], color: "#146c43" },
        { label: "Урожайність зернових, ц/га", data: [50.01, 41.82, 52.10, 48.07, 53.21, 52.55, 44.79, 49.08, 53.37], color: "#0284c7" }
      ],
      yMax: 165,
      unit: ""
    }
  };

  let currentChartKey = "components";

  function drawChart(key) {
    if (!canvas) return;
    const cfg = chartsConfig[key];
    if (!cfg) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const width = Math.max(rect.width - 32, 300);
    const height = 310;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const padLeft = 48;
    const padRight = 22;
    const padTop = cfg.type === "line" ? 44 : 24;
    const padBottom = 46;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    // Сітка та вісь Y
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#64748b";
    ctx.font = "12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      const val = (cfg.yMax / steps) * i;
      const y = padTop + plotH - (plotH * (val / cfg.yMax));
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(padLeft + plotW, y);
      ctx.stroke();

      const labelStr = Number.isInteger(val) ? val.toString() : val.toFixed(1);
      ctx.fillText(labelStr, padLeft - 8, y);
    }

    // Осі координат
    ctx.strokeStyle = "#94a3b8";
    ctx.beginPath();
    ctx.moveTo(padLeft, padTop);
    ctx.lineTo(padLeft, padTop + plotH);
    ctx.lineTo(padLeft + plotW, padTop + plotH);
    ctx.stroke();

    if (cfg.type === "bar") {
      const n = cfg.labels.length;
      const slotW = plotW / n;
      const barW = Math.min(slotW * 0.58, 48);

      cfg.values.forEach((val, idx) => {
        const barH = (val / cfg.yMax) * plotH;
        const x = padLeft + slotW * idx + (slotW - barW) / 2;
        const y = padTop + plotH - barH;

        ctx.fillStyle = cfg.colors[idx];
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, y, barW, barH, [6, 6, 0, 0]) : ctx.rect(x, y, barW, barH);
        ctx.fill();

        // Підпис значення над стовпчиком
        ctx.fillStyle = "#1e293b";
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(val.toFixed(2), x + barW / 2, y - 4);

        // Підпис осі X
        ctx.fillStyle = "#475569";
        ctx.font = width < 640 ? "9px sans-serif" : "11px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        const lbl = width < 640 ? cfg.labels[idx].slice(0, 7) + "." : cfg.labels[idx];
        ctx.fillText(lbl, x + barW / 2, padTop + plotH + 10);
      });
    } else if (cfg.type === "line") {
      // Легенда зверху
      let legX = padLeft;
      let legY = 14;
      ctx.font = "bold 11.5px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      cfg.datasets.forEach(ds => {
        const textW = ctx.measureText(ds.label).width;
        if (legX + textW + 26 > width - padRight) {
          legX = padLeft;
          legY += 18;
        }
        ctx.fillStyle = ds.color;
        ctx.fillRect(legX, legY - 4, 12, 8);
        ctx.fillStyle = "#1e293b";
        ctx.fillText(ds.label, legX + 16, legY);
        legX += textW + 30;
      });

      const n = cfg.labels.length;
      const stepX = plotW / (n - 1);

      // Підписи осі X
      ctx.fillStyle = "#475569";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      cfg.labels.forEach((lbl, idx) => {
        const x = padLeft + stepX * idx;
        ctx.fillText(lbl, x, padTop + plotH + 10);
      });

      // Лінії графіків
      cfg.datasets.forEach(ds => {
        ctx.strokeStyle = ds.color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ds.data.forEach((val, idx) => {
          const x = padLeft + stepX * idx;
          const y = padTop + plotH - (val / cfg.yMax) * plotH;
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Точки та значення на початку і в кінці
        ds.data.forEach((val, idx) => {
          const x = padLeft + stepX * idx;
          const y = padTop + plotH - (val / cfg.yMax) * plotH;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = ds.color;
          ctx.lineWidth = 2;
          ctx.stroke();

          if (idx === 0 || idx === ds.data.length - 1 || idx === Math.floor(ds.data.length / 2)) {
            ctx.fillStyle = ds.color;
            ctx.font = "bold 10.5px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            ctx.fillText(val.toFixed(1), x, y - 6);
          }
        });
      });
    }
  }

  if (canvas && chartTabs) {
    drawChart(currentChartKey);

    chartTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab-btn");
      if (!btn) return;
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentChartKey = btn.dataset.chart;
      if (chartCaption) {
        chartCaption.textContent = chartsConfig[currentChartKey].caption;
      }
      drawChart(currentChartKey);
    });

    window.addEventListener("resize", () => {
      drawChart(currentChartKey);
    });
  }
});
