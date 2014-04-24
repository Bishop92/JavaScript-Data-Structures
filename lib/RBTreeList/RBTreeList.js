/**
 * The single node of the tree.
 * @param key {number} The key of the node.
 * @param item {*} The item to store in the node.
 * @constructor
 */
function RBLNode(key, item) {
	/**
	 * The item stored.
	 * @type {*}
	 */
	this.item = item;
	/**
	 * The key of the node.
	 * @type {number}
	 */
	this.key = key;
	/**
	 * The parent node. It's null if there's no a parent node.
	 * @type {RBLNode|null}
	 */
	this.parent = null;
	/**
	 * The left node. It's null if there's no a left node.
	 * @type {RBLNode|null}
	 */
	this.left = null;
	/**
	 * The right node. It's null if there's no a right node.
	 * @type {RBLNode|null}
	 */
	this.right = null;
	/**
	 * The next node. It's null if there's no a next node.
	 * @type {RBLNode|null}
	 */
	this.next = null;
	/**
	 * The previous node. It's null if there's no a previous node.
	 * @type {RBLNode|null}
	 */
	this.previous = null;
	/**
	 * The type of the node. It's or red or black.
	 * @type {string}
	 */
	this.type = 'r';
}

RBTreeList.prototype = new Aggregate();
RBTreeList.prototype.constructor = RBTreeList;

function RBTreeList() {
	/**
	 * The root of the tree.
	 * @type {RBLNode|null}
	 */
	this.root = null;
	/**
	 * The first node of the tree.
	 * @type {RBLNode|null}
	 */
	this.first = null;
	/**
	 * The last node of the tree.
	 * @type {RBLNode|null}
	 */
	this.last = null;
	/**
	 * The size of the tree.
	 * @type {number}
	 */
	this.size = 0;
}

/**
 * @inheritDoc
 */
RBTreeList.prototype.getIterator = function () {
	return new RBTreeListIterator(this);
};

/**
 * Insert the item relatives to the key value in the tree.
 * @param key {number} The key to store.
 * @param item {*} The item to store.
 * @return {void}
 */
RBTreeList.prototype.insert = function (key, item) {
	var node = new RBLNode(key, item);
	this.size++;
	if (!this.root) {
		this.root = node;
		this.first = node;
		this.last = node;
		node.type = 'b';
		return;
	}
	var p = this.root;
	for (var n = this.root; n;) {
		p = n;
		if (key < n.key)
			n = n.left;
		else
			n = n.right;
	}
	node.parent = p;
	if (!p)
		this.root = node;
	else if (key < p.key)
		p.left = node;
	else
		p.right = node;

	node.next = this.successor(node);
	if (node.next) {
		if (node.next.previous)
			node.next.previous.next = node;
		else
			this.first = node;
		node.previous = node.next.previous;
		node.next.previous = node;
	} else {
		this.last = node;
		node.previous = this.predecessor(node);
		if (node.previous)
			node.previous.next = node;
		else
			this.first = node;
	}

	this.insertFixUp(node);
};

/**
 * Preserve the properties of the tree after an insert.
 * @param node {RBLNode} The node to insert.
 * @return {void}
 */
RBTreeList.prototype.insertFixUp = function (node) {
	for (var parent = node.parent; parent && parent.type === 'r'; parent = node.parent) {
		if (parent === parent.parent.left) {
			var uncle = parent.parent.right;
			if (uncle && uncle.type === 'r') {
				parent.type = 'b';
				uncle.type = 'b';
				parent.parent.type = 'r';
				node = parent.parent;
			} else if (node === parent.right) {
				node = parent;
				this.leftRotate(node);
			} else {
				parent.type = 'b';
				parent.parent.type = 'r';
				this.rightRotate(parent.parent);
			}
		} else {
			var uncle = parent.parent.left;
			if (uncle && uncle.type === 'r') {
				parent.type = 'b';
				uncle.type = 'b';
				parent.parent.type = 'r';
				node = parent.parent;
			} else if (node === parent.left) {
				node = parent;
				this.rightRotate(node);
			} else {
				parent.type = 'b';
				parent.parent.type = 'r';
				this.leftRotate(parent.parent);
			}
		}
	}
	this.root.type = 'b';
};

