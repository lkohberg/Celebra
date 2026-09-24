# celebra.at Produktdokumentation

Diese Datei beschreibt die Software von celebra.at so, wie sie heute im Code existiert. Sie richtet sich an Personen, die das Produkt noch nie benutzt haben und es in Videos, Anzeigen, Demos, Tutorials, Onboarding Material oder Verkaufspräsentationen erklären sollen.

Verwendete Statusmarkierungen:

| Markierung | Bedeutung |
|---|---|
| **Umgesetzt** | Funktioniert in der aktuellen Software |
| **Teilweise umgesetzt** | Teile funktionieren, Teile fehlen oder sind uneinheitlich |
| **Nur Oberfläche** | Sichtbar, tut aber nicht, was es verspricht |
| **Nicht umgesetzt** | Irgendwo erwähnt (Texte, AGB), aber nicht gebaut |
| **Nicht überprüfbar** | Hängt von Einstellungen außerhalb des Codes ab |

---

## Inhaltsverzeichnis

1. Produktüberblick
2. Vollständige Produktübersicht
3. Navigation
4. Dokumentation Seite für Seite
5. Dokumentation Funktion für Funktion
6. Vollständige Nutzerabläufe
7. Referenz der Bedienelemente
8. Einstellungen
9. Automatisierung und Hintergrundprozesse
10. Fehler und Sonderfälle
11. Rollen und Berechtigungen
12. Daten, Preise und Referenztabellen
13. Bekannte Lücken und Unstimmigkeiten
14. Leitfaden für Videoproduktion
15. Glossar
16. Vollständigkeitscheckliste

---

# 1. Produktüberblick

## Was die Software ist

celebra.at ist ein österreichischer Webdienst zum Erstellen **digitaler Einladungen**. Kund:innen wählen ein Premium Design, fügen optionale Inhaltsblöcke hinzu (zum Beispiel Dresscode, Speisekarte, Quiz oder Hintergrundmusik), tragen die Eventdaten ein, zahlen einmalig und erhalten eine persönliche Einladungswebsite unter einer eigenen Adresse, zum Beispiel `celebra.at/anna-und-max`.

Gäste öffnen diesen Link am Handy, sehen eine kurze Eröffnungsanimation (Briefumschlag, Geschenkbox oder Badge Scan), alle Eventinfos und antworten direkt auf der Seite. Gastgeber:innen verfolgen Rückmeldungen, Seitenaufrufe und Gästeaktivität in einem persönlichen Dashboard und können Gästelisten als Excel Dateien exportieren.

## Zweck und gelöstes Problem

Gedruckte Einladungen sind teuer, langsam und verschwenderisch. Messengergruppen sind chaotisch und sammeln Rückmeldungen nicht geordnet. celebra.at ersetzt beides durch einen einzigen Link mit allem: Datum, Ort, Karte, Programm, Rückmeldeformular und interaktive Extras.

## Hauptzielgruppen

| Nutzer | Beschreibung |
|---|---|
| **Gastgeber:in / Kund:in** | Plant eine Hochzeit, einen Geburtstag, eine Party oder ein Firmenevent. Kauft und verwaltet die Einladung. |
| **Gast** | Alle, die den Link erhalten. Braucht kein Konto und keinen Login. |
| **Administrator:in** | Team von celebra.at. Prüft Bestellungen mit manueller Arbeit, schaltet Events live, verwaltet Promo Codes, bearbeitet Urheberrechtsmeldungen, liest Bewertungen. |

## Hauptanwendungsfälle

1. Hochzeitseinladungen (drei Hochzeitsdesigns, Briefumschlag Animation).
2. Geburtstags und Partyeinladungen (drei Partydesigns, Geschenkbox Animation).
3. Firmenevents, Konferenzen und Galas (drei Businessdesigns, Badge Scan Animation).
4. Rückmeldungen sammeln (RSVP) inklusive Begleitpersonen, Menüwahl und persönlicher Nachricht.
5. Mehrsprachige Einladungen (bis zu 3 von 11 Sprachen, jeweils mit eigenem Link und QR Code).

## Wertversprechen

* Ab €19 einmalig, kein Abo.
* Premium Designs mit animierten Intros.
* Rückmeldeformular mit Gästeliste und Excel Export.
* QR Code zum Drucken oder Teilen.
* Bis zu drei Sprachen pro Einladung.
* Umweltfreundlicher als Papier.
* 6 Monate online, verlängerbar.

## Ablauf im Überblick

```text
Startseite -> Design wählen -> Blöcke/Pakete wählen -> Eventdaten eingeben
-> Vorschau -> Kontakt + Zahlung (Stripe) -> Einladung geht live
-> Link / QR Code teilen -> Gäste antworten -> Gastgeber:in sieht Ergebnisse im Dashboard
```

Enthält die Bestellung Blöcke, die das Team von celebra.at manuell erstellt (individuelle Illustration, Music Pro), geht die Einladung zuerst in **Prüfung** und wird nach Fertigstellung von einer Administratorin oder einem Administrator veröffentlicht.

---

# 2. Vollständige Produktübersicht

```text
celebra.at
├── Startseite  (/)
│   ├── Obere Navigation (Designs, Funktionen, So funktioniert es, Sprache/Währung, Login oder Dashboard)
│   ├── Hero Bereich (Überschrift, Button "Design auswählen", Button "So funktioniert es")
│   ├── Funktionsraster (3 Karten)
│   ├── Vergleichstabelle (Papier vs WhatsApp vs celebra.at)
│   ├── Vorteile (6 Karten)
│   ├── Umweltbereich
│   ├── Designauswahl (Tabs: Geburtstag / Hochzeit / Business, Demo Buttons)
│   ├── Button "Alle entdecken" -> /templates
│   ├── Demo Vorschaufenster (komplette Demo Einladung)
│   ├── Fenster "So funktioniert es" (6 Schritte)
│   ├── Fenster Login / Registrierung
│   ├── Fußzeile (Impressum, Datenschutz, AGB als Fenster)
│   └── Cookie Hinweis
├── Designseite  (/templates)
├── Bestellablauf  (/order/:templateId)
│   ├── Schritt 1 Blöcke
│   ├── Schritt 2 Eventdaten
│   ├── Schritt 3 Vorschau
│   └── Schritt 4 Kontakt + Zahlung
├── Alte Konfigurationsseite  (/configure/:templateId)  [älterer Ablauf, noch erreichbar]
├── Erfolgsseite  (/success/:eventLink)  Live oder Warte Version
├── Dashboard  (/dashboard)
│   ├── Eventliste
│   ├── Eventdetail (Tabs: Statistik, Gäste, Musik, Ergebnisse, Zahlung, Fulfillment[Admin])
│   ├── Fenster Event bearbeiten
│   ├── Bewertungsformular + Vorschlagsbox
│   └── Admin Extras: Prüfwarteschlange, Urheberrechtsmeldungen, Bewertungen, Button Admin Tools
├── Admin Tools  (/admin-tools)  Promo Codes
├── Passwort zurücksetzen  (/reset-password)
├── Abmelden von E-Mails  (/unsubscribe?token=...)
├── Live Einladung  (/:eventLink  und  /:eventLink/:lang)
└── 404 Seite  (jede unbekannte Adresse)
```

Zusammenhang: Startseite und Designseite führen in den Bestellablauf. Dieser legt das Event an und schickt zu Stripe. Nach der Zahlung liefert die Erfolgsseite Link und QR Code. Die Live Einladung nutzen die Gäste. Alles, was Gäste tun, fließt zurück ins Dashboard.

---

# 3. Navigation

## 3.1 Obere Leiste der Startseite (Umgesetzt)

