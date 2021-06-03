class HeaderNavigator {
    /**
     * Thêm vùng header chung (desktop).
     */
    addDesktopHeader() {
        const desktopHeader = document.createElement('div');
        desktopHeader.className = 'd-none d-xl-block pt-4 desktop-header';
        desktopHeader.innerHTML = `
                <div>
                    <div class="logo mb-2 text-right">
                        <a class="text-decoration-none" href="/">
                            <img src="/images/logo.svg" class="align-baseline"/>
                        </a>
                    </div>

                    <div class="menu ml-auto">
                        <div class="text-right mb-2">
                            <a class="text-decoration-none position-relative font-size-1.25 animated-underline text-blue"
                                    href="/posts.html">
                                Posts
                            </a>
                        </div>

                        <div class="text-right mb-2 d-none">
                            <a class="text-decoration-none position-relative font-size-1.25 animated-underline text-green"
                                    href="/archive.html">
                                Archive
                            </a>
                        </div>

                        <div class="text-right mb-0">
                            <a class="text-decoration-none position-relative font-size-1.25 animated-underline text-red"
                                    href="/cv/index.html">
                                About
                            </a>
                        </div>
                    </div>
                </div>`;
        document.body.insertBefore(desktopHeader, document.body.firstChild);
    }

    /**
      * Thêm vùng header chung (mobile).
      */
    addMobileHeader() {
        const mobileHeader = document.createElement('div');
        mobileHeader.className = 'mobile-header position-fixed bg-white w-100 border-bottom d-xl-none d-flex align-items-center px-2';
        mobileHeader.innerHTML = `
                <a href="/" class="logo">
                    <img src="/images/logo.svg">
                </a>

                <a class="ml-auto text-blue" href="/posts.html">
                    Posts
                </a>

                <a class="ml-3 text-green d-none" href="/archive.html">
                    Archive
                </a>

                <a class="ml-3 text-red" href="/cv/index.html">
                    About
                </a>`;
        document.body.insertBefore(mobileHeader, document.body.firstChild);

        document.body.classList.add('has-mobile-header');
    }

    /**
     * Ẩn hiện header khi scroll (màn hình mobile).
     */
    toggleMobileHeaderWhenScroll() {
        let prevScrollPos = window.pageYOffset;
        const header = document.querySelector('.mobile-header');
        let isHide = false;

        let navbarHeight = getComputedStyle(document.body).getPropertyValue('--header-height');
        navbarHeight = parseInt(navbarHeight.replace('px', '')) + 5;

        window.addEventListener('scroll', () => {
            const currentScrollPos = window.pageYOffset;

            // Make sure they scroll more than delta
            const delta = 5;
            if (Math.abs(prevScrollPos - currentScrollPos) <= delta) {
                return;
            }

            if (prevScrollPos > currentScrollPos) {
                // Scroll Up
                if (isHide) {
                    header.classList.remove('nav-hide');
                    isHide = false;
                }
            } else {
                // Scroll Down
                // If they scrolled down and are past the navbar, add class .nav-up.
                // This is necessary so you never see what is "behind" the navbar.
                if (currentScrollPos > navbarHeight) {
                    if (!isHide) {
                        header.classList.add('nav-hide');
                        isHide = true;
                    }
                }
            }

            // Save previous scroll position
            prevScrollPos = currentScrollPos;
        });
    }
}

class TocSection {
    /**
     * Load file JS.
     * @param {String} filePath Đường dẫn file
     */
    loadJsFile(filePath) {
        const scriptTag = document.createElement('script');
        scriptTag.setAttribute('src', filePath);
        document.head.appendChild(scriptTag);
    }

    /**
     * Tải các file để tạo mục lục.
     */
    loadToc() {
        const arr = document.querySelectorAll('article h3, article h4');
        if (arr.length >= 4) {
            this.loadJsFile('../../js/toc.js');
        }
    }
}

const PageInfo = {

    /**
     * Kiểm tra xem có phải là mở file HTML trực tiếp trên máy hay không (không qua server nào)
     * @return true nếu là file HTML trực tiếp
     */
    isLocalFile() {
        return window.location.protocol === 'file:';
    },

    /**
     * Kiểm tra là trang chủ.
     */
    isHomePage() {
        return window.location.pathname === '/';
    },

    /**
     * Thiết lập màu của browser ở mobile.
     */
    setBrowserThemeColor() {
        document.head.insertAdjacentHTML('beforeend', '<meta name="theme-color" content="#55acee">');
    },

    /**
     * Kiểm tra xem có phải đã publish hay không.
     * Ở thư mục /posts/ và có meta[name="date"].
     */
    isPublishContent() {
        const meta = document.querySelector('meta[name="date"]');
        return !!meta;
    },

    /**
     * Lấy thời gian xuất bản.
     */
    getPublishDate() {
        const meta = document.querySelector('meta[name="date"]');
        return meta.content;
    },

    /**
     * Lấy mô tả.
     */
    getDescription() {
        const meta = document.querySelector('meta[name="description"]');
        return meta.content;
    }
};

