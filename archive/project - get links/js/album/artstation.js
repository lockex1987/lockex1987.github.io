/**
 * https://github.com/Lucasnribeiro/art-py/blob/master/artstation-webcrawler.py
 * https://github.com/findix/ArtStationDownloader/blob/master/src/core.py
 *
 * Follows:
 *     https://www.artstation.com/users/[username]/following.json
 * Likes:
 *     https://www.artstation.com/users/[username]/likes.json
 * Specific artwork data:
 *     https://www.artstation.com/project/[artwork hash].json
 *
 * https://art-py.tumblr.com/archive
 */

class ArtStation {
    /**
     * Khởi tạo.
     * @param {String} username Tên người dùng
     */
    constructor(username) {
        this.username = username;
    }

    /**
     * Lấy toàn bộ ảnh.
     */
    async getImages() {
        const projects = await this.getAllProjects();
        let images = [];
        for (let i = 0; i < projects.length; i++) {
            writeLog((i + 1) + '/' + projects.length);
            const temp = await this.getSingleProject(projects[i].hash_id);
            images = images.concat(temp);
        }
        return images;
    }

    /**
     * Lấy toàn bộ project.
     */
    async getAllProjects() {
        let projects = [];
        let page = 0;
        while (true) {
            page += 1;
            const url = `https://www.artstation.com/users/${this.username}/projects.json?page=${page}`;
            const resp = await fetch(url).then(r => r.json());
            const totalCount = resp.total_count;
            if (totalCount == 0) {
                writeLog('[Error] Không tồn tại project');
                break;
            }
            const projectsPerPage = 50;
            const totalPage = Math.ceil(totalCount / projectsPerPage);
            projects = projects.concat(resp.data);
            writeLog(`Get page ${page} / ${totalPage}`);
            if (page >= totalPage) {
                break;
            }
        }
        return projects;
    }

    /**
     * Lấy ảnh của một project
     * @param {String} hashId Hash ID của project
     */
    async getSingleProject(hashId) {
        const url = `https://www.artstation.com/projects/${hashId}.json`;
        const resp = await fetch(url).then(r => r.json());
        const assets = resp.assets;
        const title = resp.slug.trim();
        const fullName = resp.user.full_name.replace(/\//g, '');
        const images = [];
        assets.forEach(asset => {
            if (asset.has_image) {
                const imageUrl = asset.image_url;
                const lastPart = imageUrl.split('/').pop();
                const fileName = lastPart.split('?')[0];
                const filePath = `${fullName} (${this.username})/${title} - ${fileName}`;
                // console.log(imageUrl, filePath);
                images.push({
                    name: filePath,
                    url: imageUrl
                });
            }
        });
        return images;
    }
}

async function getImagesArtstation(postUrl, username) {
    const artStation = new ArtStation(username);
    const images = await artStation.getImages();
    return images;
}

/**
 * Lấy tên thư mục lưu.
 * @param {String} postUrl
 */
function getFolderArtstation(postUrl) {
    const folder = postUrl.split('/').pop(); ;
    return folder;
}

export {
    getImagesArtstation,
    getFolderArtstation
};
