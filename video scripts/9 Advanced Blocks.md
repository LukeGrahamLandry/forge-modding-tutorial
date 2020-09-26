## Description

In this tutorial we make a block that does something when right clicked, placed or exploded (also works as soil)

## Script

This is going to be quite similar to advanced items

Make a new package called blocks and in that a new class which extends Block

So lets override on block activated to do something when its right clicked 
This will fire twice, once for the main hand and once for the offhand 
If you dont want that you can check the hand parameter 
Anyway lets get the item stack the player is holding	

So minecraft's code is split between the logical server which does everything interesting like keeping track of blocks and entities
And the logical client which does stuff like rendering 
Most of the time you want to do things on the server so we check that world is not remote 
And lets check if the held item is gunpowder 
If it is we'll explode first argument is the entity that is exploding so we'll make that null cause this is a block
Then the x, y, z position, then the explosion radius 4 is the same as tnt, then if it should start fires or not
And then the explosion mode. So break will drop blocks, destroy won't, and none won't break blocks at all
Then lets use up a gunpowder from the held stack 
And return action result type consume which lets the game know this block handled the interaction so it doesn't have to do anything else

We can override onblock placed by to do something when a player places the block 
So we check that we're on the logical server and that the placer isn't null 
So like if it was placed by world gen or something, we dont do anything
Then lets just give a potion effect

We can override can sustain plant if we want it to work as soil for plants
You can check what plant it is and return true if it should be alowed to grow 
As an example I'll do cactuses 

Overriding on explosion destroy lets us do something cool like allow chain reactions like ant does 
So lets just make another explosion the same as the last one

In your block init class you can copy the basic block and change the name
You can base the properties off another block if you dont want to type it out again 
Dont forget to change the supplier to use the class we just made
If its blast resistance is too high it will absorb the explosion so I'll just make sure that's nice and low 

Then do the assets like normal 
Texture in the blocks folder
Block and item model the same as for basic ones
And the lang file 

Then we can run the game 
We can see placing it gives me poison, cactuses can be planted 
Gun powder makes it explode and it can start chain reactions