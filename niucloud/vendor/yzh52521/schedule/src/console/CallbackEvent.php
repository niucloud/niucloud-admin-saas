<?php

namespace schedule\console;

use InvalidArgumentException;
use think\Container;

class CallbackEvent extends Event
{
    protected $callback;

    protected $parameters;

    public function __construct($callback, array $parameters = [])
    {
        if (! is_string($callback) &&  ! is_callable($callback) && ! is_array($callback)) {
            throw new InvalidArgumentException(
                'Invalid scheduled callback event. Must be a string or callable.'
            );
        }

        $this->callback = $callback;

        $this->parameters = $parameters;
    }

    /**
     * Run the given event.
     *
     * @param  \think\Container  $container
     * @return mixed
     *
     * @throws \Exception
     */
    public function run(Container $container)
    {
        $this->callBeforeCallbacks($container);

        try {
            if(is_object($this->callback)){
                $response = $container->invokeFunction($this->callback, $this->parameters);
//                $response = $container->invoke([$this->callback, 'doJob'], $this->parameters);
            }else if(is_array($this->callback)){
                $response = $container->invoke([$this->callback[0], $this->callback[1] ?? 'doJob'], $this->parameters);
            }else{
                $response = $container->invokeFunction($this->callback, $this->parameters);
            }
//            $response = is_object($this->callback)
//                ? $container->invoke([$this->callback, 'doJob'], $this->parameters)
//                : $container->invokeFunction($this->callback, $this->parameters);


//            $container->make($this->callback)->invokeFunction('doJob', $this->parameters);
//            $response = $container->invokeFunction($this->callback, $this->parameters);
        } finally {
            parent::callAfterCallbacks($container);
        }

        return $response;
    }
    public function isCallable($var, $syntaxOnly = false)
    {
        if(is_array($var)){
            return true;
        }
        if (! is_array($var)) {
            return is_callable($var, $syntaxOnly);
        }

        if ((! isset($var[0]) || ! isset($var[1])) ||
            ! is_string($var[1] ?? null)) {
            return false;
        }

        if ($syntaxOnly &&
            (is_string($var[0]) || is_object($var[0])) &&
            is_string($var[1])) {
            return true;
        }

        $class = is_object($var[0]) ? get_class($var[0]) : $var[0];

        $method = $var[1];

        if (! class_exists($class)) {
            return false;
        }

        if (method_exists($class, $method)) {
            return (new \ReflectionMethod($class, $method))->isPublic();
        }

        if (is_object($var[0]) && method_exists($class, '__call')) {
            return (new \ReflectionMethod($class, '__call'))->isPublic();
        }

        if (! is_object($var[0]) && method_exists($class, '__callStatic')) {
            return (new \ReflectionMethod($class, '__callStatic'))->isPublic();
        }

        return false;
    }

}
