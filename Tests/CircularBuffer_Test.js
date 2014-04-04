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
	buffer.free(2, 8);
	for (var i = 2; i < 8; i++)
		deepEqual(buffer.read(i), undefined, "Free 2...8");
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
	deepEqual(buffer.isEmpty(), false, "Is empty");
	buffer.free(0, 8);
	deepEqual(buffer.isEmpty(), true, "Is empty");
});