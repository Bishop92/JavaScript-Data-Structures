/**
 * Created by Battistella Stefano on 31/03/14.
 */

test("CircularBuffer - Write test", function () {
	var buffer = new CircularBuffer(10);
	buffer.write(0);
	buffer.write(0);
	buffer.write(0);
	buffer.write(0);
	for (var i = 0; i < 4; i++)
		deepEqual(buffer.read(i), 0, "Write 0");
	for (var j = 4; j < 10; j++)
		deepEqual(buffer.read(j), undefined, "Write 0");
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	for (var m = 4; m < 12; m++)
		deepEqual(buffer.read(m), 1, "Write 1");
	for (var n = 2; n < 4; n++)
		deepEqual(buffer.read(n), 0, "Write 1");
	deepEqual(buffer.isFull(), true, "Is full");
});

test("CircularBuffer - Free test", function () {
	var buffer = new CircularBuffer(10);
	for (var k = 0; k < 12; k++)
		buffer.write(k);
	buffer.free(2, 8);
	for (var i = 2; i < 8; i++)
		deepEqual(buffer.read(i), undefined, "Free 2...8");
	deepEqual(buffer.head, 2, "Free 2...8");
	deepEqual(buffer.tail, 8, "Free 2...8");

	for (var l = 0; l < 12; l++)
		buffer.write(l);
	deepEqual(buffer.head, 4, "Write 12 items");
	deepEqual(buffer.tail, 4, "Write 12 items");

	buffer.free(8, 6);
	for (var m = 8; m < 6; m = (m + 1) % 10)
		deepEqual(buffer.read(m), undefined, "Free 8...6");
	deepEqual(buffer.head, 8, "Free 8...6");
	deepEqual(buffer.tail, 6, "Free 8...6");

	buffer.freeAll();
	for (var j = 0; j < 10; j++)
		deepEqual(buffer.read(j), undefined, "Free all");
	deepEqual(buffer.isEmpty(), true, "Is empty");
});

test("CircularBuffer - Empty test", function () {
	var buffer = new CircularBuffer(10);
	buffer.write(0);
	buffer.write(0);
	buffer.write(0);
	deepEqual(buffer.isEmpty(), false, "Is not empty");
	buffer.free(0, 8);
	deepEqual(buffer.isEmpty(), true, "Is empty");
});

test("CircularBuffer - Clone test", function () {
	var buffer = new CircularBuffer(10);
	for (var i = 0; i < 15; i++)
		buffer.write(i);
	var clone = buffer.clone();
	for (var j = 0; j < 9; j++)
		deepEqual(clone.read(j), buffer.read(j), "Check items");
	deepEqual(clone.head, buffer.head, "Check head position");
	deepEqual(clone.tail, buffer.tail, "Check tail position");
	deepEqual(clone.isEmpty(), buffer.isEmpty(), "Check empty");
	deepEqual(clone.isFull(), buffer.isFull(), "Check empty");
});

test("CircularBuffer - Resize test", function () {
	var buffer = new CircularBuffer(5);
	for (var i = 0; i < 8; i++)
		buffer.write(i);
	var clone = buffer.clone();
	buffer.resize(10);
	deepEqual(buffer.head, 8, "Check head position");
	deepEqual(buffer.tail, 3, "Check tail position");
	for (var j = 0; j < 10; j++)
		if (j < 3 || j > 7)
			deepEqual(buffer.read(j), undefined, "Increase size");
		else
			deepEqual(buffer.read(j), j, "Augment resize");
	buffer = clone;
	buffer.resize(3);
	deepEqual(buffer.head, 0, "Check head position");
	deepEqual(buffer.tail, 0, "Check tail position");
	for (var k = 0; k < 3; k++)
		deepEqual(buffer.read(k), k + 3, "Decrease size");
});

test("CircularBuffer - Iterator test", function () {
	var buffer = new CircularBuffer(10);
	var it = buffer.getIterator();
	it.first();
	deepEqual(it.isDone(), true, "Check empty buffer iterator");
	buffer.write(0);
	buffer.write(0);
	buffer.write(0);
	buffer.write(0);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	var result = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
	var i = 0;
	for (it.first(); !it.isDone(); it.next(), i++)
		deepEqual(it.getItem(), result[i], "Check iterator");
});