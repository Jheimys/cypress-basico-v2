// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('Verifica o titulo da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.clock()

        cy.get('#firstName').type('James')
        cy.get('#lastName').type('Bassani')
        cy.get('#email').type('james@email.com')
        cy.get('#open-text-area').type('O Cypress é bem legal')

        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

    
    it('preenche os campos obrigatórios e envia o formulário com texto longo', () => {
        cy.clock()
        
        cy.get('#firstName').type('James')
        cy.get('#lastName').type('Bassani')
        cy.get('#email').type('james@email.com')

        const textoLongo = `Este é um exemplo de texto longo que será digitado na área de texto. 
        Pode conter várias linhas, incluindo quebras de linha, e outros caracteres especiais para 
        garantir que a funcionalidade de digitação do Cypress seja testada adequadamente.`

        cy.get('#open-text-area').type(textoLongo, {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        cy.get('#firstName').type('James')
        cy.get('#lastName').type('Bassani')
        cy.get('#email').type('james@email,com')
        cy.get('#open-text-area').type('O Cypress é bem legal')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')

    })

    it('Campo telefone continua vazio quando preenchido com valor não numérico', () => {
        cy.get('#phone').type('abcdefj').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()
        cy.get('#firstName').type('James')
        cy.get('#lastName').type('Bassani')
        cy.get('#email').type('james@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('O Cypress é bem legal')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')   
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

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error')
        .should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(($input) => {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .then($input => {
                console.log($input[0].files[0].name)
                expect($input[0].files[0].name).to.equal('example.json')
            })    
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .then($input => {
                expect($input[0].files[0].name).to.equal('example.json')
            }) 
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('Preencher a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
      })

      it.only('Faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should((response) => {
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
      })

})