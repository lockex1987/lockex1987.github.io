<?php

class Rectangle
{
    public function __construct(
        public int $left,
        public int $top,
        public int $right,
        public int $bottom
    ) {
    }

    public static function withRect(Rectangle $rect)
    {
        $instance = new self(
            left: $rect->left,
            top: $rect->top,
            right: $rect->right,
            bottom: $rect->bottom
        );
        return $instance;
    }
}
