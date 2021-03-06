/* This is a conversion from BLAS to Typescript/Javascript
Copyright (C) 2018  Jacob K.F. Bogers  info@mail.jacob-bogers.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Complex, errMissingIm, errWrongArg, lowerChar, Matrix } from '../../f_func';

const { max } = Math;

export function cher2k(
    uplo: 'u' | 'l',
    trans: 'n' | 'c',
    n: number,
    k: number,
    alpha: Complex,
    a: Matrix,
    lda: number,
    b: Matrix,
    ldb: number,
    beta: number,
    c: Matrix,
    ldc: number,
): void {
    if (a.i === undefined) {
        throw new Error(errMissingIm('a.i'));
    }
    if (b.i === undefined) {
        throw new Error(errMissingIm('b.i'));
    }
    if (c.i === undefined) {
        throw new Error(errMissingIm('c.i'));
    }

    const tr = lowerChar(trans);
    const ul = lowerChar(uplo);

    const alphaIsZero = alpha.re === 0 && alpha.im === 0;

    const nrowA = trans === 'n' ? n : k;
    const upper = ul === 'u';

    let info = 0;

    if (!'ul'.includes(ul)) {
        info = 1;
    } else if (!'nc'.includes(tr)) {
        info = 2;
    } else if (n < 0) {
        info = 3;
    } else if (k < 0) {
        info = 4;
    } else if (lda < max(1, nrowA)) {
        info = 7;
    } else if (ldb < max(1, nrowA)) {
        info = 9;
    } else if (ldc < max(1, n)) {
        info = 12;
    }
    if (info !== 0) {
        throw new Error(errWrongArg('cher2k', info));
    }

    //     Quick return if possible.

    /*IF(
            (N.EQ.0).OR.(
                (
                    (ALPHA.EQ.ZERO).OR.(K.EQ.0)
                ).AND.(BETA.EQ.ONE)
            )
    ) RETURN*/

    if (n === 0 || ((alphaIsZero || k === 0) && beta === 1)) return;

    //* And when  alpha.eq.zero.
    if (alphaIsZero) {
        for (let j = 1; j <= n; j++) {
            const f1 = upper ? 1 : j;
            const f2 = upper ? j : n;
            if (beta === 0) {
                c.setCol(j, f1, f2, 0);
                continue;
            }
            const coorCJ = c.colOfEx(j);
            const start = upper ? 1 : j + 1;
            const stop = upper ? j - 1 : n;
            //this test is non necessary the combination
            // alpha===(0,0) && beta === 1 leads to early abort (see couple upper code)

            for (let i = start; i <= stop; i++) {
                c.r[coorCJ + i] *= beta;
                c.i[coorCJ + i] *= beta;
            }
            c.r[coorCJ + j] *= beta;
            c.i[coorCJ + j] = 0;
        }
        return;
    }

    //Start the operations.

    if (tr === 'n') {
        // Form  C := alpha*A*B**H + conjg( alpha )*B*A**H +
        if (upper) {
            for (let j = 1; j <= n; j++) {
                const coorCJ = c.colOfEx(j);
                if (beta === 0) {
                    c.setCol(j, 1, j, 0);
                } else if (beta !== 1) {
                    for (let i = 1; i <= j - 1; i++) {
                        c.r[coorCJ + i] *= beta;
                        c.i[coorCJ + i] *= beta;
                    }
                    c.r[coorCJ + j] *= beta;
                    c.i[coorCJ + j] = 0;
                } else {
                    c.i[coorCJ + j] = 0;
                }
                for (let l = 1; l <= k; l++) {
                    const coorAL = a.colOfEx(l);
                    const coorBL = b.colOfEx(l);
                    const aIsZero = a.r[coorAL + j] === 0 && a.i[coorAL + j] === 0;
                    const bIsZero = b.r[coorBL + j] === 0 && b.i[coorBL + j] === 0;
                    // console.log(`A(${j},${l})=(${a.r[coorAL + j]},${a.i[coorAL + j]})\tB(${j},${l})=(${b.r[coorBL + j]},${b.i[coorBL + j]})`);
                    // console.log(`isAZero=${aIsZero}, isBZero=${bIsZero}`);
                    if (!aIsZero || !bIsZero) {
                        //TEMP1 = ALPHA * CONJG(B(J, L))
                        //(a+ib)*(c-id) = (ac+bd)+i(-ad+bc)
                        //
                        const temp1Re = alpha.re * b.r[coorBL + j] + alpha.im * b.i[coorBL + j];
                        const temp1Im = -alpha.re * b.i[coorBL + j] + alpha.im * b.r[coorBL + j];

                        const temp2Re = alpha.re * a.r[coorAL + j] - alpha.im * a.i[coorAL + j];
                        let temp2Im = alpha.re * a.i[coorAL + j] + alpha.im * a.r[coorAL + j];

                        temp2Im = -temp2Im;
                        for (let i = 1; i <= j; i++) {
                            //C(I, J) = C(I, J) + [A(I, L) * TEMP1] +
                            //+                                 B(I, L) * TEMP2
                            c.r[coorCJ + i] += a.r[coorAL + i] * temp1Re - a.i[coorAL + i] * temp1Im;
                            c.i[coorCJ + i] += a.r[coorAL + i] * temp1Im + a.i[coorAL + i] * temp1Re;

                            c.r[coorCJ + i] += b.r[coorBL + i] * temp2Re - b.i[coorBL + i] * temp2Im;
                            c.i[coorCJ + i] += b.r[coorBL + i] * temp2Im + b.i[coorBL + i] * temp2Re;
                        }
                        c.i[coorCJ + j] = 0;
                    }
                }
            }
        }
        //not upper
        else {
            for (let j = 1; j <= n; j++) {
                const coorCJ = c.colOfEx(j);
                if (beta === 0) {
                    c.setCol(j, j, n, 0);
                } else if (beta !== 1) {
                    for (let i = j + 1; i <= n; i++) {
                        c.r[coorCJ + i] *= beta;
                        c.i[coorCJ + i] *= beta;
                    }
                    c.r[coorCJ + j] *= beta;
                    c.i[coorCJ + j] = 0;
                } else {
                    c.i[coorCJ + j] = 0;
                }
                //
                for (let l = 1; l <= k; l++) {
                    const coorAL = a.colOfEx(l);
                    const coorBL = b.colOfEx(l);
                    const aIsZero = a.r[coorAL + j] === 0 && a.i[coorAL + j] === 0;
                    const bIsZero = b.r[coorBL + j] === 0 && b.i[coorBL + j] === 0;
                    if (!aIsZero || !bIsZero) {
                        //TEMP1 = ALPHA * CONJG(B(J, L))
                        //(a+ib)*(c-id) = (ac+bd)+i(-ad+bc)
                        const temp1Re = alpha.re * b.r[coorBL + j] + alpha.im * b.i[coorBL + j];
                        const temp1Im = -alpha.re * b.i[coorBL + j] + alpha.im * b.r[coorBL + j];
                        // TEMP2 = DCONJG(ALPHA*A(J,L))
                        const temp2Re = alpha.re * a.r[coorAL + j] - alpha.im * a.i[coorAL + j];
                        const temp2Im = -(alpha.re * a.i[coorAL + j] + alpha.im * a.r[coorAL + j]);
                        //console.log(`${l}, (${temp1Re},${temp1Im}),(${temp2Re},${temp2Im})`);
                        for (let i = j + 1; i <= n; i++) {
                            //DO 160 I = J + 1, N, note we use starting i=j (because of cleanup after)
                            // A(I, L) * TEMP1
                            const re1 = a.r[coorAL + i] * temp1Re - a.i[coorAL + i] * temp1Im;
                            const im1 = a.r[coorAL + i] * temp1Im + a.i[coorAL + i] * temp1Re;

                            const re2 = b.r[coorBL + i] * temp2Re - b.i[coorBL + i] * temp2Im;
                            const im2 = b.r[coorBL + i] * temp2Im + b.i[coorBL + i] * temp2Re;

                            c.r[coorCJ + i] += re1 + re2;
                            c.i[coorCJ + i] += im1 + im2;
                            //console.log(`${i},${j}, (${c.r[coorCJ + i]},${c.i[coorCJ + i]})`);
                        }
                        const re1 = a.r[coorAL + j] * temp1Re - a.i[coorAL + j] * temp1Im;
                        const re2 = b.r[coorBL + j] * temp2Re - b.i[coorBL + j] * temp2Im;
                        c.r[coorCJ + j] += re1 + re2;
                        c.i[coorCJ + j] = 0;
                    }
                } //for (k)
            } //for (j)
        } // end upper
    } //tr === 'c', conjugate
    else {
        // Form  C := alpha*A**H*B + conjg( alpha )*B**H*A + C.
        for (let j = 1; j <= n; j++) {
            const coorBJ = b.colOfEx(j);
            const coorAJ = a.colOfEx(j);
            const coorCJ = c.colOfEx(j);

            const start = upper ? 1 : j;
            const stop = upper ? j : n;

            for (let i = start; i <= stop; i++) {
                const coorAI = a.colOfEx(i);
                const coorBI = b.colOfEx(i);
                let temp1Re = 0;
                let temp1Im = 0;
                let temp2Re = 0;
                let temp2Im = 0;

                for (let l = 1; l <= k; l++) {
                    //(a-ib)*(c+id) = (ac+bd)+i(ad-bc)
                    //CONJG(A(L, I)) * B(L, J)
                    temp1Re += a.r[coorAI + l] * b.r[coorBJ + l] + a.i[coorAI + l] * b.i[coorBJ + l];
                    temp1Im += a.r[coorAI + l] * b.i[coorBJ + l] - a.i[coorAI + l] * b.r[coorBJ + l];
                    //CONJG(B(L, I)) * A(L, J)
                    //(a-ib)*(c+id) = (ac+bd)+i(ad-bc)
                    temp2Re += b.r[coorBI + l] * a.r[coorAJ + l] + b.i[coorBI + l] * a.i[coorAJ + l];
                    temp2Im += b.r[coorBI + l] * a.i[coorAJ + l] - b.i[coorBI + l] * a.r[coorAJ + l];
                    //console.log(`(${j},${i},${l}),\t(${temp1Re},${temp1Im})\t(${temp2Re},${temp2Im})`);
                }
                //console.log(`(${j},${i}),\t(${temp1Re},${temp1Im})\t(${temp2Re},${temp2Im})`);
                // done more efficiently then in fortran
                // (ALPHA*TEMP1+CONJG(ALPHA)*TEMP2)
                const re1 = alpha.re * temp1Re - alpha.im * temp1Im;
                const im1 = i === j ? 0 : alpha.re * temp1Im + alpha.im * temp1Re;

                const re2 = alpha.re * temp2Re + alpha.im * temp2Im;
                const im2 = i === j ? 0 : alpha.re * temp2Im - alpha.im * temp2Re;

                const re = re1 + re2;
                const im = im1 + im2;

                if (beta === 0) {
                    c.r[coorCJ + i] = re;
                    c.i[coorCJ + i] = im;
                } else {
                    c.r[coorCJ + i] = beta * c.r[coorCJ + i] + re;
                    if (i === j) {
                        c.i[coorCJ + i] = 0;
                    } else {
                        c.i[coorCJ + i] = beta * c.i[coorCJ + i] + im;
                    }
                }
            }
        }
    } //tr === 'c'
}
