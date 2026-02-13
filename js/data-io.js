// data-io.js — JSONインポート/エクスポート

/**
 * 献立データをJSONファイルとしてダウンロード
 * @param {object} data - 献立データオブジェクト
 */
export function exportJSON(data) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `menu-${data.year}-${String(data.month).padStart(2, '0')}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * JSONファイルを読み込んで献立データを返す
 * @param {File} file - 選択されたJSONファイル
 * @returns {Promise<object>} 献立データ
 */
export function importJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (err) {
        reject(new Error('JSONの解析に失敗しました: ' + err.message));
      }
    };
    reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
    reader.readAsText(file);
  });
}

/**
 * 空の献立データテンプレートを作成
 * @param {number} year
 * @param {number} month
 * @param {string} themeId
 * @returns {object}
 */
export function createEmptyData(year, month, themeId) {
  return {
    year,
    month,
    theme: themeId,
    customEvents: [],
    days: {}
  };
}
