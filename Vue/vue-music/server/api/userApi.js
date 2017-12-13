var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

//使用连接池链接数据库

var pool = mysql.createPool(models.mysql);

var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

//音乐播放器接口

// 增加用户接口
router.use('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.username, params.pwd], function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results)
            jsonWrite(res, results);
        }
    })
});

//查库操作(检测用户信息)
router.use('/searchUser', (req, res) => {
    var sql = $sql.user.check;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.username, params.pwd], function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results)
            jsonWrite(res, results);
        }
    })
});

//增加收藏
router.use('/addLove',(req,res) => {
    var sql = $sql.lovelist.add_love;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.user_name, params.songid,params.songmid,params.song_name,params.song_singer], function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results)
            jsonWrite(res, results);
        }
    })
});

//收藏列表渲染
router.use('/loveList',(req,res) => {
    var params = req.body;
    var sql = $sql.lovelist.search_love + params.user_name;
    pool.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results)
            jsonWrite(res, results);
        }
    })
});

//取消收藏
router.use('/removeLove',(req,res) => {
    var params = req.body;
    var sql = $sql.lovelist.remove_love + params.id;
    pool.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results)
            jsonWrite(res, results);
        }
    })
});

module.exports = router;