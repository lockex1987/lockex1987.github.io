---
title: Định dạng Markdown
creator:
- role: author
  text: Nguyễn Văn Huyên
identifier:
- scheme: DOI
  text: doi:10.234234.234/33
publisher:  Pickt
rights: © 2021 HDT
ibooks:
  version: 0.0.1
cover-image: ./images/cover.jpg
---

## Markdown

Markdown (md), code fence, text - latex (math), pandoc, epub

Markdown nhẹ, đơn giản.

Markdown được sử dụng rộng rãi ở GitHub, GitBook, Viblo,...

Từ định dạng markdown có thể dễ dàng convert sang các định dạng khác (HTML, epub, PDF,...) bằng pandoc.

### Markdown cheatshet

Có nhiều biến thể: GitHub, [kramdown](https://kramdown.gettalong.org/), [PHP Markdown Extra](https://michelf.ca/projects/php-markdown/extra/),...

[Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

#### Cơ bản

Heading bắt đầu bằng ký tự #.

Các đoạn văn được ngăn cách bằng dòng trắng.

Hai ký tự dấu cách ở cuối dòng  
tạo một line break.

Chữ đậm **bold**.

Chữ nghiêng _italic_. Hoặc *single-asterisks*.

Code inline `monospace`.

Dòng kẻ ngang:

---

Chữ gạch ~~strikethrough~~.

Danh sách bullet:

* Táo
* Cam
* Lê

Danh sách số:

1. JSON
2. YAML
3. INI

> Blockquote bắt đầu bằng ký tự >





Tôi là *Nguyễn Văn Huyên*.

Nhà tôi ở **Hưng Yên**.

#### Code fence

```js
console.log("Hello World")
```

#### UML Diagram

Alice->Bob: Hello Bob, how are you

#### Math

[tex - Tutorial](https://www.tutorialspoint.com/tex_commands/index.htm)

$$
a^2 + b^2 = c^2
$$

$$
v(t) = v_0 + \frac{1}{2}at^2
$$

$$
\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}
$$




#### Emoji

GitHub hỗ trợ.

Right click:

![Right click](images\github emoji right click or win period.png)

Chooser:

![Chooser](images\github emoji right click or win period.png)





#### Thiết lập CSS class

You use `{: CSS_SELECTOR }` to attach additional HTML attributes to the rendered Markdown output.

A simple paragraph with an ID attribute.
{: #para-one}

> A blockquote with a title
> {: .pull-quote }

#### HTML trong markdown



### Pandoc

[Trang chủ](https://pandoc.org/)

Trên Windows, cài bằng file `msi`.

Kiểm tra bằng lệnh:

```bas
$ pandoc --version
pandoc 2.13
Compiled with pandoc-types 1.22, texmath 0.12.2, skylighting 0.10.5,
citeproc 0.3.0.9, ipynb 0.1.0.1
User data directory: C:\Users\VTCC-\AppData\Roaming\pandoc
Copyright (C) 2006-2021 John MacFarlane. Web:  https://pandoc.org
This is free software; see the source for copying conditions. There is no
warranty, not even for merchantability or fitness for a particular purpose.
```

#### Convert markdown to epub

Câu lệnh:



#### Convert markdown to HTML

Câu lệnh

```bash
pandoc test.md -f markdown -t html -s -o test.html
```

Trong đó:

* `test.md` là file input
* `-s` tạo file "standalone", với header và footer, không chỉ là một fragment
* `-o test.html` chỉ định file đầu ra
* `-f markdown` là định dạng đầu vào (có thể bỏ qua)
* `-t html` là định dạng đầu ra (có thể bỏ qua)



Convert markdown to PDF

Câu lệnh:

Phải cài pdflatex.



### Editor

#### Typora

Trang chủ: [Typora - a markdown editor, reader](https://typora.io/)

Dùng rất thích. Có trên cả Windows, Linux, Mac.

Nên dùng phím tắt cho tiện.

Có thể export ra PDF, epub, HTML bằng Typora luôn (Typora sử dụng Pandoc).

[Export](https://support.typora.io/Export/)





#### VSCode

Tích hợp sẵn rồi

[Markdown editing with Visual Studio Code](https://code.visualstudio.com/docs/languages/markdown)

Extension:

[Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

Không gõ được tiếng Việt

#### Web

Viblo sử dụng [SimpleMDE Markdown Editor](https://simplemde.com/).

[Làm trình soạn thảo giống với viblo](https://viblo.asia/p/lam-trinh-soan-thao-giong-voi-viblo-Do754JBLZM6)

[StackEdit - In-browser Markdown editor](https://stackedit.io/)



### Tạo ebook

Cover

Custom CSS

Table of content, navigation dựa vào heading.



[GitHub - karlseguin/the-little-go-book](https://github.com/karlseguin/the-little-go-book)

[GitHub - karlseguin/the-little-mongodb-book: The Little MongoDB Book](https://github.com/karlseguin/the-little-mongodb-book)





### Tham khảo

[Markdown - Wikipedia](https://en.m.wikipedia.org/wiki/Markdown)







