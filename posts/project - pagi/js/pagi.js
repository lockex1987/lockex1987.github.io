/**
 * Tạo các link.
 */
const PagiItem = {
    template: `
        <li class="page-item"
            :class="className">
            <span v-if="className"
                class="page-link">
                {{text}}
            </span>

            <!-- SPA khi có thay đổi hash sẽ reload trang, do đó không để hash kiểu href = '#' + page -->
            <a v-else
                class="page-link"
                href="javascript:;"
                @click.stop.prevent="$emit('goto', page)"
                v-html="text">
            </a>
        </li>`,

    props: {
        // Nhãn
        text: {
            type: String
        },

        // Chỉ số trang
        page: {
            type: Number // Integer
        },

        // CSS class
        className: {
            type: String,
            default: ''
        }
    }
};


/**
 * Pagi: A pagination library
 * Code mới nhất ở https://lockex1987.github.io/posts/project - pagi/js/pagi.js.
 *
 * @version 2.1.0
 * @author lockex1987
 */
const Pagi = {
    // Nếu mà để ở trên thì cần mb-3
    template: `
        <div class="d-lg-flex align-items-center justify-content-between">
            <template v-if="isInit">
                <!-- Nếu rỗng thì hiển thị thông báo -->
                <template v-if="totalNumber <= 0">
                    <template v-if="appliedOptions.showNoRecordText">
                        <!-- Thông báo không tồn tại dữ liệu -->
                        <span class="no-record text-danger">
                            {{appliedOptions.noRecordText}}
                        </span>
                    </template>
                </template>

                <template v-else>
                    <!-- Hiển thị tổng số bản ghi -->
                    <template v-if="appliedOptions.showTotalNumber">
                        <div class="text-muted small mb-2 mb-md-0">
                            Tổng số {{formatThousands(totalNumber)}} bản ghi
                        </div>
                    </template>

                    <template v-if="totalPage > 1">
                        <!-- Thẻ UL bao bên ngoài -->
                        <ul class="pagination mb-0">
                            <!-- Link đến trang đầu tiên -->
                            <template v-if="appliedOptions.showFirst
                                    && currentPage > 2
                                    && startPage > 1">
                                <pagi-item :text="'1'"
                                    :page="1"
                                    @goto="callbackFunc($event, appliedOptions.pageSize)"></pagi-item>
                            </template>

                            <!-- Link đến trang trước -->
                            <template v-if="appliedOptions.showPrevious
                                    && currentPage > 1">
                                <pagi-item :text="appliedOptions.previousText"
                                    :page="currentPage - 1"
                                    @goto="callbackFunc($event, appliedOptions.pageSize)"></pagi-item>
                            </template>

                            <template v-if="appliedOptions.showNumbers">
                                <template v-for="i in pages">
                                    <template v-if="i === currentPage
                                            && appliedOptions.showGotoPage">
                                        <!-- Hiển thị ô chuyển đến trang nào đó -->
                                        <li class="page-item">
                                            <input type="text"
                                                class="form-control d-inline-block mb-2 mb-md-0 mx-1 text-center goto-page-input"
                                                style="width: 50px;"
                                                placeholder="#"
                                                :value="currentPage"
                                                @blur="gotoUserEnterPage()"
                                                @keydown.enter.prevent="gotoUserEnterPage()"/>
                                        </li>
                                    </template>

                                    <template v-else>
                                        <!-- Link đến các trang ở tầm giữa -->
                                        <pagi-item :text="formatThousands(i)"
                                            :page="i"
                                            :class-name="i === currentPage ? 'active' : ''"
                                            @goto="if (i !== currentPage) { callbackFunc($event, appliedOptions.pageSize); }"></pagi-item>
                                    </template>
                                </template>
                            </template>

                            <!-- Link đến trang tiếp theo -->
                            <template v-if="appliedOptions.showNext
                                    && currentPage < totalPage">
                                <pagi-item :text="appliedOptions.nextText"
                                    :page="currentPage + 1"
                                    @goto="callbackFunc($event, appliedOptions.pageSize)"></pagi-item>
                            </template>

                            <!-- Link đến trang cuối cùng -->
                            <template v-if="appliedOptions.showLast
                                    && currentPage < totalPage - 1
                                    && endPage < totalPage">
                                <pagi-item :text="formatThousands(totalPage)"
                                    :page="totalPage"
                                    @goto="callbackFunc($event, appliedOptions.pageSize)"></pagi-item>
                            </template>
                        </ul>
                    </template>
                </template>
            </template>
        </div>`,

    components: {
        PagiItem
    },

    props: {
        // Hàm gọi khi click vào từng trang
        // Hàm có các tham số là page và pageSize
        callbackFunc: {
            type: Function
        },

        // Tùy chọn người dùng cấu hình
        options: {
            type: Object,
            default: {}
        }
    },

    data() {
        const defaultOptions = {
            showFirst: true,
            showLast: true,
            showPrevious: true,
            showNext: true,
            showNumbers: true,
            previousText: '&laquo;', // &lt;
            nextText: '&raquo;', // &gt;
            showNoRecordText: true,
            noRecordText: 'Không có bản ghi nào',
            showTotalNumber: true,
            pageSize: 10,
            showGotoPage: true
        };

        const appliedOptions = Object.assign(defaultOptions, this.options);

        return {
            // Tùy chọn được áp dụng
            appliedOptions: appliedOptions,

            // Tổng số bản ghi
            totalNumber: 0,
            // Tổng số trang
            totalPage: 0,
            // Trang hiện tại, bắt đầu từ 1
            currentPage: 1,
            // Trang đầu tiên
            startPage: 1,
            // Trang cuối cùng
            endPage: 1,
            // Index bắt đầu, tiện khi hiển thị số thứ tự phân trang
            startIndex: 0,
            // Danh sách các trang hiển thị
            pages: [],

            // Đã khởi tạo xong
            isInit: false
        };
    },

    methods: {
        /**
         * Phân cách dấu phảy phần ngàn.
         * Tham khảo gốc ở CommonUtils.
         */
        formatThousands(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        },

        /**
         * Cập nhật.
         * Thiết lập lại thông tin, tính toán lại.
         * Server cần trả về số bản ghi và trang hiện tại là trang nào.
         * @param {Integer} totalNumber Tổng số trang
         * @param {Integer} currentPage Trang hiện tại
         */
        update(totalNumber, currentPage) {
            this.totalNumber = totalNumber;
            this.totalPage = Math.ceil(this.totalNumber / this.appliedOptions.pageSize);
            this.currentPage = Math.min(currentPage, this.totalPage);

            // Hiển thị 5 trang (trừ khi có ít hơn 5 trang)
            // Trang hiện tại ở vị trí giữa (thứ 3), trừ khi trang hiện tại nhỏ hơn 3 hoặc cách trang cuối cùng ít hơn 2 trang
            if (this.totalPage <= 5) {
                this.startPage = 1;
                this.endPage = this.totalPage;
            } else if (this.currentPage <= 3) {
                this.startPage = 1;
                this.endPage = 5;
            } else if (this.currentPage + 2 >= this.totalPage) {
                this.startPage = this.totalPage - 4;
                this.endPage = this.totalPage;
            } else {
                this.startPage = this.currentPage - 2;
                this.endPage = this.currentPage + 2;
            }

            // Index bắt đầu, tiện khi hiển thị số thứ tự phân trang
            this.startIndex = (this.currentPage - 1) * this.appliedOptions.pageSize;
            // console.log(this.totalPage, currentPage, this.currentPage, this.appliedOptions, this.startIndex);

            // Tạo mảng các trang
            this.pages = [];
            for (let i = this.startPage; i <= this.endPage; i++) {
                this.pages.push(i);
            }

            // Đã khởi tạo xong
            this.isInit = true;
        },

        /**
         * Chuyển đến một trang do người dùng nhập.
         */
        gotoUserEnterPage() {
            // Validate chỉ số trang
            const value = this.$el.querySelector('.goto-page-input').value.trim();
            if (value === '') {
                return;
            }
            const regex = /(^\d\d*$)/;
            if (!regex.test(value)) {
                noti.error('Bạn phải nhập trang kiểu số nguyên dương');
                return;
            }
            const page = parseInt(value);
            if (page <= 0) {
                noti.error('Trang phải lớn hơn 0');
                return;
            }
            if (page > this.totalPage) {
                noti.error('Trang vượt quá tổng số trang');
                return;
            }
            this.callbackFunc(page, this.appliedOptions.pageSize);
        },

        /**
         * Load (lại) dữ liệu, chuyển đến trang 1.
         */
        reload() {
            this.callbackFunc(1, this.appliedOptions.pageSize);
        }
    }
};


// Đăng ký component toàn cục
Vue.component('pagi', Pagi);
