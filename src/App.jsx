import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Calendar,
  Compass,
  Users,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Download,
  Luggage,
  Sparkles,
  Plane,
  Building2,
  Coffee,
  Sun,
  Sunset,
  Moon,
  TrendingUp,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';

const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)' },
  AED: { symbol: 'AED ', rate: 0.044, label: 'AED (د.إ)' },
};

const DESTINATIONS = {
  domestic: [
    {
      id: 'jaipur-udaipur',
      name: 'Jaipur & Udaipur',
      state: 'Rajasthan, India',
      rating: '4.9',
      reviews: '2.4k',
      type: 'Royal Heritage',
      tagline: 'Palaces, tranquil Pichola sunsets & regal Rajasthani hospitality',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=900&auto=format&fit=crop&q=80',
      avgDailyCostINR: 3500,
      highlights: ['Amber Fort & Sheesh Mahal', 'Lake Pichola private cruise', 'Authentic Dal Baati Churma'],
      weather: '24°C Sunny & Crisp',
      itineraryTemplates: [
        {
          morning: { title: 'Amer Fort Ramparts & Mirror Palace', desc: 'Ascend the rugged Aravalli hill fortress and marvel at thousand-mirror royal halls.', costINR: 600, tag: 'Must See' },
          afternoon: { title: 'Johari Bazaar & Handblock Artisan Tour', desc: 'Indulge in heirloom silver jewellery, vibrant leheriya fabrics, and spiced lassi.', costINR: 800, tag: 'Shopping' },
          evening: { title: 'Golden Hour at Nahargarh Fort', desc: 'Sunset panoramic vista overlooking the Pink City with hot ginger chai.', costINR: 400, tag: 'Sunset View' },
          foodSpot: 'Rawat Mishthan Bhandar for crisp Pyaaz Kachoris'
        },
        {
          morning: { title: 'City Palace & Astronomical Observatory', desc: 'Explore the Maharaja private courtyards and Jantar Mantar sun sundials.', costINR: 500, tag: 'Heritage' },
          afternoon: { title: 'Rooftop Cafe facing Hawa Mahal', desc: 'Chilled iced cold brew with postcard views of the honeycomb pink facade.', costINR: 450, tag: 'Scenic Dining' },
          evening: { title: 'Chokhi Dhani Cultural Immersion', desc: 'Folk musicians, fire breathers, camel rides, and grand Rajasthani thali feast.', costINR: 1200, tag: 'Culinary' },
          foodSpot: 'LMB Johari Bazaar for Royal Ghewar'
        },
        {
          morning: { title: 'Scenic Transfer to City of Lakes (Udaipur)', desc: 'Travel into the Mewar valley and check into a boutique lakefront Haveli.', costINR: 900, tag: 'Road Trip' },
          afternoon: { title: 'Udaipur Grand Palace & Crystal Gallery', desc: 'Granite-and-marble fortress rising majestically above Lake Pichola.', costINR: 700, tag: 'Palace' },
          evening: { title: 'Private Dusk Boat Ride on Pichola', desc: 'Glide past Taj Lake Palace & Jag Mandir island as illuminated ghats reflect on the water.', costINR: 1000, tag: 'Iconic' },
          foodSpot: 'Ambrai Restaurant for waterfront Laal Maas'
        }
      ]
    },
    {
      id: 'goa',
      name: 'Goa Coastal Circuit',
      state: 'Goa, India',
      rating: '4.8',
      reviews: '3.1k',
      type: 'Beaches & Bohemian',
      tagline: 'Azure Arabian shores, pastel Latin quarters & seaside cafes',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&auto=format&fit=crop&q=80',
      avgDailyCostINR: 4200,
      highlights: ['Palolem turquoise cove', 'Fontainhas Portuguese villas walk', 'Fresh Goan Crab Curry Thali'],
      weather: '29°C Coastal Breeze',
      itineraryTemplates: [
        {
          morning: { title: 'Artjuna Sunrise Cafe & Vagator Cliffs', desc: 'Organic breakfast smoothie bowls followed by dramatic views over Chapora Fort red cliffs.', costINR: 600, tag: 'Relaxed' },
          afternoon: { title: 'Water Sports & Shacks at Ashwem', desc: 'Uncrowded white sands, gentle waves, and fresh tender coconuts.', costINR: 1600, tag: 'Adventure' },
          evening: { title: 'Sunset Cocktails Overlooking the Bay', desc: 'Cliffside sunset lounge with live deep house and sea mist.', costINR: 1400, tag: 'Nightlife' },
          foodSpot: 'Vinayak Family Restaurant for legendary Fish Curry Thali'
        },
        {
          morning: { title: 'Fontainhas Latin Quarter Heritage Trail', desc: 'Stroll past lemon-yellow and cobalt blue Portuguese villas in Panaji.', costINR: 400, tag: 'Photography' },
          afternoon: { title: 'Old Goa Baroque Cathedrals', desc: 'Visit Basilica of Bom Jesus and lunch under canopy of Sahakari Spice Farm.', costINR: 900, tag: 'Culture' },
          evening: { title: 'Mandovi River Catamaran Cruise', desc: 'Live Goan brass rhythms and ocean sunset breeze on the top deck.', costINR: 800, tag: 'Cruising' },
          foodSpot: 'Viva Panjim for Prawn Balchão and sweet Bebinca'
        }
      ]
    },
    {
      id: 'manali-himachal',
      name: 'Manali & High Valleys',
      state: 'Himachal Pradesh, India',
      rating: '4.9',
      reviews: '1.9k',
      type: 'Alpine Adventure',
      tagline: 'Pine-clad valleys, glacial rivers & snow-covered Himalayan passes',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&auto=format&fit=crop&q=80',
      avgDailyCostINR: 3200,
      highlights: ['Atal Tunnel & Sissu glacier', 'Solang Valley tandem paragliding', 'Trout fishing in Old Manali'],
      weather: '12°C Crisp Alpine',
      itineraryTemplates: [
        {
          morning: { title: 'Hadimba Pagoda & Cedar Forest Hike', desc: 'Centuries-old deodar forests with cedar fragrance and prayer flags.', costINR: 200, tag: 'Nature' },
          afternoon: { title: 'Old Manali Bohemian Cafes', desc: 'Woodfired thin-crust pizza, apple crumbles, and acoustic riverside vibes.', costINR: 750, tag: 'Food & Chill' },
          evening: { title: 'Vashisht Natural Hot Springs', desc: 'Soak in medicinal mineral waters followed by mountain woolen shopping.', costINR: 300, tag: 'Wellness' },
          foodSpot: 'Cafe 1947 for freshly caught river trout'
        },
        {
          morning: { title: 'Atal Tunnel Transit to Lahaul Valley', desc: 'Cross the world’s longest highway tunnel above 10,000 ft into stark majestic mountains.', costINR: 1500, tag: 'Scenic Drive' },
          afternoon: { title: 'Sissu Glacial Waterfall & Zip-line', desc: 'Stunning ice-fed cascade with Himalayan mountain tea and photography.', costINR: 1100, tag: 'Adventure' },
          evening: { title: 'Solang Valley Paragliding Watch', desc: 'Steaming Maggi, ginger lemon honey tea, and watching colorful paragliders land.', costINR: 500, tag: 'Mountain Vibe' },
          foodSpot: 'Drifters’ Cafe for slow-cooked spiced mountain mutton'
        }
      ]
    },
    {
      id: 'kerala-backwaters',
      name: 'Alleppey & Munnar',
      state: 'Kerala, India',
      rating: '4.9',
      reviews: '2.8k',
      type: 'Tropical Serenity',
      tagline: 'Emerald tea terraces, misty waterfalls & tranquil houseboat canals',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&auto=format&fit=crop&q=80',
      avgDailyCostINR: 3800,
      highlights: ['Overnight private kettuvallam cruise', 'Munnar high-range tea mist', 'Spiced banana leaf feast'],
      weather: '22°C Emerald Breeze',
      itineraryTemplates: [
        {
          morning: { title: 'Kolukkumalai Sunrise & Tea Estate Tour', desc: 'World’s highest organic tea garden above clouds with freshly brewed estate leaves.', costINR: 700, tag: 'Top Rated' },
          afternoon: { title: 'Mattupetty Reservoir & Spice Trail', desc: 'Speed boating through blue lake waters fringed by wild cardamom plants.', costINR: 500, tag: 'Nature' },
          evening: { title: 'Kalaripayattu Martial Arts & Kathakali', desc: 'Traditional martial acrobatic showcase and dramatic temple face makeup.', costINR: 500, tag: 'Art & Heritage' },
          foodSpot: 'Rapsy Munnar for flaky Malabar Parottas'
        },
        {
          morning: { title: 'Board Alleppey Private Houseboat', desc: 'Step onto a handcrafted wooden boat drifting smoothly into serene backwater lagoons.', costINR: 3800, tag: 'Exclusive' },
          afternoon: { title: 'Canal Gliding & Fresh Catch Feast', desc: 'Onboard chef prepares spiced Karimeen (pearl spot) wrapped in scorched banana leaves.', costINR: 800, tag: 'Culinary' },
          evening: { title: 'Sunset over Endless Paddy Fields', desc: 'Anchor by calm village waters as fireflies gather over tranquil lotus canals.', costINR: 300, tag: 'Serene' },
          foodSpot: 'Fresh culinary spreads prepared by your onboard private chef'
        }
      ]
    }
  ],
  international: [
    {
      id: 'bali',
      name: 'Bali (Ubud & Seminyak)',
      state: 'Indonesia',
      rating: '4.9',
      reviews: '4.2k',
      type: 'Tropical Paradise',
      tagline: 'Terraced jungle valleys, cliffside ocean temples & beach clubs',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=80',
      avgDailyCostINR: 6500,
      highlights: ['Tegallalang emerald rice stairs', 'Uluwatu Sunset fire dance', 'Private villa floating breakfast'],
      weather: '29°C Tropical Warmth',
      itineraryTemplates: [
        {
          morning: { title: 'Tegallalang Rice Terrace & Canyon Swing', desc: 'Sunrise stroll through ancient irrigation terraces with high-altitude swing.', costINR: 1800, tag: 'Iconic' },
          afternoon: { title: 'Sacred Monkey Forest Sanctuary', desc: 'Moss-covered temples and wild macaques sheltered under towering banyan canopies.', costINR: 900, tag: 'Nature' },
          evening: { title: 'Traditional Balinese Spa & Duck Banquet', desc: 'Aromatic flower oil massage followed by crispy spiced duck in open rice fields.', costINR: 2200, tag: 'Wellness' },
          foodSpot: 'Bebek Bengil for authentic crispy Balinese duck'
        },
        {
          morning: { title: 'Seminyak Surf Session', desc: 'Private surf coaching on warm golden Indian Ocean breaks.', costINR: 2000, tag: 'Sport' },
          afternoon: { title: 'Beach Club Infinity Pool Lounging', desc: 'Swim-up cocktail bar, live DJs, and daybeds at Potato Head.', costINR: 2500, tag: 'Lifestyle' },
          evening: { title: 'Uluwatu Clifftop Kecak Fire Dance', desc: 'Rhythmic chanting against a fiery ocean sunset on a 70-meter ocean cliff.', costINR: 1500, tag: 'Spectacular' },
          foodSpot: 'Jimbaran Bay candlelit seafood dinner directly on the sand'
        }
      ]
    },
    {
      id: 'japan-tokyo-kyoto',
      name: 'Tokyo & Kyoto',
      state: 'Japan',
      rating: '5.0',
      reviews: '5.6k',
      type: 'Future & Tradition',
      tagline: 'Neon mega-skyscrapers, 10,000 torii gates & steaming ramen bars',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&auto=format&fit=crop&q=80',
      avgDailyCostINR: 12000,
      highlights: ['Shibuya Crossing observation', 'Fushimi Inari shrine path', 'Bullet train Shinkansen ride'],
      weather: '18°C Pleasant & Crisp',
      itineraryTemplates: [
        {
          morning: { title: 'Senso-ji Asakusa & Old Tokyo', desc: 'Giant red lantern entrance and sweet melonpan along historic stone paths.', costINR: 600, tag: 'Heritage' },
          afternoon: { title: 'Akihabara Tech & Shibuya Sky Deck', desc: 'Panoramic 360-degree glass view over the busiest intersection on earth.', costINR: 2200, tag: 'Skyline' },
          evening: { title: 'Omoide Yokocho Izakaya Alley', desc: 'Charcoal yakitori skewers and cold draught beer in cozy retro alleys.', costINR: 2500, tag: 'Nightlife' },
          foodSpot: 'Ichiran Ramen for custom private tonkotsu dining booths'
        },
        {
          morning: { title: 'Fushimi Inari Sacred Torii Gates', desc: 'Walk through thousands of vermilion shrine gates winding up the sacred mountain.', costINR: 500, tag: 'Iconic' },
          afternoon: { title: 'Arashiyama Bamboo Sanctuary', desc: 'Towering acoustic green bamboo stalks and panoramic monkey mountain.', costINR: 1200, tag: 'Nature' },
          evening: { title: 'Gion Historic Geisha District', desc: 'Preserved wooden machiya tea houses and multi-course Kaiseki cuisine.', costINR: 4000, tag: 'Fine Dining' },
          foodSpot: 'Gion Karyo for seasonal Kaiseki multi-course masterwork'
        }
      ]
    },
    {
      id: 'dubai',
      name: 'Dubai & Red Dunes',
      state: 'UAE',
      rating: '4.8',
      reviews: '3.7k',
      type: 'Modern Luxury',
      tagline: 'Architectural marvels, desert 4x4 safaris & Michelin-star dining',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&auto=format&fit=crop&q=80',
      avgDailyCostINR: 9500,
      highlights: ['Burj Khalifa 124th floor view', '4x4 Red Dunes desert safari', 'Dubai Creek heritage abra ride'],
      weather: '28°C Desert Sun',
      itineraryTemplates: [
        {
          morning: { title: 'Burj Khalifa Sky Deck & Mall Lagoon', desc: 'Stand above clouds on the world’s tallest tower looking out across the Gulf.', costINR: 3500, tag: 'Record Breaker' },
          afternoon: { title: 'Old Deira Gold Souk & Wooden Abra Ride', desc: 'Cross the salt creek on a traditional 1 AED boat to explore aromatic spice souks.', costINR: 800, tag: 'Heritage' },
          evening: { title: 'Choreographed Fountain Dining', desc: 'Watch illuminated fountains dance to orchestral scores right beside Burj Lake.', costINR: 2200, tag: 'Spectacular' },
          foodSpot: 'Al Ustad Special Kebab for historic charcoal grills'
        },
        {
          morning: { title: 'Museum of the Future Interactive Tour', desc: 'Step into architectural Arabic calligraphy showing innovations for 2071.', costINR: 3200, tag: 'Futuristic' },
          afternoon: { title: 'High Red Dunes 4x4 Desert Safari', desc: 'Dune bashing, sandboarding, and sunset camel treks in the golden desert.', costINR: 3000, tag: 'Adventure' },
          evening: { title: 'Bedouin Camp Feast & Fire Acrobatics', desc: 'Tanoura spinning dances, starlit dining, and grilled shish tawook.', costINR: 1500, tag: 'Cultural Dinner' },
          foodSpot: 'Bu Qtair for hot spiced fresh fish caught daily'
        }
      ]
    }
  ]
};

