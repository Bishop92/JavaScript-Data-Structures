/**
 * Created by Stefano on 06/04/14.
 */
QUnit.test("BSTree - Insert test", function (assert) {
    var tree = new ds.BSTree();
    var keys = [];
    for (var i = 0; i < 20; i++) {
        keys.push(Math.random());
        tree.insert(keys[i], i);
    }
    for (var j = 0; j < 20; j++)
        assert.deepEqual(tree.search(keys[j]), j, "Insert node");
});
QUnit.test("BSTree - Minimum test", function (assert) {
    var tree = new ds.BSTree();
    var keys = [];
    var min = 10;
    for (var i = 0; i < 20; i++) {
        keys.push(Math.random());
        tree.insert(keys[i], i);
        if (keys[i] < min)
            min = keys[i];
    }
    assert.deepEqual(tree.minimum().item, tree.search(min), "Minimum");
});
QUnit.test("BSTree - Maximum test", function (assert) {
    var tree = new ds.BSTree();
    var keys = [];
    var max = -1;
    for (var i = 0; i < 20; i++) {
        keys.push(Math.random());
        tree.insert(keys[i], i);
        if (keys[i] > max)
            max = keys[i];
    }
    assert.deepEqual(tree.maximum().item, tree.search(max), "Maximum");
});
QUnit.test("BSTree - Successor test", function (assert) {
    var tree = new ds.BSTree();
    for (var i = 0; i < 20; i++)
        tree.insert(i, i);
    var it = tree.getIterator();
    var j = 1;
    for (it.first(); !it.isDone(); it.next(), j++) {
        var successor = tree.successor(it.getNode());
        if (successor)
            assert.deepEqual(successor.item, j, "Successor");
        else
            assert.deepEqual(successor, null, "No successor");
    }
});
QUnit.test("BSTree - Predecessor test", function (assert) {
    var tree = new ds.BSTree();
    for (var i = 0; i < 20; i++)
        tree.insert(i, i);
    var it = tree.getIterator();
    var j = 18;
    for (it.last(); !it.isDone(); it.previous(), j--) {
        var predecessor = tree.predecessor(it.getNode());
        if (predecessor)
            assert.deepEqual(predecessor.item, j, "Predecessor");
        else
            assert.deepEqual(predecessor, null, "No predecessor");
    }
});
QUnit.test("BSTree - Delete node test", function (assert) {
    var tree = new ds.BSTree();
    for (var i = 0; i < 20; i++)
        tree.insert(i, i);
    var j = 0;
    while (tree.minimum()) {
        assert.deepEqual(tree.minimum().item, j, "Deletion");
        tree.deleteNode(tree.minimum());
        j++;
    }
});
/**
 * Created by Stefano on 06/04/14.
 */
