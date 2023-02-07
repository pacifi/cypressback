import {createNewEmail, createNewName} from '../support/utils'

let email, nome, userID, token;



describe('Cadastro Simple de Producto', () => {


// Login
it('Login', () => {
    
    cy.request({
        method: 'POST',
        url:'/login',
        form:true,
        headers:{
          'Content-Type': 'application/json',
          'Accpet': 'application/json',

        },
        body:{
            "email": "pacifi.bnr@gmail.com",
            "password": "12345678"
        }
      }).should((response) => {
        token = response.body.authorization;
        expect(response.status).to.eq(200)
       
  })
 
});



// Registro Producto
  it('Registro Producto', () => {
    nome = createNewName();
    cy.request({
        method: 'POST',
        url:'/produtos',
        form:true,
        headers:{
          'Content-Type': 'application/json',
          'Accpet': 'application/json',
          'Authorization': token
        },
        body:{
            "nome": nome,
            "preco": 470,
            "descricao": "Mouse",
            "quantidade": 381
        }
      }).should((response) => {

        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
  })
 
});


})