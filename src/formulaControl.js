

// Return an object of atoms from a formula of type string
export const getAtoms = formula => {
    var atoms = {};
    var groupCoeffs = []; // coefficients that apply to a group of atoms between brackets
    var generalCoeff = 1; // multiplication of nested group coefficients
    var currentCoeff = 1;

    const openingBracketRegex = /[([{]/;
    const closingBracketRegex = /[}\])]/;
    const atomNameRegex = /[A-Z][a-z]?/;
    const validElementRegex = /[A-Z][a-z]?|[0-9]+|[([{}\])]/g;

    // Parse formula by valid element (atom name, bracket or number) and reverse it
    const reversedFormula = formula.match(validElementRegex).reverse();

    // Loop from the end to the beginning of the formula
    reversedFormula.forEach(element => {
        if (!isNaN(parseInt(element))) { // Element is a number
            currentCoeff = element;
        }
        else if (atomNameRegex.test(element)) { // Element is an atom -> add the right number of atoms to the atoms object
            atoms[element] = atoms.hasOwnProperty(element) ? atoms[element] + currentCoeff * generalCoeff : currentCoeff * generalCoeff;
            currentCoeff = 1;
        }
        else if (closingBracketRegex.test(element)) { // Element is a closing bracket -> add a new group coefficient
            groupCoeffs.push(currentCoeff);
            generalCoeff *= currentCoeff;
            currentCoeff = 1;
        }
        else if (openingBracketRegex.test(element)) {// Element is an opening bracket -> remove last coefficient
            const endingCoeff = groupCoeffs.pop();
            generalCoeff /= endingCoeff;
        }
        else {
            console.log('Can\'t resolve this character : ', element);
        }
    });

    return atoms;
}


// Check if the given formula is valid
export const isValidFormula = formula => {

    // Formula must only contain valid characters
    if(/[^A-Za-z0-9([{}\])]/.test(formula)) {
        return false;
    }

    // Formula must have at least one atom
    if (/[A-Z][a-z]?/.test(formula) === false) {
        return false;
    }

    // Formula must not have a digit after an opening bracket
    if (/[([{][0-9]/.test(formula)) {
        return false;
    }

    // Formula must have lower case letters right after an upper case letter
    if (/[^A-Z][a-z]/.test(formula)) {
        return false;
    }

    // Brackets of the formula must match
    const bracketStr = formula.match(/[([{}\])]/g);
    if (bracketStr) {
        return hasMatchingBrackets(bracketStr);
    }

    return true;
}



// Check if brackets are matching in a string
const hasMatchingBrackets = str => {
    var stack = [];
    const map = { '(': ')', '[': ']', '{': '}' };

    for(var bracket of str) {
        if (/[([{]/.test(bracket)) { // Bracket is an opening bracket -> push it to the stack
            stack.push(bracket);
        }
        else { // Bracket is a closing bracket
            const lastBracket = stack.pop();
            if (bracket !== map[lastBracket]) { // Bracket does not match the last opening bracket
                return false;
            }
        }
    };

    if (stack.length > 0) { // There are remaining open brackets
        return false;
    };

    return true;
}
