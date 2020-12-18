const state = {
    // Có phải là xem ảnh dạng cbz, cbr hay không
    viewZip: false,

    // Danh sách ảnh ở trong file cbz, cbr
    zipImageList: []
};

const mutations = {
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
