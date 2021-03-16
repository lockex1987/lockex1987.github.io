<?php

class CreateTamquocdiennghiaEpubTests
{
	public function testProcess(): void
	{
		$obj = new CreateTamquocdiennghiaEpub();
		$startChapter = 5;
		$endChapter = 20;
		for ($number = $startChapter; $number <= $endChapter; $number++) {
			$obj->process($number);
		}
		echo 'Done' . PHP_EOL;
	}
}
