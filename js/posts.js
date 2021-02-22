import { CAT_THUMBS, ContentDataProcessor, FullTextSearch } from './category.js';


const template = `
<div>
    <form @submit.prevent="searchPosts()">
        <input type="text"
            ref="queryInput"
            v-model="query"
            placeholder="Search..."
            spellcheck="false"
            class="w-100 mb-2 query"
            autocomplete="off"
            @input="processFilterPosts()"/>
    </form>

    <label class="custom-control custom-checkbox custom-control-animated custom-control-highlighted custom-control-outlined mt-3 mb-3 d-none">
        <input type="checkbox"
            class="custom-control-input"
            v-model="onlyPublished"
            @change="processFilterPosts()">
        <span class="custom-control-label pt-1 pl-2">
            Chỉ hiển thị các bài viết đã xuất bản
        </span>
    </label>

    <p class="text-muted text-right font-size-0.875 mt-2"
        v-show="executedTime != null">
        Tìm thấy {{totalRecords}} bài viết trong {{executedTime}}ms
    </p>

    <ul class="list list-unstyled">
        <li class="d-flex mb-5"
            :id="'post' + curentPostIndex + '' + idx"
            v-for="(p, idx) in showList">
            <img :src="'images/' + p.thumb"
                class="thumb mr-3 mt-2">

            <div>
                <div class="mb-2">
                    <a class="text-blue font-size-1.25"
                        :href="'posts/' + p.path + '/'">
                        <span v-html="highlightText(p.title)"></span>
                    </a>
                </div>
                
                <div class="text-muted mt-1"
                    v-html="highlightText(p.description)"></div>

                <div class="mt-1">
                    <a class="text-body font-size-0.875 text-decoration-none"
                        :href="'posts/' + p.path + '/'">
                        <span v-html="highlightText(p.path)"></span>
                    </a>
                </div>

                <div class="text-muted mt-1 font-size-0.875"
                    v-html="highlightText(p.content)"
                    v-if="p.content"></div>

                <div class="text-success mt-1 font-size-0.875"
                    v-if="p.date">
                    <i class="la la-calendar mr-1"></i>
                    {{normalizeDate(p.date)}}
                </div>
            <div>
        </li>
    </ul>
</div>`;


