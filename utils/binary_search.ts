import _ from 'lodash'

interface Predicate<T> {
    (el: T): boolean;
}

export function binarySearch<T>(coll: Array<T>, lo: number, hi: number, predicate: Predicate<T>): number {
    hi--;
    while (lo < hi) {
        let mid: number = Math.floor(lo + (hi - lo) / 2);
        if (predicate(coll[mid])) hi = mid;
        else lo = mid + 1;
    }
    return predicate(coll[hi]) ? hi : -hi - 1;
}
