/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
namespace ds
{
	export class RBTreeListIterator implements Iterator
	{
		/**
		 * The aggregate relates to this iterator.
		 * @type {RBTreeList}
		 */
		aggregate;
		/**
		 * The pointer to the position.
		 * @type {RBLNode|null}
		 */
		pointer = null;

		/**
		 * Class that implements the iterator for a red-black tree.
		 * @param aggregate {RBTreeList} The aggregate to scan.
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
			this.pointer = this.pointer.previous;
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