/**
 * Delete the node from the tree.
 * @param node {RBLNode} The node to delete.
 * @return {void}
 */
RBTreeList.prototype.deleteNode = function (node) {
	this.size--;
	var successor;
	if (!node.left || !node.right)
		successor = node;
	else {
		successor = this.successor(node);
		node.key = successor.key;
		node.item = successor.item;
	}
	var child;
	if (!successor.left)
		child = successor.right;
	else
		child = successor.left;
	if (child)
		child.parent = successor.parent;
	if (!successor.parent)
		this.root = child;
	else if (successor === successor.parent.left)
		successor.parent.left = child;
	else
		successor.parent.right = child;

	if (successor.next)
		successor.next.previous = successor.previous;
	else
		this.last = successor.previous;
	if (successor.previous)
		successor.previous.next = successor.next;
	else
		this.first = successor.next;

	if (successor.type === 'b')
		this.deleteFixUp(child, successor.parent);
};

/**
 * Preserve the properties of the tree after a deletion.
 * @param node {RBLNode} The node to delete.
 * @param parent {RBLNode} The parent of the node.
 * @return {void}
 */
RBTreeList.prototype.deleteFixUp = function (node, parent) {
	while (node !== this.root && (!node || node.type === 'b')) {
		if (node === parent.left) {
			var brother = parent.right;
			if (brother && brother.type === 'r') {
				brother.type = 'b';
				parent.type = 'r';
				this.leftRotate(parent);
				brother = parent.right;
			}
			if (brother && (!brother.left || brother.left.type === 'b') && (!brother.right || brother.right.type === 'b')) {
				brother.type = 'r';
				node = parent;
			} else {
				if (!brother.right || brother.right.type === 'b') {
					brother.left.type = 'b';
					brother.type = 'r';
					this.rightRotate(brother);
					brother = parent.right;
				}
				brother.type = parent.type;
				parent.type = 'b';
				brother.right.type = 'b';
				this.leftRotate(parent);
				node = this.root;
			}
		} else {
			var brother = parent.left;
			if (brother && brother.type === 'r') {
				brother.type = 'b';
				parent.type = 'r';
				this.rightRotate(parent);
				brother = parent.left;
			}
			if (brother && (!brother.left || brother.left.type === 'b') && (!brother.right || brother.right.type === 'b')) {
				brother.type = 'r';
				node = parent;
			} else {
				if (!brother.left || brother.left.type === 'b') {
					brother.right.type = 'b';
					brother.type = 'r';
					this.leftRotate(brother);
					brother = parent.left;
				}
				brother.type = parent.type;
				parent.type = 'b';
				brother.left.type = 'b';
				this.rightRotate(parent);
				node = this.root;
			}
		}
		parent = node.parent;
	}
	if (node)
		node.type = 'b';
};

/**
 * Get the node with the key next to the param node key.
 * @param node {RBLNode} The node of which search the successor.
 * @return {RBLNode} The node found.
 */
RBTreeList.prototype.successor = function (node) {
	if (node.next || node === this.last)
		return node.next;
	if (node.right)
		return this.minimum(node.right);
	var parent = node.parent;
	while (parent && node === parent.right) {
		node = parent;
		parent = parent.parent;
	}
	return parent;
};

/**
 * Get the node with the key previous to the param node key.
 * @param node {RBLNode} The node of which search the predecessor.
 * @return {RBLNode} The node found.
 */
RBTreeList.prototype.predecessor = function (node) {
	if (node.previous || node === this.first)
		return node.previous;
	if (node.left)
		return this.maximum(node.left);
	var parent = node.parent;
	while (parent && node === parent.left) {
		node = parent;
		parent = parent.parent;
	}
	return parent;
};

