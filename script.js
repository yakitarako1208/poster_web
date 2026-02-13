document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("expanded-image");
    const triggerImg = document.querySelector(".detail-image img");
    const closeBtn = document.querySelector(".close-modal");

    if (!triggerImg || !modal) return;

    // 1. 詳細ページ画像をクリックしてモーダルを開く
    triggerImg.onclick = function(){
        modal.classList.add('show');
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        modalImg.classList.remove('is-zoomed'); // 最初は必ず通常サイズで開く
    }

    // 2. モーダル内の画像をクリックして拡大/縮小する（シンプル版）
    // ----- 2. モーダル内の画像をクリックして拡大/縮小する -----
    modalImg.onclick = function(e) {
        e.stopPropagation();

        // これから拡大する場合
        if (!this.classList.contains('is-zoomed')) {
            
            // ▼▼▼ この部分（クリック位置の計算）を復活させました ▼▼▼
            const rect = this.getBoundingClientRect();
            // クリックした場所が、画像の「左から何％」「上から何％」の位置か計算
            const ratioX = (e.clientX - rect.left) / this.offsetWidth;
            const ratioY = (e.clientY - rect.top) / this.offsetHeight;
            // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

            // 拡大クラスをつける（CSSで大きくなる）
            this.classList.add('is-zoomed');

            // 拡大反映を少しだけ待ってから、その位置を表示位置に合わせる
            setTimeout(() => {
                const newWidth = this.offsetWidth;
                const newHeight = this.offsetHeight;
                
                // 「さっき計算した位置」が画面の中心に来るように座標をセット
                const scrollX = (newWidth * ratioX) - (modal.clientWidth / 2);
                const scrollY = (newHeight * ratioY) - (modal.clientHeight / 2);

                // ★ここを「smooth（滑らか）」ではなく、指定なし（一瞬）にしました
                modal.scrollTo(scrollX, scrollY);
                
            }, 100); // 0.1秒後に位置合わせ実行

        } else {
            // 縮小する場合
            this.classList.remove('is-zoomed');
        }
    }

    // 3. 閉じるボタン（×）
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

/* --- オープニング画面の制御（初回のみ表示） --- */

document.addEventListener('DOMContentLoaded', function() {
    const opening = document.getElementById('opening-screen');
    const key = 'visited'; // 記録に使う合言葉

    if (opening) {
        // ① ブラウザに「visited」という記録があるかチェック
        const isVisited = sessionStorage.getItem(key);

        if (isVisited) {
            // 記録がある場合（2回目以降）
            // アニメーションさせずに、最初から非表示にする
            opening.style.display = 'none'; 
        } else {
            // 記録がない場合（初回アクセス）
            // 次回のために「visited」という記録を残す
            sessionStorage.setItem(key, 'true'); 
            
            // ※ここでCSSのアニメーションが自動的に実行されます
        }
    }
});