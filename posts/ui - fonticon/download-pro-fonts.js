const fs = require('fs');

// File CSS gốc được copy từ địa chỉ sau:
//     https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css
// File này đang chứa các link đến các file font trên mạng
// Chúng ta sẽ download các file font này và sửa lại nội dung file CSS (chỉnh lại đường dẫn cho đúng)
const inputFilePath = 'libs/fontawesome-pro/css/pro.min.css';
const inputFileContent = fs.readFileSync(inputFilePath, 'utf8');
// console.log(inputFileContent);
const regex = /url\((.*?)\)/g;
const matches = inputFileContent.matchAll(regex);

const fontLinks = [];
const linkMap = new Map();
for (const match of matches) {
    // console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
    // console.log(match[0]);
    // console.log(match[1]);
    const originalFontLink = match[1];
    const normalizedFontLink = originalFontLink.replace('../webfonts', 'webfonts')
        .replace('?#iefix', '');
    if (!linkMap.get(normalizedFontLink)) {
        linkMap.set(normalizedFontLink, true);
        fontLinks.push({
            url: 'https://kit-pro.fontawesome.com/releases/v5.15.1/' + normalizedFontLink,
            name: normalizedFontLink.split('/')[1]
        });
    }
}

console.log(fontLinks.length);

fs.writeFileSync('font-links.json', JSON.stringify(fontLinks));
