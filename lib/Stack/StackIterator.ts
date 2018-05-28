/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
namespace ds
{
	export class StackIterator<T> implements Iterator
	{
		/**
		 * The aggregate relates to this iterator.
		 * @type {Stack}
		 */
		aggregate: Stack<T>;

		/**
		 * The pointer to the position.
		 * @type {number}
		 */
		pointer = -1;
		/**
		 * Class that implements the iterator for a linked list.
		 * @param aggregate {Stack} The aggregate to scan.
		 * @constructor
		 */
		constructor(aggregate: Stack<T>)
		{
			this.aggregate = aggregate;
			this.pointer = -1;
		}

		/**
		 * @inheritDoc
		 */
		first()
		{
			this.pointer = this.aggregate.items.length - 1;
		};

		/**
		 * @inheritDoc
		 */
		next()
		{
			this.pointer--;
		};

		/**
		 * @inheritDoc
		 */
		last()
		{
			this.pointer = 0;
		};

		/**
		 * @inheritDoc
		 */
		previous()
		{
			this.pointer++;
		};

		/**
		 * @inheritDoc
		 */
		isDone()
		{
			return this.pointer < 0 || this.pointer > this.aggregate.items.length - 1;
		};

		/**
		 * @inheritDoc
		 */
		getItem()
		{
			return this.aggregate.items[this.pointer];
		};
	}
}