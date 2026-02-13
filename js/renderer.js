// renderer.js — カレンダーDOM構築

const WEEKDAY_HEADERS = ['日', '月', '火', '水', '木', '金', '土'];

/**
 * カレンダーをレンダリングする
 * @param {HTMLElement} container - .calendar-preview 要素
 * @param {object} calendarGrid - calendar-engine の出力
 * @param {object} menuData - 献立データ { days, customEvents }
 * @param {Map} holidays - 祝日マップ (day -> name)
 * @param {object} theme - テーマオブジェクト
 * @param {function} onDayClick - セルクリック時コールバック
 */
export function render(container, calendarGrid, menuData, holidays, theme, onDayClick) {
  container.innerHTML = '';

  const { year, month, weeks, weekCount } = calendarGrid;

  // ヘッダー
  const header = document.createElement('header');
  header.innerHTML = `
    <h1>${year}年 ${month}月</h1>
    <p class="header-subtitle">${theme.nameEn} MENU CALENDAR</p>
  `;
  container.appendChild(header);

  // カレンダーグリッド
  const calendar = document.createElement('div');
  calendar.className = `calendar weeks-${weekCount}`;

  // 曜日ヘッダー
  WEEKDAY_HEADERS.forEach((label, i) => {
    const el = document.createElement('div');
    el.className = 'day-header';
    if (i === 0) el.classList.add('sun');
    if (i === 6) el.classList.add('sat');
    el.textContent = label;
    calendar.appendChild(el);
  });

  // イベントマップを構築
  const eventMap = new Map();
  if (menuData.customEvents) {
    menuData.customEvents.forEach(ev => eventMap.set(ev.day, ev));
  }

  // 日付セル
  weeks.forEach(week => {
    week.forEach(cell => {
      const el = document.createElement('div');

      if (!cell) {
        el.className = 'day-cell empty';
        calendar.appendChild(el);
        return;
      }

      const { day, weekday } = cell;
      const dayData = menuData.days?.[String(day)] || {};
      const holiday = holidays.get(day);
      const event = eventMap.get(day);

      // クラス構成
      el.className = 'day-cell';
      if (weekday === 0) el.classList.add('sun');
      if (weekday === 6) el.classList.add('sat');
      if (holiday) el.classList.add('holiday');
      if (event?.cssClass) el.classList.add(event.cssClass);

      // 日付番号
      const numEl = document.createElement('span');
      numEl.className = 'day-number';
      numEl.textContent = day;
      el.appendChild(numEl);

      // 祝日ラベル
      if (holiday && !event) {
        const noteEl = document.createElement('div');
        noteEl.className = 'note';
        noteEl.innerHTML = `<span class="icon holiday-icon">[祝]</span>${holiday}`;
        el.appendChild(noteEl);
      }

      // カスタムイベントラベル
      if (event) {
        const noteEl = document.createElement('div');
        noteEl.className = 'note';
        noteEl.innerHTML = `<span class="icon">${event.icon || ''}</span>${event.label}`;
        el.appendChild(noteEl);
      }

      // 特別タイトル + 画像
      if (dayData.specialTitle && dayData.image) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'menu-image-container';
        imgContainer.innerHTML = `
          <div class="menu-title">${dayData.specialTitle}</div>
          <img src="${dayData.image}" alt="${dayData.specialTitle}" class="menu-img">
        `;
        el.appendChild(imgContainer);
      }
      // 特別タイトルのみ
      else if (dayData.specialTitle) {
        const titleEl = document.createElement('div');
        titleEl.className = 'special-menu-title';
        titleEl.textContent = dayData.specialTitle;
        el.appendChild(titleEl);
      }

      // メニューリスト
      if (dayData.menus && dayData.menus.length > 0) {
        const ul = document.createElement('ul');
        ul.className = 'menu-items';
        dayData.menus.forEach(menu => {
          const li = document.createElement('li');
          li.textContent = menu;
          ul.appendChild(li);
        });
        el.appendChild(ul);
      }

      // ポップアップメッセージ
      if (event?.popup) {
        const popupEl = document.createElement('div');
        popupEl.className = 'popup-message';
        popupEl.textContent = event.popup;
        el.appendChild(popupEl);
      }

      // クリックイベント
      el.addEventListener('click', () => {
        if (onDayClick) onDayClick(day, el);
      });

      calendar.appendChild(el);
    });
  });

  container.appendChild(calendar);
}
