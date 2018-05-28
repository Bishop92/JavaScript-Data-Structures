/**
 * Created by Stefano on 31/03/14.
 */
class LLNode
{
	/**
	 * The item stored.
	 * @type {*}
	 */
	item;
	/**
	 * The next node. It's null if there's no a next node.
	 * @type {LLNode|null}
	 */
	next = null;

	/**
	 * The single node of the list.
	 * @param item {*} The item to store in the node.
	 * @constructor
	 */
	constructor(item)
	{
		this.item = item;
	}
}

class LinkedList extends Aggregate
{

	/**
	 * The first node of the list.
	 * @type {LLNode|null}
	 */
	first = null;
	/**
	 * The last node of the list.
	 * @type {LLNode|null}
	 */
	last = null;
	/**
	 * The length of the list.
	 * @type {number}
	 */
	length = 0;

	/**
	 * Class for managing a linked list.
	 * @param {...*} [args] The items for initializing the list.
	 * @constructor
	 */
	constructor(...args)
	{
		super();
		this.first = null;
		this.last = null;
		this.length = 0;

		if (args && args.length)
		{
			//builds the list from the range passed from the constructor
			this.fromArray(args);
		} else
		{
			//builds the list from the parameters of the constructor
			this.fromArray(arguments);
		}
	}


	/**
	 * @inheritDoc
	 */
	getIterator()
	{
		return new LinkedListIterator(this);
	};

	/**
	 * Adds an item at the head of the list.
	 * @param item {*} The item to add.
	 * @return {void}
	 */
	pushFront(item)
	{
		var node = new LLNode(item);
		node.next = this.first;
		this.first = node;
		if (!this.last)
			this.last = node;
		this.length++;
	};

	/**
	 * Adds an item at the tail of the list.
	 * @param item {*} The item to add.
	 * @return {void}
	 */
	pushBack(item)
	{
		var node = new LLNode(item);
		if (this.last)
			this.last.next = node;
		else
			this.first = node;
		this.last = node;
		this.length++;
	};

	/**
	 * Removes the first item of the list.
	 * @return {*} The item removed. It's undefined if the list is empty.
	 */
	popFront()
	{
		if (this.length)
		{
			var node = this.first;
			this.first = this.first.next;
			this.length--;
			node.next = null;
			return node.item;
		}
		return undefined;
	};

	/**
	 * Removes the last item of the list.
	 * @return {*} The item removed. It's undefined if the list is empty.
	 */
	popBack()
	{
		if (this.length)
		{
			var node = this.last;
			var next = this.first;
			while (next.next && next.next.next)
			{
				next = next.next;
			}
			if (node === next)
				this.last = null;
			else
				this.last = next;
			next.next = null;
			this.length--;
			return node.item;
		}
		return undefined;
	};

	/**
	 * Removes the first times items of the list.
	 * @param times {number} The number of times to repeat the popFront method.
	 * @return {*} The item removed. It's undefined if the list is empty.
	 */
	multiPopFront(times)
	{
		var result = [];
		for (var i = 0; i < times && this.length; i++)
			result.push(this.popFront());
		return result;
	};

	/**
	 * Removes the last times items of the list.
	 * @param times {number} The number of times to repeat the popBack method.
	 * @return {*} The items removed.
	 */
	multiPopBack(times)
	{
		var result = [];
		for (var i = 0; i < times && this.length; i++)
			result.push(this.popBack());
		return result;
	};

	/**
	 * Returns the first item of the list without remove it.
	 * @return {*} The item at the top of the list. It's undefined if the list is empty.
	 */
	peek()
	{
		if (!this.length)
			return undefined;
		return this.first.item;
	};

	/**
	 * Add the item at the index position.
	 * @param item {*} The item to add.
	 * @param index {number} The position where to add the item. If index is negative, the item won't be added.
	 * @return {void}
	 */
	addAt(item, index)
	{
		if (index < 0)
			return;
		if (!index)
		{
			this.pushFront(item);
			return;
		}
		if (index === this.length)
		{
			this.pushBack(item);
			return;
		}
		var node = this.first;
		if (!node && index > 0)
			this.pushBack(undefined);
		for (var i = 0; i < index - 1; i++ , node = node.next)
		{
			if (node === this.last)
				this.pushBack(undefined);
		}
		if (node === this.last)
			this.pushBack(item);
		else if (node === this.first)
			this.pushFront(item);
		else
		{
			var newNode = new LLNode(item);
			newNode.next = node.next;
			node.next = newNode;
			this.length++;
		}
	};

	/**
	 * Removes the item at the index position.
	 * @param index {number} The position of the item to remove.
	 * @return {*} The item stored at the position index. It's undefined if the index is out of bounds.
	 */
	removeAt(index)
	{
		if (index < 0 || index > this.length - 1)
			return undefined;
		if (index === 0)
			return this.popFront();
		if (index === this.length - 1)
			return this.popBack();
		var node = this.first;
		for (; index > 1; index--)
			node = node.next;
		//now node is the node before the node to remove
		//node to remove
		var next = node.next;
		node.next = next.next;
		this.length--;
		return next.item;
	};

