/**
 * Right, here are all the ideas that still need be realised, and probably never will:
 * 
 * 1. Sort remaining data: missile weapon, melee weapon, health, speed
 * 2. Give proper breakdown of all the relevant stats with the compare stuff
 * 3. Sort the generals and remove duplicates - there is a table for this || Add faction icons
 * 4. Compare abilities abilities
 * 5. Army builder
 * 6. Make max values expressive and display in which quadrant the unit sits (indicated by bar in game)
 * 
 */
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
const unitVariantsPath = "resources\\db\\unit_variants_tables\\unit_variants.tsv";
const unitNamesPath = "resources\\text\\db\\land_units.loc.tsv";
const meleeWeaponsPath = "resources\\db\\melee_weapons_tables\\melee_weapons.tsv";
const missileWeaponsToProjectilesPath = "resources\\db\\missile_weapons_to_projectiles_tables\\missile_weapons_to_projectiles.tsv";
const projectilesPath = "resources\\db\\projectiles_tables\\projectiles.tsv";
const battleEntitiesPath = "resources\\db\\battle_entities_tables\\battle_entities.tsv";

const maskFolder = "resources\\ui\\units\\mask\\";
const iconFolder = "resources\\ui\\units\\icons\\";
const factionSchema = "faction";
const landUnitSchema = "land_units";
const mainUnitSchema = "main_units";
const meleeWeaponSchema = "melee_weapons";
const projectilesSchema = "projectiles";
const battleEntitiesSchema = "battle_entities";
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
    },
    "melee_weapons": {
        "key": 0,
        "armour_penetrating": 1,
        "armour_piercing": 2, 
        "bonus_v_cavalry": 3, 
        "bonus_v_elephants": 4, 
        "bonus_v_infantry": 5,
        "damage": 6,
        "ap_damage": 7, 
        "first_strike": 8, 
        "shield_piercing": 9,
        "weapon_length": 10,
        "melee_weapon_type": 11,
        "audio_material": 12
    },
    "projectiles": {
        "key": 0,
        "category": 1,
        "shot_type": 2,
        "explosion_type": 3,
        "spin_type": 4,
        "projectile_number": 5,
        "trajectory_sight": 6,
        "effective_range": 7,
        "minimum_range": 8,
        "max_elevation": 9,
        "muzzle_velocity": 10,
        "marksmanship_bonus": 11,
        "spread": 12,
        "damage": 13,
        "ap_damage": 14,
        "penetration": 15,
        "incendiary": 16,
        "can_bounce": 17,
        "high_air_resistance": 18,
        "collision_radius": 19,
        "base_reload_time": 20,
        "below_waterline_damage_modifier": 21,
        "calibration_distance": 22,
        "calibration_area": 23,
        "bonus_v_infantry": 24,
        "bonus_v_cavalry": 25,
        "bonus_v_elephant": 26,
        "projectile_display": 27,
        "overhead_stat_effect": 28,
        "projectile_audio": 29,
        "shockwave_radius": 30,
        "can_damage_buildings": 31,
        "contact_stat_effect": 32,
        "is_grapple": 33
    },
    "battle_entities": {
        "key": 0,
        "type": 1,
        "walk_speed": 2,
        "run_speed": 3,
        "acceleration": 4,
        "deceleration": 5,
        "charge_speed": 6,
        "crawl_speed": 7,
        "charge_distance_commence_run": 8,
        "charge_distance_adopt_charge_pose": 9,
        "charge_distance_pick_target": 10,
        "radius": 11,
        "shape": 12,
        "radii_ratio": 13,
        "mass": 14,
        "height": 15,
        "fire_arc_close": 16,
        "fire_arc_loose": 17,
        "turn_speed": 18,
        "hit_points": 19,
        "allow_turn_to_move_anim": 20,
        "allow_static_turn_anim": 21,
        "tracking_threshold": 22,
        "min_turning_speed": 23,
        "display_model_offset_z": 24
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

    addMeleeWeapon(meleeWeapon){
        this.meleeWeapon = meleeWeapon;
    }

    addMissileWeapon(missileWeapon){
        this.missileWeapon = missileWeapon;
    }
    
    addEntity(entity){
        this.entity = entity;
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

class MeleeWeapon{
    constructor(
        key,
        armour_penetrating,
        armour_piercing, 
        bonus_v_cavalry, 
        bonus_v_elephants, 
        bonus_v_infantry,
        damage,
        ap_damage, 
        first_strike, 
        shield_piercing,
        weapon_length,
        melee_weapon_type,
        audio_material
    ){
        this.key = key;
        this.armour_penetrating = parseInt(armour_penetrating);
        this.armour_piercing = parseInt(armour_piercing);
        this.bonus_v_cavalry = parseInt(bonus_v_cavalry); 
        this.bonus_v_elephants = parseInt(bonus_v_elephants); 
        this.bonus_v_infantry = parseInt(bonus_v_infantry);
        this.damage = parseInt(damage);
        this.ap_damage = parseInt(ap_damage); 
        this.first_strike = first_strike; 
        this.shield_piercing = shield_piercing;
        this.weapon_length = weapon_length;
        this.melee_weapon_type = melee_weapon_type;
        this.audio_material = audio_material;
    }
}

class MissileWeapon{
    constructor(
        key,
        category,
        shot_type,
        explosion_type,
        spin_type,
        projectile_number,
        trajectory_sight,
        effective_range,
        minimum_range,
        max_elevation,
        muzzle_velocity,
        marksmanship_bonus,
        spread,
        damage,
        ap_damage,
        penetration,
        incendiary,
        can_bounce,
        high_air_resistance,
        collision_radius,
        base_reload_time,
        below_waterline_damage_modifier,
        calibration_distance,
        calibration_area,
        bonus_v_infantry,
        bonus_v_cavalry,
        bonus_v_elephant,
        projectile_display,
        overhead_stat_effect,
        projectile_audio,
        shockwave_radius,
        can_damage_buildings,
        contact_stat_effect,
        is_grapple
    ){
        this.key = key;
        this.category = category;
        this.shot_type = shot_type;
        this.explosion_type = explosion_type;
        this.spin_type = spin_type;
        this.projectile_number = projectile_number;
        this.trajectory_sight = trajectory_sight;
        this.effective_range = effective_range;
        this.minimum_range = minimum_range;
        this.max_elevation = max_elevation;
        this.muzzle_velocity = muzzle_velocity;
        this.marksmanship_bonus = marksmanship_bonus;
        this.spread = spread;
        this.damage = damage;
        this.ap_damage = ap_damage;
        this.penetration = penetration;
        this.incendiary = incendiary;
        this.can_bounce = can_bounce;
        this.high_air_resistance = high_air_resistance;
        this.collision_radius = collision_radius;
        this.base_reload_time = base_reload_time;
        this.below_waterline_damage_modifier = below_waterline_damage_modifier;
        this.calibration_distance = calibration_distance;
        this.calibration_area = calibration_area;
        this.bonus_v_infantry = bonus_v_infantry;
        this.bonus_v_cavalry = bonus_v_cavalry;
        this.bonus_v_elephant = bonus_v_elephant;
        this.projectile_display = projectile_display;
        this.overhead_stat_effect = overhead_stat_effect;
        this.projectile_audio = projectile_audio;
        this.shockwave_radius = shockwave_radius;
        this.can_damage_buildings = can_damage_buildings;
        this.contact_stat_effect = contact_stat_effect;
        this.is_grapple = is_grapple;
    }
}

class Entity{
    constructor(key,
        type,
        walk_speed,
        run_speed,
        acceleration,
        deceleration,
        charge_speed,
        crawl_speed,
        charge_distance_commence_run,
        charge_distance_adopt_charge_pose,
        charge_distance_pick_target,
        radius,
        shape,
        radii_ratio,
        mass,
        height,
        fire_arc_close,
        fire_arc_loose,
        turn_speed,
        hit_points,
        allow_turn_to_move_anim,
        allow_static_turn_anim,
        tracking_threshold,
        min_turning_speed,
        display_model_offset_z){
            this.key = key;
            this.type = type;
            this.walk_speed = walk_speed;
            this.run_speed = run_speed;
            this.acceleration = acceleration;
            this.deceleration = deceleration;
            this.charge_speed = charge_speed;
            this.crawl_speed = crawl_speed;
            this.charge_distance_commence_run = charge_distance_commence_run;
            this.charge_distance_adopt_charge_pose = charge_distance_adopt_charge_pose;
            this.charge_distance_pick_target = charge_distance_pick_target;
            this.radius = radius;
            this.shape = shape;
            this.radii_ratio = radii_ratio;
            this.mass = parseInt(mass);
            this.height = height;
            this.fire_arc_close = fire_arc_close;
            this.fire_arc_loose = fire_arc_loose;
            this.turn_speed = turn_speed;
            this.hit_points = parseInt(hit_points);
            this.allow_turn_to_move_anim = allow_turn_to_move_anim;
            this.allow_static_turn_anim = allow_static_turn_anim;
            this.tracking_threshold = tracking_threshold;
            this.min_turning_speed = min_turning_speed;
            this.display_model_offset_z = display_model_offset_z;
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

function createMeleeWeapon(key,
    armour_penetrating,
    armour_piercing, 
    bonus_v_cavalry, 
    bonus_v_elephants, 
    bonus_v_infantry,
    damage,
    ap_damage, 
    first_strike, 
    shield_piercing,
    weapon_length,
    melee_weapon_type,
    audio_material){
    return new MeleeWeapon(key,
        armour_penetrating,
        armour_piercing, 
        bonus_v_cavalry, 
        bonus_v_elephants, 
        bonus_v_infantry,
        damage,
        ap_damage, 
        first_strike, 
        shield_piercing,
        weapon_length,
        melee_weapon_type,
        audio_material)
}

function createMissileWeapon(key,
    category,
    shot_type,
    explosion_type,
    spin_type,
    projectile_number,
    trajectory_sight,
    effective_range,
    minimum_range,
    max_elevation,
    muzzle_velocity,
    marksmanship_bonus,
    spread,
    damage,
    ap_damage,
    penetration,
    incendiary,
    can_bounce,
    high_air_resistance,
    collision_radius,
    base_reload_time,
    below_waterline_damage_modifier,
    calibration_distance,
    calibration_area,
    bonus_v_infantry,
    bonus_v_cavalry,
    bonus_v_elephant,
    projectile_display,
    overhead_stat_effect,
    projectile_audio,
    shockwave_radius,
    can_damage_buildings,
    contact_stat_effect,
    is_grapple){
    return new MissileWeapon(key,
        category,
        shot_type,
        explosion_type,
        spin_type,
        projectile_number,
        trajectory_sight,
        effective_range,
        minimum_range,
        max_elevation,
        muzzle_velocity,
        marksmanship_bonus,
        spread,
        damage,
        ap_damage,
        penetration,
        incendiary,
        can_bounce,
        high_air_resistance,
        collision_radius,
        base_reload_time,
        below_waterline_damage_modifier,
        calibration_distance,
        calibration_area,
        bonus_v_infantry,
        bonus_v_cavalry,
        bonus_v_elephant,
        projectile_display,
        overhead_stat_effect,
        projectile_audio,
        shockwave_radius,
        can_damage_buildings,
        contact_stat_effect,
        is_grapple);
}

function createEntity(key,
        type,
        walk_speed,
        run_speed,
        acceleration,
        deceleration,
        charge_speed,
        crawl_speed,
        charge_distance_commence_run,
        charge_distance_adopt_charge_pose,
        charge_distance_pick_target,
        radius,
        shape,
        radii_ratio,
        mass,
        height,
        fire_arc_close,
        fire_arc_loose,
        turn_speed,
        hit_points,
        allow_turn_to_move_anim,
        allow_static_turn_anim,
        tracking_threshold,
        min_turning_speed,
        display_model_offset_z){
    return new Entity(key,
        type,
        walk_speed,
        run_speed,
        acceleration,
        deceleration,
        charge_speed,
        crawl_speed,
        charge_distance_commence_run,
        charge_distance_adopt_charge_pose,
        charge_distance_pick_target,
        radius,
        shape,
        radii_ratio,
        mass,
        height,
        fire_arc_close,
        fire_arc_loose,
        turn_speed,
        hit_points,
        allow_turn_to_move_anim,
        allow_static_turn_anim,
        tracking_threshold,
        min_turning_speed,
        display_model_offset_z);
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
    let meleeWeaponContent = await GetAndParseResource(meleeWeaponsPath);
    let missileWeaponsToProjectilesContent = await GetAndParseResource(missileWeaponsToProjectilesPath);
    let projectilesContent = await GetAndParseResource(projectilesPath);
    let battleEntitiesContent = await GetAndParseResource(battleEntitiesPath);

    let selectedScreenName = document.getElementById("selected_screen_name");
    let selectedArmour = document.getElementById("selected_armour");
    let selectedMorale = document.getElementById("selected_morale");
    let selectedSpeed = document.getElementById("selected_speed");
    let selectedMeleeAttack = document.getElementById("selected_melee_attack");
    let selectedMeleeDefence = document.getElementById("selected_melee_defence");
    let selectedWeaponStrength = document.getElementById("selected_weapon_strength");
    let selectedMissileStrength = document.getElementById("selected_missile_strength");
    let selectedRange = document.getElementById("selected_range")
    let selectedAmmunication = document.getElementById("selected_ammunication");
    let selectedChargeBonus = document.getElementById("selected_charge_bonus");
    let selectedHealth = document.getElementById("selected_health");
    let selectedMass = document.getElementById("selected_mass");

    let unitsDivElement = document.getElementById("units");
    let factions = await loadFactions();

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

                //Sort melee weapon
                let meleeWeaponForUnit = meleeWeaponContent.find(mw => mw[0] == unit.primary_melee_weapon);
                let meleeWeaponInfo = getSchemaIndexes(meleeWeaponSchema).map(idx => meleeWeaponForUnit[idx]);

                let meleeWeapon = createMeleeWeapon.apply(this, meleeWeaponInfo);
                unit.addMeleeWeapon(meleeWeapon);

                //Sort missile weapon
                let projectile = missileWeaponsToProjectilesContent.find(mwtp => mwtp[0] == unit.primary_missile_weapon);
                if(projectile && projectile[0] != ''){
                    
                    let missileWeaponForUnit = projectilesContent.find(mw => mw[0] == projectile[1]);
                    let missileWeaponInfo = getSchemaIndexes(projectilesSchema).map(idx => missileWeaponForUnit[idx]);
    
                    let missileWeapon = createMissileWeapon.apply(this, missileWeaponInfo);
                    unit.addMissileWeapon(missileWeapon);
                }

                //Sort speed
                let entityForUnit = battleEntitiesContent.find(be => be[0] == unit.man_entity);
                let entityInfo = getSchemaIndexes(battleEntitiesSchema).map(idx => entityForUnit[idx]);

                let entity = createEntity.apply(this, entityInfo);
                unit.addEntity(entity);

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
                    selectedMeleeAttack.innerText = "Melee Attack: " + unit.melee_attack;
                    selectedMeleeDefence.innerText = "Melee Defence: " + unit.melee_defence;
                    selectedSpeed.innerText = "Speed: " + (parseFloat(unit.entity.run_speed) * 10);
                    selectedWeaponStrength.innerText = "Weapon strength: " + (parseInt(unit.meleeWeapon.damage) + parseInt(unit.meleeWeapon.ap_damage)) + " with base " + unit.meleeWeapon.damage + " and AP " + unit.meleeWeapon.ap_damage;
                    selectedMorale.innerText = "Morale: " + unit.morale;
                    selectedMass.innerText = "Mass: " + parseInt(unit.entity.mass);
                    selectedHealth.innerText = "Health: " + (parseInt(unit.entity.hit_points) + parseInt(unit.bonus_hit_points));
                    
                    if(unit.missileWeapon){
                        selectedRange.style.visibility  = "visible";
                        selectedMissileStrength.style.visibility  = "visible";
                        selectedAmmunication.style.visibility  = "visible";


                    } else {
                        selectedRange.style.visibility  = "hidden";
                        selectedMissileStrength.style.visibility  = "hidden";
                        selectedAmmunication.style.visibility  = "hidden";
                    }
                });

                unitDivElement.addEventListener("mouseenter", function(){
                    if(selectedUnit && selectedUnit.key != unit.key){
                        hoveredUnit = unit;
                        selectedScreenName.innerText = "Selected: " + selectedUnit.screen_name + " compared to " + unit.screen_name;

                        let chargeDiff = selectedUnit.charge_bonus - unit.charge_bonus;

                        if(chargeDiff > 0){
                            selectedChargeBonus.innerHTML = "Charge bonus: " + selectedUnit.charge_bonus + " <span style=\"color:green;\">(+" + chargeDiff + ")</span> compared to " + unit.screen_name;
                        } else if (chargeDiff == 0){
                            selectedChargeBonus.innerHTML = "Charge bonus: " + selectedUnit.charge_bonus + " <span style=\"color:orange;\">(" + chargeDiff + ")</span> compared to " + unit.screen_name;
                        } else {
                            selectedChargeBonus.innerHTML = "Charge bonus: " + selectedUnit.charge_bonus + " <span style=\"color:red;\">(" + chargeDiff + ")</span> compared to " + unit.screen_name;
                        }

                        let speedDiff = (parseFloat(selectedUnit.entity.run_speed) * 10) - (parseFloat(unit.entity.run_speed) * 10);

                        if(speedDiff > 0){
                            selectedSpeed.innerHTML = "Speed: " + (parseFloat(selectedUnit.entity.run_speed) * 10) + " <span style=\"color:green;\">(+" + speedDiff + ")</span> compared to " + unit.screen_name;
                        } else if (speedDiff == 0){
                            selectedSpeed.innerHTML = "Speed: " + (parseFloat(selectedUnit.entity.run_speed) * 10) + " <span style=\"color:orange;\">(" + speedDiff + ")</span> compared to " + unit.screen_name;
                        } else {
                            selectedSpeed.innerHTML = "Speed: " + (parseFloat(selectedUnit.entity.run_speed) * 10) + " <span style=\"color:red;\">(" + speedDiff + ")</span> compared to " + unit.screen_name;
                        }

                        let maDiff = selectedUnit.melee_attack - unit.melee_attack;

                        if(maDiff > 0){
                            selectedMeleeAttack.innerHTML = "Melee Attack: " + selectedUnit.melee_attack + " <span style=\"color:green;\">(+" + maDiff + ")</span> compared to " + unit.screen_name;
                        } else if (maDiff == 0){
                            selectedMeleeAttack.innerHTML = "Melee Attack: " + selectedUnit.melee_attack + " <span style=\"color:orange;\">(" + maDiff + ")</span> compared to " + unit.screen_name;
                        } else {
                            selectedMeleeAttack.innerHTML = "Melee Attack: " + selectedUnit.melee_attack + " <span style=\"color:red;\">(" + maDiff + ")</span> compared to " + unit.screen_name;
                        }


                        let mdDiff = selectedUnit.melee_attack - unit.melee_attack;

                        if(mdDiff > 0){
                            selectedMeleeDefence.innerHTML = "Melee Defence: " + selectedUnit.melee_defence + " <span style=\"color:green;\">(+" + mdDiff + ")</span> compared to " + unit.screen_name;
                        } else if (mdDiff == 0){
                            selectedMeleeDefence.innerHTML = "Melee Defence: " + selectedUnit.melee_defence + " <span style=\"color:orange;\">(" + mdDiff + ")</span> compared to " + unit.screen_name;
                        } else {
                            selectedMeleeDefence.innerHTML = "Melee Defence: " + selectedUnit.melee_defence + " <span style=\"color:red;\">(" + mdDiff + ")</span> compared to " + unit.screen_name;
                        }

                        let moraleDiff = selectedUnit.morale - unit.morale;

                        if(moraleDiff > 0){
                            selectedMorale.innerHTML = "Morale: " + selectedUnit.morale + " <span style=\"color:green;\">(+" + moraleDiff + ")</span> compared to " + unit.screen_name;
                        } else if (moraleDiff == 0){
                            selectedMorale.innerHTML = "Morale: " + selectedUnit.morale + " <span style=\"color:orange;\">(" + moraleDiff + ")</span> compared to " + unit.screen_name;
                        } else {
                            selectedMorale.innerHTML = "Morale: " + selectedUnit.morale + " <span style=\"color:red;\">(" + moraleDiff + ")</span> compared to " + unit.screen_name;
                        }

                        let massDiff = selectedUnit.entity.mass - unit.entity.mass;

                        if(massDiff > 0){
                            selectedMass.innerHTML = "Mass: " + selectedUnit.entity.mass + " <span style=\"color:green;\">(+" + massDiff + ")</span> compared to " + unit.screen_name;
                        } else if (massDiff == 0){
                            selectedMass.innerHTML = "Mass: " + selectedUnit.entity.mass + " <span style=\"color:orange;\">(" + massDiff + ")</span> compared to " + unit.screen_name;
                        } else {
                            selectedMass.innerHTML = "Mass: " + selectedUnit.entity.mass + " <span style=\"color:red;\">(" + massDiff + ")</span> compared to " + unit.screen_name;
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

}