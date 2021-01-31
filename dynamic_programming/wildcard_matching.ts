/**
 * https://leetcode.com/problems/wildcard-matching/
 * let f(i,j) denote if s[0:i+1] matches p[0,j+1] where the end index is exclusive.
 * based on 3 possibilities:
 * f(i,j) = 
 * case 1: (s[i] == p[j]) && f(i-1,j-1)
 * case 2: (p[j] == '?') && f(i-1,j-1)
 * case 3: (p[j] == '*) && (f(i-1,j) || f(i,j-1))       single random character match & match null respectively
 * 
 * defining f as a matrix and using the above state equation to populate it with base case:
 * f(i,0) = false ∀ i>0
 * f(0,0) = true
 * 
 * Now since we see we the state function refers to two rows of matrix to generate the relavant state,
 * we can do with 2 1d matrices instead of 2d matrix.
 * @param s : string
 * @param p : pattern
 */
function isMatch(s: string, p: string): boolean {
    let sl = s.length, pl = p.length;
    function isValid(i: number, j: number): boolean {
        return (i >= 0 && i < sl && j >= 0 && j < pl)
    }
    let A: boolean[] = new Array<boolean>(pl + 1);
    let B: boolean[] = new Array<boolean>(pl + 1);
    for (let i: number = 0; i <= sl; i++) {
        for (let j: number = 0; j <= pl; j++) {
            // if (i === 0) B[j] = false;
            if (j === 0 && i === 0) B[j] = true;
            else {
                B[j] = (isValid(i - 1, j - 1) && (s.charAt(i - 1) === p.charAt(j - 1) || p.charAt(j - 1) === '?') && A[j - 1])
                    || (j > 0 && p.charAt(j - 1) === '*' && (A[j] || B[j - 1]));
            }
        }
        [A, B] = [B, A];
    }
    return A[pl];

};

console.log(isMatch('', '**'));