| Element | Ort | Was passiert |
|---|---|---|
| **Logo celebra.at** | Oben links | Bleibt auf / führt zurück zur Startseite |
| **Designs** | Obere Leiste (Desktop), Menü (Mobil) | Scrollt zur Designauswahl |
| **Funktionen** | Obere Leiste | Scrollt zu den Funktionen |
| **So funktioniert es** | Obere Leiste | Öffnet die Erklärung in 6 Schritten |
| **DE / EN Umschalter** | Obere Leiste | Wechselt die Websitesprache zwischen Deutsch und Englisch |
| **Währungsauswahl** | Neben der Sprache | Zeigt Preise in einer von 15 Währungen |
| **Login** | Oben rechts, ausgeloggt | Öffnet das Login / Registrierungsfenster |
| **Dashboard** | Oben rechts, eingeloggt | Führt zu `/dashboard`; kleine Zahl zeigt neue Gästeaktivität seit dem letzten Besuch |
| **Hamburger Menü** | Nur mobil | Öffnet ein Menü mit denselben Punkten |

## 3.2 Obere Leiste im Bestellablauf

| Element | Was passiert |
|---|---|
| **Zurück** | In Schritt 1: zur vorherigen Seite. Später: einen Schritt zurück |
| **Logo** | Nur Marke |
| **Sprache / Währung** | Wie oben |
| **Schrittleiste** (Blöcke, Event, Vorschau, Kontakt) | Zeigt den Fortschritt. Klick auf einen erledigten Schritt springt zurück. Vorspringen ist nicht möglich |

## 3.3 Obere Leiste im Dashboard

| Element | Was passiert |
|---|---|
| **Zurückpfeil** | Zur Startseite |
| **Logo** | Marke |
| **Sprache / Währung** | Wie oben |
| **E-Mail Adresse** | Auf Desktop sichtbar, nur Information |
| **Logout** | Meldet ab |
| **Admin Tools** (nur Admin) | Zu `/admin-tools` |
| **Bewertungen** (nur Admin) | Öffnet das Fenster mit Bewertungen und Vorschlägen |

## 3.4 Obere Leiste der Admin Tools

Der Zurückpfeil führt zu `/dashboard`.

## 3.5 Fußzeile (alle Marketingseiten)

Impressum, Datenschutz und AGB öffnen jeweils ein Fenster mit dem Rechtstext in der aktuellen Sprache. Es gibt keine eigenen Rechtsseiten.

## 3.6 Zugangsbedingungen

| Adresse | Wer darf sie öffnen |
|---|---|
| `/`, `/templates`, `/order/...`, Demos | Alle |
| Zahlungsschritt | Login nötig (Loginfenster erscheint automatisch) |
| `/dashboard` | Eingeloggte Nutzer; sonst Hinweis "Login erforderlich" |
| `/admin-tools` | Nur Admins; andere sehen den Hinweis "Login erforderlich" |
| `/:eventLink` | Alle, ohne Konto, aber nur wenn das Event **live** ist |

---

# 4. Dokumentation Seite für Seite

## 4.1 Startseite (`/`)

**Zweck:** Produkt erklären, Designs zeigen, zur Bestellung führen.
**Wer nutzt sie:** Neue Besucher:innen, wiederkehrende Kund:innen.

**Was man sieht, von oben nach unten**

1. **Obere Leiste** (siehe 3.1).
2. **Hero Bereich**, bildschirmfüllend. Kleines Abzeichen "Für unsere Erde 🌍", zweizeilige Überschrift, Unterzeile "Modern · Persönlich · Mit Rückmeldungs-Formular", kurze Beschreibung. Buttons:
   * **"Jetzt Design auswählen"** → `/templates`.
   * **"So funktioniert es"** → öffnet das Erklärfenster.
   * Darunter drei kurze Vertrauensaussagen.
3. **Funktionsraster**: drei animierte Karten (persönlicher Link, QR Code, fairer Preis).
4. **Vergleichstabelle**: Papiereinladung vs WhatsApp vs celebra.at in 10 Zeilen (Kosten, Design, RSVP, QR Code, Menü, Mehrsprachigkeit, Umwelt, Dashboard, Export, Gästeverwaltung). Jede Zelle zeigt Haken, Kreuz oder Strich. celebra.at hat überall einen Haken.
5. **Vorteile**: sechs Karten: günstig, Qualität, QR, Sprache, Dashboard, Export.
6. **Umweltbereich**: grüner Abschnitt mit drei Abzeichen zur Nachhaltigkeit.
7. **Designauswahl** (Anker `#templates`): Tabs **Geburtstag / Hochzeit / Business**. Jeder Tab zeigt drei Designkarten. Auf der Startseite haben die Karten nur den Button **Demo ansehen** (kein Auswählen). Darunter: **"Alle entdecken"** → `/templates`.
8. **Fußzeile** mit Rechtslinks.
9. **Cookie Hinweis** erscheint beim ersten Besuch nach 1,5 Sekunden.

**Zustände:** Außer dem allgemeinen Ladesymbol (Logo mit "celebra.at") keine Ladeanzeige. Eingeloggt oder ausgeloggt ändert nur den Button oben rechts.

**Verbindungen:** Designseite, Demofenster, Bestellablauf, Dashboard, Login.

**Für Videos:** Im Hero starten, langsam durch die Vergleichstabelle scrollen, Designtabs wechseln, eine Hochzeitsdemo öffnen und die Briefumschlag Animation abspielen lassen.

## 4.2 Designseite (`/templates`)

**Zweck:** Alle neun Designs ansehen und eine Bestellung starten.
**Was man sieht:** Zurück Button, Überschrift (Abzeichen "handverlesen", Titel, Untertitel), Tabs Geburtstag / Hochzeit / Business mit kurzer Beschreibung, ein dreispaltiges Raster mit Designkarten, unten ein Hinweis zu Sonderwünschen.

**Jede Designkarte zeigt:** Vorschaubild, Name, Slogan, Abzeichen "ab €19" (in der gewählten Währung), Beschreibung, bis zu vier Merkmale, Button **Auswählen**, Button **Demo ansehen**.

**Aktionen:**
* **Auswählen** → `/order/<templateId>` (Bestellablauf).
* **Demo ansehen** → öffnet das Demofenster.

## 4.3 Demofenster (Overlay)

**Zweck:** Genau zeigen, wie eine fertige Einladung aussieht, gefüllt mit Beispielinhalten.
**Was passiert:** Ein Vollbildfenster zeigt das echte Design mit Beispieldaten (Eventdatum 20. Juni 2027, damit der Countdown läuft, Beispielmenü, Hotels, Wunschliste, Shuttle, Quiz, Spiele, Potluck, Agenda, Produkte, Sponsoren je nach Kategorie). Alle interaktiven Blöcke sind sichtbar, speichern aber nichts. Ein hüpfender Pfeil lädt zum Scrollen ein; er verschwindet nach der Intro Animation und nach mehr als 60 Pixeln Scrollen.
**Button:** **"Dieses Design wählen"** → schließt das Fenster und öffnet den Bestellablauf für dieses Design.
Hinweis: Businessdemos haben keine Hintergrundmusik.

## 4.4 Fenster "So funktioniert es"

Sechs nummerierte Schritte mit Symbolen: Design wählen → Blöcke wählen → Vorschau → Kontaktdaten eingeben → Bezahlen → Teilen und feiern. Unten steht "ab €19" (in der gewählten Währung) und ein Preishinweis.

## 4.5 Fenster Login / Registrierung

Fünf Ansichten:

| Ansicht | Inhalt |
|---|---|
| Auswahl | Buttons **Login** und **Registrieren** |
| Login | E-Mail, Passwort (Augensymbol zum Ein und Ausblenden), **Login**, Link "Passwort vergessen" |
| Registrieren | E-Mail, Passwort (mindestens 6 Zeichen), **Registrieren** |
| Vergessen | E-Mail, **Link zum Zurücksetzen senden** |
| Bestätigen | Briefsymbol, Hinweis "Posteingang prüfen", **Zurück zum Login** |

