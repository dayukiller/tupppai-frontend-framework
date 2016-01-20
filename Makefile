build:
	php src/index.php production > index.html ;
	rm -rf src/dist; cd src; gulp app; gulp less; gulp rjs; gulp cp
watch:
	php src/index.php local > index.html ;
	rm -rf res; rm -rf css; cd src; gulp app; gulp less; gulp watch
