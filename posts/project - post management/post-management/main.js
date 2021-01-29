/**
 * Chương trình này dùng để liệt kê danh sách các bài viết.
 * Các post thì liệt kê thêm ngày xuất bản.
 * Thống kê mỗi chuyên mục có bao nhiêu bài viết.
 */
const fs = require('fs');
const processIndexFile = require('./index-file.js');


/**
 * Lấy ra danh sách bài viết.
 *
 * @param rootFolder Đường dẫn đến thư mục to
 * @return Danh sách bài viết
 */
async function getPostList(rootFolder, adjustPath, oldList) {
    // Duyệt các thư mục con bên trong thư mục to "posts"
    const folderList = await fs.promises.readdir(rootFolder);
    folderList.sort();
    const postList = [];
    for (let i = 0; i < folderList.length; i++) {
        const path = folderList[i];

        // Lấy ra thể loại của bài viết (phần đầu tiên trước dấu trừ ngăn cách)
        const a = path.split(' - ');
        const category = a[0];

        // Lấy ra tiêu đề, mô tả (tag description), thời gian xuất bản (tag date) của bài viết
        const indexFilePath = rootFolder + '/' + path + '/index.html';

        // Lấy thông tin thời gian chỉnh sửa file
        const statsObj = fs.statSync(indexFilePath);
        const modifiedTime = statsObj.mtimeMs || statsObj.birthtimeMs;

        // Nếu file không thay đổi gì
        const oldObj = oldList.find(e => e.path == path);
        if (oldObj && oldObj.modifiedTime && oldObj.modifiedTime === modifiedTime) {
            postList.push(oldObj);
        } else {
            console.log('Cập nhật bài viết ' + path);
            const indexFile = await processIndexFile(indexFilePath, adjustPath);
            const { title, description, date } = indexFile;

            // Thêm vào danh sách
            postList.push({
                category,
                title,
                description,
                date,
                modifiedTime,
                path
            });
        }
    }
    return postList;
}


/**
 * Tính toán số bài viết của từng thể loại.
 *
 * @param postList Danh sách bài viết
 * @return Map thể loại với số bài viết của thể loại đó
 */
function calculateCategoryCountMap(postList) {
    const categoryCountMap = new Map();
    postList.forEach(post => {
        const category = post.category;
        const count = categoryCountMap.get(category);
        if (count) {
            categoryCountMap.set(category, count + 1);
        } else {
            categoryCountMap.set(category, 1);
        }
    });
    return categoryCountMap;
}


/**
 * Lấy ra nội dung để ghi ra file (danh sách bài viết).
 *
 * @param postList Danh sách bài viết
 * @return Nội dung đẻ ghi ra file
 */
function getPostListJson(postList) {
    const temp = postList.map(post => JSON.stringify(post));
    return '[\n' + temp.join(',\n') + '\n]\n';
}


/**
 * Lấy ra nội dung để ghi ra file (số lượng bài viết từng thể loại).
 *
 * @param categoryCountMap Map thể loại và bài viết
 * @return Nội dung JSON để ghi ra file
 */
function getCategoryCountMapJson(categoryCountMap) {
    const arr = Array.from(categoryCountMap, ([key, value]) => ({ name: key, y: value }));
    arr.sort((a, b) => b.y - a.y);
    const temp = arr.map(({ name, y }) => `    { "name": "${name}", "y": ${y} }`);
    return '[\n' + temp.join(',\n') + '\n]\n';
}


/**
 * Ghi ra file dữ liệu.
 * @param content  Nội dung file
 * @param filePath Đường dẫn đến file đầu ra
 */
function writeDataFile(content, filePath) {
    fs.writeFileSync(filePath, content);
}

/**
 * Hàm xử lý chính.
 */
async function init() {
    const startTime = (new Date()).getTime();

    const adjustPath = (process.argv.length > 2) ? process.argv[2] : '';

    const listFilePath = adjustPath + 'data/post-list.json';
    const fileContent = fs.readFileSync(listFilePath, 'utf8');
    const oldList = JSON.parse(fileContent);

    const postList = await getPostList(adjustPath + 'posts', adjustPath, oldList);
    const categoryMap = calculateCategoryCountMap(postList);

    writeDataFile(getPostListJson(postList), listFilePath);
    writeDataFile(getCategoryCountMapJson(categoryMap), adjustPath + 'posts/project - post management/data/category-data.json');

    const endTime = (new Date()).getTime();
    console.log('Finish after ' + ((endTime - startTime) / 1000) + 's');
}

init();

// Nếu ở thư mục trong, thực hiện lệnh node main.js "../../../"
// Nếu ở thư mục gốc, thực hiện lệnh node main.js
