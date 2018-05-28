/**
 * Created by Battistella Stefano on 31/03/14.
 */

QUnit.test("Queue - Init test", function (assert)
{
	var queue = new ds.Queue(0, 2, 4, 6);
	assert.deepEqual(queue.multiDequeue(4), [0, 2, 4, 6], "Initializing");
	queue = new ds.Queue(0);
	assert.deepEqual(queue.multiDequeue(4), [0], "Initializing");
});

QUnit.test("Queue - Init range test", function (assert)
{
	var queue = new ds.Queue(ds.Range(0, 6, 2));
	assert.deepEqual(queue.multiDequeue(4), [0, 2, 4, 6], "Initializing");
});

QUnit.test("Queue - Enqueue test", function (assert)
{
	var queue = new ds.Queue();
	queue.enqueue(0);
	assert.deepEqual(queue.peek(), 0, "Enqueue 0");
	queue.enqueue(2);
	assert.deepEqual(queue.getItem(0), 0, "Enqueue 2");
	assert.deepEqual(queue.getItem(1), 2, "Enqueue 2");
});

QUnit.test("Queue - MultiEnqueue test", function (assert)
{
	var queue = new ds.Queue();
	queue.multiEnqueue([0, 2]);
	assert.deepEqual(queue.multiDequeue(2), [0, 2], "MultiEnqueue 2 items");
	queue.multiEnqueue([2]);
	queue.multiEnqueue([4, 5, 8]);
	assert.deepEqual(queue.multiDequeue(4), [2, 4, 5, 8], "MultiDequeue 4 items");
	queue.multiEnqueue([]);
	assert.deepEqual(queue.multiDequeue(1), [], "MultiEnqueue 0 items");
});

QUnit.test("Queue - Dequeue test", function (assert)
{
	var queue = new ds.Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	assert.deepEqual(queue.dequeue(), 0, "Dequeue");
	assert.deepEqual(queue.dequeue(), 2, "Dequeue");
	assert.deepEqual(queue.dequeue(), undefined, "Check length if too much dequeue");
});

QUnit.test("Queue - MultiDequeue test", function (assert)
{
	var queue = new ds.Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	assert.deepEqual(queue.multiDequeue(1), [0], "MultiDequeue 1 time");
	queue.enqueue(4);
	queue.enqueue(5);
	queue.enqueue(8);
	assert.deepEqual(queue.multiDequeue(7), [2, 4, 5, 8], "MultiDequeue 7 times");
	assert.deepEqual(queue.multiDequeue(1), [], "MultiDequeue 1 time with queue empty");
});

QUnit.test("Queue - Remove test", function (assert)
{
	var queue = new ds.Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	queue.enqueue(4);
	queue.enqueue(5);
	queue.enqueue(8);
	queue.remove(2, 2);
	assert.deepEqual(queue.multiDequeue(3), [0, 2, 8], "Remove from position 2 for 2");
});

QUnit.test("Queue - Iterator test", function (assert)
{
	var queue = new ds.Queue();
	for (var i = 0; i < 10; i++)
		queue.enqueue(i);
	var j = 0;
	var it = queue.getIterator();
	for (it.first(); !it.isDone(); it.next(), j++)
		assert.deepEqual(it.getItem(), j, "Get next item " + j);
	j--;
	for (it.last(); !it.isDone(); it.previous(), j--)
		assert.deepEqual(it.getItem(), j, "Get previous item " + j);
});

QUnit.test("Queue - Get length test", function (assert)
{
	var queue = new ds.Queue();
	assert.deepEqual(queue.getLength(), 0, "Length 0");
	queue.enqueue(0);
	assert.deepEqual(queue.getLength(), 1, "Length 1");
	queue.enqueue(2);
	assert.deepEqual(queue.getLength(), 2, "Length 2");
	queue.dequeue();
	queue.dequeue();
	assert.deepEqual(queue.getLength(), 0, "Length 0");

});

QUnit.test("Queue - Peek test", function (assert)
{
	var queue = new ds.Queue();
	queue.enqueue(0);
	assert.deepEqual(queue.peek(), 0, "Peek 0");
	queue.enqueue(2);
	assert.deepEqual(queue.peek(), 0, "Peek 0");
});

QUnit.test("Queue - Clear test", function (assert)
{
	var queue = new ds.Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	queue.clear();
	assert.deepEqual(queue.isEmpty(), true, "Clear queue");
});

