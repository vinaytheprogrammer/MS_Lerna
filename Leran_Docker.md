# Docker Commands Documentation  

This document provides a simple explanation of the commands executed during the debugging and testing of the `author_service` application using Docker and Docker Compose.  

---

## 1. **Check Running Containers**  
```bash  
docker-compose ps  
```  
Lists all the running containers, their status, and the ports they are mapped to.  

---

## 2. **View Logs of a Specific Service**  
```bash  
docker-compose logs app  
docker-compose logs mysql  
```  
Displays the logs of the `app` and `mysql` services to debug issues.  

---

## 3. **Execute a Command Inside a Container**  
```bash  
docker-compose exec app npm run ping  
```  
Attempts to run the `ping` script inside the `app` container.  

---

## 4. **Check Open Ports in a Container**  
```bash  
docker-compose exec app netstat -tuln  
```  
Shows the open ports and their listening states inside the `app` container.  

---

## 5. **Install `curl` in the Container**  
```bash  
docker-compose exec app sh -c "apk update && apk add curl"  
```  
Updates the Alpine package manager and installs `curl` in the `app` container.  

---

## 6. **Test API Endpoints**  
```bash  
docker-compose exec app curl http://localhost:3005/ping  
docker-compose exec app curl http://localhost:3005/authors  
docker-compose exec app curl http://localhost:3005/authors/count  
```  
Uses `curl` to test various API endpoints of the `app` service.  

---

## 7. **Access MySQL Database**  
```bash  
docker exec -it author_service-mysql-1 mysql -uroot -pVinay@123  
```  
Logs into the MySQL database inside the `mysql` container.  

### Common MySQL Commands:  
- `show databases;` - Lists all databases.  
- `use author;` - Switches to the `author` database.  
- `show tables;` - Lists all tables in the current database.  
- `select * from Author;` - Queries all rows from the `Author` table.  

---

## 8. **Inspect Container IP Address**  
```bash  
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' author_service-app-1  
```  
Retrieves the internal IP address of the `app` container.  

---

## 9. **Check Port Mapping**  
```bash  
docker port author_service-app-1  
```  
Displays the port mapping of the `app` container (e.g., `3005` mapped to `3012`).  

---

## 10. **List Running Containers**  
```bash  
docker ps  
```  
Lists all running containers with their IDs, images, and status.  

---

## Notes:  
- **Errors Encountered:**  
    - Missing `curl` in the container was resolved by installing it using `apk`.  
    - The `authors` endpoint returned a 500 error due to internal server issues.  
- **Database Observations:**  
    - The `author` database was empty initially but had a table named `Author`.  

---  
This document summarizes the commands and their purposes for debugging and testing the `author_service` application.  