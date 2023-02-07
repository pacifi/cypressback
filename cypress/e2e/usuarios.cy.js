import {createNewEmail, createNewName} from '../support/utils'

let email, nome, userID;

describe('Cadastro Simple de Usuarios', () => {
  it('Registro Usuario', () => {
    email = createNewEmail();
    nome = createNewName();
    cy.request({
        method: 'POST',
        url:'/usuarios',
        form:true,
        headers:{
          'Content-Type': 'application/json',
          'Accpet': 'application/json'
        },
        body:{
          nome: nome,
          email: email,
          password: 'password123',
          administrador: 'true'
        }
      }).should((response) => {
        userID = response.body._id;
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
  })
 
});

 // Buscar Usuario
 it('Buscar Usuario ID', () =>{
    cy.request({
      method: 'GET',
      url: `/usuarios/${userID}`,
      headers:{
        'Accpet': 'application/json',
      }
    }).should((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('nome', nome);
        expect(response.body).to.have.property('email', email);
        expect(response.body).to.have.property('administrador');
        expect(response.body).to.have.property('nome', nome);
    })
 });

  // Actualizar Uesuario
  it('Actualizar Usuario ID', () =>{
    cy.request({
      method: 'PUT',
      url: `/usuarios/${userID}`,
      headers:{
        'Accpet': 'application/json',
        'Content-Type': 'application/json'
      },
      body:{
        nome: nome,
        email: email,
        password: 'novaSenia',
        administrador: 'false'
      }
    }).should((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso');
      
    })
 });

 // Buscar Usuario Acutualizado
 it('Buscar Usuario ID ver si el usuario fue actualizado', () =>{
  cy.request({
    method: 'GET',
    url: `/usuarios/${userID}`,
    headers:{
      'Accpet': 'application/json',
    }
  }).should((response)=>{
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('nome', nome);
      expect(response.body).to.have.property('email', email);
      expect(response.body).to.have.property('password', 'novaSenia');
      expect(response.body).to.have.property('administrador', 'false');
      
  })
});


  // Excluir Usuario
  it('Elminar', () =>{
    cy.request({
      method: 'DELETE',
      url: `/usuarios/${userID}`,
      headers:{
        'Accpet': 'application/json',
      }
    }).should((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso');

       
        
    })
  });
  // Buscar usuario e verificar no esta mas resgitstrado
  it('Buscar Usuario ID ver si el usuario fue eliminado', () =>{
    cy.request({
      method: 'GET',
      url: `/usuarios/${userID}`,
      headers:{
        'Accpet': 'application/json',
      },
      failOnStatusCode: false
    }).should((response)=>{
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message', 'Usuário não encontrado');
     
        
    })
  });



})