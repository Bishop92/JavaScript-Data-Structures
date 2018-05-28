/**
 * Created by Stefano on 05/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
namespace ds
{

	export class BSNode<T>
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
		 * @type {BSNode|null}
		 */
		parent: BSNode<T>;
		/**
		 * The left node. It's null if there's no a left node.
		 * @type {BSNode|null}
		 */
		left: BSNode<T>;
		/**
		 * The right node. It's null if there's no a right node.
		 * @type {BSNode|null}
		 */
		right: BSNode<T>;

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
		}
	}

	export class BSTree<T> extends Aggregate
	{
		/**
		 * The root of the tree.
		 * @type {BSNode|null}
		 */
		root: BSNode<T>;
		constructor()
		{
			super();
			this.root = <any>null;
		}

		/**
		 * @inheritDoc
		 */
		getIterator()
		{
			return new BSTreeIterator<T>(this);
		}

		/**
		 * Insert the item relatives to the key value in the tree.
		 * @param key {number} The key to store.
		 * @param item {*} The item to store.
		 * @return {void}
		 */
		insert(key: number, item: T)
		{
			var node = new BSNode<T>(key, item);
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
		}

		/**
		 * Search the item relatives to the key.
		 * @param key {Number} The key to find.
		 * @param [node = root] {BSNode} The node from which start the search.
		 * @return {*} The item found or undefined if there isn't the key in the tree.
		 */
		search(key: number, node: BSNode<T> | null = null)
		{
			node = node || this.root;
			while (node && key !== node.key)
				if (key < node.key)
					node = node.left;
				else
					node = node.right;
			if (node)
				return node.item;
			return undefined;
		}

		/**
		 * Get the item relatives to the minimum key stored in the tree.
		 * @param [node = root] {Node} The node from which start the search.
		 * @return {BSNode} The node found.
		 */
		minimum(node: BSNode<T> | null = null)
		{
			node = node || this.root;
			while (node && node.left)
				node = node.left;
			return node;
		}

		/**
		 * Get the item relatives to the maximum key stored in the tree.
		 * @param [node = root] {Node} The node from which start the search.
		 * @return {BSNode} The node found.
		 */
		maximum(node: BSNode<T> | null = null)
		{
			node = node || this.root;
			while (node && node.right)
				node = node.right;
			return node;
		}

		/**
		 * Get the node with the key next to the param node key.
		 * @param node {BSNode} The node of which search the successor.
		 * @return {BSNode} The node found.
		 */
		successor(node: BSNode<T>)
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
		}

		/**
		 * Get the node with the key previous to the param node key.
		 * @param node {BSNode} The node of which search the predecessor.
		 * @return {BSNode} The node found.
		 */
		predecessor(node: BSNode<T>)
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
		}

		/**
		 * Delete the node from the tree.
		 * @param node {BSNode} The node to delete.
		 * @return {void}
		 */
		deleteNode(node: BSNode<T>)
		{
			if (!node.left && !node.right)
			{
				if (node === this.root)
					this.root = <any>null;
				else if (node.parent.left === node)
					node.parent.left = <any>null;
				else
					node.parent.right = <any>null;
			} else if (node.left && node.right)
			{
				var next = this.successor(node);
				node.key = next.key;
				node.item = next.item;
				if (next.parent.left === next)
					next.parent.left = <any>null;
				else
					next.parent.right = <any>null;
			} else
			{
				if (node.right)
				{
					if (node === this.root)
					{
						this.root = node.right;
						node.right.parent = <any>null;
					} else
					{
						node.parent.right = node.right;
						node.right.parent = node.parent;
					}
				} else
				{
					if (node === this.root)
					{
						this.root = node.left;
						node.left.parent = <any>null;
					} else
					{
						node.parent.left = node.left;
						node.left.parent = node.parent;
					}
				}
			}
		}
	}
}