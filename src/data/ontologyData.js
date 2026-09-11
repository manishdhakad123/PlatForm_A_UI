// src/data/ontologyData.js

export const ontologyCategories = [
  {
    name: 'Entity',
    color: '#d89b7f',
  },
  {
    name: 'DataProperty',
    color: '#ffab6b',
  },
  {
    name: 'Datatype',
    color: '#f3a9dc',
  },
  {
    name: 'ObjectProperty',
    color: '#ff8415',
  },
  {
    name: 'OntologyClass',
    color: '#a878d4',
  },
  {
    name: 'Ontology',
    color: '#53b9d7',
  },
  {
    name: 'OperationalStatus',
    color: '#83b65e',
  },
]

export const ontologyNodes = [
  // Main entities
  {
    id: 'vehicle',
    label: 'Vehicle',
    category: 'Entity',
    description: 'Represents a vehicle detected by the VisionIQ system.',
  },
  {
    id: 'camera',
    label: 'Camera',
    category: 'Entity',
    description: 'Represents a traffic monitoring camera.',
  },
  {
    id: 'road',
    label: 'Road',
    category: 'Entity',
    description: 'Represents a road monitored by VisionIQ.',
  },
  {
    id: 'junction',
    label: 'Junction',
    category: 'Entity',
    description: 'Represents a road junction or intersection.',
  },
  {
    id: 'location',
    label: 'Location',
    category: 'Entity',
    description: 'Represents a geographical location.',
  },
  {
    id: 'violation',
    label: 'Violation',
    category: 'Entity',
    description: 'Represents a traffic rule violation.',
  },
  {
    id: 'rule',
    label: 'Rule',
    category: 'Entity',
    description: 'Represents a traffic rule.',
  },
  {
    id: 'evidence',
    label: 'Evidence',
    category: 'Entity',
    description: 'Represents image or video evidence.',
  },

  // Vehicle related
  {
    id: 'car',
    label: 'Car',
    category: 'OntologyClass',
    description: 'A passenger vehicle.',
  },
  {
    id: 'bus',
    label: 'Bus',
    category: 'OntologyClass',
    description: 'A public or private bus.',
  },
  {
    id: 'truck',
    label: 'Truck',
    category: 'OntologyClass',
    description: 'A commercial truck.',
  },
  {
    id: 'motorcycle',
    label: 'Motorcycle',
    category: 'OntologyClass',
    description: 'A two-wheeled motor vehicle.',
  },

  // Data properties
  {
    id: 'vehicle-id',
    label: 'vehicleId',
    category: 'DataProperty',
    description: 'Unique identifier of a vehicle.',
  },
  {
    id: 'number-plate',
    label: 'numberPlate',
    category: 'DataProperty',
    description: 'Registration number of a vehicle.',
  },
  {
    id: 'vehicle-type',
    label: 'vehicleType',
    category: 'DataProperty',
    description: 'Type of detected vehicle.',
  },
  {
    id: 'speed',
    label: 'speed',
    category: 'DataProperty',
    description: 'Detected speed of the vehicle.',
  },
  {
    id: 'timestamp',
    label: 'timestamp',
    category: 'DataProperty',
    description: 'Time at which an event occurred.',
  },
  {
    id: 'camera-id',
    label: 'cameraId',
    category: 'DataProperty',
    description: 'Unique identifier of a camera.',
  },

  // Datatypes
  {
    id: 'string',
    label: 'String',
    category: 'Datatype',
    description: 'Text-based datatype.',
  },
  {
    id: 'integer',
    label: 'Integer',
    category: 'Datatype',
    description: 'Integer datatype.',
  },
  {
    id: 'datetime',
    label: 'DateTime',
    category: 'Datatype',
    description: 'Date and time datatype.',
  },

  // Object properties
  {
    id: 'detects',
    label: 'detects',
    category: 'ObjectProperty',
    description: 'Connects a camera to an entity it detects.',
  },
  {
    id: 'located-at',
    label: 'locatedAt',
    category: 'ObjectProperty',
    description: 'Connects an entity to its location.',
  },
  {
    id: 'violates',
    label: 'violates',
    category: 'ObjectProperty',
    description: 'Connects a vehicle or event to a violated rule.',
  },
  {
    id: 'has-evidence',
    label: 'hasEvidence',
    category: 'ObjectProperty',
    description: 'Connects a violation to its evidence.',
  },
  {
    id: 'has-rule',
    label: 'hasRule',
    category: 'ObjectProperty',
    description: 'Connects a violation to the applicable rule.',
  },
  {
    id: 'has-vehicle-type',
    label: 'hasVehicleType',
    category: 'ObjectProperty',
    description: 'Connects a vehicle with its classification.',
  },

  // Ontology / status
  {
    id: 'traffic-ontology',
    label: 'TrafficOntology',
    category: 'Ontology',
    description: 'Root ontology for the VisionIQ traffic domain.',
  },
  {
    id: 'active',
    label: 'Active',
    category: 'OperationalStatus',
    description: 'Indicates an active operational state.',
  },
]

