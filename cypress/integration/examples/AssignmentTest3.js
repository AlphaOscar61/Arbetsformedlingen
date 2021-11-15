/// <reference types="Cypress" />
 
describe('Automation Task', function() 
{
 
it('Mocking data-Test 3',function() {
 
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
cy.visit("https://arbetsformedlingen.se/")
cy.wait(1000)
cy.get('a').contains('Jag förstår').click().wait(1000)
cy.get("[data-event-action='AS - Webbplatsen - Logga in - Link - Click']").click()
cy.wait(1000)
cy.get("[data-event-action='AS - All products - Login - Med användarnamn och lösenord - Link - Click']").click()
cy.wait(1000)
cy.get("#username").type("MikeFord")
cy.get("#txtLosen").type("Zxc123...")

cy.intercept({
    method: 'GET',
    url:'https://api.arbetsformedlingen.se/minasidor/rest/af/v4/minasidor/kontaktuppgifter'
},
{
    statusCode:200,
    body:
        {"fornamn":null,
        "efternamn":"Ford",
        "personnummer":null,
        "fodelsedatum":"1966-01-01",
        "adress":"Stockholmm",
        "co":null,
        "postnummer":"10316",
        "postort":"Stockholmm",
        "land":"SE",
        "telefonnummerHem":null,
        "telefonnummerMobil":"0731111111",
        "telefonnummerOvrig":null,
        "epostadress":"ated@notvn.comm",
        "hemsida":null,
        "kundnummer":"88021766",
        "epostadressIsVerified":false,
        "telefonnummerMobilIsVerified":false,
        "personnummerIsVerified":false,
        "harEpostadress":true,
        "harMobiltelefon":true}
}).as('mockingPersonData')
cy.get("[data-event-name='Login']").click()


cy.wait(3000)
cy.get('span').contains('Mina uppgifter').click()
cy.wait('@mockingPersonData')
cy.get("asms-read-only-field[label='Förnamn'] span[class='asms-read-only-field__value']").should('have.text','-')




 
})

})