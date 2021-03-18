// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (appState = {targetUrl: '/'}) => {
    cy.log({
        name: 'loginViaAuth0',
    })

    const options = {
        method: 'POST',
        url: Cypress.env('auth_url'),
        body: {
            grant_type: 'password',
            username: Cypress.env('auth_username'),
            password: Cypress.env('auth_password'),
            audience: Cypress.env('auth_audience'),
            scope: 'openid profile email',
            client_id: Cypress.env('auth_client_id'),
            client_secret: Cypress.env('auth_client_secret')
        }
    }

    cy.request(options).then(({body}) => {
        const {access_token, expires_in, id_token} = body
        const auth0State = {
            nonce: '',
            state: 'some-random-state'
          };
        cy.server()
        cy.route({
            url: 'oauth/token',
            method: 'POST',
            response: {
                access_token: access_token,
                id_token: id_token,
                scope: "openid profile email",
                expires_in: expires_in,
                token_type: 'Bearer'
            }
        })
        console.log({access_token, expires_in, id_token})
        const stateId = 'test'
        cy.setCookie(
            `a0.spajs.txs.${stateId}`,
            encodeURIComponent(JSON.stringify({
                "appState": appState,
                "scope": "openid profile email",
                "audience": "default",
                "redirect_uri": "http://localhost:3000"
            }))
        )
        .then(() => {
            cy.visit(`/callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`)
        })
    })
})