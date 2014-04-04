/**
 * Created by Stefano on 31/03/14.
 */

/**
 * The single node of the list.
 * @param item {*} The item to store in the node.
 * @constructor
 */
function Node(item) {
	/**
	 * The item stored.
	 * @type {*}
	 */
	this.item = item;
	/**
	 * The next node. It's null if there's no a next node.
	 * @type {Node|null}
	 */
	this.next = null;
}

LinkedList.prototype = new Aggregate();
LinkedList.prototype.constructor = LinkedList;

/**
 * Class for managing a linked list.
 * @constructor
 */
function LinkedList() {
	/**
	 * The first node of the list.
	 * @type {Node|null}
	 */
	this.first = null;
	/**
	 * The last node of the list.
	 * @type {Node|null}
	 */
	this.last = null;
	/**
	 * The length of the list.
	 * @type {number}
	 */
	this.length = 0;
}

/**
 * @inheritDoc
 */
LinkedList.prototype.getIterator = function () {
	return new LinkedListIterator(this);
};

/**
 * Add an item at the head of the list.
 * @param item {*} The item to add.
 * @return {void}
 */
LinkedList.prototype.pushFront = function (item) {
	var node = new Node(item);
	node.next = this.first;
	this.first = node;
	if (!this.last)
		this.last = node;
	this.length++;
};

/**
 * Add an item at the tail of the list.
 * @param item {*} The item to add.
 * @return {void}
 */
LinkedList.prototype.pushBack = function (item) {
	var node = new Node(item);
	if (this.last)
		this.last.next = node;
	else
		this.first = node;
	this.last = node;
	this.length++;
};

/**
 * Remove the first element of the list.
 * @return {*} The element removed. It's undefined if the list is empty.
 */
LinkedList.prototype.popFront = function () {
	if (this.length) {
		var node = this.first;
		this.first = this.first.next;
		this.length--;
		node.next = null;
		return node.item;
	}
	return undefined;
};

/**
 * Remove the last element of the list.
 * @return {*} The element removed. It's undefined if the list is empty.
 */
LinkedList.prototype.popBack = function () {
	if (this.length) {
		var node = this.last;
		var next = this.first;
		while (next.next && next.next.next) {
			next = next.next;
		}
		if (node === next)
			this.last = null;
		else
			this.last = next;
		next.next = null;
		this.length--;
		return node.item;
	}
	return undefined;
};

/**
 * Remove the item at the position index.
 * @param index {Number} The position of the item to remove.
 * @return {*} The item stored at the position index. It's undefined if the index is out of bounds.
 */
LinkedList.prototype.removeAt = function (index) {
	if (index < 0 || index > this.length - 1)
		return undefined;
	if (index === 0)
		return this.popFront();
	if (index === this.length - 1)
		return this.popBack();
	var node = this.first;
	for (; index > 1; index--)
		node = node.next;
	//now node is the node before the node to remove
	//node to remove
	var next = node.next;
	if (next === this.last)
		this.last = node;

	node.next = next.next;
	this.length--;
	return next.item;
};

/**
 * Get the item at the position index.
 * @param index {Number} The position of the item.
 * @return {*} The item stored at the position index. It's undefined if index isn't in the queue bounds.
 */
LinkedList.prototype.getItem = function (index) {
	if (index < 0 || index > this.length - 1)
		return undefined;
	var node = this.first;
	for (; index > 0; index--)
		node = node.next;
	return node.item;
};

/**
 * Transform the list into an array.
 * @return {Array<*>} The array built.
 */
LinkedList.prototype.toArray = function () {
	var array = [];
	for (var node = this.first, i = 0; node; node = node.next, i++)
		array[i] = node.item;
	return array;
};

/**
 * Build the list from the array.
 * @param array {Array<*>} The array from which build the list.
 * @return {void}
 */
LinkedList.prototype.fromArray = function (array) {
	var node = this.first;
	for (var i = 0; i < Math.min(this.length, array.length); i++, node = node.next)
		node.item = array[i];
	if (this.length < array.length)
		for (var j = this.length; j < array.length; j++)
			this.pushBack(array[j]);
	else
		for (var k = array.length; k < this.length;)
			this.popBack();
};

/**
 * Return the items that satisfy the condition determined by the callback.
 * @param callback {function} The function that implements the condition.
 * @return {Array<*>} The array that contains the items that satisfy the condition.
 */
LinkedList.prototype.filter = function (callback) {
	var result = [];
	for (var node = this.first; node; node = node.next) {
		if (callback(node.item))
			result.push(node.item);
	}
	return result;
};