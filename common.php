<?php

//创建数据库之类的
$db=@mysql_connect('localhost', 'root', '') or @mysql_connect('localhost', 'root', 'nrs1000phone');

mysql_query("set names 'utf8'");
mysql_query('CREATE DATABASE suning');

//创建名为suning的数据库之类的
mysql_select_db('suning');

$sql= <<< END
CREATE TABLE  `suning`.`secret` (
`ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`username` TEXT NOT NULL ,
`password` TEXT NOT NULL ,
`time` INT NOT NULL
) CHARACTER SET utf8 COLLATE utf8_general_ci
END;

mysql_query($sql);

//正式开始

$act=$_REQUEST['act'];

switch($act)
{
	case 'reg':
		$username=urldecode($_REQUEST['username']);
		$password=urldecode($_REQUEST['password']);
		$time=time();
		$check_query = mysql_query("select ID from secret where username='$username' limit 1");
        if(mysql_fetch_array($check_query)){
            echo "{\"error\": 1 ,\"status\": 2}";
            exit;
        }
        else{

		$sql="INSERT INTO secret (ID, username,password,time) VALUES(0, '{$username}','{$password}', {$time})";

		mysql_query($sql);

		$res=mysql_query('SELECT LAST_INSERT_ID()');

		$row=mysql_fetch_array($res);

		$id=(int)$row[0];

		echo "{\"error\": 0, \"id\": {$id}, \"time\": {$time}}";

        }
		break;

	case 'login':

        $username=urldecode($_REQUEST['username']);
        $password=urldecode($_REQUEST['password']);
		$check_query = mysql_query("select password from secret where username='$username' and password='$password'
        limit 1");
        if($password==mysql_fetch_array($check_query)[0]){
            //登录成功
            echo "{\"error\": 0 ,\"status\": 0}";
        } else {
             echo "{\"error\": 1 ,\"status\": 1}";
        }
		break;
	}
?>