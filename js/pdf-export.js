// pdf-export.js — PDF出力

/**
 * ブラウザの印刷ダイアログを開く（最高品質）
 */
export function printCalendar() {
  window.print();
}

/**
 * html2pdf.js でPDFをダウンロード（ワンクリック）
 * @param {HTMLElement} element - キャプチャ対象要素
 * @param {string} filename - ファイル名
 */
export async function exportPDF(element, filename) {
  if (typeof html2pdf === 'undefined') {
    alert('html2pdf.js が読み込まれていません。ブラウザの印刷機能をご利用ください。');
    return;
  }

  // エディタパネル・コントロールバーを一時非表示
  const editorPanel = document.querySelector('.editor-panel');
  const controlsBar = document.querySelector('.controls-bar');
  if (editorPanel) editorPanel.style.display = 'none';
  if (controlsBar) controlsBar.style.display = 'none';

  // キャプチャ用にスタイルを一時調整
  const origStyles = {
    aspectRatio: element.style.aspectRatio,
    height: element.style.height,
    overflow: element.style.overflow,
    boxShadow: element.style.boxShadow,
    borderRadius: element.style.borderRadius,
    border: element.style.border,
  };

  // aspect-ratioを解除してコンテンツの実サイズでキャプチャ
  element.style.aspectRatio = 'unset';
  element.style.height = 'auto';
  element.style.overflow = 'visible';
  element.style.boxShadow = 'none';
  element.style.borderRadius = '0';
  element.style.border = 'none';

  // 選択ハイライトを消す
  element.querySelectorAll('.day-cell.selected').forEach(el => {
    el.style.boxShadow = 'none';
  });

  const opt = {
    margin: [3, 3, 3, 3],
    filename: filename,
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      scrollY: 0,
      scrollX: 0,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'landscape'
    }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (err) {
    alert('PDF出力に失敗しました: ' + err.message);
  } finally {
    // スタイル復元
    element.style.aspectRatio = origStyles.aspectRatio;
    element.style.height = origStyles.height;
    element.style.overflow = origStyles.overflow;
    element.style.boxShadow = origStyles.boxShadow;
    element.style.borderRadius = origStyles.borderRadius;
    element.style.border = origStyles.border;

    element.querySelectorAll('.day-cell.selected').forEach(el => {
      el.style.boxShadow = '';
    });

    if (editorPanel) editorPanel.style.display = '';
    if (controlsBar) controlsBar.style.display = '';
  }
}
