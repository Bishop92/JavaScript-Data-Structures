/**
 * Created by Battistella Stefano on 31/03/14.
 */

test("PriorityQueue - Enqueue test", function () {
	var queue = new PriorityQueue();
	queue.enqueue(5, 0);
	deepEqual(queue.peek(), 0, "Enqueue 0");
	queue.enqueue(2, 6);
	deepEqual(queue.getItem(0), 0, "Enqueue 6");
	deepEqual(queue.getItem(1), 6, "Enqueue 6");
});

test("PriorityQueue - MultiEnqueue test", function () {
	var queue = new PriorityQueue();
	queue.multiEnqueue(3, [0, 2]);
	deepEqual(queue.multiDequeue(2), [0, 2], "MultiEnqueue 2 items");
	queue.multiEnqueue(4, [2]);
	queue.multiEnqueue(5, [4, 5, 8]);
	deepEqual(queue.multiDequeue(4), [4, 5, 8, 2], "MultiDequeue 4 items");
	queue.multiEnqueue(0, []);
	deepEqual(queue.multiDequeue(1), [], "MultiEnqueue 0 items");
});

test("PriorityQueue - Dequeue test", function () {
	var queue = new PriorityQueue();
	queue.enqueue(5, 0);
	queue.enqueue(2, 2);
	deepEqual(queue.dequeue(), 0, "Dequeue");
	deepEqual(queue.dequeue(), 2, "Dequeue");
	deepEqual(queue.dequeue(), undefined, "Check length if too much dequeue");
});

test("PriorityQueue - MultiDequeue test", function () {
	var queue = new PriorityQueue();
	queue.enqueue(10, 0);
	queue.enqueue(8, 2);
	deepEqual(queue.multiDequeue(1), [0], "MultiDequeue 1 time");
	deepEqual(queue.getLength(), 1, "MultiDequeue 1 time check length");
	queue.enqueue(9, 4);
	queue.enqueue(4, 5);
	queue.enqueue(6, 8);
	deepEqual(queue.multiDequeue(7), [4, 2, 8, 5], "MultiDequeue 7 times");
	deepEqual(queue.getLength(), 0, "MultiDequeue 7 time check length");
	deepEqual(queue.multiDequeue(1), [], "MultiDequeue 1 time with queue empty");
});

test("PriorityQueue - Remove test", function () {
	var queue = new PriorityQueue();
	queue.enqueue(4, 0);
	queue.enqueue(3, 2);
	queue.enqueue(2, 4);
	queue.enqueue(1, 5);
	queue.enqueue(0, 8);
	queue.remove(2, 2);
	deepEqual(queue.multiDequeue(3), [0, 2, 8], "Remove from position 2 for 2");
});

test("PriorityQueue - Is empty test", function () {
	var queue = new PriorityQueue();
	queue.enqueue(5, 0);
	queue.enqueue(2, 2);
	deepEqual(queue.isEmpty(), false, "Is empty");
	queue.clear();
	deepEqual(queue.isEmpty(), true, "Is empty");
});

test("PriorityQueue - Clear test", function () {
	var queue = new PriorityQueue();
	queue.enqueue(5, 0);
	queue.enqueue(5, 2);
	queue.clear();
	deepEqual(queue.isEmpty(), true, "Clear queue");
});

test("PriorityQueue - Iterator test", function () {
	var queue = new PriorityQueue();
	for (var i = 0; i < 10; i++)
		queue.enqueue(10 - Math.floor(i / 2), i);
	var j = 0;
	var it = queue.getIterator();
	for (it.first(); !it.isDone(); it.next(), j++)
		deepEqual(it.getItem(), j, "Get next item " + j);
	j--;
	for (it.last(); !it.isDone(); it.previous(), j--)
		deepEqual(it.getItem(), j, "Get previous item " + j);
});

