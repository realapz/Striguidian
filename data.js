const STRINOVA_DATA = [
  {
    "id": "marina",
    "name": "Marina",
    "role": "Duelist",
    "weaponName": "M32 Grenade Launcher",
    "weaponType": "Grenade Launcher",
    "themeColor": "#ff4a8b",
    "upgradePairs": [
      {
        "category": "Firepower",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "effect": "Increases explosion splash damage by +5%",
          "consensus": 92
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Rate of Fire",
          "effect": "Increases weapon firing speed by +8%",
          "consensus": 8
        }
      },
      {
        "category": "Precision",
        "recommended": "A",
        "buyPriority": 4,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "effect": "Increases headshot multiplier by +15%",
          "consensus": 70
        },
        "optionB": {
          "id": "string_dmg",
          "name": "String Damage",
          "effect": "Increases string connection damage by +10%",
          "consensus": 30
        }
      },
      {
        "category": "Sustain",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "effect": "Reduces reload duration by -15%",
          "consensus": 85
        },
        "optionB": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "effect": "Adds +2 grenades to total magazine size",
          "consensus": 15
        }
      },
      {
        "category": "Handling",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "effect": "Reduces weapon projectile spread bloom by -20%",
          "consensus": 20
        },
        "optionB": {
          "id": "recoil_control",
          "name": "Recoil Control",
          "effect": "Reduces explosive weapon recoil bump by -15%",
          "consensus": 80
        }
      }
    ]
  },
  {
    "id": "michele",
    "name": "Michele",
    "role": "Duelist",
    "weaponName": "Pioneer",
    "weaponType": "Assault Rifle",
    "themeColor": "#00f0ff",
    "upgradePairs": [
      {
        "category": "Firepower",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "effect": "Increases base bullet damage by +5%",
          "consensus": 12
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Rate of Fire",
          "effect": "Increases rifle firing rate by +10%",
          "consensus": 88
        }
      },
      {
        "category": "Precision",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "effect": "Increases rifle headshot multiplier by +15%",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "String Damage",
          "effect": "Increases string connection damage by +10%",
          "consensus": 5
        }
      },
      {
        "category": "Sustain",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "effect": "Reduces rifle reload duration by -12%",
          "consensus": 35
        },
        "optionB": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "effect": "Adds +5 rounds to active magazine size",
          "consensus": 65
        }
      },
      {
        "category": "Handling",
        "recommended": "B",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "effect": "Reduces weapon hipfire spread bloom by -15%",
          "consensus": 22
        },
        "optionB": {
          "id": "recoil_control",
          "name": "Recoil Control",
          "effect": "Reduces rifle kick and recoil bump by -20%",
          "consensus": 78
        }
      }
    ]
  },
  {
    "id": "audrey",
    "name": "Audrey",
    "role": "Vanguard",
    "weaponName": "Mona",
    "weaponType": "Light Machine Gun",
    "themeColor": "#ff9f00",
    "upgradePairs": [
      {
        "category": "Firepower",
        "recommended": "A",
        "buyPriority": 2,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "effect": "Increases base round damage by +5%",
          "consensus": 82
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Rate of Fire",
          "effect": "Increases LMG firing speed by +8%",
          "consensus": 18
        }
      },
      {
        "category": "Precision",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "effect": "Increases LMG headshot multiplier by +12%",
          "consensus": 40
        },
        "optionB": {
          "id": "string_dmg",
          "name": "String Damage",
          "effect": "Increases string connection damage by +10%",
          "consensus": 60
        }
      },
      {
        "category": "Sustain",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "effect": "Adds +15 rounds to the weapon magazine",
          "consensus": 90
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "effect": "Reduces heavy LMG reload duration by -12%",
          "consensus": 10
        }
      },
      {
        "category": "Handling",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "effect": "Improves steady firing spread by -20%",
          "consensus": 75
        },
        "optionB": {
          "id": "recoil_control",
          "name": "Recoil Control",
          "effect": "Reduces persistent recoil rise by -15%",
          "consensus": 25
        }
      }
    ]
  },
  {
    "id": "kokona",
    "name": "Kokona",
    "role": "Support",
    "weaponName": "Heartseeker",
    "weaponType": "Submachine Gun",
    "themeColor": "#10b981",
    "upgradePairs": [
      {
        "category": "Firepower",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "effect": "Increases base SMG bullet damage by +5%",
          "consensus": 30
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Rate of Fire",
          "effect": "Increases SMG weapon firing rate by +8%",
          "consensus": 70
        }
      },
      {
        "category": "Precision",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "effect": "Increases headshot multiplier by +12%",
          "consensus": 15
        },
        "optionB": {
          "id": "string_dmg",
          "name": "String Damage",
          "effect": "Increases string connection damage by +10%",
          "consensus": 85
        }
      },
      {
        "category": "Sustain",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "effect": "Reduces SMG reload duration by -15%",
          "consensus": 96
        },
        "optionB": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "effect": "Adds +4 rounds to SMG magazine size",
          "consensus": 4
        }
      },
      {
        "category": "Handling",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "effect": "Reduces SMG bullet spread diameter by -15%",
          "consensus": 72
        },
        "optionB": {
          "id": "recoil_control",
          "name": "Recoil Control",
          "effect": "Reduces horizontal SMG recoil kick by -15%",
          "consensus": 28
        }
      }
    ]
  },
  {
    "id": "melinda",
    "name": "Melinda",
    "role": "Sentinel",
    "weaponName": "Eagle Eye",
    "weaponType": "Sniper Rifle",
    "themeColor": "#a855f7",
    "upgradePairs": [
      {
        "category": "Firepower",
        "recommended": "A",
        "buyPriority": 2,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "effect": "Increases sniper body-shot damage by +8%",
          "consensus": 86
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Rate of Fire",
          "effect": "Reduces bolt-action reset time by -10%",
          "consensus": 14
        }
      },
      {
        "category": "Precision",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "effect": "Increases headshot multiplier by +25%",
          "consensus": 98
        },
        "optionB": {
          "id": "string_dmg",
          "name": "String Damage",
          "effect": "Increases string connection damage by +10%",
          "consensus": 2
        }
      },
      {
        "category": "Sustain",
        "recommended": "A",
        "buyPriority": 4,
        "optionA": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "effect": "Reduces sniper reload duration by -10%",
          "consensus": 62
        },
        "optionB": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "effect": "Adds +1 sniper round per reload load",
          "consensus": 38
        }
      },
      {
        "category": "Handling",
        "recommended": "B",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "effect": "Reduces scope transition sway by -20%",
          "consensus": 20
        },
        "optionB": {
          "id": "recoil_control",
          "name": "Recoil Control",
          "effect": "Reduces scope recovery recoil kick by -15%",
          "consensus": 80
        }
      }
    ]
  }
];
