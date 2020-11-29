## Intro 

In this tutorial we make a basic set of tools.

## Item Tier 

In your util package make a new enum called ModItemTier that implements IItemTier. 
You can steal most of the code for this from the Vanilla ItemTier class. In Intellij press shift twice, 
check the box for include non-project items and search for that class. Take all of it except the 
specific instances of materials (like where it defines WOOD, STONE, etc.).  

At the top of this class, define an instance of the enum with stats for your material. 
Name it something clever and you can set the base harvest level, durability, mining speed, 
damage and enchantablity (the higher this is, the better enchantments you get). 
Finally give it a supplier for a ingredient that tells it which items can repair your tools in an anvil

```java
PINK(3, 3000, 10.0F, 5.0F, 5, () -> {
    return Ingredient.fromItems(ItemInit.SMILE.get());
});
```

## Items

In ItemInit you can actually make the items. Its similar to normal but instead of a supplier for a new Item, do 
a new SwordItem. In addition to the item properties, this takes in the item tier, 
an attack damage which is added to the one in your item tier and an attack speed which controls how fast you can swing the tool.

```java
public static final RegistryObject<Item> PINK_SWORD = ITEMS.register("pink_sword",
            () -> new SwordItem(ModItemTier.PINK, 3, -2.4F, new Item.Properties().group(ModItemGroup.instance)));
```

The other tools are the same just change the SwordItem to PickaxeItem, AxeItem, ShovelItem or HoeItem. The hoe 
does not take the damage parameter (but it does on 1.16). 

## Assets

The item models are the same as normal except the parent is item/handheld instead of item/generated (this 
makes it render properly in your hand). For example in models/items/pink_sword.json:

```json
{
    "parent": "item/handheld",
    "textures": {
        "layer0": "firstmod:items/pink_sword"
    }
} 
```

Do that for all the tools. Then make sure you have images in textures/items and add to the lang file the same as normal. 

## Run the game

Run the game and see that the tools mine the things they should and the 
right click effects on the hoe, shovel, and axe work properly. 