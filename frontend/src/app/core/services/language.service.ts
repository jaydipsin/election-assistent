import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'hi';

export interface TranslationMap {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const TRANSLATIONS: TranslationMap = {
  // Header & Navigation
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.votingGuide': { en: 'Voting Guide', hi: 'मतदान गाइड' },
  'nav.electionTypes': { en: 'Election Types', hi: 'चुनाव प्रकार' },
  'nav.chatbot': { en: 'Ask Questions', hi: 'सवाल पूछें' },
  'nav.about': { en: 'About', hi: 'हमारे बारे में' },

  // Chatbot
  'chatbot.greeting': { en: 'Hello! I am your Matdaan Assistant. How can I help you today?', hi: 'नमस्ते! मैं आपका मतदान सहायक हूं। मैं आज आपकी क्या सहायता कर सकता हूं?' },
  'chatbot.subtitle': { 
    en: 'Ask anything about voting, registration, and elections in India. Powered by Gemini API.', 
    hi: 'भारत में मतदान, पंजीकरण और चुनावों के बारे में कुछ भी पूछें। मिथुन (Gemini) API द्वारा संचालित।' 
  },
  'chatbot.placeholder': { en: 'Type your question...', hi: 'अपना सवाल टाइप करें...' },
  'chatbot.defaultResponse': { en: 'That is a great question! For detailed information, please check the Voting Guide section or visit the official ECI website.', hi: 'यह एक अच्छा सवाल है! विस्तृत जानकारी के लिए, कृपया मतदान गाइड अनुभाग देखें या आधिकारिक ईसीआई वेबसाइट पर जाएं।' },
  'chatbot.regResponse': { en: 'To register as a new voter, you can visit the Voter Service Portal at voters.eci.gov.in and fill Form 6.', hi: 'नए मतदाता के रूप में पंजीकरण करने के लिए, आप voters.eci.gov.in पर मतदाता सेवा पोर्टल पर जा सकते हैं और फॉर्म 6 भर सकते हैं।' },
  'chatbot.idResponse': { en: 'Voter ID card (EPIC) is issued by the Election Commission. You can download a digital version (e-EPIC) from the portal.', hi: 'वोटर आईडी कार्ड (EPIC) चुनाव आयोग द्वारा जारी किया जाता है। आप पोर्टल से डिजिटल संस्करण (e-EPIC) डाउनलोड कर सकते हैं।' },

  // Hero Section
  'hero.title': { en: 'Your Complete', hi: 'आपकी संपूर्ण' },
  'hero.titleHighlight': { en: 'Voting Guide', hi: 'मतदान गाइड' },
  'hero.subtitle': {
    en: 'Learn everything about Indian elections — from voter registration to casting your vote. Free, accessible, and in your language.',
    hi: 'भारतीय चुनावों के बारे में सब कुछ जानें — मतदाता पंजीकरण से लेकर अपना वोट डालने तक। निःशुल्क, सुलभ, और आपकी भाषा में।'
  },
  'hero.cta': { en: 'Start Learning', hi: 'सीखना शुरू करें' },
  'hero.ctaSecondary': { en: 'Ask a Question', hi: 'सवाल पूछें' },

  // Feature Cards
  'features.title': { en: 'What You\'ll Learn', hi: 'आप क्या सीखेंगे' },
  'features.subtitle': {
    en: 'Everything a voter needs to know, explained simply',
    hi: 'एक मतदाता को जो कुछ भी जानना चाहिए, सरल भाषा में'
  },

  'feature.firstTimeVoter.title': { en: 'First-Time Voter Guide', hi: 'पहली बार मतदाता गाइड' },
  'feature.firstTimeVoter.desc': {
    en: 'New to voting? Learn how to register, get your voter ID, and prepare for your first election.',
    hi: 'पहली बार वोट दे रहे हैं? जानें कैसे रजिस्टर करें, वोटर आईडी प्राप्त करें, और पहले चुनाव की तैयारी करें।'
  },

  'feature.electionTypes.title': { en: 'Election Types Explained', hi: 'चुनाव प्रकार समझें' },
  'feature.electionTypes.desc': {
    en: 'Understand Lok Sabha, Rajya Sabha, State Assembly, and Local Body elections.',
    hi: 'लोकसभा, राज्यसभा, विधानसभा, और स्थानीय निकाय चुनावों को समझें।'
  },

