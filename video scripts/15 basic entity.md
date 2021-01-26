## Description

In this tutorial we make a custom hostile entity.

## Script

First we need to make a model for our entity. 
The software used to do this is called Blockbench 
Theres a link to their download page in the description
Pick your operating system, download and install the application 

Open Blockbench and make a new project. Chose modded entity as the project type
It will let you chose the file name and the model identifier, just call it whatever we can change it later. 

Then on the right, you can add a new group and in that group add a new cube
You can select the resize tool from the bar at the top and make it whatever size you want
Then just build your entity out of these rectangles. There are tools for moving the cubes and rotating the camera in the top bar. 
You should have a root group that everything is in. And within that any set of cubes you'd like to animate later should be in their own named group. So I'll have one called head and one called body. 

Then you can click the create texture button on the left
Make sure you check the box for template 
Then the defaults are fine, pick whatever resolution you want. That's the dimensions  of your texture in pixels 

So now you can see that each of the faces of our cubes have a different colour so we can see where they map to on the texture 
If you click the little icon next to the texture, you can same the image file. 
Then you can open it in whatever pixel art editor you like and edit your entities texture. 

So I'll give mine a little face on the blue part I know is the front of its head. 
And a little shell pattern on its sides and then make it all blue and give it a bit of random spots just because I can

Then if you save that and come back to block bench,
Right click the texture on the left and chose refresh 
It should unwrap the texture on the model as it will in game 

Now go to file at the top and find export
You want to export a Java Entity 

Go into your the folder with your mod's code and make a new folder called client and in that one called model and save the java file block bench exports there

You should also make sure you save the actual block bench model file if you want to animate it eventually 

In src/main/resources/assets/modid/textures make a new folder called entity and put the texture you made there 


Open your IDE and in your entities package make a new class. 
I'll call mine killer snail entity.

This will extend creature entity and use the default constructor.
Make sure the constructor is public 

Then override the register goals method
This is where you'll describe the AI for your entity
So do goal selector dot add goal. Give it 0 priority so it does it first 
And pass in a new nearest attackable target goal 
Which takes in the entity, the class to target so player entity dot class
Then the target chance I think lower is more likely so 0 should be always 
Then whether it should check for line of sight and then true should let it lock on to you from far away

Then you can give it a method reference for a target predicate. 
So this is a function that it will call when it tries to target someone and if it returns false, they won't be targeted so for example you could only target them if they're on land. However if you want this to update properly you have to make a custom attack goal which I'll probably deal with in the next tutorial 

Anyway you can add another goal that's a new melee attack goal. Pass in the entity and a speed for it to go when its chasing its target then false. I dont really know what this parameter is but I dont think I want it. 

Then add another goal. This one will be a new random walking goal 

So a bit of explanation. Each goal is just a thing that the entity will try to do.
So the first one will make it target players. The second will make it walk towards its target and attack them. The third will make it walk around randomly when it doesn't have a target. These are all basic ones Minecraft gives you but later we'll learn how to make custom ones. 

Lets override the attack entity as mob function. 
This will be called whenever it attacks someone. 
So call the super method which does the damage and save the value it returns 
Then im going to make sure that the entity is a living entity (it always will be) and check that the world is not remote because we want to do this only on the server side
Within that if statement, I'll make it give the entity it hit a short poison effect. 
The outside the if, I'll return the flag value I saved 
Now we have a poisonous snail






