/**
 * Created by Stefano on 04/04/2014.
 */

QueueIterator.prototype = new Iterator();
QueueIterator.prototype.constructor = QueueIterator;

/**
 * Class that implements the iterator for a linked list.
 * @param aggregate {Queue} The aggregate to scan.
 * @constructor
 */
function QueueIterator(aggregate) {
	/**
	 * The aggregate relates to this iterator.
	 * @type {Queue}
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
QueueIterator.prototype.first = function () {
	this.pointer = 0;
};

/**
 * @inheritDoc
 */
QueueIterator.prototype.next = function () {
	this.pointer++;
};

/**
 * @inheritDoc
 */
QueueIterator.prototype.last = function () {
	this.pointer = this.aggregate.items.length - 1;
};

/**
 * @inheritDoc
 */
QueueIterator.prototype.previous = function () {
	this.pointer--;
};

/**
 * @inheritDoc
 */
QueueIterator.prototype.isDone = function () {
	return this.pointer < 0 || this.pointer > this.aggregate.items.length - 1;
};

/**
 * @inheritDoc
 */
QueueIterator.prototype.getItem = function () {
	return this.aggregate.getItem(this.pointer);
};