/**
 * Search the item relatives to the key that satisfy the condition represented by the callback function.
 * @param key {number} The key to find.
 * @param [node = root] {RBNode} The node from which start the search.
 * @param [callback = function(k){return(k===key);}] The condition to satisfy. The callback must accept the current key to check.
 * @return {*} The item found or undefined if there isn't the key in the tree.
 */
RBTreeList.prototype.search = function (key, node, callback) {
	node = node || this.root;
	callback = callback || function (node) {
		return node.key === key;
	};
	while (node && !callback(node))
		if (key < node.key)
			node = node.left;
		else
			node = node.right;
	if (node)
		return node.item;
	return undefined;
};

/**
 * Checks if the tree contains a key or a node that satisfy the condition represented by the callback function.
 * This method avoid to search in branches where the key won't be found.
 * @param key {*} The key to find.
 * @param [callback = function(node){return(node.key===key);}] The condition to satisfy. The callback must accept the current node to check.
 * @return {boolean} True if the tree contains the key or a node that satisfy the condition, false otherwise.
 */
RBTreeList.prototype.contains = function (key, callback) {
	return this.search(key, null, callback) !== undefined;
};

/**
 * Checks if the tree contains a node that satisfy the condition represented by the callback function.
 * This method check all the tree avoiding the binary search.
 * @param callback {function} The condition to satisfy. The callback must accept the current node to check.
 * @return {boolean} True if the tree contains the node that satisfy the condition, false otherwise.
 */
RBTreeList.prototype.fullContains = function (callback) {
	var node = this.first;
	while (node && !callback(node.key))
		node = node.next;
	return node !== null;
};

/**
 * Get the item relatives to the minimum key stored in the tree.
 * @param [node = root] {Node} The node from which start the search.
 * @return {RBLNode} The node found.
 */
RBTreeList.prototype.minimum = function (node) {
	if (node)
		while (node && node.left)
			node = node.left;
	else
		return this.first;
	return node;
};

/**
 * Get the item relatives to the maximum key stored in the tree.
 * @param [node = root] {Node} The node from which start the search.
 * @return {RBLNode} The node found.
 */
RBTreeList.prototype.maximum = function (node) {
	if (node)
		while (node && node.right)
			node = node.right;
	else
		return this.last;
	return node;
};

/**
 * Rotate the node with its right child.
 * @param node {RBLNode} The node to rotate.
 * @return {void}
 */
RBTreeList.prototype.leftRotate = function (node) {
	var child = node.right;
	node.right = child.left;
	if (child.left !== null)
		child.left.parent = node;
	child.parent = node.parent;
	if (node.parent === null)
		this.root = child;
	else if (node === node.parent.left)
		node.parent.left = child;
	else
		node.parent.right = child;
	node.parent = child;
	child.left = node;
};

/**
 * Rotate the node with its left child.
 * @param node {RBLNode} The node to rotate.
 * @return {void}
 */
RBTreeList.prototype.rightRotate = function (node) {
	var child = node.left;
	node.left = child.right;
	if (child.right !== null)
		child.right.parent = node;
	child.parent = node.parent;
	if (node.parent === null)
		this.root = child;
	else if (node === node.parent.left)
		node.parent.left = child;
	else
		node.parent.right = child;
	node.parent = child;
	child.right = node;
};

/**
 * Returns the size of the tree.
 * @return {number} The size of the tree.
 */
RBTreeList.prototype.getSize = function () {
	return this.size;
};

/**
 * Clones the tree into a new tree.
 * @return {RBTreeList} The tree cloned from this tree.
 */
RBTreeList.prototype.clone = function () {
	var tree = new RBTreeList();
	var it = this.getIterator();
	for (it.first(); !it.isDone(); it.next())
		tree.insert(it.getNode().key, it.getNode().item);
	return tree;
};

