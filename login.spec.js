describe('Moodle Login', () => {
    it('Login with valid credentials', () => {
      cy.visit('https://school.moodledemo.net/login/index.php');
  
      cy.get('#username').type('manager');
      cy.get('#password').type('moodle');
      cy.get('#loginbtn').click();
  
      cy.url().should('include', '/dashboard'); // Kiểm tra xem đã chuyển hướng đến trang Dashboard sau khi đăng nhập
    });
  
    it('Login with invalid credentials', () => {
      cy.visit('https://school.moodledemo.net/login/index.php');
  
      cy.get('#username').type('invalid_username');
      cy.get('#password').type('invalid_password');
      cy.get('#loginbtn').click();
  
      cy.url().should('not.include', '/dashboard'); // Kiểm tra rằng không chuyển hướng đến trang Dashboard với thông tin đăng nhập không hợp lệ
    });
  });
  