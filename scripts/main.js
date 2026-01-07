// DSA5 Makro-Helfer Modul - Version mit direkter Controls Integration
console.log('DSA5 Makro-Helfer | Modul wird geladen...');

Hooks.once('ready', () => {
  console.log('DSA5 Makro-Helfer | Modul geladen');
  console.log('DSA5 Makro-Helfer | Foundry Version:', game.version);
});

Hooks.on('getSceneControlButtons', (controls) => {
  console.log('DSA5 Makro-Helfer | getSceneControlButtons aufgerufen');
  
  const dsa5Tools = {
    name: "dsa5helper",
    title: "DSA5 Makro-Helfer",
    icon: "fas fa-dice-d20",
    visible: true,
    order: 100,
    activeTool: "select",
    onChange: (control) => {
      console.log('DSA5 Makro-Helfer | Control aktiviert');
    },
    tools: {
      select: {
        name: "select",
        title: "DSA5 Makro-Helfer",
        icon: "fas fa-dice-d20",
        button: false,
        onChange: () => {
          console.log('DSA5 Makro-Helfer | Select Tool aktiviert');
        }
      },
      skript1: {
        name: "skript1",
        title: "Feste Fertigkeitsprobe erstellen",
        icon: "fas fa-dice",
        onClick: () => {
          console.log('DSA5 Makro-Helfer | Skript 1 geklickt');
          zeigeSkript1Dialog();
        },
        button: true,
        onChange: () => {}
      },
      skript2: {
        name: "skript2",
        title: "Fertigkeitsprobe mit Dialog erstellen",
        icon: "fas fa-comment-dots",
        onClick: () => {
          console.log('DSA5 Makro-Helfer | Skript 2 geklickt');
          zeigeSkript2Dialog();
        },
        button: true,
        onChange: () => {}
      },
      skript3: {
        name: "skript3",
        title: "Mehrfach-Fertigkeitsproben erstellen",
        icon: "fas fa-layer-group",
        onClick: () => {
          console.log('DSA5 Makro-Helfer | Skript 3 geklickt');
          erstelleSkript3Makro();
        },
        button: true,
        onChange: () => {}
      }
    }
  };
  
  controls["dsa5helper"] = dsa5Tools;
  
  console.log('DSA5 Makro-Helfer | Control hinzugefügt');
});

// Dialog für Skript 1
function zeigeSkript1Dialog() {
  console.log('DSA5 Makro-Helfer | Skript 1 Dialog wird geöffnet');
  new Dialog({
    title: 'Feste Fertigkeitsprobe erstellen',
    content: `
      <form>
        <div class="form-group">
          <label>Makro-Name:</label>
          <input type="text" name="makroName" value="Fertigkeitsprobe" placeholder="z.B. Klettern Probe"/>
        </div>
        <div class="form-group">
          <label>Eigenschaft 1:</label>
          <input type="number" name="eigen1" value="13" min="1" max="20"/>
        </div>
        <div class="form-group">
          <label>Eigenschaft 2:</label>
          <input type="number" name="eigen2" value="14" min="1" max="20"/>
        </div>
        <div class="form-group">
          <label>Eigenschaft 3:</label>
          <input type="number" name="eigen3" value="15" min="1" max="20"/>
        </div>
        <div class="form-group">
          <label>Fertigkeitswert (FP):</label>
          <input type="number" name="fp" value="10" min="0" max="20"/>
        </div>
        <div class="form-group">
          <label>Erleichterung:</label>
          <input type="number" name="erleichterung" value="0" min="0" max="10"/>
        </div>
        <div class="form-group">
          <label>Erschwernis:</label>
          <input type="number" name="erschwernis" value="0" min="0" max="10"/>
        </div>
      </form>
    `,
    buttons: {
      create: {
        icon: '<i class="fas fa-check"></i>',
        label: 'Makro erstellen',
        callback: (html) => {
          const makroName = html.find('[name="makroName"]').val();
          const eigen1 = parseInt(html.find('[name="eigen1"]').val());
          const eigen2 = parseInt(html.find('[name="eigen2"]').val());
          const eigen3 = parseInt(html.find('[name="eigen3"]').val());
          const fp = parseInt(html.find('[name="fp"]').val());
          const erleichterung = parseInt(html.find('[name="erleichterung"]').val());
          const erschwernis = parseInt(html.find('[name="erschwernis"]').val());
          
          erstelleSkript1Makro(makroName, eigen1, eigen2, eigen3, fp, erleichterung, erschwernis);
        }
      },
      cancel: {
        icon: '<i class="fas fa-times"></i>',
        label: 'Abbrechen'
      }
    },
    default: 'create'
  }).render(true);
}

