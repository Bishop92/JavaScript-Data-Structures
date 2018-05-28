/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
namespace ds
{
	export class Queue<T> extends Aggregate
	{
		/**
		 * The list of the items in the queue.
		 * @type {Array<*>}
		 */
		items: T[] = [];

		/**
		 * Decreases dequeue big O complexity by shifting starting indexs
		 * for each dequeue, instead of splicing.
		 * @type {int} 
		 */
		offsetIndex = 0;

		/**
		 * Class for managing a queue.
		 * @param {...*} [args] The items for initializing the queue.
		 * @constructor
		 */
		constructor(...args: any[])
		{
			super();
			this.items = [];

			this.offsetIndex = 0;

			if (args && args.length == 1 && args[0] instanceof Array)
			{
				//builds the list from the range passed from the constructor
				this.multiEnqueue(args[0]);
			} else
			{
				//builds the list from the parameters of the constructor
				this.multiEnqueue(args);
			}
		}

		/**
		 * @inheritDoc
		 */
		getIterator()
		{
			return new QueueIterator<T>(this);
		};

		/**
		 * Adds the item at the tail of the queue.
		 * @param item {*} The item to add.
		 * @return {void}
		 */
		enqueue(item: T)
		{
			this.items.push(item);
		};

		/**
		 * Adds the items at the tail of the queue.
		 * @param items {Array<*>} The items to add.
		 * @return {void}
		 */
		multiEnqueue(items: T[])
		{
			for (var i = 0; i < items.length; i++)
				this.items.push(items[i]);
		};

		/**
		 * Removes the item at the head of the queue.
		 * @return {*} The item at the head of the queue. It's undefined if the queue is empty.
		 */
		dequeue()
		{
			if (!(this.items.length - this.offsetIndex))
				return undefined;

			var dequeued = this.items[this.offsetIndex]; // holds the value, for cases that purge occurs
			this.offsetIndex++;
			/**
			 * Automatically purge unneeded (already dequeued) 
			 * indexs from the array when they take up 
			 * more than one half the array
			 */
			if (this.offsetIndex >= this.items.length / 2)
			{
				this.purge();
			}

			return dequeued; //return dequeued item
		};

		/**
		 * Removes the items at the head of the queue.
		 * @param times {number} The number of times to repeat the dequeue method.
		 * @return {Array<*>} The items at the head of the queue.
		 */
		multiDequeue(times: number)
		{
			var dequeued = []; // Holds variables that have been removed from the array
			// Dequeue the desired number of items
			console.log('items', this.items);
			for (var i = 0; (i < times && this.items.length - this.offsetIndex > 0); i++)
			{
				console.log('calleds');
				dequeued.push(this.dequeue());
			}

			return dequeued; //removes the last times item and returns the array
		};

		/**
		 * Clears array indexs hidden by offset. To free up memory
		 * @return {void}
		 */
		purge()
		{
			this.items.splice(0, this.offsetIndex);
			this.offsetIndex = 0;
		}

		/**
		 * Removes the first length items from the position index.
		 * @param index {number} The position where to start to remove the items.
		 * @param [length = 1] {number} The number of items to remove.
		 * @return {void}
		 */
		remove(index: number, length?: number)
		{
			length = length || 1;
			this.items.splice(index, length);
		};

		/**
		 * Returns the item at the position index.
		 * @param index {number} The position of the item.
		 * @return {*} The item at the position. It's undefined if index isn't in the queue bounds.
		 */
		getItem(index: number): T
		{
			// take offsetIndex into account
			var index = index + this.offsetIndex;
			if (index < 0 || index > this.items.length - 1 - this.offsetIndex)
				return <any>undefined;
			return this.items[index];
		};

		/**
		 * Returns the first item in the queue. The item is not removed.
		 * @return {*} The first item. It's undefined if the queue is empty.
		 */
		peek()
		{
			if (this.items.length - this.offsetIndex)
				return this.items[this.offsetIndex];
			return undefined
		};

		/**
		 * Removes all the items stored in the queue.
		 * @return {void}
		 */
		clear()
		{
			this.items = [];
		};

