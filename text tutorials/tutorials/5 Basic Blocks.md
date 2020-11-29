## Intro 
In this tutorial we will make a new block with a texture and a loot table. 
It will be a similar process to basic items. 

## New Block
In your init package make a new class called BlockInit. The code here is mostly the 
same as in ItemInit. Just make sure to say Block instead of Item everywhere. The string you 
pass the register function is the block's registry name.

```java
public class BlockInit {
    public static final DeferredRegister<Block> BLOCKS = new DeferredRegister<>(ForgeRegistries.BLOCKS, FirstMod.MOD_ID);

    public static final RegistryObject<Block> SMILE_BLOCK = BLOCKS.register("smile_block",
            () -> new Block());
}
```

The Block constructer in the supplier takes a Block.Properties object made by calling the create method. The create 
method takes a Material which sets some things like whether its flamable.  

Then there are a bunch of methods you can call to set different properties. hardnessAndResistance lets you pass in 
how long it takes to break and how resistant to explosions it is. harvest level is what level of tool you need to 
mine it (0 is wood, 3 is diamond) and harvestTool lets you set what type of tool you need. If you want it to be a 
light source you can use lightValue with a value from 1 to 16. There are many more like slipperiness, speedFactor 
and jumpFactor.

```java
Block.Properties.create(Material.ROCK).hardnessAndResistance(1f, 1200f).harvestLevel(2).harvestTool(ToolType.PICKAXE).lightValue(10))
```

## Block Item

You need a BlockItem to place your block. You can register it manually but that's tedious so lets make it automatic. 
At the top of your class add this line to allow it to subscribe to events. 

```java
@Mod.EventBusSubscriber(bus = Mod.EventBusSubscriber.Bus.MOD)
public class BlockInit {
    // ...previous code here...
}
```

Then make a static function with the SubscribeEvent annotation. Its argument will be the Item RegistryEvent 
so it fires when items are suposed to be registered. 

In that function get the Item registery and loop through all the blocks. For each block, 
we make an Item.Properties that puts it in our creative tab. Then we make a BlockItem with 
those properties to place our block. We register the BlockItem with the same registry name as the block. 

```java
@SubscribeEvent
public static void onRegisterItems(final RegistryEvent.Register<Item> event) {
    final IForgeRegistry<Item> registry = event.getRegistry();

    BLOCKS.getEntries().stream().map(RegistryObject::get).forEach( (block) -> {
        final Item.Properties properties = new Item.Properties().group(ItemInit.ModItemGroup.instance);
        final BlockItem blockItem = new BlockItem(block, properties);
        blockItem.setRegistryName(block.getRegistryName());
        registry.register(blockItem);
    });
}
```

## Main Class
In the constructor of your main class add this line to call the register method of your DefferedRegister (same as for items). 

```java
BlockInit.BLOCKS.register(modEventBus);
```

## Assets

In your project folder go to src/main/resources/assets/mod id. Make a new folder called blockstates 
and in your models folder make a new folder called block. In textures make a new folder called blocks 
and put the png image you want to use for your block's texture. Then go out to src/main/resources/data/mod id and
make a folder called loot_tables (if you don't already have it) and in that make a folder called blocks. 

In blockstates make a file called block_name.json (replace block_name with whatever string you passed in as your 
registry name). Since this is a simple block, we just need one varient that points to a model. Make sure you 
change firstmod to your mod id and smile_block to the registry name of your block. 

```json
{
    "variants": {
        "": {
            "model": "firstmod:block/smile_block"
        }
    }
} 
```

In models/block make a file called block_name.json. This is the file you'd change if you want different sides of the 
block to look different (like a grass block) but since I don't, I'll just point to one texture (make sure to change 
smile_block to the name of your image file). 

```json
{
    "parent": "block/cube_all",
    "textures": {
        "all": "firstmod:blocks/smile_block"
    }
} 
```

In models/item make a block_name.json file that just parents off your block model

```json
{
    "parent": "firstmod:block/smile_block"
} 
```

In lang/en_us.json add a line that gives your block a name. Remember to change the mod id and block registry name. 

```json
    "block.firstmod.smile_block": "Smiley Block"
```

In loot_tables/blocks make block_name.json. This sets what drops when you break the block. This is a simple loot 
table that just drops the block's item but it could be anything. 

```json
{
    "type": "minecraft:block",
    "pools": [
    {
        "rolls": 1.0,
        "entries": [
        {
            "type": "minecraft:item",
            "name": "firstmod:smile_block"
        }
        ]
    }
    ]
} 
```

## Run the game

If we run the game, we can see that the block shows up in our creative tab. 
We can place it and break it with an iron pickaxe