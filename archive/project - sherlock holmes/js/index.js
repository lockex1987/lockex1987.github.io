function normalizeFileName(title) {
    return title.toLowerCase().replace(/\s+/g, '_').replace(/'/g, '') + '.html';
}

var baseUrl = location.href;

stories.forEach(story => {
    story.slug = normalizeFileName(story.title);
});

var app = new Vue({
  el: '#app',
  data () {
    return {
      stories,
      showList: true,
      currentStory: '',
      audioLink: ''
    }
  },
  methods: {
    handleClickStoryLink(story) {
      // Thêm vào history, để sử dụng được nút Back của trình duyệt và mobile
      // Sử dụng hàm history.pushState
      // Truyền vào đối tượng state, title, url
      var historyStateObj = { id: story.slug };
      var historyTitle = story.title;
      var historyUrl = baseUrl + '#' + story.slug;
      console.log("Change to story " + historyTitle + ", " + JSON.stringify(historyStateObj) + ", " + historyUrl);
      history.pushState(historyStateObj, historyTitle, historyUrl);

      this.showStory(story.slug);
    },

    showStory(id) {
      var story = this.stories.find(s => s.slug == id);
      var vm = this
      // console.log(story)

      // var audioPlayer = document.querySelector('#audioPlayer');
      // audioPlayer.src = ;
      // audioPlayer.play();
      vm.audioLink = story.link

      var url = 'data/' + story.slug;
      // console.log(url)
      fetch(url)
        .then(response => response.text())
        .then(htmlCode => {
          //console.log(htmlCode);
          vm.showList = false;
          vm.currentStory = htmlCode;
        });
    },

    returnListView () {
      this.showList = true;
      history.replaceState({}, "Main", baseUrl);
    }
  },

  mounted () {
    // displayStory(data[0]);
    createMediaPlayer('#audioPlayer');
  }
});

// Người dùng nhấn phím Back/Forward
window.addEventListener('popstate', function(event) {
	var historyStateObj = event.state;
	console.log("historyStateObj: ", historyStateObj);
	if (!historyStateObj || !historyStateObj.id) {
		app.showList = true;
	} else {
        //app.showStory(historyStateObj.id);
    }
});
