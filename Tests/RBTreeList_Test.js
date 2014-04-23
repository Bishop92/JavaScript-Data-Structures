/**
 * Created by Stefano on 06/04/14.
 */

test("RBTreeList - Insert test", function () {
	var tree = new RBTreeList();
	var keys = [];
	for (var i = 0; i < 20; i++) {
		keys.push(Math.random());
		tree.insert(keys[i], i);
	}
	for (var j = 0; j < 20; j++)
		deepEqual(tree.search(keys[j]), j, "Insert node");
});

test("RBTreeList - Minimum test", function () {
	var tree = new RBTreeList();
	var keys = [];
	var min = 10;
	for (var i = 0; i < 20; i++) {
		keys.push(Math.random());
		tree.insert(keys[i], i);
		if (keys[i] < min)
			min = keys[i];
	}
	deepEqual(tree.minimum().item, tree.search(min), "Minimum");
});

test("RBTreeList - Maximum test", function () {
	var tree = new RBTreeList();
	var keys = [];
	var max = -1;
	for (var i = 0; i < 20; i++) {
		keys.push(Math.random());
		tree.insert(keys[i], i);
		if (keys[i] > max)
			max = keys[i];
	}
	deepEqual(tree.maximum().item, tree.search(max), "Maximum");
});

test("RBTreeList - Successor test", function () {
	var tree = new RBTreeList();
	for (var i = 0; i < 20; i++)
		tree.insert(i, i);
	var it = tree.getIterator();
	var j = 1;
	for (it.first(); !it.isDone(); it.next(), j++) {
		var successor = tree.successor(it.getNode());
		if (successor)
			deepEqual(successor.item, j, "Successor");
		else
			deepEqual(successor, null, "No successor");
	}
});

test("RBTreeList - Predecessor test", function () {
	var tree = new RBTreeList();
	for (var i = 0; i < 20; i++)
		tree.insert(i, i);
	var it = tree.getIterator();
	var j = 18;
	for (it.last(); !it.isDone(); it.previous(), j--) {
		var predecessor = tree.predecessor(it.getNode());
		if (predecessor)
			deepEqual(predecessor.item, j, "Predecessor");
		else
			deepEqual(predecessor, null, "No predecessor");
	}
});

test("RBTreeList - Delete node test", function () {
	var tree = new RBTreeList();
	for (var i = 0; i < 20; i++)
		tree.insert(i, i);
	var j = 0;
	while (tree.minimum()) {
		deepEqual(tree.minimum().item, j, "Deletion");
		tree.deleteNode(tree.minimum());
		j++;
	}
});

test("RBTreeList - To array test", function () {
	var tree = new RBTreeList();
	for (var i = 0; i < 5; i++)
		tree.insert(i, i);
	deepEqual(tree.toArray(), [0, 1, 2, 3, 4], "To array");
});

test("RBTreeList - Filter test", function () {
	var tree = new RBTreeList();

	for (var i = 0; i < 100; i++)
		tree.insert(i, i);

	var result = tree.filter(function (item) {
		return 1 - item % 2;
	});

	deepEqual(result[0], 0, "Filter of the even values");
	deepEqual(result[result.length - 1], 98, "Filter on the even values");
});

test("RBTreeList - Clear test", function () {
	var tree = new RBTreeList();
	tree.insert(0, 0);
	tree.insert(2, 2);
	tree.clear();
	deepEqual(tree.isEmpty(), true, "Clear tree");
});

test("RBTreeList - Is empty test", function () {
	var tree = new RBTreeList();
	tree.insert(0, 0);
	tree.insert(2, 2);
	deepEqual(tree.isEmpty(), false, "Is not empty");
	tree.clear();
	deepEqual(tree.isEmpty(), true, "Is empty");
});

test("RBTreeList - Contains test", function () {
	var tree = new RBTreeList();
	tree.insert(0, 0);
	tree.insert(2, 2);
	deepEqual(tree.contains(0), true, "Contains 0");
	deepEqual(tree.contains(2), true, "Contains 2");
	deepEqual(tree.contains(1), false, "Not contains 1");
	var callback = function (item) {
		return item > 0;
	};
	deepEqual(tree.fullContains(callback), true, "Contains a value > 0");
	callback = function (item) {
		return item < 0;
	};
	deepEqual(tree.fullContains(callback), false, "Contains a value < 0");
});

test("RBTreeList - Execute test", function () {
	var tree = new RBTreeList();
	tree.insert(0, 0);
	tree.insert(2, 2);
	var callback = function (item) {
		return item * 2;
	};
	tree.execute(callback);
	deepEqual(tree.search(0), 0, "Execute for key 0");
	deepEqual(tree.search(2), 4, "Execute for key 1");
});

test("RBTreeList - Index of test", function () {
	var tree = new RBTreeList();
	for (var i = 0; i < 10; i++)
		tree.insert(i, i);
	var callback = function (item) {
		return !(item % 2) && item > 5;
	};
	deepEqual(tree.indexOf(0), 0, "Index of 0");
	deepEqual(tree.indexOf(15), -1, "Index of 15");
	deepEqual(tree.indexOf(5), 5, "Index of 5");
	deepEqual(tree.indexOf(null, callback), 6, "Index of the first even number greater than 5");
});

test("RBTreeList - Last index of test", function () {
	var tree = new RBTreeList();
	for (var i = 0; i < 10; i++)
		tree.insert(i, i);
	var callback = function (item) {
		return !(item % 2) && item > 5;
	};
	deepEqual(tree.lastIndexOf(0), 0, "Last index of 0");
	deepEqual(tree.lastIndexOf(15), -1, "Last index of 15");
	deepEqual(tree.lastIndexOf(5), 5, "Last index of 5");
	deepEqual(tree.lastIndexOf(null, callback), 8, "Index of the last even number greater than 5");
});

test("RBTreeList - Indexes of test", function () {
	var tree = new RBTreeList();
	for (var i = 0; i < 30; i++)
		tree.insert(i, i % 10);
	var callback = function (item) {
		return !(item % 2) && item > 5;
	};
	deepEqual(tree.allIndexesOf(0), [0, 10, 20], "Indexes of 0");
	deepEqual(tree.allIndexesOf(15), [], "Indexes of 15");
	deepEqual(tree.allIndexesOf(5), [5, 15, 25], "Indexes of 5");
	deepEqual(tree.allIndexesOf(null, callback), [6, 8, 16, 18, 26, 28], "Indexes of the even numbers greater than 5");
});

test("RBTreeList - Clone test", function () {
	var tree = new RBTreeList();
	for (var i = 0; i < 10; i++)
		tree.insert(i, i);
	var clone = tree.clone();
	var it = clone.getIterator();
	var j = 0;
	for (it.first(); !it.isDone(); it.next(), j++)
		deepEqual(it.getItem(), j, "Clone of the tree");
});

test("RBTreeList - Clone distinct test", function () {
	var tree = new RBTreeList();
	for (var i = 0; i < 20; i++)
		tree.insert(i % 10, i % 10);
	var clone = tree.cloneDistinct();
	deepEqual(clone.allIndexesOf(2), [2], "Clone of the tree");
});