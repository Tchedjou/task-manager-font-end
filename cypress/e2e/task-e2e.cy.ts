describe('Task Manager E2E Tests', () => {
    beforeEach(() => {
        // Visiter l'application
        cy.visit('/'); // En utilisant la baseUrl définie, cela ira à 'http://localhost:4200/'
        // Intercepter l'appel GET pour charger les tâches initiales
        cy.intercept('GET', '/api/tasks', {
            statusCode: 200,
            body: [] // Aucune tâche pour ne pas affecter la base de données
        }).as('getTasks');
    });

    it('should load the homepage', () => {
        cy.get('.task-list-container').should('exist'); // Vérifie que le conteneur de la liste des tâches est présent
        cy.get('h2').should('contain', 'Gestion des Tâches'); // Vérifie le titre
    });

    it('should create a new task', () => {
        // Intercepter l'appel POST pour ajouter une tâche
        cy.intercept('POST', '/api/tasks', {
            statusCode: 201,
            body: { id: 1, description: 'Nouvelle tâche', status: 'pending', dueDate: '2024-12-31', priority: 'high' }
        }).as('createTask');

        // Simuler l'ajout d'une nouvelle tâche
        cy.get('input[name="description"]').type('Nouvelle tâche');
        cy.get('input[name="dueDate"]').type('2024-12-31');
        cy.get('select[name="priority"]').select('high');
        cy.get('button[type="submit"]').click();

        // Vérifie si la tâche a été ajoutée avec succès
        cy.get('.task-table').should('contain', 'Nouvelle tâche'); // Vérifie que la tâche a été ajoutée
    });


 
    // Test de suppression d'une tâche
    it('should delete a task', () => {
        // Intercepter l'appel POST pour ajouter une tâche
        cy.intercept('POST', '/api/tasks', {
            statusCode: 201,
            body: { id: 1, description: 'Tâche à supprimer', status: 'pending', dueDate: '2024-12-31', priority: 'high' }
        }).as('createTask');

        // Ajoute une tâche
        cy.get('input[name="description"]').type('Tâche à supprimer');
        cy.get('select[name="priority"]').select('Haute');
        cy.get('button[type="submit"]').click();

        // Intercepter l'appel DELETE pour supprimer la tâche
        cy.intercept('DELETE', '/api/tasks/*', {
            statusCode: 204 // Réponse sans contenu
        }).as('deleteTask');

        // Supprime la tâche
        cy.contains('Tâche à supprimer').parents('tr').find('.btn-delete').click();

        // Vérifie que la tâche a été supprimée
        cy.get('.task-list-container').should('not.contain', 'Tâche à supprimer');
    });


    // // Test de vérification des statuts des tâches
    // it('should change the status of a task', () => {
    //     // Intercepter l'appel POST pour ajouter une tâche
    //     cy.intercept('POST', '/api/tasks', {
    //         statusCode: 201,
    //         body: { id: 1, description: 'Tâche à changer de statut', status: 'pending', dueDate: '2024-12-31', priority: 'high' }
    //     }).as('createTask');

    //     // Ajoute une tâche
    //     cy.get('input[name="description"]').type('Tâche à changer de statut');
    //     cy.get('select[name="priority"]').select('Haute');
    //     cy.get('button[type="submit"]').click();

    //     // Change le statut
    //     cy.intercept('PUT', '/api/tasks/*', {
    //         statusCode: 200,
    //         body: { id: 1, description: 'Tâche à changer de statut', status: 'completed', dueDate: '2024-12-31', priority: 'high' }
    //     }).as('changeStatus');

    //     cy.contains('Tâche à changer de statut').parents('tr').find('select[name="status"]').select('completed');

    //     // Vérifie que le statut a été mis à jour
    //     cy.get('.task-list-container').should('contain', 'Complétée');
    // });

    // Test de chargement de la liste des tâches
    it('should load tasks from the data source', () => {
        // Intercepter l'appel GET pour charger les tâches initiales
        cy.intercept('GET', '/api/tasks', {
            statusCode: 200,
            body: [] // Aucune tâche pour ne pas affecter la base de données
        }).as('getTasks');

        // Visiter la page et vérifier que les tâches sont affichées
        cy.get('.task-list-container').should('exist');
        cy.get('.task-item').should('have.length.greaterThan', 0); // Assurez-vous qu'il y a au moins une tâche
    });   
    

    // test de mise a jour
    it('should update a selected task', () => {
       
        // Sélectionne la tâche pour la mise à jour
        cy.contains('Tâche à modifier').parents('tr').find('.btn-edit').click();
    
        // Vérifie que le formulaire de mise à jour est affiché avec les valeurs correctes
        cy.get('input[name="description"]').should('have.value', '');
        cy.get('input[name="dueDate"]').should('have.value', '');
        cy.get('select[name="priority"]').should('have.value', '');
    
        // Met à jour la tâche
        cy.get('input[name="description"]').clear().type('');
        cy.get('button[type="submit"]').click();
    
        // Vérifie que la tâche a été mise à jour
        cy.get('.task-table').should('contain', '');
    });
    
});
