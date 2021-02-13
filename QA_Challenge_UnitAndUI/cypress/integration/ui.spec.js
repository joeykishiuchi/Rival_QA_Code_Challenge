describe("Todo App UI Test Suite",()=>{
    it("should navigate to the todo application",()=>{
        cy.visit("http://localhost:3000/")
    })

    it("should add a new todo item to the todo list and clear the input field on submit", () => {
        cy.get('input')
          .type("New Item", { delay: 100});

        cy.contains("Add Todo")
          .click()

        cy.get('ul')
          .contains("New Item", { timeout: 1000 })
          .should('exist')

        cy.get('input')
          .should('not.have.value')
    });

    it('should be able to filter the list by active items and disable the `Active` button', () => {
        // Adding another item that will be inactive. 
        cy.get('input')
          .type("Another Item", { delay: 100});
        cy.contains("Add Todo")
          .click()
        cy.get('ul')
          .contains("Another Item")
          .click();
     
        cy.contains('Active')
          .click()

        cy.get('ul')
          .contains('Another Item')
          .should('not.exist')

        cy.contains('Active')
          .should('be.disabled')
    })

    it('should be able to filter the list by completed items and disable the `Completed` button', () => {
        cy.contains('Completed')
          .click()
        
        cy.get('ul')
          .contains('Another Item')
          .should('exist')

        cy.contains('Completed')
          .should('be.disabled')

    });

    it('should show all items when filters are removed and disable the `All` button', () => {
        cy.contains('All')
          .click()
        
        cy.get('ul')
          .contains('New Item')
          .should('exist')
        
        cy.get('ul')
          .contains('Another Item')
          .should('exist')

        cy.contains('All')
          .should('be.disabled')
    })
})