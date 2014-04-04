/**
 * Created by Stefano on 31/03/14.
 */

test("LinkedList - Push test", function () {
	var list = new LinkedList();
	list.pushFront(0);
	list.pushFront(1);
	list.pushBack(2);
	list.pushBack(3);
	deepEqual(list.getItem(0), 1, "Push front 1");
	deepEqual(list.getItem(1), 0, "Push front 0");
	deepEqual(list.getItem(2), 2, "Push back 2");
	deepEqual(list.getItem(3), 3, "Push back 3");
});

test("LinkedList - Pop test", function () {
	var list = new LinkedList();
	list.pushFront(0);
	list.pushFront(1);
	list.pushBack(2);
	list.pushBack(3);
	deepEqual(list.popBack(), 3, "Pop back 3");
	deepEqual(list.popFront(), 1, "Pop front 1");
	deepEqual(list.popBack(), 2, "Pop back 2");
	deepEqual(list.popFront(), 0, "Pop front 0");
});

test("LinkedList - Remove at test", function () {
	var list = new LinkedList();
	list.pushFront(0);
	list.pushFront(1);
	list.pushBack(2);
	list.pushBack(3);
	deepEqual(list.removeAt(1), 0, "Remove at 1");
	deepEqual(list.removeAt(1), 2, "Remove at 1");
	deepEqual(list.removeAt(1), 3, "Remove at 1");
	deepEqual(list.removeAt(0), 1, "Remove at 0");
});

test("LinkedList - To array test", function () {
	var list = new LinkedList();
	list.pushFront(0);
	list.pushFront(1);
	list.pushBack(2);
	list.pushBack(3);
	var array = list.toArray();
	deepEqual(array[0], 1, "To array");
	deepEqual(array[1], 0, "To array");
	deepEqual(array[2], 2, "To array");
	deepEqual(array[3], 3, "To array");
});

test("LinkedList - From array test", function () {
	var array = [5, 2, 6, 4];
	var list = new LinkedList();
	list.fromArray(array);
	deepEqual(list.getItem(0), 5, "From array");
	deepEqual(list.getItem(1), 2, "From array");
	deepEqual(list.getItem(2), 6, "From array");
	deepEqual(list.getItem(3), 4, "From array");
});

test("LinkedList - Filter test", function () {
	var list = new LinkedList();
	const length = 100;

	for (var i = 0; i < length; i++)
		list.pushFront(i);

	var result = list.filter(function (item) {
		return 1 - item % 2;
	});

	deepEqual(result[0], 98, "Filter of the pairs values");
	deepEqual(result[result.length - 1], 0, "Filter on the pairs values");
});

test("LinkedList - Iterator test", function () {
	var list = new LinkedList();

	for (var i = 0; i < 100; i++)
		list.pushBack(i);

	var it = list.getIterator();

	var j = 0;
	for (it.first(); !it.isDone(); it.next(), j++) {
		deepEqual(it.getItem(), j, "Check iterator position");
	}

});