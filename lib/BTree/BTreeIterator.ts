/**
 * Created by Stefano on 06/04/2014.
 */

class BTreeIterator implements Iterator
{
	/**
	 * The aggregate relates to this iterator.
	 * @type {BTree}
	 */
	aggregate;

	/**
	 * The pointer to the position.
	 * @type {number}
	 */
	pointer = null;

	/**
	 * Class that implements the iterator for a binary search tree.
	 * @param aggregate {BTree} The aggregate to scan.
	 * @constructor
	 */
	constructor(aggregate)
	{
		this.aggregate = aggregate;
	}

	/**
	 * @inheritDoc
	 */
	first()
	{
		this.pointer = this.aggregate.minimumKey();
	};

	/**
	 * @inheritDoc
	 */
	next()
	{
		this.pointer = this.aggregate.successor(this.pointer);
	}

	/**
	 * @inheritDoc
	 */
	last()
	{
		this.pointer = this.aggregate.maximumKey();
	};

	/**
	 * @inheritDoc
	 */
	previous()
	{
		this.pointer = this.aggregate.predecessor(this.pointer);
	};

	/**
	 * @inheritDoc
	 */
	isDone()
	{
		return this.pointer === null;
	};

	/**
	 * @inheritDoc
	 */
	getItem()
	{
		return this.aggregate.search(this.pointer);
	};

	/**
	 * Return the key stored at the position pointed by the iterator.
	 * @abstract
	 * @return {number} The key stored or null if it's out of the bounds.
	 */
	getKey()
	{
		return this.pointer;
	};
}