// Dialog für Skript 2
function zeigeSkript2Dialog() {
  console.log('DSA5 Makro-Helfer | Skript 2 Dialog wird geöffnet');
  new Dialog({
    title: 'Fertigkeitsprobe mit Dialog erstellen',
    content: `
      <form>
        <div class="form-group">
          <label>Makro-Name:</label>
          <input type="text" name="makroName" value="Klettern" placeholder="z.B. Klettern"/>
        </div>
        <div class="form-group">
          <label>Fertigkeitsname (im Code):</label>
          <input type="text" name="fertigkeitsname" value="Klettern" placeholder="z.B. Klettern"/>
        </div>
        <div class="form-group">
          <label>Eigenschaft 1:</label>
          <input type="number" name="eigen1" value="13" min="1" max="20"/>
        </div>
        <div class="form-group">
          <label>Eigenschaft 2:</label>
          <input type="number" name="eigen2" value="14" min="1" max="20"/>
        </div>
        <div class="form-group">
          <label>Eigenschaft 3:</label>
          <input type="number" name="eigen3" value="15" min="1" max="20"/>
        </div>
        <div class="form-group">
          <label>Fertigkeitswert (FP):</label>
          <input type="number" name="fp" value="10" min="0" max="20"/>
        </div>
      </form>
    `,
    buttons: {
      create: {
        icon: '<i class="fas fa-check"></i>',
        label: 'Makro erstellen',
        callback: (html) => {
          const makroName = html.find('[name="makroName"]').val();
          const fertigkeitsname = html.find('[name="fertigkeitsname"]').val();
          const eigen1 = parseInt(html.find('[name="eigen1"]').val());
          const eigen2 = parseInt(html.find('[name="eigen2"]').val());
          const eigen3 = parseInt(html.find('[name="eigen3"]').val());
          const fp = parseInt(html.find('[name="fp"]').val());
          
          erstelleSkript2Makro(makroName, fertigkeitsname, eigen1, eigen2, eigen3, fp);
        }
      },
      cancel: {
        icon: '<i class="fas fa-times"></i>',
        label: 'Abbrechen'
      }
    },
    default: 'create'
  }).render(true);
}

