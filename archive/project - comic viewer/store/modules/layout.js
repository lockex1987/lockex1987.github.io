const state = {
    // Màn hình hiện tại
    // Có thể có các giá trị 'comic-list', 'issue-list', 'comic-viewer'
    screen: ''
};

const mutations = {
    setScreen(state, screen) {
        state.screen = screen;
    }
};

export default {
    state,
    mutations,
    namespaced: true
};
