DROP TABLE shop;
DROP TABLE users;

CREATE TABLE   users(
    ID serial PRIMARY KEY,
    name varchar(30),
    pass varchar(30)
    
    
); 

CREATE TABLE  shop(
    ID serial PRIMARY KEY,
    list text,
    userID integer,
CONSTRAINT fk_userID
FOREIGN KEY (userID)
REFERENCES users(ID)
    
); 
