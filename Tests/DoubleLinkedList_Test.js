/**
 * Created by Stefano on 31/03/14.
 */

test("DoubleLinkedList - Init test", function () {
	var list = new DoubleLinkedList(0, 1, 2);
	deepEqual(list.toArray(), [0, 1, 2], "Init list");
    list = new DoubleLinkedList(2);
    deepEqual(list.toArray(), [2], "Init list");
});

test("DoubleLinkedList - Init range test", function () {
    var list = new DoubleLinkedList(Range(0, 2));
    deepEqual(list.toArray(), [0, 1, 2], "Init list");
    list = new DoubleLinkedList(Range(2, -2, -0.5));
    deepEqual(list.toArray(), [2, 1.5, 1, 0.5, 0, -0.5, -1, -1.5, -2], "Init list");
});

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

test("DoubleLinkedList - Remove test", function () {
	var list = new DoubleLinkedList();
	for (var i = 0; i < 30; i++)
		list.pushBack(i % 10);
	list.pushBack(15);
	var callback = function (item) {
		return !(item % 2) && item > 5;
	};
	list.remove(0);
	deepEqual(list.indexOf(0), 9, "Remove 0");
	list.remove(15);
	deepEqual(list.indexOf(15), -1, "Remove 15");
	list.remove(9);
	list.remove(9);
	list.remove(9);
	deepEqual(list.indexOf(9), -1, "Remove 9");
	list.remove(0, callback);
	deepEqual(list.indexOf(6), 13, "Remove the first even numbers greater than 5");
});

test("DoubleLinkedList - Remove all test", function () {
	var list = new DoubleLinkedList();
	for (var i = 0; i < 30; i++)
		list.pushBack(i % 10);
	var callback = function (item) {
		return !(item % 2) && item > 5;
	};
	list.removeAll(0);
	deepEqual(list.indexOf(0), -1, "Remove all 0");
	list.removeAll(9);
	deepEqual(list.indexOf(9), -1, "Remove all 9");
	list.removeAll(0, callback);
	deepEqual(list.indexOf(8), -1, "Remove all the even numbers greater than 5");
});

test("DoubleLinkedList - Remove segment test", function () {
	var list = new DoubleLinkedList();
	for (var i = 0; i < 10; i++)
		list.pushBack(i);
	deepEqual(list.removeSegment(2, 6), [2, 3, 4, 5, 6], "Remove the segment from the list");
	deepEqual(list.toArray(), [0, 1, 7, 8, 9], "Remove the segment from the list");
	deepEqual(list.getLength(), 5, "Remove the segment from the list");
	deepEqual(list.removeSegment(2, 1), [7, 8, 9], "Remove the segment from the list");
	deepEqual(list.toArray(), [0, 1], "Remove the segment from the list");
	deepEqual(list.getLength(), 2, "Remove the segment from the list");
});

test("DoubleLinkedList - Modify at test", function () {
	var list = new DoubleLinkedList();
	for (var i = 0; i < 4; i++)
		list.pushBack(i);
	list.modifyAt(2, 6);
	deepEqual(list.toArray(), [0, 1, 6, 3], "Change at valid position");
	list.modifyAt(5, 5);
	deepEqual(list.toArray(), [0, 1, 6, 3], "Change at non valid position");
});

