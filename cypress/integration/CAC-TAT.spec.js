// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('Verifica o titulo da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('James')
        cy.get('#lastName').type('Bassani')
        cy.get('#email').type('james@email.com')
        cy.get('#open-text-area').type('O Cypress é bem legal')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    
    it('preenche os campos obrigatórios e envia o formulário com texto longo', () => {
        cy.get('#firstName').type('James')
        cy.get('#lastName').type('Bassani')
        cy.get('#email').type('james@email.com')

        const textoLongo = `Este é um exemplo de texto longo que será digitado na área de texto. 
        Pode conter várias linhas, incluindo quebras de linha, e outros caracteres especiais para 
        garantir que a funcionalidade de digitação do Cypress seja testada adequadamente.`

        cy.get('#open-text-area').type(textoLongo, {delay:10})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('James')
        cy.get('#lastName').type('Bassani')
        cy.get('#email').type('james@email,com')
        cy.get('#open-text-area').type('O Cypress é bem legal')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não numérico', () => {
        cy.get('#phone').type('abcdefj').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('James')
        cy.get('#lastName').type('Bassani')
        cy.get('#email').type('james@email.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('O Cypress é bem legal')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('James')
            .should('have.value', 'James')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Bassani')
            .should('have.value','Bassani')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('james@email.com')
            .should('have.value', 'james@email.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('999942237')
            .should('have.value', '999942237')
            .clear()
            .should('have.value', '')
            
    })

    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
})