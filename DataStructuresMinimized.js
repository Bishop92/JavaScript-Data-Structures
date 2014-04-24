function Aggregate() {
}
function Iterator() {
}
function BSNode(e, t) {
	this.item = t;
	this.key = e;
	this.parent = null;
	this.left = null;
	this.right = null
}
function BSTree() {
	this.root = null
}
function BSTreeIterator(e) {
	this.aggregate = e;
	this.pointer = null
}
function BNode() {
	this.keys = [];
	this.items = [];
	this.childs = []
}
function BTree(e) {
	this.root = new BNode;
	this.t = e;
	this.size = 0
}
function BTreeIterator(e) {
	this.aggregate = e;
	this.pointer = null
}
function CircularBufferIterator(e) {
	this.aggregate = e;
	this.pointer = null;
	this.start = true
}
function CircularBuffer(e) {
	this.head = 0;
	this.tail = 0;
	this.items = new Array(e);
	this.empty = true;
	this.full = false;
	this.size = e
}
function DLLNode(e) {
	this.item = e;
	this.next = null;
	this.previous = null
}
function DoubleLinkedList(e) {
	this.first = null;
	this.last = null;
	this.length = 0;
	this.fromArray(arguments)
}
function DoubleLinkedListIterator(e) {
	this.aggregate = e;
	this.pointer = null
}
function merge(e, t, n) {
	var r = Math.floor((e + t) / 2);
	var i = [];
	var s = [];
	for (var o = 0; o < r - e + 1; o++)i[o] = n[e + o];
	for (var u = 0; u < t - r; u++)s[u] = n[r + u + 1];
	var a = 0, f = 0;
	for (var l = e; l < t + 1; l++) {
		if (f > t - r - 1 || i[a] <= s[f] && a < r - e + 1) {
			this.postMessage({cmd: "replace", index: l, value: i[a]});
			a++
		} else {
			this.postMessage({cmd: "replace", index: l, value: s[f]});
			f++
		}
	}
}
function HashTable(e) {
	this.size = e;
	this.p = 1e3;
	this.a = Math.floor(Math.random() * this.p);
	this.b = Math.floor(Math.random() * this.p);
	this.hash = function (e) {
		return(this.a * e + this.b) % this.p % this.size
	};
	this.items = [];
	this.keyLength = 0;
	this.clear()
}
function LLNode(e) {
	this.item = e;
	this.next = null
}
function LinkedList(e) {
	this.first = null;
	this.last = null;
	this.length = 0;
	this.fromArray(arguments)
}
function LinkedListIterator(e) {
	this.aggregate = e;
	this.pointer = null
}
function PriorityQueue() {
	this.items = new RBTreeList;
	this.length = 0
}
function PriorityQueueIterator(e) {
	this.aggregate = e;
	this.pointerNode = null;
	this.pointerPosition = -1
}
function Queue(e) {
	this.items = [];
	this.multiEnqueue(arguments)
}
function QueueIterator(e) {
	this.aggregate = e;
	this.pointer = -1
}
function RBNode(e, t) {
	this.item = t;
	this.key = e;
	this.parent = null;
	this.left = null;
	this.right = null;
	this.type = "r"
}
function RBTree() {
	this.root = null;
	this.size = 0
}
function RBTreeIterator(e) {
	this.aggregate = e;
	this.pointer = null
}
function RBLNode(e, t) {
	this.item = t;
	this.key = e;
	this.parent = null;
	this.left = null;
	this.right = null;
	this.next = null;
	this.previous = null;
	this.type = "r"
}
function RBTreeList() {
	this.root = null;
	this.first = null;
	this.last = null;
	this.size = 0
}
function RBTreeListIterator(e) {
	this.aggregate = e;
	this.pointer = null
}
function Element(e) {
	this.parents = new DoubleLinkedList;
	this.item = e
}
function Set() {
	this.parents = new DoubleLinkedList;
	this.elements = new DoubleLinkedList;
	this.sets = new DoubleLinkedList;
	this.size = 0
}
function Stack(e) {
	this.items = [];
	this.multiPush(arguments)
}
function StackIterator(e) {
	this.aggregate = e;
	this.pointer = -1
}
Aggregate.prototype.getIterator = function () {
};
Iterator.prototype.first = function () {
};
Iterator.prototype.next = function () {
};
Iterator.prototype.last = function () {
};
Iterator.prototype.previous = function () {
};
Iterator.prototype.isDone = function () {
};
Iterator.prototype.getItem = function () {
};
BSTree.prototype = new Aggregate;
BSTree.prototype.constructor = BSTree;
BSTree.prototype.getIterator = function () {
	return new BSTreeIterator(this)
};
BSTree.prototype.insert = function (e, t) {
	var n = new BSNode(e, t);
	var r = this.root;
	for (var i = this.root; i;) {
		r = i;
		if (e < i.key)i = i.left; else i = i.right
	}
	n.parent = r;
	if (!r)this.root = n; else if (e < r.key)r.left = n; else r.right = n
};
BSTree.prototype.search = function (e, t) {
	t = t || this.root;
	while (t && e !== t.key)if (e < t.key)t = t.left; else t = t.right;
	if (t)return t.item;
	return undefined
};
BSTree.prototype.minimum = function (e) {
	e = e || this.root;
	while (e && e.left)e = e.left;
	return e
};
BSTree.prototype.maximum = function (e) {
	e = e || this.root;
	while (e && e.right)e = e.right;
	return e
};
BSTree.prototype.successor = function (e) {
	if (e.right)return this.minimum(e.right);
	var t = e.parent;
	while (t && e === t.right) {
		e = t;
		t = t.parent
	}
	return t
};
BSTree.prototype.predecessor = function (e) {
	if (e.left)return this.maximum(e.left);
	var t = e.parent;
	while (t && e === t.left) {
		e = t;
		t = t.parent
	}
	return t
};
BSTree.prototype.deleteNode = function (e) {
	if (!e.left && !e.right) {
		if (e === this.root)this.root = null; else if (e.parent.left === e)e.parent.left = null; else e.parent.right = null
	} else if (e.left && e.right) {
		var t = this.successor(e);
		e.key = t.key;
		e.item = t.item;
		if (t.parent.left === t)t.parent.left = null; else t.parent.right = null
	} else {
		if (e.right) {
			if (e === this.root) {
				this.root = e.right;
				e.right.parent = null
			} else {
				e.parent.right = e.right;
				e.right.parent = e.parent
			}
		} else {
			if (e === this.root) {
				this.root = e.left;
				e.left.parent = null
			} else {
				e.parent.left = e.left;
				e.left.parent = e.parent
			}
		}
	}
};
BSTreeIterator.prototype = new Iterator;
BSTreeIterator.prototype.constructor = BSTreeIterator;
BSTreeIterator.prototype.first = function () {
	this.pointer = this.aggregate.minimum()
};
BSTreeIterator.prototype.next = function () {
	this.pointer = this.aggregate.successor(this.pointer)
};
BSTreeIterator.prototype.last = function () {
	this.pointer = this.aggregate.maximum()
};
BSTreeIterator.prototype.previous = function () {
	this.pointer = this.aggregate.predecessor(this.pointer)
};
BSTreeIterator.prototype.isDone = function () {
	return!this.pointer
};
BSTreeIterator.prototype.getItem = function () {
	return this.pointer.item
};
BSTreeIterator.prototype.getNode = function () {
	return this.pointer
};
BTree.prototype = new Aggregate;
BTree.prototype.constructor = BTree;
BTree.prototype.getIterator = function () {
	return new BTreeIterator(this)
};
BTree.prototype.insert = function (e, t) {
	var n = this.root;
	if (n.keys.length === 2 * this.t - 1) {
		var r = new BNode;
		r.childs.push(n);
		this.root = r;
		this.splitChild(r, 0);
		n = r
	}
	this.size++;
	this.insertNonFull(n, e, t)
};
BTree.prototype.insertNonFull = function (e, t, n) {
	while (e) {
		var r = e.keys.length - 1;
		if (!e.childs.length) {
			for (; r > -1 && t < e.keys[r]; r--) {
				e.keys[r + 1] = e.keys[r];
				e.items[r + 1] = e.items[r]
			}
			e.keys[r + 1] = t;
			e.items[r + 1] = n;
			return
		} else {
			var i = 0;
			r++;
			while (i < r) {
				var s = Math.floor((i + r) / 2);
				if (t <= e.keys[s])r = s; else i = s + 1
			}
			if (e.childs[i].keys.length === 2 * this.t - 1) {
				this.splitChild(e, i);
				if (t > e.keys[i])i++
			}
			e = e.childs[i]
		}
	}
};
BTree.prototype.search = function (e, t, n) {
	t = t || this.root;
	n = n || function (t, n) {
		return t.keys[n] === e
	};
	while (t) {
		var r = t.keys.length;
		var i = 0, s = r;
		while (i < s) {
			var o = Math.floor((i + s) / 2);
			if (e <= t.keys[o])s = o; else i = o + 1
		}
		if (i < r && n(t, i))return t.items[i]; else if (!t.childs.length)return undefined; else t = t.childs[i]
	}
};
BTree.prototype.splitChild = function (e, t) {
	var n = new BNode;
	var r = e.childs[t];
	for (var i = 0; i < this.t - 1; i++) {
		n.keys[i] = r.keys[i + this.t];
		n.items[i] = r.items[i + this.t]
	}
	if (r.childs.length)for (var s = 0; s < this.t; s++)n.childs[s] = r.childs[s + this.t];
	for (var o = e.keys.length; o > t; o--)e.childs[o + 1] = e.childs[o];
	e.childs[t + 1] = n;
	for (var u = e.keys.length - 1; u > t - 1; u--) {
		e.keys[u + 1] = e.keys[u];
		e.items[u + 1] = e.items[u]
	}
	e.keys[t] = r.keys[this.t - 1];
	e.items[t] = r.items[this.t - 1];
	r.keys.splice(r.keys.length - this.t);
	r.items.splice(r.items.length - this.t);
	r.childs.splice(r.childs.length - this.t)
};
BTree.prototype.deleteKey = function (e) {
	if (this.root.keys.length) {
		this.deleteNonMin(this.root, e);
		if (!this.root.keys.length && this.root.childs.length)this.root = this.root.childs[0];
		this.size--
	}
};
BTree.prototype.deleteNonMin = function (e, t) {
	var n = 0, r = e.keys.length;
	while (n < r) {
		var i = Math.floor((n + r) / 2);
		if (t <= e.keys[i])r = i; else n = i + 1
	}
	if (n < e.keys.length && t === e.keys[n]) {
		if (!e.childs.length) {
			for (r = n + 1; r < e.keys.length; r++) {
				e.keys[r - 1] = e.keys[r];
				e.items[r - 1] = e.items[r]
			}
			e.keys.pop();
			e.items.pop()
		} else {
			if (e.childs[n].length === this.t - 1) {
				this.augmentChild(e, n);
				if (n === e.keys.length + 1)n--
			}
			if (e.keys[n] !== t)this.deleteNonMin(e.childs[n], t); else this.deleteMax(e, n)
		}
	} else {
		if (e.childs[n].keys.length === this.t - 1) {
			this.augmentChild(e, n);
			if (n === e.keys.length + 2)n--
		}
		this.deleteNonMin(e.childs[n], t)
	}
};
BTree.prototype.deleteMax = function (e, t) {
	var n = e.childs[t];
	var r = true;
	while (r) {
		if (!n.childs.length) {
			e.keys[t] = n.keys[n.keys.length - 1];
			e.items[t] = n.items[n.items.length - 1];
			n.keys.pop();
			n.items.pop();
			r = false
		} else {
			var i = n.childs[n.keys.length];
			if (i.keys.length === this.t - 1)this.augmentChild(n, n.keys.length);
			n = n.childs[n.keys.length]
		}
	}
};
BTree.prototype.augmentChild = function (e, t) {
	var n = e.childs[t];
	var r;
	if (t)r = e.childs[t - 1];
	if (t && r.keys.length > this.t - 1) {
		if (n.childs.length) {
			for (var i = this.keys.length + 1; i > 0; i--)n.childs[i] = n.childs[i - 1];
			n.childs[0] = r.childs[r.keys.length];
			for (var s = n.keys.length; s > 0; s--) {
				n.keys[s] = n.keys[s - 1];
				n.items[s] = n.items[s - 1]
			}
			n.keys[0] = e.keys[t - 1];
			n.items[0] = e.items[t - 1];
			e.keys[t - 1] = r.keys[r.keys.length - 1];
			e.items[t - 1] = r.items[r.items.length - 1]
		}
	} else {
		if (t < e.keys.length)r = e.childs[t + 1];
		if (t < e.keys.length && r.keys.length > this.t - 1) {
			if (r.childs.length) {
				n.childs[n.keys.length + 1] = r.childs[0];
				for (var o = 1; o < r.keys.length + 1; o++)r.childs[o - 1] = r.childs[o];
				r.childs.pop()
			}
			n.keys[n.keys.length] = e.keys[t];
			n.items[n.items.length] = e.items[t];
			e.keys[t] = r.keys[0];
			e.items[t] = r.items[0];
			for (var u = 1; u < r.keys.length; u++) {
				r.keys[u - 1] = r.keys[u];
				r.items[u - 1] = r.items[u]
			}
			r.keys.pop();
			r.items.pop()
		} else {
			if (t < e.keys.length) {
				n.keys[this.t - 1] = e.keys[t];
				n.items[this.t - 1] = e.items[t];
				for (var a = t + 2; a < e.keys.length + 1; a++)e.childs[a - 1] = e.childs[a];
				e.childs.pop();
				for (var f = t + 1; f < e.keys.length; f++) {
					e.keys[f - 1] = e.keys[f];
					e.items[f - 1] = e.items[f]
				}
				e.keys.pop();
				e.items.pop();
				if (r.childs.length)for (var l = 0; l < r.keys.length + 1; l++)n.childs[this.t + l] = r.childs[l];
				for (var c = 0; c < r.keys.length; c++) {
					n.keys[c + this.t] = r.keys[c];
					n.items[c + this.t] = r.items[c]
				}
			} else {
				if (r.childs.length)for (var h = 0; h < n.keys.length + 1; h++)r.childs[this.t + h] = n.childs[h];
				r.keys[this.t - 1] = e.keys[e.keys.length - 1];
				r.items[this.t - 1] = e.items[e.keys.length - 1];
				for (var p = 0; p < n.keys.length; p++) {
					r.keys[p + this.t] = n.keys[p];
					r.items[p + this.t] = n.items[p]
				}
			}
		}
	}
};
BTree.prototype.contains = function (e, t) {
	return this.search(e, null, t) !== undefined
};
BTree.prototype.fullContains = function (e) {
	var t = this.minimumKey();
	while (t !== null && !e(this.search(t)))t = this.successor(t);
	return t !== null
};
BTree.prototype.successor = function (e, t) {
	t = t || this.root;
	var n = 0, r = t.keys.length;
	while (n < r) {
		var i = Math.floor((n + r) / 2);
		if (e <= t.keys[i])r = i; else n = i + 1
	}
	if (t.keys[n] === e)n++;
	if (!t.childs.length) {
		if (n > t.keys.length - 1)return null; else return t.keys[n]
	}
	var s = this.successor(e, t.childs[n]);
	if (s === null && n < t.keys.length)return t.keys[n];
	return s
};
BTree.prototype.predecessor = function (e, t) {
	t = t || this.root;
	var n = 0, r = t.keys.length;
	while (n < r) {
		var i = Math.floor((n + r) / 2);
		if (e <= t.keys[i])r = i; else n = i + 1
	}
	n--;
	if (!t.childs.length) {
		if (n < 0)return null; else return t.keys[n]
	}
	var s = this.predecessor(e, t.childs[n + 1]);
	if (s === null && e > t.keys[0]) {
		return t.keys[n]
	}
	return s
};
BTree.prototype.minimumKey = function () {
	var e = this.root;
	while (e.childs.length)e = e.childs[0];
	if (e)return e.keys[0];
	return null
};
BTree.prototype.maximumKey = function () {
	var e = this.root;
	while (e.childs.length)e = e.childs[e.childs.length - 1];
	if (e)return e.keys[e.keys.length - 1];
	return null
};
BTree.prototype.minimum = function () {
	var e = this.root;
	while (e.childs.length)e = e.childs[0];
	return e.items[0]
};
BTree.prototype.maximum = function () {
	var e = this.root;
	while (e.childs.length)e = e.childs[e.childs.length - 1];
	return e.items[e.items.length - 1]
};
BTree.prototype.getSize = function () {
	return this.size
};
BTree.prototype.isEmpty = function () {
	return!this.size
};
BTree.prototype.execute = function (e) {
	var t = arguments[1] || this.root;
	for (var n = 0; n < t.items.length; n++)t.items[n] = e(t.items[n]);
	for (var r = 0; r < t.childs.length; r++)this.execute(e, t.childs[r])
};
BTree.prototype.clear = function () {
	this.root = null;
	this.size = 0
};
BTree.prototype.filter = function (e) {
	var t = [];
	var n = arguments[1] || this.root;
	for (var r = 0; r < n.items.length; r++) {
		if (n.childs.length)t = t.concat(this.filter(e, n.childs[r]));
		if (e(n.items[r]))t.push(n.items[r])
	}
	if (n.childs.length)t = t.concat(this.filter(e, n.childs[n.childs.length - 1]));
	return t
};
BTree.prototype.clone = function () {
	var e = new BTree(this.t);
	var t = this.getIterator();
	for (t.first(); !t.isDone(); t.next()) {
		var n = t.getItem();
		if (n.clone)n = n.clone();
		e.insert(t.getKey(), n)
	}
	return e
};
BTree.prototype.cloneDistinct = function () {
	var e = new BTree(this.t);
	var t = this.getIterator();
	for (t.first(); !t.isDone(); t.next()) {
		var n = function (e) {
			return e === t.getItem()
		};
		if (!e.fullContains(n)) {
			if (t.getItem().cloneDistinct)e.insert(t.getKey(), t.getItem().cloneDistinct()); else if (t.getItem().clone)e.insert(t.getKey(), t.getItem().clone()); else e.insert(t.getKey(), t.getItem())
		}
	}
	return e
};
BTree.prototype.toArray = function () {
	var e = [];
	var t = this.getIterator();
	for (t.first(); !t.isDone(); t.next())e.push(t.getItem());
	return e
};
BTree.prototype.indexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0, r = this.minimumKey();
	while (r !== null) {
		if (t(this.search(r)))return n;
		r = this.successor(r);
		n++
	}
	return-1
};
BTree.prototype.lastIndexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = this.size - 1, r = this.maximumKey();
	while (r !== null) {
		if (t(this.search(r)))return n;
		n--;
		r = this.predecessor(r)
	}
	return-1
};
BTree.prototype.allIndexesOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0, r = this.minimumKey();
	var i = [];
	while (r !== null) {
		if (t(this.search(r)))i.push(n);
		n++;
		r = this.successor(r)
	}
	return i
};
BTree.prototype.getItem = function (e) {
	if (e < 0 || e > this.size - 1)return undefined;
	var t = this.minimum();
	for (var n = 0; n < e; n++)t = this.successor(t);
	return this.search(t)
};
BTreeIterator.prototype = new Iterator;
BTreeIterator.prototype.constructor = BTreeIterator;
BTreeIterator.prototype.first = function () {
	this.pointer = this.aggregate.minimumKey()
};
BTreeIterator.prototype.next = function () {
	this.pointer = this.aggregate.successor(this.pointer)
};
BTreeIterator.prototype.last = function () {
	this.pointer = this.aggregate.maximumKey()
};
BTreeIterator.prototype.previous = function () {
	this.pointer = this.aggregate.predecessor(this.pointer)
};
BTreeIterator.prototype.isDone = function () {
	return this.pointer === null
};
BTreeIterator.prototype.getItem = function () {
	return this.aggregate.search(this.pointer)
};
BTreeIterator.prototype.getKey = function () {
	return this.pointer
};
CircularBufferIterator.prototype = new Iterator;
CircularBufferIterator.prototype.constructor = CircularBufferIterator;
CircularBufferIterator.prototype.first = function () {
	this.pointer = this.aggregate.tail;
	this.start = true
};
CircularBufferIterator.prototype.next = function () {
	this.pointer = (this.pointer + 1) % this.aggregate.size;
	this.start = false
};
CircularBufferIterator.prototype.last = function () {
	this.pointer = (this.aggregate.head - 1) % this.aggregate.size;
	this.start = true
};
CircularBufferIterator.prototype.previous = function () {
	this.pointer = (this.pointer - 1) % this.aggregate.size;
	this.start = false
};
CircularBufferIterator.prototype.isDone = function () {
	return this.pointer === this.aggregate.head && !this.start || (this.pointer === this.aggregate.tail - 1) % this.aggregate.size || this.aggregate.isEmpty()
};
CircularBufferIterator.prototype.getItem = function () {
	return this.aggregate.read(this.pointer)
};
CircularBuffer.prototype = new Aggregate;
CircularBuffer.prototype.constructor = CircularBuffer;
CircularBuffer.prototype.getIterator = function () {
	return new CircularBufferIterator(this)
};
CircularBuffer.prototype.write = function (e) {
	this.empty = false;
	if (this.full)this.tail = (this.tail + 1) % this.size;
	this.items[this.head] = e;
	this.head = (this.head + 1) % this.size;
	if (this.tail === this.head)this.full = true
};
CircularBuffer.prototype.free = function (e, t) {
	if (e < 0)e = 0;
	if (e > this.size - 1)e = this.size - 1;
	if (t < 0)t = 0;
	if (t > this.size - 1)t = this.size - 1;
	for (var n = e; n < t; n = (n + 1) % this.size)delete this.items[n];
	if (this.tail > e - 1 || this.tail < t)if (this.tail < this.head) {
		this.tail = (e - 1) % this.size
	} else {
		this.tail = t
	}
	if (this.head > e || this.head < t)if (this.tail < this.head) {
		this.head = t
	} else {
		this.head = e
	}
	if (e !== t)this.full = false;
	for (var r = 0; r < this.size; r++)if (this.items[r] !== undefined) {
		this.empty = false;
		return
	}
	this.empty = true
};
CircularBuffer.prototype.freeAll = function () {
	for (var e = 0; e < this.size; e++)delete this.items[e];
	this.empty = true;
	this.head = 0;
	this.tail = 0
};
CircularBuffer.prototype.read = function (e) {
	return this.items[e % this.size]
};
CircularBuffer.prototype.isEmpty = function () {
	return this.empty
};
CircularBuffer.prototype.isFull = function () {
	return this.full
};
CircularBuffer.prototype.clone = function () {
	var e = new CircularBuffer(this.size);
	e.head = this.head;
	e.tail = this.tail;
	for (var t = 0; t < this.items.length; t++)e.items[t] = this.items[t];
	e.empty = this.empty;
	e.full = this.full;
	return e
};
CircularBuffer.prototype.resize = function (e) {
	if (this.size < e) {
		if (this.head < this.tail + 1) {
			for (var t = 0; t < this.head; t++) {
				this.items[(t + this.size) % e] = this.items[t];
				delete this.items[t]
			}
			this.head = (this.head + this.size) % e
		}
	} else if (this.size > e) {
		if (this.head < this.tail + 1) {
			var n = e;
			if (this.tail > e - 1) {
				n = this.tail;
				this.tail = 0
			}
			var r = this.size - n;
			for (var i = this.head - r - 1; i > n - 1 || i < this.head - r; i--) {
				this.items[(i + r) % this.size] = this.items[i];
				if (!i)i = this.size
			}
			this.head = (this.head + r) % this.size
		}
	}
	this.size = e
};
DoubleLinkedList.prototype = new Aggregate;
DoubleLinkedList.prototype.constructor = DoubleLinkedList;
DoubleLinkedList.prototype.getIterator = function () {
	return new DoubleLinkedListIterator(this)
};
DoubleLinkedList.prototype.pushFront = function (e) {
	var t = new DLLNode(e);
	t.next = this.first;
	this.first = t;
	if (t.next)t.next.previous = t; else this.last = t;
	this.length++
};
DoubleLinkedList.prototype.pushBack = function (e) {
	var t = new DLLNode(e);
	t.previous = this.last;
	this.last = t;
	if (t.previous)t.previous.next = t; else this.first = t;
	this.length++
};
DoubleLinkedList.prototype.popFront = function () {
	if (this.length) {
		var e = this.first;
		this.first = e.next;
		if (e.next)e.next.previous = null;
		this.length--;
		e.next = null;
		return e.item
	}
	return undefined
};
DoubleLinkedList.prototype.popBack = function () {
	if (this.length) {
		var e = this.last;
		this.last = e.previous;
		if (e.previous)e.previous.next = null;
		this.length--;
		e.previous = null;
		return e.item
	}
	return undefined
};
DoubleLinkedList.prototype.multiPopFront = function (e) {
	var t = [];
	for (var n = 0; n < e && this.length; n++)t.push(this.popFront());
	return t
};
DoubleLinkedList.prototype.multiPopBack = function (e) {
	var t = [];
	for (var n = 0; n < e && this.length; n++)t.push(this.popBack());
	return t
};
DoubleLinkedList.prototype.peek = function () {
	if (!this.length)return undefined;
	return this.first.item
};
DoubleLinkedList.prototype.addAt = function (e, t) {
	if (t < -1)return;
	if (!t) {
		this.pushFront(e);
		return
	}
	if (t === this.length) {
		this.pushBack(e);
		return
	}
	var n = this.first;
	if (!n && t > 0)this.pushBack(undefined);
	for (var r = 0; r < t - 1; r++, n = n.next) {
		if (n === this.last)this.pushBack(undefined)
	}
	if (n === this.last)this.pushBack(e); else if (n === this.first)this.pushFront(e); else {
		var i = new DLLNode(e);
		i.next = n.next;
		i.previous = n;
		n.next = i;
		if (i.next)i.next.previous = i;
		this.length++
	}
};
DoubleLinkedList.prototype.removeAt = function (e) {
	if (e < 0 || e > this.length - 1)return undefined;
	if (e === 0)return this.popFront();
	if (e === this.length - 1)return this.popBack();
	var t = this.first;
	for (; e > 0; e--)t = t.next;
	t.previous.next = t.next;
	t.next.previous = t.previous;
	t.next = null;
	t.previous = null;
	this.length--;
	return t.item
};
DoubleLinkedList.prototype.remove = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = this.first;
	var r = null;
	while (n) {
		if (t(n.item)) {
			if (n === this.first)this.first = n.next;
			if (n === this.last)this.last = r;
			if (r) {
				r.next = n.next;
				if (n.next)n.next.previous = r
			}
			return
		}
		r = n;
		n = n.next
	}
};
DoubleLinkedList.prototype.removeAll = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = this.first;
	var r = null;
	while (n) {
		if (t(n.item)) {
			if (n === this.first)this.first = n.next;
			if (n === this.last)this.last = r;
			if (r) {
				r.next = n.next;
				if (n.next)n.next.previous = r
			}
		} else r = n;
		n = n.next
	}
};
DoubleLinkedList.prototype.removeSegment = function (e, t) {
	var n = [];
	if (t > -1 && e < this.length) {
		if (e === 0)return this.multiPopFront(t + 1);
		if (t === this.length - 1 || e > t)return this.multiPopBack(Math.max(t - e, this.length - e)).reverse();
		var r = this.first;
		for (var i = 0; i < e - 1; i++)r = r.next;
		var s = r.next;
		for (var o = e; o < t + 1 && o < this.length; o++) {
			n.push(s.item);
			s = s.next
		}
		this.length -= Math.min(t - e + 1, this.length - e);
		r.next = s;
		s.previous = r
	}
	return n
};
DoubleLinkedList.prototype.modifyAt = function (e, t) {
	var n = this.getNode(e);
	if (n)n.item = t
};
DoubleLinkedList.prototype.clear = function () {
	this.first = null;
	this.last = null;
	this.length = 0
};
DoubleLinkedList.prototype.contains = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0;
	var r = this.first;
	while (n < this.length && !t(r.item)) {
		n++;
		r = r.next
	}
	return n < this.length
};
DoubleLinkedList.prototype.execute = function (e) {
	var t = this.first;
	while (t) {
		t.item = e(t.item);
		t = t.next
	}
};
DoubleLinkedList.prototype.deleteNode = function (e) {
	if (e === this.first) {
		this.popFront();
		return
	}
	if (e === this.last) {
		this.popBack();
		return
	}
	e.previous.next = e.next;
	e.next.previous = e.previous;
	this.length--
};
DoubleLinkedList.prototype.getNode = function (e, t) {
	if (e < 0 || e > this.length - 1)return undefined;
	var n = Math.floor(this.length / 2);
	if (e < n || t) {
		t = t || this.first;
		for (; e > 0; e--)t = t.next
	} else for (e = this.length - e - 1, t = this.last; e > 0; e--)t = t.previous;
	return t
};
DoubleLinkedList.prototype.getItem = function (e) {
	if (e < 0 || e > this.length - 1)return undefined;
	var t;
	var n = Math.floor(this.length / 2);
	if (e < n)for (t = this.first; e > 0; e--)t = t.next; else for (e = this.length - e - 1, t = this.last; e > 0; e--)t = t.previous;
	return t.item
};
DoubleLinkedList.prototype.parallelSort = function () {
	function n(r, i, s) {
		if (r < i) {
			var o = Math.floor((r + i) / 2);
			var u = new Worker("DoubleLinkedList/WorkerSort.js");
			var a = new Worker("DoubleLinkedList/WorkerSort.js");
			e.push(u);
			e.push(a);
			var f = e.length;
			u.postMessage({cmd: "start", from: r, to: o, worker: s});
			a.postMessage({cmd: "start", from: o + 1, to: i, worker: s});
			n(r, o, f - 2);
			n(o + 1, i, f - 1);
			u.onmessage = function (n) {
				var r = n.data;
				switch (r.cmd) {
					case"finished":
						e[r.worker].postMessage({cmd: "finished", array: t});
						break;
					case"replace":
						t[r.index] = r.value;
						break
				}
			};
			a.onmessage = function (n) {
				var r = n.data;
				switch (r.cmd) {
					case"finished":
						e[r.worker].postMessage({cmd: "finished", array: t});
						break;
					case"replace":
						t[r.index] = r.value;
						break
				}
			}
		}
	}

	var e = [];
	var t = this.toArray();
	console.log(t);
	var r = this;
	var i = new Worker("DoubleLinkedList/WorkerSort.js");
	e.push(i);
	i.postMessage({cmd: "start", from: 0, to: this.length - 1, worker: -1, array: t});
	i.onmessage = function (e) {
		var n = e.data;
		switch (n.cmd) {
			case"finished":
				r.fromArray(t);
				console.log(r);
				break;
			case"replace":
				t[n.index] = n.value
		}
	};
	n(0, this.length - 1, 0)
};
DoubleLinkedList.prototype.sort = function (e) {
	function n(e, i, s, o) {
		if (e < i) {
			var u = Math.floor((e + i) / 2);
			var a = t.getNode(u - e, s);
			n(e, u, s, a);
			n(u + 1, i, a.next, o);
			r(e, u, i, s)
		}
	}

	function r(t, n, r, i) {
		var s = [];
		var o = [];
		var u = i;
		for (var a = 0; a < n - t + 1; a++, u = u.next)s[a] = u.item;
		for (var f = 0; f < r - n; f++, u = u.next)o[f] = u.item;
		var l = 0, c = 0;
		for (var h = t; h < r + 1; h++, i = i.next) {
			if (c > r - n - 1 || e(s[l]) <= e(o[c]) && l < n - t + 1) {
				i.item = s[l];
				l++
			} else {
				i.item = o[c];
				c++
			}
		}
	}

	if (!e)e = function (e) {
		return e
	};
	var t = this;
	n(0, this.length - 1, this.first, this.last)
};
DoubleLinkedList.prototype.toArray = function () {
	var e = [];
	for (var t = this.first, n = 0; t; t = t.next, n++)e[n] = t.item;
	return e
};
DoubleLinkedList.prototype.getLength = function () {
	return this.length
};
DoubleLinkedList.prototype.fromArray = function (e) {
	var t = this.first;
	for (var n = 0; n < Math.min(this.length, e.length); n++, t = t.next)t.item = e[n];
	if (this.length < e.length)for (var r = this.length; r < e.length; r++)this.pushBack(e[r]); else for (var i = e.length; i < this.length;)this.popBack()
};
DoubleLinkedList.prototype.filter = function (e) {
	var t = [];
	for (var n = this.first; n; n = n.next) {
		if (e(n.item))t.push(n.item)
	}
	return t
};
DoubleLinkedList.prototype.reverse = function () {
	for (var e = this.first, t = this.last; e !== t && e.previous !== t; e = e.next, t = t.previous) {
		var n = e.item;
		e.item = t.item;
		t.item = n
	}
};
DoubleLinkedList.prototype.isEmpty = function () {
	return!this.length
};
DoubleLinkedList.prototype.indexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0;
	var r = this.first;
	while (r) {
		if (t(r.item))return n;
		n++;
		r = r.next
	}
	return-1
};
DoubleLinkedList.prototype.lastIndexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = this.length - 1;
	var r = this.last;
	while (r) {
		if (t(r.item))return n;
		n--;
		r = r.previous
	}
	return-1
};
DoubleLinkedList.prototype.allIndexesOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0;
	var r = this.first;
	var i = [];
	while (r) {
		if (t(r.item))i.push(n);
		n++;
		r = r.next
	}
	return i
};
DoubleLinkedList.prototype.join = function (e) {
	if (this.last)this.last.next = e.first; else this.first = e.first;
	if (e.first)e.first.previous = this.last;
	this.last = e.last;
	this.length += e.length
};
DoubleLinkedList.prototype.divide = function (e) {
	var t = new DoubleLinkedList;
	if (e > -1 && e < this.length) {
		var n = this.first;
		var r = null;
		for (var i = 0; i < e; i++) {
			r = n;
			n = n.next
		}
		if (n === this.first) {
			t.first = this.first;
			t.last = this.last;
			this.first = null;
			this.last = null
		} else {
			t.first = n;
			t.last = this.last;
			this.last = r;
			r.next = null;
			n.previous = null
		}
		t.length = this.length - e;
		this.length = e
	}
	return t
};
DoubleLinkedList.prototype.clone = function () {
	var e = new DoubleLinkedList;
	var t = this.first;
	for (var n = 0; n < this.length; n++, t = t.next)if (t.item.clone)e.pushBack(t.item.clone()); else e.pushBack(t.item);
	return e
};
DoubleLinkedList.prototype.cloneDistinct = function () {
	var e = new DoubleLinkedList;
	var t = this.first;
	for (var n = 0; n < this.length; n++, t = t.next)if (!e.contains(t.item))if (t.item.cloneDistinct)e.pushBack(t.item.cloneDistinct()); else if (t.item.clone)e.pushBack(t.item.clone()); else e.pushBack(t.item);
	return e
};
DoubleLinkedList.prototype.split = function (e) {
	var t = this.length;
	var n = [this];
	for (var r = e; r < t; r += e)n.push(n[n.length - 1].divide(e));
	return n
};
DoubleLinkedList.prototype.count = function (e) {
	var t = 0;
	var n = this.first;
	while (n) {
		if (e(n.item))t++;
		n = n.next
	}
	return t
};
DoubleLinkedListIterator.prototype = new Iterator;
DoubleLinkedListIterator.prototype.constructor = DoubleLinkedListIterator;
DoubleLinkedListIterator.prototype.first = function () {
	this.pointer = this.aggregate.first
};
DoubleLinkedListIterator.prototype.next = function () {
	this.pointer = this.pointer.next
};
DoubleLinkedListIterator.prototype.last = function () {
	this.pointer = this.aggregate.last
};
DoubleLinkedListIterator.prototype.previous = function () {
	this.pointer = this.pointer.previous
};
DoubleLinkedListIterator.prototype.isDone = function () {
	return!this.pointer
};
DoubleLinkedListIterator.prototype.getItem = function () {
	return this.pointer.item
};
DoubleLinkedListIterator.prototype.getNode = function () {
	return this.pointer
};
onmessage = function (e) {
	var t = e.data;
	switch (t.cmd) {
		case"start":
			this.finished = 0;
			this.from = t.from;
			this.to = t.to;
			this.worker = t.worker;
			if (this.from === this.to) {
				this.postMessage({cmd: "finished", worker: this.worker});
				close()
			}
			break;
		case"finished":
			this.finished++;
			if (this.finished > 1) {
				this.array = t.array;
				merge(this.from, this.to, this.array);
				this.postMessage({cmd: "finished", worker: this.worker});
				close()
			}
			break;
		default:
			this.postMessage("Something went wrong")
	}
};
HashTable.prototype.insert = function (e, t) {
	this.keyLength++;
	this.items[this.hash(e)].pushBack({key: e, item: t})
};
HashTable.prototype.deleteKey = function (e) {
	var t = this.items[this.hash(e)];
	var n = t.getIterator();
	for (n.first(); !n.isDone() && n.getItem().key !== e;)n.next();
	if (!n.isDone()) {
		t.deleteNode(n.getNode());
		this.keyLength--
	}
};
HashTable.prototype.deleteAllKey = function (e) {
	var t = this.items[this.hash(e)];
	var n = t.getIterator();
	var r = 0;
	for (n.first(); !n.isDone(); n.next())if (n.getItem().key === e) {
		t.deleteNode(n.getNode());
		r++
	}
	this.keyLength -= r
};
HashTable.prototype.search = function (e) {
	var t = this.items[this.hash(e)];
	var n = t.getIterator();
	for (n.first(); !n.isDone(); n.next())if (n.getItem().key === e)return n.getItem().item;
	return undefined
};
HashTable.prototype.containsKey = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = this.items[this.hash(e)];
	var r = n.getIterator();
	for (r.first(); !r.isDone(); r.next())if (t(r.getItem().key))return true;
	return false
};
HashTable.prototype.searchAll = function (e) {
	var t = this.items[this.hash(e)];
	var n = t.getIterator();
	var r = [];
	for (n.first(); !n.isDone(); n.next())if (n.getItem().key === e)r.push(n.getItem().item);
	return r
};
HashTable.prototype.getKeys = function () {
	var e = [];
	for (var t = 0; t < this.size; t++) {
		var n = this.items[t].getIterator();
		for (n.first(); !n.isDone(); n.next())e.push(n.getItem().key)
	}
	return e
};
HashTable.prototype.getItems = function () {
	var e = [];
	for (var t = 0; t < this.size; t++) {
		var n = this.items[t].getIterator();
		for (n.first(); !n.isDone(); n.next())e.push(n.getItem().item)
	}
	return e
};
HashTable.prototype.clear = function () {
	this.items = [];
	for (var e = 0; e < this.size; e++)this.items[e] = new DoubleLinkedList;
	this.keyLength = 0
};
HashTable.prototype.getNumberOfKeys = function () {
	return this.keyLength
};
HashTable.prototype.isEmpty = function () {
	return!this.keyLength
};
HashTable.prototype.execute = function (e) {
	for (var t = 0; t < this.size; t++)this.items[t].execute(e)
};
HashTable.prototype.filter = function (e) {
	var t = [];
	for (var n = 0; n < this.size; n++)t.concat(this.items[n].filter(e));
	return t
};
HashTable.prototype.getSize = function () {
	return this.size
};
HashTable.prototype.clone = function () {
	var e = new HashTable(this.size);
	for (var t = 0; t < this.size; t++)for (var n = this.items[t].first; n; n = n.next)e.insert(n.key, n.item);
	return e
};
LinkedList.prototype = new Aggregate;
LinkedList.prototype.constructor = LinkedList;
LinkedList.prototype.getIterator = function () {
	return new LinkedListIterator(this)
};
LinkedList.prototype.pushFront = function (e) {
	var t = new LLNode(e);
	t.next = this.first;
	this.first = t;
	if (!this.last)this.last = t;
	this.length++
};
LinkedList.prototype.pushBack = function (e) {
	var t = new LLNode(e);
	if (this.last)this.last.next = t; else this.first = t;
	this.last = t;
	this.length++
};
LinkedList.prototype.popFront = function () {
	if (this.length) {
		var e = this.first;
		this.first = this.first.next;
		this.length--;
		e.next = null;
		return e.item
	}
	return undefined
};
LinkedList.prototype.popBack = function () {
	if (this.length) {
		var e = this.last;
		var t = this.first;
		while (t.next && t.next.next) {
			t = t.next
		}
		if (e === t)this.last = null; else this.last = t;
		t.next = null;
		this.length--;
		return e.item
	}
	return undefined
};
LinkedList.prototype.multiPopFront = function (e) {
	var t = [];
	for (var n = 0; n < e && this.length; n++)t.push(this.popFront());
	return t
};
LinkedList.prototype.multiPopBack = function (e) {
	var t = [];
	for (var n = 0; n < e && this.length; n++)t.push(this.popBack());
	return t
};
LinkedList.prototype.peek = function () {
	if (!this.length)return undefined;
	return this.first.item
};
LinkedList.prototype.addAt = function (e, t) {
	if (t < -1)return;
	if (!t) {
		this.pushFront(e);
		return
	}
	if (t === this.length) {
		this.pushBack(e);
		return
	}
	var n = this.first;
	if (!n && t > 0)this.pushBack(undefined);
	for (var r = 0; r < t - 1; r++, n = n.next) {
		if (n === this.last)this.pushBack(undefined)
	}
	if (n === this.last)this.pushBack(e); else if (n === this.first)this.pushFront(e); else {
		var i = new LLNode(e);
		i.next = n.next;
		n.next = i;
		this.length++
	}
};
LinkedList.prototype.removeAt = function (e) {
	if (e < 0 || e > this.length - 1)return undefined;
	if (e === 0)return this.popFront();
	if (e === this.length - 1)return this.popBack();
	var t = this.first;
	for (; e > 1; e--)t = t.next;
	var n = t.next;
	t.next = n.next;
	this.length--;
	return n.item
};
LinkedList.prototype.remove = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = this.first;
	var r = null;
	while (n) {
		if (t(n.item)) {
			if (n === this.first)this.first = n.next;
			if (n === this.last)this.last = r;
			if (r)r.next = n.next;
			return
		}
		r = n;
		n = n.next
	}
};
LinkedList.prototype.removeAll = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = this.first;
	var r = null;
	while (n) {
		if (t(n.item)) {
			if (n === this.first)this.first = n.next;
			if (n === this.last)this.last = r;
			if (r)r.next = n.next
		} else r = n;
		n = n.next
	}
};
LinkedList.prototype.removeSegment = function (e, t) {
	var n = [];
	if (t > -1 && e < this.length) {
		if (e === 0)return this.multiPopFront(t + 1);
		if (t === this.length - 1 || e > t)return this.multiPopBack(Math.max(t - e, this.length - e)).reverse();
		var r = this.first;
		for (var i = 0; i < e - 1; i++)r = r.next;
		var s = r.next;
		for (var o = e; o < t + 1 && o < this.length; o++) {
			n.push(s.item);
			s = s.next
		}
		this.length -= Math.min(t - e + 1, this.length - e);
		r.next = s
	}
	return n
};
LinkedList.prototype.modifyAt = function (e, t) {
	var n = this.getNode(e);
	if (n)n.item = t
};
LinkedList.prototype.clear = function () {
	this.first = null;
	this.last = null;
	this.length = 0
};
LinkedList.prototype.contains = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0;
	var r = this.first;
	while (n < this.length && !t(r.item)) {
		n++;
		r = r.next
	}
	return n < this.length
};
LinkedList.prototype.execute = function (e) {
	var t = this.first;
	while (t) {
		t.item = e(t.item);
		t = t.next
	}
};
LinkedList.prototype.getNode = function (e) {
	if (e < 0 || e > this.length - 1)return undefined;
	var t = this.first;
	for (; e > 0; e--)t = t.next;
	return t
};
LinkedList.prototype.getItem = function (e) {
	if (e < 0 || e > this.length - 1)return undefined;
	var t = this.first;
	for (; e > 0; e--)t = t.next;
	return t.item
};
LinkedList.prototype.toArray = function () {
	var e = [];
	for (var t = this.first, n = 0; t; t = t.next, n++)e[n] = t.item;
	return e
};
LinkedList.prototype.getLength = function () {
	return this.length
};
LinkedList.prototype.fromArray = function (e) {
	var t = this.first;
	for (var n = 0; n < Math.min(this.length, e.length); n++, t = t.next)t.item = e[n];
	if (this.length < e.length)for (var r = this.length; r < e.length; r++)this.pushBack(e[r]); else for (var i = e.length; i < this.length;)this.popBack()
};
LinkedList.prototype.filter = function (e) {
	var t = [];
	for (var n = this.first; n; n = n.next) {
		if (e(n.item))t.push(n.item)
	}
	return t
};
LinkedList.prototype.isEmpty = function () {
	return!this.length
};
LinkedList.prototype.indexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0;
	var r = this.first;
	while (r) {
		if (t(r.item))return n;
		n++;
		r = r.next
	}
	return-1
};
LinkedList.prototype.lastIndexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0;
	var r = this.first;
	var i = -1;
	while (r) {
		if (t(r.item))i = n;
		n++;
		r = r.next
	}
	return i
};
LinkedList.prototype.allIndexesOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0;
	var r = this.first;
	var i = [];
	while (r) {
		if (t(r.item))i.push(n);
		n++;
		r = r.next
	}
	return i
};
LinkedList.prototype.join = function (e) {
	if (this.last)this.last.next = e.first; else this.first = e.first;
	this.last = e.last;
	this.length += e.length
};
LinkedList.prototype.divide = function (e) {
	var t = new LinkedList;
	if (e > -1 && e < this.length) {
		var n = this.first;
		var r = null;
		for (var i = 0; i < e; i++) {
			r = n;
			n = n.next
		}
		if (n === this.first) {
			t.first = this.first;
			t.last = this.last;
			this.first = null;
			this.last = null
		} else {
			t.first = n;
			t.last = this.last;
			this.last = r;
			r.next = null
		}
		t.length = this.length - e;
		this.length = e
	}
	return t
};
LinkedList.prototype.clone = function () {
	var e = new LinkedList;
	var t = this.first;
	for (var n = 0; n < this.length; n++, t = t.next)if (t.item.clone)e.pushBack(t.item.clone()); else e.pushBack(t.item);
	return e
};
LinkedList.prototype.cloneDistinct = function () {
	var e = new LinkedList;
	var t = this.first;
	for (var n = 0; n < this.length; n++, t = t.next)if (!e.contains(t.item))if (t.item.cloneDistinct)e.pushBack(t.item.cloneDistinct()); else if (t.item.clone)e.pushBack(t.item.clone()); else e.pushBack(t.item);
	return e
};
LinkedList.prototype.split = function (e) {
	var t = this.length;
	var n = [this];
	for (var r = e; r < t; r += e)n.push(n[n.length - 1].divide(e));
	return n
};
LinkedList.prototype.count = function (e) {
	var t = 0;
	var n = this.first;
	while (n) {
		if (e(n.item))t++;
		n = n.next
	}
	return t
};
LinkedListIterator.prototype = new Iterator;
LinkedListIterator.prototype.constructor = LinkedListIterator;
LinkedListIterator.prototype.first = function () {
	this.pointer = this.aggregate.first
};
LinkedListIterator.prototype.next = function () {
	this.pointer = this.pointer.next
};
LinkedListIterator.prototype.last = function () {
	this.pointer = this.aggregate.last
};
LinkedListIterator.prototype.previous = function () {
	var e = this.pointer;
	for (this.pointer = this.first(); this.pointer.next !== e;)this.next()
};
LinkedListIterator.prototype.isDone = function () {
	return!this.pointer
};
LinkedListIterator.prototype.getItem = function () {
	return this.pointer.item
};
LinkedListIterator.prototype.getNode = function () {
	return this.pointer
};
PriorityQueue.prototype = new Aggregate;
PriorityQueue.prototype.constructor = PriorityQueue;
PriorityQueue.prototype.getIterator = function () {
	return new PriorityQueueIterator(this)
};
PriorityQueue.prototype.enqueue = function (e, t) {
	var n = this.items.search(e);
	if (!n) {
		n = new Queue;
		this.items.insert(e, n)
	}
	n.enqueue(t);
	this.length++
};
PriorityQueue.prototype.multiEnqueue = function (e, t) {
	for (var n = 0; n < t.length; n++)this.enqueue(e, t[n])
};
PriorityQueue.prototype.dequeue = function () {
	var e = this.items.maximum();
	var t = undefined;
	if (e) {
		var n = e.item;
		t = n.dequeue();
		if (n.isEmpty())this.items.deleteNode(e);
		this.length--
	}
	return t
};
PriorityQueue.prototype.multiDequeue = function (e) {
	var t = [];
	for (var n = 0; n < e && this.length; n++)t.push(this.dequeue());
	return t
};
PriorityQueue.prototype.remove = function (e, t) {
	t = t || 1;
	var n = this.items.getIterator();
	for (n.last(); !n.isDone() && t > 0; n.previous()) {
		var r = n.getItem();
		if (e > -1 && e < r.getLength()) {
			var i = r.getLength();
			r.remove(e, t);
			t -= i - e;
			e = 0;
			if (!r.getLength())this.items.deleteNode(n.getNode())
		} else e = e - r.getLength()
	}
};
PriorityQueue.prototype.getItem = function (e) {
	var t = this.items.getIterator();
	for (t.last(); !t.isDone(); t.previous()) {
		var n = t.getItem();
		if (e > -1 && e < n.getLength())return n.getItem(e);
		e = e - n.getLength()
	}
	return undefined
};
PriorityQueue.prototype.getItems = function (e) {
	var t = this.items.search(e);
	if (t)return t.items;
	return[]
};
PriorityQueue.prototype.peek = function () {
	return this.items.maximum().item.peek()
};
PriorityQueue.prototype.getLength = function () {
	return this.length
};
PriorityQueue.prototype.isEmpty = function () {
	return!this.length
};
PriorityQueue.prototype.clear = function () {
	this.items = new RBTreeList;
	this.length = 0
};
PriorityQueue.prototype.containsPriority = function (e, t) {
	if (t)return this.items.fullContains(t); else return this.items.contains(e)
};
PriorityQueue.prototype.toQueue = function () {
	var e = new Queue;
	var t = this.items.getIterator();
	for (t.last(); !t.isDone(); t.previous()) {
		var n = t.getItem();
		var r = n.getIterator();
		for (r.first(); !r.isDone(); r.next())e.enqueue(r.getItem())
	}
	return e
};
PriorityQueue.prototype.execute = function (e) {
	var t = this.items.getIterator();
	for (t.last(); !t.isDone(); t.previous())t.getItem().execute(e)
};
PriorityQueue.prototype.changePriority = function (e, t) {
	var n = this.getItem(e);
	this.remove(e);
	this.enqueue(t, n)
};
PriorityQueue.prototype.filter = function (e) {
	var t = [];
	var n = this.items.getIterator();
	for (n.last(); !n.isDone(); n.previous()) {
		var r = n.getItem().getIterator();
		for (r.first(); !r.isDone(); r.next()) {
			if (e(r.getItem()))t.push(r.getItem())
		}
	}
	return t
};
PriorityQueue.prototype.clone = function () {
	var e = new PriorityQueue;
	e.items = this.items.clone();
	e.length = this.length;
	return e
};
PriorityQueue.prototype.cloneDistinct = function () {
	var e = new PriorityQueue;
	e.items = this.items.cloneDistinct();
	e.length = e.items.getSize();
	return e
};
PriorityQueueIterator.prototype = new Iterator;
PriorityQueueIterator.prototype.constructor = PriorityQueueIterator;
PriorityQueueIterator.prototype.first = function () {
	this.pointerNode = this.aggregate.items.maximum();
	this.pointerPosition = 0
};
PriorityQueueIterator.prototype.next = function () {
	this.pointerPosition++;
	if (this.pointerPosition > this.pointerNode.item.getLength() - 1) {
		this.pointerNode = this.pointerNode.previous;
		this.pointerPosition = 0
	}
};
PriorityQueueIterator.prototype.last = function () {
	this.pointerNode = this.aggregate.items.minimum();
	this.pointerPosition = this.pointerNode.item.getLength() - 1
};
PriorityQueueIterator.prototype.previous = function () {
	this.pointerPosition--;
	if (this.pointerPosition < 0) {
		this.pointerNode = this.pointerNode.next;
		if (this.pointerNode)this.pointerPosition = this.pointerNode.item.getLength() - 1
	}
};
PriorityQueueIterator.prototype.isDone = function () {
	return!this.pointerNode
};
PriorityQueueIterator.prototype.getItem = function () {
	return this.pointerNode.item.items[this.pointerPosition]
};
Queue.prototype = new Aggregate;
Queue.prototype.constructor = Queue;
Queue.prototype.getIterator = function () {
	return new QueueIterator(this)
};
Queue.prototype.enqueue = function (e) {
	this.items.push(e)
};
Queue.prototype.multiEnqueue = function (e) {
	for (var t = 0; t < e.length; t++)this.items.push(e[t])
};
Queue.prototype.dequeue = function () {
	if (!this.items.length)return undefined;
	return this.items.splice(0, 1)[0]
};
Queue.prototype.multiDequeue = function (e) {
	return this.items.splice(0, e)
};
Queue.prototype.remove = function (e, t) {
	t = t || 1;
	this.items.splice(e, t)
};
Queue.prototype.getItem = function (e) {
	if (e < 0 || e > this.items.length - 1)return undefined;
	return this.items[e]
};
Queue.prototype.peek = function () {
	if (this.items.length)return this.items[0];
	return undefined
};
Queue.prototype.clear = function () {
	this.items = []
};
Queue.prototype.contains = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0;
	while (n < this.items.length && !t(this.items[n]))n++;
	return n < this.items.length
};
Queue.prototype.execute = function (e) {
	for (var t = 0; t < this.items.length; t++)this.items[t] = e(this.items[t])
};
Queue.prototype.getLength = function () {
	return this.items.length
};
Queue.prototype.isEmpty = function () {
	return!this.items.length
};
Queue.prototype.filter = function (e) {
	var t = [];
	for (var n = 0; n < this.items.length; n++)if (e(this.items[n]))t.push(this.items[n]);
	return t
};
Queue.prototype.indexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0;
	while (n < this.items.length) {
		if (t(this.items[n]))return n;
		n++
	}
	return-1
};
Queue.prototype.lastIndexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = this.items.length - 1;
	while (n > -1) {
		if (t(this.items[n]))return n;
		n--
	}
	return-1
};
Queue.prototype.allIndexesOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0;
	var r = [];
	while (n < this.items.length) {
		if (t(this.items[n]))r.push(n);
		n++
	}
	return r
};
Queue.prototype.clone = function () {
	var e = new Queue;
	for (var t = 0; t < this.items.length; t++)if (this.items[t].clone)e.enqueue(this.items[t].clone()); else e.enqueue(this.items[t]);
	return e
};
Queue.prototype.cloneDistinct = function () {
	var e = new Queue;
	for (var t = 0; t < this.items.length; t++)if (!e.contains(this.items[t]))if (this.items[t].cloneDistinct)e.enqueue(this.items[t].cloneDistinct()); else if (this.items[t].clone)e.enqueue(this.items[t].clone()); else e.enqueue(this.items[t]);
	return e
};
QueueIterator.prototype = new Iterator;
QueueIterator.prototype.constructor = QueueIterator;
QueueIterator.prototype.first = function () {
	this.pointer = 0
};
QueueIterator.prototype.next = function () {
	this.pointer++
};
QueueIterator.prototype.last = function () {
	this.pointer = this.aggregate.items.length - 1
};
QueueIterator.prototype.previous = function () {
	this.pointer--
};
QueueIterator.prototype.isDone = function () {
	return this.pointer < 0 || this.pointer > this.aggregate.items.length - 1
};
QueueIterator.prototype.getItem = function () {
	return this.aggregate.getItem(this.pointer)
};
RBTree.prototype = new Aggregate;
RBTree.prototype.constructor = RBTree;
RBTree.prototype.getIterator = function () {
	return new RBTreeIterator(this)
};
RBTree.prototype.insert = function (e, t) {
	var n = new RBNode(e, t);
	this.size++;
	if (!this.root) {
		this.root = n;
		n.type = "b";
		return
	}
	var r = this.root;
	for (var i = this.root; i;) {
		r = i;
		if (e < i.key)i = i.left; else i = i.right
	}
	n.parent = r;
	if (!r)this.root = n; else if (e < r.key)r.left = n; else r.right = n;
	this.insertFixUp(n)
};
RBTree.prototype.insertFixUp = function (e) {
	for (var t = e.parent; t && t.type === "r"; t = e.parent) {
		if (t === t.parent.left) {
			var n = t.parent.right;
			if (n && n.type === "r") {
				t.type = "b";
				n.type = "b";
				t.parent.type = "r";
				e = t.parent
			} else if (e === t.right) {
				e = t;
				this.leftRotate(e)
			} else {
				t.type = "b";
				t.parent.type = "r";
				this.rightRotate(t.parent)
			}
		} else {
			var n = t.parent.left;
			if (n && n.type === "r") {
				t.type = "b";
				n.type = "b";
				t.parent.type = "r";
				e = t.parent
			} else if (e === t.left) {
				e = t;
				this.rightRotate(e)
			} else {
				t.type = "b";
				t.parent.type = "r";
				this.leftRotate(t.parent)
			}
		}
	}
	this.root.type = "b"
};
RBTree.prototype.deleteNode = function (e) {
	var t;
	this.size--;
	if (!e.left || !e.right)t = e; else {
		t = this.successor(e);
		e.key = t.key;
		e.item = t.item
	}
	var n;
	if (!t.left)n = t.right; else n = t.left;
	if (n)n.parent = t.parent;
	if (!t.parent)this.root = n; else if (t === t.parent.left)t.parent.left = n; else t.parent.right = n;
	if (t.type === "b")this.deleteFixUp(n, t.parent)
};
RBTree.prototype.deleteFixUp = function (e, t) {
	while (e !== this.root && (!e || e.type === "b")) {
		if (e === t.left) {
			var n = t.right;
			if (n && n.type === "r") {
				n.type = "b";
				t.type = "r";
				this.leftRotate(t);
				n = t.right
			}
			if (n && (!n.left || n.left.type === "b") && (!n.right || n.right.type === "b")) {
				n.type = "r";
				e = t
			} else {
				if (!n.right || n.right.type === "b") {
					n.left.type = "b";
					n.type = "r";
					this.rightRotate(n);
					n = t.right
				}
				n.type = t.type;
				t.type = "b";
				n.right.type = "b";
				this.leftRotate(t);
				e = this.root
			}
		} else {
			var n = t.left;
			if (n && n.type === "r") {
				n.type = "b";
				t.type = "r";
				this.rightRotate(t);
				n = t.left
			}
			if (n && (!n.left || n.left.type === "b") && (!n.right || n.right.type === "b")) {
				n.type = "r";
				e = t
			} else {
				if (!n.left || n.left.type === "b") {
					n.right.type = "b";
					n.type = "r";
					this.leftRotate(n);
					n = t.left
				}
				n.type = t.type;
				t.type = "b";
				n.left.type = "b";
				this.rightRotate(t);
				e = this.root
			}
		}
		t = e.parent
	}
	if (e)e.type = "b"
};
RBTree.prototype.successor = function (e) {
	if (e.right)return this.minimum(e.right);
	var t = e.parent;
	while (t && e === t.right) {
		e = t;
		t = t.parent
	}
	return t
};
RBTree.prototype.predecessor = function (e) {
	if (e.left)return this.maximum(e.left);
	var t = e.parent;
	while (t && e === t.left) {
		e = t;
		t = t.parent
	}
	return t
};
RBTree.prototype.search = function (e, t, n) {
	t = t || this.root;
	n = n || function (t) {
		return t.key === e
	};
	while (t && !n(t))if (e < t.key)t = t.left; else t = t.right;
	if (t)return t.item;
	return undefined
};
RBTree.prototype.contains = function (e, t) {
	return this.search(e, null, t) !== undefined
};
RBTree.prototype.fullContains = function (e) {
	var t = this.minimum();
	while (t && !e(t.key))t = this.successor(t);
	return t !== null
};
RBTree.prototype.minimum = function (e) {
	e = e || this.root;
	while (e && e.left)e = e.left;
	return e
};
RBTree.prototype.maximum = function (e) {
	e = e || this.root;
	while (e && e.right)e = e.right;
	return e
};
RBTree.prototype.leftRotate = function (e) {
	var t = e.right;
	e.right = t.left;
	if (t.left !== null)t.left.parent = e;
	t.parent = e.parent;
	if (e.parent === null)this.root = t; else if (e === e.parent.left)e.parent.left = t; else e.parent.right = t;
	e.parent = t;
	t.left = e
};
RBTree.prototype.rightRotate = function (e) {
	var t = e.left;
	e.left = t.right;
	if (t.right !== null)t.right.parent = e;
	t.parent = e.parent;
	if (e.parent === null)this.root = t; else if (e === e.parent.left)e.parent.left = t; else e.parent.right = t;
	e.parent = t;
	t.right = e
};
RBTree.prototype.getSize = function () {
	return this.size
};
RBTree.prototype.clone = function () {
	var e = new RBTree;
	var t = this.getIterator();
	for (t.first(); !t.isDone(); t.next())if (t.getNode().item.clone)e.insert(t.getNode().key, t.getNode().item.clone()); else e.insert(t.getNode().key, t.getNode().item);
	return e
};
RBTree.prototype.cloneDistinct = function () {
	var e = new RBTree;
	var t = this.getIterator();
	for (t.first(); !t.isDone(); t.next()) {
		var n = function (e) {
			return e.key === t.getNode().key && e.item === t.getNode().item
		};
		if (!e.contains(t.getNode().key, n)) {
			if (t.getNode().item.cloneDistinct)e.insert(t.getNode().key, t.getNode().item.cloneDistinct()); else if (t.getNode().item.clone)e.insert(t.getNode().key, t.getNode().item.clone()); else e.insert(t.getNode().key, t.getNode().item)
		}
	}
	return e
};
RBTree.prototype.toArray = function () {
	var e = [];
	for (var t = this.minimum(); t; t = this.successor(t))e.push(t.item);
	return e
};
RBTree.prototype.clear = function () {
	this.root = null;
	this.size = 0
};
RBTree.prototype.isEmpty = function () {
	return!this.size
};
RBTree.prototype.execute = function (e) {
	for (var t = this.minimum(); t; t = this.successor(t))t.item = e(t.item)
};
RBTree.prototype.filter = function (e) {
	var t = [];
	for (var n = this.minimum(); n; n = this.successor(n))if (e(n.item))t.push(n.item);
	return t
};
RBTree.prototype.indexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0, r = this.minimum();
	while (r) {
		if (t(r.item))return n;
		r = this.successor(r);
		n++
	}
	return-1
};
RBTree.prototype.lastIndexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = this.size - 1, r = this.maximum();
	while (r) {
		if (t(r.item))return n;
		n--;
		r = this.predecessor(r)
	}
	return-1
};
RBTree.prototype.allIndexesOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0, r = this.minimum();
	var i = [];
	while (r) {
		if (t(r.item))i.push(n);
		n++;
		r = this.successor(r)
	}
	return i
};
RBTree.prototype.getItem = function (e) {
	if (e < 0 || e > this.size - 1)return undefined;
	for (var t = this.minimum(), n = 0; n < e; t = this.successor(t))n++;
	return t.item
};
RBTreeIterator.prototype = new Iterator;
RBTreeIterator.prototype.constructor = RBTreeIterator;
RBTreeIterator.prototype.first = function () {
	this.pointer = this.aggregate.minimum()
};
RBTreeIterator.prototype.next = function () {
	this.pointer = this.aggregate.successor(this.pointer)
};
RBTreeIterator.prototype.last = function () {
	this.pointer = this.aggregate.maximum()
};
RBTreeIterator.prototype.previous = function () {
	this.pointer = this.aggregate.predecessor(this.pointer)
};
RBTreeIterator.prototype.isDone = function () {
	return!this.pointer
};
RBTreeIterator.prototype.getItem = function () {
	return this.pointer.item
};
RBTreeIterator.prototype.getNode = function () {
	return this.pointer
};
RBTreeList.prototype = new Aggregate;
RBTreeList.prototype.constructor = RBTreeList;
RBTreeList.prototype.getIterator = function () {
	return new RBTreeListIterator(this)
};
RBTreeList.prototype.insert = function (e, t) {
	var n = new RBLNode(e, t);
	this.size++;
	if (!this.root) {
		this.root = n;
		this.first = n;
		this.last = n;
		n.type = "b";
		return
	}
	var r = this.root;
	for (var i = this.root; i;) {
		r = i;
		if (e < i.key)i = i.left; else i = i.right
	}
	n.parent = r;
	if (!r)this.root = n; else if (e < r.key)r.left = n; else r.right = n;
	n.next = this.successor(n);
	if (n.next) {
		if (n.next.previous)n.next.previous.next = n; else this.first = n;
		n.previous = n.next.previous;
		n.next.previous = n
	} else {
		this.last = n;
		n.previous = this.predecessor(n);
		if (n.previous)n.previous.next = n; else this.first = n
	}
	this.insertFixUp(n)
};
RBTreeList.prototype.insertFixUp = function (e) {
	for (var t = e.parent; t && t.type === "r"; t = e.parent) {
		if (t === t.parent.left) {
			var n = t.parent.right;
			if (n && n.type === "r") {
				t.type = "b";
				n.type = "b";
				t.parent.type = "r";
				e = t.parent
			} else if (e === t.right) {
				e = t;
				this.leftRotate(e)
			} else {
				t.type = "b";
				t.parent.type = "r";
				this.rightRotate(t.parent)
			}
		} else {
			var n = t.parent.left;
			if (n && n.type === "r") {
				t.type = "b";
				n.type = "b";
				t.parent.type = "r";
				e = t.parent
			} else if (e === t.left) {
				e = t;
				this.rightRotate(e)
			} else {
				t.type = "b";
				t.parent.type = "r";
				this.leftRotate(t.parent)
			}
		}
	}
	this.root.type = "b"
};
RBTreeList.prototype.deleteNode = function (e) {
	this.size--;
	var t;
	if (!e.left || !e.right)t = e; else {
		t = this.successor(e);
		e.key = t.key;
		e.item = t.item
	}
	var n;
	if (!t.left)n = t.right; else n = t.left;
	if (n)n.parent = t.parent;
	if (!t.parent)this.root = n; else if (t === t.parent.left)t.parent.left = n; else t.parent.right = n;
	if (t.next)t.next.previous = t.previous; else this.last = t.previous;
	if (t.previous)t.previous.next = t.next; else this.first = t.next;
	if (t.type === "b")this.deleteFixUp(n, t.parent)
};
RBTreeList.prototype.deleteFixUp = function (e, t) {
	while (e !== this.root && (!e || e.type === "b")) {
		if (e === t.left) {
			var n = t.right;
			if (n && n.type === "r") {
				n.type = "b";
				t.type = "r";
				this.leftRotate(t);
				n = t.right
			}
			if (n && (!n.left || n.left.type === "b") && (!n.right || n.right.type === "b")) {
				n.type = "r";
				e = t
			} else {
				if (!n.right || n.right.type === "b") {
					n.left.type = "b";
					n.type = "r";
					this.rightRotate(n);
					n = t.right
				}
				n.type = t.type;
				t.type = "b";
				n.right.type = "b";
				this.leftRotate(t);
				e = this.root
			}
		} else {
			var n = t.left;
			if (n && n.type === "r") {
				n.type = "b";
				t.type = "r";
				this.rightRotate(t);
				n = t.left
			}
			if (n && (!n.left || n.left.type === "b") && (!n.right || n.right.type === "b")) {
				n.type = "r";
				e = t
			} else {
				if (!n.left || n.left.type === "b") {
					n.right.type = "b";
					n.type = "r";
					this.leftRotate(n);
					n = t.left
				}
				n.type = t.type;
				t.type = "b";
				n.left.type = "b";
				this.rightRotate(t);
				e = this.root
			}
		}
		t = e.parent
	}
	if (e)e.type = "b"
};
RBTreeList.prototype.successor = function (e) {
	if (e.next || e === this.last)return e.next;
	if (e.right)return this.minimum(e.right);
	var t = e.parent;
	while (t && e === t.right) {
		e = t;
		t = t.parent
	}
	return t
};
RBTreeList.prototype.predecessor = function (e) {
	if (e.previous || e === this.first)return e.previous;
	if (e.left)return this.maximum(e.left);
	var t = e.parent;
	while (t && e === t.left) {
		e = t;
		t = t.parent
	}
	return t
};
RBTreeList.prototype.search = function (e, t, n) {
	t = t || this.root;
	n = n || function (t) {
		return t.key === e
	};
	while (t && !n(t))if (e < t.key)t = t.left; else t = t.right;
	if (t)return t.item;
	return undefined
};
RBTreeList.prototype.contains = function (e, t) {
	return this.search(e, null, t) !== undefined
};
RBTreeList.prototype.fullContains = function (e) {
	var t = this.first;
	while (t && !e(t.key))t = t.next;
	return t !== null
};
RBTreeList.prototype.minimum = function (e) {
	if (e)while (e && e.left)e = e.left; else return this.first;
	return e
};
RBTreeList.prototype.maximum = function (e) {
	if (e)while (e && e.right)e = e.right; else return this.last;
	return e
};
RBTreeList.prototype.leftRotate = function (e) {
	var t = e.right;
	e.right = t.left;
	if (t.left !== null)t.left.parent = e;
	t.parent = e.parent;
	if (e.parent === null)this.root = t; else if (e === e.parent.left)e.parent.left = t; else e.parent.right = t;
	e.parent = t;
	t.left = e
};
RBTreeList.prototype.rightRotate = function (e) {
	var t = e.left;
	e.left = t.right;
	if (t.right !== null)t.right.parent = e;
	t.parent = e.parent;
	if (e.parent === null)this.root = t; else if (e === e.parent.left)e.parent.left = t; else e.parent.right = t;
	e.parent = t;
	t.right = e
};
RBTreeList.prototype.getSize = function () {
	return this.size
};
RBTreeList.prototype.clone = function () {
	var e = new RBTreeList;
	var t = this.getIterator();
	for (t.first(); !t.isDone(); t.next())e.insert(t.getNode().key, t.getNode().item);
	return e
};
RBTreeList.prototype.cloneDistinct = function () {
	var e = new RBTreeList;
	var t = this.getIterator();
	for (t.first(); !t.isDone(); t.next()) {
		var n = function (e) {
			return e.key === t.getNode().key && e.item === t.getNode().item
		};
		if (!e.contains(t.getNode().key, n)) {
			if (t.getNode().item.cloneDistinct)e.insert(t.getNode().key, t.getNode().item.cloneDistinct()); else if (t.getNode().item.clone)e.insert(t.getNode().key, t.getNode().item.clone()); else e.insert(t.getNode().key, t.getNode().item)
		}
	}
	return e
};
RBTreeList.prototype.toArray = function () {
	var e = [];
	for (var t = this.first; t; t = t.next)e.push(t.item);
	return e
};
RBTreeList.prototype.clear = function () {
	this.root = null;
	this.first = null;
	this.last = null;
	this.size = 0
};
RBTreeList.prototype.isEmpty = function () {
	return!this.size
};
RBTreeList.prototype.execute = function (e) {
	for (var t = this.first; t; t = t.next)t.item = e(t.item)
};
RBTreeList.prototype.filter = function (e) {
	var t = [];
	for (var n = this.first; n; n = n.next)if (e(n.item))t.push(n.item);
	return t
};
RBTreeList.prototype.indexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0, r = this.first;
	while (r) {
		if (t(r.item))return n;
		r = r.next;
		n++
	}
	return-1
};
RBTreeList.prototype.lastIndexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = this.size - 1, r = this.last;
	while (r) {
		if (t(r.item))return n;
		n--;
		r = r.previous
	}
	return-1
};
RBTreeList.prototype.allIndexesOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0, r = this.first;
	var i = [];
	while (r) {
		if (t(r.item))i.push(n);
		n++;
		r = r.next
	}
	return i
};
RBTreeList.prototype.getItem = function (e) {
	if (e < 0 || e > this.size - 1)return undefined;
	for (var t = this.first, n = 0; n < e; t = t.next)n++;
	return t.item
};
RBTreeListIterator.prototype = new Iterator;
RBTreeListIterator.prototype.constructor = RBTreeListIterator;
RBTreeListIterator.prototype.first = function () {
	this.pointer = this.aggregate.first
};
RBTreeListIterator.prototype.next = function () {
	this.pointer = this.pointer.next
};
RBTreeListIterator.prototype.last = function () {
	this.pointer = this.aggregate.last
};
RBTreeListIterator.prototype.previous = function () {
	this.pointer = this.pointer.previous
};
RBTreeListIterator.prototype.isDone = function () {
	return!this.pointer
};
RBTreeListIterator.prototype.getItem = function () {
	return this.pointer.item
};
RBTreeListIterator.prototype.getNode = function () {
	return this.pointer
};
Set.prototype.insert = function (e) {
	this.elements.pushBack(e);
	e.parents.pushBack(this);
	this.size++
};
Set.prototype.multiInsert = function (e) {
	for (var t = 0; t < e.length; t++) {
		this.elements.pushBack(e[t]);
		e[t].parents.pushBack(this)
	}
	this.size += e.length
};
Set.prototype.union = function (e) {
	var t = new Set;
	t.addSubsets([this, e]);
	this.parents.pushBack(t);
	e.parents.pushBack(t);
	var n = this;
	var r = function (e) {
		if (e === n)return t
	};
	var i = this.sets.getIterator();
	for (i.first(); !i.isDone(); i.next())i.getItem().parents.execute(r);
	r = function (n) {
		if (n === e)return t
	};
	i = e.sets.getIterator();
	for (i.first(); !i.isDone(); i.next())i.getItem().parents.execute(r);
	return t
};
Set.prototype.intersect = function (e) {
	var t = new Set;
	var n = this.elements.getIterator();
	for (n.first(); !n.isDone(); n.next())if (n.getItem().parents.contains(e))t.insert(n.getItem());
	var r = this.sets.getIterator();
	for (r.first(); !r.isDone(); r.next()) {
		n = r.getItem().getIterator();
		for (n.first(); !n.isDone(); n.next())if (n.getItem().parents.contains(e))t.insert(n.getItem())
	}
	return t
};
Set.prototype.difference = function (e) {
	var t = new Set;
	var n = this.elements.getIterator();
	for (n.first(); !n.isDone(); n.next())if (!n.getItem().parents.contains(e))t.insert(n.getItem());
	var r = this.sets.getIterator();
	for (r.first(); !r.isDone(); r.next()) {
		n = r.getItem().getIterator();
		for (n.first(); !n.isDone(); n.next())if (!n.getItem().parents.contains(e))t.insert(n.getItem())
	}
	return t
};
Set.prototype.cartesianProduct = function (e) {
	var t = this.getItems();
	var n = e.getItems();
	var r = new Set;
	for (var i = 0; i < t.length; i++)for (var s = 0; s < n.length; s++)r.insert(new Element([t[i], n[s]]));
	return r
};
Set.prototype.addSubset = function (e) {
	this.sets.pushBack(e);
	this.size += e.size
};
Set.prototype.addSubsets = function (e) {
	for (var t = 0; t < e.length; t++)this.addSubset(e[t])
};
Set.prototype.getItems = function () {
	var e = [];
	var t = this.elements.getIterator();
	for (t.first(); !t.isDone(); t.next())e.push(t.getItem().item);
	var n = this.sets.getIterator();
	for (n.first(); !n.isDone(); n.next()) {
		t = n.getItem().getIterator();
		for (t.first(); !t.isDone(); t.next())e.push(t.getItem().item)
	}
	return e
};
Set.prototype.getCardinality = function () {
	return this.size
};
Set.prototype.isEmpty = function () {
	return!this.size
};
Set.prototype.clone = function () {
	var e = new Set;
	e.parents = this.parents.clone();
	e.elements = this.elements.clone();
	e.sets = this.sets.clone();
	e.size = this.size;
	return e
};
Stack.prototype = new Aggregate;
Stack.prototype.constructor = Stack;
Stack.prototype.getIterator = function () {
	return new StackIterator(this)
};
Stack.prototype.push = function (e) {
	this.items.push(e)
};
Stack.prototype.multiPush = function (e) {
	for (var t = 0; t < e.length; t++)this.push(e[t])
};
Stack.prototype.pop = function () {
	if (!this.items.length)return undefined;
	return this.items.pop()
};
Stack.prototype.multiPop = function (e) {
	var t = [];
	for (var n = 0; n < e && this.items.length; n++)t.push(this.pop());
	return t
};
Stack.prototype.peek = function () {
	if (!this.items.length)return undefined;
	return this.items[this.items.length - 1]
};
Stack.prototype.clear = function () {
	this.items = []
};
Stack.prototype.contains = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0;
	while (n < this.items.length && !t(this.items[n]))n++;
	return n < this.items.length
};
Stack.prototype.execute = function (e) {
	for (var t = this.items.length - 1; t > -1; t--)this.items[t] = e(this.items[t])
};
Stack.prototype.getItem = function (e) {
	if (e < 0 || e > this.items.length - 1)return undefined;
	return this.items[this.items.length - e - 1]
};
Stack.prototype.getLength = function () {
	return this.items.length
};
Stack.prototype.isEmpty = function () {
	return!this.items.length
};
Stack.prototype.filter = function (e) {
	var t = [];
	for (var n = this.items.length - 1; n > -1; n--) {
		if (e(this.items[n]))t.push(this.items[n])
	}
	return t
};
Stack.prototype.indexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = this.items.length - 1;
	while (n > -1) {
		if (t(this.items[n]))return n;
		n--
	}
	return-1
};
Stack.prototype.lastIndexOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = 0;
	while (n < this.items.length) {
		if (t(this.items[n]))return n;
		n++
	}
	return-1
};
Stack.prototype.allIndexesOf = function (e, t) {
	t = t || function (t) {
		return t === e
	};
	var n = this.items.length - 1;
	var r = [];
	while (n > -1) {
		if (t(this.items[n]))r.push(n);
		n--
	}
	return r
};
Stack.prototype.clone = function () {
	var e = new Stack;
	for (var t = 0; t < this.items.length; t++)if (this.items[t].clone)e.push(this.items[t].clone()); else e.push(this.items[t]);
	return e
};
Stack.prototype.cloneDistinct = function () {
	var e = new Stack;
	for (var t = 0; t < this.items.length; t++)if (!e.contains(this.items[t])) {
		if (this.items[t].cloneDistinct)e.push(this.items[t].cloneDistinct()); else if (this.items[t].clone)e.push(this.items[t].clone()); else e.push(this.items[t])
	}
	return e
};
StackIterator.prototype = new Iterator;
StackIterator.prototype.constructor = StackIterator;
StackIterator.prototype.first = function () {
	this.pointer = this.aggregate.items.length - 1
};
StackIterator.prototype.next = function () {
	this.pointer--
};
StackIterator.prototype.last = function () {
	this.pointer = 0
};
StackIterator.prototype.previous = function () {
	this.pointer++
};
StackIterator.prototype.isDone = function () {
	return this.pointer < 0 || this.pointer > this.aggregate.items.length - 1
};
StackIterator.prototype.getItem = function () {
	return this.aggregate.items[this.pointer]
}