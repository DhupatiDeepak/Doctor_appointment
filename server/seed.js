const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');
const Service = require('./models/Service');
const User = require('./models/User');

dotenv.config();

const doctors = [
  {
    name: 'Dr. JIBAN DEBNATH',
    specialization: 'Urologist',
    experience: '15 Years',
    education: 'MBBS (SURGERY), DNB (UROLOGY)',
    description: 'Expert in advanced urological surgeries and kidney treatments.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80',
    availableDays: ['Mon', 'Wed', 'Fri']
  },
  {
    name: 'Dr. ARPAN MITRA',
    specialization: 'Neurologist',
    experience: '12 Years',
    education: 'MD (MEDICINE), DM (NEUROLOGY)',
    description: 'Specialist in complex neurological disorders and brain health.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80',
    availableDays: ['Tue', 'Thu', 'Sat']
  },
  {
    name: 'Dr. RAJIB DEBNATH',
    specialization: 'Orthopedician',
    experience: '10 Years',
    education: 'MBBS, MS (ORTHOPAEDICS)',
    description: 'Expert in joint replacement and orthopedic trauma surgery.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80',
    availableDays: ['Mon', 'Tue', 'Fri']
  },
  {
    name: 'Dr. ABANTIKA NATH',
    specialization: 'Surgery',
    experience: '8 Years',
    education: 'MBBS, MS (SURGERY)',
    description: 'Specialist in general and laparoscopic surgical procedures.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80',
    availableDays: ['Wed', 'Thu', 'Sat']
  },
  {
    name: 'Dr. CHAYAN SARKAR',
    specialization: 'Pediatrics',
    experience: '9 Years',
    education: 'MBBS, MD (PEDIATRICS)',
    description: 'Compassionate care for infants, children, and adolescents.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80',
    availableDays: ['Mon', 'Wed', 'Sat']
  },
  {
    name: 'Dr. SUKANTA BHUIYA',
    specialization: 'Gynecologist and Obstetrician',
    experience: '14 Years',
    education: 'MBBS, DGO',
    description: 'Expert in maternal-fetal medicine and women\'s health.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80',
    availableDays: ['Tue', 'Fri', 'Sun']
  },
  {
    name: 'Dr. JOYDEEP DEBNATH',
    specialization: 'Anesthesiology',
    experience: '11 Years',
    education: 'MBBS, MD (ANESTHESIOLOGY)',
    description: 'Expertise in critical care and pain management.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80',
    availableDays: ['Mon', 'Thu', 'Sat']
  },
  {
    name: 'Dr. HIMADRI SHEKHAR DEB',
    specialization: 'Internal Medicine',
    experience: '13 Years',
    education: 'MBBS, MD (INTERNAL MEDICINE)',
    description: 'Expert in comprehensive adult medical care and chronic disease management.',
    image: 'https://images.unsplash.com/photo-1594824476962-12005671e584?auto=format&fit=crop&q=80',
    availableDays: ['Wed', 'Sat', 'Sun']
  }
];

