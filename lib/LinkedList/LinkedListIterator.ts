/**
 * Created by Stefano on 04/04/2014.
 */
class LinkedListIterator implements Iterator
{
	/**
	 * The aggregate relates to this iterator.
	 * @type {LinkedList}
	 */
	aggregate;

	/**
	 * The pointer to the position.
	 * @type {Node|null}
	 */
	pointer = null;

	/**
	 * Class that implements the iterator for a linked list.
	 * @param aggregate {LinkedList} The aggregate to scan.
	 * @constructor
	 */
	constructor(aggregate)
	{
		this.aggregate = aggregate;
		this.pointer = null;
	}

	/**
	 * @inheritDoc
	 */
	first()
	{
		this.pointer = this.aggregate.first;
	};

	/**
	 * @inheritDoc
	 */
	next()
	{
		this.pointer = this.pointer.next;
	};

	/**
	 * @inheritDoc
	 */
	last()
	{
		this.pointer = this.aggregate.last;
	};

	/**
	 * @inheritDoc
	 */
	previous()
	{
		var node = this.pointer;
		for (this.pointer = this.first(); this.pointer.next !== node;)
			this.next();
	};

	/**
	 * @inheritDoc
	 */
	isDone()
	{
		return !this.pointer;
	};

	/**
	 * @inheritDoc
	 */
	getItem()
	{
		return this.pointer.item;
	};

	/**
	 * Return the node stored at the position pointed by the iterator.
	 * @abstract
	 * @return {Node|null} The node stored or null if it's out of the bounds.
	 */
	getNode()
	{
		return this.pointer;
	};

}
