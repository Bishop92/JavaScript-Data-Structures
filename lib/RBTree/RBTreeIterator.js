/**
 * Created by Stefano on 06/04/2014.
 */

RBTreeIterator.prototype = new Iterator();
RBTreeIterator.prototype.constructor = RBTreeIterator;

/**
 * Class that implements the iterator for a red-black tree.
 * @param aggregate {RBTree} The aggregate to scan.
 * @constructor
 */
function RBTreeIterator(aggregate) {
	/**
	 * The aggregate relates to this iterator.
	 * @type {RBTree}
	 */
	this.aggregate = aggregate;

	/**
	 * The pointer to the position.
	 * @type {RBNode|null}
	 */
	this.pointer = null;
}

/**
 * @inheritDoc
 */
RBTreeIterator.prototype.first = function () {
	this.pointer = this.aggregate.minimum();
};

/**
 * @inheritDoc
 */
RBTreeIterator.prototype.next = function () {
	this.pointer = this.aggregate.successor(this.pointer);
};

/**
 * @inheritDoc
 */
RBTreeIterator.prototype.last = function () {
	this.pointer = this.aggregate.maximum();
};

/**
 * @inheritDoc
 */
RBTreeIterator.prototype.previous = function () {
	this.pointer = this.aggregate.predecessor(this.pointer);
};

/**
 * @inheritDoc
 */
RBTreeIterator.prototype.isDone = function () {
	return !this.pointer;
};

/**
 * @inheritDoc
 */
RBTreeIterator.prototype.getItem = function () {
	return this.pointer.item;
};

/**
 * Return the node stored at the position pointed by the iterator.
 * @abstract
 * @return {RBNode|null} The node stored or null if it's out of the bounds.
 */
RBTreeIterator.prototype.getNode = function () {
	return this.pointer;
};