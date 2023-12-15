<?php

namespace core\util\niucloud\http;

use core\util\niucloud\support\XML;
use GuzzleHttp\Psr7\Response as GuzzleResponse;
use Psr\Http\Message\ResponseInterface;
use function mb_convert_encoding;
use function preg_replace;


class Response extends GuzzleResponse
{
    /**
     * @param ResponseInterface $response
     * @return static
     */
    public static function buildFromPsrResponse(ResponseInterface $response)
    {
        return new static(
            $response->getStatusCode(),
            $response->getHeaders(),
            $response->getBody(),
            $response->getProtocolVersion(),
            $response->getReasonPhrase()
        );
    }

    /**
     * @return object
     */
    public function toObject()
    {
        return json_decode($this->toJson());
    }

    /**
     * Build to json.
     *
     * @return string
     */
    public function toJson()
    {
        return json_encode($this->toArray());
    }

    /**
     * Build to array.
     *
     * @return array
     */
    public function toArray()
    {
        $content = $this->removeControlCharacters($this->getBodyContents());

        if (false !== stripos($this->getHeaderLine('Content-Type'), 'xml') || 0 === stripos($content, '<xml')) {
            return XML::parse($content);
        }
        $array = json_decode($content, true, 512, JSON_BIGINT_AS_STRING);
        if (JSON_ERROR_NONE === json_last_error()) {
            return (array)$array;
        }
        return [];
    }

    /**
     * @param string $content
     *
     * @return string
     */
    protected function removeControlCharacters(string $content)
    {
        return preg_replace('/[\x00-\x1F\x80-\x9F]/u', '', mb_convert_encoding($content, 'UTF-8', 'UTF-8'));
    }

    /**
     * @return string
     */
    public function getBodyContents()
    {
        $this->getBody()->rewind();
        $contents = $this->getBody()->getContents();
        $this->getBody()->rewind();

        return $contents;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->getBodyContents();
    }
}