class FacebookComment {
    /**
     * Thêm bình luận Facebook.
     */
    addFacebookComment() {
        // Lấy ra URL tuyệt đối
        let href = location.href;

        // Bỏ qua trang chủ, chạy local
        // Chỉ hiển thị các bài viết đã xuất bản
        if (!PageInfo.isHomePage()
            && !PageInfo.isLocalFile()
            && PageInfo.isPublishContent()) {
            // Chú ý data-href đang phân biệt cả giao thức (HTTP và HTTPS)
            // Chuyển về HTTPS hết
            if (!href.startsWith('https')) {
                href = 'https' + href.substr(4);
            }

            // Vùng div chứa comment
            // Thêm vào dưới vùng article
            const article = document.getElementsByTagName('article')[0];
            const newDiv = document.createElement('div');
            newDiv.className = 'fb-comments mt-5';
            newDiv.innerHTML = '<div id="fb-root"></div>'
                + '<div class="fb-comments" data-href="' + href + '" data-numposts="5" data-width="100%" data-order-by="reverse_time"></div>';
            // article.parentNode.insertBefore(newDiv, article.nextSibling);
            article.appendChild(newDiv);

            // Thêm JS của Facebook
            const js = document.createElement('script');
            js.id = 'facebook-jssdk';
            js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=1480781938682362';
            const fjs = document.getElementsByTagName('script')[0];
            fjs.parentNode.insertBefore(js, fjs);
        }
    }
}

class ScrollButton {
    /**
     * Di chuyển lên đầu trang.
     */
    addScrollToTopButton() {
        const floatButton = document.createElement('a');
        floatButton.href = '#';
        floatButton.className = 'float-button position-fixed cursor-pointer';
        // Cần có thể di chuyển nút, vì có thể nó che nội dung nào đó
        document.body.appendChild(floatButton);
    }
}

class Datetime {
    /**
     * Chuyển xâu định dạng yyyy-MM-dd HH:mm:ss về dd/MM/YYYY
     * @param {String} standardDate
     */
    convertStandardDateToIsoDate(standardDate) {
        //
        return standardDate.replace(' ', 'T') + '+07:00';
    }

    /**
     * Chuẩn hóa ngày tháng về định dạng dd/MM/yyyy.
     * @param s Xâu định dạng ISO 8601
     */
    normalizeDate(s) {
        const iso8601Date = this.convertStandardDateToIsoDate(s);
        const d = this.convertStringWithTimeToDate(iso8601Date);
        return this.convertDateToString(d);
    }

    /**
     * Trả về đối tượng Date từ xâu dạng YYYY-MM-DDTHH:MM:SSZ
     * @param {String} isoString Xâu ngày tháng, định dạng ISO 8601
     */
    convertStringWithTimeToDate(isoString) {
        return new Date(isoString);
    }

    /**
     * Chuyển đối tượng Date sang xâu dạng dd/MM/yyyy.
     * @param {Date} date Một đối tượng Date
     * @return {String} Một xâu dạng dd/MM/yyyy tương ứng
     */
    convertDateToString(date) {
        return this.paddingTwoZero(date.getDate()) + '/'
            + this.paddingTwoZero(date.getMonth() + 1) + '/'
            + date.getFullYear();
    }

    /**
     * Thêm các chữ số 0 ở đầu để có độ dài là 2 ký tự.
     */
    paddingTwoZero(n) {
        return (n < 10) ? ('0' + n) : n;
    }
}


/**
 * Thông tin thống kê ở cuối trang.
 */
class FooterSummary {
    /**
     * Thêm thông tin ở cuối bài viết.
     */
    addPublishDateSpanAndShareLink() {
        const article = document.querySelector('article');

        if (article) {
            const footer = document.createElement('footer');
            footer.className = 'mt-5 mt-lg-0 mb-5 mb-lg-0 p-4 footer';
            footer.appendChild(this.createPublishDateContainer());
            footer.appendChild(this.createDescriptionContainer());
            // footer.appendChild(this.createCategoryContainer());
            footer.appendChild(this.createShareLinkContainer());

            article.appendChild(footer);
        }
    }

