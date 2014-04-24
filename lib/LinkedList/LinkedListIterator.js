/**
 * Created by Stefano on 04/04/2014.
 */

LinkedListIterator.prototype = new Iterator();
LinkedListIterator.prototype.constructor = LinkedListIterator;

/**
 * Class that implements the iterator for a linked list.
 * @param aggregate {LinkedList} The aggregate to scan.
 * @constructor
 */
function LinkedListIterator(aggregate) {
	/**
	 * The aggregate relates to this iterator.
	 * @type {LinkedList}
	 */
	this.aggregate = aggregate;

	/**
	 * The pointer to the position.
	 * @type {Node|null}
	 */
	this.pointer = null;
}

/**
 * @inheritDoc
 */
LinkedListIterator.prototype.first = function () {
	this.pointer = this.aggregate.first;
};

/**
 * @inheritDoc
 */
LinkedListIterator.prototype.next = function () {
	this.pointer = this.pointer.next;
};

/**
 * @inheritDoc
 */
LinkedListIterator.prototype.last = function () {
	this.pointer = this.aggregate.last;
};

/**
 * @inheritDoc
 */
LinkedListIterator.prototype.previous = function () {
	var node = this.pointer;
	for (this.pointer = this.first(); this.pointer.next !== node;)
		this.next();
};

/**
 * @inheritDoc
 */
LinkedListIterator.prototype.isDone = function () {
	return !this.pointer;
};

/**
 * @inheritDoc
 */
LinkedListIterator.prototype.getItem = function () {
	return this.pointer.item;
};

/**
 * Return the node stored at the position pointed by the iterator.
 * @abstract
 * @return {Node|null} The node stored or null if it's out of the bounds.
 */
LinkedListIterator.prototype.getNode = function () {
	return this.pointer;
};