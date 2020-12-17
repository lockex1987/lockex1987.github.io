package common.util;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.zip.DataFormatException;

import org.junit.Test;

public class CompressByteTests {

	@Test
	public void testCompressByte() throws IOException, DataFormatException {
		String oldText = "zlib is a software library used for data compression."
				+ " zlib was written by Jean-loup Gailly and Mark Adler and is an abstraction of the DEFLATE compression algorithm"
				+ " used in their gzip file compression program. zlib is also a crucial component of many software platforms"
				+ " including Linux, Mac OS X, and iOS. It has also been used in gaming consoles such as the PlayStation 4,"
				+ " PlayStation 3, Wii U, Wii, Xbox One and Xbox 360."
				+ " The first public version of zlib, 0.9, was released on 1 May 1995 and was originally intended for use with the"
				+ " libpng image library. It is free software, distributed under the zlib license."
				+ " zlib compressed data are typically written with a gzip or a zlib wrapper. "
				+ " The wrapper encapsulates the raw DEFLATE data by adding a header and trailer. "
				+ " This provides stream identification and error detection that are not provided by the raw DEFLATE data."
				+ " The gzip header is larger than the zlib header, as it stores a file name and other file system information. "
				+ " This is the header format used in the ubiquitous gzip file format."
				+ " As of February 2010, zlib only supports one algorithm called DEFLATE, that is a variation of LZ77 (Lempel–Ziv 1977)."
				+ " This algorithm provides good compression on a wide variety of data with minimal use of system resources."
				+ " This is also the algorithm used in the ZIP archive format."
				+ " The header makes allowance for other algorithms, but none is currently implemented.";

		byte[] originalBytes = oldText.getBytes();
		byte[] compressedBytes = CompressByte.compress(originalBytes);
		byte[] decompressedBytes = CompressByte.decompress(compressedBytes);
		String newText = new String(decompressedBytes);

		System.out.println(oldText);
		System.out.println(originalBytes.length);
		System.out.println(compressedBytes.length);
		System.out.println(decompressedBytes.length);
		System.out.println(newText);
		
		assertEquals(oldText, newText);
	}
}
