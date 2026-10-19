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
          "pinpoint": "R1(b) · OpenVirteX, ONS 2014 · p. 1 · R1(a) · HotSDN 2014 · p. 25",
          "sourceViews": [
            [
              "ovx-ons14-1",
              [
                "hypervisor"
              ]
            ],
            [
              "ovx-hotsdn-25",
              [
                "platform",
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
            ],
            [
              "ovx-components-7",
              [
                "flowStats",
                "portStats"
              ]
            ],
            [
              "ovx-port-stats-2",
              [
                "devirtualize"
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
            [
              "delftvisor-design-13",
              [
                "shared"
              ]
            ],
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
            ],
            [
              "ovx-components-9",
              [
                "portMap"
              ]
            ],
            [
              "ovx-physical-port-6",
              [
                "virtualPorts"
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
            ],
            [
              "ovx-flow-stats-3",
              [
                "reps"
              ]
            ],
            [
              "ovx-port-stats-2",
              [
                "portStat"
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
            ],
            [
              "ovx-flow-stats-3",
              [
                "reps"
              ]
            ],
            [
              "ovx-components-7",
              [
                "flowStats"
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
            ],
            [
              "ovx-port-stats-2",
              [
                "portStat",
                "index"
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
        "Claim 7 · Obviousness · C, hold 38"
      ],
      "assessed": "18 October 2026",
      "pointsNote": "W1 is the reading of the two signal fields and W2 the reading of the extended preamble as a training field; both are claim-wide points. Limitations 7f and 7f2 each rest on their own reason to combine the second reference, scored in their own rows.",
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
          "rating": "B 88",
          "short": "Data after service",
          "title": "The data unit after the service field.",
          "mapping": "The first reference names its data units after the 802.11 fields, Service and PSDU, in no stated order. The Cisco patent states the order in the 802.11 frame it labels prior art: the SIGNAL field, then the SERVICE field, then the remainder of the payload, the PSDU.",
          "limit": "A partner’s literal disclosure, combined for a reason stated in the art: the first reference builds its 802.11n frame on the 802.11a/g frame, and the Cisco patent applies to OFDM 802.11 formats “or derivatives thereof”. The reason is its own open point, reading the first reference’s units in the order of the 802.11 frame, rated 88. The owner’s answer, that the slash states no order and the burst is its own format, is a reading dispute, not a teaching-away. Not A: the first reference does not state the order.",
          "pinpoint": "Ref. 1 · [0065], [0059]–[0060] · Ref. 2 · FIG. 2A–2B · Column 5, lines 42–46 and 23–25",
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
  "sol-ip-9900067": [
    {
      "caption": [
        "Sol IP · US 9,900,067 B2",
        "Claim 38 · Obviousness · C, hold 22"
      ],
      "assessed": "18 October 2026",
      "pointsNote": "P1 is the reason to combine and P2 the reading of “subsequent to”; both are claim-wide points.",
      "staticNote": "The original pages cited for the sizing of the length field are shown above.",
      "selected": "38h",
      "limitations": {
        "38pre": {
          "rating": "A 97",
          "short": "Preamble",
          "title": "A communication device.",
          "mapping": "Airgo’s extended transmitter, which sends the multi-channel packets, is the device; Broadcom’s 802.11n transceiver and Syafei’s four-stream 80 MHz transmitter are the same kind of device.",
          "limit": "Literal and in plain words.",
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
          "rating": "B 87",
          "short": "Processor",
          "title": "A processor.",
          "mapping": "Airgo’s charted text names no processor. Broadcom’s transceiver comprises a processor, and its MIMO transmitter a processor and a memory: two 802.11n transceivers of the same field.",
          "limit": "Literal in the combined references; rests on P1, the reason to build Airgo’s packets on the Broadcom transceivers.",
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
          "rating": "B 78",
          "short": "Memory",
          "title": "A memory storing the program instructions.",
          "mapping": "Broadcom’s memory stores and retrieves data and code, and its computer program, when loaded and executed, controls the system so that it carries out the methods described: both transceivers run their physical layer from code in memory.",
          "limit": "Three references for a generic limitation: each text is partial alone, and neither says that the memory holds the instructions that make the device send the two control fields. Rests on P1.",
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
          "rating": "A 95",
          "short": "First control field",
          "title": "A first control field over a band that is a multiple of 20 MHz.",
          "mapping": "Airgo’s extended packets use multiple 20 MHz channels, 40, 60, 80 or 100 MHz, and the transmitter sends an identical copy of the preamble and signal field in each 20 MHz channel: the legacy signal field is a first control field over a band of 40 to 100 MHz.",
          "limit": "Literal. The owner can argue that “a first frequency band” is one channel, not several 20 MHz channels; Airgo’s own “40, 60, 80, or 100 MHz channels” settles it, and Syafei’s single 80 MHz channel backs it.",
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
          "rating": "B 86",
          "short": "Second control field",
          "title": "A second control field over the same band.",
          "mapping": "Syafei sends the VHT-SIG, a second signal field of 48 bits, right after the HT-SIG on the same 80 MHz channel; Airgo draws its extended signal field after the legacy one, and Broadcom’s HT-SIG after the L-SIG is the same structure at 20 or 40 MHz.",
          "limit": "Literal in the combined reference; rests on P1. Airgo alone ties its second field to the 40–100 MHz packets only through the copy of the preamble and signal field in each 20 MHz channel, an inference the owner can contest.",
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
          "rating": "A 93",
          "short": "Length indicator",
          "title": "A first indicator of the length of the user data that follows.",
          "mapping": "Airgo’s modified signal field gives 16 of its 48 bits to the length; the 802.11n second signal fields carry the PSDU length the same way, and Syafei’s VHT-SIG1 gives 17 of its 24 bits to the length of the data that follows.",
          "limit": "Literal. Open point: Airgo’s drawn field is tied to its extended signal field by description, not by numeral, which the reference’s own words settle.",
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
          "rating": "C 68",
          "short": "Reserved bits",
          "title": "Reserved bits after the length indicator.",
          "mapping": "Airgo’s field has three reserved bits after the 16-bit length, with the one-bit last-PSDU flag between; Syafei’s VHT-SIG and the Broadcom and Sony 802.11n layouts keep the same order.",
          "limit": "Literal under the plain reading of “subsequent to”, after rather than immediately after; rests on P2. Under “immediately subsequent” no layout before the date meets it.",
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
          "rating": "C 68",
          "short": "Tail bits",
          "title": "Tail bits after the reserved bits.",
          "mapping": "Airgo’s six tail bits come after the reserved bits with the CRC between them; every charted signal field, Syafei’s included, ends in the six convolutional tail bits in that order.",
          "limit": "Literal under the plain reading; rests on P2. The text lists the fields adjacent and the drawing is decisive; under “immediately subsequent” none meets it.",
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
          "rating": "C 52",
          "short": "Fewer bits at 40 MHz",
          "title": "Fewer length bits at 40 MHz than at a wider band.",
          "mapping": "No document before the contest date gives one WLAN length field fewer bits at 40 MHz than above it. NEC’s LTE-Advanced proposal evaluates the sizing rule at the claim’s own bandwidths, 15 bits at 40 MHz against 16, 17 and 18 above it; Nokia Siemens and 3GPP state the rule in WiMAX and UTRA control fields; Syafei gives the WLAN reason and the 802.11 standard its own precedent.",
          "limit": "The weakest limitation, a coin flip: an obviousness argument across standards. The rule references outside WLAN meet the owner’s analogous-art replies, the WLAN art of the time kept the field fixed, and the step is an inferred multi-reference combination.",
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
        },
        "P1": {
          "rating": "B 88",
          "short": "Combination",
          "title": "Why combine the references?",
          "mapping": "The reason to build Airgo’s 40–100 MHz packets on the 802.11n transceivers and second-signal-field layouts of Broadcom and Sony, and with Syafei’s two signal fields, is stated in the art of one field: Airgo names its second field an “11n Signal Field”, Syafei keeps the HT-SIG for backward compatibility with 802.11n, and all are dated before the contest date.",
          "limit": "Limitations 38a, 38b and 38d rest on this point; the owner’s answer is hindsight.",
          "pinpoint": "Claim chart · Combination rationale",
          "summary": true,
          "note": "P1 is the researcher’s combination rationale. These original pages show its cited sources.",
          "sourceViews": [
            [
              "airgo-474-22",
              [
                "bits"
              ]
            ],
            [
              "broadcom-017-15",
              [
                "transceiver"
              ]
            ]
          ]
        },
        "P2": {
          "rating": "C 70",
          "short": "“Subsequent to”",
          "title": "How “subsequent to” is read.",
          "mapping": "Read by its plain meaning, after rather than immediately after: claim 38 does not say “immediately”, and the applicant wrote “in order” and “consists of” where it wanted sequence and size. Under “immediately subsequent” every layout before the date fails, with a last-PSDU bit between the length and the reserved bits and the CRC between the reserved bits and the tail.",
          "limit": "Limitations 38f and 38g rest on this point. The owner’s reading is colourable: the patent’s own field puts length, reserved and tail bits side by side because it moves the CRC to the service field, a choice claim 38 does not recite.",
          "pinpoint": "Claim chart · Claim construction",
          "summary": true,
          "note": "P2 is the reading of “subsequent to” that limitations 38f and 38g depend on. This original page shows the layout read under it.",
          "sourceViews": [
            [
              "airgo-474-22",
              [
                "reserved",
                "tail"
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
      "pointsNote": "P1 is the reason to combine, a claim-wide point.",
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
            [
              "morishima-949-1",
              [
                "field"
              ]
            ]
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
            [
              "morishima-949-3",
              [
                "terminals",
                "choppers"
              ]
            ]
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
            [
              "morishima-949-3",
              [
                "switch"
              ]
            ]
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
            [
              "morishima-949-3",
              [
                "modular"
              ]
            ]
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
            [
              "morishima-949-6",
              [
                "secures"
              ]
            ]
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
            [
              "morishima-949-6",
              [
                "secures"
              ]
            ]
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
    },
    {
      "label": "Alternative ground B",
      "title": "Anticipation by US 7,453,235 B2 (Liebert), the power measurement technique of its FIG. 13",
      "references": [
        {
          "title": "US 7,453,235 B2 (Blair et al., Liebert Corporation)",
          "url": "https://patents.google.com/patent/US7453235B2/en"
        }
      ],
      "verdict": "Recorded as arguable, on its strong side: every limitation is met by the FIG. 13 embodiment in one reference. It ranks below the submitted ground because the reference measures the total output power by multiplying the output voltage and current rather than naming the total voltage and total current, because its claim 5 and FIG. 13 let the owner argue that the total is a sum of per-module powers, and because the embodiment is one paragraph, a figure and a claim.",
      "limitations": [
        {
          "id": "1pre",
          "text": "An apparatus to deliver alternating current (AC) power, the apparatus comprising:",
          "quote": "The modular design provides expandability and redundancy. Frame 1 can accommodate multiple power modules.",
          "pinpoint": "US 7,453,235 B2 · Column 2, lines 22–30 · FIG. 1",
          "pageId": "liebert-235-24",
          "fragmentIds": [
            "modular"
          ],
          "note": "A modular uninterruptible power supply that provides continuous AC power to workstations, servers and telecommunications equipment."
        },
        {
          "id": "1a",
          "text": "A plurality of inverters configured to receive DC power from a respective DC power source and respectively provide AC power to an AC load.",
          "quote": "The power modules 4 receive AC power from the utility input 7 and convert it to DC power, which is used to charge the batteries",
          "pinpoint": "US 7,453,235 B2 · Column 3, lines 28–32 · FIG. 2",
          "pageId": "liebert-235-25",
          "fragmentIds": [
            "modules"
          ],
          "note": "The sentence continues: the DC power also powers the power modules’ inverters, which produce stable, regulated AC power for the critical load at output 8."
        },
        {
          "id": "1b",
          "text": "A primary controller configured to generate a primary control signal based on total AC current and total AC voltage being delivered to the AC load by the plurality of inverters.",
          "quote": "then determines the appropriate output per module and sends instructions to modules, which adjust their individual outputs accordingly.",
          "pinpoint": "US 7,453,235 B2 · Column 7, lines 26–37 · FIG. 13",
          "pageId": "liebert-235-27",
          "fragmentIds": [
            "power"
          ],
          "note": "The passage begins: using the power measurement technique, the total UPS output power is measured by the main controller 100, by multiplying the output voltage and current; the controller, in communication with the other modules over the CAN interface, then determines the output per module."
        },
        {
          "id": "1c",
          "text": "A plurality of secondary controllers configured to each receive the primary control signal and produce a respective secondary control signal that controls a corresponding one of the inverters.",
          "quote": "The power module control system is schematically depicted in FIG. 4. The primary control element is controller 100",
          "pinpoint": "US 7,453,235 B2 · Column 5, lines 38–43 · FIG. 4",
          "pageId": "liebert-235-26",
          "fragmentIds": [
            "controller"
          ],
          "note": "Each power module has its own controller 100, which senses the module’s parameters, communicates over its CAN controller and produces the module’s PWM."
        }
      ]
    },
    {
      "label": "Alternative ground C",
      "title": "Obviousness over US 7,485,987 B2 (Mitsubishi Electric) in view of WO 2009/087063 A1 (ABB) or US 2008/0218320 A1 (LS Industrial)",
      "references": [
        {
          "title": "US 7,485,987 B2 (Mitsubishi Electric)",
          "url": "https://patents.google.com/patent/US7485987B2/en"
        },
        {
          "title": "WO 2009/087063 A1 (ABB), published in the United States as US 2011/0222323 A1",
          "url": "https://patents.google.com/patent/US20110222323A1/en"
        },
        {
          "title": "US 2008/0218320 A1 (LS Industrial Systems)",
          "url": "https://patents.google.com/patent/US20080218320A1/en"
        }
      ],
      "verdict": "Recorded as arguable. The ground meets the owner’s narrowest readings at once: the DC sources are separate energy sources, the inverters are series-connected cells like the patent’s own embodiment, and the load is the power system. Its gap is limitation 1c, since Mitsubishi gates every cell from one central circuit, so the per-cell controllers come from ABB or LS with the motivation stated in those references. It is rated arguable rather than strong because Mitsubishi’s control is a staircase scheme rather than pulse-width modulation, and because its third embodiment is given a reference AC voltage instead of the source voltage.",
      "limitations": [
        {
          "id": "1pre",
          "text": "An apparatus to deliver alternating current (AC) power, the apparatus comprising:",
          "quote": "a power converting device of a third embodiment described below is used as a system interconnection inverter for converting DC power fed from a DC power source into AC power and thereby connecting the DC power source to a power system.",
          "pinpoint": "US 7,485,987 B2 · Column 13, lines 9–13 · FIG. 13",
          "pageId": "mitsubishi-987-23",
          "fragmentIds": [
            "inverter"
          ]
        },
        {
          "id": "1a",
          "text": "A plurality of inverters configured to receive DC power from a respective DC power source and respectively provide AC power to an AC load.",
          "quote": "The single-phase inverters 4 each have an independent DC power supply 6 and output terminals 91, 92 from which a voltage of the DC power supply 6 is output during a desired period of time",
          "pinpoint": "US 7,485,987 B2 · Column 3, lines 44–47 · FIG. 2",
          "pageId": "mitsubishi-987-18",
          "fragmentIds": [
            "supply"
          ]
        },
        {
          "id": "1b",
          "text": "A primary controller configured to generate a primary control signal based on total AC current and total AC voltage being delivered to the AC load by the plurality of inverters.",
          "quote": "designated by the numeral 10 is a CPU, and designated by the numeral 60a are peripheral circuits of the CPU 10.",
          "pinpoint": "US 7,485,987 B2 · Column 13, lines 25–31 · FIG. 13",
          "pageId": "mitsubishi-987-23",
          "fragmentIds": [
            "cpu"
          ],
          "note": "The same sentence names current sensor 11a and voltage sensor 11d on the output; the CPU and its peripheral circuits together constitute the inverter driving circuit, which serves as the control device."
        },
        {
          "id": "1c",
          "text": "A plurality of secondary controllers configured to each receive the primary control signal and produce a respective secondary control signal that controls a corresponding one of the inverters.",
          "quote": "The basic principle of this control method is to perform switching of the submodules according to a pulsewidth modulation (PWM) in a distributed manner rather than in a centralized manner",
          "pinpoint": "US 2011/0222323 A1 · [0012] · WO 2009/087063 A1 · page 3, lines 23–26",
          "pageId": "abb-323-7",
          "fragmentIds": [
            "distributed"
          ],
          "note": "Mitsubishi’s inverter control processing circuit generates the control signals for every cell in one place; ABB’s distributed modulation gives each submodule its own control unit, which applies the central reference voltage and carrier with its own delay and correction."
        }
      ]
    },
    {
      "label": "Alternative ground C′",
      "title": "Obviousness over Filho, Cao and Tolbert, IEEE APEC 2010, in view of WO 2009/087063 A1 (ABB)",
      "references": [
        {
          "title": "F. Filho, Y. Cao and L. M. Tolbert, “11-level cascaded H-bridge grid-tied inverter interface with solar panels”, IEEE APEC 2010"
        },
        {
          "title": "WO 2009/087063 A1 (ABB), published in the United States as US 2011/0222323 A1",
          "url": "https://patents.google.com/patent/US20110222323A1/en"
        }
      ],
      "verdict": "Recorded as arguable, with a date caveat. The paper is the patent’s own architecture, one solar panel per series H-bridge, grid-tied, with a control block fed by the grid voltage and the inverter output current and voltage, published nine months before the critical date. It is prior art under § 102(a) only, so the owner may try to antedate it; it is not an inventor publication, so no grace-period exception applies.",
      "limitations": [
        {
          "id": "1pre and 1a",
          "text": "The apparatus and its inverters, each fed by a respective DC power source.",
          "quote": "This paper presents a single-phase 11-level (5 H-bridges) cascade multilevel DC-AC grid-tied inverter. Each inverter bridge is connected to a 200 W solar panel.",
          "pinpoint": "Filho, Cao and Tolbert, APEC 2010 · p. 1, Abstract"
        },
        {
          "id": "1b",
          "text": "A primary controller configured to generate a primary control signal based on total AC current and total AC voltage being delivered to the AC load by the plurality of inverters.",
          "quote": "The MPPT and grid synchronization algorithm are fed by output and voltage current signals to generate the gate driver signals as shown in Fig. 2.",
          "pinpoint": "Filho, Cao and Tolbert, APEC 2010 · p. 1, Section II · Fig. 2"
        },
        {
          "id": "1c",
          "text": "A plurality of secondary controllers configured to each receive the primary control signal and produce a respective secondary control signal that controls a corresponding one of the inverters.",
          "quote": "The basic principle of this control method is to perform switching of the submodules according to a pulsewidth modulation (PWM) in a distributed manner rather than in a centralized manner",
          "pinpoint": "US 2011/0222323 A1 · [0012] · WO 2009/087063 A1 · page 3, lines 23–26",
          "pageId": "abb-323-7",
          "fragmentIds": [
            "distributed"
          ],
          "note": "The paper generates all five modulation sets in one controller; ABB supplies a control unit per cell, each applying the central reference and carrier."
        }
      ]
    },
    {
      "label": "Alternative ground D",
      "title": "Obviousness over US 2010/0057267 A1 (General Electric) in view of US 2010/0067271 A1 (General Electric)",
      "references": [
        {
          "title": "US 2010/0057267 A1 (Liu, Garces and Bose, General Electric)",
          "url": "https://patents.google.com/patent/US20100057267A1/en"
        },
        {
          "title": "US 2010/0067271 A1 (Garces, Liu, deRooij and Bose, General Electric)",
          "url": "https://patents.google.com/patent/US20100067271A1/en"
        }
      ],
      "verdict": "Recorded as arguable. It serves if the owner insists that the DC sources must be photovoltaic and attacks the ramp-rate reference’s “collective power output” as not being the total AC current and total AC voltage: the second GE publication supplies that sensing in so many words and sends one reactive power command to each inverter’s modulation controller, and the first supplies the broadcast command and the per-subsystem controllers.",
      "limitations": [
        {
          "id": "1pre and 1a",
          "text": "The apparatus and its inverters, each fed by a photovoltaic module.",
          "quote": "In the illustrated embodiment, the inverters 14 and 16 are coupled together to form a first phase A (18), a second phase B (20), and a third phase C (22).",
          "pinpoint": "US 2010/0067271 A1 · [0018], [0019] · FIG. 1",
          "pageId": "ge-271-6",
          "fragmentIds": [
            "modules"
          ],
          "note": "The distributed solar power generation system includes multiple photovoltaic modules, each coupled to one or more inverters."
        },
        {
          "id": "1b",
          "text": "A primary controller configured to generate a primary control signal based on total AC current and total AC voltage being delivered to the AC load by the plurality of inverters.",
          "quote": "In another embodiment, the sensing device 34 may be a current transformer configured to sense overall load current from all three phases at node 24.",
          "pinpoint": "US 2010/0067271 A1 · [0020] · FIG. 1",
          "pageId": "ge-271-6",
          "fragmentIds": [
            "sensing"
          ]
        },
        {
          "id": "1c",
          "text": "A plurality of secondary controllers configured to each receive the primary control signal and produce a respective secondary control signal that controls a corresponding one of the inverters.",
          "quote": "Further, inverters may include pulse width modulators and control circuitry configured to receive reactive power commands.",
          "pinpoint": "US 2010/0067271 A1 · [0021]",
          "pageId": "ge-271-6",
          "fragmentIds": [
            "pwm"
          ],
          "note": "US 2010/0057267 A1 adds the adaptive controller of each subsystem, which determines the power level command of its own inverter from the central ramp-rate command ([0035], [0044])."
        }
      ]
    },
    {
      "label": "Alternative ground E",
      "title": "Anticipation by US 7,499,297 B2 (ABB Schweiz), the distributed control of its FIG. 3",
      "references": [
        {
          "title": "US 7,499,297 B2 (Stulz et al., ABB Schweiz)",
          "url": "https://patents.google.com/patent/US7499297B2/en"
        }
      ],
      "verdict": "Recorded as arguable, on its strong side. Every limitation is met by the FIG. 3 embodiment in one reference, with one voltage reference to every local controller and per-inverter switching signals in so many words. It ranks below the submitted ground because the higher-order controller is fed the three phase currents and, through an observer, the phase voltages rather than a quantity the reference calls a total, because the controller paragraph says “preferably”, and because the apparatus is a motor drive.",
      "limitations": [
        {
          "id": "1pre",
          "text": "An apparatus to deliver alternating current (AC) power, the apparatus comprising:",
          "quote": "Polyphase converter circuits relating to the field of power electronics are disclosed.",
          "pinpoint": "US 7,499,297 B2 · Column 1, lines 17–18",
          "pageId": "abb-297-10",
          "fragmentIds": [
            "field"
          ]
        },
        {
          "id": "1a",
          "text": "A plurality of inverters configured to receive DC power from a respective DC power source and respectively provide AC power to an AC load.",
          "quote": "each converter circuit element 1 having a rectifier unit 2, a DC voltage circuit 3 which is connected to the rectifier unit 2 and an inverter unit 4",
          "pinpoint": "US 7,499,297 B2 · Column 3, lines 55–60 · FIG. 2",
          "pageId": "abb-297-11",
          "fragmentIds": [
            "element"
          ],
          "note": "A converter circuit element for each phase, its inverter unit fed from its own DC voltage circuit."
        },
        {
          "id": "1b",
          "text": "A primary controller configured to generate a primary control signal based on total AC current and total AC voltage being delivered to the AC load by the plurality of inverters.",
          "quote": "Furthermore, a higher-order controller unit 21 is provided which is connected to each local controller unit 20.",
          "pinpoint": "US 7,499,297 B2 · Column 8, line 62 to column 9, line 9 · FIG. 3",
          "pageId": "abb-297-13",
          "fragmentIds": [
            "higher"
          ],
          "note": "The higher-order controller unit is fed the phase currents and, through an observer, the phase voltages; a voltage reference value at its output is fed to each local controller unit."
        },
        {
          "id": "1c",
          "text": "A plurality of secondary controllers configured to each receive the primary control signal and produce a respective secondary control signal that controls a corresponding one of the inverters.",
          "quote": "In the exemplary converter circuit shown in FIG. 3, each inverter unit 4 has an associated local controller unit 20, drivable power semiconductor switches S1, S2, S3, S4, S5, S6 of the inverter unit 4 being connected to the associated local controller unit 20.",
          "pinpoint": "US 7,499,297 B2 · Column 8, lines 58–62 · FIG. 3",
          "pageId": "abb-297-13",
          "fragmentIds": [
            "local"
          ]
        }
      ]
    },
    {
      "label": "Alternative ground F",
      "title": "Anticipation by JP 2006-320149 A (Nippon Oil), master controller 32 and slave power conditioners 31",
      "references": [
        {
          "title": "JP 2006-320149 A (Mizuno, Takaesu and Ishii, Nippon Oil)",
          "url": "https://patents.google.com/patent/JP2006320149A/en"
        }
      ],
      "verdict": "Recorded as arguable. One reference, one inverter per solar cell string, a master controller whose voltage and current sensors sit on the common AC line, and control signals to every slave’s own controller. It ranks below the submitted ground because its primary control signal is a command to operate, stop or change the active and reactive power rather than a modulation reference, and because the chart quotes a Japanese original with the researcher’s translation.",
      "limitations": [
        {
          "id": "1pre and 1a",
          "text": "The apparatus and its inverters, each fed by a distributed power source.",
          "quote": "分散電源からの電力を受けて交流電力を出力する複数のパワーコンディショナと",
          "translation": "a plurality of power conditioners that receive power from distributed power sources and output AC power",
          "pinpoint": "JP 2006-320149 A · Claim 1",
          "pageId": "nippon-149-2",
          "fragmentIds": [
            "claim"
          ],
          "note": "A distributed power source system used interconnected with the grid, whose power conditioners’ AC outputs are connected in parallel under a master controller."
        },
        {
          "id": "1b",
          "text": "A primary controller configured to generate a primary control signal based on total AC current and total AC voltage being delivered to the AC load by the plurality of inverters.",
          "quote": "マスタコントローラ３２は、並列接続点Ａと配電盤１３との間の交流電力線３４での各 線間の電圧を計測する電圧センサ４１と、交流電力線３４の各線に流れる電流を計測する 電流センサ４２と",
          "translation": "The master controller 32 has a voltage sensor 41 that measures the voltage between the lines of the AC power line 34 between the parallel connection point A and the switchboard 13, a current sensor 42 that measures the current flowing in each line of the AC power line 34",
          "pinpoint": "JP 2006-320149 A · [0023] · FIG. 3",
          "pageId": "nippon-149-6",
          "fragmentIds": [
            "master"
          ]
        },
        {
          "id": "1c",
          "text": "A plurality of secondary controllers configured to each receive the primary control signal and produce a respective secondary control signal that controls a corresponding one of the inverters.",
          "quote": "通信部４０は、受信した制御信号をコントローラ２５ に転送し、コントローラ２５から受け取った状態信号をマスタコントローラ３２に送信す る。",
          "translation": "The communication unit 40 transfers the received control signal to the controller 25 and sends the status signal received from the controller 25 to the master controller 32.",
          "pinpoint": "JP 2006-320149 A · [0020] · FIG. 2",
          "pageId": "nippon-149-5",
          "fragmentIds": [
            "communication"
          ],
          "note": "The slave’s own controller 25 controls its DC/DC converter and DC/AC inverter on the master’s operate, stop and power-change signals."
        }
      ]
    },
    {
      "label": "Alternative ground G",
      "title": "Anticipation by US 2010/0067271 A1 (General Electric), optimization controller 36 and its reactive power command",
      "references": [
        {
          "title": "US 2010/0067271 A1 (Garces, Liu, deRooij and Bose, General Electric)",
          "url": "https://patents.google.com/patent/US20100067271A1/en"
        }
      ],
      "verdict": "Recorded as arguable. One reference, one photovoltaic module per inverter, a current transformer sensing the overall current of all three phases at the node where every inverter’s output joins, and one reactive power command transmitted to each inverter, whose own modulation controller receives it. It stands first behind the submitted ground because it survives the attack the owner is most likely to make on that ground, the reading of the DC source, and is in English. Its weakest limitation is 1b: the voltage is sensed “at various points in the grid”, in sentences written as alternative embodiments. Prior art under § 102(e) and § 102(a) only, so the owner may try to antedate it.",
      "limitations": [
        {
          "id": "1pre",
          "text": "An apparatus to deliver alternating current (AC) power, the apparatus comprising:",
          "quote": "FIG. 1 illustrates one embodiment of a distributed solar power generation system according to an aspect of the present technique.",
          "pinpoint": "US 2010/0067271 A1 · [0018] · FIG. 1",
          "pageId": "ge-271-6",
          "fragmentIds": [
            "system"
          ]
        },
        {
          "id": "1a",
          "text": "A plurality of inverters configured to receive DC power from a respective DC power source and respectively provide AC power to an AC load.",
          "quote": "In the illustrated embodiment, the inverters 14 and 16 are coupled together to form a first phase A (18), a second phase B (20), and a third phase C (22).",
          "pinpoint": "US 2010/0067271 A1 · [0019] · FIG. 1",
          "pageId": "ge-271-6",
          "fragmentIds": [
            "modules"
          ]
        },
        {
          "id": "1b",
          "text": "A primary controller configured to generate a primary control signal based on total AC current and total AC voltage being delivered to the AC load by the plurality of inverters.",
          "quote": "In another embodiment, the sensing device 34 may be a current transformer configured to sense overall load current from all three phases at node 24.",
          "pinpoint": "US 2010/0067271 A1 · [0020] · FIG. 1",
          "pageId": "ge-271-6",
          "fragmentIds": [
            "sensing"
          ]
        },
        {
          "id": "1c",
          "text": "A plurality of secondary controllers configured to each receive the primary control signal and produce a respective secondary control signal that controls a corresponding one of the inverters.",
          "quote": "the optimization controller 36 may be individually coupled to each of the inverters (14, 16, and 28).",
          "pinpoint": "US 2010/0067271 A1 · [0021]",
          "pageId": "ge-271-6",
          "fragmentIds": [
            "coupled"
          ],
          "note": "The inverters include pulse width modulators and control circuitry configured to receive the reactive power commands."
        }
      ]
    },
    {
      "label": "Alternative ground H",
      "title": "Anticipation by US 6,850,032 B1 (E and M Power), controller 108 with its voltage and current regulators",
      "references": [
        {
          "title": "US 6,850,032 B1 (Peterson, E and M Power)",
          "url": "https://patents.google.com/patent/US6850032B1/en"
        }
      ],
      "verdict": "Recorded as arguable on its weak side as an anticipation, and as the most literal provider of limitation 1b among the backups for a combination with a reference that supplies 1c. One signal, the modified error voltage, is formed from the aggregate output voltage at the paralleled output nodes and from the load current, and feeds the regulator chains that command the inverters. Its weakest limitation is 1c, the owner’s best argument being that the secondary controllers are software regulators inside one controller.",
      "limitations": [
        {
          "id": "1pre and 1a",
          "text": "The apparatus and its inverters.",
          "quote": "The generator system 100 preferably includes a polyphase machine 102, such as a PMA, a polyphase inverter 104, a plurality of single-phase inverters 106A, 106B, and 106C",
          "pinpoint": "US 6,850,032 B1 · Column 8, lines 1–6 · FIG. 4",
          "pageId": "em-032-21",
          "fragmentIds": [
            "system"
          ]
        },
        {
          "id": "1b",
          "text": "A primary controller configured to generate a primary control signal based on total AC current and total AC voltage being delivered to the AC load by the plurality of inverters.",
          "quote": "signals indicative of the respective voltages across the shunt capacitors (C) of the single-phase inverters 106A, 106B, and 106C and across the shunt capacitors (C) of the polyphase inverter 104 (these signals are collectively labeled Vout)",
          "pinpoint": "US 6,850,032 B1 · Column 12, lines 48–60 · FIG. 10",
          "pageId": "em-032-23",
          "fragmentIds": [
            "inputs"
          ],
          "note": "The controller also receives signals indicative of the current into the polyphase load."
        },
        {
          "id": "1c",
          "text": "A plurality of secondary controllers configured to each receive the primary control signal and produce a respective secondary control signal that controls a corresponding one of the inverters.",
          "quote": "The command signal Cmd3 (which is utilized to control the polyphase inverter 104)",
          "pinpoint": "US 6,850,032 B1 · Column 16, lines 59–62",
          "pageId": "em-032-25",
          "fragmentIds": [
            "command"
          ],
          "note": "The command is produced by taking the difference of the modified error voltage signal and a signal indicative of the inductor current."
        }
      ]
    }
  ],
  "arc-link-11563655": [
    {
      "label": "Fallback ground",
      "title": "Obviousness over OpenVirteX in view of the ICC 2012 paper, VeRTIGO, the 3GPP slicing study, the Nicira publication and the Ericsson patent, without the Delftvisor note",
      "references": [
        {
          "title": "R1 · OpenVirteX, ONS 2014",
          "url": "https://www.usenix.org/system/files/conference/ons2014/ons2014-paper-al_shabibi.pdf"
        },
        {
          "title": "R9 · Sköldström and Yedavalli, IEEE ICC 2012",
          "url": "https://web.archive.org/web/20240421163547id_/https://www.ericsson.com/4ac618/assets/local/reports-papers/research-papers/network-virtualization-and-resource-allocation-in-oenflow-based-wide-area-networks.pdf"
        },
        {
          "title": "R7 · Doriguzzi Corin et al., VeRTIGO, IEEE EWSDN 2012"
        },
        {
          "title": "R3 · 3GPP TR 28.801 V15.1.0, Study on management and orchestration of network slicing"
        },
        {
          "title": "R6 · US 2015/0312118 A1 (Nicira)",
          "url": "https://patents.google.com/patent/US20150312118A1/en"
        },
        {
          "title": "R4 · US 9,912,582 B2 (Ericsson)",
          "url": "https://patents.google.com/patent/US9912582B2/en"
        },
        {
          "title": "R8 · Jin et al., CoVisor, NSDI 2015 (corroboration)"
        }
      ],
      "verdict": "Recorded as arguable on its weak side, and weak if the slicing study is rejected as non-analogous art. The weakest limitation in every option is 1b, the determination itself: no reference performs it inside a network hypervisor, and this fallback lacks the design note’s statement that statistics on shared links need to be isolated, so no reference in it conditions the statistics computation on sharing.",
      "rationale": "The ICC 2012 paper supplies in print the shared-port computation the design note suggests; VeRTIGO the condition of several virtual ports on one physical port inside an OpenFlow hypervisor; the Nicira publication derives a logical port’s statistics from the tenant’s tagged flow statistics; the slicing study states the shared or not-shared rule; the Ericsson patent the motivation, that statistics on shared resources leak between tenants.",
      "limitations": [
        {
          "id": "1b",
          "text": "Determine whether the physical resource is shared, and provide the tenant’s statistics accordingly.",
          "quote": "For example, for statistics monitoring, per-VN port counters could be implemented through per-VN FlowTable entries [15].",
          "pinpoint": "R9 · ICC 2012 · Section V, p. 5",
          "pageId": "skoldstrom-5",
          "fragmentIds": [
            "counters"
          ]
        },
        {
          "id": "1b",
          "text": "Several virtual ports on one physical port inside a hypervisor.",
          "quote": "A single physical port can be mapped onto multiple virtual ports, depending on the number of virtual links instantiated on the physical link connected to that physical port.",
          "pinpoint": "R7 · VeRTIGO · p. 3, Section III",
          "url": "https://robertoriggio.net/papers/ewsdn2012.pdf",
          "note": "The paper does not say the virtual links belong to different customers and says nothing about the statistics a controller receives."
        },
        {
          "id": "1b",
          "text": "A logical port’s statistics derived from the tenant’s flow statistics.",
          "quote": "statistics relating to one logical port can come from two flow stats exporters 125 and 130 on the two separate PFEs 115 and 120",
          "pinpoint": "R6 · US 2015/0312118 A1 · [0058]",
          "pageId": "nicira-118-25",
          "fragmentIds": [
            "exporters"
          ]
        },
        {
          "id": "1b",
          "text": "The rule written as two cases, shared and not shared.",
          "quote": "For a NSSI shared by NSIs, the NSSMF identifies which NSI(s) the performance data are applicable to.",
          "pinpoint": "R3 · 3GPP TR 28.801 V15.1.0 · clause 7.8, step 4",
          "note": "For a dedicated subnet instance, all performance data is identified by the one slice instance using it; the study is a management document, which the owner will call non-analogous."
        },
        {
          "id": "1pre, 1a, 1c, 1c1 and 1c2",
          "text": "The remaining limitations, as in the submitted chart.",
          "quote": "Here we present OpenVirteX, a network hypervisor that enables operators to provide this form of network virtualization to their customers.",
          "pinpoint": "R1(b) · OpenVirteX, ONS 2014 · p. 1",
          "pageId": "ovx-ons14-1",
          "fragmentIds": [
            "hypervisor"
          ],
          "note": "They rest on the OpenVirteX record read as one base, as charted above."
        }
      ]
    }
  ],
  "sol-ip-10090894": [
    {
      "label": "Ground 2",
      "title": "Obviousness over US 2005/0181800 A1 (Broadcom) in view of US 7,231,530 B1 (Cisco) and US 2011/0002319 A1 (Philips)",
      "references": [
        {
          "title": "Ref. 1 · US 2005/0181800 A1 (Broadcom)",
          "url": "https://patents.google.com/patent/US20050181800A1/en"
        },
        {
          "title": "Ref. 2 · US 7,231,530 B1 (Cisco Technology)",
          "url": "https://patents.google.com/patent/US7231530B1/en"
        },
        {
          "title": "Ref. 3 · US 2011/0002319 A1 (Koninklijke Philips Electronics), published as WO 2009/109894 A1 in 2009",
          "url": "https://patents.google.com/patent/US20110002319A1/en"
        }
      ],
      "verdict": "Rated C, hold 37, in the re-score of 18 October 2026. It holds under the owner’s multi-user reading of the two signal fields as well as the patent’s own, so the two reading points of the submitted chart drop out, and it adds the reason to combine the Philips publication with the Broadcom frame, a three-reference chart against which the owner has colourable answers. The weakest limitation stays 7f2 at C 63.",
      "rationale": "The Philips publication states the known goal, multi-user MIMO transmissions in WLANs under the IEEE 802.11 standards where the known systems were single-user, and answers it by dividing the transmission settings into a common signal field for all receivers and a signal field per user stream, sent after the multi-user training field so that each receiver decodes its own once it has estimated its channel. The places were already in the Broadcom frame: one signal field for every receiver, the extended preamble, then one additional signal field before each data unit.",
      "limitations": [
        {
          "id": "7b1",
          "text": "Generate a VHT-SIG A field.",
          "quote": "information relevant for all receivers",
          "pinpoint": "Ref. 3 · US 2011/0002319 A1 · [0023]",
          "pageId": "philips-319-7",
          "fragmentIds": [
            "common"
          ],
          "note": "The common signal fields, containing the settings relevant for all receivers, as the common signal field of the Broadcom frame. Rated B 76."
        },
        {
          "id": "7b2",
          "text": "Generate a VHT-SIG B field.",
          "quote": "user-stream specific settings and may be different for each user (receiver)",
          "pinpoint": "Ref. 3 · [0037]",
          "pageId": "philips-319-8",
          "fragmentIds": [
            "user"
          ],
          "note": "The per-user signal fields as the Broadcom frame’s additional signal fields. Rated B 76."
        },
        {
          "id": "7b5",
          "text": "Transmit the VHT-SIG A field.",
          "quote": "The above fields can be transmitted sequentially over the channel.",
          "pinpoint": "Ref. 3 · [0034]",
          "pageId": "philips-319-8",
          "fragmentIds": [
            "sequential"
          ],
          "note": "Rated B 76."
        },
        {
          "id": "7c",
          "text": "Transmit a training field after transmitting the VHT-SIG A field.",
          "quote": "A MU training field 140",
          "pinpoint": "Ref. 3 · [0036] · FIG. 2",
          "pageId": "philips-319-8",
          "fragmentIds": [
            "training"
          ],
          "note": "A training field by name after the common signal field, so the reading of the extended preamble as a training field is not needed. Rated B 76."
        },
        {
          "id": "7d",
          "text": "Transmit the VHT-SIG B field after transmitting the training field.",
          "quote": "can happen only after the MU training field 140",
          "pinpoint": "Ref. 3 · [0037] · FIG. 2",
          "pageId": "philips-319-8",
          "fragmentIds": [
            "after"
          ],
          "note": "Rated B 76."
        },
        {
          "id": "7e",
          "text": "Transmit the service field after transmitting the VHT-SIG B field.",
          "quote": "The number of USERSIG fields 150 is dependent on the number of spatial streams 160 (USER1 to USERn data) in the MU-MIMO transmissions.",
          "pinpoint": "Ref. 3 · [0038] · FIG. 2",
          "pageId": "philips-319-8",
          "fragmentIds": [
            "streams"
          ],
          "note": "Each user’s data follows its signal field; in the Broadcom frame each data unit opens with its service field. Rated B 76."
        },
        {
          "id": "7f1",
          "text": "The VHT-SIG B field includes bits relating to a length of the data unit and tail bits.",
          "quote": "the amount of the user data transmitted in the stream",
          "pinpoint": "Ref. 3 · [0022]",
          "pageId": "philips-319-7",
          "fragmentIds": [
            "amount"
          ],
          "note": "The per-user field of the combination is the Broadcom frame’s additional signal field, with its 12-bit length and its tail bits; the Philips publication states the amount of user data and no tail bits. Rated B 76."
        },
        {
          "id": "7pre, 7a, 7b, 7b3, 7b4, 7f and 7f2",
          "text": "The remaining limitations, as in the submitted chart.",
          "quote": "the integrity of at least one bit of the PLCP header, e.g., the SIGNAL field, is verified using a polynomial (CRC) check sequence located in at least one bit of the SERVICE field.",
          "pinpoint": "Ref. 2 · US 7,231,530 B1 · Column 9, lines 41–44",
          "pageId": "cisco-530-15",
          "fragmentIds": [
            "crc"
          ],
          "note": "Rated as in the submitted chart; the Philips publication adds nothing to 7f2."
        }
      ]
    },
    {
      "label": "Window chart",
      "title": "The chart under the later dates claim 7 may take: US 2011/0280232 A1 (Ralink) and US 2011/0103280 A1 (Liu and Zhang), with the Cisco patent",
      "references": [
        {
          "title": "US 2011/0280232 A1 (Ralink Technology), as of its provisional of 15 May 2010",
          "url": "https://patents.google.com/patent/US20110280232A1/en"
        },
        {
          "title": "US 2011/0103280 A1 (Liu and Zhang), as of its provisional of 11 June 2010",
          "url": "https://patents.google.com/patent/US20110103280A1/en"
        },
        {
          "title": "US 2011/0002219 A1 (Broadcom), filed 8 June 2010",
          "url": "https://patents.google.com/patent/US20110002219A1/en"
        },
        {
          "title": "Ref. 2 · US 7,231,530 B1 (Cisco Technology)",
          "url": "https://patents.google.com/patent/US7231530B1/en"
        }
      ],
      "verdict": "Recorded as contingent, not the lead: it counts only if claim 7’s date moves from the contest’s date line of 11 March 2010 to 9 or 14 July 2010, the earliest filing that supports claim 7’s frame elements being of 9 July 2010. Under those dates the Ralink publication is prior art for its frame as of its provisional, and the Liu and Zhang publication arguably for its service field as of its provisional; the owner may try to antedate either. The Broadcom publication adds the field order and the tail bits with no provisional question.",
      "limitations": [
        {
          "id": "7b1 to 7d",
          "text": "The two signal fields, the training field and their order.",
          "quote": "Arrange the L-TF field, the L-SIG field, the first VHT-SIG field, the VHT-STF field, the at least one VHT-LTF field and the second VHT-SIG field sequentially.",
          "pinpoint": "US 2011/0280232 A1 · [0037], [0039] · FIGS. 1–2",
          "pageId": "ralink-232-11",
          "fragmentIds": [
            "order"
          ]
        },
        {
          "id": "7f1",
          "text": "The VHT-SIG B field includes bits relating to a length of the data unit and tail bits.",
          "quote": "the length information, the CRC check, or tail bits",
          "pinpoint": "US 2011/0280232 A1 · [0030]",
          "pageId": "ralink-232-11",
          "fragmentIds": [
            "length"
          ],
          "note": "The second VHT-SIG field carries the per-user PSDU length with the CRC check or tail bits."
        },
        {
          "id": "7b2",
          "text": "Generate a VHT-SIG B field.",
          "quote": "the VHT-SIGB 80 includes information specific to a client station",
          "pinpoint": "US 2011/0103280 A1 · [0053] · FIG. 2C",
          "pageId": "liu-280-21",
          "fragmentIds": [
            "specific"
          ]
        },
        {
          "id": "7f2",
          "text": "The service field comprises bits relating to a scrambler and cyclic redundancy check (CRC) bits.",
          "quote": "so that a receiving device can check whether a scrambler seed 304 also included in the service field 300 is correct",
          "pinpoint": "US 2011/0103280 A1 · [0080] · FIG. 9A",
          "pageId": "liu-280-24",
          "fragmentIds": [
            "verification"
          ],
          "note": "The provisional of 11 June 2010 gives the service field as a 7-bit scrambler seed and 9 reserved bits, with a CRC field or parity bits that may be put in the service field."
        },
        {
          "id": "7b3, 7e and 7f",
          "text": "The service field, where the provisional has none.",
          "quote": "The remainder of the modulated payload, called the PLCP Service Data Unit (PSDU)",
          "pinpoint": "Ref. 2 · US 7,231,530 B1 · Column 5, lines 42–46",
          "pageId": "cisco-530-13",
          "fragmentIds": [
            "psdu"
          ],
          "note": "The Cisco patent’s SERVICE field follows the SIGNAL field and precedes the PSDU; it supplies the service field, its scrambler bits and its CRC under every date."
        }
      ]
    }
  ],
  "sol-ip-9900067": [
    {
      "label": "Alternative ground",
      "title": "The same ground with the TGac specification framework and the task group record, under claim 38’s working date of 9 July 2010",
      "references": [
        {
          "title": "Ref. 1 · IEEE 802.11-09/0992r11, Specification Framework for TGac (adopted 20 May 2010)"
        },
        {
          "title": "The IEEE 802.11 Task Group ac record uploaded before 9 July 2010 (11-10/0251r4, 0316r0, 0378r1, 0415r0, 0550r0, 0571r1, 0688r0)"
        },
        {
          "title": "US 2011/0002219 A1 (Broadcom), corroboration",
          "url": "https://patents.google.com/patent/US20110002219A1/en"
        }
      ],
      "verdict": "Rated D, hold 8, in the re-score of 18 October 2026: every row that rests on the framework carries the working-date point at 65, and the weakest rows are 38f, 38g and 38h at D 38, so the chart takes the filed ground’s hold of 22. The framework is prior art only if claim 38 is entitled to no earlier date than 9 July 2010, which the examiner’s priority finding and the certified copies support but do not settle; the owner may argue the earlier date anew or try to antedate it.",
      "limitations": [
        {
          "id": "38pre",
          "text": "A communication device, comprising:",
          "quote": "The VHT MF preamble shall permit a STA to auto detect 11a, HT MF, HT GF and VHT preambles.",
          "pinpoint": "Ref. 1 · Specification Framework r11 · 3.2.1, R3.2.1.C · print p. 4",
          "note": "The VHT station is the device. Rated C 63."
        },
        {
          "id": "38a and 38b",
          "text": "The processor and the memory, as in the filed ground.",
          "quote": "The transceiver 274 may comprise a processor 282, a receiver 284, and a transmitter 286.",
          "pinpoint": "Ref. 2 · US 2006/0182017 A1 · [0037]",
          "pageId": "broadcom-017-15",
          "fragmentIds": [
            "processor"
          ],
          "note": "Rated B 87 and B 78, with the reason to build the framework’s station on an 802.11n transceiver: the draft shall maintain the 11n modulation, interleaving and coding architecture."
        },
        {
          "id": "38c",
          "text": "Transmit a first control field over a first frequency band, a bandwidth of the first frequency band being a multiple of 20 MHz.",
          "quote": "The number of subcarriers and pilots, including subcarrier positions, of L-LTF, L-SIG, and VHT-SIG-A are the same as those for the 20 MHz 11n L-LTF and L-SIG in each 20 MHz subchannel.",
          "pinpoint": "Ref. 1 · 3.2.3 · print p. 5",
          "note": "VHT-SIG-A is the first control field, sent in every 20 MHz subchannel of a 20, 40, 80 or 160 MHz channel. Rated C 63."
        },
        {
          "id": "38d",
          "text": "Transmit a second control field over the first frequency band.",
          "quote": "R3.2.1.F: The VHT MF PPDU format is shown in Figure 1.",
          "pinpoint": "Ref. 1 · 3.2.2 and Figure 1 · print p. 5",
          "note": "VHT-SIG-B is a second signal field of the same packet, after the VHT-LTFs; Motion #4 of 16 March 2010 adopted the two signal fields 65 to 0. Rated C 63."
        },
        {
          "id": "38e",
          "text": "The second control field comprises a first indicator indicating a length of subsequent user data.",
          "quote": "Robert: per user information is needed plus longer lengths",
          "pinpoint": "TGac MAC ad hoc minutes, 11-10/0688r0 · print p. 4",
          "note": "The framework leaves VHT-SIG-B’s contents open; a length in it comes from the May 2010 minutes and the 802.11n layouts. Rated D 42."
        },
        {
          "id": "38f and 38g",
          "text": "The reserved bits after the length and the tail bits after them.",
          "quote": "Rsvd 0-6(TBD)",
          "pinpoint": "11-10/0550r0 · slide 4, Example of VHTSIG Bit Allocation for DLMU",
          "note": "The example ends Rsvd, then CRC 4(TBD), then Tail 6, from a proposal without VHT-SIG-B. Rated D 38 each."
        },
        {
          "id": "38h",
          "text": "The number of bits of the first indicator when the first frequency band is 40 MHz is smaller than when the first frequency band is larger than 40 MHz.",
          "quote": "Joshua Lo (Atheros): VHT can go above 1 Gbps, so PSDU length of 16 bits is not sufficient number of bits.",
          "pinpoint": "11-10/0688r0 · print p. 2",
          "note": "The filed ground’s argument with the framework’s numerology, against the fixed SIG-B lengths of the June and July 2010 filings. Rated D 38."
        }
      ]
    }
  ],
  "cyboenergy-9331489": [
    {
      "label": "Ground 1",
      "title": "Obviousness over JP 2001-255949 A (Morishima) in view of WO 2011/107555 A1 (Müller) and US 7,796,412 B2 (Fornage)",
      "references": [
        {
          "title": "JP 2001-255949 A (Morishima, Toshiba)",
          "url": "https://patents.google.com/patent/JP2001255949A/en"
        },
        {
          "title": "WO 2011/107555 A1 (Müller, SMA Solar Technology)",
          "url": "https://patents.google.com/patent/WO2011107555A1/en"
        },
        {
          "title": "US 7,796,412 B2 (Fornage, Enphase Energy)",
          "url": "https://patents.google.com/patent/US7796412B2/en"
        }
      ],
      "verdict": "Rated D, hold 20, in the re-score of 18 October 2026: the alternative to the submitted Ground 2. Limitations 1pre to 14d are rated as in Ground 2; 14e falls to D 25 because, without Suekane, the switch of the supply onto the dedicated string rests on the broad reading that claim 14 states only the condition under which the supply takes that string’s power. Morishima’s diodes feed the supply from the highest string at low light whatever the controller detects, and the owner’s reply that nothing changes on the detection is strong.",
      "limitations": [
        {
          "id": "1pre to 14d",
          "text": "The inverter, its input channels, AC output, combiner and microcontroller, as in the submitted chart.",
          "quote": "The present invention relates to a photovoltaic power generation inverter device that performs a DC-AC power conversion operation by using a plurality of solar cell assemblies as inputs.",
          "pinpoint": "Morishima · JP 2001-255949 A · [0001] · English print p. 1",
          "pageId": "morishima-949-1",
          "fragmentIds": [
            "field"
          ],
          "note": "Fornage’s power threshold gives 14d its low-power mode, as in Ground 2."
        },
        {
          "id": "14e",
          "text": "A DC power supply connected to all input channels through the DC power combiner, supplying the inverter’s electronic circuits, and configured to take DC power from a dedicated input channel and its solar panel when the microcontroller detects that the calculated input power is below a pre-determined value.",
          "quote": "The on-board supply unit 14 takes electric energy both out of the DC voltage link 10 and the DC voltage link 6.",
          "pinpoint": "Müller · WO 2011/107555 A1 · p. 10, lines 3–4",
          "pageId": "muller-555-10",
          "fragmentIds": [
            "links"
          ],
          "note": "The supply fed from the common link as well as the input links, added to Morishima’s supply."
        },
        {
          "id": "14e",
          "text": "The dedicated channel under this ground.",
          "quote": "Out of which the solar cell string outputting the highest voltage is operated.",
          "pinpoint": "Morishima · [0072] · English print p. 6",
          "pageId": "morishima-949-6",
          "fragmentIds": [
            "highest"
          ],
          "note": "The diodes give the supply the highest string at low light without any act of the controller: the open point of this ground."
        },
        {
          "id": "14e",
          "text": "The pre-determined value.",
          "quote": "At step 604, the method 600 performs calculations and checks if the input power is greater than a power threshold.",
          "pinpoint": "Fornage · US 7,796,412 B2 · Column 6, lines 55–58",
          "pageId": "fornage-412-12",
          "fragmentIds": [
            "threshold"
          ]
        }
      ]
    },
    {
      "label": "Ground 3",
      "title": "Ground 2 further in view of JP H01-318519 A (Yoshimi), for the reading of “dedicated” as set apart from generation",
      "references": [
        {
          "title": "JP 2001-255949 A (Morishima, Toshiba)",
          "url": "https://patents.google.com/patent/JP2001255949A/en"
        },
        {
          "title": "US 7,796,412 B2 (Fornage, Enphase Energy)",
          "url": "https://patents.google.com/patent/US7796412B2/en"
        },
        {
          "title": "US 2011/0169344 A1 (Suekane)",
          "url": "https://patents.google.com/patent/US20110169344A1/en"
        },
        {
          "title": "WO 2011/107555 A1 (Müller, SMA Solar Technology)",
          "url": "https://patents.google.com/patent/WO2011107555A1/en"
        },
        {
          "title": "JP H01-318519 A (Yoshimi)",
          "url": "https://patents.google.com/patent/JPH01318519A/en"
        }
      ],
      "verdict": "Rated D, hold 34, in the re-score of 18 October 2026: the further alternative. Rows 1pre to 14d are as in Ground 2, and 14e is D 42: under a reading of “dedicated” as set apart from generation, Yoshimi’s string, set apart by its switch, rises to near its open-circuit voltage and alone carries the control supply while the other strings keep generating, applied by stopping one string’s chopper in the low-power mode. The reason is inferred and it is a fifth reference, with the owner’s wasted-output answer and Yoshimi’s age and field colourable.",
      "limitations": [
        {
          "id": "1pre to 14e",
          "text": "The submitted Ground 2, which this ground adds to.",
          "quote": "changes over the first switch from closed to open, when the power detected by the power detection unit becomes less than a night time decision value for deciding that it is night time",
          "pinpoint": "Suekane · US 2011/0169344 A1 · Claim 1",
          "pageId": "suekane-344-12",
          "fragmentIds": [
            "switch"
          ],
          "note": "As charted above; Ground 3 changes nothing in it."
        },
        {
          "id": "14e",
          "text": "The string set apart from generation.",
          "quote": "when the switch 2-1 is opened due to charging of the storage battery 5, Since the load on the solar cells 1-1 disappears, the voltage of the solar cells 1-1 rises to near the open-circuit voltage.",
          "pinpoint": "Yoshimi · JP H01-318519 A · English print, Example, p. 3",
          "note": "The quote follows the English print of the Japanese original."
        },
        {
          "id": "14e",
          "text": "The set-apart string alone carrying the control supply.",
          "quote": "through the fuse 9-1, the reverse current blocking diode 10-1, and the reverse current blocking diode 11 of the first control power supply circuit, Electric power is supplied from the solar cell 1-1 to the D/D converter 12",
          "pinpoint": "Yoshimi · JP H01-318519 A · English print, Example, p. 3",
          "note": "Yoshimi opens its switch for the battery’s charging and names no actor for it; applied to Morishima by stopping the string’s chopper in the low-power mode."
        }
      ]
    }
  ],
  "nordicunmanned-2035276": [
    {
      "label": "Fallback for the European claim",
      "title": "Ishigaki in view of Wobben and Louvel, under a broad reading of “drive unit”",
      "references": [
        {
          "title": "R4 · JP 2002-347698 A (Ishigaki Foods)",
          "url": "https://patents.google.com/patent/JP2002347698A/en"
        },
        {
          "title": "R6 · US 2005/0061910 A1 (Wobben)",
          "url": "https://patents.google.com/patent/US20050061910A1/en"
        },
        {
          "title": "R1 · US 2002/0104921 A1 (Louvel)",
          "url": "https://patents.google.com/patent/US20020104921A1/en"
        }
      ],
      "verdict": "Recorded as a fallback only, not scored. Under a broad reading of “Antriebseinheit”, a functional pair of counter-rotating rotors each on its own motor, Ishigaki has three such pairs with individual prime movers, Wobben supplies the individually variable speeds and the autonomous attitude, altitude and position device, and Louvel the speed-based attitude regulation. The owner will argue the structural reading of claims 6 and 7, under which Ishigaki’s pairs are units opposite each other across the hub, not one unit, and its computer runs the engines so as to rotate at uniform speed; 1f then rests on Wobben and Louvel, not on Ishigaki.",
      "limitations": [
        {
          "id": "1a, 1d and 1e",
          "text": "At least three drive units, each with a second rotor turning opposite its first.",
          "quote": "中心対称をなし、かつ反転する揚力発生用プロペラ(23)(23)を有する揚力発生用プロペラユニット(20)(20)が、３対設けられている",
          "translation": "three pairs of lift-propeller units with centrally symmetrical, counter-rotating lift propellers are provided",
          "pinpoint": "R4 · JP 2002-347698 A · [0024] · PDF p. 3",
          "note": "Six units in three counter-rotating pairs, each propeller with its own prime mover; the Japanese original is quoted with the researcher’s translation."
        },
        {
          "id": "1c",
          "text": "Means for autonomous attitude and position control.",
          "quote": "the aircraft according to the invention has a device for automatic control of the flight attitude and/or the flight altitude.",
          "pinpoint": "R6 · US 2005/0061910 A1 · [0013]",
          "pageId": "wobben-910-4",
          "fragmentIds": [
            "control"
          ],
          "note": "The device can also be coupled to a GPS system so as to head automatically for a predeterminable position."
        },
        {
          "id": "1f",
          "text": "The rotation speeds of the electric motors of each drive unit are varied individually.",
          "quote": "Associated with each motor 10 is an inverter 14 which permits individual actuation of each motor 10.",
          "pinpoint": "R6 · US 2005/0061910 A1 · [0029]",
          "pageId": "wobben-910-5",
          "fragmentIds": [
            "inverter"
          ]
        },
        {
          "id": "1f",
          "text": "The speed-based attitude regulation.",
          "quote": "The function of the control unit (3) is to control the speed of each electric motor by adjusting the current in each of them by a pulse width modulation (PWM) current drive.",
          "pinpoint": "R1 · US 2002/0104921 A1 · [0061]",
          "pageId": "louvel-921-3",
          "fragmentIds": [
            "pwm"
          ]
        }
      ]
    },
    {
      "label": "Alternatives for the United States claim",
      "title": "Spirov and Pedersen, or Ishigaki, as the primary reference",
      "references": [
        {
          "title": "R5 · WO 2004/101357 A2 (Spirov and Pedersen)",
          "url": "https://patents.google.com/patent/WO2004101357A2/en"
        },
        {
          "title": "R4 · JP 2002-347698 A (Ishigaki Foods)",
          "url": "https://patents.google.com/patent/JP2002347698A/en"
        },
        {
          "title": "R1 · US 2002/0104921 A1 (Louvel)",
          "url": "https://patents.google.com/patent/US20020104921A1/en"
        },
        {
          "title": "R2 · US 5,071,383 A (Kinoshita)",
          "url": "https://patents.google.com/patent/US5071383A/en"
        }
      ],
      "verdict": "Recorded as alternative starting points, not scored. With Spirov and Pedersen as the primary: four electric lift units, each motor individually speed-controlled, an on-board automatic attitude loop and, in an alternate embodiment, a counter-rotating pair in every duct, with Kinoshita, Pauli or Xing adding a motor per rotor and the pair’s individual speed control; weaker than Louvel on 1g, the ducts sitting in a saucer body rather than on arms. With Ishigaki as the primary: six arms from a hub, counter-rotating pairs, one prime mover per propeller and computer control, with Louvel for the speed-based attitude control; weaker on 1g, the side rods joining the units, and on 1f, the computer running the engines at uniform speed. The chart also names US 2006/0016929 A1, a counter-rotating ducted fan whose two propeller stages have their own windings and controller, in place of Kinoshita, without a held copy or a quote.",
      "limitations": [
        {
          "id": "1a",
          "text": "Autonomous attitude and position control provided by at least three drive units.",
          "quote": "The hover control system uses an XYZ sensor arrangement and associated control circuitry that dynamically determines an inertial gravitational reference for use in automatically and continuously determine the speed needed for each fan in order to keep the craft at a desired orientation.",
          "pinpoint": "R5 · WO 2004/101357 A2 · p. 9",
          "pageId": "spirov-357-9",
          "fragmentIds": [
            "hover"
          ]
        },
        {
          "id": "1b to 1e",
          "text": "A first and a second rotor in each unit, each on its own speed-controlled motor, turning opposite.",
          "quote": "In an alternate embodiment that provides for more efficiency, each of the ducted fans 40 has two counter-rotating multi-bladed units.",
          "pinpoint": "R5 · WO 2004/101357 A2 · p. 19",
          "pageId": "spirov-357-19",
          "fragmentIds": [
            "pair"
          ],
          "note": "Kinoshita, Pauli or Xing add a motor per rotor and the pair’s individual speed control."
        },
        {
          "id": "1a, 1g and 1h",
          "text": "With Ishigaki as the primary: the drive units on arms from a central hub.",
          "quote": "中心対称をなし、かつ反転する揚力発生用プロペラ(23)(23)を有する揚力発生用プロペラユニット(20)(20)が、３対設けられている",
          "translation": "three pairs of lift-propeller units with centrally symmetrical, counter-rotating lift propellers are provided",
          "pinpoint": "R4 · JP 2002-347698 A · [0024] · PDF p. 3",
          "note": "Six arms from a hub; the side rods joining the units are the weakness on 1g."
        },
        {
          "id": "1f and 1j",
          "text": "Individually variable speeds and the speed-based attitude control.",
          "quote": "The function of the control unit (3) is to control the speed of each electric motor by adjusting the current in each of them by a pulse width modulation (PWM) current drive.",
          "pinpoint": "R1 · US 2002/0104921 A1 · [0061]",
          "pageId": "louvel-921-3",
          "fragmentIds": [
            "pwm"
          ]
        },
        {
          "id": "1i",
          "text": "The two rotors of each unit disposed coaxially.",
          "quote": "said second propeller securely attached to a rod shaft which extends longitudinally through said sleeve shaft",
          "pinpoint": "R2 · US 5,071,383 A · Claim 1, columns 5–6",
          "pageId": "kinoshita-383-12",
          "fragmentIds": [
            "shaft"
          ]
        }
      ]
    }
  ]
};
