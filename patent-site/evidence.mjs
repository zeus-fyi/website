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
  }],
  "nordicunmanned-2035276": [
    {
      "eyebrow": "Submitted claim chart · European patent",
      "heading": "The European claim, limitation by limitation.",
      "caption": [
        "Nordic Unmanned · EP 2 035 276 B1",
        "Claim 1 · Inventive step · B, hold 62"
      ],
      "assessed": "18 October 2026",
      "pointsNote": "P1 is the reason to combine, a claim-wide point. The claim’s authentic text is German; the chart’s English reading is shown.",
      "staticNote": "The original page cited for the individually variable motor speeds is shown above.",
      "selected": "1f",
      "limitations": {
        "1pre": {
          "rating": "A 98",
          "short": "Aircraft",
          "title": "An aircraft.",
          "mapping": "The STARMAC paper describes a four-rotor aircraft with fixed-pitch blades, a quadrotor, flown autonomously outdoors. The claim’s German word, “Fluggerät”, is read as “aircraft”.",
          "limit": "The words are plain. The date rests on the conference proceedings of August 2005, ten months before the priority date.",
          "pinpoint": "R10 · STARMAC, IEEE/RSJ IROS 2005 · Printed p. 468",
          "sourceViews": [
            [
              "starmac-iros-468",
              [
                "vehicle"
              ]
            ]
          ]
        },
        "1a": {
          "rating": "A 96",
          "short": "Drive units",
          "title": "At least three drive units.",
          "mapping": "The companion STARMAC paper mounts four fixed-pitch rotors at the ends of a cross frame, each rotor on its own motor: four drive units where the claim asks for at least three.",
          "limit": "The owner may read “drive unit” as the assembly that carries both rotors. That reading goes to limitation 1d, where each unit gains its second rotor; for the count, STARMAC’s four rotor-and-motor units are the units.",
          "pinpoint": "R10-DASC · STARMAC, DASC 2004 · Printed p. 12.E.4-1",
          "sourceViews": [
            [
              "starmac-dasc-1",
              [
                "frame"
              ]
            ]
          ]
        },
        "1b": {
          "rating": "A 94",
          "short": "First motor",
          "title": "A first rotor on a speed-controlled electric motor.",
          "mapping": "The on-board controller drives each motor through its own pulse-width-modulated output, and each rotor’s thrust follows the voltage applied to its motor. Each unit therefore has a first rotor on an electric motor whose speed is set.",
          "limit": "The owner can argue that a voltage-commanded motor is not “speed-controlled”. The claim’s own words settle it: “gesteuert” (set) stands beside the closed-loop “Regelung” of limitation 1c.",
          "pinpoint": "R10-DASC · Printed p. 12.E.4-4",
          "sourceViews": [
            [
              "starmac-dasc-4",
              [
                "pwm"
              ]
            ]
          ]
        },
        "1c": {
          "rating": "B 87",
          "short": "Autonomous control",
          "title": "Means for autonomous attitude and position control.",
          "mapping": "STARMAC flew autonomous hover with closed-loop control of attitude, altitude and position: inner loops through the motor voltages, an outer position loop fed by GPS. Its companion paper puts the controller on board the craft.",
          "limit": "The two papers describe one testbed by one group and are scored as two references. Neither says in so many words where the outer, horizontal position loop runs; the answer is the companion paper’s “all control functions onboard”.",
          "pinpoint": "R10 · Printed pp. 468, 470 · R10-DASC · Printed p. 12.E.4-8",
          "sourceViews": [
            [
              "starmac-iros-468",
              [
                "hover"
              ]
            ],
            [
              "starmac-iros-470",
              [
                "loops"
              ]
            ],
            [
              "starmac-dasc-8",
              [
                "onboard"
              ]
            ]
          ]
        },
        "1d": {
          "rating": "B 82",
          "short": "Second motor",
          "title": "A second rotor on its own speed-controlled electric motor in each unit.",
          "mapping": "Kinoshita gives each rotor of a coaxial pair its own variable-speed motor, the two propellers turning in opposite directions. Given that unit, each of STARMAC’s drive units has a second rotor on a second speed-controlled electric motor.",
          "limit": "The rating rests on P1, the reason to fit Kinoshita’s unit to each of STARMAC’s units. The structural reading of “drive unit” is met, since Kinoshita’s pair is one coaxial assembly.",
          "pinpoint": "R2 · US 5,071,383 · Column 4, lines 53–54 · Claim 1",
          "sourceViews": [
            [
              "kinoshita-383-11",
              [
                "opposite"
              ]
            ],
            [
              "kinoshita-383-12",
              [
                "independent"
              ]
            ]
          ]
        },
        "1e": {
          "rating": "B 82",
          "short": "Opposite rotation",
          "title": "The second rotor turns opposite to the first.",
          "mapping": "Kinoshita’s two propellers rotate in opposite directions, each at its own speed; Pauli’s upper and lower propellers are driven to opposite rotation independently of each other.",
          "limit": "STARMAC turns rotors of different units opposite to each other, not the two rotors of one unit. The limitation comes with the unit of 1d and rests on P1, with no open point of its own.",
          "pinpoint": "R2 · Claim 1, column 5, lines 43–45 · R3 · DE 102 56 916 A1 · [0007]",
          "sourceViews": [
            [
              "kinoshita-383-12",
              [
                "independent"
              ]
            ],
            [
              "pauli-916-2",
              [
                "opposite"
              ]
            ]
          ]
        },
        "1f": {
          "rating": "B 80",
          "short": "Individual speeds",
          "title": "Every motor’s speed can be varied individually.",
          "mapping": "STARMAC computes a net thrust value for each rotor and drives each motor by its own output; within the pair, Kinoshita rotates each propeller at a speed independent of the other. The claim asks for the capability, which these documents state.",
          "limit": "The weakest limitation. The owner will cite craft that run a unit’s two rotors together, at equal speeds or on one motor. Each is another design or an option beside the independent drive; none says a unit’s motors should not have individually variable speeds.",
          "pinpoint": "R10-DASC · Printed p. 12.E.4-8 · R2 · Claim 1, column 5, lines 44–45",
          "sourceViews": [
            [
              "starmac-dasc-8",
              [
                "thrust"
              ]
            ],
            [
              "kinoshita-383-12",
              [
                "speed"
              ]
            ]
          ]
        },
        "P1": {
          "rating": "B 82",
          "short": "Combination",
          "title": "Why combine the references?",
          "mapping": "The reason to give each of STARMAC’s four units a second, counter-rotating rotor on its own speed-controlled electric motor, Kinoshita’s unit, for the patent’s own problem: a more compact craft for the same payload that keeps flying when a rotor fails. The art states the reasons, and Spirov and Pedersen had already put a counter-rotating pair in each of four units.",
          "limit": "Two references in the same field with a reason stated in the art would rate higher; the point is held at 82 for the owner’s two answers, a remark that multi-rotor craft are harder to balance and a hindsight argument. This point affects the 1d–1f ratings.",
          "pinpoint": "Claim chart · Combination rationale",
          "summary": true,
          "note": "P1 is the researcher’s combination rationale. These original pages show its cited sources.",
          "sourceViews": [
            [
              "spirov-357-19",
              [
                "pair"
              ]
            ],
            [
              "pauli-916-2",
              [
                "opposite"
              ]
            ]
          ]
        }
      }
    },
    {
      "eyebrow": "Submitted claim chart · United States patent",
      "heading": "The American claim, limitation by limitation.",
      "caption": [
        "Nordic Unmanned · US 8,328,128 B2",
        "Claim 1 · Obviousness · C, hold 7"
      ],
      "assessed": "18 October 2026",
      "pointsNote": "W1 is the reading of “autonomous attitude and position control” and W2 the reason to combine; both are claim-wide points.",
      "staticNote": "The original page cited for the control through the individual motor speeds is shown above.",
      "selected": "1j",
      "limitations": {
        "1pre": {
          "rating": "A 98",
          "short": "Aircraft",
          "title": "An aircraft.",
          "mapping": "Louvel describes a remotely controlled, remotely supplied aircraft powered by propellers driven by electric motors, able to hover and move in the three directions of space.",
          "limit": "Literal and in plain words.",
          "pinpoint": "R1 · US 2002/0104921 A1 · [0007]",
          "sourceViews": [
            [
              "louvel-921-1",
              [
                "aircraft",
                "powered"
              ]
            ]
          ]
        },
        "1a": {
          "rating": "C 66",
          "short": "Autonomous control",
          "title": "Autonomous attitude and position control by at least three drive units.",
          "mapping": "Louvel’s on-board tilt sensors and yaw gyro feed a closed loop that holds the attitude, cancels yaw and moves the craft through its four motor units. The examiner read the term as automatic control by programmable electronics, as the patent itself does.",
          "limit": "Under the owner’s narrow reading, closed-loop attitude and position control on board, Louvel’s loop runs off board and the craft is piloted through a handle; the chart then rests on STARMAC and Wobben. Scored at W1.",
          "pinpoint": "R1 · [0042], [0091]",
          "sourceViews": [
            [
              "louvel-921-2",
              [
                "sensors"
              ]
            ],
            [
              "louvel-921-4",
              [
                "loop"
              ]
            ]
          ]
        },
        "1b": {
          "rating": "A 98",
          "short": "First rotor",
          "title": "Each drive unit has a first rotor.",
          "mapping": "Louvel’s four lift propellers, one per drive unit; after the combination, the upper rotor of each coaxial pair.",
          "limit": "Literal and in plain words.",
          "pinpoint": "R1 · [0029]",
          "sourceViews": [
            [
              "louvel-921-1",
              [
                "propellers"
              ]
            ]
          ]
        },
        "1c": {
          "rating": "A 94",
          "short": "First motor",
          "title": "A first speed-controlled electric motor drives the first rotor.",
          "mapping": "Each propeller is driven independently by an electric motor, and the control unit sets the speed of each motor through its own pulse-width-modulated drive.",
          "limit": "The owner can argue that a PWM current drive is not “rotary speed-controlled”; Louvel’s own words, “control the speed of each electric motor”, settle it.",
          "pinpoint": "R1 · [0030], [0061]",
          "sourceViews": [
            [
              "louvel-921-1",
              [
                "independent",
                "motor"
              ]
            ],
            [
              "louvel-921-3",
              [
                "pwm"
              ]
            ]
          ]
        },
        "1d": {
          "rating": "B 82",
          "short": "Second rotor",
          "title": "At least one second rotor.",
          "mapping": "Kinoshita’s second propeller sits below the first on the same axis, the two turning in opposite directions; Pauli and Xing show the same unit, and Spirov and Pedersen give each of four ducted fans two counter-rotating units.",
          "limit": "The reasons to combine are stated in the art (W2), but the owner has a colourable different-problem answer in Xing’s remark about multirotor balance.",
          "pinpoint": "R2 · Column 4, lines 53–54 · R3 · [0007]",
          "sourceViews": [
            [
              "kinoshita-383-11",
              [
                "opposite"
              ]
            ],
            [
              "pauli-916-2",
              [
                "opposite"
              ]
            ]
          ]
        },
        "1e": {
          "rating": "C 72",
          "short": "Second motor",
          "title": "A second speed-controlled electric motor drives the second rotor the opposite way.",
          "mapping": "Kinoshita drives each propeller of the pair by its own variable-speed motor, the two rotating in opposite directions; Paul puts such counter-rotating electric motors in every one of three units.",
          "limit": "No multi-unit reference calls the second motor speed-controlled; that comes from the single-pair references by the combination. A narrow open point.",
          "pinpoint": "R2 · Claim 1, column 5, lines 43–45",
          "sourceViews": [
            [
              "kinoshita-383-12",
              [
                "independent"
              ]
            ]
          ]
        },
        "1f": {
          "rating": "C 64",
          "short": "Individual speeds",
          "title": "Both motors’ speeds vary on an individual basis.",
          "mapping": "Within the pair, Kinoshita rotates each propeller at a speed independent of the other: both up or down to climb, a difference to turn. Across the craft, Louvel sets every motor’s speed separately.",
          "limit": "A live open point: no reference varies the speeds of both motors of each of three or more coaxial units individually; one reference disclaims per-rotor speed control, another feeds both motors of a fan from one module.",
          "pinpoint": "R2 · Claim 1, column 5, lines 44–45 · R1 · [0061]",
          "sourceViews": [
            [
              "kinoshita-383-12",
              [
                "speed"
              ]
            ],
            [
              "louvel-921-3",
              [
                "pwm"
              ]
            ]
          ]
        },
        "1g": {
          "rating": "C 68",
          "short": "Support arms",
          "title": "Supporting arms from a central base body, the units not secured to each other.",
          "mapping": "Louvel’s two crossing boards form four arms radiating from the central part, each arm end carrying one motor-propeller unit, with no member joining the motors.",
          "limit": "Louvel’s solid casing side area is attached to the board ends, a ring tied to the arm ends. The patent’s own dependent claims add such protection rings to the same frame, so the clause excludes drive units secured to each other, not a guard on the arms. Narrow.",
          "pinpoint": "R1 · [0031], [0032]",
          "sourceViews": [
            [
              "louvel-921-1",
              [
                "frame"
              ]
            ],
            [
              "louvel-921-2",
              [
                "boards"
              ]
            ]
          ]
        },
        "1h": {
          "rating": "A 96",
          "short": "Units on arms",
          "title": "A drive unit fitted to each supporting arm.",
          "mapping": "One board bears two motors and the other board the other two: one motor-propeller unit at each arm end.",
          "limit": "Literal.",
          "pinpoint": "R1 · [0032]",
          "sourceViews": [
            [
              "louvel-921-2",
              [
                "boards"
              ]
            ]
          ]
        },
        "1i": {
          "rating": "C 72",
          "short": "Coaxial rotors",
          "title": "The two rotors of each unit are coaxial.",
          "mapping": "Kinoshita mounts the second propeller on a rod shaft that runs through the first propeller’s sleeve shaft; Xing uses a core shaft inside a hollow sleeve.",
          "limit": "If the owner reads the limitation to require coaxial motors, the chart rests on Paul’s concentric motors and on documents the owner may try to antedate. Narrow.",
          "pinpoint": "R2 · Claim 1, column 5, lines 54–56",
          "sourceViews": [
            [
              "kinoshita-383-12",
              [
                "shaft"
              ]
            ]
          ]
        },
        "1j": {
          "rating": "C 58",
          "short": "Control by speeds",
          "title": "Attitude and position controlled through each motor’s speed.",
          "mapping": "Louvel’s loop corrects a tilt by raising one propeller’s speed and lowering the opposite one’s; within a pair, Kinoshita holds the heading with equal speeds, climbs with both and turns by a difference.",
          "limit": "The weakest limitation. No reference controls attitude and position through the individual speeds of both motors in each of three or more coaxial units, so the loop over eight motors is the combination’s (W2), and the narrow reading of “attitude and position control” (W1) carries over from 1a.",
          "pinpoint": "R1 · [0100] · R2 · Column 5, lines 4–7",
          "sourceViews": [
            [
              "louvel-921-4",
              [
                "tilt"
              ]
            ],
            [
              "kinoshita-383-12",
              [
                "speed"
              ]
            ]
          ]
        },
        "W1": {
          "rating": "C 66",
          "short": "Claim reading",
          "title": "How “autonomous attitude and position control” is read.",
          "mapping": "Read as the examiner and the patent read it, automatic control by programmable electronics, which Louvel’s sensor loop meets. Under the owner’s narrow reading, closed-loop attitude and position control on board, the chart rests on STARMAC’s on-board loops and on Wobben.",
          "limit": "A claim-wide point that limitations 1a and 1j depend on. These pages show the STARMAC loops the narrow reading falls back on.",
          "pinpoint": "Claim chart · Claim construction",
          "summary": true,
          "note": "W1 is the reading of the claim term the chart depends on. These original pages show its fallback sources.",
          "sourceViews": [
            [
              "starmac-iros-470",
              [
                "loops"
              ]
            ],
            [
              "starmac-dasc-8",
              [
                "onboard"
              ]
            ]
          ]
        },
        "W2": {
          "rating": "B 80",
          "short": "Combination",
          "title": "Why combine the references?",
          "mapping": "The reason to fit Louvel’s quadrotor with the coaxial pair in which each rotor has its own speed-controlled electric motor: the art states it (torque cancelled within the pair, flight on one motor, more lift, more efficiency), and a 2004 four-unit craft took the step.",
          "limit": "Counted once for the chart. The owner has a colourable answer: Xing’s remark that a multirotor’s balance is hard to control, and hindsight.",
          "pinpoint": "Claim chart · Combination rationale",
          "summary": true,
          "note": "W2 is the researcher’s combination rationale. These original pages show its cited sources.",
          "sourceViews": [
            [
              "pauli-916-2",
              [
                "opposite"
              ]
            ],
            [
              "spirov-357-19",
              [
                "pair"
              ]
            ]
          ]
        }
      }
    }
  ]
};

