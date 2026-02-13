// editor.js — 編集UI操作

import { THEMES, MONTH_NAMES_JP, getDefaultThemeId, getThemesForMonth } from './themes-data.js';

let currentData = null;
let selectedDay = null;
let onChangeCallback = null;

/**
 * エディタを初期化
 */
export function initEditor(data, onChange) {
  currentData = data;
  onChangeCallback = onChange;

  setupMonthSelector();
  setupThemeSelector();
  setupMenuEditor();
}

/**
 * データを更新
 */
export function setData(data) {
  currentData = data;
  selectedDay = null;
  hideMenuEditor();
  updateMonthSelector();
  updateThemeOptions();
}

/**
 * 年月セレクター
 */
function setupMonthSelector() {
  const yearInput = document.getElementById('year-input');
  const monthSelect = document.getElementById('month-select');

  for (let m = 1; m <= 12; m++) {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = MONTH_NAMES_JP[m];
    monthSelect.appendChild(opt);
  }

  yearInput.value = currentData.year;
  monthSelect.value = currentData.month;

  const handleChange = () => {
    const year = parseInt(yearInput.value);
    const month = parseInt(monthSelect.value);
    if (year && month >= 1 && month <= 12) {
      currentData.year = year;
      currentData.month = month;
      // テーマを新しい月のデフォルトに切替
      currentData.theme = getDefaultThemeId(month);
      updateThemeOptions();
      if (onChangeCallback) onChangeCallback('month');
    }
  };

  yearInput.addEventListener('change', handleChange);
  monthSelect.addEventListener('change', handleChange);
}

function updateMonthSelector() {
  document.getElementById('year-input').value = currentData.year;
  document.getElementById('month-select').value = currentData.month;
}

/**
 * テーマセレクター（月別フィルタリング）
 */
function setupThemeSelector() {
  const themeSelect = document.getElementById('theme-select');
  buildThemeOptions(currentData.month);
  themeSelect.value = currentData.theme;

  themeSelect.addEventListener('change', () => {
    currentData.theme = themeSelect.value;
    if (onChangeCallback) onChangeCallback('theme');
  });
}

function buildThemeOptions(month) {
  const themeSelect = document.getElementById('theme-select');
  themeSelect.innerHTML = '';

  const themes = getThemesForMonth(month);
  themes.forEach(theme => {
    const opt = document.createElement('option');
    opt.value = theme.id;
    opt.textContent = theme.templateLabel;
    themeSelect.appendChild(opt);
  });
}

function updateThemeOptions() {
  buildThemeOptions(currentData.month);
  document.getElementById('theme-select').value = currentData.theme;
}

/**
 * メニュー編集エリア
 */
function setupMenuEditor() {
  for (let i = 1; i <= 4; i++) {
    const input = document.getElementById(`menu-${i}`);
    input.addEventListener('input', () => {
      if (selectedDay === null) return;
      updateDayMenus();
    });
  }

  document.getElementById('special-title').addEventListener('input', () => {
    if (selectedDay === null) return;
    updateDayData();
  });

  document.getElementById('day-image').addEventListener('input', () => {
    if (selectedDay === null) return;
    updateDayData();
  });

  document.getElementById('event-label').addEventListener('input', () => {
    if (selectedDay === null) return;
    updateEventData();
  });
  document.getElementById('event-icon').addEventListener('input', () => {
    if (selectedDay === null) return;
    updateEventData();
  });
  document.getElementById('event-class').addEventListener('input', () => {
    if (selectedDay === null) return;
    updateEventData();
  });
  document.getElementById('event-popup').addEventListener('input', () => {
    if (selectedDay === null) return;
    updateEventData();
  });

  document.getElementById('btn-clear-day').addEventListener('click', () => {
    if (selectedDay === null) return;
    clearDay();
  });
}

export function getSelectedDay() {
  return selectedDay;
}

