https://www.sketch.com/s/d0bf3f00-5828-4525-a7d7-e45ec6e6ad89

GENERAR SOLO UNA VEZ
keytool -genkey -v -keystore chino.jks -keyalg RSA -keysize 2048 -validity 10000 -alias chino
contraseña
elchino


jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore chino.jks app-release-unsigned.apk chino

zipalign -v 4 app-release-unsigned.apk elchino.apk

