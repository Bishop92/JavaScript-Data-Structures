/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
namespace ds
{
	export class BTreeIterator<T> implements Iterator
	{
		/**
		 * The aggregate relates to this iterator.
		 * @type {BTree}
		 */
		aggregate: BTree<T>;

		/**
		 * The pointer to the position.
		 * @type {number}
		 */
		pointer: number = -1;

		/**
		 * Class that implements the iterator for a binary search tree.
		 * @param aggregate {BTree} The aggregate to scan.
		 * @constructor
		 */
		constructor(aggregate: BTree<T>)
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
			return this.pointer === -1;
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
}