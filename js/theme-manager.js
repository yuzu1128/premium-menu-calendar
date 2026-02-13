// theme-manager.js — テーマ適用（CSS変数注入 + テンプレートクラス切替 + イベントスタイル動的生成）

let dynamicStyleEl = null;

/**
 * テーマをCSS変数として適用し、テンプレートCSSクラスを切り替える
 * @param {object} theme - テーマオブジェクト
 */
export function applyTheme(theme) {
  const root = document.documentElement;
  const c = theme.colors;

  root.style.setProperty('--primary-color', c.primary);
  root.style.setProperty('--secondary-color', c.secondary);
  root.style.setProperty('--accent-color', c.accent);
  root.style.setProperty('--bg-color', c.background);
  root.style.setProperty('--border-color', c.border);
  root.style.setProperty('--text-color', c.text);
  root.style.setProperty('--weekend-sun', c.weekendSun);
  root.style.setProperty('--weekend-sat', c.weekendSat);

  // アクセント画像
  if (theme.accent.image) {
    root.style.setProperty('--accent-image', `url('${theme.accent.image}')`);
    root.style.setProperty('--accent-opacity-top', theme.accent.opacityTop);
    root.style.setProperty('--accent-opacity-bottom', theme.accent.opacityBottom);
  } else {
    root.style.setProperty('--accent-image', 'none');
    root.style.setProperty('--accent-opacity-top', '0');
    root.style.setProperty('--accent-opacity-bottom', '0');
  }

  // テンプレートCSSクラスを切り替え
  applyTemplateClass(theme.cssClass);

  // イベント固有スタイルを動的に注入
  injectEventStyles(theme.eventStyles || {});
}

/**
 * .calendar-preview にテンプレートCSSクラスを適用
 */
function applyTemplateClass(cssClass) {
  const preview = document.querySelector('.calendar-preview');
  if (!preview) return;

  // 既存の tpl-* クラスを全て除去
  const toRemove = [];
  preview.classList.forEach(cls => {
    if (cls.startsWith('tpl-')) toRemove.push(cls);
  });
  toRemove.forEach(cls => preview.classList.remove(cls));

  // 新しいテンプレートクラスを追加
  if (cssClass) {
    preview.classList.add(cssClass);
  }
}

function injectEventStyles(eventStyles) {
  if (dynamicStyleEl) {
    dynamicStyleEl.remove();
  }

  let css = '';

  // 祝日の基本スタイル（常に含める）
  css += `
    .day-cell.holiday { background: rgba(198, 40, 40, 0.03); }
    .holiday-icon { color: var(--weekend-sun); }
  `;

  for (const [className, style] of Object.entries(eventStyles)) {
    css += `
      .day-cell.${className} { background: ${style.cellBg}; }
      .day-cell.${className} .day-number { color: ${style.numberColor}; }
      .day-cell.${className} .note {
        background: ${style.noteBg};
        color: ${style.noteColor};
        border-color: ${style.noteBorder};
      }
    `;
  }

  dynamicStyleEl = document.createElement('style');
  dynamicStyleEl.id = 'dynamic-theme-styles';
  dynamicStyleEl.textContent = css;
  document.head.appendChild(dynamicStyleEl);
}
