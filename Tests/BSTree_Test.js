/**
 * Created by Stefano on 06/04/14.
 */

test("BSTree - Insert test", function () {
	var tree = new BSTree();
	var keys = [];
	for (var i = 0; i < 20; i++) {
		keys.push(Math.random());
		tree.insert(keys[i], i);
	}
	for (var j = 0; j < 20; j++)
		deepEqual(tree.search(keys[j]), j, "Insert node");
});

test("BSTree - Minimum test", function () {
	var tree = new BSTree();
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

test("BSTree - Maximum test", function () {
	var tree = new BSTree();
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

test("BSTree - Successor test", function () {
	var tree = new BSTree();
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

test("BSTree - Predecessor test", function () {
	var tree = new BSTree();
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

test("BSTree - Delete node test", function () {
	var tree = new BSTree();
	for (var i = 0; i < 20; i++)
		tree.insert(i, i);
	var j = 0;
	while (tree.minimum()) {
		deepEqual(tree.minimum().item, j, "Deletion");
		tree.deleteNode(tree.minimum());
		j++;
	}
});