// Dữ liệu sau khi đã được lọc theo tag hoặc xâu tìm kiếm
var filterPosts;

// Chỉ số bài viết hiện tại
var curentPostIndex = 0;

// Đánh dấu có đang xử lý hay không (để không xử lý nhiều lần)
var isLoadingMorePosts = false;

// Đối tượng search Lunr
var lunrIndex;

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
 * Cập nhật lại ảnh cho tất cả bài viết.
 */
function updateThumbnailImage() {
    // Category và ảnh đại diện
    const CAT_THUMBS = {
        "eclipse": "eclipse.png",
        "git" : "git.svg",
        "linux": "linux.svg",
        "spring": "spring.png",
        "vue": "vue.png",
        "angularjs": "angularjs.svg",
        "bootstrap": "bootstrap.svg",
        "grunt": "grunt.svg",
        "javascript": "javascript.svg",
        "bulma": "bulma.png",
        "gulp": "gulp.svg",
        "java": "java.svg",
        "maven": "maven.png",
        "chartjs": "chartjs.svg",
        "jquery": "jquery.svg",
        "python": "python.svg",
        "css": "css3.svg",
        "ui": "css3.svg",
        "mysql": "mysql.svg",
        "redis": "redis.svg",
        "vscode": "vscode.png",
        "django": "django.svg",
        "github": "github.svg",
        "web": "html5.svg",
        "webext": "html5.svg",
        "less": "less.svg",
        "nodejs": "nodejs.svg",
        "other": "other.png",
        "story": "story.png",
        "pwa": "pwa.svg",
        "laravel": "laravel.svg",
        "highcharts": "highcharts.png",
        "highmaps": "highcharts.png",
        "project": "project.png",
        "knowledge": "other.png",
        "it": "other.png",
        "php": "php.svg",
        "elasticsearch": "elasticsearch.svg",
        "docker": "docker.svg",
        "cryptography": "cryptography.png",
        "animation": "animation.png",
        "cassandra": "cassandra.svg",
        "node": "nodejs.svg",
        "nginx": "nginx.svg",
        "ckeditor": "ckeditor.png",
        "game": "game.png",
        "mongodb": "mongodb.png",
        "riot": "riot.png",
        "sass": "sass.png"
    };

    // Cập nhật lại ảnh cho tất cả bài viết
    allPosts.forEach(e => {
        e.thumb = CAT_THUMBS[e.category] || (e.category + '.png');
        //if (!CAT_THUMBS[e.category]) console.log(e.category);
    });
}

/**
 * Lọc các bài viết theo từ khóa tìm kiếm.
 */