		/**
		 * Checks if the queue contains an item that satisfy the condition represented by the callback function.
		 * @param item {*} The item to find.
		 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
		 * @return {boolean} True if the queue contains the item that satisfy the condition, false otherwise.
		 */
		contains(item: T, callback?: (item: T) => boolean)
		{
			callback = callback || function (it)
			{
				return it === item;
			};
			var i = this.offsetIndex;
			while (i < this.items.length && !callback(this.items[i]))
				i++;
			return i < this.items.length;
		};

		/**
		 * Executes the callback function for each item of the queue.
		 * This method modifies the queue so if you don't need to modify it you must return the same item of the array.
		 * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
		 * @return {void}
		 */
		execute(callback: (item: T) => T)
		{
			for (var i = this.offsetIndex; i < this.items.length; i++)
				this.items[i] = callback(this.items[i]);
		};

		/**
		 * Returns the length of the queue.
		 * @return {number} The length of the queue.
		 */
		getLength()
		{
			return this.items.length - this.offsetIndex;
		};

		/**
		 * Checks if the queue is empty.
		 * @return {boolean} True if the queue is empty, false otherwise.
		 */
		isEmpty()
		{
			return !(this.items.length - this.offsetIndex);
		};

		/**
		 * Returns the items that satisfy the condition determined by the callback.
		 * @param callback {function} The function that implements the condition.
		 * @return {Array<*>} The array that contains the items that satisfy the condition.
		 */
		filter(callback: (item: T) => boolean)
		{
			var result = [];
			for (var i = this.offsetIndex; i < this.items.length; i++)
				if (callback(this.items[i]))
					result.push(this.items[i]);
			return result;
		};

		/**
		 * Returns the first position of the item in the queue.
		 * @param item {*} The item to search.
		 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
		 * @return {number} The first position of the item.
		 */
		indexOf(item: T, callback?: (item: T) => boolean)
		{
			callback = callback || function (it)
			{
				return it === item;
			};
			var i = this.offsetIndex;
			while (i < this.items.length)
			{
				if (callback(this.items[i]))
					return i - this.offsetIndex;
				i++;
			}
			return -1;
		};

		/**
		 * Returns the last position of the item in the queue.
		 * @param item {*} The item to search.
		 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
		 * @return {number} The last position of the item.
		 */
		lastIndexOf(item: T, callback?: (item: T) => boolean)
		{
			callback = callback || function (it)
			{
				return it === item;
			};
			var i = this.items.length - 1;
			while (i > this.offsetIndex - 1)
			{
				console.log('l', this.offsetIndex);
				if (callback(this.items[i]))
					return i - this.offsetIndex;
				i--;
			}
			return -1;
		};

		/**
		 * Returns all the position in which the item has been found in the queue.
		 * @param item {*} The item to search.
		 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
		 * @return {Array<number>} The positions in which the item has been found.
		 */
		allIndexesOf(item: T, callback?: (item: T) => boolean)
		{
			callback = callback || function (it)
			{
				return it === item;
			};
			var i = this.offsetIndex;
			var indexes = [];
			while (i < this.items.length)
			{
				if (callback(this.items[i]))
					indexes.push(i - this.offsetIndex);
				i++;
			}
			return indexes;
		};

		/**
		 * Clones the queue into a new queue.
		 * @return {Queue} The queue cloned from this queue.
		 */
		clone()
		{
			var queue = new Queue<T>();
			for (var i = this.offsetIndex; i < this.items.length; i++)
			{
				var item: any = this.items[i];
				if (item.clone)
					queue.enqueue(item.clone());
				else
					queue.enqueue(item);
			}

			return queue;
		};

		/**
		 * Clones the queue into a new queue without cloning duplicated items.
		 * @return {Queue} The queue cloned from this queue.
		 */
		cloneDistinct()
		{
			var queue = new Queue<T>();
			for (var i = this.offsetIndex; i < this.items.length; i++)
				if (!queue.contains(this.items[i]))
				{
					var item: any = this.items[i];
					if (item.cloneDistinct)
						queue.enqueue(item.cloneDistinct());
					else if (item.clone)
						queue.enqueue(item.clone());
					else
						queue.enqueue(item);
				}

			return queue;
		};
	}

}