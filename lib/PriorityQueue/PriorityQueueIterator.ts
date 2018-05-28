/**
 * Created by Stefano on 04/04/2014.
 */
class PriorityQueueIterator implements Iterator
{
	/**
	 * The aggregate relates to this iterator.
	 * @type {PriorityQueue}
	 */
	aggregate;

	/**
	 * The pointer to the position of the node.
	 * @type {RBLNode|null}
	 */
	pointerNode = null;
	/**
	 * The pointer to the position in the node.
	 * @type {number}
	 */
	pointerPosition = -1;

	/**
	 * Class that implements the iterator for a priority queue.
	 * @param aggregate {PriorityQueue} The aggregate to scan.
	 * @constructor
	 */
	constructor(aggregate)
	{
		this.aggregate = aggregate;
		this.pointerNode = null;
		this.pointerPosition = -1;
	}

	/**
	 * @inheritDoc
	 */
	first()
	{
		this.pointerNode = this.aggregate.items.maximum();
		this.pointerPosition = 0;
	};

	/**
	 * @inheritDoc
	 */
	next()
	{
		this.pointerPosition++;
		if (this.pointerPosition > this.pointerNode.item.getLength() - 1)
		{
			this.pointerNode = this.pointerNode.previous;
			this.pointerPosition = 0;
		}
	};

	/**
	 * @inheritDoc
	 */
	last()
	{
		this.pointerNode = this.aggregate.items.minimum();
		this.pointerPosition = this.pointerNode.item.getLength() - 1;
	};

	/**
	 * @inheritDoc
	 */
	previous()
	{
		this.pointerPosition--;
		if (this.pointerPosition < 0)
		{
			this.pointerNode = this.pointerNode.next;
			if (this.pointerNode)
				this.pointerPosition = this.pointerNode.item.getLength() - 1;
		}
	};

	/**
	 * @inheritDoc
	 */
	isDone()
	{
		return !this.pointerNode;
	};

	/**
	 * @inheritDoc
	 */
	getItem()
	{
		return this.pointerNode.item.items[this.pointerPosition];
	};
}
