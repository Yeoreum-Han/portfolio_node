const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const connection = require('./lib/db');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(`${__dirname}/public`));

// 인덱스페이지 - 파일열기
app.get('/',(req, res)=>{
    fs.readFile('public/index.html','utf-8',(err,data)=>{
        if(err) throw err;
        res.send(data);
    });
});

// 작성페이지 - 파일열고, 내용 post
app.get('/diarywrite',(req, res)=>{
    fs.readFile('public/diarywrite.html','utf-8',(err, data)=>{
        if (err) throw err;
        res.send(data);
    });
});
app.post('/diarywrite', (req, res)=>{
    const body = req.body;
    let timestamp = new Date().getTime();
    connection.query('insert into diaries (title, mood, date, timestamp, usertext) values (?,?,?,?,?);',[body.title, body.mood, body.date, timestamp, body.usertext],(err,results)=>{
        if (err) throw err;
        res.redirect('/diaryshow');
    });
});

// 조회페이지 - 파일열고, 테이블 내용 보여주기
app.get('/diaryshow', (req, res)=>{
    fs.readFile('public/diaryshow.html', 'utf-8', (err,data)=>{
        connection.query('select * from diaries order by timestamp desc limit 31', (err, results,fields)=>{
            if(err) throw err;
            res.send(ejs.render(data, {data:results,}));
        });
    });
});

app.get('/modify/:id', (req, res)=>{
    fs.readFile('public/modify.html', 'utf-8', (error, data) => {
        // 해당 데이터 보여주고
      connection.query('select title, date_format(date, "%Y-%m-%d") as date, mood, usertext from diaries where number=?', [req.params.id], (error, results) => {
        if (error) throw error;
        res.send(ejs.render(data, {
          data: results[0],
        }));
      });
    });
});

app.post('/modify/:id', (req,res)=>{
    const body = req.body;
    connection.query('update diaries set title=?, date=?, mood=?, usertext=? where number=?',[body.title, body.date, body.mood, body.usertext, req.params.id],(err,results)=>{
        if (err) throw err;
        res.redirect('/diaryshow');
    });
});

app.get('/delete/:id', (req,res)=>{
    connection.query('delete from diaries where number=?', [req.params.id], (err, results)=>{
        if(err) throw err;
        res.redirect('/diaryshow');
    });
});
        


app.listen(3000, ()=>{
    console.log('3000번포트 연결중');
});