	/**
	 * Removes the item from the list.
	 * @param item {*} The item to remove.
	 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
	 * @return {void}
	 */
	remove(item, callback)
	{
		callback = callback || function (it)
		{
			return it === item;
		};
		var node = this.first;
		var previous = null;
		while (node)
		{
			if (callback(node.item))
			{
				if (node === this.first)
					this.first = node.next;
				if (node === this.last)
					this.last = previous;
				if (previous)
					previous.next = node.next;
				return;
			}
			previous = node;
			node = node.next;
		}
	};

	/**
	 * Removes all the item from the list.
	 * @param item {*} The item to remove.
	 * @param [callback (item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
	 * @return {void}
	 */
	removeAll(item, callback)
	{
		callback = callback || function (it)
		{
			return it === item;
		};
		var node = this.first;
		var previous = null;
		while (node)
		{
			if (callback(node.item))
			{
				if (node === this.first)
					this.first = node.next;
				if (node === this.last)
					this.last = previous;
				if (previous)
					previous.next = node.next;
			} else
				previous = node;
			node = node.next;
		}
	};

	/**
	 * Removes all the items stored from the from position to the to position.
	 * If from > to, the method will remove all the items up to the end.
	 * @param from {number} The position where start to remove the items. The from position is included.
	 * @param to {number} The position where stop to remove the items. The to position is included.
	 * @return {Array<*>} The items removed.
	 */
	removeSegment(from, to)
	{
		var result = [];
		if (to > -1 && from < this.length)
		{
			if (from === 0)
				return this.multiPopFront(to + 1);
			if (to === this.length - 1 || from > to)
				return this.multiPopBack(Math.max(to - from, this.length - from)).reverse();
			var node = this.first;
			for (var i = 0; i < from - 1; i++)
				node = node.next;
			//now node is the node before the node to remove
			//node to remove
			var next = node.next;
			for (var j = from; j < to + 1 && j < this.length; j++)
			{
				result.push(next.item);
				next = next.next;
			}
			this.length -= Math.min(to - from + 1, this.length - from);
			node.next = next;
		}
		return result;
	};

	/**
	 * Change the item stored in the index position. If the index is out of bound, the node won't be updated.
	 * @param index {number} The position of the node to modify.
	 * @param item {*} The new item stored in the node.
	 * @return {void}
	 */
	modifyAt(index, item)
	{
		var node = this.getNode(index);
		if (node)
			node.item = item;
	};

	/**
	 * Removes all the items stored in the list.
	 * @return {void}
	 */
	clear()
	{
		this.first = null;
		this.last = null;
		this.length = 0;
	};

	/**
	 * Checks if the list contains an item that satisfy the condition represented by the callback function.
	 * @param item {*} The item to find.
	 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
	 * @return {boolean} True if the list contains the item that satisfy the condition, false otherwise.
	 */
	contains(item, callback?)
	{
		callback = callback || function (it)
		{
			return it === item;
		};
		var i = 0;
		var node = this.first;
		while (i < this.length && !callback(node.item))
		{
			i++;
			node = node.next;
		}
		return i < this.length;
	};

	/**
	 * Executes the callback function for each item of the stack.
	 * This method modifies the list so if you don't need to modify it you must return the same item of the array.
	 * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
	 * @return {void}
	 */
	execute(callback)
	{
		var node = this.first;
		while (node)
		{
			node.item = callback(node.item);
			node = node.next;
		}
	};

	/**
	 * Returns the node at the position index.
	 * @param index {number} The position of the node.
	 * @return {LLNode} The node stored at the position index. It's undefined if index isn't in the list bounds.
	 */
	getNode(index)
	{
		if (index < 0 || index > this.length - 1)
			return undefined;
		var node = this.first;
		for (; index > 0; index--)
			node = node.next;
		return node;
	};

	/**
	 * Returns the item at the position index.
	 * @param index {number} The position of the item.
	 * @return {*} The item stored at the position index. It's undefined if index isn't in the list bounds.
	 */
	getItem(index)
	{
		if (index < 0 || index > this.length - 1)
			return undefined;
		var node = this.first;
		for (; index > 0; index--)
			node = node.next;
		return node.item;
	};

	/**
	 * Transforms the list into an array.
	 * @return {Array<*>} The array built.
	 */
	toArray()
	{
		var array = [];
		for (var node = this.first, i = 0; node; node = node.next, i++)
			array[i] = node.item;
		return array;
	};

	/**
	 * Returns the length of the list.
	 * @return {Number} The length of the list.
	 */
	getLength()
	{
		return this.length;
	};