Details:
* Enthält das E-Mail Feld kein `@`, ergänzt das System automatisch `@celebra.at` (Login per Benutzername).
* Nach der Registrierung kommt eine Willkommensmail und die Bestätigungsansicht. Das Konto muss per E-Mail bestätigt werden.
* Erfolgreicher Login: Hinweis "eingeloggt", Fenster schließt.
* Passwort vergessen: sendet eine E-Mail mit Link zu `/reset-password`, ein Hinweis bestätigt das.
* Fehler des Loginservices erscheinen als rote Hinweise.
* Während der Verarbeitung ist der Button gesperrt und zeigt einen Ladetext.

## 4.6 Bestellablauf (`/order/:templateId`)

Die zentrale Seite zum Kauf einer Einladung. Vier Schritte. Details in Abschnitt 5.3 bis 5.8.

**Schritt 1 Blöcke**
* Paketkarten mit Preis, Ersparnis gegenüber Einzelkauf, Kronenabzeichen "Beliebt" beim größten Paket, Symbole der enthaltenen Blöcke. Klick wählt aus, erneuter Klick hebt die Auswahl auf.
* Einzelne Blockkarten mit Symbol, Name, Beschreibung und Preis. Blöcke über €12 tragen das Abzeichen **PREMIUM**. Blöcke, die schon im gewählten Paket sind, sind ausgegraut mit "im Paket". Blöcke mit manueller Arbeit zeigen "✋ wird manuell erstellt".
* Bei einem manuellen Block erscheint ein bernsteinfarbener Infokasten:
  * Individuelle Illustration: Referenzfoto hochladen plus Beschreibungsfeld.
  * Andere manuelle Blöcke: Notizfeld.
* Preisleiste (bleibt sichtbar): Basisseite €19, Paket, zusätzliche Blöcke, Summe, Hinweis zur manuellen Arbeit, Button **Weiter**, kleiner Hinweis zur Onlinezeit von 6 Monaten.

**Schritt 2 Eventdaten**
* Eventtitel*, Datum*, Uhrzeit*, Ortsname, Adresse (Straße, PLZ, Ort; für Google Maps), Beschreibung. Platzhalter ändern sich je nach Kategorie.
* Nur Hochzeit: Ort und Adresse der Trauung, Ort und Adresse der Feier, Auswahl "Kinder willkommen" (Ja / Nein / Nicht anzeigen).
* Sprachen: Deutsch ist als Hauptsprache fix; insgesamt bis zu 3 von 11 Sprachen. Jede weitere Sprache kostet €3.
* Titelbild: per Ziehen oder Klick hochladen, oder **aus Bibliothek wählen** (Bildergalerie).
* RSVP Schalter; wenn aktiv: Rückmeldefrist, maximale Gästezahl, maximale Begleitpersonen pro Gast (0 bis 20, Standard 5).
* Schalter für die Intro Animation (Eröffnungsanimation ausschalten).
* Stil: Farbwähler für die Hauptfarbe, Schrift (Playfair Display, DM Sans, Georgia).
* Eventlink: `celebra.at/` + eigener Text. Laufende Prüfung mit Meldungen: ungültige Zeichen, reserviertes Wort, bereits vergeben, verfügbar (grün).
* Blockkonfigurator: Formulare für den Inhalt jedes gewählten Blocks (siehe 5.9).
* **Weiter** ist nur aktiv, wenn Titel, Datum, Uhrzeit und ein gültiger, freier Link (mindestens 3 Zeichen) vorhanden sind.

**Schritt 3 Vorschau**
* Live Vorschau des echten Designs mit den eingegebenen Daten. Fehlende Inhalte werden durch Beispieltext ersetzt.
* Umschalter Desktop / Mobil (auf größeren Bildschirmen).

**Schritt 4 Kontakt und Zahlung**
* Vorname*, Nachname*, E-Mail*.
* Promo Code Feld + **Anwenden**. Gültiger Code: grüner Chip mit Rabatt, Link **Entfernen**. Ungültig: roter Hinweis.
* Zusammenfassung: Design, Basispreis, Paket, Blöcke, Rabatt, Summe (bei Rabatt durchgestrichener Originalpreis), Hinweis zur manuellen Arbeit.
* Checkbox "Ich akzeptiere AGB und Datenschutz" mit klickbaren Links, die die Rechtsfenster öffnen.
* Button **Jetzt bezahlen €X**. Gesperrt, bis alle Felder und die Checkbox gültig sind; zeigt während der Verarbeitung "Wird verarbeitet...".
* Ohne Login öffnet sich zuerst das Loginfenster.
* Danach geht es zu Stripe Checkout.

## 4.7 Alte Konfigurationsseite (`/configure/:templateId`) (Teilweise umgesetzt)

Ein älteres einseitiges Bestellformular, das über die direkte Adresse noch erreichbar, aber nirgends verlinkt ist. Es nutzt andere Basispreise (€49 Standard, €99 Premium) als der aktuelle Bestellablauf (€19). Für Videos nicht empfohlen.

## 4.8 Erfolgsseite (`/success/:eventLink`)

**Live Version:** Hakensymbol, "Deine Eventseite ist live!", QR Code, Link (oder ein Link pro Sprache mit Flagge und Kopierbutton), Buttons **Link kopieren**, **QR herunterladen** (PNG), **Event öffnen**, **Zur Startseite**.

**Warte Version** (`?pending=true`, bei Bestellungen mit manueller Arbeit): Uhrsymbol, Text "wir arbeiten daran", Kasten "was jetzt passiert" in drei Schritten, Buttons **Dashboard** und **Startseite**.

## 4.9 Dashboard (`/dashboard`)

**Nicht eingeloggt:** Hinweis "Login erforderlich" mit Button zur Startseite.
**Laden:** Ladesymbol.
**Leer:** "noch keine Events" + **Erstes Event erstellen** → `/templates`.

**Normale Ansicht:**
* Links: Liste der Events. Jede Karte: Titel, Statusabzeichen (Unbezahlt für Entwurf, Live, Archiviert, Bezahlt, In Prüfung), Datum, `/link`. Unbezahlte Entwürfe haben einen bernsteinfarbenen Rand.
* Rechts: Details des gewählten Events oder Platzhalter "Event auswählen".
* Unten: **Bewertungsformular** (1 bis 5 Sterne + Feedback) und **Vorschlagsbox**.

Das Öffnen des Dashboards setzt die Benachrichtigungszahl auf der Startseite zurück.

**Tabs im Eventdetail:**

| Tab | Sichtbar wenn | Inhalt |
|---|---|---|
| Statistik | Immer | Ablaufwarnung, 4 Kennzahlen (Seitenaufrufe, QR Scans, Zusagen, Absagen), Event bearbeiten, Archivieren / Live schalten, Sprachlinks mit QR Codes, QR Download, Event öffnen |
| Gäste | Immer | Gästeliste, **XLSX exportieren** |
| Musik | Music Pro oder Musikwunsch gebucht | Songliste, Exportbutton |
| Ergebnisse | Potluck, Quiz oder Spiele gebucht | Potluck Zusagen, Quizstatistik, Spielabstimmung |
| Zahlung | Immer | Status, bezahlter Betrag, Stripe Zahlungs ID, **Event löschen** |
| Fulfillment | Nur Admin | Bereich für manuelle Arbeit |

**Zusätzlich für Admins:** Button Admin Tools, Bewertungsbereich, Bereich für Urheberrechtsmeldungen, Warteschlange "in Prüfung" ganz oben (bernsteinfarbene Karten mit den nötigen manuellen Blöcken), E-Mail der Besitzer:in auf jeder Eventkarte, alle Events aller Nutzer sichtbar.

## 4.10 Admin Tools (`/admin-tools`)

Nur Verwaltung der Promo Codes. Liste mit Code, Abzeichen Aktiv/Inaktiv, Rabatt (% oder €), Nutzungen (aktuell / maximal), Ablaufdatum, Buttons Bearbeiten und Löschen. Der Button **Neu** öffnet das Formular (siehe 5.20).

