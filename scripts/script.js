
// Constants
// This is not even necessary
const MP_FACTIONS = [
    "Ardiaei",
    "Arevaci",
    "Armenia",
    "Arverni",
    "Athens",
    "Baktria",
    "Boii",
    "Carthage",
    "Cimmeria",
    "Colchis",
    "Epirus",
    "Galatia",
    "Getae",
    "Iceni",
    "Kush",
    "Lusitani",
    "Macedon",
    "Masaesyli",
    "Massagetae",
    "Massilia",
    "Nabataea",
    "Nervii",
    "Odrysian Kingdom",
    "Parthia",
    "Pergamon",
    "Pontus",
    "Egypt",
    "Rome",
    "Roxolani",
    "Saba",
    "Royal Scythia",
    "Seleucid",
    "Sparta",
    "Suebi",
    "Syracuse",
    "Tylis"
];

const CLASSES = {
    "com":	"Command",
    "inf_mel":	"Melee Infantry",
    "inf_spr":	"Spear Infantry",
    "inf_pik":	"Pike Infantry",
    "inf_mis":	"Missile Infantry",
    "cav_shk":	"Shock Cavalry",
    "cav_mel": "Melee Cavalry",
    "cav_mis":	"Missile Cavalry",
    "chariot":	"Chariot",
    "elph":	"Elephant",
    "spcl":	"Special"
}

const lineSeperator = "\n";
const attributeSeperator = "\t";
const factionPath = "resources\\db\\factions_tables\\factions.tsv";
const factionToUnitPath = "resources\\db\\units_custom_battle_permissions_tables\\units_custom_battle_permissions.tsv";
const landUnitsPath = "resources\\db\\land_units_tables\\land_units.tsv";
const mainUnitsPath = "resources\\db\\main_units_tables\\main_units.tsv";
const unitVariantsPath = "resources\\db\\unit_variants_tables\\unit_variants.tsv"
const unitNamesPath = "resources\\text\\db\\land_units.loc.tsv";
const maskFolder = "resources\\ui\\units\\mask\\";
const iconFolder = "resources\\ui\\units\\icons\\";
const factionSchema = "faction";
const landUnitSchema = "land_units";
const mainUnitSchema = "main_units";

// Dict of dicts mapping index of attribute
const Schemas = {
    "faction": {
        "key": 0,
        "category": 3,
        "screen_name": 4,
        "screen_adjective": 5,
        "mp_available": 10,
        "flags_path": 13,
        "military_group": 34
    },
    "land_units":{
        "key": 0,
        "accuracy": 1,
        "ammo": 2,
        "armour": 3,
        "campaign_action_points": 4,
        "category": 5,
        "charge_bonus": 6,
        "class": 7,
        "dismounted_charge_bonus": 8,
        "dismounted_melee_attack": 9,
        "dismounted_melee_defense": 10,
        "historical_description_text": 11,
        "man_animation": 12,
        "man_entity": 13,
        "melee_attack": 14,
        "melee_defence": 15,
        "morale": 16,
        "bonus_hit_points": 17,
        "mount": 18,
        "num_animals": 19,
        "animal": 20,
        "num_mounts": 21,
        "primary_melee_weapon": 22,
        "primary_missile_weapon": 23,
        "rank_depth": 24,
        "shield": 25,
        "short_description_text": 26,
        "spacing": 27,
        "strengths_&_weaknesses_text": 28,
        "supports_first_person": 29,
        "training_level": 30,
        "num_guns": 31,
        "officers": 32,
        "articulated_record": 33,
        "engine": 34,
        "is_male": 35,
        "visibility_spotting_range_min": 36,
        "visibility_spotting_range_max": 37,
        "ability_global_recharge": 38,
        "attribute_group": 39,
        "spot_dist_tree": 40,
        "spot_dist_scrub": 41,
        "chariot": 42,
        "num_chariots": 43,
        "reload": 44,
        "loose_spacing": 45,
        "spotting_and_hiding": 46,
        "selection_vo": 47,
        "selected_vo_secondary": 48,
        "selected_vo_tertiary": 49,
        "hiding_scalar": 50
    },
    "main_units":{
        "unit": 0,
        "additional_building_requirement": 1,
        "campaign_cap": 2,
        "caste": 3,
        "create_time": 4,
        "is_naval": 5,
        "land_unit": 6,
        "num_men": 7,
        "multiplayer_cap": 8,
        "multiplayer_cost": 9,
        "naval_unit": 10,
        "num_ships": 11,
        "min_men_per_ship": 12,
        "max_men_per_ship": 13,
        "prestige": 14,
        "recruitment_cost": 15,
        "recruitment_movie": 16,
        "religion_requirement": 17,
        "upkeep_cost": 18,
        "weight": 19,
        "campaign_total_cap": 20,
        "resource_requirement": 21,
        "world_leader_only": 22,
        "can_trade": 23,
        "special_edition_mask": 24,
        "unique_index": 25,
        "in_encyclopedia": 26,
        "region_unit_resource_requirement": 27,
        "audio_language": 28,
        "audio_vo_actor_group:": 29
    }
}