function processFilterPosts() {
    // Từ khóa tìm kiếm
    var query = document.getElementById('query').value.toLowerCase();

    // Tiến hành lọc theo từ khóa
    if (!query) {
        filterPosts = allPosts;
    } else {
        //filterPosts = fullTextSearch(query);
        filterPosts = splitSearch(query);
    }

    // Lọc tiếp theo bookmark nếu chỉ hiển thị bookmark
    if (document.getElementById("isBookmark").checked) {
        var bookmarks = getBookmarks();
        filterPosts = filterPosts.filter(p => {
            return bookmarks.includes(p.path);
        });
    }

    // Bắt đầu hiển thị ra cho người dùng
    curentPostIndex = 0;
    document.querySelector(".list").innerHTML = '';
    bindPosts();
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
 * Tìm kiếm theo từng từ.
 */
function splitSearch(query) {
    var regex = createSearchRegex(query);

    var posts = allPosts.filter(p => {
        var count = countOccurrences(p.title, regex) * 10
                    + countOccurrences(p.path, regex) * 8
                    + countOccurrences(p.description, regex) * 5;
        if (count > 0) {
            p.occurrences = count;
            return true;
        }
        return false;
    });

    // Sắp xếp theo chỉ số số lần xuất hiện và path
    posts.sort((a, b) => {
        if (a.occurrences != b.occurrences) {
            return b.occurrences - a.occurrences;
        }
        return a.path.localeCompare(b.path);
    });

    return posts;
}

/**
 * Tạo biểu thức chính quy từ xâu tìm kiếm.
 * Sử dụng khi tìm kiếm và highlight.
 * @param {String} query Xâu tìm kiếm
 */
function createSearchRegex(query) {
    var regex = new RegExp('(' + query.trim().split(' ').join('|') + ')', 'gi');
    return regex;
}

/**
 * Đếm số lần xuất hiện của từ.
 * @param {String} text Xâu to
 * @param {Regex} regex Biểu thức chính quy
 */
function countOccurrences(text, regex) {
    return (text.match(regex) || []).length;
}

/**
 * Hiển thị tất cả các post luôn 1 lần.
 */
function bindPosts() {
    var listElm = document.querySelector(".list");
    if (filterPosts.length == 0) {
        listElm.innerHTML = '<li style="color: #E06950">Không tìm thấy kết quả</li>';
        return;
    }

    // Nếu đã hết bản ghi
    if (curentPostIndex >= filterPosts.length) {
        return;
    }

    // Đánh dấu đang xử lý
    isLoadingMorePosts = true;

    var bookmarks = getBookmarks();

    // Từ khóa tìm kiếm
    var query = document.getElementById('query').value.toLowerCase();

    // Chỉ lấy ít bản ghi thôi, nếu không sẽ bị chậm
    var morePostNumber = 20;

    var regex = createSearchRegex(query);
    
    filterPosts.slice(curentPostIndex, curentPostIndex + morePostNumber).forEach((p, idx) => {
        var item = document.createElement('li');
        item.id = `post${curentPostIndex + idx}`;
        item.innerHTML = `
                    <!--img class="thumb" src="images/${p.thumb}"/-->
                    <div class="info">
                        <div>
                            <img class="bookmark"
                                    src="${bookmarks.includes(p.path) ? 'images/bookmark-solid.svg' : 'images/bookmark-regular.svg'}"
                                    style="width:12px; cursor:pointer;"
                                    onclick="toggleBookmarks(${curentPostIndex + idx})"/>

                            <a class="title" href="posts/${p.path}/" target="_blank">
                                ${highlightText(p.title, regex, query)}
                            </a>
                        </div>

                        <div>
                            <a class="path" href="posts/${p.path}/" target="_blank">
                                ${highlightText(p.path, regex, query)}
                            </a>
                        </div>
                        
                        <div class="description">
                            ${highlightText(p.description, regex, query, 170)}
                        </div>
                    <div>`;
        listElm.appendChild(item);
    });
    

    // Tăng chỉ số
    curentPostIndex += morePostNumber;
    
    // Đánh dấu đã xử lý xong
    isLoadingMorePosts = false;
}

/**
 * Hiển thị highlight tìm kiếm.
 * @param {String} text Xâu gốc hiển thị
 * @param {Regex} regex Biểu thức chính quy
 */
function highlightText(text, regex, query) {
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function highlightText2(content, regex, query, previewLength) {
  previewLength = previewLength || (content.length * 2);

  var parts = query.split(' ');
  var match = content.toLowerCase().indexOf(query.toLowerCase());
  var matchLength = query.length;
  var preview;

  // Find a relevant location in content
  for (var i = 0; i < parts.length; i++) {
    if (match >= 0) {
      break;
    }
    match = content.toLowerCase().indexOf(parts[i].toLowerCase());
    matchLength = parts[i].length;
  }

  // Create preview
  if (match >= 0) {
    var start = match - (previewLength / 2);
    var end = start > 0 ? match + matchLength + (previewLength / 2) : previewLength;
    preview = content.substring(start, end).trim();
    if (start > 0) {
      preview = '...' + preview;
    }
    if (end < content.length) {
      preview = preview + '...';
    }
    // Highlight query parts
    preview = preview.replace(new RegExp('(' + parts.join('|') + ')', 'gi'), '<strong>$1</strong>');
  } else {
    // Use start of content if no match found
    preview = content.substring(0, previewLength).trim() + (content.length > previewLength ? '...' : '');
  }
  return preview;
}

/**
 * Lấy danh sách bookmark đã lưu.
 */
function getBookmarks() {
	var val = localStorage.getItem("bookmarks");
	if (val) {
		return JSON.parse(val);
	} else {
		return [];
	}
}

/**
 * Lưu thông tin bookmark.
 * @param {Array} bookmarks 
 */
function setBookmarks(bookmarks) {
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

/**
 * Toggle bookmark bài viết.
 * @param {Integer} idx Chỉ số của bài viết.
 */
function toggleBookmarks(idx) {
    var bookmarks = getBookmarks();

	var link = filterPosts[idx].path;
	var index = bookmarks.indexOf(link);
	if (index >= 0) {
		bookmarks.splice(index, 1);
		updateBookmarkIcon(idx, false);
	} else {
		bookmarks.push(link);
		updateBookmarkIcon(idx, true);
	}
	
	setBookmarks(bookmarks);
}

/**
 * Cập nhật lại icon bookmark.
 * @param {*} idx 
 * @param {*} bookmarked 
 */
function updateBookmarkIcon(idx, bookmarked) {
	document.querySelector('#post' + idx + ' .bookmark').src = bookmarked ? 'images/bookmark-solid.svg' : 'images/bookmark-regular.svg';
}

/**
 * Gộp những thể loại có ít hơn 10 bài viết.
 */
function normalizeCategories() {
    var normalized = [];
    var names = [];
    normalized.push({ name: 'other', y: 0 });
    categories.forEach(c => {
        if (c.y >= 10) {
            normalized.push(c);
        } else {
            normalized[0].y += c.y;
            if (names.indexOf(c.name) < 0) {
                names.push(c.name);
            }
        }
    });
    normalized[0].name = names.slice(0, 10).join(', ') + ',...';
    return normalized;
}

/**
 * Vẽ biểu đồ thể loại và số bài viết.
 */
function buildChart() {
    Highcharts.chart('chart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: 'transparent',
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false,
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'vertical'
        },
        series: [{
            name: 'Số bài',
            colorByPoint: true,
            data: normalizeCategories() // categories
        }]
    });
}

/**
 * Lọc bài viết theo thể loại.
 * @param {String} category Tên thể loại
 */
function filterByCategory(category) {
    // Thiết lập lại xâu tìm kiếm
    document.getElementById('query').value = category; // + ' -';

    // Tìm kiếm lại
    processFilterPosts();
}

/**
 * Hiển thị 10 thể loại nhiều post nhất.
 */
function buildCategories() {
    /*
    var arr = categories.slice(0, 10);
    var html = `
        ${arr.map((c) =>
            `
            <div class="cat">
                <a href="javascript:" onclick="filterByCategory('${c.name}')">${c.name} (${c.y})</a>
            </div>
            `
        ).join('')}
        `;
    */

    var arr = [
        'Web',
        'CSS',
        'JavaScript',
        'Bootstrap',
        'Highcharts',
        'Laravel',
        'PHP',
        'Java',
        //'Vue',
        //'Riot',
        'Linux',
    ];
    var html = `
        ${arr.map((c) =>
            `
            <li class="cat">
                <a href="javascript:" onclick="filterByCategory('${c.toLowerCase()}')">
                    ${c}
                </a>
            </li>
            `
        ).join('')}
        `;

    document.querySelector("#categories").innerHTML = `<ul style="list-style: none;">${html}</ul>`;
}

/**
 * Kiểm tra load bản ghi khi scroll.
 */
function checkLoadMorePosts() {
    // Nếu đang xử lý rồi thì thôi
    if (isLoadingMorePosts) {
        return;
    }

    // Tính toán xem nếu scroll đến gần cuối trang thì load thêm bản ghi
    var scrolled = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height - scrolled < 100) {
        bindPosts();
    }
}

window.addEventListener("DOMContentLoaded", function() {
    try {
        updateThumbnailImage();
        initSearch();
        processFilterPosts();
        //buildChart();
        buildCategories();
        document.getElementById('query').focus();
        window.addEventListener('scroll', checkLoadMorePosts);
        document.querySelector('#query').addEventListener('input', processFilterPosts);
        document.querySelector('#isBookmark').addEventListener('click', processFilterPosts);
    } catch (ex) {
        alert(ex);
    }
});

