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
        "buyPriority": 2,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "-overheat_rate",
          "name": "-Overheat Rate",
          "consensus": 50
        },
        "optionB": {
          "id": "+max_shield",
          "name": "+Max Shield",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "+max_shield",
          "name": "+Max Shield",
          "consensus": 50
        },
        "optionB": {
          "id": "shield_recovery_+100%",
          "name": "Shield Recovery +100%",
          "consensus": 50
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "buyPriority": 2,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "cooldown_4s",
          "name": "Cooldown -4s",
          "consensus": 50
        },
        "optionB": {
          "id": "2x_auto_reload_capacity",
          "name": "2x Auto Reload Capacity",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "Duration_+1s",
          "name": "Duration +1s",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "buyPriority": 2,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "cooldown_-8s",
          "name": "Cooldown -8s",
          "consensus": 50
        },
        "optionB": {
          "id": "max_+3",
          "name": "Max +3",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "regen_speed",
          "name": "Regen Speed +100%",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
        }
      }
    ]
  },
  {
    "id": "chiyo",
    "name": "Chiyo",
    "role": "Duelist",
    "weaponType": "DMR",
    "themeColor": "#e29e71d3",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/9/93/Chiyo_Profile.png/100px-Chiyo_Profile.png",
    "notes": "",
    "upgradePairs": [
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
        "buyPriority": 2,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "cooldown_reduction",
          "name": "Cooldown -5s",
          "consensus": 50
        },
        "optionB": {
          "id": "damage_increase",
          "name": "Damage +15",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "cd_recovery",
          "name": "CD Recovery Rate +50%",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "buyPriority": 2,
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
        "buyPriority": 4,
        "optionA": {
          "id": "spread_control",
          "name": "Spread Control",
          "consensus": 20
        },
        "optionB": {
          "id": "single-shot_mode",
          "name": "Single-Shot Mode",
          "consensus": 80
        }
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "shield_recharge_rate",
          "name": "Shield Recharge Rate +20%",
          "consensus": 50
        },
        "optionB": {
          "id": "shield_to_armor_conversion",
          "name": "Shield to Armor Conversion +50%",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "reload_time_reduction",
          "name": "Reload Time -0.8s",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "buyPriority": 2,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "cooldown_reduction",
          "name": "Cooldown -5s",
          "consensus": 50
        },
        "optionB": {
          "id": "duration_increase",
          "name": "Duration +3s",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "damage_to_heat_conversion",
          "name": "Damage to Heat Conversion +50%",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "buyPriority": 2,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "cooldown_reduction",
          "name": "Cooldown -5s",
          "consensus": 50
        },
        "optionB": {
          "id": "phantom_orb_hp_increase",
          "name": "Phantom Orb HP +50%",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "dmg_required_to_reduce",
          "name": "-20% Damage Required to Reduce CD",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "buyPriority": 2,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "area_of_effect_increase",
          "name": "Area of Effect +50%",
          "consensus": 50
        },
        "optionB": {
          "id": "duration_increase",
          "name": "Duration +4s",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "area_of_effect_increase",
          "name": "Area of Effect +50%",
          "consensus": 50
        },
        "optionB": {
          "id": "hp_regen_increase",
          "name": "HP Regen +2/s",
          "consensus": 50
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "buyPriority": 2,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "cooldown_reduction",
          "name": "Cooldown -5s",
          "consensus": 50
        },
        "optionB": {
          "id": "duration_increase",
          "name": "Duration +3s",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "recovery_rate_increase",
          "name": "+Recovery Rate",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
    "notes": "",
    "upgradePairs": [
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
        "buyPriority": 2,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "cooldown_reduction",
          "name": "Cooldown -5s",
          "consensus": 50
        },
        "optionB": {
          "id": "decoy_duration_increase",
          "name": "Decoy Duration +3s",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "cooldown_reduction",
          "name": "Cooldown -5s",
          "consensus": 50
        },
        "optionB": {
          "id": "decoy_duration_increase",
          "name": "Decoy Duration +3s",
          "consensus": 50
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "category": "Core",
        "recommended": "B",
        "buyPriority": 1,
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
        "buyPriority": 3,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "cd_-5s",
          "name": "Cooldown -5s",
          "consensus": 50
        },
        "optionB": {
          "id": "note_hp_+50%",
          "name": "Note HP +50%",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "duration_+1s",
          "name": "Duration +1s",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "category": "Core",
        "recommended": "B",
        "buyPriority": 1,
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
        "buyPriority": 3,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "armor_regen_+2/s",
          "name": "Armor Regen +2/s",
          "consensus": 50
        },
        "optionB": {
          "id": "hp_regen_+5/s",
          "name": "Health Regen +5/s",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "first_aid_hp_+50",
          "name": "First Aid HP +50",
          "consensus": 50
        },
        "optionB": {
          "id": "hp_regen_+2/s",
          "name": "Health Regen +2/s",
          "consensus": 50
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 1,
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
        "buyPriority": 2,
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
        "buyPriority": 3,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "cd_-5s",
          "name": "Cooldown -5s",
          "consensus": 50
        },
        "optionB": {
          "id": "enemy_exposure_duration_+1s",
          "name": "Enemy Exposure Duration +1s",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "enemy_exposure_duration_+1s",
          "name": "Enemy Exposure Duration +1s",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
        }
      }
    ]
  },
  {
    "id": "leona",
    "name": "Leona",
    "role": "Sentinel",
    "weaponType": "LMG",
    "themeColor": "#b94e72",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/b/b4/Leona_Profile.png/100px-Leona_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 1,
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
        "buyPriority": 2,
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
        "buyPriority": 3,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "block_hp_+150",
          "name": "Block HP +150",
          "consensus": 50
        },
        "optionB": {
          "id": "cd_-10s",
          "name": "Cooldown -10s",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "movement_spd_and_armor_regen_+50%",
          "name": "Movement Speed and Armor Regen +50%",
          "consensus": 50
        },
        "optionB": {
          "id": "energy_regen_+50%",
          "name": "Energy Regen +50%",
          "consensus": 50
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "category": "Core",
        "recommended": "B",
        "buyPriority": 1,
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
        "buyPriority": 2,
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
        "buyPriority": 3,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "duration_+5s",
          "name": "Duration +5s",
          "consensus": 50
        },
        "optionB": {
          "id": "max_+3",
          "name": "Max +3",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "slow_duration_+1s",
          "name": "Slow Duration +1s",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 1,
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
        "buyPriority": 2,
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
        "buyPriority": 3,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "cd_-5s",
          "name": "Cooldown -5s",
          "consensus": 50
        },
        "optionB": {
          "id": "duration_+2s",
          "name": "Duration +2s",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "+50%_healing_rate",
          "name": "%50 Healing Rate",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 1,
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
        "buyPriority": 2,
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
        "buyPriority": 3,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "duration_+4s",
          "name": "Duration +4s",
          "consensus": 50
        },
        "optionB": {
          "id": "cd_-7s",
          "name": "Cooldown -7s",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "-_airborne_gravity",
          "name": "- Airborne Gravity",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 1,
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
        "buyPriority": 2,
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
        "buyPriority": 3,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "dmg_and_range",
          "name": "+50% Damage and Range",
          "consensus": 50
        },
        "optionB": {
          "id": "max_+3",
          "name": "Max +3",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "enemy_exposure_duration_+2s",
          "name": "Enemy Exposure Duration +2s",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 1,
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
        "buyPriority": 2,
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
        "buyPriority": 3,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "cooldown_-5s",
          "name": "Cooldown -5s",
          "consensus": 50
        },
        "optionB": {
          "id": "duration_+2s",
          "name": "Duration +2s",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "armorstreal_+50%",
          "name": "Armor Steal +50%",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 1,
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
        "buyPriority": 2,
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
        "buyPriority": 3,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "rate_of_fire_and_weapon_usability_+50%",
          "name": "Rate of Fire and Weapon Usability +50%",
          "consensus": 50
        },
        "optionB": {
          "id": "armor_regen_+5/s",
          "name": "Armor Regen +5/s",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "weakeness_duration_+2s",
          "name": "Weakness Duration +2s",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "category": "Core",
        "recommended": "B",
        "buyPriority": 1,
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
        "buyPriority": 2,
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
        "buyPriority": 3,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "duration_+5s",
          "name": "Duration +5s",
          "consensus": 50
        },
        "optionB": {
          "id": "cooldown_-10s",
          "name": "Cooldown -10s",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "cooldown_-1s",
          "name": "Cooldown -1s",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
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
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 1,
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
        "buyPriority": 2,
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
        "buyPriority": 3,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "cooldown_-15s",
          "name": "Cooldown -15s",
          "consensus": 50
        },
        "optionB": {
          "id": "-20%_energy_cost",
          "name": "-20% Energy Cost",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "reduce_dmg_needed_to_trigger",
          "name": "Reduce Damage Needed to Trigger",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
        }
      }
    ]
  },
  {
    "id": "yvette",
    "name": "Yvette",
    "role": "Controller",
    "weaponType": "SMG",
    "themeColor": "#526bf8ea",
    "imageUrl": "https://static.wikitide.net/strinovawiki/thumb/3/37/Yvette_Profile.png/100px-Yvette_Profile.png",
    "notes": "",
    "upgradePairs": [
      {
        "category": "Firing",
        "recommended": "B",
        "buyPriority": 1,
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
        "buyPriority": 2,
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
        "buyPriority": 3,
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
        "buyPriority": 4,
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
      },
      {
        "category": "Active Skill",
        "recommended": "A",
        "buyPriority": 5,
        "optionA": {
          "id": "cooldown_-10s",
          "name": "Cooldown -10s",
          "consensus": 50
        },
        "optionB": {
          "id": "+1_dash",
          "name": "+1 Dash",
          "consensus": 50
        }
      },
      {
        "category": "Passive Skill",
        "recommended": "A",
        "buyPriority": 6,
        "optionA": {
          "id": "stealth_entry_speed_+50%",
          "name": "Stealth Entry Speed +50%",
          "consensus": 100
        }
      },
      {
        "category": "Shields",
        "recommended": "A",
        "buyPriority": 7,
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
        "category": "Stringification",
        "recommended": "A",
        "buyPriority": 8,
        "optionA": {
          "id": "string_movement_spd_+15%",
          "name": "Stringified Movement SPD +15%",
          "consensus": 80
        },
        "optionB": {
          "id": "46%_string_dmg_reduction",
          "name": "46% Stringified DMG Reduction",
          "consensus": 20
        }
      }
    ]
  }
];
