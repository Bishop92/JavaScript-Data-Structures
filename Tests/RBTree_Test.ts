/**
 * Created by Stefano on 06/04/14.
 */

QUnit.test("RBTree - Insert test", function (assert)
{
	var tree = new ds.RBTree();
	var keys = [];
	for (var i = 0; i < 20; i++)
	{
		keys.push(Math.random());
		tree.insert(keys[i], keys[i]);
	}
	for (var j = 0; j < 20; j++)
		assert.deepEqual(tree.search(keys[j]), keys[j], "Insert node");
	keys.sort();
	for (var k = 0; k < 20; k++)
		assert.deepEqual(tree.getItem(k), keys[k], "Insert node");
});

QUnit.test("RBTree - Minimum test", function (assert)
{
	var tree = new ds.RBTree();
	var keys = [];
	var min = 10;
	for (var i = 0; i < 20; i++)
	{
		keys.push(Math.random());
		tree.insert(keys[i], i);
		if (keys[i] < min)
			min = keys[i];
	}
	assert.deepEqual(tree.minimum().item, tree.search(min), "Minimum");
});

QUnit.test("RBTree - Maximum test", function (assert)
{
	var tree = new ds.RBTree();
	var keys = [];
	var max = -1;
	for (var i = 0; i < 20; i++)
	{
		keys.push(Math.random());
		tree.insert(keys[i], i);
		if (keys[i] > max)
			max = keys[i];
	}
	assert.deepEqual(tree.maximum().item, tree.search(max), "Maximum");
});

QUnit.test("RBTree - Successor test", function (assert)
{
	var tree = new ds.RBTree();
	for (var i = 0; i < 20; i++)
		tree.insert(i, i);
	var it = tree.getIterator();
	var j = 1;
	for (it.first(); !it.isDone(); it.next(), j++)
	{
		var successor = tree.successor(it.getNode());
		if (successor)
			assert.deepEqual(successor.item, j, "Successor");
		else
			assert.deepEqual(successor, null, "No successor");
	}
});

QUnit.test("RBTree - Predecessor test", function (assert)
{
	var tree = new ds.RBTree();
	for (var i = 0; i < 20; i++)
		tree.insert(i, i);
	var it = tree.getIterator();
	var j = 18;
	for (it.last(); !it.isDone(); it.previous(), j--)
	{
		var predecessor = tree.predecessor(it.getNode());
		if (predecessor)
			assert.deepEqual(predecessor.item, j, "Predecessor");
		else
			assert.deepEqual(predecessor, null, "No predecessor");
	}
});

QUnit.test("RBTree - Delete node test", function (assert)
{
	var tree = new ds.RBTree();
	for (var i = 0; i < 20; i++)
		tree.insert(i, i);
	var j = 0;
	while (tree.minimum())
	{
		assert.deepEqual(tree.minimum().item, j, "Deletion");
		tree.deleteNode(tree.minimum());
		j++;
	}
});

QUnit.test("RBTree - To array test", function (assert)
{
	var tree = new ds.RBTree();
	for (var i = 0; i < 5; i++)
		tree.insert(i, i);
	assert.deepEqual(tree.toArray(), [0, 1, 2, 3, 4], "To array");
});

QUnit.test("RBTree - Filter test", function (assert)
{
	var tree = new ds.RBTree();
	const length = 100;

	for (var i = 0; i < length; i++)
		tree.insert(i, i);

	var result = tree.filter(function (item)
	{
		return Boolean(1 - item % 2);
	});

	assert.deepEqual(result[0], 0, "Filter of the even values");
	assert.deepEqual(result[result.length - 1], 98, "Filter on the even values");
});

QUnit.test("RBTree - Clear test", function (assert)
{
	var tree = new ds.RBTreeList();
	tree.insert(0, 0);
	tree.insert(2, 2);
	tree.clear();
	assert.deepEqual(tree.isEmpty(), true, "Clear tree");
});

QUnit.test("RBTree - Is empty test", function (assert)
{
	var tree = new ds.RBTree();
	tree.insert(0, 0);
	tree.insert(2, 2);
	assert.deepEqual(tree.isEmpty(), false, "Is not empty");
	tree.clear();
	assert.deepEqual(tree.isEmpty(), true, "Is empty");
});

QUnit.test("RBTree - Contains test", function (assert)
{
	var tree = new ds.RBTree();
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

QUnit.test("RBTree - Execute test", function (assert)
{
	var tree = new ds.RBTree();
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

QUnit.test("RBTree - Index of test", function (assert)
{
	var tree = new ds.RBTree();
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

QUnit.test("RBTree - Last index of test", function (assert)
{
	var tree = new ds.RBTree();
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

QUnit.test("RBTree - Indexes of test", function (assert)
{
	var tree = new ds.RBTree();
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

QUnit.test("RBTree - Clone test", function (assert)
{
	var tree = new ds.RBTree();
	for (var i = 0; i < 10; i++)
		tree.insert(i, i);
	var clone = tree.clone();
	var it = clone.getIterator();
	var j = 0;
	for (it.first(); !it.isDone(); it.next(), j++)
		assert.deepEqual(it.getItem(), j, "Clone of the tree");
});

QUnit.test("RBTree - Clone distinct test", function (assert)
{
	var tree = new ds.RBTree();
	for (var i = 0; i < 20; i++)
		tree.insert(i % 10, i % 10);
	var clone = tree.cloneDistinct();
	assert.deepEqual(clone.allIndexesOf(2), [2], "Clone of the tree");
});