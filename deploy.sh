pnpm run build
if [ ! -d /var/www/ipv6 ];then mkdir /var/www/ipv6;elif [[ -n $(ls /var/www/ipv6) ]];then rm -r /var/www/ipv6/*;fi
cp -r ./dist/* /var/www/ipv6/
nginx -s reload