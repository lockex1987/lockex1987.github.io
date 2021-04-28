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
                @click.stop.prevent="$emit('change')"
                v-html="text">
            </a>
        </li>`,

    props: {
        // Nhãn
        text: {
            type: String
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
                <!-- Nếu rỗng thì hiển thị thông báo không tồn tại dữ liệu -->
                <span v-if="value.total <= 0
                        && appliedOptions.showNoRecordText"
                    class="no-record text-danger">
                    {{appliedOptions.noRecordText}}
                </span>

                <template v-else>
                    <!-- Hiển thị tổng số bản ghi -->
                    <div v-if="appliedOptions.showTotalNumber"
                        class="text-muted small mb-2 mb-md-0">
                        Tổng số {{formatThousands(value.total)}} bản ghi
                    </div>

                    <!-- Thẻ UL bao bên ngoài -->
                    <ul class="pagination mb-0"
                        v-if="value.last_page > 1">
                        <!-- Link đến trang đầu tiên -->
                        <pagi-item v-if="appliedOptions.showFirst
                                && value.current_page > 2
                                && startPage > 1"
                            :text="'1'"
                            @change="$emit('change', 1)"></pagi-item>

                        <!-- Link đến trang trước -->
                        <pagi-item v-if="appliedOptions.showPrevious
                                && value.current_page > 1"
                            :text="appliedOptions.previousText"
                            @change="$emit('change', value.current_page - 1)"></pagi-item>

                        <template v-if="appliedOptions.showNumbers">
                            <template v-for="i in pages">
                                <!-- Hiển thị ô chuyển đến trang nào đó -->
                                <li v-if="i === value.current_page
                                        && appliedOptions.showGotoPage"
                                    class="page-item">
                                    <input type="text"
                                        class="form-control d-inline-block mb-2 mb-md-0 mx-1 text-center goto-page-input"
                                        style="width: 50px;"
                                        placeholder="#"
                                        :value="value.current_page"
                                        @blur="gotoUserEnterPage()"
                                        @keydown.enter.prevent="gotoUserEnterPage()"/>
                                </li>

                                <!-- Link đến các trang ở tầm giữa -->
                                <pagi-item v-else
                                    :text="formatThousands(i)"
                                    :class-name="i === value.current_page ? 'active' : ''"
                                    @change="if (i !== value.current_page) { $emit('change', i); }"></pagi-item>
                            </template>
                        </template>

                        <!-- Link đến trang tiếp theo -->
                        <pagi-item v-if="appliedOptions.showNext
                                && value.current_page < value.last_page"
                            :text="appliedOptions.nextText"
                            @change="$emit('change', value.current_page + 1)"></pagi-item>

                        <!-- Link đến trang cuối cùng -->
                        <pagi-item v-if="appliedOptions.showLast
                                && value.current_page < value.last_page - 1
                                && endPage < value.last_page"
                            :text="formatThousands(value.last_page)"
                            @change="$emit('change', value.last_page)"></pagi-item>
                    </ul>
                </template>
            </template>
        </div>`,

    components: {
        PagiItem
    },

    props: {
        // Tùy chọn người dùng cấu hình
        options: {
            type: Object,
            default: {}
        },

        value: {
            type: Object,
            default: {}
            // Số bản ghi mỗi trang
            // per_page: 10,
            // Index bắt đầu, tiện khi hiển thị số thứ tự phân trang
            // from: 1,
            // Tổng số bản ghi
            // total: 0,
            // Trang hiện tại, bắt đầu từ 1
            // current_page: 1,
            // Tổng số trang
            // last_page: 0,
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
            showGotoPage: true
        };

        const appliedOptions = Object.assign(defaultOptions, this.options);

        return {
            // Tùy chọn được áp dụng
            appliedOptions: appliedOptions,

            // Trang đầu tiên
            startPage: 1,
            // Trang cuối cùng
            endPage: 1,

            // Danh sách các trang hiển thị
            pages: [],

            // Đã khởi tạo xong
            isInit: false
        };
    },

    watch: {
        /**
         * Cập nhật.
         * Thiết lập lại thông tin, tính toán lại.
         * Server cần trả về số bản ghi và trang hiện tại là trang nào.
         */
        value(oldValue, newValue) {
            const updateValue = {
                ...this.value
            };
            let shouldUpdate = false;
            if (this.value.last_page === undefined) {
                shouldUpdate = true;
                updateValue.last_page = Math.ceil(this.value.total / this.value.per_page);
            }
            if (this.value.from === undefined) {
                shouldUpdate = true;
                updateValue.from = (this.value.current_page - 1) * this.value.per_page + 1;
            }
            // this.value.current_page = Math.min(this.value.page, this.value.last_page);
            if (shouldUpdate) {
                this.$emit('input', updateValue);
            }

            if (oldValue.total == newValue.total
                && oldValue.current_page == newValue.current_page
                && oldValue.per_page == newValue.per_page) {
                return;
            }

            console.log('Cap nhat');

            // Hiển thị 5 trang (trừ khi có ít hơn 5 trang)
            // Trang hiện tại ở vị trí giữa (thứ 3), trừ khi trang hiện tại nhỏ hơn 3 hoặc cách trang cuối cùng ít hơn 2 trang
            if (this.value.last_page <= 5) {
                this.startPage = 1;
                this.endPage = this.value.last_page;
            } else if (this.value.current_page <= 3) {
                this.startPage = 1;
                this.endPage = 5;
            } else if (this.value.current_page + 2 >= this.value.last_page) {
                this.startPage = this.value.last_page - 4;
                this.endPage = this.value.last_page;
            } else {
                this.startPage = this.value.current_page - 2;
                this.endPage = this.value.current_page + 2;
            }

            // Tạo mảng các trang
            this.pages = [];
            for (let i = this.startPage; i <= this.endPage; i++) {
                this.pages.push(i);
            }

            // Đã khởi tạo xong
            this.isInit = true;
        }
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
            if (page > this.value.last_page) {
                noti.error('Trang vượt quá tổng số trang');
                return;
            }
            this.$emit('change', page);
        }
    }
};


// Đăng ký component toàn cục
Vue.component('pagi', Pagi);