  'feature.votingProcess.title': { en: 'Step-by-Step Voting', hi: 'चरण-दर-चरण मतदान' },
  'feature.votingProcess.desc': {
    en: 'Walk through the complete voting process — from entering the booth to using the EVM.',
    hi: 'मतदान की पूरी प्रक्रिया जानें — बूथ में प्रवेश से लेकर ईवीएम का उपयोग करने तक।'
  },
  'feature.booth.title': { en: 'Inside the Polling Booth', hi: 'मतदान केंद्र के अंदर' },
  'feature.booth.desc': {
    en: 'Experience a step-by-step interactive simulation of the physical journey inside a polling station.',
    hi: 'मतदान केंद्र के अंदर की शारीरिक यात्रा का चरण-दर-चरण संवादात्मक सिमुलेशन अनुभव करें।'
  },
  'feature.rights.title': { en: 'Voter Rights & Duties', hi: 'मतदाता के अधिकार और कर्तव्य' },
  'feature.rights.desc': {
    en: 'Learn about the secret ballot, NOTA, and your responsibility as a citizen of India.',
    hi: 'गुप्त मतदान, नोटा और भारत के नागरिक के रूप में अपनी जिम्मेदारी के बारे में जानें।'
  },

  // Statistics
  'stats.title': { en: 'Indian Democracy in Numbers', hi: 'संख्याओं में भारतीय लोकतंत्र' },
  'stats.elections': { en: 'General Elections Held', hi: 'आम चुनाव आयोजित' },
  'stats.voters': { en: 'Registered Voters (2026)', hi: 'पंजीकृत मतदाता (2026)' },
  'stats.constituencies': { en: 'Lok Sabha Constituencies', hi: 'लोकसभा निर्वाचन क्षेत्र' },
  'stats.turnout': { en: 'Avg. Voter Turnout (2026)', hi: 'औसत मतदान प्रतिशत (2026)' },

  // Footer
  'footer.disclaimer': {
    en: 'This is an educational platform only. We are not affiliated with the Election Commission of India or any political party.',
    hi: 'यह केवल एक शैक्षिक मंच है। हम भारत निर्वाचन आयोग या किसी राजनीतिक दल से संबद्ध नहीं हैं।'
  },
  'footer.madeWith': { en: 'Made with ❤️ for Indian Democracy', hi: '❤️ भारतीय लोकतंत्र के लिए बनाया गया' },
  'footer.educational': { en: 'Educational Purpose Only', hi: 'केवल शैक्षिक उद्देश्य' },

  // Language
  'lang.toggle': { en: 'हिंदी', hi: 'English' },
  'lang.current': { en: 'EN', hi: 'HI' },

  // Common
  'common.learnMore': { en: 'Learn More', hi: 'और जानें' },
  'common.getStarted': { en: 'Get Started', hi: 'शुरू करें' },
  'common.explore': { en: 'Explore', hi: 'जानें' },
  'common.back': { en: 'Back', hi: 'वापस' },
  'common.next': { en: 'Next', hi: 'आगे' },
  'common.close': { en: 'Close', hi: 'बंद करें' },
  'guide.comingSoon': { en: 'Detailed Info Coming Soon', hi: 'विस्तृत जानकारी जल्द ही' },
  'guide.workingOnIt': { en: 'We are working on providing comprehensive details for this section.', hi: 'हम इस अनुभाग के लिए व्यापक विवरण प्रदान करने पर काम कर रहे हैं।' },
  'guide.subtitle': { en: 'Your complete guide to voting in India — from registration to casting your ballot.', hi: 'भारत में मतदान के लिए आपकी संपूर्ण गाइड — पंजीकरण से लेकर मतदान तक।' },

  // Voting Journey Steps
  'journey.title': { en: 'Voting Day Journey', hi: 'मतदान दिवस की यात्रा' },
  'journey.lok-sabha.title': { en: 'Lok Sabha', hi: 'लोकसभा' },
  'journey.lok-sabha.context': { en: 'General Elections for Member of Parliament.', hi: 'संसद सदस्य के लिए आम चुनाव।' },
  'journey.vidhan-sabha.title': { en: 'Vidhan Sabha', hi: 'विधानसभा' },
  'journey.vidhan-sabha.context': { en: 'State Assembly Elections for MLA.', hi: 'विधायक के लिए राज्य विधानसभा चुनाव।' },
  'journey.panchayat.title': { en: 'Panchayat', hi: 'पंचायत' },
  'journey.panchayat.context': { en: 'Rural Local Body Elections.', hi: 'ग्रामीण स्थानीय निकाय चुनाव।' },
  'journey.municipal.title': { en: 'Municipal', hi: 'नगर पालिका' },
  'journey.municipal.context': { en: 'Urban Local Body Elections.', hi: 'शहरी स्थानीय निकाय चुनाव।' },
  'journey.step1.title': { en: 'Before Election Day', hi: 'चुनाव के दिन से पहले' },
  'journey.step1.desc': { en: 'Ensure your name is in the voter list and locate your polling booth. Check your Voter ID (EPIC) details.', hi: 'सुनिश्चित करें कि आपका नाम मतदाता सूची में है और अपने मतदान केंद्र का पता लगाएं। अपने वोटर आईडी (EPIC) विवरण की जांच करें।' },
  
