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
		console.log(tree.minimum());
		deepEqual(tree.minimum().item, j, "Deletion");
		tree.deleteNode(tree.minimum());
		j++;
	}
});