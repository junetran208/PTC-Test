# This is guideline to set up and execute tests
## prerequisite

### 1. Install Node

[NodeJs download](https://nodejs.org/en/download/)

### 2. Install Cypress

```npm install cypress```
[Follow these instructions to install Cypress.](https://docs.cypress.io/guides/getting-started/installing-cypress)

### 3. install cypress-mochawesome-reporter
```npm install cypress-mochawesome-reporter --no-save```

## Execute testing for this repo

### a. Run test with cypress headless
```npx cypress run```
### b. Open Cypress UI and select specs to run
```npx cypress open```
### c. Run test by setup environment
#### Run by Test environment
```npm run test:testing```
#### Staging environment
```npm run test:staging```


## Test Report
### View html report
#### After executing the test, open html file from your local under ..\cypress\reports
#### Note: You also able to refer the test result through the shared video from Google drive https://drive.google.com/file/d/1yhxu7FJj9KfuFkK_M5hLxYt1P7G1rab7/view?usp=drive_link 