// Erstelle Skript 1 Makro
async function erstelleSkript1Makro(name, e1, e2, e3, fp, erleichterung, erschwernis) {
  const command = `// DSA5 Fertigkeitsprobe mit festen Werten
// Eigenschaften: ${e1}/${e2}/${e3}, Erleichterung: ${erleichterung}, Erschwernis: ${erschwernis}

const eigenschaften = [${e1}, ${e2}, ${e3}];
const erleichterung = ${erleichterung};
const erschwernis = ${erschwernis};
const fertigkeitswert = ${fp};

const modifikation = erleichterung - erschwernis;

async function fuehreProbeAus() {
  const wuerfe = [
    await new Roll("1d20").evaluate(),
    await new Roll("1d20").evaluate(),
    await new Roll("1d20").evaluate()
  ];

  const wurfergebnisse = wuerfe.map(r => r.total);
  const anzahl20 = wurfergebnisse.filter(w => w === 20).length;
  const anzahl1 = wurfergebnisse.filter(w => w === 1).length;

  let istPatzer = anzahl20 >= 2;
  let istKritisch = anzahl1 >= 2;
  let fertigkeitspunkteUebrig = fertigkeitswert;
  let probeGelungen = true;
  let einzelergebnisse = [];

  for (let i = 0; i < 3; i++) {
    const eigenschaft = eigenschaften[i];
    const wurf = wurfergebnisse[i];
    const modifizierterWurf = wurf - modifikation;
    const anzeigeModifikator = -modifikation;
    const modifikatorText = anzeigeModifikator !== 0 ? \` \${anzeigeModifikator > 0 ? '+' : ''}\${anzeigeModifikator}\` : '';
    
    if (modifizierterWurf > eigenschaft) {
      const differenz = modifizierterWurf - eigenschaft;
      fertigkeitspunkteUebrig -= differenz;
      einzelergebnisse.push(\`<span style="color: \${fertigkeitspunkteUebrig < 0 ? 'red' : 'orange'};\">\${wurf}\${modifikatorText} (\${eigenschaft}, \${differenz})</span>\`);
    } else {
      einzelergebnisse.push(\`<span style="color: green;">\${wurf}\${modifikatorText} (\${eigenschaft})</span>\`);
    }
  }

  let qualitaetsstufe = 0;
  if (fertigkeitspunkteUebrig < 0) {
    probeGelungen = false;
  } else {
    qualitaetsstufe = Math.floor(fertigkeitspunkteUebrig / 3) + 1;
    if (qualitaetsstufe > 6) qualitaetsstufe = 6;
  }

  if (istPatzer) {
    probeGelungen = false;
    qualitaetsstufe = 0;
  }
  if (istKritisch) {
    probeGelungen = true;
    qualitaetsstufe = Math.max(qualitaetsstufe, 1);
  }

  const anzeigeModifikator = -modifikation;
  let chatContent = \`
    <div class="dsa5-roll">
      <h3>Fertigkeitsprobe</h3>
      <p><strong>Eigenschaften:</strong> \${eigenschaften.join(" / ")}</p>
      <p><strong>Fertigkeitswert:</strong> \${fertigkeitswert}</p>
      <p><strong>Modifikation:</strong> \${anzeigeModifikator > 0 ? '+' : ''}\${anzeigeModifikator} (Erleichterung: \${erleichterung}, Erschwernis: \${erschwernis})</p>
      <hr>
      <p><strong>Würfelergebnisse:</strong></p>
      <ul>
        \${einzelergebnisse.map((e, i) => \`<li>Wurf \${i+1}: \${e}</li>\`).join('')}
      </ul>
      <hr>
      \${istPatzer ? '<p style="color: red; font-weight: bold;">⚠️ PATZER! (Zwei 20er)</p>' : ''}
      \${istKritisch ? '<p style="color: green; font-weight: bold;">✨ KRITISCHER ERFOLG! (Zwei 1er)</p>' : ''}
      <p><strong>Ergebnis:</strong> \${probeGelungen ? \`<span style="color: green;">Erfolg</span>\` : \`<span style="color: red;">Fehlschlag</span>\`}</p>
      \${probeGelungen ? \`<p><strong>Qualitätsstufe:</strong> \${qualitaetsstufe}</p>\` : ''}
      <p><strong>Übrige FP:</strong> \${fertigkeitspunkteUebrig}</p>
    </div>
  \`;

  ChatMessage.create({
    user: game.user.id,
    speaker: ChatMessage.getSpeaker(),
    content: chatContent
  });
}

fuehreProbeAus();`;

  await Macro.create({
    name: name,
    type: 'script',
    command: command,
    img: 'icons/svg/d20-grey.svg'
  });

  ui.notifications.info(`Makro "${name}" wurde erstellt!`);
}

