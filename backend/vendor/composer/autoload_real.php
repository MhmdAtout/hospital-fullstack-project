<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInite3ef6cb91a30c83afd21f39d1b3355e3
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(array('ComposerAutoloaderInite3ef6cb91a30c83afd21f39d1b3355e3', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInite3ef6cb91a30c83afd21f39d1b3355e3', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInite3ef6cb91a30c83afd21f39d1b3355e3::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
