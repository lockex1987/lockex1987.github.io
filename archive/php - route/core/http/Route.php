<?php

namespace Core\Http;

/**
 *
 * Class Route
 *
 */
class Route
{

    /**
     * - Mảng lưu trữ route của ứng dụng
     * - Mỗi route sẽ gồm url, method, action và params
     */
    private $__routes;

    public function __construct()
    {
        $this->__routes = [];
    }

    /**
     * Phương thức GET.
     * @param string $url URL cần so khớp
     * @param string|callable $action Hành động khi URL được gọi. Có thể là một callback hoặc một method trong controller
     * @return void
     */
    public function get(string $url, $action)
    {
        // Xử lý phương thức GET
        $this->__request($url, 'GET', $action);
    }

    /**
     * Phương thức POST.
     * @param string $url URL cần so khớp
     * @param string|callable $action Hành động khi URL được gọi. Có thể là một callback hoặc một method trong controller
     * @return void
     */
    public function post(string $url, $action)
    {
        // Xử lý phương thức POST
        $this->__request($url, 'POST', $action);
    }

    /**
     * Xử lý phương thức.
     * @param string $url URL cần so khớp
     * @param string $method method của route. GET hoặc POST
     * @param string|callable $action Hành động khi URL được gọi. Có thể là một callback hoặc một method trong controller
     * @return void
     */
    private function __request(string $url, string $method, $action)
    {
        // Kiểm tra xem URL có chứa param không, ví dụ post/{id}
        if (preg_match_all('/({([a-zA-Z]+)})/', $url, $params)) {
            // Thay thế param bằng (.+), ví dụ post/{id} -> post/(.+)
            $url = preg_replace('/({([a-zA-Z]+)})/', '(.+)', $url);
        }

        // Thay thế tất cả các ký tự / bằng ký tự \/ (regex) trong URL
        $url = str_replace('/', '\/', $url);

        // Tạo một route mới
        $route = [
            'url' => $url,
            'method' => $method,
            'action' => $action,
            'params' => $params[2]
        ];

        // Thêm route
        array_push($this->__routes, $route);
    }
    
    /**
     * Hàm xử lý khi một URL được gọi.
     * @param string $url URL được gọi đến server
     * @param string $method Phương thức url được gọi. GET | POST
     * @return void
     */
    public function map(string $url, string $method)
    {
        // Lặp qua các route trong ứng dụng, kiểm tra có chứa url được gọi không
        foreach ($this->__routes as $route) {
            // Nếu route có $method
            if ($route['method'] == $method) {
                // Kiểm tra route hiện tại có phải là url đang được gọi
                $reg = '/^' . $route['url'] . '$/';
                if (preg_match($reg, $url, $params)) {
                    array_shift($params);
                    $this->__call_action_route($route['action'], $params);
                    return;
                }
            }
        }

        // Nếu không khớp với bất kì route nào cả
        echo '404 - Not Found';
        return;
    }
    
    /**
     * Hàm gọi action route.
     * @param string|callable $action action của route
     * @param array $params Các tham số trên url
     * @return void
     */
    private function __call_action_route($action, $params)
    {
        // Nếu $action là một callback (một hàm)
        if (is_callable($action)) {
            call_user_func_array($action, $params);
            return;
        }

        // Nếu $action là một phương thức của controller, ví dụ 'HomeController@index'
        if (is_string($action)) {
            $action = explode('@', $action);
            $controller_name = 'App\\Controllers\\' . $action[0];
            $controller = new $controller_name();
            call_user_func_array([$controller, $action[1]], $params);
            return;
        }
    }
}
