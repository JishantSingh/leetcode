/**
 * let arrSum = ∑arr,
 * case 1: k=0 => ans = 0
 * case 2: k=1 => ans = kadane(arr)
 * case 3: k>1 => 
 * ans is max of
 *  1. kadane(arr)
 *  2. maximum prefix sum + maximum suffix sum + k-2 * arrSum
 * here maximum sum tail means the tail subarray that has the highest sum of all tailing subarrays
 * similar logic for maximum sum head.
 * @param arr : input array
 * @param k : times
 */
function kConcatenationMaxSum(arr: number[], k: number): number {
    let arrSum: number = arr.reduce((x: number, y: number) => x + y);
    let hts: number = maxPrefixSuffixSum(arr);
    if (k < 1) return 0;
    if (k === 1) return kadane(arr);
    return Math.max(kadane(arr), hts, hts + (k - 2) * arrSum) % (1000000007);
};

/**
 * Regular Kadane Algorithm
 * @param nums : input array
 */
function kadane(nums: number[]): number {
    let maxCumSum: number = 0, cumSum = maxCumSum;
    let startIndex: number = 0;
    let endIndex: number = 0;
    let i: number = 0, j: number = 0, n: number = nums.length;
    while (i < n && j < n) {
        let cumSumCp = cumSum + nums[j];
        if (cumSumCp > maxCumSum) {
            startIndex = i;
            endIndex = j;
            maxCumSum = cumSumCp;
        }
        else if (cumSumCp < 0) {
            i = j + 1;
            cumSumCp = 0;
        }
        cumSum = cumSumCp;
        j++;
    }
    // console.log(maxCumSum);

    return maxCumSum;
}

/**
 * computes maximum suffix sum and maximum perfix sum.
 * @param nums 
 */
function maxPrefixSuffixSum(nums: number[]): number {
    let n: number = nums.length;
    let maxPrefixSum2: number = 0, prefixSum: number = 0, suffixSum: number = 0;
    let maxSuffixSum: number = 0;
    for (let i: number = 0; i < n; i++) {
        prefixSum += nums[i];
        maxPrefixSum2 = Math.max(maxPrefixSum2, prefixSum);
        suffixSum += nums[n - i - 1]
        maxSuffixSum = Math.max(maxSuffixSum, suffixSum);
    }
    return maxPrefixSum2 + maxSuffixSum;
}

console.log(kConcatenationMaxSum([4, -6, 12, -12, 4], 5));