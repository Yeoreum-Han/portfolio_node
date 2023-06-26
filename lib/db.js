const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "database-1.cmr8qajvzrc9.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password: "11111111",
    database: 'mooddiary',
    port: "3306",
  });

  connection.connect();

  module.exports = connection;

  // 데이터베이스 생성
// connection.query('create database moodDiary', (err, results)=>{
//     if(err) throw err;
//     console.log('데이터베이스 생성됨');
// });

// db사용, 테이블 생성
// connection.query('use moodDiary;', (err, results)=>{
//     if (err) throw err;
//     console.log('db 사용');
// });
// connection.query('create table diaries (number int not null auto_increment primary key, title varchar(50) not null, mood varchar(30) not null, date datetime not null, usertext text not null);', (err, results)=>{
//     if (err) throw err;
//     console.log('테이블 생성됨');
// });
