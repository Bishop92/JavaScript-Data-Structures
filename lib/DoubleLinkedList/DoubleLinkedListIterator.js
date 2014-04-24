/**
 * Created by Stefano on 04/04/2014.
 */

DoubleLinkedListIterator.prototype = new Iterator();
DoubleLinkedListIterator.prototype.constructor = DoubleLinkedListIterator;

/**
 * Class that implements the iterator for a double linked list.
 * @param aggregate {DoubleLinkedList} The aggregate to scan.
 * @constructor
 */
function DoubleLinkedListIterator(aggregate) {
	/**
	 * The aggregate relates to this iterator.
	 * @type {DoubleLinkedList}
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
DoubleLinkedListIterator.prototype.first = function () {
	this.pointer = this.aggregate.first;
};

/**
 * @inheritDoc
 */
DoubleLinkedListIterator.prototype.next = function () {
	this.pointer = this.pointer.next;
};

/**
 * @inheritDoc
 */
DoubleLinkedListIterator.prototype.last = function () {
	this.pointer = this.aggregate.last;
};

/**
 * @inheritDoc
 */
DoubleLinkedListIterator.prototype.previous = function () {
	this.pointer = this.pointer.previous;
};

/**
 * @inheritDoc
 */
DoubleLinkedListIterator.prototype.isDone = function () {
	return !this.pointer;
};

/**
 * @inheritDoc
 */
DoubleLinkedListIterator.prototype.getItem = function () {
	return this.pointer.item;
};

/**
 * Return the node stored at the position pointed by the iterator.
 * @abstract
 * @return {Node|null} The node stored or null if it's out of the bounds.
 */
DoubleLinkedListIterator.prototype.getNode = function () {
	return this.pointer;
};