export default function App() {
  const [scope, setScope] = useState('domestic');
  const [currency, setCurrency] = useState('INR');
  const [selectedDestId, setSelectedDestId] = useState('jaipur-udaipur');
  const [daysCount, setDaysCount] = useState(3);
  const [groupType, setGroupType] = useState('couple');
  const [budgetTier, setBudgetTier] = useState('moderate');
  const [activeDayTab, setActiveDayTab] = useState(1);

  const [packingItems, setPackingItems] = useState([
    { id: 1, text: 'Aadhaar / Passport & E-Visas', done: true, tag: 'Docs' },
    { id: 2, text: 'Powerbank & Fast Chargers', done: true, tag: 'Gear' },
    { id: 3, text: 'UPI Apps & Forex Card with zero markup', done: false, tag: 'Money' },
    { id: 4, text: 'UV Sunscreen SPF 50+ & Sunglasses', done: false, tag: 'Care' },
    { id: 5, text: 'Comfortable Breathable Walking Shoes', done: false, tag: 'Wear' },
    { id: 6, text: 'First Aid & Emergency Prescription Kit', done: false, tag: 'Medical' },
  ]);
  const [newPackingText, setNewPackingText] = useState('');

  const [customActivities, setCustomActivities] = useState({});
  const [newActivityTitle, setNewActivityTitle] = useState('');
  const [newActivityCost, setNewActivityCost] = useState('');

  const handleScopeChange = (newScope) => {
    setScope(newScope);
    const firstInList = DESTINATIONS[newScope][0].id;
    setSelectedDestId(firstInList);
    setActiveDayTab(1);
  };

  const activeDestination = useMemo(() => {
    const list = DESTINATIONS[scope];
    return list.find((d) => d.id === selectedDestId) || list[0];
  }, [scope, selectedDestId]);

  const formatCost = (costINR) => {
    const info = CURRENCIES[currency];
    const converted = Math.round(costINR * info.rate);
    return `${info.symbol}${converted.toLocaleString()}`;
  };

  const groupMultiplier = useMemo(() => {
    switch (groupType) {
      case 'solo': return 1.0;
      case 'couple': return 1.8;
      case 'friends': return 3.2;
      case 'family': return 3.6;
      default: return 1.0;
    }
  }, [groupType]);

  const tierMultiplier = useMemo(() => {
    switch (budgetTier) {
      case 'budget': return 0.65;
      case 'moderate': return 1.0;
      case 'luxury': return 2.1;
      default: return 1.0;
    }
  }, [budgetTier]);

  const totalTripBudgetINR = useMemo(() => {
    const baseDaily = activeDestination.avgDailyCostINR * daysCount * groupMultiplier * tierMultiplier;
    const customTotal = Object.values(customActivities).flat().reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);
    return Math.round(baseDaily + customTotal);
  }, [activeDestination, daysCount, groupMultiplier, tierMultiplier, customActivities]);

  const breakdown = useMemo(() => {
    const stay = Math.round(totalTripBudgetINR * 0.40);
    const food = Math.round(totalTripBudgetINR * 0.25);
    const activities = Math.round(totalTripBudgetINR * 0.20);
    const transport = Math.round(totalTripBudgetINR * 0.15);
    return { stay, food, activities, transport };
  }, [totalTripBudgetINR]);

  const itineraryDays = useMemo(() => {
    const templates = activeDestination.itineraryTemplates;
    const days = [];
    for (let i = 1; i <= daysCount; i++) {
      const template = templates[(i - 1) % templates.length];
      days.push({
        dayNumber: i,
        ...template,
      });
    }
    return days;
  }, [activeDestination, daysCount]);

  const currentDayData = useMemo(() => {
    return itineraryDays.find((d) => d.dayNumber === activeDayTab) || itineraryDays[0];
  }, [itineraryDays, activeDayTab]);

  const handleAddPackingItem = (e) => {
    e.preventDefault();
    if (!newPackingText.trim()) return;
    setPackingItems((prev) => [
      ...prev,
      { id: Date.now(), text: newPackingText.trim(), done: false, tag: 'Custom' },
    ]);
    setNewPackingText('');
  };

  const togglePackingItem = (id) => {
    setPackingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const deletePackingItem = (id) => {
    setPackingItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddCustomActivity = (e) => {
    e.preventDefault();
    if (!newActivityTitle.trim()) return;
    const cost = Number(newActivityCost) || 0;
    setCustomActivities((prev) => ({
      ...prev,
      [activeDayTab]: [
        ...(prev[activeDayTab] || []),
        { id: Date.now(), title: newActivityTitle.trim(), cost },
      ],
    }));
    setNewActivityTitle('');
    setNewActivityCost('');
  };

  const deleteCustomActivity = (dayNum, actId) => {
    setCustomActivities((prev) => ({
      ...prev,
      [dayNum]: (prev[dayNum] || []).filter((a) => a.id !== actId),
    }));
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-150 antialiased font-sans flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* BACKGROUND AMBIENT GLOWS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[160px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px]" />
      </div>

      {/* TOP HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#07090e]/80 border-b border-white/[0.06] px-5 sm:px-10 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-500 p-[1.5px] shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-[#0a0d14] rounded-[14px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">YatraFlow</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  AI v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Intelligent Domestic & International Travel Architect</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <div className="flex items-center bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] rounded-xl px-2.5 py-1.5 transition-all">
              <Wallet className="w-4 h-4 text-emerald-400 mr-2" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer pr-1"
              >
                {Object.entries(CURRENCIES).map(([code, info]) => (
                  <option key={code} value={code} className="bg-slate-900 text-white">
                    {info.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO & CONTROLS */}
      <section className="relative z-10 pt-8 pb-6 px-5 sm:px-10 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto space-y-7">
          {/* DOMESTIC / INTERNATIONAL MODERN TOGGLE */}
          <div className="flex justify-center">
            <div className="p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl flex items-center shadow-2xl">
              <button
                onClick={() => handleScopeChange('domestic')}
                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                  scope === 'domestic'
                    ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 text-white shadow-lg shadow-orange-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Explore Incredible India 🇮🇳</span>
              </button>
              <button
                onClick={() => handleScopeChange('international')}
                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                  scope === 'international'
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Plane className="w-4 h-4" />
                <span>Global Journeys ✈️</span>
              </button>
            </div>
          </div>

          {/* DESTINATION CARDS */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xs font-bold tracking-wider uppercase text-slate-400">
                  Select Your Route
                </h2>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {DESTINATIONS[scope].length} Curated Expeditions
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DESTINATIONS[scope].map((item) => {
                const isSelected = item.id === selectedDestId;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedDestId(item.id);
                      setActiveDayTab(1);
                    }}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                      isSelected
                        ? 'border-emerald-400/80 ring-2 ring-emerald-500/30 bg-[#0f1422] shadow-2xl shadow-emerald-500/10 scale-[1.02]'
                        : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.18] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="h-36 w-full overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/40 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10">
                          {item.type}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300">
                        <Star className="w-3 h-3 fill-amber-300" />
                        <span>{item.rating}</span>
                      </div>
                      <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                        <span className="text-[11px] text-emerald-400 font-medium">{item.weather}</span>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.tagline}</p>
                      </div>

                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                        <span className="text-slate-500">From / day:</span>
                        <span className="font-bold text-emerald-400 text-sm">
                          {formatCost(item.avgDailyCostINR)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DURATION, TRAVELERS & TIER CHIPS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Days Slider */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Trip Duration
                </span>
                <span className="text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  {daysCount} Days
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                value={daysCount}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setDaysCount(val);
                  if (activeDayTab > val) setActiveDayTab(1);
                }}
                className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-medium">
                <span>1 Day</span>
                <span>3 Days (Weekend)</span>
                <span>7 Days (Week)</span>
              </div>
            </div>

            {/* Travelers */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-xl">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-emerald-400" />
                Travel Group
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'solo', label: 'Solo' },
                  { id: 'couple', label: 'Couple' },
                  { id: 'friends', label: 'Squad' },
                  { id: 'family', label: 'Family' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGroupType(g.id)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      groupType === g.id
                        ? 'bg-emerald-400 text-slate-950 font-bold border-emerald-300 shadow-md shadow-emerald-500/20'
                        : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:border-white/[0.15] hover:text-white'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Comfort Style */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-xl">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Budget Tier
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'budget', label: 'Backpacker' },
                  { id: 'moderate', label: 'Comfort' },
                  { id: 'luxury', label: 'Luxury' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setBudgetTier(tier.id)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      budgetTier === tier.id
                        ? 'bg-emerald-400 text-slate-950 font-bold border-emerald-300 shadow-md shadow-emerald-500/20'
                        : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:border-white/[0.15] hover:text-white'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN WORKSPACE: ITINERARY & BUDGET */}
      <main className="max-w-7xl mx-auto px-5 sm:px-10 py-10 w-full flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* LEFT TWO COLUMNS: TABBED ITINERARY */}
        <div className="lg:col-span-2 space-y-6">
          {/* Destination Showcase Header */}
          <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 border border-white/[0.08] bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4" /> Verified Travel Blueprint
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {activeDestination.name}
                </h1>
                <p className="text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
                  {activeDestination.tagline}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] backdrop-blur-xl text-left sm:text-right shrink-0">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Total Trip Estimate
                </span>
                <span className="text-3xl font-black text-emerald-400 tracking-tight">
                  {formatCost(totalTripBudgetINR)}
                </span>
                <span className="text-[11px] text-slate-500 block mt-1 capitalize font-medium">
                  {daysCount} Days • {groupType} • {budgetTier} tier
                </span>
              </div>
            </div>

            {/* DAY SELECTOR TABS */}
            <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-1 scrollbar-none">
              {itineraryDays.map((d) => (
                <button
                  key={d.dayNumber}
                  onClick={() => setActiveDayTab(d.dayNumber)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shrink-0 ${
                    activeDayTab === d.dayNumber
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/25'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.05]'
                  }`}
                >
                  <span>Day {d.dayNumber}</span>
                  {activeDayTab === d.dayNumber && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVE DAY ITINERARY CARD */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.06] gap-2">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Day {currentDayData.dayNumber} Schedule</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Optimized for minimal transit and prime daylight</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
                <Coffee className="w-3.5 h-3.5" />
                <span>{currentDayData.foodSpot}</span>
              </div>
            </div>

            {/* MORNING */}
            <div className="group relative rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <Sun className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">08:30 AM • Morning</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300">
                        {currentDayData.morning.tag}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">
                      ~{formatCost(currentDayData.morning.costINR * groupMultiplier * tierMultiplier)}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {currentDayData.morning.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {currentDayData.morning.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* AFTERNOON */}
            <div className="group relative rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 shrink-0">
                  <Sunset className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">01:30 PM • Afternoon</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300">
                        {currentDayData.afternoon.tag}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">
                      ~{formatCost(currentDayData.afternoon.costINR * groupMultiplier * tierMultiplier)}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {currentDayData.afternoon.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {currentDayData.afternoon.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* EVENING */}
            <div className="group relative rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                  <Moon className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">06:45 PM • Evening</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300">
                        {currentDayData.evening.tag}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">
                      ~{formatCost(currentDayData.evening.costINR * groupMultiplier * tierMultiplier)}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {currentDayData.evening.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {currentDayData.evening.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* USER CUSTOM ACTIVITIES FOR THIS DAY */}
            {(customActivities[activeDayTab] || []).length > 0 && (
              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
                  Your Custom Stops Added for Day {activeDayTab}:
                </span>
                {(customActivities[activeDayTab] || []).map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 text-xs"
                  >
                    <span className="text-slate-200 font-semibold">{act.title}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400 font-bold">{formatCost(act.cost)}</span>
                      <button
                        onClick={() => deleteCustomActivity(activeDayTab, act.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ADD CUSTOM ACTIVITY FORM */}
            <form onSubmit={handleAddCustomActivity} className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder={`Add custom stop to Day ${activeDayTab} (e.g. Scuba diving, Souk walk)...`}
                value={newActivityTitle}
                onChange={(e) => setNewActivityTitle(e.target.value)}
                className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
              />
              <input
                type="number"
                placeholder="Cost in ₹"
                value={newActivityCost}
                onChange={(e) => setNewActivityCost(e.target.value)}
                className="w-full sm:w-28 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: BUDGET & SMART PACKING */}
        <div className="space-y-6">
          {/* BUDGET BREAKDOWN CARD */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span>Cost Analytics</span>
              </h3>
              <span className="text-[11px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10">
                AI Budget Model
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400">Accommodations (40%)</span>
                  <span className="font-bold text-white">{formatCost(breakdown.stay)}</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-[40%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400">Culinary & Dining (25%)</span>
                  <span className="font-bold text-white">{formatCost(breakdown.food)}</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[25%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400">Attractions & Entries (20%)</span>
                  <span className="font-bold text-white">{formatCost(breakdown.activities)}</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full w-[20%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400">Local Cabs & Transit (15%)</span>
                  <span className="font-bold text-white">{formatCost(breakdown.transport)}</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full w-[15%]" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Estimated Total Budget</span>
              <span className="text-xl font-black text-emerald-400">{formatCost(totalTripBudgetINR)}</span>
            </div>
          </div>

          {/* SMART PACKING CHECKLIST */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Luggage className="w-4 h-4 text-emerald-400" />
                <span>Smart Luggage Pack</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">
                {packingItems.filter((i) => i.done).length}/{packingItems.length} Checked
              </span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
              {packingItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => togglePackingItem(item.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                    item.done
                      ? 'bg-white/[0.01] border-white/[0.04] text-slate-600 line-through'
                      : 'bg-white/[0.03] border-white/[0.07] text-slate-200 hover:border-white/[0.14]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                    <span>{item.text}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePackingItem(item.id);
                    }}
                    className="text-slate-600 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddPackingItem} className="flex gap-2 pt-2 border-t border-white/[0.06]">
              <input
                type="text"
                placeholder="Add gear (e.g. jacket, shoes)..."
                value={newPackingText}
                onChange={(e) => setNewPackingText(e.target.value)}
                className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs transition-all"
              >
                Add
              </button>
            </form>
          </div>

          {/* LOCAL INSIGHTS */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Insider Route Tips</span>
            </h4>
            <ul className="text-xs text-slate-400 space-y-2.5 leading-relaxed">
              {activeDestination.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-8 text-center text-xs text-slate-500 relative z-10">
        <p>YatraFlow • Designed with React, Vite & Tailwind CSS</p>
      </footer>
    </div>
  );
}