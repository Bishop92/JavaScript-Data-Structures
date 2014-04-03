/**
 * Created by Battistella Stefano on 31/03/14.
 */

test("Queue - Enqueue test", function () {
	var queue = new Queue();
	queue.enqueue(0);
	deepEqual(queue.getItem(0), 0, "Enqueue 0");
	queue.enqueue(2);
	deepEqual(queue.getItem(0), 0, "Enqueue 2");
	deepEqual(queue.getItem(1), 2, "Enqueue 2");
});

test("Queue - Dequeue test", function () {
	var queue = new Queue();
	queue.enqueue(0);
	queue.enqueue(2);
	deepEqual(queue.dequeue(), 0, "Dequeue");
	deepEqual(queue.dequeue(), 2, "Dequeue");
	deepEqual(queue.dequeue(), undefined, "Check length if too much dequeue");
});