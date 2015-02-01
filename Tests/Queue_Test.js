/**
 * Created by Battistella Stefano on 31/03/14.
 */

test("Queue - Init test", function () {
	var queue = new Queue(0, 2, 4, 6);
	deepEqual(queue.multiDequeue(4), [0, 2, 4, 6], "Initializing");
    queue = new Queue(0);
    deepEqual(queue.multiDequeue(4), [0], "Initializing");
});

test("Queue - Init range test", function () {
    var queue = new Queue(Range(0, 6, 2));
    deepEqual(queue.multiDequeue(4), [0, 2, 4, 6], "Initializing");
});

test("Queue - Enqueue test", function () {
	var queue = new Queue();
	queue.enqueue(0);
	deepEqual(queue.peek(), 0, "Enqueue 0");
	queue.enqueue(2);
	deepEqual(queue.getItem(0), 0, "Enqueue 2");
	deepEqual(queue.getItem(1), 2, "Enqueue 2");
});

test("Queue - MultiEnqueue test", function () {
	var queue = new Queue();
	queue.multiEnqueue([0, 2]);
	deepEqual(queue.multiDequeue(2), [0, 2], "MultiEnqueue 2 items");
	queue.multiEnqueue([2]);
	queue.multiEnqueue([4, 5, 8]);
	deepEqual(queue.multiDequeue(4), [2, 4, 5, 8], "MultiDequeue 4 items");
	queue.multiEnqueue([]);
	deepEqual(queue.multiDequeue(1), [], "MultiEnqueue 0 items");
});

test("Queue - Dequeue test", function () {
	var queue = new Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	deepEqual(queue.dequeue(), 0, "Dequeue");
	deepEqual(queue.dequeue(), 2, "Dequeue");
	deepEqual(queue.dequeue(), undefined, "Check length if too much dequeue");
});

test("Queue - MultiDequeue test", function () {
	var queue = new Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	deepEqual(queue.multiDequeue(1), [0], "MultiDequeue 1 time");
	queue.enqueue(4);
	queue.enqueue(5);
	queue.enqueue(8);
	deepEqual(queue.multiDequeue(7), [2, 4, 5, 8], "MultiDequeue 7 times");
	deepEqual(queue.multiDequeue(1), [], "MultiDequeue 1 time with queue empty");
});

test("Queue - Remove test", function () {
	var queue = new Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	queue.enqueue(4);
	queue.enqueue(5);
	queue.enqueue(8);
	queue.remove(2, 2);
	deepEqual(queue.multiDequeue(3), [0, 2, 8], "Remove from position 2 for 2");
});

test("Queue - Iterator test", function () {
	var queue = new Queue();
	for (var i = 0; i < 10; i++)
		queue.enqueue(i);
	var j = 0;
	var it = queue.getIterator();
	for (it.first(); !it.isDone(); it.next(), j++)
		deepEqual(it.getItem(), j, "Get next item " + j);
	j--;
	for (it.last(); !it.isDone(); it.previous(), j--)
		deepEqual(it.getItem(), j, "Get previous item " + j);
});

test("Queue - Get length test", function () {
	var queue = new Queue();
	deepEqual(queue.getLength(), 0, "Length 0");
	queue.enqueue(0);
	deepEqual(queue.getLength(), 1, "Length 1");
	queue.enqueue(2);
	deepEqual(queue.getLength(), 2, "Length 2");
	queue.dequeue();
	queue.dequeue();
	deepEqual(queue.getLength(), 0, "Length 0");

});

test("Queue - Peek test", function () {
	var queue = new Queue();
	queue.enqueue(0);
	deepEqual(queue.peek(), 0, "Peek 0");
	queue.enqueue(2);
	deepEqual(queue.peek(), 0, "Peek 0");
});

test("Queue - Clear test", function () {
	var queue = new Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	queue.clear();
	deepEqual(queue.isEmpty(), true, "Clear queue");
});

test("Queue - Is empty test", function () {
	var queue = new Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	deepEqual(queue.isEmpty(), false, "Is not empty");
	queue.clear();
	deepEqual(queue.isEmpty(), true, "Is empty");
});

test("Queue - Contains test", function () {
	var queue = new Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	deepEqual(queue.contains(0), true, "Contains 0");
	deepEqual(queue.contains(2), true, "Contains 2");
	deepEqual(queue.contains(1), false, "Not contains 1");
	var callback = function (item) {
		return item > 0;
	};
	deepEqual(queue.contains(null, callback), true, "Contains a value > 0");
	callback = function (item) {
		return item < 0;
	};
	deepEqual(queue.contains(null, callback), false, "Contains a value < 0");
});

test("Queue - Execute test", function () {
	var queue = new Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	var callback = function (item) {
		return item * 2;
	};
	queue.execute(callback);
	deepEqual(queue.getItem(0), 0, "Execute for item 0");
	deepEqual(queue.getItem(1), 4, "Execute for item 1");
});

test("Queue - Index of test", function () {
	var queue = new Queue();
	for (var i = 0; i < 10; i++)
		queue.enqueue(i);
	var callback = function (item) {
		return !(item % 2) && item > 5;
	};
	deepEqual(queue.indexOf(0), 0, "Index of 0");
	deepEqual(queue.indexOf(15), -1, "Index of 15");
	deepEqual(queue.indexOf(5), 5, "Index of 5");
	deepEqual(queue.indexOf(null, callback), 6, "Index of the first even number greater than 5");
});

test("Queue - Last index of test", function () {
	var queue = new Queue();
	for (var i = 0; i < 10; i++)
		queue.enqueue(i);
	var callback = function (item) {
		return !(item % 2) && item > 5;
	};
	deepEqual(queue.lastIndexOf(0), 0, "Last index of 0");
	deepEqual(queue.lastIndexOf(15), -1, "Last index of 15");
	deepEqual(queue.lastIndexOf(5), 5, "Last index of 5");
	deepEqual(queue.lastIndexOf(null, callback), 8, "Index of the last even number greater than 5");
});

test("Queue - Indexes of test", function () {
	var queue = new Queue();
	for (var i = 0; i < 30; i++)
		queue.enqueue(i % 10);
	var callback = function (item) {
		return !(item % 2) && item > 5;
	};
	deepEqual(queue.allIndexesOf(0), [0, 10, 20], "Indexes of 0");
	deepEqual(queue.allIndexesOf(15), [], "Indexes of 15");
	deepEqual(queue.allIndexesOf(5), [5, 15, 25], "Indexes of 5");
	deepEqual(queue.allIndexesOf(null, callback), [6, 8, 16, 18, 26, 28], "Indexes of the even numbers greater than 5");
});

test("Queue - Clone test", function () {
	var queue = new Queue();
	for (var i = 0; i < 10; i++)
		queue.enqueue(i);
	var clone = queue.clone();
	var it = clone.getIterator();
	var j = 0;
	for (it.first(); !it.isDone(); it.next(), j++)
		deepEqual(it.getItem(), j, "Clone of the queue");
});

test("Queue - Clone distinct test", function () {
	var queue = new Queue();
	for (var i = 0; i < 20; i++)
		queue.enqueue(i % 10);
	var clone = queue.cloneDistinct();
	deepEqual(clone.allIndexesOf(2), [2], "Clone of the queue");
});

test("Queue - Filter test", function () {
	var queue = new Queue();
	const length = 100;

	for (var i = 0; i < length; i++)
		queue.enqueue(i);

	var result = queue.filter(function (item) {
		return 1 - item % 2;
	});

	deepEqual(result[0], 0, "Filter of the even values");
	deepEqual(result[result.length - 1], 98, "Filter on the even values");
});