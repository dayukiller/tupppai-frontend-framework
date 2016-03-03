<!DOCTYPE html>
<html>
<head> 
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="whenjonny">
    <meta name="keywords" content="whenjonny">
    <!-- h5  -->
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <link rel="icon" href="/img/favicon.ico" type="image/x-icon" /> 
 
    <!-- require conifg-->
    <%
        var code = new Date().getTime(); 
        var min = (env == 'dev')? '': '.min';
        var src = (env == 'dev')? 'src': 'res';
    %>
    <script>
        var require = {
            urlArgs : "v=<%= code %>",
            timeout : 100
        };
    </script>    

    <link rel="stylesheet" type="text/css" href="/css/main<%= min %>.css?<%= code %>"  >
    <!-- 合并后的js文件在script-build/src -->
    <script data-main="<%= src %>/main" src="/<%= src %>/lib/require/require.js"></script>
    <!--[if IE]>
         <script src="/<%= src %>/lib/respond/respond.js" ></script>
         <script src="/<%= src %>/lib/es5/es5-sham.js" ></script>
         <script src="/<%= src %>/lib/mediaqueries/css3-mediaqueries.js" ></script>
         <script src="/<%= src %>/lib/PIE/PIE.js" ></script>
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
