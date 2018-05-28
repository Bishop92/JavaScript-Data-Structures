/**
 * Created by Stefano on 06/04/14.
 */

QUnit.test("BSTree - Insert test", function (assert)
{
	var tree = new ds.BSTree<number>();
	var keys = [];
	for (var i = 0; i < 20; i++)
	{
		keys.push(Math.random());
		tree.insert(keys[i], i);
	}
	for (var j = 0; j < 20; j++)
		assert.deepEqual(tree.search(keys[j]), j, "Insert node");
});

QUnit.test("BSTree - Minimum test", function (assert)
{
	var tree = new ds.BSTree();
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

QUnit.test("BSTree - Maximum test", function (assert)
{
	var tree = new ds.BSTree();
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

QUnit.test("BSTree - Successor test", function (assert)
{
	var tree = new ds.BSTree();
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

QUnit.test("BSTree - Predecessor test", function (assert)
{
	var tree = new ds.BSTree();
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

QUnit.test("BSTree - Delete node test", function (assert)
{
	var tree = new ds.BSTree();
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