<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html>

<head>
	<title>2000+ Common English Words</title>
	<base href="${pageContext.request.contextPath}/" />
	<meta charset="UTF-8">
	<link rel="icon" href="images/favicon.png">
	
	<link rel="stylesheet" href="lib/noti/css/noti.css">
	<script src="lib/noti/js/noti.js"></script>
	
	<script src="lib/jquery/js/jquery.min.js"></script>
	<script src="lib/angular/js/angular.min.js"></script>

	<link rel="stylesheet" href='css/words.css'>
</head>

<body ng-cloak ng-app="myApp" ng-controller="WordController" ng-cloak>
	<!-- Logo, banner -->
	<header>
		<div id="logo">2000+ Words</div>
	</header>

	<!-- The list on the left -->
	<div id="listDiv">
		<div class="padding">
			<!-- Search field -->
			<!-- When user is typing, show suggestions -->
			<!-- If user press ENTER, show the first matched word -->
			<input type="text" ng-model="text" ng-keydown="showSuggestions($event)" maxlength="100" />

			<!-- Add new button -->
			<a href="" id="formLink" class="tinyButton" ng-click="gotoForm()">+</a>

			<!-- Search result list -->
			<div id="wordList">
				<a ng-repeat="w in wordList" href='' ng-click="clickWord(w.id);">{{w.word}}</a>
			</div>
		</div>
	</div>

	<!-- The main GUI on the right, contains 3 screens: home, form, view detail -->
	<div id="mainDiv">
		<!-- Screen 1: Home page, contains a welcome greeting -->
		<div id="homeDiv" class="view">
			You should understand about more than 2000 common words, and you can communicate in 90% situations.
		</div>

		<!-- Screen 2: Add, update form -->
		<div id="formDiv" class="view" style="display: none;">
			<form id="frm" enctype="multipart/form-data">
				<label>Word</label>
				<input type="text" name="word" id="word" ng-model="frm.word" maxlength="100"/>
				<label>Pronounce</label>
				<input type="text" name="pronounce" id="pronounce" ng-model="frm.pronounce" maxlength="100"/>
				<label>Meanings (Word type: Meaning)</label>
				<textarea name="meanings" id="meanings" ng-model="frm.meanings"></textarea>
				<label>Examples</label>
				<textarea name="examples" id="examples" ng-model="frm.examples"></textarea>
				<label>Images</label>
				<input type="file" name="images" id="images" class="fileInput"/>
				
				<table id="attachmentList">
					<tr ng-repeat="i in frm.images">
						<td>
							<img ng-src="{{'picture/' + i}}"/>
						</td>
						<td>
							{{i}}
						</td>
						<td>
							<a href="" ng-click="removeAttachFile(i)">&times;</a>
						</td>
					</tr>
				</table>
				
				<label for="images" id="imagesLabel">+ Choose a file</label>
				<ul id="previewList">
					<li>
						<span class="deleteButton">&times;</span>
						<img src="">
					</li>
				</ul>
				
				<button type="button" id="cancelLink" ng-click='cancelForm()'>Cancel</button>
				<button type="button" id="saveLink" ng-click="saveForm()">Save</button>
			</form>
		</div>

		<!-- Screen 3: View detail screen -->
		<div id="viewDiv" class="view" style="display: none;">
			<a href="" id="deleteLink" class="tinyButton" ng-click="clickDeleteLink()">x</a>
			<a href="" id="updateLink" class="tinyButton" ng-click="clickUpdateLink()">u</a>

			<div id="wordView">{{word.word}}</div>
			<div>
				<span id="pronounceView">{{word.pronounce}}</span>
				<img id="volumeIcon" src="images/volume.png" onclick="document.getElementById('myAudio').play()"/>
				<audio id="myAudio" ng-src="{{'audio/' + word.word + '.mp3'}}"/>
			</div>
			<div id="meaningsView">
				<div ng-repeat="m in word.meanings">
					<span class="wordType">{{m.wordType}}</span>: {{m.meaning}}
				</div>
			</div>
			<div id="examplesView">
				<div ng-repeat="e in word.examples">
					{{e}}
				</div>
			</div>
			<div id="imagesView">
				<figure ng-repeat="i in word.images">
					<!-- Đường dẫn ảnh tùy thuộc người dùng -->
					<img ng-src="{{'picture/' + i}}"/>
					<figcaption>{{i}}</figcaption>
				</figure>
			</div>
		</div>
	</div>
	
	<!--div class="clearfix">&nbsp;</div>
	<footer>CTTD 2016</footer-->

	
	<script src="js/common.js"></script>
	<script src="js/word.js"></script>
	<script src="js/words-preview.js"></script>
</body>

</html>
