/**
 * Created by Stefano on 06/04/14.
 */

test("Set - Insert test", function () {
	var setA = new Set();
	var e0 = new Element(0);
	var e1 = new Element(1);
	setA.multiInsert([e0, e1]);
	deepEqual(setA.getItems(), [0, 1], "Insert elements");
	deepEqual(setA.getCardinality(), 2, "Insert elements");
});

test("Set - Union test", function () {
	var setA = new Set();
	var setB = new Set();
	var e0 = new Element(0);
	var e1 = new Element(1);
	var e2 = new Element(2);
	var e3 = new Element(3);
	setA.multiInsert([e0, e1]);
	setA.multiInsert([e2, e3]);
	var union = setA.union(setB);
	deepEqual(setA.parents.contains(union), true, "Union of sets");
	deepEqual(setB.parents.contains(union), true, "Union of sets");
	deepEqual(union.getCardinality(), 4, "Union of sets");
});

test("Set - Intersection test", function () {
	var setA = new Set();
	var setB = new Set();
	var e = [];
	for (var i = 0; i < 6; i++) {
		e.push(new Element(i));
		if (i < 4)
			setA.insert(e[i]);
		if (i > 1)
			setB.insert(e[i]);
	}
	var intersection = setA.intersect(setB);
	for (var k = 0; k < 2; k++)
		deepEqual(intersection.elements.getItem(k).item, k + 2, "Intersection of sets");
	deepEqual(intersection.getCardinality(), 2, "Intersection of sets");
});

test("Set - Difference test", function () {
	var setA = new Set();
	var setB = new Set();
	var e = [];
	for (var i = 0; i < 6; i++) {
		e.push(new Element(i));
		if (i < 4)
			setA.insert(e[i]);
		if (i > 1)
			setB.insert(e[i]);
	}
	var diffA = setA.difference(setB);
	var diffB = setB.difference(setA);
	for (var j = 0; j < 2; j++)
		deepEqual(diffA.elements.getItem(j).item, j, "Difference of sets");
	deepEqual(diffA.getCardinality(), 2, "Difference of sets");
	for (var k = 0; k < 2; k++)
		deepEqual(diffB.elements.getItem(k).item, k + 4, "Difference of sets");
	deepEqual(diffB.getCardinality(), 2, "Difference of sets");
});

test("Set - Cartesian product test", function () {
	var setA = new Set();
	var setB = new Set();
	var e = [];
	for (var i = 0; i < 6; i++) {
		e.push(new Element(i));
		if (i < 3)
			setA.insert(e[i]);
		if (i > 2)
			setB.insert(e[i]);
	}
	var productA = setA.cartesianProduct(setB);
	var productB = setB.cartesianProduct(setA);
	deepEqual(productA.getItems(), [
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
	deepEqual(productA.getCardinality(), 9, "Cartesian product of sets");
	deepEqual(productB.getItems(), [
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
	deepEqual(productB.getCardinality(), 9, "Cartesian product of sets");
});