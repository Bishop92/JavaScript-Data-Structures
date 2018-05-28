var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by Stefano on 04/04/2014.
 */
var Aggregate = /** @class */ (function () {
    function Aggregate() {
    }
    return Aggregate;
}());
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
/**
 * Created by Stefano on 05/04/2014.
 */
var BSNode = /** @class */ (function () {
    /**
     * The single node of the tree.
     * @param key {number} The key of the node.
     * @param item {*} The item to store in the node.
     * @constructor
     */
    function BSNode(key, item) {
        this.item = item;
        this.key = key;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
    return BSNode;
}());
var BSTree = /** @class */ (function (_super) {
    __extends(BSTree, _super);
    function BSTree() {
        var _this = _super.call(this) || this;
        _this.root = null;
        return _this;
    }
    /**
     * @inheritDoc
     */
    BSTree.prototype.getIterator = function () {
        return new BSTreeIterator(this);
    };
    /**
     * Insert the item relatives to the key value in the tree.
     * @param key {number} The key to store.
     * @param item {*} The item to store.
     * @return {void}
     */
    BSTree.prototype.insert = function (key, item) {
        var node = new BSNode(key, item);
        var p = this.root;
        for (var n = this.root; n;) {
            p = n;
            if (key < n.key)
                n = n.left;
            else
                n = n.right;
        }
        node.parent = p;
        if (!p)
            this.root = node;
        else if (key < p.key)
            p.left = node;
        else
            p.right = node;
    };
    /**
     * Search the item relatives to the key.
     * @param key {Number} The key to find.
     * @param [node = root] {BSNode} The node from which start the search.
     * @return {*} The item found or undefined if there isn't the key in the tree.
     */
    BSTree.prototype.search = function (key, node) {
        if (node === void 0) { node = null; }
        node = node || this.root;
        while (node && key !== node.key)
            if (key < node.key)
                node = node.left;
            else
                node = node.right;
        if (node)
            return node.item;
        return undefined;
    };
    /**
     * Get the item relatives to the minimum key stored in the tree.
     * @param [node = root] {Node} The node from which start the search.
     * @return {BSNode} The node found.
     */
    BSTree.prototype.minimum = function (node) {
        if (node === void 0) { node = null; }
        node = node || this.root;
        while (node && node.left)
            node = node.left;
        return node;
    };
    /**
     * Get the item relatives to the maximum key stored in the tree.
     * @param [node = root] {Node} The node from which start the search.
     * @return {BSNode} The node found.
     */
    BSTree.prototype.maximum = function (node) {
        if (node === void 0) { node = null; }
        node = node || this.root;
        while (node && node.right)
            node = node.right;
        return node;
    };
    /**
     * Get the node with the key next to the param node key.
     * @param node {BSNode} The node of which search the successor.
     * @return {BSNode} The node found.
     */
    BSTree.prototype.successor = function (node) {
        if (node.right)
            return this.minimum(node.right);
        var parent = node.parent;
        while (parent && node === parent.right) {
            node = parent;
            parent = parent.parent;
        }
        return parent;
    };
    /**
     * Get the node with the key previous to the param node key.
     * @param node {BSNode} The node of which search the predecessor.
     * @return {BSNode} The node found.
     */
    BSTree.prototype.predecessor = function (node) {
        if (node.left)
            return this.maximum(node.left);
        var parent = node.parent;
        while (parent && node === parent.left) {
            node = parent;
            parent = parent.parent;
        }
        return parent;
    };
    /**
     * Delete the node from the tree.
     * @param node {BSNode} The node to delete.
     * @return {void}
     */
    BSTree.prototype.deleteNode = function (node) {
        if (!node.left && !node.right) {
            if (node === this.root)
                this.root = null;
            else if (node.parent.left === node)
                node.parent.left = null;
            else
                node.parent.right = null;
        }
        else if (node.left && node.right) {
            var next = this.successor(node);
            node.key = next.key;
            node.item = next.item;
            if (next.parent.left === next)
                next.parent.left = null;
            else
                next.parent.right = null;
        }
        else {
            if (node.right) {
                if (node === this.root) {
                    this.root = node.right;
                    node.right.parent = null;
                }
                else {
                    node.parent.right = node.right;
                    node.right.parent = node.parent;
                }
            }
            else {
                if (node === this.root) {
                    this.root = node.left;
                    node.left.parent = null;
                }
                else {
                    node.parent.left = node.left;
                    node.left.parent = node.parent;
                }
            }
        }
    };
    return BSTree;
}(Aggregate));
/**
 * Created by Stefano on 06/04/2014.
 */
var BSTreeIterator = /** @class */ (function () {
    /**
     * Class that implements the iterator for a binary search tree.
     * @param aggregate {BSTree} The aggregate to scan.
     * @constructor
     */
    function BSTreeIterator(aggregate) {
        this.aggregate = aggregate;
        this.pointer = null;
    }
    /**
     * @inheritDoc
     */
    BSTreeIterator.prototype.first = function () {
        this.pointer = this.aggregate.minimum();
    };
    ;
    /**
     * @inheritDoc
     */
    BSTreeIterator.prototype.next = function () {
        this.pointer = this.aggregate.successor(this.pointer);
    };
    ;
    /**
     * @inheritDoc
     */
    BSTreeIterator.prototype.last = function () {
        this.pointer = this.aggregate.maximum();
    };
    ;
    /**
     * @inheritDoc
     */
    BSTreeIterator.prototype.previous = function () {
        this.pointer = this.aggregate.predecessor(this.pointer);
    };
    ;
    /**
     * @inheritDoc
     */
    BSTreeIterator.prototype.isDone = function () {
        return !this.pointer;
    };
    ;
    /**
     * @inheritDoc
     */
    BSTreeIterator.prototype.getItem = function () {
        return this.pointer.item;
    };
    ;
    /**
     * Return the node stored at the position pointed by the iterator.
     * @abstract
     * @return {BSNode|null} The node stored or null if it's out of the bounds.
     */
    BSTreeIterator.prototype.getNode = function () {
        return this.pointer;
    };
    ;
    return BSTreeIterator;
}());
/**
 * Created by Stefano on 08/04/2014.
 */
var BNode = /** @class */ (function () {
    /**
     * The single node of the tree.
     * @constructor
     */
    function BNode() {
        /**
         * The keys stored it the node.
         * @type {Array<*>}
         */
        this.keys = [];
        /**
         * The items stored in the node.
         * @type {Array<*>}
         */
        this.items = [];
        /**
         * The nodes child of the node.
         * @type {Array<BNode>}
         */
        this.childs = [];
    }
    return BNode;
}());
var BTree = /** @class */ (function (_super) {
    __extends(BTree, _super);
    /**
     * Class for managing a B-Tree.
     * @param minimumDegree {number} The minimum number of keys of a node.
     * @constructor
     */
    function BTree(minimumDegree) {
        var _this = _super.call(this) || this;
        /**
         * The root of the tree.
         * @type {BNode}
         */
        _this.root = new BNode();
        /**
         * The number of items stored in the tree.
         * @type {number}
         */
        _this.size = 0;
        _this.t = minimumDegree;
        return _this;
    }
    /**
     * @inheritDoc
     */
    BTree.prototype.getIterator = function () {
        return new BTreeIterator(this);
    };
    ;
    /**
     * Insert the item relatives to the key value in the tree.
     * @param key {number} The key to store.
     * @param item {*} The item to store.
     * @return {void}
     */
    BTree.prototype.insert = function (key, item) {
        var node = this.root;
        if (node.keys.length === 2 * this.t - 1) {
            var newNode = new BNode();
            newNode.childs.push(node);
            this.root = newNode;
            this.splitChild(newNode, 0);
            node = newNode;
        }
        this.size++;
        this.insertNonFull(node, key, item);
    };
    ;
    /**
     * Insert the new node in the right position if the node is not full.
     * @param node {BNode} The node from which start to check the insertion.
     * @param key {number} The key to store.
     * @param item {*} The item to store.
     * @return {void}
     */
    BTree.prototype.insertNonFull = function (node, key, item) {
        while (node) {
            var i = node.keys.length - 1;
            if (!node.childs.length) {
                for (; i > -1 && key < node.keys[i]; i--) {
                    node.keys[i + 1] = node.keys[i];
                    node.items[i + 1] = node.items[i];
                }
                node.keys[i + 1] = key;
                node.items[i + 1] = item;
                return;
            }
            else {
                var j = 0;
                i++;
                while (j < i) {
                    var m = Math.floor((j + i) / 2);
                    if (key <= node.keys[m])
                        i = m;
                    else
                        j = m + 1;
                }
                if (node.childs[j].keys.length === 2 * this.t - 1) {
                    this.splitChild(node, j);
                    if (key > node.keys[j])
                        j++;
                }
                node = node.childs[j];
            }
        }
    };
    ;
    /**
     * Search the item relatives to the key that satisfy the condition represented by the callback function.
     * @param key {Number} The key to find.
     * @param [node = root] {RBNode} The node from which start the search.
     * @param [callback = function(node,index){return(node.keys[index]===key);}] The condition to satisfy. The callback must accept the current node to check and optionally the position of the key.
     * @return {*} The item found or undefined if there isn't the key in the tree.
     */
    BTree.prototype.search = function (key, node, callback) {
        node = node || this.root;
        callback = callback || function (node, index) {
            return node.keys[index] === key;
        };
        while (node) {
            var n = node.keys.length;
            var i = 0, j = n;
            while (i < j) {
                var m = Math.floor((i + j) / 2);
                if (key <= node.keys[m])
                    j = m;
                else
                    i = m + 1;
            }
            if (i < n && callback(node, i))
                return node.items[i];
            else if (!node.childs.length)
                return undefined;
            else
                node = node.childs[i];
        }
    };
    ;
    /**
     * Split the child of the node at the position index.
     * @param node {BNode} The parent of the child to split.
     * @param index {number} The position of the child to split.
     * @return {void}
     */
    BTree.prototype.splitChild = function (node, index) {
        var newNode = new BNode();
        var child = node.childs[index];
        //copy of the last t - 1 keys and items in the new node
        for (var i = 0; i < this.t - 1; i++) {
            newNode.keys[i] = child.keys[i + this.t];
            newNode.items[i] = child.items[i + this.t];
        }
        if (child.childs.length)
            //copy of the last t child in the new node
            for (var j = 0; j < this.t; j++)
                newNode.childs[j] = child.childs[j + this.t];
        //shift the children from index + 1 position
        for (var l = node.keys.length; l > index; l--)
            node.childs[l + 1] = node.childs[l];
        //set the index position as the position t of the child
        node.childs[index + 1] = newNode;
        //shift the keys and the items from index position
        for (var k = node.keys.length - 1; k > index - 1; k--) {
            node.keys[k + 1] = node.keys[k];
            node.items[k + 1] = node.items[k];
        }
        node.keys[index] = child.keys[this.t - 1];
        node.items[index] = child.items[this.t - 1];
        //remove keys, items and child in the old node.
        child.keys.splice(child.keys.length - this.t);
        child.items.splice(child.items.length - this.t);
        child.childs.splice(child.childs.length - this.t);
    };
    ;
    /**
     * Delete the key from the tree.
     * @param key {*} The key to delete.
     * @return {void}
     */
    BTree.prototype.deleteKey = function (key) {
        if (this.root.keys.length) {
            this.deleteNonMin(this.root, key);
            if (!this.root.keys.length && this.root.childs.length)
                this.root = this.root.childs[0];
            this.size--;
        }
    };
    ;
    /**
     * Deletes a node that's a number of keys greater than the minimum for a node.
     * @param node {BNode} The node to delete.
     * @param key {number} The key to delete.
     * @return {void}
     */
    BTree.prototype.deleteNonMin = function (node, key) {
        var i = 0, j = node.keys.length;
        while (i < j) {
            var m = Math.floor((i + j) / 2);
            if (key <= node.keys[m])
                j = m;
            else
                i = m + 1;
        }
        //key is in the node
        if (i < node.keys.length && key === node.keys[i]) {
            //the node is a leaf
            if (!node.childs.length) {
                //remove the key
                for (j = i + 1; j < node.keys.length; j++) {
                    node.keys[j - 1] = node.keys[j];
                    node.items[j - 1] = node.items[j];
                }
                node.keys.pop();
                node.items.pop();
            }
            else {
                //the node is not a leaf
                //the node has the minimum number of keys
                if (node.childs[i].length === this.t - 1) {
                    //increase the number of the keys of the node
                    this.augmentChild(node, i);
                    if (i === node.keys.length + 1)
                        i--;
                }
                //check if the key is moved in the child
                if (node.keys[i] !== key)
                    this.deleteNonMin(node.childs[i], key);
                else
                    this.deleteMax(node, i);
            }
            //the key is not in the node
        }
        else {
            //check if the child i has the minimum number of keys
            if (node.childs[i].keys.length === this.t - 1) {
                this.augmentChild(node, i);
                if (i === node.keys.length + 2)
                    i--;
            }
            this.deleteNonMin(node.childs[i], key);
        }
    };
    ;
    /**
     * Deletes a node that have the maximum number of keys for node.
     * @param node {BNode} The node to delete.
     * @param index {number} The key to delete in the node.
     * @return {void}
     */
    BTree.prototype.deleteMax = function (node, index) {
        var child = node.childs[index];
        var goAhead = true;
        while (goAhead) {
            if (!child.childs.length) {
                node.keys[index] = child.keys[child.keys.length - 1];
                node.items[index] = child.items[child.items.length - 1];
                child.keys.pop();
                child.items.pop();
                goAhead = false;
            }
            else {
                var last = child.childs[child.keys.length];
                if (last.keys.length === this.t - 1)
                    this.augmentChild(child, child.keys.length);
                child = child.childs[child.keys.length];
            }
        }
    };
    ;
    /**
     * Augments the number of keys stored in the node preserving the order.
     * @param node {BNode} The node to delete.
     * @param index {number} The index of the position to augment.
     * @return {void}
     */
    BTree.prototype.augmentChild = function (node, index) {
        var child = node.childs[index];
        var brother;
        if (index)
            brother = node.childs[index - 1];
        if (index && brother.keys.length > this.t - 1) {
            if (child.childs.length) {
                for (var j = this.keys.length + 1; j > 0; j--)
                    child.childs[j] = child.childs[j - 1];
                child.childs[0] = brother.childs[brother.keys.length];
                for (var i = child.keys.length; i > 0; i--) {
                    child.keys[i] = child.keys[i - 1];
                    child.items[i] = child.items[i - 1];
                }
                child.keys[0] = node.keys[index - 1];
                child.items[0] = node.items[index - 1];
                node.keys[index - 1] = brother.keys[brother.keys.length - 1];
                node.items[index - 1] = brother.items[brother.items.length - 1];
            }
        }
        else {
            if (index < node.keys.length)
                brother = node.childs[index + 1];
            if (index < node.keys.length && brother.keys.length > this.t - 1) {
                if (brother.childs.length) {
                    child.childs[child.keys.length + 1] = brother.childs[0];
                    for (var l = 1; l < brother.keys.length + 1; l++)
                        brother.childs[l - 1] = brother.childs[l];
                    brother.childs.pop();
                }
                child.keys[child.keys.length] = node.keys[index];
                child.items[child.items.length] = node.items[index];
                node.keys[index] = brother.keys[0];
                node.items[index] = brother.items[0];
                for (var k = 1; k < brother.keys.length; k++) {
                    brother.keys[k - 1] = brother.keys[k];
                    brother.items[k - 1] = brother.items[k];
                }
                brother.keys.pop();
                brother.items.pop();
            }
            else {
                if (index < node.keys.length) {
                    child.keys[this.t - 1] = node.keys[index];
                    child.items[this.t - 1] = node.items[index];
                    for (var m = index + 2; m < node.keys.length + 1; m++)
                        node.childs[m - 1] = node.childs[m];
                    node.childs.pop();
                    for (var n = index + 1; n < node.keys.length; n++) {
                        node.keys[n - 1] = node.keys[n];
                        node.items[n - 1] = node.items[n];
                    }
                    node.keys.pop();
                    node.items.pop();
                    if (brother.childs.length)
                        for (var y = 0; y < brother.keys.length + 1; y++)
                            child.childs[this.t + y] = brother.childs[y];
                    for (var x = 0; x < brother.keys.length; x++) {
                        child.keys[x + this.t] = brother.keys[x];
                        child.items[x + this.t] = brother.items[x];
                    }
                }
                else {
                    if (brother.childs.length)
                        for (var w = 0; w < child.keys.length + 1; w++)
                            brother.childs[this.t + w] = child.childs[w];
                    brother.keys[this.t - 1] = node.keys[node.keys.length - 1];
                    brother.items[this.t - 1] = node.items[node.keys.length - 1];
                    for (var z = 0; z < child.keys.length; z++) {
                        brother.keys[z + this.t] = child.keys[z];
                        brother.items[z + this.t] = child.items[z];
                    }
                }
            }
        }
    };
    ;
    /**
     * Checks if the tree contains the key.
     * @param key {number} The key to find.
     * @param [callback = function(node,index){return(node.keys[index]===key);}] The condition to satisfy. The callback must accept the current node to check and optionally the position of the key.
     * @return {boolean} True if the tree contains the key.
     */
    BTree.prototype.contains = function (key, callback) {
        return this.search(key, null, callback) !== undefined;
    };
    ;
    /**
     * Checks if the tree contains a node that satisfy the condition represented by the callback function.
     * This method check all the tree avoiding the binary search.
     * @param callback {function} The condition to satisfy. The callback must accept the current node to check.
     * @return {boolean} True if the tree contains the node that satisfy the condition, false otherwise.
     */
    BTree.prototype.fullContains = function (callback) {
        var key = this.minimumKey();
        while (key !== null && !callback(this.search(key)))
            key = this.successor(key);
        return key !== null;
    };
    ;
    /**
     * Get the key next to the param node key.
     * @param key {number} The key of which search the successor.
     * @param [node = root] The node from start the search of the successor.
     * @return {number} The key found.
     */
    BTree.prototype.successor = function (key, node) {
        node = node || this.root;
        var i = 0, j = node.keys.length;
        //search the key in the node
        while (i < j) {
            var m = Math.floor((i + j) / 2);
            if (key <= node.keys[m])
                j = m;
            else
                i = m + 1;
        }
        //check if the key has been found
        if (node.keys[i] === key)
            //in this case the successor is the next key
            i++;
        //if it's a leaf
        if (!node.childs.length) {
            //check if the key hasn't been found
            if (i > node.keys.length - 1)
                return null;
            else
                return node.keys[i];
        }
        //if it's not a leaf check if the successor is in the i-child
        var successor = this.successor(key, node.childs[i]);
        //if it's not in the child and has been found a key then return it
        if (successor === null && i < node.keys.length)
            return node.keys[i];
        //return the value of the successor even if it's null
        return successor;
    };
    ;
    /**
     * Get the key previous to the param key.
     * @param key {number} The key of which search the predecessor.
     * @param [node = root] The node from start the search of the predecessor.
     * @return {number} The key found.
     */
    BTree.prototype.predecessor = function (key, node) {
        node = node || this.root;
        var i = 0, j = node.keys.length;
        //search the key in the node
        while (i < j) {
            var m = Math.floor((i + j) / 2);
            if (key <= node.keys[m])
                j = m;
            else
                i = m + 1;
        }
        i--;
        //check if the node is a leaf
        if (!node.childs.length) {
            //check if a predecessor has been found
            if (i < 0)
                return null;
            else
                return node.keys[i];
        }
        var predecessor = this.predecessor(key, node.childs[i + 1]);
        if (predecessor === null && key > node.keys[0]) {
            return node.keys[i];
        }
        return predecessor;
    };
    ;
    /**
     * Gets the minimum key stored in the tree.
     * @return {number} The key found.
     */
    BTree.prototype.minimumKey = function () {
        var node = this.root;
        while (node.childs.length)
            node = node.childs[0];
        if (node)
            return node.keys[0];
        return null;
    };
    ;
    /**
     * Gets the maximum key stored in the tree.
     * @return {number} The key found.
     */
    BTree.prototype.maximumKey = function () {
        var node = this.root;
        while (node.childs.length)
            node = node.childs[node.childs.length - 1];
        if (node)
            return node.keys[node.keys.length - 1];
        return null;
    };
    ;
    /**
     * Gets the item relatives to the minimum key stored in the tree.
     * @return {number} The item found.
     */
    BTree.prototype.minimum = function () {
        var node = this.root;
        while (node.childs.length)
            node = node.childs[0];
        return node.items[0];
    };
    ;
    /**
     * Gets the item relatives to the maximum key stored in the tree.
     * @return {node} The item found.
     */
    BTree.prototype.maximum = function () {
        var node = this.root;
        while (node.childs.length)
            node = node.childs[node.childs.length - 1];
        return node.items[node.items.length - 1];
    };
    ;
    /**
     * Returns the size of the tree.
     * @return {number} The size of the tree.
     */
    BTree.prototype.getSize = function () {
        return this.size;
    };
    ;
    /**
     * Checks if the tree is empty.
     * @return {boolean} True if the tree is empty, false otherwise.
     */
    BTree.prototype.isEmpty = function () {
        return !this.size;
    };
    ;
    /**
     * Executes the callback function for each item of the tree.
     * This method modifies the tree so if you don't need to modify it you must return the same item of the array.
     * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
     * @return {void}
     */
    BTree.prototype.execute = function (callback, node) {
        node = node || this.root;
        for (var i = 0; i < node.items.length; i++)
            node.items[i] = callback(node.items[i]);
        for (var j = 0; j < node.childs.length; j++)
            this.execute(callback, node.childs[j]);
    };
    ;
    /**
     * Removes all the items stored in the tree.
     * @return {void}
     */
    BTree.prototype.clear = function () {
        this.root = null;
        this.size = 0;
    };
    ;
    /**
     * Returns the items that satisfy the condition determined by the callback.
     * @param callback {function} The function that implements the condition.
     * @return {Array<*>} The array that contains the items that satisfy the condition.
     */
    BTree.prototype.filter = function (callback, node) {
        var result = [];
        node = node || this.root;
        for (var i = 0; i < node.items.length; i++) {
            if (node.childs.length)
                result = result.concat(this.filter(callback, node.childs[i]));
            if (callback(node.items[i]))
                result.push(node.items[i]);
        }
        if (node.childs.length)
            result = result.concat(this.filter(callback, node.childs[node.childs.length - 1]));
        return result;
    };
    ;
    /**
     * Clones the tree into a new tree.
     * @return {BTree} The tree cloned from this tree.
     */
    BTree.prototype.clone = function () {
        var tree = new BTree(this.t);
        var it = this.getIterator();
        for (it.first(); !it.isDone(); it.next()) {
            var item = it.getItem();
            if (item.clone)
                item = item.clone();
            tree.insert(it.getKey(), item);
        }
        return tree;
    };
    ;
    /**
     * Clones the tree into a new tree without cloning duplicated items.
     * @return {BTree} The tree cloned from this tree.
     */
    BTree.prototype.cloneDistinct = function () {
        var tree = new BTree(this.t);
        var it = this.getIterator();
        for (it.first(); !it.isDone(); it.next()) {
            var callback = function (item) {
                return item === it.getItem();
            };
            if (!tree.fullContains(callback)) {
                if (it.getItem().cloneDistinct)
                    tree.insert(it.getKey(), it.getItem().cloneDistinct());
                else if (it.getItem().clone)
                    tree.insert(it.getKey(), it.getItem().clone());
                else
                    tree.insert(it.getKey(), it.getItem());
            }
        }
        return tree;
    };
    ;
    /**
     * Transform the tree into an array without preserving keys.
     * @return {Array<*>} The array that represents the tree.
     */
    BTree.prototype.toArray = function () {
        var result = [];
        var it = this.getIterator();
        for (it.first(); !it.isDone(); it.next())
            result.push(it.getItem());
        return result;
    };
    ;
    /**
     * Returns the first position of the item in the tree.
     * @param item {*} The item to search.
     * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
     * @return {number} The first position of the item.
     */
    BTree.prototype.indexOf = function (item, callback) {
        callback = callback || function (it) {
            return it === item;
        };
        var i = 0, key = this.minimumKey();
        while (key !== null) {
            if (callback(this.search(key)))
                return i;
            key = this.successor(key);
            i++;
        }
        return -1;
    };
    ;
    /**
     * Returns the last position of the item in the tree.
     * @param item {*} The item to search.
     * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
     * @return {number} The last position of the item.
     */
    BTree.prototype.lastIndexOf = function (item, callback) {
        callback = callback || function (it) {
            return it === item;
        };
        var i = this.size - 1, key = this.maximumKey();
        while (key !== null) {
            if (callback(this.search(key)))
                return i;
            i--;
            key = this.predecessor(key);
        }
        return -1;
    };
    ;
    /**
     * Returns all the position in which the item has been found in the tree.
     * @param item {*} The item to search.
     * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
     * @return {Array<number>} The positions in which the item has been found.
     */
    BTree.prototype.allIndexesOf = function (item, callback) {
        callback = callback || function (it) {
            return it === item;
        };
        var i = 0, key = this.minimumKey();
        var indexes = [];
        while (key !== null) {
            if (callback(this.search(key)))
                indexes.push(i);
            i++;
            key = this.successor(key);
        }
        return indexes;
    };
    ;
    /**
     * Returns the item at the position index.
     * @param index {number} The position of the item.
     * @return {*} The item at the position. It's undefined if index isn't in the tree bounds.
     */
    BTree.prototype.getItem = function (index) {
        if (index < 0 || index > this.size - 1)
            return undefined;
        var key = this.minimum();
        for (var i = 0; i < index; i++)
            key = this.successor(key);
        return this.search(key);
    };
    ;
    return BTree;
}(Aggregate));
/**
 * Created by Stefano on 06/04/2014.
 */
var BTreeIterator = /** @class */ (function () {
    /**
     * Class that implements the iterator for a binary search tree.
     * @param aggregate {BTree} The aggregate to scan.
     * @constructor
     */
    function BTreeIterator(aggregate) {
        /**
         * The pointer to the position.
         * @type {number}
         */
        this.pointer = null;
        this.aggregate = aggregate;
    }
    /**
     * @inheritDoc
     */
    BTreeIterator.prototype.first = function () {
        this.pointer = this.aggregate.minimumKey();
    };
    ;
    /**
     * @inheritDoc
     */
    BTreeIterator.prototype.next = function () {
        this.pointer = this.aggregate.successor(this.pointer);
    };
    /**
     * @inheritDoc
     */
    BTreeIterator.prototype.last = function () {
        this.pointer = this.aggregate.maximumKey();
    };
    ;
    /**
     * @inheritDoc
     */
    BTreeIterator.prototype.previous = function () {
        this.pointer = this.aggregate.predecessor(this.pointer);
    };
    ;
    /**
     * @inheritDoc
     */
    BTreeIterator.prototype.isDone = function () {
        return this.pointer === null;
    };
    ;
    /**
     * @inheritDoc
     */
    BTreeIterator.prototype.getItem = function () {
        return this.aggregate.search(this.pointer);
    };
    ;
    /**
     * Return the key stored at the position pointed by the iterator.
     * @abstract
     * @return {number} The key stored or null if it's out of the bounds.
     */
    BTreeIterator.prototype.getKey = function () {
        return this.pointer;
    };
    ;
    return BTreeIterator;
}());
/**
 * Created by Stefano on 31/03/14.
 */
var CircularBuffer = /** @class */ (function (_super) {
    __extends(CircularBuffer, _super);
    /**
     * Class for managing a circular buffer.
     * @param size {Number} The size of the buffer.
     * @constructor
     */
    function CircularBuffer(size) {
        var _this = _super.call(this) || this;
        /**
         * The index of the position of the head of the buffer.
         * @type {number}
         */
        _this.head = 0;
        /**
         * The index of the position of the tail of the buffer.
         * @type {number}
         */
        _this.tail = 0;
        /**
         * The items stored in the buffer.
         * @type {Array<*>}
         */
        _this.items = [];
        /**
         * Is true if buffer is empty, false otherwise.
         * @type {boolean}
         */
        _this.empty = true;
        /**
         * Is false if buffer is full, false otherwise.
         * @type {boolean}
         */
        _this.full = false;
        _this.size = size;
        _this.items.length = size;
        return _this;
    }
    /**
     * @inheritDoc
     */
    CircularBuffer.prototype.getIterator = function () {
        return new CircularBufferIterator(this);
    };
    ;
    /**
     * Write the item at the head of the buffer.
     * @param item {*} The item to write.
     * @return {void}
     */
    CircularBuffer.prototype.write = function (item) {
        this.empty = false;
        if (this.full)
            //if buffer is full tail must be set forward
            this.tail = (this.tail + 1) % this.size;
        this.items[this.head] = item;
        //head is set forward
        this.head = (this.head + 1) % this.size;
        if (this.tail === this.head)
            this.full = true;
    };
    ;
    /**
     * Free the buffer between indexes from and to.
     * If from > to, positions between from and the end of the buffer and between the start and to will be free.
     * @param from {Number} The index from which start to free (inclusive index)
     * @param to {Number} The index where stop to free (exclusive index)
     * @return {void}
     */
    CircularBuffer.prototype.free = function (from, to) {
        if (from < 0)
            from = 0;
        if (from > this.size - 1)
            from = this.size - 1;
        if (to < 0)
            to = 0;
        if (to > this.size - 1)
            to = this.size - 1;
        //if from < to then will be free allocation between from and to
        //otherwise will be free allocations between from and the end and between the start and to
        for (var i = from; i < to; i = (i + 1) % this.size)
            delete this.items[i];
        //adjust the position of the tail and of the head
        if (this.tail > from - 1 || this.tail < to)
            if (this.tail < this.head) {
                this.tail = (from - 1) % this.size;
            }
            else {
                this.tail = to;
            }
        if (this.head > from || this.head < to)
            if (this.tail < this.head) {
                this.head = to;
            }
            else {
                this.head = from;
            }
        //check if something is free
        if (from !== to)
            this.full = false;
        //free could make buffer empty
        for (var j = 0; j < this.size; j++)
            if (this.items[j] !== undefined) {
                this.empty = false;
                return;
            }
        this.empty = true;
    };
    ;
    /**
     * Free all the buffer.
     * @return {void}
     */
    CircularBuffer.prototype.freeAll = function () {
        for (var i = 0; i < this.size; i++)
            delete this.items[i];
        this.empty = true;
        this.head = 0;
        this.tail = 0;
    };
    ;
    /**
     * Read the item stored at the position index.
     * @param index {Number} The position of the item to read.
     * @return {*} The item read.
     */
    CircularBuffer.prototype.read = function (index) {
        return this.items[index % this.size];
    };
    ;
    /**
     * Return true if the buffer is empty, false otherwise.
     * @return {boolean}
     */
    CircularBuffer.prototype.isEmpty = function () {
        return this.empty;
    };
    ;
    /**
     * Return true if the buffer is full, false otherwise.
     * @return {boolean}
     */
    CircularBuffer.prototype.isFull = function () {
        return this.full;
    };
    ;
    /**
     * Clones the circular buffer into a new circular buffer.
     * @return {CircularBuffer} The circular buffer cloned from this circular buffer.
     */
    CircularBuffer.prototype.clone = function () {
        var buffer = new CircularBuffer(this.size);
        buffer.head = this.head;
        buffer.tail = this.tail;
        for (var i = 0; i < this.items.length; i++)
            buffer.items[i] = this.items[i];
        buffer.empty = this.empty;
        buffer.full = this.full;
        return buffer;
    };
    ;
    /**
     * Resize the buffer.
     * @param size {number} The new size of the buffer.
     * @return {void}
     */
    CircularBuffer.prototype.resize = function (size) {
        if (this.size < size) {
            if (this.head < this.tail + 1) {
                for (var i = 0; i < this.head; i++) {
                    this.items[(i + this.size) % size] = this.items[i];
                    delete this.items[i];
                }
                this.head = (this.head + this.size) % size;
            }
        }
        else if (this.size > size) {
            if (this.head < this.tail + 1) {
                //check if the tail is after the size
                var start = size;
                if (this.tail > size - 1) {
                    start = this.tail;
                    this.tail = 0;
                }
                //the items stored must be shift to a valid position
                var step = this.size - start;
                for (var j = this.head - step - 1; j > start - 1 || j < this.head - step; j--) {
                    this.items[(j + step) % this.size] = this.items[j];
                    if (!j)
                        j = this.size;
                }
                this.head = (this.head + step) % this.size;
            }
        }
        this.size = size;
    };
    ;
    return CircularBuffer;
}(Aggregate));
/**
 * Created by Stefano on 06/04/2014.
 */
var CircularBufferIterator = /** @class */ (function () {
    /**
     * Class that implements the iterator for a circular buffer.
     * @param aggregate {CircularBuffer} The aggregate to scan.
     * @constructor
     */
    function CircularBufferIterator(aggregate) {
        /**
         * Discriminator for full buffer
         * @type {bool}
         */
        this.start = true;
        this.aggregate = aggregate;
    }
    /**
     * @inheritDoc
     */
    CircularBufferIterator.prototype.first = function () {
        this.pointer = this.aggregate.tail;
        this.start = true;
    };
    ;
    /**
     * @inheritDoc
     */
    CircularBufferIterator.prototype.next = function () {
        this.pointer = (this.pointer + 1) % this.aggregate.size;
        this.start = false;
    };
    ;
    /**
     * @inheritDoc
     */
    CircularBufferIterator.prototype.last = function () {
        this.pointer = (this.aggregate.head - 1) % this.aggregate.size;
        this.start = true;
    };
    ;
    /**
     * @inheritDoc
     */
    CircularBufferIterator.prototype.previous = function () {
        this.pointer = (this.pointer - 1) % this.aggregate.size;
        this.start = false;
    };
    ;
    /**
     * @inheritDoc
     */
    CircularBufferIterator.prototype.isDone = function () {
        var bl = (this.pointer === this.aggregate.head && !this.start) || (this.pointer === this.aggregate.tail - 1) || this.aggregate.isEmpty();
        return bl;
    };
    ;
    /**
     * @inheritDoc
     */
    CircularBufferIterator.prototype.getItem = function () {
        return this.aggregate.read(this.pointer);
    };
    ;
    return CircularBufferIterator;
}());
