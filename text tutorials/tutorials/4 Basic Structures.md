## Intro 
This one is slightly more advanced, you might want to skip it and come back later.  

In this tutorial we make a structure that generates in the world (with a randomly filled chest). 

The code for this is based on this repository: https://github.com/TelepathicGrunt/StructureTutorialMod  
big thank to them, go star it or something, idk

## Structure Block

First you have to build your structure and save it as an NBT file.  

Go into a world and use a command to get a structure block (they aren't in the creative menu)

```
/give dev minecraft:structure_block 1
```

Then build your structure. You can include chests and they will save thier contents. Alternativly place a structure block 
above a chest, right click it and set the mode to data and set a descriptive tag (like "chest") and we can set the 
contents from code later.  

Put a structure block in one corner of your structure. Set it to corner mode and give it a name. Then put one in the opposite 
corner, put it on save mode and name it the same thing. Click detect to show the outline in the world and make sure 
it covers your entire structure. Then go back to the structure block, click save and exit the world.  

Go to run/saves/world_name/generated/structures and find the NBT files called your structure name. Move it to 
src/main/resources/data/mod_id/structures (if you will have to make the data/mod_id/structures folders, dont't forget to 
change the mod_id to your mod id that you set in your main class). 

## Structure Class

Make a new package called world and in that one called stuctures. In that package make a class called 
StructureNameStructure (change StructureName to something of your choice, I called mine House).

The code for this class is [here](https://github.com/LukeGrahamLandry/forge-modding-tutorial/blob/master/src/main/java/com/lukegraham/firstmod/world/structures/HouseStructure.java) but I'll explain what it's doing. All you have to change is:

```
HouseStructure    -> StructureNameStructure
HousePieces       -> StructureNamePieces
FirstMod.whatever -> YourMainModClass.whatever
```

The getStartPositionForPosition function decides which chunk the structure will spawn in. It uses vanilla's 
default algorithm based on a min and max distance. The structures can't be closer than min chunks or farther than max chunks.  

The getStructureName returns the string that you will use with the locate command in game. It must be the same as 
you use to register it later in Feature Init (with your modid: prefix).

The getSeedModifier function returns a unique large number that is used as a seed for generating random numbers. 
This makes sure that even if two structures have the same spawn location algorithm, they wont be in the same place.  

The canBeGenerated function does all the checking to see if the structure can spawn.
It calls getStartPositionForPosition position function and checks the biome.

The Start.init function decides where in the chunk it will spawn and calls the start method from the Pieces class 
we're about to make to actually generate it. 

## Structure Pieces 

In your structures package, make a new class called StructureNamePieces (again, use your structure name). 
The code for this class is [here](https://github.com/LukeGrahamLandry/forge-modding-tutorial/blob/master/src/main/java/com/lukegraham/firstmod/world/structures/HousePieces.java), and again, I'll explain. 

The first feild is just the resource slocation of the structure's nbt file. If you have multiple nbt files to put together you can put thier 
offsets from where the structure starts spawning in the OFFSETS map. For example if you have one piece that is the walls and one that's the roof, you might have the walls one up from the ground and the roof 5 up to be above the walls. The convention seems to be to just do the y offset in the map and the x/z later. 

In the start function we assemble the pieces of the structure. You can offset things here aswell. So I have my piece added twice with the second time being shifted on the x axis. So I end up with two of my little houses. But if you have multiple pieces this is where you'd put them together

This handleDataMarker function lets you do something where ever you put a data structure block in your structure. It runs for each data structure block. In my example I put a data block with the tag 'chest' above a chest I want to fill with loot. First we check what that block was called (stored in the function argument). If it was 'chest' we replace the structure block with air and set the chest under it to have a specific loot table. This lets us make the loot randomly generated but if you want you could set the items manually. Of course you can have structure blocks with different data tags in the same structure that behave differently.

```java
@Override
protected void handleDataMarker(String function, BlockPos pos, IWorld worldIn, Random rand, MutableBoundingBox sbb){
    if ("chest".equals(function)) {
        worldIn.setBlockState(pos, Blocks.AIR.getDefaultState(), 3);
        TileEntity tileentity = worldIn.getTileEntity(pos.down());
        if (tileentity instanceof ChestTileEntity) { 
            ResourceLocation ltable = new ResourceLocation(FirstMod.MOD_ID, "chest/house");
            // ^ a reference to  src/resources/data/<mod id>/loot_tables/chest/house.json
            ((ChestTileEntity)tileentity).setLootTable(ltable, rand.nextLong());
        }

    }
}
```

If you go to src/resources/data/mod id and make a new folder called loot_tables and one in that a folder called chest. 
You can add a json file for a loot table. You can name the file anything you want, just make sure its the same that you 
reference in handleDataMarker. Here's a basic loot table that gives five items with name tags being twice as likely as saddles. 

```json
{
  "pools": [{
    "name": "basic_loot",
    "rolls": 5,
    "entries": [
      {
        "type": "item",
        "name": "minecraft:saddle",
        "weight": 1
      },
      {
        "type": "item",
        "name": "minecraft:name_tag",
        "weight": 2
      }
    ]
  }]
}
```

You don't have to change anything in the setupPiece, readAdditional, or create methods. 
They're just boiler plate that work for all structures

## Feature Init

In your init package make a new class called FeatureInit. First we make static instances of our structure and piece 
classes for ease of use (make sure to change the HouseStructure/HousePieces to your classes). Then subscribe to the 
feature register event and register our structure feature. 

Then in the addToBiomes function we add the structure and feature to all biomes. To only make it generate in some biomes, 
check the biome before adding the structure. You still want to add the feature to all biomes so it will not get cut off 
when generating if part of it goes into a non-valid biome. 

```java
@Mod.EventBusSubscriber(bus = Mod.EventBusSubscriber.Bus.MOD)
public class FeatureInit
{
    public static Structure<NoFeatureConfig> HOUSE = new HouseStructure(NoFeatureConfig::deserialize);
    public static IStructurePieceType HOUSE_PIECE = HousePieces.Piece::new;

    @SubscribeEvent
    public static void onRegisterFeatures(final RegistryEvent.Register<Feature<?>> event)
    {
        IForgeRegistry<Feature<?>> registry = event.getRegistry();
        HOUSE.setRegistryName(new ResourceLocation(FirstMod.MOD_ID, "house"));
        registry.register(HOUSE);
        Registry.register(Registry.STRUCTURE_PIECE, "house", HOUSE_PIECE);

        FirstMod.LOGGER.log(Level.INFO, "features/structures registered.");
    }

    public static void addToBiomes(){
        for (Biome biome : ForgeRegistries.BIOMES)
        {
            biome.addStructure(HOUSE.withConfiguration(IFeatureConfig.NO_FEATURE_CONFIG));
            biome.addFeature(GenerationStage.Decoration.SURFACE_STRUCTURES, HOUSE.withConfiguration(IFeatureConfig.NO_FEATURE_CONFIG)
                    .withPlacement(Placement.NOPE.configure(IPlacementConfig.NO_PLACEMENT_CONFIG)));
        }
    }
}
```

## Main Class

In your main class (ModName.java) call the addToBiomes function on the setup event to make the structures generate. 

```java
private void setup(final FMLCommonSetupEvent event) {
    FeatureInit.addToBiomes();
}
```

## Run the game

Finally, run the game, make a new world (or go far away to generate new chunks) 
and use the locate command to find your structure (of course use your own mod id and structure name)

```
/locate modid:structure_name
```