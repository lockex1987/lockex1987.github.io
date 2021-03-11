<?php

include 'vendor/autoload.php';

use Cttd\Common\Utils\CharsetConverter;


/**
 * Convert dữ liệu lỗi cũ trong cơ sở dữ liệu.
 */
class ConvertDataInDatabase
{
    public function convertCharset(): void
    {
        $list = $this->getList();
        $this->updateList($list);
    }

    private function getList(): array
    {
        // Query selectQuery = DBUtil.createQuery(" SELECT incomeTaxpayerDeclareId, fullName "
        // + " FROM IncomeTaxpayerDeclareBO "
        // + " WHERE (fullName LIKE ? "
        // + " OR fullName LIKE ? "
        // + " OR fullName LIKE ? "
        // + " OR fullName LIKE ? "
        // + " OR fullName LIKE ?) ");
        // char[] marks = CharsetConverter.MARK;
        // for (int i = 0; i < marks.length; i++) {
        // selectQuery.setParameter(i, "%" + marks[i] + "%");
        // }
        // List<Object[]> list = selectQuery.list();
        // return list;

        return [];
    }

    private function updateList(array $list): void
    {
        // Query updateQuery = DBUtil.createQuery(" UPDATE IncomeTaxpayerDeclareBO "
        // + " SET fullName = ? "
        // + " WHERE incomeTaxpayerDeclareId = ? ");

        echo count($list) . PHP_EOL;
        $count = 1;
        foreach ($list as $a) {
            $incomeTaxpayerDeclareId = $a[0];
            $oldName = $a[1];
            $newName = CharsetConverter::convertWindows1258ToUtf8($oldName);
            echo $count . '. ' . $oldName . ' --> ' . $newName . PHP_EOL;
            $count++;

            // updateQuery.setParameter(0, newName);
            // updateQuery.setParameter(1, incomeTaxpayerDeclareId);
            // updateQuery.executeUpdate();
        }
    }
}


function main(): void
{
    $obj = new ConvertDataInDatabase();
    $obj->convertCharset();
}

main();
