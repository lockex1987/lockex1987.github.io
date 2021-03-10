// Danh sách các website hỗ trợ
const WEBSITE_LIST = [
    {
        code: 'truyentranhphapbi',
        name: 'Truyện tranh Pháp Bỉ',
        // logo: 'images/websites/hotgirl.png',
        actions: [
            'getImages'
        ],
        isActive: false
    },
    {
        code: 'hotgirl',
        name: 'Hot Girl',
        logo: 'images/websites/hotgirl.png',
        actions: [
            'getImages'
        ],
        isActive: false
    },
    {
        code: 'mrcong',
        name: 'Mr Cong',
        logo: 'images/websites/mrcong.png',
        actions: [
            'getChapters',
            'getImages'
        ],
        isActive: false
    },
    {
        code: 'mangakakalot',
        name: 'Manga Kakalot',
        logo: 'images/websites/mangakakalot.png',
        actions: [
            'getChapters',
            'getImagesMultiple'
        ],
        isActive: true
    },
    {
        code: 'manganelo',
        name: 'Manganelo',
        logo: 'images/websites/manganelo.png',
        actions: [
            'getChapters',
            'getImagesMultiple'
        ],
        isActive: true
    },
    {
        code: 'hentai2read',
        name: 'Hentai 2 read',
        logo: 'images/websites/hentai2read.svg',
        actions: [
            'getImages'
        ],
        isActive: false
    },
    {
        code: 'manhwa18',
        name: 'Manhwa 18',
        logo: 'images/websites/manhwa18.png',
        actions: [
            'getChapters',
            'getImagesMultiple'
        ],
        isActive: false
    },
    {
        code: 'nettruyen',
        name: 'Net Truyen',
        logo: 'images/websites/nettruyen.png',
        actions: [
            'getChapters',
            'getImagesMultiple'
        ],
        isActive: true
    },
    {
        code: 'beeng',
        name: 'Beeng',
        logo: 'images/websites/beeng.png',
        actions: [
            'getChapters',
            'getImagesMultiple'
        ],
        isActive: true
    },
    {
        code: 'readcomiconline',
        name: 'Read Comic Online',
        logo: 'images/websites/readcomiconline.png',
        actions: [
            'getChapters',
            'getImagesMultiple'
        ],
        isActive: true
    },
    {
        code: 'kenhsinhvien',
        name: 'Kênh sinh viên',
        logo: 'images/websites/kenhsinhvien.png',
        actions: [
            'getImages'
        ],
        isActive: true
    },
    {
        code: 'artstation',
        name: 'Art Station',
        logo: 'images/websites/artstation.svg',
        actions: [
            'getImages'
        ],
        isActive: true
    },
    {
        code: 'comicvine',
        name: 'Comic Vine',
        logo: 'images/websites/comicvine.svg',
        actions: [
            'getImages'
        ],
        isActive: true
    }
];

export {
    WEBSITE_LIST
};
