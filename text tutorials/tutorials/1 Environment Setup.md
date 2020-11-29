## Intro

In this tutorial we download java 8, forge and IntelliJ. We also rename our main package and class and update the mods.toml file.

## Downloading

First, download the JDK (java 8 development kit). Go to [oracle](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html) and select your operating system. It will ask you to make an account but you can borrow someone else's credentials from 
[bugmenot](http://bugmenot.com/view/oracle.com). Just copy paste them in and if the first doesn't work, try the next one. 

Then download the JRE (java 8 runtime environemnt) from [oracle](https://oracle.com/java/technologies/javase-jre8-downloads.html). 
Same as before, just pick your operating system, accept the terms and click download. 

Next you need the forge MDK (mod development kit) from [minecraftforge](https://files.minecraftforge.net/maven/net/minecraftforge/forge/index_1.15.2.html). Get the recommended version cause its the most likely to work. When you click the button to download the MDK it 
will send you to a page with ads. Very important not to click any of them (even if they look like pop ups from your OS), 
just wait a few seconds until the skip button appears in the top right and click that to download. 

Then you need an IDE to write your code. Download intellij from [jetbrains](https://www.jetbrains.com/idea/download) 
and get the community addition because it's free.

## Installing

Double click the JDK download to open it. Just go though the installer and agree to everything. It will probably 
need an administrator password and take a long time to install. 

Do the same thing for the JRE. 

Then unzip the forge MDK and rename the folder to the name of your mod. You can remove the license, readme and credits files.

Finally, launch intellijj. The first screen should let you choose some settings. You probably want dark theme but for everything 
else the defaults are fine. Then you want to click 'open a project'. Select the forge folder you just renamed and give it a while 
to do the indexing (there should be a little loading bar at the bottom of the screen). 

## Setup

In the project explorer on the left open src/main and right click com.example.examplemod 
Choose refactor > rename and call it com.nameorwebsite.modid (so I did com.lukegraham.firstmod).
Make sure there's no spaces or capital letters. Open ExampleMod.java and right click the name of the class 
to rename it to your mod name. This is your mod's main class. Some of these functions can be removed 
but its file if you leave them.  

It's important to change the value in the @Mod annotation to your mod id (something unique and all lowercase) 
and make a public static string with the same value. You will use this offten, don't forget it. 


```java
@Mod("firstmod")
public class FirstMod
{
    public static final Logger LOGGER = LogManager.getLogger();
    public static String MOD_ID = "firstmod";

    public FirstMod() {
        final IEventBus modEventBus = FMLJavaModLoadingContext.get().getModEventBus();

        modEventBus.addListener(this::setup);

        // Register ourselves for server and other game events we are interested in
        MinecraftForge.EVENT_BUS.register(this);
    }

    private void setup(final FMLCommonSetupEvent event) {}
}
```

Open src/main/resources/META-INF/mods.toml It has a bunch of key value pairs that mostly set the information 
shown on the mods list in game. The only one you have to change is the modId (to whatever you had in your main 
class). You must keep the   modLoader and loaderVersion the same but the rest can be whaterver you want.

```java
modLoader="javafml"
loaderVersion="[31,)"

modId="firstmod"
```

The build.gradle file tells it what dependancies to download (like minecraft and forge). 
Set the group to whatever you named your package (and click the elephant icon in intellij 
to update these settings). 

```java
group = 'com.lukegraham.firstmod'
```

Open the terminal, navigate to your mod folder and run the command below 
(on windows you don't need the ./). It will take a while to run.

```bash
./gradlew GenIntellijRuns
```

## Run the game

You can open intellij again and run the game by clicking the little green play button in the top right. 
If you have any problems with that you can also run it with the command below. 

```bash
./gradlew runClient
```