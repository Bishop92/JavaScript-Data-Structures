/**
 * Created by Stefano on 06/04/2014.
 */

BTreeIterator.prototype = new Iterator();
BTreeIterator.prototype.constructor = BTreeIterator;

/**
 * Class that implements the iterator for a binary search tree.
 * @param aggregate {BTree} The aggregate to scan.
 * @constructor
 */
function BTreeIterator(aggregate) {
	/**
	 * The aggregate relates to this iterator.
	 * @type {BTree}
	 */
	this.aggregate = aggregate;

	/**
	 * The pointer to the position.
	 * @type {number}
	 */
	this.pointer = null;
}

/**
 * @inheritDoc
 */
BTreeIterator.prototype.first = function () {
	this.pointer = this.aggregate.minimumKey();
};

/**
 * @inheritDoc
 */
BTreeIterator.prototype.next = function () {
	this.pointer = this.aggregate.successor(this.pointer);
};

/**
 * @inheritDoc
 */
BTreeIterator.prototype.last = function () {
	this.pointer = this.aggregate.maximumKey();
};

/**
 * @inheritDoc
 */
BTreeIterator.prototype.previous = function () {
	this.pointer = this.aggregate.predecessor(this.pointer);
};

/**
 * @inheritDoc
 */
BTreeIterator.prototype.isDone = function () {
	return this.pointer === null;
};

/**
 * @inheritDoc
 */
BTreeIterator.prototype.getItem = function () {
	return this.aggregate.search(this.pointer);
};

/**
 * Return the key stored at the position pointed by the iterator.
 * @abstract
 * @return {number} The key stored or null if it's out of the bounds.
 */
BTreeIterator.prototype.getKey = function () {
	return this.pointer;
};