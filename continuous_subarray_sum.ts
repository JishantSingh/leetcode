/**
 * https://leetcode.com/problems/continuous-subarray-sum/submissions/
 * 
 * LOGIC: let M[i,j] denote ∑nums[q] ∀ q ∈ [i,j] 
 * we want to find 
 * i,j s.t M[i,j] mod k = 0 & j>i -- Eq 1.
 * 
 * let S[j] ≡ Σnums[q] ∀ q ∈ [0,j]
 * 
 * Now, M[i,j] ≡ S[j] - S[i-1]
 * acc to our req. Eq 1.
 * M[i,j] mod k ≡ (S[j] - S[i-1]) mod k
 * 
 * Solving for Eq 1.
 * M[i,j] mod k = 0
 * ⇒ S[j] mod k - S[i-1] mod k = 0
 * ⇒ S[j] mod k = S[i-1] mod k  ...Eq 2.
 * And from our second req. 
 * j > i-1
 * ⇒ j-i > 1 ...Eq 3.
 * Now for j we have to find i ∈ [0,j) s.t S[j] mod k = S[i-1] mod k
 * translating this into an algorithm ... 
 * @param nums 
 * @param k 
 */
function remainderTheorem(nums: number[], k: number): boolean {
    let mp: Map<number, number> = new Map();
    let len: number = nums.length;
    let Sj: number = 0;
    mp.set(0, -1)
    for (let i = 0; i < len; i++) {
        Sj += nums[i];
        if (k !== 0) {
            Sj %= k;
        }
        if (mp.has(Sj) && i - mp.get(Sj)! > 1) {
            return true;
        }
        if (!mp.has(Sj)) {
            mp.set(Sj, i);
        }
    }
    return false;
}


/**
 * https://leetcode.com/problems/continuous-subarray-sum/submissions/
 * logic: 
 * len(nums) ≤ 1e4 => O(n*n) algo would suffice the O(1e9) bound.
 * 
 * let f(i,j) denotes subarray sum ∑nums[t] for t in [i,j].
 * we can also say i.e f(i,j+1) = f(i,j) + nums[j+1] (further referred to as eq. S)
 * 
 * we can use dp to reduce the exponential bound of brute force algo to O(n^2).
 * since in the state equation S, f(i, j+1) only depends on f(i,j), we do not need a 2d array.
 * Hence using the state equation S.
 * M[j+1] = M[j] + nums[j+1] where j goes [1,n-1] then [2,n-1], then [3, n-1], then [4,n-1] .. 
 * (i: 1 -> n-1) (j: n-1 -> i) M[j] = M[j-1] + nums[j]
 * 
 * @param nums 
 * @param k 
 */
function checkSubarraySumPrefixSum(nums: number[], k: number): boolean {
    let len: number = nums.length;
    let M: number[] = Array.from(nums);
    for (let i = 0; i < len; i++) {
        for (let j = len - 1; j > i; j--) {
            M[j] = M[j - 1] + nums[j];
            if (M[j] % k == 0 || (M[j] === 0 && k === 0)) return true;
        }
    }
    return false;

};

function checkSubarraySum(nums: number[], k: number): boolean {
    // return checkSubarraySumPrefixSum(nums, k);
    return remainderTheorem(nums, k);
};
console.log(checkSubarraySum([1, 0], 0));