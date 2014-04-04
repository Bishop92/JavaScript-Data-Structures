/**
 * Created by Stefano on 31/03/14.
 */

test("DoubleLinkedList - Push test", function () {
	var list = new DoubleLinkedList();
	list.pushFront(0);
	list.pushFront(1);
	list.pushBack(2);
	list.pushBack(3);
	deepEqual(list.getItem(0), 1, "Push front 1");
	deepEqual(list.getItem(1), 0, "Push front 0");
	deepEqual(list.getItem(2), 2, "Push back 2");
	deepEqual(list.getItem(3), 3, "Push back 3");
});

test("DoubleLinkedList - Pop test", function () {
	var list = new DoubleLinkedList();
	list.pushFront(0);
	list.pushFront(1);
	list.pushBack(2);
	list.pushBack(3);
	deepEqual(list.popBack(), 3, "Pop back 3");
	deepEqual(list.popFront(), 1, "Pop front 1");
	deepEqual(list.popBack(), 2, "Pop back 2");
	deepEqual(list.popFront(), 0, "Pop front 0");
});

test("DoubleLinkedList - Remove at test", function () {
	var list = new DoubleLinkedList();
	list.pushFront(0);
	list.pushFront(1);
	list.pushBack(2);
	list.pushBack(3);
	deepEqual(list.removeAt(1), 0, "Remove at 1");
	deepEqual(list.removeAt(1), 2, "Remove at 1");
	deepEqual(list.removeAt(1), 3, "Remove at 1");
	deepEqual(list.removeAt(0), 1, "Remove at 0");
});

test("DoubleLinkedList - Sort test", function () {
	var list = new DoubleLinkedList();
	const length = 100;
	for (var i = 0; i < length; i++)
		list.pushFront(i);

	list.sort();
	deepEqual(list.getItem(0), 0, "Sort");
	deepEqual(list.getItem(length - 1), length - 1, "Sort");
});

test("DoubleLinkedList - Sort with callback test", function () {
	var list = new DoubleLinkedList();
	const length = 100;

	for (var i = 0; i < length; i++)
		list.pushFront(i);

	list.sort(
		function (item) {
			return -item;
		}
	);
	deepEqual(list.getItem(0), length - 1, "Sort with callback");
	deepEqual(list.getItem(length - 1), 0, "Sort with callback");
});

test("DoubleLinkedList - Filter test", function () {
	var list = new DoubleLinkedList();
	const length = 100;

	for (var i = 0; i < length; i++)
		list.pushFront(i);

	var result = list.filter(function (item) {
		return 1 - item % 2;
	});

	deepEqual(result[0], 98, "Filter of the pairs values");
	deepEqual(result[result.length - 1], 0, "Filter on the pairs values");
});

test("DoubleLinkedList - Reverse test", function () {
	var list = new DoubleLinkedList();
	const length = 100;

	for (var i = 0; i < length; i++)
		list.pushFront(i);

	list.reverse();

	deepEqual(list.getItem(0), 0, "Reverse");
	deepEqual(list.getItem(length - 1), 99, "Reverse");
});

test("DoubleLinkedList - Iterator test", function () {
	var list = new DoubleLinkedList();

	for (var i = 0; i < 100; i++)
		list.pushBack(i);

	var it = list.getIterator();

	var j = 0;
	for (it.first(); !it.isDone(); it.next(), j++) {
		deepEqual(it.getItem(), j, "Check iterator position");
	}
	for (it.last(); !it.isDone(); it.previous(), j--) {
		deepEqual(it.getItem(), j - 1, "Check iterator position");
	}

});