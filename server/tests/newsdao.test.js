// @flow

var mysql = require("mysql");

const NewsDao = require('../dao/newsdao.js');
const runsqlfile = require('./runsqlfile.js');

var pool = mysql.createPool({
    connectionLimit:1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});

let newsDao = new NewsDao(pool);

//Before test start
beforeAll(done => {
    runsqlfile("tests/createNewsTable.sql", pool, () => {
        runsqlfile("tests/createTestDataNews.sql", pool, done);
    });
})

//Tests
test("Get all articles from db", done => {
    function callback(status, data){
        console.log("Test callback: status = "+status+", data = "+JSON.stringify(data));
        expect(data.length).toBe(2);
        done()
    }
    newsDao.getAll(callback);
});

test("Get articles with priority = 1", done => {
    function callback(status, data){
        console.log("Test callback: status = "+status+", data = "+JSON.stringify(data));
        expect(data.length).toBe(2);
        done();
    }
    newsDao.getPriOne(callback);
});

test("Get all categories from db", done => {
    function callback(status, data){
        console.log("Test callback: status = "+status+", data = "+JSON.stringify(data));
        expect(data.length).toBe(2);
        done();
    }
    newsDao.getHeadlines(callback);
});

test("Create article in db", done=>{
    function callback(status, data) {
        console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
        expect(data.affectedRows).toBe(1);
        done()
    }
    newsDao.createArticle(
        {"overskrift":"create article","innhold":"test with jest", "bilde": "ww", "kategori": "Sport", "viktighet": 1}, callback
    );
});

test("Edit one artice in db", done =>{
     function callbackA(status,data){
        console.log("Test callback: status = "+status+" , Data = "+JSON.stringify(data));
        expect(data.length).toBe(1);
        expect(data[0].overskrift).toBe("Test with Jest");
        done();
    }

    function callbackB(status,data){
        newsDao.getOne(22, callbackA);
    }

    newsDao.updateArticle(
        {"overskrift":"Test with Jest", "innhold":"b", "bilde":"ww", "kategori":"Sport", "viktighet":1, "id":22}, callbackB);
    
});

test("Get one article from db", done => {
    function callback(status, data){
        console.log("Test callback: status = "+status+", data = "+JSON.stringify(data));
        expect(data.length).toBe(1);        
        expect(data[0].overskrift).toBe("Test with Jest");
        done()
    }
    newsDao.getOne(22, callback);
});

test("Delete one article from db", done => {
    function callback(status, data){
        console.log("Test callback: status ="+status+", data = "+JSON.stringify(data));
        expect(data.length).toBe(2);
        done()
    }

    function callbackA(status,data){
        newsDao.getAll(callback);
    }
    newsDao.deleteArticle(22,callbackA);
});

afterAll(done =>{
    pool.end();
    done();
});