// Erstelle Skript 2 Makro
async function erstelleSkript2Makro(makroName, fertigkeitsname, e1, e2, e3, fp) {
  const command = `// DSA5 Fertigkeitsprobe mit Dialog für Modifikatoren
// Eigenschaften: ${e1}/${e2}/${e3}, Fertigkeitswert: ${fp}

const eigenschaften = [${e1}, ${e2}, ${e3}];
const fertigkeitswert = ${fp};
const fertigkeitsname = "${fertigkeitsname}";

new Dialog({
  title: \`\${fertigkeitsname} - Modifikatoren eingeben\`,
  content: \`
    <form>
      <div class="form-group">
        <label>Erleichterung:</label>
        <input type="number" name="erleichterung" value="0" min="0" step="1"/>
      </div>
      <div class="form-group">
        <label>Erschwernis:</label>
        <input type="number" name="erschwernis" value="0" min="0" step="1"/>
      </div>
    </form>
  \`,
  buttons: {
    roll: {
      icon: '<i class="fas fa-dice"></i>',
      label: "Würfeln",
      callback: async (html) => {
        const erleichterung = parseInt(html.find('[name="erleichterung"]').val()) || 0;
        const erschwernis = parseInt(html.find('[name="erschwernis"]').val()) || 0;
        
        await ausfuehrenFertigkeitsprobe(eigenschaften, fertigkeitswert, fertigkeitsname, erleichterung, erschwernis);
      }
    },
    cancel: {
      icon: '<i class="fas fa-times"></i>',
      label: "Abbrechen"
    }
  },
  default: "roll"
}).render(true);

async function ausfuehrenFertigkeitsprobe(eigenschaften, fertigkeitswert, name, erleichterung, erschwernis) {
  const modifikation = erleichterung - erschwernis;

  const wuerfe = [
    await new Roll("1d20").evaluate(),
    await new Roll("1d20").evaluate(),
    await new Roll("1d20").evaluate()
  ];

  const wurfergebnisse = wuerfe.map(r => r.total);
  const anzahl20 = wurfergebnisse.filter(w => w === 20).length;
  const anzahl1 = wurfergebnisse.filter(w => w === 1).length;

  let istPatzer = anzahl20 >= 2;
  let istKritisch = anzahl1 >= 2;
  let fertigkeitspunkteUebrig = fertigkeitswert;
  let probeGelungen = true;
  let einzelergebnisse = [];

  for (let i = 0; i < 3; i++) {
    const eigenschaft = eigenschaften[i];
    const wurf = wurfergebnisse[i];
    const modifizierterWurf = wurf - modifikation;
    const anzeigeModifikator = -modifikation;
    const modifikatorText = anzeigeModifikator !== 0 ? \` \${anzeigeModifikator > 0 ? '+' : ''}\${anzeigeModifikator}\` : '';
    
    if (modifizierterWurf > eigenschaft) {
      const differenz = modifizierterWurf - eigenschaft;
      fertigkeitspunkteUebrig -= differenz;
      einzelergebnisse.push(\`<span style="color: \${fertigkeitspunkteUebrig < 0 ? 'red' : 'orange'};\">\${wurf}\${modifikatorText} (\${eigenschaft}, \${differenz})</span>\`);
    } else {
      einzelergebnisse.push(\`<span style="color: green;">\${wurf}\${modifikatorText} (\${eigenschaft})</span>\`);
    }
  }

  let qualitaetsstufe = 0;
  if (fertigkeitspunkteUebrig < 0) {
    probeGelungen = false;
  } else {
    qualitaetsstufe = Math.floor(fertigkeitspunkteUebrig / 3) + 1;
    if (qualitaetsstufe > 6) qualitaetsstufe = 6;
  }

  if (istPatzer) {
    probeGelungen = false;
    qualitaetsstufe = 0;
  }
  if (istKritisch) {
    probeGelungen = true;
    qualitaetsstufe = Math.max(qualitaetsstufe, 1);
  }

  const anzeigeModifikator = -modifikation;
  let chatContent = \`
    <div class="dsa5-roll">
      <h3>Fertigkeitsprobe: \${name}</h3>
      <p><strong>Eigenschaften:</strong> \${eigenschaften.join(" / ")}</p>
      <p><strong>Fertigkeitswert:</strong> \${fertigkeitswert}</p>
      <p><strong>Modifikation:</strong> \${anzeigeModifikator > 0 ? '+' : ''}\${anzeigeModifikator} (Erleichterung: \${erleichterung}, Erschwernis: \${erschwernis})</p>
      <hr>
      <p><strong>Würfelergebnisse:</strong></p>
      <ul>
        \${einzelergebnisse.map((e, i) => \`<li>Wurf \${i+1}: \${e}</li>\`).join('')}
      </ul>
      <hr>
      \${istPatzer ? '<p style="color: red; font-weight: bold;">⚠️ PATZER! (Zwei 20er)</p>' : ''}
      \${istKritisch ? '<p style="color: green; font-weight: bold;">✨ KRITISCHER ERFOLG! (Zwei 1er)</p>' : ''}
      <p><strong>Ergebnis:</strong> \${probeGelungen ? \`<span style="color: green;">Erfolg</span>\` : \`<span style="color: red;">Fehlschlag</span>\`}</p>
      \${probeGelungen ? \`<p><strong>Qualitätsstufe:</strong> \${qualitaetsstufe}</p>\` : ''}
      <p><strong>Übrige FP:</strong> \${fertigkeitspunkteUebrig}</p>
    </div>
  \`;

  ChatMessage.create({
    user: game.user.id,
    speaker: ChatMessage.getSpeaker(),
    content: chatContent
  });
}`;

  await Macro.create({
    name: makroName,
    type: 'script',
    command: command,
    img: 'icons/svg/d20-grey.svg'
  });

  ui.notifications.info(`Makro "${makroName}" wurde erstellt!`);
}

