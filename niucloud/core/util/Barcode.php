<?php
namespace core\util;

require_once('barcode/class/BCGFontFile.php');
require_once('barcode/class/BCGColor.php');
require_once('barcode/class/BCGDrawing.php');
require_once('barcode/class/BCGcode128.barcode.php');
class Barcode{
    public $size; //字体大小
    private $color_black; 
    private $color_white;
    private $font;
    public $drawException = null;
    public $fontPath;
    public $content;
    
    public function __construct($size,$content){
        $this->color_black = new \BCGColor(0, 0, 0);
        $this->color_white = new \BCGColor(255, 255, 255);
        $this->size = $size;
        $this->fontPath = str_replace("\\", "/", root_path() . "core/util/barcode/font/Arial.ttf");
        $this->font = new \BCGFontFile($this->fontPath, $this->size);
        $this->content = $content;
    }
    
    //生成条形码
    public function generateBarcode($path='', $scale = 2){
        try {
            $code = new \BCGcode128();
            $code->setScale($scale);
            $code->setThickness(30); // 条形码的厚度
            $code->setForegroundColor($this->color_black); // 条形码颜色
            $code->setBackgroundColor($this->color_white); // 空白间隙颜色
            $code->setFont($this->font); //
            $code->parse($this->content); // 条形码需要的数据内容
        } catch(Exception $exception) {
            $this->drawException = $exception;
        }

        if($path == ''){
            $path = 'upload/barcode';//条形码存放路径
        }
        
        if (! is_dir($path)) {
            $mode = intval('0777', 8);
            mkdir($path, $mode, true);
            chmod($path, $mode);
        }
        $path = $path . '/' . $this->content . '.png';
        if (file_exists($path)) {
            unlink($path);
        }
        
        //根据以上条件绘制条形码
        $drawing = new \BCGDrawing('', $this->color_white);
        if($this->drawException) {
            $drawing->drawException($this->drawException);
        } else {
            $drawing->setBarcode($code);
            $drawing->setFilename($path);
            $drawing->draw();
        }
        // 生成PNG格式的图片
        $drawing->finish(\BCGDrawing::IMG_FORMAT_PNG);
        return $path;
    }
}
?>