	/**
	 * Builds the list from the array.
	 * @param array {Array<*>} The array from which build the list.
	 * @return {void}
	 */
	fromArray(array)
	{
		var node = this.first;
		for (var i = 0; i < Math.min(this.length, array.length); i++ , node = node.next)
			node.item = array[i];
		if (this.length < array.length)
			for (var j = this.length; j < array.length; j++)
				this.pushBack(array[j]);
		else
			for (var k = array.length; k < this.length;)
				this.popBack();
	};

	/**
	 * Returns the items that satisfy the condition determined by the callback.
	 * @param callback {function} The function that implements the condition.
	 * @return {Array<*>} The array that contains the items that satisfy the condition.
	 */
	filter(callback)
	{
		var result = [];
		for (var node = this.first; node; node = node.next)
		{
			if (callback(node.item))
				result.push(node.item);
		}
		return result;
	};

	/**
	 * Checks if the list is empty.
	 * @return {boolean} True if the list is empty, false otherwise.
	 */
	isEmpty()
	{
		return !this.length;
	};

	/**
	 * Returns the first position of the item in the list.
	 * @param item {*} The item to search.
	 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
	 * @return {number} The first position of the item.
	 */
	indexOf(item, callback)
	{
		callback = callback || function (it)
		{
			return it === item;
		};
		var i = 0;
		var node = this.first;
		while (node)
		{
			if (callback(node.item))
				return i;
			i++;
			node = node.next;
		}
		return -1;
	};

	/**
	 * Returns the last position of the item in the list.
	 * @param item {*} The item to search.
	 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
	 * @return {number} The last position of the item.
	 */
	lastIndexOf(item, callback)
	{
		callback = callback || function (it)
		{
			return it === item;
		};
		var i = 0;
		var node = this.first;
		var index = -1;
		while (node)
		{
			if (callback(node.item))
				index = i;
			i++;
			node = node.next;
		}
		return index;
	};

	/**
	 * Returns all the position in which the item has been found in the list.
	 * @param item {*} The item to search.
	 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
	 * @return {Array<number>} The positions in which the item has been found.
	 */
	allIndexesOf(item, callback)
	{
		callback = callback || function (it)
		{
			return it === item;
		};
		var i = 0;
		var node = this.first;
		var indexes = [];
		while (node)
		{
			if (callback(node.item))
				indexes.push(i);
			i++;
			node = node.next;
		}
		return indexes;
	};

	/**
	 * Add the list at the end of this list.
	 * @param list {LinkedList} The list to join.
	 * @return {void}
	 */
	join(list)
	{
		if (this.last)
			this.last.next = list.first;
		else
			this.first = list.first;
		this.last = list.last;
		this.length += list.length;
	};

	/**
	 * Divides the list at the index position. The node at the index position is the first new node of the list.
	 * @param index {number} The position where to divide the list.
	 * @return {LinkedList} The list formed by the nodes from the index position then. If the index is out of bound, the list will be empty.
	 */
	divide(index)
	{
		var list = new LinkedList();
		if (index > -1 && index < this.length)
		{
			var node = this.first;
			var previous = null;
			for (var i = 0; i < index; i++)
			{
				previous = node;
				node = node.next;
			}
			if (node === this.first)
			{
				list.first = this.first;
				list.last = this.last;
				this.first = null;
				this.last = null;
			} else
			{
				list.first = node;
				list.last = this.last;
				this.last = previous;
				previous.next = null;
			}
			list.length = this.length - index;
			this.length = index;
		}
		return list;
	};

	/**
	 * Clones the list into a new list.
	 * @return {LinkedList} The list cloned from this list.
	 */
	clone()
	{
		var list = new LinkedList();
		var node = this.first;
		for (var i = 0; i < this.length; i++ , node = node.next)
			if (node.item.clone)
				list.pushBack(node.item.clone());
			else
				list.pushBack(node.item);
		return list;
	};

	/**
	 * Clones the list into a new list without cloning duplicated items.
	 * @return {LinkedList} The list cloned from this list.
	 */
	cloneDistinct()
	{
		var list = new LinkedList();
		var node = this.first;
		for (var i = 0; i < this.length; i++ , node = node.next)
			if (!list.contains(node.item))
				if (node.item.cloneDistinct)
					list.pushBack(node.item.cloneDistinct());
				else if (node.item.clone)
					list.pushBack(node.item.clone());
				else
					list.pushBack(node.item);
		return list;
	};

	/**
	 * Splits the list into lists of desired size.
	 * @param size {number} The size of the lists.
	 * @return {Array<LinkedList>} The lists created by splitting the list.
	 */
	split(size)
	{
		var length = this.length;
		var lists: LinkedList[] = [this];
		for (var i = size; i < length; i += size)
			lists.push(lists[lists.length - 1].divide(size));
		return lists;
	};

	/**
	 * Returns the number of items that satisfy the represented by the callback function.
	 * @param callback {function} The condition to satisfy.
	 * @return {number} The number of items that satisfy the condition.
	 */
	count(callback)
	{
		var count = 0;
		var node = this.first;
		while (node)
		{
			if (callback(node.item))
				count++;
			node = node.next;
		}
		return count;
	};

}
