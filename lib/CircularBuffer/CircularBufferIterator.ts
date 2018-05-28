/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
namespace ds
{

	export class CircularBufferIterator<T> implements Iterator
	{
		/**
		 * The aggregate relates to this iterator.
		 * @type {CircularBuffer}
		 */
		aggregate: CircularBuffer<T>;

		/**
		 * The pointer to the position.
		 * @type {number}
		 */
		pointer: number = -1;
		/**
		 * Discriminator for full buffer
		 * @type {bool}
		 */
		start = true;

		/**
		 * Class that implements the iterator for a circular buffer.
		 * @param aggregate {CircularBuffer} The aggregate to scan.
		 * @constructor
		 */
		constructor(aggregate: CircularBuffer<T>)
		{
			this.aggregate = aggregate;
		}

		/**
		 * @inheritDoc
		 */
		first()
		{
			this.pointer = this.aggregate.tail;
			this.start = true;
		};

		/**
		 * @inheritDoc
		 */
		next()
		{
			this.pointer = (this.pointer + 1) % this.aggregate.size;
			this.start = false;
		};

		/**
		 * @inheritDoc
		 */
		last()
		{
			this.pointer = (this.aggregate.head - 1) % this.aggregate.size;
			this.start = true;
		};

		/**
		 * @inheritDoc
		 */
		previous()
		{
			this.pointer = (this.pointer - 1) % this.aggregate.size;
			this.start = false;
		};

		/**
		 * @inheritDoc
		 */
		isDone()
		{
			var bl = (this.pointer === this.aggregate.head && !this.start) || (this.pointer === this.aggregate.tail - 1) || this.aggregate.isEmpty();
			return bl;
		};

		/**
		 * @inheritDoc
		 */
		getItem()
		{
			return this.aggregate.read(this.pointer);
		};
	}

}