<# :
@powershell "icm ([scriptblock]::Create((gc '%~f0' -Raw -Encoding UTF8)))"
exit
#>


rm .\html -Force -Recurse
cd ..
yarn
yarn build
cp dist\* .\deploy\html

cd deploy
docker-compose up -d
