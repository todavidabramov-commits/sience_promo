type ArticleBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }

export const PUBLICATION_BODIES_EN: Record<string, ArticleBlock[]> = {
  'industrial-cluster-risk': [
    {
      type: 'p',
      text: 'An industrial hub in the Central Federal District combines metallurgical and related production with a combined contribution of more than 240 stationary emission sources. The review task was not to assess individual stacks, but to describe combined carcinogenic and non-carcinogenic risk for people living in the cluster influence zone.',
    },
    { type: 'h2', text: 'Source data and modelling boundaries' },
    {
      type: 'p',
      text: 'The calculation included emission inventories for the last three years, state monitoring network data, field measurements at the housing boundary and a meteorological series sufficient for stable ground-level concentration statistics.',
    },
    { type: 'h2', text: 'How combined risk was calculated' },
    {
      type: 'p',
      text: 'Dispersion modelling followed OND-2017 with verification against monitoring stations. Individual carcinogenic risk was summed by substances and intake routes; population risk accounted for the exposed population.',
    },
    {
      type: 'ul',
      items: [
        'At the nearest housing boundary individual carcinogenic risk remained within acceptable values after source parameters were refined.',
        'The inhalation hazard index did not exceed 1.0 for critical organs in a conservative exposure scenario.',
        'Background transport contribution was comparable to some process sources — this changed air-protection priorities.',
      ],
    },
  ],
  'aviation-noise-pat-2024': [
    {
      type: 'p',
      text: 'The aerodrome vicinity of a federal airport is not only sanitary gaps but a set of physical factors, with aircraft noise remaining the leading one. In 2026 we updated the calculation method using actual take-off and landing trajectories of multi-engine turbojet aircraft.',
    },
    { type: 'h2', text: 'Three-dimensional mapping instead of “flat” contours' },
    {
      type: 'ul',
      items: [
        'In the 7th AVT subzone housing cannot be justified by a single regulatory contour: actual noise and EMF must be checked.',
        'Façades facing the glide path need calculated sound-insulation indices, not “typical” glazing.',
        'The night period remains critical: even with a moderate daytime LAeq, night maxima can close a plot without extra measures.',
      ],
    },
  ],
  'pdk-dioxides-oil': [
    {
      type: 'p',
      text: 'For oil refining, workplace air hygiene standards often become a project bottleneck: a dioxide mixture, elevated temperature and non-stationary start-up modes are not described by tabulated MPC without experimental check.',
    },
    { type: 'h2', text: 'Laboratory exposure model' },
    {
      type: 'p',
      text: 'We reproduced inhalation load in a climate chamber and built a dose–response relationship. The MPC justification included a toxicological profile, critical effects and a TSEL proposal until a permanent standard is approved.',
    },
  ],
  'industrial-zone-renovation': [
    {
      type: 'p',
      text: 'Renovation of a former industrial zone into a residential quarter almost always hits chemical contamination of soils and groundwater. Without a health risk assessment for future residents the project does not pass sanitary review.',
    },
    {
      type: 'ul',
      items: [
        'After remediation calculated risks meet acceptable levels if the clean layer thickness is preserved.',
        'The contaminated-soil excavation contour matched zones where HI without measures exceeded 1.',
        'Groundwater monitoring during construction was included in the developer’s obligations.',
      ],
    },
  ],
  'szz-metallurgy-class-1': [
    {
      type: 'p',
      text: 'Hazard class I metallurgical plants require not SPZ reduction at any cost, but demonstrable compliance with hygiene standards at the housing boundary. Emission verification against gas-analytical control matters more than a pretty map.',
    },
  ],
  'ond-2017-nox': [
    {
      type: 'p',
      text: 'OND-2017 changed not only formulas but requirements for accounting for buildings. For a CHP in a dense urban contour, aerodynamic shadows of high-rises can locally increase ground-level nitrogen oxide concentrations even with a formally sufficient stack height.',
    },
    {
      type: 'ul',
      items: [
        'Accounting for shadows changes not only the concentration peak but the point used to assign a control station.',
        'For excess pollution short calm episodes matter, not only annual-average fields.',
        'It is more efficient to place measures on a specific source and mode than to raise the stack just in case.',
      ],
    },
  ],
  'pat-radio-emission': [
    {
      type: 'p',
      text: 'Besides aircraft noise, development in an aerodrome influence zone faces electromagnetic emission of radio facilities. A residential building in a side lobe may see an exceedance even kilometres from the runway. The result is zones where housing is allowed without special measures and zones with storey, bedroom-orientation or shielding limits.',
    },
  ],
  'risk-methodology': [
    {
      type: 'p',
      text: 'Guidance on health risk assessment from chemical factors is periodically refined. Typical weak points are outdated carcinogenic potency factors, mixing acute and chronic scenarios, HQ summation across different target organs and ignoring background exposure.',
    },
    {
      type: 'ul',
      items: [
        'Carcinogenic and non-carcinogenic risk are described by different metrics and are not averaged into one number for a slide.',
        'Uncertainties must show which parameters move the result most.',
        'Population risk without population size and an exposure scenario is decoration, not an assessment.',
      ],
    },
  ],
  'szz-urban': [
    {
      type: 'p',
      text: 'Reducing a sanitary protection zone in dense urban fabric is possible only if the calculated contour and field data confirm compliance with hygiene standards. Urban tightness is not an argument in itself.',
    },
    {
      type: 'ul',
      items: [
        'No MPC or permissible-level exceedances at the regulated territory boundary in routine and start-up modes.',
        'The calculation is verified by measurements, not only by inventory.',
        'Controlled measures are proposed without which the new contour would move again if the mode changes.',
      ],
    },
  ],
}
