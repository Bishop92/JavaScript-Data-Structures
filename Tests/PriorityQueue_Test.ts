/**
 * Created by Battistella Stefano on 31/03/14.
 */

QUnit.test("PriorityQueue - Enqueue test", function (assert)
{
	var queue = new ds.PriorityQueue();
	queue.enqueue(5, 0);
	assert.deepEqual(queue.peek(), 0, "Enqueue 0");
	queue.enqueue(2, 6);
	assert.deepEqual(queue.getItem(0), 0, "Enqueue 6");
	assert.deepEqual(queue.getItem(1), 6, "Enqueue 6");
});

QUnit.test("PriorityQueue - MultiEnqueue test", function (assert)
{
	var queue = new ds.PriorityQueue();
	queue.multiEnqueue(3, [0, 2]);
	assert.deepEqual(queue.multiDequeue(2), [0, 2], "MultiEnqueue 2 items");
	queue.multiEnqueue(4, [2]);
	queue.multiEnqueue(5, [4, 5, 8]);
	assert.deepEqual(queue.multiDequeue(4), [4, 5, 8, 2], "MultiDequeue 4 items");
	queue.multiEnqueue(0, []);
	assert.deepEqual(queue.multiDequeue(1), [], "MultiEnqueue 0 items");
});

QUnit.test("PriorityQueue - Dequeue test", function (assert)
{
	var queue = new ds.PriorityQueue();
	queue.enqueue(5, 0);
	queue.enqueue(2, 2);
	assert.deepEqual(queue.dequeue(), 0, "Dequeue");
	assert.deepEqual(queue.dequeue(), 2, "Dequeue");
	assert.deepEqual(queue.dequeue(), undefined, "Check length if too much dequeue");
});

QUnit.test("PriorityQueue - MultiDequeue test", function (assert)
{
	var queue = new ds.PriorityQueue();
	queue.enqueue(10, 0);
	queue.enqueue(8, 2);
	assert.deepEqual(queue.multiDequeue(1), [0], "MultiDequeue 1 time");
	assert.deepEqual(queue.getLength(), 1, "MultiDequeue 1 time check length");
	queue.enqueue(9, 4);
	queue.enqueue(4, 5);
	queue.enqueue(6, 8);
	assert.deepEqual(queue.multiDequeue(7), [4, 2, 8, 5], "MultiDequeue 7 times");
	assert.deepEqual(queue.getLength(), 0, "MultiDequeue 7 time check length");
	assert.deepEqual(queue.multiDequeue(1), [], "MultiDequeue 1 time with queue empty");
});

QUnit.test("PriorityQueue - Remove test", function (assert)
{
	var queue = new ds.PriorityQueue();
	queue.enqueue(4, 0);
	queue.enqueue(3, 2);
	queue.enqueue(2, 4);
	queue.enqueue(1, 5);
	queue.enqueue(0, 8);
	queue.remove(2, 2);
	assert.deepEqual(queue.multiDequeue(3), [0, 2, 8], "Remove from position 2 for 2");
});

QUnit.test("PriorityQueue - Is empty test", function (assert)
{
	var queue = new ds.PriorityQueue();
	queue.enqueue(5, 0);
	queue.enqueue(2, 2);
	assert.deepEqual(queue.isEmpty(), false, "Is empty");
	queue.clear();
	assert.deepEqual(queue.isEmpty(), true, "Is empty");
});

QUnit.test("PriorityQueue - Clear test", function (assert)
{
	var queue = new ds.PriorityQueue();
	queue.enqueue(5, 0);
	queue.enqueue(5, 2);
	queue.clear();
	assert.deepEqual(queue.isEmpty(), true, "Clear queue");
});

QUnit.test("PriorityQueue - Iterator test", function (assert)
{
	var queue = new ds.PriorityQueue();
	for (var i = 0; i < 10; i++)
		queue.enqueue(10 - Math.floor(i / 2), i);
	var j = 0;
	var it = queue.getIterator();
	for (it.first(); !it.isDone(); it.next(), j++)
		assert.deepEqual(it.getItem(), j, "Get next item " + j);
	j--;
	for (it.last(); !it.isDone(); it.previous(), j--)
		assert.deepEqual(it.getItem(), j, "Get previous item " + j);
});

