/**
 * Thực hiện thay đổi giao diện (đổi màu sắc) đối tượng DOM.
 * @param {DOMNode} el Đối tượng DOM
 */
function doStuff(el) {
  el.style.backgroundColor = 'blue';
  el.style.color = 'white';
}

/**
 * Click vào nút reset thì loại bỏ tất cả các inline style.
 */
$('.reset').on('click', function () {
  $(this).parent().find('*').removeAttr('style');
});

/**
 * Delegate sử dụng jQuery
 */
$('.jquery-delegate').on('click', '.delegated', function () {
  doStuff(this);
});

/**
 * Delegate sử dụng JS thuần, check chỉ phần tử được click, bằng classList của event.target.
 */
document.querySelector('.pure-js-event-target').addEventListener('click', function (event) {
  var targetElement = event.target;

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
  if (targetElement.matches('.delegated')) {
    doStuff(targetElement);
  }
});

/**
 * Delegate sử dụng JS thuần, check từ phần tử được click đi lên.
 * Check tất cả các node ở giữa.
 */
function delegateTraverse(wrapperElement, eventName, delegatedSelector, callbackFunction) {
  wrapperElement.addEventListener(eventName, function (event) {
    var targetElement = event.target;
    var checkingNode = targetElement;
    while (checkingNode && checkingNode !== wrapperElement) {
      if (checkingNode.matches(delegatedSelector)) {
        // Đã tìm thấy phần tử thì thực hiện hàm và dừng lại
        callbackFunction.call(checkingNode);
        return;
      } else {
        // Kiểm tra tiếp phần tử cha
        checkingNode = checkingNode.parentNode;
      }
    }
  });
}

/**
 * Sử dụng hàm closet.
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
 * https://www.w3schools.com/jsref/met_node_contains.asp
 */
function delegateClosest(wrapperElement, eventName, delegatedSelector, callbackFunction) {
  wrapperElement.addEventListener(eventName, function (event) {
    var targetElement = event.target;
    var closetElement = targetElement.closest(delegatedSelector);

    if (closetElement && wrapperElement.contains(closetElement)) {
      callbackFunction.call(closetElement);
    }
  });
}

/*
delegateTraverse(document.querySelector('.pure-js-delegate'), 'click', '.delegated', function () {
  doStuff(this);
});
*/

delegateClosest(document.querySelector('.pure-js-delegate'), 'click', '.delegated', function () {
  doStuff(this);
});

