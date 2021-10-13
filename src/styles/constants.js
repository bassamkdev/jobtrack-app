export const WEIGHTS = {
    light: 500,
    medium: 600,
    bold: 800
}

export const BREAKPOINTS = {
    laptopMax: 1300,
    tabletMax: 950,
    phoneMax: 600
}

export const QUERIES = {
    'laptopAndSmaller': `(max-width: ${BREAKPOINTS.laptopMax/16}rem)`,
    'tabletAndSmaller': `(max-width: ${BREAKPOINTS.tabletMax/16}rem)`,
    'phoneAndSmaller': `(max-width: ${BREAKPOINTS.phoneMax/16}rem)`,
}