// Dữ liệu sau khi đã được lọc theo tag hoặc xâu tìm kiếm
var filterPosts;

// Đối tượng search Lunr
var lunrIndex;

var listElm = document.querySelector('.list');

var queryElm = document.getElementById('query');

/**
 * Khởi tạo đối tượng Lunr.
 */
function initSearch() {
  lunrIndex = lunr(function () {
    this.ref('id');

    this.field('path', { boost: 8 });
    this.field('title', { boost: 10 });
    this.field('description');
    //this.field('category');

    //this.metadataWhitelist = ['position'];

    //this.k1(1.3);
    //this.b(0);

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
    var posts = lunrIndex.search(query).map(result => {
        var id = result.ref;
        var p = allPosts[parseInt(id)];
        return p;
    });
    return posts;
}

/**
 * Lọc các bài viết theo từ khóa tìm kiếm.
 */
function processFilterPosts() {
    // Từ khóa tìm kiếm
    var query = queryElm.value.toLowerCase();

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

    var fragment = document.createDocumentFragment();
    filterPosts.slice(1, 10).forEach((p, idx) => {
        var item = document.createElement('li');
        item.innerHTML = `
                    <div class="info">
                        <div>
                            <strong>Title: ${p.title}</strong>
                        </div>

                        <div>
                            Path: ${p.path}
                        </div>
                        
                        <div class="description">
                            <em>Description: ${p.description}</em>
                        </div>
                    <div>`;
        fragment.appendChild(item);
    });

    
    listElm.appendChild(fragment);
}

initSearch();

queryElm.addEventListener('input', processFilterPosts);
