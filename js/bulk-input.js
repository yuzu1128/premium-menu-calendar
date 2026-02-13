// bulk-input.js — 一括入力・CSVインポート・前月コピー

/**
 * テキスト一括入力をパースして days オブジェクトに変換
 * 対応フォーマット:
 *   1: メニュー1, メニュー2, メニュー3
 *   2: メニュー1, メニュー2
 *   3日: メニュー1、メニュー2、メニュー3
 *   15 メニュー1 / メニュー2 / メニュー3
 */
export function parseTextBulk(text) {
  const days = {};
  const lines = text.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // 日付部分を抽出: "1:", "1日:", "1 ", "01:"
    const match = trimmed.match(/^(\d{1,2})\s*[日]?\s*[:：]\s*(.+)/);
    if (!match) continue;

    const day = parseInt(match[1], 10);
    if (day < 1 || day > 31) continue;

    // メニュー分割: カンマ、読点、スラッシュ
    const menuText = match[2].trim();
    const menus = menuText
      .split(/[,，、\/／]/)
      .map(m => m.trim())
      .filter(m => m.length > 0)
      .slice(0, 4);

    if (menus.length > 0) {
      days[String(day)] = { menus };
    }
  }

  return days;
}

/**
 * CSVテキストをパースして days オブジェクトに変換
 * 対応フォーマット:
 *   日,メニュー1,メニュー2,メニュー3,メニュー4
 *   1,赤魚のみりん焼き,小松菜の胡麻和え,豚汁,
 *   2,肉じゃが,ほうれん草のお浸し,,
 */
export function parseCSV(text) {
  const days = {};
  const lines = text.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed) continue;

    const cols = parseCSVLine(trimmed);
    const day = parseInt(cols[0], 10);

    // ヘッダー行をスキップ（数値でない場合）
    if (isNaN(day) || day < 1 || day > 31) continue;

    const menus = cols.slice(1, 5).map(m => m.trim()).filter(m => m.length > 0);
    if (menus.length > 0) {
      days[String(day)] = { menus };
    }
  }

  return days;
}

/**
 * CSV行をパース（引用符対応）
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuote = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuote) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuote = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuote = true;
      } else if (ch === ',' || ch === '\t') {
        result.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
  }
  result.push(current);
  return result;
}

/**
 * CSVファイルを読み込んでパース
 */
export function importCSVFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const days = parseCSV(text);
        const count = Object.keys(days).length;
        if (count === 0) {
          reject(new Error('CSVから献立データを読み取れませんでした。\n形式: 日,メニュー1,メニュー2,...'));
          return;
        }
        resolve(days);
      } catch (err) {
        reject(new Error('CSVの読み込みに失敗しました: ' + err.message));
      }
    };
    reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
    reader.readAsText(file, 'UTF-8');
  });
}

/**
 * days データをマージ（既存データに上書き）
 */
export function mergeDays(currentDays, newDays) {
  const merged = { ...currentDays };
  for (const [day, data] of Object.entries(newDays)) {
    merged[day] = { ...(merged[day] || {}), ...data };
  }
  return merged;
}
