/*
Sử dụng mLab (Cloud DB)
    http://docs.mlab.com/
    http://docs.mlab.com/data-api/
    https://api.mlab.com/api/1/databases?apiKey=lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s
    https://api.mlab.com/api/1/databases/lockex1987/collections?apiKey=lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s
    https://api.mlab.com/api/1/databases/lockex1987/collections/coordinate?apiKey=lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s
*/
class Mlab {
    // Base URL của mLab
    static get MLAB_BASE_URL() {
        return 'https://api.mlab.com/api/1';
    }

    constructor(database, collection, apiKey) {
        this.database = database;
        this.collection = collection;
        this.apiKey = apiKey;
    }

    /**
     * Lấy danh sách các bookmark.
     * @param {Function} callback
     */
    async listDocuments(callback) {
        const url = Mlab.MLAB_BASE_URL +
            '/databases/' + this.database +
            '/collections/' + this.collection +
            '?apiKey=' + this.apiKey;
        const resp = await fetch(url).then(resp => resp.json());
        if (callback) {
            callback(resp);
        }
    }

    /**
     * Thêm mới.
     * @param {Object} docObj
     * @param {Function} callback
     */
    async insertDocument(docObj, callback) {
        const url = Mlab.MLAB_BASE_URL +
            '/databases/' + this.database +
            '/collections/' + this.collection +
            '?apiKey=' + this.apiKey;
        const params = JSON.stringify(docObj);
        const resp = await fetch(url, {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then(resp => resp.json());
        if (callback) {
            callback(resp);
        }
    }

    async deleteDocument(docId, callback) {
        const url = Mlab.MLAB_BASE_URL +
            '/databases/' + this.database +
            '/collections/' + this.collection +
            '/' + docId +
            '?apiKey=' + this.apiKey;
        const resp = await fetch(url, {
            method: 'DELETE'
        }).then(resp => resp.json());
        if (callback) {
            callback(resp);
        }
    }

    /**
     * Xóa tất cả.
     * @param {Function} callback
     */
    async deleteAllDocument(callback) {
        const url = Mlab.MLAB_BASE_URL +
            '/databases/' + this.database +
            '/collections/' + this.collection +
            '?apiKey=' + this.apiKey;
        const params = JSON.stringify([]); // empty list
        const resp = await fetch(url, {
            method: 'PUT',
            body: params,
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then(resp => resp.json());
        if (callback) {
            callback(resp);
        }
    }
}
