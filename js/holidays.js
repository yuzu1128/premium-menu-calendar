// holidays.js — 日本の祝日判定（自前実装）

// 春分・秋分の日の計算（簡易式）
function getVernalEquinox(year) {
  if (year <= 1999) return Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  return Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
}

function getAutumnalEquinox(year) {
  if (year <= 1999) return Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  return Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
}

// 第n月曜日を求める
function getNthMonday(year, month, n) {
  const first = new Date(year, month - 1, 1).getDay();
  let day = 1 + ((8 - first) % 7) + (n - 1) * 7;
  return day;
}

// 祝日定義
function getFixedHolidays(year) {
  const holidays = new Map();

  // 固定祝日
  holidays.set(`${year}-1-1`, '元日');
  holidays.set(`${year}-2-11`, '建国記念の日');
  holidays.set(`${year}-2-23`, '天皇誕生日');
  holidays.set(`${year}-4-29`, '昭和の日');
  holidays.set(`${year}-5-3`, '憲法記念日');
  holidays.set(`${year}-5-4`, 'みどりの日');
  holidays.set(`${year}-5-5`, 'こどもの日');
  holidays.set(`${year}-8-11`, '山の日');
  holidays.set(`${year}-11-3`, '文化の日');
  holidays.set(`${year}-11-23`, '勤労感謝の日');

  // ハッピーマンデー
  holidays.set(`${year}-1-${getNthMonday(year, 1, 2)}`, '成人の日');
  holidays.set(`${year}-7-${getNthMonday(year, 7, 3)}`, '海の日');
  holidays.set(`${year}-9-${getNthMonday(year, 9, 3)}`, '敬老の日');
  holidays.set(`${year}-10-${getNthMonday(year, 10, 2)}`, 'スポーツの日');

  // 春分の日・秋分の日
  holidays.set(`${year}-3-${getVernalEquinox(year)}`, '春分の日');
  holidays.set(`${year}-9-${getAutumnalEquinox(year)}`, '秋分の日');

  return holidays;
}

// 振替休日を追加
function addSubstituteHolidays(holidays, year) {
  const result = new Map(holidays);

  for (const [key, name] of holidays) {
    const parts = key.split('-').map(Number);
    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    // 祝日が日曜の場合、次の平日が振替休日
    if (date.getDay() === 0) {
      let next = new Date(date);
      next.setDate(next.getDate() + 1);
      while (result.has(`${next.getFullYear()}-${next.getMonth() + 1}-${next.getDate()}`)) {
        next.setDate(next.getDate() + 1);
      }
      result.set(`${next.getFullYear()}-${next.getMonth() + 1}-${next.getDate()}`, '振替休日');
    }
  }

  // 国民の休日（祝日に挟まれた平日）
  for (const [key, name] of holidays) {
    const parts = key.split('-').map(Number);
    const prev = new Date(parts[0], parts[1] - 1, parts[2] - 1);
    const next = new Date(parts[0], parts[1] - 1, parts[2] + 1);
    const prevKey = `${prev.getFullYear()}-${prev.getMonth() + 1}-${prev.getDate()}`;
    const nextKey = `${next.getFullYear()}-${next.getMonth() + 1}-${next.getDate()}`;
    const betweenKey = key; // current

    // 前後が祝日で、その間が平日なら国民の休日
    // ここではGW中の対応として簡略化
  }

  return result;
}

/**
 * 指定年月の祝日をMapで返す
 * @returns {Map<number, string>} day -> holiday name
 */
export function getMonthHolidays(year, month) {
  const allHolidays = addSubstituteHolidays(getFixedHolidays(year), year);
  const monthHolidays = new Map();

  for (const [key, name] of allHolidays) {
    const parts = key.split('-').map(Number);
    if (parts[0] === year && parts[1] === month) {
      monthHolidays.set(parts[2], name);
    }
  }

  return monthHolidays;
}