QUnit.test("PriorityQueue - Contains priority test", function (assert)
{
	var queue = new ds.PriorityQueue();
	queue.enqueue(5, 0);
	queue.enqueue(2, 2);
	assert.deepEqual(queue.containsPriority(5), true, "Contains priority 5");
	assert.deepEqual(queue.containsPriority(2), true, "Contains priority 2");
	assert.deepEqual(queue.containsPriority(1), false, "Not contains priority 1");
	var callback = function (item)
	{
		return item > 3;
	};
	assert.deepEqual(queue.containsPriority(null, callback), true, "Contains a priority > 3");
	callback = function (item)
	{
		return item < 2;
	};
	assert.deepEqual(queue.containsPriority(null, callback), false, "Contains a priority < 2");
});

QUnit.test("PriorityQueue - Get items test", function (assert)
{
	var queue = new ds.PriorityQueue();
	queue.enqueue(5, 0);
	queue.enqueue(5, 2);
	queue.enqueue(5, 5);
	assert.deepEqual(queue.getItems(5), [0, 2, 5], "Get items with priority 5");
	assert.deepEqual(queue.getItems(1), [], "Get items with priority 1");
});

QUnit.test("PriorityQueue - To queue test", function (assert)
{
	var priorityQueue = new ds.PriorityQueue();
	priorityQueue.enqueue(5, 0);
	priorityQueue.enqueue(5, 2);
	priorityQueue.enqueue(5, 5);
	var queue = priorityQueue.toQueue();
	assert.deepEqual(queue.items, [0, 2, 5], "Check the to queue method");
});

QUnit.test("PriorityQueue - Execute test", function (assert)
{
	var queue = new ds.PriorityQueue();
	queue.enqueue(4, 0);
	queue.enqueue(3, 2);
	var callback = function (item)
	{
		return item * 2;
	};
	queue.execute(callback);
	assert.deepEqual(queue.getItem(0), 0, "Execute for item 0");
	assert.deepEqual(queue.getItem(1), 4, "Execute for item 1");
});

QUnit.test("PriorityQueue - Remove test", function (assert)
{
	var queue = new ds.PriorityQueue();
	queue.enqueue(4, 0);
	queue.enqueue(3, 1);
	queue.enqueue(2, 2);
	queue.enqueue(1, 3);
	queue.enqueue(0, 4);
	for (var i = 0; i < 5; i++)
		assert.deepEqual(queue.getItem(i), i, "Check queue correctness");
	queue.changePriority(3, 8);
	for (var j = 0; j < 5; j++)
	{
		if (!j)
			assert.deepEqual(queue.getItem(j), 3, "Check increase priority");
		else if (j < 4)
			assert.deepEqual(queue.getItem(j), j - 1, "Check increase priority");
		else
			assert.deepEqual(queue.getItem(j), j, "Check increase priority");
	}
	queue.changePriority(3, -4);
	for (var k = 0; k < 5; k++)
	{
		if (!k)
			assert.deepEqual(queue.getItem(k), 3, "Check decrease priority");
		else if (k < 3)
			assert.deepEqual(queue.getItem(k), k - 1, "Check decrease priority");
		else if (k === 3)
			assert.deepEqual(queue.getItem(k), 4, "Check decrease priority");
		else
			assert.deepEqual(queue.getItem(k), 2, "Check decrease priority");
	}

});

QUnit.test("PriorityQueue - Filter test", function (assert)
{
	var queue = new ds.PriorityQueue();
	const length = 100;

	for (var i = 0; i < length; i++)
		queue.enqueue(i, i);

	var result = queue.filter(function (item)
	{
		return 1 - item % 2;
	});

	assert.deepEqual(result[0], 98, "Filter of the even values");
	assert.deepEqual(result[result.length - 1], 0, "Filter on the even values");
});

QUnit.test("PriorityQueue - Clone test", function (assert)
{
	var queue = new ds.PriorityQueue();
	for (var i = 0; i < 10; i++)
		queue.enqueue(i, i);
	var clone = queue.clone();
	assert.deepEqual(clone.multiDequeue(10), [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], "Clone of the queue");
});

QUnit.test("PriorityQueue - Clone distinct test", function (assert)
{
	var queue = new ds.PriorityQueue();
	for (var i = 0; i < 40; i++)
		queue.enqueue(i % 20, i % 10);
	var clone = queue.cloneDistinct();
	assert.deepEqual(clone.multiDequeue(10), [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], "Clone of the queue");
});