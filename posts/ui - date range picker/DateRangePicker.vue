<template>
    <div class="input-group cursor-pointer">
        <div class="input-group-prepend">
            <span class="input-group-text bg-white border-right-0">
                <i class="fa fa-lg fa-calendar text-muted"></i>
            </span>
        </div>
        
        <input type="text" class="form-control bg-white border-left-0" readonly :placeholder="placeholder">
        
        <div class="input-group-append">
            <span class="input-group-text">
                <i class="fa fa-lg fa-times text-danger"
                        @click.stop="clearDateRangeFilter()"></i>
            </span>
        </div>
    </div>
</template>


<script>
    import moment from 'moment'
    import 'daterangepicker/daterangepicker'

    export default {
        name: 'DateRangePicker',

        props: {
            config: {
                type: Object,
                default: null
            },

            placeholder: {
                type: String,
                default: 'Tất cả thời gian'
            }
        },

        data() {
            return {
                options: {
                    format: 'DD/MM/YYYY',
                    locale: {
                        separator: ' - ',
                        applyLabel: 'Áp dụng',
                        cancelLabel: 'Hủy',
                        customRangeLabel: 'Tùy chỉnh',
                        fromLabel: 'Từ',
                        toLabel: 'Đến',
                        daysOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                        monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                        firstDay: 1
                    },
                    ranges: {
                        //'Hôm nay': [moment(), moment()],
                        //'Hôm qua': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        //'7 ngày qua': [moment().subtract(6, 'days'), moment()],
                        '30 ngày qua': [moment().subtract(29, 'days'), moment()],
                        'Tuần này': [moment().startOf('week'), moment().endOf('week')],
                        'Tuần trước': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
                        'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                        'Tháng trước': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    }
                }
            };
        },

        mounted() {
            this.initDateRangePicker();
        },

        methods: {
            /**
             * Khởi tạo.
             */
            initDateRangePicker() {
                Object.assign(this.options, this.config);

                $(this.$el)
                    .daterangepicker(this.options)
                    .on('apply.daterangepicker', this.applyDateRangeFilter);
            },

            /**
             * Xử lý khi chọn khoảng thời gian.
             */
            applyDateRangeFilter(evt, picker) {
                let start = picker.startDate;
                let end = picker.endDate;
                $(this.$el).find('input').val(start.format(this.options.format) + this.options.locale.separator + end.format(this.options.format));

                this.$emit('change', {
                    startDate: start.format('YYYY/MM/DD') + ' 00:00:00',
                    endDate: end.format('YYYY/MM/DD') + ' 23:59:59'
                });
            },

            /**
             * Xóa chọn khoảng thời gian.
             */
            clearDateRangeFilter() {
                $(this.$el).find('input').val('');

                this.$emit('change', {
                    startDate: null,
                    endDate: null
                });
            },
        }
    }
</script>


<style>
    @import "~daterangepicker/daterangepicker.css";
</style>