## 4.11 Passwort zurücksetzen (`/reset-password`)

Wird über den Link in der E-Mail geöffnet. Zustände: Prüfen (Ladesymbol), ungültiger oder abgelaufener Link (Schlüsselsymbol + Button Startseite), oder Formular mit neuem Passwort und Bestätigung (mindestens 6 Zeichen, müssen übereinstimmen). Bei Erfolg: Hinweis und Weiterleitung ins Dashboard.

## 4.12 Abmelden von E-Mails (`/unsubscribe?token=...`)

Deutsch oder Englisch je nach Websitesprache. Zustände: Laden, Bestätigen, Erfolg, bereits abgemeldet, ungültiger Link, Fehler.

## 4.13 Live Einladung (`/:eventLink`, `/:eventLink/:lang`)

Die Seite, die Gäste sehen. Ausführlich in 5.10 bis 5.18 beschrieben.
* Während des Ladens und bis das Titelbild geladen ist, bleibt die Seite absichtlich leer (kein Ladesymbol), damit Gäste nie eine halb aufgebaute Seite sehen.
* Unbekannter oder nicht live geschalteter Link: Meldung "Event nicht gefunden" und Button zur Startseite.
* Jeder Besuch wird als Seitenaufruf gezählt, oder als QR Scan, wenn er über einen heruntergeladenen QR Code kommt.
* Der Sprachteil der Adresse (zum Beispiel `/anna-und-max/en`) wählt die Gastsprache; ohne ihn wird Deutsch verwendet.

## 4.14 404 Seite

Jede unbekannte Adresse, die kein Event ist, zeigt "404 Hoppla! Seite nicht gefunden" mit Link zur Startseite, auf Deutsch oder Englisch je nach Websitesprache.

---

# 5. Dokumentation Funktion für Funktion

## 5.1 Designs (Umgesetzt)

**Was es ist:** Neun Premium Designs in drei Kategorien.

| Kategorie | Design | Schrift | Intro |
|---|---|---|---|
| Geburtstag | Neon Party | DM Sans | Geschenkbox |
| Geburtstag | Glamour Night | Playfair Display | Geschenkbox |
| Geburtstag | Garden Party | Playfair Display | Geschenkbox |
| Hochzeit | Floral Romance | Playfair Display | Briefumschlag |
| Hochzeit | Classic Elegance | Playfair Display | Briefumschlag |
| Hochzeit | Modern Love | DM Sans | Briefumschlag |
| Business | Executive Summit | DM Sans | Badge Scan |
| Business | Tech Conference | DM Sans | Badge Scan |
| Business | Gala Evening | Playfair Display | Badge Scan |

Die drei Hochzeitsdesigns haben deutlich verschiedene Layouts: Floral (botanischer Rahmen, sanfte Wellenübergänge), Classic (Monogramm Initialen, symmetrischer Serifenstil, Rautenornamente), Modern (riesige gestapelte Namen, diagonale Abschnittskanten, horizontales Programm auf Desktop). Alle Geburtstagsdesigns teilen ein Layout mit unterschiedlichen Farben; dasselbe gilt für Business.

**Einfache Erklärung:** "Wähle einen von neun professionell gestalteten Looks: Hochzeit, Party oder Business."

## 5.2 Sprache und Währung (Umgesetzt)

* Websitesprache: Deutsch oder Englisch. Neue Besucher:innen sehen standardmäßig Englisch; die Wahl wird am Gerät gespeichert.
* Währung: 15 Währungen mit festen Wechselkursen (EUR, USD, GBP, CHF, JPY, CAD, AUD, CNY, INR, BRL, MXN, SEK, NOK, DKK, PLN). Block und Paketpreise werden in Fremdwährungen immer **aufgerundet**. Bezahlt wird in der gewählten Währung.

## 5.3 Pakete (Umgesetzt)

Bündel von Blöcken zu einem günstigeren Preis. Ein gewähltes Paket graut seine Blöcke in der Einzelliste aus. Wird das Paket abgewählt, werden überlappende Blöcke entfernt. Inhalte und Preise siehe Abschnitt 12.

## 5.4 Einzelne Blöcke (Umgesetzt)

Optionale Inhaltsabschnitte der Einladung. Kombinierbar mit einem Paket (nur Blöcke außerhalb des Pakets werden verrechnet). Siehe Abschnitt 12.

## 5.5 Blöcke mit manueller Arbeit (Umgesetzt)

**Individuelle Illustration** (Hochzeit, €29) und **Music Pro** (Hochzeit, €19) werden vom Team von celebra.at erstellt oder geprüft.
* Kund:innen laden ein Referenzfoto hoch und beschreiben den Wunsch (Illustration) oder hinterlassen Notizen.
* Nach der Zahlung erhält das Event den Status **In Prüfung** statt live.
* Die Erfolgsseite zeigt die Warte Version.
* Ein Admin erledigt die Arbeit im Tab Fulfillment und veröffentlicht das Event.

## 5.6 Eventlink (Umgesetzt)

* Nur Kleinbuchstaben, Zahlen und Bindestriche.
* Mindestens 3 Zeichen.
* Verfügbarkeit wird beim Tippen geprüft.
* Reservierte Wörter sind gesperrt: templates, configure, success, dashboard, admin, login, signup, settings, api, auth, order.

## 5.7 Titelbild und Bildbibliothek (Umgesetzt)

Eigenes Bild hochladen oder aus einer Galerie wählen: Hochzeit 13 Bilder, Geburtstag 13, Business 12. Die Originalfotos des Designs sind mit "Original" markiert. Ein Klick wählt das Bild und schließt die Galerie.

## 5.8 Promo Codes beim Bezahlen (Umgesetzt)

1. Code eingeben (wird automatisch großgeschrieben) und Anwenden drücken.
2. Das System prüft: Code existiert, ist aktiv, nicht abgelaufen, nicht aufgebraucht.
3. Gültig: Rabatt wird angezeigt (Prozent oder fixer Eurobetrag, nie mehr als die Summe).
4. Bei der Zahlung prüft der Server erneut, zieht den Rabatt ab und zählt eine Nutzung.

## 5.9 Blockkonfigurator (Umgesetzt)

Formulare in Schritt 2 des Bestellablaufs und im Bearbeitungsfenster des Dashboards. Nur Formulare gebuchter Blöcke erscheinen.

| Block | Was Gastgeber:innen eingeben |
|---|---|
| Geschichte | Text |
| Ablauf | Liste aus Uhrzeit + Bezeichnung |
| Dresscode | Text für Herren, Text für Damen (Business: ein Text) |
| Menü | Gang, Gericht, Beschreibung |
| Hotels | Name, Adresse, Link |
| Shuttle | Uhrzeit, von, nach |
| Wunschliste | Artikel, Link, Notiz |
| Potluck | Namen der Speisen/Dinge |
| Quiz | Frage, Antwortmöglichkeiten, richtige Antwort |
| Spiele | Spielnamen (+ optionale Startstimmen) |
| Agenda | Uhrzeit, Titel, Sprecher:in |
| Sponsoren | Name, Link, Logo Upload |
| Diashow | Bilder hochladen |
| Produkte | Name, Beschreibung, mehrere Bilder |
| Videobotschaft | Video oder Audiodatei hochladen |
| Hintergrundmusik | MP3 Upload (max. 10 MB), Bestätigung der Rechte nötig; Hinweis zum Urheberrecht |

## 5.10 Intro Animationen (Umgesetzt)

| Intro | Verwendet bei | Was passiert |
|---|---|---|
| **Briefumschlag** | Hochzeiten | Versiegelter Umschlag mit den Initialen des Paares. Darüber der Hinweis "Zum Öffnen tippen". Tippen: Wachssiegel zerbricht, Hinweis blendet aus, Lasche öffnet sich, Einladung erscheint (~2 Sekunden) |
| **Geschenkbox** | Geburtstage | Tippen: Box wackelt, Deckel fliegt weg, Konfetti (~2,4 Sekunden) |
| **Badge Scan** | Business | Badge gleitet herein; Tippen: roter Laser scannt, "ACCESS GRANTED" mit grünem Haken (~3 Sekunden) |

