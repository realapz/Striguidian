const STRINOVA_DATA = [
  {
    "id": "audrey",
    "name": "Audrey",
    "role": "Sentinel",
    "weaponType": "LMG",
    "themeColor": "#fff34a",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/1/16/Audrey_Profile.png/100px-Audrey_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 92
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 8
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 4,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 70
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 30
        }
      },
      {
        "category": "Functions",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "sprint_speed",
          "name": "Sprint Speed",
          "consensus": 85
        },
        "optionB": {
          "id": "ads_speed_and_weapon_switch",
          "name": "ADS Speed and Weapon Switch",
          "consensus": 15
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 20
        },
        "optionB": {
          "id": "recoil_handling",
          "name": "Recoil Handling",
          "consensus": 80
        }
      }

    ]
  },
  {
    "id": "bai_mo",
    "name": "Bai Mo",
    "role": "Duelist",
    "weaponType": "Shotgun",
    "themeColor": "#7dff4a",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/b/ba/Bai_Mo_Profile.png/100px-Bai_Mo_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Core",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "full_auto",
          "name": "Full Auto",
          "consensus": 92
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 8
        }
      },
      {
        "category": "Firing",
        "recommended": "A",
        "buyPriority": 4,
        "optionA": {
          "id": "sprint_speed",
          "name": "Sprint Speed",
          "consensus": 70
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 30
        }
      },
      {
        "category": "Capacity",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 85
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 15
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 20
        },
        "optionB": {
          "id": "reduce_spread_while_ads",
          "name": "Reduce Spread while ADS",
          "consensus": 80
        }
      }
    ]
  },
  {
    "id": "celestia",
    "name": "Celestia",
    "role": "Support",
    "weaponType": "Assault Rifle",
    "themeColor": "#fffffff6",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/b/bf/Celestia_Profile.png/100px-Celestia_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 92
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 8
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 4,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 70
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 30
        }
      },
      {
        "category": "Capacity",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 85
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 15
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 20
        },
        "optionB": {
          "id": "recoil_handling",
          "name": "Recoil Handling",
          "consensus": 80
        }
      }
    ]
  },
  {
    "id": "chiyo",
    "name": "Chiyo",
    "role": "Duelist",
    "weaponType": "DMR",
    "themeColor": "#0d0d0e63",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/9/93/Chiyo_Profile.png/100px-Chiyo_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 92
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 8
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 4,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 70
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 30
        }
      },
      {
        "category": "Capacity",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 85
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 15
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 20
        },
        "optionB": {
          "id": "recoil_handling",
          "name": "Recoil Handling",
          "consensus": 80
        }
      }
    ]
  },
  {
    "id": "cielle",
    "name": "Cielle",
    "role": "Duelist",
    "weaponType": "Shotgun",
    "themeColor": "#c2630ae1",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/6/6a/Cielle_Profile.png/100px-Cielle_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Core",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "ads_speed_and_weapon_switch",
          "name": "ADS Speed and Weapon Switch",
          "consensus": 92
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 8
        }
      },
      {
        "category": "Firing",
        "recommended": "A",
        "buyPriority": 4,
        "optionA": {
          "id": "sprint_speed",
          "name": "Sprint Speed",
          "consensus": 70
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 30
        }
      },
      {
        "category": "Capacity",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 85
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 15
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 20
        },
        "optionB": {
          "id": "recoil_handling",
          "name": "Recoil Handling",
          "consensus": 80
        }
      }
    ]
  },
  {
    "id": "eika",
    "name": "Eika",
    "role": "Duelist",
    "weaponType": "Shotgun",
    "themeColor": "#f72307e1",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/a/a8/Eika_Profile.png/100px-Eika_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Core",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "dual_trigger",
          "name": "Dual Trigger",
          "consensus": 92
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 8
        }
      },
      {
        "category": "Firing",
        "recommended": "A",
        "buyPriority": 4,
        "optionA": {
          "id": "sprint_speed",
          "name": "Sprint Speed",
          "consensus": 70
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 30
        }
      },
      {
        "category": "Capacity",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 85
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 15
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 20
        },
        "optionB": {
          "id": "reduce_spread_while_ads",
          "name": "Reduce Spread While ADS",
          "consensus": 80
        }
      }
    ]
  },
  {
    "id": "flavia",
    "name": "Flavia",
    "role": "Duelist",
    "weaponType": "SMG",
    "themeColor": "#560461ee",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/f/f2/Flavia_Profile.png/100px-Flavia_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 92
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 8
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 4,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 30
        }
      },
      {
        "category": "Capacity",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 85
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 15
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 20
        },
        "optionB": {
          "id": "reduce_spread_while_ads",
          "name": "Reduce Spread While ADS",
          "consensus": 80
        }
      }
    ]
  },
  {
    "id": "fragrans",
    "name": "Fragrans",
    "role": "Support",
    "weaponType": "Assault Rifle",
    "themeColor": "#c995f3ee",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/a/a8/Fragrans_Profile.png/100px-Fragrans_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 92
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 8
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 4,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 30
        }
      },
      {
        "category": "Capacity",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 85
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 15
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 20
        },
        "optionB": {
          "id": "reduce_spread_while_ads",
          "name": "Reduce Spread While ADS",
          "consensus": 80
        }
      }
    ]
  },
  {
    "id": "fuchsia",
    "name": "Fuchsia",
    "role": "Duelist",
    "weaponType": "Assault Rifle",
    "themeColor": "#fc0060",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/a/ad/Fuchsia_Profile.png/100px-Fuchsia_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 92
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 8
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 4,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 30
        }
      },
      {
        "category": "Capacity",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 85
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 15
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 20
        },
        "optionB": {
          "id": "reduce_spread_while_ads",
          "name": "Reduce Spread While ADS",
          "consensus": 80
        }
      }
    ]
  },
  {
    "id": "galatea",
    "name": "Galatea",
    "role": "Vanguard",
    "weaponType": "Assault Rifle",
    "themeColor": "hsl(41, 84%, 53%)",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/f/ff/Galatea_Profile.png/100px-Galatea_Profile.png",
    "notes": "This short awakenings explanation is from Kierce and Myeah, make sure to show them both some support!\nKierce: https://www.youtube.com/@kierce6969\n Myeah: https://www.youtube.com/@Myeah.",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 92
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 8
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 4,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 30
        }
      },
      {
        "category": "Capacity",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 85
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 15
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 20
        },
        "optionB": {
          "id": "reduce_spread_while_ads",
          "name": "Reduce Spread While ADS",
          "consensus": 80
        }
      }
    ]
  },
  {
    "id": "kanami",
    "name": "Kanami",
    "role": "Vanguard",
    "weaponType": "Sniper",
    "themeColor": "#bbc0bb",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/c/c4/Kanami_Profile.png/100px-Kanami_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Core",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "rechambering_speed",
          "name": "Rechambering Speed",
          "consensus": 30
        },
        "optionB": {
          "id": "charging_speed",
          "name": "Charging Speed",
          "consensus": 70
        }
      },
      {
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "sprint speed",
          "name": "Sprint Speed",
          "consensus": 15
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 85
        }
      },
      {
        "category": "Capacity",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 96
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 4
        }
      },
      {
        "category": "Functions",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "ads_speed",
          "name": "ADS Speed",
          "consensus": 72
        },
        "optionB": {
          "id": "quick_zoom_scope",
          "name": "Quick Zoom Scope",
          "consensus": 28
        }
      }
    ]
  },
  {
    "id": "kokona",
    "name": "Kokona",
    "role": "Support",
    "weaponType": "Sniper",
    "themeColor": "#7d7e7d",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/1/16/Kokona_Profile.png/100px-Kokona_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Core",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "rechambering_speed",
          "name": "Rechambering Speed",
          "consensus": 30
        },
        "optionB": {
          "id": "charging_speed",
          "name": "Charging Speed",
          "consensus": 70
        }
      },
      {
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "sprint speed",
          "name": "Sprint Speed",
          "consensus": 15
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 85
        }
      },
      {
        "category": "Capacity",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 96
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 4
        }
      },
      {
        "category": "Functions",
        "recommended": "A",
        "buyPriority": 3,
        "optionA": {
          "id": "ads_speed",
          "name": "ADS Speed",
          "consensus": 72
        },
        "optionB": {
          "id": "quick_zoom_scope",
          "name": "Quick Zoom Scope",
          "consensus": 28
        }
      }
    ]
  },
  {
    "id": "lawine",
    "name": "Lawine",
    "role": "Vanguard",
    "weaponType": "Assault Rifle",
    "themeColor": "#0c23f1",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/a/aa/Lawine_Profile.png/100px-Lawine_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 12
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 88
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 5
        }
      },
      {
        "category": "Capacity",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 35
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 65
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 22
        },
        "optionB": {
          "id": "recoil_handling",
          "name": "Recoil Handling",
          "consensus": 78
        }
      }
    ]
  },
  {
    "id": "leona",
    "name": "Leona",
    "role": "Sentinel",
    "weaponType": "Assault Rifle",
    "themeColor": "#b94e72",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/b/b4/Leona_Profile.png/100px-Leona_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 12
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 88
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 5
        }
      },
      {
        "category": "Capacity",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 35
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 65
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 22
        },
        "optionB": {
          "id": "ads_speed_and_weapon_switch",
          "name": "ADS Speed and Weapon Switch",
          "consensus": 78
        }
      }
    ]
  },
  {
    "id": "maddelena",
    "name": "Maddelena",
    "role": "Controller",
    "weaponType": "DMR",
    "themeColor": "#ffa32c",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/0/03/Maddelena_Profile.png/100px-Maddelena_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Core",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 12
        },
        "optionB": {
          "id": "dual_trigger",
          "name": "Dual Trigger",
          "consensus": 88
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 5
        }
      },
      {
        "category": "Capacity",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 35
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 65
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 3,
        "optionA": {
          "id": "sprint_speed",
          "name": "Sprint Speed",
          "consensus": 22
        },
        "optionB": {
          "id": "recoil_handling",
          "name": "Recoil Handling",
          "consensus": 78
        }
      }
    ]
  },
  {
    "id": "mara",
    "name": "Mara",
    "role": "Duelist",
    "weaponType": "SMG",
    "themeColor": "#b2c2b6",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/5/51/Mara_Profile.png/100px-Mara_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 12
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 88
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 5
        }
      },
      {
        "category": "Capacity",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 35
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 65
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 22
        },
        "optionB": {
          "id": "recoil_handling",
          "name": "Recoil Handling",
          "consensus": 78
        }
      }
    ]
  },
  {
    "id": "meredith",
    "name": "Meredith",
    "role": "Controller",
    "weaponType": "Assault Rifle",
    "themeColor": "#ffb649",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/5/56/Meredith_Profile.png/100px-Meredith_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 12
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 88
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 5
        }
      },
      {
        "category": "Capacity",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 35
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 65
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 22
        },
        "optionB": {
          "id": "recoil_handling",
          "name": "Recoil Handling",
          "consensus": 78
        }
      }
    ]
  },
  {
    "id": "michele",
    "name": "Michele",
    "role": "Sentinel",
    "weaponType": "Assault Rifle",
    "themeColor": "#fadf47",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/f/f9/Michele_Profile.png/100px-Michele_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 12
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 88
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 5
        }
      },
      {
        "category": "Capacity",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 35
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 65
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 22
        },
        "optionB": {
          "id": "recoil_handling",
          "name": "Recoil Handling",
          "consensus": 78
        }
      }
    ]
  },
  {
    "id": "ming",
    "name": "Ming",
    "role": "Duelist",
    "weaponType": "Assault Rifle",
    "themeColor": "#d64f25",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/7/78/Ming_Profile.png/100px-Ming_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 12
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 88
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 5
        }
      },
      {
        "category": "Capacity",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 35
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 65
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 22
        },
        "optionB": {
          "id": "recoil_handling",
          "name": "Recoil Handling",
          "consensus": 78
        }
      }
    ]
  },
  {
    "id": "nobunaga",
    "name": "Nobunaga",
    "role": "Sentinel",
    "weaponType": "DMR",
    "themeColor": "#ffffff",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/2/20/Nobunaga_Profile.png/100px-Nobunaga_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 12
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 88
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 5
        }
      },
      {
        "category": "Capacity",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 35
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 65
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 22
        },
        "optionB": {
          "id": "recoil_handling",
          "name": "Recoil Handling",
          "consensus": 78
        }
      }
    ]
  },
  {
    "id": "reiichi",
    "name": "Reiichi",
    "role": "Controller",
    "weaponType": "DMR",
    "themeColor": "#fcfcfce0",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/1/14/Reiichi_Profile.png/100px-Reiichi_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Core",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "ads_speed",
          "name": "ADS Speed",
          "consensus": 12
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 88
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 5
        }
      },
      {
        "category": "Capacity",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 35
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 65
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 22
        },
        "optionB": {
          "id": "spread_shot_mode",
          "name": "Spread Shot Mode",
          "consensus": 78
        }
      }
    ]
  },
  {
    "id": "yugiri",
    "name": "Yugiri",
    "role": "Controller",
    "weaponType": "Assault Rifle",
    "themeColor": "#c9f4f8",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/d/d5/Yugiri_Profile.png/100px-Yugiri_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 12
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 88
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 5
        }
      },
      {
        "category": "Capacity",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 35
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 65
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 22
        },
        "optionB": {
          "id": "recoil_handling",
          "name": "Recoil Handling",
          "consensus": 78
        }
      }
    ]
  },
  {
    "id": "yvette",
    "name": "Yvette",
    "role": "Controller",
    "weaponType": "SMG",
    "themeColor": "#4d3006cc",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/3/37/Yvette_Profile.png/100px-Yvette_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "light_shield",
          "name": "Light Shield",
          "consensus": 80
        },
        "optionB": {
          "id": "heavy_shield",
          "name": "Heavy Shield",
          "consensus": 20
        }
      },
      {
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 2,
        "optionA": {
          "id": "base_dmg",
          "name": "Base Damage",
          "consensus": 12
        },
        "optionB": {
          "id": "rate_of_fire",
          "name": "Base Rate of Fire",
          "consensus": 88
        }
      },
      {
        "category": "Critical Hit",
        "recommended": "A",
        "buyPriority": 1,
        "optionA": {
          "id": "headshot_dmg",
          "name": "Headshot Damage",
          "consensus": 95
        },
        "optionB": {
          "id": "string_dmg",
          "name": "Stringified Damage",
          "consensus": 5
        }
      },
      {
        "category": "Capacity",
        "recommended": "B",
        "buyPriority": 4,
        "optionA": {
          "id": "mag_capacity",
          "name": "Magazine Capacity",
          "consensus": 35
        },
        "optionB": {
          "id": "reload_speed",
          "name": "Reload Speed",
          "consensus": 65
        }
      },
      {
        "category": "Accuracy",
        "recommended": "B",
        "buyPriority": 3,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 22
        },
        "optionB": {
          "id": "recoil_handling",
          "name": "Recoil Handling",
          "consensus": 78
        }
      }
    ]
  },

];
