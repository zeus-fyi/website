// Claim-chart data of the interactive evidence module: for each case page that shows it, the list
// of its charts (one per submitted chart). A case without an entry shows its static excerpt. Each limitation or claim-wide point: its
// rating on the band scale ("C 50"), the short label of its strip button, the reading text, the
// pinpoint and the original pages it opens (sourceViews: [pageId, [fragmentIds]] from source-pages.mjs).
// A claim-wide point carries summary: true and may carry note, the sentence shown under its pages.
export const caseEvidence = {
  "cyboenergy-9331488": [
    {
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
    }
  ],
  "gridscale-8842454": [
    {
      "caption": [
        "GridScale Solutions · US 8,842,454 B2",
        "Claim 1 · Anticipation · A, hold 79"
      ],
      "assessed": "19 October 2026",
      "pointsNote": "The reference’s date is a claim-wide point scored at 100 and not shown.",
      "staticNote": "The original page cited for the respective DC power sources is shown above.",
      "selected": "1a",
      "limitations": {
        "1pre": {
          "rating": "A 98",
          "short": "Preamble",
          "title": "An apparatus to deliver AC power.",
          "mapping": "The 1998 power-supply patent describes supplies that give conditioned AC output power to computing or telecommunications systems, and a plurality of paralleled transverters each supplying a portion of that output.",
          "limit": "Plain words, no open point. The reference issued more than a year before the priority date.",
          "pinpoint": "R1 · US 5,764,503 A · Column 1, lines 6–11 · Column 7, lines 7–14 · FIG. 14",
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
          "rating": "A 90",
          "short": "Inverters",
          "title": "Inverters, each fed by a respective DC power source.",
          "mapping": "Each transverter’s voltage regulator outputs a regulated DC voltage to its own current-controlled AC voltage source, which takes DC input and produces AC output; three such sources have their outputs in parallel.",
          "limit": "The weakest limitation, a live reading dispute: the owner reads “a respective DC power source” as an energy source of each inverter’s own, such as a photovoltaic array, while the reference’s regulators all draw on one utility. The answer is claim differentiation and the patent’s own usage; on the narrow reading the chart falls back to the backup ground below.",
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
          "rating": "A 97",
          "short": "Primary controller",
          "title": "A primary control signal from the total current and voltage.",
          "mapping": "Sensor 22 monitors the total voltage and total current on the paralleled output and feeds them back to the system control module, which forms the transverter control signal from them and a sine-wave reference.",
          "limit": "The claim’s words, no open point.",
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
          "rating": "A 92",
          "short": "Secondary controllers",
          "title": "A secondary controller in each inverter.",
          "mapping": "Every transverter receives the same control current over a series interconnection; in each, the transformer, its flux sensor and the switch controller turn that current into the transverter’s own switching signals.",
          "limit": "A live reading dispute: the owner says the switch controller receives only a flux error and that a transformer is not a controller. The claim names no part of the controller that must receive the signal.",
          "pinpoint": "R1 · Column 7, lines 16–20 · Column 6, lines 4–20 · FIG. 14",
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
    }
  ],
  "arc-link-11563655": [
    {
      "caption": [
        "Arc Link · US 11,563,655 B2",
        "Claim 1 · Obviousness · C, hold 55"
      ],
      "assessed": "18 October 2026",
      "pointsNote": "W1 is the reading of “statistics virtualization module” and W2 the treatment of the OpenVirteX record as one base; both are claim-wide points.",
      "staticNote": "The original page cited for the shared-port computation is shown above.",
      "selected": "1b",
      "limitations": {
        "1pre": {
          "rating": "A 98",
          "short": "Hypervisor",
          "title": "A network hypervisor for SDN-based virtualization.",
          "mapping": "OpenVirteX is presented as a network hypervisor that lets operators give their customers virtual software-defined networks; the patent itself names it as the prior network hypervisor.",
          "limit": "Literal and in plain words; the date is undisputed.",
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
          "rating": "A 94",
          "short": "Statistics request",
          "title": "Receives a tenant’s request for physical resource statistics.",
          "mapping": "When a tenant controller sends a monitoring request, the hypervisor answers with translated monitoring information for that virtual network; OpenVirteX’s statistics code takes each tenant’s flow and port requests by its tenant id.",
          "limit": "Literal. The owner can argue that a port or flow counter is not “individual physical resource consumption statistics”; the patent’s own usage settles it. Scored at W1.",
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
        "1b": {
          "rating": "C 60",
          "short": "Shared or not",
          "title": "Determine whether the resource is shared, and provide statistics accordingly.",
          "mapping": "The hypervisor already keeps, per physical port, the tenants whose virtual ports map to it. The Delftvisor note says a tenant’s port statistics on a shared link must be isolated by aggregating its own flows; the ICC 2012 paper states the same computation for networks sharing links.",
          "limit": "The weakest limitation. No reference before the critical date performs the determination inside a network hypervisor; the two-branch rule rests on the design note, the paper and the mapping OpenVirteX holds. Scored at W1.",
          "pinpoint": "R2 · Delftvisor design note · lines 372–373 · R9 · ICC 2012 · Section V, p. 5",
          "sourceViews": [
            {
              "reference": "R2",
              "document": "Delftvisor design note (TU Delft)",
              "edition": "design/design.md at commit b1226578 · public on GitHub from 14 June 2017",
              "pageLabel": "Lines 372–373",
              "citation": "Delftvisor, design/design.md, lines 372–373 (GitHub, commit b1226578)",
              "quotes": [
                "Port statistics can be tricky since on shared links the traffic caused by each slices would need to be isolated. This could be done by remembering which flows cause packets to be forwarded to a port and query their statistics instead and aggregate those."
              ]
            },
            [
              "skoldstrom-5",
              [
                "counters"
              ]
            ],
            [
              "skoldstrom-2",
              [
                "shared"
              ]
            ]
          ]
        },
        "1c": {
          "rating": "A 94",
          "short": "Flow and port statistics",
          "title": "Provides virtual flow entry and virtual port statistics.",
          "mapping": "The module gives the tenant both its virtual flow-entry statistics and its virtual port statistics, each from the hypervisor’s statistics replies.",
          "limit": "The conjunction of 1c1 and 1c2, rated at the lower of the two. Scored at W1.",
          "pinpoint": "R1(e) · Flo-v · Section 3.2, p. 92 · R9 · Section V, p. 5",
          "sourceViews": [
            [
              "flo-v-92",
              [
                "replier"
              ]
            ],
            [
              "skoldstrom-5",
              [
                "counters"
              ]
            ]
          ]
        },
        "1c1": {
          "rating": "A 95",
          "short": "Flow statistics",
          "title": "Virtual flow entry statistics for the tenant.",
          "mapping": "The hypervisor answers a tenant’s flow-statistics request with the counters of that tenant’s own entries, re-virtualized to the tenant’s cookie and match; Flo-v describes the same reply over the physical switches mapped to the requested virtual switch.",
          "limit": "Literal, at the cap W1 sets.",
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
          "rating": "A 94",
          "short": "Port statistics",
          "title": "Virtual port statistics based on the physical resource.",
          "mapping": "A virtual port’s statistics are the mapped physical port’s counters renumbered to the virtual port; on a shared port the design note and the ICC 2012 paper derive them from the flow entries forwarding to that port.",
          "limit": "Literal. The owner can argue that “based on the at least one physical resource” asks for the shared-branch computation; the patent’s own two branches settle it. Scored at W1.",
          "pinpoint": "R9 · ICC 2012 · Section V, p. 5",
          "sourceViews": [
            [
              "skoldstrom-5",
              [
                "counters"
              ]
            ]
          ]
        },
        "W1": {
          "rating": "A 95",
          "short": "Module reading",
          "title": "How “statistics virtualization module” is read.",
          "mapping": "Read with its ordinary meaning, as the chart argues. A tribunal may instead read “module” as a means-plus-function term, its structure then the two algorithms of the patent, which the combination follows.",
          "limit": "A claim-wide point that limitations 1a, 1b, 1c, 1c1 and 1c2 depend on.",
          "pinpoint": "Claim chart · Claim construction",
          "summary": true,
          "note": "W1 is the reading of the claim term the chart depends on. These original pages show the sources read under it.",
          "sourceViews": [
            [
              "flo-v-90",
              [
                "role"
              ]
            ],
            [
              "ovx-ons14-1",
              [
                "hypervisor"
              ]
            ]
          ]
        },
        "W2": {
          "rating": "A 97",
          "short": "One base",
          "title": "The OpenVirteX record read as one base.",
          "mapping": "The OpenVirteX papers, its 2014 documentation captures and its source code describe one hypervisor; Flo-v and a 2017 measurement paper describe its statistics handling in print, and the patent names OpenVirteX as its prior art.",
          "limit": "The owner can answer that code is not a printed publication and that the documents are separate references; the behaviour relied on is also in the dated publications. Counted once for the chart.",
          "pinpoint": "Claim chart · References",
          "summary": true,
          "note": "W2 is the treatment of the OpenVirteX record as one reference. These original pages show its printed publications.",
          "sourceViews": [
            [
              "ovx-ons14-1",
              [
                "hypervisor"
              ]
            ],
            [
              "flo-v-90",
              [
                "request"
              ]
            ]
          ]
        }
      }
    }
  ],
  "sol-ip-10090894": [
    {
      "caption": [
        "Sol IP · US 10,090,894 B2",
        "Claim 7 · Obviousness · C, hold 41"
      ],
      "assessed": "18 October 2026",
      "pointsNote": "W1 is the reading of the two signal fields and W2 the reading of the extended preamble as a training field; both are claim-wide points.",
      "staticNote": "The original page cited for the CRC in the service field is shown above.",
      "selected": "7f2",
      "limitations": {
        "7pre": {
          "rating": "A 98",
          "short": "Apparatus",
          "title": "An apparatus.",
          "mapping": "The radio of an IEEE 802.11n station: a host interface, a baseband processing module, memory, radio transmitters and antennas.",
          "limit": "Literal and in plain words; the date is undisputed.",
          "pinpoint": "Ref. 1 · US 2005/0181800 A1 · [0033] · FIG. 2",
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
          "rating": "A 98",
          "short": "Memory",
          "title": "A memory.",
          "mapping": "Memory 66, a single memory device or a plurality of memory devices.",
          "limit": "Literal and in plain words.",
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
          "rating": "A 97",
          "short": "Processor",
          "title": "A processor executing instructions from the memory.",
          "mapping": "The baseband processing module, with the operational instructions stored in memory, executes the digital transmitter functions, formats the frame and sends it through the transmitter section.",
          "limit": "A synonym of “processor”, no gap. The fields it generates and sends are rated at 7b1 to 7b5.",
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
          "rating": "B 85",
          "short": "VHT-SIG A",
          "title": "Generate a VHT-SIG A field.",
          "mapping": "Signal field 142 is the first signal field, common to every receiver: it tells legacy devices the frame’s duration and the newer devices the channel usage and the number of transmit antennas.",
          "limit": "Literal once the reading of the two signal fields holds; held to W1.",
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
          "rating": "B 85",
          "short": "VHT-SIG B",
          "title": "Generate a VHT-SIG B field.",
          "mapping": "Each additional signal field, one before each data unit, carries the rate, the length, the last-PSDU flag, the acknowledgement request and the error check for its own data unit.",
          "limit": "Literal once the reading holds; held to W1.",
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
          "rating": "A 96",
          "short": "Service field",
          "title": "Generate a service field.",
          "mapping": "Each data unit opens with the 802.11 Service field, and the transmitter scrambles the data; the Cisco patent’s prior-art figures show what that field holds.",
          "limit": "The owner can argue that the reference names the field without describing it; the 802.11 Service field it names settles that.",
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
          "rating": "A 97",
          "short": "Data unit",
          "title": "Generate a data unit.",
          "mapping": "The PSDU of each Service/PSDU unit, made of data symbols, whose length the additional signal field counts in bytes.",
          "limit": "Literal.",
          "pinpoint": "Ref. 1 · [0064] · FIG. 8",
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
          "rating": "B 85",
          "short": "Send VHT-SIG A",
          "title": "Transmit the VHT-SIG A field.",
          "mapping": "Signal field 142 is among the fields of the transmitted frame, which the transmitter section converts into outbound RF signals.",
          "limit": "Literal once signal field 142 is the VHT-SIG A field; held to W1.",
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
          "rating": "B 80",
          "short": "Training after A",
          "title": "A training field after the VHT-SIG A field.",
          "mapping": "The frame draws the signal field, then the extended preamble, whose format is the supplemental long training sequences drawn after the signal field.",
          "limit": "Literal once both readings hold: W1 and W2.",
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
          "rating": "B 80",
          "short": "B after training",
          "title": "The VHT-SIG B field after the training field.",
          "mapping": "The frame draws the extended preamble, then the first additional signal field; the supplemental long training sequences come before the high data signal field.",
          "limit": "Held to W1 and W2.",
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
          "rating": "B 85",
          "short": "Service after B",
          "title": "The service field after the VHT-SIG B field.",
          "mapping": "Each additional signal field is followed by its data unit, which opens with the Service field.",
          "limit": "Literal once the reading holds; held to W1.",
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
          "rating": "A 95",
          "short": "Data after service",
          "title": "The data unit after the service field.",
          "mapping": "In both references the PSDU follows the SERVICE field: the Cisco patent’s SIGNAL field, then the SERVICE field, then the remainder of the payload, the PSDU.",
          "limit": "The owner can argue that the slash states no order; the 802.11 frame both references describe settles it.",
          "pinpoint": "Ref. 1 · [0065] · Ref. 2 · Column 5, lines 42–46",
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
          "rating": "B 85",
          "short": "Length and tail",
          "title": "Length bits and tail bits in the VHT-SIG B field.",
          "mapping": "Each additional signal field carries a 12-bit length counting bytes of PSDU, and every coding option appends tail bits.",
          "limit": "Literal once the reading holds; held to W1.",
          "pinpoint": "Ref. 1 · [0069], [0072]–[0074]",
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
          "rating": "C 63",
          "short": "Scrambler and CRC",
          "title": "Scrambler bits and CRC bits in the service field.",
          "mapping": "The Cisco patent’s SERVICE field holds the seven scrambler-initialization bits and, in its unused bits, a polynomial (CRC) check sequence protecting the SIGNAL field.",
          "limit": "The weakest limitation. The reference is literal; the open point is the reason to put that check into the first reference’s frame, stated in the art but live against the first reference’s own 4-bit CRC in each signal field and the check protecting the legacy signal field rather than a second one.",
          "pinpoint": "Ref. 2 · US 7,231,530 B1 · Column 9, lines 41–44",
          "sourceViews": [
            [
              "cisco-530-15",
              [
                "crc"
              ]
            ]
          ]
        },
        "W1": {
          "rating": "B 85",
          "short": "Signal fields",
          "title": "How the two signal fields are read.",
          "mapping": "VHT-SIG A and VHT-SIG B read as the patent defines them, a field of information common to every user frame and one of information required for each user, and the first reference’s signal field and additional signal fields as those fields.",
          "limit": "The owner’s attacks: the 802.11ac names, the reading as the common and per-user fields of a multi-user transmission, the signal field as the legacy SIGNAL field, and the additional signal fields as burst headers. Seven limitations depend on this point.",
          "pinpoint": "Claim chart · Claim construction",
          "summary": true,
          "note": "W1 is the reading of the two signal fields the chart depends on. These original pages show the fields read under it.",
          "sourceViews": [
            [
              "broadcom-800-16",
              [
                "first",
                "additional"
              ]
            ]
          ]
        },
        "W2": {
          "rating": "A 95",
          "short": "Training field",
          "title": "The extended preamble as a training field.",
          "mapping": "The reference does not call its extended preamble a training field, but gives it the format whose cells after the signal field are the supplemental long training sequences.",
          "limit": "“After” in claim 7 is not “immediately after”, so a MAC cell in one figure changes nothing. Limitations 7c and 7d depend on this point.",
          "pinpoint": "Claim chart · Claim construction",
          "summary": true,
          "note": "W2 is the reading of the extended preamble as a training field. This original page shows the format it takes.",
          "sourceViews": [
            [
              "broadcom-800-16",
              [
                "format"
              ]
            ]
          ]
        }
      }
    }
  ],
  "cyboenergy-9331489": [
    {
      "caption": [
        "CyboEnergy · US 9,331,489 B2",
        "Claim 14 · Obviousness · C, hold 41"
      ],
      "assessed": "18 October 2026",
      "pointsNote": "P1 is the reason to combine, a claim-wide point. The chart labels claim 14’s preamble 1pre.",
      "staticNote": "The original page cited for the switch of the supply onto the solar input is shown above.",
      "selected": "14e",
      "limitations": {
        "1pre": {
          "rating": "A 97",
          "short": "Preamble",
          "title": "A multi-channel solar power inverter.",
          "mapping": "Morishima’s photovoltaic inverter converts DC to AC with several solar cell assemblies as inputs: three strings in the embodiment, each through its own boost chopper in one housing.",
          "limit": "Literal and in plain words. The Japanese original has no public copy; the English print is quoted.",
          "pinpoint": "Morishima · JP 2001-255949 A · [0001], [0030] · English print p. 1 and p. 3",
          "sourceViews": [
            {
              "reference": "Morishima",
              "document": "Morishima, JP 2001-255949 A (Toshiba)",
              "edition": "Japanese patent application publication · Photovoltaic power generation inverter device · 21 September 2001 · quoted from the English machine-translation print",
              "pageLabel": "Print page 1",
              "citation": "JP 2001-255949 A, Print page 1 (English print of the Japanese original)",
              "quotes": [
                "The present invention relates to a photovoltaic power generation inverter device that performs a DC-AC power conversion operation by using a plurality of solar cell assemblies as inputs."
              ]
            }
          ]
        },
        "14a": {
          "rating": "A 94",
          "short": "Input channels",
          "title": "At least two DC input channels with boost converters and measurement circuits.",
          "mapping": "Each string is one input channel: its own pair of input terminals, its own boost chopper, a voltage detector and a current detector, and its own chopper control circuit.",
          "limit": "Morishima names neither cables nor connectors; its own text settles both, the input terminals being the connectors and the wiring from the roof-mounted strings the cable. Narrow.",
          "pinpoint": "Morishima · [0028], [0030]–[0033] · English print p. 3–4",
          "sourceViews": [
            {
              "reference": "Morishima",
              "document": "Morishima, JP 2001-255949 A (Toshiba)",
              "edition": "Japanese patent application publication · Photovoltaic power generation inverter device · 21 September 2001 · quoted from the English machine-translation print",
              "pageLabel": "Print page 3",
              "citation": "JP 2001-255949 A, Print page 3 (English print of the Japanese original)",
              "quotes": [
                "Each input terminal (33a, 33b), (33c, 33d) and (33e, 33f) are connected to the positive and negative output terminals of the solar cell strings 35, 36, 37, respectively.",
                "three boost chopper circuits 39a, 39b, 39c (corresponding to the DC power conversion circuit of the present invention) having the same circuit configuration and provided between the output terminals (34p, 34n) in one housing."
              ]
            }
          ]
        },
        "14b": {
          "rating": "A 97",
          "short": "AC output",
          "title": "An AC output port to the grid.",
          "mapping": "The full-bridge inverter’s AC output runs through a filter and a breaker to the power system, with a switch connecting it to that system.",
          "limit": "Literal and in plain words.",
          "pinpoint": "Morishima · [0027], [0036] · English print p. 3–4",
          "sourceViews": [
            {
              "reference": "Morishima",
              "document": "Morishima, JP 2001-255949 A (Toshiba)",
              "edition": "Japanese patent application publication · Photovoltaic power generation inverter device · 21 September 2001 · quoted from the English machine-translation print",
              "pageLabel": "Print page 3",
              "citation": "JP 2001-255949 A, Print page 3 (English print of the Japanese original)",
              "quotes": [
                "Although not shown, a switch for connecting the AC output of the photovoltaic power generation inverter device 21 to an AC power supply 32 which is a power system is provided."
              ]
            }
          ]
        },
        "14c": {
          "rating": "A 96",
          "short": "DC combiner",
          "title": "A DC power combiner joining the boost converters.",
          "mapping": "All three choppers sit between their input terminals and one pair of output terminals, which the DC lines and a capacitor join to the inverter’s input: a supply circuit with multiple inputs and one output.",
          "limit": "The owner can argue “combiner”, a word Morishima does not use; its own description, every chopper’s output joined into one output, settles it.",
          "pinpoint": "Morishima · [0028], [0030], [0035] · English print p. 3–4",
          "sourceViews": [
            {
              "reference": "Morishima",
              "document": "Morishima, JP 2001-255949 A (Toshiba)",
              "edition": "Japanese patent application publication · Photovoltaic power generation inverter device · 21 September 2001 · quoted from the English machine-translation print",
              "pageLabel": "Print page 3",
              "citation": "JP 2001-255949 A, Print page 3 (English print of the Japanese original)",
              "quotes": [
                "Thus, the modularized DC power supply circuit 22 with multiple inputs and one output can be replaced as appropriate according to the number of solar cell strings connected to the solar power generation inverter device 21."
              ]
            }
          ]
        },
        "14d": {
          "rating": "B 82",
          "short": "Microcontroller",
          "title": "A microcontroller computing each channel’s power and choosing the mode.",
          "mapping": "Morishima’s microcomputer receives each string’s measured voltage and current and computes each string’s power; Fornage’s microcontroller compares the computed input power with a power threshold and runs one power stage below it, the interleaved mode above it.",
          "limit": "Rests on P1. Narrow open points: Fornage names its modes by topology, not “low power mode”, and Morishima’s string power multiplies the voltage by the reference current its loop holds the measured current to.",
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
          "rating": "C 50",
          "short": "DC supply",
          "title": "A DC power supply fed from the channels, switched to a dedicated channel at low power.",
          "mapping": "Müller feeds the on-board supply from the common DC link as well as the input links; Morishima’s supply powers the control circuit; Suekane’s controller computes the panel’s DC power and, below a predetermined value, switches its own supply onto the solar input.",
          "limit": "The weakest limitation. The owner’s reading that the dedicated channel’s power must pass through the combiner is colourable, and Suekane’s own preference is a teaching-away argument; carried into Morishima’s microcomputer with Fornage’s threshold as the value, on P1.",
          "pinpoint": "Suekane · US 2011/0169344 A1 · [0008], [0046] · Claim 1 · Müller · WO 2011/107555 A1 · p. 10, lines 3–4",
          "sourceViews": [
            [
              "muller-555-10",
              [
                "links",
                "controller"
              ]
            ],
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
            ],
            {
              "reference": "Morishima",
              "document": "Morishima, JP 2001-255949 A (Toshiba)",
              "edition": "Japanese patent application publication · Photovoltaic power generation inverter device · 21 September 2001 · quoted from the English machine-translation print",
              "pageLabel": "Print page 6",
              "citation": "JP 2001-255949 A, Print page 6 (English print of the Japanese original)",
              "quotes": [
                "even when the output voltage of the solar cell strings 35, 36, and 37 is entirely reduced, such as in the morning and evening or on cloudy days, the control power supply circuit 28 secures a high input voltage"
              ]
            }
          ]
        },
        "P1": {
          "rating": "B 85",
          "short": "Combination",
          "title": "Why combine the references?",
          "mapping": "Fornage’s test of the computed input power against a power threshold, put into Morishima’s microcomputer, which already computes each string’s power and their sum: two grid-tied solar inverters of the same field, the reason stated in both.",
          "limit": "Limitation 14d takes its low-power mode from this point and 14e its predetermined value.",
          "pinpoint": "Claim chart · Combination rationale",
          "summary": true,
          "note": "P1 is the researcher’s combination rationale. These original pages show its cited sources.",
          "sourceViews": [
            [
              "fornage-412-12",
              [
                "threshold"
              ]
            ],
            {
              "reference": "Morishima",
              "document": "Morishima, JP 2001-255949 A (Toshiba)",
              "edition": "Japanese patent application publication · Photovoltaic power generation inverter device · 21 September 2001 · quoted from the English machine-translation print",
              "pageLabel": "Print page 6",
              "citation": "JP 2001-255949 A, Print page 6 (English print of the Japanese original)",
              "quotes": [
                "even when the output voltage of the solar cell strings 35, 36, and 37 is entirely reduced, such as in the morning and evening or on cloudy days, the control power supply circuit 28 secures a high input voltage"
              ]
            }
          ]
        }
      }
    }
  ],
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
      "verdict": "Filed with the submission on 9 October 2026 as the backup ground for limitation 1a, for the reading in which a respective DC power source must be an energy source such as a photovoltaic array. The re-score of 19 October 2026 rates this ground C, hold 62, its weakest limitation 1a at C 71; it stands below the anticipation unless that reading is adopted.",
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
  }
};