Gastgeber:innen können das Intro in Schritt 2 oder später ausschalten.

## 5.11 Countdown (Umgesetzt)

Tage, Stunden, Minuten und Sekunden bis zum Event, jede Sekunde mit Klappanimation aktualisiert. Stoppt bei null (keine eigene "hat begonnen" Meldung). Kein dekorativer Balken.

## 5.12 Rückmeldeformular (RSVP) (Umgesetzt)

**Schritte für Gäste:**
1. Name eingeben (Pflicht), optional E-Mail.
2. **Ich komme** oder **Ich kann nicht** wählen.
3. Bei Zusage: Anzahl der Begleitpersonen (0 bis zum Limit der Gastgeber:in) und ein Namensfeld pro Begleitperson.
4. Falls Menüwahl aktiviert: Standard, Vegetarisch, Vegan, Glutenfrei oder Laktosefrei wählen.
5. Optionale Nachricht.
6. Senden → Dankesanimation.

Die Rückmeldung erscheint im Tab Gäste und in der Benachrichtigungszahl. Die Frist wird angezeigt, aber nicht durchgesetzt (siehe Abschnitt 13). Kein Konto nötig. Das Formular verwendet die gewählte Hauptfarbe.

## 5.13 Karte und Kalender (Umgesetzt)

* Google Maps Karte der Adresse (kein API Schlüssel nötig).
* Alle Premium Designs (Hochzeit, Geburtstag, Business): "Zum Kalender hinzufügen" mit Google Kalender und einer .ics Datei für Apple und Outlook. Angenommene Dauer: 4 Stunden.

## 5.14 Hintergrundmusik (Umgesetzt)

* Startet beim ersten Tippen, Scrollen oder Berühren (Browser verbieten automatisches Abspielen).
* Läuft in Schleife mit 30% Lautstärke; ein Button mit animierten Balken schaltet sie ein und aus.
* Nutzt die MP3 der Gastgeber:in oder einen Demotrack.
* Läuft eine Videobotschaft, wird die Musik automatisch auf 5% gesenkt und danach wieder angehoben.
* Gäste können eine **Urheberrechtsverletzung melden** (optional E-Mail + Grund). Die Musik stoppt sofort für diesen Gast und ein Admin sieht die Meldung.

## 5.15 Interaktive Gästeblöcke (Umgesetzt)

| Block | Aktion des Gastes | Was Gastgeber:innen sehen |
|---|---|---|
| **Quiz** | Beantwortet Fragen nacheinander, sieht sofort richtig/falsch, am Ende die Punkte | Prozent pro Antwort, richtige Antwort hervorgehoben |
| **Spieleabstimmung** | Gibt den Namen ein, stimmt für ein Spiel; Stimmen live sichtbar | Balkendiagramm |
| **Potluck** | Übernimmt ein offenes Element mit Namen; vergebene zeigen, wer sie mitbringt | Liste aus Element + Person |
| **Musikwunsch** (Party) | Gibt einen Songtitel ein | Tab Musik |
| **Music Pro** (Hochzeit) | Song, Interpret, eigener Name | Tab Musik + Excel Export für den DJ |

Ein einmal eingegebener Name (zum Beispiel im Rückmeldeformular) wird während desselben Besuchs in den anderen Blöcken vorausgefüllt. Nach dem Neuladen ist er nicht mehr gespeichert.

## 5.16 Anzeigeblöcke (Umgesetzt)

Geschichte, Ablauf, Dresscode (Herren/Damen), Menü, Hotels, Shuttle, Wunschliste (mit Links), Agenda (mit Sprecher:innen), Produkte (jeweils mit eigener Diashow im 4 Sekunden Takt), Sponsoren (Logoraster mit Links), Diashow (wischbar, automatischer Wechsel alle 4 Sekunden, Vollbild beim Tippen), individuelle Illustration, Video / Audiobotschaft. Diashow, Illustration und Video zeigen einen freundlichen Platzhalter "kommt bald", solange nichts hochgeladen ist. Andere Blöcke blenden sich aus, wenn sie leer sind.

## 5.17 Mehrere Sprachen (Umgesetzt)

11 Gastsprachen: Deutsch, Englisch, Spanisch, Portugiesisch, Französisch, Italienisch, Polnisch, Rumänisch, Niederländisch, Türkisch, Chinesisch. Die festen Beschriftungen der Einladung (zum Beispiel "Countdown", "RSVP", "Ort") werden übersetzt; eigene Texte der Gastgeber:in bleiben wie eingegeben. Jede Sprache hat eine eigene Adresse (`/link/en`) und einen eigenen QR Code.

## 5.18 Seitenaufrufe und QR Tracking (Umgesetzt)

Jeder Besuch speichert einen Seitenaufruf mit Herkunft und Browserinfo. Das Dashboard zeigt "Seitenaufrufe" und "QR Scans"; heruntergeladene QR Codes tragen eine Markierung, daher werden Scans als QR Scans gezählt. Vor dieser Änderung gedruckte QR Codes zählen weiterhin als Seitenaufrufe.

## 5.19 Eventverwaltung im Dashboard (Umgesetzt)

* **Event bearbeiten:** Fenster mit allen Hauptfeldern und dem Blockkonfigurator; für live, bezahlte und Entwurfs Events.
* **Archivieren / Live schalten:** nimmt ein Event offline oder wieder online. Gastgeber:innen können ein archiviertes Event selbst reaktivieren, wenn es bezahlt und nicht abgelaufen ist.
* **Löschen:** mit Bestätigung; endgültig.
* **Excel Exporte:** Gäste (Name, E-Mail, Antwort, Begleitpersonen, Menü, Nachricht, Datum) als `guests-<link>.xlsx`; Musikwünsche als `musikwuensche-<link>.xlsx`.
* **QR Download:** PNG, pro Sprache bei mehreren Sprachen.
* **Ablaufwarnung:** ab 10 Tagen vor dem tatsächlichen Ablaufdatum ein gelber Balken mit **Jetzt verlängern** (€10 für weitere 6 Monate, Stripe öffnet in neuem Tab); nach Ablauf ein roter Balken "abgelaufen".

## 5.20 Admin: Promo Codes (Umgesetzt)

Felder: Code, Art (Prozent oder fix), Wert (Prozent über 0 und höchstens 100), maximale Nutzungen (optional), Ablaufdatum (optional), Schalter aktiv. Anlegen, bearbeiten, löschen (mit Bestätigung).

## 5.21 Admin: Fulfillment und Veröffentlichung (Umgesetzt)

* Zeigt Referenzbild und Notizen der Kund:in.
* Fertige Illustration hochladen (wird automatisch in die Einladung eingefügt).
* Weitere Dateien hochladen (Bilder, Audio, PDF, ZIP) und löschen.
* **Vorschau** öffnet die Einladung in einem neuen Tab.
* **Live schalten / Jetzt veröffentlichen** mit Bestätigung.

## 5.22 Admin: Urheberrechtsmeldungen (Umgesetzt)

Aktualisiert sich alle 30 Sekunden. Für jede offene Meldung: **Musik deaktivieren**, **Musik löschen** (Bestätigung), **Verwerfen** (Musik wieder aktiv). Erledigte Meldungen werden eingeklappt gelistet (die letzten 10).

## 5.23 Bewertungen und Vorschläge (Umgesetzt)

Kund:innen vergeben 1 bis 5 Sterne plus Feedback (max. 500 Zeichen) und einen Vorschlag (max. 1000 Zeichen). Beides ist später bearbeitbar. Admins sehen Durchschnittsbewertung, alle Bewertungen und alle Vorschläge.

