const STRINOVA_DATA = [
  {
    "id": "marina",
    "name": "Marina",
    "role": "Duelist",
    "weaponName": "M32 Grenade Launcher",
    "weaponType": "Grenade Launcher",
    "themeColor": "#ff4a8b",
    "description": "A powerful skirmisher who excels at clearing zones and flushing out enemies with explosive rounds.",
    "upgrades": [
      {
        "id": "dmg",
        "name": "Base Damage",
        "effect": "Increases base explosive damage by +5%",
        "consensus": 92
      },
      {
        "id": "radius",
        "name": "Explosion Radius",
        "effect": "Expands blast radius by +10%",
        "consensus": 85
      },
      {
        "id": "reload",
        "name": "Reload Speed",
        "effect": "Reduces reload duration by -15%",
        "consensus": 74
      },
      {
        "id": "fire_rate",
        "name": "Rate of Fire",
        "effect": "Increases firing speed by +8%",
        "consensus": 61
      }
    ],
    "buyOrder": ["dmg", "radius", "reload", "fire_rate"]
  },
  {
    "id": "michele",
    "name": "Michele",
    "role": "Duelist",
    "weaponName": "Pioneer",
    "weaponType": "Assault Rifle",
    "themeColor": "#00f0ff",
    "description": "An aggressive front-line combatant featuring high precision and excellent mobility in direct firefights.",
    "upgrades": [
      {
        "id": "headshot",
        "name": "Headshot Damage",
        "effect": "Increases headshot multiplier by +15%",
        "consensus": 95
      },
      {
        "id": "fire_rate",
        "name": "Rate of Fire",
        "effect": "Increases assault rifle firing speed by +10%",
        "consensus": 88
      },
      {
        "id": "recoil",
        "name": "Recoil Control",
        "effect": "Reduces vertical and horizontal recoil by -20%",
        "consensus": 78
      },
      {
        "id": "mag",
        "name": "Magazine Size",
        "effect": "Adds +5 rounds to total magazine capacity",
        "consensus": 65
      }
    ],
    "buyOrder": ["headshot", "fire_rate", "recoil", "mag"]
  },
  {
    "id": "audrey",
    "name": "Audrey",
    "role": "Vanguard",
    "weaponName": "Mona",
    "weaponType": "Light Machine Gun",
    "themeColor": "#ff9f00",
    "description": "Suppressive fire specialist capable of holding choke points and locking down lanes with a massive magazine.",
    "upgrades": [
      {
        "id": "mag",
        "name": "Magazine Capacity",
        "effect": "Adds +15 rounds to the weapon magazine",
        "consensus": 90
      },
      {
        "id": "dmg",
        "name": "Base Damage",
        "effect": "Increases damage per round by +5%",
        "consensus": 82
      },
      {
        "id": "reload",
        "name": "Reload Speed",
        "effect": "Reduces the heavy LMG reload duration by -12%",
        "consensus": 75
      },
      {
        "id": "ads",
        "name": "ADS Speed",
        "effect": "Improves aim-down-sights transition time by +15%",
        "consensus": 58
      }
    ],
    "buyOrder": ["mag", "dmg", "reload", "ads"]
  },
  {
    "id": "kokona",
    "name": "Kokona",
    "role": "Support",
    "weaponName": "Heartseeker",
    "weaponType": "Submachine Gun",
    "themeColor": "#10b981",
    "description": "Dedicated healer who supports the squad with vital repairs, shields, and fast-firing SMG coverage.",
    "upgrades": [
      {
        "id": "healing",
        "name": "Healing Output",
        "effect": "Increases active and passive healing rate by +10%",
        "consensus": 96
      },
      {
        "id": "cooldown",
        "name": "Ability Cooldown",
        "effect": "Reduces tactical healing field cooldown by -10%",
        "consensus": 89
      },
      {
        "id": "reload",
        "name": "Reload Speed",
        "effect": "Reduces SMG reload speed by -15%",
        "consensus": 70
      },
      {
        "id": "fire_rate",
        "name": "Rate of Fire",
        "effect": "Increases SMG firing rate by +8%",
        "consensus": 55
      }
    ],
    "buyOrder": ["healing", "cooldown", "reload", "fire_rate"]
  },
  {
    "id": "melinda",
    "name": "Melinda",
    "role": "Sentinel",
    "weaponName": "Eagle Eye",
    "weaponType": "Sniper Rifle",
    "themeColor": "#a855f7",
    "description": "Tactical sniper providing long-range surveillance and high-damage single-shot capability.",
    "upgrades": [
      {
        "id": "headshot",
        "name": "Headshot Damage",
        "effect": "Increases one-shot headshot capacity by +25%",
        "consensus": 98
      },
      {
        "id": "dmg",
        "name": "Base Damage",
        "effect": "Increases base body-shot damage by +8%",
        "consensus": 86
      },
      {
        "id": "scope",
        "name": "Scope Zoom Speed",
        "effect": "Reduces scope zoom-in transition time by -15%",
        "consensus": 80
      },
      {
        "id": "reload",
        "name": "Reload Speed",
        "effect": "Reduces sniper bolt-action reload duration by -10%",
        "consensus": 62
      }
    ],
    "buyOrder": ["headshot", "dmg", "scope", "reload"]
  }
];
