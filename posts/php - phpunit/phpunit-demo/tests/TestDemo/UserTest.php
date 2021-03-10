<?php

namespace Tests\Cttd\TestDemo;


use PHPUnit\Framework\TestCase;
use Cttd\TestDemo\User;


class UserTest extends TestCase
{
    public function testGetUserReturnsUserWithExpectedValues()
    {
        $details = array();
        $user = new User($details);
        $password = '123456';
        $user->setPassword($password);
        $expectedPasswordResult = 'e10adc3949ba59abbe56e057f20f883e';
        $currentUser = $user->getUser();
        $this->assertEquals($expectedPasswordResult, $currentUser['password']);

        $cryptedPassword = $this->invokeMethod($user, 'cryptPassword', array('passwordToCrypt'));
        // echo "\ncryptedPassword " . $cryptedPassword . "\n";
    }

    /**
     * Call protected/private method of a class.
     *
     * @param object &$object    Instantiated object that we will run method on.
     * @param string $methodName Method name to call
     * @param array  $parameters Array of parameters to pass into method.
     *
     * @return mixed Method return.
     */
    public function invokeMethod(&$object, $methodName, array $parameters = array())
    {
        $reflection = new \ReflectionClass(get_class($object));
        $method = $reflection->getMethod($methodName);
        $method->setAccessible(true);
        return $method->invokeArgs($object, $parameters);
    }

    public function testSetPasswordReturnsFalseWhenPasswordLengthIsTooShort()
    {
        $details = array();
        $user = new User($details);
        $password = '123';
        $result = $user->setPassword($password);
        $this->assertFalse($result);
    }
}
