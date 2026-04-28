import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '@core/services/language.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-first-time-voter',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './first-time-voter.component.html',
  styleUrl: './first-time-voter.component.scss'
})
export class FirstTimeVoterComponent {
  lang = inject(LanguageService);

  steps = [
    {
      id: 1,
      title: { en: 'Eligibility Check', hi: 'पात्रता जांच' },
      description: { 
        en: 'You must be an Indian citizen and 18 years of age or older on the qualifying date.', 
        hi: 'आपको भारतीय नागरिक होना चाहिए और अर्हता तिथि पर आपकी आयु 18 वर्ष या उससे अधिक होनी चाहिए।' 
      },
      icon: '🆔'
    },
    {
      id: 2,
      title: { en: 'Registration (Form 6)', hi: 'पंजीकरण (फॉर्म 6)' },
      description: { 
        en: 'Fill out Form 6 via the Voter Helpline App or the National Voter\'s Service Portal (voters.eci.gov.in).', 
        hi: 'वोटर हेल्पलाइन ऐप या राष्ट्रीय मतदाता सेवा पोर्टल (voters.eci.gov.in) के माध्यम से फॉर्म 6 भरें।' 
      },
      icon: '📝',
      link: 'https://voters.eci.gov.in/',
      linkText: { en: 'Visit NVSP Portal', hi: 'NVSP पोर्टल पर जाएं' }
    },
    {
      id: 3,
      title: { en: 'Verification Process', hi: 'सत्यापन प्रक्रिया' },
      description: { 
        en: 'A Booth Level Officer (BLO) will visit your address for physical verification, or you can track it online.', 
        hi: 'एक बूथ स्तर का अधिकारी (BLO) भौतिक सत्यापन के लिए आपके पते पर आएगा, या आप इसे ऑनलाइन ट्रैक कर सकते हैं।' 
      },
      icon: '🔍'
    },
    {
      id: 4,
      title: { en: 'EPIC Generation', hi: 'EPIC जेनरेशन' },
      description: { 
        en: 'Once approved, your Electoral Photo Identity Card (EPIC) is generated. You can download the e-EPIC.', 
        hi: 'एक बार स्वीकृत होने के बाद, आपका चुनावी फोटो पहचान पत्र (EPIC) तैयार हो जाता है। आप ई-EPIC डाउनलोड कर सकते हैं।' 
      },
      icon: '💳'
    },
    {
      id: 5,
      title: { en: 'Final Roll Check', hi: 'अंतिम रोल जांच' },
      description: { 
        en: 'Before elections, verify your name in the final electoral roll to ensure you can cast your vote.', 
        hi: 'चुनाव से पहले, यह सुनिश्चित करने के लिए कि आप अपना नाम मतदाता सूची में जांच लें।' 
      },
      icon: '✅'
    },
    {
      id: 6,
      title: { en: 'Locate Polling Booth', hi: 'मतदान केंद्र खोजें' },
      description: { 
        en: 'Use the Electoral Search portal or Voter Helpline app to find the exact location of your assigned polling station.', 
        hi: 'अपने निर्दिष्ट मतदान केंद्र का सटीक स्थान खोजने के लिए मतदाता खोज पोर्टल या वोटर हेल्पलाइन ऐप का उपयोग करें।' 
      },
      icon: '📍'
    }
  ];
}
