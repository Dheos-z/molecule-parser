import { getAtoms, isValidFormula } from './formulaControl';


describe('getAtoms', () => {
    test('returns the atoms of a formula without brackets', () => {
        expect(getAtoms('Ar4H2O5C2O4')).toEqual({ O: 9, C: 2, H: 2, Ar: 4 });
    });

    test('returns the atoms of a formula with multiple times same atom', () => {
        expect(getAtoms('HH1HHH2HH')).toEqual({ H: 8 });
    });

    test('returns the same atoms with round, curly and square brackets', () => {
        const formulas1 = ['C2H6(KNO(OH)2)3', 'C2H6{KNO{OH}2}3', 'C2H6[KNO[OH]2]3'];
        const formulas2 = ['BaK(Cl(O2Na3)H))', 'BaK{Cl{O2Na3}H}}', 'BaK[Cl[O2Na3]H]]'];

        formulas1.forEach(formula => {
            expect(getAtoms(formula)).toEqual({ O: 9, C: 2, H: 12, K: 3, N: 3 });
        });

        formulas2.forEach(formula => {
            expect(getAtoms(formula)).toEqual({ Ba: 1, K: 1, Cl: 1, Na: 3, H: 1, O: 2 });
        });
    });

    test('returns the atoms of a formula with different groups of brackets', () => {
        expect(getAtoms('O2(NaCl)3BrBa2(KNO3)5')).toEqual({ "Ba": 2, "Br": 1, "Cl": 3, "K": 5, "N": 5, "Na": 3, "O": 17 });
    });
});


describe('isValidFormula', () => {
    test('returns true when formula is valid', () => {
        expect(isValidFormula('O2(NaCl)3BrBa2(KNO3)5')).toBe(true);
    });

    test('returns false when brackets don\'t match', () => {
        expect(isValidFormula('(Ar(Ag2))))')).toBe(false);
    });

    test('returns false when there are invalid characters', () => {
        expect(isValidFormula('OH2:Ar')).toBe(false);
    });

    test('returns false when there is no atom', () => {
        expect(isValidFormula('34(332)')).toBe(false);
    });

    test('returns false when a digit is after an opening bracket', () => {
        expect(isValidFormula('O2(3H4)')).toBe(false);
    });

    test('returns false when lowercase letter is not after an uppercase letter', () => {
        expect(isValidFormula('OH3a')).toBe(false);
    });
});
