document.addEventListener('DOMContentLoaded', function() {
    console.log("Script Loaded"); // 読み込み確認用

    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("expanded-image");
    
    // 詳細ページのメイン画像を探す
    // ※ HTML側のクラス名が .detail-image で画像があることを前提としています
    const triggerImg = document.querySelector(".detail-image img");
    
    const closeBtn = document.querySelector(".close-modal");

    // 要素が見つからない場合のエラーチェック
    if (!triggerImg) { console.error("詳細画像(.detail-image img)が見つかりません"); return; }
    if (!modal) { console.error("モーダル(#image-modal)が見つかりません"); return; }

    // 1. 画像クリックでモーダルを開く
    triggerImg.onclick = function(){
        modal.classList.add('show');
        modalImg.src = this.src;
        // 拡大リセット
        modalImg.classList.remove('is-zoomed');
    }

    // 2. モーダル画像クリックで拡大/縮小
    modalImg.onclick = function(e) {
        // バブリング防止（背景クリック判定を防ぐ）
        e.stopPropagation();
        
        // クラスを付け外し
        this.classList.toggle('is-zoomed');
        console.log("Zoom Toggled:", this.classList.contains('is-zoomed'));
    }

    // 3. 閉じるボタン
    closeBtn.onclick = function() {
        modal.classList.remove('show');
    }

    // 4. 背景クリックで閉じる
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    }
});