class Unit{
    constructor(key,
        accuracy,
        ammo,
        armour,
        campaign_action_points,
        category,
        charge_bonus,
        unit_class,
        dismounted_charge_bonus,
        dismounted_melee_attack,
        dismounted_melee_defense,
        historical_description_text,
        man_animation,
        man_entity,
        melee_attack,
        melee_defence,
        morale,
        bonus_hit_points,
        mount,
        num_animals,
        animal,
        num_mounts,
        primary_melee_weapon,
        primary_missile_weapon,
        rank_depth,
        shield,
        short_description_text,
        spacing,
        strengths_and_weaknesses_text,
        supports_first_person,
        training_level,
        num_guns,
        officers,
        articulated_record,
        engine,
        is_male,
        visibility_spotting_range_min,
        visibility_spotting_range_max,
        ability_global_recharge,
        attribute_group,
        spot_dist_tree,
        spot_dist_scrub,
        chariot,
        num_chariots,
        reload,
        loose_spacing,
        spotting_and_hiding,
        selection_vo,
        selected_vo_secondary,
        selected_vo_tertiary,
        hiding_scalar,
        unit,
        additional_building_requirement,
        campaign_cap,
        caste,
        create_time,
        is_naval,
        land_unit,
        num_men,
        multiplayer_cap,
        multiplayer_cost,
        naval_unit,
        num_ships,
        min_men_per_ship,
        max_men_per_ship,
        prestige,
        recruitment_cost,
        recruitment_movie,
        religion_requirement,
        upkeep_cost,
        weight,
        campaign_total_cap,
        resource_requirement,
        world_leader_only,
        can_trade,
        special_edition_mask,
        unique_index,
        in_encyclopedia,
        region_unit_resource_requirement,
        audio_language,
        audio_vo_actor_group,
        screen_name){
            this.key = key;
            this.accuracy = parseInt(accuracy);
            this.ammo = parseInt(ammo);
            this.armour = armour;
            this.campaign_action_points = parseInt(campaign_action_points);
            this.category = category;
            this.charge_bonus = parseInt(charge_bonus);
            this.unit_class = unit_class;
            this.dismounted_charge_bonus = parseInt(dismounted_charge_bonus);
            this.dismounted_melee_attack = parseInt(dismounted_melee_attack);
            this.dismounted_melee_defense = parseInt(dismounted_melee_defense);
            this.historical_description_text = historical_description_text;
            this.man_animation = man_animation;
            this.man_entity = man_entity;
            this.melee_attack = parseInt(melee_attack);
            this.melee_defence = parseInt(melee_defence);
            this.morale = parseInt(morale);
            this.bonus_hit_points = parseInt(bonus_hit_points);
            this.mount = mount;
            this.num_animals = parseInt(num_animals);
            this.animal = animal;
            this.num_mounts = parseInt(num_mounts);
            this.primary_melee_weapon = primary_melee_weapon; //TODO Melee weapon class
            this.primary_missile_weapon = primary_missile_weapon; //TODO Missile weapon class
            this.rank_depth = parseInt(rank_depth);
            this.shield = shield;
            this.short_description_text = short_description_text;
            this.spacing = spacing;
            this.strengths_and_weaknesses_text = strengths_and_weaknesses_text;
            this.supports_first_person = supports_first_person;
            this.training_level = training_level;
            this.num_guns = parseInt(num_guns);
            this.officers = officers;
            this.articulated_record = articulated_record;
            this.engine = engine;
            this.is_male = is_male;
            this.visibility_spotting_range_min = parseInt(visibility_spotting_range_min);
            this.visibility_spotting_range_max = parseInt(visibility_spotting_range_max);
            this.ability_global_recharge = parseInt(ability_global_recharge);
            this.attribute_group = attribute_group;
            this.spot_dist_tree = parseInt(spot_dist_tree);
            this.spot_dist_scrub = parseInt(spot_dist_scrub);
            this.chariot = chariot;
            this.num_chariots = parseInt(num_chariots);
            this.reload = parseInt(reload);
            this.loose_spacing = loose_spacing;
            this.spotting_and_hiding = spotting_and_hiding;
            this.selection_vo = selection_vo;
            this.selected_vo_secondary = selected_vo_secondary;
            this.selected_vo_tertiary = selected_vo_tertiary;
            this.hiding_scalar = parseInt(hiding_scalar);
            this.unit = unit;
            this.additional_building_requirement = additional_building_requirement;
            this.campaign_cap = parseInt(campaign_cap);
            this.caste = caste;
            this.create_time = parseInt(create_time);
            this.is_naval = is_naval;
            this.land_unit = land_unit;
            this.num_men = parseInt(num_men);
            this.multiplayer_cap = parseInt(multiplayer_cap);
            this.multiplayer_cost = parseInt(multiplayer_cost);
            this.naval_unit = naval_unit;
            this.num_ships = parseInt(num_ships);
            this.min_men_per_ship = parseInt(min_men_per_ship);
            this.max_men_per_ship = parseInt(max_men_per_ship);
            this.prestige = parseInt(prestige);
            this.recruitment_cost = parseInt(recruitment_cost);
            this.recruitment_movie = recruitment_movie;
            this.religion_requirement = parseInt(religion_requirement);
            this.upkeep_cost = parseInt(upkeep_cost);
            this.weight = weight;
            this.campaign_total_cap = parseInt(campaign_total_cap);
            this.resource_requirement = resource_requirement;
            this.world_leader_only = world_leader_only;
            this.can_trade = can_trade;
            this.special_edition_mask = parseInt(special_edition_mask);
            this.unique_index = parseInt(unique_index);
            this.in_encyclopedia = in_encyclopedia;
            this.region_unit_resource_requirement = region_unit_resource_requirement;
            this.audio_language = audio_language;
            this.audio_vo_actor_group = audio_vo_actor_group;
            this.screen_name = screen_name;
    }

