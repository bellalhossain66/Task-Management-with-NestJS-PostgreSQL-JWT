## Task Management API (NestJS + PostgreSQL)  

## Project Overview  
A secure task management API built using NestJS and PostgreSQL with JWT-based authentication.  


## How to install & run project?  

 - Node @18.14.0   
 - Run command: 'npm install'   
 - Create .env file with configuration   
 - Run command: 'npm run dev'   
 - PostgreSQL 14+  
 - 'npm run testAuth' for test    



## Project design.

 project-root/  
 ├─src/  
 │ │  
 │ ├── api/  
 │ │   ├── controllers/  
 │ │   │   ├── auth.controller.ts  
 │ │   │   ├── task.controller.ts  
 │ │   │  
 │ │   ├── services/  
 │ │        ├── auth.service.ts  
 │ │        ├── task.service.ts  
 │ │  
 │ ├── auth/  
 │ │   ├── jwt.strategy.ts  
 │ │   ├── jwt.guard.ts  
 │ │   ├── jwt.module.ts  
 │ │   ├── auth.module.ts  
 │ │  
 │ ├── module/  
 │ │   ├── user.entity.ts  
 │ │   ├── user.dto.ts  
 │ │   ├── task.entity.ts  
 │ │   ├── task.dto.ts  
 │ │  
 │ ├── config/  
 │ │   ├── database.config.ts  
 │ │   ├── config.module.ts  
 │ │  
 │ ├── app.module.ts  
 │ ├── app.ts  
 ├── .env  
 ├── package.json  
 ├── package-lock.json  
 ├── tsconfig.json  


 
## Postman collection:

 - GET: http://localhost:3000/auth/test  
 - POST: http://localhost:3000/auth/register  
 - POST: http://localhost:3000/auth/login  
 - POST: http://localhost:3000/task  
 - GET: http://localhost:3000/task  
 - GET: http://localhost:3000/task/1  
 - PATCH: http://localhost:3000/task/1  
 - DELETE: http://localhost:3000/task/1  
 - GET: http://localhost:3000/task/get-all-tasks?page=1&limit=5  
 - GET: http://localhost:3000/task/get-all-tasks?status=IN_PROGRESS  
 - GET: http://localhost:3000/task/get-all-tasks?status=DONE&page=2&limit=5  