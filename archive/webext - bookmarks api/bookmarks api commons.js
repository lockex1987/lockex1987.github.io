chrome.bookmarks.removeTree(this._id);

chrome.bookmarks.remove(this._id);

chrome.bookmarks.remove(String(bookmarkNode.id));

chrome.bookmarks.create({
	parentId: bookmarkNode.id,
	title: $('#title').val(),
	url: $('#url').val()
});

chrome.bookmarks.update(String(bookmarkNode.id), { title: edit.val() });
  
chrome.bookmarks.create({
	'parentId': this._id,
	'title': newChild._title,
	'url': newChild._url,
	'index': i
}, callbackChain.wrap((function(wantedChild, newChild, createdNode) {
	newChild._id = createdNode.id;
	newChild._nodesMap[newChild._id] = newChild;
	if (wantedChild.children)
		newChild.updateChildren(wantedChild.children, callbackChain);
}).bind(null, wantedChild, newChild)));

chrome.bookmarks.create({
	'parentId': parentId,
	'title': self._title,
	'url': self._url,
	'index': index
}, callbackChain.wrap(function(newNode) {
	delete self._nodesMap[self._id];
	self._id = newNode.id;
	self._parentId = newNode.parentId;
	self._nodesMap[self._id] = self;
    (self._children || []).forEach(function(child, i) {
      child.regenerate(self._id, i, callbackChain);
    });
}));


chrome.bookmarks.move(this._id, {
    'parentId': this._parentId,
    'index': index
}, callback);

chrome.bookmarks.getChildren(self._id, function(currentOrder) {
	for (var i = 0; i < currentOrder.length; ++i) {
		var node = currentOrder[i];
		var child = self._nodesMap[node.id];
		if (child && child.getIndex() != i) {
			child.moveInModel(node.parentId, node.index, self.reorderChildren.bind(self));
			return;
		}
	}
});


// Observe bookmark modifications and revert any modifications made to managed
// bookmarks. The tree is always reloaded in case the events happened while the
// page was inactive.
chrome.bookmarks.onMoved.addListener(function(id, info) {
  tree.load(function() {
    var managedNode = tree.getById(id);
    if (managedNode && !managedNode.isRoot()) {
      managedNode.moveInModel(info.parentId, info.index, function(){});
    } else {
      // Check if the parent node has managed children that need to move.
      // Example: moving a non-managed bookmark in front of the managed
      // bookmarks.
      var parentNode = tree.getById(info.parentId);
      if (parentNode)
        parentNode.reorderChildren();
    }
  });
});

chrome.bookmarks.onChanged.addListener(function(id, info) {
  tree.load(function() {
    var managedNode = tree.getById(id);
    if (!managedNode || managedNode.isRoot())
      return;
    chrome.bookmarks.update(id, {
      'title': managedNode._title,
      'url': managedNode._url
    });
  });
});

chrome.bookmarks.onRemoved.addListener(function(id, info) {
  tree.load(function() {
    var managedNode = tree.getById(id);
    if (!managedNode || managedNode.isRoot())
      return;
    // A new tree.store() is needed at the end because the regenerated nodes
    // will have new IDs.
    var callbackChain = new CallbackChain();
    callbackChain.push(tree.store.bind(tree));
    managedNode.regenerate(info.parentId, info.index, callbackChain);
  });
});
