/**
 * Pagi: A pagination library
 * Code mới nhất ở https://lockex1987.github.io/projects/pagi/js/pagi.js.
 * 
 * @version 1.0.0
 * @author lockex1987
 */
function Pagi(options) {
    // Bắt trường hợp người dùng không truyền vào gì
    if (!options) {
        options = {};
    }

	this.showFirst = options.showFirst != null ? options.showFirst : false;
	this.showPrevious = options.showPrevious != null ? options.showPrevious : true;
    this.showNext = options.showNext != null ? options.showNext : true;
    this.showLast = options.showLast != null ? options.showLast : false;
    
	this.firstText = options.firstText || '<<';
	this.previousText = options.previousText || '<';
    this.nextText = options.nextText || '>';
    this.lastText = options.lastText || '>>';

    this.showNoRecordText = options.showNoRecordText != null ? options.showNoRecordText : false;
	this.noRecordText = options.noRecordText || 'Không có bản ghi nào';
	
	this.showTotalNumber = options.showTotalNumber != null ? options.showTotalNumber : true;
    this.pageSize = options.pageSize || 10;

    this.callbackFunc = options.callbackFunc;
    

    this.container = document.getElementById(options.containerId);
}

Pagi.prototype.setting = function(totalNumber, currentPage) {
    //console.log(totalNumber + ", " + currentPage);
    this.totalNumber = totalNumber;
    this.totalPage = Math.ceil(this.totalNumber / this.pageSize);
    this.currentPage = (currentPage > this.totalPage) ? this.totalPage : currentPage; // 1, 2

    // The logic in Google's pagination is as follows:
    // - there are 10 page links shown at any time (e.g. 1 2 3 4 5 6 7 8 9 10) unless there are less than 10 total pages
    // - the active link (current page) is in the 6th position, except for when the active link is below 6 or less than 4 from the last position
    this.startPage;
    this.endPage;
    if (this.totalPage <= 10) {
        this.startPage = 1;
        this.endPage = this.totalPage;
    } else if (this.currentPage <= 6) {
        this.startPage = 1;
        this.endPage = 10;
    } else if (this.currentPage + 4 >= this.totalPage) {
        this.startPage = this.totalPage - 9;
        this.endPage = this.totalPage;
    } else {
        this.startPage = this.currentPage - 5;
        this.endPage = this.currentPage + 4;
    }
    
    // Index bắt đầu, tiện khi hiển thị số thứ tự phân trang
    this.startIndex = (this.currentPage - 1) * this.pageSize;

    // Create an array of pages to ng-repeat in the pager control
    this.pages = [];
    for (var i = this.startPage; i <= this.endPage; i++) {
        this.pages.push(i);
    }

    return this;
};

Pagi.prototype.render = function() {
    // Xóa dữ liệu cũ
    this.container.innerHTML = "";

    // Nếu rỗng
    if (this.totalNumber <= 0) {
        if (this.showNoRecordText) {
            this.container.appendChild(this.createNoRecordText());
        }
    } else {
        if (this.showTotalNumber) {
            this.container.appendChild(this.createTotalNumberText());
        }
		
		if (this.totalPage > 1) {
			this.ulTag = this.createUlTag();

			this.createFirstPage();
			this.createPreviousPage();
			for (var i = this.startPage; i <= this.endPage; i++) {
				this.createMiddlePage(i);
			}
			this.createNextPage();
			this.createLastPage();

			this.container.appendChild(this.ulTag);
		}
    }
};

Pagi.prototype.createNoRecordText = function() {
    var elem = document.createElement("span");
    elem.className = 'noRecord';
    elem.textContent = this.noRecordText;
    return elem;
};

Pagi.prototype.createUlTag = function() {
    var ulTag = document.createElement("ul");
    ulTag.className = "pagination pull-right";
    return ulTag;
};

Pagi.prototype.createFirstPage = function() {
    if (this.showFirst) {
        this.ulTag.appendChild(this.createItem(this.firstText, 1, (this.currentPage > 1 ? "" : "disabled")));
    }
};

