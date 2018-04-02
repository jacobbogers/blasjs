import { complex as _, fortranArrComplex64 as arr64 } from '../../../src/lib/f_func';

const pI = Infinity;
const nI = -Infinity;
const { PI, sin, cos, abs, sqrt } = Math;

const cospi = x => cos(PI * x);
const sinpi = x => sin(PI * x);

export const fixture = {
    sgbmv: {
        case0: {
            desc: 'sgbmv, y := alpha*A*x + beta*y, trans="n", kl=1,ku=1,m=6,n=9, alpha=1.5, beta=2',
            input: {
                trans: 'n',
                m: 6,
                n: 9,
                kl: 1,
                ku: 1,
                alpha: 1.5,
                a: [
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                ],
                lda: 3,
                x: [1, 1, 2, 2, 3, 3, 4, 4, 5],
                incx: 1,
                beta: 2.5,
                y: [1, 1, 1, 1, 1, 1],
                incy: 1
            },
            output: {
                y: [4, 1, 4, 1, 4, 1]
            },
        },
        case1: {
            desc: 'sgbmv, y := alpha*A*x + beta*y,n=0',
            input: {
                trans: 'n',
                m: 6,
                n: 0,
                kl: 1,
                ku: 1,
                lda: 3,
                incy: 1,
                incx: 1,
                //
                beta: 2.5,
                alpha: 1.5,

                a: [
                ],
                x: [],

                y: [1, 1, 1, 1, 1, 1],
            },
            output: {
                y: [1, 1, 1, 1, 1, 1]
            },
        },
        case2: {
            desc: 'sgbmv, y := alpha*A*x + beta*y, alpha=0 && beta=1',
            input: {
                trans: 'n',
                m: 6,
                n: 9,
                kl: 1,
                ku: 1,
                lda: 3,
                incy: 1,
                incx: 1,
                //
                beta: 1,
                alpha: 0,

                a: [
                ],
                x: [],

                y: [1, 1, 1, 1, 1, 1],
            },
            output: {
                y: [1, 1, 1, 1, 1, 1]
            },
        },
        case3: {
            desc: 'sgbmv, y := alpha*A*x + beta*y, trans="n", kl=1,ku=1,m=3,n=9, incy=2, alpha=1.5, beta=2',
            input: {
                trans: 'n',
                m: 3,
                n: 9,
                kl: 1,
                ku: 1,
                alpha: 1.5,
                a: [
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                ],
                lda: 3,
                x: [1, 1, 2, 2, 3, 3, 4, 4, 5],
                incx: 1,
                beta: 2.5,
                y: [1, 1, 1, 1, 1, 1],
                incy: 2
            },
            output: {
                y: [4, 1, 1, 1, 4, 1]
            },
        },
        case4: {
            desc: 'sgbmv, y := alpha*A*x + beta*y, trans="n", kl=1,ku=1,m=3,n=9, incy=2, alpha=1.5, beta=0',
            input: {
                trans: 'n',
                m: 3,
                n: 9,
                kl: 1,
                ku: 1,
                alpha: 1.5,
                a: [
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                ],
                lda: 3,
                x: [1, 1, 2, 2, 3, 3, 4, 4, 5],
                incx: 1,
                beta: 0,
                y: [1, 1, 1, 1, 1, 1],
                incy: 2
            },
            output: {
                y: [1.5, 1, -1.5, 1, 1.5, 1]
            },
        },
        case5: {
            desc: 'sgbmv, y := alpha*A*x + beta*y, trans="n", kl=1,ku=1,m=3,n=9, incy=1, alpha=1.5, beta=0',
            input: {
                trans: 'n',
                m: 6,
                n: 9,
                kl: 1,
                ku: 1,
                incx: 1,
                incy: 1,
                lda: 3,
                //
                alpha: 1.5,
                beta: 0,
                //
                a: [
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                ],
                x: [1, 1, 2, 2, 3, 3, 4, 4, 5],
                y: [1, 1, 1, 1, 1, 1],
            },
            output: {
                y: [1.5, -1.5, 1.5, -1.5, 1.5, -1.5]
            },
        },
        case6: {
            desc: 'sgbmv, y := alpha*(A**T)x + beta*y, trans="t", kl=1,ku=1,m=6,n=9, incy=1, alpha=1.5, beta=1',
            input: {
                trans: 't',
                m: 6,
                n: 9,
                kl: 1,
                ku: 1,
                incx: 1,
                incy: 1,
                lda: 3,
                //
                alpha: 1.5,
                beta: 1,
                //
                a: [
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                ],
                x: [1, 1, 2, 2, 3, 3],
                y: [1, 1, 1, 1, 1, 1, 1, 1, 1],
            },
            output: {
                y: [2.5, -0.5, 2.5, -0.5, 2.5, 5.5, -3.5, 1, 1]
            },
        },
        case7: {
            desc: 'sgbmv, y := alpha*A*x + beta*y, trans="n", kl=1,ku=1,m=6,n=9, alpha=1.5, beta=2',
            input: {
                trans: 'n',
                m: 6,
                n: 9,
                kl: 1,
                ku: 1,
                alpha: 0,
                a: [
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                ],
                lda: 3,
                x: [1, 1, 2, 2, 3, 3, 4, 4, 5],
                incx: 1,
                beta: 2.5,
                y: [1, 1, 1, 1, 1, 1],
                incy: 1
            },
            output: {
                y: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
            },
        },
        case8: {
            desc: 'sgbmv, y := alpha*A*x + beta*y, trans="n", incx=-1,incy=-1 kl=1,ku=1,m=6,n=9, alpha=1, beta=0',
            input: {
                trans: 'n',
                m: 6,
                n: 9,
                kl: 1,
                ku: 1,
                alpha: 1,
                a: [
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                    -1, 2, -1,
                ],
                lda: 3,
                x: [1, 1, 2, 2, 3, 3, 4, 4, 3],
                incx: -1,
                beta: 0,
                y: [9, 0, 0, 0, 0, -9],
                incy: -1
            },
            output: {
                //incy=1, [ 1, -1, 1, -1, 1, -1 ],
                //incy=-1, [ -1, 1, -1, 1, -1, 1 ]
                //incx=-1, incy=1, [ 2, 1, 1, -1, 1, -1 ]
                //incx=-1, incy=-1, [ -1, 1, -1, 1, 1, 2 ]
                y: [-1, 1, -1, 1, 1, 2]
                //2, 1, 1, -1, 1, -1
            },
        },
    },
    sgbmvErrors: {
        case0: {
            desc: 'sgbmv, trans != ("n","t")',
            input: {
                trans: 'x',
                m: 6,
                n: 9,
                kl: 1,
                ku: 1,
                incy: 1,
                incx: 1,
                alpha: 1.5,
                a: [
                ],
                lda: 3,
                x: [],
                beta: 2.5,
                y: [],
            }
        },
        case1: {
            desc: 'sgbmv, n<0',
            input: {
                trans: 'n',
                m: 6,
                n: -1,
                kl: 1,
                ku: 1,
                incy: 1,
                incx: 1,
                alpha: 1.5,
                a: [
                ],
                lda: 3,
                x: [],
                beta: 2.5,
                y: [],
            }
        },
        case2: {
            desc: 'sgbmv, m<0',
            input: {
                trans: 'n',
                m: -6,
                n: 1,
                kl: 1,
                ku: 1,
                incy: 1,
                incx: 1,
                alpha: 1.5,
                a: [
                ],
                lda: 3,
                x: [],
                beta: 2.5,
                y: [],
            }
        },
        case3: {
            desc: 'sgbmv, kl<0',
            input: {
                trans: 'n',
                m: 6,
                n: 1,
                kl: -1,
                ku: 1,
                incy: 1,
                incx: 1,
                alpha: 1.5,
                a: [
                ],
                lda: 3,
                x: [],
                beta: 2.5,
                y: [],
            }
        },
        case4: {
            desc: 'sgbmv, ku<0',
            input: {
                trans: 'n',
                m: 6,
                n: 1,
                kl: 1,
                ku: -1,
                incy: 1,
                incx: 1,
                alpha: 1.5,
                a: [
                ],
                lda: 3,
                x: [],
                beta: 2.5,
                y: [],
            }
        },
        case5: {
            desc: 'sgbmv, ku<0',
            input: {
                trans: 'n',
                m: 6,
                n: 1,
                kl: 1,
                ku: 1,
                incy: 1,
                incx: 1,
                alpha: 1.5,
                a: [
                ],
                lda: 2,
                x: [],
                beta: 2.5,
                y: [],
            }
        },
        case6: {
            desc: 'sgbmv, incy=0',
            input: {
                trans: 'n',
                m: 6,
                n: 1,
                kl: 1,
                ku: 1,
                incy: 0,
                incx: 1,
                alpha: 1.5,
                a: [
                ],
                lda: 3,
                x: [],
                beta: 2.5,
                y: [],
            }
        },
        case7: {
            desc: 'sgbmv, incx=0',
            input: {
                trans: 'n',
                m: 6,
                n: 1,
                kl: 1,
                ku: 1,
                incy: 1,
                incx: 0,
                alpha: 1.5,
                a: [
                ],
                lda: 3,
                x: [],
                beta: 2.5,
                y: [],
            }
        },
    },
    sgemv: {
        case0: {
            desc: 'sgemv, y := alpha*A*x + beta*y, trans="n"',
            input: {
                trans: 'n',
                m: 6,
                n: 9,
                alpha: 1.5,
                a: [
                    -0.05487747, 0.25014132, 0.61824329, -0.17262350, -2.22390027, -1.2636144,
                    0.35872890, -0.01104548, -0.94064916, -0.11582532, -0.81496871, 0.2422635,
                    -1.42509839, 0.36594112, 0.24841265, 0.06528818, 0.01915639, 0.2573384,
                    -0.64901008, -0.11916876, 0.66413570, 1.10096910, 0.14377148, -0.1177536,
                    -0.91206837, -1.43758624, -0.79708953, 1.25408311, 0.77214219, -0.2195156,
                    -0.42481028, -0.41898010, 0.99698686, -0.27577803, 1.25601882, 0.6466744,
                    1.29931230, -0.87326211, 0.00837096, -0.88087172, 0.59625902, 0.1197176,
                    -0.28217388, 1.45598840, 0.22901959, 0.99654393, 0.78185918, -0.7767766,
                    -0.61598991, 0.04658030, -1.13038578, 0.57671878, -1.28074943, 1.6254473
                ],
                lda: 6,
                x: [1, 1, 2, 2, 3, 3, 4, 4, 5],
                incx: 1,
                beta: 2.5,
                y: [1, 1, 1, 1, 1, 1],
                incy: 1
            },
            output: { //data generated by fortran sgemv
                y: [-7.7995958197861910, -0.90987740363925695, -1.3999755270779133, 14.987896066159010, 6.2202929537743330, 11.557443037629128]
            },
        },
        case1: {
            desc: 'sgemv, y := alpha*A*x + beta*y, trans="n", incx=-1, incy=-1',
            input: {
                trans: 'n',
                m: 6,
                n: 9,
                alpha: 1.5,
                a: [
                    -0.05487747, 0.25014132, 0.61824329, -0.17262350, -2.22390027, -1.2636144,
                    0.35872890, -0.01104548, -0.94064916, -0.11582532, -0.81496871, 0.2422635,
                    -1.42509839, 0.36594112, 0.24841265, 0.06528818, 0.01915639, 0.2573384,
                    -0.64901008, -0.11916876, 0.66413570, 1.10096910, 0.14377148, -0.1177536,
                    -0.91206837, -1.43758624, -0.79708953, 1.25408311, 0.77214219, -0.2195156,
                    -0.42481028, -0.41898010, 0.99698686, -0.27577803, 1.25601882, 0.6466744,
                    1.29931230, -0.87326211, 0.00837096, -0.88087172, 0.59625902, 0.1197176,
                    -0.28217388, 1.45598840, 0.22901959, 0.99654393, 0.78185918, -0.7767766,
                    -0.61598991, 0.04658030, -1.13038578, 0.57671878, -1.28074943, 1.6254473
                ],
                lda: 6,
                x: [1, 1, 2, 2, 3, 3, 4, 4, 5],
                incx: -1,
                beta: 0.0,
                y: [1, 1, 1, 1, 1, 1],
                incy: -1
            },
            output: {
                y: [-4.4250261895358562, -12.524016615003347, 7.8897808715701103, 1.5491376277059317, -4.6228371150791645, -12.558390671387315]
            },
        },
        case2: {
            desc: 'sgemv, y := alpha*A*x + beta*y, trans="n"',
            input: {
                trans: 'n',
                m: 6,
                n: 9,
                alpha: 1.5,
                a: [
                    -0.05487747, 0.25014132, 0.61824329, -0.17262350, -2.22390027, -1.2636144,
                    0.35872890, -0.01104548, -0.94064916, -0.11582532, -0.81496871, 0.2422635,
                    -1.42509839, 0.36594112, 0.24841265, 0.06528818, 0.01915639, 0.2573384,
                    -0.64901008, -0.11916876, 0.66413570, 1.10096910, 0.14377148, -0.1177536,
                    -0.91206837, -1.43758624, -0.79708953, 1.25408311, 0.77214219, -0.2195156,
                    -0.42481028, -0.41898010, 0.99698686, -0.27577803, 1.25601882, 0.6466744,
                    1.29931230, -0.87326211, 0.00837096, -0.88087172, 0.59625902, 0.1197176,
                    -0.28217388, 1.45598840, 0.22901959, 0.99654393, 0.78185918, -0.7767766,
                    -0.61598991, 0.04658030, -1.13038578, 0.57671878, -1.28074943, 1.6254473
                ],
                lda: 6,
                x: [1, 1, 2, 2, 3, 3, 4, 4, 5],
                incx: -1,
                beta: 0,
                y: [1, 1, 1, 1, 1, 1],
                incy: 1
            },
            output: { //data generated by fortran sgemv
                y: [-12.558390671387315, -4.6228371150791645, 1.5491376277059317, 7.8897808715701103, -12.524016615003347, -4.4250261895358562]
            },
        },
        case3: {
            desc: 'sgemv, y := alpha*(A**T)x + beta*y, trans="t"',
            input: {
                trans: 't',
                m: 6,
                n: 9,
                alpha: 1.5,
                a: [
                    -0.05487747, 0.25014132, 0.61824329, -0.17262350, -2.22390027, -1.2636144,
                    0.35872890, -0.01104548, -0.94064916, -0.11582532, -0.81496871, 0.2422635,
                    -1.42509839, 0.36594112, 0.24841265, 0.06528818, 0.01915639, 0.2573384,
                    -0.64901008, -0.11916876, 0.66413570, 1.10096910, 0.14377148, -0.1177536,
                    -0.91206837, -1.43758624, -0.79708953, 1.25408311, 0.77214219, -0.2195156,
                    -0.42481028, -0.41898010, 0.99698686, -0.27577803, 1.25601882, 0.6466744,
                    1.29931230, -0.87326211, 0.00837096, -0.88087172, 0.59625902, 0.1197176,
                    -0.28217388, 1.45598840, 0.22901959, 0.99654393, 0.78185918, -0.7767766,
                    -0.61598991, 0.04658030, -1.13038578, 0.57671878, -1.28074943, 1.6254473
                ],
                lda: 6,
                x: [1, 1, 2, 2, 3, 3],
                incx: -1,
                beta: 1,
                y: [1, 1, 1, 1, 1, 1, 4, 4, 5],
                incy: 1
            },
            output: { //data generated by fortran sgemv
                y: [-2.0157254394143820, -1.4639058979228139, -2.4103632131591439, 2.8775364421308041, -7.3735247328877449, 2.2206097096204758, 4.3736887406557798, 12.966479852795601, 1.2937025949358940]
            },
        },
        case4: {
            desc: 'sgemv, y := alpha*(A**T)x + beta*y, trans="t", beta=1, alpha=0',
            input: {
                trans: 't',
                m: 6,
                n: 9,
                alpha: 0,
                a: [
                    -0.05487747, 0.25014132, 0.61824329, -0.17262350, -2.22390027, -1.2636144,
                    0.35872890, -0.01104548, -0.94064916, -0.11582532, -0.81496871, 0.2422635,
                    -1.42509839, 0.36594112, 0.24841265, 0.06528818, 0.01915639, 0.2573384,
                    -0.64901008, -0.11916876, 0.66413570, 1.10096910, 0.14377148, -0.1177536,
                    -0.91206837, -1.43758624, -0.79708953, 1.25408311, 0.77214219, -0.2195156,
                    -0.42481028, -0.41898010, 0.99698686, -0.27577803, 1.25601882, 0.6466744,
                    1.29931230, -0.87326211, 0.00837096, -0.88087172, 0.59625902, 0.1197176,
                    -0.28217388, 1.45598840, 0.22901959, 0.99654393, 0.78185918, -0.7767766,
                    -0.61598991, 0.04658030, -1.13038578, 0.57671878, -1.28074943, 1.6254473
                ],
                lda: 6,
                x: [1, 1, 2, 2, 3, 3],
                incx: -1,
                beta: 1,
                y: [1, 1, 1, 1, 1, 1, 4, 4, 5],
                incy: 1
            },
            output: { //data generated by fortran sgemv
                y: [1, 1, 1, 1, 1, 1, 4, 4, 5]
            },
        },
        case5: {
            desc: 'sgemv, y := alpha*(A**T)x + beta*y, trans="t", beta=1.5, alpha=0',
            input: {
                trans: 't',
                m: 6,
                n: 9,
                alpha: 0,
                a: [
                    -0.05487747, 0.25014132, 0.61824329, -0.17262350, -2.22390027, -1.2636144,
                    0.35872890, -0.01104548, -0.94064916, -0.11582532, -0.81496871, 0.2422635,
                    -1.42509839, 0.36594112, 0.24841265, 0.06528818, 0.01915639, 0.2573384,
                    -0.64901008, -0.11916876, 0.66413570, 1.10096910, 0.14377148, -0.1177536,
                    -0.91206837, -1.43758624, -0.79708953, 1.25408311, 0.77214219, -0.2195156,
                    -0.42481028, -0.41898010, 0.99698686, -0.27577803, 1.25601882, 0.6466744,
                    1.29931230, -0.87326211, 0.00837096, -0.88087172, 0.59625902, 0.1197176,
                    -0.28217388, 1.45598840, 0.22901959, 0.99654393, 0.78185918, -0.7767766,
                    -0.61598991, 0.04658030, -1.13038578, 0.57671878, -1.28074943, 1.6254473
                ],
                lda: 6,
                x: [1, 1, 2, 2, 3, 3],
                incx: -1,
                beta: 1.5,
                y: [1, 1, 1, 1, 1, 1, 4, 4, 5],
                incy: 1
            },
            output: { //data generated by fortran sgemv
                y: [1, 1, 1, 1, 1, 1, 4, 4, 5].map(v => v * 1.5)
            },
        },
        case6: {
            desc: 'sgemv, y := alpha*(A**T)x + beta*y, trans="t", beta=1.5, alpha=0',
            input: {
                trans: 't',
                m: 3,
                n: 4,
                alpha: 1,
                a: [
                    -0.05487747, 0.25014132, 0.61824329, -0.17262350, -2.22390027, -1.2636144,
                    0.35872890, -0.01104548, -0.94064916, -0.11582532, -0.81496871, 0.2422635,
                    -1.42509839, 0.36594112, 0.24841265, 0.06528818, 0.01915639, 0.2573384,
                    -0.64901008, -0.11916876, 0.66413570, 1.10096910, 0.14377148, -0.1177536,
                    -0.91206837, -1.43758624, -0.79708953, 1.25408311, 0.77214219, -0.2195156,
                    -0.42481028, -0.41898010, 0.99698686, -0.27577803, 1.25601882, 0.6466744,
                    1.29931230, -0.87326211, 0.00837096, -0.88087172, 0.59625902, 0.1197176,
                    -0.28217388, 1.45598840, 0.22901959, 0.99654393, 0.78185918, -0.7767766,
                    -0.61598991, 0.04658030, -1.13038578, 0.57671878, -1.28074943, 1.6254473
                ],
                lda: 6,
                x: [1, 1, 2, 2, 3, 3],
                incx: -2,
                beta: 0,
                y: [1, 1, 1, 1, 1, 1, 4, 4, 5],
                incy: -2
            },
            output: { //data generated by fortran sgemv
                y: [
                    -1.5212320089340210,
                    1.0000000000000000,
                    -3.2950003892183304,
                    1.0000000000000000,
                    0.11344654485583305,
                    1.0000000000000000,
                    0.95389350876212120,
                    4.0000000000000000,
                    5.0000000000000000
                ]
            },
        },
    },
    sger: {
        case0: {
            desc: 'sger,  A := alpha*x*y**T + A, incx=2, incy=2,n=4,m=3,alpha=1.5',
            input: {
                m: 3,
                n: 4,
                alpha: 1.5,
                a: [
                    -0.05487747, 0.25014132, 0.61824329, -0.17262350, -2.22390027, -1.2636144,
                    0.35872890, -0.01104548, -0.94064916, -0.11582532, -0.81496871, 0.2422635,
                    -1.42509839, 0.36594112, 0.24841265, 0.06528818, 0.01915639, 0.2573384,
                    -0.64901008, -0.11916876, 0.66413570, 1.10096910, 0.14377148, -0.1177536,
                    -0.91206837, -1.43758624, -0.79708953, 1.25408311, 0.77214219, -0.2195156,
                    -0.42481028, -0.41898010, 0.99698686, -0.27577803, 1.25601882, 0.6466744,
                    1.29931230, -0.87326211, 0.00837096, -0.88087172, 0.59625902, 0.1197176,
                    -0.28217388, 1.45598840, 0.22901959, 0.99654393, 0.78185918, -0.7767766,
                    -0.61598991, 0.04658030, -1.13038578, 0.57671878, -1.28074943, 1.6254473
                ],
                lda: 6,
                x: [0.10330280, 0.62787610, 0.09179221, 0.10161032, 0.33920221, 0.93821373],
                incx: 2,
                y: [0.823443247, 0.615896282, 0.502300758, 0.008093905, 0.222554779, 0.787857479,
                    0.874444904, 0.613885907, 0.617612043],
                incy: 2
            },
            expect: { //data generated by fortran sgemv
                a: [7.2718515354917246E-002,
                    0.36351983515259478,
                    1.0372139062035037,

                    0.43656249423752236,
                    5.8115462974502208E-002,
                    -0.68507688152110546,

                    -1.3906126226474256,
                    0.39658429928803307,
                    0.36164925525028524,

                    -0.51351115308794015,
                    1.2320879450036237E-003,
                    1.1090561402548120
                ]
            },
        },
        case1: {
            desc: 'sger,  A := alpha*x*y**T + A, incx=-2, incy=-2,n=4,m=3,alpha=1.5',
            input: {
                m: 3,
                n: 4,
                alpha: 1.5,
                a: [
                    -0.05487747, 0.25014132, 0.61824329, -0.17262350, -2.22390027, -1.2636144,
                    0.35872890, -0.01104548, -0.94064916, -0.11582532, -0.81496871, 0.2422635,
                    -1.42509839, 0.36594112, 0.24841265, 0.06528818, 0.01915639, 0.2573384,
                    -0.64901008, -0.11916876, 0.66413570, 1.10096910, 0.14377148, -0.1177536,
                    -0.91206837, -1.43758624, -0.79708953, 1.25408311, 0.77214219, -0.2195156,
                    -0.42481028, -0.41898010, 0.99698686, -0.27577803, 1.25601882, 0.6466744,
                    1.29931230, -0.87326211, 0.00837096, -0.88087172, 0.59625902, 0.1197176,
                    -0.28217388, 1.45598840, 0.22901959, 0.99654393, 0.78185918, -0.7767766,
                    -0.61598991, 0.04658030, -1.13038578, 0.57671878, -1.28074943, 1.6254473
                ],
                lda: 6,
                x: [0.10330280, 0.62787610, 0.09179221, 0.10161032, 0.33920221, 0.93821373],
                incx: -2,
                y: [0.823443247, 0.615896282, 0.502300758, 0.008093905, 0.222554779, 0.787857479,
                    0, 0.613885907, 0.617612043],
                incy: -2
            },
            expect: { //data generated by fortran sgemv
                a: [
                    -5.4877471178770065E-002, 0.25014132261276245, 0.61824327707290649,
                    0.47196548709709463, 1.9597711867927137E-002, -0.90616335526003555,
                    -1.1695261489084956, 0.43510205039460814, 0.32624626239071297,
                    -0.23003943308711516, -5.7902458525016520E-003, 0.79173168103747149
                ]
            },
        },
        case2: {
            desc: 'sger,  A := alpha*x*y**T + A, incx=-2, incy=-2,n=4,m=3,alpha=0',
            input: {
                m: 3,
                n: 4,
                alpha: 0,
                a: [
                    -0.05487747, 0.25014132, 0.61824329, -0.17262350, -2.22390027, -1.2636144,
                    0.35872890, -0.01104548, -0.94064916, -0.11582532, -0.81496871, 0.2422635,
                    -1.42509839, 0.36594112, 0.24841265, 0.06528818, 0.01915639, 0.2573384,
                    -0.64901008, -0.11916876, 0.66413570, 1.10096910, 0.14377148, -0.1177536,
                    -0.91206837, -1.43758624, -0.79708953, 1.25408311, 0.77214219, -0.2195156,
                    -0.42481028, -0.41898010, 0.99698686, -0.27577803, 1.25601882, 0.6466744,
                    1.29931230, -0.87326211, 0.00837096, -0.88087172, 0.59625902, 0.1197176,
                    -0.28217388, 1.45598840, 0.22901959, 0.99654393, 0.78185918, -0.7767766,
                    -0.61598991, 0.04658030, -1.13038578, 0.57671878, -1.28074943, 1.6254473
                ],
                lda: 6,
                x: [0.10330280, 0.62787610, 0.09179221, 0.10161032, 0.33920221, 0.93821373],
                incx: -2,
                y: [0.823443247, 0.615896282, 0.502300758, 0.008093905, 0.222554779, 0.787857479,
                    0, // this ZERO!!! will cause the first "column" to be unchanged in "expect"
                    0.613885907, 0.617612043],
                incy: -2
            },
            expect: { //data generated by fortran sgemv
                a: [
                    -5.4877471178770065E-002, 0.25014132261276245, 0.61824327707290649,
                    0.35872888565063477, -1.1045480147004128E-002, -0.94064915180206299,
                    -1.4250984191894531, 0.36594110727310181, 0.24841265380382538,
                    -0.64901006221771240, -0.11916875839233398, 0.66413569450378418
                ]
            },
        },
    },
    sgerError: {
        case0: {
            desc: 'sger,  m<0',
            input: {
                m: -1,
                n: 4,
                lda: 6,
                incx: 2,
                incy: 2
            },
        },
        case1: {
            desc: 'sger,  n<0',
            input: {
                m: 3,
                n: -2,
                lda: 6,
                incx: 2,
                incy: 2
            },
        },
        case2: {
            desc: 'sger,  lda<m',
            input: {
                m: 3,
                n: 2,
                lda: 2,
                incx: 2,
                incy: 2
            },
        },
        case3: {
            desc: 'sger,  incy=0',
            input: {
                m: 3,
                n: 2,
                lda: 5,
                incx: 0,
                incy: 2
            },
        },
        case4: {
            desc: 'sger,  incx=0',
            input: {
                m: 3,
                n: 2,
                lda: 5,
                incx: 2,
                incy: 0
            },
        }


        /*case1: {
            desc: 'sger,  A := alpha*x*y**T + A, incx=1, incy=1,n=9,m=6,alpha=1.5',
            input: {
                m: 6,
                n: 9,
                alpha: 1.5,
                a: [
                    -0.05487747, 0.25014132, 0.61824329, -0.17262350, -2.22390027, -1.2636144,
                    0.35872890, -0.01104548, -0.94064916, -0.11582532, -0.81496871, 0.2422635,
                    -1.42509839, 0.36594112, 0.24841265, 0.06528818, 0.01915639, 0.2573384,
                    -0.64901008, -0.11916876, 0.66413570, 1.10096910, 0.14377148, -0.1177536,
                    -0.91206837, -1.43758624, -0.79708953, 1.25408311, 0.77214219, -0.2195156,
                    -0.42481028, -0.41898010, 0.99698686, -0.27577803, 1.25601882, 0.6466744,
                    1.29931230, -0.87326211, 0.00837096, -0.88087172, 0.59625902, 0.1197176,
                    -0.28217388, 1.45598840, 0.22901959, 0.99654393, 0.78185918, -0.7767766,
                    -0.61598991, 0.04658030, -1.13038578, 0.57671878, -1.28074943, 1.6254473
                ],
                lda: 6,
                x: [0.10330280, 0.62787610, 0.09179221, 0.10161032, 0.33920221, 0.93821373],
                incx: -1,
                y: [0.823443247, 0.615896282, 0.502300758, 0.008093905, 0.222554779, 0.787857479,
                    0.874444904, 0.613885907, 0.617612043],
                incy: -1
            },
            expect: { //data generated by fortran sgemv
                a: [-7.7995958197861910, -0.90987740363925695, -1.3999755270779133, 14.987896066159010, 6.2202929537743330, 11.557443037629128]
            },
        },
        case2: {
            desc: 'sger,  A := alpha*x*y**T + A, incx=1, incy=1,n=9,m=6,alpha=1.5',
            input: {
                m: 3,
                n: 4,
                alpha: 0,
                a: [
                    -0.05487747, 0.25014132, 0.61824329, -0.17262350, -2.22390027, -1.2636144,
                    0.35872890, -0.01104548, -0.94064916, -0.11582532, -0.81496871, 0.2422635,
                    -1.42509839, 0.36594112, 0.24841265, 0.06528818, 0.01915639, 0.2573384,
                    -0.64901008, -0.11916876, 0.66413570, 1.10096910, 0.14377148, -0.1177536,
                    -0.91206837, -1.43758624, -0.79708953, 1.25408311, 0.77214219, -0.2195156,
                    -0.42481028, -0.41898010, 0.99698686, -0.27577803, 1.25601882, 0.6466744,
                    1.29931230, -0.87326211, 0.00837096, -0.88087172, 0.59625902, 0.1197176,
                    -0.28217388, 1.45598840, 0.22901959, 0.99654393, 0.78185918, -0.7767766,
                    -0.61598991, 0.04658030, -1.13038578, 0.57671878, -1.28074943, 1.6254473
                ],
                lda: 6,
                x: [0.10330280, 0.62787610, 0.09179221, 0.10161032, 0.33920221, 0.93821373],
                incx: -2,
                y: [0.823443247, 0.615896282, 0.502300758, 0.008093905, 0.222554779, 0.787857479,
                    0.874444904, 0.613885907, 0.617612043],
                incy: -2
            },
            expect: { //data generated by fortran sgemv
                a: [-7.7995958197861910, -0.90987740363925695, -1.3999755270779133, 14.987896066159010, 6.2202929537743330, 11.557443037629128]
            },
        },
        case3: {
            desc: 'sger,  A := alpha*x*y**T + A, incx=-2, incy=1,n=4,m=3,alpha=1',
            input: {
                m: 3,
                n: 4,
                alpha: 1,
                a: [
                    -0.05487747, 0.25014132, 0.61824329, -0.17262350, -2.22390027, -1.2636144,
                    0.35872890, -0.01104548, -0.94064916, -0.11582532, -0.81496871, 0.2422635,
                    -1.42509839, 0.36594112, 0.24841265, 0.06528818, 0.01915639, 0.2573384,
                    -0.64901008, -0.11916876, 0.66413570, 1.10096910, 0.14377148, -0.1177536,
                    -0.91206837, -1.43758624, -0.79708953, 1.25408311, 0.77214219, -0.2195156,
                    -0.42481028, -0.41898010, 0.99698686, -0.27577803, 1.25601882, 0.6466744,
                    1.29931230, -0.87326211, 0.00837096, -0.88087172, 0.59625902, 0.1197176,
                    -0.28217388, 1.45598840, 0.22901959, 0.99654393, 0.78185918, -0.7767766,
                    -0.61598991, 0.04658030, -1.13038578, 0.57671878, -1.28074943, 1.6254473
                ],
                lda: 6,
                x: [0.10330280, 0.62787610, 0.09179221, 0.10161032, 0.33920221, 0.93821373],
                incx: -2,
                y: [0.823443247, 0.615896282, 0.502300758, 0.008093905,
                    0.222554779, 0.787857479, 0.874444904, 0.613885907,
                    0.617612043],
                incy: -2
            },
            expect: { //data generated by fortran sgemv
                a: [-7.7995958197861910, -0.90987740363925695, -1.3999755270779133, 14.987896066159010, 6.2202929537743330, 11.557443037629128]
            },
        },*/
    }
}