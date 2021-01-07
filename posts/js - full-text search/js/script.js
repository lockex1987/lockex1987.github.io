import allPosts from '../../../js/post-list.js';

// Dữ liệu sau khi đã được lọc theo tag hoặc xâu tìm kiếm
let filterPosts;

// Đối tượng search Lunr
let lunrIndex;

// Danh sách kết quả
const listElm = document.querySelector('.list');

// Ô tìm kiếm
const queryElm = document.getElementById('query');

/**
 * Khởi tạo đối tượng Lunr.
 */
function initSearch() {
    lunrIndex = lunr(function () {
        this.ref('id');

        this.field('path', { boost: 8 });
        this.field('title', { boost: 10 });
        this.field('description');
        // this.field('category');

        // this.metadataWhitelist = ['position'];

        // this.k1(1.3);
        // this.b(0);

        allPosts.forEach((e, i) => {
            e.id = i;
            this.add(e);
        });
    });
}

/**
 * Tìm kiếm theo full text search bằng Lunr.
 * @param {String} query Xâu tìm kiếm
 */
function fullTextSearch(query) {
    const posts = lunrIndex.search(query).map(result => {
        const id = result.ref;
        const p = allPosts[parseInt(id)];
        return p;
    });
    return posts;
}

/**
 * Lọc các bài viết theo từ khóa tìm kiếm.
 */
function processFilterPosts() {
    // Từ khóa tìm kiếm
    const query = queryElm.value.toLowerCase();

    // Tiến hành lọc theo từ khóa
    if (!query) {
        filterPosts = allPosts;
    } else {
        filterPosts = fullTextSearch(query);
    }

    // Bắt đầu hiển thị ra cho người dùng
    listElm.innerHTML = '';

    bindPosts();
}

/**
 * Hiển thị tất cả các post luôn 1 lần.
 */
function bindPosts() {
    document.querySelector('#searchInfo').textContent = 'Tìm thấy ' + filterPosts.length + ' bài viết';

    if (filterPosts.length == 0) {
        return;
    }

    const fragment = document.createDocumentFragment();
    filterPosts.slice(0, 10).forEach((p, idx) => {
        const item = document.createElement('div');
        item.className = 'border rounded mb-3 p-3';
        item.innerHTML = `
                    <div class="font-weight-500">
                        ${p.title}
                    </div>

                    <div class="text-primary">
                        ${p.path}
                    </div>
                    
                    <div class="text-italic">
                        ${p.description}
                    </div>`;
        fragment.appendChild(item);
    });
    listElm.appendChild(fragment);
}

initSearch();

queryElm.addEventListener('input', CommonUtils.debounce(processFilterPosts, 500));
