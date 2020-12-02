<?php
namespace App\Http\Controllers;

use App\Utils\ExportExcel;
use Faker\Factory as FakerFactory;

class ExportController extends Controller
{
    public function export()
    {
        $faker = FakerFactory::create();

        $exportExcel = new ExportExcel('Exports/Templates/users.xlsx');
        $no = 1;
        for ($row = 2; $row <= 20; $row++) {
            $name = $faker->name;
            $address = $faker->streetAddress;

            $exportExcel->setRowValues($row, [
                $no,
                $name,
                $address
            ]);

            $no++;
        }
        $exportExcel->setBorders('A1:C' . ($row - 1));
        $exportExcel->responseToClient('users.xlsx');
    }
}