test("PriorityQueue - Contains priority test", function () {
	var queue = new PriorityQueue();
	queue.enqueue(5, 0);
	queue.enqueue(2, 2);
	deepEqual(queue.containsPriority(5), true, "Contains priority 5");
	deepEqual(queue.containsPriority(2), true, "Contains priority 2");
	deepEqual(queue.containsPriority(1), false, "Not contains priority 1");
	var callback = function (item) {
		return item > 3;
	};
	deepEqual(queue.containsPriority(null, callback), true, "Contains a priority > 3");
	callback = function (item) {
		return item < 2;
	};
	deepEqual(queue.containsPriority(null, callback), false, "Contains a priority < 2");
});

test("PriorityQueue - Get items test", function () {
	var queue = new PriorityQueue();
	queue.enqueue(5, 0);
	queue.enqueue(5, 2);
	queue.enqueue(5, 5);
	deepEqual(queue.getItems(5), [0, 2, 5], "Get items with priority 5");
	deepEqual(queue.getItems(1), [], "Get items with priority 1");
});

test("PriorityQueue - To queue test", function () {
	var priorityQueue = new PriorityQueue();
	priorityQueue.enqueue(5, 0);
	priorityQueue.enqueue(5, 2);
	priorityQueue.enqueue(5, 5);
	var queue = priorityQueue.toQueue();
	deepEqual(queue.items, [0, 2, 5], "Check the to queue method");
});

test("PriorityQueue - Execute test", function () {
	var queue = new PriorityQueue();
	queue.enqueue(4, 0);
	queue.enqueue(3, 2);
	var callback = function (item) {
		return item * 2;
	};
	queue.execute(callback);
	deepEqual(queue.getItem(0), 0, "Execute for item 0");
	deepEqual(queue.getItem(1), 4, "Execute for item 1");
});

test("PriorityQueue - Remove test", function () {
	var queue = new PriorityQueue();
	queue.enqueue(4, 0);
	queue.enqueue(3, 1);
	queue.enqueue(2, 2);
	queue.enqueue(1, 3);
	queue.enqueue(0, 4);
	for (var i = 0; i < 5; i++)
		deepEqual(queue.getItem(i), i, "Check queue correctness");
	queue.changePriority(3, 8);
	for (var j = 0; j < 5; j++) {
		if (!j)
			deepEqual(queue.getItem(j), 3, "Check increase priority");
		else if (j < 4)
			deepEqual(queue.getItem(j), j - 1, "Check increase priority");
		else
			deepEqual(queue.getItem(j), j, "Check increase priority");
	}
	queue.changePriority(3, -4);
	for (var k = 0; k < 5; k++) {
		if (!k)
			deepEqual(queue.getItem(k), 3, "Check decrease priority");
		else if (k < 3)
			deepEqual(queue.getItem(k), k - 1, "Check decrease priority");
		else if (k === 3)
			deepEqual(queue.getItem(k), 4, "Check decrease priority");
		else
			deepEqual(queue.getItem(k), 2, "Check decrease priority");
	}

});

test("PriorityQueue - Filter test", function () {
	var queue = new PriorityQueue();
	const length = 100;

	for (var i = 0; i < length; i++)
		queue.enqueue(i, i);

	var result = queue.filter(function (item) {
		return 1 - item % 2;
	});

	deepEqual(result[0], 98, "Filter of the even values");
	deepEqual(result[result.length - 1], 0, "Filter on the even values");
});

test("PriorityQueue - Clone test", function () {
	var queue = new PriorityQueue();
	for (var i = 0; i < 10; i++)
		queue.enqueue(i, i);
	var clone = queue.clone();
	deepEqual(clone.multiDequeue(10), [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], "Clone of the queue");
});

test("PriorityQueue - Clone distinct test", function () {
	var queue = new PriorityQueue();
	for (var i = 0; i < 40; i++)
		queue.enqueue(i % 20, i % 10);
	var clone = queue.cloneDistinct();
	deepEqual(clone.multiDequeue(10), [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], "Clone of the queue");
});