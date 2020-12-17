const state = {
    // Đối tượng truyện hiện tại được chọn
    comic: {},

    // Đối tượng chương được chọn
    issue: {},

    // Có phải là xem ảnh dạng cbz, cbr hay không
    viewZip: false,

    // Danh sách ảnh ở trong file cbz, cbr
    zipImageList: []
};

const mutations = {
    setComic(state, comic) {
        state.comic = comic;
    },

    setIssue(state, issue) {
        state.issue = issue;
    },

    setViewZip(state, viewZip) {
        state.viewZip = viewZip;
    },

    setZipImageList(state, zipImageList) {
        state.zipImageList = zipImageList;
    }
};

export default {
    state,
    mutations,
    namespaced: true
};
