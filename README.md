
## How to install & run project?

 - Node @18.14.0  
 - Run command: 'npm install'  
 - Create .env file with configuration  
 - Run command: 'npm run dev'  



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
 │ │       ├── auth.service.ts  
 │ │       ├── task.service.ts  
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

 1. GET: http://localhost:3000/auth/test
 2. POST: http://localhost:3000/auth/register
 3. POST: http://localhost:3000/auth/login
 3. POST: http://localhost:3000/task
 3. GET: http://localhost:3000/task
 3. GET: http://localhost:3000/task/1
 3. PATCH: http://localhost:3000/task/1
 3. DELETE: http://localhost:3000/task/1