const App = {
    template: template,

    data() {
        return {
            // Chỉ hiển thị các bài viết đã xuất bản
            onlyPublished: true,

            // Dữ liệu sau khi đã được lọc theo xâu tìm kiếm
            filteredList: [],

            // Tổng số bản ghi tìm thấy
            totalRecords: 0,

            // Dữ liệu hiển thị từng trang
            showList: [],

            // Chỉ số bài viết hiện tại
            curentPostIndex: 0,

            // Đánh dấu có đang xử lý hay không (để không xử lý nhiều lần)
            isLoadingMorePosts: false,

            // Xâu tìm kiếm
            query: '',

            // Thời gian tìm kiếm
            executedTime: null,

            // Danh sách bài viết
            postList: null,

            // Tìm kiếm local (file JSON), không phải Elasticsearch
            localSearch: true
        };
    },

    computed: {
        /**
         * Biểu thức chính quy để highlight kết quả tìm kiếm được.
         */
        searchRegex() {
            return FullTextSearch.createPrefixSubRegex(this.query);
        },

        /**
         * Danh sách dữ liệu để search.
         * Có thể là tất cả, hoặc chỉ những bài đã xuất bản.
         */
        toSearchList() {
            if (this.postList == null) {
                return null;
            }
            if (this.onlyPublished) {
                return this.postList.filter(post => post.date);
            }
            return this.postList;
        }
    },

    created() {
        // Khi bookmark có thể có thêm tham số searchAll=true và query
        const searchAll = CommonUtils.getUrlParameter('searchAll');
        this.onlyPublished = !searchAll;

        const query = CommonUtils.getUrlParameter('query');
        this.query = query || '';
    },

    mounted() {
        if (this.localSearch) {
            this.getPostList();
        } else {
            this.processFilterPosts();
        }

        this.setTitle();
        this.listenToScrollEvent();
        this.listenToPopstate();
        this.initFocus();
        this.addImagePrefetchLinks();
    },

    methods: {
        /**
         * Lấy dữ liệu bài viết.
         */
        async getPostList() {
            const postList = await fetch('data/post-list.json').then(resp => resp.json());

            // Cập nhật ảnh của thể loại
            ContentDataProcessor.updateThumbnailImageOfPosts(postList);

            // Sắp xếp
            ContentDataProcessor.sortPosts(postList);

            // Chuẩn hóa ngày xuất bản
            ContentDataProcessor.normalizeDateOfPosts(postList);

            this.postList = postList;

            this.$nextTick(() => {
                this.processFilterPosts();
            });
        },

        /**
         * Tìm kiếm ở Elasticsearch.
         */
        async searchElastic() {
            const size = 20;
            const url = 'http://localhost:3001/search' +
                '?queryText=' + encodeURIComponent(this.query) +
                '&from=' + this.curentPostIndex +
                '&size=' + size;
            const data = await fetch(url).then(resp => resp.json());

            const hits = data.hits;

            // Cập nhật ảnh của thể loại
            ContentDataProcessor.updateThumbnailImageOfPosts(hits);
            // console.log(hits);

            this.filteredList = hits;
            this.totalRecords = data.total;
        },

        /**
         * Lọc các bài viết theo từ khóa tìm kiếm.
         */
        async processFilterPosts() {
            const startTime = new Date();

            // Từ khóa tìm kiếm
            const query = this.query.toLowerCase();

            // Bắt đầu hiển thị ra cho người dùng
            this.curentPostIndex = 0;
            this.showList = [];

            // Tiến hành lọc theo từ khóa
            if (this.localSearch) {
                if (!query) {
                    this.filteredList = this.toSearchList;
                } else {
                    this.filteredList = FullTextSearch.splitSearch(this.query, this.toSearchList);
                }
                this.totalRecords = this.filteredList.length;
            } else {
                await this.searchElastic();
            }

            const endTime = new Date();
            this.executedTime = endTime - startTime;

            this.bindPosts();
        },

        /**
         * Đổi title.
         */
        setTitle() {
            document.title = 'Posts' + (this.query ? ` "${this.query}"` : '');
        },

        /**
         * Lắng nghe sự kiện scroll.
         */
        listenToScrollEvent() {
            window.addEventListener('scroll', this.checkLoadMorePosts);
        },

        /**
         * Kiểm tra load bản ghi khi scroll.
         */
        checkLoadMorePosts() {
            // Nếu đang xử lý rồi thì thôi
            if (this.isLoadingMorePosts) {
                return;
            }

            // Tính toán xem nếu scroll đến gần cuối trang thì load thêm bản ghi
            const scrolled = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (height - scrolled < 100) {
                this.bindPosts();
            }
        },

        /**
         * Hiển thị tất cả các post luôn 1 lần.
         */
        bindPosts() {
            // Nếu đã hết bản ghi
            if (this.curentPostIndex >= this.totalRecords) {
                return;
            }

            // Đánh dấu đang xử lý
            this.isLoadingMorePosts = true;

            // Chỉ lấy ít bản ghi thôi, nếu không sẽ bị chậm
            const morePostNumber = 20;

            if (this.localSearch) {
                this.showList.push(...this.filteredList.slice(this.curentPostIndex, this.curentPostIndex + morePostNumber));
            } else {
                this.showList.push(...this.filteredList);
            }
            // console.log(this.showList);

            // Tăng chỉ số
            this.curentPostIndex += morePostNumber;

            // Đánh dấu đã xử lý xong
            this.isLoadingMorePosts = false;
        },

        /**
         * Hiển thị highlight tìm kiếm.
         * @param {String} text Xâu gốc hiển thị
         */
        highlightText(text) {
            if (!this.localSearch) {
                return text;
            }

            if (!this.query) {
                return text;
            }
            return text.replace(this.searchRegex, (match) => {
                if (match.startsWith(' ')) {
                    return ` <span class="bg-yellow text-body">${match.trim()}</span>`;
                } else {
                    return `<span class="bg-yellow text-body">${match}</span>`;
                }
            });
        },

        /**
         * Chuẩn hóa ngày tháng khi hiển thị.
         * @param {Date} d Đối tượng Date
         */
        normalizeDate(d) {
            return CommonUtils.normalizeDate(d);
        },

        /**
         * Tìm kiếm.
         */
        searchPosts() {
            // blur ô nhập xâu tìm kiếm để ẩn keyboard trên mobile
            this.$refs.queryInput.blur();

            this.setTitle();

            // Lưu trạng thái của trang
            const state = {
                query: this.query
            };
            const url = (this.onlyPublished ? '?' : '?searchAll=true&') + 'query=' + this.query.toLowerCase();
            history.pushState(state, null, url);
        },

        /**
         * Lắng nghe sự kiện người dùng nhấn nút Back hoặc Forward.
         */
        listenToPopstate() {
            window.addEventListener('popstate', (evt) => {
                // Lấy nội dung nếu có địa chỉ
                // Thiết lập lại xâu tìm kiếm
                if (evt.state && evt.state.query) {
                    // Lấy địa chỉ ở state
                    this.query = evt.state.query;
                } else {
                    this.query = '';
                }
                this.setTitle();

                // Tìm kiếm lại
                this.processFilterPosts();
            });
        },

        /**
         * Focus luôn vào ô tìm kiếm.
         */
        initFocus() {
            this.$refs.queryInput.focus();
        },

        /**
         * Thêm các link prefetch để hiển thị ảnh các thể loại nhanh.
         */
        addImagePrefetchLinks() {
            for (const category in CAT_THUMBS) {
                if (CAT_THUMBS.hasOwnProperty(category)) {
                    const imageLink = CAT_THUMBS[category];
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = 'images/' + imageLink;
                    document.head.appendChild(link);
                }
            }
        }
    }
};

try {
    new Vue({
        el: '#app',
        components: {
            App
        }
    });
} catch (ex) {
    alert(ex);
}
