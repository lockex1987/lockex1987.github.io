function ConstructItem(name, price, quantity, unit) {
    return {
        name,
        price,
        quantity,
        unit
    };
}

new Vue({
    el: '#app',

    data() {
        return {
            rawList: [
                ConstructItem('Dỡ nhà cũ', 20000000, 1, 'nhà'),
                ConstructItem('Móng', 0, 88, 'm2'),
                ConstructItem('Tầng 1', 5000000, 88, 'm2'),
                ConstructItem('Tầng 2', 5000000, 55, 'm2'),
                ConstructItem('Mái bằng', 0, 55, 'm2'),
                ConstructItem('Mái tôn', 1000000, 88, 'm2'),
                ConstructItem('Sân', 1000000, 80, 'm2'),
                ConstructItem('Cổng + tường', 0, 0, ''),
                ConstructItem('Thiết bị vệ sinh', 0, 0, ''),
                ConstructItem('Thiết kế', 20000000, 1, 'bản'),
                ConstructItem('Thiết bị điện', 0, 0, '')
            ],

            furnitureList: [
                ConstructItem('Tủ bếp', 5000000, 1, 'chiếc'),
                ConstructItem('Điều hòa nhiệt độ', 5000000, 2, 'chiếc'),
                ConstructItem('Máy lọc nước', 5000000, 1, 'chiếc'),
                ConstructItem('Máy rửa bát', 15000000, 1, 'chiếc'),
                ConstructItem('Tủ lạnh', 10000000, 1, 'chiếc'),
                ConstructItem('Sô pha', 15000000, 1, 'chiếc'),
                ConstructItem('Ban thờ', 20000000, 1, 'chiếc'),
                ConstructItem('Bồn nước Sơn Hà', 6000000, 1, 'chiếc'),
                ConstructItem('Camera an ninh', 1000000, 4, 'chiếc'),
                ConstructItem('Bình nóng lạnh tức thời', 5000000, 1, 'chiếc'),
                ConstructItem('Máy sưởi (chăn sưởi)', 10000000, 1, 'chiếc'),
                ConstructItem('Bếp ga', 2000000, 1, 'chiếc'),
				ConstructItem('Bếp từ', 2000000, 1, 'chiếc'),
                ConstructItem('Máy giặt', 5000000, 1, 'chiếc')
            ],
        };
    },

    computed: {
        rawSum() {
            return this.calculateSum(this.rawList);
        },

        furnitureSum() {
            return this.calculateSum(this.furnitureList);
        },
    },

    methods: {
        calculateSum(arr) {
            const callback = (accumulator, currentValue, currentIndex, sourceArray) => {
                return accumulator + (currentValue.price * currentValue.quantity);
            };
            return arr.reduce(callback, 0);
        },

        /**
         * Hiển thị số có ngăn cách hàng nghìn.
         * @param {Number} num Số
         */
        formatNumber(num) {
            if (!num) {
                return num;
            }
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
    }
});