const services = [
  {
    title: 'Orthopedics',
    description: 'Comprehensive care for bone and musculoskeletal injuries with advanced surgical techniques including arthroscopy and spine surgery.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80',
    features: ['Joint replacement surgery', 'Arthroscopy Treatment', 'Fracture Management', 'Sports Injury Treatment', 'Spine Surgery']
  },
  {
    title: 'General Surgery',
    description: 'Expert surgical care using minimally invasive techniques for faster recovery and better outcomes.',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80',
    features: ['Laparoscopic Surgery', 'Hernia repair', 'Thyroid Surgery', 'Appendix care', 'GI Surgery']
  },
  {
    title: 'Obstetrics & Gynaecology',
    description: 'Complete women\'s health services from pregnancy care to expert surgical support with compassionate support.',
    image: 'https://images.unsplash.com/photo-1584515933487-11895a9b7404?auto=format&fit=crop&q=80',
    features: ['Antenatal & Delivery Care', 'High Risk Pregnancy', 'Painless labor delivery', 'Infertility treatment', 'Family Planning']
  },
  {
    title: 'General Medicine',
    description: 'Providing full-scale healthcare for adults and children focused on clinical excellence and personalized care.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
    features: ['Chronic illness management', 'Hypertension care', 'Diabetes care', 'Vaccination', 'Preventive healthcare']
  },
  {
    title: 'Paediatrics & Neonatology',
    description: 'Specialists dedicated to infants, children and adolescents with intensive care facilities for newborns.',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80',
    features: ['Neonatal Intensive Care', 'Child vaccination', 'Growth monitoring', 'Pediatric emergency', 'Newborn care']
  },
  {
    title: 'Urology',
    description: 'Urological care focusing on kidney, bladder and surgical interventions for advanced medical treatments.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80',
    features: ['Kidney stone treatment', 'Prostate care', 'UTI treatment', 'Bladder disorders', 'Renal health']
  },
  {
    title: 'Gynaecologic Oncology',
    description: 'Specialized cancer treatment for women\'s reproductive system with comprehensive surgical and medical care.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80',
    features: ['Cervical cancer care', 'Ovarian cancer treatment', 'Uterine tumor biopsy', 'Cancer screening', 'Chemotherapy services']
  },
  {
    title: 'Surgical Oncology',
    description: 'Expert surgical treatment for various cancers with multi-disciplinary approach and advanced techniques.',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80',
    features: ['Breast surgery', 'Thyroid surgical', 'Breast Cancer Biopsy', 'G.I. cancer surgery', 'Skin tumor Biopsy']
  },
  {
    title: 'Neurology',
    description: 'Comprehensive treatment for complex brain and nervous system disorders with advanced diagnostic tools.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80',
    features: ['Stroke Management', 'Epilepsy treatment', 'Headache & Migraine', 'Parkinson\'s disease', 'Neuromuscular']
  },
  {
    title: 'ENT (Ear, Nose & Throat)',
    description: 'Complete care for ear, nose and throat problems with advanced treatments and surgical facilities.',
    image: 'https://images.unsplash.com/photo-1598128558393-70ff21430be0?auto=format&fit=crop&q=80',
    features: ['Hearing Disorders', 'Nasal Problems', 'Throat & Speech therapy', 'Sinus surgery', 'Sleep apnea treatment']
  },
  {
    title: 'Diagnostics & Pathology',
    description: 'State-of-the-art diagnostic testing with rapid and accurate result reporting to ensure precise treatment.',
    image: 'https://images.unsplash.com/photo-1579154236594-c199f346e104?auto=format&fit=crop&q=80',
    features: ['Laboratory services', 'Ultrasound scanner', 'Digital X-ray facilities', 'ECG & echo', 'Blood tests']
  },
  {
    title: 'Digital X-RAY',
    description: 'A higher step towards common healthcare medical procedures with high-standard visualization of the internal film.',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80',
    features: ['Radiography', 'Image Preservation', 'X-ray scanning', 'Institutional X-ray', 'Customized X-ray']
  }
];

const seedDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        
        console.log('Clearing existing data...');
        await Doctor.deleteMany({});
        await Service.deleteMany({});
        await User.deleteMany({});
        
        console.log('Inserting new data...');
        await Doctor.insertMany(doctors);
        await Service.insertMany(services);
        
        // Create Default Admin
        const adminPassword = 'admin123';
        const salt = await require('bcryptjs').genSalt(10);
        const hashedAdminPassword = await require('bcryptjs').hash(adminPassword, salt);
        
        await User.create({
            name: 'Super Admin',
            email: 'admin@supra.com',
            password: hashedAdminPassword,
            role: 'admin'
        });
        
        console.log('✅ Database Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding database:');
        console.error(error.message);
        process.exit(1);
    }
};

seedDB();
