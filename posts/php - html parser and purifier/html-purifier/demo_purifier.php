<?php
require_once 'vendor/autoload.php';

$config = HTMLPurifier_Config::createDefault();
// $config->set('Core.Encoding', $ci->config->item('charset'));
// $config->set('HTML.Doctype', 'XHTML 1.0 Strict');
// $config->set('HTML.Doctype', 'HTML 4.01 Transitional');
// $config->set('HTML.SafeIframe', true);
// $config->set('HTML.Allowed', 'a[href|title],img[title|src|alt],em,strong,cite,blockquote,code,ul,ol,li,dl,dt,dd,p,br,h1,h2,h3,h4,h5,h6,span,*[style]');
// $config->set('Cache.SerializerPath', storage_path('purify'));
$config->set('AutoFormat.AutoParagraph', TRUE);
$config->set('AutoFormat.Linkify', TRUE);
$config->set('AutoFormat.RemoveEmpty', TRUE);

// http://htmlpurifier.org/docs/enduser-customize.html
// https://github.com/kennberg/php-htmlpurfier-html5
$config->set('HTML.DefinitionID', 'html5-definitions'); // unqiue id
$config->set('HTML.DefinitionRev', 1);
if ($def = $config->maybeGetRawHTMLDefinition()) {
	$def->addElement('mark', 'Inline', 'Inline', 'Common');
	$def->addElement('figure', 'Block', 'Optional: (figcaption, Flow) | (Flow, figcaption) | Flow', 'Common');
	$def->addElement('figcaption', 'Inline', 'Flow', 'Common');

	/*
	$def->addElement('video', 'Block', 'Optional: (source, Flow) | (Flow, source) | Flow', 'Common', array(
		'src'      => 'URI',
		'type'     => 'Text',
		'width'    => 'Length',
		'height'   => 'Length',
		'poster'   => 'URI',
		'preload'  => 'Enum#auto,metadata,none',
		'controls' => 'Bool',
	));
	$def->addElement('source', 'Block', 'Flow', 'Common', array(
		'src' => 'URI',
		'type' => 'Text',
    ));
	$def->addElement('details', 'Block', 'Flow', 'Common', array('open' => new \HTMLPurifier_AttrDef_HTML_Bool(true)));
	$def->addElement('summary', 'Inline', 'Inline', 'Common');
	*/
}


$purifier = new HTMLPurifier($config);

$dirtyHtml = <<<'HTML'
    <p>Nguyễn Anh Tuấn</p>
    xxx
    <p>Đường link https://vnexpress.net.</p>
    <p></p>
    <p><br /></p>
    <script>alert(1)</script>
	<figure>
		<img src="../html/pic_trulli.jpg" alt="Trulli" style="width:100%">
		<figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
	</figure>
HTML;

$cleanHtml = $purifier->purify($dirtyHtml);
echo $cleanHtml . PHP_EOL;
