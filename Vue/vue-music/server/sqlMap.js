// sql语句
var sqlMap = {
  // 用户
  user: {
    add: 'insert into user_info(user_name, user_pwd) values (?,?)',
    check: 'select user_name,user_pwd from user_info',
  },
  lovelist: {
    add_love: 'insert into love_list(user_name, id, mid, name, singer) values(?,?,?,?,?)',
    search_love: 'select id, mid, name, singer from love_list where user_name = ',
    remove_love: 'delete from love_list where id = '
  }
}
module.exports = sqlMap;
