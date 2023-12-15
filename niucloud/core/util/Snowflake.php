<?php

namespace core\util;

use Exception;

class Snowflake
{
    // 起始的时间戳
    const START_EPOCH = 1609459200000; // 2021-01-01 00:00:00

    // 各部分所占位数
    const SEQUENCE_BITS = 12;
    const MACHINE_ID_BITS = 0;
    const DATA_CENTER_ID_BITS = 0;

    // 最大值
    const MAX_SEQUENCE = 4095;
    const MAX_MACHINE_ID = 31;
    const MAX_DATA_CENTER_ID = 31;

    private $data_center_id;
    private $machine_id;
    private $last_timestamp;
    private $sequence;

    public function __construct($data_center_id, $machine_id)
    {
//        if ($data_center_id > self::MAX_DATA_CENTER_ID || $data_center_id < 0) {
//            throw new Exception('Data center ID can not be greater than ' . self::MAX_DATA_CENTER_ID . ' or less than 0');
//        }
//
//        if ($machine_id > self::MAX_MACHINE_ID || $machine_id < 0) {
//            throw new Exception('Machine ID can not be greater than ' . self::MAX_MACHINE_ID . ' or less than 0');
//        }

//        $this->data_center_id = $data_center_id;
//        $this->machine_id = $machine_id;
        $this->last_timestamp = 0;
        $this->sequence = 0;
    }

    /**
     * @throws Exception
     */
    public function generateId()
    {
        $timestamp = $this->getTimestamp();

        // 当前时间小于上一次生成时间，发生时钟回拨
        if ($timestamp < $this->last_timestamp) {
            throw new Exception('Clock moved backwards.');
        }

        // 当前时间与上一次生成时间相同
        if ($timestamp == $this->last_timestamp) {
            $this->sequence = ($this->sequence + 1) & self::MAX_SEQUENCE;

            // 当前毫秒的序列已经达到最大值，等待下一毫秒
            if ($this->sequence == 0) {
                $timestamp = $this->nextMillis($this->last_timestamp);
            }
        } else {
            // 新的一毫秒，序列从0开始
            $this->sequence = 0;
        }

        $this->last_timestamp = $timestamp;

        return (($timestamp - self::START_EPOCH) << (self::SEQUENCE_BITS))
//            | ($this->data_center_id << (self::SEQUENCE_BITS + self::MACHINE_ID_BITS))
//            | ($this->machine_id << self::SEQUENCE_BITS)
            | $this->sequence;
    }

    private function getTimestamp()
    {
        return floor(microtime(true) * 1000);
    }

    private function nextMillis($last_timestamp)
    {
        $timestamp = $this->getTimestamp();

        while ($timestamp <= $last_timestamp) {
            $timestamp = $this->getTimestamp();
        }

        return $timestamp;
    }
}