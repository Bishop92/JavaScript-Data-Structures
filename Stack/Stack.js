/**
 * Created by Battistella Stefano on 31/03/14.
 */

/**
 * Class for managing a stack.
 * @constructor
 */
function Stack() {
	/**
	 * The list of the items in the stack.
	 * @type {Array<Object>}
	 */
	this.items = [];
}

/**
 * Add the item at the top of the stack.
 * @param item
 * return {void}
 */
Stack.prototype.push = function (item) {
	this.items.push(item);
};

//noinspection FunctionWithMultipleReturnPointsJS
/**
 * Remove the item at the top of the stack.
 * @return {Object|undefined} The item at the top of the stack. It's undefined if the stack is empty.
 */
Stack.prototype.pop = function () {
	if (!this.items.length)
		return undefined;
	return this.items.pop();
};

//noinspection FunctionWithMultipleReturnPointsJS
/**
 * Return the item at the position index.
 * @param index The position of the item.
 * @return {Object|undefined} The item at the position. It's undefined if index isn't in the stack bounds.
 */
Stack.prototype.getItem = function (index) {
	if (index < 0 || index > this.items.length - 1)
		return undefined;
	return this.items[index];
};

/**
 * Return the length of the stack.
 * @return {Number} The length of the stack.
 */
Stack.prototype.getLength = function () {
	return this.items.length;
};