  'journey.step2.title': { en: 'Reaching the Station', hi: 'मतदान केंद्र पहुंचना' },
  'journey.step2.desc': { en: 'Polling stations are open from 7 AM to 6 PM. Bring your Voter ID or any other approved photo ID.', hi: 'मतदान केंद्र सुबह 7 बजे से शाम 6 बजे तक खुले रहते हैं। अपना वोटर आईडी या कोई अन्य स्वीकृत फोटो आईडी साथ लाएं।' },
  
  'journey.step3.title': { en: 'Queue & Entry', hi: 'कतार और प्रवेश' },
  'journey.step3.desc': { en: 'Join the queue. Only one voter is allowed inside the polling booth at a time for privacy.', hi: 'कतार में लगें। गोपनीयता के लिए मतदान केंद्र के अंदर एक समय में केवल एक मतदाता को जाने की अनुमति है।' },
  
  'journey.step4.title': { en: 'Identity Verification', hi: 'पहचान का सत्यापन' },
  'journey.step4.desc': { en: 'The Polling Officer will check your name, apply indelible ink on your finger, and take your signature.', hi: 'मतदान अधिकारी आपके नाम की जांच करेगा, आपकी उंगली पर अमिट स्याही लगाएगा और आपके हस्ताक्षर लेगा।' },
  
  'journey.step5.title': { en: 'EVM Explanation', hi: 'ईवीएम की जानकारी' },
  'journey.step5.desc': { en: 'Electronic Voting Machine consists of a Control Unit and a Ballot Unit connected by a cable.', hi: 'इलेक्ट्रॉनिक वोटिंग मशीन में एक कंट्रोल यूनिट और एक बैलेट यूनिट होती है जो एक केबल से जुड़ी होती है।' },
  
  'journey.step6.title': { en: 'VVPAT Understanding', hi: 'VVPAT को समझना' },
  'journey.step6.desc': { en: 'VVPAT prints a slip showing your choice. It stays visible for 7 seconds before falling into a box.', hi: 'VVPAT आपकी पसंद को दर्शाने वाली एक पर्ची प्रिंट करता है। यह बॉक्स में गिरने से पहले 7 सेकंड तक दिखाई देती है।' },
  
  'journey.step7.title': { en: 'Casting Your Vote', hi: 'अपना वोट डालें' },
  'journey.step7.desc': { en: 'Press the blue button against your chosen candidate. Wait for the loud beep sound.', hi: 'अपने पसंदीदा उम्मीदवार के सामने वाला नीला बटन दबाएं। तेज बीप की आवाज का इंतजार करें।' },
  
  'journey.step8.title': { en: 'After Voting', hi: 'मतदान के बाद' },
  'journey.step8.desc': { en: 'Exit the station and show your inked finger with pride! You have contributed to democracy.', hi: 'केंद्र से बाहर निकलें और गर्व के साथ अपनी स्याही लगी उंगली दिखाएं! आपने लोकतंत्र में योगदान दिया है।' },

  // Journey Interactive
  'journey.tryIt': { en: 'Try It Yourself', hi: 'स्वयं प्रयास करें' },
  'journey.voteSim': { en: 'EVM Simulator', hi: 'ईवीएम सिम्युलेटर' },
  'journey.candidate': { en: 'Candidate', hi: 'उम्मीदवार' },
  'journey.pressButton': { en: 'Press Blue Button', hi: 'नीला बटन दबाएं' },
  'journey.beep': { en: 'BEEP!', hi: 'बीप!' },
  'journey.slipVisible': { en: 'VVPAT Slip Visible', hi: 'VVPAT पर्ची दिखाई दे रही है' },
  'journey.congrats': { en: 'Congratulations! You Voted.', hi: 'बधाई हो! आपने वोट दिया।' },
  'journey.dos': { en: 'Do\'s', hi: 'क्या करें' },
  'journey.donts': { en: 'Don\'ts', hi: 'क्या न करें' },
  'journey.bringId': { en: 'Bring valid ID', hi: 'वैध आईडी लाएं' },
  'journey.noMobile': { en: 'No mobiles allowed', hi: 'मोबाइल की अनुमति नहीं है' },
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = signal<Language>('en');

  readonly language = this.currentLang.asReadonly();
  readonly isHindi = computed(() => this.currentLang() === 'hi');
  readonly isEnglish = computed(() => this.currentLang() === 'en');

  constructor() {
    const saved = localStorage.getItem('matdaan-lang') as Language;
    if (saved === 'hi' || saved === 'en') {
      this.currentLang.set(saved);
    }
  }

  toggleLanguage(): void {
    const newLang: Language = this.currentLang() === 'en' ? 'hi' : 'en';
    this.currentLang.set(newLang);
    localStorage.setItem('matdaan-lang', newLang);
    document.documentElement.lang = newLang;
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    localStorage.setItem('matdaan-lang', lang);
    document.documentElement.lang = lang;
  }

  t(key: string): string {
    const translation = TRANSLATIONS[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[this.currentLang()];
  }

  translate(key: string): string {
    return this.t(key);
  }
}
