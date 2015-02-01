/**
 * Created by Stefano on 06/04/14.
 */

test("Range - Create linear test", function () {
    var range = Range(0, 5);
    for (var j = 0; j < range.length; j++) {
        deepEqual(range[j], j, "Check range values");
    }
});

test("Range - Create inverse test", function () {
    var range = Range(5, 0, -1);
    for (var j = 0; j < range.length; j++) {
        deepEqual(range[j], 5 - j, "Check range values");
    }
});

test("Range - Create step test", function () {
    var range = Range(0, 15, 4);
    for (var j = 0; j < range.length; j++) {
        deepEqual(range[j], j * 4, "Check range values");
    }
});

test("Range - Create inverse step test", function () {
    var range = Range(15, 4, -2);
    for (var j = 0; j < range.length; j++) {
        deepEqual(range[j], 15 - j * 2, "Check range values");
    }
});