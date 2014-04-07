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

	for (var i = 0; i < size; i++)
		this.items[i] = new DoubleLinkedList();
}

/**
 * Store the item with its key.
 * @param key {number} The key relatives to the item.
 * @param item {*} The item to store.
 */
HashTable.prototype.insert = function (key, item) {
	this.items[this.hash(key)].pushBack({key: key, item: item});
};

/**
 * Delete the first item relatives to the key value.
 * @param key {number} The key to delete.
 * @return {void}
 */
HashTable.prototype.deleteKey = function (key) {
	var list = this.items[this.hash(key)];
	var it = list.getIterator();
	for (it.first(); !it.isDone() && it.getItem().key !== key;)
		it.next();
	if (!it.isDone())
		list.deleteNode(it.getNode());
};

/**
 * Delete all the items relative to the key value.
 * @param key {number} The key to delete.
 * @return {void}
 */
HashTable.prototype.deleteAllKey = function (key) {
	var list = this.items[this.hash(key)];
	var it = list.getIterator();
	for (it.first(); !it.isDone(); it.next())
		if (it.getItem().key === key)
			list.deleteNode(it.getNode());
};

/**
 * Search the item relative to the key value.
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
 * Search all the items relative to the key value.
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