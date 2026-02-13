// app.js — メインオーケストレーター

import { generateMonth } from './calendar-engine.js';
import { getMonthHolidays } from './holidays.js';
import { render } from './renderer.js';
import { THEMES, getDefaultThemeId } from './themes-data.js';
import { applyTheme } from './theme-manager.js';
import { initEditor, setData, selectDay, getSelectedDay, clearMenus, clearEvents } from './editor.js';
import { exportJSON, importJSON, createEmptyData } from './data-io.js';
import { printCalendar, exportPDF } from './pdf-export.js';
import { parseTextBulk, importCSVFile, mergeDays } from './bulk-input.js';

let currentData = null;
let currentCalendar = null;

function init() {
  // 初期データ（今月）
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const themeId = getDefaultThemeId(month);

  currentData = createEmptyData(year, month, themeId);

  // エディタ初期化
  initEditor(currentData, handleDataChange);

  // ボタンイベント
  document.getElementById('btn-import').addEventListener('click', handleImport);
  document.getElementById('btn-export').addEventListener('click', handleExport);
  document.getElementById('btn-print').addEventListener('click', printCalendar);
  document.getElementById('btn-pdf').addEventListener('click', handlePDFExport);
  document.getElementById('btn-clear-menus').addEventListener('click', handleClearMenus);
  document.getElementById('btn-clear-events').addEventListener('click', handleClearEvents);

  // 一括入力
  document.getElementById('btn-bulk-text').addEventListener('click', openBulkModal);
  document.getElementById('btn-bulk-csv').addEventListener('click', handleCSVImport);
  document.getElementById('btn-copy-prev').addEventListener('click', handleCopyPrevMonth);
  document.getElementById('bulk-modal-close').addEventListener('click', closeBulkModal);
  document.getElementById('bulk-modal').addEventListener('click', (e) => {
    if (e.target.id === 'bulk-modal') closeBulkModal();
  });
  document.getElementById('btn-bulk-apply').addEventListener('click', applyBulkText);

  // モバイルトグル
  setupMobileToggle();

  // 初回レンダリング
  renderCalendar();
}

function setupMobileToggle() {
  const btn = document.getElementById('btn-toggle-editor');
  const panel = document.getElementById('editor-panel');
  const overlay = document.getElementById('mobile-overlay');

  const open = () => {
    panel.classList.add('open');
    overlay.classList.add('active');
  };
  const close = () => {
    panel.classList.remove('open');
    overlay.classList.remove('active');
  };

  btn.addEventListener('click', () => {
    panel.classList.contains('open') ? close() : open();
  });
  overlay.addEventListener('click', close);
}

function renderCalendar() {
  const { year, month, theme: themeId } = currentData;

  // カレンダーグリッド生成
  currentCalendar = generateMonth(year, month);

  // 祝日取得
  const holidays = getMonthHolidays(year, month);

  // テーマ適用（IDで引く、なければデフォルト）
  const theme = THEMES[themeId] || THEMES[getDefaultThemeId(month)];
  applyTheme(theme);

  // レンダリング
  const container = document.querySelector('.calendar-preview');
  render(container, currentCalendar, currentData, holidays, theme, handleDayClick);

  // 選択中のセルを再ハイライト
  const sel = getSelectedDay();
  if (sel !== null) {
    const cells = container.querySelectorAll('.day-cell');
    cells.forEach(cell => {
      const numEl = cell.querySelector('.day-number');
      if (numEl && parseInt(numEl.textContent) === sel) {
        cell.classList.add('selected');
      }
    });
  }
}

function handleDataChange(changeType) {
  renderCalendar();
}

function handleDayClick(day, element) {
  document.querySelectorAll('.day-cell.selected').forEach(el => {
    el.classList.remove('selected');
  });
  element.classList.add('selected');
  selectDay(day);
}

function handleImport() {
  const input = document.getElementById('file-input');
  input.click();
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await importJSON(file);
      currentData = data;
      setData(currentData);
      renderCalendar();
    } catch (err) {
      alert(err.message);
    }

    input.value = '';
  };
}

function handleExport() {
  exportJSON(currentData);
}

async function handlePDFExport() {
  const container = document.querySelector('.calendar-preview');
  const filename = `menu-${currentData.year}-${String(currentData.month).padStart(2, '0')}.pdf`;
  await exportPDF(container, filename);
}

function handleClearMenus() {
  if (confirm('この月の献立データを全てクリアしますか？\n（イベントは残ります）')) {
    clearMenus();
  }
}

function handleClearEvents() {
  if (confirm('この月のカスタムイベントを全てクリアしますか？\n（献立データは残ります）')) {
    clearEvents();
  }
}

// ── 一括入力 ──

function openBulkModal() {
  document.getElementById('bulk-modal').classList.add('active');
  document.getElementById('bulk-textarea').focus();
}

function closeBulkModal() {
  document.getElementById('bulk-modal').classList.remove('active');
}

function applyBulkText() {
  const text = document.getElementById('bulk-textarea').value.trim();
  if (!text) { alert('テキストを入力してください'); return; }

  const newDays = parseTextBulk(text);
  const count = Object.keys(newDays).length;
  if (count === 0) {
    alert('献立データを読み取れませんでした。\n形式: 1: メニュー1, メニュー2, ...');
    return;
  }

  const overwrite = document.getElementById('bulk-overwrite').checked;
  if (overwrite) {
    currentData.days = { ...currentData.days, ...newDays };
  } else {
    currentData.days = mergeDays(currentData.days || {}, newDays);
  }

  closeBulkModal();
  document.getElementById('bulk-textarea').value = '';
  renderCalendar();
  alert(`${count}日分の献立を反映しました`);
}

function handleCSVImport() {
  const input = document.getElementById('csv-input');
  input.click();
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const newDays = await importCSVFile(file);
      const count = Object.keys(newDays).length;
      currentData.days = { ...(currentData.days || {}), ...newDays };
      renderCalendar();
      alert(`${count}日分の献立をCSVから読み込みました`);
    } catch (err) {
      alert(err.message);
    }
    input.value = '';
  };
}

function handleCopyPrevMonth() {
  const input = document.getElementById('prev-month-input');
  input.click();
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await importJSON(file);
      if (!data.days || Object.keys(data.days).length === 0) {
        alert('読み込んだJSONに献立データがありません');
        return;
      }
      const count = Object.keys(data.days).length;
      currentData.days = { ...(currentData.days || {}), ...data.days };
      renderCalendar();
      alert(`${count}日分の献立を前月データからコピーしました\n（年月・テンプレートは現在のままです）`);
    } catch (err) {
      alert(err.message);
    }
    input.value = '';
  };
}

// DOM ready
document.addEventListener('DOMContentLoaded', init);
