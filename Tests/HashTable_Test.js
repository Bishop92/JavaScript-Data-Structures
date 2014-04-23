/**
 * Created by Stefano on 31/03/14.
 */

test("HashTable - Insert test", function () {
	var table = new HashTable(4);
	for (var i = 0; i < 20; i++)
		table.insert(i, "Insert # " + i);
	for (var j = 0; j < 20; j++)
		deepEqual(table.search(j), "Insert # " + j, "Insert " + j);
});

test("HashTable - Delete key test", function () {
	var table = new HashTable(4);
	for (var i = 0; i < 20; i++)
		table.insert(i, i);
	table.deleteKey(6);
	deepEqual(table.search(6), undefined, "Delete key");
});

test("HashTable - Delete all key test", function () {
	var table = new HashTable(4);
	for (var i = 0; i < 100; i++)
		table.insert(i % 20, {value: i % 20});
	table.deleteAllKey(13);
	deepEqual(table.searchAll(13).length, 0, "Delete all key");
});

test("HashTable - Get keys test", function () {
	var table = new HashTable(50);
	var keys = [];
	for (var i = 0; i < 100; i++) {
		table.insert(i, {value: i % 20});
		keys.push(i);
	}
	keys.sort();
	var storedKeys = table.getKeys().sort();
	deepEqual(storedKeys, keys, "Get stored keys");
});

test("HashTable - Get items test", function () {
	var table = new HashTable(50);
	var items = [];
	for (var i = 0; i < 100; i++) {
		table.insert(i, i % 20);
		items.push(i % 20);
	}
	items.sort();
	var storedKeys = table.getItems().sort();
	deepEqual(storedKeys, items, "Get stored items");
});

test("HashTable - Contains key test", function () {
	var table = new HashTable(50);
	for (var i = 0; i < 100; i++)
		table.insert(i, i % 20);
	deepEqual(table.containsKey(4), true, "Contains key");
	deepEqual(table.containsKey(200), false, "Not contains key");
	var callback = function (k) {
		return k > 20;
	};
	deepEqual(table.containsKey(0, callback), true, "Contains key greater than 20");
	callback = function (k) {
		return k < 0;
	};
	deepEqual(table.containsKey(0, callback), false, "Not contains negative key");
});

test("HashTable - Clear test", function () {
	var table = new HashTable(50);
	for (var i = 0; i < 100; i++)
		table.insert(i, i % 20);
	deepEqual(table.isEmpty(), false, "Before clear");
	table.clear();
	deepEqual(table.isEmpty(), true, "After clear");
});

test("HashTable - Get number of keys test", function () {
	var table = new HashTable(50);
	deepEqual(table.getNumberOfKeys(), 0, "Before insertion");
	for (var i = 0; i < 100; i++)
		table.insert(i, i % 20);
	deepEqual(table.getNumberOfKeys(), 100, "After insertion");
});

test("HashTable - Is empty test", function () {
	var table = new HashTable(50);
	deepEqual(table.isEmpty(), true, "Before insertion");
	for (var i = 0; i < 100; i++)
		table.insert(i, i % 20);
	deepEqual(table.isEmpty(), false, "Before clear");
	table.clear();
	deepEqual(table.isEmpty(), true, "After clear");
});