// Erstelle Skript 3 Makro
async function erstelleSkript3Makro() {
  console.log('DSA5 Makro-Helfer | Skript 3 wird geöffnet');
  
  // Schritt 1: Finde alle verfügbaren Skript-2 Makros
  const alleMakros = game.macros.contents;
  const fertigkeitsMakros = [];

  for (let makro of alleMakros) {
    try {
      const cmd = makro.command;
      if (cmd.includes('const eigenschaften =') && cmd.includes('const fertigkeitswert =') && cmd.includes('const fertigkeitsname =')) {
        const eigenschaftenMatch = cmd.match(/const eigenschaften = \[(\d+), (\d+), (\d+)\]/);
        const fertigkeitswertMatch = cmd.match(/const fertigkeitswert = (\d+)/);
        const fertigkeitsnameMatch = cmd.match(/const fertigkeitsname = ["'](.+?)["']/);
        
        if (eigenschaftenMatch && fertigkeitswertMatch && fertigkeitsnameMatch) {
          fertigkeitsMakros.push({
            id: makro.id,
            makroName: makro.name,
            name: fertigkeitsnameMatch[1],
            eigenschaften: [parseInt(eigenschaftenMatch[1]), parseInt(eigenschaftenMatch[2]), parseInt(eigenschaftenMatch[3])],
            fertigkeitswert: parseInt(fertigkeitswertMatch[1])
          });
        }
      }
    } catch (e) { continue; }
  }

  if (fertigkeitsMakros.length === 0) {
    ui.notifications.warn("Keine Fertigkeits-Makros gefunden! Erstelle zuerst Makros mit Skript 2.");
    return;
  }

  // Sortiere alphabetisch nach Makro-Name
  fertigkeitsMakros.sort((a, b) => a.makroName.localeCompare(b.makroName));

  // Schritt 2: Dialog zur Auswahl der Fertigkeiten UND Makro-Name
  let checkboxes = '';
  for (let i = 0; i < fertigkeitsMakros.length; i++) {
    const f = fertigkeitsMakros[i];
    checkboxes += '<div style="display: flex; align-items: center; margin-bottom: 5px;">';
    checkboxes += '<input type="checkbox" name="fertigkeit' + i + '" id="fertigkeit' + i + '" style="margin: 0 8px 0 0;"/>';
    checkboxes += '<label for="fertigkeit' + i + '" style="margin: 0; cursor: pointer;">' + f.makroName + ' (' + f.eigenschaften.join('/') + ')</label>';
    checkboxes += '</div>';
  }

  new Dialog({
    title: "Mehrfach-Probe erstellen",
    content: `
      <form>
        <div class="form-group" style="margin-bottom: 15px;">
          <label style="font-weight: bold;">Name des neuen Makros:</label>
          <input type="text" name="makroName" value="Gruppenprobe" style="width: 100%; padding: 5px;" placeholder="z.B. Sinnesschärfe Gruppe"/>
        </div>
        <hr>
        <p style="font-weight: bold;">Wähle die Fertigkeiten aus:</p>
        ${checkboxes}
      </form>
    `,
    buttons: {
      create: {
        icon: '<i class="fas fa-check"></i>',
        label: "Makro erstellen",
        callback: (html) => {
          const makroName = html.find('[name="makroName"]').val() || "Gruppenprobe";
          let selected = [];
          fertigkeitsMakros.forEach((f, i) => {
            if (html.find('#fertigkeit' + i).is(':checked')) {
              selected.push(f);
            }
          });
          
          if (selected.length === 0) {
            ui.notifications.warn("Bitte mindestens eine Fertigkeit auswählen!");
            return;
          }
          
          erstelleGruppenMakro(makroName, selected);
        }
      },
      cancel: {
        icon: '<i class="fas fa-times"></i>',
        label: "Abbrechen"
      }
    },
    default: "create"
  }).render(true);
}

async function erstelleGruppenMakro(makroName, selectedFertigkeiten) {
  console.log('DSA5 Makro-Helfer | Erstelle Gruppenmakro:', makroName);
  
  // Erstelle JSON-String mit den ausgewählten Fertigkeiten
  const fertigkeitenData = JSON.stringify(selectedFertigkeiten);
  
  // Generiere den Makro-Code mit fest einprogrammierten Fertigkeiten
  const command = `const fertigkeiten = ${fertigkeitenData};

new Dialog({
  title: "Modifikatoren für ${makroName}",
  content: '<form><p>Modifikatoren für alle Proben:</p><div class="form-group"><label>Erleichterung:</label><input type="number" name="erleichterung" value="0" min="0"/></div><div class="form-group"><label>Erschwernis:</label><input type="number" name="erschwernis" value="0" min="0"/></div></form>',
  buttons: {
    roll: {
      icon: '<i class="fas fa-dice"></i>',
      label: "Würfeln",
      callback: async (html) => {
        const erl = parseInt(html.find('[name="erleichterung"]').val()) || 0;
        const ers = parseInt(html.find('[name="erschwernis"]').val()) || 0;
        await wuerfeln(fertigkeiten, erl, ers);
      }
    },
    cancel: { icon: '<i class="fas fa-times"></i>', label: "Abbrechen" }
  },
  default: "roll"
}).render(true);

async function wuerfeln(ferts, erl, ers) {
  let results = [];
  for (let f of ferts) {
    results.push(await probe(f.eigenschaften, f.fertigkeitswert, f.name, erl, ers));
  }
  const mod = erl - ers;
  const disp = -mod;
  let rows = '';
  for (let e of results) {
    rows += '<tr style="border-bottom: 1px solid #ccc;">';
    rows += '<td style="padding: 5px;">' + e.name + '</td>';
    rows += '<td style="text-align: center; padding: 5px;">';
    rows += e.erfolg ? '<span style="color: green;">✓ Erfolg</span>' : '<span style="color: red;">✗ Fehlschlag</span>';
    if (e.patzer) rows += ' <span style="color: red; font-weight: bold;">PATZER</span>';
    if (e.kritisch) rows += ' <span style="color: green; font-weight: bold;">KRITISCH</span>';
    rows += '</td>';
    rows += '<td style="text-align: center; padding: 5px;">' + (e.erfolg ? e.qs : '-') + '</td>';
    rows += '</tr>';
  }
  const content = '<div><h3>${makroName}</h3><p><strong>Modifikation:</strong> ' + (disp > 0 ? '+' : '') + disp + ' (Erl: ' + erl + ', Ers: ' + ers + ')</p><hr><table style="width: 100%; border-collapse: collapse;"><thead><tr style="border-bottom: 2px solid #999;"><th style="text-align: left; padding: 5px;">Fertigkeit</th><th style="text-align: center; padding: 5px;">Ergebnis</th><th style="text-align: center; padding: 5px;">QS</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
  ChatMessage.create({ user: game.user.id, speaker: ChatMessage.getSpeaker(), content: content });
}

async function probe(eig, fw, name, erl, ers) {
  const mod = erl - ers;
  const w = [await new Roll("1d20").evaluate(), await new Roll("1d20").evaluate(), await new Roll("1d20").evaluate()];
  const vals = w.map(r => r.total);
  const c20 = vals.filter(v => v === 20).length;
  const c1 = vals.filter(v => v === 1).length;
  let patzer = c20 >= 2;
  let krit = c1 >= 2;
  let fp = fw;
  for (let i = 0; i < 3; i++) {
    const mw = vals[i] - mod;
    if (mw > eig[i]) fp -= (mw - eig[i]);
  }
  let ok = fp >= 0;
  let qs = ok ? Math.min(6, Math.floor(fp / 3) + 1) : 0;
  if (patzer) { ok = false; qs = 0; }
  if (krit) { ok = true; qs = Math.max(qs, 1); }
  return { name: name, erfolg: ok, qs: qs, patzer: patzer, kritisch: krit };
}`;

  await Macro.create({
    name: makroName,
    type: 'script',
    command: command,
    img: 'icons/svg/dice-d20-highlight.svg'
  });

  ui.notifications.info(`Makro "${makroName}" wurde erstellt!`);
}
