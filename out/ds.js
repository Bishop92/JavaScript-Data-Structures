"use strict";
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
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    /**
     * 集合
     */
    var Aggregate = /** @class */ (function () {
        function Aggregate() {
        }
        return Aggregate;
    }());
    ds.Aggregate = Aggregate;
})(ds || (ds = {}));
/**
 * Created by Stefano on 08/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
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
    ds.BNode = BNode;
    var BTree = /** @class */ (function (_super) {
        __extends(BTree, _super);
        /**
         * Class for managing a B-Tree.
         * @param minimumDegree {number} The minimum number of keys of a node.
         * @constructor
         */
        function BTree(minimumDegree) {
            if (minimumDegree === void 0) { minimumDegree = 0; }
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
            return new ds.BTreeIterator(this);
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
            var brother = null;
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
            while (key !== -1 && !callback(this.search(key)))
                key = this.successor(key);
            return key !== -1;
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
                    return -1;
                else
                    return node.keys[i];
            }
            //if it's not a leaf check if the successor is in the i-child
            var successor = this.successor(key, node.childs[i]);
            //if it's not in the child and has been found a key then return it
            if (successor === -1 && i < node.keys.length)
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
                    return -1;
                else
                    return node.keys[i];
            }
            var predecessor = this.predecessor(key, node.childs[i + 1]);
            if (predecessor === -1 && key > node.keys[0]) {
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
            return -1;
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
            return -1;
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
            while (key !== -1) {
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
            while (key !== -1) {
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
            while (key !== -1) {
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
    }(ds.Aggregate));
    ds.BTree = BTree;
})(ds || (ds = {}));
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
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
            this.pointer = -1;
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
            return this.pointer === -1;
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
    ds.BTreeIterator = BTreeIterator;
})(ds || (ds = {}));
/**
 * Created by Stefano on 05/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
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
    ds.BSNode = BSNode;
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
            return new ds.BSTreeIterator(this);
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
    }(ds.Aggregate));
    ds.BSTree = BSTree;
})(ds || (ds = {}));
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
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
    ds.BSTreeIterator = BSTreeIterator;
})(ds || (ds = {}));
/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
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
            return new ds.CircularBufferIterator(this);
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
    }(ds.Aggregate));
    ds.CircularBuffer = CircularBuffer;
})(ds || (ds = {}));
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
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
    ds.CircularBufferIterator = CircularBufferIterator;
})(ds || (ds = {}));
/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var DLLNode = /** @class */ (function () {
        /**
         * The single node of the list.
         * @param item {*} The item to store in the node.
         * @constructor
         */
        function DLLNode(item) {
            /**
             * The next node. It's null if there's no a next node.
             * @type {DLLNode|null}
             */
            this.next = null;
            /**
             * The previous node. It's null if there's no a previous node.
             * @type {DLLNode|null}
             */
            this.previous = null;
            this.item = item;
        }
        return DLLNode;
    }());
    ds.DLLNode = DLLNode;
    var DoubleLinkedList = /** @class */ (function (_super) {
        __extends(DoubleLinkedList, _super);
        /**
         * Class for managing a double linked list.
         * @param {...*} [args] The items for initializing the list.
         * @constructor
         */
        function DoubleLinkedList() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            /**
             * The first node of the list.
             * @type {DLLNode|null}
             */
            _this.first = null;
            /**
             * The last node of the list.
             * @type {DLLNode|null}
             */
            _this.last = null;
            /**
             * The length of the list.
             * @type {number}
             */
            _this.length = 0;
            if (args && args.length == 1 && args[0] instanceof Array) {
                //builds the list from the range passed from the constructor
                _this.fromArray(args[0]);
            }
            else {
                //builds the list from the parameters of the constructor
                _this.fromArray(arguments);
            }
            return _this;
        }
        /**
         * @inheritDoc
         */
        DoubleLinkedList.prototype.getIterator = function () {
            return new ds.DoubleLinkedListIterator(this);
        };
        ;
        /**
         * Add an item at the head of the list.
         * @param item {*} The item to add.
         * @return {void}
         */
        DoubleLinkedList.prototype.pushFront = function (item) {
            var node = new DLLNode(item);
            node.next = this.first;
            this.first = node;
            //link the next node to the new node
            if (node.next)
                node.next.previous = node;
            else
                this.last = node;
            this.length++;
        };
        ;
        /**
         * Add an item at the tail of the list.
         * @param item {*} The item to add.
         * @return {void}
         */
        DoubleLinkedList.prototype.pushBack = function (item) {
            var node = new DLLNode(item);
            node.previous = this.last;
            this.last = node;
            //link the previous node to the new node
            if (node.previous)
                node.previous.next = node;
            else
                this.first = node;
            this.length++;
        };
        ;
        /**
         * Remove the first item of the list.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        DoubleLinkedList.prototype.popFront = function () {
            if (this.length) {
                var node = this.first;
                this.first = node.next;
                if (node.next)
                    node.next.previous = null;
                this.length--;
                node.next = null;
                return node.item;
            }
            return undefined;
        };
        ;
        /**
         * Remove the last item of the list.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        DoubleLinkedList.prototype.popBack = function () {
            if (this.length) {
                var node = this.last;
                this.last = node.previous;
                if (node.previous)
                    node.previous.next = null;
                this.length--;
                node.previous = null;
                return node.item;
            }
            return undefined;
        };
        ;
        /**
         * Removes the first times items of the list.
         * @param times {number} The number of times to repeat the popFront method.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        DoubleLinkedList.prototype.multiPopFront = function (times) {
            var result = [];
            for (var i = 0; i < times && this.length; i++)
                result.push(this.popFront());
            return result;
        };
        ;
        /**
         * Removes the last times items of the list.
         * @param times {number} The number of times to repeat the popBack method.
         * @return {*} The items removed.
         */
        DoubleLinkedList.prototype.multiPopBack = function (times) {
            var result = [];
            for (var i = 0; i < times && this.length; i++)
                result.push(this.popBack());
            return result;
        };
        ;
        /**
         * Returns the first item of the list without remove it.
         * @return {*} The item at the top of the list. It's undefined if the list is empty.
         */
        DoubleLinkedList.prototype.peek = function () {
            if (!this.length)
                return undefined;
            return this.first.item;
        };
        ;
        /**
         * Add the item at the index position.
         * @param item {*} The item to add.
         * @param index {number} The position where to add the item. If index is negative, the item won't be added.
         * @return {void}
         */
        DoubleLinkedList.prototype.addAt = function (item, index) {
            if (index < 0)
                return;
            if (!index) {
                this.pushFront(item);
                return;
            }
            if (index === this.length) {
                this.pushBack(item);
                return;
            }
            var node = this.first;
            if (!node && index > 0)
                this.pushBack(undefined);
            for (var i = 0; i < index - 1; i++, node = node.next) {
                if (node === this.last)
                    this.pushBack(undefined);
            }
            if (node === this.last)
                this.pushBack(item);
            else if (node === this.first)
                this.pushFront(item);
            else {
                var newNode = new DLLNode(item);
                newNode.next = node.next;
                newNode.previous = node;
                node.next = newNode;
                if (newNode.next)
                    newNode.next.previous = newNode;
                this.length++;
            }
        };
        ;
        /**
         * Remove the item at the position index.
         * @param index {Number} The position of the item to remove.
         * @return {*} The item stored at the position index. It's undefined if the index is out of bounds.
         */
        DoubleLinkedList.prototype.removeAt = function (index) {
            if (index < 0 || index > this.length - 1)
                return undefined;
            if (index === 0)
                return this.popFront();
            if (index === this.length - 1)
                return this.popBack();
            var node = this.first;
            for (; index > 0; index--)
                node = node.next;
            //now node is the node to remove
            node.previous.next = node.next;
            node.next.previous = node.previous;
            node.next = null;
            node.previous = null;
            this.length--;
            return node.item;
        };
        ;
        /**
         * Removes the item from the list.
         * @param item {*} The item to remove.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {void}
         */
        DoubleLinkedList.prototype.remove = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var node = this.first;
            var previous = null;
            while (node) {
                if (callback(node.item)) {
                    if (node === this.first)
                        this.first = node.next;
                    if (node === this.last)
                        this.last = previous;
                    if (previous) {
                        previous.next = node.next;
                        if (node.next)
                            node.next.previous = previous;
                    }
                    return;
                }
                previous = node;
                node = node.next;
            }
        };
        ;
        /**
         * Removes all the item from the list.
         * @param item {*} The item to remove.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {void}
         */
        DoubleLinkedList.prototype.removeAll = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var node = this.first;
            var previous = null;
            while (node) {
                if (callback(node.item)) {
                    if (node === this.first)
                        this.first = node.next;
                    if (node === this.last)
                        this.last = previous;
                    if (previous) {
                        previous.next = node.next;
                        if (node.next)
                            node.next.previous = previous;
                    }
                }
                else
                    previous = node;
                node = node.next;
            }
        };
        ;
        /**
         * Removes all the items stored from the from position to the to position.
         * If from > to, the method will remove all the items up to the end.
         * @param from {number} The position where start to remove the items. The from position is included.
         * @param to {number} The position where stop to remove the items. The to position is included.
         * @return {Array<*>} The items removed.
         */
        DoubleLinkedList.prototype.removeSegment = function (from, to) {
            var result = [];
            if (to > -1 && from < this.length) {
                if (from === 0)
                    return this.multiPopFront(to + 1);
                if (to === this.length - 1 || from > to)
                    return this.multiPopBack(Math.max(to - from, this.length - from)).reverse();
                var node = this.first;
                for (var i = 0; i < from - 1; i++)
                    node = node.next;
                //now node is the node before the node to remove
                //node to remove
                var next = node.next;
                for (var j = from; j < to + 1 && j < this.length; j++) {
                    result.push(next.item);
                    next = next.next;
                }
                this.length -= Math.min(to - from + 1, this.length - from);
                node.next = next;
                next.previous = node;
            }
            return result;
        };
        ;
        /**
         * Change the item stored in the index position. If the index is out of bound, the node won't be updated.
         * @param index {number} The position of the node to modify.
         * @param item {*} The new item stored in the node.
         * @return {void}
         */
        DoubleLinkedList.prototype.modifyAt = function (index, item) {
            var node = this.getNode(index);
            if (node)
                node.item = item;
        };
        ;
        /**
         * Removes all the items stored in the list.
         * @return {void}
         */
        DoubleLinkedList.prototype.clear = function () {
            this.first = null;
            this.last = null;
            this.length = 0;
        };
        ;
        /**
         * Checks if the list contains an item that satisfy the condition represented by the callback function.
         * @param item {*} The item to find.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {boolean} True if the list contains the item that satisfy the condition, false otherwise.
         */
        DoubleLinkedList.prototype.contains = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = 0;
            var node = this.first;
            while (i < this.length && !callback(node.item)) {
                i++;
                node = node.next;
            }
            return i < this.length;
        };
        ;
        /**
         * Executes the callback function for each item of the stack.
         * This method modifies the list so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        DoubleLinkedList.prototype.execute = function (callback) {
            var node = this.first;
            while (node) {
                node.item = callback(node.item);
                node = node.next;
            }
        };
        ;
        /**
         * Delete the node from the list.
         * @param node {DLLNode} The node to delete.
         * @return {void}
         */
        DoubleLinkedList.prototype.deleteNode = function (node) {
            if (node === this.first) {
                this.popFront();
                return;
            }
            if (node === this.last) {
                this.popBack();
                return;
            }
            node.previous.next = node.next;
            node.next.previous = node.previous;
            this.length--;
        };
        ;
        /**
         * Get the node at the position index relative from the node.
         * @param index {Number} The index, relative to the node, of the node to return.
         * @param [node = first] {DLLNode} The node from which start the search.
         * @return {DLLNode} The node at the position index.
         */
        DoubleLinkedList.prototype.getNode = function (index, node) {
            if (index < 0 || index > this.length - 1)
                return undefined;
            var m = Math.floor(this.length / 2);
            //if the index is less than the middle, the search start from the head of the list, otherwise from the tail of the list
            if (index < m || node) {
                node = node || this.first;
                for (; index > 0; index--)
                    node = node.next;
            }
            else
                for (index = this.length - index - 1, node = this.last; index > 0; index--)
                    node = node.previous;
            return node;
        };
        ;
        /**
         * Get the item at the position index.
         * @param index {Number} The position of the item.
         * @return {*}. It's undefined if index isn't in the queue bounds.
         */
        DoubleLinkedList.prototype.getItem = function (index) {
            if (index < 0 || index > this.length - 1)
                return undefined;
            var node;
            var m = Math.floor(this.length / 2);
            if (index < m)
                for (node = this.first; index > 0; index--)
                    node = node.next;
            else
                for (index = this.length - index - 1, node = this.last; index > 0; index--)
                    node = node.previous;
            return node.item;
        };
        ;
        /**
         * Sort the list.
         * @param [callback = function(item){return(item);}] {function} The function invoked in order to get the value for the evaluation of the sort criteria.
         * @example
         * callback = function(item) {return -item.key;}
         * This function callback will return the opposite of the attribute key of the item. In this case the list will be sorted in descending order.
         * @return {void}
         */
        DoubleLinkedList.prototype.sort = function (callback) {
            if (!callback)
                callback = function (item) {
                    return item;
                };
            var outerThis = this;
            function partialSort(from, to, fromNode, toNode) {
                if (from < to) {
                    var m = Math.floor((from + to) / 2);
                    var mNode = outerThis.getNode(m - from, fromNode);
                    partialSort(from, m, fromNode, mNode);
                    partialSort(m + 1, to, mNode.next, toNode);
                    merge(from, m, to, fromNode);
                }
            }
            function merge(from, m, to, fromNode) {
                var left = [];
                var right = [];
                var node = fromNode;
                for (var i = 0; i < m - from + 1; i++, node = node.next)
                    left[i] = node.item;
                for (var j = 0; j < to - m; j++, node = node.next)
                    right[j] = node.item;
                var x = 0, y = 0;
                for (var k = from; k < to + 1; k++, fromNode = fromNode.next) {
                    if (y > to - m - 1 || (callback(left[x]) <= callback(right[y]) && x < m - from + 1)) {
                        fromNode.item = left[x];
                        x++;
                    }
                    else {
                        fromNode.item = right[y];
                        y++;
                    }
                }
            }
            partialSort(0, this.length - 1, this.first, this.last);
        };
        ;
        /**
         * Transform the list into an array.
         * @return {Array<*>} The array built.
         */
        DoubleLinkedList.prototype.toArray = function () {
            var array = [];
            for (var node = this.first, i = 0; node; node = node.next, i++)
                array[i] = node.item;
            return array;
        };
        ;
        /**
         * Returns the length of the list.
         * @return {Number} The length of the list.
         */
        DoubleLinkedList.prototype.getLength = function () {
            return this.length;
        };
        ;
        /**
         * Build the list from the array.
         * @param array {Array<*>} The array from which build the list.
         * @return {void}
         */
        DoubleLinkedList.prototype.fromArray = function (array) {
            var node = this.first;
            for (var i = 0; i < Math.min(this.length, array.length); i++, node = node.next)
                node.item = array[i];
            if (this.length < array.length)
                for (var j = this.length; j < array.length; j++)
                    this.pushBack(array[j]);
            else
                for (var k = array.length; k < this.length;)
                    this.popBack();
        };
        ;
        /**
         * Return the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<Object>} The array that contains the items that satisfy the condition.
         */
        DoubleLinkedList.prototype.filter = function (callback) {
            var result = [];
            for (var node = this.first; node; node = node.next) {
                if (callback(node.item))
                    result.push(node.item);
            }
            return result;
        };
        ;
        /**
         * Reverse the list. This method reverses only the items, not the nodes.
         * @return {void}
         */
        DoubleLinkedList.prototype.reverse = function () {
            for (var start = this.first, end = this.last; start !== end && start.previous !== end; start = start.next, end = end.previous) {
                var item = start.item;
                start.item = end.item;
                end.item = item;
            }
        };
        ;
        /**
         * Checks if the list is empty.
         * @return {boolean} True if the list is empty, false otherwise.
         */
        DoubleLinkedList.prototype.isEmpty = function () {
            return !this.length;
        };
        ;
        /**
         * Returns the first position of the item in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        DoubleLinkedList.prototype.indexOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = 0;
            var node = this.first;
            while (node) {
                if (callback(node.item))
                    return i;
                i++;
                node = node.next;
            }
            return -1;
        };
        ;
        /**
         * Returns the last position of the item in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        DoubleLinkedList.prototype.lastIndexOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = this.length - 1;
            var node = this.last;
            while (node) {
                if (callback(node.item))
                    return i;
                i--;
                node = node.previous;
            }
            return -1;
        };
        ;
        /**
         * Returns all the position in which the item has been found in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        DoubleLinkedList.prototype.allIndexesOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = 0;
            var node = this.first;
            var indexes = [];
            while (node) {
                if (callback(node.item))
                    indexes.push(i);
                i++;
                node = node.next;
            }
            return indexes;
        };
        ;
        /**
         * Add the list at the end of this list.
         * @param list {DoubleLinkedList} The list to join.
         * @return {void}
         */
        DoubleLinkedList.prototype.join = function (list) {
            if (this.last)
                this.last.next = list.first;
            else
                this.first = list.first;
            if (list.first)
                list.first.previous = this.last;
            this.last = list.last;
            this.length += list.length;
        };
        ;
        /**
         * Divides the list at the index position. The node at the index position is the first new node of the list.
         * @param index {number} The position where to divide the list.
         * @return {DoubleLinkedList} The list formed by the nodes from the index position then. If the index is out of bound, the list will be empty.
         */
        DoubleLinkedList.prototype.divide = function (index) {
            var list = new DoubleLinkedList();
            if (index > -1 && index < this.length) {
                var node = this.first;
                var previous = null;
                for (var i = 0; i < index; i++) {
                    previous = node;
                    node = node.next;
                }
                if (node === this.first) {
                    list.first = this.first;
                    list.last = this.last;
                    this.first = null;
                    this.last = null;
                }
                else {
                    list.first = node;
                    list.last = this.last;
                    this.last = previous;
                    previous.next = null;
                    node.previous = null;
                }
                list.length = this.length - index;
                this.length = index;
            }
            return list;
        };
        ;
        /**
         * Clones the list into a new list.
         * @return {DoubleLinkedList} The list cloned from this list.
         */
        DoubleLinkedList.prototype.clone = function () {
            var list = new DoubleLinkedList();
            var node = this.first;
            for (var i = 0; i < this.length; i++, node = node.next)
                if (node.item.clone)
                    list.pushBack(node.item.clone());
                else
                    list.pushBack(node.item);
            return list;
        };
        ;
        /**
         * Clones the list into a new list without cloning duplicated items.
         * @return {DoubleLinkedList} The list cloned from this list.
         */
        DoubleLinkedList.prototype.cloneDistinct = function () {
            var list = new DoubleLinkedList();
            var node = this.first;
            for (var i = 0; i < this.length; i++, node = node.next)
                if (!list.contains(node.item))
                    if (node.item.cloneDistinct)
                        list.pushBack(node.item.cloneDistinct());
                    else if (node.item.clone)
                        list.pushBack(node.item.clone());
                    else
                        list.pushBack(node.item);
            return list;
        };
        ;
        /**
         * Splits the list into lists of desired size.
         * @param size {number} The size of the lists.
         * @return {Array<DoubleLinkedList>} The lists created by splitting the list.
         */
        DoubleLinkedList.prototype.split = function (size) {
            var length = this.length;
            var lists = [this];
            for (var i = size; i < length; i += size)
                lists.push(lists[lists.length - 1].divide(size));
            return lists;
        };
        ;
        /**
         * Returns the number of items that satisfy the represented by the callback function.
         * @param callback {function} The condition to satisfy.
         * @return {number} The number of items that satisfy the condition.
         */
        DoubleLinkedList.prototype.count = function (callback) {
            var count = 0;
            var node = this.first;
            while (node) {
                if (callback(node.item))
                    count++;
                node = node.next;
            }
            return count;
        };
        ;
        return DoubleLinkedList;
    }(ds.Aggregate));
    ds.DoubleLinkedList = DoubleLinkedList;
})(ds || (ds = {}));
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var DoubleLinkedListIterator = /** @class */ (function () {
        /**
         * Class that implements the iterator for a double linked list.
         * @param aggregate {DoubleLinkedList} The aggregate to scan.
         * @constructor
         */
        function DoubleLinkedListIterator(aggregate) {
            /**
             * The pointer to the position.
             * @type {Node|null}
             */
            this.pointer = null;
            this.aggregate = aggregate;
        }
        /**
         * @inheritDoc
         */
        DoubleLinkedListIterator.prototype.first = function () {
            this.pointer = this.aggregate.first;
        };
        ;
        /**
         * @inheritDoc
         */
        DoubleLinkedListIterator.prototype.next = function () {
            this.pointer = this.pointer.next;
        };
        ;
        /**
         * @inheritDoc
         */
        DoubleLinkedListIterator.prototype.last = function () {
            this.pointer = this.aggregate.last;
        };
        ;
        /**
         * @inheritDoc
         */
        DoubleLinkedListIterator.prototype.previous = function () {
            this.pointer = this.pointer.previous;
        };
        ;
        /**
         * @inheritDoc
         */
        DoubleLinkedListIterator.prototype.isDone = function () {
            return !this.pointer;
        };
        ;
        /**
         * @inheritDoc
         */
        DoubleLinkedListIterator.prototype.getItem = function () {
            return this.pointer.item;
        };
        ;
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {Node|null} The node stored or null if it's out of the bounds.
         */
        DoubleLinkedListIterator.prototype.getNode = function () {
            return this.pointer;
        };
        ;
        return DoubleLinkedListIterator;
    }());
    ds.DoubleLinkedListIterator = DoubleLinkedListIterator;
})(ds || (ds = {}));
/**
 * Created by Stefano on 05/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var HashTable = /** @class */ (function () {
        /**
         * Class for managing an hash table.
         * @param size {number} The size of the table.
         * @constructor
         */
        function HashTable(size) {
            this.p = 1000;
            this.a = Math.floor(Math.random() * this.p);
            this.b = Math.floor(Math.random() * this.p);
            /**
             * The items stored in the hash table.
             * @type {Array<DoubleLinkedList>}
             */
            this.items = [];
            /**
             * The number of keys stored in the hash table.
             * @type {number}
             */
            this.keyLength = 0;
            this.size = size;
            this.p = 1000;
            this.a = Math.floor(Math.random() * this.p);
            this.b = Math.floor(Math.random() * this.p);
            this.hash = function (key) {
                return ((this.a * key + this.b) % this.p) % this.size;
            };
            this.items = [];
            this.keyLength = 0;
            this.clear();
        }
        /**
         * Stores the item with its key.
         * @param key {number} The key relatives to the item.
         * @param item {*} The item to store.
         */
        HashTable.prototype.insert = function (key, item) {
            this.keyLength++;
            this.items[this.hash(key)].pushBack({ key: key, item: item });
        };
        ;
        /**
         * Deletes the first item relatives to the key value.
         * @param key {number} The key to delete.
         * @return {void}
         */
        HashTable.prototype.deleteKey = function (key) {
            var list = this.items[this.hash(key)];
            var it = list.getIterator();
            for (it.first(); !it.isDone() && it.getItem().key !== key;)
                it.next();
            if (!it.isDone()) {
                list.deleteNode(it.getNode());
                this.keyLength--;
            }
        };
        ;
        /**
         * Deletes all the items relative to the key value.
         * @param key {number} The key to delete.
         * @return {void}
         */
        HashTable.prototype.deleteAllKey = function (key) {
            var list = this.items[this.hash(key)];
            var it = list.getIterator();
            var keysRemoved = 0;
            for (it.first(); !it.isDone(); it.next())
                if (it.getItem().key === key) {
                    list.deleteNode(it.getNode());
                    keysRemoved++;
                }
            this.keyLength -= keysRemoved;
        };
        ;
        /**
         * Searches the item relative to the key value.
         * @param key {number} The key of the item to search.
         * @return {*|undefined} The item found or undefined if the key does not exist.
         */
        HashTable.prototype.search = function (key) {
            var list = this.items[this.hash(key)];
            var it = list.getIterator();
            for (it.first(); !it.isDone(); it.next())
                if (it.getItem().key === key)
                    return it.getItem().item;
            return undefined;
        };
        ;
        /**
         * Checks if the hash table contains a key that satisfy the condition represented by the callback function.
         * @param key {number} The key to find.
         * @param [callback = function(k){return(k===key);}] The condition to satisfy. The callback must accept the current key to check.
         * @return {boolean} True if the hash table contains the key that satisfy the condition, false otherwise.
         */
        HashTable.prototype.containsKey = function (key, callback) {
            callback = callback || function (k) {
                return k === key;
            };
            var list = this.items[this.hash(key)];
            var it = list.getIterator();
            for (it.first(); !it.isDone(); it.next())
                if (callback(it.getItem().key))
                    return true;
            return false;
        };
        ;
        /**
         * Searches all the items relative to the key value.
         * @param key {number} The key of the items to search.
         * @return {Array.<*>} An array with the items found.
         */
        HashTable.prototype.searchAll = function (key) {
            var list = this.items[this.hash(key)];
            var it = list.getIterator();
            var array = [];
            for (it.first(); !it.isDone(); it.next())
                if (it.getItem().key === key)
                    array.push(it.getItem().item);
            return array;
        };
        ;
        /**
         * Returns the keys stored in the hash table.
         * @return {Array<number>} The keys stored in the table.
         */
        HashTable.prototype.getKeys = function () {
            var keys = [];
            for (var i = 0; i < this.size; i++) {
                var it = this.items[i].getIterator();
                for (it.first(); !it.isDone(); it.next())
                    keys.push(it.getItem().key);
            }
            return keys;
        };
        ;
        /**
         * Returns the items stored in the hash table.
         * @return {Array<*>} The items stored in the table.
         */
        HashTable.prototype.getItems = function () {
            var items = [];
            for (var i = 0; i < this.size; i++) {
                var it = this.items[i].getIterator();
                for (it.first(); !it.isDone(); it.next())
                    items.push(it.getItem().item);
            }
            return items;
        };
        ;
        /**
         * Removes all the keys and the items stored in the hash table.
         * @return {void}
         */
        HashTable.prototype.clear = function () {
            this.items = [];
            for (var i = 0; i < this.size; i++)
                this.items[i] = new ds.DoubleLinkedList();
            this.keyLength = 0;
        };
        ;
        /**
         * Returns the number of keys stored in the hash table.
         * @return {number} The number of keys stored.
         */
        HashTable.prototype.getNumberOfKeys = function () {
            return this.keyLength;
        };
        ;
        /**
         * Checks if the hash table is empty.
         * @return {boolean} True if the hash table is empty, false otherwise.
         */
        HashTable.prototype.isEmpty = function () {
            return !this.keyLength;
        };
        ;
        /**
         * Executes the callback function for each item of the hash table.
         * This method modifies the hash table so if you don't need to modify it you must return the same item stored.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        HashTable.prototype.execute = function (callback) {
            for (var i = 0; i < this.size; i++)
                this.items[i].execute(callback);
        };
        ;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        HashTable.prototype.filter = function (callback) {
            var result = [];
            for (var i = 0; i < this.size; i++)
                result.concat(this.items[i].filter(callback));
            return result;
        };
        ;
        /**
         * Returns the size of the hash table.
         * @return {number} The size of the hash table.
         */
        HashTable.prototype.getSize = function () {
            return this.size;
        };
        ;
        /**
         * Clones the hash table into a new hash table.
         * @return {HashTable} The hash table cloned from this hash table.
         */
        HashTable.prototype.clone = function () {
            var table = new HashTable(this.size);
            for (var i = 0; i < this.size; i++)
                for (var node = this.items[i].first; node; node = node.next)
                    table.insert(node.key, node.item);
            return table;
        };
        ;
        return HashTable;
    }());
    ds.HashTable = HashTable;
})(ds || (ds = {}));
/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var LLNode = /** @class */ (function () {
        /**
         * The single node of the list.
         * @param item {*} The item to store in the node.
         * @constructor
         */
        function LLNode(item) {
            /**
             * The next node. It's null if there's no a next node.
             * @type {LLNode|null}
             */
            this.next = null;
            this.item = item;
        }
        return LLNode;
    }());
    ds.LLNode = LLNode;
    var LinkedList = /** @class */ (function (_super) {
        __extends(LinkedList, _super);
        /**
         * Class for managing a linked list.
         * @param {...*} [args] The items for initializing the list.
         * @constructor
         */
        function LinkedList() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            /**
             * The first node of the list.
             * @type {LLNode|null}
             */
            _this.first = null;
            /**
             * The last node of the list.
             * @type {LLNode|null}
             */
            _this.last = null;
            /**
             * The length of the list.
             * @type {number}
             */
            _this.length = 0;
            _this.first = null;
            _this.last = null;
            _this.length = 0;
            if (args && args.length == 1 && args[0] instanceof Array) {
                //builds the list from the range passed from the constructor
                _this.fromArray(args[0]);
            }
            else {
                //builds the list from the parameters of the constructor
                _this.fromArray(arguments);
            }
            return _this;
        }
        /**
         * @inheritDoc
         */
        LinkedList.prototype.getIterator = function () {
            return new ds.LinkedListIterator(this);
        };
        ;
        /**
         * Adds an item at the head of the list.
         * @param item {*} The item to add.
         * @return {void}
         */
        LinkedList.prototype.pushFront = function (item) {
            var node = new LLNode(item);
            node.next = this.first;
            this.first = node;
            if (!this.last)
                this.last = node;
            this.length++;
        };
        ;
        /**
         * Adds an item at the tail of the list.
         * @param item {*} The item to add.
         * @return {void}
         */
        LinkedList.prototype.pushBack = function (item) {
            var node = new LLNode(item);
            if (this.last)
                this.last.next = node;
            else
                this.first = node;
            this.last = node;
            this.length++;
        };
        ;
        /**
         * Removes the first item of the list.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        LinkedList.prototype.popFront = function () {
            if (this.length) {
                var node = this.first;
                this.first = this.first.next;
                this.length--;
                node.next = null;
                return node.item;
            }
            return undefined;
        };
        ;
        /**
         * Removes the last item of the list.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        LinkedList.prototype.popBack = function () {
            if (this.length) {
                var node = this.last;
                var next = this.first;
                while (next.next && next.next.next) {
                    next = next.next;
                }
                if (node === next)
                    this.last = null;
                else
                    this.last = next;
                next.next = null;
                this.length--;
                return node.item;
            }
            return undefined;
        };
        ;
        /**
         * Removes the first times items of the list.
         * @param times {number} The number of times to repeat the popFront method.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        LinkedList.prototype.multiPopFront = function (times) {
            var result = [];
            for (var i = 0; i < times && this.length; i++)
                result.push(this.popFront());
            return result;
        };
        ;
        /**
         * Removes the last times items of the list.
         * @param times {number} The number of times to repeat the popBack method.
         * @return {*} The items removed.
         */
        LinkedList.prototype.multiPopBack = function (times) {
            var result = [];
            for (var i = 0; i < times && this.length; i++)
                result.push(this.popBack());
            return result;
        };
        ;
        /**
         * Returns the first item of the list without remove it.
         * @return {*} The item at the top of the list. It's undefined if the list is empty.
         */
        LinkedList.prototype.peek = function () {
            if (!this.length)
                return undefined;
            return this.first.item;
        };
        ;
        /**
         * Add the item at the index position.
         * @param item {*} The item to add.
         * @param index {number} The position where to add the item. If index is negative, the item won't be added.
         * @return {void}
         */
        LinkedList.prototype.addAt = function (item, index) {
            if (index < 0)
                return;
            if (!index) {
                this.pushFront(item);
                return;
            }
            if (index === this.length) {
                this.pushBack(item);
                return;
            }
            var node = this.first;
            if (!node && index > 0)
                this.pushBack(undefined);
            for (var i = 0; i < index - 1; i++, node = node.next) {
                if (node === this.last)
                    this.pushBack(undefined);
            }
            if (node === this.last)
                this.pushBack(item);
            else if (node === this.first)
                this.pushFront(item);
            else {
                var newNode = new LLNode(item);
                newNode.next = node.next;
                node.next = newNode;
                this.length++;
            }
        };
        ;
        /**
         * Removes the item at the index position.
         * @param index {number} The position of the item to remove.
         * @return {*} The item stored at the position index. It's undefined if the index is out of bounds.
         */
        LinkedList.prototype.removeAt = function (index) {
            if (index < 0 || index > this.length - 1)
                return undefined;
            if (index === 0)
                return this.popFront();
            if (index === this.length - 1)
                return this.popBack();
            var node = this.first;
            for (; index > 1; index--)
                node = node.next;
            //now node is the node before the node to remove
            //node to remove
            var next = node.next;
            node.next = next.next;
            this.length--;
            return next.item;
        };
        ;
        /**
         * Removes the item from the list.
         * @param item {*} The item to remove.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {void}
         */
        LinkedList.prototype.remove = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var node = this.first;
            var previous = null;
            while (node) {
                if (callback(node.item)) {
                    if (node === this.first)
                        this.first = node.next;
                    if (node === this.last)
                        this.last = previous;
                    if (previous)
                        previous.next = node.next;
                    return;
                }
                previous = node;
                node = node.next;
            }
        };
        ;
        /**
         * Removes all the item from the list.
         * @param item {*} The item to remove.
         * @param [callback (item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {void}
         */
        LinkedList.prototype.removeAll = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var node = this.first;
            var previous = null;
            while (node) {
                if (callback(node.item)) {
                    if (node === this.first)
                        this.first = node.next;
                    if (node === this.last)
                        this.last = previous;
                    if (previous)
                        previous.next = node.next;
                }
                else
                    previous = node;
                node = node.next;
            }
        };
        ;
        /**
         * Removes all the items stored from the from position to the to position.
         * If from > to, the method will remove all the items up to the end.
         * @param from {number} The position where start to remove the items. The from position is included.
         * @param to {number} The position where stop to remove the items. The to position is included.
         * @return {Array<*>} The items removed.
         */
        LinkedList.prototype.removeSegment = function (from, to) {
            var result = [];
            if (to > -1 && from < this.length) {
                if (from === 0)
                    return this.multiPopFront(to + 1);
                if (to === this.length - 1 || from > to)
                    return this.multiPopBack(Math.max(to - from, this.length - from)).reverse();
                var node = this.first;
                for (var i = 0; i < from - 1; i++)
                    node = node.next;
                //now node is the node before the node to remove
                //node to remove
                var next = node.next;
                for (var j = from; j < to + 1 && j < this.length; j++) {
                    result.push(next.item);
                    next = next.next;
                }
                this.length -= Math.min(to - from + 1, this.length - from);
                node.next = next;
            }
            return result;
        };
        ;
        /**
         * Change the item stored in the index position. If the index is out of bound, the node won't be updated.
         * @param index {number} The position of the node to modify.
         * @param item {*} The new item stored in the node.
         * @return {void}
         */
        LinkedList.prototype.modifyAt = function (index, item) {
            var node = this.getNode(index);
            if (node)
                node.item = item;
        };
        ;
        /**
         * Removes all the items stored in the list.
         * @return {void}
         */
        LinkedList.prototype.clear = function () {
            this.first = null;
            this.last = null;
            this.length = 0;
        };
        ;
        /**
         * Checks if the list contains an item that satisfy the condition represented by the callback function.
         * @param item {*} The item to find.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {boolean} True if the list contains the item that satisfy the condition, false otherwise.
         */
        LinkedList.prototype.contains = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = 0;
            var node = this.first;
            while (i < this.length && !callback(node.item)) {
                i++;
                node = node.next;
            }
            return i < this.length;
        };
        ;
        /**
         * Executes the callback function for each item of the stack.
         * This method modifies the list so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        LinkedList.prototype.execute = function (callback) {
            var node = this.first;
            while (node) {
                node.item = callback(node.item);
                node = node.next;
            }
        };
        ;
        /**
         * Returns the node at the position index.
         * @param index {number} The position of the node.
         * @return {LLNode} The node stored at the position index. It's undefined if index isn't in the list bounds.
         */
        LinkedList.prototype.getNode = function (index) {
            if (index < 0 || index > this.length - 1)
                return undefined;
            var node = this.first;
            for (; index > 0; index--)
                node = node.next;
            return node;
        };
        ;
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item stored at the position index. It's undefined if index isn't in the list bounds.
         */
        LinkedList.prototype.getItem = function (index) {
            if (index < 0 || index > this.length - 1)
                return undefined;
            var node = this.first;
            for (; index > 0; index--)
                node = node.next;
            return node.item;
        };
        ;
        /**
         * Transforms the list into an array.
         * @return {Array<*>} The array built.
         */
        LinkedList.prototype.toArray = function () {
            var array = [];
            for (var node = this.first, i = 0; node; node = node.next, i++)
                array[i] = node.item;
            return array;
        };
        ;
        /**
         * Returns the length of the list.
         * @return {Number} The length of the list.
         */
        LinkedList.prototype.getLength = function () {
            return this.length;
        };
        ;
        /**
         * Builds the list from the array.
         * @param array {Array<*>} The array from which build the list.
         * @return {void}
         */
        LinkedList.prototype.fromArray = function (array) {
            var node = this.first;
            for (var i = 0; i < Math.min(this.length, array.length); i++, node = node.next)
                node.item = array[i];
            if (this.length < array.length)
                for (var j = this.length; j < array.length; j++)
                    this.pushBack(array[j]);
            else
                for (var k = array.length; k < this.length;)
                    this.popBack();
        };
        ;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        LinkedList.prototype.filter = function (callback) {
            var result = [];
            for (var node = this.first; node; node = node.next) {
                if (callback(node.item))
                    result.push(node.item);
            }
            return result;
        };
        ;
        /**
         * Checks if the list is empty.
         * @return {boolean} True if the list is empty, false otherwise.
         */
        LinkedList.prototype.isEmpty = function () {
            return !this.length;
        };
        ;
        /**
         * Returns the first position of the item in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        LinkedList.prototype.indexOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = 0;
            var node = this.first;
            while (node) {
                if (callback(node.item))
                    return i;
                i++;
                node = node.next;
            }
            return -1;
        };
        ;
        /**
         * Returns the last position of the item in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        LinkedList.prototype.lastIndexOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = 0;
            var node = this.first;
            var index = -1;
            while (node) {
                if (callback(node.item))
                    index = i;
                i++;
                node = node.next;
            }
            return index;
        };
        ;
        /**
         * Returns all the position in which the item has been found in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        LinkedList.prototype.allIndexesOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = 0;
            var node = this.first;
            var indexes = [];
            while (node) {
                if (callback(node.item))
                    indexes.push(i);
                i++;
                node = node.next;
            }
            return indexes;
        };
        ;
        /**
         * Add the list at the end of this list.
         * @param list {LinkedList} The list to join.
         * @return {void}
         */
        LinkedList.prototype.join = function (list) {
            if (this.last)
                this.last.next = list.first;
            else
                this.first = list.first;
            this.last = list.last;
            this.length += list.length;
        };
        ;
        /**
         * Divides the list at the index position. The node at the index position is the first new node of the list.
         * @param index {number} The position where to divide the list.
         * @return {LinkedList} The list formed by the nodes from the index position then. If the index is out of bound, the list will be empty.
         */
        LinkedList.prototype.divide = function (index) {
            var list = new LinkedList();
            if (index > -1 && index < this.length) {
                var node = this.first;
                var previous = null;
                for (var i = 0; i < index; i++) {
                    previous = node;
                    node = node.next;
                }
                if (node === this.first) {
                    list.first = this.first;
                    list.last = this.last;
                    this.first = null;
                    this.last = null;
                }
                else {
                    list.first = node;
                    list.last = this.last;
                    this.last = previous;
                    previous.next = null;
                }
                list.length = this.length - index;
                this.length = index;
            }
            return list;
        };
        ;
        /**
         * Clones the list into a new list.
         * @return {LinkedList} The list cloned from this list.
         */
        LinkedList.prototype.clone = function () {
            var list = new LinkedList();
            var node = this.first;
            for (var i = 0; i < this.length; i++, node = node.next)
                if (node.item.clone)
                    list.pushBack(node.item.clone());
                else
                    list.pushBack(node.item);
            return list;
        };
        ;
        /**
         * Clones the list into a new list without cloning duplicated items.
         * @return {LinkedList} The list cloned from this list.
         */
        LinkedList.prototype.cloneDistinct = function () {
            var list = new LinkedList();
            var node = this.first;
            for (var i = 0; i < this.length; i++, node = node.next)
                if (!list.contains(node.item))
                    if (node.item.cloneDistinct)
                        list.pushBack(node.item.cloneDistinct());
                    else if (node.item.clone)
                        list.pushBack(node.item.clone());
                    else
                        list.pushBack(node.item);
            return list;
        };
        ;
        /**
         * Splits the list into lists of desired size.
         * @param size {number} The size of the lists.
         * @return {Array<LinkedList>} The lists created by splitting the list.
         */
        LinkedList.prototype.split = function (size) {
            var length = this.length;
            var lists = [this];
            for (var i = size; i < length; i += size)
                lists.push(lists[lists.length - 1].divide(size));
            return lists;
        };
        ;
        /**
         * Returns the number of items that satisfy the represented by the callback function.
         * @param callback {function} The condition to satisfy.
         * @return {number} The number of items that satisfy the condition.
         */
        LinkedList.prototype.count = function (callback) {
            var count = 0;
            var node = this.first;
            while (node) {
                if (callback(node.item))
                    count++;
                node = node.next;
            }
            return count;
        };
        ;
        return LinkedList;
    }(ds.Aggregate));
    ds.LinkedList = LinkedList;
})(ds || (ds = {}));
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var LinkedListIterator = /** @class */ (function () {
        /**
         * Class that implements the iterator for a linked list.
         * @param aggregate {LinkedList} The aggregate to scan.
         * @constructor
         */
        function LinkedListIterator(aggregate) {
            /**
             * The pointer to the position.
             * @type {Node|null}
             */
            this.pointer = null;
            this.aggregate = aggregate;
            this.pointer = null;
        }
        /**
         * @inheritDoc
         */
        LinkedListIterator.prototype.first = function () {
            this.pointer = this.aggregate.first;
        };
        ;
        /**
         * @inheritDoc
         */
        LinkedListIterator.prototype.next = function () {
            this.pointer = this.pointer.next;
        };
        ;
        /**
         * @inheritDoc
         */
        LinkedListIterator.prototype.last = function () {
            this.pointer = this.aggregate.last;
        };
        ;
        /**
         * @inheritDoc
         */
        LinkedListIterator.prototype.previous = function () {
            var node = this.pointer;
            for (this.pointer = this.first(); this.pointer.next !== node;)
                this.next();
        };
        ;
        /**
         * @inheritDoc
         */
        LinkedListIterator.prototype.isDone = function () {
            return !this.pointer;
        };
        ;
        /**
         * @inheritDoc
         */
        LinkedListIterator.prototype.getItem = function () {
            return this.pointer.item;
        };
        ;
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {Node|null} The node stored or null if it's out of the bounds.
         */
        LinkedListIterator.prototype.getNode = function () {
            return this.pointer;
        };
        ;
        return LinkedListIterator;
    }());
    ds.LinkedListIterator = LinkedListIterator;
})(ds || (ds = {}));
/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var PriorityQueue = /** @class */ (function (_super) {
        __extends(PriorityQueue, _super);
        /**
         * Class for managing a priority queue.
         * @constructor
         */
        function PriorityQueue() {
            var _this = _super.call(this) || this;
            /**
             * The length of the queue.
             * @type {number}
             */
            _this.length = 0;
            _this.items = new ds.RBTreeList();
            _this.length = 0;
            return _this;
        }
        /**
         * @inheritDoc
         */
        PriorityQueue.prototype.getIterator = function () {
            return new ds.PriorityQueueIterator(this);
        };
        ;
        /**
         * Add the item at the tail of the queue.
         * @param priority {number} The priority of the item.
         * @param item {*} The item to add.
         * @return {void}
         */
        PriorityQueue.prototype.enqueue = function (priority, item) {
            var queue = this.items.search(priority);
            if (!queue) {
                queue = new ds.Queue();
                this.items.insert(priority, queue);
            }
            queue.enqueue(item);
            this.length++;
        };
        ;
        /**
         * Adds the items with the same priority at the tail of the queue.
         * @param priority {number} The priority of the items.
         * @param items {Array<*>} The items to add.
         * @return {void}
         */
        PriorityQueue.prototype.multiEnqueue = function (priority, items) {
            for (var i = 0; i < items.length; i++)
                this.enqueue(priority, items[i]);
        };
        ;
        /**
         * Remove the item at the head of the queue.
         * @return {*} The item at the head of the queue. It's undefined if the queue is empty.
         */
        PriorityQueue.prototype.dequeue = function () {
            var node = this.items.maximum();
            var item = undefined;
            if (node) {
                var queue = node.item;
                item = queue.dequeue();
                if (queue.isEmpty())
                    this.items.deleteNode(node);
                this.length--;
            }
            return item;
        };
        ;
        /**
         * Removes the items at the head of the queue.
         * @param times {number} The number of times to repeat the dequeue method.
         * @return {Array<*>} The items at the head of the queue.
         */
        PriorityQueue.prototype.multiDequeue = function (times) {
            var items = [];
            for (var i = 0; i < times && this.length; i++)
                items.push(this.dequeue());
            return items;
        };
        ;
        /**
         * Removes the first length items from the position index.
         * @param index {number} The position where to start to remove the items.
         * @param [length = 1] {number} The number of items to remove.
         * @return {void}
         */
        PriorityQueue.prototype.remove = function (index, length) {
            length = length || 1;
            var it = this.items.getIterator();
            for (it.last(); !it.isDone() && length > 0; it.previous()) {
                var queue = it.getItem();
                if (index > -1 && index < queue.getLength()) {
                    var oldLength = queue.getLength();
                    queue.remove(index, length);
                    length -= oldLength - index;
                    index = 0;
                    if (!queue.getLength())
                        this.items.deleteNode(it.getNode());
                }
                else
                    index = index - queue.getLength();
            }
        };
        ;
        /**
         * Return the item at the position index.
         * @param index {number} The index of the item.
         * @return {*} The item found. It's undefined if the position index is out of bounds.
         */
        PriorityQueue.prototype.getItem = function (index) {
            var it = this.items.getIterator();
            for (it.last(); !it.isDone(); it.previous()) {
                var queue = it.getItem();
                if (index > -1 && index < queue.getLength())
                    return queue.getItem(index);
                index = index - queue.getLength();
            }
            return undefined;
        };
        ;
        /**
         * Return the items relatives to the priority.
         * @param priority {number} The priority of the items.
         * @return {Array<*>} The items found.
         */
        PriorityQueue.prototype.getItems = function (priority) {
            var items = this.items.search(priority);
            if (items)
                return items.items;
            return [];
        };
        ;
        /**
         * Return the first item in the queue. The item is not removed.
         * @return {*} The first item. It's undefined if the queue is empty.
         */
        PriorityQueue.prototype.peek = function () {
            return this.items.maximum().item.peek();
        };
        ;
        /**
         * Return the length of the queue.
         * @return {number} The length of the queue.
         */
        PriorityQueue.prototype.getLength = function () {
            return this.length;
        };
        ;
        /**
         * Checks if the queue is empty.
         * @return {boolean} True if the queue is empty, false otherwise.
         */
        PriorityQueue.prototype.isEmpty = function () {
            return !this.length;
        };
        ;
        /**
         * Removes all the items stored in the queue.
         * @return {void}
         */
        PriorityQueue.prototype.clear = function () {
            this.items = new ds.RBTreeList();
            this.length = 0;
        };
        ;
        /**
         * Checks if the queue contains a priority that satisfy the condition represented by the callback function.
         * @param priority {number} The priority to find.
         * @param [callback = function(p){return(p===priority);}] The condition to satisfy. The callback must accept the current priority to check.
         * @return {boolean} True if the queue contains the priority that satisfy the condition, false otherwise.
         */
        PriorityQueue.prototype.containsPriority = function (priority, callback) {
            if (callback)
                return this.items.fullContains(callback);
            else
                return this.items.contains(priority);
        };
        ;
        /**
         * Return the queue created by the priority queue with the items in the same order but without the priority.
         * @return {Queue} The queue created.
         */
        PriorityQueue.prototype.toQueue = function () {
            var queue = new ds.Queue();
            var it = this.items.getIterator();
            for (it.last(); !it.isDone(); it.previous()) {
                var item = it.getItem();
                var itQ = item.getIterator();
                for (itQ.first(); !itQ.isDone(); itQ.next())
                    queue.enqueue(itQ.getItem());
            }
            return queue;
        };
        ;
        /**
         * Executes the callback function for each item of the queue.
         * This method modifies the queue so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        PriorityQueue.prototype.execute = function (callback) {
            var it = this.items.getIterator();
            for (it.last(); !it.isDone(); it.previous())
                it.getItem().execute(callback);
        };
        ;
        /**
         * Change the priority of the item at the position index.
         * @param index {number} The position of the item of which increase the priority.
         * @param newPriority {number} The new priority.
         * @return {void}
         */
        PriorityQueue.prototype.changePriority = function (index, newPriority) {
            var item = this.getItem(index);
            this.remove(index);
            this.enqueue(newPriority, item);
        };
        ;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        PriorityQueue.prototype.filter = function (callback) {
            var result = [];
            var it = this.items.getIterator();
            for (it.last(); !it.isDone(); it.previous()) {
                var itQ = it.getItem().getIterator();
                for (itQ.first(); !itQ.isDone(); itQ.next()) {
                    if (callback(itQ.getItem()))
                        result.push(itQ.getItem());
                }
            }
            return result;
        };
        ;
        /**
         * Clones the queue into a new queue.
         * @return {PriorityQueue} The queue cloned from this queue.
         */
        PriorityQueue.prototype.clone = function () {
            var queue = new PriorityQueue();
            queue.items = this.items.clone();
            queue.length = this.length;
            return queue;
        };
        ;
        /**
         * Clones the queue into a new queue without cloning duplicated items.
         * @return {PriorityQueue} The queue cloned from this queue.
         */
        PriorityQueue.prototype.cloneDistinct = function () {
            var queue = new PriorityQueue();
            queue.items = this.items.cloneDistinct();
            queue.length = queue.items.getSize();
            return queue;
        };
        ;
        return PriorityQueue;
    }(ds.Aggregate));
    ds.PriorityQueue = PriorityQueue;
})(ds || (ds = {}));
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var PriorityQueueIterator = /** @class */ (function () {
        /**
         * Class that implements the iterator for a priority queue.
         * @param aggregate {PriorityQueue} The aggregate to scan.
         * @constructor
         */
        function PriorityQueueIterator(aggregate) {
            /**
             * The pointer to the position of the node.
             * @type {RBLNode|null}
             */
            this.pointerNode = null;
            /**
             * The pointer to the position in the node.
             * @type {number}
             */
            this.pointerPosition = -1;
            this.aggregate = aggregate;
            this.pointerNode = null;
            this.pointerPosition = -1;
        }
        /**
         * @inheritDoc
         */
        PriorityQueueIterator.prototype.first = function () {
            this.pointerNode = this.aggregate.items.maximum();
            this.pointerPosition = 0;
        };
        ;
        /**
         * @inheritDoc
         */
        PriorityQueueIterator.prototype.next = function () {
            this.pointerPosition++;
            if (this.pointerPosition > this.pointerNode.item.getLength() - 1) {
                this.pointerNode = this.pointerNode.previous;
                this.pointerPosition = 0;
            }
        };
        ;
        /**
         * @inheritDoc
         */
        PriorityQueueIterator.prototype.last = function () {
            this.pointerNode = this.aggregate.items.minimum();
            this.pointerPosition = this.pointerNode.item.getLength() - 1;
        };
        ;
        /**
         * @inheritDoc
         */
        PriorityQueueIterator.prototype.previous = function () {
            this.pointerPosition--;
            if (this.pointerPosition < 0) {
                this.pointerNode = this.pointerNode.next;
                if (this.pointerNode)
                    this.pointerPosition = this.pointerNode.item.getLength() - 1;
            }
        };
        ;
        /**
         * @inheritDoc
         */
        PriorityQueueIterator.prototype.isDone = function () {
            return !this.pointerNode;
        };
        ;
        /**
         * @inheritDoc
         */
        PriorityQueueIterator.prototype.getItem = function () {
            return this.pointerNode.item.items[this.pointerPosition];
        };
        ;
        return PriorityQueueIterator;
    }());
    ds.PriorityQueueIterator = PriorityQueueIterator;
})(ds || (ds = {}));
/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var Queue = /** @class */ (function (_super) {
        __extends(Queue, _super);
        /**
         * Class for managing a queue.
         * @param {...*} [args] The items for initializing the queue.
         * @constructor
         */
        function Queue() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            /**
             * The list of the items in the queue.
             * @type {Array<*>}
             */
            _this.items = [];
            /**
             * Decreases dequeue big O complexity by shifting starting indexs
             * for each dequeue, instead of splicing.
             * @type {int}
             */
            _this.offsetIndex = 0;
            _this.items = [];
            _this.offsetIndex = 0;
            if (args && args.length == 1 && args[0] instanceof Array) {
                //builds the list from the range passed from the constructor
                _this.multiEnqueue(args[0]);
            }
            else {
                //builds the list from the parameters of the constructor
                _this.multiEnqueue(arguments);
            }
            return _this;
        }
        /**
         * @inheritDoc
         */
        Queue.prototype.getIterator = function () {
            return new ds.QueueIterator(this);
        };
        ;
        /**
         * Adds the item at the tail of the queue.
         * @param item {*} The item to add.
         * @return {void}
         */
        Queue.prototype.enqueue = function (item) {
            this.items.push(item);
        };
        ;
        /**
         * Adds the items at the tail of the queue.
         * @param items {Array<*>} The items to add.
         * @return {void}
         */
        Queue.prototype.multiEnqueue = function (items) {
            for (var i = 0; i < items.length; i++)
                this.items.push(items[i]);
        };
        ;
        /**
         * Removes the item at the head of the queue.
         * @return {*} The item at the head of the queue. It's undefined if the queue is empty.
         */
        Queue.prototype.dequeue = function () {
            if (!(this.items.length - this.offsetIndex))
                return undefined;
            var dequeued = this.items[this.offsetIndex]; // holds the value, for cases that purge occurs
            this.offsetIndex++;
            /**
             * Automatically purge unneeded (already dequeued)
             * indexs from the array when they take up
             * more than one half the array
             */
            if (this.offsetIndex >= this.items.length / 2) {
                this.purge();
            }
            return dequeued; //return dequeued item
        };
        ;
        /**
         * Removes the items at the head of the queue.
         * @param times {number} The number of times to repeat the dequeue method.
         * @return {Array<*>} The items at the head of the queue.
         */
        Queue.prototype.multiDequeue = function (times) {
            var dequeued = []; // Holds variables that have been removed from the array
            // Dequeue the desired number of items
            console.log('items', this.items);
            for (var i = 0; (i < times && this.items.length - this.offsetIndex > 0); i++) {
                console.log('calleds');
                dequeued.push(this.dequeue());
            }
            return dequeued; //removes the last times item and returns the array
        };
        ;
        /**
         * Clears array indexs hidden by offset. To free up memory
         * @return {void}
         */
        Queue.prototype.purge = function () {
            this.items.splice(0, this.offsetIndex);
            this.offsetIndex = 0;
        };
        /**
         * Removes the first length items from the position index.
         * @param index {number} The position where to start to remove the items.
         * @param [length = 1] {number} The number of items to remove.
         * @return {void}
         */
        Queue.prototype.remove = function (index, length) {
            length = length || 1;
            this.items.splice(index, length);
        };
        ;
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the queue bounds.
         */
        Queue.prototype.getItem = function (index) {
            // take offsetIndex into account
            var index = index + this.offsetIndex;
            if (index < 0 || index > this.items.length - 1 - this.offsetIndex)
                return undefined;
            return this.items[index];
        };
        ;
        /**
         * Returns the first item in the queue. The item is not removed.
         * @return {*} The first item. It's undefined if the queue is empty.
         */
        Queue.prototype.peek = function () {
            if (this.items.length - this.offsetIndex)
                return this.items[this.offsetIndex];
            return undefined;
        };
        ;
        /**
         * Removes all the items stored in the queue.
         * @return {void}
         */
        Queue.prototype.clear = function () {
            this.items = [];
        };
        ;
        /**
         * Checks if the queue contains an item that satisfy the condition represented by the callback function.
         * @param item {*} The item to find.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {boolean} True if the queue contains the item that satisfy the condition, false otherwise.
         */
        Queue.prototype.contains = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = this.offsetIndex;
            while (i < this.items.length && !callback(this.items[i]))
                i++;
            return i < this.items.length;
        };
        ;
        /**
         * Executes the callback function for each item of the queue.
         * This method modifies the queue so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        Queue.prototype.execute = function (callback) {
            for (var i = this.offsetIndex; i < this.items.length; i++)
                this.items[i] = callback(this.items[i]);
        };
        ;
        /**
         * Returns the length of the queue.
         * @return {number} The length of the queue.
         */
        Queue.prototype.getLength = function () {
            return this.items.length - this.offsetIndex;
        };
        ;
        /**
         * Checks if the queue is empty.
         * @return {boolean} True if the queue is empty, false otherwise.
         */
        Queue.prototype.isEmpty = function () {
            return !(this.items.length - this.offsetIndex);
        };
        ;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        Queue.prototype.filter = function (callback) {
            var result = [];
            for (var i = this.offsetIndex; i < this.items.length; i++)
                if (callback(this.items[i]))
                    result.push(this.items[i]);
            return result;
        };
        ;
        /**
         * Returns the first position of the item in the queue.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        Queue.prototype.indexOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = this.offsetIndex;
            while (i < this.items.length) {
                if (callback(this.items[i]))
                    return i - this.offsetIndex;
                i++;
            }
            return -1;
        };
        ;
        /**
         * Returns the last position of the item in the queue.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        Queue.prototype.lastIndexOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = this.items.length - 1;
            while (i > this.offsetIndex - 1) {
                console.log('l', this.offsetIndex);
                if (callback(this.items[i]))
                    return i - this.offsetIndex;
                i--;
            }
            return -1;
        };
        ;
        /**
         * Returns all the position in which the item has been found in the queue.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        Queue.prototype.allIndexesOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = this.offsetIndex;
            var indexes = [];
            while (i < this.items.length) {
                if (callback(this.items[i]))
                    indexes.push(i - this.offsetIndex);
                i++;
            }
            return indexes;
        };
        ;
        /**
         * Clones the queue into a new queue.
         * @return {Queue} The queue cloned from this queue.
         */
        Queue.prototype.clone = function () {
            var queue = new Queue();
            for (var i = this.offsetIndex; i < this.items.length; i++)
                if (this.items[i].clone)
                    queue.enqueue(this.items[i].clone());
                else
                    queue.enqueue(this.items[i]);
            return queue;
        };
        ;
        /**
         * Clones the queue into a new queue without cloning duplicated items.
         * @return {Queue} The queue cloned from this queue.
         */
        Queue.prototype.cloneDistinct = function () {
            var queue = new Queue();
            for (var i = this.offsetIndex; i < this.items.length; i++)
                if (!queue.contains(this.items[i]))
                    if (this.items[i].cloneDistinct)
                        queue.enqueue(this.items[i].cloneDistinct());
                    else if (this.items[i].clone)
                        queue.enqueue(this.items[i].clone());
                    else
                        queue.enqueue(this.items[i]);
            return queue;
        };
        ;
        return Queue;
    }(ds.Aggregate));
    ds.Queue = Queue;
})(ds || (ds = {}));
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var QueueIterator = /** @class */ (function () {
        /**
         * Class that implements the iterator for a linked list.
         * @param aggregate {Queue} The aggregate to scan.
         * @constructor
         */
        function QueueIterator(aggregate) {
            /**
             * The pointer to the position.
             * @type {number}
             */
            this.pointer = -1;
            this.aggregate = aggregate;
            this.pointer = -1;
        }
        /**
         * @inheritDoc
         */
        QueueIterator.prototype.first = function () {
            this.pointer = 0;
        };
        ;
        /**
         * @inheritDoc
         */
        QueueIterator.prototype.next = function () {
            this.pointer++;
        };
        ;
        /**
         * @inheritDoc
         */
        QueueIterator.prototype.last = function () {
            this.pointer = this.aggregate.items.length - 1;
        };
        ;
        /**
         * @inheritDoc
         */
        QueueIterator.prototype.previous = function () {
            this.pointer--;
        };
        ;
        /**
         * @inheritDoc
         */
        QueueIterator.prototype.isDone = function () {
            return this.pointer < 0 || this.pointer > this.aggregate.items.length - 1;
        };
        ;
        /**
         * @inheritDoc
         */
        QueueIterator.prototype.getItem = function () {
            return this.aggregate.getItem(this.pointer);
        };
        ;
        return QueueIterator;
    }());
    ds.QueueIterator = QueueIterator;
})(ds || (ds = {}));
/**
 * Created by Stefano on 01/02/2015.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    /**
     * Create an array containing the value of the range
     * @param from {number} The inclusive start value of the range.
     * @param to {number} The inclusive end value of the range.
     * @param [step=1] The step to sample the values
     * @return {Array<number>} The array containing the value of the range.
     */
    function Range(from, to, step) {
        var range = [];
        step = step || 1;
        var sign = (step > 0 ? 1 : -1);
        for (var i = 0; from * sign <= to * sign; from += step, ++i)
            range[i] = from;
        return range;
    }
    ds.Range = Range;
})(ds || (ds = {}));
var ds;
(function (ds) {
    var RBNode = /** @class */ (function () {
        /**
         * The single node of the tree.
         * @param key {number} The key of the node.
         * @param item {*} The item to store in the node.
         * @constructor
         */
        function RBNode(key, item) {
            /**
             * The parent node. It's null if there's no a parent node.
             * @type {RBNode|null}
             */
            this.parent = null;
            /**
             * The left node. It's null if there's no a left node.
             * @type {RBNode|null}
             */
            this.left = null;
            /**
             * The right node. It's null if there's no a right node.
             * @type {RBNode|null}
             */
            this.right = null;
            /**
             * The type of the node. It's or red or black.
             * @type {string}
             */
            this.type = 'r';
            this.item = item;
            this.key = key;
            this.parent = null;
            this.left = null;
            this.right = null;
            this.type = 'r';
        }
        return RBNode;
    }());
    ds.RBNode = RBNode;
    var RBTree = /** @class */ (function (_super) {
        __extends(RBTree, _super);
        /**
         * Class for managing a red-black tree.
         * @constructor
         */
        function RBTree() {
            var _this = _super.call(this) || this;
            /**
             * The root of the tree.
             * @type {RBNode|null}
             */
            _this.root = null;
            /**
             * The number of items stored in the tree.
             * @type {number}
             */
            _this.size = 0;
            _this.root = null;
            _this.size = 0;
            return _this;
        }
        /**
         * @inheritDoc
         */
        RBTree.prototype.getIterator = function () {
            return new ds.RBTreeIterator(this);
        };
        ;
        /**
         * Insert the item relatives to the key value in the tree.
         * @param key {number} The key to store.
         * @param item {*} The item to store.
         * @return {void}
         */
        RBTree.prototype.insert = function (key, item) {
            var node = new RBNode(key, item);
            this.size++;
            if (!this.root) {
                this.root = node;
                node.type = 'b';
                return;
            }
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
            this.insertFixUp(node);
        };
        ;
        /**
         * Preserve the properties of the tree after an insert.
         * @param node {RBNode} The node to insert.
         * @return {void}
         */
        RBTree.prototype.insertFixUp = function (node) {
            for (var parent = node.parent; parent && parent.type === 'r'; parent = node.parent) {
                if (parent === parent.parent.left) {
                    var uncle = parent.parent.right;
                    if (uncle && uncle.type === 'r') {
                        parent.type = 'b';
                        uncle.type = 'b';
                        parent.parent.type = 'r';
                        node = parent.parent;
                    }
                    else if (node === parent.right) {
                        node = parent;
                        this.leftRotate(node);
                    }
                    else {
                        parent.type = 'b';
                        parent.parent.type = 'r';
                        this.rightRotate(parent.parent);
                    }
                }
                else {
                    var uncle = parent.parent.left;
                    if (uncle && uncle.type === 'r') {
                        parent.type = 'b';
                        uncle.type = 'b';
                        parent.parent.type = 'r';
                        node = parent.parent;
                    }
                    else if (node === parent.left) {
                        node = parent;
                        this.rightRotate(node);
                    }
                    else {
                        parent.type = 'b';
                        parent.parent.type = 'r';
                        this.leftRotate(parent.parent);
                    }
                }
            }
            this.root.type = 'b';
        };
        ;
        /**
         * Delete the node from the tree.
         * @param node {RBNode} The node to delete.
         * @return {void}
         */
        RBTree.prototype.deleteNode = function (node) {
            var successor;
            this.size--;
            if (!node.left || !node.right)
                successor = node;
            else {
                successor = this.successor(node);
                node.key = successor.key;
                node.item = successor.item;
            }
            var child;
            if (!successor.left)
                child = successor.right;
            else
                child = successor.left;
            if (child)
                child.parent = successor.parent;
            if (!successor.parent)
                this.root = child;
            else if (successor === successor.parent.left)
                successor.parent.left = child;
            else
                successor.parent.right = child;
            if (successor.type === 'b')
                this.deleteFixUp(child, successor.parent);
        };
        ;
        /**
         * Preserve the properties of the tree after a deletion.
         * @param node {RBNode} The node to delete.
         * @param parent {RBNode} The parent of the node.
         * @return {void}
         */
        RBTree.prototype.deleteFixUp = function (node, parent) {
            while (node !== this.root && (!node || node.type === 'b')) {
                if (node === parent.left) {
                    var brother = parent.right;
                    if (brother && brother.type === 'r') {
                        brother.type = 'b';
                        parent.type = 'r';
                        this.leftRotate(parent);
                        brother = parent.right;
                    }
                    if (brother && (!brother.left || brother.left.type === 'b') && (!brother.right || brother.right.type === 'b')) {
                        brother.type = 'r';
                        node = parent;
                    }
                    else {
                        if (!brother.right || brother.right.type === 'b') {
                            brother.left.type = 'b';
                            brother.type = 'r';
                            this.rightRotate(brother);
                            brother = parent.right;
                        }
                        brother.type = parent.type;
                        parent.type = 'b';
                        brother.right.type = 'b';
                        this.leftRotate(parent);
                        node = this.root;
                    }
                }
                else {
                    var brother = parent.left;
                    if (brother && brother.type === 'r') {
                        brother.type = 'b';
                        parent.type = 'r';
                        this.rightRotate(parent);
                        brother = parent.left;
                    }
                    if (brother && (!brother.left || brother.left.type === 'b') && (!brother.right || brother.right.type === 'b')) {
                        brother.type = 'r';
                        node = parent;
                    }
                    else {
                        if (!brother.left || brother.left.type === 'b') {
                            brother.right.type = 'b';
                            brother.type = 'r';
                            this.leftRotate(brother);
                            brother = parent.left;
                        }
                        brother.type = parent.type;
                        parent.type = 'b';
                        brother.left.type = 'b';
                        this.rightRotate(parent);
                        node = this.root;
                    }
                }
                parent = node.parent;
            }
            if (node)
                node.type = 'b';
        };
        ;
        /**
         * Get the node with the key next to the param node key.
         * @param node {RBNode} The node of which search the successor.
         * @return {RBNode} The node found.
         */
        RBTree.prototype.successor = function (node) {
            if (node.right)
                return this.minimum(node.right);
            var parent = node.parent;
            while (parent && node === parent.right) {
                node = parent;
                parent = parent.parent;
            }
            return parent;
        };
        ;
        /**
         * Get the node with the key previous to the param node key.
         * @param node {RBNode} The node of which search the predecessor.
         * @return {RBNode} The node found.
         */
        RBTree.prototype.predecessor = function (node) {
            if (node.left)
                return this.maximum(node.left);
            var parent = node.parent;
            while (parent && node === parent.left) {
                node = parent;
                parent = parent.parent;
            }
            return parent;
        };
        ;
        /**
         * Search the item relatives to the key and to the nodes that satisfy the condition represented by the callback function.
         * @param key {number} The key to find.
         * @param [node = root] {RBNode} The node from which start the search.
         * @param [callback = function(node){return(node.key===key);}] The condition to satisfy. The callback must accept the current node to check.
         * @return {*} The item found or undefined if there isn't the key in the tree.
         */
        RBTree.prototype.search = function (key, node, callback) {
            node = node || this.root;
            callback = callback || function (node) {
                return node.key === key;
            };
            while (node && !callback(node))
                if (key < node.key)
                    node = node.left;
                else
                    node = node.right;
            if (node)
                return node.item;
            return undefined;
        };
        ;
        /**
         * Checks if the tree contains a key or a node that satisfy the condition represented by the callback function.
         * This method avoid to search in branches where the key won't be found.
         * @param key {*} The key to find.
         * @param [callback = function(node){return(node.key===key);}] The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the key or a node that satisfy the condition, false otherwise.
         */
        RBTree.prototype.contains = function (key, callback) {
            return this.search(key, null, callback) !== undefined;
        };
        ;
        /**
         * Checks if the tree contains a node that satisfy the condition represented by the callback function.
         * This method check all the tree avoiding the binary search.
         * @param callback {function} The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the node that satisfy the condition, false otherwise.
         */
        RBTree.prototype.fullContains = function (callback) {
            var node = this.minimum();
            while (node && !callback(node.key))
                node = this.successor(node);
            return node !== null;
        };
        ;
        /**
         * Get the item relatives to the minimum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {RBNode} The node found.
         */
        RBTree.prototype.minimum = function (node) {
            node = node || this.root;
            while (node && node.left)
                node = node.left;
            return node;
        };
        ;
        /**
         * Get the item relatives to the maximum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {RBNode} The node found.
         */
        RBTree.prototype.maximum = function (node) {
            node = node || this.root;
            while (node && node.right)
                node = node.right;
            return node;
        };
        ;
        /**
         * Rotate the node with its right child.
         * @param node {RBNode} The node to rotate.
         * @return {void}
         */
        RBTree.prototype.leftRotate = function (node) {
            var child = node.right;
            node.right = child.left;
            if (child.left !== null)
                child.left.parent = node;
            child.parent = node.parent;
            if (node.parent === null)
                this.root = child;
            else if (node === node.parent.left)
                node.parent.left = child;
            else
                node.parent.right = child;
            node.parent = child;
            child.left = node;
        };
        ;
        /**
         * Rotate the node with its left child.
         * @param node {RBNode} The node to rotate.
         * @return {void}
         */
        RBTree.prototype.rightRotate = function (node) {
            var child = node.left;
            node.left = child.right;
            if (child.right !== null)
                child.right.parent = node;
            child.parent = node.parent;
            if (node.parent === null)
                this.root = child;
            else if (node === node.parent.left)
                node.parent.left = child;
            else
                node.parent.right = child;
            node.parent = child;
            child.right = node;
        };
        ;
        /**
         * Returns the size of the tree.
         * @return {number} The size of the tree.
         */
        RBTree.prototype.getSize = function () {
            return this.size;
        };
        ;
        /**
         * Clones the queue into a new queue.
         * @return {RBTree} The tree cloned from this queue.
         */
        RBTree.prototype.clone = function () {
            var tree = new RBTree();
            var it = this.getIterator();
            for (it.first(); !it.isDone(); it.next())
                if (it.getNode().item.clone)
                    tree.insert(it.getNode().key, it.getNode().item.clone());
                else
                    tree.insert(it.getNode().key, it.getNode().item);
            return tree;
        };
        ;
        /**
         * Clones the tree into a new tree without cloning duplicated items.
         * @return {RBTree} The tree cloned from this tree.
         */
        RBTree.prototype.cloneDistinct = function () {
            var tree = new RBTree();
            var it = this.getIterator();
            for (it.first(); !it.isDone(); it.next()) {
                var callback = function (node) {
                    return node.key === it.getNode().key && node.item === it.getNode().item;
                };
                if (!tree.contains(it.getNode().key, callback)) {
                    if (it.getNode().item.cloneDistinct)
                        tree.insert(it.getNode().key, it.getNode().item.cloneDistinct());
                    else if (it.getNode().item.clone)
                        tree.insert(it.getNode().key, it.getNode().item.clone());
                    else
                        tree.insert(it.getNode().key, it.getNode().item);
                }
            }
            return tree;
        };
        ;
        /**
         * Transform the tree into an array without preserving keys.
         * @return {Array<*>} The array that represents the tree.
         */
        RBTree.prototype.toArray = function () {
            var result = [];
            for (var node = this.minimum(); node; node = this.successor(node))
                result.push(node.item);
            return result;
        };
        ;
        /**
         * Removes all the items stored in the tree.
         * @return {void}
         */
        RBTree.prototype.clear = function () {
            this.root = null;
            this.size = 0;
        };
        ;
        /**
         * Checks if the tree is empty.
         * @return {boolean} True if the tree is empty, false otherwise.
         */
        RBTree.prototype.isEmpty = function () {
            return !this.size;
        };
        ;
        /**
         * Executes the callback function for each item of the tree.
         * This method modifies the tree so if you don't need to modify it you must return the same item stored.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        RBTree.prototype.execute = function (callback) {
            for (var node = this.minimum(); node; node = this.successor(node))
                node.item = callback(node.item);
        };
        ;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        RBTree.prototype.filter = function (callback) {
            var result = [];
            for (var node = this.minimum(); node; node = this.successor(node))
                if (callback(node.item))
                    result.push(node.item);
            return result;
        };
        ;
        /**
         * Returns the first position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        RBTree.prototype.indexOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = 0, node = this.minimum();
            while (node) {
                if (callback(node.item))
                    return i;
                node = this.successor(node);
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
        RBTree.prototype.lastIndexOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = this.size - 1, node = this.maximum();
            while (node) {
                if (callback(node.item))
                    return i;
                i--;
                node = this.predecessor(node);
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
        RBTree.prototype.allIndexesOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = 0, node = this.minimum();
            var indexes = [];
            while (node) {
                if (callback(node.item))
                    indexes.push(i);
                i++;
                node = this.successor(node);
            }
            return indexes;
        };
        ;
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the tree bounds.
         */
        RBTree.prototype.getItem = function (index) {
            if (index < 0 || index > this.size - 1)
                return undefined;
            for (var node = this.minimum(), i = 0; i < index; node = this.successor(node))
                i++;
            return node.item;
        };
        ;
        return RBTree;
    }(ds.Aggregate));
    ds.RBTree = RBTree;
})(ds || (ds = {}));
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var RBTreeIterator = /** @class */ (function () {
        /**
         * Class that implements the iterator for a red-black tree.
         * @param aggregate {RBTree} The aggregate to scan.
         * @constructor
         */
        function RBTreeIterator(aggregate) {
            /**
             * The pointer to the position.
             * @type {RBNode|null}
             */
            this.pointer = null;
            this.aggregate = aggregate;
            this.pointer = null;
        }
        /**
         * @inheritDoc
         */
        RBTreeIterator.prototype.first = function () {
            this.pointer = this.aggregate.minimum();
        };
        ;
        /**
         * @inheritDoc
         */
        RBTreeIterator.prototype.next = function () {
            this.pointer = this.aggregate.successor(this.pointer);
        };
        ;
        /**
         * @inheritDoc
         */
        RBTreeIterator.prototype.last = function () {
            this.pointer = this.aggregate.maximum();
        };
        ;
        /**
         * @inheritDoc
         */
        RBTreeIterator.prototype.previous = function () {
            this.pointer = this.aggregate.predecessor(this.pointer);
        };
        ;
        /**
         * @inheritDoc
         */
        RBTreeIterator.prototype.isDone = function () {
            return !this.pointer;
        };
        ;
        /**
         * @inheritDoc
         */
        RBTreeIterator.prototype.getItem = function () {
            return this.pointer.item;
        };
        ;
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {RBNode|null} The node stored or null if it's out of the bounds.
         */
        RBTreeIterator.prototype.getNode = function () {
            return this.pointer;
        };
        ;
        return RBTreeIterator;
    }());
    ds.RBTreeIterator = RBTreeIterator;
})(ds || (ds = {}));
var ds;
(function (ds) {
    var RBLNode = /** @class */ (function () {
        /**
         * The single node of the tree.
         * @param key {number} The key of the node.
         * @param item {*} The item to store in the node.
         * @constructor
         */
        function RBLNode(key, item) {
            /**
             * The parent node. It's null if there's no a parent node.
             * @type {RBLNode|null}
             */
            this.parent = null;
            /**
             * The left node. It's null if there's no a left node.
             * @type {RBLNode|null}
             */
            this.left = null;
            /**
             * The right node. It's null if there's no a right node.
             * @type {RBLNode|null}
             */
            this.right = null;
            /**
             * The next node. It's null if there's no a next node.
             * @type {RBLNode|null}
             */
            this.next = null;
            /**
             * The previous node. It's null if there's no a previous node.
             * @type {RBLNode|null}
             */
            this.previous = null;
            /**
             * The type of the node. It's or red or black.
             * @type {string}
             */
            this.type = 'r';
            this.item = item;
            this.key = key;
            this.parent = null;
            this.left = null;
            this.right = null;
            this.next = null;
            this.previous = null;
            this.type = 'r';
        }
        return RBLNode;
    }());
    ds.RBLNode = RBLNode;
    var RBTreeList = /** @class */ (function (_super) {
        __extends(RBTreeList, _super);
        function RBTreeList() {
            var _this = _super.call(this) || this;
            /**
             * The root of the tree.
             * @type {RBLNode|null}
             */
            _this.root = null;
            /**
             * The first node of the tree.
             * @type {RBLNode|null}
             */
            _this.first = null;
            /**
             * The last node of the tree.
             * @type {RBLNode|null}
             */
            _this.last = null;
            /**
             * The size of the tree.
             * @type {number}
             */
            _this.size = 0;
            _this.root = null;
            _this.first = null;
            _this.last = null;
            _this.size = 0;
            return _this;
        }
        /**
         * @inheritDoc
         */
        RBTreeList.prototype.getIterator = function () {
            return new ds.RBTreeListIterator(this);
        };
        ;
        /**
         * Insert the item relatives to the key value in the tree.
         * @param key {number} The key to store.
         * @param item {*} The item to store.
         * @return {void}
         */
        RBTreeList.prototype.insert = function (key, item) {
            var node = new RBLNode(key, item);
            this.size++;
            if (!this.root) {
                this.root = node;
                this.first = node;
                this.last = node;
                node.type = 'b';
                return;
            }
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
            node.next = this.successor(node);
            if (node.next) {
                if (node.next.previous)
                    node.next.previous.next = node;
                else
                    this.first = node;
                node.previous = node.next.previous;
                node.next.previous = node;
            }
            else {
                this.last = node;
                node.previous = this.predecessor(node);
                if (node.previous)
                    node.previous.next = node;
                else
                    this.first = node;
            }
            this.insertFixUp(node);
        };
        ;
        /**
         * Preserve the properties of the tree after an insert.
         * @param node {RBLNode} The node to insert.
         * @return {void}
         */
        RBTreeList.prototype.insertFixUp = function (node) {
            for (var parent = node.parent; parent && parent.type === 'r'; parent = node.parent) {
                if (parent === parent.parent.left) {
                    var uncle = parent.parent.right;
                    if (uncle && uncle.type === 'r') {
                        parent.type = 'b';
                        uncle.type = 'b';
                        parent.parent.type = 'r';
                        node = parent.parent;
                    }
                    else if (node === parent.right) {
                        node = parent;
                        this.leftRotate(node);
                    }
                    else {
                        parent.type = 'b';
                        parent.parent.type = 'r';
                        this.rightRotate(parent.parent);
                    }
                }
                else {
                    var uncle = parent.parent.left;
                    if (uncle && uncle.type === 'r') {
                        parent.type = 'b';
                        uncle.type = 'b';
                        parent.parent.type = 'r';
                        node = parent.parent;
                    }
                    else if (node === parent.left) {
                        node = parent;
                        this.rightRotate(node);
                    }
                    else {
                        parent.type = 'b';
                        parent.parent.type = 'r';
                        this.leftRotate(parent.parent);
                    }
                }
            }
            this.root.type = 'b';
        };
        ;
        /**
         * Delete the node from the tree.
         * @param node {RBLNode} The node to delete.
         * @return {void}
         */
        RBTreeList.prototype.deleteNode = function (node) {
            this.size--;
            var successor;
            if (!node.left || !node.right)
                successor = node;
            else {
                successor = this.successor(node);
                node.key = successor.key;
                node.item = successor.item;
            }
            var child;
            if (!successor.left)
                child = successor.right;
            else
                child = successor.left;
            if (child)
                child.parent = successor.parent;
            if (!successor.parent)
                this.root = child;
            else if (successor === successor.parent.left)
                successor.parent.left = child;
            else
                successor.parent.right = child;
            if (successor.next)
                successor.next.previous = successor.previous;
            else
                this.last = successor.previous;
            if (successor.previous)
                successor.previous.next = successor.next;
            else
                this.first = successor.next;
            if (successor.type === 'b')
                this.deleteFixUp(child, successor.parent);
        };
        ;
        /**
         * Preserve the properties of the tree after a deletion.
         * @param node {RBLNode} The node to delete.
         * @param parent {RBLNode} The parent of the node.
         * @return {void}
         */
        RBTreeList.prototype.deleteFixUp = function (node, parent) {
            while (node !== this.root && (!node || node.type === 'b')) {
                if (node === parent.left) {
                    var brother = parent.right;
                    if (brother && brother.type === 'r') {
                        brother.type = 'b';
                        parent.type = 'r';
                        this.leftRotate(parent);
                        brother = parent.right;
                    }
                    if (brother && (!brother.left || brother.left.type === 'b') && (!brother.right || brother.right.type === 'b')) {
                        brother.type = 'r';
                        node = parent;
                    }
                    else {
                        if (!brother.right || brother.right.type === 'b') {
                            brother.left.type = 'b';
                            brother.type = 'r';
                            this.rightRotate(brother);
                            brother = parent.right;
                        }
                        brother.type = parent.type;
                        parent.type = 'b';
                        brother.right.type = 'b';
                        this.leftRotate(parent);
                        node = this.root;
                    }
                }
                else {
                    var brother = parent.left;
                    if (brother && brother.type === 'r') {
                        brother.type = 'b';
                        parent.type = 'r';
                        this.rightRotate(parent);
                        brother = parent.left;
                    }
                    if (brother && (!brother.left || brother.left.type === 'b') && (!brother.right || brother.right.type === 'b')) {
                        brother.type = 'r';
                        node = parent;
                    }
                    else {
                        if (!brother.left || brother.left.type === 'b') {
                            brother.right.type = 'b';
                            brother.type = 'r';
                            this.leftRotate(brother);
                            brother = parent.left;
                        }
                        brother.type = parent.type;
                        parent.type = 'b';
                        brother.left.type = 'b';
                        this.rightRotate(parent);
                        node = this.root;
                    }
                }
                parent = node.parent;
            }
            if (node)
                node.type = 'b';
        };
        ;
        /**
         * Get the node with the key next to the param node key.
         * @param node {RBLNode} The node of which search the successor.
         * @return {RBLNode} The node found.
         */
        RBTreeList.prototype.successor = function (node) {
            if (node.next || node === this.last)
                return node.next;
            if (node.right)
                return this.minimum(node.right);
            var parent = node.parent;
            while (parent && node === parent.right) {
                node = parent;
                parent = parent.parent;
            }
            return parent;
        };
        ;
        /**
         * Get the node with the key previous to the param node key.
         * @param node {RBLNode} The node of which search the predecessor.
         * @return {RBLNode} The node found.
         */
        RBTreeList.prototype.predecessor = function (node) {
            if (node.previous || node === this.first)
                return node.previous;
            if (node.left)
                return this.maximum(node.left);
            var parent = node.parent;
            while (parent && node === parent.left) {
                node = parent;
                parent = parent.parent;
            }
            return parent;
        };
        ;
        /**
         * Search the item relatives to the key that satisfy the condition represented by the callback function.
         * @param key {number} The key to find.
         * @param [node = root] {RBNode} The node from which start the search.
         * @param [callback = function(k){return(k===key);}] The condition to satisfy. The callback must accept the current key to check.
         * @return {*} The item found or undefined if there isn't the key in the tree.
         */
        RBTreeList.prototype.search = function (key, node, callback) {
            node = node || this.root;
            callback = callback || function (node) {
                return node.key === key;
            };
            while (node && !callback(node))
                if (key < node.key)
                    node = node.left;
                else
                    node = node.right;
            if (node)
                return node.item;
            return undefined;
        };
        ;
        /**
         * Checks if the tree contains a key or a node that satisfy the condition represented by the callback function.
         * This method avoid to search in branches where the key won't be found.
         * @param key {*} The key to find.
         * @param [callback = function(node){return(node.key===key);}] The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the key or a node that satisfy the condition, false otherwise.
         */
        RBTreeList.prototype.contains = function (key, callback) {
            return this.search(key, null, callback) !== undefined;
        };
        ;
        /**
         * Checks if the tree contains a node that satisfy the condition represented by the callback function.
         * This method check all the tree avoiding the binary search.
         * @param callback {function} The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the node that satisfy the condition, false otherwise.
         */
        RBTreeList.prototype.fullContains = function (callback) {
            var node = this.first;
            while (node && !callback(node.key))
                node = node.next;
            return node !== null;
        };
        ;
        /**
         * Get the item relatives to the minimum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {RBLNode} The node found.
         */
        RBTreeList.prototype.minimum = function (node) {
            if (node)
                while (node && node.left)
                    node = node.left;
            else
                return this.first;
            return node;
        };
        ;
        /**
         * Get the item relatives to the maximum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {RBLNode} The node found.
         */
        RBTreeList.prototype.maximum = function (node) {
            if (node)
                while (node && node.right)
                    node = node.right;
            else
                return this.last;
            return node;
        };
        ;
        /**
         * Rotate the node with its right child.
         * @param node {RBLNode} The node to rotate.
         * @return {void}
         */
        RBTreeList.prototype.leftRotate = function (node) {
            var child = node.right;
            node.right = child.left;
            if (child.left !== null)
                child.left.parent = node;
            child.parent = node.parent;
            if (node.parent === null)
                this.root = child;
            else if (node === node.parent.left)
                node.parent.left = child;
            else
                node.parent.right = child;
            node.parent = child;
            child.left = node;
        };
        ;
        /**
         * Rotate the node with its left child.
         * @param node {RBLNode} The node to rotate.
         * @return {void}
         */
        RBTreeList.prototype.rightRotate = function (node) {
            var child = node.left;
            node.left = child.right;
            if (child.right !== null)
                child.right.parent = node;
            child.parent = node.parent;
            if (node.parent === null)
                this.root = child;
            else if (node === node.parent.left)
                node.parent.left = child;
            else
                node.parent.right = child;
            node.parent = child;
            child.right = node;
        };
        ;
        /**
         * Returns the size of the tree.
         * @return {number} The size of the tree.
         */
        RBTreeList.prototype.getSize = function () {
            return this.size;
        };
        ;
        /**
         * Clones the tree into a new tree.
         * @return {RBTreeList} The tree cloned from this tree.
         */
        RBTreeList.prototype.clone = function () {
            var tree = new RBTreeList();
            var it = this.getIterator();
            for (it.first(); !it.isDone(); it.next())
                tree.insert(it.getNode().key, it.getNode().item);
            return tree;
        };
        ;
        /**
         * Clones the tree into a new tree without cloning duplicated items.
         * @return {RBTreeList} The tree cloned from this tree.
         */
        RBTreeList.prototype.cloneDistinct = function () {
            var tree = new RBTreeList();
            var it = this.getIterator();
            for (it.first(); !it.isDone(); it.next()) {
                var callback = function (node) {
                    return node.key === it.getNode().key && node.item === it.getNode().item;
                };
                if (!tree.contains(it.getNode().key, callback)) {
                    if (it.getNode().item.cloneDistinct)
                        tree.insert(it.getNode().key, it.getNode().item.cloneDistinct());
                    else if (it.getNode().item.clone)
                        tree.insert(it.getNode().key, it.getNode().item.clone());
                    else
                        tree.insert(it.getNode().key, it.getNode().item);
                }
            }
            return tree;
        };
        ;
        /**
         * Transform the tree into an array without preserving keys.
         * @return {Array<*>} The array that represents the tree.
         */
        RBTreeList.prototype.toArray = function () {
            var result = [];
            for (var node = this.first; node; node = node.next)
                result.push(node.item);
            return result;
        };
        ;
        /**
         * Removes all the items stored in the tree.
         * @return {void}
         */
        RBTreeList.prototype.clear = function () {
            this.root = null;
            this.first = null;
            this.last = null;
            this.size = 0;
        };
        ;
        /**
         * Checks if the tree is empty.
         * @return {boolean} True if the tree is empty, false otherwise.
         */
        RBTreeList.prototype.isEmpty = function () {
            return !this.size;
        };
        ;
        /**
         * Executes the callback function for each item of the tree.
         * This method modifies the tree so if you don't need to modify it you must return the same item stored.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        RBTreeList.prototype.execute = function (callback) {
            for (var node = this.first; node; node = node.next)
                node.item = callback(node.item);
        };
        ;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        RBTreeList.prototype.filter = function (callback) {
            var result = [];
            for (var node = this.first; node; node = node.next)
                if (callback(node.item))
                    result.push(node.item);
            return result;
        };
        ;
        /**
         * Returns the first position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        RBTreeList.prototype.indexOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = 0, node = this.first;
            while (node) {
                if (callback(node.item))
                    return i;
                node = node.next;
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
        RBTreeList.prototype.lastIndexOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = this.size - 1, node = this.last;
            while (node) {
                if (callback(node.item))
                    return i;
                i--;
                node = node.previous;
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
        RBTreeList.prototype.allIndexesOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = 0, node = this.first;
            var indexes = [];
            while (node) {
                if (callback(node.item))
                    indexes.push(i);
                i++;
                node = node.next;
            }
            return indexes;
        };
        ;
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the tree bounds.
         */
        RBTreeList.prototype.getItem = function (index) {
            if (index < 0 || index > this.size - 1)
                return undefined;
            for (var node = this.first, i = 0; i < index; node = node.next)
                i++;
            return node.item;
        };
        ;
        return RBTreeList;
    }(ds.Aggregate));
    ds.RBTreeList = RBTreeList;
})(ds || (ds = {}));
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var RBTreeListIterator = /** @class */ (function () {
        /**
         * Class that implements the iterator for a red-black tree.
         * @param aggregate {RBTreeList} The aggregate to scan.
         * @constructor
         */
        function RBTreeListIterator(aggregate) {
            /**
             * The pointer to the position.
             * @type {RBLNode|null}
             */
            this.pointer = null;
            this.aggregate = aggregate;
            this.pointer = null;
        }
        /**
         * @inheritDoc
         */
        RBTreeListIterator.prototype.first = function () {
            this.pointer = this.aggregate.first;
        };
        ;
        /**
         * @inheritDoc
         */
        RBTreeListIterator.prototype.next = function () {
            this.pointer = this.pointer.next;
        };
        ;
        /**
         * @inheritDoc
         */
        RBTreeListIterator.prototype.last = function () {
            this.pointer = this.aggregate.last;
        };
        ;
        /**
         * @inheritDoc
         */
        RBTreeListIterator.prototype.previous = function () {
            this.pointer = this.pointer.previous;
        };
        ;
        /**
         * @inheritDoc
         */
        RBTreeListIterator.prototype.isDone = function () {
            return !this.pointer;
        };
        ;
        /**
         * @inheritDoc
         */
        RBTreeListIterator.prototype.getItem = function () {
            return this.pointer.item;
        };
        ;
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {RBNode|null} The node stored or null if it's out of the bounds.
         */
        RBTreeListIterator.prototype.getNode = function () {
            return this.pointer;
        };
        ;
        return RBTreeListIterator;
    }());
    ds.RBTreeListIterator = RBTreeListIterator;
})(ds || (ds = {}));
/**
 * Created by Stefano on 12/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var Element = /** @class */ (function () {
        /**
         * Class for representing an element of a set.
         * @param item {*} The item to store in the element.
         * @constructor
         */
        function Element(item) {
            this.parents = new ds.DoubleLinkedList();
            this.item = item;
        }
        return Element;
    }());
    ds.Element = Element;
    var Set = /** @class */ (function () {
        /**
         * Class for managing a set.
         * @constructor
         */
        function Set() {
            /**
             * The size of the set. It's equal to his cardinality.
             * @type {number}
             */
            this.size = 0;
            this.parents = new ds.DoubleLinkedList();
            this.elements = new ds.DoubleLinkedList();
            this.sets = new ds.DoubleLinkedList();
            this.size = 0;
        }
        /**
         * Add the element to the set.
         * @param element {Element} The element to add.
         * @return {void}
         */
        Set.prototype.insert = function (element) {
            this.elements.pushBack(element);
            element.parents.pushBack(this);
            this.size++;
        };
        ;
        /**
         * Add the elements to the set.
         * @param elements {Array<Element>} The elements to add.
         * @return {void}
         */
        Set.prototype.multiInsert = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                this.elements.pushBack(elements[i]);
                elements[i].parents.pushBack(this);
            }
            this.size += elements.length;
        };
        ;
        /**
         * Returns the set that represents the union of two sets.
         * @param set {Set} The set with make the union.
         * @return {Set} The set that represents the union.
         */
        Set.prototype.union = function (set) {
            var parent = new Set();
            parent.addSubsets([this, set]);
            this.parents.pushBack(parent);
            set.parents.pushBack(parent);
            //change the parent of the subset
            var that = this;
            var f = function (item) {
                if (item === that)
                    return parent;
            };
            var it = this.sets.getIterator();
            for (it.first(); !it.isDone(); it.next())
                it.getItem().parents.execute(f);
            f = function (item) {
                if (item === set)
                    return parent;
            };
            it = set.sets.getIterator();
            for (it.first(); !it.isDone(); it.next())
                it.getItem().parents.execute(f);
            return parent;
        };
        ;
        /**
         * Returns the set that represents the intersection of two sets.
         * @param set {Set} The set to intersect with this.
         * @return {Set} The set that represents the intersection.
         */
        Set.prototype.intersect = function (set) {
            var intersection = new Set();
            //intersect this set with the set
            var el = this.elements.getIterator();
            for (el.first(); !el.isDone(); el.next())
                if (el.getItem().parents.contains(set))
                    intersection.insert(el.getItem());
            //intersect the subsets with the set
            var it = this.sets.getIterator();
            for (it.first(); !it.isDone(); it.next()) {
                el = it.getItem().getIterator();
                for (el.first(); !el.isDone(); el.next())
                    if (el.getItem().parents.contains(set))
                        intersection.insert(el.getItem());
            }
            return intersection;
        };
        ;
        /**
         * Returns the set that represents the difference of two sets.
         * @param set {Set} The set to difference with this.
         * @return {Set} The set that represents the difference.
         */
        Set.prototype.difference = function (set) {
            var diff = new Set();
            //intersect this set with the set
            var el = this.elements.getIterator();
            for (el.first(); !el.isDone(); el.next())
                if (!el.getItem().parents.contains(set))
                    diff.insert(el.getItem());
            //intersect the subsets with the set
            var it = this.sets.getIterator();
            for (it.first(); !it.isDone(); it.next()) {
                el = it.getItem().getIterator();
                for (el.first(); !el.isDone(); el.next())
                    if (!el.getItem().parents.contains(set))
                        diff.insert(el.getItem());
            }
            return diff;
        };
        ;
        /**
         * Returns the set that represents the cartesian product of two sets.
         * @param set {Set} The set to make the cartesian product with this.
         * @return {Set} The set that represents the cartesian product .
         */
        Set.prototype.cartesianProduct = function (set) {
            var el1 = this.getItems();
            var el2 = set.getItems();
            var product = new Set();
            for (var i = 0; i < el1.length; i++)
                for (var j = 0; j < el2.length; j++)
                    product.insert(new Element([el1[i], el2[j]]));
            return product;
        };
        ;
        /**
         * Add the subset.
         * @param set {Set} The subset.
         */
        Set.prototype.addSubset = function (set) {
            this.sets.pushBack(set);
            this.size += set.size;
        };
        ;
        /**
         * Add the subsets.
         * @param sets {Array<Set>} The subsets.
         */
        Set.prototype.addSubsets = function (sets) {
            for (var i = 0; i < sets.length; i++)
                this.addSubset(sets[i]);
        };
        ;
        /**
         * Returns the items that are stored in the set.
         * @return {Array} The items stored.
         */
        Set.prototype.getItems = function () {
            var array = [];
            //get the items stored in the set
            var el = this.elements.getIterator();
            for (el.first(); !el.isDone(); el.next())
                array.push(el.getItem().item);
            //get the items stored in the subsets
            var it = this.sets.getIterator();
            for (it.first(); !it.isDone(); it.next()) {
                el = it.getItem().getIterator();
                for (el.first(); !el.isDone(); el.next())
                    array.push(el.getItem().item);
            }
            return array;
        };
        ;
        /**
         * Returns the cardinality of the set.
         * @return {number} The cardinality of the set.
         */
        Set.prototype.getCardinality = function () {
            return this.size;
        };
        ;
        /**
         * Checks if the set is empty.
         * @return {boolean} True if the set is empty, false otherwise.
         */
        Set.prototype.isEmpty = function () {
            return !this.size;
        };
        ;
        /**
         * Clones the set into a new set.
         * @return {Set} The set cloned from this set.
         */
        Set.prototype.clone = function () {
            var s = new Set();
            s.parents = this.parents.clone();
            s.elements = this.elements.clone();
            s.sets = this.sets.clone();
            s.size = this.size;
            return s;
        };
        ;
        return Set;
    }());
    ds.Set = Set;
})(ds || (ds = {}));
/**
 * Created by Battistella Stefano on 31/03/14.
 */
