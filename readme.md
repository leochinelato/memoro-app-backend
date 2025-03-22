User
Criar usuario [ ] - POST /api/v1/users
Listar usuarios [ ] - GET /api/v1/users
Apenas o proprio usuario pode fazer:
Alterar usuario [ ] - PUT /api/v1/users/{id}
Deletar usuario [ ] - DELETE /api/v1/users/{id}

Task
Apenas o proprio usuario pode fazer:
Criar Task [X] - POST /api/v1/tasks
Listar Tasks [ ] - GET /api/v1/tasks
Alterar Task [ ] - PUT  /api/v1/tasks/{id}
Deletar Task [ ] - DELETE /api/v1/tasks/{id}
Listar Task pelo ID [ ] - GET /api/v1/tasks/{id}
Listar Task do dia atual [ ] - GET /api/v1/tasks?period=today
Listar Task da semana atual [ ] - GET /api/v1/tasks?period=week
Listar Task do mes atual [ ] - GET /api/v1/tasks?period=month
Listar Task pelo Category [ ] - GET /api/v1/tasks?categoryId=abc123

Category
Apenas o proprio usuario pode fazer:
Criar Category [ ] - POST /api/v1/categories
Listar Categories [ ] - GET /api/v1/categories
Alterar Categories [ ] - PUT /api/v1/categories/{id}
Deletar Categories [ ] - DELETE /api/v1/categories/{id}
Listar Category pelo ID [ ] - GET /api/v1/categories/{id}