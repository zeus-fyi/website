export const cases = [
  {
    slug: 'gridscale-8842454', owner: 'GridScale Solutions', patent: 'US 8,842,454 B2', claim: '1', field: 'Electrical engineering', topic: 'Power electronics',
    title: 'Distributed photovoltaic inverter architecture', headline: 'A solar-power claim. An earlier power-supply architecture.',
    summary: 'Aggregate current and voltage sensing, with local controllers for individual inverters.',
    question: 'Where had a primary controller already used total AC current and voltage to coordinate multiple inverters, each with its own secondary controller?',
    approach: 'The research followed the control architecture across neighboring engineering fields. A 1998 power-supply patent describes parallel transverters, common output sensing and local switching control.',
    source: 'US 5,764,503 A', sourceUrl: 'https://patents.google.com/patent/US5764503A/en', pinpoint: 'Column 6, lines 55–60 · Figures 13–14',
    quote: 'Current voltage sensor 22 monitors the total voltage and total current being supplied by one (or more) transverters operating in a particular voltage phase.',
    mapping: 'For limitation 1b, the submission maps sensor 22 and system control module 18 to aggregate current and voltage feedback. Further quotations trace that feedback to the primary control signal.',
    limit: 'This is one passage from a multi-passage mapping. The full chart separately addresses the meaning of a respective DC power source and an alternative photovoltaic reference.',
    proof: 'Cross-field research', proofText: 'Search the underlying engineering mechanism, then map each element back to the claim.'
  },
  {
    slug: 'cyboenergy-9331488', owner: 'CyboEnergy', patent: 'US 9,331,488 B2', claim: '16', field: 'Electrical engineering', topic: 'Power electronics',
    title: 'Smart and scalable power inverters', headline: 'The operating state hidden in an archived manual.',
    summary: 'Multi-input monitoring, LED indications and the distinction between a warning and an operating limit.',
    question: 'Which earlier inverter documents connect monitored input channels to the five claimed system-status indications?',
    approach: 'The research examined archived manufacturer manuals alongside patents and original-language documents. It separated a multi-LED reading from a ground combining the monitored architecture with single-indicator disclosures.',
    source: 'Sunways AT user manual', sourceUrl: 'https://patents.google.com/patent/US9331488B2/en', pinpoint: 'Section 5.1 · Printed page 27',
    quote: 'Solar Inverter is active and feeds into power grid, however with current, output or temperature limitation.',
    mapping: 'The warning-state limitation is the weakest part of the recorded ground. The scored chart below exposes the source, the inference and the dependencies behind that assessment.',
    limit: 'The manual’s green-flashing state expressly describes continued feeding with a limitation. Its red-flashing warning state does not expressly say that feeding continues. That distinction is preserved.',
    proof: 'Candid coverage', proofText: 'See the strongest passages and the unresolved element in the same record.'
  },
  {
    slug: 'arc-link-11563655', owner: 'Arc Link', patent: 'US 11,563,655 B2', claim: '1', field: 'Software', topic: 'Networking',
    title: 'Software-defined networking', headline: 'Follow the virtual statistic to its physical counter.',
    summary: 'Tenant isolation, shared physical resources and virtual port statistics.',
    question: 'How did earlier network-virtualization systems provide tenant-specific statistics when physical resources were shared?',
    approach: 'The research connected OpenVirteX implementation history, technical papers, standards and patent disclosures. The chart distinguishes a source’s express teaching from the inference used in a combination.',
    source: 'Skoldstrom & Yedavalli · IEEE ICC 2012', sourceUrl: 'https://doi.org/10.1109/ICC.2012.6364857', pinpoint: 'Section V · Author copy, page 5',
    quote: 'For example, for statistics monitoring, per-VN port counters could be implemented through per-VN FlowTable entries [15].',
    mapping: 'Charted for limitation 1c2: virtual port statistics derived from flow entries associated with the physical port. This printed-publication passage supports part of the proposed combination.',
    limit: 'The passage alone does not establish the full claim. The complete chart separately addresses shared-resource determination, tenant isolation, dates and the reason to combine.',
    proof: 'Multiple evidence types', proofText: 'Connect implementation history and publications to the precise technical limitation.'
  },
  {
    slug: 'sol-ip-10090894', owner: 'Sol IP', patent: 'US 10,090,894 B2', claim: '7', field: 'Electrical engineering', topic: 'Communications',
    title: 'Transceiving data in a MIMO system', headline: 'The service field, examined bit by bit.',
    summary: 'Frame order, scrambler bits and a CRC carried in the service field.',
    question: 'Which earlier disclosures place the relevant frame elements in order and carry both scrambler-related bits and a CRC in the service field?',
    approach: 'The chart connects earlier WLAN signaling formats with a service-field integrity check. A separately stated multi-user alternative addresses another reading of the signal fields.',
    source: 'US 7,231,530 B1', sourceUrl: 'https://patents.google.com/patent/US7231530B1/en', pinpoint: 'Column 9, lines 41–44 · PDF page 15',
    quote: 'the integrity of at least one bit of the PLCP header, e.g., the SIGNAL field, is verified using a polynomial (CRC) check sequence located in at least one bit of the SERVICE field.',
    mapping: 'The passage is charted for limitation 7f2. Further passages identify scrambler-initialization bits and unused bits in the service field; other references carry the frame structure.',
    limit: 'The submission proposes a combination. The CRC passage is not presented as a single-reference disclosure of every limitation, and the service-field issue remains the chart’s weakest element.',
    proof: 'Precise technical mapping', proofText: 'Inspect the exact field, bit allocation and source location behind a proposed mapping.'
  },
  {
    slug: 'sol-ip-9900067', owner: 'Sol IP', patent: 'US 9,900,067 B2', claim: '38', field: 'Electrical engineering', topic: 'Communications',
    title: 'Transmitting and receiving data in a MIMO system', headline: 'A bandwidth-dependent field deserves a deeper reading.',
    summary: 'Control-field ordering and the number of bits used for a data-length indicator.',
    question: 'What earlier material connects channel bandwidth to the size of a control field while preserving the claimed packet structure?',
    approach: 'The search combined WLAN patent disclosures, conference literature and telecommunications standards. It separated evidence usable under the contest date from a labelled alternative dependent on another priority-date reading.',
    source: '3GPP TS 25.222 V8.2.0 · 2008', sourceUrl: 'https://patents.google.com/patent/US9900067B2/en', pinpoint: 'Research summary of the claim 38h mapping',
    quote: null,
    mapping: 'The chart records transport-block-size information using six bits for the 1.28 Mcps option and nine bits for the 3.84 and 7.68 Mcps options. It uses the standard as part of a combination addressing the data-size indicator.',
    limit: 'This is a research summary, not a verbatim source quotation. The different radio-system context and the reason to combine are addressed in the complete chart.',
    proof: 'Dates kept explicit', proofText: 'Keep the operative evidence separate from alternatives that depend on a different date.'
  },
  {
    slug: 'cyboenergy-9331489', owner: 'CyboEnergy', patent: 'US 9,331,489 B2', claim: '14', field: 'Electrical engineering', topic: 'Power electronics',
    title: 'Solar power mini-inverters', headline: 'Trace the power path when sunlight falls.',
    summary: 'Multi-input boost converters, combined DC output and the electronics supply at low power.',
    question: 'How do earlier multi-input inverter designs supply their own electronics, particularly when available input power is low?',
    approach: 'The research traced the connections among boost stages, DC links and on-board supply rails. Each part of the difficult auxiliary-supply limitation is mapped independently.',
    source: 'WO 2011/107555 A1', sourceUrl: 'https://patents.google.com/patent/WO2011107555A1/en', pinpoint: 'Printed page 10, lines 3–4',
    quote: 'The on-board supply unit 14 takes electric energy both out of the DC voltage link 10 and the DC voltage link 6.',
    mapping: 'The passage supports part of the connection analysis for limitation 14e. Additional passages describe parallel converters and the supply’s use of the DC links.',
    limit: 'This passage alone does not establish the claimed low-power condition or the complete dedicated-channel behavior. Those questions remain separate in the full mapping.',
    proof: 'Connections made inspectable', proofText: 'Follow the electrical path and distinguish what is stated from what still needs support.'
  },
  {
    slug: 'nordicunmanned-2035276', owner: 'Nordic Unmanned', patent: 'EP 2 035 276 B1', claim: '1', field: 'Aerospace', topic: 'Multirotor aircraft',
    title: 'Multirotor aircraft with coaxial drive units', headline: 'Two claims, two charts, one invention.',
    summary: 'Counter-rotating coaxial rotors on individually speed-controlled electric motors, charted against a 2005 quadrotor testbed and a 1991 coaxial model craft.',
    question: 'Which earlier aircraft already combined three or more drive units, each with two counter-rotating rotors on their own speed-controlled electric motors, under autonomous attitude and position control?',
    approach: 'The research charted the European patent and its American sibling separately, each from its own claim language. It followed the drive unit from radio-controlled coaxial models through ducted-fan designs to a university quadrotor testbed, and kept the German claim’s wording apart from the English chart that reads it.',
    source: 'STARMAC · IEEE/RSJ IROS 2005', sourceUrl: 'https://people.eecs.berkeley.edu/~tomlin/papers/conferences/whjt05_iros.pdf', pinpoint: 'Printed page 470',
    quote: 'Applying the concept of spectral separation, inner loop control of attitude and altitude is performed by commanding motor voltages, and outer loop position control is performed by commanding attitude requests for the inner loop.',
    mapping: 'Charted for the means for autonomous attitude and position control: the on-board loops that the European claim’s “Regelung” requires.',
    limit: 'Neither STARMAC paper says in so many words where the outer position loop runs. That open point stays visible in both charts.',
    proof: 'Two claims, two charts', proofText: 'Chart each claim on its own words and keep the weakest limitation of each in view.'
  }
];
