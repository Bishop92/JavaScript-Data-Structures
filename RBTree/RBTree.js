/**
 * The single node of the tree.
 * @param key {number} The key of the node.
 * @param item {*} The item to store in the node.
 * @constructor
 */
function RBNode(key, item) {
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
	 * @type {RBNode|null}
	 */
	this.parent = null;
	/**
	 * The left node. It's null if there's no a left node.
	 * @type {RBNode|null}
	 */
	this.left = null;
	/**
	 * The right node. It's null if there's no a right node.
	 * @type {RBNode|null}
	 */
	this.right = null;
	/**
	 * The type of the node. It's or red or black.
	 * @type {string}
	 */
	this.type = 'r';
}

RBTree.prototype = new Aggregate();
RBTree.prototype.constructor = RBTree;

function RBTree() {
	/**
	 * The root of the tree.
	 * @type {RBNode|null}
	 */
	this.root = null;
}

/**
 * @inheritDoc
 */
RBTree.prototype.getIterator = function () {
	return new RBTreeIterator(this);
};

/**
 * Insert the item relatives to the key value in the tree.
 * @param key {number} The key to store.
 * @param item {*} The item to store.
 * @return {void}
 */
RBTree.prototype.insert = function (key, item) {
	var node = new RBNode(key, item);
	if (!this.root) {
		this.root = node;
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

	this.insertFixUp(node);
};

/**
 * Preserve the properties of the tree after an insert.
 * @param node {RBNode} The node to insert.
 * @return {void}
 */
RBTree.prototype.insertFixUp = function (node) {
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
 * @param node {RBNode} The node to delete.
 * @return {void}
 */
RBTree.prototype.deleteNode = function (node) {
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

	if (successor.type === 'b')
		this.deleteFixUp(child, successor.parent);
};

/**
 * Preserve the properties of the tree after a deletion.
 * @param node {RBNode} The node to delete.
 * @param parent {RBNode} The parent of the node.
 * @return {void}
 */
RBTree.prototype.deleteFixUp = function (node, parent) {
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
 * @param node {RBNode} The node of which search the successor.
 * @return {RBNode} The node found.
 */
RBTree.prototype.successor = function (node) {
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
 * @param node {RBNode} The node of which search the predecessor.
 * @return {RBNode} The node found.
 */
RBTree.prototype.predecessor = function (node) {
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
 * Search the item relatives to the key.
 * @param key {Number} The key to find.
 * @param [node = root] {RBNode} The node from which start the search.
 * @return {*} The item found or undefined if there isn't the key in the tree.
 */
RBTree.prototype.search = function (key, node) {
	node = node || this.root;
	while (node && key !== node.key)
		if (key < node.key)
			node = node.left;
		else
			node = node.right;
	if (node)
		return node.item;
	return undefined;
};

/**
 * Get the item relatives to the minimum key stored in the tree.
 * @param [node = root] {Node} The node from which start the search.
 * @return {RBNode} The node found.
 */
RBTree.prototype.minimum = function (node) {
	node = node || this.root;
	while (node && node.left)
		node = node.left;
	return node;
};

/**
 * Get the item relatives to the maximum key stored in the tree.
 * @param [node = root] {Node} The node from which start the search.
 * @return {RBNode} The node found.
 */
RBTree.prototype.maximum = function (node) {
	node = node || this.root;
	while (node && node.right)
		node = node.right;
	return node;
};

/**
 * Rotate the node with its right child.
 * @param node {RBNode} The node to rotate.
 * @return {void}
 */
RBTree.prototype.leftRotate = function (node) {
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
 * @param node {RBNode} The node to rotate.
 * @return {void}
 */
RBTree.prototype.rightRotate = function (node) {
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