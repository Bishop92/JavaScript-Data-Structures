/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
namespace ds
{
	export class RBTreeIterator<T> implements Iterator
	{
		/**
		 * The aggregate relates to this iterator.
		 * @type {RBTree}
		 */
		aggregate: RBTree<T>;

		/**
		 * The pointer to the position.
		 * @type {RBNode|null}
		 */
		pointer: RBNode<T> = <any>null;
		/**
		 * Class that implements the iterator for a red-black tree.
		 * @param aggregate {RBTree} The aggregate to scan.
		 * @constructor
		 */
		constructor(aggregate: RBTree<T>)
		{
			this.aggregate = aggregate;
			this.pointer = <any>null;
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