/**
 * Clones the tree into a new tree without cloning duplicated items.
 * @return {RBTreeList} The tree cloned from this tree.
 */
RBTreeList.prototype.cloneDistinct = function () {
	var tree = new RBTreeList();
	var it = this.getIterator();
	for (it.first(); !it.isDone(); it.next()) {
		var callback = function (node) {
			return node.key === it.getNode().key && node.item === it.getNode().item;
		};
		if (!tree.contains(it.getNode().key, callback)) {
			if (it.getNode().item.cloneDistinct)
				tree.insert(it.getNode().key, it.getNode().item.cloneDistinct());
			else if (it.getNode().item.clone)
				tree.insert(it.getNode().key, it.getNode().item.clone());
			else
				tree.insert(it.getNode().key, it.getNode().item);
		}
	}
	return tree;
};

/**
 * Transform the tree into an array without preserving keys.
 * @return {Array<*>} The array that represents the tree.
 */
RBTreeList.prototype.toArray = function () {
	var result = [];
	for (var node = this.first; node; node = node.next)
		result.push(node.item);
	return result;
};

/**
 * Removes all the items stored in the tree.
 * @return {void}
 */
RBTreeList.prototype.clear = function () {
	this.root = null;
	this.first = null;
	this.last = null;
	this.size = 0;
};

/**
 * Checks if the tree is empty.
 * @return {boolean} True if the tree is empty, false otherwise.
 */
RBTreeList.prototype.isEmpty = function () {
	return !this.size;
};

/**
 * Executes the callback function for each item of the tree.
 * This method modifies the tree so if you don't need to modify it you must return the same item stored.
 * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
 * @return {void}
 */
RBTreeList.prototype.execute = function (callback) {
	for (var node = this.first; node; node = node.next)
		node.item = callback(node.item);
};

/**
 * Returns the items that satisfy the condition determined by the callback.
 * @param callback {function} The function that implements the condition.
 * @return {Array<*>} The array that contains the items that satisfy the condition.
 */
RBTreeList.prototype.filter = function (callback) {
	var result = [];
	for (var node = this.first; node; node = node.next)
		if (callback(node.item))
			result.push(node.item);
	return result;
};

/**
 * Returns the first position of the item in the tree.
 * @param item {*} The item to search.
 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
 * @return {number} The first position of the item.
 */
RBTreeList.prototype.indexOf = function (item, callback) {
	callback = callback || function (it) {
		return it === item;
	};
	var i = 0, node = this.first;
	while (node) {
		if (callback(node.item))
			return i;
		node = node.next;
		i++;
	}
	return -1;
};

/**
 * Returns the last position of the item in the tree.
 * @param item {*} The item to search.
 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
 * @return {number} The last position of the item.
 */
RBTreeList.prototype.lastIndexOf = function (item, callback) {
	callback = callback || function (it) {
		return it === item;
	};
	var i = this.size - 1, node = this.last;
	while (node) {
		if (callback(node.item))
			return i;
		i--;
		node = node.previous;
	}
	return -1;
};

/**
 * Returns all the position in which the item has been found in the tree.
 * @param item {*} The item to search.
 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
 * @return {Array<number>} The positions in which the item has been found.
 */
RBTreeList.prototype.allIndexesOf = function (item, callback) {
	callback = callback || function (it) {
		return it === item;
	};
	var i = 0, node = this.first;
	var indexes = [];
	while (node) {
		if (callback(node.item))
			indexes.push(i);
		i++;
		node = node.next;
	}
	return indexes;
};

/**
 * Returns the item at the position index.
 * @param index {number} The position of the item.
 * @return {*} The item at the position. It's undefined if index isn't in the tree bounds.
 */
RBTreeList.prototype.getItem = function (index) {
	if (index < 0 || index > this.size - 1)
		return undefined;
	for (var node = this.first, i = 0; i < index; node = node.next)
		i++;
	return node.item;
};