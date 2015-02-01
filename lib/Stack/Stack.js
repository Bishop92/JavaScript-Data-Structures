/**
 * Created by Battistella Stefano on 31/03/14.
 */

Stack.prototype = new Aggregate();
Stack.prototype.constructor = Stack;

/**
 * Class for managing a stack.
 * @param {...*} [args] The items for initializing the stack.
 * @constructor
 */
function Stack(args) {
	/**
	 * The list of the items in the stack.
	 * @type {Array<*>}
	 */
	this.items = [];

    if(args && args.length) {
        //builds the stack from the range passed from the constructor
        this.multiPush(args);
    } else {
        //builds the stack from the parameters of the constructor
        this.multiPush(arguments);
    }
}

/**
 * @inheritDoc
 */
Stack.prototype.getIterator = function () {
	return new StackIterator(this);
};

/**
 * Adds the item at the top of the stack.
 * @param item {*} The item to add.
 * return {void}
 */
Stack.prototype.push = function (item) {
	this.items.push(item);
};

/**
 * Adds the items at the top of the stack.
 * @param items {Array<*>} The items to add.
 * @return {void}
 */
Stack.prototype.multiPush = function (items) {
	for (var i = 0; i < items.length; i++)
		this.push(items[i]);
};

/**
 * Removes the item at the top of the stack.
 * @return {*} The item at the top of the stack. It's undefined if the stack is empty.
 */
Stack.prototype.pop = function () {
	if (!this.items.length)
		return undefined;
	return this.items.pop();
};

/**
 * Removes the more item at the top of the stack.
 * @param times {number} The number of times to repeat the pop method.
 * @return {Array<*>} The items at the top of the stack.
 */
Stack.prototype.multiPop = function (times) {
	var result = [];
	for (var i = 0; i < times && this.items.length; i++)
		result.push(this.pop());
	return result;
};

/**
 * Returns the item at the top of the stack without remove it.
 * @return {*} The item at the top of the stack. It's undefined if the stack is empty.
 */
Stack.prototype.peek = function () {
	if (!this.items.length)
		return undefined;
	return this.items[this.items.length - 1];
};

/**
 * Removes all the items stored in the stack.
 * @return {void}
 */
Stack.prototype.clear = function () {
	this.items = [];
};

/**
 * Checks if the stack contains an item that satisfy the condition represented by the callback function.
 * @param item {*} The item to find.
 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
 * @return {boolean} True if the stack contains the item that satisfy the condition, false otherwise.
 */
Stack.prototype.contains = function (item, callback) {
	callback = callback || function (it) {
		return it === item;
	};
	var i = 0;
	while (i < this.items.length && !callback(this.items[i]))
		i++;
	return i < this.items.length;
};

/**
 * Executes the callback function for each item of the stack.
 * This method modifies the stack so if you don't need to modify it you must return the same item of the array.
 * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
 * @return {void}
 */
Stack.prototype.execute = function (callback) {
	for (var i = this.items.length - 1; i > -1; i--)
		this.items[i] = callback(this.items[i]);
};

/**
 * Returns the item at the position index.
 * @param index The position of the item.
 * @return {*} The item at the position. It's undefined if index isn't in the stack bounds.
 */
Stack.prototype.getItem = function (index) {
	if (index < 0 || index > this.items.length - 1)
		return undefined;
	return this.items[this.items.length - index - 1];
};

/**
 * Returns the length of the stack.
 * @return {Number} The length of the stack.
 */
Stack.prototype.getLength = function () {
	return this.items.length;
};

/**
 * Checks if the stack is empty.
 * @return {boolean} True if the stack is empty, false otherwise.
 */
Stack.prototype.isEmpty = function () {
	return !this.items.length;
};

/**
 * Returns the items that satisfy the condition determined by the callback.
 * @param callback {function} The function that implements the condition.
 * @return {Array<*>} The array that contains the items that satisfy the condition.
 */
Stack.prototype.filter = function (callback) {
	var result = [];
	for (var i = this.items.length - 1; i > -1; i--) {
		if (callback(this.items[i]))
			result.push(this.items[i]);
	}
	return result;
};

/**
 * Returns the first position of the item in the stack.
 * @param item {*} The item to search.
 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
 * @return {number} The first position of the item.
 */
Stack.prototype.indexOf = function (item, callback) {
	callback = callback || function (it) {
		return it === item;
	};
	var i = this.items.length - 1;
	while (i > -1) {
		if (callback(this.items[i]))
			return i;
		i--;
	}
	return -1;
};

/**
 * Returns the last position of the item in the stack.
 * @param item {*} The item to search.
 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
 * @return {number} The last position of the item.
 */
Stack.prototype.lastIndexOf = function (item, callback) {
	callback = callback || function (it) {
		return it === item;
	};
	var i = 0;
	while (i < this.items.length) {
		if (callback(this.items[i]))
			return i;
		i++;
	}
	return -1;
};

/**
 * Returns all the position in which the item has been found in the stack.
 * @param item {*} The item to search.
 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
 * @return {Array<number>} The positions in which the item has been found.
 */
Stack.prototype.allIndexesOf = function (item, callback) {
	callback = callback || function (it) {
		return it === item;
	};
	var i = this.items.length - 1;
	var indexes = [];
	while (i > -1) {
		if (callback(this.items[i]))
			indexes.push(i);
		i--;
	}
	return indexes;
};

/**
 * Clones the stack into a new stack.
 * @return {Stack} The stack cloned from this stack.
 */
Stack.prototype.clone = function () {
	var stack = new Stack();
	for (var i = 0; i < this.items.length; i++)
		if (this.items[i].clone)
			stack.push(this.items[i].clone());
		else
			stack.push(this.items[i]);
	return stack;
};

/**
 * Clones the stack into a new stack without cloning duplicated items.
 * @return {Stack} The stack cloned from this stack.
 */
Stack.prototype.cloneDistinct = function () {
	var stack = new Stack();
	for (var i = 0; i < this.items.length; i++)
		if (!stack.contains(this.items[i])) {
			if (this.items[i].cloneDistinct)
				stack.push(this.items[i].cloneDistinct());
			else if (this.items[i].clone)
				stack.push(this.items[i].clone());
			else
				stack.push(this.items[i]);
		}
	return stack;
};