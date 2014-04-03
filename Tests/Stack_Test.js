/**
 * Created by Battistella Stefano on 31/03/14.
 */

test("Stack - Push test", function () {
	var stack = new Stack();
	stack.push(0);
	deepEqual(stack.getItem(0), 0, "Push 0");
	stack.push(2);
	deepEqual(stack.getItem(0), 0, "Push 2");
	deepEqual(stack.getItem(1), 2, "Push 2");
});

test("Stack - Pop test", function () {
	var stack = new Stack();
	stack.push(0);
	stack.push(2);
	deepEqual(stack.pop(), 2, "Pop");
	deepEqual(stack.pop(), 0, "Check length");
	deepEqual(stack.pop(), undefined, "Check length if too much pop");
});