export function selectDay(day) {
  selectedDay = day;

  const editor = document.querySelector('.day-editor');
  editor.classList.add('active');

  const placeholder = document.querySelector('.day-editor-placeholder');
  if (placeholder) placeholder.style.display = 'none';

  document.querySelector('.day-editor-title').textContent = `${currentData.month}月${day}日`;

  const dayData = currentData.days?.[String(day)] || {};
  const menus = dayData.menus || [];

  for (let i = 1; i <= 4; i++) {
    document.getElementById(`menu-${i}`).value = menus[i - 1] || '';
  }

  document.getElementById('special-title').value = dayData.specialTitle || '';
  document.getElementById('day-image').value = dayData.image || '';

  const event = currentData.customEvents?.find(e => e.day === day);
  document.getElementById('event-label').value = event?.label || '';
  document.getElementById('event-icon').value = event?.icon || '';
  document.getElementById('event-class').value = event?.cssClass || '';
  document.getElementById('event-popup').value = event?.popup || '';
}

function hideMenuEditor() {
  document.querySelector('.day-editor').classList.remove('active');
  const placeholder = document.querySelector('.day-editor-placeholder');
  if (placeholder) placeholder.style.display = '';
}

function updateDayMenus() {
  const menus = [];
  for (let i = 1; i <= 4; i++) {
    const val = document.getElementById(`menu-${i}`).value.trim();
    if (val) menus.push(val);
  }

  if (!currentData.days) currentData.days = {};
  const key = String(selectedDay);
  if (!currentData.days[key]) currentData.days[key] = {};
  currentData.days[key].menus = menus;

  if (onChangeCallback) onChangeCallback('menu');
}

function updateDayData() {
  if (!currentData.days) currentData.days = {};
  const key = String(selectedDay);
  if (!currentData.days[key]) currentData.days[key] = {};

  const specialTitle = document.getElementById('special-title').value.trim();
  const image = document.getElementById('day-image').value.trim();

  if (specialTitle) {
    currentData.days[key].specialTitle = specialTitle;
  } else {
    delete currentData.days[key].specialTitle;
  }

  if (image) {
    currentData.days[key].image = image;
  } else {
    delete currentData.days[key].image;
  }

  if (onChangeCallback) onChangeCallback('menu');
}

function updateEventData() {
  const label = document.getElementById('event-label').value.trim();
  const icon = document.getElementById('event-icon').value.trim();
  const cssClass = document.getElementById('event-class').value.trim();
  const popup = document.getElementById('event-popup').value.trim();

  if (!currentData.customEvents) currentData.customEvents = [];

  const idx = currentData.customEvents.findIndex(e => e.day === selectedDay);

  if (label) {
    const eventObj = { day: selectedDay, label, icon, cssClass, popup };
    if (idx >= 0) {
      currentData.customEvents[idx] = eventObj;
    } else {
      currentData.customEvents.push(eventObj);
    }
  } else {
    if (idx >= 0) {
      currentData.customEvents.splice(idx, 1);
    }
  }

  if (onChangeCallback) onChangeCallback('event');
}

function clearDay() {
  const key = String(selectedDay);
  delete currentData.days[key];

  if (currentData.customEvents) {
    currentData.customEvents = currentData.customEvents.filter(e => e.day !== selectedDay);
  }

  for (let i = 1; i <= 4; i++) {
    document.getElementById(`menu-${i}`).value = '';
  }
  document.getElementById('special-title').value = '';
  document.getElementById('day-image').value = '';
  document.getElementById('event-label').value = '';
  document.getElementById('event-icon').value = '';
  document.getElementById('event-class').value = '';
  document.getElementById('event-popup').value = '';

  if (onChangeCallback) onChangeCallback('clear');
}

export function clearMenus() {
  currentData.days = {};
  selectedDay = null;
  hideMenuEditor();
  if (onChangeCallback) onChangeCallback('clearMenus');
}

export function clearEvents() {
  currentData.customEvents = [];
  selectedDay = null;
  hideMenuEditor();
  if (onChangeCallback) onChangeCallback('clearEvents');
}