## 5.24 Cookie Hinweis (Umgesetzt)

Ein einzelner OK Button blendet den Hinweis aus und merkt sich die Wahl. Der Text erklärt, dass nur technisch notwendige Cookies verwendet werden.

## 5.25 Rechtsfenster (Umgesetzt)

Impressum, Datenschutz (DSGVO, Stripe, Löschung 30 Tage nach Deaktivierung) und AGB (Laufzeit 6 Monate, Hinweis 10 Tage vor Ablauf, Verlängerung um €10, 14 Tage Rücktrittsrecht, österreichisches Recht), auf Deutsch und Englisch.

---

# 6. Vollständige Nutzerabläufe

## 6.1 Gastgeber:in bestellt eine Hochzeitseinladung (ohne manuelle Blöcke)

1. Öffnet celebra.at, klickt **Jetzt Design auswählen**.
2. Tab Hochzeit, **Demo ansehen** bei Floral Romance, sieht den Briefumschlag, klickt **Dieses Design wählen**.
3. Schritt 1: wählt das Paket **Wedding Plus**, fügt **Diashow** hinzu. Die Leiste zeigt die Summe. **Weiter**.
4. Schritt 2: gibt "Anna & Max", Datum, Uhrzeit, Ort und Adresse ein; fügt Englisch als zweite Sprache hinzu (+€3); wählt ein Bild aus der Bibliothek; aktiviert RSVP mit Frist; tippt den Link `anna-und-max` (grün "verfügbar"); füllt Ablauf, Dresscode, Menü aus. **Weiter**.
5. Schritt 3: prüft die Vorschau auf Mobil und Desktop.
6. Schritt 4: gibt Name und E-Mail ein, löst einen Promo Code ein, hakt die AGB an, klickt **Jetzt bezahlen**.
7. Loggt sich bei Bedarf ein oder registriert sich.
8. Zahlt bei Stripe. Die Zahlungsbestätigung schaltet das Event automatisch **live**.
9. Erfolgsseite: kopiert den Link, lädt den QR Code herunter.

## 6.2 Bestellung mit manueller Arbeit

Wie 6.1, aber mit individueller Illustration. In Schritt 1 lädt die Gastgeber:in ein Referenzfoto hoch und beschreibt den Wunsch. Nach der Zahlung: Status **In Prüfung**, Warte Version der Erfolgsseite. Ein Admin öffnet den Tab Fulfillment, lädt die Illustration hoch, prüft die Vorschau, klickt **Live schalten**. Die Einladung ist jetzt öffentlich.

## 6.3 Gast antwortet

1. Öffnet den Link oder scannt den QR Code am Handy.
2. Tippt auf Umschlag / Geschenk / Badge.
3. Musik startet, sieht Countdown, Geschichte, Programm, Karte.
4. Füllt das Rückmeldeformular mit zwei Begleitpersonen und vegetarischer Wahl aus, sendet.
5. Stimmt bei den Spielen ab oder übernimmt ein Potluck Element; der Name ist schon ausgefüllt.

## 6.4 Gastgeber:in wertet aus

1. Sieht auf der Startseite eine Zahl beim **Dashboard**.
2. Öffnet das Dashboard, wählt das Event.
3. Tab Statistik: Seitenaufrufe, Zusagen, Absagen.
4. Tab Gäste: liest Rückmeldungen, **XLSX exportieren** für das Catering.
5. Tab Musik: exportiert Songs für den DJ.
6. Tab Ergebnisse: Quiz und Spielergebnisse.
7. Ändert die Uhrzeit über **Event bearbeiten**, speichert; die Einladung aktualisiert sich sofort.

## 6.5 Verlängerung

10 Tage vor Ablauf erhält die Gastgeber:in eine Erinnerungsmail und ein gelber Balken erscheint. **Jetzt verlängern** öffnet Stripe für €10. Nach der Zahlung verlängert sich die Laufzeit um 6 Monate; ein archiviertes Event geht automatisch wieder online.

## 6.6 Passwort zurücksetzen

Loginfenster → **Passwort vergessen** → E-Mail → Link → `/reset-password` → neues Passwort zweimal → Dashboard.

## 6.7 Admin legt einen Promo Code an

Dashboard → **Admin Tools** → **Neu** → Code "SUMMER20", Prozent 20, max. 50 Nutzungen, Ablaufdatum, aktiv → speichern. Kund:innen können ihn jetzt in Schritt 4 verwenden.

## 6.8 Urheberrechtsmeldung

Gast tippt im Musikbereich auf "melden" → Admin sieht die Meldung im Dashboard → wählt Deaktivieren, Löschen oder Verwerfen.

---

# 7. Referenz der Bedienelemente

| Element | Ort | Funktion |
|---|---|---|
| Jetzt Design auswählen | Hero der Startseite | Öffnet die Designseite |
| So funktioniert es | Obere Leiste, Hero | Öffnet das Fenster mit 6 Schritten |
| DE/EN | Obere Leiste | Wechselt die Websitesprache |
| Währungsauswahl | Obere Leiste | Ändert angezeigte und verrechnete Währung |
| Login | Obere Leiste | Öffnet das Loginfenster |
| Dashboard (mit Zahl) | Obere Leiste | Öffnet das Dashboard; Zahl zählt neue Rückmeldungen und Gästeaktivität seit dem letzten Besuch (jede Minute aktualisiert) |
| Designtabs | Designbereiche | Kategorie wechseln |
| Demo ansehen | Designkarte | Öffnet das Demofenster |
| Auswählen | Designkarte (Designseite) | Startet den Bestellablauf |
| Dieses Design wählen | Demofenster | Startet den Bestellablauf |
| Paketkarte | Bestellschritt 1 | Wählt Paket aus / ab |
| Blockkarte | Bestellschritt 1 | Wählt Block aus / ab |
| Referenzfoto Upload | Bestellschritt 1 (Illustration) | Speichert das Beispielbild der Kund:in |
| Weiter | Bestellschritte | Nächster Schritt (nur wenn gültig) |
| Schrittleiste | Bestellablauf | Zu früheren Schritten zurück |
| Sprachauswahl | Bestellschritt 2 | Bis zu 3 Sprachen; Deutsch ist nicht entfernbar |
| Kinder willkommen | Bestellschritt 2 (Hochzeit) | Ja / Nein / Nicht anzeigen |
| Aus Bibliothek wählen | Bestellschritt 2 | Öffnet die Bildergalerie |
| RSVP Schalter | Bestellschritt 2, Bearbeiten | Zeigt/verbirgt das Rückmeldeformular |
| Intro ausschalten | Bestellschritt 2 | Entfernt die Eröffnungsanimation |
| Farbwähler / Schriftwahl | Bestellschritt 2, Bearbeiten | Gestaltet die Einladung |
| Eventlink Feld | Bestellschritt 2 | Legt die Adresse fest, laufende Verfügbarkeitsprüfung |
| Desktop / Mobil | Bestellschritt 3 | Ändert die Vorschaugröße |
| Promo anwenden / entfernen | Bestellschritt 4 | Rabatt anwenden oder entfernen |
| AGB Checkbox | Bestellschritt 4 | Pflicht vor der Zahlung |
| Jetzt bezahlen | Bestellschritt 4 | Legt das Event an und öffnet Stripe |
| Link kopieren | Erfolgsseite, Dashboard | Kopiert die Adresse |
| QR herunterladen | Erfolgsseite, Dashboard | Speichert den QR Code als PNG |
| Event öffnen | Erfolgsseite, Dashboard | Öffnet die Einladung |
| Umschlag / Geschenk / Badge | Einladung | Startet das Intro, zeigt die Seite |
| Musikbutton | Einladung | Abspielen / Pause |
| Urheberrecht melden | Musikbereich der Einladung | Sendet Meldung, stoppt Musik |
| Zum Kalender hinzufügen | Alle Premium Einladungen | Google oder .ics Datei |
| RSVP Senden | Einladung | Speichert die Rückmeldung |
| Abstimmen / Übernehmen / Antworten / Song senden | Einladungsblöcke | Speichert die Gästeaktion |
| Diashow Bild | Einladung | Öffnet die Vollbildansicht |
| Event bearbeiten | Dashboard Statistik | Öffnet das Bearbeitungsfenster |
| Archivieren / Live schalten | Dashboard Statistik | Event offline / online |
| Jetzt verlängern | Ablaufbalken im Dashboard | Öffnet die Verlängerung für €10 |
| XLSX exportieren | Tab Gäste / Musik | Lädt die Excel Datei |
| Event löschen | Tab Zahlung | Löscht nach Bestätigung endgültig |
| Sterne / Bewertung senden | Unten im Dashboard | Speichert die Bewertung |
| Vorschlag senden | Unten im Dashboard | Speichert den Vorschlag |
| Jetzt veröffentlichen / Live schalten | Admin Fulfillment | Macht das Event öffentlich |
| Illustration / Datei hochladen | Admin Fulfillment | Fügt Dateien hinzu |
| Musik deaktivieren / löschen, Verwerfen | Admin Urheberrechtsbereich | Erledigt die Meldung |
| Neu / Bearbeiten / Löschen (Promo) | Admin Tools | Verwaltet Codes |
| OK | Cookie Hinweis | Blendet den Hinweis aus |

