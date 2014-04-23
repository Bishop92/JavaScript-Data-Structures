/**
 * Created by Stefano on 06/04/14.
 */

test("BTree - Insert test", function () {
	var tree = new BTree(100);
	for (var i = 0; i < 100; i++)
		tree.insert(i, i);
	for (var j = 0; j < 100; j++) {
		deepEqual(tree.search(j), j, "Insert node");
		deepEqual(tree.getItem(j), j, "Insert node");
	}
});

test("BTree - Delete node test", function () {
	var tree = new BTree(3);
	for (var i = 0; i < 20; i++)
		tree.insert(i, i);
	tree.deleteKey(6);
	deepEqual(tree.search(6), undefined, "Delete node 6");
});

test("BTree - Successor test", function () {
	var tree = new BTree(3);
	for (var i = 0; i < 20; i++)
		tree.insert(i, i);
	for (var j = -1; j < 19; j++)
		deepEqual(tree.successor(j), j + 1, "Successor found");
	deepEqual(tree.successor(19), null, "Successor not found");
});

test("BTree - Predecessor test", function () {
	var tree = new BTree(4);
	for (var i = 0; i < 40; i++)
		tree.insert(i, i);
	for (var j = 40; j > 0; j--)
		deepEqual(tree.predecessor(j), j - 1, "Predecessor");
	deepEqual(tree.predecessor(0), null, "Predecessor not found");
});

test("BTree - Minimum test", function () {
	var tree = new BTree(3);
	var keys = [];
	var min = 10;
	for (var i = 0; i < 20; i++) {
		keys.push(Math.random());
		tree.insert(keys[i], i);
		if (keys[i] < min)
			min = keys[i];
	}
	deepEqual(tree.minimum(), tree.search(min), "Minimum item");
	deepEqual(tree.minimumKey(), min, "Minimum key");
});

test("BTree - Maximum test", function () {
	var tree = new BTree(3);
	var keys = [];
	var max = -1;
	for (var i = 0; i < 20; i++) {
		keys.push(Math.random());
		tree.insert(keys[i], i);
		if (keys[i] > max)
			max = keys[i];
	}
	deepEqual(tree.maximum(), tree.search(max), "Maximum item");
	deepEqual(tree.maximumKey(), max, "Maximum key");
});

test("BTree - To array test", function () {
	var tree = new BTree(3);
	for (var i = 0; i < 5; i++)
		tree.insert(i, i);
	deepEqual(tree.toArray(), [0, 1, 2, 3, 4], "To array");
});

test("BTree - Filter test", function () {
	var tree = new BTree(3);

	for (var i = 0; i < 10; i++)
		tree.insert(i, i);

	var result = tree.filter(function (item) {
		return 1 - item % 2;
	});
	deepEqual(result, [0, 2, 4, 6, 8], "Filter on the even values");
});

test("BTree - Clear test", function () {
	var tree = new BTree(3);
	tree.insert(0, 0);
	tree.insert(2, 2);
	tree.clear();
	deepEqual(tree.isEmpty(), true, "Clear tree");
});

test("BTree - Is empty test", function () {
	var tree = new BTree(3);
	tree.insert(0, 0);
	tree.insert(2, 2);
	deepEqual(tree.isEmpty(), false, "Is not empty");
	tree.clear();
	deepEqual(tree.isEmpty(), true, "Is empty");
});

test("BTree - Contains test", function () {
	var tree = new BTree(3);
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

test("BTree - Execute test", function () {
	var tree = new BTree();
	tree.insert(0, 0);
	tree.insert(2, 2);
	var callback = function (item) {
		return item * 2;
	};
	tree.execute(callback);
	deepEqual(tree.search(0), 0, "Execute for key 0");
	deepEqual(tree.search(2), 4, "Execute for key 1");
});

test("BTree - Index of test", function () {
	var tree = new BTree(3);
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

test("BTree - Last index of test", function () {
	var tree = new BTree(3);
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

test("BTree - Indexes of test", function () {
	var tree = new BTree(3);
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

test("BTree - Clone test", function () {
	var tree = new BTree(3);
	for (var i = 0; i < 10; i++)
		tree.insert(i, i);
	var clone = tree.clone();
	var it = clone.getIterator();
	var j = 0;
	for (it.first(); !it.isDone(); it.next(), j++)
		deepEqual(it.getItem(), j, "Clone of the tree");
});

test("BTree - Clone distinct test", function () {
	var tree = new BTree(3);
	for (var i = 0; i < 20; i++)
		tree.insert(i, i % 10);
	var clone = tree.cloneDistinct();
	deepEqual(clone.allIndexesOf(2), [2], "Clone of the tree");
});