var ds;
(function (ds) {
    var Stack = /** @class */ (function (_super) {
        __extends(Stack, _super);
        /**
         * Class for managing a stack.
         * @param {...*} [args] The items for initializing the stack.
         * @constructor
         */
        function Stack() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            /**
             * The list of the items in the stack.
             * @type {Array<*>}
             */
            _this.items = [];
            _this.items = [];
            if (args && args.length == 1 && args[0] instanceof Array) {
                //builds the stack from the range passed from the constructor
                _this.multiPush(args[0]);
            }
            else {
                //builds the stack from the parameters of the constructor
                _this.multiPush(arguments);
            }
            return _this;
        }
        /**
         * @inheritDoc
         */
        Stack.prototype.getIterator = function () {
            return new ds.StackIterator(this);
        };
        ;
        /**
         * Adds the item at the top of the stack.
         * @param item {*} The item to add.
         * return {void}
         */
        Stack.prototype.push = function (item) {
            this.items.push(item);
        };
        ;
        /**
         * Adds the items at the top of the stack.
         * @param items {Array<*>} The items to add.
         * @return {void}
         */
        Stack.prototype.multiPush = function (items) {
            for (var i = 0; i < items.length; i++)
                this.push(items[i]);
        };
        ;
        /**
         * Removes the item at the top of the stack.
         * @return {*} The item at the top of the stack. It's undefined if the stack is empty.
         */
        Stack.prototype.pop = function () {
            if (!this.items.length)
                return undefined;
            return this.items.pop();
        };
        ;
        /**
         * Removes the more item at the top of the stack.
         * @param times {number} The number of times to repeat the pop method.
         * @return {Array<*>} The items at the top of the stack.
         */
        Stack.prototype.multiPop = function (times) {
            var result = [];
            for (var i = 0; i < times && this.items.length; i++)
                result.push(this.pop());
            return result;
        };
        ;
        /**
         * Returns the item at the top of the stack without remove it.
         * @return {*} The item at the top of the stack. It's undefined if the stack is empty.
         */
        Stack.prototype.peek = function () {
            if (!this.items.length)
                return undefined;
            return this.items[this.items.length - 1];
        };
        ;
        /**
         * Removes all the items stored in the stack.
         * @return {void}
         */
        Stack.prototype.clear = function () {
            this.items = [];
        };
        ;
        /**
         * Checks if the stack contains an item that satisfy the condition represented by the callback function.
         * @param item {*} The item to find.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {boolean} True if the stack contains the item that satisfy the condition, false otherwise.
         */
        Stack.prototype.contains = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = 0;
            while (i < this.items.length && !callback(this.items[i]))
                i++;
            return i < this.items.length;
        };
        ;
        /**
         * Executes the callback function for each item of the stack.
         * This method modifies the stack so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        Stack.prototype.execute = function (callback) {
            for (var i = this.items.length - 1; i > -1; i--)
                this.items[i] = callback(this.items[i]);
        };
        ;
        /**
         * Returns the item at the position index.
         * @param index The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the stack bounds.
         */
        Stack.prototype.getItem = function (index) {
            if (index < 0 || index > this.items.length - 1)
                return undefined;
            return this.items[this.items.length - index - 1];
        };
        ;
        /**
         * Returns the length of the stack.
         * @return {Number} The length of the stack.
         */
        Stack.prototype.getLength = function () {
            return this.items.length;
        };
        ;
        /**
         * Checks if the stack is empty.
         * @return {boolean} True if the stack is empty, false otherwise.
         */
        Stack.prototype.isEmpty = function () {
            return !this.items.length;
        };
        ;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        Stack.prototype.filter = function (callback) {
            var result = [];
            for (var i = this.items.length - 1; i > -1; i--) {
                if (callback(this.items[i]))
                    result.push(this.items[i]);
            }
            return result;
        };
        ;
        /**
         * Returns the first position of the item in the stack.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        Stack.prototype.indexOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = this.items.length - 1;
            while (i > -1) {
                if (callback(this.items[i]))
                    return i;
                i--;
            }
            return -1;
        };
        ;
        /**
         * Returns the last position of the item in the stack.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        Stack.prototype.lastIndexOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = 0;
            while (i < this.items.length) {
                if (callback(this.items[i]))
                    return i;
                i++;
            }
            return -1;
        };
        ;
        /**
         * Returns all the position in which the item has been found in the stack.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        Stack.prototype.allIndexesOf = function (item, callback) {
            callback = callback || function (it) {
                return it === item;
            };
            var i = this.items.length - 1;
            var indexes = [];
            while (i > -1) {
                if (callback(this.items[i]))
                    indexes.push(i);
                i--;
            }
            return indexes;
        };
        ;
        /**
         * Clones the stack into a new stack.
         * @return {Stack} The stack cloned from this stack.
         */
        Stack.prototype.clone = function () {
            var stack = new Stack();
            for (var i = 0; i < this.items.length; i++)
                if (this.items[i].clone)
                    stack.push(this.items[i].clone());
                else
                    stack.push(this.items[i]);
            return stack;
        };
        ;
        /**
         * Clones the stack into a new stack without cloning duplicated items.
         * @return {Stack} The stack cloned from this stack.
         */
        Stack.prototype.cloneDistinct = function () {
            var stack = new Stack();
            for (var i = 0; i < this.items.length; i++)
                if (!stack.contains(this.items[i])) {
                    if (this.items[i].cloneDistinct)
                        stack.push(this.items[i].cloneDistinct());
                    else if (this.items[i].clone)
                        stack.push(this.items[i].clone());
                    else
                        stack.push(this.items[i]);
                }
            return stack;
        };
        ;
        return Stack;
    }(ds.Aggregate));
    ds.Stack = Stack;
})(ds || (ds = {}));
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var StackIterator = /** @class */ (function () {
        /**
         * Class that implements the iterator for a linked list.
         * @param aggregate {Stack} The aggregate to scan.
         * @constructor
         */
        function StackIterator(aggregate) {
            /**
             * The pointer to the position.
             * @type {number}
             */
            this.pointer = -1;
            this.aggregate = aggregate;
            this.pointer = -1;
        }
        /**
         * @inheritDoc
         */
        StackIterator.prototype.first = function () {
            this.pointer = this.aggregate.items.length - 1;
        };
        ;
        /**
         * @inheritDoc
         */
        StackIterator.prototype.next = function () {
            this.pointer--;
        };
        ;
        /**
         * @inheritDoc
         */
        StackIterator.prototype.last = function () {
            this.pointer = 0;
        };
        ;
        /**
         * @inheritDoc
         */
        StackIterator.prototype.previous = function () {
            this.pointer++;
        };
        ;
        /**
         * @inheritDoc
         */
        StackIterator.prototype.isDone = function () {
            return this.pointer < 0 || this.pointer > this.aggregate.items.length - 1;
        };
        ;
        /**
         * @inheritDoc
         */
        StackIterator.prototype.getItem = function () {
            return this.aggregate.items[this.pointer];
        };
        ;
        return StackIterator;
    }());
    ds.StackIterator = StackIterator;
})(ds || (ds = {}));
/**
 * Created by Stefano on 02/02/2015.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var TNode = /** @class */ (function () {
        /**
         * The single node of the tree.
         * @param [string = null] The string of the node.
         * @param [item = null] The item to store in the node.
         * @constructor
         */
        function TNode(string, item) {
            /**
             * The item stored.
             * @type {*|null}
             */
            this.item = null;
            /**
             * The key of the node.
             * @type {string|null}
             */
            this.string = null;
            /**
             * The parent node. It's null if there's no a parent node.
             * @type {TNode|null}
             */
            this.parent = null;
            /**
             * The children of the node.
             * @type {Array<TNode>}
             */
            this.childs = [];
            this.item = item || null;
            this.string = string || null;
            this.parent = null;
            this.childs = [];
        }
        return TNode;
    }());
    ds.TNode = TNode;
    var Trie = /** @class */ (function (_super) {
        __extends(Trie, _super);
        /**
         * Class for managing a trie
         * @constructor
         */
        function Trie() {
            var _this = _super.call(this) || this;
            /**
             * The size of the trie
             * @type {number}
             */
            _this.size = 0;
            _this.root = new TNode('');
            _this.size = 0;
            return _this;
        }
        /**
         * @inheritDoc
         */
        Trie.prototype.getIterator = function () {
            return new ds.TrieIterator(this);
        };
        ;
        /**
         * Insert the string in the tree creating the relative path to it.
         * If the string already exists then the values are updated
         * @param string {string} The string to store.
         * @param [item = null] The item to store.
         * @return {void}
         */
        Trie.prototype.insert = function (string, item) {
            var node = this.root;
            var i = 0;
            while (i < string.length && node.childs[string.charCodeAt(i)]) {
                node = node.childs[string.charCodeAt(i)];
                ++i;
            }
            while (i < string.length) {
                node.childs[string.charCodeAt(i)] = new TNode();
                node = node.childs[string.charCodeAt(i)];
                ++i;
            }
            if (node.string != string)
                ++this.size;
            node.string = string;
            node.item = item;
        };
        ;
        /**
         * Suggest the possible conclusion for the string.
         * @param string {string} The start of the string.
         * @return {Array<string>} The array of possible string conclusion to fill.
         */
        Trie.prototype.suggest = function (string) {
            var node = this.root;
            for (var i = 0; i < string.length && node; ++i) {
                node = node.childs[string.charCodeAt(i)];
            }
            var results = [];
            if (node) {
                this.stringsToArray(results, node);
            }
            return results;
        };
        ;
        /**
         * Return all the string saved under the node in the array.
         * @param result {Array<string>} The array to fill.
         * @param [node {TNode|null} = null] The node from which start searching the strings.
         * @return {void}
         */
        Trie.prototype.stringsToArray = function (result, node) {
            node = node || this.root;
            if (node.string) {
                result.push(node.string);
            }
            for (var key in node.childs) {
                if (key !== 'length' && node.childs.hasOwnProperty(key)) {
                    this.stringsToArray(result, node.childs[key]);
                }
            }
        };
        ;
        /**
         * Update the item related to the string searched.
         * @param string {string} The string for finding the item.
         * @param callback {function} The function to execute to update the item. It should accept the item the iteration is working on.
         * @return {void}
         */
        Trie.prototype.updateItem = function (string, callback) {
            var node = this.root;
            var i = 0;
            while (i < string.length && node.childs[string.charCodeAt(i)]) {
                node = node.childs[string.charCodeAt(i)];
                ++i;
            }
            // Update the value only if the node reached correspond to the string
            if (node && node.string == string) {
                node.item = callback(node.item);
            }
        };
        ;
        /**
         * Return the item related to the string searched.
         * @param string {string} The string for finding the item.
         * @returns {*} The item found. Undefined if the string is not in the trie
         */
        Trie.prototype.getItem = function (string) {
            var node = this.root;
            var i = 0;
            while (i < string.length && node.childs[string.charCodeAt(i)]) {
                node = node.childs[string.charCodeAt(i)];
                ++i;
            }
            // Return the value only if the node reached correspond to the string
            if (node && node.string == string) {
                return node.item;
            }
            return undefined;
        };
        ;
        /**
         * Return the size of the trie.
         * @returns {number} The size of the tree.
         */
        Trie.prototype.getSize = function () {
            return this.size;
        };
        ;
        /**
         * Get the minimum string stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {string} The string found.
         */
        Trie.prototype.minimum = function (node) {
            node = node || this.root;
            return node.string;
        };
        ;
        /**
         * Get the maximum string stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {string} The string found.
         */
        Trie.prototype.maximum = function (node) {
            node = node || this.root;
            while (node && node.childs[node.childs.length - 1])
                node = node.childs[node.childs.length - 1];
            return node.string;
        };
        ;
        return Trie;
    }(ds.Aggregate));
    ds.Trie = Trie;
})(ds || (ds = {}));
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
var ds;
(function (ds) {
    var TrieIterator = /** @class */ (function () {
        /**
         * Class that implements the iterator for a trie.
         * @param aggregate {Trie} The aggregate to scan.
         * @constructor
         */
        function TrieIterator(aggregate) {
            /**
             * The pointer to the position.
             * @type {TNode|null}
             */
            this.pointer = null;
            this.aggregate = aggregate;
            this.pointer = null;
        }
        /**
         * @inheritDoc
         */
        TrieIterator.prototype.first = function () {
            this.pointer = this.aggregate.minimum();
        };
        ;
        /**
         * @inheritDoc
         */
        TrieIterator.prototype.next = function () {
            this.pointer = this.aggregate.successor(this.pointer);
        };
        ;
        /**
         * @inheritDoc
         */
        TrieIterator.prototype.last = function () {
            this.pointer = this.aggregate.maximum();
        };
        ;
        /**
         * @inheritDoc
         */
        TrieIterator.prototype.previous = function () {
            this.pointer = this.aggregate.predecessor(this.pointer);
        };
        ;
        /**
         * @inheritDoc
         */
        TrieIterator.prototype.isDone = function () {
            return !this.pointer;
        };
        ;
        /**
         * @inheritDoc
         */
        TrieIterator.prototype.getItem = function () {
            return this.pointer.item;
        };
        ;
        return TrieIterator;
    }());
    ds.TrieIterator = TrieIterator;
})(ds || (ds = {}));
//# sourceMappingURL=ds.js.map