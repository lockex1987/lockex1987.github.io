Version 1.0.0 (15/08/2017)
	First runnable
	Display HTTPS blocked page

Version 1.1.0 (16/08/2017)
	Safe Search on Google, Restrict Mode on YouTube
	Clear open cookies

Version 1.1.1 (17/08/2017)
	Migrate to Firefox

Version 1.2.0 (18/08/2017)
	Blocked by keywords
	Filter profanity words

Version 1.3.0 (19/08/2017)
	Blocked by URLs

Version 1.4.0 (05/09/2017)
	Context menu to block page
	New error code for YouTube

Version 2.0.0 (dd/mm/yyyy)
	Multi languages

Edit page:
	https://chrome.google.com/webstore/developer/edit/micdgmpgpphpbnaohelmkbmijpamehph

Test với Firefox thì thêm đoạn sau vào file manifest.json
	"applications": {
		"gecko": {
			"id": "addon@safenet.vn",
			"strict_min_version": "50.0"
		}
	},

Publish với Firefox thì thêm đoạn sau vào file manifest.json
  "applications": {
		"gecko": {
			"strict_min_version": "50.0"
		}
	},
