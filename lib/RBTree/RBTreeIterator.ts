/**
 * Created by Stefano on 06/04/2014.
 */
namespace ds
{
	export class RBTreeIterator implements Iterator
	{
		/**
		 * The aggregate relates to this iterator.
		 * @type {RBTree}
		 */
		aggregate;

		/**
		 * The pointer to the position.
		 * @type {RBNode|null}
		 */
		pointer = null;
		/**
		 * Class that implements the iterator for a red-black tree.
		 * @param aggregate {RBTree} The aggregate to scan.
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
			this.pointer = this.aggregate.minimum();
		};

		/**
		 * @inheritDoc
		 */
		next()
		{
			this.pointer = this.aggregate.successor(this.pointer);
		};

		/**
		 * @inheritDoc
		 */
		last()
		{
			this.pointer = this.aggregate.maximum();
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
		 * @return {RBNode|null} The node stored or null if it's out of the bounds.
		 */
		getNode()
		{
			return this.pointer;
		};
	}
}