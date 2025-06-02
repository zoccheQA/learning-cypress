import userData from '../fixtures/user-data.json'

const { selectLimit } = require("async")
describe('Orange HRM Tests', () => {
  const selectorslist = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
    worngCredentialAlertInvalidCredentials: '.oxd-alert-content > .oxd-text',
    dasboardGrid: ".orangehrm-dashboard-grid",
    WorngCredentialAlertRequiredPassword:'.oxd-input-group > .oxd-text',
    myInfoButton: '[href="/web/index.php/pim/wiewMyDetailss"]',
    firstNameField: "[name='firstName']",
    middleNameFielOptional: "[name='middleName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input",
    licenceExpiruDateField: "[placeholder='yyyy-dd-mm']"
  }
 
  it('Login - Success', () => {
    cy.visit('/auth/login')
    cy.get(selectorslist.usernameField).type (userData.userSuccess.username)
    cy.get(selectorslist.passwordField).type (userData.userSuccess.password)
    cy.get(selectorslist.loginButton).click ()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorslist.dasboardGrid)
  })
  it('Login - Fail - Incorect User name', () => {
    cy.visit('/auth/login')
    cy.get(selectorslist.usernameField).type (userData.userFail.username)
    cy.get(selectorslist.passwordField).type (userData.userSuccess.password)
    cy.get(selectorslist.loginButton).click ()
    cy.get(selectorslist.worngCredentialAlertInvalidCredentials)
  })
  it('Login - Fail - Incorect Password', () => {
    cy.visit('/auth/login')
    cy.get(selectorslist.usernameField).type (userData.userSuccess.username)
    cy.get(selectorslist.passwordField).type (userData.userFail.password)
    cy.get(selectorslist.loginButton).click ()
    cy.get(selectorslist.worngCredentialAlertInvalidCredentials)
  })
  it('Login - Fail - Password not Added', () => {
    cy.visit('/auth/login')
    cy.get(selectorslist.usernameField).type (userData.userSuccess.username)
    cy.get(selectorslist.loginButton).click ()
    cy.get(selectorslist.WorngCredentialAlertRequiredPassword)
})

it('User info Update - Success', () => {
  cy.visit('/auth/login')
  cy.get(selectorslist.usernameField).type (userData.userSuccess.username)
  cy.get(selectorslist.passwordField).type (userData.userSuccess.password)
  cy.get(selectorslist.loginButton).click ()
  cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
  cy.get(selectorslist.dasboardGrid)
  cy.visit('/pim/viewMyDetails')
  cy.get(".oxd-main-menu-item-wrapper [href='/web/index.php/pim/viewMyDetails']").click()
})
it.only('User info Update - Success', () => {
  cy.visit('/auth/login')
  cy.get(selectorslist.usernameField).type (userData.userSuccess.username)
  cy.get(selectorslist.passwordField).type (userData.userSuccess.password)
  cy.get(selectorslist.loginButton).click ()
  cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
  cy.get(selectorslist.dasboardGrid)
  cy.visit('/pim/viewMyDetails')
  cy.get(".oxd-main-menu-item-wrapper [href='/web/index.php/pim/viewMyDetails']").click()
  cy.get(".orangehrm-upgrade-layout")
  cy.get(selectorslist.firstNameField).clear().type('Maike')
  cy.get(selectorslist.middleNameFielOptional).clear()
  cy.get(selectorslist.lastNameField).clear().type('Jordam')
  cy.get(selectorslist.genericField).eq(4).clear().type('44444')
  cy.get(selectorslist.genericField).eq(5).clear().type('99')
  cy.get(selectorslist.genericField).eq(6).clear().type('Dl12345')
  cy.get(selectorslist.licenceExpiruDateField).eq(1).type('2000/09/08')  
})
})