[Data Structures](https://github.com/Bishop92/JavaScript-Data-Structures)
=================
**A library for data structures in JavaScript**

DataStructures is a JavaScript library where you can find the most common data structures and also other data
structures more advanced. Various method are also provided in order to manipulate data structures.

This library implements the [iterator] (http://en.wikipedia.org/wiki/Iterator_pattern) pattern in order to hide
the data structure that work for storing your data.

Supported data structures
-------------------------
- [Stack](https://github.com/Bishop92/JavaScript-Data-Structures/wiki/Stack)
- [Queue](https://github.com/Bishop92/JavaScript-Data-Structures/wiki/Queue)
- [Priority Queue](https://github.com/Bishop92/JavaScript-Data-Structures/wiki/Priority-Queue)
- [Circular Buffer](https://github.com/Bishop92/JavaScript-Data-Structures/wiki/Circular-Buffer)
- [Hash Table](https://github.com/Bishop92/JavaScript-Data-Structures/wiki/Hash-Table)
- [Linked List](https://github.com/Bishop92/JavaScript-Data-Structures/wiki/Linked-List)
- [Double Linked List](https://github.com/Bishop92/JavaScript-Data-Structures/wiki/Double-Linked-List)
- [Binary search Tree](https://github.com/Bishop92/JavaScript-Data-Structures/wiki/Binary-search-tree)
- [Red-Black Tree](https://github.com/Bishop92/JavaScript-Data-Structures/wiki/Red-Black-Tree)
- [Red-Black Tree List](https://github.com/Bishop92/JavaScript-Data-Structures/wiki/Red-Black-Tree-List)
- [B-Tree](https://github.com/Bishop92/JavaScript-Data-Structures/wiki/B-Tree)
- [Set](https://github.com/Bishop92/JavaScript-Data-Structures/wiki/Set)
- [Trie](https://github.com/Bishop92/JavaScript-Data-Structures/wiki/Trie)

How to use
----------
1. Download the minimized library [here](https://raw.githubusercontent.com/Bishop92/JavaScript-Data-Structures/master/DataStructuresMinimized.js) (right click and save as...);

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
Follow this [link](https://rawgit.com/Bishop92/JavaScript-Data-Structures/master/doc/index.html) to read the JSDoc.

Support
-------
Battistella Stefano, [stefano.battistella.92@gmail.com](mailto:stefano.battistella.92@gmail.com)
