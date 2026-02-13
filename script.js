document.addEventListener('DOMContentLoaded', function() {
    // 必要な要素を取得
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("expanded-image");
    const triggerImg = document.querySelector(".detail-image img"); // 詳細ページにある元の画像
    const closeBtn = document.querySelector(".close-modal");

    // もし要素が見つからなければ何もしない（エラー防止）
    if (!triggerImg || !modal) return;

    // ----- 画像をクリックした時の動作 -----
    triggerImg.onclick = function(){
        modal.classList.add('show'); // モーダルを表示するクラスを追加
        modalImg.src = this.src;     // クリックした画像のパスを拡大用画像に渡す
        modalImg.alt = this.alt;     // altテキストもコピー
    }

    // ----- 閉じるボタン（×）をクリックした時の動作 -----
    closeBtn.onclick = function() {
        modal.classList.remove('show'); // モーダルを表示するクラスを削除
    }

    // ----- 背景（黒い部分）をクリックしても閉じるようにする -----
    modal.onclick = function(event) {
        // クリックされた場所が画像自体でなければ閉じる
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    }
});