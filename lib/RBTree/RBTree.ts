namespace ds
{
	export class RBNode<T>
	{
		/**
		 * The item stored.
		 * @type {*}
		 */
		item: T;
		/**
		 * The key of the node.
		 * @type {number}
		 */
		key: number;
		/**
		 * The parent node. It's null if there's no a parent node.
		 * @type {RBNode|null}
		 */
		parent: RBNode<T> = <any>null;
		/**
		 * The left node. It's null if there's no a left node.
		 * @type {RBNode|null}
		 */
		left: RBNode<T> = <any>null;
		/**
		 * The right node. It's null if there's no a right node.
		 * @type {RBNode|null}
		 */
		right: RBNode<T> = <any>null;
		/**
		 * The type of the node. It's or red or black.
		 * @type {string}
		 */
		type = 'r';

		/**
		 * The single node of the tree.
		 * @param key {number} The key of the node.
		 * @param item {*} The item to store in the node.
		 * @constructor
		 */
		constructor(key: number, item: T)
		{
			this.item = item;
			this.key = key;
			this.parent = <any>null;
			this.left = <any>null;
			this.right = <any>null;
			this.type = 'r';
		}

	}

	export class RBTree<T> extends Aggregate
	{
		/**
		 * The root of the tree.
		 * @type {RBNode|null}
		 */
		root: RBNode<T> = <any>null;
		/**
		 * The number of items stored in the tree.
		 * @type {number}
		 */
		size = 0;

		/**
		 * Class for managing a red-black tree.
		 * @constructor
		 */
		constructor()
		{
			super();
			this.root = <any>null;
			this.size = 0;
		}

		/**
		 * @inheritDoc
		 */
		getIterator()
		{
			return new RBTreeIterator<T>(this);
		};

		/**
		 * Insert the item relatives to the key value in the tree.
		 * @param key {number} The key to store.
		 * @param item {*} The item to store.
		 * @return {void}
		 */
		insert(key: number, item: T)
		{
			var node = new RBNode(key, item);
			this.size++;
			if (!this.root)
			{
				this.root = node;
				node.type = 'b';
				return;
			}
			var p = this.root;
			for (var n = this.root; n;)
			{
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

		/**
		 * Preserve the properties of the tree after an insert.
		 * @param node {RBNode} The node to insert.
		 * @return {void}
		 */
		insertFixUp(node: RBNode<T>)
		{
			for (var parent = node.parent; parent && parent.type === 'r'; parent = node.parent)
			{
				if (parent === parent.parent.left)
				{
					var uncle = parent.parent.right;
					if (uncle && uncle.type === 'r')
					{
						parent.type = 'b';
						uncle.type = 'b';
						parent.parent.type = 'r';
						node = parent.parent;
					} else if (node === parent.right)
					{
						node = parent;
						this.leftRotate(node);
					} else
					{
						parent.type = 'b';
						parent.parent.type = 'r';
						this.rightRotate(parent.parent);
					}
				} else
				{
					var uncle = parent.parent.left;
					if (uncle && uncle.type === 'r')
					{
						parent.type = 'b';
						uncle.type = 'b';
						parent.parent.type = 'r';
						node = parent.parent;
					} else if (node === parent.left)
					{
						node = parent;
						this.rightRotate(node);
					} else
					{
						parent.type = 'b';
						parent.parent.type = 'r';
						this.leftRotate(parent.parent);
					}
				}
			}
			this.root.type = 'b';
		};

		/**
		 * Delete the node from the tree.
		 * @param node {RBNode} The node to delete.
		 * @return {void}
		 */
		deleteNode(node: RBNode<T>)
		{
			var successor;
			this.size--;
			if (!node.left || !node.right)
				successor = node;
			else
			{
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

		/**
		 * Preserve the properties of the tree after a deletion.
		 * @param node {RBNode} The node to delete.
		 * @param parent {RBNode} The parent of the node.
		 * @return {void}
		 */
		deleteFixUp(node: RBNode<T>, parent: RBNode<T>)
		{
			while (node !== this.root && (!node || node.type === 'b'))
			{
				if (node === parent.left)
				{
					var brother = parent.right;
					if (brother && brother.type === 'r')
					{
						brother.type = 'b';
						parent.type = 'r';
						this.leftRotate(parent);
						brother = parent.right;
					}
					if (brother && (!brother.left || brother.left.type === 'b') && (!brother.right || brother.right.type === 'b'))
					{
						brother.type = 'r';
						node = parent;
					} else
					{
						if (!brother.right || brother.right.type === 'b')
						{
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
				} else
				{
					var brother = parent.left;
					if (brother && brother.type === 'r')
					{
						brother.type = 'b';
						parent.type = 'r';
						this.rightRotate(parent);
						brother = parent.left;
					}
					if (brother && (!brother.left || brother.left.type === 'b') && (!brother.right || brother.right.type === 'b'))
					{
						brother.type = 'r';
						node = parent;
					} else
					{
						if (!brother.left || brother.left.type === 'b')
						{
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

		/**
		 * Get the node with the key next to the param node key.
		 * @param node {RBNode} The node of which search the successor.
		 * @return {RBNode} The node found.
		 */
		successor(node: RBNode<T>)
		{
			if (node.right)
				return this.minimum(node.right);
			var parent = node.parent;
			while (parent && node === parent.right)
			{
				node = parent;
				parent = parent.parent;
			}
			return parent;
		};

		/**
		 * Get the node with the key previous to the param node key.
		 * @param node {RBNode} The node of which search the predecessor.
		 * @return {RBNode} The node found.
		 */
		predecessor(node: RBNode<T>)
		{
			if (node.left)
				return this.maximum(node.left);
			var parent = node.parent;
			while (parent && node === parent.left)
			{
				node = parent;
				parent = parent.parent;
			}
			return parent;
		};

		/**
		 * Search the item relatives to the key and to the nodes that satisfy the condition represented by the callback function.
		 * @param key {number} The key to find.
		 * @param [node = root] {RBNode} The node from which start the search.
		 * @param [callback = function(node){return(node.key===key);}] The condition to satisfy. The callback must accept the current node to check.
		 * @return {*} The item found or undefined if there isn't the key in the tree.
		 */
		search(key: number, node?: RBNode<T>, callback?: (node: RBNode<T>) => boolean)
		{
			node = node || this.root;
			callback = callback || function (node)
			{
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

		/**
		 * Checks if the tree contains a key or a node that satisfy the condition represented by the callback function.
		 * This method avoid to search in branches where the key won't be found.
		 * @param key {*} The key to find.
		 * @param [callback = function(node){return(node.key===key);}] The condition to satisfy. The callback must accept the current node to check.
		 * @return {boolean} True if the tree contains the key or a node that satisfy the condition, false otherwise.
		 */
		contains(key: number, callback?: (node: RBNode<T>) => boolean)
		{
			return this.search(key, <any>null, callback) !== undefined;
		};

		/**
		 * Checks if the tree contains a node that satisfy the condition represented by the callback function.
		 * This method check all the tree avoiding the binary search.
		 * @param callback {function} The condition to satisfy. The callback must accept the current node to check.
		 * @return {boolean} True if the tree contains the node that satisfy the condition, false otherwise.
		 */
		fullContains(callback: (key: number) => boolean)
		{
			var node = this.minimum();
			while (node && !callback(node.key))
				node = this.successor(node);
			return node !== null;
		};

		/**
		 * Get the item relatives to the minimum key stored in the tree.
		 * @param [node = root] {Node} The node from which start the search.
		 * @return {RBNode} The node found.
		 */
		minimum(node?: RBNode<T>)
		{
			node = node || this.root;
			while (node && node.left)
				node = node.left;
			return node;
		};

		/**
		 * Get the item relatives to the maximum key stored in the tree.
		 * @param [node = root] {Node} The node from which start the search.
		 * @return {RBNode} The node found.
		 */
		maximum(node?: RBNode<T>)
		{
			node = node || this.root;
			while (node && node.right)
				node = node.right;
			return node;
		};

		/**
		 * Rotate the node with its right child.
		 * @param node {RBNode} The node to rotate.
		 * @return {void}
		 */
		leftRotate(node: RBNode<T>)
		{
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

		/**
		 * Rotate the node with its left child.
		 * @param node {RBNode} The node to rotate.
		 * @return {void}
		 */
		rightRotate(node: RBNode<T>)
		{
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

		/**
		 * Returns the size of the tree.
		 * @return {number} The size of the tree.
		 */
		getSize()
		{
			return this.size;
		};

		/**
		 * Clones the queue into a new queue.
		 * @return {RBTree} The tree cloned from this queue.
		 */
		clone()
		{
			var tree = new RBTree<T>();
			var it = this.getIterator();
			for (it.first(); !it.isDone(); it.next())
			{
				var item: any = it.getNode().item;
				if (item.clone)
					tree.insert(it.getNode().key, item.clone());
				else
					tree.insert(it.getNode().key, item);
			}

			return tree;
		};

		/**
		 * Clones the tree into a new tree without cloning duplicated items.
		 * @return {RBTree} The tree cloned from this tree.
		 */
		cloneDistinct()
		{
			var tree = new RBTree<T>();
			var it = this.getIterator();
			for (it.first(); !it.isDone(); it.next())
			{
				var callback = function (node: RBNode<T>)
				{
					return node.key === it.getNode().key && node.item === it.getNode().item;
				};
				if (!tree.contains(it.getNode().key, callback))
				{
					var item: any = it.getNode().item;
					if (item.cloneDistinct)
						tree.insert(it.getNode().key, item.cloneDistinct());
					else if (item.clone)
						tree.insert(it.getNode().key, item.clone());
					else
						tree.insert(it.getNode().key, item);
				}
			}
			return tree;
		};

		/**
		 * Transform the tree into an array without preserving keys.
		 * @return {Array<*>} The array that represents the tree.
		 */
		toArray()
		{
			var result = [];
			for (var node = this.minimum(); node; node = this.successor(node))
				result.push(node.item);
			return result;
		};

		/**
		 * Removes all the items stored in the tree.
		 * @return {void}
		 */
		clear()
		{
			this.root = <any>null;
			this.size = 0;
		};

		/**
		 * Checks if the tree is empty.
		 * @return {boolean} True if the tree is empty, false otherwise.
		 */
		isEmpty()
		{
			return !this.size;
		};

		/**
		 * Executes the callback function for each item of the tree.
		 * This method modifies the tree so if you don't need to modify it you must return the same item stored.
		 * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
		 * @return {void}
		 */
		execute(callback: (item: T) => T)
		{
			for (var node = this.minimum(); node; node = this.successor(node))
				node.item = callback(node.item);
		};

		/**
		 * Returns the items that satisfy the condition determined by the callback.
		 * @param callback {function} The function that implements the condition.
		 * @return {Array<*>} The array that contains the items that satisfy the condition.
		 */
		filter(callback: (item: T) => boolean)
		{
			var result = [];
			for (var node = this.minimum(); node; node = this.successor(node))
				if (callback(node.item))
					result.push(node.item);
			return result;
		};

		/**
		 * Returns the first position of the item in the tree.
		 * @param item {*} The item to search.
		 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
		 * @return {number} The first position of the item.
		 */
		indexOf(item: T, callback?: (item: T) => boolean)
		{
			callback = callback || function (it)
			{
				return it === item;
			};
			var i = 0, node = this.minimum();
			while (node)
			{
				if (callback(node.item))
					return i;
				node = this.successor(node);
				i++;
			}
			return -1;
		};

		/**
		 * Returns the last position of the item in the tree.
		 * @param item {*} The item to search.
		 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
		 * @return {number} The last position of the item.
		 */
		lastIndexOf(item: T, callback?: (item: T) => boolean)
		{
			callback = callback || function (it)
			{
				return it === item;
			};
			var i = this.size - 1, node = this.maximum();
			while (node)
			{
				if (callback(node.item))
					return i;
				i--;
				node = this.predecessor(node);
			}
			return -1;
		};

		/**
		 * Returns all the position in which the item has been found in the tree.
		 * @param item {*} The item to search.
		 * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
		 * @return {Array<number>} The positions in which the item has been found.
		 */
		allIndexesOf(item: T, callback?: (item: T) => boolean)
		{
			callback = callback || function (it)
			{
				return it === item;
			};
			var i = 0, node = this.minimum();
			var indexes = [];
			while (node)
			{
				if (callback(node.item))
					indexes.push(i);
				i++;
				node = this.successor(node);
			}
			return indexes;
		};

		/**
		 * Returns the item at the position index.
		 * @param index {number} The position of the item.
		 * @return {*} The item at the position. It's undefined if index isn't in the tree bounds.
		 */
		getItem(index: number)
		{
			if (index < 0 || index > this.size - 1)
				return undefined;
			for (var node = this.minimum(), i = 0; i < index; node = this.successor(node))
				i++;
			return node.item;
		};
	}

}