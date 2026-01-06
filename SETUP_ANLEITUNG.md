# Setup-Anleitung für GitHub

## Schritt 1: Repository erstellen

1. Gehe zu [GitHub](https://github.com) und melde dich an
2. Klicke auf "New Repository" (grüner Button)
3. Name: `dsa5-macro-helper`
4. Description: `Foundry VTT Modul zum Erstellen von DSA5 Fertigkeitsproben-Makros`
5. Public oder Private (Public empfohlen für Community)
6. **NICHT** "Initialize with README" ankreuzen
7. Klicke "Create repository"

## Schritt 2: Dateien hochladen

### Ordnerstruktur auf deinem PC:
```
dsa5-macro-helper/
├── .github/
│   └── workflows/
│       └── release.yml
├── scripts/
│   └── main.js
├── styles/
│   └── module.css
├── lang/
│   └── de.json
├── .gitignore
├── LICENSE
├── README.md
└── module.json
```

### Option A: GitHub Web Interface (einfach)

1. Klicke auf "uploading an existing file"
2. Ziehe alle Dateien und Ordner in das Fenster
3. Commit message: "Initial commit"
4. Klicke "Commit changes"

### Option B: Git Command Line (fortgeschritten)

```bash
# In deinem Modul-Ordner
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/DEINUSERNAME/dsa5-macro-helper.git
git push -u origin main
```

## Schritt 3: Release erstellen

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf "Releases" (rechte Sidebar)
3. Klicke "Create a new release"
4. Tag: `v1.0.0`
5. Release title: `Version 1.0.0`
6. Description: 
```
Erstes Release des DSA5 Makro-Helfers

Features:
- Feste Fertigkeitsproben
- Fertigkeitsproben mit Dialog
- Mehrfach-Fertigkeitsproben
```
7. Klicke "Publish release"

**WICHTIG**: Die GitHub Action erstellt automatisch `module.json` und `module.zip` als Assets!

## Schritt 4: URLs in module.json anpassen

Ersetze in `module.json` alle Vorkommen von `deinusername` mit deinem GitHub-Benutzernamen:

```json
"url": "https://github.com/DEINUSERNAME/dsa5-macro-helper",
"manifest": "https://github.com/DEINUSERNAME/dsa5-macro-helper/releases/latest/download/module.json",
"download": "https://github.com/DEINUSERNAME/dsa5-macro-helper/releases/latest/download/module.zip"
```

Committe und pushe diese Änderung, dann erstelle einen neuen Release (v1.0.1).

## Schritt 5: Modul in Foundry installieren

### Installationslink:
```
https://github.com/DEINUSERNAME/dsa5-macro-helper/releases/latest/download/module.json
```

### In Foundry:
1. Add-on Modules → Install Module
2. Füge den Manifest-Link ein
3. Klicke "Install"
4. Aktiviere das Modul in deiner Welt

## Troubleshooting

### GitHub Action schlägt fehl?
- Stelle sicher, dass die Ordnerstruktur korrekt ist
- Prüfe, ob alle Dateien committet sind
- Schaue in "Actions" Tab für Details

### Modul lässt sich nicht installieren?
- Prüfe, ob das Release existiert
- Prüfe, ob `module.json` und `module.zip` als Assets vorhanden sind
- Stelle sicher, dass die URLs in `module.json` korrekt sind

### Module.json nicht gefunden?
- Warte 1-2 Minuten nach dem Release (GitHub Actions braucht Zeit)
- Prüfe ob die GitHub Action erfolgreich war (grüner Haken)

## Updates veröffentlichen

1. Ändere die Version in `module.json` (z.B. zu `1.1.0`)
2. Committe die Änderungen
3. Erstelle einen neuen Tag: `git tag v1.1.0`
4. Pushe den Tag: `git push origin v1.1.0`
5. Die GitHub Action erstellt automatisch ein neues Release!

## Support

Bei Fragen oder Problemen:
- Erstelle ein Issue auf GitHub
- Schreibe in Discord/Forum