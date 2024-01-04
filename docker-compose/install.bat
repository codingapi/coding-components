<# :
@powershell "icm ([scriptblock]::Create((gc '%~f0' -Raw -Encoding UTF8)))"
exit
#>

docker-compose  build --no-cache
docker-compose  up -d
docker ps -a 