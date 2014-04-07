/**
 * Created by Stefano on 06/04/2014.
 */

RBTreeListIterator.prototype = new Iterator();
RBTreeListIterator.prototype.constructor = RBTreeListIterator;

/**
 * Class that implements the iterator for a red-black tree.
 * @param aggregate {RBTreeList} The aggregate to scan.
 * @constructor
 */
function RBTreeListIterator(aggregate) {
	/**
	 * The aggregate relates to this iterator.
	 * @type {RBTreeList}
	 */
	this.aggregate = aggregate;
	/**
	 * The pointer to the position.
	 * @type {RBLNode|null}
	 */
	this.pointer = null;
}

/**
 * @inheritDoc
 */
RBTreeListIterator.prototype.first = function () {
	this.pointer = this.aggregate.first;
};

/**
 * @inheritDoc
 */
RBTreeListIterator.prototype.next = function () {
	this.pointer = this.pointer.next;
};

/**
 * @inheritDoc
 */
RBTreeListIterator.prototype.last = function () {
	this.pointer = this.aggregate.last;
};

/**
 * @inheritDoc
 */
RBTreeListIterator.prototype.previous = function () {
	this.pointer = this.pointer.previous;
};

/**
 * @inheritDoc
 */
RBTreeListIterator.prototype.isDone = function () {
	return !this.pointer;
};

/**
 * @inheritDoc
 */
RBTreeListIterator.prototype.getItem = function () {
	return this.pointer.item;
};

/**
 * Return the node stored at the position pointed by the iterator.
 * @abstract
 * @return {RBNode|null} The node stored or null if it's out of the bounds.
 */
RBTreeListIterator.prototype.getNode = function () {
	return this.pointer;
};