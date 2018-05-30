define( [ "codemirror", "codemirror/addon/mode/simple" ], function( CodeMirror ) {
  CodeMirror.defineSimpleMode("mcscript", {
    start: [
      // Group, Functions, Macros
      {
        regex: /(modal)(\s+)([\w\d$\/\._-]*)/,
        token: ["keyword", null, "variable-2"]
      },
      // Basic keywords
      {
        regex: /(if|then|else|true|false|as|at|asat|positioned|align|dimension|rotated|anchored|while|do|forEach|for|raycast|stop|continue|switch|case|default|var|bool|boolean|tag|score|const)(\s*\(.*\))/,
        token: ["def","bracket"]
      },
      // Execute
      {
        regex: /(\s*)(execute|align|anchored|as|at|facing|if|in|positioned|rotated|run|store|unless)([\w\d@\s]+)(align|anchored|as|at|facing|if|in|positioned|rotated|run|store|unless)/,
        token: [null, "keyword", null, "variable-3"]
      },
      // Variables
      {
        regex: /(\$[\w\-]*)/,
        token: ["variable"]
      },
      {
        regex: /(\s*#file:|\s*#extend:)(\s+)([\w\d$\/\._-]*)/,
        token: ["def", null, "variable-3"],
        sol: true
      },
      // Selectors
      {
        regex: /@[apers](\[[a-zA-Z0-9_=,!${}]*?\]+)?/,
        token: ["variable-3"]
      },
      // Comments
      {
        regex: /\s*#.*/,
        token: ["comment"],
        sol: true
      },
      {
        regex: /\s*\/\/.*/,
        token: ["comment"],
        sol: true
      },
      {
        regex: /(?:area_effect_cloud|armor_stand|arrow|bat|blaze|boat|cave_spider|chest_minecart|chicken|cod_mob|commandblock_minecart|cow|creeper|dolphin|donkey|dragon_fireball|drowned|drowned|egg|elder_guardian|ender_crystal|ender_dragon|ender_pearl|enderman|endermite|evocation_fangs|evocation_illager|eye_of_ender_signal|falling_block|fireball|fireworks_rocket|furnace_minecart|ghast|giant|guardian|hopper_minecart|horse|husk|illusion_illager|item|item_frame|leash_knot|lightning_bolt|llama|llama_spit|magma_cube|minecart|mooshroom|mule|ocelot|painting|parrot|phantom|pig|polar_bear|potion|puffer_fish|rabbit|salmon_mob|sheep|shulker|shulker_bullet|silverfish|skeleton|skeleton_horse|slime|small_fireball|snowball|snowman|spawner_minecart|spectral_arrow|spider|squid|stray|tnt|tnt_minecart|trident|tropical_fish|turtle|vex|villager|villager_golem|vindication_illager|witch|wither|wither_skeleton|wither_skull|wolf|xp_bottle|xp_orb|zombie|zombie_horse|zombie_pigman|zombie_villager)\b/,
        token: "property"
      },
      {
        regex: /(?:[/]|run )(advancement|ban|banlist|data|clear|clone|debug|defaultgamemode|deop|difficulty|effect|execute|experience|fill|function|gamemode|gamerule|give|help|kick|kill|list|locate|me|msg|op|pardon|pardon-ip|particle|playsound|publish|recipe|reload|replaceitem|save-all|save-off|save-on|say|scoreboard|seed|setblock|setidletimeout|setworldspawn|spawnpoint|spreadplayers|stop|stopsound|summon|tag|team|teleport|tell|tellraw|time|title|tp|trigger|w|weather|whitelist|worldborder|xp)\b/,
        token: ["keyword"]
      },
      {
        regex: /(?:~?-?(?:\.\d+|\d+\.?\d*)[bfs]?|~)/,
        token: "number"
      },
      {
        regex: /@[aeprs]\b/,
        token: "string"
      },
      {
        regex: /([a-zA-Z0-9]+)(?=\s*\(.*)/,
        token: "variable"
      },
      // Custom variables
      {
        regex: /(\=|\+\=|\-\=|\*\=|\/\=|\%\=|\+\+|\-\-|\*|\/|\+|\-|\%|\>|\<|\>\=|\<\=)/,
        token: ["operator"]
      },
      {
        regex: /true|false|undefined/,
        token: "atom"
      },
      {
        regex: /"(?:[^\\]|\\.)*?"/,
        token: "string"
      },
      {
        regex: /'(?:[^\\]|\\.)*?'/,
        token: "string"
      },
      {
        regex: /[\{\[\(]/,
        indent: true
      },
      {
        regex: /[\}\]\)]/,
        dedent: true
      },
      {
        regex: /(?:\w+)/
      }
    ],
    meta: {
      dontIndentStates: ["comment"],
      lineComment: "//"
    }
  });
});
