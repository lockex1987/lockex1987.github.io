package download.service;

import java.util.List;

import org.junit.Test;


public class DownloadBatchTests {

	@Test
	public void downloadFilesTest() throws Exception {
		String text = "https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/rus\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/ksa\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/egy\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/uru\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/por\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/esp\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/mar\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/irn\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/fra\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/aus\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/per\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/den\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/arg\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/isl\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/cro\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/nga\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/bra\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/sui\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/crc\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/srb\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/ger\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/mex\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/swe\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/kor\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/bel\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/pan\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/tun\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/eng\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/pol\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/sen\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/col\n" + 
				"https://fsprdcdnpublic.azureedge.net/global-pictures/flags-fwc2018-3/jpn";
		DownloadBatch obj = new DownloadBatch();
		List<String> urls = obj.getUrlsFromText(text);
		obj.downloadFiles(urls);
	}
}
