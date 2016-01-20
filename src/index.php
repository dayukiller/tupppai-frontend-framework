<?php
date_default_timezone_set("PRC");
$env    = 'local';
$code   = date("YmdHis");

if($argc >= 2) {
    $env = $argv[1];
}

?>

<!DOCTYPE html>
<html>
<head> 
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="图派">
    <meta name="keywords" content="PS,社区">
    <!-- wb -->
    <meta property="wb:webmaster" content="cd0d265f8e3e0cb0" /> 
    <html xmlns:wb="http://open.weibo.com/wb">
    <!-- h5  -->
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <link rel="icon" href="/img/favicon.ico" type="image/x-icon" /> 
 
    <!-- css -->
    <script>
        var require = {
            urlArgs : "v=<?php echo $code; ?>"
        };
    </script>    

    <!-- 生成css集合 -->
    <?php if($env == 'production') { ?>
        <link rel="stylesheet" type="text/css" href="/css/main.css?<?php echo $code; ?>"  >
        <!-- 合并后的js文件在script-build/src -->
        <script data-main="res/main" src="/res/lib/require/require.js"></script>
        <script src="/res/lib/pingpp/pingpp.js"></script>
    <?php } else { ?>
        <link rel="stylesheet" type="text/css" href="/css/common.css"  >
        <!-- 未合并后的js文件在src/src -->
        <script data-main="src/main" src="/src/lib/require/require.js"></script>
    <?php } ?>
    <!--[if IE]>
         <script src="/res/lib/respond/respond.js" ></script>
         <script src="/res/lib/es5/es5-sham.js" ></script>
         <script src="/res/lib/mediaqueries/css3-mediaqueries.js" ></script>
         <script src="/res/lib/PIE/PIE.js" ></script>
    <![endif]--> 
    <title>图派</title>
</head> 
 
<body>
    <div class="container">
        <div class="inner-container" id="contentView">
        </div>  
        <div class="clear"></div>        
    </div>   
    </body>
</html>