    addUnitCard(unitCard){
        this.imagePath = iconFolder + unitCard + ".png";
        this.maskPath = maskFolder + unitCard + "_mask_1.png";
    }
}

class Faction{
    constructor(key, category, screen_name, screen_adjective, mp_available, flags_path, military_group){
        this.key = key;
        this.category = category;
        this.screen_name = screen_name;
        this.screen_adjective = screen_adjective;
        this.flags_path = flags_path;
        this.military_group = military_group;

        if(mp_available == "true"){
            this.mp_available = true;
        }else{
            this.mp_available = false;
        }
    }

    addUnitKeys(unitKeys){
        this.unitKeys = unitKeys;
    }

    addUnits(units){
        this.units = units;
    }
}

// Functions
/**
 * Function that fetches a resource from a given path
 * @param {string} resourcePath 
 */
async function getResource(resourcePath){
    let response = await fetch(resourcePath);
    return response.text();
}

async function GetAndParseResource(resourcePath){
    let content = await getResource(resourcePath);
    return content.split(lineSeperator).map(line => line.split(attributeSeperator));
}

function createFaction(key, category, screen_name, screen_adjective, mp_available, flags_path, military_group){
    return new Faction(key, category, screen_name, screen_adjective, mp_available, flags_path, military_group);
}

