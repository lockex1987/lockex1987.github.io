export default [
    {
        code: 'jquery',
        name: 'jQuery',
        version: '3.2.1',
        jsPath: 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'
    },
    {
        code: 'popper',
        name: 'Popper',
        version: '1.14.7',
        jsPath: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
        jsMap: 'popper.min.js.map'
    },
    {
        code: 'moment',
        name: 'Moment',
        version: '2.24.0',
        jsPath: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
    },
    {
        code: 'moment-vi',
        name: 'Moment (ngôn ngữ tiếng Việt)',
        version: '2.24.0',
        jsPath: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/vi.js',
        savePath: 'moment'
    },
    {
        code: 'bootstrap',
        name: 'Bootstrap',
        version: '4.3.1',
        cssPath: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
        jsPath: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
        jsMap: 'bootstrap.min.js.map',
        link: 'https://lockex1987.github.io/posts/bootstrap%20-%20get%20started/',
        note: 'File JS phụ thuộc jQuery, Popper',
		cssChosen: false
    },
    {
        code: 'bootstrap-extended',
        name: 'Bootstrap extended',
        version: '1.0.0',
        cssPath: '../../css/bootstrap-extended.css',
        cssMap: 'bootstrap-extended.css.map',
        savePath: 'bootstrap'
    },
    {
        code: 'noti',
        name: 'Noti',
        cssPath: '../project - noti/css/noti.css',
        jsPath: '../project - noti/js/noti.js',
        link: 'https://lockex1987.github.io/posts/project%20-%20noti/'
    },
    {
        code: 'common-validation',
        name: 'Common validation',
        cssPath: '../project - common validation/css/common-validation.css',
        jsPath: '../project - common validation/js/common-validation.js',
        link: 'https://lockex1987.github.io/posts/project%20-%20common%20validation/'
    },
    {
        code: 'common-utils',
        name: 'CommonUtils',
        jsPath: '../../js/common.js',
        link: 'https://lockex1987.github.io/posts/js%20-%20common/'
    },
    /*
    {
        code: 'datatable',
        name: 'Datatable',
        cssPath: '../project - pagi/css/datatable.css',
        jsPath: '../project - pagi/js/datatable-sortable.js'
    },
    */
	/*
    {
        code: 'animate',
        name: 'Animate.css',
        version: '3.7.0',
        cssPath: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css',
		cssChosen: false
    },
	*/
    {
        code: 'daterangepicker',
        name: 'Date range picker',
        version: '^3.0.5',
        cssPath: 'https://cdn.jsdelivr.net/npm/daterangepicker@3.0.5/daterangepicker.min.css',
        cssMap: 'https://cdn.jsdelivr.net/sm/977d76daee7276d0fb7eb98d2d7dcb01c5e058f63c51d94902d4394e65335f6e.map',
        jsPath: 'https://cdn.jsdelivr.net/npm/daterangepicker@3.0.5/daterangepicker.min.js',
        jsMap: 'https://cdn.jsdelivr.net/sm/3a884fe0bdb97cb3a94b410e67cf38fdc248890d5581232077b3e6241e25cd21.map',
        note: 'Phụ thuộc jQuery, Moment. Phải sửa lại đường dẫn file map (sourceMappingURL).'
    },
    {
        code: 'line-awesome',
        name: 'Line Awesome',
        version: '1.3.0',
        cssPath: 'src/line-awesome/css/line-awesome.min.css',
        fontPaths: [
            'la-brands-400.eot',
            'la-brands-400.ttf',
            'la-brands-400.woff2',
            'la-regular-400.svg',
            'la-regular-400.woff',
            'la-solid-900.eot',
            'la-solid-900.ttf',
            'la-solid-900.woff2',
            'la-brands-400.svg',
            'la-brands-400.woff',
            'la-regular-400.eot',
            'la-regular-400.ttf',
            'la-regular-400.woff2',
            'la-solid-900.svg',
            'la-solid-900.woff'
        ].map(s => 'src/line-awesome/fonts/' + s)
    },
    {
        code: 'font-awesome',
        name: 'Font Awesome',
        version: '4.7.0',
        cssPath: 'src/font-awesome/css/font-awesome.min.css',
        fontPaths: [
            'fontawesome-webfont.eot',
            'fontawesome-webfont.ttf',
            'fontawesome-webfont.woff2',
            'fontawesome-webfont.svg',
            'fontawesome-webfont.woff'
        ].map(s => 'src/font-awesome/fonts/' + s)
    },
    {
        code: 'summernote',
        name: 'Summernote',
        version: '0.8.12',
        // cssPath: 'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.css',
        cssPath: 'src/summernote/css/summernote-bs4.css',
        fontPaths: [
            'summernote.eot',
            'summernote.ttf',
            'summernote.woff'
        ].map(s => 'src/summernote/fonts/' + s),
        jsPath: 'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.min.js',
        note: 'Phụ thuộc Bootstrap, và cả jQuery, Popper'
    },
    {
        code: 'summernote-vietnamese',
        name: 'Summernote (ngôn ngữ tiếng Việt)',
        version: '0.8.12',
        jsPath: 'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/lang/summernote-vi-VN.min.js',
        savePath: 'summernote'
    },
    {
        code: 'nat-carousel',
        name: 'NAT Carousel',
        cssPath: '../ui - carousel/css/nat-carousel.css',
        cssMap: 'nat-carousel.css.map',
        jsPath: '../ui - carousel/js/nat-carousel.js',
        link: 'https://lockex1987.github.io/posts/ui%20-%20carousel/'
    },
    {
        code: 'axios',
        name: 'Axios',
        version: '0.19.2',
        jsPath: 'https://unpkg.com/axios@0.19.2/dist/axios.min.js',
        jsMap: 'axios.min.map'
    },
    {
        code: 'highcharts-core',
        name: 'Highcharts (core)',
        version: '^8.1.0',
        jsPath: 'https://code.highcharts.com/highcharts.js',
        jsMap: 'highcharts.js.map',
        savePath: 'highcharts',
        link: 'https://lockex1987.github.io/posts/highcharts%20-%20learning/'
    },
    {
        code: 'highcharts-exporting',
        name: 'Highcharts (exporting)',
        jsPath: 'https://code.highcharts.com/modules/exporting.js',
        jsMap: 'exporting.js.map',
        savePath: 'highcharts'
    },
    /*
    {
        code: 'highcharts-offline-exporting',
        name: 'Highcharts (offline exporting)',
        jsPath: 'https://code.highcharts.com/modules/offline-exporting.js',
        savePath: 'highcharts'
    },
    */
    {
        code: 'highcharts-map',
        name: 'Highcharts (map)',
        jsPath: 'https://code.highcharts.com/maps/modules/map.js',
        jsMap: 'map.js.map',
        savePath: 'highcharts'
    },
    {
        code: 'highcharts-map-vn',
        name: 'Highcharts (bản đồ Việt Nam)',
        jsPath: 'src/highcharts/maps/map-vn-all.js',
        savePath: 'highcharts'
    },
    /*
    {
        code: 'highcharts-map-world',
        name: 'Highcharts (bản đồ thế giới TODO)',
        jsPath: 'TODO',
        savePath: 'highcharts'
    },
    */
    /*
    {
        code: 'jqcloud',
        name: 'jQCloud',
        version: '2.0.3',
        cssPath: 'https://cdn.jsdelivr.net/npm/jqcloud2@2.0.3/dist/jqcloud.min.css',
        jsPath: 'https://cdn.jsdelivr.net/npm/jqcloud2@2.0.3/dist/jqcloud.min.js'
    },
    */
    {
        code: 'highcharts-word-cloud',
        name: 'Highcharts (word cloud)',
        jsPath: 'https://code.highcharts.com/modules/wordcloud.js',
        jsMap: 'wordcloud.js.map',
        savePath: 'highcharts'
    },
    {
        code: 'vue',
        name: 'Vue',
        version: '2.6.11',
        jsPath: 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
        link: 'https://lockex1987.github.io/posts/vue%20-%20get%20started/'
    },
    {
        code: 'vue-router',
        name: 'Vue router',
        version: '3.1.5',
        jsPath: 'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
        savePath: 'vue'
    },
    {
        code: 'vuex',
        name: 'Vuex',
        version: '3.1.2',
        jsPath: 'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
        savePath: 'vue'
    },
	{
        code: 'pagi',
        name: 'Pagi',
        jsPath: '../project - pagi/js/pagi.js',
        note: 'Phụ thuộc noti, Vue',
        link: 'https://lockex1987.github.io/posts/project%20-%20pagi/'
    },
    /*
    {
        code: 'faker',
        name: 'Faker',
        version: '3.1.0',
        jsPath: 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js'
    },
    */
    {
        code: 'exceljs',
        name: 'ExcelJS',
        version: '3.8.0',
        jsPath: 'https://cdnjs.cloudflare.com/ajax/libs/exceljs/3.8.0/exceljs.min.js'
    },
    /*
    {
        code: 'jquery-ui',
        name: 'jQuery UI',
        version: '1.12.1',
        cssPath: 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css',
        jsPath: 'https://code.jquery.com/ui/1.12.1/jquery-ui.js'
    }
    */
];