test("DoubleLinkedList - Delete node test", function () {
	var list = new DoubleLinkedList();
	list.pushFront(0);
	list.pushFront(1);
	list.pushBack(2);
	list.pushBack(3);
	var it = list.getIterator();
	for (it.first(); !it.isDone(); it.next())
		if (it.getItem())
			list.deleteNode(it.getNode());
	deepEqual(list.getItem(0), 0, "Delete node");
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

	deepEqual(result[0], 98, "Filter of the even values");
	deepEqual(result[result.length - 1], 0, "Filter on the even values");
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

test("DoubleLinkedList - Add at test", function () {
	var list = new DoubleLinkedList();
	list.addAt(5, 0);
	deepEqual(list.peek(), 5, "Add at 0");
	list.addAt(2, 1);
	deepEqual(list.getItem(1), 2, "Add at 1");
	list.addAt(15, 6);
	deepEqual(list.getItem(2), undefined, "Add at 6");
	deepEqual(list.getItem(5), undefined, "Add at 6");
	deepEqual(list.getItem(6), 15, "Add at 6");
	list.addAt(30, 6);
	deepEqual(list.getItem(6), 30, "Add at 6");
	deepEqual(list.getItem(7), 15, "Add at 6");
	list.addAt(6, 0);
	deepEqual(list.peek(), 6, "Add at 0");
});

test("DoubleLinkedList - MultiPop test", function () {
	var list = new DoubleLinkedList();
	list.pushFront(0);
	list.pushFront(1);
	list.pushBack(2);
	list.pushBack(3);
	deepEqual(list.multiPopBack(2), [3, 2], "Multi pop back");
	deepEqual(list.multiPopFront(2), [1, 0], "Multi pop front");
});

test("DoubleLinkedList - Get length test", function () {
	var list = new DoubleLinkedList();
	deepEqual(list.getLength(), 0, "Get length empty");
	list.pushFront(0);
	list.pushFront(1);
	list.pushBack(2);
	list.pushBack(3);
	deepEqual(list.getLength(), 4, "Get length");
	list.multiPopBack(2);
	deepEqual(list.getLength(), 2, "Get length");

});

test("DoubleLinkedList - Peek test", function () {
	var list = new DoubleLinkedList();
	list.pushFront(0);
	deepEqual(list.peek(), 0, "Peek");
	list.pushFront(1);
	list.pushBack(2);
	deepEqual(list.peek(), 1, "Peek");
	list.pushBack(3);
	deepEqual(list.peek(), 1, "Peek");
});

test("DoubleLinkedList - Clear test", function () {
	var list = new DoubleLinkedList();
	list.pushFront(0);
	list.pushFront(1);
	list.pushBack(2);
	list.pushBack(3);
	list.clear();
	deepEqual(list.getLength(), 0, "Clear the list");

});

test("DoubleLinkedList - Is empty test", function () {
	var list = new DoubleLinkedList();
	deepEqual(list.isEmpty(), true, "Is empty");
	list.pushFront(0);
	list.pushFront(1);
	list.pushBack(2);
	list.pushBack(3);
	deepEqual(list.isEmpty(), false, "Is not empty");
	list.clear();
	deepEqual(list.isEmpty(), true, "Is empty");
});

test("DoubleLinkedList - contains", function () {
	var list = new DoubleLinkedList();
	list.pushBack(0);
	list.pushBack(2);
	deepEqual(list.contains(0), true, "Contains 0");
	deepEqual(list.contains(2), true, "Contains 2");
	deepEqual(list.contains(1), false, "Not contains 1");
	var callback = function (item) {
		return item > 0;
	};
	deepEqual(list.contains(null, callback), true, "Contains a value > 0");
	callback = function (item) {
		return item < 0;
	};
	deepEqual(list.contains(null, callback), false, "Contains a value < 0");
});

test("DoubleLinkedList - execute", function () {
	var list = new DoubleLinkedList();
	list.pushBack(0);
	list.pushBack(2);
	var callback = function (item) {
		return item * 2;
	};
	list.execute(callback);
	deepEqual(list.getItem(0), 0, "Execute for item 0");
	deepEqual(list.getItem(1), 4, "Execute for item 1");
});

test("DoubleLinkedList - Index of test", function () {
	var list = new DoubleLinkedList();
	for (var i = 0; i < 10; i++)
		list.pushBack(i);
	var callback = function (item) {
		return !(item % 2) && item > 5;
	};
	deepEqual(list.indexOf(0), 0, "Index of 0");
	deepEqual(list.indexOf(15), -1, "Index of 15");
	deepEqual(list.indexOf(5), 5, "Index of 5");
	list.removeAt(5);
	deepEqual(list.indexOf(6), 5, "Index of 6");
	deepEqual(list.indexOf(null, callback), 5, "Index of the first even number greater than 5");
});

test("DoubleLinkedList - Last index of test", function () {
	var list = new DoubleLinkedList();
	for (var i = 0; i < 10; i++)
		list.pushBack(i);
	var callback = function (item) {
		return !(item % 2) && item > 5;
	};
	deepEqual(list.lastIndexOf(0), 0, "Last index of 0");
	deepEqual(list.lastIndexOf(15), -1, "Last index of 15");
	deepEqual(list.lastIndexOf(5), 5, "Last index of 5");
	list.removeAt(5);
	deepEqual(list.lastIndexOf(6), 5, "Last index of 6");
	deepEqual(list.lastIndexOf(null, callback), 7, "Index of the last even number greater than 5");
});

test("DoubleLinkedList - Indexes of test", function () {
	var list = new DoubleLinkedList();
	for (var i = 0; i < 30; i++)
		list.pushBack(i % 10);
	var callback = function (item) {
		return !(item % 2) && item > 5;
	};
	deepEqual(list.allIndexesOf(0), [0, 10, 20], "Indexes of 0");
	deepEqual(list.allIndexesOf(15), [], "Indexes of 15");
	deepEqual(list.allIndexesOf(5), [5, 15, 25], "Indexes of 5");
	list.removeAt(5);
	deepEqual(list.allIndexesOf(5), [14, 24], "Indexes of 5");
	deepEqual(list.allIndexesOf(6), [5, 15, 25], "Indexes of 6");
	deepEqual(list.allIndexesOf(null, callback), [5, 7, 15, 17, 25, 27], "Indexes of the even numbers greater than 5");
});

test("DoubleLinkedList - Join test", function () {
	var listA = new DoubleLinkedList();
	var listB = new DoubleLinkedList();
	for (var i = 0; i < 5; i++) {
		listA.pushBack(i);
		listB.pushBack(i);
	}
	listA.join(listB);
	deepEqual(listA.allIndexesOf(3), [3, 8], "Join of the lists");
	deepEqual(listA.getLength(), 10, "Check the length of the list");
});

test("DoubleLinkedList - Divide test", function () {
	var list = new DoubleLinkedList();
	for (var i = 0; i < 10; i++)
		list.pushBack(i);
	var listA = list.divide(-1);
	deepEqual(listA.isEmpty(), true, "Divide before start");
	var listB = list.divide(10);
	deepEqual(listB.isEmpty(), true, "Divide after end");
	var listC = list.divide(8);
	deepEqual(listC.getItem(0), 8, "Divide at valid position");
	deepEqual(listC.getItem(1), 9, "Divide at valid position");
	deepEqual(listC.getLength(), 2, "Divide at valid position");
	deepEqual(list.getItem(8), undefined, "Divide at valid position");
	deepEqual(list.getLength(), 8, "Divide at valid position");
	var listD = list.divide(0);
	deepEqual(listD.getLength(), 8, "Divide at the first position");
	deepEqual(listD.getItem(0), 0, "Divide at the first position");
	deepEqual(listD.getItem(8), undefined, "Divide at the first position");
	deepEqual(listD.getItem(7), 7, "Divide at the first position");
	deepEqual(list.getLength(), 0, "Divide at the first position");
	deepEqual(list.getItem(0), undefined, "Divide at the first position");
});

test("DoubleLinkedList - Clone test", function () {
	var list = new DoubleLinkedList();
	for (var i = 0; i < 10; i++)
		list.pushBack(i);
	var clone = list.clone();
	var it = clone.getIterator();
	var j = 0;
	for (it.first(); !it.isDone(); it.next(), j++)
		deepEqual(it.getItem(), j, "Clone of the list");
});

test("DoubleLinkedList - Clone distinct test", function () {
	var list = new DoubleLinkedList();
	for (var i = 0; i < 20; i++)
		list.pushBack(i % 10);
	var clone = list.cloneDistinct();
	deepEqual(clone.allIndexesOf(2), [2], "Clone of the list");
});

test("DoubleLinkedList - Split test", function () {
	var list = new DoubleLinkedList();
	for (var i = 0; i < 7; i++)
		list.pushBack(i);
	var lists = list.split(3);
	deepEqual(lists.length, 3, "Check the number of lists created");
	deepEqual(lists[0].toArray(), [0, 1, 2], "Check the items in the lists created");
	deepEqual(lists[1].toArray(), [3, 4, 5], "Check the items in the lists created");
	deepEqual(lists[2].toArray(), [6], "Check the items in the lists created");
});

test("DoubleLinkedList - Count test", function () {
	var list = new DoubleLinkedList();
	for (var i = 0; i < 10; i++)
		list.pushBack(i);
	var callback = function (item) {
		return item > 4;
	};
	deepEqual(list.count(callback), 5, "Count the items that are greater than 4");
});