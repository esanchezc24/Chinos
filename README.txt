https://www.sketch.com/s/d0bf3f00-5828-4525-a7d7-e45ec6e6ad89

ionic cordova build --release --prod android

GENERAR SOLO UNA VEZ
keytool -genkey -v -keystore chino.jks -keyalg RSA -keysize 2048 -validity 10000 -alias chino
contraseña
elchino


jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore chino.jks app-release-unsigned.apk chino

zipalign -v 4 app-release-unsigned.apk elchino.apk



LOGION GOOGLE
https://medium.com/@edigleyssonsilva/adding-google-sign-in-to-your-ionic-3-4-5-app-8ed81744e8ba

saber el sha1 de mi key
keytool -keystore chino.jks -list -v