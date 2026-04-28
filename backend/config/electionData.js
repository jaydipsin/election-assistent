module.exports = {
  "lok-sabha": {
    "title": "Lok Sabha (General Elections)",
    "context": "Choosing Member of Parliament (MP) to form the Central Government.",
    "rules": [
      "Voter must be 18+ years of age.",
      "Name must be on the ECI central electoral roll.",
      "Need valid EPIC (Voter ID) or one of 11 approved alternative IDs."
    ],
    "steps": [
      { "id": "check_name", "title": "Check Name", "description": "Verify your name in the central electoral roll." },
      { "id": "booth", "title": "Go to Booth", "description": "Identify your assigned polling station." },
      { "id": "ink", "title": "Ink & ID Check", "description": "Get your finger inked and show your ID." },
      { "id": "vote", "title": "Press Button", "description": "Press 1 Button on EVM for your chosen MP candidate." },
      { "id": "vvpat", "title": "Check VVPAT", "description": "Verify the printed slip in the VVPAT for 7 seconds." }
    ]
  },
  "vidhan-sabha": {
    "title": "Vidhan Sabha (State Assembly)",
    "context": "Choosing Member of Legislative Assembly (MLA) to form the State Government.",
    "rules": [
      "Voter must be 18+ years of age.",
      "Name must be on the ECI state electoral roll.",
      "Need valid EPIC (Voter ID) or one of 11 approved alternative IDs."
    ],
    "steps": [
      { "id": "check_name", "title": "Check Name", "description": "Verify your name in the state assembly roll." },
      { "id": "booth", "title": "Go to Booth", "description": "Reach your assembly constituency booth." },
      { "id": "ink", "title": "Ink & ID Check", "description": "Verification by polling officers." },
      { "id": "vote", "title": "Press Button", "description": "Press 1 Button on EVM for your MLA candidate." },
      { "id": "vvpat", "title": "Check VVPAT", "description": "Verify the printed slip in the VVPAT." }
    ]
  },
  "panchayat": {
    "title": "Panchayat (Rural Local Bodies)",
    "context": "Choosing the 3-tier rural local government (Panchayat Samiti, Zila Parishad, Gram Panchayat).",
    "rules": [
      "CRITICAL: Name MUST be on the State Election Commission's local ward roll.",
      "Specific for rural residents of the respective village/ward."
    ],
    "steps": [
      { "id": "check_ward", "title": "Check Ward Roll", "description": "Ensure your name is in the local ward voter list." },
      { "id": "booth", "title": "Go to Booth", "description": "Reach the local village school or booth." },
      { "id": "id_check", "title": "ID Check", "description": "Show your ID to the local polling officer." },
      { "id": "ballots", "title": "Cast 4 Votes", "description": "Cast 4 votes: 1 for Ward Member (Panch), 1 for Sarpanch, 1 for Samiti Member, and 1 for Zila Parishad Member." },
      { "id": "submit", "title": "Fold/Press", "description": "Fold ballot papers carefully or press EVM buttons as instructed." },
      { "id": "ink", "title": "Ink", "description": "Get the indelible ink mark." }
    ]
  },
  "municipal": {
    "title": "Municipal (Urban Local Bodies)",
    "context": "Choosing urban city/town leadership (Corporators and Mayor).",
    "rules": [
      "CRITICAL: Name MUST be on the State Election Commission's urban ward roll.",
      "Specific for urban residents of the respective ward."
    ],
    "steps": [
      { "id": "check_ward", "title": "Check Ward Roll", "description": "Verify your name in the urban ward list." },
      { "id": "booth", "title": "Go to Booth", "description": "Reach the urban polling station." },
      { "id": "id_check", "title": "ID Check", "description": "Standard ID verification process." },
      { "id": "vote", "title": "Cast 1-2 Votes", "description": "Cast votes for Ward Councillor (Corporator) and potentially for Mayor/Chairperson." },
      { "id": "submit", "title": "Submit Vote", "description": "Press EVM button or fold ballot paper." },
      { "id": "ink", "title": "Ink", "description": "Final ink marking before exit." }
    ]
  }
};
