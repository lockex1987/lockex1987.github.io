package collection;

import java.util.*;

public class MapDemo {

	private static final String[] INPUT = {
		"Aida, Verdi",
		"Billy Budd, Britten",
		"Das Rheingold, Wagner",
		"Die Walkure, Wagner",
		"Die Zauberflote, Mozart",
		"Ernani, Verdi",
		"Gloriana, Britten",
		"La Boheme, Puccini",
		"La Fanciulla del West, Puccini",
		"La Forza del Destino, Verdi",
		"La Traviata, Verdi",
		"Le Nozze di Figaro, Mozart",
		"Lohengrin, Wagner",
		"Macbeth, Verdi",
		"Madama Butterfly, Puccini",
		"Manon Lescaut, Puccini",
		"Peter Grimes, Britten",
		"Rigoletto, Verdi",
		"Tosca, Puccini",
		"Turandot, Puccini"
	};

	private static final Map<Long, Boolean> lockKeys = new HashMap();

	public static void main(String[] args) {
		//testComposers();
		testIncrement(1000, 10);
	}

	private static void testComposers() {
		Map<String, String> info = new HashMap();
		info.put("Verdi", "Guiseppe Verdi (Italian, 1813-1901)");
		info.put("Puccini", "Giacomo Puccini (Italian, 1858-1924)");
		info.put("Mozart", "Wolfgang Amadeus Mozart (Austrian, 1756-1791)");
		info.put("Wagner", "Richard Wagner (German, 1813-1883)");
		info.put("Britten", "Benjamin Britten (British, 1913-1976)");

		Map<String, Set<String>> operasByComposer = new TreeMap();

		for (String line : INPUT) {
			int p = line.indexOf(",");
			String opera = line.substring(0, p);
			String composer = line.substring(p + 2);
			if (!operasByComposer.containsKey(composer)) {
				operasByComposer.put(composer, new TreeSet<>());
			}
			operasByComposer.get(composer).add(opera);
		}

		// Print info by the old way
		/*
		Set<String> composers = operasByComposer.keySet();
		System.out.println("There are " + composers.size() + " composers in the list:");
		Iterator<String> i = composers.iterator();
		while (i.hasNext()) {
			String composer = i.next();
			System.out.println(info.get(composer));
			Set<String> operas = operasByComposer.get(composer);
			for (Iterator j = operas.iterator(); j.hasNext(); System.out.println("   " + j.next()));
		}*/
		// Print info by Lamda expressions and forEach loops
		operasByComposer.forEach((composer, operas) -> {
			System.out.println(info.get(composer));
			for (String s : operas) {
				System.out.println("   " + s);
			}
		});
	}

	private static void updateEmailLockKeys() {
		Long emailContentId = 1L;
		lockKeys.put(emailContentId, Boolean.TRUE);
		System.out.println(lockKeys.get(emailContentId));
		lockKeys.put(emailContentId, Boolean.FALSE);
		System.out.println("Compare " + lockKeys.get(emailContentId).equals(Boolean.FALSE));
		System.out.println(lockKeys.get(emailContentId));
		lockKeys.put(emailContentId, Boolean.TRUE);
		System.out.println(lockKeys.get(emailContentId));
	}

	private static void testIncrement(int size, int bound) {
		Map<Integer, Integer> map = new HashMap<>();

		for (int i = 0; i < size; i++) {
			int n = (int) Math.round(Math.random() * bound);
			map.put(n, map.getOrDefault(n, 0) + 1);
		}

		map.forEach((k, v) -> {
			System.out.printf("%2d occurs %3d times\n", k, v);
		});
	}
}
