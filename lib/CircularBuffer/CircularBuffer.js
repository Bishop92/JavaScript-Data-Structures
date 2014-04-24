/**
 * Created by Stefano on 31/03/14.
 */

CircularBuffer.prototype = new Aggregate();
CircularBuffer.prototype.constructor = CircularBuffer;

/**
 * Class for managing a circular buffer.
 * @param size {Number} The size of the buffer.
 * @constructor
 */
function CircularBuffer(size) {
	/**
	 * The index of the position of the head of the buffer.
	 * @type {number}
	 */
	this.head = 0;
	/**
	 * The index of the position of the tail of the buffer.
	 * @type {number}
	 */
	this.tail = 0;
	/**
	 * The items stored in the buffer.
	 * @type {Array<*>}
	 */
	this.items = new Array(size);
	/**
	 * Is true if buffer is empty, false otherwise.
	 * @type {boolean}
	 */
	this.empty = true;
	/**
	 * Is false if buffer is full, false otherwise.
	 * @type {boolean}
	 */
	this.full = false;
	/**
	 * The size of the buffer.
	 * @type {Number}
	 */
	this.size = size;
}

/**
 * @inheritDoc
 */
CircularBuffer.prototype.getIterator = function () {
	return new CircularBufferIterator(this);
};

/**
 * Write the item at the head of the buffer.
 * @param item {*} The item to write.
 * @return {void}
 */
CircularBuffer.prototype.write = function (item) {
	this.empty = false;
	if (this.full)
	//if buffer is full tail must be set forward
		this.tail = (this.tail + 1) % this.size;
	this.items[this.head] = item;
	//head is set forward
	this.head = (this.head + 1) % this.size;
	if (this.tail === this.head)
		this.full = true;
};

/**
 * Free the buffer between indexes from and to.
 * If from > to, positions between from and the end of the buffer and between the start and to will be free.
 * @param from {Number} The index from which start to free (inclusive index)
 * @param to {Number} The index where stop to free (exclusive index)
 * @return {void}
 */
CircularBuffer.prototype.free = function (from, to) {
	if (from < 0)
		from = 0;
	if (from > this.size - 1)
		from = this.size - 1;
	if (to < 0)
		to = 0;
	if (to > this.size - 1)
		to = this.size - 1;
	//if from < to then will be free allocation between from and to
	//otherwise will be free allocations between from and the end and between the start and to
	for (var i = from; i < to; i = (i + 1) % this.size)
		delete this.items[i];

	//adjust the position of the tail and of the head
	if (this.tail > from - 1 || this.tail < to)
		if (this.tail < this.head) {
			this.tail = (from - 1) % this.size;
		} else {
			this.tail = to;
		}
	if (this.head > from || this.head < to)
		if (this.tail < this.head) {
			this.head = to;
		} else {
			this.head = from;
		}
	//check if something is free
	if (from !== to)
		this.full = false;
	//free could make buffer empty
	for (var j = 0; j < this.size; j++)
		if (this.items[j] !== undefined) {
			this.empty = false;
			return;
		}
	this.empty = true;
};

/**
 * Free all the buffer.
 * @return {void}
 */
CircularBuffer.prototype.freeAll = function () {
	for (var i = 0; i < this.size; i++)
		delete this.items[i];
	this.empty = true;
	this.head = 0;
	this.tail = 0;
};

/**
 * Read the item stored at the position index.
 * @param index {Number} The position of the item to read.
 * @return {*} The item read.
 */
CircularBuffer.prototype.read = function (index) {
	return this.items[index % this.size];
};

/**
 * Return true if the buffer is empty, false otherwise.
 * @return {boolean}
 */
CircularBuffer.prototype.isEmpty = function () {
	return this.empty;
};

/**
 * Return true if the buffer is full, false otherwise.
 * @return {boolean}
 */
CircularBuffer.prototype.isFull = function () {
	return this.full;
};

/**
 * Clones the circular buffer into a new circular buffer.
 * @return {CircularBuffer} The circular buffer cloned from this circular buffer.
 */
CircularBuffer.prototype.clone = function () {
	var buffer = new CircularBuffer(this.size);
	buffer.head = this.head;
	buffer.tail = this.tail;
	for (var i = 0; i < this.items.length; i++)
		buffer.items[i] = this.items[i];
	buffer.empty = this.empty;
	buffer.full = this.full;
	return buffer;
};

/**
 * Resize the buffer.
 * @param size {number} The new size of the buffer.
 * @return {void}
 */
CircularBuffer.prototype.resize = function (size) {
	if (this.size < size) {
		if (this.head < this.tail + 1) {
			for (var i = 0; i < this.head; i++) {
				this.items[(i + this.size) % size] = this.items[i];
				delete this.items[i];
			}
			this.head = (this.head + this.size) % size;
		}
	} else if (this.size > size) {
		if (this.head < this.tail + 1) {
			//check if the tail is after the size
			var start = size;
			if (this.tail > size - 1) {
				start = this.tail;
				this.tail = 0;
			}
			//the items stored must be shift to a valid position
			var step = this.size - start;
			for (var j = this.head - step - 1; j > start - 1 || j < this.head - step; j--) {
				this.items[(j + step) % this.size] = this.items[j];
				if (!j)
					j = this.size;
			}
			this.head = (this.head + step) % this.size;
		}
	}
	this.size = size;
};