describe("Test the initial component being rendered", () => {
    it("Test the welcome message getting displayed after visting the main page of the app", () => {
        cy.visit('/')

        cy.dataCy('welcome-to-new-project').contains("Welcome to your sweet new project.")
    })
})


export { } //  Because we use --isolatedModules flag when compiling, every .ts file should have either an import or an export