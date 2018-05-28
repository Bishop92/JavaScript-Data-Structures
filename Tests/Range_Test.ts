/**
 * Created by Stefano on 06/04/14.
 */

QUnit.test("Range - Create linear test", function (assert)
{
    var range = ds.Range(0, 5);
    for (var j = 0; j < range.length; j++)
    {
        assert.deepEqual(range[j], j, "Check range values");
    }
});

QUnit.test("Range - Create inverse test", function (assert)
{
    var range = ds.Range(5, 0, -1);
    for (var j = 0; j < range.length; j++)
    {
        assert.deepEqual(range[j], 5 - j, "Check range values");
    }
});

QUnit.test("Range - Create step test", function (assert)
{
    var range = ds.Range(0, 15, 4);
    for (var j = 0; j < range.length; j++)
    {
        assert.deepEqual(range[j], j * 4, "Check range values");
    }
});

QUnit.test("Range - Create inverse step test", function (assert)
{
    var range = ds.Range(15, 4, -2);
    for (var j = 0; j < range.length; j++)
    {
        assert.deepEqual(range[j], 15 - j * 2, "Check range values");
    }
});