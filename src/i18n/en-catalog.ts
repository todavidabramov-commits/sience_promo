type Overlay = {
  nav: Record<string, string>
  stats: Record<string, { label: string }>
  services: Record<
    string,
    {
      title: string
      summary: string
      result: string
      lead: string
      about: string[]
      scope: string[]
      stages: { title: string; text: string }[]
      audience: string
    }
  >
  metrics: Record<string, { title: string; text: string }>
  industries: Record<string, { title: string; text: string }>
  projects: Record<string, { title: string; summary: string; clientType: string }>
  projectFilters: Record<string, { label: string }>
  projectCases: Record<
    string,
    { title: string; sector: string; task: string; approach: string; result: string }
  >
  steps: Record<string, { title: string; text: string }>
  experts: Record<string, { role: string; bio: string }>
  expertBoard: Record<string, { title: string; credentials: string; bio: string; tags: string[] }>
  expertSteps: Record<string, { title: string; text: string }>
  publications: Record<string, { title: string; excerpt: string; category: string }>
  featured: {
    title: string
    excerpt: string
    category: string
    readTime: string
    date: string
  }
  publicationFilters: Record<string, { label: string }>
  publicationArticles: Record<string, { title: string; excerpt: string; category: string; date: string }>
  documentFilters: Record<string, { label: string }>
  documents: Record<string, { title: string; excerpt: string }>
  homeDocs: { title: string; meta: string }[]
  contactChannels: Record<string, { title: string; text: string }>
  contactOffice: { title: string; hours: string; note: string; address: string }
  contactDocs: string[]
  requisites: { label: string; value?: string }[][]
  cta: { tag: string; title: string; text: string; checks: string[] }
}

