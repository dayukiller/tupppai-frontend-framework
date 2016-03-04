# html目录中使用.htaccess

    <IfModule mod_rewrite.c>
        <IfModule mod_negotiation.c>
            Options -MultiViews
        </IfModule>

        RewriteEngine On
        RewriteRule !\.(js|ico|gif|jpg|png|css|html)$ index.html
    </IfModule>
    忽略所有有后缀的文件，将无后缀的文件指向index.html完成路由跳转

# make build 测试
# make release 发布
# make watch 监听
