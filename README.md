[Data Structures](https://github.com/Bishop92/JavaScript-Data-Structures)
=================
**A library for data structures in JavaScript**

DataStructures is a JavaScript library where you can find the most common data structures and also other data
structures more advanced. Various method are also provided in order to manipulate data structures.

This library implements also the [iterator] (http://en.wikipedia.org/wiki/Iterator_pattern) pattern in order to hide
the data structure that work for storing your data.

Supported data structures
-------------------------
- [Stack](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/symbols/Stack.html)
- [Queue](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/symbols/Queue.html)
- [Priority Queue](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/symbols/PriorityQueue.html)
- [Circular Buffer](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/symbols/CircularBuffer.html)
- [Hash Table](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/symbols/HashTable.html)
- [Linked List](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/symbols/LinkedList.html)
- [Double Linked List](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/symbols/DoubleLinkedList.html)
- [Binary Search Tree](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/symbols/BSTree.html)
- [Red-Black Tree](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/symbols/RBTree.html)
- [Red-Black Tree List](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/symbols/RBTreeList.html)
- [B-Tree](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/symbols/BTree.html)
- [Set](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/symbols/Set.html)

How to use
----------
1. Download the minimized library [here](https://github.com/Bishop92/JavaScript-Data-Structures/blob/master/DataStructuresMinimized.js);

2. Include the file in your project;

3. Start to use it as any other class.

Example

```JavaScript
var listA = new DoubleLinkedList();
var listB = new DoubleLinkedList();
listA.fromArray([0, 1]);
listB.fromArray([2, 3]);
listA.join(listB);
listA.toArray(); // [0, 1, 2, 3]
```

Documentation
-------------
Follow this [link](https://github.com/Bishop92/JavaScript-Data-Structures/wiki) to read the full documentation.
Follow this [link](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/files.html) to read the JSDoc.

History
-------

### Future implementations

- Persistence for data structures like array and lists.

### Current state of the art
- v 1.0.0 First release of the library.

Support
-------
Battistella Stefano, [stefano.battistella.92@gmail.com](mailto:stefano.battistella.92@gmail.com)