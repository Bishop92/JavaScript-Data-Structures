/**
 * Created by Stefano on 04/04/2014.
 */

PriorityQueueIterator.prototype = new Iterator();
PriorityQueueIterator.prototype.constructor = PriorityQueueIterator;

/**
 * Class that implements the iterator for a priority queue.
 * @param aggregate {PriorityQueue} The aggregate to scan.
 * @constructor
 */
function PriorityQueueIterator(aggregate) {
	/**
	 * The aggregate relates to this iterator.
	 * @type {PriorityQueue}
	 */
	this.aggregate = aggregate;

	/**
	 * The pointer to the position of the node.
	 * @type {RBLNode|null}
	 */
	this.pointerNode = null;
	/**
	 * The pointer to the position in the node.
	 * @type {number}
	 */
	this.pointerPosition = -1;
}

/**
 * @inheritDoc
 */
PriorityQueueIterator.prototype.first = function () {
	this.pointerNode = this.aggregate.items.maximum();
	this.pointerPosition = 0;
};

/**
 * @inheritDoc
 */
PriorityQueueIterator.prototype.next = function () {
	this.pointerPosition++;
	if (this.pointerPosition > this.pointerNode.item.getLength() - 1) {
		this.pointerNode = this.pointerNode.previous;
		this.pointerPosition = 0;
	}
};

/**
 * @inheritDoc
 */
PriorityQueueIterator.prototype.last = function () {
	this.pointerNode = this.aggregate.items.minimum();
	this.pointerPosition = this.pointerNode.item.getLength() - 1;
};

/**
 * @inheritDoc
 */
PriorityQueueIterator.prototype.previous = function () {
	this.pointerPosition--;
	if (this.pointerPosition < 0) {
		this.pointerNode = this.pointerNode.next;
		if (this.pointerNode)
			this.pointerPosition = this.pointerNode.item.getLength() - 1;
	}
};

/**
 * @inheritDoc
 */
PriorityQueueIterator.prototype.isDone = function () {
	return !this.pointerNode;
};

/**
 * @inheritDoc
 */
PriorityQueueIterator.prototype.getItem = function () {
	return this.pointerNode.item.items[this.pointerPosition];
};