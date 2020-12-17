/**
https://digitalcollections.nypl.org/collections/a-collection-of-the-dresses-of-different-nations-antient-sic-and-modern#/?tab=about&scroll=242

var arr = [];
document.querySelectorAll('#results-list li .item a').forEach(aTag => {
	var title = aTag.title;
	
	var imgTag = aTag.querySelector('img');
	
	if (imgTag == null) {
		//console.log(aTag.innerHTML);
		//console.log(aTag.parentNode.parentNode.parentNode.innerHTML);
		return;
	}
	var smallImageUrl = imgTag.src;
	var largeImageUrl = smallImageUrl.replace('t=f', 't=q'); // f, w, q, g
	
	arr.push({
		title: title,
		url: largeImageUrl
	});
	
	//console.log(title);
	//console.log(largeImageUrl);
});

console.log(JSON.stringify(arr, null, 2));

//data.forEach((e, idx) => e.name = ('' + (1001 + idx)).substring(1) + '.jpg');
*/

const data = [
  {
    "title": "Recueil des habillements de différentes nations, Volume premier, [French title page]",
    "url": "https://images.nypl.org/index.php?id=1638006&t=q"
  },
  {
    "title": "A collection of the dresses of different nations, antient [sic] and modern, Vol. I, [Title page]",
    "url": "https://images.nypl.org/index.php?id=1638007&t=q"
  },
  {
    "title": "A collection of the dresses of different nations, antient [sic] and modern, [Vol. I], [Half title page]",
    "url": "https://images.nypl.org/index.php?id=1638008&t=q"
  },
  {
    "title": "Habit of the grand seignior in 1749. Le grand seignior.",
    "url": "https://images.nypl.org/index.php?id=1638009&t=q"
  },
  {
    "title": "Habit of the grand seignior or emperor of the Turks in 1700. Le grand seignior.",
    "url": "https://images.nypl.org/index.php?id=1638010&t=q"
  },
  {
    "title": "Habit of the sultaness queen in 1749. La sultane reine.",
    "url": "https://images.nypl.org/index.php?id=1638011&t=q"
  },
  {
    "title": "Habit of the sultaness, or empress of the Turks in 1700. La sultane Asseki ou Sultane reine.",
    "url": "https://images.nypl.org/index.php?id=1638012&t=q"
  },
  {
    "title": "Habit of the Greek sultaness in 1749. Sultane Greque.",
    "url": "https://images.nypl.org/index.php?id=1638013&t=q"
  },
  {
    "title": "Habit of the sultaness of Transilvania in 1749. Sultane de Transilvanie.",
    "url": "https://images.nypl.org/index.php?id=1638014&t=q"
  },
  {
    "title": "Habit of the white sultaness in 1749. Sultane blanche.",
    "url": "https://images.nypl.org/index.php?id=1638015&t=q"
  },
  {
    "title": "Habit of the white sultaness in 1749. Sultane blanche.",
    "url": "https://images.nypl.org/index.php?id=1638016&t=q"
  },
  {
    "title": "Habit of the black sultaness in 1749. Sultane noire.",
    "url": "https://images.nypl.org/index.php?id=1638017&t=q"
  },
  {
    "title": "Habit of the black sultaness in 1749. Sultane noire.",
    "url": "https://images.nypl.org/index.php?id=1638018&t=q"
  },
  {
    "title": "Habit of the Turkish lady of the grand seigniors seraglio, in 1568. Dame de condition Turque, dans le serail.",
    "url": "https://images.nypl.org/index.php?id=1638019&t=q"
  },
  {
    "title": "Habit of a white eunuch in 1749. Eunuque blanc.",
    "url": "https://images.nypl.org/index.php?id=1638020&t=q"
  },
  {
    "title": "Habit of the chief of the black eunuchs in 1749. Chef des eunuques noirs.",
    "url": "https://images.nypl.org/index.php?id=1638021&t=q"
  },
  {
    "title": "Habit of the chief of the black eunuchs in 1749. Chef des eunuques noirs.",
    "url": "https://images.nypl.org/index.php?id=1638022&t=q"
  },
  {
    "title": "Habit of the grand vizier in 1749. Le grand vizir.",
    "url": "https://images.nypl.org/index.php?id=1638023&t=q"
  },
  {
    "title": "Habit of the Janesary aga, or chief commandant of the Janesaries. L'Aga des Janifsaires.",
    "url": "https://images.nypl.org/index.php?id=1638024&t=q"
  },
  {
    "title": "Habit of the aga of the Janesaries in 1749. L'aga des Janissaires.",
    "url": "https://images.nypl.org/index.php?id=1638025&t=q"
  },
  {
    "title": "Habit of the Tchorbadgi or captain of the Janesaries, in 1700. Captaine des Janissaires.",
    "url": "https://images.nypl.org/index.php?id=1638026&t=q"
  },
  {
    "title": "Habit of the Ast-chi-Bachi, Officer of the Janesaries, & superintendant of their kitchen. Cuisinier et officier des Janissaires 1700.",
    "url": "https://images.nypl.org/index.php?id=1638027&t=q"
  },
  {
    "title": "Habit of a bashaw of three tails, in 1749. Bacha a trois queiis.",
    "url": "https://images.nypl.org/index.php?id=1638028&t=q"
  },
  {
    "title": "Habit of the commander in chief of the Spahis, in 1749. Chef des Spahis.",
    "url": "https://images.nypl.org/index.php?id=1638029&t=q"
  },
  {
    "title": "Habit of the grand seignor's body guard, in 1749. Garde du grand seigneur.",
    "url": "https://images.nypl.org/index.php?id=1638030&t=q"
  },
  {
    "title": "Habit of a Turkish standardbearer, in 1749. Porte-Enseigne Turc.",
    "url": "https://images.nypl.org/index.php?id=1638031&t=q"
  },
  {
    "title": "Habit of emir bashaw, in 1749. Emir-bachi.",
    "url": "https://images.nypl.org/index.php?id=1638032&t=q"
  },
  {
    "title": "Habit of the mufti, or chief priest of the Turks, in 1749. Le moufti.",
    "url": "https://images.nypl.org/index.php?id=1638033&t=q"
  },
  {
    "title": "Habit of the mufti, or chief priest of the Turks, in 1749. Le moufti.",
    "url": "https://images.nypl.org/index.php?id=1638034&t=q"
  },
  {
    "title": "Habit of a Turkish priest, in 1749. Prestre de la loy.",
    "url": "https://images.nypl.org/index.php?id=1638035&t=q"
  },
  {
    "title": "Habit of the iman of the great mosque in 1749. Iman de la grande mosquee.",
    "url": "https://images.nypl.org/index.php?id=1638036&t=q"
  },
  {
    "title": "Habit of a commander of a body of 100 men, who act as tipstaves to the courts of justice. Le chiaoro bachi ou chef des huissiers 1749.",
    "url": "https://images.nypl.org/index.php?id=1638037&t=q"
  },
  {
    "title": "Habit of an ambassador from China, in 1749. Ambassadeur Chinois.",
    "url": "https://images.nypl.org/index.php?id=1638038&t=q"
  },
  {
    "title": "Habit of an ambassador from the great Mogul. Ambassadeur du Mogol.",
    "url": "https://images.nypl.org/index.php?id=1638039&t=q"
  },
  {
    "title": "Habit of an ambassador from Siam in 1749. Ambassadeur de Siam.",
    "url": "https://images.nypl.org/index.php?id=1638040&t=q"
  },
  {
    "title": "Habit of the ambassador from Persia to the Port. Ambassadeur de perse.",
    "url": "https://images.nypl.org/index.php?id=1638041&t=q"
  },
  {
    "title": "Habit of the Tartarian prince, in 1700. Prince Tartare.",
    "url": "https://images.nypl.org/index.php?id=1638042&t=q"
  },
  {
    "title": "Habit of a Tartarian princess, in 1700. Princess Tartare.",
    "url": "https://images.nypl.org/index.php?id=1638043&t=q"
  },
  {
    "title": "Habit of a crim Tartare, in 1700. Tartare de Crimee.",
    "url": "https://images.nypl.org/index.php?id=1638044&t=q"
  },
  {
    "title": "Habit of a Tartarian lady. Dame Tartare.",
    "url": "https://images.nypl.org/index.php?id=1638045&t=q"
  },
  {
    "title": "Habit of the emperor of China, in 1667. L'empereur de la Chine.",
    "url": "https://images.nypl.org/index.php?id=1638046&t=q"
  },
  {
    "title": "Emperor of China in his robes, in 1700. L'empereur de la Chine.",
    "url": "https://images.nypl.org/index.php?id=1638047&t=q"
  },
  {
    "title": "Summer habit of a Chinese mandarin in 1700. Habillement d'ete de'un mandarin Chinois.",
    "url": "https://images.nypl.org/index.php?id=1638048&t=q"
  },
  {
    "title": "Winter habit of a Chinese Mandarin in 1700.",
    "url": "https://images.nypl.org/index.php?id=1638049&t=q"
  },
  {
    "title": "Habit of a Chinese mandarin of war in 1700. Mandarin de guerre de la Chine.",
    "url": "https://images.nypl.org/index.php?id=1638050&t=q"
  },
  {
    "title": "Habit of a lady of China in 1700. Dame Chinoise.",
    "url": "https://images.nypl.org/index.php?id=1638051&t=q"
  },
  {
    "title": "Habit of a lady of China in 1700. Autre dame Chinoise.",
    "url": "https://images.nypl.org/index.php?id=1638052&t=q"
  },
  {
    "title": "Another habit of a Chinese lady in 1700. Autre dame Chinoise.",
    "url": "https://images.nypl.org/index.php?id=1638053&t=q"
  },
  {
    "title": "Habit of a mandarin of war in Chinese Tartary in 1700. Mandarin de guerre de la Tartarie Chinoise.",
    "url": "https://images.nypl.org/index.php?id=1638054&t=q"
  },
  {
    "title": "Habit of a lady in Chinese Tartary 1700. Dame de la Tartarie Chinoise.",
    "url": "https://images.nypl.org/index.php?id=1638055&t=q"
  },
  {
    "title": "Habit of a young lady of Argentiera and island in the Archipelago in 1700. Fille de l'Argentiere Isle de l'Archipel.",
    "url": "https://images.nypl.org/index.php?id=1638056&t=q"
  },
  {
    "title": "Habit of a young lady of Bulgaria in 1700. Fille de Bulgarie.",
    "url": "https://images.nypl.org/index.php?id=1638057&t=q"
  },
  {
    "title": "Habit of a lady of Chio, an island in the Archipelago in [sic]. Fille de l'Isle de Chio.",
    "url": "https://images.nypl.org/index.php?id=1638058&t=q"
  },
  {
    "title": "Morning habit of a Grecian lady in 1700. Dame Grecque.",
    "url": "https://images.nypl.org/index.php?id=1638059&t=q"
  },
  {
    "title": "Bridal habit of a Grecian lady in 1700. Habit d'une mariée Grecque.",
    "url": "https://images.nypl.org/index.php?id=1638060&t=q"
  },
  {
    "title": "Habit of a lady of Macedonia in 1568. Fille de Macedoin.",
    "url": "https://images.nypl.org/index.php?id=1638061&t=q"
  },
  {
    "title": "Habit of a Grecian woman of the Island of Metylene in 1581. Grecque de l'Isle de Metelin.",
    "url": "https://images.nypl.org/index.php?id=1638062&t=q"
  },
  {
    "title": "Habit of a young lady of Naxis an island in the Archipelago in 1700. Fille de l'Isle de Naxos.",
    "url": "https://images.nypl.org/index.php?id=1638063&t=q"
  },
  {
    "title": "Habit of a lady of Paros, an island in the Archipelago, 1568. Fille de l'Isle de Paros.",
    "url": "https://images.nypl.org/index.php?id=1638064&t=q"
  },
  {
    "title": "Habit of a young lady of St. John de Patmos, and island in the Archipelago in 1700. Fille de l'Isle de St. Jean de Patmos.",
    "url": "https://images.nypl.org/index.php?id=1638065&t=q"
  },
  {
    "title": "Habit of a Greek lady of Pera in Natolia, in 1568. Fille d'Grecque dans la Natolie.",
    "url": "https://images.nypl.org/index.php?id=1638066&t=q"
  },
  {
    "title": "Habit of a Thessalonian bride in 1581. Jeune mariée Thessalonique.",
    "url": "https://images.nypl.org/index.php?id=1638067&t=q"
  },
  {
    "title": "Habit of a young lady of Tine, an island in the archipelago, in 1700. Fille de l'Isle de Tine.",
    "url": "https://images.nypl.org/index.php?id=1638068&t=q"
  },
  {
    "title": "Habit of the princess of Walachia in 1700. Princess de Valaquie.",
    "url": "https://images.nypl.org/index.php?id=1638069&t=q"
  },
  {
    "title": "Habit of a gentleman of Wallachia. Gentilhomme Valaque.",
    "url": "https://images.nypl.org/index.php?id=1638070&t=q"
  },
  {
    "title": "Habit of a young lady of Wallachia in 1700. Demoiselle Valaque.",
    "url": "https://images.nypl.org/index.php?id=1638071&t=q"
  },
  {
    "title": "Habit of an Arabian soldier. Soldat Arabe.",
    "url": "https://images.nypl.org/index.php?id=1638072&t=q"
  },
  {
    "title": "Habit of an Arabian in 1581. Arabe.",
    "url": "https://images.nypl.org/index.php?id=1638073&t=q"
  },
  {
    "title": "Habit of a merchant of Arabia in 1568. Merchant Arabe.",
    "url": "https://images.nypl.org/index.php?id=1638074&t=q"
  },
  {
    "title": "Habit of an Arabian woman in 1581. Fille Arabe.",
    "url": "https://images.nypl.org/index.php?id=1638075&t=q"
  },
  {
    "title": "Habit of an Arabian virgin in [sic]. Fille Arabe des montagnes.",
    "url": "https://images.nypl.org/index.php?id=1638076&t=q"
  },
  {
    "title": "Habit of a Moor of Arabia. Maure d'Arabie.",
    "url": "https://images.nypl.org/index.php?id=1638077&t=q"
  },
  {
    "title": "Habit of a pilgrim of Mecca called Sacquaz who carries about aromatic simple waters to sell. Pélérin de la Mecque, apellé Sacquaz, qui vend des eaux de senteur 1588.",
    "url": "https://images.nypl.org/index.php?id=1638078&t=q"
  },
  {
    "title": "Habit of Moorish pilgrims returning from Mecca in 1568. Pelerins Maures revenant del Mecque.",
    "url": "https://images.nypl.org/index.php?id=1638079&t=q"
  },
  {
    "title": "Habit of a bashaw of Caramania in 1749. Bacha de Caramanie.",
    "url": "https://images.nypl.org/index.php?id=1638080&t=q"
  },
  {
    "title": "Habit of a noble lady of Caramania in 1581. Dame de Caramanie.",
    "url": "https://images.nypl.org/index.php?id=1638081&t=q"
  },
  {
    "title": "Habit of a Armenian ladiy in 1581. Armenienne.",
    "url": "https://images.nypl.org/index.php?id=1638082&t=q"
  },
  {
    "title": "Habit of a lady of Syria in 1568. Dame Syrienne.",
    "url": "https://images.nypl.org/index.php?id=1638083&t=q"
  },
  {
    "title": "Habit of a noble lady of Syria in 1581. Dame Syrienne.",
    "url": "https://images.nypl.org/index.php?id=1638084&t=q"
  },
  {
    "title": "Habit of an Indian chief in 1749. Chef Indien.",
    "url": "https://images.nypl.org/index.php?id=1638085&t=q"
  },
  {
    "title": "Habit of an East Indian in 1581. Habitant des Indes Orientales.",
    "url": "https://images.nypl.org/index.php?id=1638086&t=q"
  },
  {
    "title": "Habit of an East Indian in [sic] Habitant des Indes Orientales.",
    "url": "https://images.nypl.org/index.php?id=1638087&t=q"
  },
  {
    "title": "Habit of a woman of East India in 1581. Femme des Indes Orientales.",
    "url": "https://images.nypl.org/index.php?id=1638088&t=q"
  },
  {
    "title": "Habit of dervise of India in 1700. Dervichedes Indes.",
    "url": "https://images.nypl.org/index.php?id=1638089&t=q"
  },
  {
    "title": "Habit of a gentleman of Persia in 1568. Gentilhomme Persan.",
    "url": "https://images.nypl.org/index.php?id=1638090&t=q"
  },
  {
    "title": "Habit of a Persian lady in 1568. Dame Persanne.",
    "url": "https://images.nypl.org/index.php?id=1638091&t=q"
  },
  {
    "title": "Habit of a lady of Persia from a modern painting. Dame Persiane.",
    "url": "https://images.nypl.org/index.php?id=1638092&t=q"
  },
  {
    "title": "Habit of a bashaw of Egypt in 1749. Bacha d'Egipte.",
    "url": "https://images.nypl.org/index.php?id=1638093&t=q"
  },
  {
    "title": "Habit of woman of Africa in 1581. Africaine.",
    "url": "https://images.nypl.org/index.php?id=1638094&t=q"
  },
  {
    "title": "Habit of a noble lady of Alexandria in 1581. Dame de Alexandrie.",
    "url": "https://images.nypl.org/index.php?id=1638095&t=q"
  },
  {
    "title": "Morning habit of a lady of quality in Barbary in 1700. Dame de la Côte de Barbarie en robe du Matin.",
    "url": "https://images.nypl.org/index.php?id=1638096&t=q"
  },
  {
    "title": "Full dress of a lady of quality in Barbary in 1700. Dame de la Côte de Barbarie dans tout saparure.",
    "url": "https://images.nypl.org/index.php?id=1638097&t=q"
  },
  {
    "title": "Habit of a woman of Fez in Africa. Africaine de Fez.",
    "url": "https://images.nypl.org/index.php?id=1638098&t=q"
  },
  {
    "title": "Habit of an Ethiopian in 1581. Ethiopien.",
    "url": "https://images.nypl.org/index.php?id=1638099&t=q"
  },
  {
    "title": "Habit of a morisco slave in 1568. Esclave moraure.",
    "url": "https://images.nypl.org/index.php?id=1638100&t=q"
  },
  {
    "title": "Habit of the King of Poland and Elector of Saxony in 1700. Roy de Pologne Electeur de Saxe.",
    "url": "https://images.nypl.org/index.php?id=1638101&t=q"
  },
  {
    "title": "Habit of the Queen of Poland & Electoress of Saxony in 1700. La Reine de Pologne Electrice de Saxe.",
    "url": "https://images.nypl.org/index.php?id=1638102&t=q"
  },
  {
    "title": "Habit of a lady of Poland. Dame Polonoise.",
    "url": "https://images.nypl.org/index.php?id=1638103&t=q"
  },
  {
    "title": "Habit of a Polish merchant. Merchand Polonois.",
    "url": "https://images.nypl.org/index.php?id=1638104&t=q"
  },
  {
    "title": "Habit of a merchant of Dantzic. Marchand de Dantzic.",
    "url": "https://images.nypl.org/index.php?id=1638105&t=q"
  },
  {
    "title": "Habit of a gentleman of Hungary in 1700. Gentilhomme Hongrois.",
    "url": "https://images.nypl.org/index.php?id=1638106&t=q"
  },
  {
    "title": "Habit of a lady of Hungary in 1700.",
    "url": "https://images.nypl.org/index.php?id=1638107&t=q"
  },
  {
    "title": "Habit of the Duke of Venice. Le Dogede Venise.",
    "url": "https://images.nypl.org/index.php?id=1638108&t=q"
  },
  {
    "title": "Habit of the dutchess of Venice in 1581. Femme du doge de Venise.",
    "url": "https://images.nypl.org/index.php?id=1638109&t=q"
  },
  {
    "title": "Lady of quality of Venice in [sic] Dame Venitienne.",
    "url": "https://images.nypl.org/index.php?id=1638110&t=q"
  },
  {
    "title": "Habit of a noble matron of Venice in 1581. Dame Venitienne.",
    "url": "https://images.nypl.org/index.php?id=1638111&t=q"
  },
  {
    "title": "Habit of a noble matron of Venice 1581. Dame Venitienne.",
    "url": "https://images.nypl.org/index.php?id=1638112&t=q"
  },
  {
    "title": "Morning habit of a lady of Venice in 1750. Dame de Venise en deshabillé.",
    "url": "https://images.nypl.org/index.php?id=1638113&t=q"
  },
  {
    "title": "Habit of a nobleman of Rome. Ancien noble Romain.",
    "url": "https://images.nypl.org/index.php?id=1638114&t=q"
  },
  {
    "title": "Full dress of a Roman lady in 1581. Dame Romaine dans toute saparure.",
    "url": "https://images.nypl.org/index.php?id=1638115&t=q"
  },
  {
    "title": "Habit of a noble matron of Rome in 1581. Dame Romaine.",
    "url": "https://images.nypl.org/index.php?id=1638116&t=q"
  },
  {
    "title": "Habit of a mendicant religious in 1588. Religious mendicant.",
    "url": "https://images.nypl.org/index.php?id=1638117&t=q"
  },
  {
    "title": "Habit of a lady of quality of Naples. Dame de qualiité de Naples.",
    "url": "https://images.nypl.org/index.php?id=1638118&t=q"
  },
  {
    "title": "Habit of a lady of Naples. Fille de Naples.",
    "url": "https://images.nypl.org/index.php?id=1638119&t=q"
  },
  {
    "title": "Habit of a noble virgin of Naples. Fille Naples.",
    "url": "https://images.nypl.org/index.php?id=1638120&t=q"
  },
  {
    "title": "Habit of a lady of Bologna. Dame de Bolonge.",
    "url": "https://images.nypl.org/index.php?id=1638121&t=q"
  },
  {
    "title": "Habit of a noble virgin of Bologne in 1581. Demoiselle de Bologne.",
    "url": "https://images.nypl.org/index.php?id=1638122&t=q"
  },
  {
    "title": "Habit of a lady of Ischia, an island in the Gulf of Naples. Fille de l'Isle d'Ischia le Golfe de Naples.",
    "url": "https://images.nypl.org/index.php?id=1638123&t=q"
  },
  {
    "title": "Habit of a lady of Padua. Fille de Padoue.",
    "url": "https://images.nypl.org/index.php?id=1638124&t=q"
  },
  {
    "title": "Habit of a country woman of Pavia in 1581. Villageoise de Pavie.",
    "url": "https://images.nypl.org/index.php?id=1638125&t=q"
  },
  {
    "title": "Habit of a lady of quality of Sienna in 1581. Dame de Sienne.",
    "url": "https://images.nypl.org/index.php?id=1638126&t=q"
  },
  {
    "title": "Habit of a noble lady of Vincentia in 1581. Dame Vicentine.",
    "url": "https://images.nypl.org/index.php?id=1638127&t=q"
  },
  {
    "title": "Recueil des habillements de différentes nations, Volume second, [French title page]",
    "url": "https://images.nypl.org/index.php?id=1638128&t=q"
  },
  {
    "title": "A collection of the dresses of different nations, antient [sic] and modern, Vol. II, [Title page]",
    "url": "https://images.nypl.org/index.php?id=1638129&t=q"
  },
  {
    "title": "A collection of the dresses of different nations, antient [sic] and modern, [Vol. II], [Half title page]",
    "url": "https://images.nypl.org/index.php?id=1638130&t=q"
  },
  {
    "title": "Habit of the infanta of Spain in 1568. L'Infante d'Espagne en 1598.",
    "url": "https://images.nypl.org/index.php?id=1638131&t=q"
  },
  {
    "title": "Habit of a gentleman of Spain. Espagnol.",
    "url": "https://images.nypl.org/index.php?id=1638132&t=q"
  },
  {
    "title": "Habit of the governor of the Low Countries for the King of Spain in 1576. Governeur pour le Roy d'Espagne dans les Pays Bas.",
    "url": "https://images.nypl.org/index.php?id=1638133&t=q"
  },
  {
    "title": "Habit of a Spanish knight of the golden key in 1700. Gentilhomme Espagnol.",
    "url": "https://images.nypl.org/index.php?id=1638134&t=q"
  },
  {
    "title": "Habit of a Spanish lady of quality in 1700. Dame Espagnolle.",
    "url": "https://images.nypl.org/index.php?id=1638135&t=q"
  },
  {
    "title": "Habit of a lady of quality in France. Dame Françoise.",
    "url": "https://images.nypl.org/index.php?id=1638136&t=q"
  },
  {
    "title": "Habit of a lady of quality in France. Demoiselle Francoise.",
    "url": "https://images.nypl.org/index.php?id=1638137&t=q"
  },
  {
    "title": "Another habit of a lady of quality in France in 1581. Damoiselle Francoise en 1581.",
    "url": "https://images.nypl.org/index.php?id=1638138&t=q"
  },
  {
    "title": "Habit of a young lady of France in 1581. Dame Françoise.",
    "url": "https://images.nypl.org/index.php?id=1638139&t=q"
  },
  {
    "title": "Habit of a French gentleman in 1581. Gentilhomme Françoise.",
    "url": "https://images.nypl.org/index.php?id=1638140&t=q"
  },
  {
    "title": "Habit of the Duke of Burgundy in 1700. Le Duc de Bourgogne.",
    "url": "https://images.nypl.org/index.php?id=1638141&t=q"
  },
  {
    "title": "Habit of the Dutchess of Orleans in 1700. La Dutchesse d'Orleans.",
    "url": "https://images.nypl.org/index.php?id=1638142&t=q"
  },
  {
    "title": "Habit of the Princess Dowager of Conty in 1700. La Princesse de Conty Douairiere.",
    "url": "https://images.nypl.org/index.php?id=1638143&t=q"
  },
  {
    "title": "Habit of madamoiselle de Chartres, daughter to the Duke of Orleans in 1700. Mademoiselle de Chartres.",
    "url": "https://images.nypl.org/index.php?id=1638144&t=q"
  },
  {
    "title": "Habit of the Dutchess of Bouillon in 1700. La Duchesse de Bouillon.",
    "url": "https://images.nypl.org/index.php?id=1638145&t=q"
  },
  {
    "title": "Habit of the Marchioness of Belfont, daughter of the Duke of Mazarine in 1700. Madame la Marquise de Belfont fille du Duc de Mazarin.",
    "url": "https://images.nypl.org/index.php?id=1638146&t=q"
  },
  {
    "title": "Habit of a French man of quality in 1700. Francois de qualité.",
    "url": "https://images.nypl.org/index.php?id=1638147&t=q"
  },
  {
    "title": "Habit of a merchant's wife of Paris in 1640. Merchade de Paris.",
    "url": "https://images.nypl.org/index.php?id=1638148&t=q"
  },
  {
    "title": "Habit of a countess of Holland and Zealand in 1200 [sic] Comtesse de Hollande et de Zelande.",
    "url": "https://images.nypl.org/index.php?id=1638149&t=q"
  },
  {
    "title": "Another habit of a countess of Holland and Zealand in 1480. Comtesse de Hollande et de Zeland.",
    "url": "https://images.nypl.org/index.php?id=1638150&t=q"
  },
  {
    "title": "Habit of the Prince of Orange in 1572. Le Prince d'Orange.",
    "url": "https://images.nypl.org/index.php?id=1638151&t=q"
  },
  {
    "title": "Habit of a count of Flanders and protector of the Dutch in 1582. Le comte de Flandre protecteur de la libertié Belgique.",
    "url": "https://images.nypl.org/index.php?id=1638152&t=q"
  },
  {
    "title": "Habit of a nobleman of the United Provinces in 1588. Noble des Provinces-Unies.",
    "url": "https://images.nypl.org/index.php?id=1638153&t=q"
  },
  {
    "title": "Habit of a merchants wife in Holland in 1640. Marchande Hollandois.",
    "url": "https://images.nypl.org/index.php?id=1638154&t=q"
  },
  {
    "title": "Habit of a physician in Holland in 1640. Médecin Hollandois.",
    "url": "https://images.nypl.org/index.php?id=1638155&t=q"
  },
  {
    "title": "Habit of a Dutch soldier in 1588. Soldat Hollandois.",
    "url": "https://images.nypl.org/index.php?id=1638156&t=q"
  },
  {
    "title": "Habit of a young gentleman of Brabant in 1588. Jeune gentilhomme Brabançon.",
    "url": "https://images.nypl.org/index.php?id=1638157&t=q"
  },
  {
    "title": "Habit of a Flemish gentleman in 1620. Gentilhomme Flamand.",
    "url": "https://images.nypl.org/index.php?id=1638158&t=q"
  },
  {
    "title": "Habit of Rubens wife in 1620. La femme de Rubens.",
    "url": "https://images.nypl.org/index.php?id=1638159&t=q"
  },
  {
    "title": "Habit of a gentlewoman of Brabant in 1640. Dame Brabançonne.",
    "url": "https://images.nypl.org/index.php?id=1638160&t=q"
  },
  {
    "title": "Habit of a German nobleman in 1577. Noble Allemand.",
    "url": "https://images.nypl.org/index.php?id=1638161&t=q"
  },
  {
    "title": "Habit of a German officer in 1588. Officier Allemand.",
    "url": "https://images.nypl.org/index.php?id=1638162&t=q"
  },
  {
    "title": "Habit of a German officer over 100 men in 1588. Centenier Allemand.",
    "url": "https://images.nypl.org/index.php?id=1638163&t=q"
  },
  {
    "title": "Habit of an ensign of the German infantry in 1588. Enseigne de l'infanterie Allemande.",
    "url": "https://images.nypl.org/index.php?id=1638164&t=q"
  },
  {
    "title": "Habit of a lady of quality of Alsatia in 1577. Dame d'Alsace.",
    "url": "https://images.nypl.org/index.php?id=1638165&t=q"
  },
  {
    "title": "Habit of a lady of quality of Bavaria in 1581. Demoiselle Bavaroise.",
    "url": "https://images.nypl.org/index.php?id=1638166&t=q"
  },
  {
    "title": "Habit of lady Sophia, Dutchess of Brunswick & Lunenbourg in 1700. Duchesse de Brunsuic et de Lunebourg.",
    "url": "https://images.nypl.org/index.php?id=1638167&t=q"
  },
  {
    "title": "Habit of a nobleman of Burgundy in 1577. Noble Bourguignon.",
    "url": "https://images.nypl.org/index.php?id=1638168&t=q"
  },
  {
    "title": "Habit of a nobleman of Burgundy in 1581. Noble Bourguignon.",
    "url": "https://images.nypl.org/index.php?id=1638169&t=q"
  },
  {
    "title": "Habit of a lady of quality in Burgundy in 1577. Dame de qualite de Bourgogne.",
    "url": "https://images.nypl.org/index.php?id=1638170&t=q"
  },
  {
    "title": "Habit of a gentleman of Burgundy in 1581. Gentilhomme de Bourgogne.",
    "url": "https://images.nypl.org/index.php?id=1638171&t=q"
  },
  {
    "title": "Habit of Bohemia in 1577. Bohémien.",
    "url": "https://images.nypl.org/index.php?id=1638172&t=q"
  },
  {
    "title": "Habit of a senator of Cologne in 1577. Senateur de Cologne.",
    "url": "https://images.nypl.org/index.php?id=1638173&t=q"
  },
  {
    "title": "Bridal habit of a lady of Cologne in 1577. Habit de noce d'une dame de Cologne.",
    "url": "https://images.nypl.org/index.php?id=1638174&t=q"
  },
  {
    "title": "Another bridal habit of a lady of Cologne in 1588. Autre habit noce d'une dame de Cologne.",
    "url": "https://images.nypl.org/index.php?id=1638175&t=q"
  },
  {
    "title": "Habit of a woman of quality of Cologn[sic] in 1640. Demoiselle de Cologne.",
    "url": "https://images.nypl.org/index.php?id=1638176&t=q"
  },
  {
    "title": "Habit of a senator of Lepzic in 1577. Sénateur de Leipzig.",
    "url": "https://images.nypl.org/index.php?id=1638177&t=q"
  },
  {
    "title": "Habit of a merchant of Misnia in 1577. Marchand de Misnie.",
    "url": "https://images.nypl.org/index.php?id=1638178&t=q"
  },
  {
    "title": "Habit of a matron of Misnia is 1577. Dame de Misnie.",
    "url": "https://images.nypl.org/index.php?id=1638179&t=q"
  },
  {
    "title": "Habit of Nuremberg in 1577. Habillement des bourgeoise de Nuremberg.",
    "url": "https://images.nypl.org/index.php?id=1638180&t=q"
  },
  {
    "title": "Habit of a lady or Nuremberg in 1577. Fille de Nuremberg.",
    "url": "https://images.nypl.org/index.php?id=1638181&t=q"
  },
  {
    "title": "Full dress of a gentleman of Nuremberg in 1755. Habit de cérémonie d'un gentilhomme de Nuremberg.",
    "url": "https://images.nypl.org/index.php?id=1638182&t=q"
  },
  {
    "title": "Full dress of a lady of Nuremburg in 1755. Habit de cérémonie d'une dame de Nuremberg.",
    "url": "https://images.nypl.org/index.php?id=1638183&t=q"
  },
  {
    "title": "Habit of a lady of Nuremberg in 1755. Fille de Nuremberg.",
    "url": "https://images.nypl.org/index.php?id=1638184&t=q"
  },
  {
    "title": "Habit of a country man near Nuremberg in 1755. Paysan de environs de Nuremberg.",
    "url": "https://images.nypl.org/index.php?id=1638185&t=q"
  },
  {
    "title": "Habit of a country woman near Nuremberg in 1755. Paysan des environs de Nuremberg.",
    "url": "https://images.nypl.org/index.php?id=1638186&t=q"
  },
  {
    "title": "Habit of a lady of the Lower Palatinat in 1643. Dame du Bas-Palatinat.",
    "url": "https://images.nypl.org/index.php?id=1638187&t=q"
  },
  {
    "title": "Habit of Albert Duke of Saxony captain general of the Low Countries in 1489. Albert Duc de Saxe govur. lieutt .& capitaine genl. des Pays Bas.",
    "url": "https://images.nypl.org/index.php?id=1638188&t=q"
  },
  {
    "title": "Habit of a lady of Silesia in 1577. Dame de Silésie.",
    "url": "https://images.nypl.org/index.php?id=1638189&t=q"
  },
  {
    "title": "Habit of a matron of Swabia in 1577. Matrone de Souabe.",
    "url": "https://images.nypl.org/index.php?id=1638190&t=q"
  },
  {
    "title": "Habit of a noble woman of Swabia in 1581. Demoiselle de Souable.",
    "url": "https://images.nypl.org/index.php?id=1638191&t=q"
  },
  {
    "title": "Habit of a Swiss Magistrate in 1577. Magistrat Suisse.",
    "url": "https://images.nypl.org/index.php?id=1638192&t=q"
  },
  {
    "title": "Habit of a Swiss officer in 1588. Officier Suisse.",
    "url": "https://images.nypl.org/index.php?id=1638193&t=q"
  },
  {
    "title": "Bridal habit of a Swiss lady in 1577. Habit de noce d'une Dame Suisse.",
    "url": "https://images.nypl.org/index.php?id=1638194&t=q"
  },
  {
    "title": "Habit of a colonel of the Pandours & master of the watch in 1742. Colonel Pandoure maiître de la garde.",
    "url": "https://images.nypl.org/index.php?id=1638195&t=q"
  },
  {
    "title": "Habit of a corporal of the Warasdin Pandours in 1742. Carporal des Pandoures Waradins.",
    "url": "https://images.nypl.org/index.php?id=1638196&t=q"
  },
  {
    "title": "Habit of a Rascian Tolpatch in 1742. Tolpache Rascien.",
    "url": "https://images.nypl.org/index.php?id=1638197&t=q"
  },
  {
    "title": "Habit of a Swedish lady of quality in 1577. Dame de qualite de Suedé.",
    "url": "https://images.nypl.org/index.php?id=1638198&t=q"
  },
  {
    "title": "Habit of a Russian merchant in 1577. Marchand Russe.",
    "url": "https://images.nypl.org/index.php?id=1638199&t=q"
  },
  {
    "title": "Habit of a Moscovian officer in 1577. Officier Russe.",
    "url": "https://images.nypl.org/index.php?id=1638200&t=q"
  },
  {
    "title": "Habit of a lady of Livonia in 1577. Dame Livonienne.",
    "url": "https://images.nypl.org/index.php?id=1638201&t=q"
  },
  {
    "title": "Habit of a gentleman in the highlands of Scotland in 1745. Gentilhomme des montagnes d'Ecosse.",
    "url": "https://images.nypl.org/index.php?id=1638202&t=q"
  },
  {
    "title": "Habit of a lady in the highlands of Scotland in 1745. Dame des Montagnes d'Ecosse.",
    "url": "https://images.nypl.org/index.php?id=1638203&t=q"
  },
  {
    "title": "Habit of King Henry II in 1490. Le Roi Henri VII.",
    "url": "https://images.nypl.org/index.php?id=1638204&t=q"
  },
  {
    "title": "Habit of Lady Elizabeth queen to King Henry VII in 1490. Elizabeth femme du roi Henry VII.",
    "url": "https://images.nypl.org/index.php?id=1638205&t=q"
  },
  {
    "title": "Habit of King Henry VIII in 1520. Le Roi Henry VII.",
    "url": "https://images.nypl.org/index.php?id=1638206&t=q"
  },
  {
    "title": "Habit of Jane Seymour queen to K[ing] Henry VIII in 1536. Jeanne Seymour femme du Roi Henry VIII.",
    "url": "https://images.nypl.org/index.php?id=1638207&t=q"
  },
  {
    "title": "Habit of King Edward VI worn in England in 1550. Le Roi Edouard VI.",
    "url": "https://images.nypl.org/index.php?id=1638208&t=q"
  },
  {
    "title": "Military habit of King Edward VI in 1552. Habits militaires du Roi Edward VI.",
    "url": "https://images.nypl.org/index.php?id=1638209&t=q"
  },
  {
    "title": "Habit of an English page in the reign of Edw[ard] VI. Page Anglois fous le regne d'Edouard VI.",
    "url": "https://images.nypl.org/index.php?id=1638210&t=q"
  },
  {
    "title": "Habit of Queen Mary in 1554. La reine Marie.",
    "url": "https://images.nypl.org/index.php?id=1638211&t=q"
  },
  {
    "title": "Habit of Queen Elizabeth in 1559. La reine Elizabeth.",
    "url": "https://images.nypl.org/index.php?id=1638212&t=q"
  },
  {
    "title": "Habit of Queen Elizabeth from Holbein in 1551. La reine Elizabeth d'aprés Holbein.",
    "url": "https://images.nypl.org/index.php?id=1638213&t=q"
  },
  {
    "title": "Habit of Elizabeth Queen of England as protectoress of the states of Holland. L'habillement d'Elisabeth reine d'Angleterre comme protectrice des Etats del la Hollande.",
    "url": "https://images.nypl.org/index.php?id=1638214&t=q"
  },
  {
    "title": "Habit of Mary Queen of Scots in 1570. Marie reine d'Ecosse.",
    "url": "https://images.nypl.org/index.php?id=1638215&t=q"
  },
  {
    "title": "Habit of a lady in the court of Queen Elizabeth in 1559. Habit d'une dame de la cour de la Reine Elizabeth.",
    "url": "https://images.nypl.org/index.php?id=1638216&t=q"
  },
  {
    "title": "Habit of an Englilsh nobleman in 1559. Noble Anglais.",
    "url": "https://images.nypl.org/index.php?id=1638217&t=q"
  },
  {
    "title": "Habit of an English nobleman in 1577. Noble Anglais.",
    "url": "https://images.nypl.org/index.php?id=1638218&t=q"
  },
  {
    "title": "Habit of a noble matron of England in 1577. Noble matrone d'Angleterre.",
    "url": "https://images.nypl.org/index.php?id=1638219&t=q"
  },
  {
    "title": "Habit of an English man in 1577. Anglois en 1577.",
    "url": "https://images.nypl.org/index.php?id=1638220&t=q"
  },
  {
    "title": "Habit of an English lady of quality in 1577. Dame Angloisede qualitie.",
    "url": "https://images.nypl.org/index.php?id=1638221&t=q"
  },
  {
    "title": "Habit of Sir Philip Sidney, Kent in 1580. Le chevalier Philippe Sidney.",
    "url": "https://images.nypl.org/index.php?id=1638222&t=q"
  },
  {
    "title": "Habit of an English lady of quality in 1588. Dame Angloise de qualité.",
    "url": "https://images.nypl.org/index.php?id=1638223&t=q"
  },
  {
    "title": "Habit of an English gentleman in 1588. Gentilhomme Anglois.",
    "url": "https://images.nypl.org/index.php?id=1638224&t=q"
  },
  {
    "title": "Habit of a wealthy merchant of London in 1588. Riche marchand de Londres.",
    "url": "https://images.nypl.org/index.php?id=1638225&t=q"
  },
  {
    "title": "Habit of King Charles I in 1630. Le Roi Charles I.",
    "url": "https://images.nypl.org/index.php?id=1638226&t=q"
  },
  {
    "title": "Habit of an English lady of quality in 1640. Dame Angloisede qualité.",
    "url": "https://images.nypl.org/index.php?id=1638227&t=q"
  },
  {
    "title": "Habit of a nobleman of England in 1640. Noble Anglois.",
    "url": "https://images.nypl.org/index.php?id=1638228&t=q"
  },
  {
    "title": "Habit of a lady of quality in England in 1640. Dame Angloisede qualité.",
    "url": "https://images.nypl.org/index.php?id=1638229&t=q"
  },
  {
    "title": "Habit of and English gentleman in 1640. Gentilhomme Anglois.",
    "url": "https://images.nypl.org/index.php?id=1638230&t=q"
  },
  {
    "title": "Habit of an English gentlewoman in 1640. Dame Angloise.",
    "url": "https://images.nypl.org/index.php?id=1638231&t=q"
  },
  {
    "title": "Habit of the lady mayoress of London in 1640. L'epouse du Lord Maire de Londres.",
    "url": "https://images.nypl.org/index.php?id=1638232&t=q"
  },
  {
    "title": "Habit of a merchant's wife of London in 1640. Femme d'un marchand de Londres.",
    "url": "https://images.nypl.org/index.php?id=1638233&t=q"
  },
  {
    "title": "Habit of a citizen's wife of London in 1640. Une bourgeoise de Londres.",
    "url": "https://images.nypl.org/index.php?id=1638234&t=q"
  },
  {
    "title": "Habit of an Oliverian, an English partisan in 1650. Un Cromvelliste, ou Anglois republican, en 1650.",
    "url": "https://images.nypl.org/index.php?id=1638235&t=q"
  },
  {
    "title": "An undress of the Dutchess of Portsmoutn in 1666. La Duchesse de Portsmouth en négligé.",
    "url": "https://images.nypl.org/index.php?id=1638236&t=q"
  },
  {
    "title": "Habit of and English gentleman about 1700. Gentil-homme Anglois de l'année 1700.",
    "url": "https://images.nypl.org/index.php?id=1638237&t=q"
  },
  {
    "title": "Habits of English gentlemen in the years 1735 (a) 1745 (b) 1755 (c). Habillement des gentilshommes Anglois en 1735 etc.",
    "url": "https://images.nypl.org/index.php?id=1638238&t=q"
  },
  {
    "title": "Habits of English ladies in the years 1735 (a) 1745 (b) 1755 (c). Habillement des dames Anglois en 1735 etc.",
    "url": "https://images.nypl.org/index.php?id=1638239&t=q"
  },
  {
    "title": "The play-house habit of King Richard III. Habit de theatre du roi Richard III.",
    "url": "https://images.nypl.org/index.php?id=1638240&t=q"
  },
  {
    "title": "Habit of Coriolanus in the Tragedy of Coriolanus. Coriolan dans la tragédie de Coriolan.",
    "url": "https://images.nypl.org/index.php?id=1638241&t=q"
  },
  {
    "title": "Habit of Aletes in the Tragedy of Cruesa. Altétes dans la tragedie de Creuse.",
    "url": "https://images.nypl.org/index.php?id=1638242&t=q"
  },
  {
    "title": "Habit of Selim in the Tragedy of Barbarossa. Selim dans la Tragédie de Barberousse.",
    "url": "https://images.nypl.org/index.php?id=1638243&t=q"
  },
  {
    "title": "Habit of Tancred in the Tragedy of Tancred & Sigismunda. Tancréd dans la Tragédie de mème nom, et Sigismonde.",
    "url": "https://images.nypl.org/index.php?id=1638244&t=q"
  },
  {
    "title": "Habit of Eltruda in the Masque of Alfred. Eltrude dans le Masque d'Alfred.",
    "url": "https://images.nypl.org/index.php?id=1638245&t=q"
  },
  {
    "title": "Habit of Imoinda in the Tragedy of Oroonoko. Imoidnde dans la Tragédie d'Oroonoko.",
    "url": "https://images.nypl.org/index.php?id=1638246&t=q"
  },
  {
    "title": "Habit of Imoinda in the Tragedy of Oroonoko. Imoidnde dans la Tragédie d'Oroonoko.",
    "url": "https://images.nypl.org/index.php?id=1638247&t=q"
  },
  {
    "title": "Habit of Zara in the Tragedy of the Mourning Bride. Habillement de Zara dans la Tragédie inituleé the Mourning Bride.",
    "url": "https://images.nypl.org/index.php?id=1638248&t=q"
  },
  {
    "title": "Habit of Dorilas in the Tragedy of Merope. Dorilas dans la Tragédie de Merope.",
    "url": "https://images.nypl.org/index.php?id=1638249&t=q"
  },
  {
    "title": "Habit of Perdita in the comedy of the Winter's Tale. Perdita dans la comédie intitulée The Winter's Tale.",
    "url": "https://images.nypl.org/index.php?id=1638250&t=q"
  },
  {
    "title": "Habit of Comus in the Masque of Comus. Comus dans le Masque de Comus.",
    "url": "https://images.nypl.org/index.php?id=1638251&t=q"
  },
  {
    "title": "Recueil des habillements de différentes nations, Volume troisieme, [French title page]",
    "url": "https://images.nypl.org/index.php?id=1638252&t=q"
  },
  {
    "title": "A collection of the dresses of different nations, ancient and modern, Vol. III, [Title page]",
    "url": "https://images.nypl.org/index.php?id=1638253&t=q"
  },
  {
    "title": "A collection of the dresses of different nations, ancient and modern, [Vol. III], [Half title page]",
    "url": "https://images.nypl.org/index.php?id=1638254&t=q"
  },
  {
    "title": "The ceremonial habit of the grand vizier in 1700. Le grand visir en habit de ceremonie.",
    "url": "https://images.nypl.org/index.php?id=1638255&t=q"
  },
  
  {
    "title": "Habit of the master of ceremonies to the grand seignor in 1700. Maitre de ceremonies du grand seigneur.",
    "url": "https://images.nypl.org/index.php?id=1638256&t=q"
  },
  {
    "title": "Habit of the grand seignior's body guard in 1700. Corps de garde du grand Seigneur.",
    "url": "https://images.nypl.org/index.php?id=1638257&t=q"
  },
  {
    "title": "Habit of a captain of an hundred Janisaries in 1568. Captain de cent Janissaires.",
    "url": "https://images.nypl.org/index.php?id=1638258&t=q"
  },
  {
    "title": "A Janissary in his full dress in 1700. Janissaire enhabit de ceremonie.",
    "url": "https://images.nypl.org/index.php?id=1638259&t=q"
  },
  {
    "title": "A Janisary in his common dress in 1700. Janissaire en habit ordinaire.",
    "url": "https://images.nypl.org/index.php?id=1638260&t=q"
  },
  {
    "title": "Habit of a Turkish gentleman in 1700. Gentillhomme Turc.",
    "url": "https://images.nypl.org/index.php?id=1638261&t=q"
  },
  {
    "title": "Habit of a young Turk of quality in 1700. Jeune Turc de qualité.",
    "url": "https://images.nypl.org/index.php?id=1638262&t=q"
  },
  {
    "title": "Habit of a Turkish lady in 1700. Dame Turque.",
    "url": "https://images.nypl.org/index.php?id=1638263&t=q"
  },
  {
    "title": "Habit of a lady of Constantinople in 1750. Dame de Constantinople.",
    "url": "https://images.nypl.org/index.php?id=1638264&t=q"
  },
  {
    "title": "Habit of a young Turk in 1700. Enfant Turc.",
    "url": "https://images.nypl.org/index.php?id=1638265&t=q"
  },
  {
    "title": "Habit of a Turkish courtezan in 1568. Courtisane Turque.",
    "url": "https://images.nypl.org/index.php?id=1638266&t=q"
  },
  {
    "title": "Habit of a Turkish dancer in 1700. Danceur Turc.",
    "url": "https://images.nypl.org/index.php?id=1638267&t=q"
  },
  {
    "title": "Habit of a Turkish dancer in 1700. Damseuse Turque.",
    "url": "https://images.nypl.org/index.php?id=1638268&t=q"
  },
  {
    "title": "Habit of a Franc Merchant in 1700. Marchand Franc.",
    "url": "https://images.nypl.org/index.php?id=1638269&t=q"
  },
  {
    "title": "The wife of a Franc merchant in an undress in 1700. Femme d'un Franc en deshabille.",
    "url": "https://images.nypl.org/index.php?id=1638270&t=q"
  },
  {
    "title": "Morning habit of a lady of the City of Pera in Natolia in 1568. Dame de Pera en deshabille.",
    "url": "https://images.nypl.org/index.php?id=1638271&t=q"
  },
  {
    "title": "Habit of a virgin of Thesalonica. Vierge de Thesalonica.",
    "url": "https://images.nypl.org/index.php?id=1638272&t=q"
  },
  {
    "title": "Habit of a lady of the island of Chio in 1700. Fille de l'Isle de Chió in 1700.",
    "url": "https://images.nypl.org/index.php?id=1638273&t=q"
  },
  {
    "title": "Habit of a Tartarian officer in 1765. Officier Tartar.",
    "url": "https://images.nypl.org/index.php?id=1638274&t=q"
  },
  {
    "title": "Habit of a Tartar in Kasan subject to Russia in 1768. Tartare de Kasan.",
    "url": "https://images.nypl.org/index.php?id=1638275&t=q"
  },
  {
    "title": "Habit of a Tartarian woman in Kasan subject to Russian in 1768. Tartare de Kasan.",
    "url": "https://images.nypl.org/index.php?id=1638276&t=q"
  },
  {
    "title": "Habit of a lady of Tartary in 1667. Dame de Tartarie.",
    "url": "https://images.nypl.org/index.php?id=1638277&t=q"
  },
  {
    "title": "Habit of a Tartarian woman of Schouvache subject to Russia in 1768. Femme Schouvache.",
    "url": "https://images.nypl.org/index.php?id=1638278&t=q"
  },
  {
    "title": "Habit of a Tartarian woman of Schouvache in 176[8]. Tartare de Schouvache.",
    "url": "https://images.nypl.org/index.php?id=1638279&t=q"
  },
  {
    "title": "The ordinary habit of the emperor of China in [sic]. L'Empereur de la Chine dans sa parure ordinaire.",
    "url": "https://images.nypl.org/index.php?id=1638280&t=q"
  },
  {
    "title": "Habit of a lady of China in 17[sic]. Dame Chinoise.",
    "url": "https://images.nypl.org/index.php?id=1638281&t=q"
  },
  {
    "title": "Habit of a Bonza or priest in China. Bonza de la Chine.",
    "url": "https://images.nypl.org/index.php?id=1638282&t=q"
  },
  {
    "title": "Habit of a bonzess of China in 1700. Bonzess de Chine.",
    "url": "https://images.nypl.org/index.php?id=1638283&t=q"
  },
  {
    "title": "Habit of a servant maid in China. Servante de la Chine.",
    "url": "https://images.nypl.org/index.php?id=1638284&t=q"
  },
  {
    "title": "Habit of a Persian gentleman in 1700. Persien.",
    "url": "https://images.nypl.org/index.php?id=1638285&t=q"
  },
  {
    "title": "Habit of a Persian lady in 1700. Persienne.",
    "url": "https://images.nypl.org/index.php?id=1638286&t=q"
  },
  {
    "title": "Habit of an Armenian native of Persia in 1700. Armenian natif de Perse.",
    "url": "https://images.nypl.org/index.php?id=1638287&t=q"
  },
  {
    "title": "Habit of a Georgian in 1768. Georgien.",
    "url": "https://images.nypl.org/index.php?id=1638288&t=q"
  },
  {
    "title": "Habit of Aurengzeeb. Aurengzeeb.",
    "url": "https://images.nypl.org/index.php?id=1638289&t=q"
  },
  {
    "title": "The habit of Allaverdy Cann, grandfather and predecessor to Suraja Dowla. Allaverdy Cann, ayeul et predecessor de Suraja Dowla.",
    "url": "https://images.nypl.org/index.php?id=1638290&t=q"
  },
  {
    "title": "Habit of a lady of Indostan. Femme des Indes Orientales.",
    "url": "https://images.nypl.org/index.php?id=1638291&t=q"
  },
  {
    "title": "Habit of a lady of Indostan. Femme des Indes Orientales.",
    "url": "https://images.nypl.org/index.php?id=1638292&t=q"
  },
  {
    "title": "Habit of a lady of Indostan. Femme des Indes Orientales.",
    "url": "https://images.nypl.org/index.php?id=1638293&t=q"
  },
  {
    "title": "Habit of a lady of Indostan. Femme des Indes Orientales.",
    "url": "https://images.nypl.org/index.php?id=1638294&t=q"
  },
  {
    "title": "Habit of a lady of Indostan. Femme des Indes Orientales.",
    "url": "https://images.nypl.org/index.php?id=1638295&t=q"
  },
  {
    "title": "Habit of a lady of Indostan. Femme des Indes Orientales.",
    "url": "https://images.nypl.org/index.php?id=1638296&t=q"
  },
  {
    "title": "Habit of a merchant of Indostan in 1700. Marchand d'Indostan.",
    "url": "https://images.nypl.org/index.php?id=1638297&t=q"
  },
  {
    "title": "A Kamtchadal in his full dress in 1768. Kamtchadal dans son habit de cêremonie.",
    "url": "https://images.nypl.org/index.php?id=1638298&t=q"
  },
  {
    "title": "A Kamtchadal in her full dress in 1768. Kamtchadal dans son habit de cêremonie.",
    "url": "https://images.nypl.org/index.php?id=1638299&t=q"
  },
  {
    "title": "Summer habit of a Kamtchadal in 1768. Kamtchadal dans son habit d'Ete.",
    "url": "https://images.nypl.org/index.php?id=1638300&t=q"
  },
  {
    "title": "Full dress of a Kamtchadale in 1768. Kamtchadale dans sa plus grande Parûre.",
    "url": "https://images.nypl.org/index.php?id=1638301&t=q"
  },
  {
    "title": "Winter habit of a Kamtchadal in 1768. Kamtchadal dans son habit d'hiver.",
    "url": "https://images.nypl.org/index.php?id=1638302&t=q"
  },
  {
    "title": "Common habit of a Kamtchadale with here child in 1768. Kamtchadale dans son habit ordinaire.",
    "url": "https://images.nypl.org/index.php?id=1638303&t=q"
  },
  {
    "title": "A Kamtchadal in his hunting dress. Kamtchadal en habit de chasse.",
    "url": "https://images.nypl.org/index.php?id=1638304&t=q"
  },
  {
    "title": "Habit of a woman of Tchouktschi in Siberia subject to Russia in 1768. Femme Tchouktschi.",
    "url": "https://images.nypl.org/index.php?id=1638305&t=q"
  },
  {
    "title": "Habit of a Samoyede woman and child subject to Russia in 1768. Femme Samoyèd.",
    "url": "https://images.nypl.org/index.php?id=1638306&t=q"
  },
  {
    "title": "Habit of a woman of Wotiac in Siberia in 1768. Femme Wotiake.",
    "url": "https://images.nypl.org/index.php?id=1638307&t=q"
  },
  {
    "title": "Habit of woman of Wotiac in Siberia in 1768. Femme Wotiake.",
    "url": "https://images.nypl.org/index.php?id=1638308&t=q"
  },
  {
    "title": "Summer habit of a Moor of Morocco in 1695. Habit d'eté d'un Maure d'Maroc.",
    "url": "https://images.nypl.org/index.php?id=1638309&t=q"
  },
  {
    "title": "Habit of a Moor of Morocco in winter in 1695. Habit d'hiver d'un Maure de Moroc.",
    "url": "https://images.nypl.org/index.php?id=1638310&t=q"
  },
  {
    "title": "Habit of a Moor of Morocco in winter in 1695. Habit d'hiver d'un Maure de Moroc.",
    "url": "https://images.nypl.org/index.php?id=1638311&t=q"
  },
  {
    "title": "Habit of a Moorish woman in 1695. Femme de Moroc dans sa maison.",
    "url": "https://images.nypl.org/index.php?id=1638312&t=q"
  },
  {
    "title": "Habit of a Moorish woman in 1695. Femme de Maroc dans sa maison.",
    "url": "https://images.nypl.org/index.php?id=1638313&t=q"
  },
  {
    "title": "Habit of a Moorish woman in 1695. Femme de Maroc allant par la ville.",
    "url": "https://images.nypl.org/index.php?id=1638314&t=q"
  },
  {
    "title": "Habit of a Moorish priest in 1695. Pretre de Maroc.",
    "url": "https://images.nypl.org/index.php?id=1638315&t=q"
  },
  {
    "title": "Habit of one of the guards to the king of Morocco in 1695. Garde du roi de Moroc.",
    "url": "https://images.nypl.org/index.php?id=1638316&t=q"
  },
  {
    "title": "A colonel of the Strelitzes, the old Russian militia and body guard to the czars of Moscovy. Colonel du corps de Stelits.",
    "url": "https://images.nypl.org/index.php?id=1638317&t=q"
  },
  {
    "title": "Habit of a commander of a corps of the Strelitz in 1764. Commandant du corps de Strelits.",
    "url": "https://images.nypl.org/index.php?id=1638318&t=q"
  },
  {
    "title": "A soldier of the Strelitz guards under arms. Soldat du corps des Strelits sous les armés.",
    "url": "https://images.nypl.org/index.php?id=1638319&t=q"
  },
  {
    "title": "Morning habit of a Russian lady in 1764. Femme Russe.",
    "url": "https://images.nypl.org/index.php?id=1638320&t=q"
  },
  {
    "title": "Summer habit of a Russian woman with her cloak on in 1765. Femme Russe avec sa coësse.",
    "url": "https://images.nypl.org/index.php?id=1638321&t=q"
  },
  {
    "title": "Summer habit of a Russian woman with her cloak off in 1765. Femme Russe sans sa coesse.",
    "url": "https://images.nypl.org/index.php?id=1638322&t=q"
  },
  {
    "title": "Habit of a Russian girl in 1764. Fille Russe.",
    "url": "https://images.nypl.org/index.php?id=1638323&t=q"
  },
  {
    "title": "Habit of a merchant's wife in Russia in 1765. Femme d'un marchand Russe.",
    "url": "https://images.nypl.org/index.php?id=1638324&t=q"
  },
  {
    "title": "A country woman returning from market in 1764. Femme du peuple revenant du marché.",
    "url": "https://images.nypl.org/index.php?id=1638325&t=q"
  },
  {
    "title": "Habit of a country woman in Russia in 1764. Paysanne.",
    "url": "https://images.nypl.org/index.php?id=1638326&t=q"
  },
  {
    "title": "Habit of a Russian market woman in 1764. Matchande Russe.",
    "url": "https://images.nypl.org/index.php?id=1638327&t=q"
  },
  {
    "title": "Habit of a Russian market woman in 1768. Marchande Russe.",
    "url": "https://images.nypl.org/index.php?id=1638328&t=q"
  },
  {
    "title": "Habit of a Russian boor in 1768. Paysan de Russe.",
    "url": "https://images.nypl.org/index.php?id=1638329&t=q"
  },
  {
    "title": "Habit of the wife of a Russian boor in 1768. Femme d'un paysan de Russe.",
    "url": "https://images.nypl.org/index.php?id=1638330&t=q"
  },
  {
    "title": "Habit of a Russian boor that sells live fish in 1765. Marchand de poisson vivant en Russe.",
    "url": "https://images.nypl.org/index.php?id=1638331&t=q"
  },
  {
    "title": "Habit of a Russian fortune teller in 1764. La diseuse de bonne avanture Russe.",
    "url": "https://images.nypl.org/index.php?id=1638332&t=q"
  },
  {
    "title": "Habit of a Russian midwife in 1764. Sage femme Russe.",
    "url": "https://images.nypl.org/index.php?id=1638333&t=q"
  },
  {
    "title": "Habit of a gentlewoman in Moscow in 1768. Femme de Moscou.",
    "url": "https://images.nypl.org/index.php?id=1638334&t=q"
  },
  {
    "title": "Habit of a gentlewoman in Moscow in 1768. Femme de Moscou.",
    "url": "https://images.nypl.org/index.php?id=1638335&t=q"
  },
  {
    "title": "Common habit of a young lady in Moscow in 1768. Fille Moscovitte dans son habit simple.",
    "url": "https://images.nypl.org/index.php?id=1638336&t=q"
  },
  {
    "title": "Habit of a Russian lady at Archangel in 1768. Femme d'Arcangel.",
    "url": "https://images.nypl.org/index.php?id=1638337&t=q"
  },
  {
    "title": "Habit of a young market woman of Octha in Russia in 1765. Jeune marchande d'Octha.",
    "url": "https://images.nypl.org/index.php?id=1638338&t=q"
  },
  {
    "title": "Habit of a Russian lady a Valday in 1764. Femme de Valday.",
    "url": "https://images.nypl.org/index.php?id=1638339&t=q"
  },
  {
    "title": "Habit of a woman of Ingria subject to Russia in 1764. Femme d'Ingrie.",
    "url": "https://images.nypl.org/index.php?id=1638340&t=q"
  },
  {
    "title": "Habit of a country woman of Ingria in 1764. Femme d'Ingrie.",
    "url": "https://images.nypl.org/index.php?id=1638341&t=q"
  },
  {
    "title": "Habit of a market man in Finland in 1768. Marchand Finlandois.",
    "url": "https://images.nypl.org/index.php?id=1638342&t=q"
  },
  {
    "title": "Habit of a Finland girl in 1768. Fille de Finlande.",
    "url": "https://images.nypl.org/index.php?id=1638343&t=q"
  },
  {
    "title": "Habit of a country man of Livona in 1700. Paysan de l'Ivonie.",
    "url": "https://images.nypl.org/index.php?id=1638344&t=q"
  },
  {
    "title": "Habit of a countryman of Dalecarlia in Sweden. Paysan de la Dalécarlie.",
    "url": "https://images.nypl.org/index.php?id=1638345&t=q"
  },
  {
    "title": "Habit of a countrywoman of Dalecarlia in Sweden. Paysanne de la Dalécarlie.",
    "url": "https://images.nypl.org/index.php?id=1638346&t=q"
  },
  {
    "title": "A noble man of Denmark in 1626. Gentilhomme de Dannemarck.",
    "url": "https://images.nypl.org/index.php?id=1638347&t=q"
  },
  {
    "title": "Nobleman's wife of Denmark in 1626. Dame de qualité de Dannemarck",
    "url": "https://images.nypl.org/index.php?id=1638348&t=q"
  },
  {
    "title": "Merchants wife of Denmark 1626. Femme d'un marchand de Dannemarck.",
    "url": "https://images.nypl.org/index.php?id=1638349&t=q"
  },
  {
    "title": "A woman of Ditmarsh subject to Denmark in 1626. Dame de Ditmarsh.",
    "url": "https://images.nypl.org/index.php?id=1638350&t=q"
  },
  {
    "title": "Habit of a woman of Denmark in 1640. Femme de Dannemarck.",
    "url": "https://images.nypl.org/index.php?id=1638351&t=q"
  },
  {
    "title": "An ancient habit of a nobleman of Friesland. Parûre ancienne d'un noble de Frise.",
    "url": "https://images.nypl.org/index.php?id=1638352&t=q"
  },
  {
    "title": "An ancient habit of a matron of Friesland. Parûre ancienne d'une matrone de Frise.",
    "url": "https://images.nypl.org/index.php?id=1638353&t=q"
  },
  {
    "title": "An ancient habit of a married woman of Friesland. Parûre ancienne d'une mariée de Frise.",
    "url": "https://images.nypl.org/index.php?id=1638354&t=q"
  },
  {
    "title": "An ancient habit of a married woman in Friesland. Parûre ancienne d'une femme mariée de Frise.",
    "url": "https://images.nypl.org/index.php?id=1638355&t=q"
  },
  {
    "title": "An ancient habit of a married woman in Friesland. Parûre ancienne d'une femme mariée de Frise.",
    "url": "https://images.nypl.org/index.php?id=1638356&t=q"
  },
  {
    "title": "An ancient habit of a noble virgin of Friesland. Parûre ancienne d'une vierge noble de Frise.",
    "url": "https://images.nypl.org/index.php?id=1638357&t=q"
  },
  {
    "title": "An ancient habit of a virgin of Friesland. Parûre ancienne d'une vierge de Frise.",
    "url": "https://images.nypl.org/index.php?id=1638358&t=q"
  },
  {
    "title": "An ancient habit of a countryman of Friesland. Parûre ancienne d'un paysan de Frise.",
    "url": "https://images.nypl.org/index.php?id=1638359&t=q"
  },
  {
    "title": "An ancient habit of a countrywoman of Friesland. Parûre ancienne d'une paysanne de Frise.",
    "url": "https://images.nypl.org/index.php?id=1638360&t=q"
  },
  {
    "title": "An ancient habit of a countrywoman of Friesland. Parûre ancienne d'une paysanne de Frise.",
    "url": "https://images.nypl.org/index.php?id=1638361&t=q"
  },
  {
    "title": "An ancient habit of a maid servant in Friesland. Parûre ancienne d'une servante de Frise.",
    "url": "https://images.nypl.org/index.php?id=1638362&t=q"
  },
  {
    "title": "Habit of a lady in Holland in 1640. D'ame d'Holland.",
    "url": "https://images.nypl.org/index.php?id=1638363&t=q"
  },
  {
    "title": "Habit of a Dutch skipper in 1770. Matelot Hollandois.",
    "url": "https://images.nypl.org/index.php?id=1638364&t=q"
  },
  {
    "title": "Habit of a woman of Cologn[e] in 1640. Femme de Cologne.",
    "url": "https://images.nypl.org/index.php?id=1638365&t=q"
  },
  {
    "title": "Lady of Hungary in 1626. Dame Hongroise.",
    "url": "https://images.nypl.org/index.php?id=1638366&t=q"
  },
  {
    "title": "Habit of a Polish Jew in 1768. Juif Polanais.",
    "url": "https://images.nypl.org/index.php?id=1638367&t=q"
  },
  {
    "title": "Habit of a Polish Jewess in 1766. Femme Juixe Polonoise.",
    "url": "https://images.nypl.org/index.php?id=1638368&t=q"
  },
  {
    "title": "A countrywoman of Geneva in 1626. Paysanne de Geneve.",
    "url": "https://images.nypl.org/index.php?id=1638369&t=q"
  },
  {
    "title": "Habit of a citizen's wife of Bologna in 1768. Bourgeoise de Bologne.",
    "url": "https://images.nypl.org/index.php?id=1638370&t=q"
  },
  {
    "title": "Habit of a country woman of Clabria in 1768. Paysanne de la Calabre.",
    "url": "https://images.nypl.org/index.php?id=1638371&t=q"
  },
  {
    "title": "Habit of a citizen's wife in Florence, with a little bonnet, in 1768. Bourgeoise Florentine avec une petite coeffe.",
    "url": "https://images.nypl.org/index.php?id=1638372&t=q"
  },
  {
    "title": "Habit of a citizen's wife of Frascati in 1768. Bourgeoise de Frascati.",
    "url": "https://images.nypl.org/index.php?id=1638373&t=q"
  },
  {
    "title": "Habit of a country woman near Pisa in 1768. Femme du peuple des environs de Pise.",
    "url": "https://images.nypl.org/index.php?id=1638374&t=q"
  },
  {
    "title": "Recueil des habillements de différentes nations, Volume quatrieme, [French title page]",
    "url": "https://images.nypl.org/index.php?id=1638375&t=q"
  },
  {
    "title": "A collection of the dresses of different nations, ancient and modern, Vol. IV, [Title page]",
    "url": "https://images.nypl.org/index.php?id=1638376&t=q"
  },
  {
    "title": "A collection of the dresses of different nations, ancient and modern, [Vol. IV], [Half title page]",
    "url": "https://images.nypl.org/index.php?id=1638377&t=q"
  },
  {
    "title": "Habit of an archbishop of Russia. Archrêque Russe en habit du choeur.",
    "url": "https://images.nypl.org/index.php?id=1638378&t=q"
  },
  {
    "title": "Habit of an archbishop of Russia. Archrêque Russe en habit ordinaire du choeur.",
    "url": "https://images.nypl.org/index.php?id=1638379&t=q"
  },
  {
    "title": "The choir habit of a curate of Russia. Curê Russe en habit de choeur.",
    "url": "https://images.nypl.org/index.php?id=1638380&t=q"
  },
  {
    "title": "Common dress of a monk of the order of St. Bazil. Moine de l'ordre de St. Bazill en robe simple.",
    "url": "https://images.nypl.org/index.php?id=1638381&t=q"
  },
  {
    "title": "A Greek nun of the order of St. Bazil in her choir dress. Religieuse Grecque de l'Ordre de St. Bazil en habit de choeur.",
    "url": "https://images.nypl.org/index.php?id=1638382&t=q"
  },
  {
    "title": "A nun of the antient[sic] Order of St. Augustin. Religieuse de l'ordre ancien de St. Augustin.",
    "url": "https://images.nypl.org/index.php?id=1638383&t=q"
  },
  {
    "title": "A nun of the antient[sic] Order of St. Augustin. Religieuse de l'ordre ancien de St. Augustin.",
    "url": "https://images.nypl.org/index.php?id=1638384&t=q"
  },
  {
    "title": "Habit of a Beguine of Antwerp. Beguine d'Anvers.",
    "url": "https://images.nypl.org/index.php?id=1638385&t=q"
  },
  {
    "title": "A Capuchin nun. Religieuse Capucine.",
    "url": "https://images.nypl.org/index.php?id=1638386&t=q"
  },
  {
    "title": "A nun of the order of Font Ebraldi. Religeuse de l'ordre de Font Evrauld.",
    "url": "https://images.nypl.org/index.php?id=1638387&t=q"
  },
  {
    "title": "A Franciscan nun. Religieuse Franciscaine.",
    "url": "https://images.nypl.org/index.php?id=1638388&t=q"
  },
  {
    "title": "Habit of a Minim. Minime.",
    "url": "https://images.nypl.org/index.php?id=1638389&t=q"
  },
  {
    "title": "Habit of a Cistercian nun. Religieuse de l'Ordre de Citeaux.",
    "url": "https://images.nypl.org/index.php?id=1638390&t=q"
  },
  {
    "title": "Habit of a Saxon nun. Religieuse Saxonne.",
    "url": "https://images.nypl.org/index.php?id=1638391&t=q"
  },
  {
    "title": "A Jesuit nun. Religieuse Jesuite.",
    "url": "https://images.nypl.org/index.php?id=1638392&t=q"
  },
  {
    "title": "Habit of a French knight in 1399. Comte Français.",
    "url": "https://images.nypl.org/index.php?id=1638393&t=q"
  },
  {
    "title": "Count Simon De Montfort. Simon Comte de Montfort.",
    "url": "https://images.nypl.org/index.php?id=1638394&t=q"
  },
  {
    "title": "Olivier De Clisson, constable of France. Olivier de Clisson Connéable de France.",
    "url": "https://images.nypl.org/index.php?id=1638395&t=q"
  },
  {
    "title": "John, Bastard of Orleans, Count of Dunois and of Longueville. John Bâtard d'Orleans, Comte de Dunois et de Longueville.",
    "url": "https://images.nypl.org/index.php?id=1638396&t=q"
  },
  {
    "title": "Joan of Ark, surnamed The Maid of Orleans. Jeanne D'Ark, surnommée la Pucelle d'Orleans.",
    "url": "https://images.nypl.org/index.php?id=1638397&t=q"
  },
  {
    "title": "Lewis De la Trimoville, viscount of Thouars. Louis De la Trémouille, vicomte de Thouars.",
    "url": "https://images.nypl.org/index.php?id=1638398&t=q"
  },
  {
    "title": "Peter Terrail, seigneur de Bayard. Pierre du Terrail, seigneur de Bayard.",
    "url": "https://images.nypl.org/index.php?id=1638399&t=q"
  },
  {
    "title": "Charles De Cossé, count of Brissac, marshall of France. Charles de Cossé Comte de Brissac Maréchal de France.",
    "url": "https://images.nypl.org/index.php?id=1638400&t=q"
  },
  {
    "title": "Blaise de Montluc, marshal of France. Blaise de Montluc Maréchal de France.",
    "url": "https://images.nypl.org/index.php?id=1638401&t=q"
  },
  {
    "title": "Armand de Gontaude de Biron, marshal of France. Armand de Gontaud de Biron, maréchal de France.",
    "url": "https://images.nypl.org/index.php?id=1638402&t=q"
  },
  {
    "title": "Henry IV, King of France. Henry IV Roy de France.",
    "url": "https://images.nypl.org/index.php?id=1638403&t=q"
  },
  {
    "title": "Mary De Medicis, Queen of Henry the Great. Marie de Medicis femme d'Henry le Grand.",
    "url": "https://images.nypl.org/index.php?id=1638404&t=q"
  },
  {
    "title": "Louis XIII, King of France. Louis XIII, Roy de France.",
    "url": "https://images.nypl.org/index.php?id=1638405&t=q"
  },
  {
    "title": "Queen Anne of Austria, wife of Louis XIII. La Reyne Anne d'Autriche Femme de Louis XIII.",
    "url": "https://images.nypl.org/index.php?id=1638406&t=q"
  },
  {
    "title": "A conference between Louis XIV King of France and Philip IV KIng of Spain in 1660. Conférence de Louis XIV Roy de France et de Philippe IV Roy d'Espagne.",
    "url": "https://images.nypl.org/index.php?id=1638407&t=q"
  },
  {
    "title": "Habit of Louis XIV King of France. Louis XIV Roi de France.",
    "url": "https://images.nypl.org/index.php?id=1638408&t=q"
  },
  {
    "title": "Habit of the dauphin son to Louis XIV King of France. Le dauphin de France fils de Louis XIV.",
    "url": "https://images.nypl.org/index.php?id=1638409&t=q"
  },
  {
    "title": "Habit of a French nobleman in 1660. Gentilhomme François.",
    "url": "https://images.nypl.org/index.php?id=1638410&t=q"
  },
  {
    "title": "Habit of a lady of quality of France. Dame de qualité de France.",
    "url": "https://images.nypl.org/index.php?id=1638411&t=q"
  },
  {
    "title": "Habit of one of the French king's guards that attend in the palace. Garde de la manche.",
    "url": "https://images.nypl.org/index.php?id=1638412&t=q"
  },
  {
    "title": "The habit of Rubens's son. Le fils de Rubens.",
    "url": "https://images.nypl.org/index.php?id=1638413&t=q"
  },
  {
    "title": "Habit of a French gentleman in 1626. Gentilhomme François.",
    "url": "https://images.nypl.org/index.php?id=1638414&t=q"
  },
  {
    "title": "Habit of a lady of Paris in 1626. Dame de Paris.",
    "url": "https://images.nypl.org/index.php?id=1638415&t=q"
  },
  {
    "title": "Habit of a merchant of Paris in 1626. Marchand de Paris.",
    "url": "https://images.nypl.org/index.php?id=1638416&t=q"
  },
  {
    "title": "Habit of a merchant's wife of Paris in 1626. Femme d'un marchand de Paris.",
    "url": "https://images.nypl.org/index.php?id=1638417&t=q"
  },
  {
    "title": "Habit of Maria Theresa of Austria Infanta of Spain in 1660. Marie Thérese d'Autriche Infante d'Espagne.",
    "url": "https://images.nypl.org/index.php?id=1638418&t=q"
  },
  {
    "title": "Habit of a nobleman of Spain in 1660. Gentilhomme Espagnol.",
    "url": "https://images.nypl.org/index.php?id=1638419&t=q"
  },
  {
    "title": "Habit of a Spanish gentlman of quality. Gentilhomme Espagnol.",
    "url": "https://images.nypl.org/index.php?id=1638420&t=q"
  },
  {
    "title": "Habit of a Spanish lady of quality. Dame Espagnole.",
    "url": "https://images.nypl.org/index.php?id=1638421&t=q"
  },
  {
    "title": "Habit of a Spanish gentleman in 1626. Gentilhomme Espagnol.",
    "url": "https://images.nypl.org/index.php?id=1638422&t=q"
  },
  {
    "title": "A Spanish lady in 1626. Dame Espagnole.",
    "url": "https://images.nypl.org/index.php?id=1638423&t=q"
  },
  {
    "title": "Habit of a Spanish gentleman. Espagnol.",
    "url": "https://images.nypl.org/index.php?id=1638424&t=q"
  },
  {
    "title": "Habit of a Spanish lady with her veil in her hand. Dame Espagnole avec son voile.",
    "url": "https://images.nypl.org/index.php?id=1638425&t=q"
  },
  {
    "title": "Habit of an Italian gentleman in 1626. Gentilhomme d'Italie.",
    "url": "https://images.nypl.org/index.php?id=1638426&t=q"
  },
  {
    "title": "Habit of an Italian lady in 1626.",
    "url": "https://images.nypl.org/index.php?id=1638427&t=q"
  },
  {
    "title": "Habit of a gentleman of the City of Milan. Gentilhomme de Milan.",
    "url": "https://images.nypl.org/index.php?id=1638428&t=q"
  },
  {
    "title": "Habit of a lady of the City of Milan. Dame de Milan.",
    "url": "https://images.nypl.org/index.php?id=1638429&t=q"
  },
  {
    "title": "Habit of a lady in Rome in 1626. Dame de Rome.",
    "url": "https://images.nypl.org/index.php?id=1638430&t=q"
  },
  {
    "title": "Habit of a woman of Frascati in 1768. Femme de Frascati.",
    "url": "https://images.nypl.org/index.php?id=1638431&t=q"
  },
  {
    "title": "Habit of a Neapolitan country woman in 1768. Paysanne Napolitaine.",
    "url": "https://images.nypl.org/index.php?id=1638432&t=q"
  },
  {
    "title": "Habit of a lady of the Island of Malta in 1568. Fille de l'Isle de Malta.",
    "url": "https://images.nypl.org/index.php?id=1638433&t=q"
  },
  {
    "title": "Habit of an antient [sic] Britain. Ancien Breton.",
    "url": "https://images.nypl.org/index.php?id=1638434&t=q"
  },
  {
    "title": "Habit of a Roman in 44. Ancien Romain.",
    "url": "https://images.nypl.org/index.php?id=1638435&t=q"
  },
  {
    "title": "Habit of a Saxon in 447. Ancien Saxon.",
    "url": "https://images.nypl.org/index.php?id=1638436&t=q"
  },
  {
    "title": "Habit of a Dane in 1017. Ancien Danois.",
    "url": "https://images.nypl.org/index.php?id=1638437&t=q"
  },
  {
    "title": "Habit of a Norman in 1066. Ancien Normand.",
    "url": "https://images.nypl.org/index.php?id=1638438&t=q"
  },
  {
    "title": "Habit of a Pict. Ancient Pict.",
    "url": "https://images.nypl.org/index.php?id=1638439&t=q"
  },
  {
    "title": "Habit of a woman Pict. Femme Picte.",
    "url": "https://images.nypl.org/index.php?id=1638440&t=q"
  },
  {
    "title": "Habit of the daughter of a Pict. Jeune fille Picte.",
    "url": "https://images.nypl.org/index.php?id=1638441&t=q"
  },
  {
    "title": "Habit of a Caledonian. Ancien Caledonien.",
    "url": "https://images.nypl.org/index.php?id=1638442&t=q"
  },
  {
    "title": "Habit of Caledonian woman. Femme Caledonienne.",
    "url": "https://images.nypl.org/index.php?id=1638443&t=q"
  },
  {
    "title": "Habit of an English lady in spring, 1641. Dame Angloise en habit de printemps.",
    "url": "https://images.nypl.org/index.php?id=1638444&t=q"
  },
  {
    "title": "Habit of an English lady in summer, 1641. Dame Angloise en habit d'eté.",
    "url": "https://images.nypl.org/index.php?id=1638445&t=q"
  },
  {
    "title": "Habit of an English lady in autumn, 1641. Dame Angloise en habit d'automne.",
    "url": "https://images.nypl.org/index.php?id=1638446&t=q"
  },
  {
    "title": "Habit of an English lady in winter, 1641. Dame Angloise en habit d'hyver.",
    "url": "https://images.nypl.org/index.php?id=1638447&t=q"
  },
  {
    "title": "Habit of and English woman in 1626. Dame Angloise.",
    "url": "https://images.nypl.org/index.php?id=1638448&t=q"
  },
  {
    "title": "Habit of a fisherman of Greenland in 1626. Pêcheur de Groenland.",
    "url": "https://images.nypl.org/index.php?id=1638449&t=q"
  },
  {
    "title": "Habit of a mountain Indian near Hudson's Bay. Sauvage des montagnes pres de la Baye d'Hudson.",
    "url": "https://images.nypl.org/index.php?id=1638450&t=q"
  },
  {
    "title": "Habit of an Eskimaux[sic] Indian of Labrador in 1766. Eskimau du Labrador.",
    "url": "https://images.nypl.org/index.php?id=1638451&t=q"
  },
  {
    "title": "Habit of an Eskimaux woman of Labrador in 1766. Femme Eskimau du Labrador.",
    "url": "https://images.nypl.org/index.php?id=1638452&t=q"
  },
  {
    "title": "An Indian inhabiting the country Northwest of Louisiana in 1741 Sauvage du Nord Ouest de la Louisiane.",
    "url": "https://images.nypl.org/index.php?id=1638453&t=q"
  },
  {
    "title": "Habit of an Ottawa an Indian Nation of North America. Indien de la Nation Ottawa dans L'Amerique septentrional.",
    "url": "https://images.nypl.org/index.php?id=1638454&t=q"
  },
  {
    "title": "Habit of a Wiendot woman. Femme Wiendot.",
    "url": "https://images.nypl.org/index.php?id=1638455&t=q"
  },
  {
    "title": "Habit of a woman of the Christianoux an Indian nation of North America. Femme de la Nations des Christianoux dans L'Amérique du Nord.",
    "url": "https://images.nypl.org/index.php?id=1638456&t=q"
  },
  {
    "title": "Habit of a Coughnonaga woman an Indian Nation of North America. Femme de la Nations des Coughnowagas dans L'Amerique du Nord.",
    "url": "https://images.nypl.org/index.php?id=1638457&t=q"
  },
  {
    "title": "Habit of a Mohawk one of the Six Nations. Mohawk iroquois.",
    "url": "https://images.nypl.org/index.php?id=1638458&t=q"
  },
  {
    "title": "Habit of a Delaware Indian with his tomohawk scalping knife. Indien de la Riviere Delaware arme de la hache a du couteau pur lever sa chevelure.",
    "url": "https://images.nypl.org/index.php?id=1638459&t=q"
  },
  {
    "title": "The Indians giving a talk to Colonel Bouquet in a conference at a council fire near his camp on the Banks of Muskingum in North America in October 1764",
    "url": "https://images.nypl.org/index.php?id=1638460&t=q"
  },
  {
    "title": "The Indians delivering up the English captives to Colonel Bouquet near his camp at the Forks of Muskingum in North America in November 1764.",
    "url": "https://images.nypl.org/index.php?id=1638461&t=q"
  },
  {
    "title": "Habit of a nobleman of Virginia. Noble de Virginie.",
    "url": "https://images.nypl.org/index.php?id=1638462&t=q"
  },
  {
    "title": "Habit of a lady of Virginia. Dame de Virginie.",
    "url": "https://images.nypl.org/index.php?id=1638463&t=q"
  },
  {
    "title": "Habit of Cunne Shote a Cherokee Chief. Cunne Shote Chèf des Chiroquois.",
    "url": "https://images.nypl.org/index.php?id=1638464&t=q"
  },
  {
    "title": "Habit of a king of Florida in 1625. Roy de la Floride.",
    "url": "https://images.nypl.org/index.php?id=1638465&t=q"
  },
  {
    "title": "Habit of a woman of Mexico in 1625. Femme du Mexique.",
    "url": "https://images.nypl.org/index.php?id=1638466&t=q"
  },
  {
    "title": "Habit of a Spanish gentleman of Montevideo in South America in 1764. Gentilhomme Espagnol de Montevideo.",
    "url": "https://images.nypl.org/index.php?id=1638467&t=q"
  },
  {
    "title": "Habit of a Spanish lady of Montevideo in South America in 1764. Dame Espagnolle de Montevideo.",
    "url": "https://images.nypl.org/index.php?id=1638468&t=q"
  },
  {
    "title": "Habit of a Spaniard of Montevideo in South America in 1764. Espagnol de Montevideo.",
    "url": "https://images.nypl.org/index.php?id=1638469&t=q"
  },
  {
    "title": "Habit of a Spaniard of Montevideo in South America in 1764. Espagnol de Montevideo.",
    "url": "https://images.nypl.org/index.php?id=1638470&t=q"
  },
  {
    "title": "Habit of an Indian of Montevideo in South America in 1764. Sauvage de Montevideo.",
    "url": "https://images.nypl.org/index.php?id=1638471&t=q"
  },
  {
    "title": "Habit of the Patagonians in 1764. Patagons.",
    "url": "https://images.nypl.org/index.php?id=1638472&t=q"
  },
  {
    "title": "Apollo. Appollon.",
    "url": "https://images.nypl.org/index.php?id=1638473&t=q"
  },
  {
    "title": "Erato. Erato.",
    "url": "https://images.nypl.org/index.php?id=1638474&t=q"
  },
  {
    "title": "Polyhymnia. Polyhymnie.",
    "url": "https://images.nypl.org/index.php?id=1638475&t=q"
  },
  {
    "title": "Terpsichore. Terpsicore.",
    "url": "https://images.nypl.org/index.php?id=1638476&t=q"
  },
  {
    "title": "Urania. Uranie.",
    "url": "https://images.nypl.org/index.php?id=1638477&t=q"
  },
  {
    "title": "Calliope. Calliope.",
    "url": "https://images.nypl.org/index.php?id=1638478&t=q"
  },
  {
    "title": "Clio. Clio.",
    "url": "https://images.nypl.org/index.php?id=1638479&t=q"
  },
  {
    "title": "Euterpe. Euterpe.",
    "url": "https://images.nypl.org/index.php?id=1638480&t=q"
  },
  {
    "title": "Thalia. Thalie.",
    "url": "https://images.nypl.org/index.php?id=1638481&t=q"
  },
  {
    "title": "Melpomene. Melpomene.",
    "url": "https://images.nypl.org/index.php?id=1638482&t=q"
  },
  {
    "title": "Spring. L'Eté [sic].",
    "url": "https://images.nypl.org/index.php?id=1638483&t=q"
  },
  {
    "title": "Summer. L'Eté.",
    "url": "https://images.nypl.org/index.php?id=1638484&t=q"
  },
  {
    "title": "Autumn. L'Automne.",
    "url": "https://images.nypl.org/index.php?id=1638485&t=q"
  },
  {
    "title": "Winter. L'Hyver.",
    "url": "https://images.nypl.org/index.php?id=1638486&t=q"
  },
  {
    "title": "Day. Le Jour.",
    "url": "https://images.nypl.org/index.php?id=1638487&t=q"
  },
  {
    "title": "Night. La Nuit.",
    "url": "https://images.nypl.org/index.php?id=1638488&t=q"
  },
  {
    "title": "Virtue. La Vertu.",
    "url": "https://images.nypl.org/index.php?id=1638489&t=q"
  },
  {
    "title": "Peace. La Paix.",
    "url": "https://images.nypl.org/index.php?id=1638490&t=q"
  },
  {
    "title": "Plenty. L'Abondance.",
    "url": "https://images.nypl.org/index.php?id=1638491&t=q"
  },
  {
    "title": "Curiosity. La Curiosité.",
    "url": "https://images.nypl.org/index.php?id=1638492&t=q"
  },
  {
    "title": "Secrecy. Le Secret.",
    "url": "https://images.nypl.org/index.php?id=1638493&t=q"
  },
  {
    "title": "Hope. L'Espérance.",
    "url": "https://images.nypl.org/index.php?id=1638494&t=q"
  },
  {
    "title": "Liberty. La Liberté.",
    "url": "https://images.nypl.org/index.php?id=1638495&t=q"
  },
  {
    "title": "Merlin. L'Euchanteur Merlin.",
    "url": "https://images.nypl.org/index.php?id=1638496&t=q"
  },
  {
    "title": "Circe. Circé.",
    "url": "https://images.nypl.org/index.php?id=1638497&t=q"
  }
]