import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '@core/services/language.service';

@Component({
  selector: 'app-election-types',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './election-types.component.html',
  styleUrl: './election-types.component.scss'
})
export class ElectionTypesComponent {
  lang = inject(LanguageService);

  electionTypes = [
    {
      id: 'lok-sabha',
      titleEn: 'Lok Sabha',
      titleHi: 'लोकसभा',
      descEn: 'Also known as the House of the People. Members are directly elected by the people.',
      descHi: 'इसे हाउस ऑफ द पीपल के रूप में भी जाना जाता है। सदस्य सीधे जनता द्वारा चुने जाते हैं।',
      icon: 'users'
    },
    {
      id: 'rajya-sabha',
      titleEn: 'Rajya Sabha',
      titleHi: 'राज्यसभा',
      descEn: 'Also known as the Council of States. Members are elected by State Legislative Assemblies.',
      descHi: 'इसे काउंसिल ऑफ स्टेट्स के रूप में भी जाना जाता है। सदस्य राज्य विधानसभाओं द्वारा चुने जाते हैं।',
      icon: 'landmark'
    },
    {
      id: 'vidhan-sabha',
      titleEn: 'State Legislative Assembly',
      titleHi: 'विधानसभा',
      descEn: 'Members are directly elected by the people of the respective state.',
      descHi: 'सदस्य संबंधित राज्य की जनता द्वारा सीधे चुने जाते हैं।',
      icon: 'map'
    },
    {
      id: 'local-bodies',
      titleEn: 'Local Bodies',
      titleHi: 'स्थानीय निकाय',
      descEn: 'Elections for Municipalities and Panchayats at the local level.',
      descHi: 'स्थानीय स्तर पर नगर पालिकाओं और पंचायतों के लिए चुनाव।',
      icon: 'home'
    }
  ];
}
