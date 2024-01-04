<# :
@powershell "icm ([scriptblock]::Create((gc '%~f0' -Raw -Encoding UTF8)))"
exit
#>

cd ..
yarn
yarn build
scp -r dist/* root@beijing:/opt/nginx/html/
