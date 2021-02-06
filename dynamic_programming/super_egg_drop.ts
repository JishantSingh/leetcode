/**
 * https://leetcode.com/problems/super-egg-drop/
 */
import _ from 'lodash';

interface Predicate<T> {
    (el: T): boolean;
}

export function binarySearch<T>(coll: Array<T>, lo: number, hi: number, predicate: Predicate<T>): T {
    hi--;
    while (lo < hi) {
        let mid: number = Math.floor(lo + (hi - lo) / 2);
        if (predicate(coll[mid])) hi = mid;
        else lo = mid + 1;
    }
    // return predicate(coll[hi]) ? hi : -hi - 1;
    return coll[hi];
}
/**
 * 
 * @param K : number of eggs
 * @param N : number of floors 
 */
function eggDropBinarySearch(K: number, N: number): number {
    let M: number[][] = Array.from(new Array(K + 1), (v) => new Array(N + 1).fill(Infinity));
    function dp(k: number, n: number): number {
        // console.log(k, "   ", n);
        if (n == 0) {
            // console.log(`returning from state : ${k} ${n} : 0`);
            return 0;
        }
        if (k == 1) {
            // console.log(`returning from state : ${k} ${n} : ${n}`);
            return n;
        }
        if (M[k][n] !== Infinity) {
            // console.log(`returning from state : ${k} ${n} : ${M[k][n]}`);
            return M[k][n];
        }
        let iOptimalHigh = binarySearch(_.range(1, n + 1), 0, n, i => dp(k - 1, i - 1) - dp(k, n - i) >= 0);
        // console.log(`Optimal high for : ${k} ${n} is : ${iOptimalHigh}`);
        let iOptimalLow = iOptimalHigh - 1;
        M[k][n] = (iOptimalLow >= 1) ? Math.min(dp(k, n - iOptimalLow), dp(k - 1, iOptimalHigh - 1)) + 1 : dp(k - 1, iOptimalHigh - 1) + 1;
        // M[k][n] = Math.min(M[k][n - iOptimalLow], M[k - 1][iOptimalHigh - 1]) + 1;
        // console.log(`returning from state : ${k} ${n} : ${M[k][n]}`);

        return M[k][n];
    }
    
    // console.log(dp(K, N));
    // console.log(M);
    return dp(K,N);

    // return dp(K, N);
}

/**
 * 
 * @param K : number of eggs
 * @param N : number of floors 
 */
function superEggDrop(K: number, N: number): number {
    return eggDropBinarySearch(K, N);
};

console.log(superEggDrop(2,6));