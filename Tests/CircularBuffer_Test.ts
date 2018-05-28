/**
 * Created by Battistella Stefano on 31/03/14.
 */

QUnit.test("CircularBuffer - Write test", function (assert)
{
	var buffer = new ds.CircularBuffer(10);
	buffer.write(0);
	buffer.write(0);
	buffer.write(0);
	buffer.write(0);
	for (var i = 0; i < 4; i++)
		assert.deepEqual(buffer.read(i), 0, "Write 0");
	for (var j = 4; j < 10; j++)
		assert.deepEqual(buffer.read(j), undefined, "Write 0");
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	buffer.write(1);
	for (var m = 4; m < 12; m++)
		assert.deepEqual(buffer.read(m), 1, "Write 1");
	for (var n = 2; n < 4; n++)
		assert.deepEqual(buffer.read(n), 0, "Write 1");
	assert.deepEqual(buffer.isFull(), true, "Is full");
});

QUnit.test("CircularBuffer - Free test", function (assert)
{
	var buffer = new ds.CircularBuffer(10);
	for (var k = 0; k < 12; k++)
		buffer.write(k);
	buffer.free(2, 8);
	for (var i = 2; i < 8; i++)
		assert.deepEqual(buffer.read(i), undefined, "Free 2...8");
	assert.deepEqual(buffer.head, 2, "Free 2...8");
	assert.deepEqual(buffer.tail, 8, "Free 2...8");

	for (var l = 0; l < 12; l++)
		buffer.write(l);
	assert.deepEqual(buffer.head, 4, "Write 12 items");
	assert.deepEqual(buffer.tail, 4, "Write 12 items");

	buffer.free(8, 6);
	for (var m = 8; m < 6; m = (m + 1) % 10)
		assert.deepEqual(buffer.read(m), undefined, "Free 8...6");
	assert.deepEqual(buffer.head, 8, "Free 8...6");
	assert.deepEqual(buffer.tail, 6, "Free 8...6");

	buffer.freeAll();
	for (var j = 0; j < 10; j++)
		assert.deepEqual(buffer.read(j), undefined, "Free all");
	assert.deepEqual(buffer.isEmpty(), true, "Is empty");
});

QUnit.test("CircularBuffer - Empty test", function (assert)
{
	var buffer = new ds.CircularBuffer(10);
	buffer.write(0);
	buffer.write(0);
	buffer.write(0);
	assert.deepEqual(buffer.isEmpty(), false, "Is not empty");
	buffer.free(0, 8);
	assert.deepEqual(buffer.isEmpty(), true, "Is empty");
});

QUnit.test("CircularBuffer - Clone test", function (assert)
{
	var buffer = new ds.CircularBuffer(10);
	for (var i = 0; i < 15; i++)
		buffer.write(i);
	var clone = buffer.clone();
	for (var j = 0; j < 9; j++)
		assert.deepEqual(clone.read(j), buffer.read(j), "Check items");
	assert.deepEqual(clone.head, buffer.head, "Check head position");
	assert.deepEqual(clone.tail, buffer.tail, "Check tail position");
	assert.deepEqual(clone.isEmpty(), buffer.isEmpty(), "Check empty");
	assert.deepEqual(clone.isFull(), buffer.isFull(), "Check empty");
});

QUnit.test("CircularBuffer - Resize test", function (assert)
{
	var buffer = new ds.CircularBuffer(5);
	for (var i = 0; i < 8; i++)
		buffer.write(i);
	var clone = buffer.clone();
	buffer.resize(10);
	assert.deepEqual(buffer.head, 8, "Check head position");
	assert.deepEqual(buffer.tail, 3, "Check tail position");
	for (var j = 0; j < 10; j++)
		if (j < 3 || j > 7)
			assert.deepEqual(buffer.read(j), undefined, "Increase size");
		else
			assert.deepEqual(buffer.read(j), j, "Augment resize");
	buffer = clone;
	buffer.resize(3);
	assert.deepEqual(buffer.head, 0, "Check head position");
	assert.deepEqual(buffer.tail, 0, "Check tail position");
	for (var k = 0; k < 3; k++)
		assert.deepEqual(buffer.read(k), k + 3, "Decrease size");
});

QUnit.test("CircularBuffer - Iterator test", function (assert)
{
	var buffer = new ds.CircularBuffer(10);
	var it = buffer.getIterator();
	it.first();
	assert.deepEqual(it.isDone(), true, "Check empty buffer iterator");
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
		assert.deepEqual(it.getItem(), result[i], "Check iterator");
});