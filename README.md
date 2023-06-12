# Instalación Expo 
Primero instalamos con npm explo-cli y exp (debemos de tener **Node.js** y **npm** instalados)

```shell
npm install -g expo-cli exp
```

Dentro de la carpeta FiuFit ejecutar:

```shell
npm install 
```

Para levantar el servidor dentro de la carpeta FiuFit ejecutar:
```shell
expo start
```

## Antes de usar EAS, loggearse:
```shell
expo login
```

## Lanza la aplicación a producción (genera APK de producción)
```shell
eas build --profile production --platform android        
```

## Lanza la aplicación como desarrollador (genera APK de development)
```shell
eas build --profile development --platform android
```

Con el APK de development generado podemos instalar la aplicación en nuestro dispositivo Android, y luego ejecutar el proyecto como desarrollado con comando:
```shell
expo start --dev-client
```

**Si se instala una nueva dependencia con npm o expo: se debe buildear de nuevo el APK de development y volver a instalarlo en el dispositivo Android.**