Pagi.prototype.createPreviousPage = function() {
    if (this.showPrevious) {
        this.ulTag.appendChild(this.createItem(this.previousText,
                (this.currentPage > 1 ? this.currentPage - 1 : 1),
                (this.currentPage > 1 ? "" : "disabled")));
    }
};

Pagi.prototype.createMiddlePage = function(i) {
    this.ulTag.appendChild(this.createItem(i, i, (i === this.currentPage ? "active" : "")));
};

Pagi.prototype.createNextPage = function() {
    if (this.showNext) {
        this.ulTag.appendChild(this.createItem(this.nextText,
                (this.currentPage < this.totalPage ? this.currentPage + 1 : this.totalPage),
                (this.currentPage < this.totalPage ? "" : "disabled")));
    }
};

Pagi.prototype.createLastPage = function() {
    if (this.showLast) {
        this.ulTag.appendChild(this.createItem(this.lastText, this.totalPage, (this.currentPage < this.totalPage ? "" : "disabled")));
    }
};

Pagi.prototype.createItem = function(text, page, className) {
    var liTag = document.createElement("li");
    //liTag.className = "page-item " + className;
    liTag.className = className;

    var aTag = document.createElement("a");
    aTag.href = "#";
    aTag.innerHTML = text;
    //aTag.className = "page-link";

    if (className != "active" && className != "disabled") {
        var callback = this.callbackFunc;
        aTag.onclick = function() {
            callback(page);
        };
    }

    liTag.appendChild(aTag);

    return liTag;
};

Pagi.prototype.createTotalNumberText = function() {
    var p = document.createElement("p");
    p.className = 'total-number pull-left';
    p.textContent = "Tổng số " + this.totalNumber + " bản ghi";
    return p;
};

// AngularJS is loaded
if (!!window.angular) {
    //console.log('AngularJS is loaded');

    // Thêm directive
    // define directive pagination
    // pagination (sử dụng directive, có tham số là pag và gotoPage)
    angular.module("pagi", []).directive('pagi', function() {
        var dir = {};
        dir.restrict = 'E';
        dir.scope = {
            pag: '=ref',
            gotoPage: '&action'
        };
        dir.template = `
                <div class="paginationWrapper">
                    <span ng-if="pag.totalNumber <= 0 && pag.showNoRecordText" class="noRecord">
                        {{pag.noRecordText}}
                    </span>
					
                    <p ng-if="pag.totalNumber > 0 && pag.showTotalNumber" class="total-number pull-left">
                        Tổng số {{pag.totalNumber | number}} bản ghi
                    </p>

                    <ul ng-if="pag.totalPage > 1" class="pagination pull-right">
                        <li class="page-item {{pag.currentPage === 1 ? 'disabled' : ''}}" ng-if="pag.showFirst">
                            <a ng-click="pag.currentPage > 1 && gotoPage({ page: 1 })" class="page-link">
                                {{pag.firstText}}
                            </a>
                        </li>
                        <li class="page-item {{pag.currentPage === 1 ? 'disabled' : ''}}" ng-if="pag.showPrevious">
                            <a ng-click="pag.currentPage > 1 && gotoPage({ page: pag.currentPage - 1 })" class="page-link">
                                {{pag.previousText}}
                            </a>
                        </li>
                        <li ng-repeat="p in pag.pages" class="page-item {{pag.currentPage === p ? 'active' : ''}}">
                            <a ng-click="p != pag.currentPage && gotoPage({ page: p })" class="page-link">
                                {{p}}
                            </a>
                        </li>
                        <li class="page-item {{pag.currentPage === pag.totalPage ? 'disabled' : ''}}" ng-if="pag.showNext">
                            <a ng-click="pag.currentPage < pag.totalPage && gotoPage({ page: pag.currentPage + 1 })" class="page-link">
                                {{pag.nextText}}
                            </a>
                        </li>
                        <li class="page-item {{pag.currentPage === pag.totalPage ? 'disabled' : ''}}" ng-if="pag.showLast">
                            <a ng-click="pag.currentPage < pag.totalPage && gotoPage({ page: pag.totalPage })" class="page-link">
                                {{pag.lastText}}
                            </a>
                        </li>
                    </ul>
                </div>`;
        return dir;
    });
}