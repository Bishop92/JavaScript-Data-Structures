/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
namespace ds
{
	export class PriorityQueue extends Aggregate
	{
		/**
		 * The list of the items in the queue.
		 * @type {RBTreeList}
		 */
		items: RBTreeList;
		/**
		 * The length of the queue.
		 * @type {number}
		 */
		length = 0;

		/**
		 * Class for managing a priority queue.
		 * @constructor
		 */
		constructor()
		{
			super()
			this.items = new RBTreeList();
			this.length = 0;
		}


		/**
		 * @inheritDoc
		 */
		getIterator()
		{
			return new PriorityQueueIterator(this);
		};

		/**
		 * Add the item at the tail of the queue.
		 * @param priority {number} The priority of the item.
		 * @param item {*} The item to add.
		 * @return {void}
		 */
		enqueue(priority, item)
		{
			var queue = this.items.search(priority);
			if (!queue)
			{
				queue = new Queue();
				this.items.insert(priority, queue);
			}
			queue.enqueue(item);
			this.length++;
		};

		/**
		 * Adds the items with the same priority at the tail of the queue.
		 * @param priority {number} The priority of the items.
		 * @param items {Array<*>} The items to add.
		 * @return {void}
		 */
		multiEnqueue(priority, items)
		{
			for (var i = 0; i < items.length; i++)
				this.enqueue(priority, items[i]);
		};

		/**
		 * Remove the item at the head of the queue.
		 * @return {*} The item at the head of the queue. It's undefined if the queue is empty.
		 */
		dequeue()
		{
			var node = this.items.maximum();
			var item = undefined;
			if (node)
			{
				var queue = node.item;
				item = queue.dequeue();
				if (queue.isEmpty())
					this.items.deleteNode(node);
				this.length--;
			}
			return item;
		};

		/**
		 * Removes the items at the head of the queue.
		 * @param times {number} The number of times to repeat the dequeue method.
		 * @return {Array<*>} The items at the head of the queue.
		 */
		multiDequeue(times)
		{
			var items = [];
			for (var i = 0; i < times && this.length; i++)
				items.push(this.dequeue());
			return items;
		};

		/**
		 * Removes the first length items from the position index.
		 * @param index {number} The position where to start to remove the items.
		 * @param [length = 1] {number} The number of items to remove.
		 * @return {void}
		 */
		remove(index, length?)
		{
			length = length || 1;
			var it = this.items.getIterator();
			for (it.last(); !it.isDone() && length > 0; it.previous())
			{
				var queue = it.getItem();
				if (index > -1 && index < queue.getLength())
				{
					var oldLength = queue.getLength();
					queue.remove(index, length);
					length -= oldLength - index;
					index = 0;
					if (!queue.getLength())
						this.items.deleteNode(it.getNode());
				} else
					index = index - queue.getLength();
			}
		};

		/**
		 * Return the item at the position index.
		 * @param index {number} The index of the item.
		 * @return {*} The item found. It's undefined if the position index is out of bounds.
		 */
		getItem(index)
		{
			var it = this.items.getIterator();
			for (it.last(); !it.isDone(); it.previous())
			{
				var queue = it.getItem();
				if (index > -1 && index < queue.getLength())
					return queue.getItem(index);
				index = index - queue.getLength();
			}
			return undefined;
		};

		/**
		 * Return the items relatives to the priority.
		 * @param priority {number} The priority of the items.
		 * @return {Array<*>} The items found.
		 */
		getItems(priority)
		{
			var items = this.items.search(priority);
			if (items)
				return items.items;
			return [];
		};

		/**
		 * Return the first item in the queue. The item is not removed.
		 * @return {*} The first item. It's undefined if the queue is empty.
		 */
		peek()
		{
			return this.items.maximum().item.peek();
		};

		/**
		 * Return the length of the queue.
		 * @return {number} The length of the queue.
		 */
		getLength()
		{
			return this.length;
		};

		/**
		 * Checks if the queue is empty.
		 * @return {boolean} True if the queue is empty, false otherwise.
		 */
		isEmpty()
		{
			return !this.length;
		};

		/**
		 * Removes all the items stored in the queue.
		 * @return {void}
		 */
		clear()
		{
			this.items = new RBTreeList();
			this.length = 0;
		};

		/**
		 * Checks if the queue contains a priority that satisfy the condition represented by the callback function.
		 * @param priority {number} The priority to find.
		 * @param [callback = function(p){return(p===priority);}] The condition to satisfy. The callback must accept the current priority to check.
		 * @return {boolean} True if the queue contains the priority that satisfy the condition, false otherwise.
		 */
		containsPriority(priority, callback?)
		{
			if (callback)
				return this.items.fullContains(callback);
			else
				return this.items.contains(priority);
		};

		/**
		 * Return the queue created by the priority queue with the items in the same order but without the priority.
		 * @return {Queue} The queue created.
		 */
		toQueue()
		{
			var queue = new Queue();
			var it = this.items.getIterator();
			for (it.last(); !it.isDone(); it.previous())
			{
				var item = it.getItem();
				var itQ = item.getIterator();
				for (itQ.first(); !itQ.isDone(); itQ.next())
					queue.enqueue(itQ.getItem());
			}
			return queue;
		};

		/**
		 * Executes the callback function for each item of the queue.
		 * This method modifies the queue so if you don't need to modify it you must return the same item of the array.
		 * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
		 * @return {void}
		 */
		execute(callback)
		{
			var it = this.items.getIterator();
			for (it.last(); !it.isDone(); it.previous())
				it.getItem().execute(callback);
		};

		/**
		 * Change the priority of the item at the position index.
		 * @param index {number} The position of the item of which increase the priority.
		 * @param newPriority {number} The new priority.
		 * @return {void}
		 */
		changePriority(index, newPriority)
		{
			var item = this.getItem(index);
			this.remove(index);
			this.enqueue(newPriority, item);
		};

		/**
		 * Returns the items that satisfy the condition determined by the callback.
		 * @param callback {function} The function that implements the condition.
		 * @return {Array<*>} The array that contains the items that satisfy the condition.
		 */
		filter(callback)
		{
			var result = [];
			var it = this.items.getIterator();
			for (it.last(); !it.isDone(); it.previous())
			{
				var itQ = it.getItem().getIterator();
				for (itQ.first(); !itQ.isDone(); itQ.next())
				{
					if (callback(itQ.getItem()))
						result.push(itQ.getItem());
				}
			}
			return result;
		};

		/**
		 * Clones the queue into a new queue.
		 * @return {PriorityQueue} The queue cloned from this queue.
		 */
		clone()
		{
			var queue = new PriorityQueue();
			queue.items = this.items.clone();
			queue.length = this.length;
			return queue;
		};

		/**
		 * Clones the queue into a new queue without cloning duplicated items.
		 * @return {PriorityQueue} The queue cloned from this queue.
		 */
		cloneDistinct()
		{
			var queue = new PriorityQueue();
			queue.items = this.items.cloneDistinct();
			queue.length = queue.items.getSize();
			return queue;
		};

	}
}