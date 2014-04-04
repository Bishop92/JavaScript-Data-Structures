/**
 * Created by Stefano on 31/03/14.
 */

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
	for (; from < to; from = (from + 1) % this.size)
		delete this.items[from];
	//free could make buffer empty
	for (var i = 0; i < this.size; i++)
		if (this.items[i] !== undefined) {
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