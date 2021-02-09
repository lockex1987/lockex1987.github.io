<?php

interface ActionHandler
{
    // Phương thức thực hiện chính
    public function execute();
}


#[Attribute]
class SetUp
{
    // Class này sẽ dùng ở attribute
}


class CopyFile implements ActionHandler
{
    public function __construct(
        private string $fileName,
        private string $targetDirectory
    ) {
        // Sử dụng constructor property promotion
        // Bạn không cần làm gì ở đây nữa
    }

    #[SetUp]
    public function fileExists()
    {
        if (!file_exists($this->fileName)) {
            throw new RuntimeException('File does not exist');
        }
    }

    #[SetUp]
    public function targetDirectoryExists()
    {
        mkdir($this->targetDirectory);
    }

    public function execute()
    {
        copy($this->fileName, $this->targetDirectory . '/' . basename($this->fileName));
    }
}


function executeAction(ActionHandler $actionHandler)
{
    $reflection = new ReflectionObject($actionHandler);

    // Duyệt qua các phương thức
    // Nếu phương thức nào có attribute là class SetUp
    // thì thực hiện phương thức đó
    foreach ($reflection->getMethods() as $method) {
        $attributes = $method->getAttributes(SetUp::class);
        if (count($attributes) > 0) {
            $methodName = $method->getName();
            $actionHandler->$methodName();
        }
    }

    // Cuối cùng thực hiện phương thức execute
    $actionHandler->execute();
}

$copyAction = new CopyFile(fileName: 'attributes.php', targetDirectory: 'output');
executeAction($copyAction);
