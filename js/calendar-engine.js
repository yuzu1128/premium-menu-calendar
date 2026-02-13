// calendar-engine.js — 年月からカレンダーグリッドを生成

export function generateMonth(year, month) {
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0=日曜
  const daysInMonth = new Date(year, month, 0).getDate();

  const weeks = [];
  let currentWeek = [];

  // 先頭の空セル
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push(null);
  }

  // 日付を埋める
  for (let day = 1; day <= daysInMonth; day++) {
    const weekday = (firstDay + day - 1) % 7;
    currentWeek.push({ day, weekday });

    if (weekday === 6 || day === daysInMonth) {
      // 末尾の空セルを埋める
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  return { year, month, weeks, daysInMonth, weekCount: weeks.length };
}
