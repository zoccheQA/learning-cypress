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
    myInfoButton: '[href="/web/index.php/pim/wiewMyDetailss"]'
  
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
})