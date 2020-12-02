/*
// Lấy dữ liệu từ Wikipedia
var a = [];
document.querySelectorAll(".episode").forEach(episode => {
    let number = episode.querySelector(".number").textContent.trim();
    let title = episode.querySelector(".title").textContent.trim();
    title = title.substring(1, title.length - 1);
    let description = episode.querySelector(".description").innerHTML.trim();
    description = description.replace(/\s\s+/g, ' ');
    a.push({ number, title, description });
});
console.log(JSON.stringify(a));

// Format dữ liệu cho đẹp
// https://jsonformatter.org/
*/

var a = [
    {
        "number": "01-04",
        "title": "Classic Rock (Shazam Slam)",
        "description": "<p>Part 1: Believing he is saving a homeless man from strange creatures while on patrol in Gotham City, Batman intervenes for the Wizard who is on a mission to save Billy Batson from Black Adam when he unleashes the Brothers Djinn from their imprisonment in the Rock of Eternity.</p> <p>Part 2: Superman, Wonder Woman, and Martian Manhunter try to stop the Djinn Calythos who has possessed Parasite during his rampage at Stryker's Island, steals their powers, and plans to use his scimitar to raise a volcano in Metropolis as part of the Brothers Djinn's plot to revert Earth back to its primordial state.</p> <p>Part 3: Working with Green Arrow, Batman chases after the Djinn Uthool. When Uthool suddenly disappears, it turns out that Uthool has possessed Batman where he defeats Wonder Woman, Cyborg, and Booster Gold in his plot to have the Hall of Justice's core temperature break the Earth's mantle. Upon Uthool transforming Batman into a bat monster, Superman ends up fighting Uthool in order to get him out of Batman.</p> <p>Part 4: Superman, Batman, and Wonder Woman pursue the remaining Djinn Abnegazar, Rath, and Nyorlath where they plan to reopen Calythos' fissure. They drained Superman and Wonder Woman's powers upon saying their name. John Constantine arrives to help them as Green Arrow, Plastic Man, and Swamp Thing also arrive to fight the three Djinn. Afterwards, Black Adam breaks free from his Earthly imprisonment to fight the heroes as Batman arrives with Shazam as the Justice League fights Black Adam and the remaining Djinn.</p>"
    },
    {
        "number": "05",
        "title": "Follow That Space Cab!",
        "description": "Superman teams up with Hawkman and Space Cabbie to protect Mr. Mind from the intergalactic bounty hunter Lobo who seeks to hand him over to an intergalactic crime lord named Boss Kack after double-crossing fellow bounty hunter Jonas Glim."
    },
    {
        "number": "06",
        "title": "Nuclear Family Values",
        "description": "With most of the Justice League unavailable, Firestorm is the only one to stop a family of androids called the Nuclear Family from blowing up a nuclear power plant."
    },
    {
        "number": "07",
        "title": "Zombie King",
        "description": "Batman teams up with John Constantine, Zatanna, and Swamp Thing when Solomon Grundy tries to raise a zombie army with a magical gem that would also enable him to transform anyone into zombies."
    },
    {
        "number": "08",
        "title": "Galaxy Jest",
        "description": "Superman and Wonder Woman have to rescue Joker from Mongul. Meanwhile, Batman and Flash try to stop a massive laughing gas bomb that Joker has hidden away in Gotham City."
    },
    {
        "number": "09",
        "title": "Time Share",
        "description": "<p>Batman and Blue Beetle are thrown back in time where they must stop Chronos from killing Batman on his first night in Gotham City where he faces off against Carmine Falcone and his men. </p> <b>Note:</b> The theme song from <i>Batman: The Animated Series</i> was used as Past Batman's theme."
    },
    {
        "number": "10",
        "title": "Under a Red Sun",
        "description": "After a brief team up with Batman and Big Barda in their battle against the Parademons, Superman is transported to a planet orbiting a red sun by Steppenwolf. This is part of Steppenwolf's plan to kill Superman and become a legend. Now with his powers slowly depleting, Superman must defeat Steppenwolf and get back to Earth. As this is happening, Batman and Big Barda head to Darkseid's fortress on Apokolips in order to find information on where Superman was transported to."
    },
    {
        "number": "11",
        "title": "Play Date",
        "description": "When the Justice League Watchtower is invaded by Toyman and his army of....toys, Wonder Woman, Superman, Cyborg, and Batman are turned into players in a twisted version of a fighting game. Now Cyborg will need all of his gaming skills to get out of this one."
    },
    {
        "number": "12",
        "title": "Repulse!",
        "description": "While out with Wonder Woman, Superman has been infected by the \"Repulse\" as part of Lex Luthor's plan to destroy Superman. Because of this, Superman has now become the new Repulse. As Wonder Woman and Hawkman try to find a way to save him, Superman must remove nanobots from his body by sending them into a black hole before he gets pulled into it as well. Though Lex Luthor plans to take advantage of the situation by trying to kill Superman."
    },
    {
        "number": "13",
        "title": "Trick or Threat",
        "description": "Cain the Caretaker tells the audience a Halloween tale about the House of Mystery where Batman, Zatanna, Constantine, and Doctor Fate are all turned back into 10-year-olds, with very little memory of who they really are, by Klarion the Witch Boy. After falling for Klarion's trap and regaining their memories, the 10-year-old Justice Leaguers must fight Klarion the Witch Boy even when he unleashes vampires, a werewolf, a monster that resembles Frankenstein's monster, a pumpkin-headed creature, and some small demons on them. They must also find a way to defeat Klarion when he gets his hands on the Helmet of Fate, turn themselves back to normal, and escape the House of Mystery before it disappears by midnight."
    },
    {
        "number": "14",
        "title": "Speed Demon",
        "description": "After defeating a magically-enhanced Harley Quinn, Batman and Zatanna encounter Ember and her boss Brother Night who later uses his dark magic to animate and control the Batmobile in the form of a demon car and kidnap Zatanna in the process where she gets bound and trapped in the Batmobile. With the help of Etrigan the Demon, Batman must save her, stop the now-demonic Batmobile, and defeat Brother Night and Ember even when Etrigan the Demon enlists Merlin to help them out by enchanting an ice cream van for a high-speed battle."
    },
    {
        "number": "15",
        "title": "Hat Trick",
        "description": "Felix Faust steals Zatanna's hat during a mannequin attack on a mall. He plans to use Zatanna's hat to free a massive demon called Ghast and get his youth back upon performing a summoning ritual at the Hebrides. While Batman and Etrigan the Demon face off against Ghast to keep him from getting to the mainland, Zatanna uses every trick in her arsenal to get her hat back from Felix Faust."
    },
    {
        "number": "16",
        "title": "Luthor in Paradise",
        "description": "With help from the seductive witch Circe, Lex Luthor invades the Amazon island of Wonder Woman's home world, Themyscira, to obtain a mystical staff from Hippolyta that leads to the Fallen Realm. Their goal upon arriving in the Fallen Realm is to obtain the Oculus of the Argo, an artifact of the Olympian Gods that would give anyone that wields it the powers of Zeus which had been entrusted to Hippolyta by Hera. With help from Superman and Batman, Wonder Woman must find a way to stop those villains before they obtain the Oculus of Argos."
    },
    {
        "number": "17",
        "title": "Plastic Man Saves the World",
        "description": "While Superman, Batman, Cyborg, and Vixen try to stop Brainiac, Plastic Man sneaks into Brainiac's spaceship to destroy the shrink ray and save the world in order to prove that he is a worthy superhero."
    },
    {
        "number": "18",
        "title": "Field Trip",
        "description": "As Superman gives Blue Beetle, Firestorm, and Stargirl a tour of the Fortress of Solitude, they run afoul of General Zod, Faora, and Quex-Ul who are accidentally freed from the Phantom Zone. Now with Superman trapped inside, the three teenage superheroes must work together to stop the Kryptonian villains."
    },
    {
        "number": "19",
        "title": "Rage of the Red Lanterns",
        "description": "Lobo steals three newly-forged rings from the Red Lanterns and pits Atrocitus, Bleez, Dex-Starr, Zilius Zox, and Skallox against Superman, Batman, Wonder Woman, and Cyborg. After Lobo unlocks the Spider Gauntlet's powers, the Justice League and the Red Lanterns must team up to defeat him."
    },
    {
        "number": "20",
        "title": "Freezer Burn",
        "description": "Mr. Freeze flies on his freeze gun-wielding airship to freeze all of Gotham City using Killer Frost as his power source after tricking her into an alliance after she evaded Firestorm. While Batman deals with Mr. Freeze, Firestorm will have to save Killer Frost where he develops a crush on her at the same time."
    },
    {
        "number": "21",
        "title": "Inside Job",
        "description": "When Superman is infected with a nanobot swarm that is sucking up Superman's solar energy upon being shot into him by Lex Luthor, Atom shrinks Batman and Wonder Woman down to micro-size so that they can enter his bloodstream and dispose of the nanobot swarm by disposing of the nanobot queen."
    },
    {
        "number": "22",
        "title": "The Trouble with Truth",
        "description": "Athena shows up wanting Wonder Woman to relocate to Mount Olympus so that she can fill in the position of Goddess of Truth. In order to see if Wonder Woman is worthy, Athena follows her, Batman, and Green Arrow on their mission to stop the H.I.V.E. from setting their cobalt fusion bomb off at the docks."
    },
    {
        "number": "23",
        "title": "Double Cross",
        "description": "In order for Batman and Firestorm to lure Deadshot into a trap, they have Plastic Man pose as Two-Face due to the fact that Deadshot was hired by Penguin to kill him. Things go well at first until the real Two-Face escapes from Firestorm's custody."
    },
    {
        "number": "24",
        "title": "Battle for the Bottled City",
        "description": "After the events of \"Plastic Man Saves the World,\" Atom shrinks Superman down to microscopic size so that he can enter the Bottled City of Kandor that was previously in Brainiac's possession. When Brainiac breaks into the Fortress of Solitude, defeats Cyborg, and reclaims the bottle, Atom must try to stop Brainiac all on his own with the help of some Superman robots."
    },
    {
        "number": "25",
        "title": "Garden of Evil",
        "description": "When Swamp Thing has a blind date with Poison Ivy which leads to her controlling him in her plot to overrun Gotham City with her monstrous plants, Batman works on an antidote to free Swamp Thing from Poison Ivy's control. Meanwhile, Poison Ivy is collaborating with Harley Quinn to help her keep Swamp Thing in check. So Superman, Firestorm, and Vixen work to fight the Queens of Crime on their home turf."
    },
    {
        "number": "26",
        "title": "All Aboard the Space Train",
        "description": "In a strange turn of events, Batman and Cyborg enlist the help of Space Cabbie and a defrosted Jonah Hex to stop Kanjar Ro's hijacking of an intergalactic space train."
    },
    {
        "number": "27",
        "title": "Time Out",
        "description": "After Wonder Woman freezes in time following a fight with the H.I.V.E., Batman teams up with Booster Gold when a creature called the Chronovore starts literally eating up time."
    },
    {
        "number": "28",
        "title": "The Fatal Fare",
        "description": "While dealing with a competition in Roxy Rocket, Space Cabbie inadvertently learns about a great threat to the Justice League when one of his passengers turns out to be Darkseid. Upon taking him to one of the moons of a planet, Space Cabbie discovers that Darkseid, Desaad, and Kanto are torturing Superman about the virus in their Mother Box. Space Cabbie ends up doing a trick that ends up bringing Hawkman and Swamp Thing to his aid."
    },
    {
        "number": "29",
        "title": "Mxy's Mix-Up",
        "description": "As Superman and Batman take Stargirl on a ride-along to protect the United Nations from Gorilla Grodd and his army of gorillas, Mister Mxyzptlk pops up from the 5th Dimension and thinks it would be great fun to put each of the superheroes' brains into another hero's body. Even when the Justice League's bravo team and Firestorm arrive and fall for the same brain-swapping move, the Justice League must find a way to trick Mister Mxyzptlk into saying his name backwards and defeat Gorilla Grodd."
    },
    {
        "number": "30",
        "title": "Supernatural Adventures in Babysitting",
        "description": "After helping Batman take down some criminals, Stargirl babysits Professor Anderson's son Timmy while he is away. During this time, Klarion the Witch Boy invades Professor Anderson's house and poses as Timmy in order to obtain the Magdalene Grimoire. Upon Klarion the Witch Boy shedding his disguise when the Magdalene Grimore is found, Stargirl notifies Batman of this and he brings John Constantine to help him and Stargirl reclaim the Magdalene Grimoire and defeat Klarion the Witch Boy."
    },
    {
        "number": "31",
        "title": "Booster's Gold",
        "description": "Upon arriving on an island near the Bermuda Triangle when looking for Booster Gold on Batman's behalf Green Arrow becomes involved with Booster Gold when he discovers that the self-centered superhero has brought dinosaurs back from the past for a money-making venture upon establishing Dinosaur Island ever since he saw a movie where scientists cloned the dinosaurs back to life."
    },
    {
        "number": "32",
        "title": "Boo-ray for Bizarro",
        "description": "When Amazo attacks Superman, Wonder Woman, Batman, Flash, Green Lantern, and Martian Manhunter where he begins to replicate their powers one-by-one, the klutzy Superman look-alike Bizarro becomes the Justice League's last hope to turn things around."
    },
    {
        "number": "33",
        "title": "Best Day Ever",
        "description": "Joker springs Lex Luthor from prison with the help of a Mother Box. Superman, Wonder Woman, Batman, and Flash must work to catch them all over the world."
    },
    {
        "number": "34",
        "title": "The Cube Root",
        "description": "Firestorm attends the opening of the new Science Center established by Martin Stein's old college roommate Mister Terrific until it get crashed by Calculator. When Calculator hacks Mister Terrific's T-spheres and separates Firestorm back into Ronnie Raymond and Martin Stein, it up to Martin Stein and Mister Terrific to work together to free Ronnie Raymond and defeat Calculator."
    },
    {
        "number": "35",
        "title": "Superman's Pal, Sid Sharp",
        "description": "Struggling Daily Planet reporter Sid Sharp has aspirations on becoming a superhero and has been having problems with Clark Kent beating him to the Superman stories. When Sid Sharp is mistaken as Superman by the Parademons, Darkseid plans to lure Superman into a trap that is manned by Desaad, Granny Goodness, Kalibak, and Kanto."
    },
    {
        "number": "36",
        "title": "Superman Red vs Superman Blue",
        "description": "Upon stealing an invention from a laboratory, Lex Luthor comes up with the means to separate each Justice Leaguer in two: the blue one being passive and good, the red one being aggressive and mean. He does this on Superman, Wonder Woman, and Batman as the blue sides of them work with Green Arrow to stop Lex Luthor and their red counterparts from doing the same thing to all of Earth."
    },
    {
        "number": "37",
        "title": "The Ringer",
        "description": "Sinestro's ring is suddenly much more powerful than usual during his fight with Green Lantern. Superman and Wonder Woman send a microscopic Atom into his ring to find out what the cause might be. While the others fight Sinestro, Atom fights past the fear parts of the power ring and finds the battery to Sinestro's power ring inside being guarded by Sinestro Corps member Despotellis."
    },
    {
        "number": "38",
        "title": "Forget Me Not",
        "description": "Firestorm finds that Superman, Wonder Woman, and Batman are in their civilian identities and have no memory of them being superheroes. He discovers that Felix Faust is behind this. Now Firestorm must find a way to get rid of their amnesia so that they can save Metropolis from an attack by Felix Faust and his army of Golems. Firestorm ends up turning the Golems into 3 cars and a moped."
    },
    {
        "number": "39",
        "title": "The Brain Buster",
        "description": "A mysterious creature abducts Batman, Mr. Terrific, Lex Luthor, Calculator, and Brain where it puts them to the test to discover the smartest among them. They are unaware that the mysterious creature is someone they'd least suspect."
    },
    {
        "number": "40",
        "title": "E. Nigma, Consulting Detective",
        "description": "When the Joker traps Batman, Wonder Woman and Green Arrow decide against their better judgement to allow Riddler, who is trying to go straight, to help them track him down. Riddler assists them because Joker has stolen his riddle motives as he deciphers Joker's riddles that lead him, Wonder Woman, and Green Arrow to Solomon Grundy's cell, the Iceberg Lounge, and the Gotham Art Museum."
    },
    {
        "number": "41",
        "title": "Harley Goes Ape!",
        "description": "When Gorilla Grodd takes control over the giant chimpanzee Titano, the only person who seems to be able to override his control is the medical worker who nursed him as a chimp at S.T.A.R. Labs. Unfortunately, she's now known as Harley Quinn. As Superman wears a lead suit when going up against Titano's Kryptonite gaze, Stargirl must help Harley Quinn free Titano so that Superman and Stargirl can defeat Gorilla Grodd."
    },
    {
        "number": "42",
        "title": "Phased and Confused",
        "description": "An explosion near the sun opens a temporary rift into the Phantom Zone allowing General Zod to escape as he plans to free Faora and Quex-Ul. When members of the Justice League are affected by a fragment of Krypton (which didn't turn into Kryptonite) and become phantom-like, their only hope for freedom is to somehow get a message to Booster Gold to get them out of the phantom-like state before they end up in the Phantom Zone as well as stopping General Zod before he frees Faora and Quex-Ul."
    },
    {
        "number": "43",
        "title": "It'll Take a Miracle!",
        "description": "Big Barda's life hangs in the balance when Batman is forced by Darkseid to track down the elusive Mister Miracle (who is Big Barda's boyfriend) and bring back the Anti-Life Equation he stole from Apokolips. Even when Batman finds Mister Miracle, he has to compete with Granny Goodness and the Female Furies members Bernadeth and Lashina to see who will get the Anti-Life Equation to Darkseid first."
    },
    {
        "number": "44",
        "title": "System Error",
        "description": "When Batman discover he and the rest of the Justice League are robots while fighting villains that don't normally team up, he, Superman, Wonder Woman, Cyborg, and Booster Gold investigate to find out who did this and why? They find their answers to be part of a research done by Darkseid where the robot Justice League members can't attack him or the Parademons."
    },
    {
        "number": "45",
        "title": "Race Against Crime",
        "description": "Superman and Flash race for charity only to fall under a trap perpetrated by Lex Luthor who has devised a \"time\" suit with the help of Chronos that allows him to control everyone's speed."
    },
    {
        "number": "46",
        "title": "Party Animal",
        "description": "Determined to finally throw a successful Christmas party for the Justice League, Green Arrow finds his plans thwarted when Plastic Man brings a tranquilized Solomon Grundy to the gathering as Plastic Man didn't want to make a scene while trying to incarcerate Solomon Grundy at S.T.A.R. Labs during their Christmas party."
    },
    {
        "number": "47",
        "title": "Watchtower Tours",
        "description": "When Booster Gold and Skeets start giving tours of the Watchtower to make some extra cash, they inadvertently bring in supervillains disguised as tourists."
    },
    {
        "number": "48",
        "title": "Barehanded",
        "description": "<p>When Green Lantern leaves his ring in an intergalactic restroom after washing his hands, he discovers it's gone. This leads him and Space Cabbie on a wild chase for the aliens who might have taken it. </p> At the end of the episode, Space Cabbie's new GPS is revealed to be an amnesiac Aya from <i>Green Lantern: The Animated Series</i>, who leaves in search of \"something... or someone\" (Razer)."
    },
    {
        "number": "49",
        "title": "Captain Bamboozle",
        "description": "Mister Mxyzptlk decides to create some mischief by endowing Shazam's well-meaning Uncle Dudley with superpowers bigger than anyone in the Justice League."
    },
    {
        "number": "50",
        "title": "Keeping Up with the Kryptonians",
        "description": "Mister Mxyzptlk alters history so that Supergirl and Superman are respectively a ditzy actress and a Kaznian enforcer that never met. Now with the rest of the League nonexistent, the only one left to save the day is Booster Gold."
    },
    {
        "number": "51",
        "title": "Unleashed",
        "description": "While the Justice League is away on a mission, Plastic Man is not only left in charge of the Watchtower, but also Superman's dog Krypto."
    },
    {
        "number": "52",
        "title": "She Wore Red Velvet",
        "description": "When Booster Gold and the Justice League come under attack by a mysterious and unrelenting new villainess known as Red Velvet, Booster comes to realize she's actually the fiancée he left at the altar in the future."
    }
];