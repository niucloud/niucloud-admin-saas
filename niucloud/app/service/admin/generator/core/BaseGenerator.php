<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud-admin.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\admin\generator\core;


use think\helper\Str;


/**
 * 代码生成器基类
 * Class BaseGenerator
 * @package app\service\admin\generator\core
 */
abstract class BaseGenerator
{

    /**
     * 模块名
     * @var string
     */
    protected $moduleName;


    /**
     * 类名
     * @var string
     */
    protected $className;


    /**
     * 表信息
     * @var array
     */
    protected $table;


    /**
     * 表字段信息
     * @var array
     */
    protected $tableColumn;


    /**
     * 文件的文字
     * @var string
     */
    protected $text;


    /**
     * basePath
     * @var string
     */
    protected $basePath;


    /**
     * rootPath
     * @var string
     */
    protected $rootPath;

    /**
     * 模板文件夹
     * @var string
     */
    protected $vmDir;

    /**
     * 生成的文件路径
     * @var string
     */
    protected $outDir;

        /**
     * 获取文件生成到模块的文件夹路径
     * @return mixed
     */
    abstract public function getModuleOutDir();


    /**
     *  获取文件生成到runtime的文件夹路径
     * @return mixed
     */
    abstract public function getRuntimeOutDir();


    /**
     * 替换模板文字
     * @return mixed
     */
    abstract public function replaceText();


    /**
     * 生成文件名
     * @return mixed
     */
    abstract public function getFileName();



    public function __construct()
    {
        $this->basePath = base_path();
        $this->rootPath = root_path();
        $this->vmDir = $this->basePath . 'service/admin/generator/vm/';
        $this->outDir = $this->rootPath . 'public/upload/generator/';
        $this->checkDir($this->outDir);

    }


    /**
     * 初始化表数据
     * @param array $table
     */
    public function init(array $table)
    {
        // 设置当前表信息
        $this->setTable($table);
        // 设置模块名
        $this->setModuleName($table['module_name'] ?? '');
        // 设置类名
        $this->setClassName($table['class_name'] ?? '');
        // 替换模板中的文本
        $this->replaceText();
    }


    /**
     * 生成文件到模块或runtime目录
     */
    public function generate()
    {
        // 生成到runtime目录
        $path = $this->getRuntimeOutDir() . $this->getFileName();
        // 写入内容
        if($path) file_put_contents($path, $this->text);
    }


    /**
     * 文件信息
     * @return array
     */
    public function fileInfo(): array
    {
        return [
            'name' => $this->getFileName(),
            'type' => 'php',
            'content' => $this->text
        ];
    }

    /**
     * 文件夹不存在则创建
     * @param string $path
     */
    public function checkDir(string $path)
    {
        !is_dir($path) && mkdir($path, 0777, true);
    }

    /**
     * 设置模块名
     * @param string $moduleName
     */
    public function setModuleName(string $moduleName): void
    {
        $this->moduleName = strtolower($moduleName);
        if(empty($this->moduleName)){
            $this->moduleName = strtolower($this->getLCaseName());
        }
    }


    /**
     * 设置表信息
     * @param $table
     */
    public function setTable($table)
    {
        $this->table = !empty($table) ? $table : [];
        $this->tableColumn = $table['fields'] ?? [];
    }


    /**
     * 设置类名
     * @param string $className
     */
    public function setClassName(string $className): void
    {
        $this->className = $className;
    }


    /**
     * 设置生成文件的文本内容
     * @param string $text
     */
    public function setText(string $text): void
    {
        $this->text = $text;
    }


    /**
     * 获取模板路径
     * @param string $templateName
     * @return string
     */
    public function getvmPath(string $templateName): string
    {
        return $this->vmDir . $templateName . '.vm';
    }


    /**
     * 首字母小写命名
     * @return string
     */
    public function getLCaseName()
    {
        return Str::camel($this->getTableName());
    }


    /**
     * 首字母大写命名
     * @return string
     */
    public function getUCaseName()
    {
        return Str::studly($this->getTableName());
    }


    /**
     * 小写表名
     * @return string
     */
    public function getLCaseTableName()
    {
        return Str::lower($this->getTableName());
    }

    
    /**
     * 类名称大写
     * @return string
     */
    public function getUCaseClassName()
    {
        if($this->className) return Str::studly($this->className);
        return $this->getUCaseName();
    }
    /**
     * 类名称小写
     * @return string
     */
    public function getLCaseClassName()
    {
        if($this->className) return Str::camel($this->className);
        return $this->getLCaseName();
    }


    /**
     * 获取表名
     * @return array|string|string[]
     */
    public function getTableName()
    {
        $tablePrefix = config('database.connections.mysql.prefix');
        return str_replace($tablePrefix, '', $this->table['table_name']);
    }


    /**
     * 获取表主键
     * @return mixed|string
     */
    public function getPk()
    {
        $pk = 'id';
        if (empty($this->tableColumn)) {
            return $pk;
        }

        foreach ($this->tableColumn as $item) {
            if ($item['is_pk']) {
                $pk = $item['column_name'];
            }
        }
        return $pk;
    }


    /**
     * 获取缺省值
     * @param string $type
     * @return int|string
     */
    public function getDefault(string $type)
    {
        if (str_starts_with($type, 'set') || str_starts_with($type, 'dict')) {
            $result = '""';
        } elseif (preg_match('/(int|serial|bit)/is', $type)) {
            $result = '0';
        } elseif (preg_match('/(double|float|decimal|real|numeric)/is', $type)) {
            $result = '0.00';
        } elseif (preg_match('/bool/is', $type)) {
            $result = 'false';
        } elseif (str_starts_with($type, 'timestamp')) {
            $result = time();
        } elseif (str_starts_with($type, 'datetime')) {
            $result = date('Y-m-d H:i:s');
        } elseif (str_starts_with($type, 'date')) {
            $result = date('Y-m-d H:i:s');
        } else {
            $result = '""';
        }
        return $result;
    }

    /**
     * 获取作者信息
     * @return mixed|string
     */
    public function getAuthor()
    {
        return empty($this->table['author']) ? 'Niucloud team' : $this->table['author'];
    }


    /**
     * 代码生成备注时间
     * @return string
     */
    public function getNoteDate()
    {
        return date('Y/m/d H:i');
    }


    /**
     * 设置空额占位符
     * @param $content
     * @param $blankpace
     * @return string
     */
    public function setBlankSpace($content, $blankpace)
    {
        $content = explode(PHP_EOL, $content);
        foreach ($content as $line => $text) {
            $content[$line] = $blankpace . $text;
        }
        return (implode(PHP_EOL, $content));
    }


    /**
     * 替换文件的内容
     * @param $old
     * @param $new
     * @param $template
     * @return array|false|string|string[]
     */

    public function replaceFileText($old, $new, $template)
    {
        return str_replace($old, $new, file_get_contents($template));
    }

}