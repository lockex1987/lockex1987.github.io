## CSS Precedence

Đã bao giờ bạn cố chỉnh sửa một CSS rule nào đó mà nó vẫn không ăn, cứ ăn theo một CSS rule khác? Sao cái rule (đáng ghét) kia lại cứ được ưu tiên vậy? Hãy cùng tìm hiểu cách xác định rule nào được áp dụng theo 6 ví dụ sau:

### Ví dụ 1

Đầu tiên phải khẳng định lại 1 điều mà mọi người hay nhầm tưởng: Độ ưu tiên CSS không phụ thuộc vào CSS được khai báo ở trong thẻ `style` (internal) hay ở file CSS bên ngoài (external).

Giả sử bạn có 1 file HTML có nội dung như sau:

```html
<p>Hello world</p>
```

Bạn khai báo CSS ở trong thẻ style như sau:

```html
<style>
p {
  color: green;
}
</style>
```

Đồng thời bạn cũng khai báo CSS ở một file .css ngoài (ví dụ **demo.css**) và từ file .html ánh xạ đến file .css đó như sau:

```css
p {
  color: blue;
}
```

```html
<link rel="stylesheet" href="demo.css">
```

Nếu trong file HTML bạn khai báo thẻ link sau, đoạn văn sẽ có màu xanh dương (CSS ở trong file ngoài được áp dụng). Nếu bạn khai báo thẻ style sau, đoạn văn sẽ có màu xanh lục (CSS ở thẻ style được áp dụng).

Như vậy không quan trọng khai báo ở trong thẻ style hay file ngoài. Rule khai báo sau sẽ được áp dụng. Nhiều người tưởng CSS được khai báo ở thẻ style sẽ có độ ưu tiên cao hơn file ngoài.

### Ví dụ 2

Đơn giản nhất, độ ưu tiên sẽ là:

inline > id > class (pseudo-class, attribute) > element (pseudo-element)

```css
p {
  color: red;
}
.p1 {
  color: green;
}
#p2 {
  color: blue;
}
```

```html
<p class="p1" id="p2" style="color: yellow;">Inline</p>
<p class="p1" id="p2">ID</p>
<p class="p1">Class</p>
<p>Element</p>
```

Bạn có thể đoán ra kết quả:

* đoạn 1 có màu vàng
* đoạn 2 có màu xanh lam
* đoạn 3 có xanh lục
* đoạn 4 có màu đỏ

### Ví dụ 3

Nếu thêm `!important` vào sau CSS rule thì nó sẽ có mức ưu tiên cao nhất.

Nếu có nhiều rule được gán `!important` thì lại xét độ ưu tiên inline > id > class > element (như ví dụ 2), rồi mới xét đến thứ tự khai báo.

```css
p {
  color: red !important;
}
.p1 {
  color: green;
}
#p2 {
  color: blue;
}
```

```html
<p class="p1" id="p2" style="color: yellow;">Inline</p>
<p class="p1" id="p2">ID</p>
<p class="p1">Class</p>
<p>Element</p>
```

Trong ví dụ trên, bình thường selector `p` (xác định một loại tag chuẩn) có mức ưu tiên thấp nhất, tuy nhiên khi thêm `!important` vào phía sau thì nó lại có mức ưu tiên cao nhất, do đó tất cả các đoạn văn bây giờ sẽ có màu đỏ.

Bạn hãy tự thử thêm (bớt) `!important` và xem kết quả nhé.

### Ví dụ 4

CSS rule được khai báo sau sẽ được áp dụng. Hãy xem ví dụ đơn giản sau:

```css
.p1 {
  color: red;
}
.p1 {
  color: blue;
}
```

```html
<p class="p1">Hello word</p>
```

Ai cũng biết đoạn văn sẽ có màu xanh lam.

### Ví dụ 5

Trong trường hợp đoạn văn của chúng ta có hai class, CSS của class nào sẽ được áp dụng?

```css
.p1 {
   color: red;
}
.p2 {
   color: green;
}
```

```html
<p class="p1 p2">p1 p2</p>
<p class="p2 p1">p2 p1</p>
```

Đoạn thứ nhất có khai báo p1 trước trong danh sách class, đoạn thứ hai có khai báo p2 trước trong danh sách class. Tuy nhiên kết quả thì cả hai đoạn đều có màu xanh lục do selector `.p2` được khai báo sau trong CSS code. Như vậy thứ tự trong danh sách class là không quan trọng, thứ tự khai báo trong CSS code mới quan trọng.

### Ví dụ 6

Specificity của một CSS selector được tính dựa vào việc đếm một số thành phần và biểu diễn dưới dạng (a, b, c).

* Với mỗi element, pseudo-element chúng ta thêm 1 vào phần tử cuối (c)
* Với mỗi class, pseudo-class, attribute chúng ta thêm 1 vào phần tử giữa (b)
* Với mỗi ID chúng ta thêm 1 vào phần tử đầu tiên (a)

Để hiểu rõ hơn hãy xem kết quả tính specificity của một số selector sau:

| Selector          | Specificity |
| ----------------- | ----------- |
| p                 | (0, 0, 1)   |
| #sidebar          | (1, 0, 0)   |
| div#sidebar       | (1, 0, 1)   |
| div#sidebar p     | (1, 0, 2)   |
| div#sidebar p.bio | (1, 1, 2)   |
| div p.bio         | (0, 1, 2)   |
| #sidebar p        | (1, 0, 1)   |
| li::first-line    | (0, 0, 2)   |
| ul ol+li          | (0, 0, 3)   |
| h1 + *[rel=up]    | (0, 1, 1)   |
| a                 | (0, 0, 1)   |
| a:hover           | (0, 1, 1)   |

Chúng ta sẽ so sánh hai specificity theo lần lượt từng phần tử tương ứng từ trái qua phải. Ví dụ specificity (0, 1, 0) thì rõ ràng hơn specificity (0, 0, 15).

Selector có specificity rõ ràng hơn sẽ được áp dụng.

Chú ý selector (*) có specificity bằng 0 (0, 0, 0).

Hãy thử 1 ví dụ:

```css
.p1 .p2 div {
  color: red;
}
.p3 div {
  color: blue;
}
```

```html
<div class="p1">
  <div class="p2">
    <div class="p3">
      <div>
        Hello World
      </div>
    </div>
  </div>
</div>
```

Bạn nghĩ rằng đoạn văn sẽ có màu xanh (vì selector .p3 div có vẻ *gần* hơn, nó lại còn được khai báo sau nữa)? Kết quả thực tế lại là màu đỏ, do selector `.p1 .p2 div` có specificity là (0, 2, 1) rõ ràng hơn selector `.p3 div` có specificity là (0, 1, 1).

### Kết luận

Tóm lại, rule CSS được áp dụng sẽ được chọn theo thứ tự ưu tiên là:

1. `!important`
2. Inline
3. Specificity của CSS selector
4. Thứ tự khai báo