---

# 8. Einstellungen

Jede Einstellung wählt die Gastgeber:in in Bestellschritt 2; die meisten sind später unter **Event bearbeiten** änderbar.

| Einstellung | Standard | Optionen | Wirkung |
|---|---|---|---|
| Eventtitel | leer (Pflicht) | Freitext | Überschrift, Intro Initialen, Fußzeile |
| Datum | leer (Pflicht) | Datum | Countdown, Datumsanzeige, Kalender |
| Uhrzeit | leer (Pflicht) | Uhrzeit | Countdown, Anzeige ("Uhr" außer auf Englisch) |
| Ortsname | leer | Text | Detailkarte |
| Adresse | leer | Straße, PLZ, Ort | Detailkarte, Karte |
| Beschreibung | leer | Text | Untertitel im Hero |
| Ort und Adresse von Trauung / Feier | leer | Text (Hochzeit) | Eigene Karten auf der Hochzeitsseite |
| Kinder willkommen | Nicht anzeigen | Ja / Nein / Nicht anzeigen | Abzeichen auf der Hochzeitsseite |
| Sprachen | Nur Deutsch | Bis zu 3 von 11, je +€3 | Zusätzliche Adressen und QR Codes |
| Titelbild | Bild des Designs | Upload oder Bibliothek | Hintergrund oben |
| RSVP aktiv | Aus | Ein / Aus | Zeigt das Rückmeldeformular |
| Rückmeldefrist | leer | Datum | Nur als Text angezeigt |
| Maximale Gäste | leer | Zahl | Gespeichert; auf der Einladung nicht durchgesetzt (weitere Nutzung nicht überprüfbar) |
| Maximale Begleitpersonen | 5 | 0 bis 20 | Begrenzt Begleitpersonen pro Rückmeldung |
| Menüwahl im RSVP | Aus | Ein / Aus (altes Formular +€10; aktueller Ablauf an Menüoption gekoppelt) | Fügt die Auswahl der Ernährungsform hinzu |
| Intro ausschalten | Aus | Ein / Aus | Überspringt die Eröffnungsanimation |
| Hauptfarbe | Farbe des Designs | Beliebige Farbe | Akzentfarbe |
| Schrift | Schrift des Designs | Playfair Display, DM Sans, Georgia | Typografie der Seite |
| Eventlink | leer (Pflicht) | a bis z, 0 bis 9, Bindestrich, mind. 3 | Webadresse |
| Websitesprache | Englisch beim ersten Besuch | DE / EN | Alle Texte von Marketing und Dashboard |
| Währung | EUR | 15 Währungen | Preisanzeige und Verrechnung |

---

# 9. Automatisierung und Hintergrundprozesse

Das Produkt enthält **keine KI Funktionen**.

| Prozess | Auslöser | Was passiert | Status |
|---|---|---|---|
| Preisberechnung am Server | Jetzt bezahlen | Der Server berechnet den Preis aus gebuchten Blöcken, Sprachen und Promo Code neu; dem Preis im Browser wird nie vertraut | Umgesetzt |
| Stripe Checkout | Jetzt bezahlen | Erstellt eine Zahlungsseite in der gewählten Währung | Umgesetzt |
| Zahlungsbestätigung | Stripe meldet Erfolg | Event wird **live** oder **In Prüfung** bei manuellen Blöcken; Zahlungs ID und Protokolleintrag gespeichert | Umgesetzt |
| Willkommensmail | Registrierung | Versand über die E-Mail Warteschlange | Umgesetzt |
| Kontomails | Registrierung, Zurücksetzen, E-Mail Änderung | Gebrandete Mails von notify.celebra.at | Umgesetzt |
| E-Mail Warteschlange | Alle 5 Sekunden | Versendet Mails, bis zu 5 Wiederholungen, beachtet Versandlimits und Abmeldungen | Umgesetzt |
| Erinnerung zur Verlängerung | Tägliche Prüfung, 10 Tage vor Ablauf | Mail "Dein Event läuft bald ab, verlängere für €10" | Umgesetzt |
| Zahlung der Verlängerung | Jetzt verlängern | Stripe Zahlung über €10 verlängert um 6 Monate; ein archiviertes Event geht wieder online | Umgesetzt |
| Ablaufbalken | Öffnen des Dashboards | Berechnet aus dem gespeicherten Ablaufdatum | Umgesetzt |
| Automatische Deaktivierung nach 180 Tagen | Tägliche Prüfung um 9:00 Uhr Wiener Zeit | Abgelaufene Live Events werden offline genommen | Umgesetzt |
| Benachrichtigungszahl | Alle 60 Sekunden | Zählt neue Rückmeldungen und Gästeaktionen | Umgesetzt |
| Aktualisierung Urheberrechtsbereich | Alle 30 Sekunden | Lädt neue Meldungen | Umgesetzt |

---

# 10. Fehler und Sonderfälle

| Situation | Was man sieht |
|---|---|
| Link enthält ungültige Zeichen | Rote Meldung "ungültig", Weiter gesperrt |
| Link reserviert | Meldung "reserviert" |
| Link vergeben | Meldung "bereits vergeben" |
| Pflichtfelder fehlen | Weiter / Bezahlen gesperrt |
| Ungültige E-Mail in Schritt 4 | Bezahlen gesperrt |
| Beim Bezahlen nicht eingeloggt | Loginfenster öffnet sich |
| Ungültiger Promo Code | Roter Hinweis |
| Zahlungsseite konnte nicht erstellt werden | Hinweis "Zahlungsfehler" |
| Event konnte nicht angelegt werden | Hinweis mit Fehler |
| Zahlung bei Stripe abgebrochen | Zurück zur Bestellseite; Event bleibt als unbezahlter Entwurf im Dashboard |
| Einladungslink unbekannt oder nicht live | "Event nicht gefunden" + Button Startseite |
| Langsame Verbindung auf der Einladung | Leere Seite, bis das Bild geladen ist |
| Schon abgestimmt / Element schon vergeben | Hinweis, zweiter Versuch abgelehnt |
| MP3 über 10 MB oder falsches Format | Upload abgelehnt |
| Rechte für Musik nicht bestätigt | Upload nicht möglich |
| Link zum Zurücksetzen abgelaufen | Ansicht "ungültiger Link" |
| Passwörter stimmen nicht überein / zu kurz | Hinweis |
| Abmeldelink ungültig | "ungültiger oder abgelaufener Link" |
| Falsche Adresse | 404 Seite |
| Eventdatum vorbei | Countdown zeigt Nullen |
| Rückmeldefrist vorbei | Formular funktioniert weiter |
| Promo Prozent über 100 (Admin) | Hinweis "Wert muss zwischen 0 und 100 liegen" |
| Archiviertes Event reaktivieren, aber unbezahlt oder abgelaufen | Hinweis, Event bleibt offline |

