/**
 * Created by Stefano on 05/04/2014.
 */

/**
 * Class for managing an hash table.
 * @param size {number} The size of the table.
 * @constructor
 */
function HashTable(size) {
	/**
	 * The size of the table
	 * @type {number}
	 */
	this.size = size;

	this.p = 1000;

	this.a = Math.floor(Math.random() * this.p);

	this.b = Math.floor(Math.random() * this.p);

	/**
	 * Calculate the hash of the param key.
	 * @param key {number} The key to hash.
	 * @return {number} The hash of the key.
	 */
	this.hash = function (key) {
		return ((this.a * key + this.b) % this.p) % this.size;
	};

	/**
	 * The items stored in the hash table.
	 * @type {Array<DoubleLinkedList>}
	 */
	this.items = [];

	/**
	 * The number of keys stored in the hash table.
	 * @type {number}
	 */
	this.keyLength = 0;

	this.clear();
}

/**
 * Stores the item with its key.
 * @param key {number} The key relatives to the item.
 * @param item {*} The item to store.
 */
HashTable.prototype.insert = function (key, item) {
	this.keyLength++;
	this.items[this.hash(key)].pushBack({key: key, item: item});
};

/**
 * Deletes the first item relatives to the key value.
 * @param key {number} The key to delete.
 * @return {void}
 */
HashTable.prototype.deleteKey = function (key) {
	var list = this.items[this.hash(key)];
	var it = list.getIterator();
	for (it.first(); !it.isDone() && it.getItem().key !== key;)
		it.next();
	if (!it.isDone()) {
		list.deleteNode(it.getNode());
		this.keyLength--;
	}
};

/**
 * Deletes all the items relative to the key value.
 * @param key {number} The key to delete.
 * @return {void}
 */
HashTable.prototype.deleteAllKey = function (key) {
	var list = this.items[this.hash(key)];
	var it = list.getIterator();
	var keysRemoved = 0;
	for (it.first(); !it.isDone(); it.next())
		if (it.getItem().key === key) {
			list.deleteNode(it.getNode());
			keysRemoved++;
		}
	this.keyLength -= keysRemoved;
};

/**
 * Searches the item relative to the key value.
 * @param key {number} The key of the item to search.
 * @return {*|undefined} The item found or undefined if the key does not exist.
 */
HashTable.prototype.search = function (key) {
	var list = this.items[this.hash(key)];
	var it = list.getIterator();
	for (it.first(); !it.isDone(); it.next())
		if (it.getItem().key === key)
			return it.getItem().item;
	return undefined;
};

/**
 * Checks if the hash table contains a key that satisfy the condition represented by the callback function.
 * @param key {number} The key to find.
 * @param [callback = function(k){return(k===key);}] The condition to satisfy. The callback must accept the current key to check.
 * @return {boolean} True if the hash table contains the key that satisfy the condition, false otherwise.
 */
HashTable.prototype.containsKey = function (key, callback) {
	callback = callback || function (k) {
		return k === key;
	};
	var list = this.items[this.hash(key)];
	var it = list.getIterator();
	for (it.first(); !it.isDone(); it.next())
		if (callback(it.getItem().key))
			return true;
	return false;
};

/**
 * Searches all the items relative to the key value.
 * @param key {number} The key of the items to search.
 * @return {Array.<*>} An array with the items found.
 */
HashTable.prototype.searchAll = function (key) {
	var list = this.items[this.hash(key)];
	var it = list.getIterator();
	var array = [];
	for (it.first(); !it.isDone(); it.next())
		if (it.getItem().key === key)
			array.push(it.getItem().item);
	return array;
};

/**
 * Returns the keys stored in the hash table.
 * @return {Array<number>} The keys stored in the table.
 */
HashTable.prototype.getKeys = function () {
	var keys = [];
	for (var i = 0; i < this.size; i++) {
		var it = this.items[i].getIterator();
		for (it.first(); !it.isDone(); it.next())
			keys.push(it.getItem().key);
	}
	return keys;
};

/**
 * Returns the items stored in the hash table.
 * @return {Array<*>} The items stored in the table.
 */
HashTable.prototype.getItems = function () {
	var items = [];
	for (var i = 0; i < this.size; i++) {
		var it = this.items[i].getIterator();
		for (it.first(); !it.isDone(); it.next())
			items.push(it.getItem().item);
	}
	return items;
};

/**
 * Removes all the keys and the items stored in the hash table.
 * @return {void}
 */
HashTable.prototype.clear = function () {
	this.items = [];
	for (var i = 0; i < this.size; i++)
		this.items[i] = new DoubleLinkedList();
	this.keyLength = 0;
};

/**
 * Returns the number of keys stored in the hash table.
 * @return {number} The number of keys stored.
 */
HashTable.prototype.getNumberOfKeys = function () {
	return this.keyLength;
};

/**
 * Checks if the hash table is empty.
 * @return {boolean} True if the hash table is empty, false otherwise.
 */
HashTable.prototype.isEmpty = function () {
	return !this.keyLength;
};

/**
 * Executes the callback function for each item of the hash table.
 * This method modifies the hash table so if you don't need to modify it you must return the same item stored.
 * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
 * @return {void}
 */
HashTable.prototype.execute = function (callback) {
	for (var i = 0; i < this.size; i++)
		this.items[i].execute(callback);
};

/**
 * Returns the items that satisfy the condition determined by the callback.
 * @param callback {function} The function that implements the condition.
 * @return {Array<*>} The array that contains the items that satisfy the condition.
 */
HashTable.prototype.filter = function (callback) {
	var result = [];
	for (var i = 0; i < this.size; i++)
		result.concat(this.items[i].filter(callback));
	return result;
};

/**
 * Returns the size of the hash table.
 * @return {number} The size of the hash table.
 */
HashTable.prototype.getSize = function () {
	return this.size;
};

/**
 * Clones the hash table into a new hash table.
 * @return {HashTable} The hash table cloned from this hash table.
 */
HashTable.prototype.clone = function () {
	var table = new HashTable(this.size);
	for (var i = 0; i < this.size; i++)
		for (var node = this.items[i].first; node; node = node.next)
			table.insert(node.key, node.item);
	return table;
};