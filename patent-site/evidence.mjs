// Claim-chart data of the interactive evidence module: for each case page that shows it, the list
// of its charts (one per submitted chart). A case without an entry shows its static excerpt. Each limitation or claim-wide point: its
// rating on the band scale ("C 50"), the short label of its strip button, the reading text, the
// pinpoint and the original pages it opens (sourceViews: [pageId, [fragmentIds]] from source-pages.mjs).
// A claim-wide point carries summary: true and may carry note, the sentence shown under its pages.
export const caseEvidence = {
  "cyboenergy-9331488": [{
    "caption": [
      "CyboEnergy · US 9,331,488 B2",
      "Claim 16 · Ground 2"
    ],
    "assessed": "15 October 2026",
    "pointsNote": "P2 is the reason to combine, a claim-wide point.",
    "staticNote": "The original warning-state reference page is shown above.",
    "selected": "16c2",
    "limitations": {
      "1pre": {
        "rating": "A 97",
        "short": "Preamble",
        "title": "A method for indicating status.",
        "mapping": "The SMA manual expressly describes operating modes displayed through LEDs on the inverter housing.",
        "limit": "The recorded strength is A 97 for this element in both grounds. Coverage of this element does not resolve the separate single-LED question.",
        "pinpoint": "SMA BEN082220 · §4 · Printed p. 16",
        "sourceViews": [
          [
            "sma-16",
            [
              "indicators"
            ]
          ]
        ]
      },
      "16a": {
        "rating": "A 95",
        "short": "Monitoring",
        "title": "Monitor each input channel.",
        "mapping": "The manual describes separate inputs with individual MPP trackers, per-input faults and per-string measurements.",
        "limit": "The complete mapping uses several passages. The research record separately addresses the meaning of “input channel”.",
        "pinpoint": "SMA BEN082220 · Printed pp. 13, 23, 40, 44",
        "sourceViews": [
          [
            "sma-13",
            [
              "tracker"
            ]
          ],
          [
            "sma-23",
            [
              "inputs"
            ]
          ],
          [
            "sma-40",
            [
              "measurement"
            ]
          ],
          [
            "sma-44",
            [
              "fault"
            ]
          ]
        ]
      },
      "16b": {
        "rating": "A 97",
        "short": "LED control",
        "title": "Indicate the monitored state.",
        "mapping": "SMA expressly connects the device’s operating mode with the integrated LEDs.",
        "limit": "This passage supports actuation of the indicators. Whether the claimed states appear on one system-status LED is assessed separately.",
        "pinpoint": "SMA BEN082220 · §4 · Printed p. 16",
        "sourceViews": [
          [
            "sma-16",
            [
              "actuation"
            ]
          ]
        ]
      },
      "16c1": {
        "rating": "B 75",
        "short": "Working",
        "title": "The inverter is working.",
        "mapping": "Sunways describes one combined red/green LED, continuously green during grid feeding. The chart combines that indication with SMA’s monitored-input architecture.",
        "limit": "B 75 is the recorded strength of the combination, including its reason to combine. This source passage is one part of that ground.",
        "pinpoint": "Sunways AT manual · §5.1 · Printed p. 27",
        "sourceViews": [
          [
            "sunways-27",
            [
              "combined",
              "working"
            ]
          ]
        ]
      },
      "16c2": {
        "rating": "C 50",
        "short": "Warnings",
        "title": "Working, but with warnings.",
        "mapping": "The manual describes continued grid feeding with a current, output or temperature limitation. Its separate red-flashing state states a warning, but does not say whether feeding continues.",
        "limit": "This mapping depends on treating the operating limitation as a warning, the manual’s date evidence, and the reason to combine references. That uncertainty remains visible.",
        "pinpoint": "Sunways AT manual · §5.1 · Printed p. 27",
        "sourceViews": [
          [
            "sunways-27",
            [
              "warning",
              "redWarning"
            ]
          ]
        ]
      },
      "16c3": {
        "rating": "B 75",
        "short": "Inverter error",
        "title": "The inverter has an error.",
        "mapping": "The Sunways combined LED shows a continuously red error state. The chart also cites Fronius, Soladin and a Japanese reference for error indications.",
        "limit": "The score includes the reason to combine these indications with SMA’s architecture. A single isolated passage is not the complete ground.",
        "pinpoint": "Sunways AT manual · §5.1 · Printed p. 27",
        "sourceViews": [
          [
            "sunways-27",
            [
              "combined",
              "error"
            ]
          ]
        ]
      },
      "16c4": {
        "rating": "B 75",
        "short": "Grid error",
        "title": "The AC grid has an error.",
        "mapping": "The Sunways display distinguishes an AC-network error. The chart relies on Soladin and the Japanese 366 publication for a grid-specific code on one LED.",
        "limit": "The highlighted Sunways text describes a display code, not a distinct grid-error LED state. The other references supply that part of the combination.",
        "pinpoint": "Sunways AT manual · §5.5 · Printed p. 38",
        "sourceViews": [
          [
            "sunways-38",
            [
              "grid"
            ]
          ]
        ]
      },
      "16c5": {
        "rating": "B 75",
        "short": "Off",
        "title": "The inverter is off.",
        "mapping": "Sunways identifies the unlit state as inactive night mode. The chart cites corresponding states in the Soladin and Fronius documents.",
        "limit": "The recorded B 75 reflects the combined ground and its reason to combine, rather than this sentence alone.",
        "pinpoint": "Sunways AT manual · §5.1 · Printed p. 27",
        "sourceViews": [
          [
            "sunways-27",
            [
              "combined",
              "off"
            ]
          ]
        ]
      },
      "P2": {
        "rating": "B 78",
        "short": "Combination",
        "title": "Why combine the references?",
        "mapping": "The recorded rationale addresses putting SMA’s monitored operating states onto a single two-colour indicator. It is a claim-wide point, not an additional limitation.",
        "limit": "The assessment records a three-reference combination. This point affects the 16c1–16c5 ratings and must be read with the complete rationale.",
        "pinpoint": "Claim chart · Ground 2 · Combination rationale",
        "summary": true,
        "sourceViews": [
          [
            "sma-16",
            [
              "indicators"
            ]
          ],
          [
            "sunways-27",
            [
              "combined",
              "working"
            ]
          ]
        ]
      }
    }
  }]
};

// The backup and alternative grounds recorded beside each submitted chart (CHART.md of the case):
// label, title, references [{title, url}], the recorded verdict in plain words, an optional rationale,
// and per limitation its claim text, the quoted passage, its pinpoint and the original document
// (pageId + fragmentIds for a rendered page, or url for the document).
export const backupGrounds = {};