---

# 11. Rollen und Berechtigungen

| Aktion | Gast | Gastgeber:in | Admin |
|---|---|---|---|
| Live Einladung ansehen | Ja | Ja | Ja |
| Antworten, abstimmen, übernehmen, Quiz, Songwunsch | Ja | Ja | Ja |
| Einladung bestellen | Login nötig | Ja | Ja (ohne Zahlung) |
| Eigene Events und Gäste sehen | Nein | Nur eigene | Alle Events |
| Event bearbeiten / archivieren / löschen | Nein | Eigene | Alle |
| Event live schalten | Nein | Nur nach Zahlung, oder Reaktivierung eines bezahlten, nicht abgelaufenen Events | Ja |
| Fulfillment, Promo Codes, Urheberrecht, Bewertungsübersicht | Nein | Nein | Ja |

Bestellt ein Admin, entfällt die Zahlung: das Event geht sofort live (oder in Prüfung).

Datenschutz: Kontakt E-Mail und Daten der Gastgeber:in werden Gästen nie angezeigt; Gäste lesen nur eine gefilterte öffentliche Ansicht von Live Events.

---

# 12. Daten, Preise und Referenztabellen

## 12.1 Basispreis

Einladungsseite: **€19** einmalig. Zusätzliche Sprache: je **€3**. Verlängerung: **€10** für 6 Monate.

## 12.2 Hochzeitsblöcke

| Block | Preis |
|---|---|
| Ablauf, Geschichte, Wunschliste, Dresscode, Hintergrundmusik, Videobotschaft | je €9 |
| Hotels, Diashow, Menü, Shuttle | je €19 |
| Music Pro (manuell) | €19 |
| Individuelle Illustration (manuell) | €29 |

Pakete: **Starter €39** (Ablauf, Dresscode, Hotels, Shuttle, Musik), **Plus €49** (+ Menü, Videobotschaft), **Premium €79** (+ Diashow, Geschichte, Wunschliste; 10 Blöcke).

## 12.3 Businessblöcke

Ablauf, Dresscode, Hintergrundmusik, Promovideo, Hotels, Menü, Agenda je €9; Produkte, Sponsoren je €19.
Pakete: **Business Starter €29** (Ablauf, Dresscode, Hotels, Agenda, Musik), **Business Pro €49** (+ Produkte, Sponsoren, Video, Menü).

## 12.4 Geburtstags / Partyblöcke

Ablauf, Musikwunsch, Wunschliste, Dresscode, Hintergrundmusik, Videobotschaft je €5; Quiz, Menü, Spiele, Potluck, Hotels je €9.
Pakete: **Party Fun €25** (Ablauf, Musikwunsch, Spiele, Quiz, Musik), **Party Planer €25** (Ablauf, Menü, Potluck, Dresscode, Musik), **Party All in €45** (10 Blöcke).

## 12.5 Eventstatus

| Status | Bedeutung | Gesetzt durch |
|---|---|---|
| Entwurf (angezeigt als "Unbezahlt") | Angelegt, nicht bezahlt | Bestellablauf |
| In Prüfung | Bezahlt, manuelle Arbeit offen | Zahlungsbestätigung |
| Live | Öffentlich | Zahlungsbestätigung, Admin oder Reaktivierung |
| Archiviert | Offline | Gastgeber:in, Admin oder automatische Deaktivierung |
| Bezahlt | Alter Status | Selten verwendet |

---

# 13. Bekannte Lücken und Unstimmigkeiten

1. **Rückmeldefrist wird nicht durchgesetzt:** das Formular bleibt nach der Frist offen.
2. **Alte Konfigurationsseite** mit anderen Preisen ist über die direkte Adresse noch erreichbar.
3. **Maximale Gäste** wird gespeichert, aber auf der Einladung nicht durchgesetzt.

Seit der ersten Version dieses Dokuments behoben: Verlängerungen fügen jetzt 6 Monate hinzu, die Erinnerungsmail geht automatisch 10 Tage vor Ablauf hinaus, abgelaufene Einladungen werden jeden Morgen automatisch offline genommen, Gastgeber:innen können ein archiviertes bezahltes Event wieder online stellen, QR Scans werden gezählt, jedes Design hat Kalenderbuttons, das Rückmeldeformular nutzt die Farbe der Gastgeber:in, die 404 Seite und die Abmeldeseite folgen der Websitesprache, und der Cookie Hinweis hat nur noch einen OK Button, da nur notwendige Cookies verwendet werden.

---

# 14. Leitfaden für Videoproduktion

**30 Sekunden Spot:** Briefumschlag öffnet sich am Handy → durch Countdown und Programm scrollen → Gast tippt "Ich komme" → Schnitt aufs Dashboard, der Zähler der Zusagen steigt → Abschluss "ab €19, celebra.at".

**2 Minuten Rundgang:** Hero der Startseite → Designtabs → Demo → Auswählen → Paket wählen → Daten eingeben, Linkprüfung wird grün → mobile Vorschau → Promo Code → Stripe → Erfolgsseite mit QR → Scan mit dem Handy → Excel Export im Dashboard.

**Spots je Kategorie:** Hochzeit (Briefumschlag, Music Pro, Kalender), Party (Geschenkbox, Quiz, Spieleabstimmung, Potluck), Business (Badge Scan, Agenda, Sponsoren, Produkte).

**Tipps:** Das Demofenster zeigt garantiert alle Inhalte. Ein Eventdatum in der Zukunft verwenden, damit der Countdown läuft. Das Vorzeigeevent `sophie-und-alexander` als Live Beispiel nutzen. Im Handyformat aufnehmen; das Produkt ist zuerst für Mobilgeräte gestaltet.

**Pitch in einem Satz:** "celebra.at macht aus deiner Einladung eine wunderschöne persönliche Website mit Rückmeldungen, Musik und QR Code, fertig in wenigen Minuten und schon ab €19."

---

# 15. Glossar

| Begriff | Bedeutung |
|---|---|
| Block | Optionaler Inhaltsabschnitt einer Einladung |
| Paket | Vergünstigtes Bündel von Blöcken |
| Intro | Eröffnungsanimation (Briefumschlag, Geschenkbox, Badge) |
| RSVP | Rückmeldung auf die Einladung |
| Begleitperson | Zusätzliche Person, die ein Gast mitbringt |
| Eventlink | Die Adresse nach celebra.at/ |
| Fulfillment | Arbeit des Admins für manuelle Blöcke |
| Live | Öffentlich sichtbare Einladung |
| Promo Code | Rabattcode beim Bezahlen |

---

# 16. Vollständigkeitscheckliste

- [x] Jede Seite dokumentiert (13 Adressen + 404)
- [x] Navigation von Startseite, Bestellung, Dashboard, Admin, Fußzeile
- [x] Alle 9 Designs und 3 Intro Animationen
- [x] Alle 32 Blöcke und 8 Pakete mit Preisen
- [x] Bestellablauf: jeder Schritt, jedes Feld, jede Prüfung und jeder Zustand
- [x] Gasteinladung: jeder Abschnitt und jeder interaktive Block
- [x] Dashboard: jeder Tab, Button, Export und jedes Admin Extra
- [x] Admin Tools, Fulfillment, Urheberrecht, Bewertungen
- [x] Anmeldung, Passwort zurücksetzen, Abmeldung von E-Mails
- [x] E-Mails, Zahlungsabwicklung, Hintergrundprozesse
- [x] Einstellungstabelle
- [x] Fehler und Sonderfälle
- [x] Berechtigungen
- [x] Bekannte Lücken klar markiert
- [x] Keine KI Funktionen vorhanden (bestätigt)
