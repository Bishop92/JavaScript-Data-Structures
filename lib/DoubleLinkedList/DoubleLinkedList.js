/**
 * Created by Stefano on 31/03/14.
 */

/**
 * The single node of the list.
 * @param item {*} The item to store in the node.
 * @constructor
 */
function DLLNode(item) {
	/**
	 * The item stored.
	 * @type {*}
	 */
	this.item = item;
	/**
	 * The next node. It's null if there's no a next node.
	 * @type {DLLNode|null}
	 */
	this.next = null;
	/**
	 * The previous node. It's null if there's no a previous node.
	 * @type {DLLNode|null}
	 */
	this.previous = null;
}

DoubleLinkedList.prototype = new Aggregate();
DoubleLinkedList.prototype.constructor = DoubleLinkedList;

/**
 * Class for managing a double linked list.
 * @param {...*} [args] The items for initializing the list.
 * @constructor
 */
function DoubleLinkedList(args) {
	/**
	 * The first node of the list.
	 * @type {DLLNode|null}
	 */
	this.first = null;
	/**
	 * The last node of the list.
	 * @type {DLLNode|null}
	 */
	this.last = null;
	/**
	 * The length of the list.
	 * @type {number}
	 */
	this.length = 0;

    if(args && args.length) {
        //builds the list from the range passed from the constructor
        this.fromArray(args);
    } else {
        //builds the list from the parameters of the constructor
        this.fromArray(arguments);
    }
}

/**
 * @inheritDoc
 */
DoubleLinkedList.prototype.getIterator = function () {
	return new DoubleLinkedListIterator(this);
};

/**
 * Add an item at the head of the list.
 * @param item {*} The item to add.
 * @return {void}
 */
DoubleLinkedList.prototype.pushFront = function (item) {
	var node = new DLLNode(item);
	node.next = this.first;
	this.first = node;
	//link the next node to the new node
	if (node.next)
		node.next.previous = node;
	else
		this.last = node;
	this.length++;
};

/**
 * Add an item at the tail of the list.
 * @param item {*} The item to add.
 * @return {void}
 */
DoubleLinkedList.prototype.pushBack = function (item) {
	var node = new DLLNode(item);
	node.previous = this.last;
	this.last = node;
	//link the previous node to the new node
	if (node.previous)
		node.previous.next = node;
	else
		this.first = node;
	this.length++;
};

/**
 * Remove the first item of the list.
 * @return {*} The item removed. It's undefined if the list is empty.
 */
DoubleLinkedList.prototype.popFront = function () {
	if (this.length) {
		var node = this.first;
		this.first = node.next;
		if (node.next)
			node.next.previous = null;
		this.length--;
		node.next = null;
		return node.item;
	}
	return undefined;
};

/**
 * Remove the last item of the list.
 * @return {*} The item removed. It's undefined if the list is empty.
 */
DoubleLinkedList.prototype.popBack = function () {
	if (this.length) {
		var node = this.last;
		this.last = node.previous;
		if (node.previous)
			node.previous.next = null;
		this.length--;
		node.previous = null;
		return node.item;
	}
	return undefined;
};

/**
 * Removes the first times items of the list.
 * @param times {number} The number of times to repeat the popFront method.
 * @return {*} The item removed. It's undefined if the list is empty.
 */
