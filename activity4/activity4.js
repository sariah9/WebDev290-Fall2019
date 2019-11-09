//Activity 4

/*Be very careful if you are defining a function within a loop: the local variables from the 
closure do not act as you might first think.

function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];
        result.push( function() {alert(item + ' ' + list[i])} );
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

The line result.push( function() {alert(item + ' ' + list[i])} adds a reference to an anonymous
function three times to the result array. If you are not so familiar with anonymous functions 
think of it like:

pointer = function() {alert(item + ' ' + list[i])};
result.push(pointer);*/

/*First attempt at solution. Not sure if the changes are too 'trivial' */
/*changing var to let creates bindings much like the function.bind solution */

function buildList(list) {
    var result = [];
    for (let i = 0; i < list.length; i++) {
        let item = 'item' + list[i];
        result.push( function(){alert(item + ' ' + list[i])} );
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (let j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();

/*------------------------------------------------------------*/
/*Second attempt at solution. Probably more in-line with rubric */

function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var resultC = (function(x){ 
            return function(){
                var item = 'item' + list[x];
                var item2 = item + ' ' + list[x];
                alert(item2);
            }
        })(i);
        result.push(resultC);
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();
