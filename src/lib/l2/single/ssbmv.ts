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

import { errWrongArg, FortranArr, lowerChar, Matrix } from '../../f_func';

const { max, min } = Math;

export function ssbmv(
    uplo: string,
    n: number,
    k: number,
    alpha: number,
    a: Matrix,
    lda: number,
    x: FortranArr,
    incx: number,
    beta: number,
    y: FortranArr,
    incy: number,
): void {
    // test input params

    const ul = lowerChar(uplo);

    let info = 0;
    if (!'ul'.includes(ul)) {
        info = 1;
    } else if (n < 0) {
        info = 2;
    } else if (k < 0) {
        info = 3;
    } else if (lda < k + 1) {
        info = 6;
    } else if (incx === 0) {
        info = 8;
    } else if (incy === 0) {
        info = 11;
    }

    if (info !== 0) {
        throw new Error(errWrongArg('ssbmv', info));
    }

    if (n === 0 || (alpha === 0 && beta === 1)) return;

    let kx = incx > 0 ? 1 : 1 - (n - 1) * incx;
    let ky = incy > 0 ? 1 : 1 - (n - 1) * incy;

    // First form  y := beta*y.

    if (beta !== 1) {
        let iy = ky;
        for (let i = 1; i <= n; i++) {
            y.r[iy - y.base] = beta === 0 ? 0 : beta * y.r[iy - y.base];
            iy += incy;
        }
    }

    if (alpha === 0) return;
    if (ul === 'u') {
        const kplus1 = k + 1;
        let jx = kx;
        let jy = ky;

        for (let j = 1; j <= n; j++) {
            const temp1 = alpha * x.r[jx - x.base];
            let temp2 = 0;
            let ix = kx;
            let iy = ky;
            const l = kplus1 - j;
            const coorAJ = a.colOfEx(j);
            for (let i = max(1, j - k); i <= j - 1; i++) {
                y.r[iy - y.base] += temp1 * a.r[coorAJ + l + i];
                temp2 += a.r[coorAJ + l + i] * x.r[ix - x.base];
                ix += incx;
                iy += incy;
            }
            y.r[jy - y.base] += temp1 * a.r[coorAJ + kplus1] + alpha * temp2;
            jx += incx;
            jy += incy;
            if (j > k) {
                kx += incx;
                ky += incy;
            }
        }
    }
    // ul !=== 'U'
    // Form  y  when lower triangle of A is stored.
    else {
        let jx = kx;
        let jy = ky;
        for (let j = 1; j <= n; j++) {
            const coorAJ = a.colOfEx(j);
            const temp1 = alpha * x.r[jx - x.base];
            let temp2 = 0;
            y.r[jy - y.base] += temp1 * a.r[1 + coorAJ];
            const l = 1 - j;
            let ix = jx;
            let iy = jy;
            for (let i = j + 1; i <= min(n, j + k); i++) {
                ix += incx;
                iy += incy;
                y.r[iy - y.base] += temp1 * a.r[coorAJ + l + i];
                temp2 += a.r[coorAJ + l + i] * x.r[ix - x.base];
            }
            y.r[jy - y.base] += alpha * temp2;
            jx += incx;
            jy += incy;
        }
    }
}