// The backup and alternative grounds recorded beside each submitted chart (CHART.md of the case):
// label, title, references [{title, url}], the recorded verdict in plain words, an optional rationale,
// and per limitation its claim text, the quoted passage, its pinpoint and the original document
// (pageId + fragmentIds for a rendered page, or url for the document).
export const backupGrounds = {
  "gridscale-8842454": [
    {
      "label": "Backup ground for 1a",
      "title": "Obviousness over US 5,764,503 A in view of US 2010/0057267 A1 (General Electric)",
      "references": [
        {
          "title": "US 5,764,503 A (Brand et al., Digital Equipment Corporation)",
          "url": "https://patents.google.com/patent/US5764503A/en"
        },
        {
          "title": "US 2010/0057267 A1 (Liu, Garces and Bose, General Electric)",
          "url": "https://patents.google.com/patent/US20100057267A1/en"
        }
      ],
      "verdict": "Filed with the submission on 9 October 2026 as the backup ground for limitation 1a, for the reading in which a respective DC power source must be an energy source such as a photovoltaic array. The research records no separate band or score for it.",
      "rationale": "Both references coordinate several paralleled inverters on one AC output through a central controller fed by voltage and current sensing of the common output, with a local controller at each inverter. Substituting photovoltaic arrays for the utility-fed regulators as the per-inverter DC sources is the use of a known technique on a known device with predictable results.",
      "limitations": [
        {
          "id": "1a",
          "text": "A plurality of inverters configured to receive DC power from a respective DC power source and respectively provide AC power to an AC load.",
          "quote": "a plurality of PV subsystems 42, each subsystem having at least one PV array 12 and a PV inverter 10 operable to supply electrical power to a utility grid 14",
          "pinpoint": "US 2010/0057267 A1 · [0032] · FIG. 2",
          "url": "https://patentimages.storage.googleapis.com/5e/a2/b1/153837f1d1e33a/US20100057267A1.pdf#page=9",
          "note": "The PV arrays 12 are the respective DC power sources of the paralleled inverters; US 5,764,503 A supplies every other limitation as charted above."
        },
        {
          "id": "1a",
          "text": "The two-stage inverter of the GE reference.",
          "quote": "Typical PV inverters employ two stages for power processing with the first stage configured for providing a constant DC voltage and the second stage configured for converting the constant DC voltage to AC current.",
          "pinpoint": "US 2010/0057267 A1 · [0002]",
          "pageId": "ge-267-8",
          "fragmentIds": [
            "stages"
          ]
        },
        {
          "id": "1b",
          "text": "Collective sensing of the inverters’ output by the central controller.",
          "quote": "The PV system central controller 44 further comprises power sensors 54, such as voltage and current sensors, which are configured to sense collective power output of the PV subsystems 42.",
          "pinpoint": "US 2010/0057267 A1 · [0033] · FIG. 2",
          "url": "https://patentimages.storage.googleapis.com/5e/a2/b1/153837f1d1e33a/US20100057267A1.pdf#page=9"
        },
        {
          "id": "1c",
          "text": "A local controller at each inverter under the central command.",
          "quote": "Each PV subsystem 42 may include, for example, an adaptive controller operable to implement a control algorithm configured to determine a power level command of its corresponding PV inverter 10.",
          "pinpoint": "US 2010/0057267 A1 · [0035]",
          "url": "https://patentimages.storage.googleapis.com/5e/a2/b1/153837f1d1e33a/US20100057267A1.pdf#page=10"
        }
      ]
    }
  ]
};