QUnit.test("BTree - Insert test", function (assert) {
    var tree = new ds.BTree(100);
    for (var i = 0; i < 100; i++)
        tree.insert(i, i);
    for (var j = 0; j < 100; j++) {
        assert.deepEqual(tree.search(j), j, "Insert node");
        assert.deepEqual(tree.getItem(j), j, "Insert node");
    }
});
QUnit.test("BTree - Delete node test", function (assert) {
    var tree = new ds.BTree(3);
    for (var i = 0; i < 20; i++)
        tree.insert(i, i);
    tree.deleteKey(6);
    assert.deepEqual(tree.search(6), undefined, "Delete node 6");
});
QUnit.test("BTree - Successor test", function (assert) {
    var tree = new ds.BTree(3);
    for (var i = 0; i < 20; i++)
        tree.insert(i, i);
    for (var j = -1; j < 19; j++)
        assert.deepEqual(tree.successor(j), j + 1, "Successor found");
    assert.deepEqual(tree.successor(19), null, "Successor not found");
});
QUnit.test("BTree - Predecessor test", function (assert) {
    var tree = new ds.BTree(4);
    for (var i = 0; i < 40; i++)
        tree.insert(i, i);
    for (var j = 40; j > 0; j--)
        assert.deepEqual(tree.predecessor(j), j - 1, "Predecessor");
    assert.deepEqual(tree.predecessor(0), null, "Predecessor not found");
});
QUnit.test("BTree - Minimum test", function (assert) {
    var tree = new ds.BTree(3);
    var keys = [];
    var min = 10;
    for (var i = 0; i < 20; i++) {
        keys.push(Math.random());
        tree.insert(keys[i], i);
        if (keys[i] < min)
            min = keys[i];
    }
    assert.deepEqual(tree.minimum(), tree.search(min), "Minimum item");
    assert.deepEqual(tree.minimumKey(), min, "Minimum key");
});
QUnit.test("BTree - Maximum test", function (assert) {
    var tree = new ds.BTree(3);
    var keys = [];
    var max = -1;
    for (var i = 0; i < 20; i++) {
        keys.push(Math.random());
        tree.insert(keys[i], i);
        if (keys[i] > max)
            max = keys[i];
    }
    assert.deepEqual(tree.maximum(), tree.search(max), "Maximum item");
    assert.deepEqual(tree.maximumKey(), max, "Maximum key");
});
QUnit.test("BTree - To array test", function (assert) {
    var tree = new ds.BTree(3);
    for (var i = 0; i < 5; i++)
        tree.insert(i, i);
    assert.deepEqual(tree.toArray(), [0, 1, 2, 3, 4], "To array");
});
QUnit.test("BTree - Filter test", function (assert) {
    var tree = new ds.BTree(3);
    for (var i = 0; i < 10; i++)
        tree.insert(i, i);
    var result = tree.filter(function (item) {
        return 1 - item % 2;
    });
    assert.deepEqual(result, [0, 2, 4, 6, 8], "Filter on the even values");
});
QUnit.test("BTree - Clear test", function (assert) {
    var tree = new ds.BTree(3);
    tree.insert(0, 0);
    tree.insert(2, 2);
    tree.clear();
    assert.deepEqual(tree.isEmpty(), true, "Clear tree");
});
QUnit.test("BTree - Is empty test", function (assert) {
    var tree = new ds.BTree(3);
    tree.insert(0, 0);
    tree.insert(2, 2);
    assert.deepEqual(tree.isEmpty(), false, "Is not empty");
    tree.clear();
    assert.deepEqual(tree.isEmpty(), true, "Is empty");
});
QUnit.test("BTree - Contains test", function (assert) {
    var tree = new ds.BTree(3);
    tree.insert(0, 0);
    tree.insert(2, 2);
    assert.deepEqual(tree.contains(0), true, "Contains 0");
    assert.deepEqual(tree.contains(2), true, "Contains 2");
    assert.deepEqual(tree.contains(1), false, "Not contains 1");
    var callback = function (item) {
        return item > 0;
    };
    assert.deepEqual(tree.fullContains(callback), true, "Contains a value > 0");
    callback = function (item) {
        return item < 0;
    };
    assert.deepEqual(tree.fullContains(callback), false, "Contains a value < 0");
});
QUnit.test("BTree - Execute test", function (assert) {
    var tree = new ds.BTree();
    tree.insert(0, 0);
    tree.insert(2, 2);
    var callback = function (item) {
        return item * 2;
    };
    tree.execute(callback);
    assert.deepEqual(tree.search(0), 0, "Execute for key 0");
    assert.deepEqual(tree.search(2), 4, "Execute for key 1");
});
QUnit.test("BTree - Index of test", function (assert) {
    var tree = new ds.BTree(3);
    for (var i = 0; i < 10; i++)
        tree.insert(i, i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(tree.indexOf(0), 0, "Index of 0");
    assert.deepEqual(tree.indexOf(15), -1, "Index of 15");
    assert.deepEqual(tree.indexOf(5), 5, "Index of 5");
    assert.deepEqual(tree.indexOf(null, callback), 6, "Index of the first even number greater than 5");
});
QUnit.test("BTree - Last index of test", function (assert) {
    var tree = new ds.BTree(3);
    for (var i = 0; i < 10; i++)
        tree.insert(i, i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(tree.lastIndexOf(0), 0, "Last index of 0");
    assert.deepEqual(tree.lastIndexOf(15), -1, "Last index of 15");
    assert.deepEqual(tree.lastIndexOf(5), 5, "Last index of 5");
    assert.deepEqual(tree.lastIndexOf(null, callback), 8, "Index of the last even number greater than 5");
});
QUnit.test("BTree - Indexes of test", function (assert) {
    var tree = new ds.BTree(3);
    for (var i = 0; i < 30; i++)
        tree.insert(i, i % 10);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(tree.allIndexesOf(0), [0, 10, 20], "Indexes of 0");
    assert.deepEqual(tree.allIndexesOf(15), [], "Indexes of 15");
    assert.deepEqual(tree.allIndexesOf(5), [5, 15, 25], "Indexes of 5");
    assert.deepEqual(tree.allIndexesOf(null, callback), [6, 8, 16, 18, 26, 28], "Indexes of the even numbers greater than 5");
});
QUnit.test("BTree - Clone test", function (assert) {
    var tree = new ds.BTree(3);
    for (var i = 0; i < 10; i++)
        tree.insert(i, i);
    var clone = tree.clone();
    var it = clone.getIterator();
    var j = 0;
    for (it.first(); !it.isDone(); it.next(), j++)
        assert.deepEqual(it.getItem(), j, "Clone of the tree");
});
QUnit.test("BTree - Clone distinct test", function (assert) {
    var tree = new ds.BTree(3);
    for (var i = 0; i < 20; i++)
        tree.insert(i, i % 10);
    var clone = tree.cloneDistinct();
    assert.deepEqual(clone.allIndexesOf(2), [2], "Clone of the tree");
});
/**
 * Created by Battistella Stefano on 31/03/14.
 */
QUnit.test("CircularBuffer - Write test", function (assert) {
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
QUnit.test("CircularBuffer - Free test", function (assert) {
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
QUnit.test("CircularBuffer - Empty test", function (assert) {
    var buffer = new ds.CircularBuffer(10);
    buffer.write(0);
    buffer.write(0);
    buffer.write(0);
    assert.deepEqual(buffer.isEmpty(), false, "Is not empty");
    buffer.free(0, 8);
    assert.deepEqual(buffer.isEmpty(), true, "Is empty");
});
QUnit.test("CircularBuffer - Clone test", function (assert) {
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
QUnit.test("CircularBuffer - Resize test", function (assert) {
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
QUnit.test("CircularBuffer - Iterator test", function (assert) {
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
/**
 * Created by Stefano on 31/03/14.
 */
QUnit.test("DoubleLinkedList - Init test", function (assert) {
    var list = new ds.DoubleLinkedList(0, 1, 2);
    assert.deepEqual(list.toArray(), [0, 1, 2], "Init list");
    list = new ds.DoubleLinkedList(2);
    assert.deepEqual(list.toArray(), [2], "Init list");
});
QUnit.test("DoubleLinkedList - Init range test", function (assert) {
    var list = new ds.DoubleLinkedList(ds.Range(0, 2));
    assert.deepEqual(list.toArray(), [0, 1, 2], "Init list");
    list = new ds.DoubleLinkedList(ds.Range(2, -2, -0.5));
    assert.deepEqual(list.toArray(), [2, 1.5, 1, 0.5, 0, -0.5, -1, -1.5, -2], "Init list");
});
QUnit.test("DoubleLinkedList - Push test", function (assert) {
    var list = new ds.DoubleLinkedList();
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    assert.deepEqual(list.getItem(0), 1, "Push front 1");
    assert.deepEqual(list.getItem(1), 0, "Push front 0");
    assert.deepEqual(list.getItem(2), 2, "Push back 2");
    assert.deepEqual(list.getItem(3), 3, "Push back 3");
});
QUnit.test("DoubleLinkedList - Pop test", function (assert) {
    var list = new ds.DoubleLinkedList();
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    assert.deepEqual(list.popBack(), 3, "Pop back 3");
    assert.deepEqual(list.popFront(), 1, "Pop front 1");
    assert.deepEqual(list.popBack(), 2, "Pop back 2");
    assert.deepEqual(list.popFront(), 0, "Pop front 0");
});
QUnit.test("DoubleLinkedList - Remove at test", function (assert) {
    var list = new ds.DoubleLinkedList();
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    assert.deepEqual(list.removeAt(1), 0, "Remove at 1");
    assert.deepEqual(list.removeAt(1), 2, "Remove at 1");
    assert.deepEqual(list.removeAt(1), 3, "Remove at 1");
    assert.deepEqual(list.removeAt(0), 1, "Remove at 0");
});
QUnit.test("DoubleLinkedList - Remove test", function (assert) {
    var list = new ds.DoubleLinkedList();
    for (var i = 0; i < 30; i++)
        list.pushBack(i % 10);
    list.pushBack(15);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    list.remove(0);
    assert.deepEqual(list.indexOf(0), 9, "Remove 0");
    list.remove(15);
    assert.deepEqual(list.indexOf(15), -1, "Remove 15");
    list.remove(9);
    list.remove(9);
    list.remove(9);
    assert.deepEqual(list.indexOf(9), -1, "Remove 9");
    list.remove(0, callback);
    assert.deepEqual(list.indexOf(6), 13, "Remove the first even numbers greater than 5");
});
QUnit.test("DoubleLinkedList - Remove all test", function (assert) {
    var list = new ds.DoubleLinkedList();
    for (var i = 0; i < 30; i++)
        list.pushBack(i % 10);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    list.removeAll(0);
    assert.deepEqual(list.indexOf(0), -1, "Remove all 0");
    list.removeAll(9);
    assert.deepEqual(list.indexOf(9), -1, "Remove all 9");
    list.removeAll(0, callback);
    assert.deepEqual(list.indexOf(8), -1, "Remove all the even numbers greater than 5");
});
QUnit.test("DoubleLinkedList - Remove segment test", function (assert) {
    var list = new ds.DoubleLinkedList();
    for (var i = 0; i < 10; i++)
        list.pushBack(i);
    assert.deepEqual(list.removeSegment(2, 6), [2, 3, 4, 5, 6], "Remove the segment from the list");
    assert.deepEqual(list.toArray(), [0, 1, 7, 8, 9], "Remove the segment from the list");
    assert.deepEqual(list.getLength(), 5, "Remove the segment from the list");
    assert.deepEqual(list.removeSegment(2, 1), [7, 8, 9], "Remove the segment from the list");
    assert.deepEqual(list.toArray(), [0, 1], "Remove the segment from the list");
    assert.deepEqual(list.getLength(), 2, "Remove the segment from the list");
});
QUnit.test("DoubleLinkedList - Modify at test", function (assert) {
    var list = new ds.DoubleLinkedList();
    for (var i = 0; i < 4; i++)
        list.pushBack(i);
    list.modifyAt(2, 6);
    assert.deepEqual(list.toArray(), [0, 1, 6, 3], "Change at valid position");
    list.modifyAt(5, 5);
    assert.deepEqual(list.toArray(), [0, 1, 6, 3], "Change at non valid position");
});
QUnit.test("DoubleLinkedList - Delete node test", function (assert) {
    var list = new ds.DoubleLinkedList();
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    var it = list.getIterator();
    for (it.first(); !it.isDone(); it.next())
        if (it.getItem())
            list.deleteNode(it.getNode());
    assert.deepEqual(list.getItem(0), 0, "Delete node");
});
QUnit.test("DoubleLinkedList - Sort test", function (assert) {
    var list = new ds.DoubleLinkedList();
    var length = 100;
    for (var i = 0; i < length; i++)
        list.pushFront(i);
    list.sort();
    assert.deepEqual(list.getItem(0), 0, "Sort");
    assert.deepEqual(list.getItem(length - 1), length - 1, "Sort");
});
QUnit.test("DoubleLinkedList - Sort with callback test", function (assert) {
    var list = new ds.DoubleLinkedList();
    var length = 100;
    for (var i = 0; i < length; i++)
        list.pushFront(i);
    list.sort(function (item) {
        return -item;
    });
    assert.deepEqual(list.getItem(0), length - 1, "Sort with callback");
    assert.deepEqual(list.getItem(length - 1), 0, "Sort with callback");
});
QUnit.test("DoubleLinkedList - Filter test", function (assert) {
    var list = new ds.DoubleLinkedList();
    var length = 100;
    for (var i = 0; i < length; i++)
        list.pushFront(i);
    var result = list.filter(function (item) {
        return 1 - item % 2;
    });
    assert.deepEqual(result[0], 98, "Filter of the even values");
    assert.deepEqual(result[result.length - 1], 0, "Filter on the even values");
});
QUnit.test("DoubleLinkedList - Reverse test", function (assert) {
    var list = new ds.DoubleLinkedList();
    var length = 100;
    for (var i = 0; i < length; i++)
        list.pushFront(i);
    list.reverse();
    assert.deepEqual(list.getItem(0), 0, "Reverse");
    assert.deepEqual(list.getItem(length - 1), 99, "Reverse");
});
QUnit.test("DoubleLinkedList - Iterator test", function (assert) {
    var list = new ds.DoubleLinkedList();
    for (var i = 0; i < 100; i++)
        list.pushBack(i);
    var it = list.getIterator();
    var j = 0;
    for (it.first(); !it.isDone(); it.next(), j++) {
        assert.deepEqual(it.getItem(), j, "Check iterator position");
    }
    for (it.last(); !it.isDone(); it.previous(), j--) {
        assert.deepEqual(it.getItem(), j - 1, "Check iterator position");
    }
});
QUnit.test("DoubleLinkedList - Add at test", function (assert) {
    var list = new ds.DoubleLinkedList();
    list.addAt(5, 0);
    assert.deepEqual(list.peek(), 5, "Add at 0");
    list.addAt(2, 1);
    assert.deepEqual(list.getItem(1), 2, "Add at 1");
    list.addAt(15, 6);
    assert.deepEqual(list.getItem(2), undefined, "Add at 6");
    assert.deepEqual(list.getItem(5), undefined, "Add at 6");
    assert.deepEqual(list.getItem(6), 15, "Add at 6");
    list.addAt(30, 6);
    assert.deepEqual(list.getItem(6), 30, "Add at 6");
    assert.deepEqual(list.getItem(7), 15, "Add at 6");
    list.addAt(6, 0);
    assert.deepEqual(list.peek(), 6, "Add at 0");
});
QUnit.test("DoubleLinkedList - MultiPop test", function (assert) {
    var list = new ds.DoubleLinkedList();
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    assert.deepEqual(list.multiPopBack(2), [3, 2], "Multi pop back");
    assert.deepEqual(list.multiPopFront(2), [1, 0], "Multi pop front");
});
QUnit.test("DoubleLinkedList - Get length test", function (assert) {
    var list = new ds.DoubleLinkedList();
    assert.deepEqual(list.getLength(), 0, "Get length empty");
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    assert.deepEqual(list.getLength(), 4, "Get length");
    list.multiPopBack(2);
    assert.deepEqual(list.getLength(), 2, "Get length");
});
QUnit.test("DoubleLinkedList - Peek test", function (assert) {
    var list = new ds.DoubleLinkedList();
    list.pushFront(0);
    assert.deepEqual(list.peek(), 0, "Peek");
    list.pushFront(1);
    list.pushBack(2);
    assert.deepEqual(list.peek(), 1, "Peek");
    list.pushBack(3);
    assert.deepEqual(list.peek(), 1, "Peek");
});
QUnit.test("DoubleLinkedList - Clear test", function (assert) {
    var list = new ds.DoubleLinkedList();
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    list.clear();
    assert.deepEqual(list.getLength(), 0, "Clear the list");
});
QUnit.test("DoubleLinkedList - Is empty test", function (assert) {
    var list = new ds.DoubleLinkedList();
    assert.deepEqual(list.isEmpty(), true, "Is empty");
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    assert.deepEqual(list.isEmpty(), false, "Is not empty");
    list.clear();
    assert.deepEqual(list.isEmpty(), true, "Is empty");
});
QUnit.test("DoubleLinkedList - contains", function (assert) {
    var list = new ds.DoubleLinkedList();
    list.pushBack(0);
    list.pushBack(2);
    assert.deepEqual(list.contains(0), true, "Contains 0");
    assert.deepEqual(list.contains(2), true, "Contains 2");
    assert.deepEqual(list.contains(1), false, "Not contains 1");
    var callback = function (item) {
        return item > 0;
    };
    assert.deepEqual(list.contains(null, callback), true, "Contains a value > 0");
    callback = function (item) {
        return item < 0;
    };
    assert.deepEqual(list.contains(null, callback), false, "Contains a value < 0");
});
QUnit.test("DoubleLinkedList - execute", function (assert) {
    var list = new ds.DoubleLinkedList();
    list.pushBack(0);
    list.pushBack(2);
    var callback = function (item) {
        return item * 2;
    };
    list.execute(callback);
    assert.deepEqual(list.getItem(0), 0, "Execute for item 0");
    assert.deepEqual(list.getItem(1), 4, "Execute for item 1");
});
QUnit.test("DoubleLinkedList - Index of test", function (assert) {
    var list = new ds.DoubleLinkedList();
    for (var i = 0; i < 10; i++)
        list.pushBack(i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(list.indexOf(0), 0, "Index of 0");
    assert.deepEqual(list.indexOf(15), -1, "Index of 15");
    assert.deepEqual(list.indexOf(5), 5, "Index of 5");
    list.removeAt(5);
    assert.deepEqual(list.indexOf(6), 5, "Index of 6");
    assert.deepEqual(list.indexOf(null, callback), 5, "Index of the first even number greater than 5");
});
QUnit.test("DoubleLinkedList - Last index of test", function (assert) {
    var list = new ds.DoubleLinkedList();
    for (var i = 0; i < 10; i++)
        list.pushBack(i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(list.lastIndexOf(0), 0, "Last index of 0");
    assert.deepEqual(list.lastIndexOf(15), -1, "Last index of 15");
    assert.deepEqual(list.lastIndexOf(5), 5, "Last index of 5");
    list.removeAt(5);
    assert.deepEqual(list.lastIndexOf(6), 5, "Last index of 6");
    assert.deepEqual(list.lastIndexOf(null, callback), 7, "Index of the last even number greater than 5");
});
QUnit.test("DoubleLinkedList - Indexes of test", function (assert) {
    var list = new ds.DoubleLinkedList();
    for (var i = 0; i < 30; i++)
        list.pushBack(i % 10);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(list.allIndexesOf(0), [0, 10, 20], "Indexes of 0");
    assert.deepEqual(list.allIndexesOf(15), [], "Indexes of 15");
    assert.deepEqual(list.allIndexesOf(5), [5, 15, 25], "Indexes of 5");
    list.removeAt(5);
    assert.deepEqual(list.allIndexesOf(5), [14, 24], "Indexes of 5");
    assert.deepEqual(list.allIndexesOf(6), [5, 15, 25], "Indexes of 6");
    assert.deepEqual(list.allIndexesOf(null, callback), [5, 7, 15, 17, 25, 27], "Indexes of the even numbers greater than 5");
});
QUnit.test("DoubleLinkedList - Join test", function (assert) {
    var listA = new ds.DoubleLinkedList();
    var listB = new ds.DoubleLinkedList();
    for (var i = 0; i < 5; i++) {
        listA.pushBack(i);
        listB.pushBack(i);
    }
    listA.join(listB);
    assert.deepEqual(listA.allIndexesOf(3), [3, 8], "Join of the lists");
    assert.deepEqual(listA.getLength(), 10, "Check the length of the list");
});
QUnit.test("DoubleLinkedList - Divide test", function (assert) {
    var list = new ds.DoubleLinkedList();
    for (var i = 0; i < 10; i++)
        list.pushBack(i);
    var listA = list.divide(-1);
    assert.deepEqual(listA.isEmpty(), true, "Divide before start");
    var listB = list.divide(10);
    assert.deepEqual(listB.isEmpty(), true, "Divide after end");
    var listC = list.divide(8);
    assert.deepEqual(listC.getItem(0), 8, "Divide at valid position");
    assert.deepEqual(listC.getItem(1), 9, "Divide at valid position");
    assert.deepEqual(listC.getLength(), 2, "Divide at valid position");
    assert.deepEqual(list.getItem(8), undefined, "Divide at valid position");
    assert.deepEqual(list.getLength(), 8, "Divide at valid position");
    var listD = list.divide(0);
    assert.deepEqual(listD.getLength(), 8, "Divide at the first position");
    assert.deepEqual(listD.getItem(0), 0, "Divide at the first position");
    assert.deepEqual(listD.getItem(8), undefined, "Divide at the first position");
    assert.deepEqual(listD.getItem(7), 7, "Divide at the first position");
    assert.deepEqual(list.getLength(), 0, "Divide at the first position");
    assert.deepEqual(list.getItem(0), undefined, "Divide at the first position");
});
QUnit.test("DoubleLinkedList - Clone test", function (assert) {
    var list = new ds.DoubleLinkedList();
    for (var i = 0; i < 10; i++)
        list.pushBack(i);
    var clone = list.clone();
    var it = clone.getIterator();
    var j = 0;
    for (it.first(); !it.isDone(); it.next(), j++)
        assert.deepEqual(it.getItem(), j, "Clone of the list");
});
QUnit.test("DoubleLinkedList - Clone distinct test", function (assert) {
    var list = new ds.DoubleLinkedList();
    for (var i = 0; i < 20; i++)
        list.pushBack(i % 10);
    var clone = list.cloneDistinct();
    assert.deepEqual(clone.allIndexesOf(2), [2], "Clone of the list");
});
QUnit.test("DoubleLinkedList - Split test", function (assert) {
    var list = new ds.DoubleLinkedList();
    for (var i = 0; i < 7; i++)
        list.pushBack(i);
    var lists = list.split(3);
    assert.deepEqual(lists.length, 3, "Check the number of lists created");
    assert.deepEqual(lists[0].toArray(), [0, 1, 2], "Check the items in the lists created");
    assert.deepEqual(lists[1].toArray(), [3, 4, 5], "Check the items in the lists created");
    assert.deepEqual(lists[2].toArray(), [6], "Check the items in the lists created");
});
QUnit.test("DoubleLinkedList - Count test", function (assert) {
    var list = new ds.DoubleLinkedList();
    for (var i = 0; i < 10; i++)
        list.pushBack(i);
    var callback = function (item) {
        return item > 4;
    };
    assert.deepEqual(list.count(callback), 5, "Count the items that are greater than 4");
});
/**
 * Created by Stefano on 31/03/14.
 */
QUnit.test("HashTable - Insert test", function (assert) {
    var table = new ds.HashTable(4);
    for (var i = 0; i < 20; i++)
        table.insert(i, "Insert # " + i);
    for (var j = 0; j < 20; j++)
        assert.deepEqual(table.search(j), "Insert # " + j, "Insert " + j);
});
QUnit.test("HashTable - Delete key test", function (assert) {
    var table = new ds.HashTable(4);
    for (var i = 0; i < 20; i++)
        table.insert(i, i);
    table.deleteKey(6);
    assert.deepEqual(table.search(6), undefined, "Delete key");
});
QUnit.test("HashTable - Delete all key test", function (assert) {
    var table = new ds.HashTable(4);
    for (var i = 0; i < 100; i++)
        table.insert(i % 20, { value: i % 20 });
    table.deleteAllKey(13);
    assert.deepEqual(table.searchAll(13).length, 0, "Delete all key");
});
QUnit.test("HashTable - Get keys test", function (assert) {
    var table = new ds.HashTable(50);
    var keys = [];
    for (var i = 0; i < 100; i++) {
        table.insert(i, { value: i % 20 });
        keys.push(i);
    }
    keys.sort();
    var storedKeys = table.getKeys().sort();
    assert.deepEqual(storedKeys, keys, "Get stored keys");
});
QUnit.test("HashTable - Get items test", function (assert) {
    var table = new ds.HashTable(50);
    var items = [];
    for (var i = 0; i < 100; i++) {
        table.insert(i, i % 20);
        items.push(i % 20);
    }
    items.sort();
    var storedKeys = table.getItems().sort();
    assert.deepEqual(storedKeys, items, "Get stored items");
});
QUnit.test("HashTable - Contains key test", function (assert) {
    var table = new ds.HashTable(50);
    for (var i = 0; i < 100; i++)
        table.insert(i, i % 20);
    assert.deepEqual(table.containsKey(4), true, "Contains key");
    assert.deepEqual(table.containsKey(200), false, "Not contains key");
    var callback = function (k) {
        return k > 20;
    };
    assert.deepEqual(table.containsKey(0, callback), true, "Contains key greater than 20");
    callback = function (k) {
        return k < 0;
    };
    assert.deepEqual(table.containsKey(0, callback), false, "Not contains negative key");
});
QUnit.test("HashTable - Clear test", function (assert) {
    var table = new ds.HashTable(50);
    for (var i = 0; i < 100; i++)
        table.insert(i, i % 20);
    assert.deepEqual(table.isEmpty(), false, "Before clear");
    table.clear();
    assert.deepEqual(table.isEmpty(), true, "After clear");
});
QUnit.test("HashTable - Get number of keys test", function (assert) {
    var table = new ds.HashTable(50);
    assert.deepEqual(table.getNumberOfKeys(), 0, "Before insertion");
    for (var i = 0; i < 100; i++)
        table.insert(i, i % 20);
    assert.deepEqual(table.getNumberOfKeys(), 100, "After insertion");
});
QUnit.test("HashTable - Is empty test", function (assert) {
    var table = new ds.HashTable(50);
    assert.deepEqual(table.isEmpty(), true, "Before insertion");
    for (var i = 0; i < 100; i++)
        table.insert(i, i % 20);
    assert.deepEqual(table.isEmpty(), false, "Before clear");
    table.clear();
    assert.deepEqual(table.isEmpty(), true, "After clear");
});
/**
 * Created by Stefano on 31/03/14.
 */
QUnit.test("LinkedList - Init test", function (assert) {
    var list = new ds.LinkedList(0, 1, 2);
    assert.deepEqual(list.toArray(), [0, 1, 2], "Init list");
    list = new ds.LinkedList(0);
    assert.deepEqual(list.toArray(), [0], "Init list");
});
QUnit.test("LinkedList - Init test with range", function (assert) {
    var list = new ds.LinkedList(ds.Range(0, 5));
    assert.deepEqual(list.toArray(), [0, 1, 2, 3, 4, 5], "Init list with range");
});
QUnit.test("LinkedList - Push test", function (assert) {
    var list = new ds.LinkedList();
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    assert.deepEqual(list.getItem(0), 1, "Push front 1");
    assert.deepEqual(list.getItem(1), 0, "Push front 0");
    assert.deepEqual(list.getItem(2), 2, "Push back 2");
    assert.deepEqual(list.getItem(3), 3, "Push back 3");
});
QUnit.test("LinkedList - Pop test", function (assert) {
    var list = new ds.LinkedList();
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    assert.deepEqual(list.popBack(), 3, "Pop back 3");
    assert.deepEqual(list.popFront(), 1, "Pop front 1");
    assert.deepEqual(list.popBack(), 2, "Pop back 2");
    assert.deepEqual(list.popFront(), 0, "Pop front 0");
});
QUnit.test("LinkedList - Remove at test", function (assert) {
    var list = new ds.LinkedList();
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    assert.deepEqual(list.removeAt(1), 0, "Remove at 1");
    assert.deepEqual(list.removeAt(1), 2, "Remove at 1");
    assert.deepEqual(list.removeAt(1), 3, "Remove at 1");
    assert.deepEqual(list.removeAt(0), 1, "Remove at 0");
});
QUnit.test("LinkedList - Remove test", function (assert) {
    var list = new ds.LinkedList();
    for (var i = 0; i < 30; i++)
        list.pushBack(i % 10);
    list.pushBack(15);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    list.remove(0);
    assert.deepEqual(list.indexOf(0), 9, "Remove 0");
    list.remove(15);
    assert.deepEqual(list.indexOf(15), -1, "Remove 15");
    list.remove(9);
    list.remove(9);
    list.remove(9);
    assert.deepEqual(list.indexOf(9), -1, "Remove 9");
    list.remove(0, callback);
    assert.deepEqual(list.indexOf(6), 13, "Remove the first even numbers greater than 5");
});
QUnit.test("LinkedList - Remove all test", function (assert) {
    var list = new ds.LinkedList();
    for (var i = 0; i < 30; i++)
        list.pushBack(i % 10);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    list.removeAll(0);
    assert.deepEqual(list.indexOf(0), -1, "Remove all 0");
    list.removeAll(9);
    assert.deepEqual(list.indexOf(9), -1, "Remove all 9");
    list.removeAll(0, callback);
    assert.deepEqual(list.indexOf(8), -1, "Remove all the even numbers greater than 5");
});
QUnit.test("LinkedList - Remove segment test", function (assert) {
    var list = new ds.LinkedList();
    for (var i = 0; i < 10; i++)
        list.pushBack(i);
    assert.deepEqual(list.removeSegment(2, 6), [2, 3, 4, 5, 6], "Remove the segment from the list");
    assert.deepEqual(list.toArray(), [0, 1, 7, 8, 9], "Remove the segment from the list");
    assert.deepEqual(list.getLength(), 5, "Remove the segment from the list");
    assert.deepEqual(list.removeSegment(2, 1), [7, 8, 9], "Remove the segment from the list");
    assert.deepEqual(list.toArray(), [0, 1], "Remove the segment from the list");
    assert.deepEqual(list.getLength(), 2, "Remove the segment from the list");
});
QUnit.test("LinkedList - Modify at test", function (assert) {
    var list = new ds.LinkedList();
    for (var i = 0; i < 4; i++)
        list.pushBack(i);
    list.modifyAt(2, 6);
    assert.deepEqual(list.toArray(), [0, 1, 6, 3], "Change at valid position");
    list.modifyAt(5, 5);
    assert.deepEqual(list.toArray(), [0, 1, 6, 3], "Change at non valid position");
});
QUnit.test("LinkedList - To array test", function (assert) {
    var list = new ds.LinkedList();
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    var array = list.toArray();
    assert.deepEqual(array[0], 1, "To array");
    assert.deepEqual(array[1], 0, "To array");
    assert.deepEqual(array[2], 2, "To array");
    assert.deepEqual(array[3], 3, "To array");
});
QUnit.test("LinkedList - From array test", function (assert) {
    var array = [5, 2, 6, 4];
    var list = new ds.LinkedList();
    list.fromArray(array);
    assert.deepEqual(list.getItem(0), 5, "From array");
    assert.deepEqual(list.getItem(1), 2, "From array");
    assert.deepEqual(list.getItem(2), 6, "From array");
    assert.deepEqual(list.getItem(3), 4, "From array");
});
QUnit.test("LinkedList - Filter test", function (assert) {
    var list = new ds.LinkedList();
    var length = 100;
    for (var i = 0; i < length; i++)
        list.pushFront(i);
    var result = list.filter(function (item) {
        return 1 - item % 2;
    });
    assert.deepEqual(result[0], 98, "Filter of the even values");
    assert.deepEqual(result[result.length - 1], 0, "Filter on the even values");
});
QUnit.test("LinkedList - Iterator test", function (assert) {
    var list = new ds.LinkedList();
    for (var i = 0; i < 100; i++)
        list.pushBack(i);
    var it = list.getIterator();
    var j = 0;
    for (it.first(); !it.isDone(); it.next(), j++) {
        assert.deepEqual(it.getItem(), j, "Check iterator position");
    }
});
QUnit.test("LinkedList - Add at test", function (assert) {
    var list = new ds.LinkedList();
    list.addAt(5, 0);
    assert.deepEqual(list.peek(), 5, "Add at 0");
    list.addAt(2, 1);
    assert.deepEqual(list.getItem(1), 2, "Add at 1");
    list.addAt(15, 6);
    assert.deepEqual(list.getItem(2), undefined, "Add at 6");
    assert.deepEqual(list.getItem(5), undefined, "Add at 6");
    assert.deepEqual(list.getItem(6), 15, "Add at 6");
    list.addAt(30, 6);
    assert.deepEqual(list.getItem(6), 30, "Add at 6");
    assert.deepEqual(list.getItem(7), 15, "Add at 6");
    list.addAt(6, 0);
    assert.deepEqual(list.peek(), 6, "Add at 0");
});
QUnit.test("LinkedList - MultiPop test", function (assert) {
    var list = new ds.LinkedList();
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    assert.deepEqual(list.multiPopBack(2), [3, 2], "Multi pop back");
    assert.deepEqual(list.multiPopFront(2), [1, 0], "Multi pop front");
});
QUnit.test("LinkedList - Get length test", function (assert) {
    var list = new ds.LinkedList();
    assert.deepEqual(list.getLength(), 0, "Get length empty");
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    assert.deepEqual(list.getLength(), 4, "Get length");
    list.multiPopBack(2);
    assert.deepEqual(list.getLength(), 2, "Get length");
});
QUnit.test("LinkedList - Peek test", function (assert) {
    var list = new ds.LinkedList();
    list.pushFront(0);
    assert.deepEqual(list.peek(), 0, "Peek");
    list.pushFront(1);
    list.pushBack(2);
    assert.deepEqual(list.peek(), 1, "Peek");
    list.pushBack(3);
    assert.deepEqual(list.peek(), 1, "Peek");
});
QUnit.test("LinkedList - Clear test", function (assert) {
    var list = new ds.LinkedList();
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    list.clear();
    assert.deepEqual(list.getLength(), 0, "Clear the list");
});
QUnit.test("LinkedList - Is empty test", function (assert) {
    var list = new ds.LinkedList();
    assert.deepEqual(list.isEmpty(), true, "Is empty");
    list.pushFront(0);
    list.pushFront(1);
    list.pushBack(2);
    list.pushBack(3);
    assert.deepEqual(list.isEmpty(), false, "Is not empty");
    list.clear();
    assert.deepEqual(list.isEmpty(), true, "Is empty");
});
QUnit.test("LinkedList - Contains test", function (assert) {
    var list = new ds.LinkedList();
    list.pushBack(0);
    list.pushBack(2);
    assert.deepEqual(list.contains(0), true, "Contains 0");
    assert.deepEqual(list.contains(2), true, "Contains 2");
    assert.deepEqual(list.contains(1), false, "Not contains 1");
    var callback = function (item) {
        return item > 0;
    };
    assert.deepEqual(list.contains(null, callback), true, "Contains a value > 0");
    callback = function (item) {
        return item < 0;
    };
    assert.deepEqual(list.contains(null, callback), false, "Contains a value < 0");
});
QUnit.test("LinkedList - Execute test", function (assert) {
    var list = new ds.LinkedList();
    list.pushBack(0);
    list.pushBack(2);
    var callback = function (item) {
        return item * 2;
    };
    list.execute(callback);
    assert.deepEqual(list.getItem(0), 0, "Execute for item 0");
    assert.deepEqual(list.getItem(1), 4, "Execute for item 1");
});
QUnit.test("LinkedList - Index of test", function (assert) {
    var list = new ds.LinkedList();
    for (var i = 0; i < 10; i++)
        list.pushBack(i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(list.indexOf(0), 0, "Index of 0");
    assert.deepEqual(list.indexOf(15), -1, "Index of 15");
    assert.deepEqual(list.indexOf(5), 5, "Index of 5");
    list.removeAt(5);
    assert.deepEqual(list.indexOf(6), 5, "Index of 6");
    assert.deepEqual(list.indexOf(null, callback), 5, "Index of the first even number greater than 5");
});
QUnit.test("LinkedList - Last index of test", function (assert) {
    var list = new ds.LinkedList();
    for (var i = 0; i < 10; i++)
        list.pushBack(i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(list.lastIndexOf(0), 0, "Last index of 0");
    assert.deepEqual(list.lastIndexOf(15), -1, "Last index of 15");
    assert.deepEqual(list.lastIndexOf(5), 5, "Last index of 5");
    list.removeAt(5);
    assert.deepEqual(list.lastIndexOf(6), 5, "Last index of 6");
    assert.deepEqual(list.lastIndexOf(null, callback), 7, "Index of the last even number greater than 5");
});
QUnit.test("LinkedList - Indexes of test", function (assert) {
    var list = new ds.LinkedList();
    for (var i = 0; i < 30; i++)
        list.pushBack(i % 10);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(list.allIndexesOf(0), [0, 10, 20], "Indexes of 0");
    assert.deepEqual(list.allIndexesOf(15), [], "Indexes of 15");
    assert.deepEqual(list.allIndexesOf(5), [5, 15, 25], "Indexes of 5");
    list.removeAt(5);
    assert.deepEqual(list.allIndexesOf(5), [14, 24], "Indexes of 5");
    assert.deepEqual(list.allIndexesOf(6), [5, 15, 25], "Indexes of 6");
    assert.deepEqual(list.allIndexesOf(null, callback), [5, 7, 15, 17, 25, 27], "Indexes of the even numbers greater than 5");
});
QUnit.test("LinkedList - Join test", function (assert) {
    var listA = new ds.LinkedList();
    var listB = new ds.LinkedList();
    for (var i = 0; i < 5; i++) {
        listA.pushBack(i);
        listB.pushBack(i);
    }
    listA.join(listB);
    assert.deepEqual(listA.allIndexesOf(3), [3, 8], "Join of the lists");
    assert.deepEqual(listA.getLength(), 10, "Check the length of the list");
});
QUnit.test("LinkedList - Divide test", function (assert) {
    var list = new ds.LinkedList();
    for (var i = 0; i < 10; i++)
        list.pushBack(i);
    var listA = list.divide(-1);
    assert.deepEqual(listA.isEmpty(), true, "Divide before start");
    var listB = list.divide(10);
    assert.deepEqual(listB.isEmpty(), true, "Divide after end");
    var listC = list.divide(8);
    assert.deepEqual(listC.getItem(0), 8, "Divide at valid position");
    assert.deepEqual(listC.getItem(1), 9, "Divide at valid position");
    assert.deepEqual(listC.getLength(), 2, "Divide at valid position");
    assert.deepEqual(list.getItem(8), undefined, "Divide at valid position");
    assert.deepEqual(list.getLength(), 8, "Divide at valid position");
    var listD = list.divide(0);
    assert.deepEqual(listD.getLength(), 8, "Divide at the first position");
    assert.deepEqual(listD.getItem(0), 0, "Divide at the first position");
    assert.deepEqual(listD.getItem(8), undefined, "Divide at the first position");
    assert.deepEqual(listD.getItem(7), 7, "Divide at the first position");
    assert.deepEqual(list.getLength(), 0, "Divide at the first position");
    assert.deepEqual(list.getItem(0), undefined, "Divide at the first position");
});
QUnit.test("LinkedList - Clone test", function (assert) {
    var list = new ds.LinkedList();
    for (var i = 0; i < 10; i++)
        list.pushBack(i);
    var clone = list.clone();
    var it = clone.getIterator();
    var j = 0;
    for (it.first(); !it.isDone(); it.next(), j++)
        assert.deepEqual(it.getItem(), j, "Clone of the list");
});
QUnit.test("LinkedList - Clone distinct test", function (assert) {
    var list = new ds.LinkedList();
    for (var i = 0; i < 20; i++)
        list.pushBack(i % 10);
    var clone = list.cloneDistinct();
    assert.deepEqual(clone.allIndexesOf(2), [2], "Clone of the list");
});
QUnit.test("LinkedList - Split test", function (assert) {
    var list = new ds.LinkedList();
    for (var i = 0; i < 7; i++)
        list.pushBack(i);
    var lists = list.split(3);
    assert.deepEqual(lists.length, 3, "Check the number of lists created");
    assert.deepEqual(lists[0].toArray(), [0, 1, 2], "Check the items in the lists created");
    assert.deepEqual(lists[1].toArray(), [3, 4, 5], "Check the items in the lists created");
    assert.deepEqual(lists[2].toArray(), [6], "Check the items in the lists created");
});
QUnit.test("LinkedList - Count test", function (assert) {
    var list = new ds.LinkedList();
    for (var i = 0; i < 10; i++)
        list.pushBack(i);
    var callback = function (item) {
        return item > 4;
    };
    assert.deepEqual(list.count(callback), 5, "Count the items that are greater than 4");
});
/**
 * Created by Battistella Stefano on 31/03/14.
 */
QUnit.test("PriorityQueue - Enqueue test", function (assert) {
    var queue = new ds.PriorityQueue();
    queue.enqueue(5, 0);
    assert.deepEqual(queue.peek(), 0, "Enqueue 0");
    queue.enqueue(2, 6);
    assert.deepEqual(queue.getItem(0), 0, "Enqueue 6");
    assert.deepEqual(queue.getItem(1), 6, "Enqueue 6");
});
QUnit.test("PriorityQueue - MultiEnqueue test", function (assert) {
    var queue = new ds.PriorityQueue();
    queue.multiEnqueue(3, [0, 2]);
    assert.deepEqual(queue.multiDequeue(2), [0, 2], "MultiEnqueue 2 items");
    queue.multiEnqueue(4, [2]);
    queue.multiEnqueue(5, [4, 5, 8]);
    assert.deepEqual(queue.multiDequeue(4), [4, 5, 8, 2], "MultiDequeue 4 items");
    queue.multiEnqueue(0, []);
    assert.deepEqual(queue.multiDequeue(1), [], "MultiEnqueue 0 items");
});
QUnit.test("PriorityQueue - Dequeue test", function (assert) {
    var queue = new ds.PriorityQueue();
    queue.enqueue(5, 0);
    queue.enqueue(2, 2);
    assert.deepEqual(queue.dequeue(), 0, "Dequeue");
    assert.deepEqual(queue.dequeue(), 2, "Dequeue");
    assert.deepEqual(queue.dequeue(), undefined, "Check length if too much dequeue");
});
QUnit.test("PriorityQueue - MultiDequeue test", function (assert) {
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
QUnit.test("PriorityQueue - Remove test", function (assert) {
    var queue = new ds.PriorityQueue();
    queue.enqueue(4, 0);
    queue.enqueue(3, 2);
    queue.enqueue(2, 4);
    queue.enqueue(1, 5);
    queue.enqueue(0, 8);
    queue.remove(2, 2);
    assert.deepEqual(queue.multiDequeue(3), [0, 2, 8], "Remove from position 2 for 2");
});
QUnit.test("PriorityQueue - Is empty test", function (assert) {
    var queue = new ds.PriorityQueue();
    queue.enqueue(5, 0);
    queue.enqueue(2, 2);
    assert.deepEqual(queue.isEmpty(), false, "Is empty");
    queue.clear();
    assert.deepEqual(queue.isEmpty(), true, "Is empty");
});
QUnit.test("PriorityQueue - Clear test", function (assert) {
    var queue = new ds.PriorityQueue();
    queue.enqueue(5, 0);
    queue.enqueue(5, 2);
    queue.clear();
    assert.deepEqual(queue.isEmpty(), true, "Clear queue");
});
QUnit.test("PriorityQueue - Iterator test", function (assert) {
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
QUnit.test("PriorityQueue - Contains priority test", function (assert) {
    var queue = new ds.PriorityQueue();
    queue.enqueue(5, 0);
    queue.enqueue(2, 2);
    assert.deepEqual(queue.containsPriority(5), true, "Contains priority 5");
    assert.deepEqual(queue.containsPriority(2), true, "Contains priority 2");
    assert.deepEqual(queue.containsPriority(1), false, "Not contains priority 1");
    var callback = function (item) {
        return item > 3;
    };
    assert.deepEqual(queue.containsPriority(null, callback), true, "Contains a priority > 3");
    callback = function (item) {
        return item < 2;
    };
    assert.deepEqual(queue.containsPriority(null, callback), false, "Contains a priority < 2");
});
QUnit.test("PriorityQueue - Get items test", function (assert) {
    var queue = new ds.PriorityQueue();
    queue.enqueue(5, 0);
    queue.enqueue(5, 2);
    queue.enqueue(5, 5);
    assert.deepEqual(queue.getItems(5), [0, 2, 5], "Get items with priority 5");
    assert.deepEqual(queue.getItems(1), [], "Get items with priority 1");
});
QUnit.test("PriorityQueue - To queue test", function (assert) {
    var priorityQueue = new ds.PriorityQueue();
    priorityQueue.enqueue(5, 0);
    priorityQueue.enqueue(5, 2);
    priorityQueue.enqueue(5, 5);
    var queue = priorityQueue.toQueue();
    assert.deepEqual(queue.items, [0, 2, 5], "Check the to queue method");
});
QUnit.test("PriorityQueue - Execute test", function (assert) {
    var queue = new ds.PriorityQueue();
    queue.enqueue(4, 0);
    queue.enqueue(3, 2);
    var callback = function (item) {
        return item * 2;
    };
    queue.execute(callback);
    assert.deepEqual(queue.getItem(0), 0, "Execute for item 0");
    assert.deepEqual(queue.getItem(1), 4, "Execute for item 1");
});
QUnit.test("PriorityQueue - Remove test", function (assert) {
    var queue = new ds.PriorityQueue();
    queue.enqueue(4, 0);
    queue.enqueue(3, 1);
    queue.enqueue(2, 2);
    queue.enqueue(1, 3);
    queue.enqueue(0, 4);
    for (var i = 0; i < 5; i++)
        assert.deepEqual(queue.getItem(i), i, "Check queue correctness");
    queue.changePriority(3, 8);
    for (var j = 0; j < 5; j++) {
        if (!j)
            assert.deepEqual(queue.getItem(j), 3, "Check increase priority");
        else if (j < 4)
            assert.deepEqual(queue.getItem(j), j - 1, "Check increase priority");
        else
            assert.deepEqual(queue.getItem(j), j, "Check increase priority");
    }
    queue.changePriority(3, -4);
    for (var k = 0; k < 5; k++) {
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
QUnit.test("PriorityQueue - Filter test", function (assert) {
    var queue = new ds.PriorityQueue();
    var length = 100;
    for (var i = 0; i < length; i++)
        queue.enqueue(i, i);
    var result = queue.filter(function (item) {
        return 1 - item % 2;
    });
    assert.deepEqual(result[0], 98, "Filter of the even values");
    assert.deepEqual(result[result.length - 1], 0, "Filter on the even values");
});
QUnit.test("PriorityQueue - Clone test", function (assert) {
    var queue = new ds.PriorityQueue();
    for (var i = 0; i < 10; i++)
        queue.enqueue(i, i);
    var clone = queue.clone();
    assert.deepEqual(clone.multiDequeue(10), [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], "Clone of the queue");
});
QUnit.test("PriorityQueue - Clone distinct test", function (assert) {
    var queue = new ds.PriorityQueue();
    for (var i = 0; i < 40; i++)
        queue.enqueue(i % 20, i % 10);
    var clone = queue.cloneDistinct();
    assert.deepEqual(clone.multiDequeue(10), [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], "Clone of the queue");
});
/**
 * Created by Battistella Stefano on 31/03/14.
 */
QUnit.test("Queue - Init test", function (assert) {
    var queue = new ds.Queue(0, 2, 4, 6);
    assert.deepEqual(queue.multiDequeue(4), [0, 2, 4, 6], "Initializing");
    queue = new ds.Queue(0);
    assert.deepEqual(queue.multiDequeue(4), [0], "Initializing");
});
QUnit.test("Queue - Init range test", function (assert) {
    var queue = new ds.Queue(ds.Range(0, 6, 2));
    assert.deepEqual(queue.multiDequeue(4), [0, 2, 4, 6], "Initializing");
});
QUnit.test("Queue - Enqueue test", function (assert) {
    var queue = new ds.Queue();
    queue.enqueue(0);
    assert.deepEqual(queue.peek(), 0, "Enqueue 0");
    queue.enqueue(2);
    assert.deepEqual(queue.getItem(0), 0, "Enqueue 2");
    assert.deepEqual(queue.getItem(1), 2, "Enqueue 2");
});
QUnit.test("Queue - MultiEnqueue test", function (assert) {
    var queue = new ds.Queue();
    queue.multiEnqueue([0, 2]);
    assert.deepEqual(queue.multiDequeue(2), [0, 2], "MultiEnqueue 2 items");
    queue.multiEnqueue([2]);
    queue.multiEnqueue([4, 5, 8]);
    assert.deepEqual(queue.multiDequeue(4), [2, 4, 5, 8], "MultiDequeue 4 items");
    queue.multiEnqueue([]);
    assert.deepEqual(queue.multiDequeue(1), [], "MultiEnqueue 0 items");
});
QUnit.test("Queue - Dequeue test", function (assert) {
    var queue = new ds.Queue();
    queue.enqueue(0);
    queue.enqueue(2);
    assert.deepEqual(queue.dequeue(), 0, "Dequeue");
    assert.deepEqual(queue.dequeue(), 2, "Dequeue");
    assert.deepEqual(queue.dequeue(), undefined, "Check length if too much dequeue");
});
QUnit.test("Queue - MultiDequeue test", function (assert) {
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
QUnit.test("Queue - Remove test", function (assert) {
    var queue = new ds.Queue();
    queue.enqueue(0);
    queue.enqueue(2);
    queue.enqueue(4);
    queue.enqueue(5);
    queue.enqueue(8);
    queue.remove(2, 2);
    assert.deepEqual(queue.multiDequeue(3), [0, 2, 8], "Remove from position 2 for 2");
});
QUnit.test("Queue - Iterator test", function (assert) {
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
QUnit.test("Queue - Get length test", function (assert) {
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
QUnit.test("Queue - Peek test", function (assert) {
    var queue = new ds.Queue();
    queue.enqueue(0);
    assert.deepEqual(queue.peek(), 0, "Peek 0");
    queue.enqueue(2);
    assert.deepEqual(queue.peek(), 0, "Peek 0");
});
QUnit.test("Queue - Clear test", function (assert) {
    var queue = new ds.Queue();
    queue.enqueue(0);
    queue.enqueue(2);
    queue.clear();
    assert.deepEqual(queue.isEmpty(), true, "Clear queue");
});
QUnit.test("Queue - Is empty test", function (assert) {
    var queue = new ds.Queue();
    queue.enqueue(0);
    queue.enqueue(2);
    assert.deepEqual(queue.isEmpty(), false, "Is not empty");
    queue.clear();
    assert.deepEqual(queue.isEmpty(), true, "Is empty");
});
QUnit.test("Queue - Contains test", function (assert) {
    var queue = new ds.Queue();
    queue.enqueue(0);
    queue.enqueue(2);
    assert.deepEqual(queue.contains(0), true, "Contains 0");
    assert.deepEqual(queue.contains(2), true, "Contains 2");
    assert.deepEqual(queue.contains(1), false, "Not contains 1");
    var callback = function (item) {
        return item > 0;
    };
    assert.deepEqual(queue.contains(null, callback), true, "Contains a value > 0");
    callback = function (item) {
        return item < 0;
    };
    assert.deepEqual(queue.contains(null, callback), false, "Contains a value < 0");
});
QUnit.test("Queue - Execute test", function (assert) {
    var queue = new ds.Queue();
    queue.enqueue(0);
    queue.enqueue(2);
    var callback = function (item) {
        return item * 2;
    };
    queue.execute(callback);
    assert.deepEqual(queue.getItem(0), 0, "Execute for item 0");
    assert.deepEqual(queue.getItem(1), 4, "Execute for item 1");
});
QUnit.test("Queue - Index of test", function (assert) {
    var queue = new ds.Queue();
    for (var i = 0; i < 10; i++)
        queue.enqueue(i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(queue.indexOf(0), 0, "Index of 0");
    assert.deepEqual(queue.indexOf(15), -1, "Index of 15");
    assert.deepEqual(queue.indexOf(5), 5, "Index of 5");
    assert.deepEqual(queue.indexOf(null, callback), 6, "Index of the first even number greater than 5");
});
QUnit.test("Queue - Last index of test", function (assert) {
    var queue = new ds.Queue();
    for (var i = 0; i < 10; i++)
        queue.enqueue(i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(queue.lastIndexOf(0), 0, "Last index of 0");
    assert.deepEqual(queue.lastIndexOf(15), -1, "Last index of 15");
    assert.deepEqual(queue.lastIndexOf(5), 5, "Last index of 5");
    assert.deepEqual(queue.lastIndexOf(null, callback), 8, "Index of the last even number greater than 5");
});
QUnit.test("Queue - Indexes of test", function (assert) {
    var queue = new ds.Queue();
    for (var i = 0; i < 30; i++)
        queue.enqueue(i % 10);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(queue.allIndexesOf(0), [0, 10, 20], "Indexes of 0");
    assert.deepEqual(queue.allIndexesOf(15), [], "Indexes of 15");
    assert.deepEqual(queue.allIndexesOf(5), [5, 15, 25], "Indexes of 5");
    assert.deepEqual(queue.allIndexesOf(null, callback), [6, 8, 16, 18, 26, 28], "Indexes of the even numbers greater than 5");
});
QUnit.test("Queue - Clone test", function (assert) {
    var queue = new ds.Queue();
    for (var i = 0; i < 10; i++)
        queue.enqueue(i);
    var clone = queue.clone();
    var it = clone.getIterator();
    var j = 0;
    for (it.first(); !it.isDone(); it.next(), j++)
        assert.deepEqual(it.getItem(), j, "Clone of the queue");
});
QUnit.test("Queue - Clone distinct test", function (assert) {
    var queue = new ds.Queue();
    for (var i = 0; i < 20; i++)
        queue.enqueue(i % 10);
    var clone = queue.cloneDistinct();
    assert.deepEqual(clone.allIndexesOf(2), [2], "Clone of the queue");
});
QUnit.test("Queue - Filter test", function (assert) {
    var queue = new ds.Queue();
    var length = 100;
    for (var i = 0; i < length; i++)
        queue.enqueue(i);
    var result = queue.filter(function (item) {
        return 1 - item % 2;
    });
    assert.deepEqual(result[0], 0, "Filter of the even values");
    assert.deepEqual(result[result.length - 1], 98, "Filter on the even values");
});
/**
 * Created by Stefano on 06/04/14.
 */
QUnit.test("Range - Create linear test", function (assert) {
    var range = ds.Range(0, 5);
    for (var j = 0; j < range.length; j++) {
        assert.deepEqual(range[j], j, "Check range values");
    }
});
QUnit.test("Range - Create inverse test", function (assert) {
    var range = ds.Range(5, 0, -1);
    for (var j = 0; j < range.length; j++) {
        assert.deepEqual(range[j], 5 - j, "Check range values");
    }
});
QUnit.test("Range - Create step test", function (assert) {
    var range = ds.Range(0, 15, 4);
    for (var j = 0; j < range.length; j++) {
        assert.deepEqual(range[j], j * 4, "Check range values");
    }
});
QUnit.test("Range - Create inverse step test", function (assert) {
    var range = ds.Range(15, 4, -2);
    for (var j = 0; j < range.length; j++) {
        assert.deepEqual(range[j], 15 - j * 2, "Check range values");
    }
});
/**
 * Created by Stefano on 06/04/14.
 */
QUnit.test("RBTree - Insert test", function (assert) {
    var tree = new ds.RBTree();
    var keys = [];
    for (var i = 0; i < 20; i++) {
        keys.push(Math.random());
        tree.insert(keys[i], keys[i]);
    }
    for (var j = 0; j < 20; j++)
        assert.deepEqual(tree.search(keys[j]), keys[j], "Insert node");
    keys.sort();
    for (var k = 0; k < 20; k++)
        assert.deepEqual(tree.getItem(k), keys[k], "Insert node");
});
QUnit.test("RBTree - Minimum test", function (assert) {
    var tree = new ds.RBTree();
    var keys = [];
    var min = 10;
    for (var i = 0; i < 20; i++) {
        keys.push(Math.random());
        tree.insert(keys[i], i);
        if (keys[i] < min)
            min = keys[i];
    }
    assert.deepEqual(tree.minimum().item, tree.search(min), "Minimum");
});
QUnit.test("RBTree - Maximum test", function (assert) {
    var tree = new ds.RBTree();
    var keys = [];
    var max = -1;
    for (var i = 0; i < 20; i++) {
        keys.push(Math.random());
        tree.insert(keys[i], i);
        if (keys[i] > max)
            max = keys[i];
    }
    assert.deepEqual(tree.maximum().item, tree.search(max), "Maximum");
});
QUnit.test("RBTree - Successor test", function (assert) {
    var tree = new ds.RBTree();
    for (var i = 0; i < 20; i++)
        tree.insert(i, i);
    var it = tree.getIterator();
    var j = 1;
    for (it.first(); !it.isDone(); it.next(), j++) {
        var successor = tree.successor(it.getNode());
        if (successor)
            assert.deepEqual(successor.item, j, "Successor");
        else
            assert.deepEqual(successor, null, "No successor");
    }
});
QUnit.test("RBTree - Predecessor test", function (assert) {
    var tree = new ds.RBTree();
    for (var i = 0; i < 20; i++)
        tree.insert(i, i);
    var it = tree.getIterator();
    var j = 18;
    for (it.last(); !it.isDone(); it.previous(), j--) {
        var predecessor = tree.predecessor(it.getNode());
        if (predecessor)
            assert.deepEqual(predecessor.item, j, "Predecessor");
        else
            assert.deepEqual(predecessor, null, "No predecessor");
    }
});
QUnit.test("RBTree - Delete node test", function (assert) {
    var tree = new ds.RBTree();
    for (var i = 0; i < 20; i++)
        tree.insert(i, i);
    var j = 0;
    while (tree.minimum()) {
        assert.deepEqual(tree.minimum().item, j, "Deletion");
        tree.deleteNode(tree.minimum());
        j++;
    }
});
QUnit.test("RBTree - To array test", function (assert) {
    var tree = new ds.RBTree();
    for (var i = 0; i < 5; i++)
        tree.insert(i, i);
    assert.deepEqual(tree.toArray(), [0, 1, 2, 3, 4], "To array");
});
QUnit.test("RBTree - Filter test", function (assert) {
    var tree = new ds.RBTree();
    var length = 100;
    for (var i = 0; i < length; i++)
        tree.insert(i, i);
    var result = tree.filter(function (item) {
        return 1 - item % 2;
    });
    assert.deepEqual(result[0], 0, "Filter of the even values");
    assert.deepEqual(result[result.length - 1], 98, "Filter on the even values");
});
QUnit.test("RBTree - Clear test", function (assert) {
    var tree = new ds.RBTreeList();
    tree.insert(0, 0);
    tree.insert(2, 2);
    tree.clear();
    assert.deepEqual(tree.isEmpty(), true, "Clear tree");
});
QUnit.test("RBTree - Is empty test", function (assert) {
    var tree = new ds.RBTree();
    tree.insert(0, 0);
    tree.insert(2, 2);
    assert.deepEqual(tree.isEmpty(), false, "Is not empty");
    tree.clear();
    assert.deepEqual(tree.isEmpty(), true, "Is empty");
});
QUnit.test("RBTree - Contains test", function (assert) {
    var tree = new ds.RBTree();
    tree.insert(0, 0);
    tree.insert(2, 2);
    assert.deepEqual(tree.contains(0), true, "Contains 0");
    assert.deepEqual(tree.contains(2), true, "Contains 2");
    assert.deepEqual(tree.contains(1), false, "Not contains 1");
    var callback = function (item) {
        return item > 0;
    };
    assert.deepEqual(tree.fullContains(callback), true, "Contains a value > 0");
    callback = function (item) {
        return item < 0;
    };
    assert.deepEqual(tree.fullContains(callback), false, "Contains a value < 0");
});
QUnit.test("RBTree - Execute test", function (assert) {
    var tree = new ds.RBTree();
    tree.insert(0, 0);
    tree.insert(2, 2);
    var callback = function (item) {
        return item * 2;
    };
    tree.execute(callback);
    assert.deepEqual(tree.search(0), 0, "Execute for key 0");
    assert.deepEqual(tree.search(2), 4, "Execute for key 1");
});
QUnit.test("RBTree - Index of test", function (assert) {
    var tree = new ds.RBTree();
    for (var i = 0; i < 10; i++)
        tree.insert(i, i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(tree.indexOf(0), 0, "Index of 0");
    assert.deepEqual(tree.indexOf(15), -1, "Index of 15");
    assert.deepEqual(tree.indexOf(5), 5, "Index of 5");
    assert.deepEqual(tree.indexOf(null, callback), 6, "Index of the first even number greater than 5");
});
QUnit.test("RBTree - Last index of test", function (assert) {
    var tree = new ds.RBTree();
    for (var i = 0; i < 10; i++)
        tree.insert(i, i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(tree.lastIndexOf(0), 0, "Last index of 0");
    assert.deepEqual(tree.lastIndexOf(15), -1, "Last index of 15");
    assert.deepEqual(tree.lastIndexOf(5), 5, "Last index of 5");
    assert.deepEqual(tree.lastIndexOf(null, callback), 8, "Index of the last even number greater than 5");
});
QUnit.test("RBTree - Indexes of test", function (assert) {
    var tree = new ds.RBTree();
    for (var i = 0; i < 30; i++)
        tree.insert(i, i % 10);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(tree.allIndexesOf(0), [0, 10, 20], "Indexes of 0");
    assert.deepEqual(tree.allIndexesOf(15), [], "Indexes of 15");
    assert.deepEqual(tree.allIndexesOf(5), [5, 15, 25], "Indexes of 5");
    assert.deepEqual(tree.allIndexesOf(null, callback), [6, 8, 16, 18, 26, 28], "Indexes of the even numbers greater than 5");
});
QUnit.test("RBTree - Clone test", function (assert) {
    var tree = new ds.RBTree();
    for (var i = 0; i < 10; i++)
        tree.insert(i, i);
    var clone = tree.clone();
    var it = clone.getIterator();
    var j = 0;
    for (it.first(); !it.isDone(); it.next(), j++)
        assert.deepEqual(it.getItem(), j, "Clone of the tree");
});
QUnit.test("RBTree - Clone distinct test", function (assert) {
    var tree = new ds.RBTree();
    for (var i = 0; i < 20; i++)
        tree.insert(i % 10, i % 10);
    var clone = tree.cloneDistinct();
    assert.deepEqual(clone.allIndexesOf(2), [2], "Clone of the tree");
});
/**
 * Created by Stefano on 06/04/14.
 */
QUnit.test("RBTreeList - Insert test", function (assert) {
    var tree = new ds.RBTreeList();
    var keys = [];
    for (var i = 0; i < 20; i++) {
        keys.push(Math.random());
        tree.insert(keys[i], i);
    }
    for (var j = 0; j < 20; j++)
        assert.deepEqual(tree.search(keys[j]), j, "Insert node");
});
QUnit.test("RBTreeList - Minimum test", function (assert) {
    var tree = new ds.RBTreeList();
    var keys = [];
    var min = 10;
    for (var i = 0; i < 20; i++) {
        keys.push(Math.random());
        tree.insert(keys[i], i);
        if (keys[i] < min)
            min = keys[i];
    }
    assert.deepEqual(tree.minimum().item, tree.search(min), "Minimum");
});
QUnit.test("RBTreeList - Maximum test", function (assert) {
    var tree = new ds.RBTreeList();
    var keys = [];
    var max = -1;
    for (var i = 0; i < 20; i++) {
        keys.push(Math.random());
        tree.insert(keys[i], i);
        if (keys[i] > max)
            max = keys[i];
    }
    assert.deepEqual(tree.maximum().item, tree.search(max), "Maximum");
});
QUnit.test("RBTreeList - Successor test", function (assert) {
    var tree = new ds.RBTreeList();
    for (var i = 0; i < 20; i++)
        tree.insert(i, i);
    var it = tree.getIterator();
    var j = 1;
    for (it.first(); !it.isDone(); it.next(), j++) {
        var successor = tree.successor(it.getNode());
        if (successor)
            assert.deepEqual(successor.item, j, "Successor");
        else
            assert.deepEqual(successor, null, "No successor");
    }
});
QUnit.test("RBTreeList - Predecessor test", function (assert) {
    var tree = new ds.RBTreeList();
    for (var i = 0; i < 20; i++)
        tree.insert(i, i);
    var it = tree.getIterator();
    var j = 18;
    for (it.last(); !it.isDone(); it.previous(), j--) {
        var predecessor = tree.predecessor(it.getNode());
        if (predecessor)
            assert.deepEqual(predecessor.item, j, "Predecessor");
        else
            assert.deepEqual(predecessor, null, "No predecessor");
    }
});
QUnit.test("RBTreeList - Delete node test", function (assert) {
    var tree = new ds.RBTreeList();
    for (var i = 0; i < 20; i++)
        tree.insert(i, i);
    var j = 0;
    while (tree.minimum()) {
        assert.deepEqual(tree.minimum().item, j, "Deletion");
        tree.deleteNode(tree.minimum());
        j++;
    }
});
QUnit.test("RBTreeList - To array test", function (assert) {
    var tree = new ds.RBTreeList();
    for (var i = 0; i < 5; i++)
        tree.insert(i, i);
    assert.deepEqual(tree.toArray(), [0, 1, 2, 3, 4], "To array");
});
QUnit.test("RBTreeList - Filter test", function (assert) {
    var tree = new ds.RBTreeList();
    for (var i = 0; i < 100; i++)
        tree.insert(i, i);
    var result = tree.filter(function (item) {
        return 1 - item % 2;
    });
    assert.deepEqual(result[0], 0, "Filter of the even values");
    assert.deepEqual(result[result.length - 1], 98, "Filter on the even values");
});
QUnit.test("RBTreeList - Clear test", function (assert) {
    var tree = new ds.RBTreeList();
    tree.insert(0, 0);
    tree.insert(2, 2);
    tree.clear();
    assert.deepEqual(tree.isEmpty(), true, "Clear tree");
});
QUnit.test("RBTreeList - Is empty test", function (assert) {
    var tree = new ds.RBTreeList();
    tree.insert(0, 0);
    tree.insert(2, 2);
    assert.deepEqual(tree.isEmpty(), false, "Is not empty");
    tree.clear();
    assert.deepEqual(tree.isEmpty(), true, "Is empty");
});
QUnit.test("RBTreeList - Contains test", function (assert) {
    var tree = new ds.RBTreeList();
    tree.insert(0, 0);
    tree.insert(2, 2);
    assert.deepEqual(tree.contains(0), true, "Contains 0");
    assert.deepEqual(tree.contains(2), true, "Contains 2");
    assert.deepEqual(tree.contains(1), false, "Not contains 1");
    var callback = function (item) {
        return item > 0;
    };
    assert.deepEqual(tree.fullContains(callback), true, "Contains a value > 0");
    callback = function (item) {
        return item < 0;
    };
    assert.deepEqual(tree.fullContains(callback), false, "Contains a value < 0");
});
QUnit.test("RBTreeList - Execute test", function (assert) {
    var tree = new ds.RBTreeList();
    tree.insert(0, 0);
    tree.insert(2, 2);
    var callback = function (item) {
        return item * 2;
    };
    tree.execute(callback);
    assert.deepEqual(tree.search(0), 0, "Execute for key 0");
    assert.deepEqual(tree.search(2), 4, "Execute for key 1");
});
QUnit.test("RBTreeList - Index of test", function (assert) {
    var tree = new ds.RBTreeList();
    for (var i = 0; i < 10; i++)
        tree.insert(i, i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(tree.indexOf(0), 0, "Index of 0");
    assert.deepEqual(tree.indexOf(15), -1, "Index of 15");
    assert.deepEqual(tree.indexOf(5), 5, "Index of 5");
    assert.deepEqual(tree.indexOf(null, callback), 6, "Index of the first even number greater than 5");
});
QUnit.test("RBTreeList - Last index of test", function (assert) {
    var tree = new ds.RBTreeList();
    for (var i = 0; i < 10; i++)
        tree.insert(i, i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(tree.lastIndexOf(0), 0, "Last index of 0");
    assert.deepEqual(tree.lastIndexOf(15), -1, "Last index of 15");
    assert.deepEqual(tree.lastIndexOf(5), 5, "Last index of 5");
    assert.deepEqual(tree.lastIndexOf(null, callback), 8, "Index of the last even number greater than 5");
});
QUnit.test("RBTreeList - Indexes of test", function (assert) {
    var tree = new ds.RBTreeList();
    for (var i = 0; i < 30; i++)
        tree.insert(i, i % 10);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(tree.allIndexesOf(0), [0, 10, 20], "Indexes of 0");
    assert.deepEqual(tree.allIndexesOf(15), [], "Indexes of 15");
    assert.deepEqual(tree.allIndexesOf(5), [5, 15, 25], "Indexes of 5");
    assert.deepEqual(tree.allIndexesOf(null, callback), [6, 8, 16, 18, 26, 28], "Indexes of the even numbers greater than 5");
});
QUnit.test("RBTreeList - Clone test", function (assert) {
    var tree = new ds.RBTreeList();
    for (var i = 0; i < 10; i++)
        tree.insert(i, i);
    var clone = tree.clone();
    var it = clone.getIterator();
    var j = 0;
    for (it.first(); !it.isDone(); it.next(), j++)
        assert.deepEqual(it.getItem(), j, "Clone of the tree");
});
QUnit.test("RBTreeList - Clone distinct test", function (assert) {
    var tree = new ds.RBTreeList();
    for (var i = 0; i < 20; i++)
        tree.insert(i % 10, i % 10);
    var clone = tree.cloneDistinct();
    assert.deepEqual(clone.allIndexesOf(2), [2], "Clone of the tree");
});
/**
 * Created by Stefano on 06/04/14.
 */
QUnit.test("Set - Insert test", function (assert) {
    var setA = new ds.Set();
    var e0 = new ds.Element(0);
    var e1 = new ds.Element(1);
    setA.multiInsert([e0, e1]);
    assert.deepEqual(setA.getItems(), [0, 1], "Insert elements");
    assert.deepEqual(setA.getCardinality(), 2, "Insert elements");
});
QUnit.test("Set - Union test", function (assert) {
    var setA = new ds.Set();
    var setB = new ds.Set();
    var e0 = new ds.Element(0);
    var e1 = new ds.Element(1);
    var e2 = new ds.Element(2);
    var e3 = new ds.Element(3);
    setA.multiInsert([e0, e1]);
    setA.multiInsert([e2, e3]);
    var union = setA.union(setB);
    assert.deepEqual(setA.parents.contains(union), true, "Union of sets");
    assert.deepEqual(setB.parents.contains(union), true, "Union of sets");
    assert.deepEqual(union.getCardinality(), 4, "Union of sets");
});
QUnit.test("Set - Intersection test", function (assert) {
    var setA = new ds.Set();
    var setB = new ds.Set();
    var e = [];
    for (var i = 0; i < 6; i++) {
        e.push(new ds.Element(i));
        if (i < 4)
            setA.insert(e[i]);
        if (i > 1)
            setB.insert(e[i]);
    }
    var intersection = setA.intersect(setB);
    for (var k = 0; k < 2; k++)
        assert.deepEqual(intersection.elements.getItem(k).item, k + 2, "Intersection of sets");
    assert.deepEqual(intersection.getCardinality(), 2, "Intersection of sets");
});
QUnit.test("Set - Difference test", function (assert) {
    var setA = new ds.Set();
    var setB = new ds.Set();
    var e = [];
    for (var i = 0; i < 6; i++) {
        e.push(new ds.Element(i));
        if (i < 4)
            setA.insert(e[i]);
        if (i > 1)
            setB.insert(e[i]);
    }
    var diffA = setA.difference(setB);
    var diffB = setB.difference(setA);
    for (var j = 0; j < 2; j++)
        assert.deepEqual(diffA.elements.getItem(j).item, j, "Difference of sets");
    assert.deepEqual(diffA.getCardinality(), 2, "Difference of sets");
    for (var k = 0; k < 2; k++)
        assert.deepEqual(diffB.elements.getItem(k).item, k + 4, "Difference of sets");
    assert.deepEqual(diffB.getCardinality(), 2, "Difference of sets");
});
QUnit.test("Set - Cartesian product test", function (assert) {
    var setA = new ds.Set();
    var setB = new ds.Set();
    var e = [];
    for (var i = 0; i < 6; i++) {
        e.push(new ds.Element(i));
        if (i < 3)
            setA.insert(e[i]);
        if (i > 2)
            setB.insert(e[i]);
    }
    var productA = setA.cartesianProduct(setB);
    var productB = setB.cartesianProduct(setA);
    assert.deepEqual(productA.getItems(), [
        [0, 3],
        [0, 4],
        [0, 5],
        [1, 3],
        [1, 4],
        [1, 5],
        [2, 3],
        [2, 4],
        [2, 5]
    ], "Cartesian product of sets");
    assert.deepEqual(productA.getCardinality(), 9, "Cartesian product of sets");
    assert.deepEqual(productB.getItems(), [
        [3, 0],
        [3, 1],
        [3, 2],
        [4, 0],
        [4, 1],
        [4, 2],
        [5, 0],
        [5, 1],
        [5, 2]
    ], "Cartesian product of sets");
    assert.deepEqual(productB.getCardinality(), 9, "Cartesian product of sets");
});
/**
 * Created by Battistella Stefano on 31/03/14.
 */
QUnit.test("Stack - Init test", function (assert) {
    var stack = new ds.Stack(0, 2, 4, 6);
    assert.deepEqual(stack.multiPop(4), [6, 4, 2, 0], "Initializing");
    stack = new ds.Stack(0);
    assert.deepEqual(stack.multiPop(4), [0], "Initializing");
});
QUnit.test("Stack - Init range test", function (assert) {
    var stack = new ds.Stack(ds.Range(0, 6, 2));
    assert.deepEqual(stack.multiPop(4), [6, 4, 2, 0], "Initializing");
});
QUnit.test("Stack - Push test", function (assert) {
    var stack = new ds.Stack();
    stack.push(0);
    assert.deepEqual(stack.getItem(0), 0, "Push 0");
    stack.push(2);
    assert.deepEqual(stack.getItem(0), 2, "Push 2");
    assert.deepEqual(stack.getItem(1), 0, "Push 2");
});
QUnit.test("Stack - Pop test", function (assert) {
    var stack = new ds.Stack();
    stack.push(0);
    stack.push(2);
    assert.deepEqual(stack.pop(), 2, "Pop");
    assert.deepEqual(stack.pop(), 0, "Check length");
    assert.deepEqual(stack.pop(), undefined, "Check length if too much pop");
});
QUnit.test("Stack - MultiPop test", function (assert) {
    var stack = new ds.Stack();
    stack.push(0);
    stack.push(2);
    assert.deepEqual(stack.multiPop(1), [2], "MultiPop 1 time");
    stack.push(4);
    stack.push(5);
    stack.push(8);
    assert.deepEqual(stack.multiPop(7), [8, 5, 4, 0], "MultiPop 7 times");
    assert.deepEqual(stack.multiPop(1), [], "MultiPop 1 time with stack empty");
});
QUnit.test("Stack - Iterator test", function (assert) {
    var stack = new ds.Stack();
    for (var i = 0; i < 10; i++)
        stack.push(i);
    var j = 9;
    var it = stack.getIterator();
    for (it.first(); !it.isDone(); it.next(), j--)
        assert.deepEqual(it.getItem(), j, "Get next item " + (10 - j));
    j++;
    for (it.last(); !it.isDone(); it.previous(), j++)
        assert.deepEqual(it.getItem(), j, "Get previous item " + (10 - j));
});
QUnit.test("Stack - Get length test", function (assert) {
    var stack = new ds.Stack();
    assert.deepEqual(stack.getLength(), 0, "Length 0");
    stack.push(0);
    assert.deepEqual(stack.getLength(), 1, "Length 1");
    stack.push(2);
    assert.deepEqual(stack.getLength(), 2, "Length 2");
    stack.pop();
    stack.pop();
    assert.deepEqual(stack.getLength(), 0, "Length 0");
});
QUnit.test("Stack - Peek test", function (assert) {
    var stack = new ds.Stack();
    stack.push(0);
    assert.deepEqual(stack.peek(), 0, "Peek 0");
    stack.push(2);
    assert.deepEqual(stack.peek(), 2, "Peek 2");
});
QUnit.test("Stack - Clear test", function (assert) {
    var stack = new ds.Stack();
    stack.push(0);
    stack.push(2);
    stack.clear();
    assert.deepEqual(stack.isEmpty(), true, "Clear stack");
});
QUnit.test("Stack - Is empty test", function (assert) {
    var stack = new ds.Stack();
    stack.push(0);
    stack.push(2);
    assert.deepEqual(stack.isEmpty(), false, "Is empty");
    stack.clear();
    assert.deepEqual(stack.isEmpty(), true, "Is empty");
});
QUnit.test("Stack - contains", function (assert) {
    var stack = new ds.Stack();
    stack.push(0);
    stack.push(2);
    assert.deepEqual(stack.contains(0), true, "Contains 0");
    assert.deepEqual(stack.contains(2), true, "Contains 2");
    assert.deepEqual(stack.contains(1), false, "Not contains 1");
    var callback = function (item) {
        return item > 0;
    };
    assert.deepEqual(stack.contains(null, callback), true, "Contains a value > 0");
    callback = function (item) {
        return item < 0;
    };
    assert.deepEqual(stack.contains(null, callback), false, "Contains a value < 0");
});
QUnit.test("Stack - execute", function (assert) {
    var stack = new ds.Stack();
    stack.push(0);
    stack.push(2);
    var callback = function (item) {
        return item * 2;
    };
    stack.execute(callback);
    assert.deepEqual(stack.getItem(0), 4, "Execute for item 1");
    assert.deepEqual(stack.getItem(1), 0, "Execute for item 0");
});
QUnit.test("Stack - Index of test", function (assert) {
    var stack = new ds.Stack();
    for (var i = 0; i < 10; i++)
        stack.push(i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(stack.indexOf(0), 0, "Index of 0");
    assert.deepEqual(stack.indexOf(15), -1, "Index of 15");
    assert.deepEqual(stack.indexOf(5), 5, "Index of 5");
    assert.deepEqual(stack.indexOf(null, callback), 8, "Index of the first even number greater than 5");
});
QUnit.test("Stack - Last index of test", function (assert) {
    var stack = new ds.Stack();
    for (var i = 0; i < 10; i++)
        stack.push(i);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(stack.lastIndexOf(0), 0, "Last index of 0");
    assert.deepEqual(stack.lastIndexOf(15), -1, "Last index of 15");
    assert.deepEqual(stack.lastIndexOf(5), 5, "Last index of 5");
    assert.deepEqual(stack.lastIndexOf(null, callback), 6, "Index of the last even number greater than 5");
});
QUnit.test("Stack - Indexes of test", function (assert) {
    var stack = new ds.Stack();
    for (var i = 0; i < 30; i++)
        stack.push(i % 10);
    var callback = function (item) {
        return !(item % 2) && item > 5;
    };
    assert.deepEqual(stack.allIndexesOf(0), [20, 10, 0], "Indexes of 0");
    assert.deepEqual(stack.allIndexesOf(15), [], "Indexes of 15");
    assert.deepEqual(stack.allIndexesOf(5), [25, 15, 5], "Indexes of 5");
    assert.deepEqual(stack.allIndexesOf(null, callback), [28, 26, 18, 16, 8, 6], "Indexes of the even numbers greater than 5");
});
QUnit.test("Stack - Clone test", function (assert) {
    var stack = new ds.Stack();
    for (var i = 0; i < 10; i++)
        stack.push(i);
    var clone = stack.clone();
    var it = clone.getIterator();
    var j = 9;
    for (it.first(); !it.isDone(); it.next(), j--)
        assert.deepEqual(it.getItem(), j, "Clone of the list");
});
QUnit.test("Stack - Clone distinct test", function (assert) {
    var stack = new ds.Stack();
    for (var i = 0; i < 20; i++)
        stack.push(i % 10);
    var clone = stack.cloneDistinct();
    assert.deepEqual(clone.allIndexesOf(2), [2], "Clone of the list");
});
QUnit.test("Stack - Filter test", function (assert) {
    var stack = new ds.Stack();
    var length = 100;
    for (var i = 0; i < length; i++)
        stack.push(i);
    var result = stack.filter(function (item) {
        return 1 - item % 2;
    });
    assert.deepEqual(result[0], 98, "Filter of the even values");
    assert.deepEqual(result[result.length - 1], 0, "Filter on the even values");
});
/**
 * Created by Stefano on 06/04/14.
 */
QUnit.test("Trie - Insert test", function (assert) {
    var trie = new ds.Trie();
    trie.insert("Blue");
    trie.insert("Bleu");
    var strings = [];
    trie.stringsToArray(strings);
    assert.deepEqual(strings, ["Bleu", "Blue"], "Insert node");
    trie.insert("Abba", 0);
    trie.insert("Hello", 0);
    trie.insert("World", 0);
    assert.deepEqual(trie.getItem("Abba"), 0, "Insert node");
    assert.deepEqual(trie.getItem("Hello"), 0, "Insert node");
    assert.deepEqual(trie.getItem("World"), 0, "Insert node");
});
QUnit.test("Trie - Suggest test", function (assert) {
    var trie = new ds.Trie();
    trie.insert("Blue");
    trie.insert("Boing");
    trie.insert("Yellow");
    trie.insert("Hello");
    trie.insert("He");
    trie.insert("Hola");
    assert.deepEqual(trie.suggest(""), ["Blue", "Boing", "He", "Hello", "Hola", "Yellow"], "Suggest empty string");
    assert.deepEqual(trie.suggest("B"), ["Blue", "Boing"], "Suggest B string");
    assert.deepEqual(trie.suggest("Bo"), ["Boing"], "Suggest Bo string");
    assert.deepEqual(trie.suggest("Ho"), ["Hola"], "Suggest Ho string");
    assert.deepEqual(trie.suggest("A"), [], "Suggest A string");
    assert.deepEqual(trie.suggest("Ready"), [], "Suggest Ready string");
});
QUnit.test("Trie - Update Item test", function (assert) {
    var trie = new ds.Trie();
    trie.insert("Blue", 0);
    trie.insert("Boing", 0);
    trie.insert("Yellow", 0);
    trie.insert("Hello", 0);
    trie.insert("He", 0);
    trie.insert("Hola", 0);
    var callback = function (item) {
        return item + 1;
    };
    var strings = trie.suggest("");
    for (var i = 0; i < strings.length; ++i) {
        trie.updateItem(strings[i], callback);
        assert.deepEqual(trie.getItem(strings[i]), 1, "Value Updated");
    }
});
//# sourceMappingURL=tests.js.map