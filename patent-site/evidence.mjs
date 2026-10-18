export const evidence = {
    '1pre': {
      label:'Preamble 1pre · A 97', title:'A method for indicating status.',
      mapping:'The SMA manual expressly describes operating modes displayed through LEDs on the inverter housing.',
      limit:'The recorded strength is A 97 for this element in both grounds. Coverage of this element does not resolve the separate single-LED question.',
      pinpoint:'SMA BEN082220 · §4 · Printed p. 16', document:'SMA · SUNNY BOY / SUNNY MINI CENTRAL', page:'16', sourceTitle:'Operating modes',
      passages:[['The different operating modes are displayed via three light-emitting diodes (LEDs) on the inverter housing cover',true]]
    },
    '16a': {
      label:'Limitation 16a · A 95', title:'Monitor each input channel.',
      mapping:'The manual describes separate inputs with individual MPP trackers, per-input faults and per-string measurements.',
      limit:'The complete mapping uses several passages. The research record separately addresses the meaning of “input channel”.',
      pinpoint:'SMA BEN082220 · Printed pp. 13, 23, 40, 44', document:'SMA · SUNNY BOY / SUNNY MINI CENTRAL', page:'13 / 23 / 40 / 44', sourceTitle:'Selected passages',
      passages:[['Since each individual input has its own MPP tracker',true],['At least one of the two or three DC inputs is defective',true],['PPV DC-A: PV generator output string A',false]]
    },
    '16b': {
      label:'Limitation 16b · A 97', title:'Indicate the monitored state.',
      mapping:'SMA expressly connects the device’s operating mode with the integrated LEDs.',
      limit:'This passage supports actuation of the indicators. Whether the claimed states appear on one system-status LED is assessed separately.',
      pinpoint:'SMA BEN082220 · §4 · Printed p. 16', document:'SMA · SUNNY BOY / SUNNY MINI CENTRAL', page:'16', sourceTitle:'Operating-mode indication',
      passages:[['To allow the device to signal its operating mode via the 3 integrated LEDs, the inverter must be connected to the DC side',true]]
    },
    '16c1': {
      label:'Limitation 16c1 · B 75', title:'The inverter is working.',
      mapping:'Sunways describes one combined red/green LED, continuously green during grid feeding. The chart combines that indication with SMA’s monitored-input architecture.',
      limit:'B 75 is the recorded strength of the combination, including its reason to combine. This source passage is one part of that ground.',
      pinpoint:'Sunways AT manual · §5.1 · Printed p. 27', document:'SUNWAYS · SOLAR INVERTER AT', page:'27', sourceTitle:'Operating LED',
      passages:[['The combined red/green LED indicates the device status of the Solar Inverter:',false],['LED green, continuously lit Solar Inverter is active and feeds into power grid (MPP mode)',true]]
    },
    '16c2': {
      label:'Limitation 16c2 · C 50 · Weakest', title:'Working, but with warnings.',
      mapping:'The manual describes continued grid feeding with a current, output or temperature limitation. Its separate red-flashing state states a warning, but does not say whether feeding continues.',
      limit:'This mapping depends on treating the operating limitation as a warning, the manual’s date evidence, and the reason to combine references. That uncertainty remains visible.',
      pinpoint:'Sunways AT manual · §5.1 · Printed p. 27', document:'SUNWAYS · SOLAR INVERTER AT', page:'27', sourceTitle:'Operating LED',
      passages:[['The combined red/green LED indicates the device status of the Solar Inverter:',false],['LED green, continuously lit Solar Inverter is active and feeds into power grid (MPP mode)',false],['LED green, flashing Solar Inverter is active and feeds into power grid, however with current, output or temperature limitation.',true],['LED red, continuously lit an error has occurred (malfunction)',false],['LED red, flashing a warning has been issued',true]]
    },
    '16c3': {
      label:'Limitation 16c3 · B 75', title:'The inverter has an error.',
      mapping:'The Sunways combined LED shows a continuously red error state. The chart also cites Fronius, Soladin and a Japanese reference for error indications.',
      limit:'The score includes the reason to combine these indications with SMA’s architecture. A single isolated passage is not the complete ground.',
      pinpoint:'Sunways AT manual · §5.1 · Printed p. 27', document:'SUNWAYS · SOLAR INVERTER AT', page:'27', sourceTitle:'Operating LED',
      passages:[['The combined red/green LED indicates the device status of the Solar Inverter:',false],['LED red, continuously lit an error has occurred (malfunction)',true]]
    },
    '16c4': {
      label:'Limitation 16c4 · B 75', title:'The AC grid has an error.',
      mapping:'The Sunways display distinguishes an AC-network error. The chart relies on Soladin and the Japanese 366 publication for a grid-specific code on one LED.',
      limit:'The highlighted Sunways text describes a display code, not a distinct grid-error LED state. The other references supply that part of the combination.',
      pinpoint:'Sunways AT manual · §5.5 · Printed p. 38', document:'SUNWAYS · SOLAR INVERTER AT', page:'38', sourceTitle:'Malfunction displays',
      passages:[['Based on the first number you can quickly recognise which area the error has occurred in:',false],['1: Error in the area of the solar generator',false],['2: Error in the area of the AC network',true],['3: Error in the area of the inverter',false]]
    },
    '16c5': {
      label:'Limitation 16c5 · B 75', title:'The inverter is off.',
      mapping:'Sunways identifies the unlit state as inactive night mode. The chart cites corresponding states in the Soladin and Fronius documents.',
      limit:'The recorded B 75 reflects the combined ground and its reason to combine, rather than this sentence alone.',
      pinpoint:'Sunways AT manual · §5.1 · Printed p. 27', document:'SUNWAYS · SOLAR INVERTER AT', page:'27', sourceTitle:'Operating LED',
      passages:[['The combined red/green LED indicates the device status of the Solar Inverter:',false],['LED off Solar Inverter is not active (night mode)',true]]
    },
    'P2': {
      label:'Claim-wide point P2 · B 78', title:'Why combine the references?',
      mapping:'The recorded rationale addresses putting SMA’s monitored operating states onto a single two-colour indicator. It is a claim-wide point, not an additional limitation.',
      limit:'The assessment records a three-reference combination. This point affects the 16c1–16c5 ratings and must be read with the complete rationale.',
      pinpoint:'Claim chart · Ground 2 · Combination rationale', document:'Zeusfyi · RESEARCH RECORD', page:'P2', sourceTitle:'Combination rationale',
      passages:[['SMA supplies the monitored-input architecture. The cited single-indicator disclosures supply the display of operating states. The chart records the technical reason for combining them, alongside the remaining uncertainty.',true]], summary:true
    }
  };