export const ontologyRelationships = [
  {
    id: 'r1',
    source: 'camera',
    target: 'vehicle',
    label: 'detects',
  },
  {
    id: 'r2',
    source: 'camera',
    target: 'evidence',
    label: 'generates',
  },
  {
    id: 'r3',
    source: 'vehicle',
    target: 'violation',
    label: 'hasViolation',
  },
  {
    id: 'r4',
    source: 'violation',
    target: 'rule',
    label: 'violates',
  },
  {
    id: 'r5',
    source: 'violation',
    target: 'evidence',
    label: 'hasEvidence',
  },
  {
    id: 'r6',
    source: 'camera',
    target: 'location',
    label: 'locatedAt',
  },
  {
    id: 'r7',
    source: 'road',
    target: 'location',
    label: 'locatedAt',
  },
  {
    id: 'r8',
    source: 'junction',
    target: 'road',
    label: 'connectedTo',
  },
  {
    id: 'r9',
    source: 'vehicle',
    target: 'car',
    label: 'hasType',
  },
  {
    id: 'r10',
    source: 'vehicle',
    target: 'bus',
    label: 'hasType',
  },
  {
    id: 'r11',
    source: 'vehicle',
    target: 'truck',
    label: 'hasType',
  },
  {
    id: 'r12',
    source: 'vehicle',
    target: 'motorcycle',
    label: 'hasType',
  },
  {
    id: 'r13',
    source: 'vehicle',
    target: 'vehicle-id',
    label: 'hasDataProperty',
  },
  {
    id: 'r14',
    source: 'vehicle',
    target: 'number-plate',
    label: 'hasDataProperty',
  },
  {
    id: 'r15',
    source: 'vehicle',
    target: 'vehicle-type',
    label: 'hasDataProperty',
  },
  {
    id: 'r16',
    source: 'vehicle',
    target: 'speed',
    label: 'hasDataProperty',
  },
  {
    id: 'r17',
    source: 'violation',
    target: 'timestamp',
    label: 'hasDataProperty',
  },
  {
    id: 'r18',
    source: 'camera',
    target: 'camera-id',
    label: 'hasDataProperty',
  },
  {
    id: 'r19',
    source: 'vehicle-id',
    target: 'string',
    label: 'hasDatatype',
  },
  {
    id: 'r20',
    source: 'number-plate',
    target: 'string',
    label: 'hasDatatype',
  },
  {
    id: 'r21',
    source: 'speed',
    target: 'integer',
    label: 'hasDatatype',
  },
  {
    id: 'r22',
    source: 'timestamp',
    target: 'datetime',
    label: 'hasDatatype',
  },
  {
    id: 'r23',
    source: 'traffic-ontology',
    target: 'vehicle',
    label: 'hasClass',
  },
  {
    id: 'r24',
    source: 'traffic-ontology',
    target: 'camera',
    label: 'hasClass',
  },
  {
    id: 'r25',
    source: 'traffic-ontology',
    target: 'violation',
    label: 'hasClass',
  },
  {
    id: 'r26',
    source: 'traffic-ontology',
    target: 'rule',
    label: 'hasClass',
  },
  {
    id: 'r27',
    source: 'camera',
    target: 'active',
    label: 'hasStatus',
  },
]