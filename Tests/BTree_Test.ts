/**
 * Created by Stefano on 06/04/14.
 */

QUnit.test("BTree - Insert test", function (assert)
{
	var tree = new ds.BTree(100);
	for (var i = 0; i < 100; i++)
		tree.insert(i, i);
	for (var j = 0; j < 100; j++)
	{
		assert.deepEqual(tree.search(j), j, "Insert node");
		assert.deepEqual(tree.getItem(j), j, "Insert node");
	}
});

QUnit.test("BTree - Delete node test", function (assert)
{
	var tree = new ds.BTree(3);
	for (var i = 0; i < 20; i++)
		tree.insert(i, i);
	tree.deleteKey(6);
	assert.deepEqual(tree.search(6), undefined, "Delete node 6");
});

QUnit.test("BTree - Successor test", function (assert)
{
	var tree = new ds.BTree(3);
	for (var i = 0; i < 20; i++)
		tree.insert(i, i);
	for (var j = -1; j < 19; j++)
		assert.deepEqual(tree.successor(j), j + 1, "Successor found");
	assert.deepEqual(tree.successor(19), -1, "Successor not found");
});

QUnit.test("BTree - Predecessor test", function (assert)
{
	var tree = new ds.BTree(4);
	for (var i = 0; i < 40; i++)
		tree.insert(i, i);
	for (var j = 40; j > 0; j--)
		assert.deepEqual(tree.predecessor(j), j - 1, "Predecessor");
	assert.deepEqual(tree.predecessor(0), -1, "Predecessor not found");
});

QUnit.test("BTree - Minimum test", function (assert)
{
	var tree = new ds.BTree(3);
	var keys = [];
	var min = 10;
	for (var i = 0; i < 20; i++)
	{
		keys.push(Math.random());
		tree.insert(keys[i], i);
		if (keys[i] < min)
			min = keys[i];
	}
	assert.deepEqual(tree.minimum(), tree.search(min), "Minimum item");
	assert.deepEqual(tree.minimumKey(), min, "Minimum key");
});

QUnit.test("BTree - Maximum test", function (assert)
{
	var tree = new ds.BTree(3);
	var keys = [];
	var max = -1;
	for (var i = 0; i < 20; i++)
	{
		keys.push(Math.random());
		tree.insert(keys[i], i);
		if (keys[i] > max)
			max = keys[i];
	}
	assert.deepEqual(tree.maximum(), tree.search(max), "Maximum item");
	assert.deepEqual(tree.maximumKey(), max, "Maximum key");
});

QUnit.test("BTree - To array test", function (assert)
{
	var tree = new ds.BTree(3);
	for (var i = 0; i < 5; i++)
		tree.insert(i, i);
	assert.deepEqual(tree.toArray(), [0, 1, 2, 3, 4], "To array");
});

QUnit.test("BTree - Filter test", function (assert)
{
	var tree = new ds.BTree<number>(3);

	for (var i = 0; i < 10; i++)
		tree.insert(i, i);

	var result = tree.filter(function (item)
	{
		return Boolean(1 - item % 2);
	});
	assert.deepEqual(result, [0, 2, 4, 6, 8], "Filter on the even values");
});

QUnit.test("BTree - Clear test", function (assert)
{
	var tree = new ds.BTree(3);
	tree.insert(0, 0);
	tree.insert(2, 2);
	tree.clear();
	assert.deepEqual(tree.isEmpty(), true, "Clear tree");
});

QUnit.test("BTree - Is empty test", function (assert)
{
	var tree = new ds.BTree(3);
	tree.insert(0, 0);
	tree.insert(2, 2);
	assert.deepEqual(tree.isEmpty(), false, "Is not empty");
	tree.clear();
	assert.deepEqual(tree.isEmpty(), true, "Is empty");
});

QUnit.test("BTree - Contains test", function (assert)
{
	var tree = new ds.BTree(3);
	tree.insert(0, 0);
	tree.insert(2, 2);
	assert.deepEqual(tree.contains(0), true, "Contains 0");
	assert.deepEqual(tree.contains(2), true, "Contains 2");
	assert.deepEqual(tree.contains(1), false, "Not contains 1");
	var callback = function (item)
	{
		return item > 0;
	};
	assert.deepEqual(tree.fullContains(callback), true, "Contains a value > 0");
	callback = function (item)
	{
		return item < 0;
	};
	assert.deepEqual(tree.fullContains(callback), false, "Contains a value < 0");
});

QUnit.test("BTree - Execute test", function (assert)
{
	var tree = new ds.BTree();
	tree.insert(0, 0);
	tree.insert(2, 2);
	var callback = function (item)
	{
		return item * 2;
	};
	tree.execute(callback);
	assert.deepEqual(tree.search(0), 0, "Execute for key 0");
	assert.deepEqual(tree.search(2), 4, "Execute for key 1");
});

QUnit.test("BTree - Index of test", function (assert)
{
	var tree = new ds.BTree(3);
	for (var i = 0; i < 10; i++)
		tree.insert(i, i);
	var callback = function (item)
	{
		return !(item % 2) && item > 5;
	};
	assert.deepEqual(tree.indexOf(0), 0, "Index of 0");
	assert.deepEqual(tree.indexOf(15), -1, "Index of 15");
	assert.deepEqual(tree.indexOf(5), 5, "Index of 5");
	assert.deepEqual(tree.indexOf(null, callback), 6, "Index of the first even number greater than 5");
});

QUnit.test("BTree - Last index of test", function (assert)
{
	var tree = new ds.BTree(3);
	for (var i = 0; i < 10; i++)
		tree.insert(i, i);
	var callback = function (item)
	{
		return !(item % 2) && item > 5;
	};
	assert.deepEqual(tree.lastIndexOf(0), 0, "Last index of 0");
	assert.deepEqual(tree.lastIndexOf(15), -1, "Last index of 15");
	assert.deepEqual(tree.lastIndexOf(5), 5, "Last index of 5");
	assert.deepEqual(tree.lastIndexOf(null, callback), 8, "Index of the last even number greater than 5");
});

QUnit.test("BTree - Indexes of test", function (assert)
{
	var tree = new ds.BTree(3);
	for (var i = 0; i < 30; i++)
		tree.insert(i, i % 10);
	var callback = function (item)
	{
		return !(item % 2) && item > 5;
	};
	assert.deepEqual(tree.allIndexesOf(0), [0, 10, 20], "Indexes of 0");
	assert.deepEqual(tree.allIndexesOf(15), [], "Indexes of 15");
	assert.deepEqual(tree.allIndexesOf(5), [5, 15, 25], "Indexes of 5");
	assert.deepEqual(tree.allIndexesOf(null, callback), [6, 8, 16, 18, 26, 28], "Indexes of the even numbers greater than 5");
});

QUnit.test("BTree - Clone test", function (assert)
{
	var tree = new ds.BTree(3);
	for (var i = 0; i < 10; i++)
		tree.insert(i, i);
	var clone = tree.clone();
	var it = clone.getIterator();
	var j = 0;
	for (it.first(); !it.isDone(); it.next(), j++)
		assert.deepEqual(it.getItem(), j, "Clone of the tree");
});

QUnit.test("BTree - Clone distinct test", function (assert)
{
	var tree = new ds.BTree(3);
	for (var i = 0; i < 20; i++)
		tree.insert(i, i % 10);
	var clone = tree.cloneDistinct();
	assert.deepEqual(clone.allIndexesOf(2), [2], "Clone of the tree");
});