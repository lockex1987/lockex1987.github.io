// Category và ảnh đại diện
const CAT_THUMBS = {
    linux: 'programming/linux.svg',
    bootstrap: 'programming/bootstrap-5.svg',
    js: 'programming/js.svg',
    java: 'programming/java.svg',
    css: 'programming/sass.svg', // css3
    ui: 'programming/sass.svg',
    mysql: 'programming/mysql.svg',
    laravel: 'programming/laravel.svg',
    highcharts: 'programming/highcharts.svg',
    highmaps: 'programming/highcharts.svg',
    php: 'programming/php.svg',
    vue: 'programming/vue.svg',
    project: 'programming/app store.svg',
    story: 'programming/epub.svg',
    docker: 'programming/docker.svg',
    git: 'programming/git.svg',
    elasticsearch: 'programming/elasticsearch.svg',
    redis: 'programming/redis.svg',
    nginx: 'programming/nginx.svg',
    node: 'programming/node.svg',
    python: 'programming/python.svg',
    webrtc: 'programming/webrtc.svg',
    composer: 'programming/composer.svg',
    webext: 'programming/web-extension.png',
    it: 'programming/it.png'
};

/**
 * Chuẩn hóa ngày xuất bản, ảnh đại diện thể loại, sắp xếp.
 */
const ContentDataProcessor = {

    /**
     * Chuẩn hóa ngày về định dạng ISO 8601 và thêm múi giờ Việt Nam.
     */
    normalizeDateOfPosts(postList) {
        postList.forEach(e => {
            if (e.date) {
                e.date = e.date.replace(' ', 'T') + '+07:00';
            }
        });
    },

    /**
     * Sắp xếp các bài viết theo thời gian giảm dần.
     */
    sortPosts(postList) {
        postList.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '') || a.path.localeCompare(b.path));
    },

    /**
     * Cập nhật lại ảnh của thể loại cho tất cả bài viết.
     */
    updateThumbnailImageOfPosts(postList) {
        // Cập nhật lại ảnh cho tất cả bài viết
        postList.forEach(e => {
            e.thumb = CAT_THUMBS[e.category];
            if (!e.thumb) {
                console.log(e.category);
            }
        });
    }
};

const FullTextSearch = {
    /**
     * Tìm kiếm theo từng từ.
     */
    splitSearch(query, allContentList) {
        // Chỉ tìm kiếm bắt đầu bằng, prefix
        // Có thể thêm tìm kiếm theo toàn bộ xâu tìm kiếm
        const prefixSubRegex = this.createPrefixSubRegex(query);
        const wholeWordRegex = this.createWholeWordRegex(query);

        const posts = allContentList.filter(p => {
            p.prefixSubCount = this.countOccurrences(p.path, prefixSubRegex) * 10 +
                this.countOccurrences(p.title, prefixSubRegex) * 8 +
                this.countOccurrences(p.description, prefixSubRegex) * 5;
            p.wholeWorldCount = this.countUniqueOccurrences(p.path + '\n' + p.title + '\n' + p.description, wholeWordRegex);
            if (p.prefixSubCount > 0 || p.wholeWorldCount > 0) {
                return true;
            }
            return false;
        });

        // Sắp xếp theo chỉ số số lần xuất hiện và path
        posts.sort((a, b) => {
            if (a.wholeWorldCount !== b.wholeWorldCount) {
                return b.wholeWorldCount - a.wholeWorldCount;
            }

            if (a.prefixSubCount !== b.prefixSubCount) {
                return b.prefixSubCount - a.prefixSubCount;
            }

            return a.path.localeCompare(b.path);
        });

        return posts;
    },

    /**
     * Tạo biểu thức chính quy từ xâu tìm kiếm.
     * Sử dụng khi tìm kiếm và highlight.
     * @param {String} query Xâu tìm kiếm
     */
    createPrefixSubRegex(query) {
        // Safari chưa hỗ trợ lookbehind (?<=^|\\s)
        const arr = query.trim().split(/\s/).map(s => `(^|\\s)(${s})`);
        const regex = new RegExp(arr.join('|'), 'gi');
        return regex;
    },

    /**
     * Tạo biểu thức chính quy từ xâu tìm kiếm.
     * Sử dụng tìm kiếm toàn bộ từ.
     * @param {String} query Xâu tìm kiếm
     */
    createWholeWordRegex(query) {
        const arr = query.trim().split(/\s/).map(s => `(^|\\s)(${s})(?=$|\\s)`);
        const regex = new RegExp(arr.join('|'), 'gi');
        return regex;
    },

    /**
     * Đếm số lần xuất hiện của từ.
     * @param {String} text Xâu to
     * @param {Regex} regex Biểu thức chính quy
     */
    countOccurrences(text, regex) {
        return (text.match(regex) || []).length;
    },

    /**
     * Đếm số từ xuất hiện.
     * @param {String} text Xâu to
     * @param {Regex} regex Biểu thức chính quy
     */
    countUniqueOccurrences(text, regex) {
        let arr = (text.match(regex) || []);
        arr = arr.map(s => s.toLowerCase());
        const setObj = new Set(arr);
        return setObj.size;
    }
};

export {
    CAT_THUMBS,
    ContentDataProcessor,
    FullTextSearch
};
