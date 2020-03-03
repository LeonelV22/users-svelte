describe('My First Test', function() {
  it('should show progress bar first', function() {
    cy.visit('http://localhost:5000');
    cy.get('.progress')
  })

  it('should show users table when onload data', function() {
    cy.server()
    cy.visit('http://localhost:5000');
    cy.get('table tr').should('have.length', 11);
  })

  it('should `Previous` button to be disabled', function() {
    cy.get('.pagination-previous').should('have.class', 'disabled')
  })
})