function createUnit(key,
    accuracy,
    ammo,
    armour,
    campaign_action_points,
    category,
    charge_bonus,
    unit_class,
    dismounted_charge_bonus,
    dismounted_melee_attack,
    dismounted_melee_defense,
    historical_description_text,
    man_animation,
    man_entity,
    melee_attack,
    melee_defence,
    morale,
    bonus_hit_points,
    mount,
    num_animals,
    animal,
    num_mounts,
    primary_melee_weapon,
    primary_missile_weapon,
    rank_depth,
    shield,
    short_description_text,
    spacing,
    strengths_and_weaknesses_text,
    supports_first_person,
    training_level,
    num_guns,
    officers,
    articulated_record,
    engine,
    is_male,
    visibility_spotting_range_min,
    visibility_spotting_range_max,
    ability_global_recharge,
    attribute_group,
    spot_dist_tree,
    spot_dist_scrub,
    chariot,
    num_chariots,
    reload,
    loose_spacing,
    spotting_and_hiding,
    selection_vo,
    selected_vo_secondary,
    selected_vo_tertiary,
    hiding_scalar,
    unit,
    additional_building_requirement,
    campaign_cap,
    caste,
    create_time,
    is_naval,
    land_unit,
    num_men,
    multiplayer_cap,
    multiplayer_cost,
    naval_unit,
    num_ships,
    min_men_per_ship,
    max_men_per_ship,
    prestige,
    recruitment_cost,
    recruitment_movie,
    religion_requirement,
    upkeep_cost,
    weight,
    campaign_total_cap,
    resource_requirement,
    world_leader_only,
    can_trade,
    special_edition_mask,
    unique_index,
    in_encyclopedia,
    region_unit_resource_requirement,
    audio_language,
    audio_vo_actor_group,
    screen_name){
    return new Unit(key,
        accuracy,
        ammo,
        armour,
        campaign_action_points,
        category,
        charge_bonus,
        unit_class,
        dismounted_charge_bonus,
        dismounted_melee_attack,
        dismounted_melee_defense,
        historical_description_text,
        man_animation,
        man_entity,
        melee_attack,
        melee_defence,
        morale,
        bonus_hit_points,
        mount,
        num_animals,
        animal,
        num_mounts,
        primary_melee_weapon,
        primary_missile_weapon,
        rank_depth,
        shield,
        short_description_text,
        spacing,
        strengths_and_weaknesses_text,
        supports_first_person,
        training_level,
        num_guns,
        officers,
        articulated_record,
        engine,
        is_male,
        visibility_spotting_range_min,
        visibility_spotting_range_max,
        ability_global_recharge,
        attribute_group,
        spot_dist_tree,
        spot_dist_scrub,
        chariot,
        num_chariots,
        reload,
        loose_spacing,
        spotting_and_hiding,
        selection_vo,
        selected_vo_secondary,
        selected_vo_tertiary,
        hiding_scalar,
        unit,
        additional_building_requirement,
        campaign_cap,
        caste,
        create_time,
        is_naval,
        land_unit,
        num_men,
        multiplayer_cap,
        multiplayer_cost,
        naval_unit,
        num_ships,
        min_men_per_ship,
        max_men_per_ship,
        prestige,
        recruitment_cost,
        recruitment_movie,
        religion_requirement,
        upkeep_cost,
        weight,
        campaign_total_cap,
        resource_requirement,
        world_leader_only,
        can_trade,
        special_edition_mask,
        unique_index,
        in_encyclopedia,
        region_unit_resource_requirement,
        audio_language,
        audio_vo_actor_group,
        screen_name);
}

async function loadFactions(){
    let factions = [];

    // Whilst not super modular, fetching of the resources happens at the top-level in order to only read every file once such that no devices die during this process
    let factionToUnitContent = await GetAndParseResource(factionToUnitPath);


    let factionResource = await getResource(factionPath);
    let factionLines = factionResource.split(lineSeperator);

    factionLines.forEach(line => {
        let splitLine = line.split(attributeSeperator);
        let rawFactionInfo = getSchemaIndexes(factionSchema).map(idx => splitLine[idx]);
        let faction = createFaction.apply(this, rawFactionInfo)

        let unitKeys = factionToUnitContent.filter(factionToUnit => factionToUnit[0] == faction.key).map(r => r[2]);
        faction.addUnitKeys(unitKeys);

        factions.push(faction);
    });
    return factions.filter(faction => faction.mp_available && MP_FACTIONS.includes(faction.screen_name) && faction.key.startsWith("rom_"));
}

