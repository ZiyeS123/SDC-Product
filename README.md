# Atelier Products API Service

The goal of this project was to build a scalable RESTful API service for a retail web-portal and optimize to handle web-scale traffic. An ETL process was implemented to migrate legacy datasets of more than 50M+ records into a Postgres database. The service was incrementally optimized through database indexing, connection pooling, and Redis caching to handle a throughput of 60k client requests in 30 sec (2k per sec). The server and Postgres database was containerized using Docker and deployed on AWS EC2 instance.

---
## Table of Contents
1. [Installing Dependencies](#Installing-Dependencies)
2. [Tech Stack](#Tech-Stack)
3. [Routes](#Routes)
4. [Database Schema](#Database-Schema)
5. [Testing](#Load-Testing)
6. [Engineering Journal](https://gist.github.com/ZiyeS123/6e2568bf2b7a4cdfb614b5b09d13e4e9)

---

## Installing-Dependencies

### Navigate to the root directory and run the following in your terminal:

>*Install dependencies*
```
npm install
```
>*Start the server*
```
npm start
```
Open `http://localhost:3000`

---

## Tech-Stack

### Back-End Development

####   <img width="10%" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg"> <img width="10%" src="https://www.vectorlogo.zone/logos/nodemonio/nodemonio-ar21.svg"> <img width="10%" src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg"> <img width="10%" src="https://user-images.githubusercontent.com/8939680/57233884-20344080-6fe5-11e9-8df3-0df1282e1574.png"> <img width="10%" src="https://www.vectorlogo.zone/logos/npmjs/npmjs-ar21.svg"> <img width="10%" src="https://www.vectorlogo.zone/logos/postgresql/postgresql-ar21.svg">


### Development Tools

####  <img width="15%" src="https://www.vectorlogo.zone/logos/js_webpack/js_webpack-ar21.svg"> <img width="10%" src="https://www.vectorlogo.zone/logos/babeljs/babeljs-ar21.svg"> <img width="15%" src="https://www.vectorlogo.zone/logos/eslint/eslint-ar21.svg"> <img width="10%" src="https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-banner-light.png"> <img width="7.5%" src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1420816527/efcb3lfvkif27xsoreye.png">


### Deployment
####   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <img width="10%" src="https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-ar21.svg"> <img width="10%" src="https://www.vectorlogo.zone/logos/docker/docker-ar21.svg">

---

## Routes

| Request Type | Endpoint                      | Returns                                                                    
|--------------|-------------------------------|----------------------------------------------------------------------------
| GET          | /products                     | Retrieves the list of products                                 
| GET          | /products/:product_id         | Returns all product level information for a specified product id                                
| GET          | /products/:product_id/styles  | Returns the all styles available for the given product            
| GET          | /products/:product_id/related | Returns the id's of products related to the product specified     

---
## Database Schema
<img width="793" alt="RDBMS Schema" src="https://user-images.githubusercontent.com/88356949/147787078-b2c2c280-8225-467d-a7b2-e0cdd500546d.png">

---
## Testing

### Response Time - Local
| Endpoint | Before | After
|----------|--------|-------
| products/list | 76ms | 23ms
| products/1000000 | 201ms | 20ms
| products/1000000/related | 751ms | 13ms
| products/1000000/styles | 25350ms | 13ms

<details>
<summary>/products/list</summary>
  
  #### before: 
  
  <img width="857" alt="list1" src="https://user-images.githubusercontent.com/88356949/142731841-8d72be7d-1ae3-4b48-b28d-b936a5cec671.png">
  
  #### after:
  
<img width="880" alt="list2" src="https://user-images.githubusercontent.com/88356949/142733023-98a31943-e3a3-4c87-a3cd-5633ef9bba78.png">
</details>

<details>
<summary>/products/id</summary>
  
  #### before: 
  
  <img width="861" alt="id1" src="https://user-images.githubusercontent.com/88356949/142731844-54bb2709-408d-4762-95a7-1ffda9823ae4.png">
  
  #### after: 
  
  <img width="867" alt="id2" src="https://user-images.githubusercontent.com/88356949/142733039-483b54bb-ec77-4daf-bc6e-d587c37f8ea6.png"> 
</details>

<details>
<summary>/products/id/related</summary>
  
  #### before: 
  
  <img width="867" alt="related1" src="https://user-images.githubusercontent.com/88356949/142731845-983d6846-bd33-46fb-900d-5904e64f2887.png">
  
  #### after: 
  <img width="872" alt="related2" src="https://user-images.githubusercontent.com/88356949/142733329-d6380d7e-1259-4b7c-89a4-59e84db4cfa1.png">
</details>


<details>
<summary>/products/id/styles</summary>
  
  #### before: 
  
  <img width="863" alt="styles1" src="https://user-images.githubusercontent.com/88356949/142733349-627847c1-fd0b-4143-a4c7-9f38fcf28832.png">
  
  #### after: 
  <img width="859" alt="styles2" src="https://user-images.githubusercontent.com/88356949/142733355-88b4d175-d017-41a5-b40f-1354b14dc354.png">
 
</details>

### Stress Test - AWS

>2000 client requests made each second for 30 seconds

<details>
  
  #### before: 
  ![before](https://user-images.githubusercontent.com/88356949/147787805-aef95b1d-7573-4265-824f-44a9f2830b3e.png)

  
  #### after: 
  ![after](https://user-images.githubusercontent.com/88356949/147787813-86a631ee-5803-41f5-8960-648c5ab6ce21.png)
 
</details>


