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