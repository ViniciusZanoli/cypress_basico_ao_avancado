/*
    PARA ABRIR O CYPRESS, NO TERMINAL ENTRE NA PASTA DO PROJETO
    E DIGITE npx cypress open 
*/

describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

    //it("", ()=>{

    //});


    //  PREENCHE CAMPOS DE TEXTO
    it("Fills all the text input fields", ()=> {
        const firstName = "Vinicius";
        const lastName = "Zanoli";

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("vinicius@gmail.com");
        cy.get("#requests").type("Carnivous");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });
    
    //  SELECIONA VALOR 2 NO CAMPO DE OPÇÕES
    it("Select two tickets", ()=> {
        cy.get("#ticket-quantity").select("2");
    });

    // SELECIONA COMBO_BOX VIP
    it("Select 'VIP' ticket type", () => {
        cy.get("#vip").check();
    });

    // SELECIONA CHECK_BOX VIP
    it("Select checkbox Social Media and Publication", () => {
        cy.get("#publication").check();
        cy.get("#social-media").check();        
    });

    // DESELECIONA CHECK_BOX VIP
    it("Select checkbox Social Media and Publication, then uncheck Publication", () => {
        cy.get("#publication").check();
        cy.get("#social-media").check();  
        
        cy.get("#publication").uncheck();
    });

    // ASSERT PARA VERIFICAR SE CONTEM O TEXTO TICKETBOX
    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX")
    });

    // VERIFICA SE ESTA INVALIDANDO O E-MAIL AJUSTA E VERIFICA SE ESTA VALIDO
    it("Alerts on invalid email", () => {
        const emailById = "#email";
        const emailInvalidById = "#email.invalid";

        cy.get(emailById).type("vinicius-gmail.com");
        cy.get(emailInvalidById).should("exist");

        cy.get(emailById).clear().type("vinicius@gmail.com");
        cy.get(emailInvalidById).should("not.exist");
    });

    // TESTE UTILIZANDO TUDO QUE APRENDEMOS ACIMA
    it("Fills and rese the form", () => {
        const firstName = "Vinicius";
        const lastName = "Zanoli";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("vinicius@gmail.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check(); 
        cy.get("#requests").type("IPA beer");
        
        cy.get(".agreement p").should("contain", `I, ${fullName}, wish to buy 2 VIP tickets`);

        cy.get("#agree").check();
        cy.get("#signature").type(fullName);

        cy.get("button[type='submit']").as("submitButton")
            .should("not.be.disabled")
        ;

        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");
    });

    // UTILIZANDO COMANDOS DE SUPORT
    it("Fills mandatory fields usind support comand", () => {
        const customer = {
            firstName: "João",
            lastName: "Silva",
            email: "joao@ig.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']").as("submitButton")
            .should("not.be.disabled")
        ;

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");

    });
});