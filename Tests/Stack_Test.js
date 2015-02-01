/**
 * Created by Battistella Stefano on 31/03/14.
 */

test("Stack - Init test", function () {
    var stack = new Stack(0, 2, 4, 6);
    deepEqual(stack.multiPop(4), [6, 4, 2, 0], "Initializing");
    stack = new Stack(0);
    deepEqual(stack.multiPop(4), [0], "Initializing");
});

test("Stack - Init range test", function () {
    var stack = new Stack(Range(0, 6, 2));
    deepEqual(stack.multiPop(4), [6, 4, 2, 0], "Initializing");
});

test("Stack - Push test", function () {
    var stack = new Stack();
    stack.push(0);
    deepEqual(stack.getItem(0), 0, "Push 0");
    stack.push(2);
    deepEqual(stack.getItem(0), 2, "Push 2");
    deepEqual(stack.getItem(1), 0, "Push 2");
});

test("Stack - Pop test", function () {
    var stack = new Stack();
    stack.push(0);
    stack.push(2);
    deepEqual(stack.pop(), 2, "Pop");
    deepEqual(stack.pop(), 0, "Check length");
    deepEqual(stack.pop(), undefined, "Check length if too much pop");
});

test("Stack - MultiPop test", function () {
    var stack = new Stack();
    stack.push(0);
    stack.push(2);
    deepEqual(stack.multiPop(1), [2], "MultiPop 1 time");
    stack.push(4);
    stack.push(5);
    stack.push(8);
    deepEqual(stack.multiPop(7), [8, 5, 4, 0], "MultiPop 7 times");
    deepEqual(stack.multiPop(1), [], "MultiPop 1 time with stack empty");
});

test("Stack - Iterator test", function () {
    var stack = new Stack();
    for (var i = 0; i < 10; i++)
        stack.push(i);
    var j = 9;
    var it = stack.getIterator();
    for (it.first(); !it.isDone(); it.next(), j--)
        deepEqual(it.getItem(), j, "Get next item " + (10 - j));
    j++;
    for (it.last(); !it.isDone(); it.previous(), j++)
        deepEqual(it.getItem(), j, "Get previous item " + (10 - j));
});

test("Stack - Get length test", function () {
    var stack = new Stack();
    deepEqual(stack.getLength(), 0, "Length 0");
    stack.push(0);
    deepEqual(stack.getLength(), 1, "Length 1");
    stack.push(2);
    deepEqual(stack.getLength(), 2, "Length 2");
    stack.pop();
    stack.pop();
    deepEqual(stack.getLength(), 0, "Length 0");

});

test("Stack - Peek test", function () {
    var stack = new Stack();
    stack.push(0);
    deepEqual(stack.peek(), 0, "Peek 0");
    stack.push(2);
    deepEqual(stack.peek(), 2, "Peek 2");
});

test("Stack - Clear test", function () {
    var stack = new Stack();
    stack.push(0);
    stack.push(2);
    stack.clear();
    deepEqual(stack.isEmpty(), true, "Clear stack");
});

test("Stack - Is empty test", function () {
    var stack = new Stack();
    stack.push(0);
    stack.push(2);
    deepEqual(stack.isEmpty(), false, "Is empty");
    stack.clear();
    deepEqual(stack.isEmpty(), true, "Is empty");
});

test("Stack - contains", function () {
    var stack = new Stack();
    stack.push(0);
    stack.push(2);
    deepEqual(stack.contains(0), true, "Contains 0");
    deepEqual(stack.contains(2), true, "Contains 2");
    deepEqual(stack.contains(1), false, "Not contains 1");
    var callback = function (item) {
        return item > 0;
    };
    deepEqual(stack.contains(null, callback), true, "Contains a value > 0");
    callback = function (item) {
        return item < 0;
    };
    deepEqual(stack.contains(null, callback), false, "Contains a value < 0");
});

test("Stack - execute", function () {
    var stack = new Stack();
    stack.push(0);
    stack.push(2);
    var callback = function (item) {
        return item * 2;
    };
    stack.execute(callback);
    deepEqual(stack.getItem(0), 4, "Execute for item 1");
    deepEqual(stack.getItem(1), 0, "Execute for item 0");
});

test("Stack - Index of test", function () {
    var stack = new Stack();
    for (var i = 0; i < 10; i++)
        stack.push(i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    deepEqual(stack.indexOf(0), 0, "Index of 0");
    deepEqual(stack.indexOf(15), -1, "Index of 15");
    deepEqual(stack.indexOf(5), 5, "Index of 5");
    deepEqual(stack.indexOf(null, callback), 8, "Index of the first even number greater than 5");
});

test("Stack - Last index of test", function () {
    var stack = new Stack();
    for (var i = 0; i < 10; i++)
        stack.push(i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    deepEqual(stack.lastIndexOf(0), 0, "Last index of 0");
    deepEqual(stack.lastIndexOf(15), -1, "Last index of 15");
    deepEqual(stack.lastIndexOf(5), 5, "Last index of 5");
    deepEqual(stack.lastIndexOf(null, callback), 6, "Index of the last even number greater than 5");
});

test("Stack - Indexes of test", function () {
    var stack = new Stack();
    for (var i = 0; i < 30; i++)
        stack.push(i % 10);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    deepEqual(stack.allIndexesOf(0), [20, 10, 0], "Indexes of 0");
    deepEqual(stack.allIndexesOf(15), [], "Indexes of 15");
    deepEqual(stack.allIndexesOf(5), [25, 15, 5], "Indexes of 5");
    deepEqual(stack.allIndexesOf(null, callback), [28, 26, 18, 16, 8, 6], "Indexes of the even numbers greater than 5");
});

test("Stack - Clone test", function () {
    var stack = new Stack();
    for (var i = 0; i < 10; i++)
        stack.push(i);
    var clone = stack.clone();
    var it = clone.getIterator();
    var j = 9;
    for (it.first(); !it.isDone(); it.next(), j--)
        deepEqual(it.getItem(), j, "Clone of the list");
});

test("Stack - Clone distinct test", function () {
    var stack = new Stack();
    for (var i = 0; i < 20; i++)
        stack.push(i % 10);
    var clone = stack.cloneDistinct();
    deepEqual(clone.allIndexesOf(2), [2], "Clone of the list");
});

test("Stack - Filter test", function () {
    var stack = new Stack();
    const length = 100;

    for (var i = 0; i < length; i++)
        stack.push(i);

    var result = stack.filter(function (item) {
        return 1 - item % 2;
    });

    deepEqual(result[0], 98, "Filter of the even values");
    deepEqual(result[result.length - 1], 0, "Filter on the even values");
});