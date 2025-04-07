import userData from '../fixtures/user-data.json'

const { selectLimit } = require("async")
describe('Orange HRM Tests', () => {
  const selectorslist = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
    worngCredentialAlertInvalidCredentials: '.oxd-alert-content > .oxd-text',
    dasboardGrid: ".orangehrm-dashboard-grid",
    WorngCredentialAlertRequiredPassword:'.oxd-input-group > .oxd-text'
  }
 
  it('Login - Success', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(selectorslist.usernameField).type ('Admin')
    cy.get(selectorslist.passwordField).type ('admin123')
    cy.get(selectorslist.loginButton).click ()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorslist.dasboardGrid)
  })
  it('Login - Fail - Incorect User name', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(selectorslist.usernameField).type ('Test')
    cy.get(selectorslist.passwordField).type ('admin123')
    cy.get(selectorslist.loginButton).click ()
    cy.get(selectorslist.worngCredentialAlertInvalidCredentials)
  })
  it('Login - Fail - Incorect Password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(selectorslist.usernameField).type ('Adim')
    cy.get(selectorslist.passwordField).type ('admin1234')
    cy.get(selectorslist.loginButton).click ()
    cy.get(selectorslist.worngCredentialAlertInvalidCredentials)
  })
  it('Login - Fail - Password not Added', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(selectorslist.usernameField).type ('Admin')
    cy.get(selectorslist.loginButton).click ()
    cy.get(selectorslist.WorngCredentialAlertRequiredPassword)
})
})