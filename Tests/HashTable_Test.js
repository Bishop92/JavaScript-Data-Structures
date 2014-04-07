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