DoubleLinkedList.prototype.multiPopFront = function (times) {
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
DoubleLinkedList.prototype.multiPopBack = function (times) {
	var result = [];
	for (var i = 0; i < times && this.length; i++)
		result.push(this.popBack());
	return result;
};

/**
 * Returns the first item of the list without remove it.
 * @return {*} The item at the top of the list. It's undefined if the list is empty.
 */
DoubleLinkedList.prototype.peek = function () {
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
DoubleLinkedList.prototype.addAt = function (item, index) {
	if (index < -1)
		return;
	if (!index) {
		this.pushFront(item);
		return;
	}
	if (index === this.length) {
		this.pushBack(item);
		return;
	}
	var node = this.first;
	if (!node && index > 0)
		this.pushBack(undefined);
	for (var i = 0; i < index - 1; i++, node = node.next) {
		if (node === this.last)
			this.pushBack(undefined);
	}
	if (node === this.last)
		this.pushBack(item);
	else if (node === this.first)
		this.pushFront(item);
	else {
		var newNode = new DLLNode(item);
		newNode.next = node.next;
		newNode.previous = node;
		node.next = newNode;
		if (newNode.next)
			newNode.next.previous = newNode;
		this.length++;
	}
};

/**
 * Remove the item at the position index.
 * @param index {Number} The position of the item to remove.
 * @return {*} The item stored at the position index. It's undefined if the index is out of bounds.
 */
DoubleLinkedList.prototype.removeAt = function (index) {
	if (index < 0 || index > this.length - 1)
		return undefined;
	if (index === 0)
		return this.popFront();
	if (index === this.length - 1)
		return this.popBack();
	var node = this.first;
	for (; index > 0; index--)
		node = node.next;
	//now node is the node to remove
	node.previous.next = node.next;
	node.next.previous = node.previous;
	node.next = null;
	node.previous = null;
	this.length--;
	return node.item;
};

/**
 * Removes the item from the list.
 * @param item {*} The item to remove.
 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
 * @return {void}
 */
DoubleLinkedList.prototype.remove = function (item, callback) {
	callback = callback || function (it) {
		return it === item;
	};
	var node = this.first;
	var previous = null;
	while (node) {
		if (callback(node.item)) {
			if (node === this.first)
				this.first = node.next;
			if (node === this.last)
				this.last = previous;
			if (previous) {
				previous.next = node.next;
				if (node.next)
					node.next.previous = previous;
			}
			return;
		}
		previous = node;
		node = node.next;
	}
};

/**
 * Removes all the item from the list.
 * @param item {*} The item to remove.
 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
 * @return {void}
 */
DoubleLinkedList.prototype.removeAll = function (item, callback) {
	callback = callback || function (it) {
		return it === item;
	};
	var node = this.first;
	var previous = null;
	while (node) {
		if (callback(node.item)) {
			if (node === this.first)
				this.first = node.next;
			if (node === this.last)
				this.last = previous;
			if (previous) {
				previous.next = node.next;
				if (node.next)
					node.next.previous = previous;
			}
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
DoubleLinkedList.prototype.removeSegment = function (from, to) {
	var result = [];
	if (to > -1 && from < this.length) {
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
		for (var j = from; j < to + 1 && j < this.length; j++) {
			result.push(next.item);
			next = next.next;
		}
		this.length -= Math.min(to - from + 1, this.length - from);
		node.next = next;
		next.previous = node;
	}
	return result;
};

/**
 * Change the item stored in the index position. If the index is out of bound, the node won't be updated.
 * @param index {number} The position of the node to modify.
 * @param item {*} The new item stored in the node.
 * @return {void}
 */
DoubleLinkedList.prototype.modifyAt = function (index, item) {
	var node = this.getNode(index);
	if (node)
		node.item = item;
};

/**
 * Removes all the items stored in the list.
 * @return {void}
 */
DoubleLinkedList.prototype.clear = function () {
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
DoubleLinkedList.prototype.contains = function (item, callback) {
	callback = callback || function (it) {
		return it === item;
	};
	var i = 0;
	var node = this.first;
	while (i < this.length && !callback(node.item)) {
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
DoubleLinkedList.prototype.execute = function (callback) {
	var node = this.first;
	while (node) {
		node.item = callback(node.item);
		node = node.next;
	}
};

/**
 * Delete the node from the list.
 * @param node {DLLNode} The node to delete.
 * @return {void}
 */
DoubleLinkedList.prototype.deleteNode = function (node) {
	if (node === this.first) {
		this.popFront();
		return;
	}
	if (node === this.last) {
		this.popBack();
		return;
	}
	node.previous.next = node.next;
	node.next.previous = node.previous;
	this.length--;
};

/**
 * Get the node at the position index relative from the node.
 * @param index {Number} The index, relative to the node, of the node to return.
 * @param [node = first] {DLLNode} The node from which start the search.
 * @return {DLLNode} The node at the position index.
 */
DoubleLinkedList.prototype.getNode = function (index, node) {
	if (index < 0 || index > this.length - 1)
		return undefined;
	var m = Math.floor(this.length / 2);
	//if the index is less than the middle, the search start from the head of the list, otherwise from the tail of the list
	if (index < m || node) {
		node = node || this.first;
		for (; index > 0; index--)
			node = node.next;
	} else
		for (index = this.length - index - 1, node = this.last; index > 0; index--)
			node = node.previous;
	return node;
};

/**
 * Get the item at the position index.
 * @param index {Number} The position of the item.
 * @return {*}. It's undefined if index isn't in the queue bounds.
 */
DoubleLinkedList.prototype.getItem = function (index) {
	if (index < 0 || index > this.length - 1)
		return undefined;
	var node;
	var m = Math.floor(this.length / 2);
	if (index < m) //if the index is less than the middle, the search start from the head of the list, otherwise from the tail of the list
		for (node = this.first; index > 0; index--)
			node = node.next;
	else
		for (index = this.length - index - 1, node = this.last; index > 0; index--)
			node = node.previous;
	return node.item;
};

/**
 * Sort the list using web workers.
 * Using this method is discouraged. Many web browser set a limit to the maximum number of workers instantiated.
 * The items of the list, due to web workers implementation, will be serialized so they will lost own methods.
 * @return {void}
 */
DoubleLinkedList.prototype.parallelSort = function () {

	var workers = [];
	var _array = this.toArray();
	console.log(_array);

	function partialSort(_from, _to, _id) {
		if (_from < _to) {
			var m = Math.floor((_from + _to) / 2);
			var workerLeft = new Worker("DoubleLinkedList/WorkerSort.js");
			var workerRight = new Worker("DoubleLinkedList/WorkerSort.js");
			workers.push(workerLeft);
			workers.push(workerRight);
			var length = workers.length;
			workerLeft.postMessage({cmd: 'start', from: _from, to: m, worker: _id});
			workerRight.postMessage({cmd: 'start', from: m + 1, to: _to, worker: _id});
			partialSort(_from, m, length - 2);
			partialSort(m + 1, _to, length - 1);
			workerLeft.onmessage = function (event) {
				var data = event.data;
				switch (data.cmd) {
					case 'finished':
						workers[data.worker].postMessage({cmd: 'finished', array: _array});
						break;
					case 'replace':
						_array[data.index] = data.value;
						break;
				}
			};
			workerRight.onmessage = function (event) {
				var data = event.data;
				switch (data.cmd) {
					case 'finished':
						workers[data.worker].postMessage({cmd: 'finished', array: _array});
						break;
					case 'replace':
						_array[data.index] = data.value;
						break;
				}
			}
		}
	}

	var outerThis = this;

	var mainWorker = new Worker("DoubleLinkedList/WorkerSort.js");
	workers.push(mainWorker);
	mainWorker.postMessage({cmd: 'start', from: 0, to: this.length - 1, worker: -1, array: _array});
	mainWorker.onmessage = function (event) {
		var data = event.data;
		switch (data.cmd) {
			case 'finished':
				outerThis.fromArray(_array);
				console.log(outerThis);
				break;
			case 'replace':
				_array[data.index] = data.value;
		}
	};
	partialSort(0, this.length - 1, 0);
};

/**
 * Sort the list.
 * @param [callback = function(item){return(item);}] {function} The function invoked in order to get the value for the evaluation of the sort criteria.
 * @example
 * callback = function(item) {return -item.key;}
 * This function callback will return the opposite of the attribute key of the item. In this case the list will be sorted in descending order.
 * @return {void}
 */
DoubleLinkedList.prototype.sort = function (callback) {

	if (!callback)
		callback = function (item) {
			return item;
		};

	var outerThis = this;

	function partialSort(from, to, fromNode, toNode) {
		if (from < to) {
			var m = Math.floor((from + to) / 2);
			var mNode = outerThis.getNode(m - from, fromNode);
			partialSort(from, m, fromNode, mNode);
			partialSort(m + 1, to, mNode.next, toNode);
			merge(from, m, to, fromNode);
		}
	}

	function merge(from, m, to, fromNode) {
		var left = [];
		var right = [];
		var node = fromNode;
		for (var i = 0; i < m - from + 1; i++, node = node.next)
			left[i] = node.item;
		for (var j = 0; j < to - m; j++, node = node.next)
			right[j] = node.item;
		var x = 0, y = 0;
		for (var k = from; k < to + 1; k++, fromNode = fromNode.next) {
			if (y > to - m - 1 || (callback(left[x]) <= callback(right[y]) && x < m - from + 1)) {
				fromNode.item = left[x];
				x++;
			} else {
				fromNode.item = right[y];
				y++;
			}
		}
	}

	partialSort(0, this.length - 1, this.first, this.last);
};

/**
 * Transform the list into an array.
 * @return {Array<*>} The array built.
 */
DoubleLinkedList.prototype.toArray = function () {
	var array = [];
	for (var node = this.first, i = 0; node; node = node.next, i++)
		array[i] = node.item;
	return array;
};

/**
 * Returns the length of the list.
 * @return {Number} The length of the list.
 */
DoubleLinkedList.prototype.getLength = function () {
	return this.length;
};

/**
 * Build the list from the array.
 * @param array {Array<*>} The array from which build the list.
 * @return {void}
 */
DoubleLinkedList.prototype.fromArray = function (array) {
	var node = this.first;
	for (var i = 0; i < Math.min(this.length, array.length); i++, node = node.next)
		node.item = array[i];
	if (this.length < array.length)
		for (var j = this.length; j < array.length; j++)
			this.pushBack(array[j]);
	else
		for (var k = array.length; k < this.length;)
			this.popBack();
};

/**
 * Return the items that satisfy the condition determined by the callback.
 * @param callback {function} The function that implements the condition.
 * @return {Array<Object>} The array that contains the items that satisfy the condition.
 */
DoubleLinkedList.prototype.filter = function (callback) {
	var result = [];
	for (var node = this.first; node; node = node.next) {
		if (callback(node.item))
			result.push(node.item);
	}
	return result;
};

/**
 * Reverse the list. This method reverses only the items, not the nodes.
 * @return {void}
 */
DoubleLinkedList.prototype.reverse = function () {
	for (var start = this.first, end = this.last; start !== end && start.previous !== end; start = start.next, end = end.previous) {
		var item = start.item;
		start.item = end.item;
		end.item = item;
	}
};

/**
 * Checks if the list is empty.
 * @return {boolean} True if the list is empty, false otherwise.
 */
DoubleLinkedList.prototype.isEmpty = function () {
	return !this.length;
};

/**
 * Returns the first position of the item in the list.
 * @param item {*} The item to search.
 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
 * @return {number} The first position of the item.
 */
DoubleLinkedList.prototype.indexOf = function (item, callback) {
	callback = callback || function (it) {
		return it === item;
	};
	var i = 0;
	var node = this.first;
	while (node) {
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
DoubleLinkedList.prototype.lastIndexOf = function (item, callback) {
	callback = callback || function (it) {
		return it === item;
	};
	var i = this.length - 1;
	var node = this.last;
	while (node) {
		if (callback(node.item))
			return i;
		i--;
		node = node.previous;
	}
	return -1;
};

/**
 * Returns all the position in which the item has been found in the list.
 * @param item {*} The item to search.
 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
 * @return {Array<number>} The positions in which the item has been found.
 */
DoubleLinkedList.prototype.allIndexesOf = function (item, callback) {
	callback = callback || function (it) {
		return it === item;
	};
	var i = 0;
	var node = this.first;
	var indexes = [];
	while (node) {
		if (callback(node.item))
			indexes.push(i);
		i++;
		node = node.next;
	}
	return indexes;
};

/**
 * Add the list at the end of this list.
 * @param list {DoubleLinkedList} The list to join.
 * @return {void}
 */
DoubleLinkedList.prototype.join = function (list) {
	if (this.last)
		this.last.next = list.first;
	else
		this.first = list.first;
	if (list.first)
		list.first.previous = this.last;
	this.last = list.last;
	this.length += list.length;
};

/**
 * Divides the list at the index position. The node at the index position is the first new node of the list.
 * @param index {number} The position where to divide the list.
 * @return {DoubleLinkedList} The list formed by the nodes from the index position then. If the index is out of bound, the list will be empty.
 */
DoubleLinkedList.prototype.divide = function (index) {
	var list = new DoubleLinkedList();
	if (index > -1 && index < this.length) {
		var node = this.first;
		var previous = null;
		for (var i = 0; i < index; i++) {
			previous = node;
			node = node.next;
		}
		if (node === this.first) {
			list.first = this.first;
			list.last = this.last;
			this.first = null;
			this.last = null;
		} else {
			list.first = node;
			list.last = this.last;
			this.last = previous;
			previous.next = null;
			node.previous = null;
		}
		list.length = this.length - index;
		this.length = index;
	}
	return list;
};

/**
 * Clones the list into a new list.
 * @return {DoubleLinkedList} The list cloned from this list.
 */
DoubleLinkedList.prototype.clone = function () {
	var list = new DoubleLinkedList();
	var node = this.first;
	for (var i = 0; i < this.length; i++, node = node.next)
		if (node.item.clone)
			list.pushBack(node.item.clone());
		else
			list.pushBack(node.item);
	return list;
};

/**
 * Clones the list into a new list without cloning duplicated items.
 * @return {DoubleLinkedList} The list cloned from this list.
 */
DoubleLinkedList.prototype.cloneDistinct = function () {
	var list = new DoubleLinkedList();
	var node = this.first;
	for (var i = 0; i < this.length; i++, node = node.next)
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
 * @return {Array<DoubleLinkedList>} The lists created by splitting the list.
 */
DoubleLinkedList.prototype.split = function (size) {
	var length = this.length;
	var lists = [this];
	for (var i = size; i < length; i += size)
		lists.push(lists[lists.length - 1].divide(size));
	return lists;
};

/**
 * Returns the number of items that satisfy the represented by the callback function.
 * @param callback {function} The condition to satisfy.
 * @return {number} The number of items that satisfy the condition.
 */
DoubleLinkedList.prototype.count = function (callback) {
	var count = 0;
	var node = this.first;
	while (node) {
		if (callback(node.item))
			count++;
		node = node.next;
	}
	return count;
};