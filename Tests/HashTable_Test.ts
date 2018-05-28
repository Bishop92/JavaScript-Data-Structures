/**
 * Created by Stefano on 31/03/14.
 */

QUnit.test("HashTable - Insert test", function (assert)
{
	var table = new ds.HashTable(4);
	for (var i = 0; i < 20; i++)
		table.insert(i, "Insert # " + i);
	for (var j = 0; j < 20; j++)
		assert.deepEqual(table.search(j), "Insert # " + j, "Insert " + j);
});

QUnit.test("HashTable - Delete key test", function (assert)
{
	var table = new ds.HashTable(4);
	for (var i = 0; i < 20; i++)
		table.insert(i, i);
	table.deleteKey(6);
	assert.deepEqual(table.search(6), undefined, "Delete key");
});

QUnit.test("HashTable - Delete all key test", function (assert)
{
	var table = new ds.HashTable(4);
	for (var i = 0; i < 100; i++)
		table.insert(i % 20, { value: i % 20 });
	table.deleteAllKey(13);
	assert.deepEqual(table.searchAll(13).length, 0, "Delete all key");
});

QUnit.test("HashTable - Get keys test", function (assert)
{
	var table = new ds.HashTable(50);
	var keys = [];
	for (var i = 0; i < 100; i++)
	{
		table.insert(i, { value: i % 20 });
		keys.push(i);
	}
	keys.sort();
	var storedKeys = table.getKeys().sort();
	assert.deepEqual(storedKeys, keys, "Get stored keys");
});

QUnit.test("HashTable - Get items test", function (assert)
{
	var table = new ds.HashTable(50);
	var items = [];
	for (var i = 0; i < 100; i++)
	{
		table.insert(i, i % 20);
		items.push(i % 20);
	}
	items.sort();
	var storedKeys = table.getItems().sort();
	assert.deepEqual(storedKeys, items, "Get stored items");
});

QUnit.test("HashTable - Contains key test", function (assert)
{
	var table = new ds.HashTable(50);
	for (var i = 0; i < 100; i++)
		table.insert(i, i % 20);
	assert.deepEqual(table.containsKey(4), true, "Contains key");
	assert.deepEqual(table.containsKey(200), false, "Not contains key");
	var callback = function (k)
	{
		return k > 20;
	};
	assert.deepEqual(table.containsKey(0, callback), true, "Contains key greater than 20");
	callback = function (k)
	{
		return k < 0;
	};
	assert.deepEqual(table.containsKey(0, callback), false, "Not contains negative key");
});

QUnit.test("HashTable - Clear test", function (assert)
{
	var table = new ds.HashTable(50);
	for (var i = 0; i < 100; i++)
		table.insert(i, i % 20);
	assert.deepEqual(table.isEmpty(), false, "Before clear");
	table.clear();
	assert.deepEqual(table.isEmpty(), true, "After clear");
});

QUnit.test("HashTable - Get number of keys test", function (assert)
{
	var table = new ds.HashTable(50);
	assert.deepEqual(table.getNumberOfKeys(), 0, "Before insertion");
	for (var i = 0; i < 100; i++)
		table.insert(i, i % 20);
	assert.deepEqual(table.getNumberOfKeys(), 100, "After insertion");
});

QUnit.test("HashTable - Is empty test", function (assert)
{
	var table = new ds.HashTable(50);
	assert.deepEqual(table.isEmpty(), true, "Before insertion");
	for (var i = 0; i < 100; i++)
		table.insert(i, i % 20);
	assert.deepEqual(table.isEmpty(), false, "Before clear");
	table.clear();
	assert.deepEqual(table.isEmpty(), true, "After clear");
});
