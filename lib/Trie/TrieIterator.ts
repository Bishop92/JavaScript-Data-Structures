/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
namespace ds
{
	export class TrieIterator implements Iterator
	{
		/**
		 * The aggregate relates to this iterator.
		 * @type {Trie}
		 */
		aggregate: Trie;

		/**
		 * The pointer to the position.
		 * @type {TNode|null}
		 */
		pointer: string = <any>null;

		/**
		 * Class that implements the iterator for a trie.
		 * @param aggregate {Trie} The aggregate to scan.
		 * @constructor
		 */
		constructor(aggregate: Trie)
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
			debugger;
			console.error("此处有bug，以下代码注释");
			// this.pointer = this.aggregate.successor(this.pointer);
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
			debugger;
			console.error("此处有bug，以下代码注释");
			// this.pointer = this.aggregate.predecessor(this.pointer);
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
			debugger;
			console.error("此处有bug，以下代码注释");
			// return this.pointer.item;
		};
	}
}