export const EN_CATALOG: Overlay = {
  nav: {
    '/': 'Home',
    '/o-kompanii': 'About',
    '/uslugi': 'Services',
    '/proekty': 'Projects',
    '/eksperty': 'Experts',
    '/publikacii': 'Publications',
    '/dokumenty': 'Documents',
    '/kontakty': 'Contacts',
  },
  stats: {
    '15+': { label: 'Years of scientific practice' },
    '420+': { label: 'Approved SPZ projects' },
    '100%': { label: 'Expert reviews passed' },
  },
  services: {
    'otsenka-riska': {
      title: 'Health risk assessment',
      summary:
        'Quantitative description of carcinogenic and non-carcinogenic effects for people living in the influence zone of industrial and transport sources.',
      result: 'Inspection body expert opinion ready for Rospotrebnadzor.',
      lead: 'We calculate individual and population risk from chemical factors so a site can justify the safety of housing, SPZ reduction or the composition of air-protection measures.',
      about: [
        'The assessment follows current guidance: carcinogenic risk separately, HQ/HI hazard indices by target organs separately. We do not collapse everything into one “convenient” number for a slide — the regulator does not accept such simplifications.',
        'The model includes emission inventory, background, exposure routes and population. The result is verified by monitoring stations and field measurements at the boundary of the regulated territory.',
      ],
      scope: [
        'Collection and critical review of source data: MPE, inventory, monitoring, meteorological series',
        'Selection of priority substances, reference concentrations and carcinogenic potency factors',
        'Calculation of inhalation and, where needed, oral and dermal intake routes',
        'Risk maps, source contribution, uncertainty and sensitivity analysis',
        'Recommendations for staged load reduction and an industrial control programme',
      ],
      stages: [
        { title: 'Exposure scenarios', text: 'We fix routine, start-up and conservative modes, background and critical population groups.' },
        { title: 'Calculation and verification', text: 'We model concentration fields and check them against stations and measurements, not only the source passport.' },
        { title: 'Opinion', text: 'We form a volume for the inspection body and Rospotrebnadzor with clear measure priorities.' },
      ],
      audience: 'For industrial hubs, refineries, CHP plants, developers near industrial zones and sites where risk assessment is required for SPZ or project review.',
    },
    szz: {
      title: 'Sanitary protection zones',
      summary:
        'Design of calculated and establishment of final SPZ boundaries for hazard class I–V facilities, including dense urban fabric.',
      result: 'Rospotrebnadzor decision establishing SPZ boundaries with entry into the Unified State Register of Real Estate.',
      lead: 'We assemble the sanitary protection zone contour so that it withstands Glavgosexpertiza and Rospotrebnadzor: not “reduction at any cost”, but a demonstrable compliance with standards at the housing boundary.',
      about: [
        'The calculated contour is built from chemical pollution, noise and, where needed, other physical factors. Housing is set not as a line on the master plan but as a set of calculation points: yards, schools, windward ground floors.',
        'If the site sits in a city, we show the plant contribution and transport background separately. Without that, SPZ reduction looks like fitting the boundary to the cadastre and fails review.',
      ],
      scope: [
        'Justification of calculated, indicative and final SPZ',
        'Verification of emissions and noise by gas-analytical and field control',
        'A single contour for an industrial hub with mutual influence of neighbouring sites',
        'SPZ reduction project with air-protection and noise-protection measures',
        'Support of approvals and entry of the boundary into the Unified State Register of Real Estate',
      ],
      stages: [
        { title: 'Source data', text: 'Inventory, operating mode, development, background and disputed sources that cannot be averaged “across the site”.' },
        { title: 'Contour and points', text: 'We calculate impact fields and check yards, schools and façades where the contour tail usually appears.' },
        { title: 'Establishment', text: 'We prepare the SPZ project, control programme and the package for a Rospotrebnadzor decision.' },
      ],
      audience: 'For metallurgy, petrochemistry, CHP, logistics hubs and any production that needs a legitimate boundary with housing and development.',
    },
    'sanepid-ekspertiza': {
      title: 'Sanitary-epidemiological review',
      summary:
        'Assessment of design solutions, master plans and territory planning documentation against hygiene standards.',
      result: 'A positive sanitary-epidemiological conclusion (SEC).',
      lead: 'We conduct sanitary-epidemiological review of design documentation as an accredited inspection body: from the master plan and land-use plan to SPZ, MPE and risk assessment volumes.',
      about: [
        'Review is needed not as a formal signature but as a check of whether the project will withstand a counter-review by Rospotrebnadzor. We look at source data composition, calculation methods, adequacy of measures and correctness of the regulated territory.',
        'Typical stop-factors: outdated reference values, unaccounted development, HQ summation across different target organs, no field verification. We close them before submission, not after a refusal.',
      ],
      scope: [
        'Review of SPZ, MPE, risk assessment and environmental protection chapters',
        'Assessment of master plans, planning documentation and land-use plans',
        'Check of development in restriction zones: SPZ, AVT, sanitary gaps',
        'Inspection body opinion with remarks or grounds for an SEC',
        'Support through to a sanitary-epidemiological conclusion',
      ],
      stages: [
        { title: 'Completeness', text: 'We check the volume against the mandatory composition: source data, calculations, maps, measures, control.' },
        { title: 'Method', text: 'We check formulas, guidance versions and correspondence to the actual facility mode.' },
        { title: 'SEC', text: 'We issue the inspection opinion and take the package through to a positive supervisory decision.' },
      ],
      audience: 'For design institutes, developers, industrial companies and authorities that need an SEC, not an “internal memo”.',
    },
    'eco-proektirovanie': {
      title: 'Environmental design',
      summary:
        'Development of environmental protection chapters, MPE, wastewater limits and industrial environmental control for metallurgical, chemical and mining production, including supervisory approval.',
      result: 'Approved emission and discharge volumes at supervisory authorities.',
      lead: 'We assemble environmental documentation as a single package: emissions, discharges, waste and industrial control, so the site does not receive contradictory requirements from different agencies.',
      about: [
        'For heavy industry, chapters cannot be written “from a neighbouring shop template”. Start-up mode, non-stationary sources and mutual influence of units change both MPE and the industrial control programme.',
        'We align environmental design with SPZ calculation and risk assessment: the same source data, the same priority substances, the same logic of measures. That reduces approval loops.',
      ],
      scope: [
        'MPE / emission limit projects, inventory of stationary sources',
        'Wastewater limits and discharge justification, storm and process effluents',
        'Environmental protection chapters in design documentation',
        'Industrial environmental control programme and measurement schedule',
        'Emission and discharge reduction measures with effect assessment',
      ],
      stages: [
        { title: 'Inventory', text: 'We record sources, modes, treatment equipment and gaps in source data.' },
        { title: 'Volumes and maps', text: 'We calculate limits, impact fields and adequacy of adopted solutions.' },
        { title: 'Approval', text: 'We support the package through supervision and align it with SPZ and risk assessment.' },
      ],
      audience: 'For refineries, mining and processing plants, metallurgy, chemistry and energy, where approved volumes are required both to build and to operate.',
    },
    atmosfera: {
      title: 'Ambient air',
      summary:
        'Ambient air pollution modelling under OND-2017 with buildings, terrain and aerodynamic shadows of high-rises.',
      result: 'Dispersion maps and justification of the adequacy of treatment equipment.',
      lead: 'We calculate ground-level concentrations as OND-2017 requires in a city: not a flat site in a field, but street canyons, tower shadows and short calm episodes.',
      about: [
        'A flat terrain model does not see where the NO₂ and dust maximum “moves”. For CHP and industrial sites in a dense contour this is the main reason for an optimistic MPE and a later review refusal.',
        'Every disputed source is analysed down to the mode, not hidden by site averaging. The client receives maps “with / without buildings” and a list of modes where the MPC exceedance risk remains.',
      ],
      scope: [
        'Dispersion calculations under OND-2017, including 3D buildings',
        'Model verification against monitoring stations and mobile measurements',
        'Justification of stack height, treatment efficiency and operating modes',
        'Concentration maps for MPE, SPZ and risk assessment',
        'Emission reduction programme by specific sources, not “raise the stack”',
      ],
      stages: [
        { title: 'Calculation core', text: 'We assemble sources, meteorological series, terrain and the building layer that breaks the old scheme.' },
        { title: 'Fields and stations', text: 'We compare model maxima with control and assign the right observation points.' },
        { title: 'Measures', text: 'We show which source and mode produce the exceedance — and what to do about it.' },
      ],
      audience: 'For CHP, boiler houses, refineries, quarries and any sites where dispersion without urban context no longer passes.',
    },
    shum: {
      title: 'Noise impact',
      summary:
        'Acoustic calculations of industrial sites, roads and aerodromes, field measurements and specification of noise barriers and façades.',
      result: 'Noise maps and noise barrier specifications.',
      lead: 'We calculate and measure noise so that one can build, operate production or protect housing: not a single regulatory contour, but day/night, maxima and actual trajectories.',
      about: [
        'Industry is critical in start-up modes and tonal components, roads in the night period, airports in the glide path and turns. One equivalent level does not close these cases.',
        'A model–measurement discrepancy above 2 dBA is analysed separately: usually the actual trajectory, screening by buildings or an incorrect source characteristic is at fault.',
      ],
      scope: [
        'Noise calculation for industrial sites, quarries, logistics and utility networks',
        'Transport and aircraft noise, including 3D trajectories',
        'Field measurements day/night, weekdays and weekends',
        'Selection of barriers, silencers and façade sound insulation indices',
        'Noise maps for SPZ, AVT and housing review',
      ],
      stages: [
        { title: 'Sources', text: 'We passport equipment, driveways, runways and modes that produce night maxima.' },
        { title: 'Map and measurement', text: 'We model the field and check control points, rather than fitting the contour to the master plan.' },
        { title: 'Protection', text: 'We issue a specification of measures: barriers, silencers, glazing, mode limits.' },
      ],
      audience: 'For plants, developers near highways, airports and any facilities where noise is the leading SPZ or AVT factor.',
    },
    priaerodromnye: {
      title: 'Aerodrome vicinity territories',
      summary:
        'Sanitary and hygienic assessment of aerodrome vicinity territories: aircraft noise, electromagnetic emission of radio facilities and development approval.',
      result: 'An official Rospotrebnadzor SEC for construction.',
      lead: 'We assess the aerodrome vicinity as a whole: not only sanitary gaps, but noise along actual trajectories and electromagnetic emission of radars and beacons.',
      about: [
        'The seventh AVT subzone is not closed by a single noise contour. A residential building that falls into a side lobe of a surveillance radar may see an exceedance even kilometres from the runway.',
        'The client receives zones where construction is possible without special measures, and zones with limits on storeys, bedroom orientation, sound insulation and shielding.',
      ],
      scope: [
        'Sanitary and hygienic assessment of AVT and the 7th subzone',
        '3D mapping of aircraft noise along actual flight schemes',
        'Modelling of radio facility electromagnetic emission with radiation patterns',
        'Field measurements of noise and field strength on façades',
        'SEC package and development approval with the agencies',
      ],
      stages: [
        { title: 'AVT factors', text: 'We collect trajectories, day/night slots, radio facility composition and actual development under the glide path.' },
        { title: 'Noise and EMF', text: 'We calculate both factors and check them against measurements — without “one opinion for everything”.' },
        { title: 'Development', text: 'We fix permitted zones, storeys and envelope requirements.' },
      ],
      audience: 'For developers, airports and municipalities that need to build or restrict development in the aerodrome zone on a legitimate basis.',
    },
    toksikologiya: {
      title: 'Toxicology',
      summary:
        'Justification of MPC and TSEL of harmful substances in workplace air and the atmosphere based on laboratory and field data.',
      result: 'Hygiene standards approved by the Ministry of Health.',
      lead: 'We justify hygiene standards where a tabulated MPC does not exist or does not describe the actual unit microclimate: dioxide mixtures, high temperatures, non-stationary start-ups.',
      about: [
        'The laboratory exposure model in a climate chamber is built in dose–response steps to cut peak-emission artefacts. In parallel we review industrial control over several seasons.',
        'The package includes a toxicological profile, critical effects, extrapolation uncertainties and a TSEL proposal for the period until a permanent standard. Occupational safety and MPE designers receive one figure from a verified model.',
      ],
      scope: [
        'Development and justification of MPC / TSEL in the workplace and ambient air',
        'Chamber experiments and industrial control analysis',
        'Toxicological profile of the substance and critical target organs',
        'Input data for ventilation, treatment plants and MPE calculation',
        'Support of hygiene standard approval',
      ],
      stages: [
        { title: 'Substance profile', text: 'We collect toxicology, analogues, intake routes and gaps in standards.' },
        { title: 'Experiment', text: 'We reproduce inhalation load and check the chamber against the site.' },
        { title: 'Standard', text: 'We prepare the MPC/TSEL justification volume and submit it for approval.' },
      ],
      audience: 'For petrochemistry, specialty chemicals and production with new substances, where no in-house standard means neither design nor workplace attestation is possible.',
    },
    nir: {
      title: 'Expert consulting',
      summary:
        'Audit of environmental and sanitary risks in M&A, land purchase for housing and entry to an industrial site with historical contamination.',
      result: 'An environmental cleanliness report of the asset with cost assessment.',
      lead: 'Before a deal or design we show what sanitary and environmental liabilities of the asset actually cost — before signing, not after a review refusal.',
      about: [
        'For a developer the hidden risk is a smear of petroleum products and metals under a future yard. For industry — someone else’s SPZ contour that cuts an already issued land-use plan. We assemble surveys, hydrogeology, background and the site’s regulatory history into one report.',
        'The conclusion is not “there are risks”, but the excavation contour, remediation cost, deal stop-factors and what must be closed for the plot to become clear on liabilities.',
      ],
      scope: [
        'Due diligence of sanitary and environmental plot restrictions',
        'Assessment of historical soil and groundwater contamination',
        'Check of SPZ, AVT, sanitary gaps and land-use plans',
        'Cost assessment of measures and regulatory timelines',
        'A position for a deal, a bank or a design institute',
      ],
      stages: [
        { title: 'Screening', text: 'We take off territory restrictions, site history and holes in source data.' },
        { title: 'Risk and money', text: 'We calculate which measures are mandatory and how they move asset value.' },
        { title: 'Report', text: 'We fix stop-factors, a roadmap and a package that can go into a deal.' },
      ],
      audience: 'For developers, funds and industrial holdings entering an asset where the sanitary factor can close or substantially cheapen the deal.',
    },
  },
  metrics: {
    '4': {
      title: 'Doctors of science on the board',
      text: 'Scientific and methodological support of projects is provided by leading specialists in toxicology and hygiene.',
    },
    '№1': {
      title: 'In-house laboratory',
      text: 'An accredited testing centre for precise measurements of physical factors and chemical analysis.',
    },
    ISO: {
      title: 'Quality standards',
      text: 'All calculations and reporting materials conform to GOST R ISO 9001 and regulator requirements.',
    },
  },
  industries: {
    activity: {
      title: 'Industrial facilities',
      text: 'Design and review of complex production, metallurgical complexes and machine-building plants.',
    },
    droplet: {
      title: 'Oil and gas',
      text: 'Environmental consulting and emission calculations in hydrocarbon production, transport and processing.',
    },
    plane: {
      title: 'Airports and aviation',
      text: 'Integrated noise calculations, AVT projects and approval of land-use restrictions.',
    },
    layers: {
      title: 'Development',
      text: 'Assessment of plot suitability for housing by noise, air quality and EMF criteria.',
    },
  },
  projects: {
    'szz-npz': {
      title: 'Justification of sanitary protection zone boundaries for an oil refinery',
      summary: 'Dispersion calculation for 120 sources, assessment of physical impact (noise).',
      clientType: 'Oil and gas complex',
    },
    'shum-hub': {
      title: 'Acoustic calculation of aerodrome vicinity territories of a major international hub',
      summary: 'Noise mapping, take-off/landing trajectory calculation, protection of development zones.',
      clientType: 'Transport infrastructure',
    },
    'risk-microdistrict': {
      title: 'Health risk assessment for a new residential district by a highway',
      summary: 'Air pollution, EMF and traffic noise measurements. Project review.',
      clientType: 'Development',
    },
  },
  projectFilters: {
    all: { label: 'All projects' },
    aviation: { label: 'Aviation' },
    oilgas: { label: 'Oil and gas complex' },
    urban: { label: 'Urban planning' },
  },
  projectCases: {
    'szz-npz': {
      title: 'Establishment of a unified sanitary protection zone for a refinery complex in the Volga Federal District',
      sector: 'Petrochemical industry',
      task: 'Combine more than 150 stationary emission sources into a single contour of calculated boundaries and account for the combined contribution of neighbouring heat-and-power plants.',
      approach:
        'Mathematical modelling of ground-level concentrations under OND-2017 with detailed verification by gas-analytical control systems. Absence of MPC exceedances at the housing boundary was justified.',
      result:
        'A positive FBUZ opinion and an SEC of the territorial Rospotrebnadzor office were obtained. Boundaries were entered into the public cadastral map.',
    },
    'shum-hub': {
      title: 'Sanitary-epidemiological assessment of the aerodrome vicinity of a federal airport',
      sector: 'Aviation sector',
      task: 'Justify the possibility of housing construction within the 7th subzone of the aerodrome vicinity by aircraft noise and electromagnetic emission factors.',
      approach:
        'Three-dimensional acoustic mapping of take-off and landing trajectories. Sound level measurements in day and night periods accounting for flight intensity.',
      result:
        'Permitted development zones were defined with recommendations on façade sound-insulation performance. The project was successfully approved by the agencies.',
    },
    'risk-microdistrict': {
      title: 'Public health risk assessment in the renovation of a former industrial zone into a residential quarter',
      sector: 'Urban planning / development',
      task: 'Assess the combined health risk to future residents from soil contamination and the influence of a major highway.',
      approach:
        'An exposure model of chemical substances was developed for inhalation and oral intake routes. Hazard indices were calculated for critical target organs.',
      result:
        'Risks were shown to meet acceptable levels after soil remediation. An inspection body expert decision was obtained.',
    },
  },
  steps: {
    '01': {
      title: 'Data collection',
      text: 'Analysis of permitting documentation, plans and emission source characteristics.',
    },
    '02': {
      title: 'Modelling',
      text: 'Mathematical calculations of gas dispersion and noise using certified software.',
    },
    '03': {
      title: 'Review',
      text: 'Sanitary-epidemiological review of the project in an accredited inspection body.',
    },
    '04': {
      title: 'Approval',
      text: 'Obtaining a positive sanitary-epidemiological conclusion (SEC) from Rospotrebnadzor.',
    },
  },
  experts: {
    gromova: {
      role: 'Chair of the board',
      bio: 'Doctor of Medical Sciences, RAS expert in toxicology and hygienic standard-setting.',
    },
    kozlov: {
      role: 'Head of laboratory',
      bio: 'Candidate of Technical Sciences, specialist in physical impact and aircraft noise.',
    },
    dmitrieva: {
      role: 'Chief sanitary physician-expert',
      bio: 'Expert in eco-hygienic assessment of urban planning solutions and SPZ calculations.',
    },
  },
  expertBoard: {
    gromova: {
      title: 'Chair of the expert board',
      credentials: 'Doctor of Medical Sciences, academic verifier of Rospotrebnadzor',
      bio: 'Specialises in systems toxicology and hygienic standard-setting of industrial emissions. Author of more than 70 scientific papers on multi-media health risk assessment.',
      tags: ['Toxicological review', 'TSEL and MPC standards', 'Protection of complex industrial zones'],
    },
    kozlov: {
      title: 'Head of the physical factors testing centre',
      credentials: 'Candidate of Technical Sciences, expert in acoustic and vibration impact',
      bio: 'Expert in assessment of physical environmental factors. Developer of noise-control systems for large energy facilities and take-off and landing zones.',
      tags: ['Aircraft noise', 'Noise mapping', 'GOST ISO 17025'],
    },
    dmitrieva: {
      title: 'Chief sanitary physician-expert of the inspection body',
      credentials: 'Highest-category physician in general hygiene',
      bio: 'More than 15 years of inspection of urban planning documentation. Coordinates passage of SPZ project reviews at Rospotrebnadzor.',
      tags: ['Sanitary-epidemiological review', 'Rospotrebnadzor approval', 'Assessment of development projects'],
    },
  },
  expertSteps: {
    '01': {
      title: 'Process audit',
      text: 'We analyse production specifics and isolate leading harmful factors (chemical emissions, industrial noise, vibration, EMF).',
    },
    '02': {
      title: 'Selection of specialist engineers',
      text: 'For noise facilities we appoint acousticians, for petrochemistry — toxicologists, for AVT — air-safety specialists.',
    },
    '03': {
      title: 'Appointment of a hygiene physician',
      text: 'A general hygiene physician coordinates development and personally defends calculation results at the expert board and supervisory agencies.',
    },
  },
  publications: {
    'risk-methodology': {
      title: 'Current issues in the methodology of public health risk assessment from chemical factors',
      excerpt: 'An analytical review of the latest amendments to risk assessment guidance...',
      category: 'Risk assessment',
    },
    'szz-urban': {
      title: 'Criteria for justifying SPZ reduction of industrial hubs in dense urban fabric',
      excerpt: 'Practical experience of approving complex calculated dispersion models...',
      category: 'SPZ & urban planning',
    },
  },
  featured: {
    title:
      'Combined public health risk assessment: a practical case for a major industrial hub in the Central Federal District',
    excerpt:
      'A detailed review of an integrated hygienic assessment covering carcinogenic and systemic risks from 240 stationary emission sources of metallurgical production.',
    category: 'Research and review',
    readTime: '12 min',
    date: '11 March 2026',
  },
  publicationFilters: {
    all: { label: 'All materials' },
    science: { label: 'Scientific papers' },
    risks: { label: 'Risk research' },
    urban: { label: 'Development analytics' },
    air: { label: 'Ambient air protection' },
  },
  publicationArticles: {
    'aviation-noise-pat-2024': {
      title: 'Analysis of aircraft noise within aerodrome vicinity territories: 2026 methods',
      excerpt:
        'Assessment of the impact of multi-engine turbojet aircraft on ground-level residential zones using 3D trajectory modelling.',
      category: 'Acoustics and noise',
      date: '18 February 2026',
    },
    'pdk-dioxides-oil': {
      title: 'Toxicological and hygienic justification of an MPC for dioxides in the oil-refining workplace',
      excerpt:
        'Verified laboratory models of inhalation load distribution under elevated air temperatures.',
      category: 'Toxicology',
      date: '29 January 2026',
    },
    'industrial-zone-renovation': {
      title: 'Renovation of industrial zones: overcoming chemical contamination of soils and groundwater',
      excerpt:
        'A review of successful environmental damage elimination using a large development project in the Moscow Region as an example.',
      category: 'Risk assessment',
      date: '12 December 2025',
    },
    'szz-metallurgy-class-1': {
      title: 'Integrated justification of SPZ boundaries for hazard class I metallurgical plants',
      excerpt:
        'A review of the methodology for verifying inorganic dust and sulphur dioxide emissions at the boundary of residential areas.',
      category: 'SPZ projects',
      date: '25 November 2025',
    },
    'ond-2017-nox': {
      title: 'Application of the OND-2017 mathematical core in calculations of excess pollution',
      excerpt:
        'A study of the influence of aerodynamic shadows of high-rises on nitrogen oxide dispersion from CHP plants.',
      category: 'Ambient air',
      date: '6 November 2025',
    },
    'pat-radio-emission': {
      title: 'Protecting housing from electromagnetic emission of AVT radio facilities',
      excerpt:
        'Modelling of transmitter radiation patterns in near and far influence zones of aviation hubs.',
      category: 'Aerodrome vicinity territories',
      date: '21 October 2025',
    },
  },
  documentFilters: {
    all: { label: 'All regulations' },
    federal: { label: 'Federal laws' },
    sanpin: { label: 'SanPiN and codes of practice' },
    methods: { label: 'Methodological instructions (MU)' },
    accreditation: { label: 'Accreditation certificates' },
  },
  documents: {
    'СанПиН 2.2.1/2.1.1.1200-03': {
      title: 'Sanitary protection zones and sanitary classification of enterprises, structures and other facilities',
      excerpt:
        'Defines the core regulatory requirements for siting industrial zones, landscaping and sanitary gap sizes.',
    },
    'ФЗ № 52-ФЗ': {
      title: 'On the sanitary and epidemiological well-being of the population',
      excerpt:
        'The basic federal law governing the legal framework for ensuring a living environment that is safe for human health.',
    },
    'СП 2.2.3670-20': {
      title: 'Sanitary and epidemiological requirements for working conditions',
      excerpt:
        'A code of practice setting mandatory hygienic parameters of the production environment in work zones and industrial sites.',
    },
    'МУК 4.3.2194-07': {
      title: 'Noise level control in residential areas and dwellings',
      excerpt:
        'Methodological instructions for measuring, assessing and calculating the influence of external sound pressure from various sources.',
    },
    'ГОСТ ISO/IEC 17020-2013': {
      title: 'Conformity assessment. Requirements for the operation of inspection bodies',
      excerpt:
        'A national standard whose compliance confirms impartiality and the high staffing and technical capacity of our organisation.',
    },
    'Р 2.2.2006-05': {
      title: 'Guidance on hygienic assessment of workplace environment factors',
      excerpt:
        'Instructions for analysing the hazard of physical and chemical factors, and the severity and intensity of the labour process.',
    },
    '96-ФЗ': {
      title: 'On ambient air protection',
      excerpt:
        'Federal law on air quality standards, stationary source emissions and state environmental control.',
    },
    'ПП РФ № 222': {
      title: 'On the procedure for establishing sanitary protection zones',
      excerpt:
        'Rules for establishing, changing and terminating SPZ, including project requirements and entry of boundaries into the Unified State Register of Real Estate.',
    },
    'СанПиН 1.2.3685-21': {
      title: 'Hygienic standards and requirements for ensuring the safety of the living environment',
      excerpt:
        'A set of MPC and permissible levels of physical factors for ambient air, soil, water and dwellings.',
    },
    'ОНД-2017': {
      title: 'Method for calculating dispersion of harmful substance emissions in ambient air',
      excerpt:
        'The calculation core for modelling ground-level concentrations accounting for buildings, terrain and non-stationary modes.',
    },
    'Р 2.1.10.1920-04': {
      title: 'Guidance on public health risk assessment under exposure to chemicals',
      excerpt:
        'A method for calculating carcinogenic and non-carcinogenic risk, reference concentrations and uncertainties.',
    },
    'RA.RU.21АИ45': {
      title: 'Inspection body accreditation certificate',
      excerpt:
        'Confirmation of competence of the inspection body for sanitary-epidemiological review of design documentation.',
    },
  },
  homeDocs: [
    { title: 'List of source data for an SPZ project', meta: 'Updated: 18 Jan 2026' },
    { title: 'RF Government Decree No. 222 (SPZ)', meta: 'Current edition' },
    { title: 'Sanitary-epidemiological documentation review procedure', meta: 'Official guidance' },
  ],
  contactChannels: {
    'info@sanepid-expert.ru': {
      title: 'General inspection office',
      text: 'For general questions, documentation preparation and contracts.',
    },
    'noise@sanepid-expert.ru': {
      title: 'Acoustic laboratory',
      text: 'Dispatch of acousticians for field measurements and noise modelling.',
    },
    'toxic@sanepid-expert.ru': {
      title: 'Toxicology and risk assessment',
      text: 'For large chemical plants, MPC and TSEL development.',
    },
  },
  contactOffice: {
    title: 'Head office',
    hours: 'Mon–Fri: 9:00–18:00',
    note: 'Saturday and Sunday are days off. Expert correspondence is accepted around the clock by email.',
    address: '8, bldg 16, Leninsky Prospekt, Moscow, 119049, research cluster.',
  },
  contactDocs: [
    'Land-use plan of the plot',
    'Site plan or list of stationary sources',
    'Design brief (if available)',
  ],
  requisites: [
    [
      { label: 'Full name:', value: 'SanEpidExpert Centre (SanEpidExpert LLC)' },
      { label: 'OGRN:' },
    ],
    [
      { label: 'INN / KPP:' },
      { label: 'Legal address:', value: '8, bldg 16, Leninsky Prospekt, Moscow, 119049' },
    ],
  ],
  cta: {
    tag: 'Commercial proposal',
    title: 'Request an estimate of expert work',
    text: 'Send available source data or a design brief. Our specialists will prepare a detailed technical and commercial proposal within 24 hours.',
    checks: [
      'Estimate in 1 day — preliminary definition of the scope and cost of work.',
      'Strictly confidential — a guarantee of the safety of your commercial and industrial data.',
      'Compliance with Federal Law 222-FZ — and all current hygiene standards of the Russian Federation.',
    ],
  },
}

