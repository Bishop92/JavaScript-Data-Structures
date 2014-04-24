/**
 * Created by Stefano on 04/04/2014.
 */

StackIterator.prototype = new Iterator();
StackIterator.prototype.constructor = StackIterator;

/**
 * Class that implements the iterator for a linked list.
 * @param aggregate {Stack} The aggregate to scan.
 * @constructor
 */
function StackIterator(aggregate) {
	/**
	 * The aggregate relates to this iterator.
	 * @type {Stack}
	 */
	this.aggregate = aggregate;

	/**
	 * The pointer to the position.
	 * @type {number}
	 */
	this.pointer = -1;
}

/**
 * @inheritDoc
 */
StackIterator.prototype.first = function () {
	this.pointer = this.aggregate.items.length - 1;
};

/**
 * @inheritDoc
 */
StackIterator.prototype.next = function () {
	this.pointer--;
};

/**
 * @inheritDoc
 */
StackIterator.prototype.last = function () {
	this.pointer = 0;
};

/**
 * @inheritDoc
 */
StackIterator.prototype.previous = function () {
	this.pointer++;
};

/**
 * @inheritDoc
 */
StackIterator.prototype.isDone = function () {
	return this.pointer < 0 || this.pointer > this.aggregate.items.length - 1;
};

/**
 * @inheritDoc
 */
StackIterator.prototype.getItem = function () {
	return this.aggregate.items[this.pointer];
};