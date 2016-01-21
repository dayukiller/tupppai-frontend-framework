build:
	rm -rf src/dist res css; cd src; gulp app; gulp less; gulp cp; gulp html --env dev;
release: 
	rm -rf src/dist res css; cd src; gulp app; gulp less; gulp rjs; gulp cp; gulp html;
watch:
	rm -rf src/dist res css; cd src; gulp app; gulp less; gulp html --env dev; gulp watch;
