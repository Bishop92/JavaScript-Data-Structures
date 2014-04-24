/**
 * Created by Stefano on 06/04/2014.
 */

BSTreeIterator.prototype = new Iterator();
BSTreeIterator.prototype.constructor = BSTreeIterator;

/**
 * Class that implements the iterator for a binary search tree.
 * @param aggregate {BSTree} The aggregate to scan.
 * @constructor
 */
function BSTreeIterator(aggregate) {
	/**
	 * The aggregate relates to this iterator.
	 * @type {BSTree}
	 */
	this.aggregate = aggregate;

	/**
	 * The pointer to the position.
	 * @type {BSNode|null}
	 */
	this.pointer = null;
}

/**
 * @inheritDoc
 */
BSTreeIterator.prototype.first = function () {
	this.pointer = this.aggregate.minimum();
};

/**
 * @inheritDoc
 */
BSTreeIterator.prototype.next = function () {
	this.pointer = this.aggregate.successor(this.pointer);
};

/**
 * @inheritDoc
 */
BSTreeIterator.prototype.last = function () {
	this.pointer = this.aggregate.maximum();
};

/**
 * @inheritDoc
 */
BSTreeIterator.prototype.previous = function () {
	this.pointer = this.aggregate.predecessor(this.pointer);
};

/**
 * @inheritDoc
 */
BSTreeIterator.prototype.isDone = function () {
	return !this.pointer;
};

/**
 * @inheritDoc
 */
BSTreeIterator.prototype.getItem = function () {
	return this.pointer.item;
};

/**
 * Return the node stored at the position pointed by the iterator.
 * @abstract
 * @return {BSNode|null} The node stored or null if it's out of the bounds.
 */
BSTreeIterator.prototype.getNode = function () {
	return this.pointer;
};