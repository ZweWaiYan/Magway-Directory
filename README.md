Magway Directory
--------------------
This project is for information about famous hotels, restaurants, and pagodas of Magway Township by MSH Group 

Built it with
-----------------
- React 
- TailwindCSS
- Framer-motion
- Node.Js
- MySQL

How to Start the project
-------------------------
1. Install module
    -   for Frontend <Your Path>\magway_dir> npm install
    -   for Backend  <Your Path>\magway_dir\backend\route> npm install    

2.  Connect with your MySQL 
    -   Go to database.js file
    -   set your mysql "user" and "password"

3. Import Scheme and Data on MySQL Workbench or MySQL Configurator (your choice)
    -   Get Scheme and Data files
        -   for Scheme file <Your Path>\magway_dir\backend\query\col_db.sql
        -   for Data file   <Your Path>\magway_dir\backend\query\db.sql

    -   Import Scheme files on MySQL Workbench
        -   Create New Query and run with col_db.sql file
        -   Create New Query and run with db.sql file
        -   Done!
    
    -   Import Scheme files on MySQL Configurator 
        -   Go to Command line
        -   Type "mysql -u <username> -p
        -   Type "password"
        -   <Your Path>\col_db.sql 
        -   <Your Path>\db.sql 
        -   Done!

4.  Run project on Visual Studio Code
    -   <Your Path>\magway_dir\backend\route> npm run start-all
    

Want to test our default user
------------------------------
- Get Account list
    -   <Your Path>\magway_dir\backend\query\Magway Directory user account.text
