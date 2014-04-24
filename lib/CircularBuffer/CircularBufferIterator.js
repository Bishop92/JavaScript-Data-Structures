/**
 * Created by Stefano on 06/04/2014.
 */

CircularBufferIterator.prototype = new Iterator();
CircularBufferIterator.prototype.constructor = CircularBufferIterator;

/**
 * Class that implements the iterator for a circular buffer.
 * @param aggregate {CircularBuffer} The aggregate to scan.
 * @constructor
 */
function CircularBufferIterator(aggregate) {
	/**
	 * The aggregate relates to this iterator.
	 * @type {CircularBuffer}
	 */
	this.aggregate = aggregate;

	/**
	 * The pointer to the position.
	 * @type {number|null}
	 */
	this.pointer = null;
	/**
	 * Discriminator for full buffer
	 * @type {bool}
	 */
	this.start = true;
}

/**
 * @inheritDoc
 */
CircularBufferIterator.prototype.first = function () {
	this.pointer = this.aggregate.tail;
	this.start = true;
};

/**
 * @inheritDoc
 */
CircularBufferIterator.prototype.next = function () {
	this.pointer = (this.pointer + 1) % this.aggregate.size;
	this.start = false;
};

/**
 * @inheritDoc
 */
CircularBufferIterator.prototype.last = function () {
	this.pointer = (this.aggregate.head - 1) % this.aggregate.size;
	this.start = true;
};

/**
 * @inheritDoc
 */
CircularBufferIterator.prototype.previous = function () {
	this.pointer = (this.pointer - 1) % this.aggregate.size;
	this.start = false;
};

/**
 * @inheritDoc
 */
CircularBufferIterator.prototype.isDone = function () {
	return (this.pointer === this.aggregate.head && !this.start) || (this.pointer === this.aggregate.tail - 1) % this.aggregate.size || this.aggregate.isEmpty();
};

/**
 * @inheritDoc
 */
CircularBufferIterator.prototype.getItem = function () {
	return this.aggregate.read(this.pointer);
};