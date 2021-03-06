import { errWrongArg, FortranArr, lowerChar } from '../../f_func';

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

export function stpmv(
    uplo: 'u' | 'l',
    trans: 'n' | 't' | 'c',
    diag: 'u' | 'n',
    n: number,
    ap: FortranArr,
    x: FortranArr,
    incx: number,
): void {
    const ul = lowerChar(uplo);
    const tr = lowerChar(trans);
    const dg = lowerChar(diag);

    let info = 0;

    if (!'ul'.includes(ul)) {
        info = 1;
    } else if (!'ntc'.includes(tr)) {
        info = 2;
    } else if (!'un'.includes(dg)) {
        info = 3;
    } else if (n < 0) {
        info = 4;
    } else if (incx === 0) {
        info = 7;
    }

    if (info !== 0) {
        throw new Error(errWrongArg('stpmv', info));
    }

    //    Quick return if possible.

    if (n === 0) return;

    const nounit = dg === 'n';

    let kx = incx < 0 ? 1 - (n - 1) * incx : 1;

    // Start the operations. In this version the elements of AP are
    // accessed sequentially with one pass through AP.

    if (tr === 'n') {
        if (ul === 'u') {
            let kk = 1;
            let jx = kx;
            for (let j = 1; j <= n; j++) {
                if (x.r[jx - x.base] !== 0) {
                    const temp = x.r[jx - x.base];
                    let ix = kx;
                    for (let k = kk; k <= kk + j - 2; k++) {
                        x.r[ix - x.base] += temp * ap.r[k - ap.base];
                        ix += incx;
                    }
                    if (nounit) x.r[jx - x.base] *= ap.r[kk + j - 1 - ap.base];
                }
                jx += incx;
                kk += j;
            }
        } else {
            let kk = (n * (n + 1)) / 2;
            kx += (n - 1) * incx;
            let jx = kx;
            for (let j = n; j >= 1; j--) {
                if (x.r[jx - x.base] !== 0) {
                    const temp = x.r[jx - x.base];
                    let ix = kx;
                    for (let k = kk; k >= kk - (n - (j + 1)); k--) {
                        x.r[ix - x.base] += temp * ap.r[k - ap.base];
                        ix -= incx;
                    }
                    if (nounit) x.r[jx - x.base] *= ap.r[kk - n + j - ap.base];
                }
                jx -= incx;
                kk -= n - j + 1;
            }
        }
    } else {
        // Form  x := A**T*x.
        if (ul === 'u') {
            let kk = (n * (n + 1)) / 2;
            let jx = kx + (n - 1) * incx;

            for (let j = n; j >= 1; j--) {
                let temp = x.r[jx - x.base];
                let ix = jx;
                if (nounit) temp *= ap.r[kk - ap.base];
                for (let k = kk - 1; k >= kk - j + 1; k--) {
                    ix -= incx;
                    temp += ap.r[k - ap.base] * x.r[ix - x.base];
                }
                x.r[jx - x.base] = temp;
                jx -= incx;
                kk -= j;
            }
        }
        //ul !== u
        else {
            let kk = 1;
            let jx = kx;
            for (let j = 1; j <= n; j++) {
                let temp = x.r[jx - x.base];
                let ix = jx;
                if (nounit) temp *= ap.r[kk - ap.base];
                for (let k = kk + 1; k <= kk + n - j; k++) {
                    ix += incx;
                    temp += ap.r[k - ap.base] * x.r[ix - x.base];
                }
                x.r[jx - x.base] = temp;
                jx += incx;
                kk += n - j + 1;
            }
        }
    }
}
