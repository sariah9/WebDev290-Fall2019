//Chapter 4 Deep Comparison Activity 3
function deepEqual(valA, valB) {
    if (typeof valA === 'object' && typeof valB === 'object') {
        if (valA != null && valB != null) {
            let keysA = Object.keys(valA);
            let keysB = Object.keys(valB);
            if (keysA.length !== keysB.length) {
                return false;
            }
            if (keysA.join('') !== keysB.join('')) {
                return false;
            }
            for (let i = 0; i < keysA.length; i++) {        //for (let i in keysA) also works...
                if (deepEqual(valA[keysA[i]], valB[keysB[i]]) === false) {
                    return false;
                } else {
                    return true;
                }
            }
        } else {
            return false;
        } 
    } else {
        if (valA === valB) {
            return true;
        } else {
            return false;
        }
    }
}

//Sources Cited: Elias Van Ootegem. Deep comparison of objects/arrays [duplicate]. 
//Oct 8, 2019. https://stackoverflow.com/questions/13142968/deep-comparison-of-objects-arrays