async function loadUnits(faction, landUnitsContent, mainUnitsContent, unitNamesContent){
    
    let units = [];

    faction.unitKeys.forEach(unitKey => {
        let landUnit = landUnitsContent.find(luc => luc[0] == unitKey);
        
        if(landUnit){
            let mainUnit = mainUnitsContent.find(muc => muc[0] == unitKey);

            if(mainUnit){
                let landUnitInfo = getSchemaIndexes(landUnitSchema).map(idx => landUnit[idx]);
                let mainUnitInfo = getSchemaIndexes(mainUnitSchema).map(idx => mainUnit[idx]);
                let unitName = unitNamesContent.find(un => un[0].includes(unitKey))[1];

                let unitInfo = landUnitInfo.concat(mainUnitInfo);
                unitInfo.push(unitName);
                let unit = createUnit.apply(this, unitInfo);
                units.push(unit);
            }
        }
    })

    faction.addUnits(units);
}

function getSchemaIndexes(id){
    return Object.values(Schemas[id]);
}

var selectedUnit;
var hoveredUnit;

window.onload = async function(){
    let landUnitsContent = await GetAndParseResource(landUnitsPath);
    let mainUnitsContent = await GetAndParseResource(mainUnitsPath);
    let unitNamesContent = await GetAndParseResource(unitNamesPath);
    let unitVariantsContent = await GetAndParseResource(unitVariantsPath);

    let selectedScreenName = document.getElementById("selected_screen_name");
    let selectedChargeBonus = document.getElementById("selected_charge_bonus");

    let unitsDivElement = document.getElementById("units");
    let factions = await loadFactions();

    console.log("factions loaded");

    factions.forEach(async faction => {
        await loadUnits(faction, landUnitsContent, mainUnitsContent, unitNamesContent);
        
        let factionDivElement = document.createElement("div");
        let h1Element = document.createElement("h1");
        h1Element.innerText = faction.screen_name;

        factionDivElement.appendChild(h1Element);

        Object.keys(CLASSES).forEach(cl => {
            let units = faction.units.filter(unit => unit.unit_class == cl);
            units.sort((u1, u2) => {return u1.multiplayer_cost - u2.multiplayer_cost});

            if(units.length == 0) return;
            let subcategoryDivElement = document.createElement("div");
            let subcategoryH3Element = document.createElement("h3");
            subcategoryH3Element.innerText = CLASSES[cl];

            subcategoryDivElement.appendChild(subcategoryH3Element);

            units.forEach(unit => {
                let unitcard = unitVariantsContent.find(uv => uv[1] == unit.unit)[6].toLowerCase();

                unit.addUnitCard(unitcard);

                let unitDivElement = document.createElement("div");
                let iconImageElement = document.createElement("img");
                let maskImageElement = document.createElement("img");

                iconImageElement.src = unit.imagePath;
                iconImageElement.alt = unit.screen_name;
                iconImageElement.classList.add("image");

                maskImageElement.src = unit.maskPath;
                maskImageElement.alt = unit.screen_name;
                maskImageElement.classList.add("mask");

                unitDivElement.classList.add("unit_card");
                unitDivElement.appendChild(iconImageElement);
                unitDivElement.appendChild(maskImageElement);

                unitDivElement.addEventListener("click", function(){
                    selectedUnit = unit;
                    selectedScreenName.innerText = "Selected: " + unit.screen_name;
                    selectedChargeBonus.innerText = "Charge bonus: " + unit.charge_bonus;
                });

                unitDivElement.addEventListener("mouseenter", function(){
                    if(selectedUnit && selectedUnit.key != unit.key){
                        hoveredUnit = unit;

                        let diff = selectedUnit.charge_bonus - unit.charge_bonus;

                        if(diff > 0){
                            selectedChargeBonus.innerHTML = "Charge bonus: " + selectedUnit.charge_bonus + " <span style=\"color:green;\">(+" + diff + ")</span> compared to " + unit.screen_name;
                        } else if (diff == 0){
                            selectedChargeBonus.innerHTML = "Charge bonus: " + selectedUnit.charge_bonus + " <span style=\"color:orange;\">(" + diff + ")</span> compared to " + unit.screen_name;
                        } else {
                            selectedChargeBonus.innerHTML = "Charge bonus: " + selectedUnit.charge_bonus + " <span style=\"color:red;\">(" + diff + ")</span> compared to " + unit.screen_name;
                        }
                        
                    }
                });

                subcategoryDivElement.appendChild(unitDivElement);

            })

            factionDivElement.appendChild(subcategoryDivElement);
        });

        unitsDivElement.appendChild(factionDivElement);
        unitsDivElement.appendChild(document.createElement("br"));
    });

    console.log("done");
}