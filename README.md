# studifyWebServer

### Tech-stack:
NodeJS, Express, MongoDB Cloud
### Quickstart:
```
npm install  
npm run devStart  
```
*runs at port 5000

### Data Injection:
_Under /data_injection/db_injection.py_  
Script reads in excel file (db_question.xlsx) that contains all the questions and sends POST requests to the already-running server sequentially. Error-handling implemented.  

```
npm run devStart 
cd data_injection 
python db_injection.py  
```  
  
### Load Testing:
_Under /load_testing/locustfile.py_  
```
npm run devStart 
cd load_testing    
locust -f locustfile.py --host=http://localhost:5000  
```

### API document in Google Drive: 
CZ3003 SSAD/Lab3/Database & API https://docs.google.com/document/d/16xt9JD0s0VVzXxSrnYKUwFLONUz38ZfNjRc8A_bU8So/edit?usp=sharing
