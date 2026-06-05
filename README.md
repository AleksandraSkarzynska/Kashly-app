# KASHLY — aplikacja mobilna Android/iOS

Projekt aplikacji mobilnej przygotowany na podstawie prezentacji KASHLY: ciemny interfejs, neonowa zieleń, logo K, dashboard finansowy, AI insights, budżety, automatyczne oszczędzanie i cele.

## Technologie
- Expo + React Native
- Android i iOS z jednego kodu
- Gotowe do wrzucenia na GitHub

## Uruchomienie lokalne
```bash
npm install
npm start
```
Następnie zeskanuj QR w aplikacji Expo Go albo uruchom:
```bash
npm run android
npm run ios
```

## Publikacja w sklepach
Do publikacji produkcyjnej użyj EAS Build:
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android
eas build --platform ios
```
Uwaga: iOS wymaga konta Apple Developer, a Android konta Google Play Console.

## GitHub
1. Utwórz nowe repozytorium na GitHub.
2. W folderze projektu uruchom:
```bash
git init
git add .
git commit -m "Initial KASHLY mobile app"
git branch -M main
git remote add origin https://github.com/TWOJ_LOGIN/kashly-mobile-app.git
git push -u origin main
```
