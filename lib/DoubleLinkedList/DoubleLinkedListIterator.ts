/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
namespace ds
{
	export class DoubleLinkedListIterator<T> implements Iterator
	{
		/**
		 * The aggregate relates to this iterator.
		 * @type {DoubleLinkedList}
		 */
		aggregate: DoubleLinkedList<T>;

		/**
		 * The pointer to the position.
		 * @type {Node|null}
		 */
		pointer: DLLNode<T> = <any>null;

		/**
		 * Class that implements the iterator for a double linked list.
		 * @param aggregate {DoubleLinkedList} The aggregate to scan.
		 * @constructor
		 */
		constructor(aggregate: DoubleLinkedList<T>)
		{
			this.aggregate = aggregate;
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
		 * @return {Node|null} The node stored or null if it's out of the bounds.
		 */
		getNode()
		{
			return this.pointer;
		};
	}

}