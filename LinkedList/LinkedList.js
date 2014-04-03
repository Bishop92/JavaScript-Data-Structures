/**
 * Created by Stefano on 31/03/14.
 */

/**
 * The single node of the list.
 * @param item The item to store in the node.
 * @constructor
 */
function Node(item) {
	/**
	 * The item stored.
	 * @type {Object}
	 */
	this.item = item;
	/**
	 * The next node. It's null if there's no a next node.
	 * @type {Node|null}
	 */
	this.next = null;
}

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
 * Add an item at the head of the list.
 * @param item The item to add.
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
 * @param item The item to add.
 * @return {void}
 */
LinkedList.prototype.pushBack = function (item) {
	var node = new Node(item);
	if(this.last)
		this.last.next = node;
	else
		this.first = node;
	this.last = node;
	this.length++;
};

/**
 * Remove the first element of the list.
 * @return {Object|undefined} The element removed. It's undefined if the list is empty.
 */
LinkedList.prototype.popFront = function() {
	if(this.length) {
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
 * @return {Object|undefined} The element removed. It's undefined if the list is empty.
 */
LinkedList.prototype.popBack = function() {
	if(this.length) {
		var node = this.last;
		var next = this.first;
		while(next.next && next.next.next) {
			next = next.next;
		}
		if(node === next)
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
 * @param index The position of the item to remove.
 * @return {Object|undefined}
 */
LinkedList.prototype.removeAt = function(index) {
	if(index < 0 || index > this.length - 1)
		return undefined;
	if(index === 0)
		return this.popFront();
	if(index === this.length - 1)
		return this.popBack();
	var node = this.first;
	for( ; index > 1; index--)
		node = node.next;
	//now node is the node before the node to remove
	//node to remove
	var next = node.next;
	if(next === this.last)
		this.last = node;
	//noinspection JSPrimitiveTypeWrapperUsage
	node.next = next.next;
	this.length--;
	return next.item;
};

/**
 * Get the item at the position index.
 * @param index The position of the item.
 * @return {Object|undefined}. It's undefined if index isn't in the queue bounds.
 */
LinkedList.prototype.getItem = function(index) {
	if(index < 0 || index > this.length)
		return undefined;
	var node = this.first;
	for( ; index > 0; index--)
		node = node.next;
	return node.item;
};