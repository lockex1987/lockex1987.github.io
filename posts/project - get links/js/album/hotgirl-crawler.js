/**
Kiểm tra xem trang web được build bằng các công nghệ gì.
    https://builtwith.com/hotgirl.biz
WordPress JSON API
    https://developer.wordpress.org/rest-api/reference/posts/

Ví dụ lấy chi tiết 1 bài post có id 2023 như sau:

https://khongbietcode.com/wp-json/wp/v2/posts/2023

Hay như ta muốn lấy danh sách các categories

https://khongbietcode.com/wp-json/wp/v2/categories

GET /wp/v2/posts
$ curl https://khongbietcode.com/wp-json/wp/v2/posts

GET /wp/v2/categories
$ curl https://khongbietcode.com/wp-json/wp/v2/categories

https://dev.to/jackedwardlyons/how-to-get-all-wordpress-posts-from-the-wp-api-with-javascript-3j48

https://hotgirl.biz/wp-json
https://hotgirl.biz/wp-json/wp/v2/posts
https://hotgirl.biz/wp-json/wp/v2/posts?page=2
https://hotgirl.biz/wp-json/wp/v2/posts/404688
https://hotgirl.biz/wp-json/wp/v2/media/404212
*/
import GetLinksUtils from '../utils.js';

function extractImages(xml, folderName) {
    const regex = /<a href="(.*?)">/g;
    let arr;
    let count = 1;
    const images = [];
    while ((arr = regex.exec(xml)) != null) {
        const url = arr[1];
        const fileName = GetLinksUtils.paddingZero(count);
        const extension = GetLinksUtils.getImageExtension(url);
        const filePath = folderName + '/' + fileName + '.' + extension;
        images.push({
            name: filePath,
            url: url
        });
        count++;
    }
    return images;
}

class WordPressPosts {
    constructor(rootUrl) {
        this.rootUrl = rootUrl;
    }

    async getTotalPages() {
        const url = `${this.rootUrl}/wp-json/wp/v2/posts`;
        const resp = await fetch(url);
        const totalPages = resp.headers.get('x-wp-totalpages');
        console.log(totalPages);
        return totalPages;
    }

    async crawlPages(fromPage, toPage) {
        let posts = [];
        for (let page = fromPage; page <= toPage; page++) {
            const url = `${this.rootUrl}/wp-json/wp/v2/posts?page=${page}`;
            const data = await fetch(url).then(resp => resp.json());
            posts = posts.concat(data);
        }

        // console.log(posts);

        const post = this.normalizePost(posts[14]);
        console.log(post);

        // let thumbnailUrl = await this.getThumbnailImage(post);
        // console.log(thumbnailUrl);
        const images = extractImages(post.content, post.slug);
        // console.log(images);

        const text = JSON.stringify(images);
        CommonUtils.saveTextAsFile(text, 'hotgirl - ' + post.slug + '.json');

        return posts;
    }

    normalizePost(post) {
        const id = post.id;
        const content = post.content.rendered;
        const slug = post.slug;
        const title = post.title.rendered;
        const thumbnailId = post.featured_media;

        return {
            id,
            content,
            slug,
            title,
            thumbnailId
        };
    }

    async getThumbnailImage(post) {
        const apiUrl = `${this.rootUrl}/wp-json/wp/v2/media/${post.thumbnailId}`;
        const data = await fetch(apiUrl).then(resp => resp.json());
        const imageUrl = data.source_url;
        return imageUrl;
    }
}

// const rootUrl = 'https://hotgirl.biz';
// const obj = new WordPressPosts(rootUrl);
// obj.getTotalPages();
// obj.crawlPages(1, 2);
