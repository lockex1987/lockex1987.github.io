<?php
namespace App\Exports;

use App\User;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\FromIterator;
use Maatwebsite\Excel\Concerns\FromQuery;

use Maatwebsite\Excel\Concerns\ShouldAutoSize;

use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithTitle;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithCustomQuerySize;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithCharts;
use Maatwebsite\Excel\Concerns\WithDrawings;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithPreCalculateFormulas;

use Illuminate\Contracts\View\View;

use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class UsersExport
        implements FromCollection
        //implements FromArray
        //implements FromView
        , ShouldAutoSize // độ rộng các cell bao hết dữ liệu
        , WithMapping
        , WithHeadings
        , WithColumnFormatting
        , WithTitle
{
    /**
     * Khởi tạo dữ liệu từ Collection.
     * Cần implements FromCollection.
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return User::all();
    }

    /**
     * Khởi tạo dữ liệu từ mảng.
     * Cần implements FromArray
     * @return Mảng dữ liệu
     */
    public function array(): array
    {
        // Có thể khởi tạo dữ liệu bằng Faker
        return [
            [1, 2, 3],
            [4, 5, 6]
        ];
    }

    /**
     * Tạo file Excel từ view Blade.
     * Cần implements FromView.
     */
    public function view(): View
    {
        return view('exports.users', [
            'users' => User::all()
        ]);
    }

    /**
     * Lọc các trường hiển thị
     * Cần implements WithMapping.
     * @var User $user
     */
    public function map($user): array
    {
        return [
            $user->name,
            $user->full_name,
            $user->email,
            Date::dateTimeToExcel($user->created_at)
        ];
    }

    /**
     * Thêm dòng các tiêu đề.
     * Cần implements WithHeadings.
     */
    public function headings(): array
    {
        return [
            'Tên đăng nhập',
            'Tên đầy đủ',
            'Email',
            'Ngày tạo'
        ];
    }

    /**
     * Format các cột.
     * Cần implements WithColumnFormatting.
     * @return array
     */
    public function columnFormats(): array
    {
        return [
            'D' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            //'C' => NumberFormat::FORMAT_CURRENCY_EUR_SIMPLE,
        ];
    }

    /**
     * Thiết lập tên sheet.
     * Cần implements WithTitle
     * @return string
     */
    public function title(): string
    {
        return 'Danh sach nguoi dung';
    }
}