// Prepared, not yet shown: for each existing case whose chart is still being re-scored, the rows of
// its submitted chart (the PEARL_PASTE.md blocks named in "paste"), each with its pinpoint and the
// rendered original pages it opens. A row becomes a chart row in caseEvidence once its rating and
// its reading text ("What the score reflects") come from the re-score; nothing here renders.
export const caseDrafts = {
  "gridscale-8842454": {
    "patent": "US 8,842,454 B2",
    "claim": "1",
    "paste": "PEARL_PASTE.md blocks [1pre], [1a], [1b], [1c] (filed 2026-10-06; the [1a] alternative block is the backup ground)",
    "rows": {
      "1pre": {
        "pinpoint": "R1 · US 5,764,503 A · Column 1, lines 6–11 · Column 7, lines 7–14",
        "sourceViews": [
          [
            "brand-503-12",
            [
              "field"
            ]
          ],
          [
            "brand-503-15",
            [
              "plurality",
              "parallel"
            ]
          ]
        ]
      },
      "1a": {
        "pinpoint": "R1 · Column 5, lines 59–67 · FIG. 11",
        "sourceViews": [
          [
            "brand-503-14",
            [
              "regulator"
            ]
          ]
        ]
      },
      "1b": {
        "pinpoint": "R1 · Column 6, lines 55–60 · FIGS. 13–14",
        "sourceViews": [
          [
            "brand-503-14",
            [
              "sensor"
            ]
          ]
        ]
      },
      "1c": {
        "pinpoint": "R1 · Column 7, lines 16–20 · FIG. 14",
        "sourceViews": [
          [
            "brand-503-15",
            [
              "series",
              "same"
            ]
          ],
          [
            "brand-503-14",
            [
              "receives",
              "switching"
            ]
          ]
        ]
      }
    }
  },
  "sol-ip-10090894": {
    "patent": "US 10,090,894 B2",
    "claim": "7",
    "paste": "PEARL_PASTE.md blocks 1–14 ([7pre] to [7f2])",
    "rows": {
      "7pre": {
        "pinpoint": "Ref. 1 · US 2005/0181800 A1 · [0033]",
        "sourceViews": [
          [
            "broadcom-800-13",
            [
              "radio"
            ]
          ]
        ]
      },
      "7a": {
        "pinpoint": "Ref. 1 · [0033]",
        "sourceViews": [
          [
            "broadcom-800-13",
            [
              "memory"
            ]
          ]
        ]
      },
      "7b": {
        "pinpoint": "Ref. 1 · [0033], [0065] · FIG. 10",
        "sourceViews": [
          [
            "broadcom-800-13",
            [
              "instructions",
              "functions"
            ]
          ],
          [
            "broadcom-800-16",
            [
              "format"
            ]
          ]
        ]
      },
      "7b1": {
        "pinpoint": "Ref. 1 · [0065]",
        "sourceViews": [
          [
            "broadcom-800-16",
            [
              "first"
            ]
          ]
        ]
      },
      "7b2": {
        "pinpoint": "Ref. 1 · [0066]",
        "sourceViews": [
          [
            "broadcom-800-16",
            [
              "additional"
            ]
          ]
        ]
      },
      "7b3": {
        "pinpoint": "Ref. 1 · [0065] · Ref. 2 · Column 5, lines 64–67",
        "sourceViews": [
          [
            "broadcom-800-16",
            [
              "format"
            ]
          ],
          [
            "cisco-530-13",
            [
              "psdu"
            ]
          ]
        ]
      },
      "7b4": {
        "pinpoint": "Ref. 1 · [0064]",
        "sourceViews": [
          [
            "broadcom-800-16",
            [
              "symbols"
            ]
          ]
        ]
      },
      "7b5": {
        "pinpoint": "Ref. 1 · [0065] · FIG. 10",
        "sourceViews": [
          [
            "broadcom-800-16",
            [
              "format"
            ]
          ]
        ]
      },
      "7c": {
        "pinpoint": "Ref. 1 · [0065] · FIGS. 8 and 10",
        "sourceViews": [
          [
            "broadcom-800-16",
            [
              "format"
            ]
          ]
        ]
      },
      "7d": {
        "pinpoint": "Ref. 1 · [0065] · FIG. 10",
        "sourceViews": [
          [
            "broadcom-800-16",
            [
              "format"
            ]
          ]
        ]
      },
      "7e": {
        "pinpoint": "Ref. 1 · [0065] · FIG. 10",
        "sourceViews": [
          [
            "broadcom-800-16",
            [
              "format"
            ]
          ]
        ]
      },
      "7f": {
        "pinpoint": "Ref. 1 · [0065] · Ref. 2 · Column 5, lines 45–46",
        "sourceViews": [
          [
            "broadcom-800-16",
            [
              "format"
            ]
          ],
          [
            "cisco-530-13",
            [
              "psdu"
            ]
          ]
        ]
      },
      "7f1": {
        "pinpoint": "Ref. 1 · [0069]",
        "sourceViews": [
          [
            "broadcom-800-16",
            [
              "bits"
            ]
          ]
        ]
      },
      "7f2": {
        "pinpoint": "Ref. 2 · US 7,231,530 B1 · Column 9, lines 41–44",
        "sourceViews": [
          [
            "cisco-530-15",
            [
              "crc"
            ]
          ]
        ]
      }
    }
  },
  "sol-ip-9900067": {
    "patent": "US 9,900,067 B2",
    "claim": "38",
    "paste": "PEARL_PASTE.md blocks 5–15 ([38pre] to [38h], the Ref. 8 and Ref. 11 blocks) and block 20 (Ref. 13)",
    "rows": {
      "38pre": {
        "pinpoint": "Ref. 2 · US 2006/0182017 A1 · [0037]",
        "sourceViews": [
          [
            "broadcom-017-15",
            [
              "transceiver"
            ]
          ]
        ]
      },
      "38a": {
        "pinpoint": "Ref. 2 · [0037]",
        "sourceViews": [
          [
            "broadcom-017-15",
            [
              "processor"
            ]
          ]
        ]
      },
      "38b": {
        "pinpoint": "Ref. 3 · US 2008/0014870 A1 · [0041]",
        "sourceViews": [
          [
            "broadcom-870-16",
            [
              "memory"
            ]
          ]
        ]
      },
      "38c": {
        "pinpoint": "Ref. 6 · US 2005/0286474 A1 · [0042], [0071]",
        "sourceViews": [
          [
            "airgo-474-16",
            [
              "siso"
            ]
          ],
          [
            "airgo-474-18",
            [
              "copy"
            ]
          ]
        ]
      },
      "38d": {
        "pinpoint": "Ref. 6 · [0101] · FIG. 13 · Ref. 2 · [0061] · FIG. 4a",
        "sourceViews": [
          [
            "airgo-474-21",
            [
              "legacy"
            ]
          ],
          [
            "broadcom-017-18",
            [
              "preamble"
            ]
          ]
        ]
      },
      "38e": {
        "pinpoint": "Ref. 6 · [0110] · FIG. 18",
        "sourceViews": [
          [
            "airgo-474-22",
            [
              "bits"
            ]
          ]
        ]
      },
      "38f": {
        "pinpoint": "Ref. 6 · [0110] · FIG. 18",
        "sourceViews": [
          [
            "airgo-474-22",
            [
              "reserved"
            ]
          ]
        ]
      },
      "38g": {
        "pinpoint": "Ref. 6 · [0110] · FIG. 18",
        "sourceViews": [
          [
            "airgo-474-22",
            [
              "tail"
            ]
          ]
        ]
      },
      "38h": {
        "pinpoint": "Ref. 8 · [0033], [0034] · Ref. 11 · TS 25.222 · 4.6, p. 62 · Ref. 13 · Column 16, lines 9–14",
        "sourceViews": [
          [
            "intel-314-15",
            [
              "select",
              "savings"
            ]
          ],
          [
            "ts25222-62",
            [
              "tbs"
            ]
          ],
          [
            "nec-050-20",
            [
              "estimate"
            ]
          ]
        ]
      }
    }
  },
  "cyboenergy-9331489": {
    "patent": "US 9,331,489 B2",
    "claim": "14",
    "paste": "PEARL_PASTE.md blocks 1–8 (1pre, 14a–14e); the Morishima rows (1pre, 14a–14c, 14e (ii)) have no public copy of the Japanese original and the Müller scan’s page is still to be mapped",
    "rows": {
      "14d": {
        "pinpoint": "Fornage · US 7,796,412 B2 · Column 6, lines 55–58 and 66–67",
        "sourceViews": [
          [
            "fornage-412-12",
            [
              "threshold",
              "microcontroller"
            ]
          ]
        ]
      },
      "14e": {
        "pinpoint": "Suekane · US 2011/0169344 A1 · [0008], [0046] · Claim 1",
        "sourceViews": [
          [
            "suekane-344-6",
            [
              "night"
            ]
          ],
          [
            "suekane-344-8",
            [
              "calculates"
            ]
          ],
          [
            "suekane-344-12",
            [
              "switch"
            ]
          ]
        ]
      }
    }
  },
  "arc-link-11563655": {
    "patent": "US 11,563,655 B2",
    "claim": "1",
    "paste": "PEARL_PASTE.md blocks [1pre], [1a], [1b(i)], [1b(ii)], [1c]/[1c1], [1c2]; the OpenVirteX documentation and code and the Delftvisor note are not public PDFs",
    "rows": {
      "1pre": {
        "pinpoint": "R1(b) · OpenVirteX, ONS 2014 · p. 1",
        "sourceViews": [
          [
            "ovx-ons14-1",
            [
              "hypervisor"
            ]
          ]
        ]
      },
      "1a": {
        "pinpoint": "R1(e) · Flo-v, ACM CFI 2016 · p. 90",
        "sourceViews": [
          [
            "flo-v-90",
            [
              "request"
            ]
          ]
        ]
      },
      "1b(i)": {
        "pinpoint": "R9 · Sköldström and Yedavalli, IEEE ICC 2012 · Section III-A, p. 2",
        "sourceViews": [
          [
            "skoldstrom-2",
            [
              "shared"
            ]
          ]
        ]
      },
      "1b(ii)": {
        "pinpoint": "R9 · Section V, p. 5",
        "sourceViews": [
          [
            "skoldstrom-5",
            [
              "counters"
            ]
          ]
        ]
      },
      "1c1": {
        "pinpoint": "R1(e) · Flo-v · Section 3.2, p. 92",
        "sourceViews": [
          [
            "flo-v-92",
            [
              "replier"
            ]
          ]
        ]
      },
      "1c2": {
        "pinpoint": "R9 · Section V, p. 5",
        "sourceViews": [
          [
            "skoldstrom-5",
            [
              "counters"
            ]
          ]
        ]
      }
    }
  }
};