    /**
     * Thêm ngày xuất bản.
     */
    createPublishDateContainer() {
        const label = document.createElement('div');
        label.className = 'text-muted mb-1';
        label.innerHTML = 'Ngày xuất bản:';

        const dateStr = PageInfo.getPublishDate();
        const datetime = new Datetime();
        const dateNormalized = datetime.normalizeDate(dateStr);

        const content = document.createElement('div');
        content.textContent = dateNormalized;

        const container = document.createElement('div');
        container.appendChild(label);
        container.appendChild(content);
        return container;
    }

    /**
     * Thêm link share Facebook.
     */
    createShareLinkContainer() {
        const label = document.createElement('div');
        label.className = 'text-muted mb-1';
        label.innerHTML = 'Share:';

        const url = encodeURIComponent(location.href.replace('http://', 'https://').replace('localhost', 'lockex1987.github.io'));

        const content = document.createElement('a');
        content.href = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
        content.className = 'text-decoration-none';
        content.innerHTML = '<img src="/images/programming/facebook.svg" class="align-baseline"/>';
        content.target = '_blank';
        content.title = 'Chia sẻ qua Facebook';

        const container = document.createElement('div');
        container.className = 'mt-3';
        container.appendChild(label);
        container.appendChild(content);
        return container;
    }

    /**
     * Thêm mô tả.
     */
    createDescriptionContainer() {
        const label = document.createElement('div');
        label.className = 'text-muted mb-1';
        label.innerHTML = 'Mô tả:';

        const description = PageInfo.getDescription();

        const content = document.createElement('div');
        content.className = 'text-pre-wrap';
        content.textContent = description.replace(/^\s+|\s+$/m, '');

        const container = document.createElement('div');
        container.className = 'mt-3';
        container.appendChild(label);
        container.appendChild(content);
        return container;
    }

    /**
     * Thêm chuyên mục.
     */
    createCategoryContainer() {
        const label = document.createElement('div');
        label.className = 'text-muted mb-1';
        label.innerHTML = 'Chuyên mục:';

        const arr = window.location.pathname.split('/');
        let folder = arr[arr.length - 2];
        folder = folder.replace(/%20/g, ' ');
        const category = folder.split(' - ')[0];

        const content = document.createElement('div');
        content.textContent = category;

        const container = document.createElement('div');
        container.className = 'mt-3';
        container.appendChild(label);
        container.appendChild(content);
        return container;
    }
}

/**
 * Hàm này sẽ được thực hiện khi load trang.
 * Không sử dụng 'load' vì như vậy phải chờ sau khi load xong hoàn toàn trang (cả CSS, ảnh, frame).
 * Sử dụng DOMContentLoaded.
 */
window.addEventListener('DOMContentLoaded', () => {
    if (!PageInfo.isLocalFile()) {
        const headerNavigator = new HeaderNavigator();
        headerNavigator.addDesktopHeader();
        headerNavigator.addMobileHeader();
        headerNavigator.toggleMobileHeaderWhenScroll();

        if (PageInfo.isPublishContent()) {
            (new FooterSummary()).addPublishDateSpanAndShareLink();
        }

        // (new FacebookComment()).addFacebookComment();
    }

    PageInfo.setBrowserThemeColor();
    // (new ScrollButton()).addScrollToTopButton();
    (new TocSection()).loadToc();
});


// Highlight source code syntax
(() => {
    function loadJsFile(filePath) {
        const scriptTag = document.createElement('script');
        // scriptTag.setAttribute('type', 'text/javascript');
        scriptTag.setAttribute('src', filePath);
        scriptTag.async = false; // thêm dòng này thì mới giữ được thứ tự các script
        document.head.appendChild(scriptTag);
    }

    function loadCssFile(filePath) {
        const linkTag = document.createElement('link');
        // linkTag.type = 'text/css';
        linkTag.rel = 'stylesheet';
        linkTag.href = filePath;
        document.head.appendChild(linkTag);
    }

    function highlighSourceCodeSyntax() {
        const codeBlocks = [...document.querySelectorAll('pre.code')];
        if (codeBlocks.length == 0) {
            return;
        }

        // Lấy danh sách các ngôn ngữ sử dụng, không duplicate
        const languages = new Set(codeBlocks.map(code => code.dataset.lang));

        // Thêm file CSS
        loadCssFile('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.61.1/codemirror.min.css');
        // loadCssFile('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.61.1/theme/monokai.min.css');
        loadCssFile('../../css/typora-codemirror.css');

        // Thêm các file JS
        loadJsFile('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.61.1/codemirror.min.js');
        loadJsFile('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.61.1/addon/runmode/runmode.min.js');
        for (const lang of languages) {
            loadJsFile(`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.61.1/mode/${lang}/${lang}.min.js`);
        }
        loadJsFile('../../js/highlight-source-code-syntax.js');
    }

    highlighSourceCodeSyntax();
})();