QUnit.test("Queue - Is empty test", function (assert)
{
	var queue = new ds.Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	assert.deepEqual(queue.isEmpty(), false, "Is not empty");
	queue.clear();
	assert.deepEqual(queue.isEmpty(), true, "Is empty");
});

QUnit.test("Queue - Contains test", function (assert)
{
	var queue = new ds.Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	assert.deepEqual(queue.contains(0), true, "Contains 0");
	assert.deepEqual(queue.contains(2), true, "Contains 2");
	assert.deepEqual(queue.contains(1), false, "Not contains 1");
	var callback = function (item)
	{
		return item > 0;
	};
	assert.deepEqual(queue.contains(null, callback), true, "Contains a value > 0");
	callback = function (item)
	{
		return item < 0;
	};
	assert.deepEqual(queue.contains(null, callback), false, "Contains a value < 0");
});

QUnit.test("Queue - Execute test", function (assert)
{
	var queue = new ds.Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	var callback = function (item)
	{
		return item * 2;
	};
	queue.execute(callback);
	assert.deepEqual(queue.getItem(0), 0, "Execute for item 0");
	assert.deepEqual(queue.getItem(1), 4, "Execute for item 1");
});

QUnit.test("Queue - Index of test", function (assert)
{
	var queue = new ds.Queue();
	for (var i = 0; i < 10; i++)
		queue.enqueue(i);
	var callback = function (item)
	{
		return !(item % 2) && item > 5;
	};
	assert.deepEqual(queue.indexOf(0), 0, "Index of 0");
	assert.deepEqual(queue.indexOf(15), -1, "Index of 15");
	assert.deepEqual(queue.indexOf(5), 5, "Index of 5");
	assert.deepEqual(queue.indexOf(null, callback), 6, "Index of the first even number greater than 5");
});

QUnit.test("Queue - Last index of test", function (assert)
{
	var queue = new ds.Queue();
	for (var i = 0; i < 10; i++)
		queue.enqueue(i);
	var callback = function (item)
	{
		return !(item % 2) && item > 5;
	};
	assert.deepEqual(queue.lastIndexOf(0), 0, "Last index of 0");
	assert.deepEqual(queue.lastIndexOf(15), -1, "Last index of 15");
	assert.deepEqual(queue.lastIndexOf(5), 5, "Last index of 5");
	assert.deepEqual(queue.lastIndexOf(null, callback), 8, "Index of the last even number greater than 5");
});

QUnit.test("Queue - Indexes of test", function (assert)
{
	var queue = new ds.Queue();
	for (var i = 0; i < 30; i++)
		queue.enqueue(i % 10);
	var callback = function (item)
	{
		return !(item % 2) && item > 5;
	};
	assert.deepEqual(queue.allIndexesOf(0), [0, 10, 20], "Indexes of 0");
	assert.deepEqual(queue.allIndexesOf(15), [], "Indexes of 15");
	assert.deepEqual(queue.allIndexesOf(5), [5, 15, 25], "Indexes of 5");
	assert.deepEqual(queue.allIndexesOf(null, callback), [6, 8, 16, 18, 26, 28], "Indexes of the even numbers greater than 5");
});

QUnit.test("Queue - Clone test", function (assert)
{
	var queue = new ds.Queue();
	for (var i = 0; i < 10; i++)
		queue.enqueue(i);
	var clone = queue.clone();
	var it = clone.getIterator();
	var j = 0;
	for (it.first(); !it.isDone(); it.next(), j++)
		assert.deepEqual(it.getItem(), j, "Clone of the queue");
});

QUnit.test("Queue - Clone distinct test", function (assert)
{
	var queue = new ds.Queue();
	for (var i = 0; i < 20; i++)
		queue.enqueue(i % 10);
	var clone = queue.cloneDistinct();
	assert.deepEqual(clone.allIndexesOf(2), [2], "Clone of the queue");
});

QUnit.test("Queue - Filter test", function (assert)
{
	var queue = new ds.Queue();
	const length = 100;

	for (var i = 0; i < length; i++)
		queue.enqueue(i);

	var result = queue.filter(function (item)
	{
		return 1 - item % 2;
	});

	assert.deepEqual(result[0], 0, "Filter of the even values");
	assert.deepEqual(result[result.length - 1], 98, "Filter on the even values");
});